import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/config/env";
import { generateForumPostFromNews } from "@/lib/openai/forum";
import { getDailyNews } from "@/lib/news/rss";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest): boolean {
  const secret = env.API_SECRET_KEY;

  if (!secret) {
    return process.env.NODE_ENV !== "production";
  }

  const header = request.headers.get("authorization") ?? "";
  const bearer = header.replace(/^Bearer\s+/i, "");
  const querySecret = request.nextUrl.searchParams.get("secret");

  return bearer === secret || querySecret === secret;
}

const INTERNAL_PROMPTS: Record<string, string> = {
  daily: "Analiza las tendencias más importantes en IA y tecnología del día",
  weekly: "¿Cuáles fueron los avances más relevantes en IA esta semana?",
  leaders: "¿Qué empresas están liderando la revolución de la IA generativa?",
  security: "Analiza los riesgos de seguridad más críticos en sistemas de IA",
  startups: "¿Cuáles son las startups más prometedoras en el espacio de IA?",
  tools: "Comparativa de herramientas IA más usadas en 2026",
  ethics: "¿Cuáles son los desafíos éticos principales de la IA actual?",
  jobs: "¿Cómo la IA está transformando el mercado laboral?",
  enterprise: "Adopción de IA en empresas: casos de éxito y lecciones",
  research: "Investigaciones científicas recientes que revolucionan la IA",
};

async function generateWithCustomPrompt(customPrompt: string): Promise<{ title: string; excerpt: string; content: string; topic: string }> {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY no está configurado.");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_FORUM_MODEL ?? "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content:
            "Eres Noxis Radar, la voz editorial de Noxis. Escribes en español claro para lectores que quieren entender inteligencia artificial y tecnología. Proporciona análisis profundo, rigor editorial y ejemplos prácticos.",
        },
        {
          role: "user",
          content: `${customPrompt}

Responde en formato JSON con esta estructura exacta:
{
  "title": "Título atractivo para SEO (máximo 110 caracteres)",
  "excerpt": "Un párrafo corto (máximo 240 caracteres)",
  "content": "Análisis detallado de 800-1200 palabras con puntos clave y reflexión editorial",
  "topic": "ia"
}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
      max_tokens: 2500,
      temperature: 0.7,
    }),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message = (payload as { error?: { message?: string } })?.error?.message ?? "Error en OpenAI";
    throw new Error(message);
  }

  const outputText =
    (payload as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content ?? "";
  const parsed = JSON.parse(outputText);

  if (!parsed.title || !parsed.excerpt || !parsed.content) {
    throw new Error("Respuesta incompleta de la IA");
  }

  return parsed;
}

async function handleRequest(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "No autorizado. Proporciona ?secret=tu_api_key o header Authorization: Bearer tu_api_key" },
      { status: 401 }
    );
  }

  if (!env.OPENAI_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "OPENAI_API_KEY no está configurado." },
      { status: 500 }
    );
  }

  try {
    const promptType = request.nextUrl.searchParams.get("type") ?? "daily";
    const customPrompt = request.nextUrl.searchParams.get("prompt");

    let generatedPost: { title: string; excerpt: string; content: string; topic: string };

    if (customPrompt) {
      // Usar prompt personalizado desde query param
      generatedPost = await generateWithCustomPrompt(customPrompt);
    } else if (INTERNAL_PROMPTS[promptType]) {
      // Usar prompt interno predefinido
      generatedPost = await generateWithCustomPrompt(INTERNAL_PROMPTS[promptType]);
    } else {
      // Default: generar desde noticias
      const news = await getDailyNews(36);
      if (news.length === 0) {
        return NextResponse.json(
          { ok: false, error: "No hay noticias disponibles para generar el post." },
          { status: 400 }
        );
      }
      generatedPost = await generateForumPostFromNews(news);
    }

    // Guardar en Supabase
    const supabase = createAdminClient();
    const slug = `foro-${promptType}-${Date.now()}`;
    const now = new Date().toISOString();

    const { error: dbError } = await supabase.from("forum_posts").insert({
      slug,
      title: generatedPost.title,
      excerpt: generatedPost.excerpt,
      content: generatedPost.content,
      author_name: "Noxis Radar",
      author_type: "ai",
      topic: generatedPost.topic,
      published_at: now,
      source_urls: [],
      metadata: {
        generation_type: customPrompt ? "custom_prompt" : promptType,
        prompt: customPrompt || INTERNAL_PROMPTS[promptType],
        generated_at: now,
      },
    });

    if (dbError) {
      throw new Error(`No se pudo guardar en BD: ${dbError.message}`);
    }

    return NextResponse.json({
      ok: true,
      post: {
        slug,
        title: generatedPost.title,
        excerpt: generatedPost.excerpt,
        content: generatedPost.content,
        topic: generatedPost.topic,
        generatedAt: now,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo generar la publicación.";
    console.error("Forum generate error:", error);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}
