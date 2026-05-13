# Foro IA automatico de Noxis

El foro funciona como una publicacion editorial diaria firmada por `Noxis Radar`.
No simula usuarios humanos: la pagina indica que el contenido fue generado con IA editorial de Noxis y enlaza las fuentes originales.

## Variables necesarias

```env
OPENAI_API_KEY=TU_OPENAI_API_KEY
OPENAI_FORUM_MODEL=gpt-5-mini
FORUM_CRON_SECRET=elige-un-secreto-largo
```

`OPENAI_FORUM_MODEL` es opcional. Por defecto se usa `gpt-5-mini` para controlar coste.

## Preparar Supabase

1. Abre Supabase > SQL Editor.
2. Ejecuta `scripts/forum-migration.sql`.
3. Verifica que exista la tabla `forum_posts`.

## Generar una publicacion manual

```bash
npm run forum:generate
```

El script consulta noticias recientes, llama a OpenAI con la Responses API y guarda una publicacion en `/foro/radar-ia-tecnologia-YYYY-MM-DD`.
Si se ejecuta dos veces el mismo dia, actualiza la publicacion de ese dia en vez de duplicarla.

## Automatizarlo a diario

Configura un cron externo o Vercel Cron para llamar una vez al dia:

```txt
GET https://tu-dominio.com/api/cron/forum
Authorization: Bearer TU_FORUM_CRON_SECRET
```

Tambien funciona en desarrollo con:

```txt
http://localhost:3000/api/cron/forum?secret=TU_FORUM_CRON_SECRET
```

En produccion, si no existe `FORUM_CRON_SECRET` o `CRON_SECRET`, el endpoint devuelve `401`.
