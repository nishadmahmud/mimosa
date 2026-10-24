import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6B1E2A",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 96,
            color: "#E8C96A",
            fontFamily: "Georgia, serif",
            lineHeight: 1,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size },
  );
}
