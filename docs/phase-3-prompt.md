# Fase 3 Prompt

Actúa como analista de producto y research lead para Noxis, una web comparadora de herramientas de IA en español.

Objetivo:
Investigar, normalizar y preparar la carga inicial de las primeras 30 herramientas de IA más relevantes para el mercado hispanohablante y global, priorizando SEO, potencial de afiliación y utilidad real para usuarios.

Contexto del proyecto:
- Nombre del proyecto: Noxis
- Tagline: Descubre qué IA gana para ti
- Dominio: noxis.com.co
- Stack: Next.js 14 + Tailwind CSS + shadcn/ui + Supabase + Vercel + MailerLite
- El proyecto debe ser name-agnostic: no hardcodees la marca ni el dominio fuera de la configuración central
- Los nombres de tablas y campos no deben incluir la marca del proyecto
- Todo el contenido debe estar en español

Quiero que entregues:

1. Una lista priorizada de 30 herramientas de IA.
2. Para cada herramienta, devuelve estos campos:
- name
- slug
- shortDescription
- longDescription
- websiteUrl
- affiliateUrl
- affiliateProgram
- category
- bestFor
- pricingModel
- startingPrice
- currency
- trialDays
- platforms
- languages
- features
- pros
- cons
- useCases
- seoTitle
- seoDescription
- status
- isFeatured
- sourceNotes
- seoPriority
- monetizationPriority

3. 15 comparativas 1 vs 1 con alta intención SEO.
4. 10 categorías recomendadas para el sitio, con slug y descripción.
5. Un criterio de scoring para priorizar herramientas.
6. Un criterio de normalización.
7. Fuentes y validación.
8. Un JSON final listo para importar a Supabase o usar como seed en Next.js.

Reglas:
- Prioriza herramientas con volumen de búsqueda y páginas de precios claras.
- Prioriza herramientas con potencial de afiliación real.
- Prioriza herramientas útiles para trabajo, creación de contenido, diseño y productividad.
- No incluyas herramientas irrelevantes o demasiado experimentales.
- Si una herramienta tiene varios planes, normaliza la estructura para que sea consistente.
- Devuelve el resultado ordenado por prioridad global.

Formato de salida:
- Primero la lista priorizada.
- Luego las comparativas.
- Luego categorías.
- Luego el JSON final.
- Finalmente, un resumen ejecutivo con las 10 mejores herramientas para lanzar primero.