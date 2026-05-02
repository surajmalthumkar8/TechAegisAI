import { stack } from "@/lib/data";

export function MarqueeLogos() {
  const doubled = [...stack, ...stack];
  return (
    <section className="overflow-hidden bg-black py-16">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        Drops into the stack you already run
      </p>
      <div
        className="liquid-glass relative mx-auto mt-8 max-w-6xl overflow-hidden rounded-full py-3"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-3 px-3">
          {doubled.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.name}-${i}`}
                className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 transition-colors hover:border-brand-red-soft/40 hover:bg-brand-red-soft/[0.06]"
              >
                <Icon className="size-4 text-white/50 transition-colors group-hover:text-brand-red-soft" />
                <span className="text-sm font-medium tracking-tight text-white/70 transition-colors group-hover:text-white">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
