export type Tier = {
  id: string;
  name: string;
  price: { monthly: number; annual: number };
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 500, annual: 5000 },
    blurb: "For teams exploring their first real AI workflow.",
    features: [
      "One workflow scoped + shipped",
      "Monthly outcome report",
      "Email support with 48h SLA",
      "Handoff playbook for your team",
    ],
    cta: "Book a consult",
  },
  {
    id: "pro",
    name: "Professional",
    price: { monthly: 1250, annual: 12500 },
    blurb: "For teams shipping AI across two or three functions.",
    features: [
      "Up to 3 workflows in parallel",
      "Bi-weekly outcome + ROI review",
      "24/7 priority support",
      "Team enablement workshops",
      "Shared backlog of prioritized opportunities",
    ],
    cta: "Book a consult",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 2500, annual: 25000 },
    blurb: "For orgs making AI a core operating discipline.",
    features: [
      "Unlimited workflows with dedicated pod",
      "On-site kickoff + quarterly strategy",
      "Named account lead + 4h SLA",
      "Custom model training + eval harness",
      "Board-ready reporting on leverage KPIs",
    ],
    cta: "Talk to us",
  },
];

export const faqs = [
  {
    q: "What does the monthly fee actually buy?",
    a: "Scoped, shipped work — not hours. Each tier is capped by the number of concurrent workflows and the depth of the engagement model. You can upgrade or downgrade at any monthly boundary.",
  },
  {
    q: "How fast do we see value?",
    a: "The first workflow has to pay for itself in ten working days or we pause and pick a better target. That's a hard rule, not a marketing line.",
  },
  {
    q: "Do you sign an SOW or a retainer?",
    a: "Retainer for tiered engagements. Fixed-scope SOW for strategy sprints and one-off custom-model builds.",
  },
  {
    q: "Who owns the code and models?",
    a: "You do, from commit one. Everything ships into your repos, your cloud accounts, your observability stack.",
  },
  {
    q: "What stacks do you work in?",
    a: "Python, TypeScript, and whatever your team already runs. We're pragmatic about tooling — the goal is your team owning the result, not a greenfield.",
  },
];
