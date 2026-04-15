import { logos } from "@/lib/data";

export function MarqueeLogos() {
  const doubled = [...logos, ...logos];
  return (
    <section className="border-b border-border py-14">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
        Trusted by teams shipping AI into production
      </p>
      <div
        className="relative mt-8 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-16">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-2xl font-semibold tracking-tight text-muted-foreground/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
