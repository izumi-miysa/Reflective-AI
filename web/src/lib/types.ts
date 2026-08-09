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

export type ReflectResponse = {
  personLabel: string;
  message: string;
  suggestStage: boolean;
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
