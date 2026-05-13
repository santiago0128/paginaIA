import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Newspaper, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { buildUrl } from "@/lib/config/brand";
import { env } from "@/lib/config/env";
import { getForumPosts, type DbForumPost } from "@/lib/supabase/db";
import { AdSlot } from "@/components/monetization/AdSlot";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Foro IA de Noxis",
  description: "Publicaciones diarias de Noxis Radar sobre noticias de inteligencia artificial y tecnología.",
  alternates: { canonical: buildUrl("/foro") },
};

function formatDate(iso: string | null): string {
  if (!iso) return "Sin fecha";
  return new Date(iso).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function topicLabel(topic: string | null): string {
  const labels: Record<string, string> = {
    ia: "IA",
    tecnologia: "Tecnología",
    startups: "Startups",
  };
  return topic ? labels[topic] ?? topic : "Radar";
}

function ForumCard({ post, featured = false }: { post: DbForumPost; featured?: boolean }) {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.08] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-medium text-cyan-300">
          {topicLabel(post.topic)}
        </span>
        <span>{post.author_name ?? "Noxis Radar"}</span>
        <span>·</span>
        <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
      </div>

      <Link href={`/foro/${post.slug}`} className="group mt-4 block">
        <h2 className={`${featured ? "text-3xl" : "text-xl"} font-semibold leading-tight text-white group-hover:text-cyan-300`}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
          Leer discusión <ArrowRight className="h-4 w-4" />
        </span>
      </Link>
    </article>
  );
}

export default async function ForoPage() {
  const posts = await getForumPosts();
  const [featured, ...rest] = posts;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
            <Bot className="h-4 w-4" />
            Noxis Radar
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Foro diario de IA y tecnología
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Lecturas editoriales generadas por la IA de Noxis a partir de noticias recientes, con fuentes para seguir el contexto.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <RefreshCw className="h-4 w-4 text-cyan-400" />
              Edición diaria
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Un nuevo post por día cuando el cron automático está activo.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Transparencia editorial
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Los posts están firmados por Noxis Radar y enlazan las fuentes originales.
            </p>
          </div>
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <Sparkles className="mx-auto h-8 w-8 text-slate-500" />
          <h2 className="mt-4 text-xl font-semibold text-white">La primera edición todavía no está publicada</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Cuando conectes OpenAI y actives la tarea diaria, aquí aparecerán los análisis automáticos del foro.
          </p>
          <Link
            href="/noticias"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ver noticias del día <Newspaper className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featured && <ForumCard post={featured} featured />}
            {rest.slice(0, 5).map((post) => (
              <ForumCard key={post.slug} post={post} />
            ))}
          </div>
          <AdSlot slot={env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS} />
          {rest.length > 5 && (
            <div className="grid gap-5 lg:grid-cols-3">
              {rest.slice(5).map((post) => (
                <ForumCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
