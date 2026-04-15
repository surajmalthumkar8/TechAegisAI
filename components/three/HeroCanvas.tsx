"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroNetwork = dynamic(() => import("./HeroNetwork"), {
  ssr: false,
  loading: () => null,
});

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useIsSmallScreen() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setSmall(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSmall(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return small;
}

export function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const small = useIsSmallScreen();

  if (reduced || small) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10"
      aria-hidden="true"
    >
      <HeroNetwork />
    </div>
  );
}
