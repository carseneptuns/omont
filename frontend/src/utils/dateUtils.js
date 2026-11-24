const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** e.g. "sep.03.2026" — used in the paper header */
export function stampDate(date = new Date()) {
  const d = new Date(date);
  const month = MONTHS[d.getMonth()];
  const day = String(d.getDate()).padStart(2, "0");
  return `${month}.${day}.${d.getFullYear()}`;
}

/** e.g. "03 Sep 2026" — used on memory cards */
export function shortDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = MONTHS[d.getMonth()];
  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)} ${d.getFullYear()}`;
}

/** e.g. "03 September 2026" */
export function longDate(date = new Date()) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`;
}
