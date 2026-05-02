import { statusColor, statusLabel } from "@/lib/format";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " +
        statusColor(status)
      }
      data-testid={`status-${status}`}
    >
      {statusLabel(status)}
    </span>
  );
}
