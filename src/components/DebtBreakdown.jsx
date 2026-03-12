import { fmt, getTotalObligations } from '../utils/format'

export default function DebtBreakdown({ city }) {
  const total = getTotalObligations(city)
  const segments = [
    { label: 'Bonded Debt', value: city.debt.bondedDebt, color: city.color },
    { label: 'Unfunded Pension', value: city.debt.unfundedPension, color: '#EF4444' },
    { label: 'OPEB', value: city.debt.opeb, color: '#F59E0B' },
    { label: 'Other Long-Term', value: city.debt.otherLongTerm, color: '#64748B' },
  ]

  return (
    <div>
      <div className="flex h-3 rounded-md overflow-hidden mb-2">
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
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-400">
        {segments.map((s, i) => (
          <span key={i} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-sm inline-block"
              style={{ backgroundColor: s.color }}
            />
            {s.label}: {fmt(s.value)}
          </span>
        ))}
      </div>
    </div>
  )
}
