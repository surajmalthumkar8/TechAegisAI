import { logos } from "@/lib/data";

export function MarqueeLogos() {
  const doubled = [...logos, ...logos];
  return (
    <section className="overflow-hidden bg-black py-16">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        Trusted by teams shipping AI into production
      </p>
      <div
        className="liquid-glass relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-full py-5"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-16">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl font-medium tracking-tight text-white/55 transition-colors hover:text-brand-red-soft"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
