import type {
  Person,
  PersonKind,
  ReflectRequest,
  ReflectResponse,
  StageRequest,
  StageResponse,
} from "@/lib/types";

/** 「義母」が「母」より先に一致するよう、長い語を前に置く */
const ROLE_WORDS = [
  "部下",
  "上司",
  "同僚",
  "先輩",
  "後輩",
  "パートナー",
  "夫",
  "妻",
  "義母",
  "義父",
  "母",
  "父",
  "子ども",
  "息子",
  "娘",
  "友人",
  "友達",
  "クライアント",
  "顧客",
] as const;

/** 人がリフレクトする場での続柄の呼び方 */
const RELATION_LABELS: Record<string, string> = {
  娘: "娘さん",
  息子: "息子さん",
  子ども: "お子さん",
  子供: "お子さん",
  母: "お母さん",
  父: "お父さん",
  義母: "お義母さん",
  義父: "お義父さん",
  兄: "お兄さん",
  姉: "お姉さん",
  弟: "弟さん",
  妹: "妹さん",
};

const NAME_HONORIFIC = /(さん|くん|ちゃん|君|さま|様|氏)$/;
const POLITE_HONORIFIC = /(さん|さま|様|氏)$/;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 名前として扱う部分。「効いている様だ」の「様」を敬称と誤認しないよう、
 * 漢字・カタカナ・英字だけの短い語に限る（ひらがなを含む語は名前として拾わない）。
 */
const NAME_BODY = /^[一-龥ァ-ヶーA-Za-zＡ-Ｚａ-ｚ]{1,6}$/;

/** 「神様」「皆さん」のような一般語を人名として拾わないための除外 */
const NOT_NAME_BASES = new Set(["皆", "様", "神", "王", "何", "殿", "姫", "客"]);

/** 文中の「名前＋敬称」を、書かれた表記のまま列挙する */
export function extractNameForms(text: string): string[] {
  const re =
    /([一-龥ぁ-んァ-ヶA-Za-zＡ-Ｚａ-ｚ]{1,12}?)(さん|くん|ちゃん|君|さま|様|氏)/g;
  const found: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const name = match[1];
    // 「部下のA」のように助詞を挟む場合は、末尾の呼び名だけにする
    const shortName = name.includes("の")
      ? name.split("の").filter(Boolean).pop() ?? name
      : name;
    if (!NAME_BODY.test(shortName) || NOT_NAME_BASES.has(shortName)) continue;
    const full = `${shortName}${match[2]}`;
    if (!found.includes(full)) found.push(full);
  }
  return found;
}

/**
 * リフレクターが呼ぶときの形に整える。
 * 人がリフレクトする場では「泉」も「泉ちゃん」も「泉さん」と呼ばれるため、そこに寄せる。
 * 妻・夫・上司などの言い方と、役職は本人が書いたまま残す。
 */
export function toReflectorLabel(
  label: string,
  kind: PersonKind = "unknown",
): string {
  const trimmed = label.trim();
  if (!trimmed || trimmed === "その方") return "その方";
  if (kind === "role") return trimmed;

  if (kind === "relation" || RELATION_LABELS[trimmed]) {
    if (Object.values(RELATION_LABELS).includes(trimmed)) return trimmed;
    return RELATION_LABELS[trimmed] ?? trimmed;
  }

  // 人名と判定できていないものに「さん」を付けると「仕事さん」のような事故になる
  if (kind === "unknown" && !NAME_HONORIFIC.test(trimmed)) return trimmed;

  if (POLITE_HONORIFIC.test(trimmed)) return trimmed;
  const base = trimmed.replace(NAME_HONORIFIC, "");
  return base ? `${base}さん` : trimmed;
}

/**
 * 入力から聞こえた人を、書かれた順に拾う。
 * 誰に話すかは本人が選ぶので、ここでは1人に絞らない。
 */
export function extractPeople(text: string, max = 3): Person[] {
  const people: Person[] = [];
  const push = (label: string, kind: PersonKind) => {
    if (people.some((p) => p.label === label)) return;
    people.push({ label, kind });
  };

  for (const form of extractNameForms(text)) {
    push(toReflectorLabel(form, "name"), "name");
  }

  const hits = ROLE_WORDS.filter((word) => text.includes(word)).sort(
    (a, b) => text.indexOf(a) - text.indexOf(b),
  );
  for (const word of hits) {
    push(toReflectorLabel(word, "relation"), "relation");
  }

  return people.slice(0, max);
}

function quoteSnippet(text: string, max = 40): string {
  const compact = text.replace(/\s+/g, " ").trim();
  if (compact.length <= max) return compact;
  return `${compact.slice(0, max)}…`;
}

export async function mockReflect(
  input: ReflectRequest,
): Promise<ReflectResponse> {
  await delay(700);

  const people = extractPeople(input.writing);

  if (input.reflectRound === 0) {
    const mentioned =
      people.length === 0
        ? "書かれた内容を、こちらで聞いていました。"
        : `${people.map((p) => p.label).join("、")}のことが書かれていましたね。`;

    return {
      people,
      message: [
        mentioned,
        "ここでは答えは返しません。",
        people.length === 0
          ? "今日はここまでにしても大丈夫です。"
          : "話してみたい相手がいれば、ここで話すこともできます。",
      ].join("\n"),
    };
  }

  const lastUser = [...input.stageMessages]
    .reverse()
    .find((m) => m.speaker === "user");

  const heard = lastUser
    ? `ステージでは、あなたが「${quoteSnippet(lastUser.text)}」と話していましたね。`
    : "ステージでのやり取りを、こちらで聞いていました。";

  return {
    people,
    message: [
      heard,
      "今のやり取りのなかで、印象に残った言葉がありました。",
      "続きが必要なら、もう一度声をかけてみてください。終わってもよいと感じたら、今日はここまでにして大丈夫です。",
    ].join("\n"),
  };
}

export async function mockStageReply(
  input: StageRequest,
): Promise<StageResponse> {
  await delay(650);

  const userText = input.userMessage.trim();
  const isFirst =
    input.stageMessages.filter((m) => m.speaker === "user").length === 0;

  if (isFirst) {
    if (/元気|大丈夫|調子|どう/.test(userText)) {
      return { message: "ん、私？……まあまあだよ。どうしたの、急に。" };
    }
    return { message: "ん？どうしたの。なんか顔がいつもと違うけど。" };
  }

  if (/心配|大丈夫|抱え|一人/.test(userText)) {
    return {
      message:
        "そう言ってくれるの、うれしいよ。こっちもちょっと抱えすぎてたかも。",
    };
  }

  if (/ごめん|申し訳|すま/.test(userText)) {
    return {
      message: "いいって。そういうの、ちゃんと届いてるよ。",
    };
  }

  if (/どう思う|意見|聞かせて/.test(userText)) {
    return {
      message:
        "正直、まだ整理しきれてないところもある。でも、聞いてくれて助かる。",
    };
  }

  return {
    message: "うん……今の話、ちゃんと聞いたよ。もう少し続けてくれる？",
  };
}
