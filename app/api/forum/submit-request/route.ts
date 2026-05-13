import { NextRequest, NextResponse } from "next/server";

/**
 * ⚠️ ENDPOINT DESHABILITADO
 * 
 * Las peticiones de usuarios al foro han sido deshabilitadas.
 * Los posts se generan automáticamente mediante:
 * - Cron diario: POST /api/cron/forum?secret=FORUM_CRON_SECRET
 * - Generación bajo demanda: POST /api/forum/generate?secret=API_SECRET_KEY
 * 
 * Para uso interno, usa /api/forum/generate con autenticación.
 */

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      error: "Endpoint deshabilitado. Los posts del foro se generan automáticamente.",
      info: "Usa POST /api/forum/generate con autenticación para generar posts bajo demanda.",
    },
    { status: 403 }
  );
}

export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      error: "Endpoint deshabilitado. Los posts del foro se generan automáticamente.",
      info: "Usa POST /api/forum/generate con autenticación para generar posts bajo demanda.",
    },
    { status: 403 }
  );
}
