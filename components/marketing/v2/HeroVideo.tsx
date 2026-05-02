"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github } from "lucide-react";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";

const SOCIALS = [
  {
    Icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/suraj-malthumkar/",
  },
  {
    Icon: Github,
    label: "GitHub",
    href: "https://github.com/surajmalthumkar8",
  },
] as const;

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let fadingOut = false;

    const animate = (
      from: number,
      to: number,
      duration = 500,
      cb?: () => void,
    ) => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        if (v) v.style.opacity = String(from + (to - from) * eased);
        if (t < 1) requestAnimationFrame(tick);
        else cb?.();
      };
      requestAnimationFrame(tick);
    };

    const onCanPlay = () => {
      v.play().catch(() => {});
      animate(0, 1);
    };
    const onTimeUpdate = () => {
      if (!v.duration || fadingOut) return;
      if (v.duration - v.currentTime <= 0.55) {
        fadingOut = true;
        animate(parseFloat(v.style.opacity || "1"), 0);
      }
    };
    const onEnded = () => {
      v.style.opacity = "0";
      setTimeout(() => {
        v.currentTime = 0;
        v.play().catch(() => {});
        fadingOut = false;
        animate(0, 1);
      }, 100);
    };

    v.addEventListener("canplay", onCanPlay, { once: true });
    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const target = trimmed
      ? `/contact?email=${encodeURIComponent(trimmed)}#book`
      : "/contact#book";
    router.push(target);
  };

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover object-bottom"
        style={{ opacity: 0 }}
        muted
        autoPlay
        playsInline
        preload="auto"
        src={HERO_VIDEO}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_50%_30%,transparent_0%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.7)_100%)]" />

      <div className="relative z-20 px-6 py-6">
        <div className="liquid-glass mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full px-6 py-3">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-semibold tracking-tight"
            >
              <Image
                src="/logo.png"
                alt=""
                className="size-6 object-contain"
                width={24}
                height={24}
                priority
              />
              <span>TechAegisAI</span>
            </Link>
            <nav className="ml-2 hidden gap-8 md:flex">
              <Link
                href="/services"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Services
              </Link>
              <a
                href="#proof"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Live Run
              </a>
              <a
                href="#process"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Process
              </a>
            </nav>
          </div>
          <Link
            href="#book"
            className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white"
          >
            Book a call
          </Link>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 -translate-y-[12%] flex-col items-center justify-center px-6 py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 font-serif tracking-tight text-white md:whitespace-nowrap"
          style={{
            fontSize: "clamp(2.5rem, 11vw, 9rem)",
            lineHeight: 0.95,
          }}
        >
          Ship agents{" "}
          <em className="italic text-brand-red-soft">that work</em>.
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="liquid-glass mb-6 flex w-full max-w-xl items-center gap-3 rounded-full py-2 pl-6 pr-2"
        >
          <label htmlFor="hero-email" className="sr-only">
            Work email
          </label>
          <input
            id="hero-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            autoComplete="email"
            className="h-10 flex-1 border-none bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          <button
            type="submit"
            aria-label="Continue"
            className="rounded-full bg-white p-3 text-black transition-transform hover:scale-105"
          >
            <ArrowRight size={20} />
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 max-w-lg px-4 text-sm leading-relaxed text-white"
        >
          Tool-using agents in production for ops, revenue, and engineering.
          Evaluated, observable, and cheaper than the meeting about whether to
          build them.
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#proof"
          className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
        >
          Watch a live agent run
        </motion.a>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {SOCIALS.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </section>
  );
}
