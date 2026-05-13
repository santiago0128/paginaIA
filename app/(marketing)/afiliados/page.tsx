import type { Metadata } from "next";
import { buildUrl, brand } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Divulgación de afiliados",
  description: "Cómo funcionan los enlaces de afiliado y la monetización en Noxis.",
  alternates: { canonical: buildUrl("/afiliados") },
};

export default function AffiliateDisclosurePage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">Transparencia</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Divulgación de afiliados</h1>
      <p className="mt-4 text-sm text-slate-500">Última actualización: 13 de mayo de 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Cómo gana dinero Noxis</h2>
          <p className="mt-3 leading-7">
            Algunos enlaces a herramientas pueden ser enlaces de afiliado. Si compras o te registras desde esos enlaces, {brand.name} puede recibir una comisión sin costo adicional para ti.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Independencia editorial</h2>
          <p className="mt-3 leading-7">
            Las comisiones ayudan a mantener el sitio, pero no garantizan una posición favorable. Las fichas y comparativas deben priorizar utilidad, claridad, casos de uso, limitaciones y precio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Precios y disponibilidad</h2>
          <p className="mt-3 leading-7">
            Los precios, planes, descuentos y programas de afiliados pueden cambiar. Revisa siempre el sitio oficial de cada herramienta antes de comprar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Publicidad</h2>
          <p className="mt-3 leading-7">
            El sitio puede mostrar publicidad contextual si se activa una red publicitaria. Los anuncios se identificarán como publicidad cuando corresponda.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            Para alianzas, correcciones o preguntas sobre monetización, escribe a {brand.partnershipsEmail}.
          </p>
        </section>
      </div>
    </article>
  );
}
