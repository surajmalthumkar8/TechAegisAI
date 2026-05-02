# Legacy v1 marketing sections — archived 2026-05-02

These components were the original homepage composition (PR #1, refined through PR #7). The 2026-05-02 liquid-glass redesign retired them in favor of new sections under `components/marketing/v2/`. Files are kept here, not deleted, in case any copy or layout idea is worth resurrecting.

| File | What it was | Why retired | Direct replacement |
|---|---|---|---|
| `HowWeShip.tsx` | "How we ship" four-step process band — Map → Pilot → Ship → Operate | Superseded by `PhilosophySection` (Strategy × Execution) on the new homepage | `components/marketing/v2/PhilosophySection.tsx` |
| `FeaturedCaseStudies.tsx` | Server component that queried `lib/content` for two case studies and rendered tile cards on the home page | New homepage doesn't surface case studies above the fold; the dedicated `/case-studies` page still ships and is the canonical entry point | none on home; `app/case-studies/page.tsx` is unchanged |
| `Testimonials.tsx` | Three-quote grid pulled from `lib/data.testimonials` | New design leans on the live agent terminal + scarcity ping in `BookCallSection` for social proof; testimonials may return on a future page | none |
| `ServicesGrid.tsx` | Grid of six services with lucide icons + blurbs, linking into `/services/[slug]` | Replaced by `ServicesSection` (two video tiles + "View all" link). The full grid still ships at `/services`. | `components/marketing/v2/ServicesSection.tsx` |

## Sibling archives in this drop

- `_archive/2026-05-02/techaegisai-react-source/` — the original Vite + React + TS drop the redesign was ported from. Kept as a reference for visual fidelity.

## What is *not* archived (still in tree, intentionally)

- `components/marketing/MarqueeLogos.tsx` — restyled in place to liquid-glass + brand red and reused on the new homepage.
- `components/marketing/MetricBand.tsx` (+ `AnimatedCounter.tsx`) — restyled in place into a compact stats strip directly above `BookCallSection`.
- `components/layout/CTABand.tsx` — used on 6 routes (home, about, services, services/[slug], case-studies, case-studies/[slug]). Visual evolution is a separate, synced change.
- `components/marketing/Hero.tsx` (the original 3D Hero) and its r3f deps (`HeroCanvas.tsx`, `HeroNetwork.tsx`) live at `app/legacy/_components/` and render at `/legacy` — kept reachable for posterity, not advertised.

## Reanimating something archived

```bash
git mv _archive/2026-05-02/legacy-sections/Testimonials.tsx components/marketing/Testimonials.tsx
# then re-import in app/page.tsx (or wherever)
```

History is preserved (these were moved with `git mv`), so `git log --follow` works.
