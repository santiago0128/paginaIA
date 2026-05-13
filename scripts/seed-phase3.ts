import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { createClient } from "@supabase/supabase-js";
import {
  phase3CategoriesSeed,
  phase3ComparisonsSeed,
  phase3ToolsSeed,
} from "../lib/data/phase-3-seed";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function scoreToRating(seoPriority: number, monetizationPriority: number, productValue: number) {
  const score = 0.4 * seoPriority + 0.2 * monetizationPriority + 0.4 * productValue;
  return Number((Math.min(5, score / 2)).toFixed(2));
}

async function seedCategories() {
  const payload = phase3CategoriesSeed.map((category, idx) => ({
    name: category.name,
    slug: category.slug,
    description: category.description,
    sort_order: idx,
    is_featured: idx < 5,
    seo_title: `${category.name}: herramientas de IA`,
    seo_description: category.description,
  }));

  const { error } = await supabase.from("categories").upsert(payload, { onConflict: "slug" });
  if (error) throw error;

  const { data, error: readError } = await supabase.from("categories").select("id,slug");
  if (readError) throw readError;

  const bySlug = new Map<string, string>();
  for (const row of data ?? []) bySlug.set(row.slug, row.id);
  return bySlug;
}

async function seedTools(categoryBySlug: Map<string, string>) {
  const payload = phase3ToolsSeed.map((tool, idx) => {
    const categoryId = categoryBySlug.get(tool.category.slug);
    if (!categoryId) {
      throw new Error(`Categoria no encontrada para ${tool.slug}: ${tool.category.slug}`);
    }

    return {
      category_id: categoryId,
      name: tool.name,
      slug: tool.slug,
      short_description: tool.shortDescription,
      long_description: tool.longDescription,
      website_url: tool.websiteUrl,
      logo_url: null,
      hero_image_url: null,
      accent_color: null,
      pricing_model: tool.pricingModel ?? null,
      starting_price: tool.startingPrice,
      currency: tool.currency ?? "USD",
      affiliate_url: tool.affiliateUrl ?? null,
      affiliate_program: tool.affiliateProgram ?? null,
      trial_days: tool.trialDays ?? null,
      best_for: tool.bestFor ?? null,
      pros: tool.pros,
      cons: tool.cons,
      use_cases: tool.useCases,
      platforms: tool.platforms,
      languages: tool.languages,
      features: tool.features,
      integrations: tool.integrations ?? [],
      rating_avg: scoreToRating(tool.seoPriority, tool.monetizationPriority, tool.productValue),
      rating_count: 1,
      comparison_count: 0,
      is_featured: idx < 10,
      is_affiliate: Boolean(tool.affiliateUrl),
      status: "published",
      seo_title: `${tool.name}: precio, planes y comparativa`,
      seo_description: tool.shortDescription,
      schema_json: {
        sourceNotes: tool.sourceNotes,
        seoPriority: tool.seoPriority,
        monetizationPriority: tool.monetizationPriority,
        productValue: tool.productValue,
        availability: tool.availability,
      },
    };
  });

  const { error } = await supabase.from("tools").upsert(payload, { onConflict: "slug" });
  if (error) throw error;

  const { data, error: readError } = await supabase.from("tools").select("id,slug");
  if (readError) throw readError;

  const bySlug = new Map<string, string>();
  for (const row of data ?? []) bySlug.set(row.slug, row.id);
  return bySlug;
}

async function seedComparisons(toolBySlug: Map<string, string>) {
  const payload: Array<{
    tool1_id: string;
    tool2_id: string;
    slug: string;
    title: string;
    description: string;
    comparison_data: { seoPriority: number; monetizationPriority: number; notes: string };
    seo_title: string;
    seo_description: string;
    rating_avg: number;
  }> = [];

  for (const comparison of phase3ComparisonsSeed) {
    const tool1Id = toolBySlug.get(comparison.leftToolSlug);
    const tool2Id = toolBySlug.get(comparison.rightToolSlug);
    if (!tool1Id || !tool2Id || tool1Id === tool2Id) continue;

    payload.push({
      tool1_id: tool1Id,
      tool2_id: tool2Id,
      slug: comparison.slug,
      title: comparison.title,
      description: comparison.notes,
      comparison_data: {
        seoPriority: comparison.seoPriority,
        monetizationPriority: comparison.monetizationPriority,
        notes: comparison.notes,
      },
      seo_title: `${comparison.title}: comparativa completa`,
      seo_description: comparison.notes,
      rating_avg: Number((Math.min(5, comparison.seoPriority / 2)).toFixed(2)),
    });
  }

  if (!payload.length) return;
  const { error } = await supabase.from("comparisons").upsert(payload, { onConflict: "slug" });
  if (error) throw error;
}

async function main() {
  const categoryBySlug = await seedCategories();
  const toolBySlug = await seedTools(categoryBySlug);
  await seedComparisons(toolBySlug);

  console.log("Seed Fase 3 completado.");
  console.log(`Categorias: ${phase3CategoriesSeed.length}`);
  console.log(`Herramientas: ${phase3ToolsSeed.length}`);
  console.log(`Comparativas: ${phase3ComparisonsSeed.length}`);
}

main().catch((error) => {
  console.error("Error en seed Fase 3:");
  console.error(error);
  process.exit(1);
});
