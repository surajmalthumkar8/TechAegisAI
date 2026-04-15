import { Hero } from "@/components/marketing/Hero";
import { MarqueeLogos } from "@/components/marketing/MarqueeLogos";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { MetricBand } from "@/components/marketing/MetricBand";
import { FeaturedCaseStudies } from "@/components/marketing/FeaturedCaseStudies";
import { Testimonials } from "@/components/marketing/Testimonials";
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
      <Hero />
      <MarqueeLogos />
      <ServicesGrid />
      <MetricBand />
      <FeaturedCaseStudies />
      <Testimonials />
      <CTABand />
    </>
  );
}
