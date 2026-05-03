import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAdminSprintAvailability,
  useUpdateSprintAvailability,
  getGetAdminSprintAvailabilityQueryKey,
  getGetSprintAvailabilityQueryKey,
} from "@workspace/api-client-react";
import { AdminShell } from "@/components/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { describeApiError, formatDate } from "@/lib/format";

export function SprintAvailabilityPage() {
  const qc = useQueryClient();
  const detail = useGetAdminSprintAvailability();
  const update = useUpdateSprintAvailability();

  const [slots, setSlots] = useState("0");
  const [monthLabel, setMonthLabel] = useState("");
  const [nextStartDate, setNextStartDate] = useState("");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (detail.data) {
      setSlots(String(detail.data.slotsAvailable));
      setMonthLabel(detail.data.monthLabel);
      setNextStartDate(detail.data.nextStartDate ?? "");
    }
  }, [detail.data]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaveError(null);
    setSaveSuccess(false);
    const slotsNum = Number(slots);
    if (
      !Number.isInteger(slotsNum) ||
      slotsNum < 0 ||
      slotsNum > 99
    ) {
      setSaveError("Slots must be a whole number between 0 and 99.");
      return;
    }
    if (!monthLabel.trim()) {
      setSaveError("Month label is required (e.g. 'May 2026').");
      return;
    }
    try {
      await update.mutateAsync({
        data: {
          slotsAvailable: slotsNum,
          monthLabel: monthLabel.trim(),
          nextStartDate: nextStartDate.trim() ? nextStartDate.trim() : null,
        },
      });
      setSaveSuccess(true);
      await Promise.all([
        qc.invalidateQueries({
          queryKey: getGetAdminSprintAvailabilityQueryKey(),
        }),
        qc.invalidateQueries({
          queryKey: getGetSprintAvailabilityQueryKey(),
        }),
      ]);
    } catch (err) {
      setSaveError(describeApiError(err, "Could not save changes."));
    }
  }

  const previewWord = Number(slots) === 1 ? "slot" : "slots";
  const previewSuffix = nextStartDate.trim()
    ? ` — next start date: ${nextStartDate.trim()}`
    : "";
  const previewText =
    Number(slots) > 0 && monthLabel.trim()
      ? `⚡ Only ${slots} Sprint ${previewWord} available in ${monthLabel.trim()}${previewSuffix}`
      : "(Hidden — set slots > 0 and a month label to display.)";

  return (
    <AdminShell
      title="Sprint availability"
      subtitle="Controls the urgency banner shown on the F-Commerce pages."
    >
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Edit availability</CardTitle>
          </CardHeader>
          <CardContent>
            {detail.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-9 w-full" />
              </div>
            ) : detail.isError ? (
              <p className="text-sm text-red-400" data-testid="text-load-error">
                {describeApiError(detail.error, "Could not load availability.")}
              </p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Slots available
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={99}
                    step={1}
                    value={slots}
                    onChange={(e) =>
                      setSlots(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    data-testid="input-slots"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Month label
                  </label>
                  <input
                    type="text"
                    value={monthLabel}
                    placeholder="e.g. May 2026"
                    maxLength={50}
                    onChange={(e) => setMonthLabel(e.target.value)}
                    data-testid="input-month-label"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Next start date{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={nextStartDate}
                    placeholder="e.g. May 19"
                    maxLength={50}
                    onChange={(e) => setNextStartDate(e.target.value)}
                    data-testid="input-next-start-date"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
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
                {saveSuccess && (
                  <p
                    className="text-sm text-emerald-300"
                    data-testid="text-save-success"
                  >
                    Saved. The public site will pick up the change on the next page load (or when an open tab regains focus).
                  </p>
                )}

                <button
                  type="submit"
                  disabled={update.isPending}
                  data-testid="button-save"
                  className="rounded-md bg-blue-700 hover:bg-blue-800 disabled:opacity-50 px-4 py-2 text-sm font-semibold text-white"
                >
                  {update.isPending ? "Saving…" : "Save"}
                </button>

                {detail.data?.updatedAt && (
                  <p className="text-xs text-muted-foreground">
                    Last updated {formatDate(detail.data.updatedAt)}
                  </p>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Live preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className="text-sm font-semibold text-amber-300"
              data-testid="text-preview"
            >
              {previewText}
            </p>
            <p className="text-xs text-muted-foreground mt-3">
              Set slots to 0 (or clear the month label) to hide the banner
              everywhere it appears on the public site.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
