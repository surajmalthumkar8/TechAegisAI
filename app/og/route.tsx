import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Agentic AI that earns its keep.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0A0A0B",
          color: "#FAFAFA",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.35), transparent 55%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.25), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0A0A0B",
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            TA
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.5 }}>
            TechAegisAI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: -2,
            fontWeight: 600,
            maxWidth: "92%",
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#A1A1AA",
          }}
        >
          <div>techaegisai.com</div>
          <div>Agentic AI · shipped</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
