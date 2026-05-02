import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, Sparkles } from 'lucide-react';

const PERKS = [
  '90-minute working session, not a sales pitch',
  'Build/buy call and target cost-per-run, in writing',
  'Eval rubric drafted live on your messiest workflow',
  'NDA returned in < 24 hours',
];

export default function BookCallSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [hover, setHover] = useState(false);

  return (
    <section ref={ref} id="book" className="relative py-32 md:py-44 px-6 overflow-hidden bg-black">
      {/* Ambient red orb */}
      <motion.div
        animate={{ scale: hover ? 1.15 : 1, opacity: hover ? 0.9 : 0.7 }}
        transition={{ duration: 0.8 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(226,58,62,0.35), transparent 60%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 50% at center, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at center, #000 30%, transparent 75%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="liquid-glass liquid-glass-red rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Sparkle accent */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-8 right-8 text-white/20"
          >
            <Sparkles size={32} />
          </motion.div>

          <div className="inline-flex items-center gap-2 text-[#ff8a8c] text-xs tracking-widest uppercase mb-6">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff8a8c] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ff8a8c]" />
            </span>
            Booking 4 slots this week · 2 left
          </div>

          <h2
            className="text-white tracking-tight mb-6"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              lineHeight: 1,
              fontStyle: 'italic',
              fontWeight: 400,
            }}
          >
            One workflow.
            <br />
            <span className="text-[#ff5e62]">Ninety days.</span>
            <br />
            An agent your team owns.
          </h2>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Bring your messiest workflow to a 90-minute working session. We'll leave with a build/buy
            call, a target cost-per-run, and a date.
          </p>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-10 text-left">
            {PERKS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-2.5 text-white/80 text-sm"
              >
                <CheckCircle2 size={16} className="text-[#ff5e62] mt-0.5 flex-shrink-0" />
                <span>{p}</span>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHover(true)}
              onHoverEnd={() => setHover(false)}
              className="bg-white text-black rounded-full px-8 py-4 text-sm font-medium inline-flex items-center gap-2.5 shadow-2xl shadow-[#ff5e62]/30"
            >
              <Calendar size={16} />
              Book working session
              <ArrowRight size={16} />
            </motion.a>
            <a
              href="#"
              className="liquid-glass rounded-full px-8 py-4 text-white text-sm font-medium inline-flex items-center"
            >
              Read the playbook
            </a>
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex justify-center gap-x-8 gap-y-3 flex-wrap text-white/40 text-[11px] font-mono uppercase tracking-widest">
            <span>SOC 2 Type II</span>
            <span>ISO 27001</span>
            <span>GDPR</span>
            <span>HIPAA-eligible</span>
            <span>From $40K</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
