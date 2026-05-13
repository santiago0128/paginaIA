import type { Metadata } from "next";
import { buildUrl, brand } from "@/lib/config/brand";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo Noxis trata datos, analítica, newsletter, afiliados y cookies.",
  alternates: { canonical: buildUrl("/privacidad") },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-16 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">Legal</p>
      <h1 className="mt-2 text-4xl font-semibold text-white">Política de privacidad</h1>
      <p className="mt-4 text-sm text-slate-500">Última actualización: 13 de mayo de 2026</p>

      <div className="mt-10 space-y-8 text-slate-300">
        <section>
          <h2 className="text-xl font-semibold text-white">Quiénes somos</h2>
          <p className="mt-3 leading-7">
            {brand.name} es un sitio editorial y comparador de herramientas de inteligencia artificial. Publicamos fichas, comparativas, noticias y guías para ayudar a elegir software.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Datos que podemos recopilar</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Email si te suscribes al newsletter.</li>
            <li>Datos técnicos básicos como navegador, dispositivo, páginas visitadas y referrer.</li>
            <li>Clicks en enlaces de herramientas para medir rendimiento y detectar errores.</li>
            <li>Datos enviados voluntariamente en formularios futuros, como reseñas o comentarios.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Para qué usamos los datos</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Enviar comunicaciones si te suscribes.</li>
            <li>Medir qué herramientas, comparativas y noticias son más útiles.</li>
            <li>Mejorar el contenido, la navegación y la seguridad del sitio.</li>
            <li>Registrar clicks de afiliado y atribución de campañas.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Servicios de terceros</h2>
          <p className="mt-3 leading-7">
            Podemos usar proveedores como Supabase para base de datos, herramientas de analítica, servicios de email y redes de afiliación o publicidad. Cada proveedor procesa datos bajo sus propias políticas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Tus derechos</h2>
          <p className="mt-3 leading-7">
            Puedes solicitar acceso, corrección o eliminación de tus datos escribiendo a {brand.contactEmail}. También puedes cancelar la suscripción al newsletter desde el enlace incluido en cada email cuando esté disponible.
          </p>
        </section>
      </div>
    </article>
  );
}
