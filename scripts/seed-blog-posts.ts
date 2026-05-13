import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { createClient } from "@supabase/supabase-js";
import { blogPostsSeed } from "../lib/data/blog-posts-seed";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const payload = blogPostsSeed.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content.trim(),
    author: post.author,
    hero_image_url: null,
    published_at: post.publishedAt,
    seo_title: post.seoTitle,
    seo_description: post.seoDescription,
    seo_keywords: post.seoKeywords,
    is_featured: post.isFeatured,
  }));

  const { error } = await supabase.from("blog_posts").upsert(payload, { onConflict: "slug" });
  if (error) throw error;

  console.log(`Blog posts publicados: ${payload.length}`);
}

main().catch((error) => {
  console.error("Error cargando posts del blog:");
  console.error(error);
  process.exit(1);
});
