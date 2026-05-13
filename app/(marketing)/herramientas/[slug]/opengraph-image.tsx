import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/lib/supabase/db";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: { slug: string } }) {
  const tool = await getToolBySlug(params.slug);
  const name = tool?.name ?? params.slug;
  const category = tool?.categories?.name ?? "";
  const rating = tool ? `★ ${tool.rating_avg.toFixed(1)} / 5` : "";
  const price = tool?.starting_price != null
    ? `Desde $${tool.starting_price}/mes`
    : tool?.pricing_model === "freemium"
    ? "Gratis disponible"
    : "";

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
        {/* Top: brand */}
        <div style={{ color: "#22d3ee", fontSize: 24, fontWeight: 600 }}>
          Noxis
        </div>

        {/* Middle: tool info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {category && (
            <div
              style={{
                color: "#22d3ee",
                fontSize: 20,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {category}
            </div>
          )}
          <div style={{ color: "#ffffff", fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {name}
          </div>
          {tool?.short_description && (
            <div style={{ color: "#94a3b8", fontSize: 28, maxWidth: 800 }}>
              {tool.short_description}
            </div>
          )}
        </div>

        {/* Bottom: rating + price */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {rating && (
            <div style={{ color: "#22d3ee", fontSize: 24, fontWeight: 600 }}>
              {rating}
            </div>
          )}
          {price && (
            <div
              style={{
                color: "#e2e8f0",
                fontSize: 22,
                background: "rgba(255,255,255,0.08)",
                padding: "8px 20px",
                borderRadius: 12,
              }}
            >
              {price}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
