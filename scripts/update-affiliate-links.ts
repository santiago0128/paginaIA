import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const affiliateEnvVars: Record<string, string> = {
  jasper: "AFFILIATE_URL_JASPER",
  writesonic: "AFFILIATE_URL_WRITESONIC",
  heygen: "AFFILIATE_URL_HEYGEN",
  synthesia: "AFFILIATE_URL_SYNTHESIA",
  elevenlabs: "AFFILIATE_URL_ELEVENLABS",
  "notion-ai": "AFFILIATE_URL_NOTION",
  canva: "AFFILIATE_URL_CANVA",
  grammarly: "AFFILIATE_URL_GRAMMARLY",
};

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const updates = Object.entries(affiliateEnvVars)
    .map(([slug, envVar]) => ({ slug, url: process.env[envVar]?.trim() }))
    .filter((item): item is { slug: string; url: string } => Boolean(item.url));

  if (updates.length === 0) {
    console.log("No hay enlaces afiliados configurados en variables AFFILIATE_URL_*.");
    return;
  }

  for (const update of updates) {
    const { error } = await supabase
      .from("tools")
      .update({
        affiliate_url: update.url,
        is_affiliate: true,
      })
      .eq("slug", update.slug);

    if (error) throw error;
    console.log(`Afiliado actualizado: ${update.slug}`);
  }
}

main().catch((error) => {
  console.error("Error actualizando enlaces afiliados:");
  console.error(error);
  process.exit(1);
});
