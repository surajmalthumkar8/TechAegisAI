import Link from "next/link";
import type { ReactNode } from "react";

type Kids = { children?: ReactNode };

function slugify(children: ReactNode): string {
  const text = typeof children === "string" ? children : String(children ?? "");
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export const mdxComponents = {
  h1: ({ children }: Kids) => (
    <h1 className="mt-12 text-4xl font-semibold tracking-tight">{children}</h1>
  ),
  h2: ({ children }: Kids) => {
    const id = slugify(children);
    return (
      <h2 id={id} className="mt-12 scroll-mt-24 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    );
  },
  h3: ({ children }: Kids) => {
    const id = slugify(children);
    return (
      <h3 id={id} className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight">
        {children}
      </h3>
    );
  },
  p: ({ children }: Kids) => (
    <p className="mt-5 leading-relaxed text-foreground/90">{children}</p>
  ),
  ul: ({ children }: Kids) => (
    <ul className="mt-5 space-y-2 text-foreground/90 [&>li]:pl-5 [&>li]:relative [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-2.5 [&>li]:before:h-1.5 [&>li]:before:w-1.5 [&>li]:before:rounded-full [&>li]:before:bg-accent-gradient">
      {children}
    </ul>
  ),
  ol: ({ children }: Kids) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-foreground/90">
      {children}
    </ol>
  ),
  a: ({ href = "#", children }: { href?: string; children?: ReactNode }) => (
    <Link
      href={href}
      className="text-accent-cyan underline underline-offset-4 hover:text-foreground"
    >
      {children}
    </Link>
  ),
  blockquote: ({ children }: Kids) => (
    <blockquote className="mt-6 border-l-2 border-accent-violet pl-5 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }: Kids) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm text-accent-cyan">
      {children}
    </code>
  ),
  hr: () => <hr className="my-12 border-border" />,
};
