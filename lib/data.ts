import {
  Workflow,
  LineChart,
  Bot,
  Boxes,
  GraduationCap,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "process-optimization",
    title: "AI Process Optimization",
    blurb:
      "Audit ops end-to-end, kill the dead weight, replace manual loops with agents that pay for themselves in week one.",
    icon: Workflow,
  },
  {
    slug: "data-driven-decisions",
    title: "Data-Driven Decisions",
    blurb:
      "Turn scattered spreadsheets into a live signal layer. Dashboards that answer questions leadership actually asks.",
    icon: LineChart,
  },
  {
    slug: "intelligent-automation",
    title: "Intelligent Automation",
    blurb:
      "Agentic workflows that ingest context, take action, and write back to your stack. Not chatbots — operators.",
    icon: Bot,
  },
  {
    slug: "custom-ai-models",
    title: "Custom AI Models",
    blurb:
      "Bespoke models shaped to your domain data. Fine-tuned, evaluated, shipped with guardrails and rollback.",
    icon: Boxes,
  },
  {
    slug: "training-and-support",
    title: "Training & Enablement",
    blurb:
      "Hands-on programs that leave your team owning the system, not dependent on ours.",
    icon: GraduationCap,
  },
  {
    slug: "ai-strategy",
    title: "AI Strategy Consulting",
    blurb:
      "A 90-day roadmap from current state to measurable AI leverage — with the unit economics worked out.",
    icon: Compass,
  },
];

export type Metric = {
  value: number;
  suffix: string;
  label: string;
};

export const metrics: Metric[] = [
  { value: 15, suffix: "hrs/wk", label: "saved per operator" },
  { value: 30, suffix: "%", label: "lift in qualified leads" },
  { value: 25, suffix: "%", label: "revenue growth" },
  { value: 40, suffix: "%", label: "faster turnaround" },
  { value: 15, suffix: "%", label: "lower cost-to-serve" },
];

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The payback window was ten days. We had four ops hires on the hiring plan and cut it to one.",
    author: "Director of Operations",
    role: "Mid-market retailer",
  },
  {
    quote:
      "They shipped something working in week one. Not a slide deck, not a demo — something we use every day.",
    author: "Head of Growth",
    role: "B2B SaaS, Series B",
  },
  {
    quote:
      "Our reps now close deals with context they never had. Pipeline is up 30% without a single new hire.",
    author: "VP Sales",
    role: "Industrial services",
  },
];

export const logos = [
  "Northwind",
  "Halcyon",
  "Meridian",
  "Byteforge",
  "Ironclad",
  "Relay",
  "Obsidian",
  "Signal",
];
