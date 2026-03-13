import { fmt } from '../utils/format'

function MiniBar({ label, value }) {
  const barColor = value < 50 ? '#DC2626' : value < 70 ? '#D97706' : '#16A34A'

  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-sm text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-mono font-semibold" style={{ color: barColor }}>{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  )
}

export { MiniBar }

export default function PensionDetail({ city }) {
  return (
    <div>
      <h3 className="text-base font-bold mb-3" style={{ color: city.color }}>
        {city.name} — Pension Plans
      </h3>
      {city.pensionPlans.map((p, i) => (
        <div key={i} className="mb-3">
          <MiniBar
            label={`${p.name} — ${fmt(p.unfunded)} unfunded`}
            value={p.funded}
          />
        </div>
      ))}
      <p className="text-sm text-slate-500 mt-4 pt-3 border-t border-slate-100 leading-relaxed">
        {city.notes}
      </p>
    </div>
  )
}
