import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ReferenceLine, Cell, PieChart, Pie
} from 'recharts'
import historical from '../data/historical.json'
import cities from '../data/cities.json'

const CITY_NAMES = ['Dallas', 'Houston', 'San Antonio', 'Fort Worth', 'Austin']
const CITY_COLORS = {
  Dallas: '#DC2626',
  Houston: '#2563EB',
  'San Antonio': '#16A34A',
  'Fort Worth': '#D97706',
  Austin: '#9333EA',
}

const sections = [
  { key: 'pension', label: 'Pension Health' },
  { key: 'adc', label: 'ADC Discipline' },
  { key: 'reserves', label: 'Fund Balance' },
  { key: 'taxbase', label: 'Tax Base' },
  { key: 'taxrate', label: 'Tax Rate' },
  { key: 'debt', label: 'Debt Profile' },
  { key: 'revenue', label: 'Revenue Mix' },
  { key: 'economy', label: 'Economy' },
]

function weightedPensionAvg(cityData) {
  const plans = cityData.pensionFunded
  const planNames = Object.keys(plans)
  return historical.years.map((yr, i) => {
    const vals = planNames.map(p => plans[p][i]).filter(v => v !== null)
    if (vals.length === 0) return null
    return +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1)
  })
}

function weightedAdcAvg(cityData) {
  const plans = cityData.adcFundingPct
  const planNames = Object.keys(plans)
  return historical.years.map((yr, i) => {
    const vals = planNames.map(p => plans[p][i]).filter(v => v !== null)
    if (vals.length === 0) return null
    return +(vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(0)
  })
}

function reserveRatio(cityData) {
  return historical.years.map((yr, i) => {
    const bal = cityData.generalFundBalance[i]
    const exp = cityData.generalFundExpend[i]
    if (bal == null || exp == null) return null
    return +((bal / exp) * 100).toFixed(1)
  })
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
      <h4 className="font-semibold text-slate-800 text-sm">{title}</h4>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5 mb-3">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </div>
  )
}

function CustomTooltip({ active, payload, label, suffix = '', prefix = '' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-md shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-slate-700 mb-1">{label}</p>
      {payload.filter(p => p.value != null).map((p, i) => (
        <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
          <span>{p.name}</span>
          <span className="font-mono font-medium">{prefix}{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}{suffix}</span>
        </p>
      ))}
    </div>
  )
}

function PensionChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = weightedPensionAvg(historical[c])[i]
    })
    return row
  })

  return (
    <ChartCard
      title="Pension Funded Ratio (Weighted Avg)"
      subtitle="Higher is better. 80%+ considered healthy. Weighted average across all plans per city."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis domain={[20, 100]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Line
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
        <span className="inline-block w-2 h-0.5 bg-slate-400"></span>
        80% funded line is the generally accepted "healthy" threshold
      </div>
    </ChartCard>
  )
}

function PensionDetailChart() {
  const [selectedCity, setSelectedCity] = useState('Dallas')
  const plans = historical[selectedCity].pensionFunded
  const planNames = Object.keys(plans)

  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    planNames.forEach(p => { row[p] = plans[p][i] })
    return row
  })

  const planColors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B']

  return (
    <ChartCard
      title="Pension Funded Ratio by Plan"
      subtitle="Individual plan breakdown — some cities have multiple plans with very different health."
    >
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {CITY_NAMES.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCity(c)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
              selectedCity === c
                ? 'text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            style={selectedCity === c ? { backgroundColor: CITY_COLORS[c] } : {}}
          >
            {c}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis domain={[20, 110]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {planNames.map((p, idx) => (
            <Line
              key={p}
              type="monotone"
              dataKey={p}
              stroke={planColors[idx % planColors.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

function AdcChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = weightedAdcAvg(historical[c])[i]
    })
    return row
  })

  return (
    <ChartCard
      title="ADC Funding % (Weighted Avg)"
      subtitle="Actuarially Determined Contribution — 100%+ means city is paying what actuaries say it owes. Below 100% = underfunding."
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.filter(d => d.Dallas != null)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 140]} ticks={[0, 20, 40, 60, 80, 100, 120, 140]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <ReferenceLine y={100} stroke="#DC2626" strokeDasharray="6 3" strokeWidth={1.5} label={{ value: '100% ADC', position: 'right', fontSize: 10, fill: '#DC2626' }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Bar key={c} dataKey={c} fill={CITY_COLORS[c]} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        {CITY_NAMES.map(c => {
          const latest = weightedAdcAvg(historical[c]).filter(v => v != null).slice(-1)[0]
          return (
            <div key={c} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CITY_COLORS[c] }} />
              <span className="text-slate-600">{c}:</span>
              <span className={`font-semibold ${latest >= 100 ? 'text-green-700' : latest >= 85 ? 'text-amber-700' : 'text-red-700'}`}>
                {latest}%
              </span>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}

function ReserveChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = reserveRatio(historical[c])[i]
    })
    return row
  })

  return (
    <ChartCard
      title="Fund Balance as % of Expenditures"
      subtitle="General fund reserves relative to spending. GFOA recommends minimum 16.7% (2 months). Higher = more financial cushion."
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
          <Tooltip content={<CustomTooltip suffix="%" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Area
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              fill={CITY_COLORS[c]}
              fillOpacity={0.08}
              strokeWidth={2}
              connectNulls
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-2 text-xs text-slate-500">
        GFOA recommends a minimum unassigned fund balance of no less than two months (16.7%) of operating expenditures.
      </div>
    </ChartCard>
  )
}

function TaxBaseChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = historical[c].assessedValue[i]
    })
    return row
  })

  return (
    <ChartCard
      title="Assessed Value ($B)"
      subtitle="Total certified assessed/appraised value. Growing tax base = more capacity to service debt."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}B`} />
          <Tooltip content={<CustomTooltip prefix="$" suffix="B" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Line
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

function TaxRateChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = historical[c].taxRate[i] ? +(historical[c].taxRate[i] * 100).toFixed(2) : null
    })
    return row
  })

  return (
    <ChartCard
      title="Property Tax Rate (cents per $100)"
      subtitle="Lower rates with growing revenue indicate efficient tax base growth. Texas has no income tax — property tax is the main lever."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis domain={[40, 90]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}¢`} />
          <Tooltip content={<CustomTooltip suffix="¢" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Line
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

function DebtPerCapitaChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = historical[c].debtPerCapita[i]
    })
    return row
  })

  return (
    <ChartCard
      title="Total Debt Per Capita"
      subtitle="Total outstanding debt divided by population. Includes both tax-supported and revenue-supported debt."
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(1)}K`} />
          <Tooltip content={<CustomTooltip prefix="$" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Line
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

function TotalDebtChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      row[c] = historical[c].totalDebtOutstanding[i]
    })
    return row
  })

  return (
    <ChartCard
      title="Total Debt Outstanding ($B)"
      subtitle="All bonded/financed debt. Houston's large total reflects airport, water/sewer, and convention center revenue bonds."
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${v}B`} />
          <Tooltip content={<CustomTooltip prefix="$" suffix="B" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Bar key={c} dataKey={c} fill={CITY_COLORS[c]} radius={[2, 2, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

function RevenueMixChart() {
  const REVENUE_COLORS = {
    propertyTax: '#3B82F6',
    salesTax: '#10B981',
    franchiseFees: '#F59E0B',
    chargesForServices: '#8B5CF6',
    other: '#94A3B8',
  }
  const REVENUE_LABELS = {
    propertyTax: 'Property Tax',
    salesTax: 'Sales Tax',
    franchiseFees: 'Franchise Fees',
    chargesForServices: 'Charges for Services',
    other: 'Other',
  }

  return (
    <ChartCard
      title="General Fund Revenue Mix"
      subtitle="Revenue diversification matters — over-reliance on any single source increases vulnerability. S&P views diverse revenue positively."
    >
      <div className="space-y-3">
        {CITY_NAMES.map(c => {
          const mix = historical[c].revenueMix
          return (
            <div key={c}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CITY_COLORS[c] }} />
                <span className="text-xs font-medium text-slate-700">{c}</span>
              </div>
              <div className="flex h-6 rounded overflow-hidden">
                {Object.entries(mix).map(([key, val]) => (
                  <div
                    key={key}
                    style={{ width: `${val}%`, backgroundColor: REVENUE_COLORS[key] }}
                    className="relative group"
                    title={`${REVENUE_LABELS[key]}: ${val}%`}
                  >
                    {val > 12 && (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white">
                        {val}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
        <div className="flex flex-wrap gap-3 mt-3 pt-2 border-t border-slate-100">
          {Object.entries(REVENUE_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: REVENUE_COLORS[key] }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

function EconomyPanel() {
  return (
    <ChartCard
      title="Economic Indicators"
      subtitle="Underlying economic health drives long-term fiscal capacity. Higher income = more taxable activity. Lower unemployment = stable revenue."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 pr-3 font-semibold text-slate-600">City</th>
              <th className="text-right py-2 px-3 font-semibold text-slate-600">Median HH Income</th>
              <th className="text-right py-2 px-3 font-semibold text-slate-600">Unemployment</th>
              <th className="text-right py-2 px-3 font-semibold text-slate-600">Population</th>
              <th className="text-right py-2 px-3 font-semibold text-slate-600">Pop Growth (10yr)</th>
              <th className="text-right py-2 pl-3 font-semibold text-slate-600">Credit Rating</th>
            </tr>
          </thead>
          <tbody>
            {cities.map(c => {
              const h = historical[c.name]
              const pops = h.population.filter(v => v != null)
              const popGrowth = pops.length >= 2
                ? (((pops[pops.length - 1] / pops[0]) - 1) * 100).toFixed(1)
                : null
              return (
                <tr key={c.name} className="border-b border-slate-100">
                  <td className="py-2 pr-3 font-medium text-slate-800">
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: CITY_COLORS[c.name] }} />
                    {c.name}
                  </td>
                  <td className="text-right py-2 px-3 font-mono text-slate-700">
                    ${h.medianHouseholdIncome.toLocaleString()}
                  </td>
                  <td className="text-right py-2 px-3 font-mono text-slate-700">
                    {h.unemploymentRate}%
                  </td>
                  <td className="text-right py-2 px-3 font-mono text-slate-700">
                    {(c.population / 1e6).toFixed(2)}M
                  </td>
                  <td className="text-right py-2 px-3 font-mono">
                    {popGrowth != null && (
                      <span className={+popGrowth > 0 ? 'text-green-700' : 'text-red-700'}>
                        {+popGrowth > 0 ? '+' : ''}{popGrowth}%
                      </span>
                    )}
                  </td>
                  <td className="text-right py-2 pl-3 font-mono text-slate-700">
                    {c.creditRatingShort}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-md p-3">
          <p className="text-xs font-semibold text-slate-700 mb-1">Highest Income</p>
          <p className="text-sm font-mono text-purple-700">Austin — $75,413</p>
          <p className="text-[10px] text-slate-500 mt-0.5">59% higher than Dallas ($47,285)</p>
        </div>
        <div className="bg-slate-50 rounded-md p-3">
          <p className="text-xs font-semibold text-slate-700 mb-1">Fastest Growing</p>
          <p className="text-sm font-mono text-amber-700">Fort Worth — +24.1%</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Crossed 1M population milestone in 2024</p>
        </div>
      </div>
    </ChartCard>
  )
}

function PopulationChart() {
  const data = historical.years.map((yr, i) => {
    const row = { year: yr }
    CITY_NAMES.forEach(c => {
      const pop = historical[c].population[i]
      row[c] = pop ? +(pop / 1e6).toFixed(3) : null
    })
    return row
  })

  return (
    <ChartCard
      title="Population Trends (Millions)"
      subtitle="Growing population supports revenue growth but also increases service demands."
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${v}M`} />
          <Tooltip content={<CustomTooltip suffix="M" />} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {CITY_NAMES.map(c => (
            <Line
              key={c}
              type="monotone"
              dataKey={c}
              stroke={CITY_COLORS[c]}
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}

export default function TrendCharts() {
  const [section, setSection] = useState('pension')

  return (
    <div>
      {/* Section nav */}
      <div className="flex gap-1 justify-center mb-5 flex-wrap">
        {sections.map(s => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${
              section === s.key
                ? 'bg-slate-700 text-white shadow-sm'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {section === 'pension' && (
        <>
          <PensionChart />
          <PensionDetailChart />
        </>
      )}
      {section === 'adc' && <AdcChart />}
      {section === 'reserves' && <ReserveChart />}
      {section === 'taxbase' && (
        <>
          <TaxBaseChart />
          <PopulationChart />
        </>
      )}
      {section === 'taxrate' && <TaxRateChart />}
      {section === 'debt' && (
        <>
          <DebtPerCapitaChart />
          <TotalDebtChart />
        </>
      )}
      {section === 'revenue' && <RevenueMixChart />}
      {section === 'economy' && <EconomyPanel />}
    </div>
  )
}
