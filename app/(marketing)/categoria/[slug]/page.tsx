import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildUrl } from "@/lib/config/brand";
import { getToolsByCategory } from "@/lib/supabase/db";
import { ToolCard } from "@/components/tools/ToolCard";

type Props = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getToolsByCategory(params.slug);
  if (!data) return { title: "Categoría no encontrada" };
  return {
    title: `Herramientas de ${data.category.name}: comparativas y precios`,
    description: data.category.description ?? undefined,
    alternates: { canonical: buildUrl(`/categoria/${params.slug}`) },
  };
}

export default async function CategoryPage({ params }: Props) {
  const data = await getToolsByCategory(params.slug);
  if (!data) notFound();

  const { category, tools } = data;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-white">
        Herramientas de {category.name}
      </h1>
      {category.description && (
        <p className="mt-3 max-w-2xl text-slate-300">{category.description}</p>
      )}
      <p className="mt-2 text-sm text-slate-500">
        {tools.length} herramienta{tools.length !== 1 ? "s" : ""}
      </p>

      {tools.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-slate-400">No hay herramientas en esta categoría aún.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      )}
    </section>
  );
}
