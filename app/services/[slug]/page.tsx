import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllServices, getService } from "@/lib/content";
import { getAllCaseStudies } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { buildMetadata } from "@/lib/seo";
import { CTABand } from "@/components/layout/CTABand";
import { Button } from "@/components/ui/button";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    title: s.title,
    description: s.summary,
    path: `/services/${s.slug}`,
  });
}

export default async function ServicePage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getAllCaseStudies()
    .filter((c) => c.services.includes(service.title))
    .slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-violet/15 blur-[140px]" />
        </div>
        <div className="container">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All services
          </Link>
          <div className="mt-8 max-w-3xl">
            <span className="inline-block rounded-full border border-border bg-surface/60 px-3 py-1 text-xs uppercase tracking-widest text-accent-cyan">
              {service.kpi}
            </span>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container grid gap-12 md:grid-cols-[1fr_320px]">
          <article className="max-w-none">
            <MDXRemote source={service.body} components={mdxComponents} />
          </article>
          <aside className="md:sticky md:top-24 md:self-start">
            <div className="rounded-xl border border-border bg-surface/40 p-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                You walk away with
              </p>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-cyan" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="gradient" size="sm" className="mt-6 w-full">
                <Link href="/contact#book">Scope this engagement</Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-border py-20">
          <div className="container">
            <p className="text-xs uppercase tracking-widest text-accent-violet">
              Proof
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Where this has worked.
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {related.map((c) => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-surface/40 p-6 transition-all duration-base hover:border-muted-foreground/40 hover:bg-surface/80"
                >
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {c.industry} · {c.duration}
                  </p>
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
