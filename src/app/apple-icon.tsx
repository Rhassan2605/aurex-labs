import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#090A0F" }}>
        <svg width="120" height="120" viewBox="0 0 64 64">
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
      </div>
    ),
    size,
  );
}
