import sources from '../data/sources.json'

export default function MethodologyPanel() {
  return (
    <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed">
      <div className="font-bold text-slate-400 mb-2 text-[11px] uppercase tracking-wider">
        Methodology & Sources
      </div>

      <p className="mb-2">
        <strong className="text-slate-400">"Total Obligations"</strong> = outstanding bonded debt
        (GO + revenue + COs + pension obligation bonds) + net pension liability (NPL, per GASB 68)
        + net OPEB liability (per GASB 75) + other long-term obligations. This is the broadest measure
        of what taxpayers are on the hook for, including obligations that do not appear in the city's
        annual operating budget.
      </p>

      <p className="mb-2">
        <strong className="text-slate-400">"Burden Per Household"</strong> divides total obligations
        by ACS-estimated households in the city proper. This is the implicit share of city obligations
        borne by each household — not a bill, but a measure of fiscal exposure.
      </p>

      <p className="mb-2">
        <strong className="text-slate-400">"TIA Taxpayer Burden"</strong> is from Truth in Accounting's
        FY2023 analysis, which uses a different methodology focused on the shortfall between available
        assets and total bills owed. TIA divides this shortfall by the number of taxpayers (not
        households). The two per-household figures therefore differ.
      </p>

      <p className="mb-2">
        <strong className="text-slate-400">Tax-Supported vs. Revenue-Supported:</strong> San Antonio's
        total includes ~$7B in CPS Energy revenue bonds (paid from electric bills, not taxes). Austin
        Energy and Houston's airport/water bonds are similar. These inflate raw totals but don't directly
        burden property taxpayers. The dashboard shows gross totals; users should note these caveats.
      </p>

      <p className="mb-2">
        <strong className="text-slate-400">The Ticking Counter:</strong> Dallas accrues ~$160M/year in
        debt interest and ~$150-200M/year in pension underfunding (ADC shortfall), totaling ~$10-11/second.
        This is an approximation for illustrative purposes.
      </p>

      {/* Sources */}
      <details className="mt-3">
        <summary className="text-slate-400 font-semibold cursor-pointer hover:text-slate-300 transition-colors">
          View All Sources ({sources.length})
        </summary>
        <ol className="mt-2 space-y-1.5 list-decimal list-inside">
          {sources.map((s) => (
            <li key={s.id} className="text-slate-500">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2"
                >
                  {s.title}
                </a>
              ) : (
                <span className="text-slate-400">{s.title}</span>
              )}
              {' — '}{s.description}
            </li>
          ))}
        </ol>
      </details>

      <p className="mt-3 text-red-500/50">
        Note: All figures are estimates compiled from the most recent publicly available data
        (FY2022-FY2024 depending on source). Measurement dates vary. Pension NPL figures are
        sensitive to discount rate and actuarial assumptions. This dashboard is for informational
        purposes and does not constitute financial advice.
      </p>
    </div>
  )
}
