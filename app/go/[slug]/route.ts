import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { readUtmFromSearchParams } from "@/lib/tracking/utm";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const supabase = createAdminClient();
  const url = new URL(request.url);

  const { data: tool } = await supabase
    .from("tools")
    .select("id, affiliate_url, slug")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!tool?.affiliate_url) {
    return NextResponse.redirect(new URL("/herramientas", url.origin), 302);
  }

  await supabase.from("affiliate_clicks").insert({
    tool_id: tool.id,
    destination_url: tool.affiliate_url,
    landing_path: url.pathname,
    referrer_url: request.headers.get("referer"),
    user_agent: request.headers.get("user-agent"),
    ...readUtmFromSearchParams(url.searchParams),
  });

  return NextResponse.redirect(tool.affiliate_url, 302);
}