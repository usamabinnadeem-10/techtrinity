import { ImageResponse } from "next/og";

export const alt = "TechTrinity — Boutique SaaS Product Studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(ellipse at top left, #1a1a1a 0%, #0a0a0a 60%, #000 100%)",
          color: "#f5f5f5",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          TechTrinity
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#fafafa",
              maxWidth: "1000px",
            }}
          >
            From idea to product. Done right.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#a3a3a3",
              maxWidth: "900px",
            }}
          >
            Boutique SaaS product studio for non-technical founders.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#737373",
          }}
        >
          <span>techtrinity.ai</span>
          <span>Design · Build · Ship</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
