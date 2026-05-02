import { Mail, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalEmbed } from "@/components/booking/CalEmbed";
import { siteConfig } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Sixty minutes. No slides. Leave with a scoped plan or the reason you aren't ready.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.06] bg-black py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div
            className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(226,58,62,0.18), transparent 60%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <div className="container relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red-soft">
            Contact
          </p>
          <h1
            className="mt-4 max-w-3xl font-serif text-5xl font-normal italic leading-[1.05] tracking-tight text-white md:text-7xl"
            style={{ fontFamily: 'var(--font-instrument-serif), serif' }}
          >
            Sixty minutes.{" "}
            <span className="text-brand-red-soft">No slides.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Leave with a scoped plan, a ten-day target, or an honest reason you
            aren&apos;t ready yet. Everything ships from that call.
          </p>
        </div>
      </section>

      <section
        id="book"
        className="border-b border-white/[0.06] bg-black py-20 md:py-28"
      >
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red-soft">
              Write
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-normal italic tracking-tight text-white md:text-4xl"
              style={{ fontFamily: 'var(--font-instrument-serif), serif' }}
            >
              Send a note.
            </h2>
            <p className="mt-3 text-white/60">
              Tell us the workflow you want to ship. One-business-day reply.
            </p>

            <div className="mt-10">
              <ContactForm defaultEmail={email} />
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-red-soft">
              Book
            </p>
            <h2
              className="mt-3 font-serif text-3xl font-normal italic tracking-tight text-white md:text-4xl"
              style={{ fontFamily: 'var(--font-instrument-serif), serif' }}
            >
              Grab a slot.
            </h2>
            <p className="mt-3 text-white/60">
              Faster than email. Pick a time that works, we&apos;ll send the
              link.
            </p>

            <div className="mt-10">
              <CalEmbed prefillEmail={email} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] bg-black py-16">
        <div className="container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-brand-red-soft" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Linkedin className="size-4 text-brand-red-soft" />
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-foreground hover:underline"
            >
              linkedin.com/company/techaegisai
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
