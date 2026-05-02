"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "Two weeks with your team. Every workflow mapped, costed, and ranked by dollar-impact. Output is a backlog you can defend in a board meeting.",
  },
  {
    n: "02",
    title: "Ship",
    body: "Top-ROI workflow gets built in the next four weeks. Working code in your stack. A real dashboard tracking the baseline vs the new world.",
  },
  {
    n: "03",
    title: "Hand off",
    body: "Playbook, eval harness, and runbook go to your team. We step back. The next three workflows run without a call to us.",
  },
];

export function HowWeShip() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!root.current || !track.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const cards = track.current!.querySelectorAll<HTMLElement>("[data-step]");
      const distance = () => track.current!.scrollWidth - window.innerWidth + 96;

      const tween = gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-border py-24 lg:py-32"
    >
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            How we ship
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Three steps. Ninety days.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every engagement runs this loop. Every client takes it home.
          </p>
        </div>
      </div>

      <div
        ref={track}
        className="container mt-16 flex gap-6 lg:mt-20 lg:flex-nowrap lg:gap-10"
      >
        {steps.map((s) => (
          <div
            key={s.n}
            data-step
            className="relative flex w-full shrink-0 flex-col gap-5 rounded-2xl border border-border bg-surface/40 p-10 lg:w-[calc(100vw-12rem)] lg:min-h-[420px]"
          >
            <span className="font-mono text-6xl text-border lg:text-8xl">
              {s.n}
            </span>
            <h3 className="text-3xl font-semibold tracking-tight lg:text-5xl">
              {s.title}
            </h3>
            <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
