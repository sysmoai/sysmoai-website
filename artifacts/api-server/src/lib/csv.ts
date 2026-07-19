/**
 * Prevents CSV injection (a.k.a. formula injection) by prefixing cells that
 * start with a dangerous character with a single quote. Excel, LibreOffice,
 * and Google Sheets will treat the cell as text rather than executing a formula.
 */
const CSV_DANGEROUS_PREFIX = /^[=+\-@\t\r]/;

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let str: string;
  if (value instanceof Date) {
    str = value.toISOString();
  } else if (typeof value === "object") {
    str = JSON.stringify(value);
  } else {
    str = String(value);
  }
  // CSV injection guard — prefix dangerous leading characters with a single quote
  if (CSV_DANGEROUS_PREFIX.test(str)) {
    str = "'" + str;
  }
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function rowsToCsv(
  headers: readonly string[],
  rows: readonly Record<string, unknown>[],
): string {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escapeCell(row[h])).join(","));
  }
  return lines.join("\n") + "\n";
}
