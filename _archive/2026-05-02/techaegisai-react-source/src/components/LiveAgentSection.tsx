import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity, Zap, CheckCircle2, AlertCircle, Database, Send, Mail, FileText, GitPullRequest, CreditCard } from 'lucide-react';

type LineKind = 'agent' | 'think' | 'tool' | 'ok' | 'warn' | 'sep';

const TOOL_ICONS: Record<string, any> = {
  'db.query': Database,
  'stripe.refund': CreditCard,
  'gmail.draft': Mail,
  'notion.append': FileText,
  'slack.send': Send,
  'github.pr': GitPullRequest,
  'eval.score': Zap,
};

type Line = { d: number; kind: LineKind; html: string };

const SCRIPT: Line[] = [
  { d: 0,    kind: 'agent', html: 'run #4129 · queue=order_exceptions · ctx=last_24h' },
  { d: 320,  kind: 'think', html: 'thinking: 47 unresolved exceptions. Top by $ impact first.' },
  { d: 540,  kind: 'tool',  html: '<b>db.query</b>(<i>"select * from exceptions where status=open order by total desc limit 10"</i>)' },
  { d: 920,  kind: 'ok',    html: '10 rows · 84ms' },
  { d: 1080, kind: 'think', html: 'thinking: order #A-88241 — refund, missing item. Customer LTV $4,210.' },
  { d: 1380, kind: 'tool',  html: '<b>stripe.refund</b>(<i>pi_3PqL...</i>, amount=2890, reason="missing_item")' },
  { d: 1820, kind: 'ok',    html: 'refund_id=re_3PqL · 412ms' },
  { d: 1980, kind: 'tool',  html: '<b>gmail.draft</b>(to=customer, template="refund_apology_v3")' },
  { d: 2280, kind: 'ok',    html: 'draft saved · awaiting human review · 184ms' },
  { d: 2440, kind: 'tool',  html: '<b>notion.append</b>(page="ops/log/2026-W18", "#A-88241 resolved")' },
  { d: 2680, kind: 'ok',    html: 'block_id=xyz9 · 96ms' },
  { d: 2820, kind: 'tool',  html: '<b>eval.score</b>(trace="4129.A88241")' },
  { d: 3140, kind: 'ok',    html: 'faithfulness=<b>0.96</b> · latency=2.3s · cost=$0.011' },
  { d: 3300, kind: 'think', html: 'pattern: 6/10 are missing-item refunds from same warehouse.' },
  { d: 3640, kind: 'tool',  html: '<b>slack.send</b>(#ops-alerts, p2, "Spike: 6 missing-item refunds, WH-DAL")' },
  { d: 3920, kind: 'ok',    html: 'ts=1714432891.4 · 137ms' },
  { d: 4140, kind: 'agent', html: 'run #4129 closed · 9 tools · $0.011 · 4.5s · ✓ resolved' },
  { d: 4500, kind: 'sep',   html: '─────────────────────────────────────' },
  { d: 4700, kind: 'agent', html: 'run #4130 · queue=lead_enrichment · ctx=new_signups' },
];

function pad(n: number, w = 2) { return String(n).padStart(w, '0'); }
function ts(start: Date, ms: number) {
  const t = new Date(start.getTime() + ms);
  return `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}.${pad(t.getMilliseconds(), 3)}`;
}

export default function LiveAgentSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const bodyRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ calls: 0, runs: 0, lastTool: 'db.query' });

  useEffect(() => {
    if (!inView) return;
    const start = new Date();
    let loop = 0;
    let stopped = false;
    let toolCalls = 0;
    let runCount = 0;

    function run() {
      if (stopped) return;
      const offset = loop * 5500;
      SCRIPT.forEach((line) => {
        setTimeout(() => {
          if (stopped || !bodyRef.current) return;
          const div = document.createElement('div');
          div.className = `term-line ${line.kind}`;
          const tsEl = `<span class="text-white/30 mr-3">${ts(start, line.d + offset)}</span>`;
          let prefix = '';
          let color = 'text-white/70';
          if (line.kind === 'agent') { prefix = '[agent]'; color = 'text-white/50'; }
          if (line.kind === 'think') { prefix = '→'; color = 'text-amber-300/70 italic'; }
          if (line.kind === 'tool')  { prefix = '⟶ tool'; color = 'text-[#ff5e62]'; }
          if (line.kind === 'ok')    { prefix = '  ok'; color = 'text-emerald-400'; }
          if (line.kind === 'sep')   { color = 'text-white/15'; }
          div.innerHTML = `${tsEl}<span class="${color}">${prefix} ${line.html}</span>`;
          bodyRef.current.appendChild(div);

          if (line.kind === 'tool') {
            toolCalls++;
            const match = line.html.match(/<b>([^<]+)<\/b>/);
            setStats({ calls: toolCalls, runs: runCount, lastTool: match?.[1] || 'tool' });
          }
          if (line.kind === 'agent' && line.html.includes('closed')) {
            runCount++;
            setStats((s) => ({ ...s, runs: runCount }));
          }

          while (bodyRef.current && bodyRef.current.children.length > 24) {
            bodyRef.current.removeChild(bodyRef.current.firstChild!);
          }
        }, line.d + offset);
      });
      setTimeout(() => { loop++; run(); }, 5500);
    }
    run();
    return () => { stopped = true; };
  }, [inView]);

  return (
    <section
      ref={ref}
      id="proof"
      className="relative bg-black py-28 md:py-40 px-6 overflow-hidden"
    >
      {/* Ambient red glow */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(ellipse, rgba(226,58,62,0.18), transparent 60%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between gap-6 flex-wrap mb-12"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-[#ff5e62] text-xs tracking-widest uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5e62] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5e62]"></span>
              </span>
              Live · Streaming now
            </div>
            <h2 className="text-4xl md:text-6xl text-white tracking-tight m-0 max-w-2xl leading-[1.05]">
              A real agent run,{' '}
              <em className="italic text-[#ff5e62]" style={{ fontFamily: '"Instrument Serif", serif' }}>
                printing in real time.
              </em>
            </h2>
          </div>

          <div className="flex gap-3 items-center text-white/60 text-xs font-mono">
            <Activity size={14} className="text-[#ff5e62]" />
            <span>p95 2.1s</span>
            <span className="text-white/20">·</span>
            <span>cost/run $0.011</span>
            <span className="text-white/20">·</span>
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>0.96 faith.</span>
          </div>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="liquid-glass rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 60px 120px -40px rgba(0,0,0,0.8), 0 0 0 1px rgba(226,58,62,0.12)',
            background: 'linear-gradient(180deg, rgba(20,8,9,0.6), rgba(5,5,5,0.4))',
          }}
        >
          {/* Bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/15"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/15"></span>
            </div>
            <div className="flex-1 text-center text-white/40 text-[11px] tracking-wider font-mono">
              agent · run · order_exceptions · prod-us-east-1
            </div>
            <div className="flex items-center gap-2 text-[#ff5e62] text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5e62] animate-pulse" />
              streaming
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
            <div
              ref={bodyRef}
              className="font-mono text-[12.5px] leading-[1.7] px-6 py-5 h-[460px] overflow-hidden"
            />
            {/* Stats panel */}
            <div className="border-t lg:border-t-0 lg:border-l border-white/5 p-6 flex flex-col gap-5 bg-black/30">
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-1.5">Tool calls</div>
                <div className="text-white text-3xl font-serif italic" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {String(stats.calls).padStart(4, '0')}
                </div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-1.5">Runs closed</div>
                <div className="text-white text-3xl font-serif italic" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  {String(stats.runs).padStart(2, '0')}
                </div>
              </div>
              <div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-1.5">Last tool</div>
                <div className="text-[#ff5e62] text-sm font-mono">{stats.lastTool}</div>
              </div>
              <div className="pt-4 border-t border-white/5 mt-auto">
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Available tools</div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(TOOL_ICONS).map(([name, Icon]) => {
                    const active = stats.lastTool === name;
                    return (
                      <div
                        key={name}
                        title={name}
                        className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                          active
                            ? 'bg-[#ff5e62]/20 ring-1 ring-[#ff5e62]/60 text-[#ff5e62] scale-110'
                            : 'bg-white/[0.03] text-white/30'
                        }`}
                      >
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex items-center justify-between flex-wrap gap-4 text-white/40 text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={12} />
            <span>Anonymized trace from a customer's order-exception loop. Updated every 5s.</span>
          </div>
          <a href="#book" className="text-[#ff5e62] hover:text-white transition-colors">Run this on your workflow →</a>
        </motion.div>
      </div>
    </section>
  );
}
