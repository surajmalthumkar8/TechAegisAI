import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllServices } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CTABand } from "@/components/layout/CTABand";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Six ways to put AI to work: process optimization, data, automation, custom models, enablement, strategy.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[140px]" />
        </div>
        <div className="container text-center">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Services
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Scoped by <span className="gradient-text">KPI</span>, not hours.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Every engagement starts with a measurable outcome. Here&apos;s how we
            get there.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col justify-between gap-6 rounded-xl border border-border bg-surface/40 p-8 transition-all duration-base hover:border-muted-foreground/40 hover:bg-surface/80"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-accent-cyan">
                    {s.kpi}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{s.summary}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent-cyan">
                  <span>Read the scope</span>
                  <ArrowUpRight className="size-4 transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
