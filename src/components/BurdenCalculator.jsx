import { useState } from 'react'
import { fmt, fmtInt, getTotalObligations } from '../utils/format'

export default function BurdenCalculator({ cities }) {
  const [selectedCity, setSelectedCity] = useState(0)
  const [homeValue, setHomeValue] = useState('')

  const city = cities[selectedCity]
  const total = getTotalObligations(city)
  const assessedValue = Number(homeValue.replace(/[^0-9]/g, '')) || 0
  const shareOfTaxBase = assessedValue / city.taxBase
  const yourBurden = shareOfTaxBase * total

  const breakdown = [
    { label: 'Bonded Debt', value: shareOfTaxBase * city.debt.bondedDebt, color: city.color },
    { label: 'Unfunded Pension', value: shareOfTaxBase * city.debt.unfundedPension, color: '#EF4444' },
    { label: 'OPEB', value: shareOfTaxBase * city.debt.opeb, color: '#F59E0B' },
    { label: 'Other Long-Term', value: shareOfTaxBase * city.debt.otherLongTerm, color: '#64748B' },
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
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 md:p-6">
      <h3 className="font-mono text-sm font-bold text-slate-200 mb-1">
        What's Your Share?
      </h3>
      <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
        Enter your home's assessed value to see your proportional share of your city's total obligations.
        This isn't a bill — it's a measure of fiscal exposure based on your share of the tax base.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(Number(e.target.value))}
          className="bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm font-mono text-slate-200 focus:outline-none focus:border-slate-500"
        >
          {cities.map((c, i) => (
            <option key={i} value={i}>{c.name}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$</span>
          <input
            type="text"
            value={homeValue}
            onChange={handleInput}
            placeholder="350,000"
            className="w-full bg-slate-800 border border-slate-700 rounded-md pl-7 pr-3 py-2 text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-slate-500"
          />
        </div>
      </div>

      {assessedValue > 0 && (
        <div className="animate-in">
          {/* Total burden */}
          <div className="text-center mb-5 py-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
              Your Proportional Share of {city.name}'s Obligations
            </div>
            <div className="font-mono text-3xl md:text-4xl font-extrabold text-red-500">
              {fmtInt(yourBurden)}
            </div>
            <div className="text-[10px] text-slate-600 mt-1">
              Based on ${assessedValue.toLocaleString()} assessed value / {fmt(city.taxBase)} total tax base
            </div>
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-2 gap-3">
            {breakdown.map((item, i) => (
              <div key={i} className="bg-slate-950 border border-slate-800 rounded-md p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</span>
                </div>
                <div className="font-mono text-base font-bold text-slate-200">
                  {fmtInt(item.value)}
                </div>
              </div>
            ))}
          </div>

          {/* Context */}
          <div className="mt-4 text-[10px] text-slate-600 leading-relaxed">
            <strong className="text-slate-500">How to read this:</strong> If {city.name}'s total tax base is {fmt(city.taxBase)} and
            your home is assessed at ${assessedValue.toLocaleString()}, your property represents{' '}
            {(shareOfTaxBase * 100).toFixed(6)}% of the tax base. Applying that share to {fmt(total)} in
            total obligations gives your proportional exposure. This doesn't mean you owe this amount — it's
            the implicit fiscal burden your household bears through future taxes, reduced services, or both.
          </div>
        </div>
      )}
    </div>
  )
}
