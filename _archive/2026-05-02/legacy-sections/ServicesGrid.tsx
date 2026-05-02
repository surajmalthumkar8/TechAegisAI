import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

export function ServicesGrid() {
  return (
    <section className="border-b border-border py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            What we ship
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Six ways to put AI to work.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every engagement starts with measurable outcomes. We scope by KPI, not
            hours.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col gap-4 rounded-xl border border-border bg-surface/40 p-6 transition-all duration-base hover:border-muted-foreground/40 hover:bg-surface/80"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-gradient text-background shadow-[0_0_30px_-8px_hsl(var(--accent-violet)/0.6)]">
                    <Icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-base group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.blurb}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
