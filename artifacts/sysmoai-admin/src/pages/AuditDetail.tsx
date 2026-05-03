import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAuditRequest,
  useUpdateAuditRequest,
  getGetAuditRequestQueryKey,
  getListAuditRequestsQueryKey,
  getGetAdminSummaryQueryKey,
} from "@workspace/api-client-react";
import { SubmissionDetailShell } from "@/components/SubmissionDetailShell";
import { describeApiError } from "@/lib/format";

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  f_commerce: "F-Commerce (Facebook selling)",
  service: "Service business",
  agency: "Agency",
  other: "Other",
};

export function AuditDetailPage({ id }: { id: number }) {
  const qc = useQueryClient();
  const detail = useGetAuditRequest(id);
  const update = useUpdateAuditRequest();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const d = detail.data;

  const qualifyingFields = d
    ? [
        {
          label: "Business type",
          value: d.businessType
            ? (BUSINESS_TYPE_LABELS[d.businessType] ?? d.businessType)
            : "—",
        },
        {
          label: "Monthly orders / মাসিক অর্ডার",
          value: d.monthlyOrders ?? "—",
        },
        {
          label: "Daily DM volume / দৈনিক মেসেজ",
          value: d.dailyDmVolume ?? "—",
        },
        {
          label: "Current tools",
          value: d.currentTools ?? "—",
        },
        {
          label: "Uses bKash / Nagad",
          value: d.usesBkashNagad ?? "—",
        },
        {
          label: "Preferred currency",
          value: d.preferredCurrency ?? "—",
        },
      ]
    : [];

  const baseFields = d
    ? [
        { label: "Name", value: d.name },
        { label: "Email", value: d.email },
        { label: "WhatsApp", value: d.whatsapp ?? "—" },
        { label: "Company", value: d.company ?? "—" },
        {
          label: "Biggest challenge",
          value: d.biggestChallenge,
        },
      ]
    : [];

  return (
    <SubmissionDetailShell
      title={`Audit request #${id}`}
      backHref="/audits"
      backLabel="All audits"
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
              queryKey: getGetAuditRequestQueryKey(id),
            }),
            qc.invalidateQueries({
              queryKey: getListAuditRequestsQueryKey(),
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
      fields={[
        ...baseFields,
        ...(qualifyingFields.length > 0
          ? [
              { label: "─── F-Commerce Qualifying Fields ───", value: "" },
              ...qualifyingFields,
            ]
          : []),
      ]}
    />
  );
}
