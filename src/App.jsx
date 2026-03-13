import { useState } from 'react'
import cities from './data/cities.json'
import Nav from './components/Nav'
import Clock from './components/Clock'
import ComparisonGrid from './components/ComparisonGrid'
import DataTable from './components/DataTable'
import TrendCharts from './components/TrendCharts'
import BurdenCalculator from './components/BurdenCalculator'
import Resources from './components/Resources'
import MethodologyPanel from './components/MethodologyPanel'

export default function App() {
  const [view, setView] = useState('clock')
  const dallas = cities[0]

  return (
    <div className="font-sans bg-slate-50 text-slate-800 min-h-screen px-4 py-6 md:py-8">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Dallas Fiscal Clock
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed max-w-xl mx-auto">
            Total obligations of the City of Dallas and peer Texas cities.
            Compiled from ACFRs, credit agency reports, Texas Bond Review Board &amp; Truth in Accounting.
          </p>
        </div>

        <Nav view={view} setView={setView} />

        {view === 'clock' && <Clock city={dallas} />}
        {view === 'compare' && <ComparisonGrid cities={cities} />}
        {view === 'trends' && <TrendCharts />}
        {view === 'table' && <DataTable cities={cities} />}
        {view === 'calculator' && <BurdenCalculator cities={cities} />}
        {view === 'resources' && <Resources />}

        <MethodologyPanel />
      </div>
    </div>
  )
}
