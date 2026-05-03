import { ReactNode, useState } from "react";
import { Download } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { STATUSES, statusLabel } from "@/lib/format";
import type { SubmissionStatusValue } from "@/lib/format";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

export interface SubmissionListShellProps {
  title: string;
  subtitle: string;
  fetchCsv: () => Promise<string>;
  csvFilename: string;
  status: SubmissionStatusValue | "all";
  onStatusChange: (next: SubmissionStatusValue | "all") => void;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  isEmpty: boolean;
  emptyLabel?: string;
  children: ReactNode;
  testId?: string;
}

export function SubmissionListShell({
  title,
  subtitle,
  fetchCsv,
  csvFilename,
  status,
  onStatusChange,
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyLabel = "No entries yet.",
  children,
  testId,
}: SubmissionListShellProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  async function handleDownload() {
    setDownloading(true);
    setDownloadError(null);
    try {
      const csv = await fetchCsv();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${csvFilename}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(
        err instanceof Error ? err.message : "Could not download CSV.",
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <AdminShell
      title={title}
      subtitle={subtitle}
      actions={
        <div className="flex items-center gap-2">
          <Select
            value={status}
            onValueChange={(v) =>
              onStatusChange(v as SubmissionStatusValue | "all")
            }
          >
            <SelectTrigger
              className="w-[160px]"
              data-testid="select-filter-status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" data-testid="option-filter-all">
                All statuses
              </SelectItem>
              {STATUSES.map((s) => (
                <SelectItem
                  key={s}
                  value={s}
                  data-testid={`option-filter-${s}`}
                >
                  {statusLabel(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={downloading}
            data-testid="button-export-csv"
          >
            <Download className="h-4 w-4 mr-1.5" />
            {downloading ? "Preparing…" : "Export CSV"}
          </Button>
        </div>
      }
    >
      {downloadError && (
        <p
          className="text-sm text-destructive mb-3"
          data-testid="text-export-error"
        >
          {downloadError}
        </p>
      )}
      <Card data-testid={testId ?? "submission-list-card"}>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : isError ? (
            <div className="p-6 text-sm text-destructive" data-testid="text-list-error">
              {errorMessage ?? "Could not load submissions."}
            </div>
          ) : isEmpty ? (
            <div
              className="p-10 text-center text-sm text-muted-foreground"
              data-testid="text-list-empty"
            >
              {emptyLabel}
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Admin: {basePath}/
      </p>
    </AdminShell>
  );
}
