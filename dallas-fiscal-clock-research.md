# Dallas Fiscal Clock — Research, Data & Coding Plan

## Project Concept

A "national debt clock"-style website focused on the City of Dallas, showing taxpayers real-time information about the city's total obligations — bonded debt, unfunded pension liabilities, OPEB, and other off-balance-sheet items — with comparisons to Houston, San Antonio, Fort Worth, and Austin. The key metric is **burden per household**, which divides total obligations by Census-estimated households.

---

## Part 1: Core Data

### City of Dallas

| Metric | Value | Source |
|--------|-------|--------|
| Population | ~1,304,000 | Census Bureau ACS 2023 |
| Households | ~504,000 | Census Bureau ACS 2023 |
| Total Bonded Debt (principal outstanding) | ~$3.5B | City of Dallas website / Cara Mendelsohn (Council Dist. 12) April 2024 |
| Total Debt incl. interest to maturity | ~$6.7B | Texas Bond Review Board via Texas Policy Foundation FY2022 |
| GO Debt Per Capita | ~$1,447 (2020) | Texas Comptroller Debt at a Glance |
| Net Pension Liability (combined) | ~$6.46B | KBRA credit report (12/31/2022 measurement date) |
| — DPFP Combined Plan (Police and Fire) | ~$3.4B unfunded, 34.4% funded | KBRA, S&P (12/31/2022) |
| — ERF (Employee Retirement Fund) | ~$1.2B unfunded, 54.1% funded | KBRA (12/31/2022); ERF ACFR FY2023 |
| — DPFP Supplemental Plan | ~$260M unfunded, 38.6% funded | KBRA (12/31/2022) |
| Combined NPL per capita | $4,959 | KBRA: "a manageable burden on the large tax base but a relatively high per capita burden" |
| OPEB (retiree healthcare) | ~$580M | City ACFR |
| Other Long-Term Obligations | ~$350M | Estimated from ACFR (compensated absences, claims, other) |
| **Total Obligations (debt + NPL + OPEB + other)** | **~$10.9B** | Compiled |
| **Burden Per Household** | **~$21,600** | Total obligations / 504,000 HH |
| Annual Budget (all funds) | ~$4.7B | FY2024-25 Budget |
| General Fund | ~$2.06B | FY2024-25 Budget |
| Tax Base (assessed value) | ~$200B | S&P credit report (FY2024: "slightly less than $200 billion") |
| Tax Rate | $0.7357 per $100 AV | City budget |
| Credit Ratings | AA- (S&P) / Aa3 (Moody's) / AA (Fitch) / AA+ (KBRA) | Multiple reports, 2024 |
| 2024 Bond Program | $1.25B authorized (voters May 2024) | City of Dallas Bond Dashboard |
| Pension Obligation Bonds outstanding (2005 issuance) | ~$95.3M remaining | Bond Buyer, Sept 2023 |
| TIA Grade (FY2023) | D | Truth in Accounting |
| TIA Budget Shortfall | $5.9B | TIA: "highest taxpayer burden in the state" |
| TIA Taxpayer Burden | $13,200 per taxpayer | TIA FY2023 analysis |

**Key S&P finding (paraphrased):** S&P views Dallas pension/OPEB liabilities as a "significant credit weakness." The city continues to underfund its single-employer pension plans and does not consistently meet the actuarially determined contribution (ADC). Budgetary performance is "weak" after incorporating pension contribution deficiencies.

**Key KBRA finding (paraphrased):** The combined NPL of $6.46B equates to 2.87% of FMV and $4,959 per capita. The city's plan for pension funding projects a "long ramp-up to full funding" which may "limit long-term financial flexibility."

### City of Houston

| Metric | Value | Source |
|--------|-------|--------|
| Population | ~2,319,000 | Census Bureau |
| Households | ~849,000 | Census Bureau ACS 2023 |
| Total Debt (principal outstanding) | ~$13.6B | HB 1378 debt transparency filing |
| Total Debt incl. interest | ~$19.7B | HB 1378 filing (per capita $8,515) |
| Tax-supported debt per capita | $5,308 | HB 1378 filing |
| Unfunded Pension (combined, post-reform) | ~$4.5B | City pension reform page; post-2017 POB issuance |
| — Pre-reform unfunded (Moody's adjusted) | $8.2B-$10B | City of Houston pension page; Moody's; Texas Monthly |
| — HMEPS | ~$1.9B unfunded | Actuarial reports |
| — HPOPS (Police) | ~$1.5B unfunded | Actuarial reports |
| — HFRRF (Fire) | ~$1.1B unfunded | Actuarial reports |
| OPEB | ~$2.9B | S&P; city funds on pay-as-you-go basis |
| Other Long-Term | ~$500M | Estimated |
| **Total Obligations** | **~$21.5B** | Compiled |
| **Burden Per Household** | **~$25,300** | Note: high total but much is revenue-supported (airport, water) |
| Credit Ratings | AA (S&P) / Aa3 (Moody's) | 2024 |
| TIA Grade (FY2023) | D | Truth in Accounting |
| TIA Taxpayer Burden | $5,700 per taxpayer | TIA |
| Tax Rate | $0.5618 per $100 AV | City budget |

**Notes:** Houston's total debt is inflated by massive airport and water/sewer revenue bonds that are self-supporting from user fees. The 2017 pension reform was significant — voters approved POBs, a cost corridor was implemented to cap city contributions, and open amortization was closed. Houston's situation is structurally different from Dallas in that the reform actually happened. Dallas has not yet enacted comparable reform for DPFP.

### City of San Antonio

| Metric | Value | Source |
|--------|-------|--------|
| Population | ~1,473,000 | Census Bureau |
| Households | ~530,000 | Census Bureau ACS 2023 |
| Total Debt (principal) | ~$11.8B | Texas Policy Foundation FY2022; Bond Review Board |
| Per Capita Debt | $12,557 | TPF: "highest per capita among Texas' 10 largest cities" |
| Unfunded Pension | ~$2.3B | Moody's; Texas Tribune |
| — SAFRPF (Fire and Police) | ~$1.4B unfunded, ~75% funded | Actuarial reports |
| — SAMERS (Municipal) | ~$900M unfunded, ~82% funded | Actuarial reports |
| OPEB | ~$1.4B | ACFR |
| Other Long-Term | ~$450M | Estimated |
| **Total Obligations** | **~$16.0B** | Compiled |
| **Burden Per Household** | **~$30,100** | Caveat: CPS Energy is ~$7B of total; revenue-supported |
| Credit Ratings | AAA (S&P) / Aaa (Moody's) | 2024 |
| TIA Grade (FY2023) | C | TIA: transitioned from Sunshine to Sinkhole City |
| TIA Taxpayer Burden | $2,800 per taxpayer | TIA |
| Tax Rate | $0.5588 per $100 AV | City budget |

**Critical caveat:** San Antonio's per-capita and per-household numbers are misleading without context. CPS Energy (the city-owned electric and gas utility) accounts for roughly $7B of the total. That debt is secured by utility revenues, not property taxes. Stripping out CPS Energy, San Antonio's tax-supported burden is much lower — which is why S&P/Moody's rate it AAA. The dashboard should make this distinction visible.

### City of Fort Worth

| Metric | Value | Source |
|--------|-------|--------|
| Population | ~960,000 | Census Bureau |
| Households | ~340,000 | Census Bureau ACS 2023 |
| Total Debt (principal + interest) | ~$2.9B | Texas Policy Foundation; Bond Review Board |
| Unfunded Pension (FWERP) | ~$1.8B | Moody's FY2022; city debt financing plan 2024 |
| Pension Funded Pct | ~62% | City presentation April 2024 |
| OPEB | ~$380M | ACFR |
| Other Long-Term | ~$200M | Estimated |
| **Total Obligations** | **~$5.3B** | Compiled |
| **Burden Per Household** | **~$15,600** | Compiled |
| Credit Ratings | AA+ (S&P) / Aa1 (Moody's) | 2024 |
| TIA Grade (FY2023) | C | TIA: "financial condition showed some improvement" |
| TIA Taxpayer Burden | $4,100 per taxpayer | TIA |
| Tax Rate | $0.6925 per $100 AV | City budget |

**Notes:** Fort Worth has the lowest absolute debt among the five but a significant unfunded pension relative to its revenue base. Moody's flagged the pension as a scorecard notch-down factor. The city bought a downtown office building for its new city hall — relevant to your prior blog work.

### City of Austin

| Metric | Value | Source |
|--------|-------|--------|
| Population | ~1,018,000 | Census Bureau |
| Households | ~415,000 | Census Bureau ACS 2023 |
| Total Debt (principal + interest) | ~$7.2B (principal ~$6.8B) | TPF FY2022; Austin ACFR FY2024 |
| Per Capita Debt | $10,741 | TPF FY2019 |
| Unfunded Pension (combined) | ~$2.7B | Moody's; Texas Tribune |
| — COAERS (City Employees) | ~$1.6B unfunded, ~68% funded | Actuarial |
| — APRS (Police) | ~$600M unfunded, ~58% funded | Actuarial |
| — AFRS (Fire) | ~$500M unfunded, ~64% funded | Actuarial |
| OPEB | ~$1.8B | ACFR |
| Other Long-Term | ~$400M | Estimated |
| **Total Obligations** | **~$12.1B** | Compiled |
| **Burden Per Household** | **~$29,200** | Caveat: Austin Energy debt is significant component |
| Credit Ratings | AAA (S&P) / Aaa (Moody's) | 2024 |
| TIA Grade (FY2023) | D | TIA: "financial condition worsened"; ranked 13th worst nationally |
| TIA Taxpayer Burden | $11,700 per taxpayer | TIA: highest among Texas cities after Dallas |
| Tax Rate | $0.4412 per $100 AV | City budget |

**Notes:** Like San Antonio, Austin's total is inflated by utility revenue bonds (Austin Energy). Despite a AAA GO credit rating, TIA gives it a D because the off-balance-sheet obligations are enormous relative to available assets. The low tax rate belies significant total obligations.

---

## Part 2: Key Analytical Distinctions

### What "Total Obligations" Means
The ACFR's Statement of Net Position reports total liabilities under GASB. But to get the full picture of what taxpayers are exposed to, you need to add:
1. **Bonded debt** (GO bonds, certificates of obligation, revenue bonds, pension obligation bonds, commercial paper)
2. **Net Pension Liability** (GASB 68) — the gap between what's been promised and what's been funded
3. **Net OPEB Liability** (GASB 75) — unfunded retiree healthcare
4. **Other long-term obligations** — compensated absences, claims/judgments, landfill closure, etc.

Items NOT included in GASB but relevant:
- **Deferred maintenance** — Dallas's own report estimates $329M for City Hall alone; the citywide deferred maintenance backlog is likely multiples of this
- **Infrastructure deficit** — the gap between capital needs and funded projects
- **Contingent liabilities** — Convention Center hotel bonds, DDDA TIF bonds where the city backstops shortfalls

### Tax-Supported vs. Revenue-Supported Debt
This is the biggest analytical trap in city comparisons. San Antonio and Austin look terrible on raw per-capita debt because they own utilities (CPS Energy, Austin Energy) that carry billions in revenue bonds. Those bonds are paid from electric bills, not property taxes. Houston's airport bonds are similar. The dashboard should:
- Show total obligations as the headline
- Break out tax-supported vs. revenue-supported
- Let the user toggle between views
- Make clear that pension and OPEB are always effectively tax-supported

### TIA vs. Our Methodology
Truth in Accounting divides by "taxpayers" (a smaller denominator than households). Their "taxpayer burden" measures the shortfall between money available to pay bills and total bills owed. Our "burden per household" divides total obligations by households. The two numbers differ because:
- Different denominators (taxpayers vs. households)
- Different numerators (TIA uses net shortfall; we use gross obligations)
- Both are valid; they answer different questions

### The Ticking Clock Mechanic
The national debt clock works because federal debt accrues interest continuously. City debt also accrues interest, and pension unfunded liabilities grow when contributions fall below the ADC. A reasonable "growth per second" estimate:
- Dallas total debt interest accrual: ~$160M/year => ~$5.07/second
- Dallas pension underfunding gap (ADC shortfall): ~$150-200M/year => ~$4.75-6.34/second
- Combined: ~$10-11/second as the total obligation ticks up
- This is an approximation for dramatic effect; the methodology section should be transparent about it

---

## Part 3: Sources List

1. **City of Dallas ACFR FY2024** — dallascityhall.com/departments/budget/financialtransparency
2. **City of Dallas Debt Service Overview (as of 9/30/2025)** — dallascityhall.com
3. **KBRA Credit Report (Nov 2024)** — affirms AA+ GO rating, details $6.46B combined NPL
4. **S&P Global (Feb 2024)** — affirms AA-, calls pension/OPEB "significant credit weakness"
5. **Cara Mendelsohn, "What is the Real Cost of the 2024 Dallas Bond?"** — CandysDirt.com, April 15, 2024 — $3.5B total debt, $3.4B DPFP unfunded, $1.2B ERF unfunded = $8.1B+ total
6. **City of Houston HB 1378 Debt Transparency Filing** — houstontx.gov/controller/treasury — per capita $8,515, tax-supported per capita $5,308
7. **City of Houston Pension Solution Page** — houstontx.gov/pensions — $8.2B pre-reform unfunded, 2017 reform details
8. **Texas Policy Foundation, "Just the Facts: Government Debt" (updated FY2022)** — texaspolicy.com — all five cities' total debt with principal + interest
9. **Truth in Accounting, Financial State of the Cities (FY2023)** — governing.com, March 2025 — TIA grades and taxpayer burden for all Texas cities
10. **Texas Bond Review Board, Debt Affordability Study (Feb 2025)** — brb.texas.gov — state-level context, local debt per capita rankings
11. **Texas Comptroller, Debt at a Glance** — comptroller.texas.gov/transparency/local/debt — Dallas GO debt per capita history, comparison graphs
12. **Texas Tribune, "Billions in pension shortfalls threatening Texas cities' budgets"** — texastribune.org — Moody's rankings of all four major Texas cities
13. **Texas Monthly, "Texas's Pension Problems" (Jan 2017)** — Moody's data: Dallas $7.6B, Houston $10B, Austin $2.7B, SA $2.3B (older Moody's-adjusted figures)
14. **Bond Buyer, "Pension obligation bonds may be option for underfunded Dallas pensions" (Sept 2023)** — $95.3M POB outstanding from 2005
15. **Reason Foundation, Debt Trends for State and Local Governments (2025)** — reason.org — national pension debt rankings
16. **Baker Institute, "Houston's Pension Shortfall" (2016)** — bakerinstitute.org — detailed CAFR analysis methodology
17. **Fort Worth 2024 Debt Financing Plan** — fortworthtexas.gov — Moody's scorecard, pension notch-down
18. **City of Austin ACFR FY2024** — austintexas.gov
19. **The Texan, "Texas Among Top in Nation with $12,500 Local Government Debt Per Citizen" (2020)** — thetexan.news — Houston first among Texas localities, $367.4B total local debt statewide

---

## Part 4: Coding Plan for Claude Code CLI

### Architecture
```
dallas-fiscal-clock/
├── public/
│   └── index.html
├── src/
│   ├── data/
│   │   ├── cities.json          # All city data (the tables above)
│   │   ├── sources.json         # Source citations with URLs
│   │   └── methodology.json     # Explanatory text for each metric
│   ├── components/
│   │   ├── Clock.jsx            # Main ticking counter (Dallas hero)
│   │   ├── CityCard.jsx         # Individual city summary card
│   │   ├── ComparisonGrid.jsx   # Side-by-side city comparison
│   │   ├── DataTable.jsx        # Sortable tabular view
│   │   ├── DebtBreakdown.jsx    # Stacked bar (debt/pension/OPEB/other)
│   │   ├── PensionDetail.jsx    # Per-plan funded status bars
│   │   ├── BurdenCalculator.jsx # Interactive: enter home value -> your share
│   │   ├── MethodologyPanel.jsx # Expandable methodology/sources
│   │   └── Nav.jsx              # Tab navigation
│   ├── hooks/
│   │   └── useTicker.js         # Real-time counter logic
│   ├── utils/
│   │   └── format.js            # Number formatting helpers
│   ├── App.jsx
│   ├── index.jsx
│   └── styles/
│       └── global.css           # Dark theme, JetBrains Mono, animations
├── package.json
├── vite.config.js
└── README.md
```

### Tech Stack
- **Vite + React** — fast dev, simple deploy
- **Tailwind CSS** — utility-first, dark theme
- **No heavy charting lib needed** — CSS bars and counters are sufficient; if you want charts, use Recharts
- **Deploy target:** Vercel or Netlify (static site)

### Implementation Steps (in order)

**Step 1: Scaffold**
```bash
npm create vite@latest dallas-fiscal-clock -- --template react
cd dallas-fiscal-clock
npm install
npm install -D tailwindcss @tailwindcss/vite
```

**Step 2: Data layer**
Create `src/data/cities.json` from the tables in Part 1. Structure each city as:
```json
{
  "name": "Dallas",
  "population": 1304000,
  "households": 504000,
  "debt": {
    "bondedDebt": 3500000000,
    "unfundedPension": 6460000000,
    "opeb": 580000000,
    "otherLongTerm": 350000000
  },
  "budget": {
    "total": 4700000000,
    "generalFund": 2060000000
  },
  "taxBase": 200000000000,
  "taxRate": 0.7357,
  "creditRating": { "sp": "AA-", "moodys": "Aa3", "fitch": "AA", "kbra": "AA+" },
  "pensionPlans": [
    { "name": "DPFP Combined", "unfunded": 3400000000, "funded": 34.4 },
    { "name": "ERF", "unfunded": 1200000000, "funded": 54.1 },
    { "name": "DPFP Supplemental", "unfunded": 260000000, "funded": 38.6 }
  ],
  "tia": { "grade": "D", "shortfall": 5900000000, "taxpayerBurden": 13200 },
  "tickRate": 10.5,
  "color": "#FF3B3B",
  "notes": "..."
}
```

**Step 3: Ticking clock component**
- `useTicker` hook: stores a start timestamp, runs `requestAnimationFrame`, computes elapsed seconds x tickRate
- Display: large monospace number with tabular-nums, subtle red glow
- Below: grid of derived metrics (per HH, per capita, debt/revenue, etc.)

**Step 4: City comparison view**
- Cards for each city with debt breakdown bar (stacked horizontal bar using CSS)
- Click to expand pension plan detail
- Sort by: total obligations, per household, pension funded %, TIA grade

**Step 5: Interactive burden calculator**
- User enters their home's assessed value
- Calculate: (assessed value / city tax base) x total obligations = "your household's share"
- Show how it breaks down: X goes to bonded debt service, Y is your share of unfunded pension, etc.
- This is the viral feature — people will share screenshots

**Step 6: Data table**
- Sortable by any column
- Color-code cells (red/yellow/green thresholds)
- Export to CSV button

**Step 7: Methodology panel**
- Expandable sections explaining each metric
- Source citations with links
- "Tax-supported vs. revenue-supported" toggle that recomputes all per-HH figures
- Disclaimer about measurement dates and actuarial assumptions

**Step 8: Design**
- Dark theme (slate/navy background, monospace type)
- Red accent for Dallas, city-specific accent colors for others
- Ticking animation on the main counter
- Minimal, data-forward — this is a tool, not a marketing site
- Mobile responsive (single column on small screens)

**Step 9: Deploy**
- `npm run build` produces static files
- Push to GitHub, connect to Vercel
- Custom domain if desired

### Claude Code CLI Prompt Suggestion
When handing this to Claude Code, open with:

> Read dallas-fiscal-clock-research.md in this repo for all data, sources, and the full coding plan. Build the project per the architecture and steps in Part 4. Use the existing dallas-fiscal-clock.jsx as a reference implementation — it has working components and correct data. Start with Step 1 (scaffold) and work through Step 9 (deploy-ready build). Use Vite + React + Tailwind. All city data should live in a JSON file. The ticking counter should use requestAnimationFrame. Make it mobile responsive.

---

## Existing Reference Implementation

The file `dallas-fiscal-clock.jsx` in this repo is a working single-file React artifact with all five cities, the ticking counter, comparison cards, data table, and methodology footer. It can be used as a reference or starting point — the data and component logic are correct, it just needs to be broken out into a proper project structure.
