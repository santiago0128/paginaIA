# NOXIS — Prompt de continuación

> **Propósito de este archivo:** Contexto completo del proyecto para continuar el desarrollo con cualquier agente IA sin perder información. Actualizar al final de cada sesión.
> **Última actualización:** 2026-05-13

---

## Qué es NOXIS

Comparador de herramientas de IA en español. El usuario entra, ve fichas de 30 herramientas, las compara lado a lado, filtra por categoría/precio, y hace clic en links de afiliado que se registran en base de datos. Objetivo: posicionamiento SEO en español + ingresos por afiliación + monetizacion por visitas a la pagina.

**Stack:** Next.js 14.2.35 · React 18.3.1 · Tailwind CSS 4 · Supabase · TypeScript strict
**Ubicación:** `c:\Users\USER\Documents\pagina de IA`
**Dev server:** `npm run dev` (corre en puerto 3000; `predev` limpia `.next` y apaga procesos viejos en 3000/3001/3002)

---

## Variables de entorno (.env)

```
NEXT_PUBLIC_SUPABASE_URL=https://ajjdcojwprbtvbutvecg.supabase.co
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=          ← VACÍO, usar siempre createAdminClient()
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BRAND_NAME=Noxis
NEXT_PUBLIC_BRAND_TAGLINE=Descubre qué IA gana para ti
NEXT_PUBLIC_ADSENSE_CLIENT=          ← VACÍO hasta aprobar AdSense
NEXT_PUBLIC_ADSENSE_SLOT_BLOG=       ← VACÍO hasta crear bloque de anuncio
NEXT_PUBLIC_ADSENSE_SLOT_NEWS=
OPENAI_API_KEY=                      ← API key server-side para Noxis Radar
OPENAI_FORUM_MODEL=gpt-4-turbo       ← opcional, modelo para generar posts del foro
FORUM_CRON_SECRET=                   ← secreto para /api/cron/forum
AFFILIATE_URL_JASPER=                ← VACÍO hasta tener enlace aprobado
AFFILIATE_URL_WRITESONIC=
AFFILIATE_URL_HEYGEN=
AFFILIATE_URL_SYNTHESIA=
AFFILIATE_URL_ELEVENLABS=
AFFILIATE_URL_NOTION=
AFFILIATE_URL_CANVA=
AFFILIATE_URL_GRAMMARLY=
```

**Regla importante:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` está vacío. Usar siempre `createAdminClient()` de `@/lib/supabase/admin` para queries server-side. Nunca el cliente anon.

---

## Base de datos Supabase — tablas principales

| Tabla | Contenido |
|---|---|
| `categories` | 10 categorías (chat, imagen, video, audio, escritura, marketing, productividad, codigo, diseno, busqueda) |
| `tools` | 30 herramientas con pros, cons, features, use_cases, pricing reales |
| `comparisons` | 15 comparativas (chatgpt-vs-claude, gemini-vs-chatgpt, etc.) |
| `email_subscribers` | Suscriptores del newsletter |
| `affiliate_clicks` | Clicks registrados al hacer clic en "Ir a [tool]" |
| `blog_posts` | 5 posts SEO originales publicados con `npm run seed:blog` |
| `forum_posts` | Publicaciones diarias generadas por Noxis Radar/OpenAI |

**Columnas especiales en `tools`:** `is_affiliate`, `status`, `seo_title`, `seo_description`, `schema_json` — fueron añadidas con migration, ya existen.

**Relaciones en `comparisons`:** usa `tool1_id` y `tool2_id` (no `left_tool_id`/`right_tool_id`).

---

## Estructura de archivos importante

```
lib/
├── supabase/
│   ├── admin.ts          → createAdminClient() — USAR ESTE siempre en server
│   ├── server.ts         → createSupabaseServerClient() — NO usar (anon key vacío)
│   ├── client.ts         → cliente browser (no usar sin anon key)
│   └── db.ts             → TODAS las funciones de datos:
│                            getFeaturedTools, getTools, getToolBySlug,
│                            getCategories, getComparisonBySlug, getToolsByCategory,
│                            getPopularComparisons, getAllComparisons,
│                            getComparisonsForTool, getAdminStats,
│                            getBlogPosts, getBlogPostBySlug, getSitemapData
├── config/
│   ├── brand.ts          → Configuración centralizada de marca
│   └── env.ts            → Validación Zod de ENV (URLs sociales vacías = undefined, no error)
├── seo/
│   └── schema-org.ts     → buildSoftwareApplicationSchema, buildComparisonArticleSchema,
│                            buildBlogPostSchema, buildOrganizationSchema
├── data/
│   └── phase-3-seed.ts   → Datos de las 30 herramientas y 15 comparativas
├── news/
│   └── rss.ts            → Agregador RSS para /noticias usando Google News RSS
├── openai/
│   └── forum.ts          → Genera posts diarios del foro con OpenAI Responses API
└── forum/
    └── posts.ts          → Orquesta noticias + OpenAI + insert/upsert en forum_posts

app/
├── page.tsx                              → Home: hero + featured tools + comparativas + newsletter
├── not-found.tsx                         → 404 personalizada
├── sitemap.ts                            → Dinámico: 55+ URLs desde Supabase
├── robots.ts                             → OK
├── admin/page.tsx                        → Panel: métricas + últimos clicks y suscriptores
├── foro/page.tsx                         → Foro IA: listado de posts diarios de Noxis Radar
├── foro/[slug]/page.tsx                  → Ficha de publicación del foro + fuentes
├── go/[slug]/route.ts                    → Affiliate redirect: registra click y redirige
├── api/newsletter/route.ts               → POST: guarda suscriptor en Supabase
├── api/cron/forum/route.ts               → GET/POST protegido: genera post diario con OpenAI
└── (marketing)/
    ├── herramientas/
    │   ├── page.tsx                      → Listado 30 tools con FilterBar
    │   └── [slug]/
    │       ├── page.tsx                  → Ficha individual + JSON-LD + "Comparar con"
    │       └── opengraph-image.tsx       → OG image dinámica
    ├── comparar/
    │   ├── page.tsx                      → Índice de las 15 comparativas
    │   └── [slug]/
    │       ├── page.tsx                  → Tabla comparativa + pros/cons
    │       └── opengraph-image.tsx       → OG image dinámica "Tool1 VS Tool2"
    ├── noticias/page.tsx                 → Hub diario de noticias IA/tecnología desde RSS
    ├── categoria/[slug]/page.tsx         → Tools por categoría
    └── blog/
        ├── page.tsx                      → Listado (estado vacío si no hay posts)
        └── [slug]/page.tsx               → Ficha de post + JSON-LD BlogPosting

components/
├── layout/
│   ├── site-header.tsx                  → Async server component, carga categorías
│   ├── NavClient.tsx                    → Client: dropdown categorías + hamburguesa mobile
│   └── site-footer.tsx                  → Footer con disclosure de afiliados
├── monetization/
│   ├── AdSlot.tsx                       → Slot AdSense opcional si client + slot env existen
│   └── AdSenseUnit.tsx                  → Client component que inicializa adsbygoogle
├── tools/
│   ├── ToolCard.tsx                     → Card con nombre, desc, precio, rating, CTAs
│   ├── RatingStars.tsx                  → Estrellas 1-5
│   └── FilterBar.tsx                    → Client: filtros categoría/precio/búsqueda por URL params
└── marketing/
    └── NewsletterForm.tsx               → Client: formulario email con estados

scripts/
├── clean-next-dev.ps1                    → Predev: apaga puertos 3000/3001/3002 y limpia .next
├── seed-blog-posts.ts                    → npm run seed:blog — publica 5 posts SEO originales
├── generate-forum-post.ts                → npm run forum:generate — crea/actualiza post diario del foro
├── update-affiliate-links.ts             → npm run affiliates:update — carga enlaces AFFILIATE_URL_* en tools
├── seed-phase3.ts                       → npm run seed:phase3 — carga/actualiza datos en Supabase
├── forum-migration.sql                   → Crea forum_posts, índices, RLS y trigger updated_at
├── supabase-schema.sql                  → Schema completo para crear tablas desde cero
└── supabase-migration.sql               → Añade columnas faltantes a tools (ya aplicado)
```

---

## Convenciones del proyecto

- **Tailwind 4** (no v3): usa `@import "tailwindcss"` en globals.css, no `@tailwind base/components/utilities`
- **Paleta:** fondo `#030712`, cards `bg-white/5 border border-white/10`, acento `cyan-400`, texto secundario `slate-300/400`
- **Server Components** para todo lo que lee datos. Client Components solo cuando hay interacción (useState, useRouter, etc.)
- **`export const dynamic = "force-dynamic"`** en páginas que leen de Supabase para evitar caché de Next.js
- **Sin comentarios** en el código salvo que el WHY no sea obvio
- **TypeScript strict** activo

---

## Problema conocido pendiente de resolver

**Las páginas dinámicas muestran datos cacheados de Supabase.**
Solución: agregar `export const dynamic = "force-dynamic"` al inicio de cada page.tsx que haga queries.

Páginas que ya lo tienen:
- `app/(marketing)/herramientas/page.tsx` ✅
- `app/(marketing)/herramientas/[slug]/page.tsx` ✅
- `app/(marketing)/comparar/[slug]/page.tsx` ✅
- `app/(marketing)/comparar/page.tsx` ✅
- `app/(marketing)/categoria/[slug]/page.tsx` ✅
- `app/(marketing)/blog/page.tsx` ✅
- `app/(marketing)/blog/[slug]/page.tsx` ✅
- `app/page.tsx` (home) ✅
- `app/admin/page.tsx` ✅

Páginas que aún necesitan el fix:
- Ninguna ✅

---

## Cambios recientes

- **2026-05-13:** La página `app/(marketing)/comparar/[slug]/page.tsx` fue enriquecida. Ahora muestra veredicto rápido, cards "Elige X si...", tabla comparativa ampliada, análisis con `long_description`, funciones comunes/diferenciales, pros/cons completos y CTAs finales. No requiere migración: usa campos existentes de `tools` y `comparison_data`.
- **2026-05-13:** Se añadieron alias defensivos `app/comprar/page.tsx` y `app/comprar/[slug]/page.tsx` para redirigir a `/comparar` y `/comparar/[slug]`. Evita 404 si un usuario escribe "comprar" por error al intentar ir a "comparar".
- **2026-05-13:** Se corrigió el dropdown de categorías del navbar. `NavClient` ya no usa una capa `fixed` invisible para cerrar el menú; ahora cierra con click fuera vía `ref`, cierra al cambiar de ruta, y el header tiene `z-50` para evitar que el contenido tape las opciones. Los links de categorías usan `<a href>` normal para evitar `ChunkLoadError` durante navegación cliente en desarrollo.
- **2026-05-13:** Se resolvió un `ChunkLoadError` en `/categoria/audio`: había dos servidores Next dev corriendo (`3000` viejo y `3001` nuevo), lo que mezclaba chunks de `.next`. Se apagaron ambos y se levantó uno solo en `localhost:3000`.
- **2026-05-13:** Se rediseñaron las fichas de herramientas (`app/(marketing)/herramientas/[slug]/page.tsx`) para mostrar ficha rápida, resumen útil, capacidades, ventajas/límites, casos de uso, ficha técnica, funciones, plataformas, idiomas, integraciones, comparativas relacionadas y CTA final.
- **2026-05-13:** Se creó `/noticias`, un hub diario de noticias de IA/tecnología/startups alimentado por RSS público de Google News (`lib/news/rss.ts`). Las noticias se actualizan como edición diaria: `app/(marketing)/noticias/page.tsx` usa `revalidate = 86400`, los feeds usan `when:1d`, se filtran items de las últimas 24 horas y el sitemap marca `/noticias` con `changeFrequency: "daily"`.
- **2026-05-13:** Se resolvió `EPERM: operation not permitted, open '.next\\trace'`. Causa: `.next/trace` quedó bloqueado y había más de un servidor Next escuchando. Solución aplicada: detener procesos en `3000/3001`, borrar solo `.next/trace` y levantar un único `npm run dev` en `localhost:3000`.
- **2026-05-13:** Se agregó `scripts/clean-next-dev.ps1` y el hook `predev` en `package.json`. Ahora `npm run dev` apaga procesos viejos en `3000/3001/3002`, borra `.next` y arranca Next en `3000`, evitando `EPERM .next\\trace`, chunks viejos y CSS en 404.
- **2026-05-13:** Se aplicó base de monetización: páginas legales completas (`/privacidad`, `/terminos`, `/cookies`, `/afiliados`), footer con Cookies, componente AdSense opcional (`NEXT_PUBLIC_ADSENSE_CLIENT`), docs en `docs/monetization.md`, seed de 5 posts SEO originales y script `affiliates:update` para cargar enlaces afiliados reales desde variables de entorno.
- **2026-05-13:** `/foro` dejó de ser alias y ahora es un foro editorial automático. Nueva tabla `forum_posts`, migración `scripts/forum-migration.sql`, generador `npm run forum:generate`, endpoint protegido `/api/cron/forum`, páginas `/foro` y `/foro/[slug]`, sitemap con posts del foro y docs en `docs/forum-ai.md`. Requiere `OPENAI_API_KEY` y `FORUM_CRON_SECRET`.

---

## Lo que falta construir (backlog priorizado)

### Prioridad ALTA (afecta directamente ingresos y SEO)

1. **Fix caché en todas las páginas** — ✅ Completado el 2026-05-13. Todas las páginas que leen de Supabase tienen `export const dynamic = "force-dynamic"`.

2. **Logos de herramientas** — La columna `logo_url` existe en DB pero está vacía. Añadir URLs de logos oficiales (favicon o logo SVG) en el seed y mostrarlos en ToolCard y fichas. Mejora radicalmente el aspecto visual.

3. **Programa de afiliados real** — La columna `affiliate_url` está vacía para todas las tools. Investigar y añadir URLs de afiliado reales para las herramientas que tienen programa:
   - Jasper: jasper.ai/affiliates
   - Writesonic: writesonic.com/affiliate
   - HeyGen: heygen.com/affiliate
   - Synthesia: synthesia.io/affiliate
   - ElevenLabs: elevenlabs.io/affiliate
   - Notion: notion.so/affiliates
   - Canva: canva.com/affiliates
   - Grammarly: grammarly.com/affiliate

4. **Activar foro IA diario en producción** — Ejecutar `scripts/forum-migration.sql` en Supabase, añadir `OPENAI_API_KEY` y `FORUM_CRON_SECRET`, y configurar un cron diario contra `/api/cron/forum`.

### Prioridad MEDIA

5. **Reseñas de usuarios** — La tabla `reviews` existe pero no se usa. Crear:
   - Endpoint POST `/api/reviews` para recibir reseñas
   - Componente `ReviewForm.tsx` en la ficha de herramienta
   - Sección de reseñas en `/herramientas/[slug]`
   - Actualizar `rating_avg` y `rating_count` al insertar reseña

6. **Buscador global** — Añadir un buscador en el header que busque en tiempo real entre las 30 herramientas. Puede ser un modal (Cmd+K style) o una página `/buscar?q=...`

7. **Comparador interactivo** — En `/herramientas/[slug]` añadir un selector "Comparar con..." que lleve al usuario a `/comparar/[slug1]-vs-[slug2]`

8. **Página de inicio de sesión para admin** — Actualmente `/admin` es público. Protegerlo con autenticación básica de Supabase Auth o middleware de Next.js con variable de entorno `ADMIN_PASSWORD`

### Prioridad BAJA

9. **Deploy a producción** — Configurar en Vercel:
   - Conectar repositorio GitHub
   - Añadir todas las variables de entorno
   - Cambiar `NEXT_PUBLIC_SITE_URL` al dominio real
   - Configurar dominio noxis.ai (o el que se elija)

10. **Integración MailerLite** — `MAILERLITE_API_KEY` está vacío. Al suscribirse al newsletter, además de guardar en Supabase, añadir el contacto a MailerLite para envío de emails automatizados.

11. **Analytics** — `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_POSTHOG_KEY` están vacíos. Añadir Google Analytics 4 o PostHog para tracking de visitas y comportamiento.

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Recargar datos en Supabase (actualiza los 30 tools y 15 comparativas)
npm run seed:phase3

# Publicar posts SEO originales del blog
npm run seed:blog

# Generar/actualizar el post diario del foro IA (requiere migration + OPENAI_API_KEY)
npm run forum:generate

# Cargar enlaces afiliados reales desde AFFILIATE_URL_*
npm run affiliates:update

# TypeScript check
npx tsc --noEmit

# Build de producción
npm run build
```

---

## URLs disponibles en desarrollo

| URL | Estado |
|---|---|
| `http://localhost:3000/` | Home con featured tools |
| `http://localhost:3000/herramientas` | Grid de 30 tools con filtros |
| `http://localhost:3000/herramientas/chatgpt` | Ficha de ChatGPT |
| `http://localhost:3000/comparar` | Índice de 15 comparativas |
| `http://localhost:3000/comparar/chatgpt-vs-claude` | Comparativa lado a lado |
| `http://localhost:3000/noticias` | Hub diario de noticias IA/tecnología |
| `http://localhost:3000/foro` | Foro IA con posts diarios de Noxis Radar |
| `http://localhost:3000/foro/radar-ia-tecnologia-YYYY-MM-DD` | Publicación diaria generada con fuentes |
| `http://localhost:3000/api/cron/forum?secret=...` | Endpoint cron para generar el post diario |
| `http://localhost:3000/categoria/chat` | Tools de categoría Chat |
| `http://localhost:3000/blog` | Blog con 5 posts SEO originales |
| `http://localhost:3000/privacidad` | Política de privacidad |
| `http://localhost:3000/terminos` | Términos de uso |
| `http://localhost:3000/cookies` | Política de cookies |
| `http://localhost:3000/afiliados` | Disclosure de afiliados |
| `http://localhost:3000/admin` | Panel de métricas |
| `http://localhost:3000/sitemap.xml` | Sitemap dinámico |
| `http://localhost:3000/go/chatgpt` | Redirect de afiliado |
