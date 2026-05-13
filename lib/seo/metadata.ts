import type { Metadata } from "next";
import { brand, buildUrl } from "@/lib/config/brand";

export function createPageMetadata(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title: input.title,
    description: input.description ?? brand.seo.defaultDescription,
    alternates: { canonical: buildUrl(input.path) },
    openGraph: {
      title: input.title,
      description: input.description ?? brand.seo.defaultDescription,
      url: buildUrl(input.path),
      siteName: brand.name,
      locale: brand.locale,
      type: "website",
      images: input.image ? [{ url: input.image }] : undefined,
    },
  };
}