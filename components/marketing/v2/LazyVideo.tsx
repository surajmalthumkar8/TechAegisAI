"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src"> & {
  src: string;
  rootMargin?: string;
};

/**
 * Below-the-fold autoplay video that defers network and decode work until the
 * user is about to scroll to it. Pauses when scrolled out of view to free up
 * decode threads. The hero video ships eagerly via a normal <video>.
 */
export function LazyVideo({
  src,
  rootMargin = "300px",
  className,
  ...props
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const loadObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObs.disconnect();
        }
      },
      { rootMargin },
    );
    loadObs.observe(el);

    const playObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 },
    );
    playObs.observe(el);

    return () => {
      loadObs.disconnect();
      playObs.disconnect();
    };
  }, [rootMargin]);

  return (
    <video
      ref={ref}
      src={shouldLoad ? src : undefined}
      preload="metadata"
      className={className}
      {...props}
    />
  );
}
