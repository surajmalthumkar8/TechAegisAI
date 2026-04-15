import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "Notes",
  description:
    "Writing on agentic AI, consulting, and the slow build that ends up being the fast build.",
  path: "/blog",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-[140px]" />
        </div>
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Notes
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Field notes from <span className="gradient-text">shipped work</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Short essays on agentic AI, consulting, and what actually works in the
            room with operators.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container">
          <ul className="divide-y divide-border">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between md:gap-12"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time>{formatDate(p.publishedAt)}</time>
                      <span>·</span>
                      <span>{p.readingTime} min read</span>
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="mt-2 text-balance text-xl font-semibold tracking-tight transition-colors group-hover:text-accent-cyan md:text-2xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-muted-foreground">
                      {p.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
