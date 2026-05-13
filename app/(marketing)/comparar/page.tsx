import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildUrl } from "@/lib/config/brand";
import { getAllComparisons } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comparativas de herramientas IA",
  description: "Compara las mejores herramientas de inteligencia artificial cara a cara: precios, funciones, pros y contras.",
  alternates: { canonical: buildUrl("/comparar") },
};

export default async function ComparisonIndexPage() {
  const comparisons = await getAllComparisons();

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <h1 className="text-3xl font-semibold text-white">Comparativas de herramientas IA</h1>
      <p className="mt-2 text-slate-400">
        {comparisons.length} comparativas disponibles — elige la que más te interese.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {comparisons.map((c) => (
          <Link
            key={c.slug}
            href={`/comparar/${c.slug}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div>
              <p className="font-medium text-white">{c.title}</p>
              {c.description && (
                <p className="mt-0.5 text-sm text-slate-400 line-clamp-1">{c.description}</p>
              )}
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-cyan-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}
