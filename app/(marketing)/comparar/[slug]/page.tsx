import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { brand, buildUrl } from "@/lib/config/brand";
import { getComparisonBySlug } from "@/lib/supabase/db";
import { RatingStars } from "@/components/tools/RatingStars";
import { buildComparisonArticleSchema } from "@/lib/seo/schema-org";
import type { DbComparison, DbTool } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getComparisonBySlug(params.slug);
  if (!data) return { title: "Comparativa no encontrada" };
  const { comparison } = data;
  return {
    title: comparison.seo_title ?? `${comparison.title}: ¿Cuál es mejor?`,
    description: comparison.seo_description ?? comparison.description ?? undefined,
    alternates: { canonical: buildUrl(`/comparar/${params.slug}`) },
  };
}

function formatPricingModel(model: string | null): string {
  const map: Record<string, string> = {
    suscripcion: "Suscripción",
    freemium: "Freemium",
    opensource: "Open Source",
    add_on: "Add-on",
    incluido_en_suscripcion: "Incluido en suscripción",
  };
  return model ? (map[model] ?? model) : "N/D";
}

function priceLabel(tool: DbTool): string {
  if (tool.starting_price != null) return `$${tool.starting_price}/mes`;
  if (tool.pricing_model === "freemium") return "Gratis disponible";
  if (tool.pricing_model === "opensource") return "Open Source / gratis";
  if (tool.pricing_model === "incluido_en_suscripcion") return "Incluido en suscripción";
  return "Ver precios";
}

function trialLabel(tool: DbTool): string {
  if (tool.trial_days == null) return "No";
  return `${tool.trial_days} días`;
}

function formatList(items: string[] | null | undefined, limit?: number): string {
  const values = (items ?? []).filter(Boolean);
  const visible = typeof limit === "number" ? values.slice(0, limit) : values;
  return visible.length > 0 ? visible.join(", ") : "—";
}

function formatCompactList(items: string[] | null | undefined, limit: number): string {
  const values = (items ?? []).filter(Boolean).slice(0, limit);
  return values.length > 0 ? values.join(" · ") : "—";
}

function normalizeItem(item: string): string {
  return item.toLocaleLowerCase("es").replace(/\s+/g, " ").trim();
}

function getSharedItems(
  left: string[] | null | undefined,
  right: string[] | null | undefined,
  limit = 6,
): string[] {
  const rightSet = new Set((right ?? []).map(normalizeItem));
  return (left ?? []).filter((item) => rightSet.has(normalizeItem(item))).slice(0, limit);
}

function getUniqueItems(
  source: string[] | null | undefined,
  other: string[] | null | undefined,
  limit = 6,
): string[] {
  const otherSet = new Set((other ?? []).map(normalizeItem));
  return (source ?? []).filter((item) => !otherSet.has(normalizeItem(item))).slice(0, limit);
}

function comparisonNote(comparison: DbComparison): string | null {
  const notes = comparison.comparison_data?.notes;
  return typeof notes === "string" ? notes : comparison.description;
}

function ToolColumn({ tool }: { tool: DbTool }) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
      {tool.categories && (
        <span className="text-xs font-medium text-cyan-400">{tool.categories.name}</span>
      )}
      <h2 className="mt-1 text-2xl font-semibold text-white">{tool.name}</h2>
      <div className="mt-2">
        <RatingStars rating={tool.rating_avg} count={tool.rating_count} />
      </div>
      <p className="mt-3 flex-1 text-sm text-slate-300">{tool.short_description}</p>
      {tool.best_for && (
        <p className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-sm leading-6 text-slate-200">
          <span className="font-medium text-cyan-300">Ideal para: </span>
          {tool.best_for}
        </p>
      )}
      <p className="mt-4 text-sm text-slate-400">
        {tool.starting_price != null
          ? `Desde $${tool.starting_price}/mes`
          : tool.pricing_model === "freemium"
          ? "Gratis disponible"
          : "Ver precios"}
      </p>
      <div className="mt-5 flex gap-2">
        <Link
          href={`/herramientas/${tool.slug}`}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          Ver ficha
        </Link>
        {tool.affiliate_url ? (
          <Link
            href={`/go/${tool.slug}`}
            className="flex items-center gap-1 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ir <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <a
            href={tool.website_url ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/10"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

function ChoiceCard({ tool }: { tool: DbTool }) {
  const reasons = (tool.use_cases ?? []).slice(0, 3);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">
        Elige {tool.name} si...
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {tool.best_for ?? tool.short_description}
      </p>
      {reasons.length > 0 && (
        <ul className="mt-4 space-y-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-start gap-2 text-sm text-slate-300">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
              {reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FeatureListCard({
  title,
  items,
  accent = "cyan",
}: {
  title: string;
  items: string[];
  accent?: "cyan" | "green" | "amber";
}) {
  const accentClass = {
    cyan: "text-cyan-400",
    green: "text-green-400",
    amber: "text-amber-300",
  }[accent];

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className={`text-sm font-semibold ${accentClass}`}>{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
            <Check className={`mt-1 h-3.5 w-3.5 shrink-0 ${accentClass}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolAnalysis({ tool }: { tool: DbTool }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        {tool.long_description ?? tool.short_description}
      </p>
    </div>
  );
}

export default async function ComparisonPage({ params }: Props) {
  const data = await getComparisonBySlug(params.slug);
  if (!data) notFound();

  const { comparison, tool1, tool2 } = data;
  const jsonLd = buildComparisonArticleSchema(comparison, brand.siteUrl);
  const note = comparisonNote(comparison);
  const sharedFeatures = getSharedItems(tool1.features, tool2.features);
  const tool1UniqueFeatures = getUniqueItems(tool1.features, tool2.features);
  const tool2UniqueFeatures = getUniqueItems(tool2.features, tool1.features);
  const hasFeatureComparison =
    sharedFeatures.length > 0 || tool1UniqueFeatures.length > 0 || tool2UniqueFeatures.length > 0;

  const tableRows = [
    {
      label: "Mejor para",
      v1: tool1.best_for ?? "—",
      v2: tool2.best_for ?? "—",
    },
    {
      label: "Punto fuerte",
      v1: tool1.pros?.[0] ?? "—",
      v2: tool2.pros?.[0] ?? "—",
    },
    {
      label: "Limitación principal",
      v1: tool1.cons?.[0] ?? "—",
      v2: tool2.cons?.[0] ?? "—",
    },
    {
      label: "Modelo de precio",
      v1: formatPricingModel(tool1.pricing_model),
      v2: formatPricingModel(tool2.pricing_model),
    },
    {
      label: "Precio base",
      v1: priceLabel(tool1),
      v2: priceLabel(tool2),
    },
    {
      label: "Prueba gratis",
      v1: trialLabel(tool1),
      v2: trialLabel(tool2),
    },
    {
      label: "Rating",
      v1: `${tool1.rating_avg.toFixed(1)} / 5`,
      v2: `${tool2.rating_avg.toFixed(1)} / 5`,
    },
    {
      label: "Categoría",
      v1: tool1.categories?.name ?? "—",
      v2: tool2.categories?.name ?? "—",
    },
    {
      label: "Funciones clave",
      v1: formatCompactList(tool1.features, 5),
      v2: formatCompactList(tool2.features, 5),
    },
    {
      label: "Casos de uso",
      v1: formatCompactList(tool1.use_cases, 4),
      v2: formatCompactList(tool2.use_cases, 4),
    },
    {
      label: "Plataformas",
      v1: formatList(tool1.platforms),
      v2: formatList(tool2.platforms),
    },
    {
      label: "Idiomas",
      v1: formatList(tool1.languages),
      v2: formatList(tool2.languages),
    },
    {
      label: "Integraciones",
      v1: formatList(tool1.integrations, 6),
      v2: formatList(tool2.integrations, 6),
    },
  ];

  return (
    <article className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="mb-12 text-center">
        <p className="mb-3 text-sm text-slate-500">Comparativa</p>
        <h1 className="text-4xl font-semibold text-white">{comparison.title}</h1>
        {note && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {note}
          </p>
        )}
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
          Analizamos precio, funciones, casos de uso, ventajas y límites para ayudarte a decidir cuál encaja mejor con tu flujo de trabajo.
        </p>
      </header>

      {/* Columnas lado a lado */}
      <div className="mb-12 grid gap-6 sm:grid-cols-2">
        <ToolColumn tool={tool1} />
        <ToolColumn tool={tool2} />
      </div>

      <section className="mb-12">
        <div className="mb-5 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
            Veredicto rápido
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            La mejor elección depende del trabajo que necesitas resolver
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ChoiceCard tool={tool1} />
          <ChoiceCard tool={tool2} />
        </div>
      </section>

      {/* Tabla comparativa */}
      <div className="mb-12 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-3 text-left font-medium text-slate-400">Atributo</th>
                <th className="px-6 py-3 text-left font-semibold text-white">{tool1.name}</th>
                <th className="px-6 py-3 text-left font-semibold text-white">{tool2.name}</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-white/5 last:border-0 ${i % 2 !== 0 ? "bg-white/[0.02]" : ""}`}
                >
                  <td className="w-[22%] px-6 py-4 align-top text-slate-400">{row.label}</td>
                  <td className="w-[39%] px-6 py-4 align-top leading-6 text-white">{row.v1}</td>
                  <td className="w-[39%] px-6 py-4 align-top leading-6 text-white">{row.v2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-semibold text-white">Análisis rápido</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <ToolAnalysis tool={tool1} />
          <ToolAnalysis tool={tool2} />
        </div>
      </section>

      {hasFeatureComparison && (
        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-semibold text-white">Funciones y diferencias clave</h2>
          <div className="grid gap-5 lg:grid-cols-3">
            <FeatureListCard title="Funciones en común" items={sharedFeatures} accent="green" />
            <FeatureListCard title={`Diferenciales de ${tool1.name}`} items={tool1UniqueFeatures} />
            <FeatureListCard title={`Diferenciales de ${tool2.name}`} items={tool2UniqueFeatures} accent="amber" />
          </div>
        </section>
      )}

      {/* Pros/Contras por herramienta */}
      <div className="mb-12 grid gap-8 sm:grid-cols-2">
        {[tool1, tool2].map((tool) => (
          <div key={tool.slug}>
            <h3 className="mb-4 text-lg font-semibold text-white">{tool.name}</h3>
            <div className="space-y-4">
              {tool.pros?.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-green-400">
                    Ventajas
                  </p>
                  <ul className="space-y-1.5">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.cons?.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-red-400">
                    Desventajas
                  </p>
                  <ul className="space-y-1.5">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="mb-12 grid gap-4 sm:grid-cols-2">
        {[tool1, tool2].map((tool) => (
          <div key={tool.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Profundiza en {tool.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Revisa la ficha completa para ver descripción, casos de uso, plataformas y enlaces oficiales.
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link
                href={`/herramientas/${tool.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ver ficha <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              {tool.affiliate_url ? (
                <Link
                  href={`/go/${tool.slug}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Ir a {tool.name} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <a
                  href={tool.website_url ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Visitar <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-500">{brand.monetization.disclosure}</p>
    </article>
  );
}
