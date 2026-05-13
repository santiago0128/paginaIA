# 🚀 Quick Start - Forum AI

## 1️⃣ Prueba Local (Ahora Mismo)

Verifica que todo funciona correctamente:

```bash
# Genera un post de prueba
curl "http://localhost:3000/api/forum/generate?secret=TU_API_SECRET_KEY&type=daily"
```

Deberías obtener:
```json
{
  "ok": true,
  "post": {
    "slug": "foro-daily-...",
    "title": "...",
    "excerpt": "...",
    "content": "...",
    "generatedAt": "..."
  }
}
```

✅ Si funciona, continúa...

---

## 2️⃣ Prueba el Cron Localmente

```bash
# Simula la ejecución del cron
curl "http://localhost:3000/api/cron/forum?secret=cron_noxis_radar_2026_secure_key_forum_ai"
```

Deberías ver el mismo resultado que arriba.

✅ Si funciona, el cron está listo...

---

## 3️⃣ Elige tu Plataforma de Hosting

**¿Dónde vas a desplegar tu app?**

- **Vercel** → [Leer: docs/cron-setup.md#vercel]
- **Railway** → [Leer: docs/cron-setup.md#railway]
- **Render** → [Leer: docs/cron-setup.md#render]
- **EasyCron** → [Leer: docs/cron-setup.md#easycron]
- **Google Cloud** → [Leer: docs/cron-setup.md#google-cloud-scheduler]
- **VPS Propio** → [Leer: docs/cron-setup.md#linuxvps-propio]

---

## 4️⃣ Después de Desplegar

1. **Verifica que el cron se ejecuta:**
   ```bash
   # Mira los logs en tu plataforma
   # Deberías ver POST /api/cron/forum 200
   ```

2. **Revisa el foro:**
   - Ve a `https://tu-dominio.com/foro`
   - Deberías ver posts nuevos cada día

3. **Monitorea con Supabase:**
   - Abre Supabase dashboard
   - Tabla `forum_posts`
   - Filtra por `author_type = 'ai'`
   - Verifica que hay posts nuevos cada día

---

## 📋 Checklist de Configuración

- [ ] `vercel.json` creado (si usas Vercel)
- [ ] `.env` tiene `FORUM_CRON_SECRET`
- [ ] `.env` tiene `OPENAI_API_KEY`
- [ ] Probé localmente con curl y funciona
- [ ] Elegí plataforma de hosting
- [ ] Configuré el cron en mi plataforma
- [ ] Desplegué a producción
- [ ] Verifiqué que el cron se ejecuta
- [ ] Confirmé posts nuevos en el foro cada día

---

## 🆘 Problemas?

### "Error: No autorizado"
```
✓ Verifica que secret = FORUM_CRON_SECRET
✓ No debe haber espacios en blanco
```

### "Error: OPENAI_API_KEY no está configurado"
```
✓ Asegúrate de que OPENAI_API_KEY está en .env
✓ Si está en Supabase, cópialo a tu plataforma también
```

### "Error: No hay noticias"
```
✓ Google News RSS podría estar offline
✓ Intenta con: /api/forum/generate?type=daily&secret=...
```

### El cron no se ejecuta
```
✓ Revisa logs en tu plataforma
✓ Verifica que la URL es correcta
✓ Comprueba la zona horaria (UTC vs local)
✓ Contacta soporte de tu plataforma
```

---

## 💡 Próximas Mejoras

- [ ] Añadir más prompts temáticos
- [ ] Crear admin panel para monitorear generaciones
- [ ] Agregar alertas si falla un cron
- [ ] Analytics de posts más populares
- [ ] Integración con Slack/Discord para notificaciones

---

**¿Necesitas ayuda?** Revisa [docs/forum-ai-automatic.md](forum-ai-automatic.md) o [docs/cron-setup.md](cron-setup.md)
