"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

export function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="process"
      className="overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-5xl leading-none tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl"
        >
          Strategy{" "}
          <em className="mx-2 font-serif font-normal italic text-white/40">
            x
          </em>{" "}
          Execution
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="aspect-[4/3] overflow-hidden rounded-3xl bg-[#0a0a0a]"
          >
            <video
              src={VIDEO}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
              className="size-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
                <span>01 — Map the workflow</span>
                <ArrowUpRight size={14} />
              </div>
              <p className="m-0 text-base leading-relaxed text-white/70 md:text-lg">
                Every meaningful agent begins at the intersection of disciplined
                evaluation and bold product thinking. We score every candidate
                against value × tractability × failure-tolerance, and write the
                eval rubric before we write a prompt.
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div>
              <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40">
                <span>02 — Ship the loop</span>
                <ArrowUpRight size={14} />
              </div>
              <p className="m-0 text-base leading-relaxed text-white/70 md:text-lg">
                One agent in production behind a feature flag, taking real
                traffic with a kill switch. Faithfulness, latency, cost, and
                escalation rate on a dashboard your CFO will actually open.
                Boring on purpose.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
