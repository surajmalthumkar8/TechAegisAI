import { metrics } from "@/lib/data";
import { AnimatedCounter } from "./AnimatedCounter";

export function MetricBand() {
  return (
    <section className="bg-black px-6 pb-4 pt-16">
      <div className="liquid-glass mx-auto max-w-5xl rounded-3xl px-8 py-6 md:rounded-full md:py-5">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-center md:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center">
              <div className="font-serif text-3xl italic text-white md:text-4xl">
                <AnimatedCounter to={metric.value} />
                <span className="text-brand-red-soft">{metric.suffix}</span>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/40">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
