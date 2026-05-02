import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 30%, #ff7376 0%, #e23a3e 55%, #7a1318 100%)",
          color: "#1a0405",
          fontSize: 22,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          letterSpacing: "-0.02em",
          borderRadius: 8,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}

export const dynamic = "force-static";
