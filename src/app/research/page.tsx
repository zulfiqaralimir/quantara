import type { Metadata } from "next";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

export const metadata: Metadata = {
  title: "Research",
  description: "In-depth investment memos, diligence notes, and long-form financial research.",
};

function getResearchPosts() {
  const postsDir = join(process.cwd(), "src/app/research/posts");
  if (!existsSync(postsDir)) return [];

  try {
    const files = readdirSync(postsDir);
    return files
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map((f) => ({
        slug: f.replace(/\.(mdx|md)$/, ""),
        ticker: f.replace(/\.(mdx|md)$/, "").toUpperCase(),
      }));
  } catch {
    return [];
  }
}

export default function ResearchPage() {
  const posts = getResearchPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-2 text-sm font-mono text-teal uppercase tracking-widest">
        Investment Research
      </div>
      <h1 className="text-3xl font-semibold text-navy">Research</h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Full investment memos generated via the Quantara diligence workflow. Each memo covers
        business quality, financials, management, valuation, and risk.
      </p>

      {posts.length > 0 ? (
        <ul className="mt-10 space-y-4">
          {posts.map((p) => (
            <li key={p.slug}>
              <a
                href={`/research/${p.slug}`}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-teal transition-colors group"
              >
                <span className="text-xs font-mono font-semibold text-white bg-navy px-2 py-1 rounded">
                  {p.ticker}
                </span>
                <span className="text-sm text-navy group-hover:text-teal">
                  Investment Memo — {p.ticker}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-dashed border-gray-300 rounded-xl p-10 text-center">
          <p className="text-gray-400 text-sm">No research memos yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Run{" "}
            <code className="bg-gray-100 px-1 rounded">/diligence-checklist [TICKER]</code>{" "}
            in Claude Code to generate your first memo.
          </p>
        </div>
      )}

      {/* Philosophy */}
      <section className="mt-16 border-t border-gray-100 pt-12">
        <h2 className="text-xl font-semibold text-navy mb-4">Research Philosophy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-navy mb-1">Fundamentals First</h3>
            <p>Every memo starts with the business model, not the stock chart. We own businesses, not tickers.</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-1">Variant Perception</h3>
            <p>We only invest when we have a differentiated view vs. consensus — not just "good company."</p>
          </div>
          <div>
            <h3 className="font-semibold text-navy mb-1">Thesis-Based Exits</h3>
            <p>We exit when the thesis is broken, not when the stock moves against us.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
