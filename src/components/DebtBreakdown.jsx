import { fmt, getTotalObligations } from '../utils/format'

const COLORS = {
  bondedDebt: '#3B82F6',
  unfundedPension: '#EF4444',
  opeb: '#F59E0B',
  otherLongTerm: '#94A3B8',
}

export default function DebtBreakdown({ city }) {
  const total = getTotalObligations(city)
  const segments = [
    { label: 'Bonded Debt', value: city.debt.bondedDebt, color: COLORS.bondedDebt },
    { label: 'Unfunded Pension', value: city.debt.unfundedPension, color: COLORS.unfundedPension },
    { label: 'OPEB', value: city.debt.opeb, color: COLORS.opeb },
    { label: 'Other Long-Term', value: city.debt.otherLongTerm, color: COLORS.otherLongTerm },
  ]

  return (
    <div>
      <div className="flex h-2.5 rounded-full overflow-hidden mb-2 bg-slate-100">
        {segments.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${(s.value / total) * 100}%`,
              backgroundColor: s.color,
              minWidth: s.value > 0 ? 2 : 0,
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
        {segments.map((s, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block"
              style={{ backgroundColor: s.color }}
            />
            {s.label}: {fmt(s.value)}
          </span>
        ))}
      </div>
    </div>
  )
}

export { COLORS }
