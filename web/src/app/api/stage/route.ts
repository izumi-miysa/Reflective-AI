import { NextResponse } from "next/server";
import { getAiProvider } from "@/lib/ai/provider";
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

    const provider = getAiProvider();
    const result = await provider.stageReply({
      writing: body.writing ?? "",
      personLabel: body.personLabel,
      stageMessages: body.stageMessages ?? [],
      userMessage: body.userMessage,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/stage]", error);
    return NextResponse.json({ error: "stage failed" }, { status: 500 });
  }
}
