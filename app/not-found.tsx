import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.08),transparent_40%),linear-gradient(180deg,#08111f_0%,#030712_100%)]" />
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-6xl flex-col items-center justify-center px-6 py-20 text-center lg:px-8">
        <p className="text-7xl font-semibold text-cyan-400">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Página no encontrada</h1>
        <p className="mt-3 max-w-md text-slate-400">
          La página que buscas no existe o fue movida. Prueba buscando la herramienta directamente.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/herramientas"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            <Search className="h-4 w-4" />
            Explorar herramientas
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ir al inicio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
