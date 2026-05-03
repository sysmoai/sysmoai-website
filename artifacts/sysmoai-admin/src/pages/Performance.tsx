import { useState } from "react";
import { Loader2, RefreshCw, TrendingUp, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetScheduledPostTopPerformers,
  useRollupScheduledPostAttribution,
  getGetScheduledPostTopPerformersQueryKey,
  getGetScheduledPostsSummaryQueryKey,
  getListScheduledPostsQueryKey,
  type ScheduledPostPlatform,
} from "@workspace/api-client-react";
import { AdminShell } from "@/components/AdminShell";
import { useToast } from "@/hooks/use-toast";

const PLATFORM_LABEL: Record<ScheduledPostPlatform, string> = {
  linkedin: "LinkedIn",
  x_standalone: "X (post)",
  x_thread: "X (thread)",
  instagram_feed: "Instagram (feed)",
  instagram_story: "Instagram (story)",
  tiktok_reel: "TikTok / Reel",
  newsletter: "Newsletter",
};

export function PerformancePage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [showRollupSummary, setShowRollupSummary] = useState<string | null>(
    null,
  );

  const top = useGetScheduledPostTopPerformers({ limit: 20 });
  const rollup = useRollupScheduledPostAttribution();

  async function handleRollup() {
    try {
      const res = await rollup.mutateAsync();
      const summary =
        `Updated ${res.updatedRows} pieces. ` +
        `Scanned ${res.scannedAuditRequests} audits + ${res.scannedWaitlistSignups} waitlist signups.` +
        (res.unmatchedCampaigns.length > 0
          ? ` ${res.unmatchedCampaigns.length} unmatched campaigns.`
          : "");
      setShowRollupSummary(summary);
      toast({ title: "Attribution rollup complete", description: summary });
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: getGetScheduledPostTopPerformersQueryKey({ limit: 20 }),
        }),
        queryClient.invalidateQueries({
          queryKey: getGetScheduledPostsSummaryQueryKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: getListScheduledPostsQueryKey(),
        }),
      ]);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Rollup failed",
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  }

  const data = top.data;
  const totalSignups =
    data?.items.reduce((s, r) => s + r.waitlistSignups, 0) ?? 0;

  return (
    <AdminShell
      title="Performance"
      subtitle="Which scheduled posts drove signups — used to plan Week 5+"
      actions={
        <button
          onClick={handleRollup}
          disabled={rollup.isPending}
          data-testid="button-run-rollup"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
        >
          {rollup.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Run attribution rollup
        </button>
      }
    >
      {showRollupSummary && (
        <div className="mb-4 rounded-md border border-border bg-card px-4 py-3 text-sm">
          {showRollupSummary}
        </div>
      )}

      {top.isLoading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}
      {top.error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4" /> Failed to load performance.
        </div>
      )}

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              label="Top pillar"
              value={data.byPillar[0]?.pillar ?? "—"}
              hint={
                data.byPillar[0]
                  ? `${data.byPillar[0].signups} signups across ${data.byPillar[0].pieces} pieces`
                  : "no data"
              }
            />
            <StatCard
              label="Top platform"
              value={
                data.byPlatform[0]
                  ? PLATFORM_LABEL[data.byPlatform[0].platform] ??
                    data.byPlatform[0].platform
                  : "—"
              }
              hint={
                data.byPlatform[0]
                  ? `${data.byPlatform[0].signups} signups across ${data.byPlatform[0].pieces} pieces`
                  : "no data"
              }
            />
            <StatCard
              label="Top hook pattern"
              value={data.byHookPattern[0]?.hookPattern ?? "—"}
              hint={
                data.byHookPattern[0]
                  ? `${data.byHookPattern[0].signups} signups across ${data.byHookPattern[0].pieces} pieces`
                  : "no data"
              }
            />
          </div>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Top {data.items.length} scheduled posts ({totalSignups} attributed signups)
            </h2>
            {data.items.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No pieces published yet — or attribution rollup hasn't been run.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-md border border-border">
                <table className="min-w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr className="text-left">
                      <Th>File</Th>
                      <Th>Platform</Th>
                      <Th>Pillar</Th>
                      <Th>Hook</Th>
                      <Th>Funnel</Th>
                      <Th className="text-right">Signups</Th>
                      <Th className="text-right">Clicks</Th>
                      <Th>Campaign slug</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((row) => (
                      <tr
                        key={row.id}
                        className="border-t border-border/60"
                        data-testid={`top-row-${row.id}`}
                      >
                        <Td className="font-mono">{row.fileRef}</Td>
                        <Td>
                          {PLATFORM_LABEL[row.platform] ?? row.platform}
                        </Td>
                        <Td>{row.pillar}</Td>
                        <Td>{row.hookPattern}</Td>
                        <Td>{row.funnel}</Td>
                        <Td className="text-right tabular-nums font-medium">
                          {row.waitlistSignups}
                        </Td>
                        <Td className="text-right tabular-nums">
                          {row.clicks}
                        </Td>
                        <Td className="font-mono text-xs text-muted-foreground">
                          {row.campaignSlug}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <BreakdownTable
              title="By pillar"
              rows={data.byPillar.map((r) => ({
                key: r.pillar,
                signups: r.signups,
                pieces: r.pieces,
              }))}
            />
            <BreakdownTable
              title="By platform"
              rows={data.byPlatform.map((r) => ({
                key: PLATFORM_LABEL[r.platform] ?? r.platform,
                signups: r.signups,
                pieces: r.pieces,
              }))}
            />
            <BreakdownTable
              title="By hook pattern"
              rows={data.byHookPattern.map((r) => ({
                key: r.hookPattern,
                signups: r.signups,
                pieces: r.pieces,
              }))}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Once Week 4 closes, hit <strong>Run attribution rollup</strong>,
            confirm non-zero signups for at least the top 5 pieces, then run
            <code className="mx-1 px-1 py-0.5 rounded bg-muted">
              pnpm --filter @workspace/scripts run build-week5-pack
            </code>
            from the shell to generate the Week 5+ outline.
          </p>
        </div>
      )}
    </AdminShell>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="text-lg font-semibold mt-1 truncate">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
    </div>
  );
}

function BreakdownTable({
  title,
  rows,
}: {
  title: string;
  rows: { key: string; signups: number; pieces: number }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>
      <div className="rounded-md border border-border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              <Th>Key</Th>
              <Th className="text-right">Signups</Th>
              <Th className="text-right">Pieces</Th>
              <Th className="text-right">Per piece</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-2 text-xs text-muted-foreground"
                >
                  no data
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.key} className="border-t border-border/60">
                  <Td>{r.key}</Td>
                  <Td className="text-right tabular-nums">{r.signups}</Td>
                  <Td className="text-right tabular-nums">{r.pieces}</Td>
                  <Td className="text-right tabular-nums">
                    {r.pieces === 0 ? "—" : (r.signups / r.pieces).toFixed(2)}
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-3 py-2 ${className}`}>{children}</td>;
}
