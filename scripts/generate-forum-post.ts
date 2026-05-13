import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import { createDailyForumPost } from "../lib/forum/posts";

async function main() {
  const post = await createDailyForumPost();
  console.log(`${post.created ? "Publicado" : "Actualizado"}: ${post.title}`);
  console.log(`/foro/${post.slug}`);
}

main().catch((error) => {
  console.error("Error generando publicación del foro:");
  console.error(error);
  process.exit(1);
});
