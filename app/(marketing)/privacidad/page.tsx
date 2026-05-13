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
            {brand.name} es un sitio editorial independiente dedicado a la evaluación, comparación y análisis de herramientas de inteligencia artificial. Nuestro objetivo es proporcionar información clara, objetiva y actualizada para ayudarte a elegir la solución de IA más adecuada para tus necesidades.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Responsable del tratamiento de datos</h2>
          <p className="mt-3 leading-7">
            {brand.name} es responsable del tratamiento de tus datos personales. Para cualquier consulta, puedes contactarnos en {brand.contactEmail}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Datos que recopilamos</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Email:</strong> Recopilamos tu dirección de email si te suscribes voluntariamente a nuestro newsletter.</li>
            <li><strong>Datos técnicos:</strong> Navegador, sistema operativo, dispositivo, ciudad, idioma, páginas visitadas, tiempo de permanencia y referrer.</li>
            <li><strong>Datos de interacción:</strong> Clicks en enlaces de herramientas, búsquedas realizadas y acciones dentro del sitio para medir utilidad y detectar mejoras.</li>
            <li><strong>Cookies:</strong> Identificadores técnicos para sesiones, preferencias y seguimiento de rendimiento (ver nuestra Política de Cookies).</li>
            <li><strong>Datos voluntarios:</strong> Información que envíes en formularios de contacto, reseñas, comentarios o solicitudes de afiliación.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Base legal del tratamiento</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Tu consentimiento explícito para newsletter y análisis.</li>
            <li>Interés legítimo para mejorar contenido, seguridad y experiencia del usuario.</li>
            <li>Cumplimiento de obligaciones legales si aplica.</li>
            <li>Ejecución de un contrato o relación comercial (afiliación, contacto).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Propósitos del tratamiento</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Enviar newsletter, actualizaciones y comunicaciones si te has suscrito.</li>
            <li>Medir qué herramientas, comparativas, artículos y noticias son más útiles.</li>
            <li>Mejorar contenido, navegación, funcionalidad y seguridad del sitio.</li>
            <li>Registrar clicks de afiliado y atribución correcta de comisiones.</li>
            <li>Personalizar tu experiencia y recomendaciones de contenido.</li>
            <li>Detectar, prevenir y resolver problemas técnicos o de seguridad.</li>
            <li>Responder consultas y solicitudes de contacto.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Servicios de terceros</h2>
          <p className="mt-3 leading-7">
            Utilizamos proveedores especializados que procesan datos bajo nuestras instrucciones:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Supabase:</strong> Base de datos y autenticación.</li>
            <li><strong>MailerLite:</strong> Gestión de newsletter y email marketing.</li>
            <li><strong>OpenAI:</strong> Análisis y generación de contenido.</li>
            <li><strong>Google Analytics / PostHog:</strong> Analítica web y comportamiento del usuario.</li>
            <li><strong>Redes de afiliación:</strong> Seguimiento de conversiones y comisiones.</li>
            <li><strong>Proveedores de publicidad:</strong> Si se activan, mostrarán anuncios contextuales.</li>
          </ul>
          <p className="mt-3 leading-7">Cada proveedor tiene sus propias políticas de privacidad. No compartimos datos personales con terceros sin tu consentimiento, excepto cuando es necesario para operar el sitio.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Derechos que tienes</h2>
          <p className="mt-3 leading-7">Según las leyes de privacidad (RGPD, CCPA y similares), tienes derecho a:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Acceso:</strong> Solicitar copia de tus datos personales.</li>
            <li><strong>Rectificación:</strong> Corregir información inexacta.</li>
            <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos (derecho al olvido).</li>
            <li><strong>Restricción:</strong> Limitar cómo usamos tus datos.</li>
            <li><strong>Portabilidad:</strong> Recibir tus datos en formato transferible.</li>
            <li><strong>Oposición:</strong> Rechazar ciertos tratamientos, como marketing.</li>
            <li><strong>Retiro de consentimiento:</strong> Darte de baja del newsletter en cualquier momento.</li>
          </ul>
          <p className="mt-3 leading-7">Para ejercer estos derechos, contáctanos en {brand.supportEmail}.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Retención de datos</h2>
          <p className="mt-3 leading-7">
            Mantenemos tus datos el tiempo necesario para cumplir los propósitos descritos. Los emails se guardan mientras estés suscrito; después, se eliminarán a menos que haya obligación legal. Los datos de navegación se anonimizarán después de 12 meses.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Seguridad</h2>
          <p className="mt-3 leading-7">
            Implementamos medidas técnicas y organizativas para proteger tus datos contra acceso no autorizado, alteración o pérdida. Sin embargo, ningún método de transmisión en internet es 100% seguro. Si descubrimos una violación de seguridad, te lo notificaremos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cambios en esta política</h2>
          <p className="mt-3 leading-7">
            Podemos actualizar esta política ocasionalmente. Publicaremos cambios significativos en esta página y te notificaremos si es necesario. El uso continuado del sitio implica aceptación de los cambios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            Para preguntas, reclamos o solicitudes sobre privacidad: {brand.supportEmail}
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
