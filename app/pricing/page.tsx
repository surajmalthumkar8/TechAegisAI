"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { tiers, faqs } from "@/lib/pricing";

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[140px]" />
        </div>
        <div className="container text-center">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Pricing
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Priced by <span className="gradient-text">outcome</span>, not hours.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Three tiers. Swap any month. Every engagement starts with a scoped ROI
            target — if we can&apos;t hit it, we tell you.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 p-1 text-sm">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                !annual
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                annual
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual
              <span className="ml-2 text-xs text-accent-cyan">save 17%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container">
          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.id}
                className={cn(
                  "relative flex flex-col rounded-xl border bg-surface/40 p-8 transition-all",
                  t.featured
                    ? "border-accent-violet/60 shadow-[0_0_60px_-20px_hsl(var(--accent-violet)/0.6)]"
                    : "border-border",
                )}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-gradient px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-background">
                    Most shipped
                  </span>
                )}
                <h2 className="text-2xl font-semibold tracking-tight">{t.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>

                <div className="mt-8 flex items-baseline gap-1">
                  <span className="text-5xl font-semibold tracking-tight">
                    ${annual ? Math.round(t.price.annual / 12) : t.price.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/ mo</span>
                </div>
                {annual && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Billed ${t.price.annual.toLocaleString()} annually
                  </p>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={t.featured ? "gradient" : "outline"}
                  size="lg"
                  className="mt-8 w-full"
                >
                  <Link href="/contact#book">{t.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-accent-violet">
            Questions we get
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Straight answers.
          </h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                  <span className="text-lg font-medium">{f.q}</span>
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
