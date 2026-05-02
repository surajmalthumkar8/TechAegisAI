import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4';

export default function FeaturedVideoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="rounded-3xl overflow-hidden aspect-video relative bg-[#0a0a0a]"
        >
          <video src={VIDEO} muted autoPlay loop playsInline preload="auto" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row items-end justify-between gap-6 flex-wrap">
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md">
              <div className="text-white/50 text-xs tracking-widest uppercase mb-3">Our Approach</div>
              <p className="text-white text-sm md:text-base leading-relaxed m-0">
                We design, build, and operate production agentic systems. Tool-using, evaluated end-to-end,
                instrumented harder than the rest of your stack — and handed off to your team in 90 days.
              </p>
            </div>
            <motion.a
              href="#proof"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium"
            >
              Watch a live run →
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
