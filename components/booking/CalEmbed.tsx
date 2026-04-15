"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const FALLBACK_LINK = "techaegisai/intro";

export function CalEmbed() {
  const link = process.env.NEXT_PUBLIC_CALCOM_LINK ?? FALLBACK_LINK;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "intro" });
      const vars = {
        "cal-brand": "#22D3EE",
        "cal-text": "#FAFAFA",
        "cal-bg": "#0A0A0B",
        "cal-bg-muted": "#111114",
        "cal-border": "#27272A",
      };
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: vars, light: vars },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface/40">
      <Cal
        namespace="intro"
        calLink={link}
        style={{ width: "100%", height: "640px", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
