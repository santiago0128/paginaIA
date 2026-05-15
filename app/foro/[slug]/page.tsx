import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bot, ExternalLink, Newspaper, ShieldCheck } from "lucide-react";
import { brand, buildUrl } from "@/lib/config/brand";
import { env } from "@/lib/config/env";
import { getForumPostBySlug } from "@/lib/supabase/db";
import { AdSlot } from "@/components/monetization/AdSlot";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getForumPostBySlug(params.slug);
  if (!post) return { title: "Publicación no encontrada" };

  const ogImage = { url: brand.seo.ogImage, width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: buildUrl(`/foro/${post.slug}`) },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      url: buildUrl(`/foro/${post.slug}`),
      siteName: brand.name,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? undefined,
      images: [brand.seo.ogImage],
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "Sin fecha";
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderBlock(block: string, index: number) {
  const trimmed = block.trim();

  if (trimmed.startsWith("## ")) {
    return (
      <h2 key={index} className="mt-10 text-2xl font-semibold text-white">
        {trimmed.replace(/^##\s+/, "")}
      </h2>
    );
  }

  const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul key={index} className="my-6 space-y-3 text-slate-300">
        {lines.map((line) => (
          <li key={line} className="flex gap-3 leading-7">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            <span>{line.replace(/^-\s+/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="leading-8 text-slate-300">
      {trimmed}
    </p>
  );
}

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block, index) => renderBlock(block, index));
}

export default async function ForumPostPage({ params }: Props) {
  const post = await getForumPostBySlug(params.slug);
  if (!post) notFound();

  const sourceUrls = post.source_urls ?? [];
  const sourceTitles = post.source_titles ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt ?? undefined,
    url: buildUrl(`/foro/${post.slug}`),
    datePublished: post.published_at ?? undefined,
    author: { "@type": "Organization", name: brand.name, url: brand.siteUrl },
    publisher: { "@type": "Organization", name: brand.name, url: brand.siteUrl },
  };

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/foro"
        className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Foro
      </Link>

      <header className="border-b border-white/10 pb-10">
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-400">
          <Bot className="h-4 w-4" />
          {post.author_name ?? "Noxis Radar"}
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">{post.title}</h1>
        {post.excerpt && (
          <p className="mt-5 text-lg leading-8 text-slate-300">{post.excerpt}</p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
          <span>·</span>
          <span>Publicación generada con IA editorial de Noxis</span>
        </div>
      </header>

      <div className="mt-10 space-y-6">
        {post.content ? renderContent(post.content) : (
          <p className="text-slate-400">Contenido no disponible.</p>
        )}
      </div>

      <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
          <Newspaper className="h-5 w-5 text-cyan-400" />
          Fuentes consultadas
        </h2>
        {sourceUrls.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">Fuentes no disponibles.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {sourceUrls.map((url, index) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-sm leading-6 text-cyan-400 transition hover:text-cyan-300"
                >
                  <span>{sourceTitles[index] ?? url}</span>
                  <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <AdSlot slot={env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS} />

      <aside className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-6">
        <p className="flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Nota editorial
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Esta publicación fue generada por Noxis Radar a partir de fuentes públicas recientes. Úsala como punto de partida y revisa las fuentes originales antes de tomar decisiones.
        </p>
      </aside>
    </article>
  );
}
