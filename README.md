# TechAegisAI Website

Production-grade marketing site for TechAegisAI — an AI consulting practice.

## Stack

- **Framework**: Next.js 15 (App Router, React 19, Turbopack dev)
- **Styling**: Tailwind v3.4 + custom design tokens + shadcn-style primitives
- **3D / interactive**: Three.js + React Three Fiber + drei + postprocessing, GSAP + ScrollTrigger, Framer Motion
- **Content**: MDX via gray-matter + next-mdx-remote/rsc (services, case studies, blog posts)
- **Forms**: Server Actions + Zod validation + Resend + Upstash rate-limit
- **Booking**: Cal.com embed
- **Analytics**: Vercel Analytics + Speed Insights (GA4 wiring parked behind a consent gate)
- **Deploy**: Vercel

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm build && pnpm start
pnpm typecheck
pnpm lint
pnpm format
```

Copy `.env.example` → `.env.local` and fill in as features come online. Everything is env-gated — missing keys log a warning and the site still runs.

## Env vars (prod)

```
RESEND_API_KEY=               # contact form delivery
CONTACT_TO_EMAIL=hello@techaegisai.com
CONTACT_FROM_EMAIL=TechAegisAI <hello@techaegisai.com>
UPSTASH_REDIS_REST_URL=       # contact form rate-limit (5/hr/ip)
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_CALCOM_LINK=      # e.g. techaegisai/intro
NEXT_PUBLIC_GA_ID=            # optional, gated by consent
```

## Content

All content lives as MDX under `/content/{services,case-studies,blog}`. Frontmatter is typed in [lib/content.ts](lib/content.ts). To publish a new post:

```bash
echo "new file" > content/blog/my-new-post.mdx
# add frontmatter + body, commit, push — sitemap + rss auto-pick it up
```

## Cutover checklist (DNS from GoDaddy → Vercel)

1. `vercel link` then `vercel --prod` (or connect the GitHub repo)
2. Add `techaegisai.com` and `www.techaegisai.com` in the Vercel project's Domains tab
3. Point the GoDaddy A record at `76.76.21.21` and CNAME `www` at `cname.vercel-dns.com`
4. In Resend, add the domain and paste the SPF + DKIM + DMARC records into GoDaddy DNS
5. Verify at `https://techaegisai.com/contact` → send a real test message
6. Submit `https://techaegisai.com/sitemap.xml` to Google Search Console

## Roadmap

| PR | Scope | Status |
|----|------|--------|
| #1 | Landing v1 (hero, services, metrics, testimonials, cta, marquee) | shipped |
| #2 | 3D hero (r3f network, mobile + reduced-motion fallback) | shipped |
| #3 | MDX content pipeline (services + case studies, og, sitemap) | shipped |
| #4 | Blog (list + post, toc, reading progress, rss) | shipped |
| #5 | Pricing + contact (resend + upstash + cal.com) | shipped |
| #6 | About + founder page | shipped |
| #7 | Polish (gsap scroll narrative, ci, docs) | this PR |

Plan lives in [CLAUDE.md](./CLAUDE.md).
