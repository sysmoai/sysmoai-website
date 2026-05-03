import { useState } from "react";
import { Link } from "wouter";
import { Download, RefreshCw, Loader2, Calendar } from "lucide-react";
import {
  useListScheduledPosts,
  useGetScheduledPostsSummary,
  useSeedScheduledPosts,
  exportScheduledPosts,
  getListScheduledPostsQueryKey,
  getGetScheduledPostsSummaryQueryKey,
  type ListScheduledPostsParams,
  type ScheduledPostStatus,
  type ScheduledPostPlatform,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { AdminShell } from "@/components/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/Pagination";
import { describeApiError } from "@/lib/format";
import {
  PLATFORM_LABELS,
  PLATFORM_VALUES,
  POST_STATUSES,
  formatBdt,
  postStatusColor,
  postStatusLabel,
} from "@/lib/scheduledPosts";

function StatusPill({ status }: { status: ScheduledPostStatus }) {
  return (
    <span
      className={
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium " +
        postStatusColor(status)
      }
      data-testid={`pill-status-${status}`}
    >
      {postStatusLabel(status)}
    </span>
  );
}

function StatCard({
  label,
  value,
  testId,
}: {
  label: string;
  value: number | string;
  testId: string;
}) {
  return (
    <Card data-testid={testId}>
      <CardContent className="p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}

export function ScheduledPostsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ScheduledPostStatus | "all">("all");
  const [platform, setPlatform] = useState<ScheduledPostPlatform | "all">("all");
  const qc = useQueryClient();

  const params: ListScheduledPostsParams = {
    page,
    pageSize: 25,
    ...(status !== "all" ? { status } : {}),
    ...(platform !== "all" ? { platform } : {}),
  };
  const list = useListScheduledPosts(params);
  const summary = useGetScheduledPostsSummary();
  const seed = useSeedScheduledPosts({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getListScheduledPostsQueryKey() });
        qc.invalidateQueries({
          queryKey: getGetScheduledPostsSummaryQueryKey(),
        });
      },
    },
  });

  const items = list.data?.items ?? [];
  const pg = list.data?.pagination;
  const totals = summary.data?.totals;

  const [downloading, setDownloading] = useState(false);
  async function handleDownload() {
    setDownloading(true);
    try {
      const csv = await exportScheduledPosts();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `scheduled-posts-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <AdminShell
      title="Publishing queue"
      subtitle="76-piece content pack — schedule, status and performance."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => seed.mutate()}
            disabled={seed.isPending}
            data-testid="button-seed"
          >
            {seed.isPending ? (
              <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1.5" />
            )}
            {seed.isPending ? "Importing…" : "Import content pack"}
          </Button>
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
      {seed.isError && (
        <p className="text-sm text-destructive mb-3" data-testid="text-seed-error">
          {describeApiError(seed.error, "Could not import content pack.")}
        </p>
      )}
      {seed.isSuccess && seed.data && (
        <p
          className="text-sm text-emerald-600 dark:text-emerald-400 mb-3"
          data-testid="text-seed-success"
        >
          Imported {seed.data.imported} new + refreshed {seed.data.updated} existing of {seed.data.total} pieces.
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <StatCard
          label="Total pieces"
          value={totals?.total ?? "—"}
          testId="stat-total"
        />
        <StatCard
          label="Queued"
          value={totals?.queued ?? "—"}
          testId="stat-queued"
        />
        <StatCard
          label="Posted"
          value={totals?.posted ?? "—"}
          testId="stat-posted"
        />
        <StatCard
          label="Skipped"
          value={totals?.skipped ?? "—"}
          testId="stat-skipped"
        />
        <StatCard
          label="Failed"
          value={totals?.failed ?? "—"}
          testId="stat-failed"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 opacity-70" />
              Up next
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {summary.isLoading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : !summary.data?.upcoming?.length ? (
              <p
                className="p-4 text-sm text-muted-foreground"
                data-testid="text-upcoming-empty"
              >
                Nothing queued. Click <em>Import content pack</em> to seed the queue.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {summary.data.upcoming.map((p) => (
                  <li
                    key={p.id}
                    className="p-3 flex items-start justify-between gap-3 hover-elevate"
                    data-testid={`upcoming-${p.id}`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {formatBdt(p.scheduledFor)} ·{" "}
                        {PLATFORM_LABELS[p.platform]}
                      </p>
                      <p className="text-sm font-medium truncate">{p.title}</p>
                      {p.hookLine && (
                        <p className="text-xs text-muted-foreground truncate">
                          {p.hookLine}
                        </p>
                      )}
                    </div>
                    <Link href={`/scheduled-posts/${p.id}`}>
                      <a
                        className="text-accent hover:underline text-xs whitespace-nowrap"
                        data-testid={`link-upcoming-${p.id}`}
                      >
                        Open
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Impressions</dt>
                <dd className="tabular-nums" data-testid="perf-impressions">
                  {summary.data?.performance.impressions ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Clicks</dt>
                <dd className="tabular-nums" data-testid="perf-clicks">
                  {summary.data?.performance.clicks ?? "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Waitlist signups</dt>
                <dd className="tabular-nums" data-testid="perf-signups">
                  {summary.data?.performance.waitlistSignups ?? "—"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">By platform</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {summary.isLoading ? (
            <div className="p-4">
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                <tr>
                  <th className="px-4 py-2 font-medium">Platform</th>
                  <th className="px-4 py-2 font-medium text-right">Queued</th>
                  <th className="px-4 py-2 font-medium text-right">Posted</th>
                  <th className="px-4 py-2 font-medium text-right">Skipped</th>
                  <th className="px-4 py-2 font-medium text-right">Failed</th>
                  <th className="px-4 py-2 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(summary.data?.byPlatform ?? []).map((p) => (
                  <tr key={p.platform} data-testid={`platform-row-${p.platform}`}>
                    <td className="px-4 py-2">{PLATFORM_LABELS[p.platform]}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.queued}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.posted}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.skipped}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{p.failed}</td>
                    <td className="px-4 py-2 text-right tabular-nums font-medium">
                      {p.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mb-3">
        <Select
          value={status}
          onValueChange={(v) => {
            setStatus(v as ScheduledPostStatus | "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[160px]" data-testid="select-filter-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {POST_STATUSES.map((s) => (
              <SelectItem key={s} value={s} data-testid={`option-status-${s}`}>
                {postStatusLabel(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={platform}
          onValueChange={(v) => {
            setPlatform(v as ScheduledPostPlatform | "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]" data-testid="select-filter-platform">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All platforms</SelectItem>
            {PLATFORM_VALUES.map((p) => (
              <SelectItem key={p} value={p} data-testid={`option-platform-${p}`}>
                {PLATFORM_LABELS[p]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card data-testid="queue-list-card">
        <CardContent className="p-0">
          {list.isLoading ? (
            <div className="p-6 space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : list.isError ? (
            <div className="p-6 text-sm text-destructive" data-testid="text-list-error">
              {describeApiError(list.error)}
            </div>
          ) : items.length === 0 ? (
            <div
              className="p-10 text-center text-sm text-muted-foreground"
              data-testid="text-list-empty"
            >
              No posts match this filter. If the queue is empty entirely, click <em>Import content pack</em> above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/40">
                  <tr>
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">When (BDT)</th>
                    <th className="px-4 py-3 font-medium">Platform</th>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Funnel</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((row) => (
                    <tr
                      key={row.id}
                      className="hover-elevate"
                      data-testid={`row-post-${row.id}`}
                    >
                      <td className="px-4 py-3 text-muted-foreground tabular-nums">
                        {row.sequenceNo}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {formatBdt(row.scheduledFor)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {PLATFORM_LABELS[row.platform]}
                      </td>
                      <td className="px-4 py-3 font-medium max-w-[28rem] truncate">
                        {row.title}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.funnel.replace("_", "→")}
                      </td>
                      <td className="px-4 py-3">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/scheduled-posts/${row.id}`}>
                          <a
                            className="text-accent hover:underline text-xs"
                            data-testid={`link-post-${row.id}`}
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
          )}
        </CardContent>
      </Card>
      {pg && pg.totalPages > 1 && (
        <div className="mt-3">
          <Pagination
            page={pg.page}
            totalPages={pg.totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </AdminShell>
  );
}
