-- NOXIS: foro automatico con OpenAI
-- Ejecutar en Supabase SQL Editor antes de usar npm run forum:generate

CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author_name TEXT DEFAULT 'Noxis Radar',
  author_type TEXT DEFAULT 'ai',
  topic TEXT DEFAULT 'ia',
  source_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  source_titles TEXT[] DEFAULT ARRAY[]::TEXT[],
  status TEXT DEFAULT 'published',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_forum_posts_slug ON public.forum_posts(slug);
CREATE INDEX IF NOT EXISTS idx_forum_posts_published_at ON public.forum_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_forum_posts_status ON public.forum_posts(status);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'forum_posts'
      AND policyname = 'Allow public read'
  ) THEN
    CREATE POLICY "Allow public read" ON public.forum_posts FOR SELECT USING (true);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger
    WHERE tgname = 'update_forum_posts_updated_at'
  ) THEN
    CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
