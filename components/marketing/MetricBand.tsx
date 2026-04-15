import { metrics } from "@/lib/data";
import { AnimatedCounter } from "./AnimatedCounter";

export function MetricBand() {
  return (
    <section className="border-b border-border py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-accent-violet">
            Outcomes, not activity
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Numbers from shipped engagements.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-5">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col items-center rounded-xl border border-border bg-surface/40 p-6 text-center"
            >
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">
                <span className="gradient-text">
                  <AnimatedCounter to={metric.value} />
                </span>
                <span className="ml-1 text-xl text-muted-foreground md:text-2xl">
                  {metric.suffix}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
