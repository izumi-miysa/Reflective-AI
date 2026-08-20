import { NextResponse } from "next/server";
import { getAiProvider } from "@/lib/ai/provider";
import { finalizeReflect } from "@/lib/crisis/apply";
import type { ReflectRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReflectRequest;

    if (!body.writing?.trim()) {
      return NextResponse.json(
        { error: "writing is required" },
        { status: 400 },
      );
    }

    const input: ReflectRequest = {
      writing: body.writing,
      stageMessages: body.stageMessages ?? [],
      personLabel: body.personLabel ?? null,
      reflectRound: body.reflectRound ?? 0,
      previousReflectorMessages: body.previousReflectorMessages,
    };

    const provider = getAiProvider();
    const result = await provider.reflect(input);

    return NextResponse.json(finalizeReflect(input, result));
  } catch (error) {
    console.error("[api/reflect]", error);
    const detail =
      error instanceof Error ? error.message : "reflect failed";
    return NextResponse.json({ error: "reflect failed", detail }, { status: 500 });
  }
}
