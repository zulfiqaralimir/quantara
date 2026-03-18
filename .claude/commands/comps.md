# /comps — Comparable Company Analysis

Build a full comparable company (comps) table for a ticker.

**Usage:** `/comps [TICKER]` or `/comps [TICKER1] [TICKER2] [TICKER3]...`

## Instructions

1. **Identify peer set:**
   - If single ticker provided: identify 5–8 closest public comps
   - Criteria: same sector, similar business model, similar size (within 3x market cap)
   - If multiple tickers provided: use those as the comp set

2. **For each company in the table, pull (Yahoo Finance + SEC EDGAR):**
   - Market cap and enterprise value
   - Revenue (LTM and NTM estimate)
   - Gross profit and gross margin (LTM)
   - EBITDA (LTM and NTM estimate)
   - Free cash flow (LTM)
   - Net debt (or cash position)
   - Revenue growth (LTM YoY and NTM estimate)
   - Key operating metric relevant to sector (NRR, units, ARR, etc.)

3. **Calculate multiples:**
   - EV/Revenue (LTM and NTM)
   - EV/EBITDA (LTM and NTM)
   - EV/FCF (LTM)
   - P/E (NTM)

4. **Benchmark:**
   - Highlight the subject company in the table
   - Calculate median and mean for each multiple
   - Flag where subject company trades at premium/discount vs. median
   - Calculate implied price at median multiple

5. **Quality-adjusted analysis:**
   - Plot growth rate vs. EV/Revenue (is premium/discount justified?)
   - Rule of 40 for SaaS, or ROIC for industrials
   - Who deserves the premium and why?

## Output Format

```markdown
# [TICKER] Comparable Company Analysis
**Date:** [today]

## Peer Set
[Brief rationale for peer selection]

## Trading Comps Table

| Company  | Ticker | Mkt Cap | EV    | Rev Grw | Gr Mgn | EV/Rev NTM | EV/EBITDA NTM | EV/FCF |
|----------|--------|---------|-------|---------|--------|------------|---------------|--------|
| **[TICKER]** | ... | **$XXB** | ... | ... | ... | **XXx** | **XXx** | **XXx** |
| Peer 1   | ...    | $XXB    | ...   | ...     | ...    | XXx        | XXx           | XXx    |
| ...      |        |         |       |         |        |            |               |        |
| **Median** |      |         |       |         |        | **XXx**    | **XXx**       | **XXx** |

## Premium / Discount Analysis
- [TICKER] trades at XX% [premium/discount] to peer median on EV/Revenue NTM
- Implied price at median EV/Revenue: $XX ([upside/downside]% vs. current $XX)
- [Is premium/discount justified? Why or why not?]

## Conclusion
[2–3 sentences on what comps tell us about valuation]
```
