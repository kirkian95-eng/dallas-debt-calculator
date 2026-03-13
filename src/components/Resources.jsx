const resources = [
  {
    category: 'Government Data',
    icon: '🏛',
    items: [
      { name: 'TX Bond Review Board', url: 'https://www.brb.texas.gov/local-government/', tag: 'Debt data', desc: 'Definitive source for all TX local government debt — bonded, tax-supported vs. revenue-supported, per-capita.' },
      { name: 'TX Comptroller', url: 'https://comptroller.texas.gov/transparency/', tag: 'Tax & fiscal', desc: 'Property tax data, sales tax collections, and fiscal analysis for every TX local government.' },
      { name: 'Dallas ACFR', url: 'https://dallascityhall.com/departments/budget/Pages/annual-comprehensive-financial-report.aspx', tag: 'Audited financials' },
      { name: 'Houston ACFR', url: 'https://www.houstontx.gov/controller/cafr.html', tag: 'Audited financials' },
      { name: 'San Antonio ACFR', url: 'https://www.sa.gov/Directory/Departments/Finance/Financial-Reports', tag: 'Audited financials' },
      { name: 'Fort Worth ACFR', url: 'https://www.fortworthtexas.gov/departments/finance/financial-reporting', tag: 'Audited financials' },
      { name: 'Austin ACFR', url: 'https://www.austintexas.gov/page/financial-reports', tag: 'Audited financials' },
    ],
  },
  {
    category: 'Pension Systems',
    icon: '📊',
    items: [
      { name: 'Dallas Police & Fire (DPFP)', url: 'https://www.dpfp.org/', tag: '34% funded', desc: 'One of the worst-funded large municipal plans in the U.S. Actuarial valuations and board minutes.' },
      { name: 'Dallas ERF', url: 'https://www.dfrb.org/', tag: '67% funded', desc: 'Civilian employee plan. Nov 2024 voters approved reforms phasing in full ADC over 5 years.' },
      { name: 'TX Municipal Retirement (TMRS)', url: 'https://www.tmrs.com/', tag: 'SA & 900+ cities', desc: 'State-administered plan that requires 100% ADC — a key reason San Antonio has strong pension health.' },
      { name: 'Fort Worth (FWERP)', url: 'https://www.fwerp.org/', tag: '57% funded', desc: 'City has never fully funded its ADC. Persistent $25-38M annual shortfall.' },
      { name: 'Austin (COAERS)', url: 'https://www.coaers.org/', tag: '58% funded', desc: 'Largest Austin plan. SB 1444 reformed contributions to ADC-based model.' },
    ],
  },
  {
    category: 'Think Tanks & Research',
    icon: '🔬',
    items: [
      { name: 'Truth in Accounting', url: 'https://www.truthinaccounting.org/', tag: 'City fiscal grades', desc: 'Grades 75 largest U.S. cities. Dallas, Houston, Austin all got "D" in 2023.' },
      { name: 'TX Public Policy Foundation', url: 'https://www.texaspolicy.com/', tag: 'TX debt tracking', desc: 'Tracks total TX local government debt ($552B as of FY2025) and pension obligations.' },
      { name: 'Reason Foundation', url: 'https://reason.org/topics/pension-reform/', tag: 'Pension reform', desc: 'Detailed analyses of Houston\'s 2017 reform and Dallas DPFP crisis.' },
      { name: 'Mercatus Center', url: 'https://www.mercatus.org/research/policy-briefs/ranking-states-fiscal-condition', tag: 'Fiscal rankings', desc: 'George Mason University. Ranks all 50 states on fiscal health using ACFR data.' },
      { name: 'Equable Institute', url: 'https://equable.org/state-of-pensions/', tag: 'Pension data', desc: 'Annual U.S. public pension funded status report with downloadable datasets.' },
    ],
  },
  {
    category: 'Credit Ratings',
    icon: '📈',
    items: [
      { name: 'S&P Global', url: 'https://www.spglobal.com/ratings/en/sector/public-finance/us-state-local-government', tag: 'Dallas: AA-' },
      { name: "Moody's", url: 'https://ratings.moodys.com/', tag: 'Dallas: A1', desc: 'Revised Dallas outlook to negative Nov 2024 citing pension underfunding.' },
      { name: 'Fitch Ratings', url: 'https://www.fitchratings.com/public-finance/us-public-finance', tag: 'Dallas: AA', desc: 'Upgraded Austin GO to AAA Sept 2025 despite pension challenges.' },
      { name: 'KBRA', url: 'https://www.kbra.com/sector/public-finance', tag: 'Dallas: AA+' },
    ],
  },
  {
    category: 'Journalism',
    icon: '📰',
    items: [
      { name: 'The Texas Tribune', url: 'https://www.texastribune.org/', tag: 'Investigative' },
      { name: 'Dallas Morning News', url: 'https://www.dallasnews.com/topic/city-hall/', tag: 'City Hall beat' },
      { name: 'The Bond Buyer', url: 'https://www.bondbuyer.com/', tag: 'Muni bond market', desc: 'Trade publication covering municipal debt issuances and credit developments.' },
      { name: 'Governing', url: 'https://www.governing.com/', tag: 'State & local gov' },
    ],
  },
  {
    category: 'Standards & Academia',
    icon: '🎓',
    items: [
      { name: 'GASB', url: 'https://www.gasb.org/', tag: 'Accounting standards', desc: 'Sets GASB 68 (pensions) and GASB 75 (OPEB) — the rules for how cities report obligations.' },
      { name: 'GFOA', url: 'https://www.gfoa.org/', tag: 'Best practices', desc: 'Sets the 16.7% minimum fund balance recommendation used in our reserve ratio chart.' },
      { name: 'LBJ School — Municipal Markets', url: 'https://lbj.utexas.edu/cmcm', tag: 'UT Austin research' },
    ],
  },
]

export default function Resources() {
  return (
    <div>
      <p className="text-sm text-slate-600 mb-5 leading-relaxed">
        Primary sources, research organizations, and analytical tools for Texas municipal fiscal health.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((section) => (
          <div key={section.category} className="bg-white rounded-lg border border-slate-200 p-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
              <span className="mr-1.5">{section.icon}</span>{section.category}
            </h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-md px-3 py-2 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-700 group-hover:text-blue-800 leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 group-hover:text-blue-500 whitespace-nowrap">
                      {item.tag}
                    </span>
                  </span>
                  {item.desc && (
                    <span className="block text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {item.desc}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
