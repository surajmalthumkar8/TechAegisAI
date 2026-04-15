import Link from "next/link";
import { ArrowRight, Compass, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTABand } from "@/components/layout/CTABand";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "TechAegisAI is a founder-led consulting practice shipping agentic AI into mid-market operations. Built around outcomes, not slideware.",
  path: "/about",
});

const values = [
  {
    icon: Target,
    title: "Outcomes over optics",
    body: "Every engagement starts with a number. If the project can't be written as a before-and-after metric, it's not ready to ship.",
  },
  {
    icon: Zap,
    title: "Ship in weeks",
    body: "The first workflow pays for itself in ten working days or we pause and pick a better one. The slow build is the fast build.",
  },
  {
    icon: Compass,
    title: "You own the result",
    body: "Code in your repos. Models on your infra. Runbooks your team wrote. We build practices, not dependencies.",
  },
];

const timeline = [
  {
    when: "2019",
    title: "First automation",
    body: "Shipped a reconciliation bot for a retailer's ops team. Saw firsthand how much leverage was locked behind tooling no one had bothered to build.",
  },
  {
    when: "2022",
    title: "Agents got real",
    body: "Function-calling changed what was possible inside a single workflow. Started pairing frontier models with domain data on real operational problems.",
  },
  {
    when: "2025",
    title: "TechAegisAI",
    body: "Founded the practice to ship agentic AI into mid-market ops — where the data is messy, the stakes are real, and the leverage compounds.",
  },
  {
    when: "Now",
    title: "Building the playbook",
    body: "Every engagement refines it. Every client takes it home. The goal is a practice that outlives any single project.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Audit",
    body: "Two weeks with your team. Every workflow gets mapped, costed, and ranked. Output: a backlog ordered by ROI, not by hype.",
  },
  {
    step: "02",
    title: "Ship",
    body: "Highest-ROI workflow gets built in the next four weeks. Real code in your stack. Real dashboard tracking the baseline.",
  },
  {
    step: "03",
    title: "Hand off",
    body: "Playbook, eval harness, and runbook go to your team. We step back. Your next three workflows run without a call to us.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[140px]" />
        </div>
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">About</p>
          <h1 className="mt-3 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-6xl">
            A consulting practice built to{" "}
            <span className="gradient-text">ship</span>, not to sell slides.
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            TechAegisAI is a founder-led practice putting agentic AI into mid-market
            operations — where the workflows are real, the data is messy, and the
            leverage compounds every quarter.
          </p>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-[1fr_320px]">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-accent-violet">
                Founder&apos;s note
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                Hi, I&apos;m Suraj.
              </h2>
              <div className="mt-8 space-y-5 text-pretty leading-relaxed text-foreground/90">
                <p>
                  I&apos;ve spent the last five years watching smart ops teams get
                  buried under work that didn&apos;t need to exist. Spreadsheet
                  reconciliations nobody owns. Ticket triage that burns a person
                  every week. Outreach research that takes two hours to produce
                  context anyone could have pulled.
                </p>
                <p>
                  The tools to fix this exist. They&apos;ve existed for a while.
                  What&apos;s been missing is the practice — the discipline of
                  picking the right workflow, scoping it to a dollar outcome, and
                  shipping working code inside a month.
                </p>
                <p>
                  TechAegisAI is built around that practice. Every engagement is
                  scoped by KPI. Every project pays for itself in ten working days
                  or we move to a better one. Every artifact — code, evals,
                  playbooks — ships into your repos, not ours.
                </p>
                <p>
                  If any of that sounds like the conversation your team should be
                  having, let&apos;s talk.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gradient" size="lg">
                  <Link href="/contact#book">
                    Book a consult <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/case-studies">See the work</Link>
                </Button>
              </div>
            </div>

            <aside className="md:sticky md:top-24 md:self-start">
              <div className="rounded-xl border border-border bg-surface/40 p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  The short version
                </p>
                <dl className="mt-4 space-y-4 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Founded</dt>
                    <dd className="font-medium">2025</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Based</dt>
                    <dd className="font-medium">Hyderabad, India</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Focus</dt>
                    <dd className="font-medium">Agentic AI for mid-market ops</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Engagement</dt>
                    <dd className="font-medium">Retainer, scoped by KPI</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Values
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Three rules, no exceptions.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-surface/40 p-6"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-accent-gradient text-background shadow-[0_0_30px_-8px_hsl(var(--accent-violet)/0.6)]">
                  <v.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-violet">
            Journey
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            How we got here.
          </h2>

          <ol className="mt-14 relative border-l border-border pl-8">
            {timeline.map((t, i) => (
              <li key={i} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[41px] top-1 flex size-6 items-center justify-center rounded-full border border-border bg-background">
                  <span className="size-2 rounded-full bg-accent-gradient" />
                </span>
                <p className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
                  {t.when}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {t.title}
                </h3>
                <p className="mt-2 max-w-2xl text-muted-foreground">{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-border py-24">
        <div className="container">
          <p className="text-xs uppercase tracking-widest text-accent-cyan">
            Methodology
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            How every engagement runs.
          </h2>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {methodology.map((m) => (
              <div
                key={m.step}
                className="relative overflow-hidden rounded-xl border border-border bg-surface/40 p-8"
              >
                <span className="absolute right-6 top-6 font-mono text-5xl text-border">
                  {m.step}
                </span>
                <h3 className="text-xl font-semibold">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
