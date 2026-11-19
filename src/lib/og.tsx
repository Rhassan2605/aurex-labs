import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Shared Open Graph image layout (rendered at build time for static routes). */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#090A0F",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(144,101,248,0.55), transparent 45%), radial-gradient(circle at 0% 100%, rgba(91,47,214,0.35), transparent 40%)",
          color: "#F5F3FA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="20" y1="4" x2="46" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E4D9FF" />
                <stop offset=".45" stopColor="#9065F8" />
                <stop offset="1" stopColor="#5B2FD6" />
              </linearGradient>
            </defs>
            <path d="M32 5 61 59H48.5L32 28 15.5 59H3Z" fill="url(#g)" />
            <path d="M29 43v14l11-7z" fill="url(#g)" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 2 }}>
            <span style={{ fontWeight: 700 }}>AUREX</span>
            <span style={{ marginLeft: 12, color: "#C9B6FF", letterSpacing: 8 }}>LABS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#C9B6FF" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 58 : 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {title}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A7A4BA" }}>
          <span>{footer ?? "Designing the Future. Building What Matters."}</span>
          <span style={{ display: "flex", width: 120, height: 6, borderRadius: 3, background: "linear-gradient(90deg,#C9B6FF,#9065F8,#5B2FD6)", marginTop: 12 }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
