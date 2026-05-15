import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/config/env";
import { createDailyForumPost } from "@/lib/forum/posts";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const header = request.headers.get("authorization") ?? "";
  const bearer = header.replace(/^Bearer\s+/i, "");

  return bearer === secret;
}

async function handleRequest(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "No autorizado." },
      { status: 401 }
    );
  }

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
