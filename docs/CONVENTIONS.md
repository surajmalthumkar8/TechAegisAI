# TechAegisAI — Design / Brand / Architecture Conventions

Addendum to `CLAUDE.md`. Captures the conventions locked in by PR #9 and PR #10
(commits `52d9690` and `bc70155` on `main`). Quick-reference checklist; not a
tutorial. When in doubt, prefer the explicit rule here over re-deriving from
component code.

---

## 1. Color palette

- [ ] **Brand red base**: `#e23a3e`. Tailwind: `bg-brand-red`, `text-brand-red`, `border-brand-red`.
- [ ] **Brand red soft**: `#ff5e62` (`brand-red-soft`). Use for emphasis text, eyebrows, focus rings, ambient blurs.
- [ ] **Brand red deep**: `#b71f23` (`brand-red-deep`). Use for darker accents (pressed states, deep gradients).
- [ ] Legacy `--accent-cyan` and `--accent-violet` CSS vars still exist in `app/globals.css` but now resolve to brand-red shades. Left in place for back-compat with v1 pages. **New code MUST bind `brand-red-*` tokens explicitly. Do NOT use `accent-cyan` / `accent-violet` in new components.**
- [ ] **Greens (emerald-400)** are reserved for "done" / success states only — `LiveAgentSection` pipeline ticks, contact form success.
- [ ] **No literal cyan or violet** in new code. If you see `text-cyan-*` or `text-violet-*` in a v2 file, that's a bug.
- Where: tokens in `tailwind.config.ts` (`theme.extend.colors.brand`); CSS vars in `app/globals.css`.

## 2. Typography

- [ ] **Instrument Serif italic** for big headlines. Loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS var `--font-instrument-serif`. Tailwind: `font-serif italic`.
- [ ] **Geist Sans** for body — default, no class needed (`font-sans` is the body family).
- [ ] **Geist Mono** for eyebrows, technical labels, timestamps.
- [ ] Eyebrow pattern: `font-mono text-[11px] uppercase tracking-[0.2em] text-white/40`. On key sections, swap the color to `text-brand-red-soft`.
- Where: font wiring in `app/layout.tsx`; family tokens in `tailwind.config.ts` (`fontFamily`).

## 3. Liquid-glass utilities

- [ ] **`.liquid-glass`** — base translucent panel with edge gloss. Use for default cards on dark backgrounds.
- [ ] **`.liquid-glass-red`** — same shape with brand-red tint and red glow shadow. Use for emphasis cards (CTA blocks, BookCallSection).
- [ ] Don't redefine these inline. If a card needs a different tint, extend `app/globals.css` rather than duplicating the rule.
- Where: defined in `app/globals.css` under `@layer components`.

## 4. Brand mark / logo

- [ ] **Only logo asset to reference**: `public/logo.svg` (vector shield + T).
- [ ] Used in: `Navbar.tsx` (28px), `Footer.tsx` (28px), `HeroVideo.tsx` pill nav (24px). All via plain `<img>`, **not** `next/image` — the security flag interaction with SVGs is not worth it.
- [ ] **Favicon**: `app/icon.tsx` renders a 32x32 brand-red tile via `next/og`'s `ImageResponse`. Auto-discovered by Next 13+ metadata. Exports `dynamic = "force-static"` so it builds once.
- [ ] **Do NOT reference `public/logo.png`** — that file is slated for deletion.

## 5. Booking flow

- [ ] The Cal.com modal is lifted to a global provider: `BookingDialogProvider` in `components/booking/BookingDialogProvider.tsx`. It wraps the homepage in `app/page.tsx`.
- [ ] To open the modal from any homepage component:
  ```ts
  import { useBookingDialog } from "@/components/booking/BookingDialogProvider";
  const { open } = useBookingDialog();
  open({ email });
  ```
- [ ] The `email` arg is forwarded to Cal as prefill via `config.email`.
- [ ] **`/contact` still embeds Cal directly** (not modal). Don't change that without a brainstorm.
- [ ] **`CalEmbed` brand color is `#e23a3e`** (was cyan).
- [ ] If `NEXT_PUBLIC_CALCOM_LINK` is missing, `CalEmbed` shows a graceful fallback panel — not a 404 iframe. Don't remove that fallback.
- Where: `components/booking/BookingDialogProvider.tsx`, `components/booking/BookCallDialog.tsx`, `components/booking/CalEmbed.tsx`.

## 6. Hero email-capture

- [ ] In `HeroVideo.tsx`, the email form's submit handler opens the modal via `useBookingDialog().open({ email })`.
- [ ] **Do NOT redirect to `/contact`** from the hero. The modal is the path.

## 7. Below-the-fold videos

- [ ] Use **`<LazyVideo src=... />`** from `components/marketing/v2/LazyVideo.tsx`. Defers `src` via `IntersectionObserver` and pauses when offscreen.
- [ ] **The hero video is the LCP** — keep it as an eager `<video>` in `HeroVideo.tsx`. Don't switch it to `LazyVideo`.
- [ ] Don't drop in raw `<video preload="auto">` for new below-the-fold spots — bandwidth waste.

## 8. Component organization

- [ ] **v2 marketing components** (current homepage): `components/marketing/v2/`. Files: `AboutSection.tsx`, `BookCallSection.tsx`, `FeaturedVideoSection.tsx`, `HeroVideo.tsx`, `LazyVideo.tsx`, `LiveAgentSection.tsx`, `PhilosophySection.tsx`, `ServicesSection.tsx`.
- [ ] **v1 marketing components** still used on `/about`, `/services`, etc.: `components/marketing/` (e.g. `MarqueeLogos`, `MetricBand`). They use v1 `accent-cyan`/`accent-violet` utilities — but those vars now resolve to brand red, so visually they're consistent.
- [ ] **Fully retired v1 components**: `_archive/2026-05-02/legacy-sections/`. Don't import from here.
- [ ] **Old r3f hero**: parked at `app/legacy/_components/`, rendered at `/legacy` (unadvertised). Keep it functional but don't link to it.

## 9. CI / build

- [ ] **pnpm 10.28.2**, set in `package.json` `packageManager`.
- [ ] The CI workflow does **NOT** pass a separate `version:` to `pnpm/action-setup@v4`. That conflict was fixed — re-introducing it will break CI.
- [ ] `tsconfig.json` and the eslint config both **ignore `_archive/**`**. Don't try to "clean up" by including it.
- [ ] `app/icon.tsx` exports `dynamic = "force-static"` so the favicon builds once at build time.

## 10. Stack data + marquee

- [ ] The homepage marquee reads from `lib/data.ts` `stack` — a list of `{ icon: LucideIcon; name: string; color: string }`.
- [ ] Each pill icon is tinted with the platform's real brand color via inline `style={{ color }}`.
- [ ] **Never use brand-specific SVGs** (Slack logo, Notion logo, etc.) — trademark concerns. Use a Lucide icon + the brand color.
- [ ] When adding a new platform: pick its real brand color or the closest categorical match.

## 11. Don't-touch list (production-critical)

- [ ] **`.env*` files** — secrets, never modify.
- [ ] **`vercel.json`** — not present today, but if one is added, treat as production-critical config.
- [ ] **`.github/workflows/ci.yml`** — only modify with intent (the previous touch fixed the pnpm version conflict).
- [ ] **`app/actions/contact.ts`**, **`lib/email.ts`**, **`lib/rate-limit.ts`** — Resend + Upstash wiring. Works because env-gated. Don't refactor without a brainstorm.
- [ ] **`components/booking/CalEmbed.tsx`** — env-gated; gracefully falls back if env missing. Preserve the fallback path.

---

## See also

- `CLAUDE.md` — mandatory skill routing, validation gates, anti-patterns.
- `app/globals.css` — color tokens, liquid-glass utilities.
- `tailwind.config.ts` — Tailwind token names.
- `components/marketing/v2/` — current homepage components.
- `components/booking/` — Cal.com modal + embed wiring.
