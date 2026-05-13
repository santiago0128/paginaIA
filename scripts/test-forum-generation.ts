#!/usr/bin/env ts-node

/**
 * Script para probar el generador de posts del foro
 * Uso: npx ts-node scripts/test-forum-generation.ts
 */

import { generateForumPostFromNews } from "@/lib/openai/forum";
import { getDailyNews } from "@/lib/news/rss";

async function main() {
  console.log("🧪 Probando generación de posts del foro...\n");

  try {
    console.log("📰 Obteniendo noticias del día...");
    const news = await getDailyNews();
    console.log(`✓ ${news.length} noticias obtenidas\n`);

    if (news.length === 0) {
      console.error("❌ No hay noticias disponibles");
      process.exit(1);
    }

    console.log("🤖 Generando post con IA...");
    const post = await generateForumPostFromNews(news);

    console.log("\n✅ Post generado exitosamente:\n");
    console.log("━".repeat(60));
    console.log(`📌 Título: ${post.title}`);
    console.log(`📝 Extracto: ${post.excerpt}`);
    console.log(`📂 Tema: ${post.topic}`);
    console.log(`📚 Fuentes: ${post.sourceTitles.length}`);
    console.log("━".repeat(60));
    console.log(`\n📄 Contenido (primeras 200 caracteres):\n${post.content.substring(0, 200)}...\n`);

    console.log("✓ El generador de posts está funcionando correctamente");
    console.log("\n💡 Próximo paso: Configurar el cron automático");
    console.log("📖 Lee: docs/cron-setup.md\n");

  } catch (error) {
    console.error("❌ Error al generar post:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
