"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LazyVideo } from "./LazyVideo";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";

export function FeaturedVideoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative aspect-video overflow-hidden rounded-3xl bg-[#0a0a0a]"
        >
          <LazyVideo
            src={VIDEO}
            muted
            autoPlay
            loop
            playsInline
            className="size-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-6 p-6 md:flex-row md:p-10">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <div className="mb-3 text-xs uppercase tracking-widest text-white/50">
                Our Approach
              </div>
              <p className="text-sm leading-relaxed text-white md:text-base">
                We design, build, and operate production agentic systems.
                Tool-using, evaluated end-to-end, instrumented harder than the
                rest of your stack — and handed off to your team in 90 days.
              </p>
            </div>
            <motion.a
              href="#proof"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white"
            >
              Watch a live run →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
