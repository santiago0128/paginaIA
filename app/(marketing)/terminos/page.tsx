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
          <h2 className="text-xl font-semibold text-white">1. Aceptación de términos</h2>
          <p className="mt-3 leading-7">
            Al acceder y usar {brand.name}, aceptas cumplir estos Términos de Uso. Si no estás de acuerdo, no debes usar el sitio. Nos reservamos el derecho de actualizar estos términos en cualquier momento. El uso continuado constituye aceptación de cambios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">2. Naturaleza del contenido</h2>
          <p className="mt-3 leading-7">
            {brand.name} proporciona información editorial, análisis comparativo y guías sobre herramientas de inteligencia artificial con propósitos informativos y educativos. <strong>El contenido no constituye asesoría legal, financiera, técnica, profesional o de inversión.</strong> No somos responsables de decisiones tomadas basadas en nuestro contenido.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">3. Exactitud y cambios de información</h2>
          <p className="mt-3 leading-7">
            Hacemos esfuerzos razonables para mantener precios, características, planes, disponibilidad y enlaces actualizados. Sin embargo, las herramientas externas pueden cambiar sus ofertas, precios, términos y condiciones sin notificarnos. <strong>Siempre verifica información actualizada directamente en el sitio oficial de cada proveedor antes de comprar o registrarte.</strong>
          </p>
          <p className="mt-3 leading-7">
            No garantizamos que:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Toda la información sea 100% precisa o completa.</li>
            <li>Las comparativas sean exhaustivas para todos los casos de uso.</li>
            <li>Los precios mostrados sean los precios actuales de los proveedores.</li>
            <li>Las funciones listadas sigan siendo exactas después de actualizaciones.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">4. Enlaces externos y sitios de terceros</h2>
          <p className="mt-3 leading-7">
            {brand.name} puede contener enlaces a sitios web de terceros, tiendas de aplicaciones, programas de afiliación y servicios externos. <strong>No controlamos ni somos responsables de:</strong>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Contenido, precisión, políticas o prácticas de terceros.</li>
            <li>Disponibilidad o funcionamiento de sitios enlazados.</li>
            <li>Daños, pérdidas o problemas causados por esos sitios.</li>
            <li>Cambios en precios, planes o términos de servicio.</li>
            <li>Calidad o seguridad de productos o servicios ofrecidos.</li>
          </ul>
          <p className="mt-3 leading-7">Los enlaces no implican endorso. Úsalos bajo tu propio riesgo. Recomendamos leer las políticas de privacidad y términos de cada sitio externo antes de usar sus servicios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">5. Limitación de responsabilidad</h2>
          <p className="mt-3 leading-7">
            <strong>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY:</strong>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>No somos responsables de pérdidas, daños, lucro cesante o cualquier daño indirecto resultante del uso del sitio.</li>
            <li>No garantizamos resultados específicos al usar cualquier herramienta recomendada o enlazada.</li>
            <li>No somos responsables si una herramienta no cumple tus expectativas o necesidades.</li>
            <li>Cada usuario es responsable de evaluar si un producto es adecuado para sus objetivos, presupuesto y políticas internas.</li>
            <li>No verificamos todas las características, limitaciones, seguridad o compatibilidad de terceros.</li>
            <li>Nuestra responsabilidad está limitada al máximo permitido por la ley aplicable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">6. Uso aceptable</h2>
          <p className="mt-3 leading-7">
            Aceptas usar {brand.name} únicamente para propósitos legales y legítimos. <strong>No debes:</strong>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Violar leyes, regulaciones o derechos de terceros.</li>
            <li>Publicar contenido difamatorio, ofensivo, ilegal o que viole la privacidad de otros.</li>
            <li>Intentar hackear, atacar o comprometer la seguridad del sitio.</li>
            <li>Utilizar bots o scrapers sin autorización para recopilar contenido.</li>
            <li>Spamear, hacer phishing o enviar comunicaciones no solicitadas.</li>
            <li>Violar derechos de propiedad intelectual, patentes o marcas registradas.</li>
            <li>Distribuir malware, virus o código malicioso.</li>
            <li>Suplantación de identidad o engaño.</li>
          </ul>
          <p className="mt-3 leading-7">Nos reservamos el derecho de prohibir usuarios que violen estos términos sin previo aviso.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">7. Propiedad intelectual</h2>
          <p className="mt-3 leading-7">
            Todo el contenido de {brand.name} (textos, imágenes, datos, comparativas, análisis) es propiedad intelectual de {brand.name} o sus contribuyentes, protegido por leyes de derechos de autor.
          </p>
          <p className="mt-3 leading-7">
            <strong>Puedes:</strong>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Ver y leer el contenido para uso personal.</li>
            <li>Compartir enlaces al sitio en redes sociales o blogs.</li>
            <li>Citar pequeños fragmentos con atribución adecuada.</li>
          </ul>
          <p className="mt-3 leading-7">
            <strong>No puedes:</strong>
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Reproducir, distribuir o vender contenido completo sin permiso.</li>
            <li>Crear obras derivadas o adaptaciones.</li>
            <li>Scrape, crawl o descarga masiva de contenido.</li>
            <li>Reclamar propiedad del contenido de {brand.name}.</li>
          </ul>
          <p className="mt-3 leading-7">Para uso comercial o licencia de contenido, contacta a {brand.partnershipsEmail}.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">8. Afiliaciones y monetización</h2>
          <p className="mt-3 leading-7">
            {brand.name} puede monetizarse mediante enlaces de afiliado, publicidad contextual o patrocinios. Cuando haces clic en enlaces de afiliado, {brand.name} puede recibir una comisión si completas una acción (compra, registro, etc.), sin costo adicional para ti.
          </p>
          <p className="mt-3 leading-7">
            <strong>Transparencia:</strong> Indicaremos claramente cuando un enlace sea de afiliado. Las recomendaciones se basan en utilidad y valor para el usuario, no únicamente en comisiones. Consulta nuestra <a href="{brand.legal.affiliateDisclosureUrl}" className="text-cyan-400 hover:underline">Divulgación de Afiliados</a> para más detalles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">9. Modificación del sitio</h2>
          <p className="mt-3 leading-7">
            Nos reservamos el derecho de modificar, suspender o descontinuar {brand.name} o cualquier sección en cualquier momento, con o sin notificación previa. No somos responsables de interrupciones o cambios.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">10. Disponibilidad del sitio</h2>
          <p className="mt-3 leading-7">
            {brand.name} se proporciona "tal como está" sin garantías de:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li>Disponibilidad permanente o sin interrupciones.</li>
            <li>Funcionamiento correcto en todos los dispositivos o navegadores.</li>
            <li>Ausencia de errores, bugs o vulnerabilidades de seguridad.</li>
          </ul>
          <p className="mt-3 leading-7">Hacemos mantenimiento, actualizaciones y correcciones regularmente, que pueden resultar en tiempo de inactividad.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">11. Ley aplicable y jurisdicción</h2>
          <p className="mt-3 leading-7">
            Estos términos se rigen por la ley aplicable del país donde opera {brand.name}. Cualquier disputa se resolverá en los tribunales competentes de esa jurisdicción.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">12. Contacto y soporte</h2>
          <p className="mt-3 leading-7">
            Para preguntas, reportar problemas o inquietudes sobre estos términos:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-7">
            <li><strong>Soporte general:</strong> {brand.supportEmail}</li>
            <li><strong>Alianzas y negocios:</strong> {brand.partnershipsEmail}</li>
            <li><strong>Contacto principal:</strong> {brand.contactEmail}</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
        </section>
      </div>
    </article>
  );
}
