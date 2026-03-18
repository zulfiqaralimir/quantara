# /mgmt — Management Quality Assessment

Evaluate management team quality, track record, and alignment.

**Usage:** `/mgmt [TICKER]`

## Instructions

1. **Team overview (web scrape IR page + LinkedIn):**
   - CEO: name, tenure, background, prior roles
   - CFO: name, tenure, background
   - Any recent C-suite turnover (flag if CFO left in last 12 months)

2. **Compensation analysis (DEF 14A proxy filing):**
   - CEO total compensation (last 3 years)
   - What metrics drive variable pay? (Revenue, EPS, TSR, or custom?)
   - Are metrics achievable or aggressive?
   - Say-on-pay vote result (% approval)
   - Clawback provisions: exist?

3. **Insider ownership (DEF 14A + Form 4 filings):**
   - CEO % ownership of shares outstanding
   - Total insider ownership %
   - Recent insider transactions (last 12 months): buys or sells?
   - Any 10b5-1 plan sales? (flag if large, sustained selling)

4. **Guidance track record (last 3 years of earnings):**
   - For each quarter: initial guidance, final guidance, actual result
   - Calculate: average beat/miss magnitude for revenue and EPS
   - Pattern: conservative guidance (under-promise / over-deliver)?
   - Pattern: sandbagging vs. realistic vs. optimistic?

5. **Capital allocation history:**
   - M&A: any acquisitions in last 3 years? At what valuations? Integration success?
   - Buybacks: meaningful? Well-timed (buyback at low prices or high)?
   - Dividends: growing, stable, cut?
   - Debt: lever up or pay down?

6. **Red flags checklist:**
   - [ ] Restatements in last 5 years
   - [ ] Auditor changes
   - [ ] SEC investigation or material weaknesses
   - [ ] Excessive related party transactions
   - [ ] Multiple CFO changes
   - [ ] Compensation disconnect from performance

## Output Format

```markdown
# [TICKER] Management Assessment
**Date:** [today]

## Leadership Team
| Role | Name | Tenure | Background |
|------|------|--------|------------|
| CEO  | ...  | X yrs  | ...        |
| CFO  | ...  | X yrs  | ...        |

## Compensation Scorecard
- Pay structure: [aligned / partially aligned / misaligned]
- Say-on-pay: XX% approval ([year])
- CEO comp vs. peers: [above / in-line / below] median

## Insider Ownership
- CEO: X.X% | Total insiders: X.X%
- Recent activity: [net buyer / net seller / no activity]
- 10b5-1 plans: [yes/no — flag if concerning]

## Guidance Track Record (Last 12 Quarters)
| Quarter | Rev Guidance | Rev Actual | Beat/Miss |
|---------|-------------|------------|-----------|

**Average beat:** +X% revenue | +$X.XX EPS

## Capital Allocation Score: X/10
[Commentary on M&A, buybacks, dividends, debt]

## Red Flags
[List any flags, or "None identified"]

## Overall Management Score: X/10
**[Strong / Adequate / Weak]** — [1–2 sentence summary]
```
