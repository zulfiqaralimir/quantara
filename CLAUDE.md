# Quantara — One-Man Hedge Fund Control Center

> "Signals Beyond the Noise" — disciplined, data-driven, fundamentals-first investing.

---

## Investment Philosophy

**Style:** Fundamental value with a growth lens. Long-biased, concentrated (10–20 positions).
**Edge:** Deep diligence on misunderstood compounders, capital-light business models, and companies at earnings inflection points.
**Time Horizon:** 18–36 months per position. We are not traders.
**Circle of Competence:** Technology (SaaS, semis, infrastructure), Financials (specialty finance, insurance), Healthcare (medtech, life sciences tools), Industrials (capital-efficient niches).

---

## Valuation Framework

### Preferred Multiples (in priority order)
1. **EV/FCF** — primary valuation lens for asset-light businesses
2. **EV/EBITDA** — for capital-intensive or cyclical companies
3. **EV/Revenue** — early-stage, pre-profit, or high-growth only
4. **P/E (GAAP)** — sanity check, not primary driver
5. **DCF** — 5-year explicit + terminal value; use conservatively (WACC ≥ 10%)

### Valuation Rules
- Always use **forward estimates** (NTM and 2-year out)
- Compare multiples to: (1) own history, (2) sector median, (3) closest comps
- Never pay more than 30x FCF unless revenue growth >30% and gross margins >70%
- Discount 20–30% for management credibility issues, governance red flags, or high leverage

---

## Sector Coverage Universe

| Sector | Focus Areas | Key Metrics |
|--------|-------------|-------------|
| SaaS / Cloud | ARR, NRR, CAC payback | NRR >110%, Rule of 40 >40 |
| Semiconductors | Design-led, fabless preferred | Gross margin >50%, inventory turns |
| Specialty Finance | Insurance, factoring, marketplace lenders | Combined ratio, ROE, book value |
| Medtech / Diagnostics | Recurring revenue instruments | Gross margin, installed base growth |
| Industrial Compounders | ROIC-driven capital allocators | ROIC >15%, FCF conversion >80% |

---

## Diligence Checklist

Run `/diligence-checklist [TICKER]` to execute the full checklist. Each item must be answered.

### 1. Business Quality
- [ ] What does the company do, and what is the core value proposition?
- [ ] What is the competitive moat (switching costs, network effects, cost advantage, IP)?
- [ ] What % of revenue is recurring? Growing or declining?
- [ ] Who are the top 5 customers? Concentration risk?

### 2. Financial Health
- [ ] Revenue growth: Last 3 years CAGR + most recent quarter YoY
- [ ] Gross margin trend: Expanding, stable, or compressing?
- [ ] FCF margin and FCF conversion (FCF / Net Income)
- [ ] Balance sheet: Net debt/EBITDA, cash runway, covenant risk
- [ ] Working capital dynamics: Negative WC (good) or capital-intensive?

### 3. Management Quality
- [ ] CEO tenure and relevant track record
- [ ] Insider ownership % (prefer >5% for mid/large cap, >15% for small cap)
- [ ] Compensation structure: Aligned with shareholders?
- [ ] Last 3 years: Did they beat/miss guidance? What was the magnitude?
- [ ] Capital allocation history: Buybacks, M&A, dividends — value-creating or destructive?

### 4. Valuation
- [ ] Current EV/FCF, EV/EBITDA, EV/Revenue vs. 3-year history
- [ ] Comp table: Where does it trade vs. 5 closest peers?
- [ ] Bull/base/bear case: Price targets at each scenario
- [ ] What is the market pricing in? What do you know that consensus doesn't?

### 5. Risks
- [ ] What kills the thesis? (enumerate top 3 bear cases)
- [ ] What is the regulatory exposure?
- [ ] What happens in a recession scenario?
- [ ] Key person risk?

### 6. Catalysts
- [ ] What is the near-term catalyst (0–6 months)?
- [ ] What is the medium-term catalyst (6–18 months)?
- [ ] Is there an earnings date, analyst day, product launch, or regulatory decision upcoming?

---

## Thesis Structure Template

Every position must have a written thesis. Use this format:

```
## [TICKER] — [Company Name]
**Rating:** Long | Short | Watch
**Target Price:** $XX (upside: XX%)
**Position Size:** X% of portfolio
**Time Horizon:** XX months

### One-Line Thesis
[Why this works in one sentence]

### Key Variants vs. Consensus
1. [What you believe that market doesn't]
2. [Second key differentiation]

### Bull / Base / Bear
| Scenario | Price Target | Probability | Key Assumption |
|----------|-------------|-------------|----------------|
| Bull     | $XX         | XX%         | ...            |
| Base     | $XX         | XX%         | ...            |
| Bear     | $XX         | XX%         | ...            |

### Catalysts
- [Near-term catalyst]
- [Medium-term catalyst]

### Risks
- [Risk 1]
- [Risk 2]
- [Risk 3]

### Exit Criteria
[Specific conditions that would cause us to exit the position]
```

---

## Exit Criteria

**Exit Long if:**
- Thesis is broken (not just stock down — thesis broken)
- Valuation reaches intrinsic value with no further upside
- Gross margin deterioration >300bps two consecutive quarters
- Management credibility destroyed (guidance miss >15%, restatement, fraud)
- Better opportunity exists and portfolio needs rebalancing

**Exit Short if:**
- Short thesis disproven by data
- Stock has moved >50% against position
- Buyout bid received
- Short squeeze risk becomes unacceptable

---

## Risk Management Rules

1. **Max position size:** 10% at cost; 15% max with appreciation
2. **Sector concentration:** Max 35% in any one sector
3. **Leverage:** None. We do not use margin.
4. **Stop-loss:** Not mechanical — thesis-based. Reassess any position down >25%.
5. **Portfolio max:** 20 positions. More than that = diworsification.
6. **Minimum diligence:** Full checklist required before any position >2%

---

## Sub-Agent Instructions

When running parallel research agents, each agent must:
1. Focus strictly on its assigned task (no scope creep)
2. Cite all data to specific sources (filing + section, or URL)
3. Return structured output in the formats defined in the relevant skill files
4. Flag any data that is >90 days old
5. Include a confidence level (High / Medium / Low) on all qualitative assessments

**Standard agents to run for a new position:**
- `bull-case-agent` — builds best-case scenario
- `bear-case-agent` — argues against the position
- `mgmt-credibility-agent` — scores management track record
- `revenue-quality-agent` — assesses recurring vs. one-time revenue
- `insider-activity-agent` — last 12 months insider transactions

---

## Worktree Conventions

Branch naming for scenario analysis:
```
analysis/[TICKER]-base-case
analysis/[TICKER]-bull-[assumption]
analysis/[TICKER]-bear-[assumption]
analysis/[TICKER]-recession-scenario
```

Always merge winning scenario back to master after position is taken.

---

## Data Sources (MCP Priority Order)

1. **SEC EDGAR** — primary source for all financials (10-K, 10-Q, proxies)
2. **Yahoo Finance** — market data, ratios, earnings estimates
3. **FRED** — macro data (rates, GDP, CPI, unemployment)
4. **Web scrape** — press releases, IR decks, earnings transcripts
5. **Sanity CMS** — publishing finished analysis to Quantara platform

## Live API Endpoints (use with fetch MCP)

### SEC EDGAR
- Company search: `https://efts.sec.gov/LATEST/search-index?q=%22{TICKER}%22&dateRange=custom&startdt={YYYY-MM-DD}&forms=10-K,10-Q`
- Full-text search: `https://efts.sec.gov/LATEST/search-index?q=%22{COMPANY_NAME}%22&forms=10-K`
- CIK lookup: `https://www.sec.gov/cgi-bin/browse-edgar?company={TICKER}&action=getcompany&type=10-K&dateb=&owner=include&count=10&search_text=`
- Filing by CIK: `https://data.sec.gov/submissions/CIK{10-DIGIT-CIK}.json`
- EDGAR search UI (browser): `https://www.sec.gov/cgi-bin/srqsb?text=form-type%3D10-K+%22{TICKER}%22&first=1&last=10`

### Yahoo Finance (no key required)
- Quote summary: `https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}`
- Key stats: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/{TICKER}?modules=defaultKeyStatistics,financialData,earningsTrend`
- Income statement: `https://query2.finance.yahoo.com/v10/finance/quoteSummary/{TICKER}?modules=incomeStatementHistory,cashflowStatementHistory,balanceSheetHistory`

### FRED (free API key at fred.stlouisfed.org)
- Series data: `https://api.stlouisfed.org/fred/series/observations?series_id={ID}&api_key={KEY}&file_type=json`
- Key series: Fed Funds Rate=FEDFUNDS, 10Y Treasury=DGS10, CPI=CPIAUCSL, GDP=GDP, Unemployment=UNRATE

### Earnings Transcripts (use playwright MCP for JS-rendered pages)
- Seeking Alpha: `https://seekingalpha.com/symbol/{TICKER}/earnings/transcripts`
- IR page pattern: search `{COMPANY NAME} investor relations earnings transcripts`

---

## Output Standards

- All financial figures in USD millions unless otherwise noted
- All growth rates YoY unless otherwise noted
- Always show the date of the data point
- Memos must include: date written, analyst (Quantara), ticker, rating
- Format tables as markdown for easy rendering on the Quantara platform
