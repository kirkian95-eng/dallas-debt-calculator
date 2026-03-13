import { useState } from 'react'
import { fmt, fmtInt, getTotalObligations, getBurdenPerHH } from '../utils/format'

const columns = [
  { key: 'name', label: 'City', align: 'left' },
  { key: 'total', label: 'Total Obligations', align: 'right' },
  { key: 'perHH', label: 'Per Household', align: 'right' },
  { key: 'pension', label: 'Unfunded Pension', align: 'right' },
  { key: 'pensionPct', label: 'Pension Funded %', align: 'right' },
  { key: 'tia', label: 'TIA Grade', align: 'right' },
  { key: 'credit', label: 'Credit Rating', align: 'right' },
]

function getSortValue(city, key) {
  switch (key) {
    case 'name': return city.name
    case 'total': return getTotalObligations(city)
    case 'perHH': return getBurdenPerHH(city)
    case 'pension': return city.debt.unfundedPension
    case 'pensionPct': return city.pensionFundedPct
    case 'tia': return city.tia.grade
    case 'credit': return city.creditRatingShort
    default: return 0
  }
}

export default function DataTable({ cities }) {
  const [sortKey, setSortKey] = useState('perHH')
  const [sortAsc, setSortAsc] = useState(false)

  function handleSort(key) {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(key === 'name')
    }
  }

  const sorted = [...cities].sort((a, b) => {
    const va = getSortValue(a, sortKey)
    const vb = getSortValue(b, sortKey)
    const cmp = typeof va === 'string' ? va.localeCompare(vb) : va - vb
    return sortAsc ? cmp : -cmp
  })

  function exportCSV() {
    const header = 'City,Total Obligations,Per Household,Unfunded Pension,Pension Funded %,TIA Grade,Credit Rating\n'
    const rows = sorted.map(c =>
      `${c.name},${getTotalObligations(c)},${Math.round(getBurdenPerHH(c))},${c.debt.unfundedPension},${c.pensionFundedPct}%,${c.tia.grade},"${c.creditRatingShort}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dallas-fiscal-clock-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold text-slate-800">Comparison Data</h3>
        <button
          onClick={exportCSV}
          className="text-xs text-slate-500 border border-slate-200 rounded-md px-3 py-1.5 hover:bg-slate-50 hover:text-slate-700 transition-colors cursor-pointer"
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`py-2.5 px-2 text-xs text-slate-500 uppercase tracking-wide font-semibold cursor-pointer hover:text-slate-700 transition-colors select-none ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.label}
                  {sortKey === col.key && (
                    <span className="ml-1">{sortAsc ? '\u25B2' : '\u25BC'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((c, i) => {
              const perHH = getBurdenPerHH(c)
              return (
                <tr key={i} className="border-b border-slate-100 text-slate-700 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-2 font-semibold" style={{ color: c.color }}>
                    {c.name}
                  </td>
                  <td className="py-3 px-2 text-right font-mono">{fmt(getTotalObligations(c))}</td>
                  <td className={`py-3 px-2 text-right font-mono font-semibold ${
                    perHH > 25000 ? 'text-red-700' : perHH > 18000 ? 'text-amber-700' : 'text-slate-700'
                  }`}>
                    {fmtInt(perHH)}
                  </td>
                  <td className="py-3 px-2 text-right font-mono">{fmt(c.debt.unfundedPension)}</td>
                  <td className={`py-3 px-2 text-right font-mono font-semibold ${
                    c.pensionFundedPct < 50 ? 'text-red-700' : c.pensionFundedPct < 70 ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {c.pensionFundedPct}%
                  </td>
                  <td className={`py-3 px-2 text-right font-semibold ${
                    c.tia.grade === 'D' ? 'text-red-700' : c.tia.grade === 'C' ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {c.tia.grade}
                  </td>
                  <td className="py-3 px-2 text-right text-xs text-slate-500 font-mono">
                    {c.creditRatingShort}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
