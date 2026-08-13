import Anthropic from "@anthropic-ai/sdk";
import {
  extractNameForms,
  extractPersonLabel,
  toReflectorLabel,
} from "@/lib/ai/mock";
import { REFLECT_SYSTEM, STAGE_SYSTEM } from "@/lib/ai/prompts";
import type {
  PersonKind,
  ReflectRequest,
  ReflectResponse,
  StageRequest,
  StageResponse,
} from "@/lib/types";

type ParsedReflect = ReflectResponse & { personKind: PersonKind };

const PERSON_KINDS: PersonKind[] = ["name", "relation", "role", "unknown"];

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }
  return new Anthropic({ apiKey });
}

function getModel() {
  return process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
}

function textFromMessage(message: Anthropic.Message): string {
  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

function parseReflectJson(raw: string): ParsedReflect {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("reflect response is not JSON");
  }

  const parsed = JSON.parse(cleaned.slice(start, end + 1)) as Partial<ParsedReflect>;

  if (!parsed.message?.trim()) {
    throw new Error("reflect message is empty");
  }

  const kind = parsed.personKind;

  return {
    personLabel: parsed.personLabel?.trim() || "その方",
    personKind:
      kind && PERSON_KINDS.includes(kind) ? kind : "unknown",
    message: parsed.message.trim(),
    suggestStage: parsed.suggestStage !== false,
  };
}

function buildReflectUserPrompt(input: ReflectRequest): string {
  const stageText =
    input.stageMessages.length === 0
      ? "（まだステージでの対話はありません）"
      : input.stageMessages
          .map((m) => `${m.speaker === "user" ? "自分" : "相手役"}: ${m.text}`)
          .join("\n");

  const nameForms = extractNameForms(input.writing);
  const nameFormsLine =
    nameForms.length > 0
      ? `文中の呼び方 → あなたが使う呼び方: ${nameForms
          .map((form) => `${form} → ${toReflectorLabel(form, "name")}`)
          .join("、")}`
      : "文中に明確な「名前＋敬称」はありません。人名を見つけたら「さん」を付け、続柄・役職はルールどおりに整えてください。";

  if (input.reflectRound === 0) {
    return [
      "これは初回のリフレクトです。利用者がエクスプレッシブ・ライティングで書いた内容です。",
      "内容から人物を自然に拾い、ここでその相手に向けて話してみる提案を一度だけしてください。",
      "伝える／伝えない／急がなくてよい、といった決断の話はしないでください。",
      nameFormsLine,
      "",
      "【書かれた内容】",
      input.writing,
    ].join("\n");
  }

  return [
    "ステージでの対話を聞いたあとのリフレクトです。一度だけ話してください。",
    `既に決まっている相手の呼び方: ${input.personLabel ?? "その方"}`,
    nameFormsLine,
    "聞こえたこと・印象に残ったことにとどめてください。",
    "伝える／伝えない／今日でなくていい／急がなくてよい、といった決断のメニューや助言は出さないでください。",
    "",
    "【最初に書かれた内容】",
    input.writing,
    "",
    "【ステージの対話】",
    stageText,
  ].join("\n");
}

export async function anthropicReflect(
  input: ReflectRequest,
): Promise<ReflectResponse> {
  const client = getClient();
  const message = await client.messages.create({
    model: getModel(),
    max_tokens: 800,
    temperature: 0.4,
    system: REFLECT_SYSTEM,
    messages: [{ role: "user", content: buildReflectUserPrompt(input) }],
  });

  try {
    const result = parseReflectJson(textFromMessage(message));
    if (input.personLabel) {
      result.personLabel = input.personLabel;
    } else {
      result.personLabel = toReflectorLabel(
        result.personLabel || "その方",
        result.personKind,
      );
    }
    return result;
  } catch (error) {
    console.error("[anthropic] reflect parse failed", error);
    const fallbackLabel =
      input.personLabel ?? extractPersonLabel(input.writing);
    return {
      personLabel: fallbackLabel,
      suggestStage: true,
      message: textFromMessage(message) ||
        `「${fallbackLabel}」のことが書かれていましたね。ここでは答えは返しません。必要なとき、ここで少し話してみることもできます。`,
    };
  }
}

export async function anthropicStageReply(
  input: StageRequest,
): Promise<StageResponse> {
  const client = getClient();

  const prior = input.stageMessages.filter(
    (m) => m.speaker === "user" || m.speaker === "counterpart",
  );
  const isFirstReply = prior.filter((m) => m.speaker === "user").length === 0;
  const nameForms = extractNameForms(
    [input.writing, ...prior.map((m) => m.text), input.userMessage].join("\n"),
  );

  const history = prior.map((m) => ({
    role: (m.speaker === "user" ? "user" : "assistant") as "user" | "assistant",
    content: m.text,
  }));

  const setup = [
    `あなたが担う相手役: ${input.personLabel}`,
    "利用者が最初に書いた背景（参考。本人には読み上げない）:",
    input.writing,
    "",
    nameForms.length > 0
      ? `文中の呼び方（一字一句このまま使え）: ${nameForms.join("、")}`
      : "",
    isFirstReply
      ? "これは相手役としての最初の返答です。本人が先に話しかけています。関係性に合う気軽さ・口調で、短く自然に応じてください。受付や窓口のような「はい、なんでしょうか」は避けてください。"
      : "相手役として応答してください。次が本人の最新の言葉です。",
  ]
    .filter(Boolean)
    .join("\n");

  // Anthropic は user から始まる必要がある
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: setup },
    {
      role: "assistant",
      content:
        "わかった。背景の関係性に合わせて、相手役の口調で短く返すね。",
    },
    ...history,
    { role: "user", content: input.userMessage },
  ];

  const message = await client.messages.create({
    model: getModel(),
    max_tokens: 400,
    temperature: 0.7,
    system: STAGE_SYSTEM,
    messages,
  });

  const text = textFromMessage(message);
  if (!text) {
    throw new Error("empty stage reply");
  }

  return { message: text };
}
