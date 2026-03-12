const tabs = [
  { key: 'clock', label: 'Dallas Clock' },
  { key: 'compare', label: 'City Comparison' },
  { key: 'table', label: 'Data Table' },
  { key: 'calculator', label: 'Your Burden' },
]

export default function Nav({ view, setView }) {
  return (
    <div className="flex gap-1 justify-center mb-5 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setView(tab.key)}
          className={`px-4 py-2 rounded-md text-[11px] font-semibold uppercase tracking-wider font-mono transition-all border cursor-pointer ${
            view === tab.key
              ? 'bg-slate-800 text-slate-100 border-slate-600'
              : 'bg-transparent text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
