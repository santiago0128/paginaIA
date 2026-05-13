import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { buildUrl } from "@/lib/config/brand";
import { getBlogPostBySlug } from "@/lib/supabase/db";
import { buildBlogPostSchema } from "@/lib/seo/schema-org";
import { brand } from "@/lib/config/brand";
import { env } from "@/lib/config/env";
import { AdSlot } from "@/components/monetization/AdSlot";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post no encontrado" };
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    alternates: { canonical: buildUrl(`/blog/${post.slug}`) },
    openGraph: {
      title: post.seo_title ?? post.title,
      description: post.seo_description ?? post.excerpt ?? undefined,
      type: "article",
      publishedTime: post.published_at ?? undefined,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = buildBlogPostSchema(post, brand.siteUrl);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        {post.published_at && (
          <p className="mb-3 text-sm text-slate-500">
            {formatDate(post.published_at)}
            {post.author && ` · por ${post.author}`}
          </p>
        )}
        <h1 className="text-4xl font-semibold leading-tight text-white">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-4 text-lg text-slate-300">{post.excerpt}</p>
        )}
      </header>

      {/* Content */}
      {post.content ? (
        <div
          className="prose prose-invert prose-slate max-w-none prose-headings:font-semibold prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <p className="text-slate-400">Contenido no disponible.</p>
      )}

      <AdSlot slot={env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG} />
    </article>
  );
}
