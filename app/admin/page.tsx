import { getAdminStats } from "@/lib/supabase/db";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-4xl font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

export default async function AdminPage() {
  const stats = await getAdminStats();

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Panel de administración</h1>
          <p className="mt-1 text-sm text-slate-400">Solo lectura — datos en tiempo real desde Supabase</p>
        </div>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Abrir Supabase <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Métricas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Herramientas publicadas" value={stats.toolCount} />
        <StatCard label="Comparativas" value={stats.comparisonCount} />
        <StatCard label="Suscriptores" value={stats.subscriberCount} />
        <StatCard label="Clicks de afiliado" value={stats.clickCount} />
      </div>

      {/* Tablas */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* Últimos clicks */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Últimos clicks de afiliado</h2>
          {stats.recentClicks.length === 0 ? (
            <p className="text-sm text-slate-500">Sin clicks aún.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Herramienta</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Referrer</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentClicks.map((c, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 font-medium text-white">{c.tool_slug}</td>
                      <td className="max-w-[140px] truncate px-4 py-3 text-slate-400">
                        {c.referrer ?? "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                        {formatDate(c.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Últimos suscriptores */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Últimos suscriptores</h2>
          {stats.recentSubscribers.length === 0 ? (
            <p className="text-sm text-slate-500">Sin suscriptores aún.</p>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-400">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentSubscribers.map((s, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-3 text-white">{s.email}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                        {formatDate(s.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
