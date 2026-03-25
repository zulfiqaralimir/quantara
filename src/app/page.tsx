import NetworkAnimation from "./components/NetworkAnimation";

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
    <>
      {/* ── Network Animation Hero ─────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "480px", backgroundColor: "#f0f4f8" }}
      >
        {/* Animated network canvas */}
        <NetworkAnimation />

        {/* Left gradient so text stays readable */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, rgba(240,244,248,0.92) 0%, rgba(240,244,248,0.60) 55%, rgba(240,244,248,0.0) 100%)",
          }}
        />

        {/* Hero text */}
        <div
          className="relative z-10 flex h-full flex-col justify-center px-10 sm:px-20"
          style={{ maxWidth: "560px" }}
        >
          <span
            className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#1FB6A6" }}
          >
            One-Man Hedge Fund Platform
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold leading-[1.08] tracking-tight" style={{ color: "#0B1F33" }}>
            Signals Beyond
            <br />
            the Noise.
          </h1>

          <p
            className="mt-5 max-w-sm text-base leading-relaxed"
            style={{ color: "rgba(11,31,51,0.60)" }}
          >
            Systematic diligence, disciplined valuation, and AI-powered
            analysis — all in one place. Concentrated. Long-biased.
            Fundamentals-first.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/screener"
              className="rounded-md px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ backgroundColor: "#1FB6A6", color: "#07131F", fontWeight: 700 }}
            >
              Open Screener
            </a>
            <a
              href="/research"
              className="rounded-md border px-6 py-3 text-sm font-semibold transition-colors hover:bg-navy/5"
              style={{ borderColor: "#0B1F33", color: "#0B1F33" }}
            >
              View Research
            </a>
          </div>
        </div>
      </div>

      {/* ── Feature grid + stats ───────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
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
    </>
  );
}
