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
          <h2 className="text-xl font-semibold text-white">Cómo gana dinero {brand.name}</h2>
          <p className="mt-3 leading-7">
            {brand.name} es un proyecto editorial independiente financiado mediante varios modelos:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Enlaces de afiliado:</strong> Cuando recomiendamos herramientas de IA, algunos de nuestros enlaces pueden ser enlaces de afiliado. Si haces clic y completas una acción (compra, registro, etc.), {brand.name} puede recibir una comisión de la empresa afiliada.</li>
            <li><strong>Publicidad contextual:</strong> Podemos mostrar anuncios de redes publicitarias como Google AdSense o redes de publicidad especializada.</li>
            <li><strong>Patrocinios y alianzas:</strong> Podemos colaborar con proveedores de IA para crear contenido especial o comparativas patrocinadas, siempre claramente identificadas.</li>
          </ul>
          <p className="mt-3 leading-7">
            <strong>Lo importante:</strong> Estos modelos de ingresos NO aumentan el costo para ti. Las comisiones de afiliado no afectan el precio que pagas en la herramienta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Independencia editorial</h2>
          <p className="mt-3 leading-7">
            Aunque {brand.name} monetiza mediante afiliados, <strong>nuestra independencia editorial es prioridad:</strong>
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Las comparativas y recomendaciones se basan en <strong>utilidad real, funciones, precio, casos de uso y limitaciones</strong>, no en comisiones.</li>
            <li>Una herramienta no obtiene mejor ranking solo por ofrecernos comisión más alta.</li>
            <li>Incluimos herramientas donde NO somos afiliados si son relevantes y ofrecen valor.</li>
            <li>Criticamos funciones deficientes o problemas incluso si la herramienta es afiliada.</li>
            <li>No escribimos fichas falsas o exageradas para impulsar ventas.</li>
            <li>Descartamos partnerships si comprometerían la calidad o honestidad del contenido.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cómo identificar enlaces de afiliado</h2>
          <p className="mt-3 leading-7">
            Intentamos ser transparentes sobre afiliaciones:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Etiqueta explícita:</strong> Muchos enlaces tendrán una etiqueta visual o texto que indique &ldquo;enlace de afiliado&rdquo; o similar.</li>
            <li><strong>URL con parámetros:</strong> URLs de afiliado pueden contener códigos de seguimiento (ej: &ldquo;?ref=noxis&rdquo;).</li>
            <li><strong>Botones de CTA destacados:</strong> Botones grandes &ldquo;Ir a la herramienta&rdquo; o &ldquo;Comprar ahora&rdquo; suelen ser afiliados.</li>
            <li><strong>Sección de divulgación:</strong> Cada página de herramienta o comparativa puede indicar si hay afiliación.</li>
          </ul>
          <p className="mt-3 leading-7">
            <strong>Regla general:</strong> Si un enlace sale de {brand.name} hacia un tercero, podría ser afiliado. Cuando corresponda, lo indicaremos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Precios, descuentos y cambios</h2>
          <p className="mt-3 leading-7">
            Los precios, planes, descuentos, características y programas de afiliados de proveedores <strong>cambian frecuentemente</strong> sin notificarnos:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li>Una herramienta puede cambiar de &ldquo;gratis&rdquo; a &ldquo;de pago&rdquo;.</li>
            <li>Los precios pueden aumentar o disminuir entre actualizaciones.</li>
            <li>Las funciones pueden ser removidas o mejoradas.</li>
            <li>Un programa de afiliado puede terminar.</li>
            <li>La disponibilidad geográfica puede cambiar.</li>
          </ul>
          <p className="mt-3 leading-7">
            <strong>Por eso es crucial:</strong> Siempre verifica información actualizada directamente en el sitio oficial de la herramienta antes de comprar o registrarte. No confíes únicamente en nuestros datos, que pueden haberse actualizado recientemente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Publicidad y anuncios</h2>
          <p className="mt-3 leading-7">
            {brand.name} puede mostrar publicidad contextual:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Ubicación:</strong> Ads pueden aparecer en sidebar, entre artículos o en el footer.</li>
            <li><strong>Relevancia:</strong> Los anuncios se basan en categorías de contenido, no datos personales (según RGPD).</li>
            <li><strong>Identificación:</strong> Los anuncios estarán claramente marcados como &ldquo;Publicidad&rdquo; o &ldquo;Anuncio patrocinado&rdquo;.</li>
            <li><strong>Control:</strong> Puedes bloquear o reportar anuncios inapropiados.</li>
          </ul>
          <p className="mt-3 leading-7">Los anuncios NO afectan nuestras recomendaciones o contenido editorial.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Responsabilidad de decisiones</h2>
          <p className="mt-3 leading-7">
            Aunque ofrecemos información detallada y honesta:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>Eres responsable</strong> de evaluar si una herramienta es adecuada para tus necesidades, presupuesto y contexto.</li>
            <li>Una herramienta que funciona perfecto para otros podría no ser ideal para ti.</li>
            <li>No garantizamos resultados específicos al usar una herramienta recomendada.</li>
            <li>Revisa términos de servicio, políticas de privacidad y reseñas de usuarios en plataformas independientes.</li>
            <li>Realiza pruebas gratuitas o de pago antes de comprometerte con suscripciones anuales.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cumplimiento legal</h2>
          <p className="mt-3 leading-7">
            {brand.name} cumple con regulaciones de divulgación de afiliados, incluyendo:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
            <li><strong>FTC (EE.UU.):</strong> Endorse Guides - Divulgación clara de relaciones comerciales.</li>
            <li><strong>ASA (UK):</strong> Estándares de publicidad y afiliación transparente.</li>
            <li><strong>IAB (Industria):</strong> Mejores prácticas de transparencia en marketing digital.</li>
            <li><strong>RGPD (EU):</strong> Privacidad en datos personales (ver Política de Privacidad).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Preguntas frecuentes</h2>
          
          <h3 className="mt-4 text-lg font-semibold text-white">¿Por qué recomiendas algunas herramientas más que otras?</h3>
          <p className="mt-2 leading-7">
            Porque tienen mejor relación precio-valor, casos de uso claros, funciones relevantes o reseñas positivas verificadas. No porque paguen más comisión.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-white">¿Me cobras algo extra si hago clic en tus enlaces?</h3>
          <p className="mt-2 leading-7">
            No. La comisión viene de la empresa afiliada, no de ti. Pagas el mismo precio que si hubieras ido directamente a su sitio.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-white">¿Incluyes herramientas donde no eres afiliado?</h3>
          <p className="mt-2 leading-7">
            Sí, frecuentemente. Si una herramienta es relevante y valiosa, la incluimos aunque no tengamos comisión.
          </p>

          <h3 className="mt-4 text-lg font-semibold text-white">¿Cambiarás tu opinión si el programa de afiliados termina?</h3>
          <p className="mt-2 leading-7">
            No. La calidad de una herramienta no depende de nuestra comisión. Si sigue siendo buena, la seguiremos recomendando.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contacto</h2>
          <p className="mt-3 leading-7">
            ¿Quieres ser socio o afiliado de {brand.name}? ¿Encontraste inconsistencias? ¿Preguntas sobre monetización?
          </p>
          <p className="mt-3 leading-7">
            Escribe a {brand.partnershipsEmail}
          </p>
        </section>
      </div>
    </article>
  );
}
