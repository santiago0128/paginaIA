# 🤖 Forum AI - Sistema Automático

El foro se llena **automáticamente** con posts generados por la IA. No hay formulario público para que los usuarios envíen peticiones.

## 📡 Generación Automática

### 1. **Cron Diario** (Recomendado)
Ejecuta automáticamente cada día a una hora fija:
```bash
POST https://tunoxis.com/api/cron/forum?secret=FORUM_CRON_SECRET
```

Configura en tu servidor/plataforma (Vercel, Railway, etc) para ejecutar cada 24 horas.

---

## 🎯 Prompts Internos Disponibles

Genera posts bajo demanda con diferentes temas:

### Por Tipo de Contenido
```bash
# Diario (análisis del día)
GET https://tunoxis.com/api/forum/generate?type=daily&secret=API_SECRET_KEY

# Semanal
GET https://tunoxis.com/api/forum/generate?type=weekly&secret=API_SECRET_KEY

# Empresas líderes en IA
GET https://tunoxis.com/api/forum/generate?type=leaders&secret=API_SECRET_KEY

# Seguridad en IA
GET https://tunoxis.com/api/forum/generate?type=security&secret=API_SECRET_KEY

# Startups destacadas
GET https://tunoxis.com/api/forum/generate?type=startups&secret=API_SECRET_KEY

# Comparativa de herramientas
GET https://tunoxis.com/api/forum/generate?type=tools&secret=API_SECRET_KEY

# Ética en IA
GET https://tunoxis.com/api/forum/generate?type=ethics&secret=API_SECRET_KEY

# Impacto laboral
GET https://tunoxis.com/api/forum/generate?type=jobs&secret=API_SECRET_KEY

# Adopción empresarial
GET https://tunoxis.com/api/forum/generate?type=enterprise&secret=API_SECRET_KEY

# Investigación científica
GET https://tunoxis.com/api/forum/generate?type=research&secret=API_SECRET_KEY
```

### Con Prompt Personalizado
```bash
GET https://tunoxis.com/api/forum/generate?prompt=Tu%20prompt%20aqui&secret=API_SECRET_KEY
```

---

## 🔐 Autenticación

Usa **una de estas opciones**:

### Opción 1: Query Parameter
```bash
/api/forum/generate?secret=TU_API_SECRET_KEY&type=daily
```

### Opción 2: Header Authorization
```bash
curl -H "Authorization: Bearer TU_API_SECRET_KEY" \
  "https://tunoxis.com/api/forum/generate?type=daily"
```

---

## 📊 Respuesta Exitosa

```json
{
  "ok": true,
  "post": {
    "slug": "foro-daily-1715500800000",
    "title": "Título del post",
    "excerpt": "Extracto corto",
    "content": "Contenido completo del análisis...",
    "topic": "ia",
    "generatedAt": "2026-05-13T14:32:10Z"
  }
}
```

---

## 📋 Prompts Internos Definidos

| Tipo | Prompt |
|------|--------|
| `daily` | Analiza las tendencias más importantes en IA y tecnología del día |
| `weekly` | ¿Cuáles fueron los avances más relevantes en IA esta semana? |
| `leaders` | ¿Qué empresas están liderando la revolución de la IA generativa? |
| `security` | Analiza los riesgos de seguridad más críticos en sistemas de IA |
| `startups` | ¿Cuáles son las startups más prometedoras en el espacio de IA? |
| `tools` | Comparativa de herramientas IA más usadas en 2026 |
| `ethics` | ¿Cuáles son los desafíos éticos principales de la IA actual? |
| `jobs` | ¿Cómo la IA está transformando el mercado laboral? |
| `enterprise` | Adopción de IA en empresas: casos de éxito y lecciones |
| `research` | Investigaciones científicas recientes que revolucionan la IA |

---

## 🚀 Próximas Mejoras Posibles

- [ ] Agregar más prompts temáticos
- [ ] Integrar con API de noticias en tiempo real
- [ ] Agendar generación automática por tipo de tema
- [ ] Analytics de posts más populares
- [ ] Webhook para notificar cuando se genera un post

---

## ❌ Lo que NO funciona

- **FormularioPublico**: Removido ✓
- **Peticiones de usuarios**: Deshabilitadas ✓
- `/api/forum/submit-request`: Devuelve error 403

Solo la generación **interna automática** y los endpoints autenticados funcionan.
