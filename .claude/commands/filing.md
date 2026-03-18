# /filing — SEC Filing Analysis

Analyze the most recent SEC filing for a ticker and compare vs. prior period.

**Usage:** `/filing [TICKER] [optional: 10-K | 10-Q | DEF14A | 8-K]`

Default: analyzes most recent 10-Q, comparing to prior quarter and prior year quarter.

## Instructions

1. **Fetch filings from SEC EDGAR:**
   - Most recent filing of specified type
   - Prior period filing of same type (for comparison)

2. **For 10-Q analysis, extract and compare:**
   - Revenue (QoQ and YoY change)
   - Gross profit and gross margin
   - Operating income / EBITDA
   - Net income
   - EPS (GAAP and non-GAAP if disclosed)
   - Free cash flow
   - Cash and equivalents
   - Total debt
   - Shares outstanding (dilution check)

3. **Read MD&A carefully:**
   - What changed in the business this quarter?
   - What does management attribute the changes to?
   - Any new risks disclosed?
   - Any changes to guidance language?

4. **Flag anomalies:**
   - Revenue recognition changes
   - One-time items inflating/deflating results
   - Unusual accruals or reserve changes
   - Goodwill impairments
   - Related party transactions

5. **For DEF14A (Proxy):**
   - CEO/CFO total compensation
   - Pay-for-performance alignment
   - Insider ownership percentages (all officers and directors)
   - Shareholder vote results from last annual meeting
   - Any related party transactions

## Output Format

```markdown
# [TICKER] Filing Analysis — [Filing Type] [Period]
**Filed:** [date]
**Analyzed:** [today]

## Key Financials vs. Prior Period
| Metric        | This Period | Prior Quarter | Prior Year Q | YoY Change |
|---------------|-------------|---------------|--------------|------------|

## MD&A Highlights
[3–5 bullet points of key management commentary]

## Anomalies / Red Flags
[List any items requiring follow-up]

## Changes vs. Prior Filing
[What is meaningfully different from the previous filing — new risks, changed language, etc.]

## Verdict
**[Positive / Neutral / Negative]** — [1 sentence summary]
```
