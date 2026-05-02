"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-black bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] px-6 pb-10 pt-32 md:pb-14 md:pt-44"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6 text-sm uppercase tracking-widest text-white/40"
        >
          — What we do
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Pioneering{" "}
          <em className="font-serif font-normal italic text-white/60">
            agents
          </em>{" "}
          for teams that
          <br className="hidden md:block" />{" "}
          <em className="font-serif font-normal italic text-white/60">
            ship, scale, and stay accountable.
          </em>
        </motion.h2>
      </div>
    </section>
  );
}
