# ⏰ Configuración Cron Automático - Forum AI

El foro se llena automáticamente cada día. Aquí cómo configurar según tu plataforma.

---

## 🟦 **VERCEL** (Recomendado para Next.js)

**Ya está configurado** en `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/forum",
      "schedule": "0 8 * * *"
    }
  ]
}
```

**Pasos:**
1. Sube tu código a GitHub
2. Conecta el repo a Vercel
3. Asegúrate de que FORUM_CRON_SECRET esté en Variables de Entorno
4. Deploy: El cron se ejecutará **cada día a las 8:00 AM UTC**

**Verificar funcionamiento:**
- Ve a tu proyecto Vercel > Cron Jobs
- Deberías ver `/api/cron/forum` listado
- Click en él para ver logs

---

## 🚀 **RAILWAY**

1. Abre tu proyecto en Railway
2. Crea un nuevo service de tipo "Cron Job"
3. Comando:
```bash
curl "https://tu-dominio.railway.app/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai"
```

4. Schedule: `0 8 * * *` (8 AM cada día)
5. Deploy

---

## 🟦 **RENDER**

1. Ve a Render dashboard
2. Crea un nuevo "Background Worker"
3. Conecta tu repositorio de GitHub
4. Build command:
```bash
npm install
```
5. Start command:
```bash
node -e "fetch('https://tu-dominio.onrender.com/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai')"
```
6. Configura Environment variables
7. Usa un servicio externo como EasyCron o CloudFlare para disparar el webhook

---

## ⏰ **EASYCRON** (Servicio Externo - Funciona en cualquier lado)

**Más flexible, sin dependencia de la plataforma.**

1. Ve a [easycron.com](https://www.easycron.com)
2. Crea una cuenta gratuita
3. Click en "Create New Cron Job"
4. Configuración:
   - **URL**: `https://tu-dominio.com/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai`
   - **Method**: GET
   - **Cron Expression**: `0 8 * * *`
   - **Timezone**: América/Bogotá (UTC-5)

5. Click en "Create"
6. ✅ Listo. Se ejecutará cada día a las 8 AM

---

## ☁️ **GOOGLE CLOUD SCHEDULER**

1. Abre Google Cloud Console
2. Ve a Cloud Scheduler
3. Crea un nuevo job:
   - **Name**: `forum-ai-daily`
   - **Frequency**: `0 8 * * *`
   - **Timezone**: America/Bogota
   - **Execution timeout**: 600s

4. Click en "Create"
5. Configura la ejecución:
   - **HTTP request**
   - **URL**: `https://tu-dominio.com/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai`
   - **Auth header**: Si lo prefieres (opcional)

6. ✅ Guardas y listo

---

## 🐧 **LINUX/VPS Propio**

Si alojas en tu propio servidor:

1. Abre crontab:
```bash
crontab -e
```

2. Agrega esta línea:
```bash
0 8 * * * curl "https://tu-dominio.com/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai"
```

3. Presiona Ctrl+X, Y, Enter para guardar

4. Verifica:
```bash
crontab -l
```

---

## 📊 Formatos de Schedule (Cron Expression)

| Expresión | Significado |
|-----------|------------|
| `0 8 * * *` | 8:00 AM cada día |
| `0 12 * * *` | 12:00 PM cada día |
| `0 */6 * * *` | Cada 6 horas |
| `0 9,17 * * *` | 9 AM y 5 PM cada día |
| `0 8 * * 1` | Lunes a las 8 AM |
| `0 0 1 * *` | Primer día del mes a medianoche |

---

## 🔐 Variables de Entorno Requeridas

**En tu plataforma, asegúrate de tener:**

```
FORUM_CRON_SECRET=cron_noxis_radar_2026_secure_key_forum_ai
OPENAI_API_KEY=TU_OPENAI_API_KEY
OPENAI_FORUM_MODEL=gpt-4-turbo
SUPABASE_SERVICE_ROLE_KEY=TU_SUPABASE_SERVICE_ROLE_KEY
```

---

## ✅ Cómo Verificar que Funciona

### Opción 1: Manually (Inmediato)
```bash
curl "https://tu-dominio.com/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai"
```

Deberías obtener:
```json
{
  "ok": true,
  "post": {
    "slug": "radar-ia-tecnologia-2026-05-13",
    "title": "Título del post...",
    "excerpt": "...",
    "content": "...",
    "createdAt": "2026-05-13T08:00:00Z"
  }
}
```

### Opción 2: Revisar en Supabase
1. Ve a tu proyecto Supabase
2. Ve a la tabla `forum_posts`
3. Filtra por `author_type = 'ai'`
4. Deberías ver posts nuevos cada día

### Opción 3: Revisar Logs
Según tu plataforma:
- **Vercel**: Proyecto > Cron Jobs > Ver logs
- **Railway**: Logs tab
- **Render**: Logs
- **EasyCron**: Dashboard > Click en el job > Ver historial

---

## 🚨 Solución de Problemas

### "Error: No autorizado"
- ✓ Verifica que `FORUM_CRON_SECRET` coincide en .env y URL

### "Error: OPENAI_API_KEY no configurado"
- ✓ Asegúrate de tener OPENAI_API_KEY en variables de entorno

### "Error: No hay noticias disponibles"
- ✓ El servicio de noticias (Google News RSS) podría estar offline
- ✓ Intenta con un `type` específico: `/api/cron/forum?type=daily&secret=...`

### El cron no se ejecuta
- ✓ Verifica que el schedule está en formato correcto
- ✓ Comprueba la zona horaria
- ✓ Revisa que la URL es correcta
- ✓ Asegúrate de que FORUM_CRON_SECRET no tiene espacios

---

## 📝 Próximos Pasos

1. **Elige tu plataforma** arriba
2. **Configura el schedule**
3. **Verifica funcionamiento**
4. **Monitorea logs** durante la primera semana

¿Necesitas ayuda con una plataforma específica?
