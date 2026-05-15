import { NextRequest, NextResponse } from "next/server";
import { createDailyForumPost } from "@/lib/forum/posts";

export const dynamic = "force-dynamic";



async function handleRequest(request: NextRequest) {
  

  try {
    const post = await createDailyForumPost();
    return NextResponse.json({ ok: true, post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo generar la publicación.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
