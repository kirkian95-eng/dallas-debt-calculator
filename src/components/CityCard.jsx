import { fmt, fmtInt, getTotalObligations, getBurdenPerHH } from '../utils/format'
import DebtBreakdown from './DebtBreakdown'

export default function CityCard({ city, isSelected, onClick }) {
  const total = getTotalObligations(city)
  const perHH = getBurdenPerHH(city)

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-lg p-3.5 cursor-pointer transition-all duration-300 border"
      style={{
        background: isSelected
          ? `linear-gradient(135deg, ${city.color}15, ${city.color}08)`
          : '#0F172A',
        borderColor: isSelected ? city.color : '#1E293B',
      }}
    >
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: city.color }} />
      )}

      <div className="flex justify-between items-center mb-2">
        <span className="font-mono font-bold text-[15px]" style={{ color: city.color }}>
          {city.name}
        </span>
        <span className="text-[10px] text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
          {city.creditRatingShort}
        </span>
      </div>

      <div className="flex justify-between mb-1">
        <div>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Obligations</div>
          <div className="font-mono text-lg font-bold text-slate-100">{fmt(total)}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Per Household</div>
          <div className={`font-mono text-lg font-bold ${
            perHH > 20000 ? 'text-red-500' : perHH > 15000 ? 'text-amber-500' : 'text-green-500'
          }`}>
            {fmtInt(perHH)}
          </div>
        </div>
      </div>

      <DebtBreakdown city={city} />
    </div>
  )
}
