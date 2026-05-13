# 🔧 Actualizar Base de Datos Supabase

## ✅ Para nuevas instalaciones
Si estás creando la BD desde cero, ejecuta **TODO el contenido** de:
```
scripts/supabase-schema.sql
```

En Supabase:
1. Abre tu proyecto > SQL Editor
2. Copia TODO el contenido de `scripts/supabase-schema.sql`
3. Pégalo en el editor
4. Click en "Run" ▶️

## ⚠️ Para bases de datos EXISTENTES
Si ya tienes la tabla `forum_posts`, necesitas agregar el campo `metadata`:

### Opción 1: Script Quick Fix (RECOMENDADO)
1. Abre Supabase > SQL Editor
2. Copia TODO el contenido de:
```
scripts/add-forum-metadata.sql
```
3. Pégalo y ejecuta

### Opción 2: SQL Manual (si Opción 1 falla)
```sql
ALTER TABLE public.forum_posts
ADD COLUMN IF NOT EXISTS metadata JSONB;

CREATE INDEX IF NOT EXISTS idx_forum_posts_author_type ON public.forum_posts(author_type);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON public.forum_posts(created_at DESC);
```

## ✓ Verificar que funciona
Después de ejecutar, en SQL Editor:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'forum_posts' 
ORDER BY ordinal_position;
```

Debe mostrar una columna `metadata` con tipo `jsonb`.

## 📋 Campos esperados en `forum_posts`:
- ✅ id (UUID)
- ✅ slug (TEXT)
- ✅ title (TEXT)
- ✅ excerpt (TEXT)
- ✅ content (TEXT)
- ✅ author_name (TEXT)
- ✅ author_type (TEXT)
- ✅ topic (TEXT)
- ✅ source_urls (TEXT[])
- ✅ source_titles (TEXT[])
- ✅ **metadata (JSONB)** ← NUEVO
- ✅ status (TEXT)
- ✅ published_at (TIMESTAMP)
- ✅ created_at (TIMESTAMP)
- ✅ updated_at (TIMESTAMP)

## 🚀 Después de actualizar:
Tu foro podrá aceptar peticiones de usuarios y guardarlas con metadatos (quién las envió, cuándo, etc).
