import { Mail, Linkedin } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { CalEmbed } from "@/components/booking/CalEmbed";
import { siteConfig } from "@/lib/utils";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "30-minute consult. No slides. Leave with a scoped plan or the reason you're not ready.",
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
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-[140px]" />
        </div>
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Contact
          </p>
          <h1 className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            Thirty minutes. <span className="gradient-text">No slides.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg text-muted-foreground">
            Leave with a scoped plan, a ten-day target, or an honest reason you
            aren&apos;t ready yet. Everything ships from that call.
          </p>
        </div>
      </section>

      <section id="book" className="border-b border-border py-20">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent-cyan">
              Write
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Send a note.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us the workflow you want to ship. One-business-day reply.
            </p>

            <div className="mt-10">
              <ContactForm defaultEmail={email} />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-accent-violet">
              Book
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Grab a slot.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Faster than email. Pick a time that works, we&apos;ll send the link.
            </p>

            <div className="mt-10">
              <CalEmbed />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="container flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="size-4 text-accent-cyan" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-foreground hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Linkedin className="size-4 text-accent-violet" />
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
