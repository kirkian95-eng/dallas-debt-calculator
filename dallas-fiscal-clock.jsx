import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
// Sources: City ACFRs (FY2023-2024), Texas Bond Review Board, Truth in Accounting
// (FY2023 analysis), S&P / KBRA / Moody's credit reports, Texas Policy Foundation,
// Texas Comptroller Debt at a Glance, Cara Mendelsohn (Council District 12) 2024 bond analysis.
// All figures are estimates compiled from public sources. "Total Burden" includes
// bonded debt, net pension liability, OPEB, and other long-term obligations per GASB.
// Household counts are Census Bureau estimates (ACS 2023).

const CITIES = [
  {
    name: "Dallas",
    population: 1304000,
    households: 504000,
    totalDebt: 3500000000,
    unfundedPension: 6460000000,
    opeb: 580000000,
    otherLongTerm: 350000000,
    annualBudget: 4700000000,
    generalFund: 2060000000,
    taxBase: 200000000000,
    taxRate: 0.7357,
    creditRating: "AA- / Aa3",
    pensionFundedPct: 42,
    debtGrowthPerSec: 5.10,
    tiaGrade: "D",
    tiaBudgetShortfall: 5900000000,
    tiaTaxpayerBurden: 13200,
    notes: "Net pension liability as of 12/31/2022 measurement. DPFP: $3.4B unfunded, ERF: $1.2B unfunded + $1.86B additional under Moody's adjustments. City total debt per city website (2024). TIA taxpayer burden based on FY2023 ACFR. S&P cited pension underfunding as 'significant credit weakness.'",
    color: "#FF3B3B",
    pension_plans: [
      { name: "Police & Fire (DPFP)", unfunded: 3400000000, funded: 37 },
      { name: "Employee Retirement (ERF)", unfunded: 1200000000, funded: 80 },
      { name: "DPFP Supplemental", unfunded: 260000000, funded: 43 },
    ],
  },
  {
    name: "Houston",
    population: 2319000,
    households: 849000,
    totalDebt: 13600000000,
    unfundedPension: 4500000000,
    opeb: 2900000000,
    otherLongTerm: 500000000,
    annualBudget: 6300000000,
    generalFund: 2800000000,
    taxBase: 230000000000,
    taxRate: 0.5618,
    creditRating: "AA / Aa3",
    pensionFundedPct: 68,
    debtGrowthPerSec: 7.20,
    tiaGrade: "D",
    tiaBudgetShortfall: 4500000000,
    tiaTaxpayerBurden: 5700,
    notes: "Post-2017 pension reform. POBs issued. HB 1378 total debt $19.7B incl. interest. Per capita total: $8,515. Pension reform capped city contributions via cost corridor.",
    color: "#0090FF",
    pension_plans: [
      { name: "Municipal Employees (HMEPS)", unfunded: 1900000000, funded: 72 },
      { name: "Police (HPOPS)", unfunded: 1500000000, funded: 60 },
      { name: "Firefighters (HFRRF)", unfunded: 1100000000, funded: 68 },
    ],
  },
  {
    name: "San Antonio",
    population: 1473000,
    households: 530000,
    totalDebt: 11800000000,
    unfundedPension: 2300000000,
    opeb: 1400000000,
    otherLongTerm: 450000000,
    annualBudget: 3900000000,
    generalFund: 1500000000,
    taxBase: 145000000000,
    taxRate: 0.5588,
    creditRating: "AAA / Aaa",
    pensionFundedPct: 78,
    debtGrowthPerSec: 4.80,
    tiaGrade: "C",
    tiaBudgetShortfall: 1200000000,
    tiaTaxpayerBurden: 2800,
    notes: "CPS Energy debt is major component (~$7B of total). High per capita debt ($12,557) but much is utility revenue-supported. Pension relatively well managed. TIA transitioned to Sinkhole City in FY2023.",
    color: "#00C853",
    pension_plans: [
      { name: "Fire & Police (SAFRPF)", unfunded: 1400000000, funded: 75 },
      { name: "Municipal (SAMERS)", unfunded: 900000000, funded: 82 },
    ],
  },
  {
    name: "Fort Worth",
    population: 960000,
    households: 340000,
    totalDebt: 2900000000,
    unfundedPension: 1800000000,
    opeb: 380000000,
    otherLongTerm: 200000000,
    annualBudget: 2600000000,
    generalFund: 920000000,
    taxBase: 100000000000,
    taxRate: 0.6925,
    creditRating: "AA+ / Aa1",
    pensionFundedPct: 62,
    debtGrowthPerSec: 2.40,
    tiaGrade: "C",
    tiaBudgetShortfall: 1400000000,
    tiaTaxpayerBurden: 4100,
    notes: "Lower total debt but significant pension unfunded liability. TIA: 'financial condition showed some improvement.' Moody's FY2022 shows large unfunded pension relative to revenue.",
    color: "#FFB300",
    pension_plans: [
      { name: "Employees' Retirement (FWERP)", unfunded: 1800000000, funded: 62 },
    ],
  },
  {
    name: "Austin",
    population: 1018000,
    households: 415000,
    totalDebt: 7200000000,
    unfundedPension: 2700000000,
    opeb: 1800000000,
    otherLongTerm: 400000000,
    annualBudget: 5400000000,
    generalFund: 1300000000,
    taxBase: 170000000000,
    taxRate: 0.4412,
    creditRating: "AAA / Aaa",
    pensionFundedPct: 66,
    debtGrowthPerSec: 3.90,
    tiaGrade: "D",
    tiaBudgetShortfall: 3900000000,
    tiaTaxpayerBurden: 11700,
    notes: "Austin Energy debt is significant component. Highest TIA taxpayer burden per household among Texas cities at $11,700. Ranked 13th worst nationally. Despite AAA GO rating, off-balance-sheet obligations are substantial.",
    color: "#AA00FF",
    pension_plans: [
      { name: "City Employees (COAERS)", unfunded: 1600000000, funded: 68 },
      { name: "Police (APRS)", unfunded: 600000000, funded: 58 },
      { name: "Fire (AFRS)", unfunded: 500000000, funded: 64 },
    ],
  },
];

const fmt = (n) => {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
};
const fmtInt = (n) => `$${Math.round(n).toLocaleString()}`;
const pct = (n) => `${n.toFixed(1)}%`;

function getTotalObligations(c) {
  return c.totalDebt + c.unfundedPension + c.opeb + c.otherLongTerm;
}
function getBurdenPerHH(c) {
  return getTotalObligations(c) / c.households;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function TickingNumber({ value, perSec = 0, prefix = "$", decimals = 0 }) {
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    setCurrent(value);
  }, [value]);
  useEffect(() => {
    if (perSec === 0) return;
    const interval = setInterval(() => {
      setCurrent((v) => v + perSec / 20);
    }, 50);
    return () => clearInterval(interval);
  }, [perSec]);
  const display =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString();
  return (
    <span className="ticking-number">
      {prefix}
      {display}
    </span>
  );
}

function MiniBar({ value, max = 100, color, label }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#94A3B8",
          marginBottom: 2,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div
        style={{
          height: 6,
          background: "#1E293B",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(value / max) * 100}%`,
            background:
              value < 50
                ? "#EF4444"
                : value < 70
                  ? "#F59E0B"
                  : "#22C55E",
            borderRadius: 3,
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}

function DebtBreakdownBar({ city }) {
  const total = getTotalObligations(city);
  const segments = [
    {
      label: "Bonded Debt",
      value: city.totalDebt,
      color: city.color,
    },
    {
      label: "Unfunded Pension",
      value: city.unfundedPension,
      color: "#EF4444",
    },
    { label: "OPEB", value: city.opeb, color: "#F59E0B" },
    {
      label: "Other Long-Term",
      value: city.otherLongTerm,
      color: "#64748B",
    },
  ];
  return (
    <div>
      <div
        style={{
          display: "flex",
          height: 12,
          borderRadius: 6,
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        {segments.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${(s.value / total) * 100}%`,
              background: s.color,
              minWidth: s.value > 0 ? 2 : 0,
            }}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "4px 12px",
          fontSize: 10,
          color: "#94A3B8",
        }}
      >
        {segments.map((s, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: s.color,
                display: "inline-block",
              }}
            />
            {s.label}: {fmt(s.value)}
          </span>
        ))}
      </div>
    </div>
  );
}

function CityCard({ city, isSelected, onClick }) {
  const total = getTotalObligations(city);
  const perHH = getBurdenPerHH(city);
  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${city.color}15, ${city.color}08)`
          : "#0F172A",
        border: `1px solid ${isSelected ? city.color : "#1E293B"}`,
        borderRadius: 8,
        padding: "14px 16px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: city.color,
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 15,
            color: city.color,
          }}
        >
          {city.name}
        </span>
        <span
          style={{
            fontSize: 10,
            color: "#64748B",
            background: "#1E293B",
            padding: "2px 6px",
            borderRadius: 4,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {city.creditRating}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <div>
          <div
            style={{
              fontSize: 10,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Total Obligations
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              color: "#F1F5F9",
            }}
          >
            {fmt(total)}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 10,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Per Household
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              color:
                perHH > 20000
                  ? "#EF4444"
                  : perHH > 15000
                    ? "#F59E0B"
                    : "#22C55E",
            }}
          >
            {fmtInt(perHH)}
          </div>
        </div>
      </div>
      <DebtBreakdownBar city={city} />
    </div>
  );
}

function DallasClockPanel({ elapsed }) {
  const dallas = CITIES[0];
  const total = getTotalObligations(dallas);
  const growth = total + elapsed * dallas.debtGrowthPerSec;
  const perHH = growth / dallas.households;
  const pensionPerHH = dallas.unfundedPension / dallas.households;
  const debtPerCapita = growth / dallas.population;
  const debtToRevenue = (growth / dallas.annualBudget) * 100;

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #0F172A 0%, #1a0a0a 50%, #0F172A 100%)",
        border: "1px solid #FF3B3B33",
        borderRadius: 12,
        padding: "24px 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, #FF3B3B, #FF6B6B, #FF3B3B)",
        }}
      />

      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            fontWeight: 600,
            color: "#FF3B3B",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            margin: 0,
            marginBottom: 4,
          }}
        >
          City of Dallas — Total Obligations
        </h2>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800,
            color: "#FF3B3B",
            textShadow: "0 0 30px #FF3B3B44",
            lineHeight: 1.1,
          }}
        >
          <TickingNumber value={total} perSec={dallas.debtGrowthPerSec} />
        </div>
        <div style={{ fontSize: 11, color: "#64748B", marginTop: 4 }}>
          Bonded Debt + Net Pension Liability + OPEB + Other Long-Term
          Obligations
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          {
            label: "Burden Per Household",
            value: fmtInt(perHH),
            sub: `${dallas.households.toLocaleString()} households`,
            hot: true,
          },
          {
            label: "Unfunded Pension / HH",
            value: fmtInt(pensionPerHH),
            sub: `${dallas.pensionFundedPct}% funded`,
            hot: true,
          },
          {
            label: "Per Capita",
            value: fmtInt(debtPerCapita),
            sub: `Pop. ${(dallas.population / 1e6).toFixed(2)}M`,
          },
          {
            label: "Debt / Revenue",
            value: pct(debtToRevenue),
            sub: `Budget: ${fmt(dallas.annualBudget)}`,
          },
          {
            label: "Tax Base",
            value: fmt(dallas.taxBase),
            sub: `Rate: $${dallas.taxRate}/$100`,
          },
          {
            label: "TIA Taxpayer Burden",
            value: fmtInt(dallas.tiaTaxpayerBurden),
            sub: `Grade: ${dallas.tiaGrade} (FY2023)`,
            hot: true,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#0F172A",
              border: "1px solid #1E293B",
              borderRadius: 6,
              padding: "10px 12px",
            }}
          >
            <div
              style={{
                fontSize: 9,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 17,
                fontWeight: 700,
                color: item.hot ? "#FF6B6B" : "#E2E8F0",
              }}
            >
              {item.value}
            </div>
            <div style={{ fontSize: 10, color: "#475569" }}>{item.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 11,
            color: "#94A3B8",
            fontWeight: 600,
            marginBottom: 8,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Dallas Pension Plans — Funded Status
        </div>
        {dallas.pension_plans.map((p, i) => (
          <MiniBar
            key={i}
            label={p.name}
            value={p.funded}
            color={p.funded < 50 ? "#EF4444" : p.funded < 70 ? "#F59E0B" : "#22C55E"}
          />
        ))}
      </div>

      <DebtBreakdownBar city={dallas} />
    </div>
  );
}

function ComparisonTable() {
  const sorted = [...CITIES].sort((a, b) => getBurdenPerHH(b) - getBurdenPerHH(a));
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "1px solid #1E293B",
              color: "#64748B",
              textTransform: "uppercase",
              fontSize: 10,
              letterSpacing: "0.05em",
            }}
          >
            <th style={{ textAlign: "left", padding: "8px 6px" }}>City</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>Total Obligations</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>Per Household</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>Unfunded Pension</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>Pension Funded %</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>TIA Grade</th>
            <th style={{ textAlign: "right", padding: "8px 6px" }}>Credit Rating</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => {
            const perHH = getBurdenPerHH(c);
            return (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid #1E293B11",
                  color: "#CBD5E1",
                }}
              >
                <td
                  style={{
                    padding: "10px 6px",
                    fontWeight: 700,
                    color: c.color,
                  }}
                >
                  {c.name}
                </td>
                <td style={{ textAlign: "right", padding: "10px 6px" }}>
                  {fmt(getTotalObligations(c))}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px 6px",
                    fontWeight: 700,
                    color:
                      perHH > 20000
                        ? "#EF4444"
                        : perHH > 15000
                          ? "#F59E0B"
                          : "#E2E8F0",
                  }}
                >
                  {fmtInt(perHH)}
                </td>
                <td style={{ textAlign: "right", padding: "10px 6px" }}>
                  {fmt(c.unfundedPension)}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px 6px",
                    color:
                      c.pensionFundedPct < 50
                        ? "#EF4444"
                        : c.pensionFundedPct < 70
                          ? "#F59E0B"
                          : "#22C55E",
                  }}
                >
                  {c.pensionFundedPct}%
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px 6px",
                    color:
                      c.tiaGrade === "D"
                        ? "#EF4444"
                        : c.tiaGrade === "C"
                          ? "#F59E0B"
                          : "#22C55E",
                    fontWeight: 700,
                  }}
                >
                  {c.tiaGrade}
                </td>
                <td
                  style={{
                    textAlign: "right",
                    padding: "10px 6px",
                    fontSize: 11,
                    color: "#94A3B8",
                  }}
                >
                  {c.creditRating}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function DallasFiscalClock() {
  const [elapsed, setElapsed] = useState(0);
  const [selectedCity, setSelectedCity] = useState(0);
  const [view, setView] = useState("clock");

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsed((Date.now() - start) / 1000);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        fontFamily:
          "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
        background: "#0A0E1A",
        color: "#E2E8F0",
        minHeight: "100vh",
        padding: "20px 16px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .ticking-number { font-variant-numeric: tabular-nums; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            style={{
              fontSize: "clamp(18px, 4vw, 26px)",
              fontWeight: 800,
              margin: 0,
              color: "#F1F5F9",
              letterSpacing: "-0.02em",
            }}
          >
            DALLAS FISCAL CLOCK
          </h1>
          <div
            style={{
              fontSize: 11,
              color: "#64748B",
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            Total obligations of the City of Dallas and peer Texas cities
            <br />
            Compiled from ACFRs, credit agency reports, Texas Bond Review Board
            &amp; Truth in Accounting
          </div>
        </div>

        {/* Nav */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 20,
            justifyContent: "center",
          }}
        >
          {[
            { key: "clock", label: "Dallas Clock" },
            { key: "compare", label: "City Comparison" },
            { key: "table", label: "Data Table" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key)}
              style={{
                background: view === tab.key ? "#1E293B" : "transparent",
                color: view === tab.key ? "#F1F5F9" : "#64748B",
                border: `1px solid ${view === tab.key ? "#334155" : "#1E293B"}`,
                borderRadius: 6,
                padding: "8px 16px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Views */}
        {view === "clock" && <DallasClockPanel elapsed={elapsed} />}

        {view === "compare" && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {CITIES.map((city, i) => (
                <CityCard
                  key={i}
                  city={city}
                  isSelected={selectedCity === i}
                  onClick={() => setSelectedCity(i)}
                />
              ))}
            </div>

            {/* Selected city detail */}
            <div
              style={{
                marginTop: 16,
                background: "#0F172A",
                border: `1px solid ${CITIES[selectedCity].color}33`,
                borderRadius: 8,
                padding: 20,
                animation: "slideIn 0.3s ease",
              }}
            >
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: 14,
                  color: CITIES[selectedCity].color,
                  fontWeight: 700,
                }}
              >
                {CITIES[selectedCity].name} — Pension Detail
              </h3>
              {CITIES[selectedCity].pension_plans.map((p, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <MiniBar label={`${p.name} — ${fmt(p.unfunded)} unfunded`} value={p.funded} />
                </div>
              ))}
              <div
                style={{
                  fontSize: 11,
                  color: "#64748B",
                  marginTop: 12,
                  lineHeight: 1.6,
                  borderTop: "1px solid #1E293B",
                  paddingTop: 12,
                }}
              >
                {CITIES[selectedCity].notes}
              </div>
            </div>
          </div>
        )}

        {view === "table" && (
          <div
            style={{
              background: "#0F172A",
              border: "1px solid #1E293B",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <ComparisonTable />
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            padding: "16px 0",
            borderTop: "1px solid #1E293B",
            fontSize: 10,
            color: "#475569",
            lineHeight: 1.7,
          }}
        >
          <div style={{ fontWeight: 700, color: "#64748B", marginBottom: 4 }}>
            METHODOLOGY &amp; SOURCES
          </div>
          <p style={{ margin: "0 0 6px" }}>
            "Total Obligations" = outstanding bonded debt (GO + revenue + COs +
            pension obligation bonds) + net pension liability (NPL, per GASB 68)
            + net OPEB liability (per GASB 75) + other long-term obligations.
            This is the broadest measure of what taxpayers are on the hook for,
            including obligations that do not appear in the city's annual
            operating budget.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            "Burden Per Household" divides total obligations by ACS-estimated
            households in the city proper. This is the implicit share of city
            obligations borne by each household — not a bill, but a measure of
            fiscal exposure.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            "TIA Taxpayer Burden" is from Truth in Accounting's FY2023 analysis,
            which uses a different methodology focused on the shortfall between
            available assets and total bills owed. TIA divides this shortfall by
            the number of taxpayers (not households). The two per-household
            figures therefore differ.
          </p>
          <p style={{ margin: "0 0 6px" }}>
            Sources: City of Dallas ACFR (FY2024); City of Houston debt
            transparency filings (HB 1378); Texas Policy Foundation, "Just the
            Facts: Government Debt in Texas' Most Populous Cities" (FY2022);
            Truth in Accounting, Financial State of the Cities (FY2023); S&amp;P
            Global, KBRA, Moody's, and Fitch credit reports (2023-2024); Texas
            Bond Review Board; Texas Comptroller Debt at a Glance; individual
            city pension plan actuarial valuations.
          </p>
          <p style={{ margin: "0 0 0px", color: "#FF6B6B88" }}>
            Note: All figures are estimates compiled from the most recent
            publicly available data (FY2022-FY2024 depending on source).
            Measurement dates vary. Pension NPL figures are sensitive to
            discount rate and actuarial assumptions. San Antonio's high total
            debt includes CPS Energy revenue bonds. This dashboard is for
            informational purposes and does not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}
