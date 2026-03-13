import { useState } from 'react'
import { fmt, fmtInt, getTotalObligations } from '../utils/format'
import { COLORS } from './DebtBreakdown'

export default function BurdenCalculator({ cities }) {
  const [selectedCity, setSelectedCity] = useState(0)
  const [homeValue, setHomeValue] = useState('')

  const city = cities[selectedCity]
  const total = getTotalObligations(city)
  const assessedValue = Number(homeValue.replace(/[^0-9]/g, '')) || 0
  const shareOfTaxBase = assessedValue / city.taxBase
  const yourBurden = shareOfTaxBase * total

  const breakdown = [
    { label: 'Bonded Debt', value: shareOfTaxBase * city.debt.bondedDebt, color: COLORS.bondedDebt },
    { label: 'Unfunded Pension', value: shareOfTaxBase * city.debt.unfundedPension, color: COLORS.unfundedPension },
    { label: 'OPEB', value: shareOfTaxBase * city.debt.opeb, color: COLORS.opeb },
    { label: 'Other Long-Term', value: shareOfTaxBase * city.debt.otherLongTerm, color: COLORS.otherLongTerm },
  ]

  function handleInput(e) {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      setHomeValue('')
      return
    }
    setHomeValue(Number(raw).toLocaleString())
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 md:p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-1">
        What's Your Share?
      </h3>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed">
        Enter your home's assessed value to see your proportional share of your city's total obligations.
        This isn't a bill — it's a measure of fiscal exposure based on your share of the tax base.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(Number(e.target.value))}
          className="bg-white border border-slate-300 rounded-md px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          {cities.map((c, i) => (
            <option key={i} value={i}>{c.name}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
          <input
            type="text"
            value={homeValue}
            onChange={handleInput}
            placeholder="350,000"
            className="w-full bg-white border border-slate-300 rounded-md pl-7 pr-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
      </div>

      {assessedValue > 0 && (
        <div className="animate-in">
          {/* Total burden */}
          <div className="text-center mb-5 py-5 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1.5">
              Your Proportional Share of {city.name}'s Obligations
            </div>
            <div className="font-mono text-3xl md:text-4xl font-bold text-slate-900">
              {fmtInt(yourBurden)}
            </div>
            <div className="text-sm text-slate-400 mt-1.5">
              Based on ${assessedValue.toLocaleString()} assessed value / {fmt(city.taxBase)} total tax base
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            {breakdown.map((item, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-3.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-slate-500">{item.label}</span>
                </div>
                <div className="font-mono text-lg font-bold text-slate-800">
                  {fmtInt(item.value)}
                </div>
              </div>
            ))}
          </div>

          {/* Context */}
          <p className="mt-4 text-sm text-slate-500 leading-relaxed">
            <strong className="text-slate-600">How to read this:</strong> If {city.name}'s total tax base is {fmt(city.taxBase)} and
            your home is assessed at ${assessedValue.toLocaleString()}, your property represents{' '}
            {(shareOfTaxBase * 100).toFixed(6)}% of the tax base. Applying that share to {fmt(total)} in
            total obligations gives your proportional exposure. This doesn't mean you owe this amount — it's
            the implicit fiscal burden your household bears through future taxes, reduced services, or both.
          </p>
        </div>
      )}
    </div>
  )
}
