import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Email inválido." },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("email_subscribers").upsert(
    {
      email: parsed.data.email,
      first_name: parsed.data.first_name ?? null,
      utm_source: parsed.data.utm_source ?? null,
      utm_medium: parsed.data.utm_medium ?? null,
      utm_campaign: parsed.data.utm_campaign ?? null,
      status: "subscribed",
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("newsletter insert error:", error.message);
    return NextResponse.json(
      { ok: false, error: "No se pudo guardar el suscriptor." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
