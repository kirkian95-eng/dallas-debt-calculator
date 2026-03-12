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
      hot: true,
    },
    {
      label: 'Unfunded Pension / HH',
      value: fmtInt(pensionPerHH),
      sub: `${city.pensionFundedPct}% funded`,
      hot: true,
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
      hot: true,
    },
  ]

  return (
    <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-b from-slate-900 via-[#1a0a0a] to-slate-900 p-6 md:p-7">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-red-400 to-red-500" />

      {/* Main counter */}
      <div className="text-center mb-5">
        <h2 className="font-mono text-xs font-semibold text-red-500 uppercase tracking-[0.15em] mb-1">
          City of Dallas — Total Obligations
        </h2>
        <div className="font-mono text-[clamp(28px,5vw,44px)] font-extrabold text-red-500 leading-tight tabular-nums"
          style={{ textShadow: '0 0 30px rgba(255,59,59,0.25)' }}
        >
          ${Math.round(current).toLocaleString()}
        </div>
        <div className="text-[11px] text-slate-500 mt-1">
          Bonded Debt + Net Pension Liability + OPEB + Other Long-Term Obligations
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {stats.map((item, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-md p-2.5 md:p-3">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">
              {item.label}
            </div>
            <div className={`font-mono text-base md:text-lg font-bold ${item.hot ? 'text-red-400' : 'text-slate-200'}`}>
              {item.value}
            </div>
            <div className="text-[10px] text-slate-600">{item.sub}</div>
          </div>
        ))}
      </div>

      {/* Pension bars */}
      <div className="mb-4">
        <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2">
          Dallas Pension Plans — Funded Status
        </div>
        {city.pensionPlans.map((p, i) => (
          <MiniBar
            key={i}
            label={p.name}
            value={p.funded}
            color={p.funded < 50 ? '#EF4444' : p.funded < 70 ? '#F59E0B' : '#22C55E'}
          />
        ))}
      </div>

      <DebtBreakdown city={city} />
    </div>
  )
}
