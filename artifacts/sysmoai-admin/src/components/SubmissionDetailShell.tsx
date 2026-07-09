import { ReactNode, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Save } from "lucide-react";
import { AdminShell } from "@/components/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusSelect } from "@/components/StatusSelect";
import { formatDate } from "@/lib/format";
import type { SubmissionStatusValue } from "@/lib/format";

export interface SubmissionDetailShellProps {
  title: string;
  backHref: string;
  backLabel: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  data: {
    id: number;
    status: string;
    internalNote?: string | null;
    createdAt: string;
  } | undefined;
  onSave: (next: { status: SubmissionStatusValue; internalNote: string | null }) => Promise<void>;
  isSaving: boolean;
  saveError?: string | null;
  saveSuccess?: boolean;
  fields: Array<{ label: string; value: ReactNode }>;
}

export function SubmissionDetailShell({
  title,
  backHref,
  backLabel,
  isLoading,
  isError,
  errorMessage,
  data,
  onSave,
  isSaving,
  saveError,
  saveSuccess,
  fields,
}: SubmissionDetailShellProps) {
  const [status, setStatus] = useState<SubmissionStatusValue>("new");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (data) {
      setStatus(data.status as SubmissionStatusValue);
      setNote(data.internalNote ?? "");
    }
  }, [data]);

  return (
    <AdminShell
      title={title}
      subtitle={data ? `Received ${formatDate(data.createdAt)}` : undefined}
      actions={
        <Link href={backHref}>
          <a
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            data-testid="link-back"
          >
            <ArrowLeft className="h-4 w-4" /> {backLabel}
          </a>
        </Link>
      }
    >
      {isLoading ? (
        <div className="space-y-3 max-w-3xl">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : isError || !data ? (
        <p className="text-sm text-red-400" data-testid="text-detail-error">
          {errorMessage ?? "Could not load submission."}
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">Submission</CardTitle>
                <StatusBadge status={data.status} />
              </CardHeader>
              <CardContent>
                <dl className="divide-y divide-border">
                  {fields.map((f) => (
                    <div
                      key={f.label}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3"
                    >
                      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                        {f.label}
                      </dt>
                      <dd className="sm:col-span-2 text-sm whitespace-pre-wrap break-words">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-muted-foreground">
                    Status
                  </label>
                  <div className="mt-1.5">
                    <StatusSelect
                      value={status}
                      onChange={setStatus}
                      disabled={isSaving}
                      testId="select-detail-status"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="internal-note"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    Internal note
                  </label>
                  <Textarea
                    id="internal-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Private notes — not visible to the lead."
                    rows={6}
                    disabled={isSaving}
                    data-testid="input-internal-note"
                  />
                </div>
                {saveError && (
                  <p
                    className="text-sm text-red-400"
                    data-testid="text-save-error"
                  >
                    {saveError}
                  </p>
                )}
                {saveSuccess && !saveError && (
                  <p
                    className="text-sm text-emerald-400"
                    data-testid="text-save-success"
                  >
                    Saved.
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={() =>
                    onSave({
                      status,
                      internalNote: note.trim() === "" ? null : note,
                    })
                  }
                  disabled={isSaving}
                  data-testid="button-save"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  {isSaving ? "Saving…" : "Save changes"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
