import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screener",
  description: "Quantitative stock screener — filter by quality, valuation, and growth metrics.",
};

const SCREEN_CRITERIA = [
  { label: "Revenue Growth (YoY)", threshold: "≥ 15%", rationale: "Minimum growth to stay relevant" },
  { label: "Gross Margin", threshold: "≥ 50%", rationale: "Capital-light business preference" },
  { label: "EV/FCF", threshold: "< 30x", rationale: "Valuation discipline" },
  { label: "Net Debt / EBITDA", threshold: "< 3x", rationale: "Balance sheet safety" },
  { label: "Insider Ownership", threshold: "≥ 3%", rationale: "Management alignment" },
  { label: "Market Cap", threshold: "$250M – $25B", rationale: "Mid-cap focus — underfollowed" },
];

const SECTORS = [
  { name: "SaaS / Cloud", key: "saas", metrics: ["NRR", "ARR Growth", "Rule of 40"] },
  { name: "Semiconductors", key: "semis", metrics: ["Gross Margin", "Inventory Turns", "Design Wins"] },
  { name: "Specialty Finance", key: "finance", metrics: ["Combined Ratio", "ROE", "Book Value Growth"] },
  { name: "Medtech / Diagnostics", key: "medtech", metrics: ["Recurring Revenue %", "Installed Base", "Gross Margin"] },
  { name: "Industrial Compounders", key: "industrial", metrics: ["ROIC", "FCF Conversion", "Organic Growth"] },
];

export default function ScreenerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-2 text-sm font-mono text-teal uppercase tracking-widest">
        Quantara Screener
      </div>
      <h1 className="text-3xl font-semibold text-navy">
        Quantitative Screen
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Systematic filter to surface high-quality compounders trading at reasonable valuations.
        Run <code className="bg-gray-100 px-1 rounded text-sm">/screen</code> in Claude Code to execute a live screen.
      </p>

      {/* Default Screen Criteria */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy mb-6">Default Screen Criteria</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SCREEN_CRITERIA.map((c) => (
            <div key={c.label} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-navy">{c.label}</span>
                <span className="text-sm font-mono font-semibold text-teal">{c.threshold}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{c.rationale}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sector Coverage */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy mb-6">Sector Coverage Universe</h2>
        <div className="space-y-3">
          {SECTORS.map((s) => (
            <div key={s.key} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm font-medium text-navy">{s.name}</span>
              <div className="flex gap-2">
                {s.metrics.map((m) => (
                  <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How to run */}
      <section className="mt-12 bg-navy/5 border border-navy/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Run a Screen</h2>
        <p className="text-sm text-gray-600 mb-4">
          Open Claude Code in this project and run one of the following commands:
        </p>
        <div className="space-y-2 font-mono text-sm">
          <div className="bg-white border border-gray-200 rounded px-3 py-2 text-navy">
            /screen
          </div>
          <div className="bg-white border border-gray-200 rounded px-3 py-2 text-navy">
            /screen SaaS market-cap:$500M-$5B rule-of-40:&gt;40
          </div>
          <div className="bg-white border border-gray-200 rounded px-3 py-2 text-navy">
            /screen semis gross-margin:&gt;55%
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          After screening, run <span className="font-mono">/diligence-checklist [TICKER]</span> on any candidate scoring ≥ 7.
        </p>
      </section>

      {/* Workflow */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-navy mb-6">Research Workflow</h2>
        <ol className="space-y-4">
          {[
            { step: "01", cmd: "/screen", desc: "Generate candidate list from quantitative filters" },
            { step: "02", cmd: "/diligence-checklist [TICKER]", desc: "Run 5 parallel agents — full due diligence" },
            { step: "03", cmd: "/comps [TICKER]", desc: "Build comparable company valuation table" },
            { step: "04", cmd: "/mgmt [TICKER]", desc: "Score management quality and alignment" },
            { step: "05", cmd: "/earnings [TICKER]", desc: "Analyze most recent earnings report" },
            { step: "06", cmd: "/change [TICKER]", desc: "Track what changed quarter-over-quarter" },
          ].map((w) => (
            <li key={w.step} className="flex gap-4 items-start">
              <span className="text-xs font-mono text-teal font-semibold pt-0.5">{w.step}</span>
              <div>
                <code className="text-sm font-mono text-navy">{w.cmd}</code>
                <p className="text-sm text-gray-500 mt-0.5">{w.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
