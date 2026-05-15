import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  ExternalLink,
  Globe,
  Languages,
  ListChecks,
  Plug,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { brand, buildUrl } from "@/lib/config/brand";
import { getToolBySlug, getComparisonsForTool } from "@/lib/supabase/db";
import { RatingStars } from "@/components/tools/RatingStars";
import { buildSoftwareApplicationSchema } from "@/lib/seo/schema-org";
import type { DbTool } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug);
  if (!tool) return { title: "Herramienta no encontrada" };
  const title = tool.seo_title ?? `${tool.name}: precio, usos, ventajas y alternativas`;
  const description = tool.seo_description ?? tool.short_description ?? undefined;
  const ogImage = { url: brand.seo.ogImage, width: 1200, height: 630, alt: title };
  return {
    title,
    description,
    alternates: { canonical: buildUrl(`/herramientas/${tool.slug}`) },
    openGraph: {
      title: tool.seo_title ?? tool.name,
      description,
      url: buildUrl(`/herramientas/${tool.slug}`),
      siteName: brand.name,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brand.seo.ogImage],
    },
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
  if (tool.starting_price != null) return `Desde $${tool.starting_price}/mes`;
  if (tool.pricing_model === "freemium") return "Gratis disponible";
  if (tool.pricing_model === "opensource") return "Open Source / gratis";
  if (tool.pricing_model === "incluido_en_suscripcion") return "Incluido en suscripción";
  return "Ver precios en sitio oficial";
}

function trialLabel(tool: DbTool): string {
  if (tool.trial_days == null) return "No indicada";
  return `${tool.trial_days} días`;
}

function listLabel(items: string[] | null | undefined): string {
  const values = (items ?? []).filter(Boolean);
  return values.length > 0 ? values.join(", ") : "No indicado";
}

function websiteLabel(url: string | null): string {
  if (!url) return "No indicado";
  return new URL(url).hostname.replace(/^www\./, "");
}

function StatItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        {icon}
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 text-white">{value}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-wider text-cyan-400">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
      {description && <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>}
    </div>
  );
}

function ListPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "negative";
}) {
  if (items.length === 0) return null;

  const Icon = tone === "positive" ? Check : X;
  const color = tone === "positive" ? "text-green-400" : "text-red-400";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className={`text-sm font-semibold uppercase tracking-wider ${color}`}>{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
            <Icon className={`mt-1 h-4 w-4 shrink-0 ${color}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  if (items.length === 0) return <p className="text-sm text-slate-500">No indicado</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-white/10 py-4 last:border-0 sm:grid-cols-[180px_1fr] sm:gap-8">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-sm leading-6 text-white">{value}</dd>
    </div>
  );
}

export default async function ToolDetailPage({ params }: Props) {
  const tool = await getToolBySlug(params.slug);
  if (!tool) notFound();

  const [jsonLd, relatedComparisons] = await Promise.all([
    Promise.resolve(buildSoftwareApplicationSchema(tool, brand.siteUrl)),
    getComparisonsForTool(tool.id),
  ]);

  const primaryCta = tool.affiliate_url ? `/go/${tool.slug}` : tool.website_url ?? "#";
  const primaryCtaLabel = tool.affiliate_url ? `Ir a ${tool.name}` : `Visitar ${tool.name}`;
  const primaryCtaExternal = !tool.affiliate_url;
  const mainUseCases = (tool.use_cases ?? []).slice(0, 6);
  const topFeatures = (tool.features ?? []).slice(0, 5);

  return (
    <article className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link href="/herramientas" className="transition hover:text-white">
          Herramientas
        </Link>
        <span>/</span>
        {tool.categories && (
          <>
            <a href={`/categoria/${tool.categories.slug}`} className="transition hover:text-white">
              {tool.categories.name}
            </a>
            <span>/</span>
          </>
        )}
        <span className="text-white">{tool.name}</span>
      </nav>

      <header className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          {tool.categories && (
            <span className="text-xs font-medium uppercase tracking-wider text-cyan-400">
              {tool.categories.name}
            </span>
          )}
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {tool.name}
          </h1>
          {tool.short_description && (
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {tool.short_description}
            </p>
          )}
          {tool.best_for && (
            <p className="mt-5 max-w-2xl rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm leading-6 text-slate-200">
              <span className="font-medium text-cyan-300">Ideal para: </span>
              {tool.best_for}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryCtaExternal ? (
              <a
                href={primaryCta}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {primaryCtaLabel} <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={primaryCta}
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {primaryCtaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <Link
              href="/comparar"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ver comparativas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ficha rápida</p>
          <div className="mt-4">
            <RatingStars rating={tool.rating_avg} count={tool.rating_count} />
          </div>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Precio</dt>
              <dd className="mt-1 text-sm text-white">{priceLabel(tool)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Modelo</dt>
              <dd className="mt-1 text-sm text-white">{formatPricingModel(tool.pricing_model)}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-slate-500">Sitio oficial</dt>
              <dd className="mt-1 text-sm text-white">{websiteLabel(tool.website_url)}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        <StatItem
          icon={<Target className="h-4 w-4 text-cyan-400" />}
          label="Mejor uso"
          value={tool.best_for ?? tool.short_description ?? "Uso general de IA"}
        />
        <StatItem
          icon={<BadgeDollarSign className="h-4 w-4 text-green-400" />}
          label="Precio y prueba"
          value={`${priceLabel(tool)} · Prueba: ${trialLabel(tool)}`}
        />
        <StatItem
          icon={<ShieldCheck className="h-4 w-4 text-amber-300" />}
          label="A tener en cuenta"
          value={tool.cons?.[0] ?? "Revisa límites, privacidad y precio antes de usarla en producción."}
        />
      </section>

      <section className="mt-14">
        <SectionHeading
          eyebrow="Resumen"
          title={`Qué ofrece ${tool.name}`}
          description="Una vista práctica para decidir si vale la pena probarla antes de entrar al sitio oficial."
        />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="leading-8 text-slate-300">
              {tool.long_description ?? tool.short_description}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-white">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Capacidades principales
            </h3>
            <ul className="mt-4 space-y-3">
              {topFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {(tool.pros?.length > 0 || tool.cons?.length > 0) && (
        <section className="mt-14">
          <SectionHeading
            eyebrow="Decisión rápida"
            title={`Ventajas y límites de ${tool.name}`}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <ListPanel title="Te conviene si..." items={tool.pros ?? []} tone="positive" />
            <ListPanel title="No es ideal si..." items={tool.cons ?? []} tone="negative" />
          </div>
        </section>
      )}

      {mainUseCases.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            eyebrow="Casos de uso"
            title={`Para qué puedes usar ${tool.name}`}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {mainUseCases.map((useCase) => (
              <div key={useCase} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <ListChecks className="h-5 w-5 text-cyan-400" />
                <p className="mt-3 text-sm leading-6 text-slate-300">{useCase}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-14">
        <SectionHeading eyebrow="Ficha técnica" title="Datos clave antes de elegir" />
        <dl className="rounded-2xl border border-white/10 bg-white/5 px-6">
          <DetailRow label="Categoría" value={tool.categories?.name ?? "No indicada"} />
          <DetailRow label="Modelo de precio" value={formatPricingModel(tool.pricing_model)} />
          <DetailRow label="Precio base" value={priceLabel(tool)} />
          <DetailRow label="Prueba gratis" value={trialLabel(tool)} />
          <DetailRow label="Plataformas" value={listLabel(tool.platforms)} />
          <DetailRow label="Idiomas" value={listLabel(tool.languages)} />
          <DetailRow label="Integraciones" value={listLabel(tool.integrations)} />
        </dl>
      </section>

      {tool.features?.length > 0 && (
        <section className="mt-14">
          <SectionHeading eyebrow="Funciones" title="Características destacadas" />
          <TagList items={tool.features} />
        </section>
      )}

      <section className="mt-14 grid gap-6 md:grid-cols-3">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Globe className="h-4 w-4 text-cyan-400" />
            Plataformas
          </h2>
          <TagList items={tool.platforms ?? []} />
        </div>
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Languages className="h-4 w-4 text-cyan-400" />
            Idiomas
          </h2>
          <TagList items={tool.languages ?? []} />
        </div>
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Plug className="h-4 w-4 text-cyan-400" />
            Integraciones
          </h2>
          <TagList items={tool.integrations ?? []} />
        </div>
      </section>

      {relatedComparisons.length > 0 && (
        <section className="mt-14">
          <SectionHeading
            eyebrow="Alternativas"
            title={`Compara ${tool.name} con otras herramientas`}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedComparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/comparar/${comparison.slug}`}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
              >
                {comparison.title}
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-500" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">¿Vale la pena probar {tool.name}?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Si encaja con tu caso de uso y presupuesto, revisa el sitio oficial para confirmar precios, límites y disponibilidad actual.
        </p>
        <div className="mt-6">
          {primaryCtaExternal ? (
            <a
              href={primaryCta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {primaryCtaLabel} <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <Link
              href={primaryCta}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {primaryCtaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        {tool.is_affiliate && (
          <p className="mt-5 text-xs text-slate-500">{brand.monetization.disclosure}</p>
        )}
      </section>
    </article>
  );
}
