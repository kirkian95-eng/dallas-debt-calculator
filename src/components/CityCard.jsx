import { fmt, fmtInt, getTotalObligations, getBurdenPerHH } from '../utils/format'
import DebtBreakdown from './DebtBreakdown'

export default function CityCard({ city, isSelected, onClick }) {
  const total = getTotalObligations(city)
  const perHH = getBurdenPerHH(city)

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-lg p-4 cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-white border-slate-300 shadow-md'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-lg" style={{ background: city.color }} />
      )}

      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-base" style={{ color: city.color }}>
          {city.name}
        </span>
        <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded font-mono">
          {city.creditRatingShort}
        </span>
      </div>

      <div className="flex justify-between mb-2">
        <div>
          <div className="text-xs text-slate-500">Total Obligations</div>
          <div className="font-mono text-lg font-bold text-slate-800">{fmt(total)}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Per Household</div>
          <div className={`font-mono text-lg font-bold ${
            perHH > 25000 ? 'text-red-700' : perHH > 18000 ? 'text-amber-700' : 'text-emerald-700'
          }`}>
            {fmtInt(perHH)}
          </div>
        </div>
      </div>

      <DebtBreakdown city={city} />
    </div>
  )
}
