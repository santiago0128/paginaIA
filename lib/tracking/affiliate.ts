import { createAdminClient } from "@/lib/supabase/admin";

export async function recordAffiliateClick(input: {
  toolId: string;
  destinationUrl: string;
  landingPath?: string | null;
  referrerUrl?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  userAgent?: string | null;
  ipHash?: string | null;
  comparisonId?: string | null;
  planId?: string | null;
}) {
  const supabase = createAdminClient();

  return supabase.from("affiliate_clicks").insert({
    tool_id: input.toolId,
    destination_url: input.destinationUrl,
    landing_path: input.landingPath ?? null,
    referrer_url: input.referrerUrl ?? null,
    utm_source: input.utm_source ?? null,
    utm_medium: input.utm_medium ?? null,
    utm_campaign: input.utm_campaign ?? null,
    utm_term: input.utm_term ?? null,
    utm_content: input.utm_content ?? null,
    user_agent: input.userAgent ?? null,
    ip_hash: input.ipHash ?? null,
    comparison_id: input.comparisonId ?? null,
    plan_id: input.planId ?? null,
  });
}