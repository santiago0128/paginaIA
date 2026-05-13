import { env } from "@/lib/config/env";

export const brand = {
  name: env.NEXT_PUBLIC_BRAND_NAME,
  shortName: env.NEXT_PUBLIC_BRAND_NAME,
  tagline: env.NEXT_PUBLIC_BRAND_TAGLINE,
  domain: new URL(env.NEXT_PUBLIC_SITE_URL).hostname,
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
  locale: "es-CO",
  defaultLanguage: "es",
  supportEmail: env.NEXT_PUBLIC_SUPPORT_EMAIL,
  contactEmail: env.NEXT_PUBLIC_CONTACT_EMAIL,
  partnershipsEmail: env.NEXT_PUBLIC_PARTNERSHIPS_EMAIL,
  social: {
    x: env.NEXT_PUBLIC_SOCIAL_X_URL ?? "",
    linkedin: env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ?? "",
    instagram: env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL ?? "",
    youtube: env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL ?? "",
  },
  seo: {
    titleTemplate: `%s | ${env.NEXT_PUBLIC_BRAND_NAME}`,
    defaultTitle: "Comparador de herramientas de IA",
    defaultDescription:
      "Compara herramientas de IA por precio, casos de uso, planes, pros y contras.",
    keywords: [
      "comparador IA",
      "herramientas de inteligencia artificial",
      "ChatGPT vs Claude",
      "Midjourney vs DALL-E",
      "herramientas IA en español",
    ],
    ogImage: "/og/default.png",
    twitterCard: "summary_large_image",
  },
  legal: {
    companyName: env.NEXT_PUBLIC_BRAND_NAME,
    privacyUrl: "/privacidad",
    termsUrl: "/terminos",
    cookiesUrl: "/cookies",
    affiliateDisclosureUrl: "/afiliados",
    jurisdiction: "Colombia",
  },
  navigation: {
    primary: [
      { label: "Herramientas", href: "/herramientas" },
      { label: "Comparar", href: "/comparar/chatgpt-vs-claude" },
      { label: "Noticias", href: "/noticias" },
      { label: "Foro IA", href: "/foro" },
      { label: "Blog", href: "/blog" },
    ],
    footer: [
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
      { label: "Cookies", href: "/cookies" },
      { label: "Afiliados", href: "/afiliados" },
    ],
  },
  monetization: {
    disclosure:
      "Algunos enlaces de este sitio pueden ser enlaces de afiliado. Si compras desde ellos, podemos recibir una comisión sin costo adicional para ti.",
  },
} as const;

export const buildUrl = (path = "/") => new URL(path, brand.siteUrl).toString();
