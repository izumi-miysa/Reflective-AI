import type {
  ReflectRequest,
  ReflectResponse,
  StageRequest,
  StageResponse,
} from "@/lib/types";

const ROLE_WORDS = [
  "部下",
  "上司",
  "同僚",
  "先輩",
  "後輩",
  "パートナー",
  "夫",
  "妻",
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

const HONORIFICS = ["さん", "くん", "ちゃん", "君", "さま", "様", "氏"] as const;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    if (shortName.length === 0) continue;
    const full = `${shortName}${match[2]}`;
    if (!found.includes(full)) found.push(full);
  }
  return found;
}

/** 入力から主な相手の呼び方を事実ベースで拾う（敬称は変えない） */
export function extractPersonLabel(text: string): string {
  const forms = extractNameForms(text);
  if (forms.length > 0) {
    // 最初に出てきた表記を優先（勝手にさん付けしない）
    return forms[0];
  }

  for (const word of ROLE_WORDS) {
    if (text.includes(word)) {
      return word;
    }
  }

  return "その方";
}

/**
 * モデルが敬称を正規化した場合に、原文の表記へ戻す。
 * 例: 原文が「Nくん」なのに「Nさん」と返ってきたとき →「Nくん」
 */
export function alignPersonLabel(
  label: string,
  writing: string,
): string {
  const trimmed = label.trim();
  if (!trimmed || trimmed === "その方") {
    return extractPersonLabel(writing);
  }

  const forms = extractNameForms(writing);
  if (forms.includes(trimmed)) return trimmed;

  const base = trimmed.replace(
    /(さん|くん|ちゃん|君|さま|様|氏)$/,
    "",
  );
  const sameBase = forms.find((form) =>
    form.replace(/(さん|くん|ちゃん|君|さま|様|氏)$/, "") === base,
  );
  if (sameBase) return sameBase;

  // 原文に無い敬称へ勝手に付け替えていないか、最低限チェック
  for (const honorific of HONORIFICS) {
    if (trimmed.endsWith(honorific)) return trimmed;
  }

  return trimmed;
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

  const personLabel =
    input.personLabel ?? extractPersonLabel(input.writing);

  if (input.reflectRound === 0) {
    const mentioned =
      personLabel === "その方"
        ? "書かれた内容のなかに、気になる相手の気配がありました。"
        : `「${personLabel}」のことが書かれていましたね。`;

    return {
      personLabel,
      suggestStage: true,
      message: [
        mentioned,
        "ここでは答えは返しません。",
        `もしよければ、${personLabel}に向けて、ここで少し話してみることもできます。`,
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
    personLabel,
    suggestStage: true,
    message: [
      heard,
      "今のやり取りのなかで、印象に残った言葉がありました。",
      "続きが必要なら、もう一度声をかけてみてください。終わってもよいと感じたら、手放して閉じて大丈夫です。",
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
