import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Twitter, Github } from 'lucide-react';
import logo from '../assets/logo.png';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4';

export default function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let fadingOut = false;

    function animate(from: number, to: number, duration = 500, cb?: () => void) {
      const start = performance.now();
      function tick(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        if (v) v.style.opacity = String(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
        else cb?.();
      }
      requestAnimationFrame(tick);
    }

    const onCanPlay = () => {
      v.play().catch(() => {});
      animate(0, 1);
    };
    const onTimeUpdate = () => {
      if (!v.duration || fadingOut) return;
      if (v.duration - v.currentTime <= 0.55) {
        fadingOut = true;
        animate(parseFloat(v.style.opacity || '1'), 0);
      }
    };
    const onEnded = () => {
      v.style.opacity = '0';
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        fadingOut = false;
        animate(0, 1);
      }, 100);
    };

    v.addEventListener('canplay', onCanPlay, { once: true });
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        style={{ opacity: 0 }}
        muted
        autoPlay
        playsInline
        preload="auto"
        src={HERO_VIDEO}
      />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_30%,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.7)_100%)]" />

      {/* Nav */}
      <div className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 font-semibold text-lg tracking-tight">
              <img src={logo} alt="" className="w-6 h-6 object-contain" />
              <span>TechAegisAI</span>
            </a>
            <nav className="hidden md:flex gap-8 ml-2">
              <a href="#services" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Services</a>
              <a href="#proof" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Live Run</a>
              <a href="#process" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Process</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-white text-sm font-medium hidden sm:block">Sign In</a>
            <a href="#book" className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Book a call</a>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[12%]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white tracking-tight whitespace-nowrap mb-8"
          style={{ fontFamily: '"Instrument Serif", serif', fontSize: 'clamp(3.5rem, 11vw, 9rem)', lineHeight: 0.95 }}
        >
          Ship agents <em className="italic" style={{ color: '#ff3a3f' }}>that work</em>.
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
          className="liquid-glass rounded-full max-w-xl w-full pl-6 pr-2 py-2 flex items-center gap-3 mb-6"
        >
          <input
            type="email"
            placeholder="Enter your work email"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-sm h-10"
          />
          <button type="submit" className="bg-white rounded-full p-3 text-black hover:scale-105 transition-transform">
            <ArrowRight size={20} />
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white text-sm leading-relaxed px-4 max-w-lg mb-8"
        >
          Tool-using agents in production for ops, revenue, and engineering. Evaluated, observable,
          and cheaper than the meeting about whether to build them.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#proof"
          className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors"
        >
          Watch a live agent run
        </motion.a>
      </div>

      {/* Social */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[
          { Icon: Linkedin, label: 'LinkedIn' },
          { Icon: Twitter, label: 'Twitter' },
          { Icon: Github, label: 'GitHub' },
        ].map(({ Icon, label }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
