import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
        <div className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2.5 font-semibold text-lg">
            <img src={logo} alt="" className="w-7 h-7 object-contain" />
            <span>TechAegisAI</span>
          </a>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm m-0">
            An agentic AI studio. We design, build, and operate production agent systems for ops, revenue,
            and engineering teams.
          </p>
        </div>
        {[
          { h: 'Services', l: ['Agent strategy', 'Custom agents', 'Evals & observability', 'Managed ops'] },
          { h: 'Company', l: ['Work', 'Writing', 'Careers', 'Contact'] },
          { h: 'Trust', l: ['Security', 'SOC 2', 'DPA', 'Status'] },
        ].map((c) => (
          <div key={c.h}>
            <h4 className="text-white/40 text-xs uppercase tracking-widest font-mono font-medium mb-4">
              {c.h}
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {c.l.map((it) => (
                <li key={it}>
                  <a href="#" className="text-white/70 text-sm hover:text-[#ff5e62] transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-white/5 flex justify-between flex-wrap gap-3 text-white/40 text-[11px] font-mono">
        <span>© 2026 TechAegisAI Labs · Built in San Francisco &amp; Bengaluru</span>
        <span>SOC 2 Type II · ISO 27001 · GDPR</span>
      </div>
    </footer>
  );
}
