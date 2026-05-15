import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { brand, buildUrl } from "@/lib/config/brand";
import { getFeaturedTools, getPopularComparisons } from "@/lib/supabase/db";
import { ToolCard } from "@/components/tools/ToolCard";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: buildUrl("/") },
  openGraph: {
    url: buildUrl("/"),
    type: "website",
  },
};

export default async function Home() {
  const [tools, comparisons] = await Promise.all([
    getFeaturedTools(),
    getPopularComparisons(),
  ]);

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: brand.siteUrl,
    description: brand.seo.defaultDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${brand.siteUrl}/herramientas?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_35%),linear-gradient(180deg,#08111f_0%,#030712_100%)]" />
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col justify-center px-6 py-20 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-200">
              {brand.tagline}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Compara herramientas de IA y elige la mejor para tu caso real.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              {brand.name} centraliza comparativas, precios, pros, contras y fichas de 30+ herramientas de IA en español.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/herramientas"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Explorar herramientas
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/comparar"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Search className="h-4 w-4" />
                Ver comparativa top
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Herramientas destacadas */}
      {tools.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Herramientas destacadas</h2>
            <Link
              href="/herramientas"
              className="flex items-center gap-1 text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              Ver todas <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      )}

      {/* Comparativas populares */}
      {comparisons.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">Comparativas populares</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/comparar/${c.slug}`}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {c.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-10 sm:px-12">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-white">
              Mantente al día con las mejores IA
            </h2>
            <p className="mt-2 text-slate-400">
              Comparativas nuevas, precios actualizados y análisis cada semana. Sin spam.
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
