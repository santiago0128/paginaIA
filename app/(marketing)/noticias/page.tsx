import type { Metadata } from "next";
import { ArrowRight, ExternalLink, Newspaper, RefreshCw, Search } from "lucide-react";
import { buildUrl } from "@/lib/config/brand";
import { env } from "@/lib/config/env";
import { getDailyNews, type NewsItem, type NewsTopic } from "@/lib/news/rss";
import { AdSlot } from "@/components/monetization/AdSlot";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Noticias de IA y tecnología",
  description: "Noticias diarias sobre inteligencia artificial, tecnología, startups, software y tendencias digitales.",
  alternates: { canonical: buildUrl("/noticias") },
};

type Props = {
  searchParams?: {
    tema?: string;
  };
};

const TOPICS: Array<{ label: string; value: "todo" | NewsTopic; href: string }> = [
  { label: "Todo", value: "todo", href: "/noticias" },
  { label: "IA", value: "ia", href: "/noticias?tema=ia" },
  { label: "Tecnología", value: "tecnologia", href: "/noticias?tema=tecnologia" },
  { label: "Startups", value: "startups", href: "/noticias?tema=startups" },
];

function formatDate(iso: string | null): string {
  if (!iso) return "Fecha no disponible";
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function topicLabel(topic: NewsTopic): string {
  const map: Record<NewsTopic, string> = {
    ia: "IA",
    tecnologia: "Tecnología",
    startups: "Startups",
  };
  return map[topic];
}

function filterNews(items: NewsItem[], topic: string | undefined): NewsItem[] {
  if (!topic || topic === "todo") return items;
  if (!["ia", "tecnologia", "startups"].includes(topic)) return items;
  return items.filter((item) => item.topic === topic);
}

function NewsCard({ item, featured = false }: { item: NewsItem; featured?: boolean }) {
  return (
    <article
      className={`rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.08] ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-medium text-cyan-300">
          {topicLabel(item.topic)}
        </span>
        <span>{item.source}</span>
        <span>·</span>
        <time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt)}</time>
      </div>
      <h2 className={`${featured ? "mt-4 text-2xl" : "mt-3 text-lg"} font-semibold leading-tight text-white`}>
        {item.title}
      </h2>
      {item.excerpt && (
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{item.excerpt}</p>
      )}
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
      >
        Leer noticia <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </article>
  );
}

export default async function NoticiasPage({ searchParams }: Props) {
  const selectedTopic = searchParams?.tema ?? "todo";
  const news = filterNews(await getDailyNews(), selectedTopic);
  const [featured, ...rest] = news;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-cyan-400">
            <Newspaper className="h-4 w-4" />
            Noticias diarias
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Noticias de IA y tecnología para volver todos los días
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Un resumen actualizado de inteligencia artificial, software, startups, chips, ciberseguridad y tendencias digitales.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-white">
            <RefreshCw className="h-4 w-4 text-cyan-400" />
            Actualización diaria
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Cada 24 horas se consulta una nueva edición con noticias publicadas durante el último día.
          </p>
        </div>
      </header>

      <div className="mt-10 flex flex-wrap gap-2">
        {TOPICS.map((topic) => {
          const active = selectedTopic === topic.value || (!selectedTopic && topic.value === "todo");
          return (
            <a
              key={topic.value}
              href={topic.href}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-cyan-400 bg-cyan-400 text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {topic.label}
            </a>
          );
        })}
      </div>

      {news.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
          <Search className="mx-auto h-8 w-8 text-slate-500" />
          <h2 className="mt-4 text-xl font-semibold text-white">No pudimos cargar noticias ahora</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Vuelve a intentar más tarde. La siguiente edición diaria se genera cuando el feed público vuelva a responder.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {featured && <NewsCard item={featured} featured />}
            {rest.slice(0, 8).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
          <AdSlot slot={env.NEXT_PUBLIC_ADSENSE_SLOT_NEWS} />
          <div className="grid gap-4 lg:grid-cols-3">
            {rest.slice(8).map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      <div className="mt-14 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-8">
        <h2 className="text-2xl font-semibold text-white">Siguiente paso natural</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Si esta sección empieza a recibir visitas, el foro puede crecer encima de noticias concretas: comentarios por noticia, votos, guardados y discusiones por tema.
        </p>
        <a
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Ver análisis del blog <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
