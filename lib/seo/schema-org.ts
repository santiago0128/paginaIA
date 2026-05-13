import type { DbTool, DbComparison } from "@/lib/supabase/db";

export function buildOrganizationSchema(input: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: input.name,
    url: input.url,
  };
}

export function buildSoftwareApplicationSchema(tool: DbTool, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.short_description ?? undefined,
    url: `${siteUrl}/herramientas/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: tool.platforms?.join(", ") || "Web",
    offers: tool.starting_price != null
      ? {
          "@type": "Offer",
          price: tool.starting_price,
          priceCurrency: tool.currency ?? "USD",
        }
      : tool.pricing_model === "freemium"
      ? { "@type": "Offer", price: 0, priceCurrency: "USD" }
      : undefined,
    aggregateRating:
      tool.rating_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: tool.rating_avg,
            bestRating: 5,
            worstRating: 1,
            ratingCount: tool.rating_count,
          }
        : undefined,
  };
}

export function buildComparisonArticleSchema(
  comparison: DbComparison,
  siteUrl: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title ?? undefined,
    description: comparison.description ?? undefined,
    url: `${siteUrl}/comparar/${comparison.slug}`,
    author: {
      "@type": "Organization",
      name: "Noxis",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Noxis",
      url: siteUrl,
    },
  };
}

export function buildBlogPostSchema(post: {
  title: string;
  excerpt: string | null;
  slug: string;
  author: string | null;
  published_at: string | null;
}, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.published_at ?? undefined,
    author: post.author
      ? { "@type": "Person", name: post.author }
      : { "@type": "Organization", name: "Noxis" },
    publisher: {
      "@type": "Organization",
      name: "Noxis",
      url: siteUrl,
    },
  };
}
