import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Agentic AI that earns its keep",
  description:
    "TechAegisAI designs, builds, and ships AI workflows that cut hours, grow revenue, and turn your ops into a moat.",
});

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="size-3 text-accent-cyan" />
          <span>Now booking Q2 engagements</span>
        </div>

        <h1 className="mt-6 max-w-4xl text-display text-balance">
          Ship <span className="gradient-text">agentic AI</span> that earns its keep.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          We design, build, and ship AI workflows that cut hours off ops, grow revenue
          per rep, and turn institutional knowledge into compounding leverage.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact#book">
              Book a consult
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">See the work</Link>
          </Button>
        </div>

        <p className="mt-16 text-xs uppercase tracking-widest text-muted-foreground">
          Full landing page with 3D hero ships in PR2 & PR3
        </p>
      </div>
    </section>
  );
}
