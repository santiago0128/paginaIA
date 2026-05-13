-- Agregar columnas faltantes a la tabla tools
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS is_affiliate BOOLEAN DEFAULT FALSE;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS schema_json JSONB;
