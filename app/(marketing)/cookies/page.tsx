import type { Metadata } from "next";
import { buildUrl, brand } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Uso de cookies y tecnologías similares en Noxis.",
  alternates: { canonical: buildUrl("/cookies") },
};

export default function CookiesPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">Legal</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Política de cookies</h1>
      <p className="mt-4 text-sm text-slate-500">Última actualización: 13 de mayo de 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Qué son las cookies</h2>
          <p className="mt-3 leading-7">
            Las cookies y tecnologías similares permiten recordar información técnica del navegador y medir cómo se usa el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Qué tipos podemos usar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Cookies esenciales para el funcionamiento del sitio.</li>
            <li>Cookies de analítica para entender tráfico y páginas visitadas.</li>
            <li>Cookies de afiliación o publicidad si se activan redes externas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cómo gestionarlas</h2>
          <p className="mt-3 leading-7">
            Puedes bloquear o eliminar cookies desde la configuración de tu navegador. Algunas funciones pueden dejar de operar correctamente si desactivas cookies esenciales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            Para consultas sobre cookies, escribe a {brand.contactEmail}.
          </p>
        </section>
      </div>
    </article>
  );
}
