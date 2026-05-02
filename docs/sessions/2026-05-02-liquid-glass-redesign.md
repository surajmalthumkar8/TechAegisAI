# Session log — 2026-05-02 — Liquid-glass redesign + brand alignment

## TL;DR

Two PRs landed back-to-back on `main` that swap the v1 cyan/violet marketing site for a brand-red liquid-glass aesthetic, without ripping out any of the integrations underneath. PR #9 (`52d9690`) replaced `/` with a video hero, a live agent pipeline+terminal, and a Cal.com modal that prefills the email captured in the hero. PR #10 (`bc70155`) repointed the v1 palette via two CSS variables so `/about`, `/services`, `/case-studies`, `/blog`, `/pricing`, and `/contact` all flip to brand red without per-component edits, swapped the navbar/footer monogram for a vector shield logo, and gave the marquee real platform brand colors. Site is live at https://techaegisai.com on `main`.

## Context

The site went live as a v1 Next.js 16 App Router build: cyan/violet tokens, R3F network hero, MDX content pipeline (services + case studies + blog), Resend-backed contact form with Upstash rate limiting, Cal.com booking on `/contact`, sitemap + RSS + OG, Vercel Analytics + Speed Insights. All eight roadmap PRs were shipped before this session.

The user dropped a Vite + React + TS reference design called `techaegisai-react` (a "liquid-glass" aesthetic — black surfaces, brand-red highlights, Instrument Serif italic display type, video-driven hero, terminal-styled live agent section). The mandate: merge that look-and-feel into the live site without losing any of the v1 integrations or content routes.

The early temptation — convert the project to Vite to land the drop verbatim — would have nuked `/blog`, `/case-studies`, `/services`, the contact server action, sitemap, RSS, and OG image generation. Instead the redesign was ported into the existing App Router, with the v1 pieces archived rather than deleted so they remain reviewable and reversible.

## What shipped

| PR | Title | Commit | Summary |
|----|-------|--------|---------|
| [#9](https://github.com/) | feat: liquid-glass redesign — video hero + live agent terminal + modal Cal embed | `52d9690` | Homepage rewrite. New v2 sections, BookingDialog context, Instrument Serif font, liquid-glass utilities, perf rework (lazy videos, vector logo, ImageResponse favicon), real stack on the marquee, in-place Cal modal. |
| [#10](https://github.com/) | feat: brand-align v1 pages + shield logo everywhere + real-color marquee | `bc70155` | One-token cascade flips every legacy page to brand red. Vector shield logo lands in Navbar + Footer. Marquee items get each platform's real brand color. |

The 14 commits squashed into those two PRs are listed at the bottom of this doc.

## Architecture decisions

**Stayed on Next.js (didn't convert to Vite).** The Vite drop's components were all client-side; porting them to App Router was straightforward (`"use client"` directives, `next/image` for logo, `next/font/google` for Instrument Serif). Converting the project to Vite would have meant rebuilding the MDX pipeline, server-action contact form, sitemap, RSS, OG handlers, and analytics integration from scratch. Not worth it for a visual swap.

**Archived v1 components instead of deleting them.** Retired sections (`HowWeShip`, `FeaturedCaseStudies`, `Testimonials`, `ServicesGrid`) moved to `_archive/2026-05-02/legacy-sections/` via `git mv` so history is preserved. The whole archive directory is excluded from `tsconfig.json` and `eslint.config.mjs` so it doesn't typecheck or lint, and it can't accidentally be imported.

**The old R3F hero lives at `/legacy`, not `/`.** `Hero.tsx`, `HeroCanvas.tsx`, and `HeroNetwork.tsx` moved to `app/legacy/_components/` and are rendered at `/legacy` with a small "v1 archive" banner. The route is unadvertised — no nav link, no sitemap entry — but the code is still loadable for visual reference and side-by-side comparison.

**New v2 components are scoped under `components/marketing/v2/`.** That keeps them separate from the v1 marketing pieces (`MarqueeLogos`, `MetricBand`, `AnimatedCounter`, `CTABand`) that are still rendered on non-home routes. `MarqueeLogos` and `MetricBand` were restyled in place for the homepage and continue to work elsewhere.

**Cal modal is opened via context, not local state.** A `BookingDialogProvider` wraps `app/page.tsx`. The provider owns the dialog open state and an optional `prefillEmail`. Both the hero email-capture form and the `BookCallSection` CTAs call `useBookingDialog().open({ email })` so the same `<BookCallDialog>` instance fires from any v2 section. This replaces an earlier flow where typing an email in the hero redirected to `/contact` — which broke the homepage's narrative because `/contact` still wore the v1 palette at that point in the branch.

**PR #10 used a one-token cascade to recolor every v1 page.** Rather than touching `/about`, `/services`, `/blog`, `/pricing`, `/case-studies`, and `/contact` component-by-component, PR #10 repointed two CSS variables in `app/globals.css`:

```css
/* app/globals.css, lines 17-23 — comment + the two repointed vars */
--accent-cyan: 0 100% 68%;     /* was cyan, now brand-red-soft */
--accent-violet: 355 65% 45%;  /* was violet, now brand-red-deep */
```

Every legacy utility (`text-accent-cyan`, `bg-accent-cyan/15` ambient blurs, gradient text via `bg-accent-gradient`, `accent-gradient` buttons, `AnimatedCounter`'s gradient) now reads as brand red. New v2 components bind the explicit `brand-red-soft` / `brand-red` Tailwind tokens and are unaffected by the cascade.

## Key conventions adopted

Future sessions: follow these or the visual coherence the redesign just won will start drifting.

**Color**

- Brand red: `#e23a3e` (deep), `#ff5e62` (soft).
- Tailwind tokens: `text-brand-red`, `text-brand-red-soft`, `bg-brand-red-soft/10`, etc. (defined in `tailwind.config.ts`).
- `--accent-cyan` and `--accent-violet` CSS variables are now red shades. They exist purely for back-compat with v1 components on legacy routes — don't use them in new code.
- New components: bind `brand-red` tokens directly. Do not introduce new accent tokens.

**Fonts**

- Instrument Serif italic for big display headlines. Loaded once via `next/font/google` in `app/layout.tsx` and exposed as `--font-instrument-serif` (Tailwind family alias `font-serif`). Never re-import via `<link>` or CSS `@import` — that re-introduces FOUT/CLS.
- Geist Sans for body text.
- Geist Mono for eyebrows / kicker labels / log lines.

**Liquid-glass utilities**

- `.liquid-glass` — neutral white-tinted glass with a top/bottom edge highlight. Use for nav pills, marquee container, BookCallSection CTA frame.
- `.liquid-glass-red` — brand-red-tinted glass with red glow shadow. Use for primary emphasis surfaces.
- Both are component utilities defined in `app/globals.css`.

**Booking modal**

- Import from `@/components/booking/BookingDialogProvider`.
- `useBookingDialog().open({ email })` to open with optional prefill.
- `useBookingDialog().close()` and `.isOpen` for read-state.
- The provider must wrap the route that consumes it. It currently wraps `app/page.tsx`. Other routes use the inline Cal embed on `/contact`.

**Logo**

- Vector source: `public/logo.svg` (red shield + serif T, ~600 bytes). Use this everywhere.
- Do **not** reference `public/logo.png`. It's the original 1.2 MB raster, scheduled for deletion (see follow-ups below).

**Hero email form**

- Submitting the hero email form opens the Cal modal **in place** with the email prefilled. Do not redirect to `/contact` — that breaks the funnel narrative.
- Implementation: `HeroVideo.onSubmit(email)` calls `openBookingDialog({ email })`.

**Below-fold videos**

- Use `<LazyVideo>` from `components/marketing/v2/LazyVideo.tsx`. It gates `src` with an IntersectionObserver (300px rootMargin) and play/pauses with a second observer.
- Do not use raw `<video preload="auto">` for below-fold content. The hero video is the LCP element and is the only place that should preload eagerly.

## Files added

**Booking + provider**

- `components/booking/BookCallDialog.tsx`
- `components/booking/BookingDialogProvider.tsx`

**v2 marketing sections**

- `components/marketing/v2/HeroVideo.tsx`
- `components/marketing/v2/AboutSection.tsx`
- `components/marketing/v2/FeaturedVideoSection.tsx`
- `components/marketing/v2/LiveAgentSection.tsx`
- `components/marketing/v2/PhilosophySection.tsx`
- `components/marketing/v2/ServicesSection.tsx`
- `components/marketing/v2/BookCallSection.tsx`
- `components/marketing/v2/LazyVideo.tsx`

**Branding + chrome**

- `app/icon.tsx` (next/og ImageResponse favicon — replaces 1.2 MB ICO)
- `app/legacy/page.tsx` (v1 archive route)
- `public/logo.svg` (vector shield)

## Files moved

- `components/marketing/Hero.tsx` → `app/legacy/_components/Hero.tsx`
- `components/marketing/HeroCanvas.tsx` → `app/legacy/_components/HeroCanvas.tsx`
- `components/marketing/HeroNetwork.tsx` → `app/legacy/_components/HeroNetwork.tsx`
- `components/marketing/HowWeShip.tsx` → `_archive/2026-05-02/legacy-sections/HowWeShip.tsx`
- `components/marketing/FeaturedCaseStudies.tsx` → `_archive/2026-05-02/legacy-sections/FeaturedCaseStudies.tsx`
- `components/marketing/Testimonials.tsx` → `_archive/2026-05-02/legacy-sections/Testimonials.tsx`
- `components/marketing/ServicesGrid.tsx` → `_archive/2026-05-02/legacy-sections/ServicesGrid.tsx`
- The Vite drop landed at `_archive/2026-05-02/techaegisai-react-source/` for visual reference.

## Files modified (notable)

- `app/page.tsx` — composes the v2 sections, wraps in `BookingDialogProvider`.
- `app/contact/page.tsx` — async, awaits `searchParams`, prefills email, restyled to liquid-glass + brand red, copy aligned to "Sixty minutes".
- `app/layout.tsx` — loads Instrument Serif via `next/font/google`.
- `app/globals.css` — adds `.liquid-glass` + `.liquid-glass-red`, repoints `--accent-cyan` / `--accent-violet`.
- `tailwind.config.ts` — adds `brand.red` / `red-deep` / `red-soft`, `font-serif` family.
- `components/layout/Navbar.tsx` — hides on `/`, swaps "TA" monogram for `/logo.svg`.
- `components/layout/Footer.tsx` — same logo swap.
- `components/marketing/MarqueeLogos.tsx` — restyled to liquid-glass pill, real-brand color icons.
- `components/marketing/MetricBand.tsx` — restyled to a single liquid-glass strip, Instrument Serif numerals.
- `components/forms/ContactForm.tsx` — accepts `defaultEmail` prop, restyled.
- `components/booking/CalEmbed.tsx` — brand-red Cal theme, accepts `prefillEmail`, graceful fallback when `NEXT_PUBLIC_CALCOM_LINK` is unset.
- `lib/data.ts` — `StackItem` type now carries a real-brand `color` per platform.
- `lib/seo.ts` — drops the explicit `icons.icon` override (Next auto-discovers `app/icon.tsx`).
- `tsconfig.json`, `eslint.config.mjs` — exclude `_archive/**`.

## Files removed

- `app/favicon.ico` (1.2 MB raster — replaced by `app/icon.tsx` ImageResponse).

## Performance numbers (live Vercel preview)

| Metric | Before | After |
|--------|--------|-------|
| DOMContentLoaded | 2054 ms | 114 ms |
| Load | 3088 ms | 284 ms |
| Total image bytes (first paint) | 2.4 MB | ~600 bytes |
| Below-fold video bytes (first paint) | ~5 MP4s preloading | 0 (lazy-gated) |

Wins came from: dropping the 1.2 MB favicon for a build-time `ImageResponse` (~1 KB), swapping the 1.2 MB `<img src="/logo.png">` for a 600-byte `<img src="/logo.svg">`, gating below-fold videos behind two IntersectionObservers, and keeping only the hero video eager (it's the LCP element).

## External integrations & env vars

Untouched by this session — these still work as wired up in earlier PRs:

- **Resend** — contact form delivery. `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
- **Upstash Redis** — contact form rate-limit (5/hr/ip). `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Cal.com** — `NEXT_PUBLIC_CALCOM_LINK = suraj-malthumkar/https-cal.com-suraj-malthumkar-60min`. Surfaced via `<CalEmbed>` on `/contact` and via `BookCallDialog` modal on `/`. If unset, both render a graceful "booking link not configured" fallback with a mailto to `surajm@techaegisai.com`.
- **Vercel Analytics + Speed Insights** — auto-loaded via the `@vercel/*` packages already in `package.json`.
- **GA4** — `NEXT_PUBLIC_GA_ID` parked behind a consent gate; not active.

## Pre-existing issues NOT touched

These were noticed during the redesign but deliberately left for a later branch:

- **`/pricing` `<title>` is just "TechAegisAI"** — the page is missing a `metadata` export. Fix: add `export const metadata = { title: "Pricing — TechAegisAI", description: "..." }` to `app/pricing/page.tsx`.
- **Cal event description still says "Wokflows"** — the typo lives on cal.com, not in our code. User needs to fix it in Cal's dashboard.
- **`public/logo.png` is 1.2 MB and unreferenced.** Slated for deletion 2026-05-16 (see scheduled follow-ups).
- **`_archive/2026-05-02/techaegisai-react-source/`** — the parked Vite source the redesign was ported from. Also slated for deletion 2026-05-16.
- **CTABand visuals still v1 on /about, /services, /case-studies.** Only the copy ("60-minute call") was updated in PR #9. Restyling CTABand requires coordinating across all routes that render it; out of scope for the homepage-redesign branch but worth picking up next.

## Scheduled follow-ups

- **`trig_01Tn15P7a6orHdv9zZeFK9cD`** — one-shot agent runs **2026-05-16T04:30Z** to:
  1. Delete `public/logo.png` (1.2 MB unreferenced raster).
  2. Delete `_archive/2026-05-02/techaegisai-react-source/` (parked Vite drop).
  3. Audit any cyan/violet color leakage that slipped past the css-var repoint (grep for hex values like `#22D3EE`, `#06b6d4`, `#8b5cf6`, etc).

## Commit-by-commit (the 14 squashed into PRs #9 and #10)

PR #9 (`52d9690`) bundled these 12 commits:

1. `chore: archive v1 marketing + park new drop source`
2. `feat: liquid-glass scaffolding (styles, font, modal, v2 sections)`
3. `feat: liquid-glass landing on / + ported MarqueeLogos + MetricBand`
4. `docs: update README stack + roadmap for liquid-glass redesign`
5. `fix: remove dead @next/next eslint-disable comment`
6. `fix: CI pnpm version conflict, mobile h1 wrap, marquee overflow, Cal fallback`
7. `fix: align homepage booking copy to 60-min and add favicon`
8. `perf: shrink favicon (1.2MB->~1KB), next/image logo, lazy-load below-fold videos`
9. `feat: redesign LiveAgent — pipeline view + terminal, 'executing live' copy`
10. `feat: marquee shows real stack, not fake brand names`
11. `feat: hero email opens Cal modal in place (no /contact redirect)`
12. `feat: /contact aligned with homepage liquid-glass + 60-min copy everywhere`
13. `feat: brand-red shield + T logo (vector svg, ~600 bytes)`

PR #10 (`bc70155`) bundled this single commit:

14. `feat: brand-align v1 pages + shield logo everywhere + real-color marquee` — the one-token cascade, vector logo in Navbar + Footer, real brand colors on the marquee.
