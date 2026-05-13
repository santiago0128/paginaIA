import { createAdminClient } from "@/lib/supabase/admin";

export type DbCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  is_featured: boolean;
};

export type DbTool = {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  short_description: string | null;
  long_description: string | null;
  website_url: string | null;
  logo_url: string | null;
  pricing_model: string | null;
  starting_price: number | null;
  currency: string;
  affiliate_url: string | null;
  trial_days: number | null;
  best_for: string | null;
  pros: string[];
  cons: string[];
  use_cases: string[];
  platforms: string[];
  languages: string[];
  features: string[];
  integrations: string[];
  rating_avg: number;
  rating_count: number;
  is_featured: boolean;
  is_affiliate: boolean;
  status: string;
  seo_title: string | null;
  seo_description: string | null;
  categories: { id: string; name: string; slug: string } | null;
};

export type DbComparison = {
  id: string;
  slug: string;
  title: string | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  comparison_data: Record<string, unknown> | null;
};

const TOOL_SELECT = "*, categories(id, name, slug)";

export async function getFeaturedTools(): Promise<DbTool[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tools")
    .select(TOOL_SELECT)
    .eq("status", "published")
    .eq("is_featured", true)
    .order("rating_avg", { ascending: false })
    .limit(10);
  return (data ?? []) as unknown as DbTool[];
}

export async function getTools(opts: {
  category?: string;
  pricing?: string;
  search?: string;
} = {}): Promise<DbTool[]> {
  const supabase = createAdminClient();

  let categoryId: string | null = null;
  if (opts.category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", opts.category)
      .single();
    categoryId = cat?.id ?? null;
    if (!categoryId) return [];
  }

  let query = supabase
    .from("tools")
    .select(TOOL_SELECT)
    .eq("status", "published");

  if (categoryId) query = query.eq("category_id", categoryId);
  if (opts.pricing) query = query.eq("pricing_model", opts.pricing);
  if (opts.search) query = query.ilike("name", `%${opts.search}%`);

  const { data } = await query.order("rating_avg", { ascending: false });
  return (data ?? []) as unknown as DbTool[];
}

export async function getToolBySlug(slug: string): Promise<DbTool | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("tools")
    .select(TOOL_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return (data ?? null) as unknown as DbTool | null;
}

export async function getCategories(): Promise<DbCategory[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, is_featured")
    .order("sort_order", { ascending: true });
  return (data ?? []) as DbCategory[];
}

export async function getComparisonBySlug(slug: string): Promise<{
  comparison: DbComparison;
  tool1: DbTool;
  tool2: DbTool;
} | null> {
  const supabase = createAdminClient();
  const { data: comparison } = await supabase
    .from("comparisons")
    .select("id, slug, title, description, seo_title, seo_description, comparison_data, tool1_id, tool2_id")
    .eq("slug", slug)
    .single();

  if (!comparison) return null;

  const [{ data: t1 }, { data: t2 }] = await Promise.all([
    supabase.from("tools").select(TOOL_SELECT).eq("id", comparison.tool1_id).single(),
    supabase.from("tools").select(TOOL_SELECT).eq("id", comparison.tool2_id).single(),
  ]);

  if (!t1 || !t2) return null;

  return {
    comparison: comparison as DbComparison,
    tool1: t1 as unknown as DbTool,
    tool2: t2 as unknown as DbTool,
  };
}

export async function getToolsByCategory(categorySlug: string): Promise<{
  category: DbCategory;
  tools: DbTool[];
} | null> {
  const supabase = createAdminClient();
  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, is_featured")
    .eq("slug", categorySlug)
    .single();

  if (!category) return null;

  const { data: tools } = await supabase
    .from("tools")
    .select(TOOL_SELECT)
    .eq("status", "published")
    .eq("category_id", category.id)
    .order("rating_avg", { ascending: false });

  return {
    category: category as DbCategory,
    tools: (tools ?? []) as unknown as DbTool[],
  };
}

export async function getPopularComparisons(): Promise<DbComparison[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("comparisons")
    .select("id, slug, title, description, seo_title, seo_description, comparison_data")
    .order("created_at", { ascending: false })
    .limit(6);
  return (data ?? []) as DbComparison[];
}

export async function getAllComparisons(): Promise<DbComparison[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("comparisons")
    .select("id, slug, title, description, seo_title, seo_description, comparison_data")
    .order("title", { ascending: true });
  return (data ?? []) as DbComparison[];
}

export type DbBlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  hero_image_url: string | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  is_featured: boolean;
  view_count: number;
};

export async function getBlogPosts(): Promise<DbBlogPost[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, author, hero_image_url, published_at, seo_title, seo_description, is_featured, view_count")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  return (data ?? []) as DbBlogPost[];
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .not("published_at", "is", null)
    .single();
  return (data ?? null) as DbBlogPost | null;
}

export type DbForumPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  author_name: string | null;
  author_type: string | null;
  topic: string | null;
  source_urls: string[] | null;
  source_titles: string[] | null;
  metadata: Record<string, unknown> | null;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const FORUM_POST_SELECT =
  "id, slug, title, excerpt, content, author_name, author_type, topic, source_urls, source_titles, metadata, status, published_at, created_at, updated_at";

export async function getForumPosts(): Promise<DbForumPost[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("forum_posts")
    .select(FORUM_POST_SELECT)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as DbForumPost[];
}

export async function getForumPostBySlug(slug: string): Promise<DbForumPost | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("forum_posts")
    .select(FORUM_POST_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .single();

  if (error) return null;
  return (data ?? null) as DbForumPost | null;
}

export type DbComparisonLink = {
  slug: string;
  title: string | null;
};

export async function getComparisonsForTool(toolId: string): Promise<DbComparisonLink[]> {
  const supabase = createAdminClient();
  const [{ data: as1 }, { data: as2 }] = await Promise.all([
    supabase
      .from("comparisons")
      .select("slug, title")
      .eq("tool1_id", toolId)
      .limit(4),
    supabase
      .from("comparisons")
      .select("slug, title")
      .eq("tool2_id", toolId)
      .limit(4),
  ]);
  const combined = [...(as1 ?? []), ...(as2 ?? [])];
  return combined.slice(0, 4) as DbComparisonLink[];
}

export async function getAdminStats(): Promise<{
  toolCount: number;
  comparisonCount: number;
  subscriberCount: number;
  clickCount: number;
  recentClicks: { tool_slug: string; referrer: string | null; created_at: string }[];
  recentSubscribers: { email: string; created_at: string }[];
}> {
  const supabase = createAdminClient();
  const [
    { count: toolCount },
    { count: comparisonCount },
    { count: subscriberCount },
    { count: clickCount },
    { data: recentClicks },
    { data: recentSubscribers },
  ] = await Promise.all([
    supabase.from("tools").select("*", { count: "exact", head: true }),
    supabase.from("comparisons").select("*", { count: "exact", head: true }),
    supabase.from("email_subscribers").select("*", { count: "exact", head: true }),
    supabase.from("affiliate_clicks").select("*", { count: "exact", head: true }),
    supabase
      .from("affiliate_clicks")
      .select("tool_id, referrer, created_at, tools(slug)")
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("email_subscribers")
      .select("email, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const clicks = (recentClicks ?? []).map((c: Record<string, unknown>) => ({
    tool_slug: (c.tools as { slug: string } | null)?.slug ?? "—",
    referrer: (c.referrer as string | null) ?? null,
    created_at: c.created_at as string,
  }));

  return {
    toolCount: toolCount ?? 0,
    comparisonCount: comparisonCount ?? 0,
    subscriberCount: subscriberCount ?? 0,
    clickCount: clickCount ?? 0,
    recentClicks: clicks,
    recentSubscribers: (recentSubscribers ?? []) as { email: string; created_at: string }[],
  };
}

export async function getSitemapData(): Promise<{
  tools: { slug: string; updated_at: string }[];
  comparisons: { slug: string; updated_at: string }[];
  categories: { slug: string; updated_at: string }[];
  blogPosts: { slug: string; published_at: string }[];
  forumPosts: { slug: string; published_at: string }[];
}> {
  const supabase = createAdminClient();
  const [
    { data: tools },
    { data: comparisons },
    { data: categories },
    { data: blogPosts },
    { data: forumPosts },
  ] = await Promise.all([
    supabase.from("tools").select("slug, updated_at").eq("status", "published"),
    supabase.from("comparisons").select("slug, updated_at"),
    supabase.from("categories").select("slug, updated_at"),
    supabase.from("blog_posts").select("slug, published_at").not("published_at", "is", null),
    supabase.from("forum_posts").select("slug, published_at").eq("status", "published").not("published_at", "is", null),
  ]);
  return {
    tools: (tools ?? []) as { slug: string; updated_at: string }[],
    comparisons: (comparisons ?? []) as { slug: string; updated_at: string }[],
    categories: (categories ?? []) as { slug: string; updated_at: string }[],
    blogPosts: (blogPosts ?? []) as { slug: string; published_at: string }[],
    forumPosts: (forumPosts ?? []) as { slug: string; published_at: string }[],
  };
}
