"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { DbCategory } from "@/lib/supabase/db";

const PRICING_OPTIONS = [
  { value: "freemium", label: "Freemium" },
  { value: "suscripcion", label: "Suscripción" },
  { value: "opensource", label: "Open Source" },
  { value: "add_on", label: "Add-on" },
  { value: "incluido_en_suscripcion", label: "Incluido en suscripción" },
];

type Props = { categories: DbCategory[] };

export function FilterBar({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    startTransition(() => router.replace(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={searchParams.get("categoria") ?? ""}
        onChange={(e) => update("categoria", e.target.value)}
        className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("precio") ?? ""}
        onChange={(e) => update("precio", e.target.value)}
        className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
      >
        <option value="">Todos los precios</option>
        {PRICING_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <input
        type="search"
        placeholder="Buscar herramienta..."
        defaultValue={searchParams.get("q") ?? ""}
        onKeyDown={(e) => {
          if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value);
        }}
        onChange={(e) => {
          if (e.target.value === "") update("q", "");
        }}
        className="min-w-48 flex-1 rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
      />

      {isPending && (
        <span className="text-xs text-slate-500">Cargando...</span>
      )}
    </div>
  );
}
