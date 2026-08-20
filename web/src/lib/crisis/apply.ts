import { resolveCrisisLevel } from "@/lib/crisis/detect";
import type {
  ReflectRequest,
  ReflectResponse,
  StageRequest,
  StageResponse,
} from "@/lib/types";

function reflectTexts(input: ReflectRequest): string[] {
  return [
    input.writing,
    ...input.stageMessages
      .filter((m) => m.speaker === "user")
      .map((m) => m.text),
  ];
}

export function finalizeReflect(
  input: ReflectRequest,
  result: ReflectResponse,
): ReflectResponse {
  const crisisLevel = resolveCrisisLevel(reflectTexts(input), result.crisisLevel);
  if (crisisLevel >= 3) {
    return {
      people: [],
      message: result.message,
      crisisLevel,
    };
  }
  return { ...result, crisisLevel };
}

export function finalizeStage(
  input: StageRequest,
  result: StageResponse,
): StageResponse {
  const crisisLevel = resolveCrisisLevel(
    [input.writing, input.userMessage],
    result.crisisLevel,
  );
  if (crisisLevel >= 3) {
    return { message: "", crisisLevel };
  }
  return { ...result, crisisLevel };
}
