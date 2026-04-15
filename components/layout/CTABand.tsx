import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTABand() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/20 blur-[140px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface/60 p-10 text-center backdrop-blur-sm md:p-14">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Ready to put <span className="gradient-text">AI to work</span>?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            30-minute consult. No slides. We leave with a scoped plan or tell you
            you&apos;re not ready.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gradient" size="lg">
              <Link href="/contact#book">
                Book a consult
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">See pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
