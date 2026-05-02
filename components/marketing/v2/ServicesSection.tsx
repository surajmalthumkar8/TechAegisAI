"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LazyVideo } from "./LazyVideo";

const SERVICES = [
  {
    tag: "Strategy",
    title: "Research & Insight",
    desc: "We map workflows, score every candidate against value × tractability × failure-tolerance, and write the eval rubric before the first prompt.",
    href: "/services/ai-strategy",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    tag: "Craft",
    title: "Design & Execution",
    desc: "Tool-using agents in production — refunds, lead enrichment, ticket triage, code review. Designed to be killable, instrumented to be trusted.",
    href: "/services/intelligent-automation",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  },
] as const;

export function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="services"
      className="overflow-hidden bg-black bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <h2 className="m-0 text-3xl tracking-tight text-white md:text-5xl">
            What we ship
          </h2>
          <Link
            href="/services"
            className="hidden text-sm text-white/40 transition-colors hover:text-white md:block"
          >
            View all services →
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="liquid-glass group overflow-hidden rounded-3xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <LazyVideo
                  src={s.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    {s.tag}
                  </span>
                  <Link
                    href={s.href}
                    aria-label={`${s.title} — read more`}
                    className="liquid-glass inline-flex rounded-full p-2 text-white"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <h3 className="m-0 mb-3 text-xl font-medium tracking-tight text-white md:text-2xl">
                  {s.title}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-white/55">
                  {s.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
