# TechAegisAI Website

Premium, production-ready website for TechAegisAI — an AI consulting company.

## Stack

- **Framework**: Next.js 15 (App Router, React 19, Turbopack)
- **Styling**: Tailwind CSS + custom design tokens + shadcn/ui
- **3D / interactive**: Three.js + React Three Fiber + drei; GSAP + Framer Motion
- **Content**: MDX + Contentlayer2
- **Email**: Resend + Upstash rate-limit
- **Booking**: Cal.com embed
- **Analytics**: Vercel Analytics + Speed Insights + GA4
- **Testing**: Playwright (via `webapp-testing` skill) + Vitest
- **Deploy**: Vercel

## Getting Started

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
pnpm lint
pnpm format
```

Copy `.env.example` → `.env.local` and fill in as features come online.

## Roadmap

See `C:\Users\Suraj\.claude\plans\cheerful-twirling-badger.md` and [CLAUDE.md](./CLAUDE.md) for the full build plan and mandatory skill routing.

- **PR1** ✅ Foundation (scaffold, tokens, Navbar, Footer, landing placeholder)
- **PR2** Landing v1 (no 3D)
- **PR3** R3F HeroNetwork
- **PR4** MDX content pipeline (services + case studies)
- **PR5** Blog
- **PR6** Pricing + Contact form + Cal.com
- **PR7** About / Founder page
- **PR8** Polish, View Transitions, Lighthouse ≥95, DNS cutover
