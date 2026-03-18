# /change — Quarter-Over-Quarter Change Analysis

Identify what materially changed in the last quarter vs. prior periods.

**Usage:** `/change [TICKER]`

## Instructions

This skill focuses on *delta* — what is different now vs. 90 days ago. Not a full diligence, just the changes.

1. **Financial changes (10-Q vs. prior 10-Q):**
   - Revenue: absolute change and growth rate change (acceleration or deceleration?)
   - Gross margin: bps change QoQ and YoY
   - Operating expenses: any step-up or reduction?
   - FCF: improved or deteriorated?
   - Guidance: raised, maintained, or lowered?

2. **Operational changes:**
   - Key metrics (ARR, NRR, units, installed base): trend change?
   - Customer count change
   - Geographic mix shift

3. **Narrative changes (earnings call + press release):**
   - Compare language in most recent call vs. prior quarter call
   - New risks mentioned that weren't there before?
   - Changed tone on demand environment?
   - New products, partnerships, or strategic priorities announced?

4. **Market structure changes:**
   - Any new competitor announcements?
   - Industry news in last 90 days affecting the thesis?
   - Macro changes relevant to this business (rate sensitivity, FX, supply chain)?

5. **Estimate revision changes (Yahoo Finance):**
   - Have sell-side estimates moved up or down since last quarter?
   - Consensus direction: rising, stable, falling?

6. **Insider transaction changes (Form 4 filings):**
   - Any new buys or sells in last 90 days?

## Output Format

```markdown
# [TICKER] — What Changed This Quarter
**Date:** [today]
**Compared:** [Current Q] vs. [Prior Q]

## Financial Changes
| Metric        | Last Q  | This Q  | Change    | Signal |
|---------------|---------|---------|-----------|--------|
| Revenue       | $XXM    | $XXM    | +X%       | ✓/✗    |
| Gross Margin  | XX%     | XX%     | +Xbps     | ✓/✗    |
| FCF           | $XXM    | $XXM    | +X%       | ✓/✗    |
| Guidance Mid  | $XXM    | $XXM    | [R/M/L]   | ✓/✗    |

## Key Operational Changes
[3–5 bullets on what operationally changed]

## Narrative Changes
[What did management say differently? Flag any language shifts]

## External Changes
[Competitive, macro, or industry developments in last 90 days]

## Estimate Revisions
- Revenue estimates: [Up X% / Flat / Down X%] since last quarter
- EPS estimates: [Up / Flat / Down]

## Insider Activity
[Any Form 4 activity in last 90 days]

## Thesis Status
**[Strengthened / Unchanged / Weakened]**
[1–2 sentences on whether the changes support or challenge your thesis]

## Action
**[Add / Hold / Reduce / Reassess]**
```
