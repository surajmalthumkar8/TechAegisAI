import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCaseStudies, getCaseStudy } from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { buildMetadata } from "@/lib/seo";
import { CTABand } from "@/components/layout/CTABand";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return buildMetadata({
    title: c.title,
    description: c.excerpt,
    path: `/case-studies/${c.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const related = getAllCaseStudies()
    .filter((c) => c.slug !== study.slug)
    .slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-violet/15 blur-[140px]" />
        </div>
        <div className="container">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All case studies
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              {study.client} · {study.industry} · {study.duration}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              {study.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              {study.excerpt}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-surface/40 p-6"
              >
                <p className="gradient-text text-4xl font-semibold tracking-tight">
                  {m.value}
                </p>
                <p className="mt-2 text-sm font-medium">{m.label}</p>
                {m.delta && (
                  <p className="mt-1 text-xs text-muted-foreground">{m.delta}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto max-w-3xl">
          <MDXRemote source={study.body} components={mdxComponents} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-b border-border py-20">
          <div className="container">
            <p className="text-xs uppercase tracking-widest text-accent-violet">
              Related
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              More shipped work.
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
