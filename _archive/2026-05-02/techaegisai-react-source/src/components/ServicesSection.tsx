import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const SERVICES = [
  {
    tag: 'Strategy',
    title: 'Research & Insight',
    desc: 'We map workflows, score every candidate against value × tractability × failure-tolerance, and write the eval rubric before the first prompt.',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  },
  {
    tag: 'Craft',
    title: 'Design & Execution',
    desc: 'Tool-using agents in production — refunds, lead enrichment, ticket triage, code review. Designed to be killable, instrumented to be trusted.',
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="services"
      className="bg-black py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-end mb-16 gap-6 flex-wrap"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight m-0">What we ship</h2>
          <span className="text-white/40 text-sm hidden md:block">— Selected services</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="liquid-glass rounded-3xl overflow-hidden group"
            >
              <div className="aspect-video overflow-hidden relative">
                <video
                  src={s.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-white/40 text-xs tracking-widest uppercase">{s.tag}</span>
                  <a className="liquid-glass rounded-full p-2 text-white inline-flex" href="#">
                    <ArrowUpRight size={16} />
                  </a>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium m-0">
                  {s.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed m-0">{s.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
