import { createAdminClient } from "@/lib/supabase/admin";
import { getDailyNews } from "@/lib/news/rss";
import { generateForumPostFromNews } from "@/lib/openai/forum";

export type CreatedForumPost = {
  slug: string;
  title: string;
  created: boolean;
};

function dailyForumSlug(date = new Date()): string {
  const dateKey = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return `radar-ia-tecnologia-${dateKey}`;
}

export async function createDailyForumPost(): Promise<CreatedForumPost> {
  const supabase = createAdminClient();
  const slug = dailyForumSlug();
  const { data: existing, error: existingError } = await supabase
    .from("forum_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existingError) {
    throw new Error(`No se pudo leer la tabla forum_posts: ${existingError.message}`);
  }

  const news = await getDailyNews(12);
  const draft = await generateForumPostFromNews(news);
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("forum_posts")
    .upsert(
      {
        slug,
        title: draft.title,
        excerpt: draft.excerpt,
        content: draft.content,
        author_name: "Noxis Radar",
        author_type: "ai",
        topic: draft.topic,
        source_urls: draft.sourceUrls,
        source_titles: draft.sourceTitles,
        status: "published",
        published_at: now,
      },
      { onConflict: "slug" }
    )
    .select("slug, title")
    .single();

  if (error) {
    throw new Error(`No se pudo guardar la publicación del foro: ${error.message}`);
  }

  return {
    slug: data?.slug ?? slug,
    title: data?.title ?? draft.title,
    created: !existing,
  };
}
