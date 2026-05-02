"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { Mail } from "lucide-react";
import { useEffect } from "react";

const CAL_THEME_VARS = {
  "cal-brand": "#e23a3e",
  "cal-text": "#FAFAFA",
  "cal-bg": "#0A0A0B",
  "cal-bg-muted": "#111114",
  "cal-border": "#27272A",
} as const;

export function CalEmbed({ prefillEmail }: { prefillEmail?: string } = {}) {
  const link = process.env.NEXT_PUBLIC_CALCOM_LINK;

  useEffect(() => {
    if (!link) return;
    (async () => {
      const cal = await getCalApi({ namespace: "intro" });
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: CAL_THEME_VARS, light: CAL_THEME_VARS },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, [link]);

  if (!link) {
    return (
      <div className="flex h-[480px] flex-col items-center justify-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
        <Mail className="size-5 text-brand-red-soft" aria-hidden="true" />
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
    <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/40">
      <Cal
        namespace="intro"
        calLink={link}
        style={{ width: "100%", height: "640px", overflow: "scroll" }}
        config={{
          layout: "month_view",
          theme: "dark",
          ...(prefillEmail ? { email: prefillEmail } : {}),
        }}
      />
    </div>
  );
}
