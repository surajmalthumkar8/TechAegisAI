# TechAegisAI Website — React + TS + Vite + Tailwind

Production-ready Vite app. Liquid-glass landing page + **Live Agent Run** terminal + highlighted **Book a Call** moment.

## Stack
- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion (scroll/inview animations)
- Lucide React (icons)

## Structure
```
src/
  main.tsx
  App.tsx
  index.css                          # @import Instrument Serif + .liquid-glass
  pages/
    Index.tsx                        # Hero w/ background-video crossfade loop
  components/
    AboutSection.tsx
    FeaturedVideoSection.tsx
    LiveAgentSection.tsx             # ⭐ streaming tool-call terminal
    PhilosophySection.tsx
    ServicesSection.tsx
    BookCallSection.tsx              # ⭐ highlighted CTA
    Footer.tsx
  assets/
    logo.png
public/
  logo.png
```

## Run locally
```bash
cd techaegisai-react
npm install
npm run dev          # http://localhost:5173
npm run build        # → dist/
```

## Live Agent Run (`LiveAgentSection.tsx`)
- Streams a sanitized order-exception agent trace into a terminal.
- Live counters: tool calls, runs closed, last tool.
- Tool grid lights up the active tool in brand red.
- Loops cleanly every ~5.5s; pauses when off-screen.

## Book a Call (`BookCallSection.tsx`)
- Pulsing red ambient glow behind a liquid-glass red-tinted card.
- "2 slots left this week" scarcity ping.
- 4 perks with staggered checkmark reveal.
- Solid white primary button (highest contrast on the page).
- Trust strip: SOC 2 / ISO 27001 / GDPR / HIPAA-eligible.

## Commit to git
From this folder:
```bash
git init
git add .
git commit -m "feat: liquid-glass landing + live agent run + book-call CTA"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
