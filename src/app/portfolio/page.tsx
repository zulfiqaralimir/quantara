import type { Metadata } from "next";
import { positions, watchlist } from "./data";
import type { Position, ThesisStatus, Rating } from "./data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Active positions, watchlist, and portfolio analytics.",
};

function pnl(p: Position) {
  return ((p.currentPrice - p.entryPrice) / p.entryPrice) * 100;
}

function upside(p: Position) {
  return ((p.targetPrice - p.currentPrice) / p.currentPrice) * 100;
}

const STATUS_COLORS: Record<ThesisStatus, string> = {
  "On Track":     "bg-emerald-100 text-emerald-700",
  "Improving":    "bg-teal/10 text-teal",
  "Monitor":      "bg-amber-100 text-amber-700",
  "Deteriorating":"bg-red-100 text-red-700",
};

const RATING_COLORS: Record<Rating, string> = {
  Long:  "bg-navy text-white",
  Short: "bg-red-600 text-white",
  Watch: "bg-gray-200 text-gray-700",
};

function daysToEarnings(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function PortfolioPage() {
  const totalSize = positions.reduce((s, p) => s + p.positionSizePct, 0);
  const longs = positions.filter((p) => p.rating === "Long");
  const avgPnL =
    longs.length > 0
      ? longs.reduce((s, p) => s + pnl(p), 0) / longs.length
      : 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-2 text-sm font-mono text-teal uppercase tracking-widest">
        Quantara Portfolio
      </div>
      <h1 className="text-3xl font-semibold text-navy">Portfolio</h1>
      <p className="mt-2 text-sm text-gray-500">
        Active positions tracked against thesis criteria. Update prices in{" "}
        <code className="bg-gray-100 px-1 rounded">src/app/portfolio/data.ts</code>.
      </p>

      {/* Summary stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Positions", value: positions.length.toString() },
          { label: "Capital Deployed", value: `${totalSize.toFixed(1)}%` },
          { label: "Avg P&L (Longs)", value: `${avgPnL >= 0 ? "+" : ""}${avgPnL.toFixed(1)}%` },
          { label: "Watchlist", value: watchlist.length.toString() },
        ].map((s) => (
          <div key={s.label} className="border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wide">{s.label}</div>
            <div className="text-2xl font-semibold text-navy mt-1">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Positions table */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy mb-4">Active Positions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="pb-3 pr-4">Ticker</th>
                <th className="pb-3 pr-4">Rating</th>
                <th className="pb-3 pr-4">Size</th>
                <th className="pb-3 pr-4">Entry</th>
                <th className="pb-3 pr-4">Current</th>
                <th className="pb-3 pr-4">P&L</th>
                <th className="pb-3 pr-4">Target</th>
                <th className="pb-3 pr-4">Upside</th>
                <th className="pb-3 pr-4">Thesis</th>
                <th className="pb-3">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => {
                const gain = pnl(p);
                const up = upside(p);
                const days = daysToEarnings(p.nextEarnings);
                return (
                  <tr key={p.ticker} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 pr-4">
                      <div className="font-semibold text-navy">
                        {p.memoSlug ? (
                          <a href={`/research/${p.memoSlug}`} className="hover:text-teal">
                            {p.ticker}
                          </a>
                        ) : (
                          p.ticker
                        )}
                      </div>
                      <div className="text-xs text-gray-400">{p.sector}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${RATING_COLORS[p.rating]}`}>
                        {p.rating}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono">{p.positionSizePct.toFixed(1)}%</td>
                    <td className="py-3 pr-4 font-mono">${p.entryPrice.toFixed(2)}</td>
                    <td className="py-3 pr-4 font-mono">${p.currentPrice.toFixed(2)}</td>
                    <td className={`py-3 pr-4 font-mono font-semibold ${gain >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {gain >= 0 ? "+" : ""}{gain.toFixed(1)}%
                    </td>
                    <td className="py-3 pr-4 font-mono">${p.targetPrice.toFixed(2)}</td>
                    <td className={`py-3 pr-4 font-mono font-semibold ${up >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {up >= 0 ? "+" : ""}{up.toFixed(1)}%
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[p.thesisStatus]}`}>
                        {p.thesisStatus}
                      </span>
                    </td>
                    <td className="py-3 text-xs text-gray-500">
                      {days > 0 ? `${days}d` : <span className="text-amber-600 font-medium">Due</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Position detail cards */}
      <section className="mt-12 space-y-3">
        <h2 className="text-lg font-semibold text-navy mb-4">Thesis Tracker</h2>
        {positions.map((p) => (
          <div key={p.ticker} className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-navy">{p.ticker}</span>
                  <span className="text-sm text-gray-400">{p.company}</span>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium ${STATUS_COLORS[p.thesisStatus]}`}>
                    {p.thesisStatus}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{p.oneLineSummary}</p>
              </div>
              <div className="text-right text-xs text-gray-400 shrink-0 ml-4">
                <div>Entered {p.entryDate}</div>
                <div>Horizon: {p.horizon}</div>
              </div>
            </div>
            {p.memoSlug && (
              <a href={`/research/${p.memoSlug}`} className="mt-3 inline-block text-xs text-teal hover:underline">
                View full memo →
              </a>
            )}
          </div>
        ))}
      </section>

      {/* Watchlist */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-navy mb-4">Watchlist</h2>
        <div className="space-y-3">
          {watchlist.map((w) => (
            <div key={w.ticker} className="border border-dashed border-gray-200 rounded-lg p-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-navy">{w.ticker}</span>
                  <span className="text-sm text-gray-400">{w.company}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{w.sector}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{w.note}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-lg font-semibold text-navy">{w.score}/10</div>
                <div className="text-xs text-gray-400">screen score</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules reminder */}
      <section className="mt-12 bg-navy/5 border border-navy/10 rounded-xl p-6 text-sm">
        <h3 className="font-semibold text-navy mb-3">Portfolio Rules</h3>
        <ul className="space-y-1 text-gray-600">
          <li>Max position size: <strong>10%</strong> at cost · <strong>15%</strong> with appreciation</li>
          <li>Max sector concentration: <strong>35%</strong></li>
          <li>Max positions: <strong>20</strong></li>
          <li>No leverage. No margin.</li>
          <li>Reassess any position down <strong>&gt;25%</strong></li>
        </ul>
      </section>
    </div>
  );
}
