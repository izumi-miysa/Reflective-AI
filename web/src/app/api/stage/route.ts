import { NextResponse } from "next/server";
import { getAiProvider } from "@/lib/ai/provider";
import { finalizeStage } from "@/lib/crisis/apply";
import { detectCrisisFloor } from "@/lib/crisis/detect";
import type { StageRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as StageRequest;

    if (!body.userMessage?.trim() || !body.personLabel?.trim()) {
      return NextResponse.json(
        { error: "userMessage and personLabel are required" },
        { status: 400 },
      );
    }

    const input: StageRequest = {
      writing: body.writing ?? "",
      personLabel: body.personLabel,
      stageMessages: body.stageMessages ?? [],
      userMessage: body.userMessage,
    };

    if (detectCrisisFloor(`${input.writing}\n${input.userMessage}`) >= 3) {
      return NextResponse.json(finalizeStage(input, { message: "" }));
    }

    const provider = getAiProvider();
    const result = await provider.stageReply(input);

    return NextResponse.json(finalizeStage(input, result));
  } catch (error) {
    console.error("[api/stage]", error);
    return NextResponse.json({ error: "stage failed" }, { status: 500 });
  }
}
