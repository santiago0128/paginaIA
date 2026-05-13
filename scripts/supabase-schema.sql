-- ============================================================================
-- NOXIS: Schema SQL para Supabase
-- Ejecutar esto en: Supabase > SQL Editor > Copiar/Pegar todo esto
-- ============================================================================

-- 1. Categorías de herramientas IA
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Herramientas IA
CREATE TABLE IF NOT EXISTS public.tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  long_description TEXT,
  website_url TEXT,
  logo_url TEXT,
  hero_image_url TEXT,
  accent_color TEXT,
  pricing_model TEXT,
  starting_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  affiliate_url TEXT,
  affiliate_program TEXT,
  is_affiliate BOOLEAN DEFAULT FALSE,
  trial_days INTEGER,
  best_for TEXT,
  pros TEXT[] DEFAULT ARRAY[]::TEXT[],
  cons TEXT[] DEFAULT ARRAY[]::TEXT[],
  use_cases TEXT[] DEFAULT ARRAY[]::TEXT[],
  platforms TEXT[] DEFAULT ARRAY[]::TEXT[],
  languages TEXT[] DEFAULT ARRAY[]::TEXT[],
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  integrations TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating_avg DECIMAL(3, 2) DEFAULT 3.5,
  rating_count INTEGER DEFAULT 0,
  comparison_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'published',
  seo_title TEXT,
  seo_description TEXT,
  schema_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Planes de precios
CREATE TABLE IF NOT EXISTS public.tool_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  currency TEXT DEFAULT 'USD',
  billing_period TEXT,
  features TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_popular BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Comparativas
CREATE TABLE IF NOT EXISTS public.comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool1_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  tool2_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  title TEXT,
  description TEXT,
  comparison_data JSONB,
  seo_title TEXT,
  seo_description TEXT,
  rating_avg DECIMAL(3, 2) DEFAULT 3.5,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. Reseñas
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  author_name TEXT,
  author_email TEXT,
  verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 6. Suscriptores de newsletter
CREATE TABLE IF NOT EXISTS public.email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  status TEXT DEFAULT 'subscribed',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  mailerlite_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 7. Clicks de afiliados
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  click_token TEXT NOT NULL UNIQUE,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  referrer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 8. Conversiones de afiliados
CREATE TABLE IF NOT EXISTS public.affiliate_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id UUID NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  click_id UUID REFERENCES public.affiliate_clicks(id) ON DELETE SET NULL,
  conversion_type TEXT,
  conversion_value DECIMAL(10, 2),
  status TEXT DEFAULT 'pending',
  external_reference_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 9. Posts del blog
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author TEXT,
  hero_image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[],
  related_tools UUID[] DEFAULT ARRAY[]::UUID[],
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 10. Publicaciones automaticas del foro
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
  metadata JSONB,
  status TEXT DEFAULT 'published',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================================================
-- ÍNDICES para optimización
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_tools_category_id ON public.tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON public.tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_comparisons_slug ON public.comparisons(slug);
CREATE INDEX IF NOT EXISTS idx_reviews_tool_id ON public.reviews(tool_id);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON public.email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_tool_id ON public.affiliate_clicks(tool_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_forum_posts_slug ON public.forum_posts(slug);
CREATE INDEX IF NOT EXISTS idx_forum_posts_published_at ON public.forum_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_forum_posts_topic ON public.forum_posts(topic);
CREATE INDEX IF NOT EXISTS idx_forum_posts_slug ON public.forum_posts(slug);
CREATE INDEX IF NOT EXISTS idx_forum_posts_published_at ON public.forum_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_forum_posts_status ON public.forum_posts(status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS en tablas públicas
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Permitir lectura pública a todos (SELECT)
CREATE POLICY "Allow public read" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.tool_plans FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.comparisons FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON public.forum_posts FOR SELECT USING (true);

-- Permitir inserción de suscriptores desde cliente
CREATE POLICY "Allow insert email subscribers" ON public.email_subscribers FOR INSERT WITH CHECK (true);

-- Permitir inserción de clicks desde cliente
CREATE POLICY "Allow insert affiliate clicks" ON public.affiliate_clicks FOR INSERT WITH CHECK (true);

-- ============================================================================
-- FUNCIONES DE UTILIDAD
-- ============================================================================

-- Función para actualizar automáticamente updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comparisons_updated_at BEFORE UPDATE ON public.comparisons
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON public.forum_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_subscribers_updated_at BEFORE UPDATE ON public.email_subscribers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================
