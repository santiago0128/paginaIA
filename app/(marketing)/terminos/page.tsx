import type { Metadata } from "next";
import { buildUrl, brand } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Condiciones generales para usar Noxis.",
  alternates: { canonical: buildUrl("/terminos") },
};

export default function TermsPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">Legal</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Términos de uso</h1>
      <p className="mt-4 text-sm text-slate-500">Última actualización: 13 de mayo de 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Uso del sitio</h2>
          <p className="mt-3 leading-7">
            {brand.name} ofrece información editorial sobre herramientas de IA. El contenido se publica con fines informativos y no constituye asesoría legal, financiera, técnica o profesional.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Exactitud de la información</h2>
          <p className="mt-3 leading-7">
            Intentamos mantener precios, funciones y enlaces actualizados, pero las herramientas externas pueden cambiar planes, disponibilidad y condiciones sin aviso. Verifica siempre la información en el sitio oficial antes de comprar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Enlaces externos</h2>
          <p className="mt-3 leading-7">
            El sitio puede enlazar a páginas de terceros. No controlamos sus contenidos, políticas, precios ni disponibilidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Limitación de responsabilidad</h2>
          <p className="mt-3 leading-7">
            No garantizamos resultados específicos por usar una herramienta recomendada o enlazada. Cada usuario es responsable de evaluar si un producto encaja con sus necesidades, presupuesto y políticas internas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            Para consultas sobre estos términos, escribe a {brand.contactEmail}.
          </p>
        </section>
      </div>
    </article>
  );
}
