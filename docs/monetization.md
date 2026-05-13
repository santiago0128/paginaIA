# Monetización de Noxis

## Estado listo

- Páginas legales: `/privacidad`, `/terminos`, `/cookies`, `/afiliados`.
- Blog SEO seed: `npm run seed:blog`.
- Hub diario: `/noticias`.
- Slots AdSense opcionales: se muestran solo si existen `NEXT_PUBLIC_ADSENSE_CLIENT` y el slot correspondiente.
- Enlaces afiliados: se cargan con variables `AFFILIATE_URL_*` y `npm run affiliates:update`.

## Variables para afiliados

Configura solo enlaces aprobados por cada programa. No uses URLs genéricas como afiliadas.

```env
AFFILIATE_URL_JASPER=
AFFILIATE_URL_WRITESONIC=
AFFILIATE_URL_HEYGEN=
AFFILIATE_URL_SYNTHESIA=
AFFILIATE_URL_ELEVENLABS=
AFFILIATE_URL_NOTION=
AFFILIATE_URL_CANVA=
AFFILIATE_URL_GRAMMARLY=
```

Después ejecuta:

```bash
npm run affiliates:update
```

## AdSense

Cuando Google apruebe el sitio, añade:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_BLOG=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_NEWS=1234567891
```

## Antes de aplicar a AdSense

- Publicar el sitio en producción con dominio real.
- Confirmar que las páginas legales no dan 404.
- Tener contenido original indexable en el blog.
- Evitar que `/noticias` sea solo contenido externo: añadir análisis propio en posts del blog.
- Revisar que no haya botones rotos ni páginas vacías.
