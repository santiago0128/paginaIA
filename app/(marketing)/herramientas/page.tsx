import { Suspense } from "react";
import type { Metadata } from "next";
import { brand } from "@/lib/config/brand";
import { getTools, getCategories } from "@/lib/supabase/db";
import { ToolCard } from "@/components/tools/ToolCard";
import { FilterBar } from "@/components/tools/FilterBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Herramientas de IA",
  description: "Compara las mejores herramientas de inteligencia artificial por precio, categoría y casos de uso.",
};

type SearchParams = { categoria?: string; precio?: string; q?: string };

export default async function ToolsIndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [tools, categories] = await Promise.all([
    getTools({
      category: searchParams.categoria,
      pricing: searchParams.precio,
      search: searchParams.q,
    }),
    getCategories(),
  ]);

  const hasFilters = searchParams.categoria || searchParams.precio || searchParams.q;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-white">Herramientas de IA</h1>
      <p className="mt-2 text-slate-400">
        {tools.length} herramienta{tools.length !== 1 ? "s" : ""} disponible{tools.length !== 1 ? "s" : ""}
        {hasFilters ? " con los filtros aplicados" : ""}
      </p>

      <div className="mt-8 mb-10">
        <Suspense fallback={null}>
          <FilterBar categories={categories} />
        </Suspense>
      </div>

      {tools.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-slate-400">No se encontraron herramientas con esos filtros.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}

      <p className="mt-10 text-xs text-slate-600 text-center">
        {brand.monetization.disclosure}
      </p>
    </section>
  );
}
