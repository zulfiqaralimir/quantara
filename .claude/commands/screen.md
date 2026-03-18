# /screen — Quantitative Stock Screener

Run a quantitative screen against the Quantara investment universe. Use this to generate a watchlist of candidates for deeper diligence.

## Instructions

When this command is run with or without arguments, do the following:

1. **Parse arguments.** The user may provide filters like:
   - Sector (e.g., "SaaS", "semis", "medtech")
   - Market cap range (e.g., "$500M–$5B")
   - Specific metrics (e.g., "Rule of 40 > 40", "NRR > 110%", "FCF margin > 15%")
   - If no arguments, use the default screen below.

2. **Default screen criteria:**
   - Revenue growth (YoY) ≥ 15%
   - Gross margin ≥ 50%
   - EV/FCF < 30x (or EV/Revenue < 10x if pre-FCF)
   - Net debt/EBITDA < 3x
   - Insider ownership ≥ 3%
   - Market cap $250M–$25B (mid-cap focus)

3. **For each passing company, output:**

```
| Ticker | Company | Sector | Mkt Cap | Rev Growth | Gross Margin | EV/FCF | FCF Margin | Insider Own% | Score |
```

4. **Scoring:** Rate each company 1–10 based on:
   - Quality of business (moat, recurring revenue): 0–3 pts
   - Financial strength (margins, balance sheet): 0–3 pts
   - Valuation (how cheap vs. peers): 0–2 pts
   - Momentum (recent price action, estimate revisions): 0–2 pts

5. **Output top 10 candidates** ranked by score, with a 1-sentence rationale for each.

6. **Flag for diligence:** Mark any ticker scoring ≥ 7 with "→ Run /diligence-checklist [TICKER]"

## Output Format

```
# Quantara Screen — [Date]
## Filters Applied: [list]

## Results (Top 10)

| Rank | Ticker | Company | Score | Key Metric | Action |
|------|--------|---------|-------|------------|--------|
| 1    | XXX    | ...     | 8/10  | ...        | → /diligence-checklist XXX |

## Notes
[Any macro context or sector observations]
```

## Data Sources
- Use Yahoo Finance MCP for market data and ratios
- Use SEC EDGAR for insider ownership (proxy filings)
- Use FRED for macro backdrop context
