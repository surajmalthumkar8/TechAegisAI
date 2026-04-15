"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Heading = { depth: number; text: string; id: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "0% 0% -70% 0%", threshold: 0.1 },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 self-start">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        On this page
      </p>
      <ul className="mt-4 space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l border-transparent py-1 pl-4 text-sm transition-colors duration-fast",
                h.depth === 3 && "pl-8",
                active === h.id
                  ? "border-accent-cyan text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
