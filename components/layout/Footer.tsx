import Link from "next/link";
import { siteConfig } from "@/lib/utils";

const cols = [
  {
    title: "Product",
    links: [
      { href: "/services", label: "Services" },
      { href: "/pricing", label: "Pricing" },
      { href: "/case-studies", label: "Case studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/contact#book", label: "Book a consult" },
      { href: `mailto:${siteConfig.email}`, label: siteConfig.email },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0"
              />
              <span className="text-sm font-semibold tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {siteConfig.tagline} We design, build, and ship agentic AI workflows for
              companies that measure outcomes, not activity.
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} TechAegisAI. All rights reserved.</p>
          <p>
            Built with Next.js + React Three Fiber. Designed to{" "}
            <span className="gradient-text font-semibold">earn its keep</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
