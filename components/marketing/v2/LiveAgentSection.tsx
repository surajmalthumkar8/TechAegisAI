"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Zap,
  CheckCircle2,
  AlertCircle,
  Database,
  Send,
  Mail,
  FileText,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

type LineKind = "agent" | "think" | "tool" | "ok" | "warn" | "sep";
type Line = { d: number; kind: LineKind; html: string };
type StepStatus = "pending" | "active" | "done";

type Step = {
  id: string;
  icon: LucideIcon;
  name: string;
  tool: string;
  doneDetail: string;
};

const PIPELINE: Step[] = [
  {
    id: "db.query",
    icon: Database,
    name: "Read context",
    tool: "db.query",
    doneDetail: "10 rows · 84ms",
  },
  {
    id: "stripe.refund",
    icon: CreditCard,
    name: "Process refund",
    tool: "stripe.refund",
    doneDetail: "$28.90 · 412ms",
  },
  {
    id: "gmail.draft",
    icon: Mail,
    name: "Draft customer email",
    tool: "gmail.draft",
    doneDetail: "human review · 184ms",
  },
  {
    id: "notion.append",
    icon: FileText,
    name: "Log resolution",
    tool: "notion.append",
    doneDetail: "ops/log/2026-W18 · 96ms",
  },
  {
    id: "eval.score",
    icon: Zap,
    name: "Score the trace",
    tool: "eval.score",
    doneDetail: "faith=0.96 · cost=$0.011",
  },
  {
    id: "slack.send",
    icon: Send,
    name: "Notify ops",
    tool: "slack.send",
    doneDetail: "#ops-alerts · 137ms",
  },
];

const SCRIPT: Line[] = [
  { d: 0, kind: "agent", html: "run #4129 · queue=order_exceptions · ctx=last_24h" },
  { d: 320, kind: "think", html: "thinking: 47 unresolved exceptions. Top by $ impact first." },
  { d: 540, kind: "tool", html: '<b>db.query</b>(<i>"select * from exceptions where status=open order by total desc limit 10"</i>)' },
  { d: 920, kind: "ok", html: "10 rows · 84ms" },
  { d: 1080, kind: "think", html: "thinking: order #A-88241 — refund, missing item. Customer LTV $4,210." },
  { d: 1380, kind: "tool", html: "<b>stripe.refund</b>(<i>pi_3PqL...</i>, amount=2890, reason=\"missing_item\")" },
  { d: 1820, kind: "ok", html: "refund_id=re_3PqL · 412ms" },
  { d: 1980, kind: "tool", html: '<b>gmail.draft</b>(to=customer, template="refund_apology_v3")' },
  { d: 2280, kind: "ok", html: "draft saved · awaiting human review · 184ms" },
  { d: 2440, kind: "tool", html: '<b>notion.append</b>(page="ops/log/2026-W18", "#A-88241 resolved")' },
  { d: 2680, kind: "ok", html: "block_id=xyz9 · 96ms" },
  { d: 2820, kind: "tool", html: '<b>eval.score</b>(trace="4129.A88241")' },
  { d: 3140, kind: "ok", html: "faithfulness=<b>0.96</b> · latency=2.3s · cost=$0.011" },
  { d: 3300, kind: "think", html: "pattern: 6/10 are missing-item refunds from same warehouse." },
  { d: 3640, kind: "tool", html: '<b>slack.send</b>(#ops-alerts, p2, "Spike: 6 missing-item refunds, WH-DAL")' },
  { d: 3920, kind: "ok", html: "ts=1714432891.4 · 137ms" },
  { d: 4140, kind: "agent", html: "run #4129 closed · 9 tools · $0.011 · 4.5s · ✓ resolved" },
  { d: 4500, kind: "sep", html: "─────────────────────────────────────" },
  { d: 4700, kind: "agent", html: "run #4130 · queue=lead_enrichment · ctx=new_signups" },
];

const LOOP_MS = 5500;

const pad = (n: number, w = 2) => String(n).padStart(w, "0");
const ts = (start: Date, ms: number) => {
  const t = new Date(start.getTime() + ms);
  return `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}.${pad(t.getMilliseconds(), 3)}`;
};

function PipelineStep({
  step,
  status,
  isLast,
}: {
  step: Step;
  status: StepStatus;
  isLast: boolean;
}) {
  const Icon = step.icon;
  const ringClass =
    status === "active"
      ? "border-brand-red-soft/50 bg-brand-red-soft/[0.04] shadow-[0_0_30px_-10px_rgba(255,94,98,0.45)]"
      : status === "done"
        ? "border-emerald-400/20 bg-black/30"
        : "border-white/[0.06] bg-black/20";
  const iconBgClass =
    status === "active"
      ? "bg-brand-red-soft/15 text-brand-red-soft ring-1 ring-brand-red-soft/40"
      : status === "done"
        ? "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20"
        : "bg-white/[0.03] text-white/30";
  const titleClass =
    status === "pending" ? "text-white/40" : "text-white";
  const toolClass =
    status === "active"
      ? "text-brand-red-soft"
      : status === "done"
        ? "text-emerald-400/80"
        : "text-white/30";

  return (
    <li className="relative">
      <div
        className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 md:gap-4 md:p-4 ${ringClass}`}
      >
        <div
          className={`flex size-10 flex-none items-center justify-center rounded-lg transition-colors ${iconBgClass}`}
        >
          {status === "active" ? (
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red-soft opacity-75" />
              <Icon className="size-4" />
            </span>
          ) : (
            <Icon className="size-4" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className={`text-sm font-medium tracking-tight transition-colors ${titleClass}`}
          >
            {step.name}
          </div>
          <div
            className={`mt-0.5 truncate font-mono text-[11px] transition-colors ${toolClass}`}
          >
            {status === "done" ? step.doneDetail : step.tool}
          </div>
        </div>
        <div className="ml-auto flex flex-none items-center">
          {status === "done" && (
            <CheckCircle2 className="size-4 text-emerald-400" />
          )}
          {status === "active" && (
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red-soft opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-red-soft" />
            </span>
          )}
          {status === "pending" && (
            <span className="size-2 rounded-full bg-white/10" />
          )}
        </div>
      </div>
      {!isLast && (
        <div
          className={`ml-7 h-4 w-px transition-colors duration-500 ${
            status === "done"
              ? "bg-emerald-400/30"
              : status === "active"
                ? "bg-brand-red-soft/40"
                : "bg-white/10"
          }`}
          aria-hidden
        />
      )}
    </li>
  );
}

export function LiveAgentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const bodyRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ calls: 0, runs: 0 });
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [doneSteps, setDoneSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!inView) return;
    const start = new Date();
    let loop = 0;
    let stopped = false;
    let toolCalls = 0;
    let runCount = 0;
    const timeouts: number[] = [];

    const tick = () => {
      if (stopped) return;
      const offset = loop * LOOP_MS;

      // Reset pipeline state at start of each loop
      timeouts.push(
        window.setTimeout(() => {
          if (stopped) return;
          setActiveStep(null);
          setDoneSteps(new Set());
        }, offset),
      );

      SCRIPT.forEach((line) => {
        const id = window.setTimeout(() => {
          if (stopped || !bodyRef.current) return;

          const div = document.createElement("div");
          div.className = `term-line ${line.kind}`;
          const tsEl = `<span class="text-white/30 mr-3">${ts(start, line.d + offset)}</span>`;
          let prefix = "";
          let color = "text-white/70";
          if (line.kind === "agent") {
            prefix = "[agent]";
            color = "text-white/50";
          }
          if (line.kind === "think") {
            prefix = "→";
            color = "text-amber-300/70 italic";
          }
          if (line.kind === "tool") {
            prefix = "⟶ tool";
            color = "text-brand-red-soft";
          }
          if (line.kind === "ok") {
            prefix = "  ok";
            color = "text-emerald-400";
          }
          if (line.kind === "sep") {
            color = "text-white/15";
          }
          div.innerHTML = `${tsEl}<span class="${color}">${prefix} ${line.html}</span>`;
          bodyRef.current.appendChild(div);

          if (line.kind === "tool") {
            toolCalls++;
            const match = line.html.match(/<b>([^<]+)<\/b>/);
            const toolId = match?.[1];
            if (toolId) {
              setActiveStep(toolId);
              setStats((s) => ({ ...s, calls: toolCalls }));
            }
          }
          if (line.kind === "ok") {
            // Mark the currently active step done.
            setActiveStep((current) => {
              if (current) {
                setDoneSteps((prev) => {
                  const next = new Set(prev);
                  next.add(current);
                  return next;
                });
              }
              return null;
            });
          }
          if (line.kind === "agent" && line.html.includes("closed")) {
            runCount++;
            setStats((s) => ({ ...s, runs: runCount }));
          }

          while (bodyRef.current && bodyRef.current.children.length > 18) {
            bodyRef.current.removeChild(bodyRef.current.firstChild!);
          }
        }, line.d + offset);
        timeouts.push(id);
      });

      const loopId = window.setTimeout(() => {
        loop++;
        tick();
      }, LOOP_MS);
      timeouts.push(loopId);
    };
    tick();

    return () => {
      stopped = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [inView]);

  return (
    <section
      ref={ref}
      id="proof"
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(226,58,62,0.18), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-wrap items-center justify-between gap-6"
        >
          <div>
            <div className="mb-5 flex items-center gap-2.5 text-xs uppercase tracking-widest text-brand-red-soft">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-red-soft opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand-red-soft" />
              </span>
              Live · Streaming now
            </div>
            <h2 className="m-0 max-w-2xl text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
              A real agent run,{" "}
              <em className="font-serif italic text-brand-red-soft">
                executing live, end-to-end.
              </em>
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-white/60">
            <Activity size={14} className="text-brand-red-soft" />
            <span>p95 2.1s</span>
            <span className="text-white/20">·</span>
            <span>cost/run $0.011</span>
            <span className="text-white/20">·</span>
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>0.96 faith.</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="liquid-glass overflow-hidden rounded-2xl"
          style={{
            boxShadow:
              "0 60px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(226,58,62,0.12)",
            background:
              "linear-gradient(180deg, rgba(20,8,9,0.6), rgba(5,5,5,0.4))",
          }}
        >
          <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
            </div>
            <div className="flex-1 text-center font-mono text-[11px] tracking-wider text-white/40">
              agent · run · order_exceptions · prod-us-east-1
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-brand-red-soft">
              <span className="size-1.5 animate-pulse rounded-full bg-brand-red-soft" />
              streaming
            </div>
          </div>

          <div className="grid grid-cols-1 gap-px lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* Pipeline */}
            <div className="bg-black/30 p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                  Pipeline
                </div>
                <div className="font-mono text-[10px] text-white/40">
                  6 steps · 1 customer ticket
                </div>
              </div>
              <ol className="space-y-0 list-none p-0">
                {PIPELINE.map((step, i) => {
                  const status: StepStatus = doneSteps.has(step.id)
                    ? "done"
                    : activeStep === step.id
                      ? "active"
                      : "pending";
                  return (
                    <PipelineStep
                      key={step.id}
                      step={step}
                      status={status}
                      isLast={i === PIPELINE.length - 1}
                    />
                  );
                })}
              </ol>
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
                <div>
                  Tool calls{" "}
                  <span className="ml-1 font-serif text-base italic text-white">
                    {String(stats.calls).padStart(4, "0")}
                  </span>
                </div>
                <div>
                  Runs closed{" "}
                  <span className="ml-1 font-serif text-base italic text-white">
                    {String(stats.runs).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="border-t border-white/5 bg-black/40 lg:border-l lg:border-t-0">
              <div className="border-b border-white/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white/40">
                Stream
              </div>
              <div
                ref={bodyRef}
                className="h-[440px] overflow-hidden px-5 py-4 font-mono text-[12px] leading-[1.7] md:px-6"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/40"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={12} />
            <span>
              Anonymized trace from a customer&apos;s order-exception loop.
              Updated every 5s.
            </span>
          </div>
          <a
            href="#book"
            className="text-brand-red-soft transition-colors hover:text-white"
          >
            Run this on your workflow →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
