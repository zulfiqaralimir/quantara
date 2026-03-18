# /diligence-checklist — Full Due Diligence Run

Execute a complete due diligence process on a single ticker. This is the primary research workflow.

**Usage:** `/diligence-checklist [TICKER]`

## Instructions

Run the following 5 sub-agents IN PARALLEL. Each agent has a specific scope — do not cross-contaminate.

---

### Agent 1: Business Quality Agent
**Task:** Assess the core business
- Pull the most recent 10-K (SEC EDGAR) — read Business section and MD&A
- Identify: revenue model, customer segments, top customers, geographic mix
- Assess competitive moat: switching costs / network effects / cost advantage / IP / brand
- Score moat: Wide / Narrow / None (with evidence)
- Identify recurring vs. one-time revenue split
- Output: structured Business Quality section

### Agent 2: Financial Analysis Agent
**Task:** Deep financial review (last 3 years + most recent quarter)
- Pull 10-K and 10-Q from SEC EDGAR
- Build a mini income statement: Revenue, Gross Profit, EBITDA, Net Income, FCF
- Calculate: Revenue CAGR, Gross Margin trend, EBITDA margin, FCF conversion
- Balance sheet: Cash, Debt, Net Debt, Net Debt/EBITDA
- Working capital analysis
- Output: formatted financial summary table

### Agent 3: Management Credibility Agent
**Task:** Score management quality
- Pull last 3 years of earnings call transcripts (web scrape IR page)
- Pull proxy filing (DEF 14A) for compensation structure and insider ownership
- Track guidance accuracy: did they beat or miss each quarter? By how much?
- Score: Guidance credibility (0–5), Capital allocation quality (0–5), Alignment (0–5)
- Output: Management Scorecard

### Agent 4: Valuation Agent
**Task:** Build valuation model
- Current price and market cap (Yahoo Finance)
- Calculate EV/FCF, EV/EBITDA, EV/Revenue on NTM and 2-year forward estimates
- Pull consensus estimates (Yahoo Finance)
- Compare vs. 3-year historical average multiples
- Build comps table: 5 closest peers with same metrics
- Bull/base/bear price targets
- Output: Valuation Summary with comp table

### Agent 5: Risk & Catalyst Agent
**Task:** Identify risks and upcoming catalysts
- Web scrape recent news (last 90 days) for the company
- Review 10-K risk factors section
- Identify top 3 bear cases with probability estimates
- Identify upcoming catalysts: earnings dates, product launches, regulatory decisions, analyst days
- Check short interest (if available)
- Output: Risk Register + Catalyst Calendar

---

## Synthesis

After all 5 agents complete, synthesize into the **Quantara Investment Memo** format:

```markdown
# [TICKER] — [Company Name] Investment Memo
**Date:** [today]
**Rating:** Long | Short | Watch
**Conviction:** High | Medium | Low
**Target Price:** $XX (XX% upside/downside)
**Time Horizon:** XX months

## One-Line Thesis
[Single sentence]

## Business Quality
[Agent 1 output — condensed]

## Financial Summary
[Agent 2 output — key table]

## Management Assessment
[Agent 3 output — scorecard]

## Valuation
[Agent 4 output — comp table + targets]

## Risks & Catalysts
[Agent 5 output]

## Bull / Base / Bear
| Scenario | Price | Probability | Key Assumption |
|----------|-------|-------------|----------------|

## Recommendation
[Final recommendation with position sizing suggestion]

## Exit Criteria
[Specific conditions that invalidate the thesis]
```

## Output Storage
- Save memo to `src/app/research/posts/[ticker-lowercase].mdx` for publishing to Quantara platform
- Use current date in the memo header
