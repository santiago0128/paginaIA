-- ============================================================================
-- MIGRACIÓN: Agregar campo metadata a forum_posts
-- Ejecutar esto en: Supabase > SQL Editor si la tabla ya existe
-- ============================================================================

-- Si la columna no existe, la crea
ALTER TABLE IF EXISTS public.forum_posts
ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Agregue índice de búsqueda si no existe
CREATE INDEX IF NOT EXISTS idx_forum_posts_author_type ON public.forum_posts(author_type);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON public.forum_posts(created_at DESC);

-- Mostrar columnas de forum_posts para verificar
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'forum_posts' 
ORDER BY ordinal_position;
