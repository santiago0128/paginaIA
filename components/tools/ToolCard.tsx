import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { DbTool } from "@/lib/supabase/db";
import { RatingStars } from "./RatingStars";

function priceLabel(tool: DbTool): string {
  if (tool.starting_price != null) return `Desde $${tool.starting_price}/mes`;
  if (tool.pricing_model === "freemium") return "Gratis disponible";
  if (tool.pricing_model === "opensource") return "Open Source";
  if (tool.pricing_model === "incluido_en_suscripcion") return "Incluido en suscripción";
  return "Ver precios";
}

type Props = { tool: DbTool };

export function ToolCard({ tool }: Props) {
  return (
    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <div>
          {tool.categories && (
            <span className="text-xs font-medium text-cyan-400">{tool.categories.name}</span>
          )}
          <h3 className="mt-0.5 text-base font-semibold text-white">{tool.name}</h3>
        </div>
        <RatingStars rating={tool.rating_avg} />
      </div>

      <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{tool.short_description}</p>
      <p className="mt-3 text-sm text-slate-400">{priceLabel(tool)}</p>

      <div className="mt-4 flex gap-2">
        <Link
          href={`/herramientas/${tool.slug}`}
          className="flex-1 rounded-lg border border-white/10 bg-white/5 py-2 text-center text-sm text-white transition hover:bg-white/10"
        >
          Ver detalles
        </Link>

        {tool.affiliate_url ? (
          <Link
            href={`/go/${tool.slug}`}
            className="flex items-center gap-1 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
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
