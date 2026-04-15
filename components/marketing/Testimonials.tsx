import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="border-b border-border py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            What buyers say
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Shipped work, measured results.
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface/40 p-6"
            >
              <Quote className="size-5 text-accent-violet" />
              <blockquote className="mt-4 text-balance text-base leading-relaxed">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
