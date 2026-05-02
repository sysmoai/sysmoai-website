import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetContactSubmission,
  useUpdateContactSubmission,
  getGetContactSubmissionQueryKey,
  getListContactSubmissionsQueryKey,
  getGetAdminSummaryQueryKey,
} from "@workspace/api-client-react";
import { SubmissionDetailShell } from "@/components/SubmissionDetailShell";
import { describeApiError } from "@/lib/format";

export function ContactDetailPage({ id }: { id: number }) {
  const qc = useQueryClient();
  const detail = useGetContactSubmission(id);
  const update = useUpdateContactSubmission();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  return (
    <SubmissionDetailShell
      title={`Contact #${id}`}
      backHref="/contacts"
      backLabel="All contacts"
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
              queryKey: getGetContactSubmissionQueryKey(id),
            }),
            qc.invalidateQueries({
              queryKey: getListContactSubmissionsQueryKey(),
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
              { label: "Name", value: detail.data.name },
              { label: "Contact", value: detail.data.contact },
              { label: "Service", value: detail.data.service ?? "—" },
              { label: "Message", value: detail.data.message },
            ]
          : []
      }
    />
  );
}
