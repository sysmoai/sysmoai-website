import { useState } from "react";
import { Link } from "wouter";
import {
  useListAuditRequests,
  exportAuditRequests,
  type ListAuditRequestsParams,
} from "@workspace/api-client-react";
import { SubmissionListShell } from "@/components/SubmissionListShell";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, describeApiError } from "@/lib/format";
import type { SubmissionStatusValue } from "@/lib/format";
import { Pagination } from "@/components/Pagination";

export function AuditsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<SubmissionStatusValue | "all">("all");

  const params: ListAuditRequestsParams = {
    page,
    pageSize: 25,
    ...(status !== "all" ? { status } : {}),
  };
  const list = useListAuditRequests(params);

  const items = list.data?.items ?? [];
  const pg = list.data?.pagination;

  return (
    <SubmissionListShell
      title="Free audit requests"
      subtitle="Founders booking the 30-minute AI audit."
      fetchCsv={() => exportAuditRequests()}
      csvFilename="audit-requests"
      status={status}
      onStatusChange={(s) => {
        setStatus(s);
        setPage(1);
      }}
      isLoading={list.isLoading}
      isError={list.isError}
      errorMessage={describeApiError(list.error)}
      isEmpty={!list.isLoading && items.length === 0}
      emptyLabel="No audit requests match this filter yet."
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Received</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover-elevate"
                data-testid={`row-audit-${row.id}`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                  {formatDate(row.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {row.company ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/audits/${row.id}`}>
                    <a
                      className="text-accent hover:underline text-xs"
                      data-testid={`link-audit-${row.id}`}
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
