import { useState } from 'react'
import CityCard from './CityCard'
import PensionDetail from './PensionDetail'

export default function ComparisonGrid({ cities }) {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {cities.map((city, i) => (
          <CityCard
            key={i}
            city={city}
            isSelected={selected === i}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>

      <div
        className="mt-4 bg-slate-900 rounded-lg p-5 border animate-in"
        style={{ borderColor: `${cities[selected].color}33` }}
      >
        <PensionDetail city={cities[selected]} />
      </div>
    </div>
  )
}
