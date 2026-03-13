import sources from '../data/sources.json'

export default function MethodologyPanel() {
  return (
    <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500 leading-relaxed">
      <h3 className="font-bold text-slate-700 mb-3 text-base">
        Methodology &amp; Sources
      </h3>

      <p className="mb-3">
        <strong className="text-slate-600">"Total Obligations"</strong> = outstanding bonded debt
        (GO + revenue + COs + pension obligation bonds) + net pension liability (NPL, per GASB 68)
        + net OPEB liability (per GASB 75) + other long-term obligations. This is the broadest measure
        of what taxpayers are on the hook for, including obligations that do not appear in the city's
        annual operating budget.
      </p>

      <p className="mb-3">
        <strong className="text-slate-600">"Burden Per Household"</strong> divides total obligations
        by ACS-estimated households in the city proper. This is the implicit share of city obligations
        borne by each household — not a bill, but a measure of fiscal exposure.
      </p>

      <p className="mb-3">
        <strong className="text-slate-600">"TIA Taxpayer Burden"</strong> is from Truth in Accounting's
        FY2023 analysis, which uses a different methodology focused on the shortfall between available
        assets and total bills owed. TIA divides this shortfall by the number of taxpayers (not
        households). The two per-household figures therefore differ.
      </p>

      <p className="mb-3">
        <strong className="text-slate-600">Tax-Supported vs. Revenue-Supported:</strong> San Antonio's
        total includes ~$7B in CPS Energy revenue bonds (paid from electric bills, not taxes). Austin
        Energy and Houston's airport/water bonds are similar. These inflate raw totals but don't directly
        burden property taxpayers. The dashboard shows gross totals; users should note these caveats.
      </p>

      <p className="mb-3">
        <strong className="text-slate-600">The Ticking Counter:</strong> Dallas accrues ~$160M/year in
        debt interest and ~$150-200M/year in pension underfunding (ADC shortfall), totaling ~$10-11/second.
        This is an approximation for illustrative purposes.
      </p>

      {/* Sources */}
      <details className="mt-4">
        <summary className="text-slate-600 font-semibold cursor-pointer hover:text-slate-800 transition-colors">
          View All Sources ({sources.length})
        </summary>
        <ol className="mt-3 space-y-2 list-decimal list-inside text-sm">
          {sources.map((s) => (
            <li key={s.id} className="text-slate-500">
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-2"
                >
                  {s.title}
                </a>
              ) : (
                <span className="text-slate-600">{s.title}</span>
              )}
              {' — '}{s.description}
            </li>
          ))}
        </ol>
      </details>

      <p className="mt-4 text-slate-400 text-xs leading-relaxed">
        Note: All figures are estimates compiled from the most recent publicly available data
        (FY2022-FY2024 depending on source). Measurement dates vary. Pension NPL figures are
        sensitive to discount rate and actuarial assumptions. This dashboard is for informational
        purposes and does not constitute financial advice.
      </p>
    </div>
  )
}
