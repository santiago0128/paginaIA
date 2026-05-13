import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildUrl } from "@/lib/config/brand";
import { getBlogPosts } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Análisis y guías de herramientas IA",
  description: "Artículos sobre inteligencia artificial: comparativas, guías de uso, novedades y análisis en español.",
  alternates: { canonical: buildUrl("/blog") },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-white">Blog</h1>
      <p className="mt-2 text-slate-400">
        Análisis, guías y comparativas de herramientas de IA en español.
      </p>

      {posts.length === 0 ? (
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-lg font-medium text-white">Próximamente</p>
          <p className="mt-2 text-slate-400">
            Estamos preparando los primeros artículos. Suscríbete para ser el primero en leerlos.
          </p>
          <Link
            href="/#newsletter"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Suscribirme <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 divide-y divide-white/10">
          {posts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {post.published_at && (
                      <p className="mb-2 text-xs text-slate-500">
                        {formatDate(post.published_at)}
                        {post.author && ` · ${post.author}`}
                      </p>
                    )}
                    <h2 className="text-xl font-semibold text-white transition group-hover:text-cyan-400">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 text-slate-400 leading-7">{post.excerpt}</p>
                    )}
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-600 transition group-hover:text-cyan-400" />
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
