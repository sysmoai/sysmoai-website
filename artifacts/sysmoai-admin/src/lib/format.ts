export const STATUSES = ["new", "contacted", "archived"] as const;
export type SubmissionStatusValue = (typeof STATUSES)[number];

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export function statusLabel(status: string): string {
  switch (status) {
    case "new":
      return "New";
    case "contacted":
      return "Contacted";
    case "archived":
      return "Archived";
    default:
      return status;
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case "new":
      return "bg-blue-500/15 text-blue-700 border border-blue-500/30 dark:text-blue-300";
    case "contacted":
      return "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 dark:text-emerald-300";
    case "archived":
      return "bg-zinc-500/15 text-zinc-700 border border-zinc-500/30 dark:text-zinc-300";
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
}

export function describeApiError(err: unknown, fallback = "Something went wrong."): string {
  if (err instanceof Error) {
    if (err.message) return err.message;
  }
  return fallback;
}
