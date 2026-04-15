import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllBlogPosts,
  getBlogPost,
  extractHeadings,
} from "@/lib/content";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { buildMetadata } from "@/lib/seo";

type RouteParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: RouteParams }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const all = getAllBlogPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  return (
    <>
      <ReadingProgress />

      <article className="border-b border-border py-24">
        <div className="container">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All notes
          </Link>

          <div className="mt-10 max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <time>{formatDate(post.publishedAt)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              <span>·</span>
              <span>{post.author}</span>
            </div>
            <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-lg text-muted-foreground">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-[1fr_240px]">
            <div className="max-w-3xl">
              <MDXRemote source={post.body} components={mdxComponents} />
            </div>
            <aside className="hidden md:block">
              <TableOfContents headings={headings} />
            </aside>
          </div>
        </div>
      </article>

      <nav className="border-b border-border py-10">
        <div className="container grid gap-4 md:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-surface/40 p-6 transition-all hover:border-muted-foreground/40 hover:bg-surface/80"
            >
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <ArrowLeft className="size-3" /> Previous
              </span>
              <span className="font-semibold group-hover:text-accent-cyan">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group flex flex-col gap-2 rounded-xl border border-border bg-surface/40 p-6 text-right transition-all hover:border-muted-foreground/40 hover:bg-surface/80 md:col-start-2"
            >
              <span className="inline-flex items-center gap-2 self-end text-xs text-muted-foreground">
                Next <ArrowRight className="size-3" />
              </span>
              <span className="font-semibold group-hover:text-accent-cyan">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </>
  );
}
