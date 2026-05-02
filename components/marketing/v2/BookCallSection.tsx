"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { BookCallDialog } from "@/components/booking/BookCallDialog";

const PERKS = [
  "90-minute working session, not a sales pitch",
  "Build/buy call and target cost-per-run, in writing",
  "Eval rubric drafted live on your messiest workflow",
  "NDA returned in < 24 hours",
];

export function BookCallSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hover, setHover] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <section
        ref={ref}
        id="book"
        className="relative overflow-hidden bg-black px-6 py-32 md:py-44"
      >
        <motion.div
          animate={{ scale: hover ? 1.15 : 1, opacity: hover ? 0.9 : 0.7 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse, rgba(226,58,62,0.35), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 50% at center, #000 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50% at center, #000 30%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="liquid-glass liquid-glass-red relative overflow-hidden rounded-[40px] p-10 text-center md:p-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute right-8 top-8 text-white/20"
            >
              <Sparkles size={32} />
            </motion.div>

            <div className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#ff8a8c]">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff8a8c] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#ff8a8c]" />
              </span>
              Booking 4 slots this week · 2 left
            </div>

            <h2
              className="mb-6 font-serif font-normal italic tracking-tight text-white"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                lineHeight: 1,
              }}
            >
              One workflow.
              <br />
              <span className="text-brand-red-soft">Ninety days.</span>
              <br />
              An agent your team owns.
            </h2>

            <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              Bring your messiest workflow to a 90-minute working session.
              We&apos;ll leave with a build/buy call, a target cost-per-run,
              and a date.
            </p>

            <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {PERKS.map((p, i) => (
                <motion.div
                  key={p}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-sm text-white/80"
                >
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 flex-shrink-0 text-brand-red-soft"
                  />
                  <span>{p}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
                onClick={() => setDialogOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-medium text-black shadow-2xl shadow-brand-red-soft/30"
              >
                <Calendar size={16} />
                Book working session
                <ArrowRight size={16} />
              </motion.button>
              <Link
                href="/blog"
                className="liquid-glass inline-flex items-center rounded-full px-8 py-4 text-sm font-medium text-white"
              >
                Read the playbook
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-widest text-white/40">
              <span>SOC 2 Type II</span>
              <span>ISO 27001</span>
              <span>GDPR</span>
              <span>HIPAA-eligible</span>
              <span>From $40K</span>
            </div>
          </motion.div>
        </div>
      </section>

      <BookCallDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
