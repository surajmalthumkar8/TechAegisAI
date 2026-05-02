"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 8));
  }, [scrollY]);

  // Homepage uses its own liquid-glass pill nav inside the new hero — hide global
  // Navbar there to avoid two stacked navs.
  if (pathname === "/") return null;

  return (
    <motion.header
      style={{ backgroundColor: `hsl(var(--background) / ${scrolled ? 0.8 : 0.4})` }}
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-base",
        scrolled ? "border-border" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/logo.svg"
            alt=""
            width={28}
            height={28}
            className="size-7 shrink-0"
          />
          <span className="text-sm font-semibold tracking-tight">TechAegisAI</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild variant="gradient" size="sm">
            <Link href="/contact#book">Book a consult</Link>
          </Button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 md:hidden">
          <div className="container flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="gradient" size="sm" className="mt-2">
              <Link href="/contact#book" onClick={() => setOpen(false)}>
                Book a consult
              </Link>
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
}
