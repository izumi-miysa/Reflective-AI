import type {
  AiProviderName,
  ReflectRequest,
  ReflectResponse,
  StageRequest,
  StageResponse,
} from "@/lib/types";
import { anthropicReflect, anthropicStageReply } from "@/lib/ai/anthropic";
import { mockReflect, mockStageReply } from "@/lib/ai/mock";

export type AiProvider = {
  name: AiProviderName;
  reflect: (input: ReflectRequest) => Promise<ReflectResponse>;
  stageReply: (input: StageRequest) => Promise<StageResponse>;
};

function createMockProvider(): AiProvider {
  return {
    name: "mock",
    reflect: mockReflect,
    stageReply: mockStageReply,
  };
}

function createAnthropicProvider(): AiProvider {
  return {
    name: "anthropic",
    reflect: anthropicReflect,
    stageReply: anthropicStageReply,
  };
}

/**
 * AI_PROVIDER とキーの有無でプロバイダを選ぶ。
 * anthropic 指定でもキーが無ければ mock に落とす。
 */
export function getAiProvider(): AiProvider {
  const configured = (process.env.AI_PROVIDER ?? "mock").toLowerCase();

  if (configured === "anthropic") {
    if (process.env.ANTHROPIC_API_KEY) {
      return createAnthropicProvider();
    }
    console.warn(
      "[ai] AI_PROVIDER=anthropic ですが ANTHROPIC_API_KEY が無いため mock を使います",
    );
  }

  if (configured === "openai") {
    console.warn("[ai] AI_PROVIDER=openai は未実装のため mock を使います");
  }

  return createMockProvider();
}

export function getAiProviderStatus(): {
  provider: AiProviderName;
  model: string | null;
} {
  const provider = getAiProvider();
  if (provider.name === "anthropic") {
    return {
      provider: "anthropic",
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
    };
  }
  return { provider: provider.name, model: null };
}
