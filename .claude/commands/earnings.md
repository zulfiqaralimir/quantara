# /earnings — Earnings Analysis

Deep analysis of a company's most recent earnings report.

**Usage:** `/earnings [TICKER]`

## Instructions

1. **Gather data:**
   - Pull most recent 10-Q or 8-K earnings release (SEC EDGAR)
   - Pull earnings call transcript (web scrape from IR page or Seeking Alpha)
   - Pull consensus estimates (Yahoo Finance) for revenue and EPS

2. **Beat/Miss analysis:**
   - Revenue: actual vs. consensus estimate ($ and %)
   - EPS GAAP: actual vs. consensus
   - EPS non-GAAP: actual vs. consensus
   - Gross margin: actual vs. prior quarter vs. prior year
   - Key operating metric (ARR, NRR, units, etc. — sector-dependent)

3. **Guidance analysis:**
   - Next quarter revenue guidance: midpoint vs. consensus
   - Full-year guidance: raised / maintained / lowered?
   - Any new long-term targets provided?
   - Guidance credibility: compare to prior guidance accuracy

4. **Transcript analysis — extract:**
   - CEO's tone: confident, cautious, defensive?
   - Top 3 analyst questions (what are analysts worried about?)
   - Management responses to bear case questions
   - Any forward-looking color not in press release
   - Changes in language vs. prior quarter

5. **Reaction analysis:**
   - Stock price change day of earnings
   - Was reaction warranted given results?
   - Any notable analyst upgrades/downgrades post-earnings

## Output Format

```markdown
# [TICKER] Earnings Analysis — [Quarter] [Year]
**Reported:** [date]
**Analyzed:** [today]

## Scorecard
| Metric             | Actual | Estimate | Beat/Miss |
|--------------------|--------|----------|-----------|
| Revenue            | $XXM   | $XXM     | +X%       |
| Gross Margin       | XX%    | XX%      | +Xbps     |
| EPS (non-GAAP)     | $X.XX  | $X.XX    | +X%       |
| [Key Op Metric]    | XXX    | XXX      | +X%       |

## Guidance
- Q[X] Revenue: $XXM–$XXM midpoint ($XXM vs. consensus $XXM)
- FY guidance: [Raised / Maintained / Lowered] to $XXM–$XXM

## Key Transcript Takeaways
1. [Most important thing management said]
2. [Second key point]
3. [What analysts were most focused on]

## Thesis Check
**[On Track / Improving / Deteriorating]**
[1–2 sentences on whether this earnings report strengthens or weakens the long thesis]

## Action
**[Buy more / Hold / Reduce / Exit]** — [rationale]
```
