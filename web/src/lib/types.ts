export type Phase = "writing" | "reflecting" | "stage" | "done";

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
};

/** 呼び方の種類。「さん」の付け方が種類ごとに変わるため、リフレクターに判定させる */
export type PersonKind = "name" | "relation" | "role" | "unknown";

export type Person = {
  label: string;
  kind: PersonKind;
};

export type ReflectResponse = {
  /** 書かれた内容から聞こえた人。誰に話すかは本人が選ぶので、ここでは絞らない */
  people: Person[];
  message: string;
};

export type StageRequest = {
  writing: string;
  personLabel: string;
  stageMessages: { speaker: "user" | "counterpart"; text: string }[];
  userMessage: string;
};

export type StageResponse = {
  message: string;
};

export type AiProviderName = "mock" | "anthropic" | "openai";
