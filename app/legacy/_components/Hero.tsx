"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroCanvas } from "./HeroCanvas";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-20">
        <div className="absolute left-1/2 top-[-20%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-accent-violet/25 blur-[160px]" />
        <div className="absolute left-[20%] top-[40%] h-[320px] w-[320px] rounded-full bg-accent-cyan/20 blur-[140px]" />
      </div>

      <HeroCanvas />

      <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="size-3 text-accent-cyan" />
          <span>Now booking Q2 engagements</span>
          <span className="text-muted-foreground/50">·</span>
          <span>2 slots left</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-5xl text-display text-balance"
        >
          Ship <span className="gradient-text">agentic AI</span>
          <br className="hidden md:block" /> that earns its keep.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
        >
          We design, build, and ship AI workflows that cut hours off ops, grow revenue
          per rep, and turn institutional knowledge into compounding leverage.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild variant="gradient" size="lg">
            <Link href="/contact#book">
              Book a consult
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/case-studies">See the work</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-cyan" /> Ship in weeks,
            not quarters
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent-violet" /> ROI tracked
            from day one
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-foreground/60" /> Code you
            actually own
          </span>
        </motion.div>
      </div>
    </section>
  );
}
