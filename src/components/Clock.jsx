import { useTicker } from '../hooks/useTicker'
import { fmt, fmtInt, pct, getTotalObligations } from '../utils/format'
import { MiniBar } from './PensionDetail'
import DebtBreakdown from './DebtBreakdown'

export default function Clock({ city }) {
  const total = getTotalObligations(city)
  const current = useTicker(total, city.tickRate)
  const perHH = current / city.households
  const pensionPerHH = city.debt.unfundedPension / city.households
  const debtPerCapita = current / city.population
  const debtToRevenue = (current / city.budget.total) * 100

  const stats = [
    {
      label: 'Burden Per Household',
      value: fmtInt(perHH),
      sub: `${city.households.toLocaleString()} households`,
      warn: true,
    },
    {
      label: 'Unfunded Pension / HH',
      value: fmtInt(pensionPerHH),
      sub: `${city.pensionFundedPct}% funded`,
      warn: true,
    },
    {
      label: 'Per Capita',
      value: fmtInt(debtPerCapita),
      sub: `Pop. ${(city.population / 1e6).toFixed(2)}M`,
    },
    {
      label: 'Debt / Revenue',
      value: pct(debtToRevenue),
      sub: `Budget: ${fmt(city.budget.total)}`,
    },
    {
      label: 'Tax Base',
      value: fmt(city.taxBase),
      sub: `Rate: $${city.taxRate}/$100`,
    },
    {
      label: 'TIA Taxpayer Burden',
      value: fmtInt(city.tia.taxpayerBurden),
      sub: `Grade: ${city.tia.grade} (FY2023)`,
      warn: true,
    },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
      {/* Main counter */}
      <div className="text-center mb-6">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
          City of Dallas — Total Obligations
        </h2>
        <div className="font-mono text-4xl md:text-5xl font-bold text-slate-900 leading-tight tabular-nums">
          ${Math.round(current).toLocaleString()}
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Bonded Debt + Net Pension Liability + OPEB + Other Long-Term Obligations
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-3 md:p-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">
              {item.label}
            </div>
            <div className={`font-mono text-lg md:text-xl font-bold ${item.warn ? 'text-amber-700' : 'text-slate-800'}`}>
              {item.value}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Pension bars */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
          Dallas Pension Plans — Funded Status
        </h3>
        {city.pensionPlans.map((p, i) => (
          <MiniBar
            key={i}
            label={p.name}
            value={p.funded}
          />
        ))}
      </div>

      <DebtBreakdown city={city} />
    </div>
  )
}
