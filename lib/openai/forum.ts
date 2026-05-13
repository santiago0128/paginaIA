import { z } from "zod";
import { env } from "@/lib/config/env";
import type { NewsItem, NewsTopic } from "@/lib/news/rss";

const DEFAULT_FORUM_MODEL = "gpt-5-mini";

const generatedForumPostSchema = z.object({
  title: z.string().min(12).max(110),
  excerpt: z.string().min(40).max(240),
  content: z.string().min(600).max(8000),
  topic: z.enum(["ia", "tecnologia", "startups"]),
  source_titles: z.array(z.string()).min(1).max(6),
  source_urls: z.array(z.string().url()).min(1).max(6),
});

export type GeneratedForumPost = {
  title: string;
  excerpt: string;
  content: string;
  topic: NewsTopic;
  sourceTitles: string[];
  sourceUrls: string[];
};

// Response validation and helper extraction removed: not used in current flow.

function trimNewsItem(item: NewsItem) {
  return {
    title: item.title,
    source: item.source,
    url: item.url,
    publishedAt: item.publishedAt,
    topic: item.topic,
    excerpt: item.excerpt.slice(0, 420),
  };
}

function normalizeSources(parsed: z.infer<typeof generatedForumPostSchema>, news: NewsItem[]) {
  const sourceByUrl = new Map(news.map((item) => [item.url, item]));
  const sourceUrls = parsed.source_urls.filter((url) => sourceByUrl.has(url));
  const fallbackUrls = news.slice(0, 4).map((item) => item.url);
  const urls = sourceUrls.length > 0 ? sourceUrls : fallbackUrls;

  return {
    sourceUrls: urls,
    sourceTitles: urls.map((url) => sourceByUrl.get(url)?.title ?? url),
  };
}

export async function generateForumPostFromNews(news: NewsItem[]): Promise<GeneratedForumPost> {
  if (!env.OPENAI_API_KEY) {
    throw new Error("Falta OPENAI_API_KEY en .env.");
  }

  if (news.length === 0) {
    throw new Error("No hay noticias disponibles para generar el foro.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_FORUM_MODEL ?? DEFAULT_FORUM_MODEL,
      messages: [
        {
          role: "system",
          content:
            "Eres Noxis Radar, la voz editorial de Noxis. Escribes en español claro para lectores que quieren entender inteligencia artificial y tecnología sin humo. No finjas ser una persona ni inventes fuentes. Usa solo las fuentes entregadas. Si una afirmación no está en las fuentes, exprésala como lectura editorial o tendencia posible.",
        },
        {
          role: "user",
          content: `Fecha editorial: ${new Date().toISOString()}

Genera una publicación diaria para el foro de Noxis a partir de estas noticias recientes:
${JSON.stringify(news.slice(0, 12).map(trimNewsItem), null, 2)}

Requisitos:
- Título atractivo, sobrio y útil para SEO.
- Extracto de una frase.
- Contenido entre 650 y 950 palabras.
- Empieza con un resumen de lo importante.
- Incluye 3 a 5 puntos de análisis para lectores de Noxis.
- Añade una sección "Qué vigilar" con señales concretas.
- No incluyas enlaces dentro del contenido; devuelve las fuentes en source_urls/source_titles.
- Firma implícita como Noxis Radar, no como usuario humano.

Devuelve la respuesta en este formato JSON exacto:
{
  "title": "...",
  "excerpt": "...",
  "content": "...",
  "topic": "ia|tecnologia|startups",
  "source_titles": [...],
  "source_urls": [...]
}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
      max_tokens: 2200,
      temperature: 0.7,
    }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = (payload as { error?: { message?: string } } | null)?.error?.message ?? "Error llamando a OpenAI.";
    throw new Error(message);
  }

  const outputText =
    (payload as { choices?: Array<{ message?: { content?: string } }> } | null)?.choices?.[0]?.message?.content ?? "";
  const parsedJson = JSON.parse(outputText);
  const parsed = generatedForumPostSchema.parse(parsedJson);
  const { sourceTitles, sourceUrls } = normalizeSources(parsed, news);

  return {
    title: parsed.title,
    excerpt: parsed.excerpt,
    content: parsed.content,
    topic: parsed.topic,
    sourceTitles,
    sourceUrls,
  };
}
