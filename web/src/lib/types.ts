export type Phase = "intro" | "writing" | "reflecting" | "stage" | "done";

export type Speaker = "user" | "counterpart" | "reflector" | "system";

export type ChatMessage = {
  id: string;
  speaker: Speaker;
  text: string;
  at: number;
};

export type SessionState = {
  phase: Phase;
  writing: string;
  personLabel: string | null;
  reflectorMessages: ChatMessage[];
  stageMessages: ChatMessage[];
  reflectRound: number;
};

export type ReflectRequest = {
  writing: string;
  stageMessages: { speaker: "user" | "counterpart"; text: string }[];
  personLabel: string | null;
  reflectRound: number;
  /** 直前までのリフレクト本文。言い回しの重複を避けるためだけに使う */
  previousReflectorMessages?: string[];
};

/** 呼び方の種類。「さん」の付け方が種類ごとに変わるため、リフレクターに判定させる */
export type PersonKind = "name" | "relation" | "role" | "unknown";

export type Person = {
  label: string;
  kind: PersonKind;
};

/** 危険信号の強度。1=平常 / 2=注意 / 3=危険（流れを止める） */
export type CrisisLevel = 1 | 2 | 3;

export type ReflectResponse = {
  /** 書かれた内容から聞こえた人。誰に話すかは本人が選ぶので、ここでは絞らない */
  people: Person[];
  message: string;
  crisisLevel?: CrisisLevel;
};

export type StageRequest = {
  writing: string;
  personLabel: string;
  stageMessages: { speaker: "user" | "counterpart"; text: string }[];
  userMessage: string;
};

export type StageResponse = {
  message: string;
  crisisLevel?: CrisisLevel;
};

export type AiProviderName = "mock" | "anthropic" | "openai";
