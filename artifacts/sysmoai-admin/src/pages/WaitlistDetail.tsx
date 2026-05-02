import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetWaitlistSignup,
  useUpdateWaitlistSignup,
  getGetWaitlistSignupQueryKey,
  getListWaitlistSignupsQueryKey,
  getGetAdminSummaryQueryKey,
} from "@workspace/api-client-react";
import { SubmissionDetailShell } from "@/components/SubmissionDetailShell";
import { describeApiError } from "@/lib/format";

export function WaitlistDetailPage({ id }: { id: number }) {
  const qc = useQueryClient();
  const detail = useGetWaitlistSignup(id);
  const update = useUpdateWaitlistSignup();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  return (
    <SubmissionDetailShell
      title={`Waitlist #${id}`}
      backHref="/waitlist"
      backLabel="All waitlist"
      isLoading={detail.isLoading}
      isError={detail.isError}
      errorMessage={describeApiError(detail.error)}
      data={detail.data}
      onSave={async ({ status, internalNote }) => {
        setSaveError(null);
        setSaveSuccess(false);
        try {
          await update.mutateAsync({
            id,
            data: { status, internalNote },
          });
          setSaveSuccess(true);
          await Promise.all([
            qc.invalidateQueries({
              queryKey: getGetWaitlistSignupQueryKey(id),
            }),
            qc.invalidateQueries({
              queryKey: getListWaitlistSignupsQueryKey(),
            }),
            qc.invalidateQueries({ queryKey: getGetAdminSummaryQueryKey() }),
          ]);
        } catch (err) {
          setSaveError(describeApiError(err, "Could not save changes."));
        }
      }}
      isSaving={update.isPending}
      saveError={saveError}
      saveSuccess={saveSuccess}
      fields={
        detail.data
          ? [
              { label: "Email", value: detail.data.email },
              { label: "Name", value: detail.data.name ?? "—" },
              { label: "Source", value: detail.data.source ?? "—" },
            ]
          : []
      }
    />
  );
}
