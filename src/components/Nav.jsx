const tabs = [
  { key: 'clock', label: 'Dallas Clock' },
  { key: 'compare', label: 'City Comparison' },
  { key: 'trends', label: 'Trends' },
  { key: 'table', label: 'Data Table' },
  { key: 'calculator', label: 'Your Burden' },
  { key: 'resources', label: 'Resources' },
]

export default function Nav({ view, setView }) {
  return (
    <div className="flex gap-1.5 justify-center mb-6 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setView(tab.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
            view === tab.key
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
