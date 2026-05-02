import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllCaseStudies } from "@/lib/content";

export function FeaturedCaseStudies() {
  const featured = getAllCaseStudies()
    .filter((c) => c.featured)
    .slice(0, 2);
  if (featured.length === 0) return null;

  return (
    <section className="border-b border-border py-24">
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent-violet">
              Shipped
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Work we&apos;re proud of.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-foreground md:inline-flex"
          >
            All case studies <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {featured.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group flex flex-col justify-between gap-8 rounded-xl border border-border bg-surface/40 p-8 transition-all duration-base hover:border-muted-foreground/40 hover:bg-surface/80"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {c.industry} · {c.duration}
                </p>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight">
                  {c.title}
                </h3>
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
