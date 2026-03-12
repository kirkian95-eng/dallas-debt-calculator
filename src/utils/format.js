export function fmt(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}

export function fmtInt(n) {
  return `$${Math.round(n).toLocaleString()}`
}

export function pct(n) {
  return `${n.toFixed(1)}%`
}

export function getTotalObligations(city) {
  return city.debt.bondedDebt + city.debt.unfundedPension + city.debt.opeb + city.debt.otherLongTerm
}

export function getBurdenPerHH(city) {
  return getTotalObligations(city) / city.households
}
