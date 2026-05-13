import { env } from "@/lib/config/env";
import { AdSenseUnit } from "./AdSenseUnit";

type Props = {
  slot?: string;
  label?: string;
};

export function AdSlot({ slot, label = "Publicidad" }: Props) {
  if (!env.NEXT_PUBLIC_ADSENSE_CLIENT || !slot) return null;

  return (
    <div className="my-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <p className="mb-3 text-center text-xs uppercase tracking-wider text-slate-600">{label}</p>
      <AdSenseUnit client={env.NEXT_PUBLIC_ADSENSE_CLIENT} slot={slot} />
    </div>
  );
}
