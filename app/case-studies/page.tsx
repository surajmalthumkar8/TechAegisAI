import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCaseStudies } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { CTABand } from "@/components/layout/CTABand";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Case studies",
  description:
    "Shipped work, measured results. How teams use TechAegisAI to cut hours, grow pipeline, and close faster.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const studies = getAllCaseStudies();
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-[140px]" />
        </div>
        <div className="container text-center">
          <p className="text-xs uppercase tracking-widest text-accent-violet">
            Case studies
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Shipped work. <span className="gradient-text">Measured</span> results.
          </h1>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-2">
            {studies.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group flex flex-col justify-between gap-8 rounded-xl border border-border bg-surface/40 p-8 transition-all duration-base hover:border-muted-foreground/40 hover:bg-surface/80"
              >
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.industry} · {c.duration}
                  </p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground">{c.excerpt}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {c.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <p className="gradient-text text-2xl font-semibold tracking-tight">
                        {m.value}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-accent-cyan">
                  <span>Read the case study</span>
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
