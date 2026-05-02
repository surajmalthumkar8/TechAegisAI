import { HeroVideo } from "@/components/marketing/v2/HeroVideo";
import { MarqueeLogos } from "@/components/marketing/MarqueeLogos";
import { AboutSection } from "@/components/marketing/v2/AboutSection";
import { FeaturedVideoSection } from "@/components/marketing/v2/FeaturedVideoSection";
import { LiveAgentSection } from "@/components/marketing/v2/LiveAgentSection";
import { PhilosophySection } from "@/components/marketing/v2/PhilosophySection";
import { ServicesSection } from "@/components/marketing/v2/ServicesSection";
import { MetricBand } from "@/components/marketing/MetricBand";
import { BookCallSection } from "@/components/marketing/v2/BookCallSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Agentic AI that earns its keep",
  description:
    "TechAegisAI designs, builds, and ships AI workflows that cut hours, grow revenue, and turn your ops into a moat.",
});

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <MarqueeLogos />
      <AboutSection />
      <FeaturedVideoSection />
      <LiveAgentSection />
      <PhilosophySection />
      <ServicesSection />
      <MetricBand />
      <BookCallSection />
    </>
  );
}
