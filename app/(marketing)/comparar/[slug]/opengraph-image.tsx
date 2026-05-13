import { ImageResponse } from "next/og";
import { getComparisonBySlug } from "@/lib/supabase/db";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: { slug: string } }) {
  const data = await getComparisonBySlug(params.slug);
  const title = data?.comparison.title ?? params.slug;
  const tool1 = data?.tool1.name ?? "";
  const tool2 = data?.tool2.name ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #08111f 0%, #030712 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ color: "#22d3ee", fontSize: 24, fontWeight: 600 }}>
          Noxis · Comparativa
        </div>

        {/* VS layout */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              textAlign: "center",
              flex: 1,
            }}
          >
            {tool1}
          </div>
          <div
            style={{
              color: "#22d3ee",
              fontSize: 40,
              fontWeight: 800,
              padding: "12px 24px",
              border: "2px solid #22d3ee",
              borderRadius: 16,
              flexShrink: 0,
            }}
          >
            VS
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 64,
              fontWeight: 700,
              textAlign: "center",
              flex: 1,
            }}
          >
            {tool2}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ color: "#94a3b8", fontSize: 24 }}>
          {title} — ¿Cuál es mejor en 2025?
        </div>
      </div>
    ),
    { ...size }
  );
}
