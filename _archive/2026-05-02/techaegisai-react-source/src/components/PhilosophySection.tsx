import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4';

export default function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="process" className="bg-black py-28 md:py-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24 leading-none"
        >
          Strategy{' '}
          <em
            className="italic font-normal text-white/40 mx-2"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            x
          </em>{' '}
          Execution
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] bg-[#0a0a0a]"
          >
            <video src={VIDEO} muted autoPlay loop playsInline preload="auto" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span>01 — Map the workflow</span>
                <ArrowUpRight size={14} />
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed m-0">
                Every meaningful agent begins at the intersection of disciplined evaluation and bold product
                thinking. We score every candidate against value × tractability × failure-tolerance, and write
                the eval rubric before we write a prompt.
              </p>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                <span>02 — Ship the loop</span>
                <ArrowUpRight size={14} />
              </div>
              <p className="text-white/70 text-base md:text-lg leading-relaxed m-0">
                One agent in production behind a feature flag, taking real traffic with a kill switch.
                Faithfulness, latency, cost, and escalation rate on a dashboard your CFO will actually open.
                Boring on purpose.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
