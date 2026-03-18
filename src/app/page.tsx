const FEATURES = [
  {
    href: "/screener",
    label: "Screener",
    desc: "Quantitative filters to surface high-quality compounders at reasonable valuations.",
    cmd: "/screen",
  },
  {
    href: "/research",
    label: "Research",
    desc: "Full investment memos — business quality, financials, management, valuation, risk.",
    cmd: "/diligence-checklist [TICKER]",
  },
  {
    href: "/analysis",
    label: "Analysis",
    desc: "Market signals, sector analysis, and thematic deep dives.",
    cmd: "/earnings [TICKER]",
  },
  {
    href: "/visuals",
    label: "Visuals",
    desc: "Data stories, comp tables, and visual explanations of financial concepts.",
    cmd: "/comps [TICKER]",
  },
];

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <svg
          width="56"
          height="56"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mb-6"
        >
          <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="4" className="text-navy" />
          <path
            d="M20 36 L28 28 L36 34 L44 22"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal"
          />
          <line x1="40" y1="40" x2="50" y2="50" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-navy" />
        </svg>

        <h1 className="text-4xl font-semibold tracking-tight text-navy">Quantara</h1>
        <p className="mt-3 text-lg font-medium text-teal">Signals Beyond the Noise.</p>
        <p className="mt-4 max-w-xl mx-auto text-gray-500 text-sm leading-relaxed">
          A one-man hedge fund research platform. Systematic diligence, disciplined valuation,
          and AI-powered analysis — all in one place.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FEATURES.map((f) => (
          <a
            key={f.href}
            href={f.href}
            className="group border border-gray-200 rounded-xl p-6 hover:border-teal transition-colors"
          >
            <h2 className="text-base font-semibold text-navy group-hover:text-teal transition-colors">
              {f.label}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            <code className="mt-4 inline-block text-xs font-mono text-teal/70">{f.cmd}</code>
          </a>
        ))}
      </div>

      {/* Investment philosophy strip */}
      <div className="mt-16 border-t border-gray-100 pt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-sm">
        <div>
          <div className="text-2xl font-semibold text-navy">10–20</div>
          <div className="text-gray-400 mt-1">Concentrated positions</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-navy">18–36mo</div>
          <div className="text-gray-400 mt-1">Investment horizon</div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-navy">5 agents</div>
          <div className="text-gray-400 mt-1">Parallel diligence per ticker</div>
        </div>
      </div>
    </section>
  );
}
