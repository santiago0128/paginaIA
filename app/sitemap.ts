import type { MetadataRoute } from "next";
import { buildUrl } from "@/lib/config/brand";
import { getSitemapData } from "@/lib/supabase/db";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: buildUrl("/"), lastModified: new Date(), priority: 1.0, changeFrequency: "daily" },
  { url: buildUrl("/herramientas"), lastModified: new Date(), priority: 0.9, changeFrequency: "daily" },
  { url: buildUrl("/noticias"), lastModified: new Date(), priority: 0.85, changeFrequency: "daily" },
  { url: buildUrl("/foro"), lastModified: new Date(), priority: 0.85, changeFrequency: "daily" },
  { url: buildUrl("/blog"), lastModified: new Date(), priority: 0.7, changeFrequency: "weekly" },
  { url: buildUrl("/privacidad"), lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
  { url: buildUrl("/terminos"), lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
  { url: buildUrl("/cookies"), lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
  { url: buildUrl("/afiliados"), lastModified: new Date(), priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { tools, comparisons, categories, blogPosts, forumPosts } = await getSitemapData();

  const toolRoutes: MetadataRoute.Sitemap = tools.map((t) => ({
    url: buildUrl(`/herramientas/${t.slug}`),
    lastModified: new Date(t.updated_at),
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: buildUrl(`/comparar/${c.slug}`),
    lastModified: new Date(c.updated_at),
    priority: 0.85,
    changeFrequency: "weekly",
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: buildUrl(`/categoria/${c.slug}`),
    lastModified: new Date(c.updated_at),
    priority: 0.7,
    changeFrequency: "weekly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: buildUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.published_at),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  const forumRoutes: MetadataRoute.Sitemap = forumPosts.map((p) => ({
    url: buildUrl(`/foro/${p.slug}`),
    lastModified: new Date(p.published_at),
    priority: 0.75,
    changeFrequency: "weekly",
  }));

  return [
    ...STATIC_ROUTES,
    ...comparisonRoutes,
    ...toolRoutes,
    ...categoryRoutes,
    ...forumRoutes,
    ...blogRoutes,
  ];
}
