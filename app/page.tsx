import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Agentic AI that earns its keep",
  description:
    "TechAegisAI designs, builds, and ships AI workflows that cut hours, grow revenue, and turn your ops into a moat.",
});

export default function HomePage() {
  return (
    <>
      <section className="container py-32 text-center">
        <p className="text-xs uppercase tracking-widest text-accent-cyan">
          In progress
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
          Redesign in flight.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          New liquid-glass landing arriving in the next commit on this branch.
        </p>
      </section>
      <CTABand />
    </>
  );
}
