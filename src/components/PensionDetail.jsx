import { fmt } from '../utils/format'

function MiniBar({ label, value, color }) {
  return (
    <div className="mb-1.5">
      <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
        <span>{label}</span>
        <span style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            backgroundColor:
              value < 50 ? '#EF4444' : value < 70 ? '#F59E0B' : '#22C55E',
          }}
        />
      </div>
    </div>
  )
}

export { MiniBar }

export default function PensionDetail({ city }) {
  return (
    <div>
      <h3
        className="text-sm font-bold mb-3 font-mono"
        style={{ color: city.color }}
      >
        {city.name} — Pension Plans
      </h3>
      {city.pensionPlans.map((p, i) => (
        <div key={i} className="mb-2.5">
          <MiniBar
            label={`${p.name} — ${fmt(p.unfunded)} unfunded`}
            value={p.funded}
            color={p.funded < 50 ? '#EF4444' : p.funded < 70 ? '#F59E0B' : '#22C55E'}
          />
        </div>
      ))}
      <div className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800 leading-relaxed">
        {city.notes}
      </div>
    </div>
  )
}
