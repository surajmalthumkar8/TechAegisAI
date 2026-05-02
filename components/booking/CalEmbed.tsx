"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { Mail } from "lucide-react";
import { useEffect } from "react";

export function CalEmbed() {
  const link = process.env.NEXT_PUBLIC_CALCOM_LINK;

  useEffect(() => {
    if (!link) return;
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
  }, [link]);

  if (!link) {
    return (
      <div className="flex h-[480px] flex-col items-center justify-center gap-4 rounded-xl border border-border bg-surface/40 p-8 text-center">
        <Mail className="size-5 text-accent-cyan" aria-hidden="true" />
        <p className="text-sm text-foreground">Booking link is not configured.</p>
        <p className="max-w-sm text-xs text-muted-foreground">
          Email{" "}
          <a
            href="mailto:surajm@techaegisai.com"
            className="text-foreground underline underline-offset-2"
          >
            surajm@techaegisai.com
          </a>{" "}
          to book a session, or send a note via the contact form.
        </p>
      </div>
    );
  }

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
