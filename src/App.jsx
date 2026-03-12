import { useState } from 'react'
import cities from './data/cities.json'
import Nav from './components/Nav'
import Clock from './components/Clock'
import ComparisonGrid from './components/ComparisonGrid'
import DataTable from './components/DataTable'
import BurdenCalculator from './components/BurdenCalculator'
import MethodologyPanel from './components/MethodologyPanel'

export default function App() {
  const [view, setView] = useState('clock')
  const dallas = cities[0]

  return (
    <div className="font-mono bg-[#0A0E1A] text-slate-200 min-h-screen px-4 py-5">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-[clamp(18px,4vw,26px)] font-extrabold text-slate-100 tracking-tight">
            DALLAS FISCAL CLOCK
          </h1>
          <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Total obligations of the City of Dallas and peer Texas cities
            <br />
            Compiled from ACFRs, credit agency reports, Texas Bond Review Board & Truth in Accounting
          </div>
        </div>

        <Nav view={view} setView={setView} />

        {view === 'clock' && <Clock city={dallas} />}
        {view === 'compare' && <ComparisonGrid cities={cities} />}
        {view === 'table' && <DataTable cities={cities} />}
        {view === 'calculator' && <BurdenCalculator cities={cities} />}

        <MethodologyPanel />
      </div>
    </div>
  )
}
