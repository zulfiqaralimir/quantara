export type ThesisStatus = "On Track" | "Improving" | "Monitor" | "Deteriorating";
export type Rating = "Long" | "Short" | "Watch";

export interface Position {
  ticker: string;
  company: string;
  sector: string;
  rating: Rating;
  entryPrice: number;
  currentPrice: number;
  targetPrice: number;
  positionSizePct: number; // % of portfolio at cost
  entryDate: string;       // ISO date
  horizon: string;         // e.g. "18–24 months"
  thesisStatus: ThesisStatus;
  oneLineSummary: string;
  nextEarnings: string;    // e.g. "2026-04-22"
  memoSlug?: string;       // links to /research/[memoSlug]
}

export interface WatchlistItem {
  ticker: string;
  company: string;
  sector: string;
  score: number; // 1–10 from /screen
  note: string;
  addedDate: string;
}

// ── ACTIVE POSITIONS ──────────────────────────────────────────────────
// Replace sample data below with your real positions.
// Run /diligence-checklist [TICKER] to generate a memo, then add the position here.

export const positions: Position[] = [
  {
    ticker: "EXAMPLE",
    company: "Sample Company Inc.",
    sector: "SaaS / Cloud",
    rating: "Long",
    entryPrice: 100,
    currentPrice: 118,
    targetPrice: 145,
    positionSizePct: 5.0,
    entryDate: "2026-01-15",
    horizon: "18–24 months",
    thesisStatus: "On Track",
    oneLineSummary: "Replace with your real position — run /diligence-checklist TICKER to start.",
    nextEarnings: "2026-04-22",
    memoSlug: "example",
  },
];

// ── WATCHLIST ─────────────────────────────────────────────────────────
export const watchlist: WatchlistItem[] = [
  {
    ticker: "WATCH1",
    company: "Watchlist Candidate A",
    sector: "Semiconductors",
    score: 7,
    note: "Waiting for valuation entry point. Run /diligence-checklist when EV/FCF < 20x.",
    addedDate: "2026-03-01",
  },
];
