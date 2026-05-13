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
            Las cookies son archivos pequeños que se guardan en tu dispositivo cuando visitas un sitio web. También usamos tecnologías similares como web beacons, pixels de seguimiento y almacenamiento local. Estos datos nos permiten recordar tus preferencias, mantener sesiones activas y analizar cómo usas el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Tipos de cookies que utilizamos</h2>
          
          <h3 className="mt-4 text-lg font-semibold text-white">1. Cookies esenciales / necesarias</h3>
          <p className="mt-2 leading-7">
            Son imprescindibles para el funcionamiento básico del sitio:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Mantener sesiones de usuario activas.</li>
            <li>Almacenar preferencias de idioma y configuración.</li>
            <li>Proteger contra ataques de seguridad (CSRF).</li>
            <li>Recordar tu consentimiento a cookies.</li>
          </ul>
          <p className="mt-2 leading-7 text-sm text-slate-400">No requieren consentimiento y no se pueden desactivar sin afectar el sitio.</p>

          <h3 className="mt-4 text-lg font-semibold text-white">2. Cookies de analítica</h3>
          <p className="mt-2 leading-7">
            Nos ayudan a entender cómo interactúan los usuarios con el sitio:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Google Analytics: Número de visitantes, páginas más visitadas, duración de sesiones.</li>
            <li>PostHog: Mapas de calor, flujos de usuario, eventos de interacción.</li>
          </ul>
          <p className="mt-2 leading-7 text-sm text-slate-400">Requieren tu consentimiento. Los datos se anonimizarán y no identificarán personalmente.</p>

          <h3 className="mt-4 text-lg font-semibold text-white">3. Cookies de funcionalidad</h3>
          <p className="mt-2 leading-7">
            Personalizan tu experiencia:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Recordar filtros aplicados en comparativas.</li>
            <li>Guardar búsquedas recientes.</li>
            <li>Preferencias de visualización (tema oscuro, tamaño de fuente).</li>
          </ul>
          <p className="mt-2 leading-7 text-sm text-slate-400">Requieren consentimiento. Mejoran la experiencia pero no son esenciales.</p>

          <h3 className="mt-4 text-lg font-semibold text-white">4. Cookies de afiliación y marketing</h3>
          <p className="mt-2 leading-7">
            Permiten rastrear conversiones y optimizar marketing:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Identificar si hizo clic en un enlace de afiliado.</li>
            <li>Atribuir correctamente comisiones por compras.</li>
            <li>Mostrar publicidad relevante en redes de anunciantes.</li>
            <li>Medir ROI de campañas de marketing.</li>
          </ul>
          <p className="mt-2 leading-7 text-sm text-slate-400">Requieren consentimiento. Consulta nuestra Política de Afiliados para más detalles.</p>

          <h3 className="mt-4 text-lg font-semibold text-white">5. Cookies de terceros</h3>
          <p className="mt-2 leading-7">
            Proveedores externos pueden crear cookies para:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Redes de afiliación (tracking de conversiones).</li>
            <li>Plataformas publicitarias (retargeting).</li>
            <li>Herramientas de análisis (comportamiento agregado).</li>
          </ul>
          <p className="mt-2 leading-7 text-sm text-slate-400">Estás sujeto a las políticas de privacidad de esos proveedores.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cómo gestionar cookies</h2>
          
          <h3 className="mt-4 text-lg font-semibold text-white">Mediante tu navegador</h3>
          <p className="mt-2 leading-7">
            Puedes bloquear, eliminar o gestionar cookies desde la configuración de tu navegador:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.</li>
            <li><strong>Firefox:</strong> Configuración → Privacidad y seguridad → Cookies y datos de sitios.</li>
            <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web.</li>
            <li><strong>Edge:</strong> Configuración → Privacidad → Cookies y otros datos de sitios.</li>
          </ul>
          <p className="mt-3 leading-7"><strong>⚠️ Advertencia:</strong> Si desactivas cookies esenciales, el sitio puede no funcionar correctamente. Algunas funciones como iniciar sesión, guardar preferencias o procesar transacciones podrían no estar disponibles.</p>

          <h3 className="mt-4 text-lg font-semibold text-white">Mediante consentimiento</h3>
          <p className="mt-2 leading-7">
            Cuando visitas por primera vez, te mostraremos un aviso de consentimiento. Puedes aceptar todas, rechazar no esenciales, o personalizar. Puedes cambiar de opinión en cualquier momento accediendo a tu configuración de privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Herramientas de exclusión (opt-out)</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
            <li><strong>Red de publicidad:</strong> <a href="https://optout.aboutads.info/" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance (DAA)</a></li>
            <li><strong>Preferencias generales:</strong> <a href="https://www.aboutcookies.org/" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">AboutCookies.org</a></li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Período de almacenamiento</h2>
          <p className="mt-3 leading-7">
            Las cookies tienen diferentes duraciones:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 leading-7">
            <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierras el navegador.</li>
            <li><strong>Cookies persistentes:</strong> Pueden durar días, meses o años según el proveedor.</li>
            <li><strong>Cookies de afiliado:</strong> Típicamente 30-90 días.</li>
            <li><strong>Cookies de analítica:</strong> Generalmente 13-26 meses.</li>
          </ul>
          <p className="mt-3 leading-7">Puedes eliminar todas las cookies manualmente desde tu navegador en cualquier momento.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Tu privacidad es importante</h2>
          <p className="mt-3 leading-7">
            Respetuamos el Reglamento General de Protección de Datos (RGPD) de la UE, la Ley de Privacidad del Consumidor de California (CCPA) y leyes similares. No vendemos datos personales. Solo compartimos información con proveedores necesarios para operar el sitio.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            Si tienes preguntas sobre cookies o privacidad, contáctanos en {brand.supportEmail}.
          </p>
        </section>
      </div>
    </article>
  );
}
