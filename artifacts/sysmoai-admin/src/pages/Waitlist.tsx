import { useState } from "react";
import { Link } from "wouter";
import {
  useListWaitlistSignups,
  exportWaitlistSignups,
  type ListWaitlistSignupsParams,
} from "@workspace/api-client-react";
import { SubmissionListShell } from "@/components/SubmissionListShell";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, describeApiError } from "@/lib/format";
import type { SubmissionStatusValue } from "@/lib/format";
import { Pagination } from "@/components/Pagination";

export function WaitlistPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<SubmissionStatusValue | "all">("all");

  const params: ListWaitlistSignupsParams = {
    page,
    pageSize: 25,
    ...(status !== "all" ? { status } : {}),
  };
  const list = useListWaitlistSignups(params);

  const items = list.data?.items ?? [];
  const pg = list.data?.pagination;

  return (
    <SubmissionListShell
      title="Waitlist signups"
      subtitle="People who want early access to upcoming SYSmoAI products."
      fetchCsv={() => exportWaitlistSignups()}
      csvFilename="waitlist-signups"
      status={status}
      onStatusChange={(s) => {
        setStatus(s);
        setPage(1);
      }}
      isLoading={list.isLoading}
      isError={list.isError}
      errorMessage={describeApiError(list.error)}
      isEmpty={!list.isLoading && items.length === 0}
      emptyLabel="No waitlist signups match this filter yet."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover-elevate"
                data-testid={`row-waitlist-${row.id}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDate(row.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">{row.email}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.source ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/waitlist/${row.id}`}>
                    <a
                      className="text-accent hover:underline text-xs"
                      data-testid={`link-waitlist-${row.id}`}
                    >
                      View
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pg && pg.totalPages > 1 && (
        <Pagination
          page={pg.page}
          totalPages={pg.totalPages}
          onPageChange={setPage}
        />
      )}
    </SubmissionListShell>
  );
}
