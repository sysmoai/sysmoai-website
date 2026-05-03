import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Save, Copy, Check } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetScheduledPost,
  useUpdateScheduledPost,
  getGetScheduledPostQueryKey,
  getListScheduledPostsQueryKey,
  getGetScheduledPostsSummaryQueryKey,
  type ScheduledPostStatus,
} from "@workspace/api-client-react";
import { AdminShell } from "@/components/AdminShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { describeApiError } from "@/lib/format";
import {
  PLATFORM_LABELS,
  POST_STATUSES,
  formatBdt,
  postStatusColor,
  postStatusLabel,
} from "@/lib/scheduledPosts";

interface Props {
  id: number;
}

export function ScheduledPostDetailPage({ id }: Props) {
  const qc = useQueryClient();
  const get = useGetScheduledPost(id);
  const data = get.data;

  const [status, setStatus] = useState<ScheduledPostStatus>("queued");
  const [postUrl, setPostUrl] = useState("");
  const [assetUrl, setAssetUrl] = useState("");
  const [impressions, setImpressions] = useState("0");
  const [clicks, setClicks] = useState("0");
  const [signups, setSignups] = useState("0");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setPostUrl(data.postUrl ?? "");
      setAssetUrl(data.assetUrl ?? "");
      setImpressions(String(data.impressions));
      setClicks(String(data.clicks));
      setSignups(String(data.waitlistSignups));
      setNotes(data.notes ?? "");
    }
  }, [data]);

  const update = useUpdateScheduledPost({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetScheduledPostQueryKey(id) });
        qc.invalidateQueries({ queryKey: getListScheduledPostsQueryKey() });
        qc.invalidateQueries({
          queryKey: getGetScheduledPostsSummaryQueryKey(),
        });
      },
    },
  });

  function parseInt0(v: string): number {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  async function handleSave() {
    await update.mutateAsync({
      id,
      data: {
        status,
        postUrl: postUrl.trim() === "" ? null : postUrl.trim(),
        assetUrl: assetUrl.trim() === "" ? null : assetUrl.trim(),
        impressions: parseInt0(impressions),
        clicks: parseInt0(clicks),
        waitlistSignups: parseInt0(signups),
        notes: notes.trim() === "" ? null : notes,
      },
    });
  }

  async function handleCopy() {
    if (!data) return;
    await navigator.clipboard.writeText(data.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <AdminShell
      title={data ? data.title : `Post #${id}`}
      subtitle={
        data
          ? `${PLATFORM_LABELS[data.platform]} · ${data.pillar} · ${formatBdt(data.scheduledFor)}`
          : undefined
      }
      actions={
        <Link href="/scheduled-posts">
          <a
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            data-testid="link-back"
          >
            <ArrowLeft className="h-4 w-4" /> Back to queue
          </a>
        </Link>
      }
    >
      {get.isLoading ? (
        <div className="space-y-3 max-w-3xl">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : get.isError || !data ? (
        <p className="text-sm text-destructive" data-testid="text-detail-error">
          {describeApiError(get.error, "Could not load post.")}
        </p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 max-w-6xl">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base">
                  Copy ({data.fileRef})
                </CardTitle>
                <span
                  className={
                    "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium " +
                    postStatusColor(data.status)
                  }
                >
                  {postStatusLabel(data.status)}
                </span>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end mb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    data-testid="button-copy-content"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-1.5" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1.5" />
                    )}
                    {copied ? "Copied" : "Copy text"}
                  </Button>
                </div>
                <pre
                  className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed bg-muted/40 p-4 rounded-md max-h-[28rem] overflow-y-auto"
                  data-testid="text-content"
                >
                  {data.content}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Sequence
                    </dt>
                    <dd>#{data.sequenceNo} of 76</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      File ref
                    </dt>
                    <dd>{data.fileRef}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Pillar
                    </dt>
                    <dd>{data.pillar}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Hook pattern
                    </dt>
                    <dd>{data.hookPattern}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      Funnel
                    </dt>
                    <dd>{data.funnel.replace("_", " → ")}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      CTA
                    </dt>
                    <dd>
                      {data.ctaCode === "A"
                        ? "[A] free-AI-audit"
                        : "[W] WhatsApp"}
                    </dd>
                  </div>
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
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as ScheduledPostStatus)}
                  >
                    <SelectTrigger className="mt-1.5" data-testid="select-detail-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POST_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {postStatusLabel(s)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="post-url"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    Live post URL
                  </label>
                  <Input
                    id="post-url"
                    value={postUrl}
                    onChange={(e) => setPostUrl(e.target.value)}
                    placeholder="https://…"
                    data-testid="input-post-url"
                  />
                </div>
                <div>
                  <label
                    htmlFor="asset-url"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    Asset URL (image/video/carousel)
                  </label>
                  <Input
                    id="asset-url"
                    value={assetUrl}
                    onChange={(e) => setAssetUrl(e.target.value)}
                    placeholder="https://…"
                    data-testid="input-asset-url"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Impressions
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={impressions}
                      onChange={(e) => setImpressions(e.target.value)}
                      data-testid="input-impressions"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Clicks
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={clicks}
                      onChange={(e) => setClicks(e.target.value)}
                      data-testid="input-clicks"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wide text-muted-foreground">
                      Signups
                    </label>
                    <Input
                      type="number"
                      min={0}
                      value={signups}
                      onChange={(e) => setSignups(e.target.value)}
                      data-testid="input-signups"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="text-xs uppercase tracking-wide text-muted-foreground"
                  >
                    Notes
                  </label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Internal notes…"
                    data-testid="input-notes"
                  />
                </div>
                {update.isError && (
                  <p className="text-sm text-destructive" data-testid="text-save-error">
                    {describeApiError(update.error, "Could not save.")}
                  </p>
                )}
                {update.isSuccess && !update.isError && (
                  <p
                    className="text-sm text-emerald-600 dark:text-emerald-400"
                    data-testid="text-save-success"
                  >
                    Saved.
                  </p>
                )}
                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={update.isPending}
                  data-testid="button-save"
                >
                  <Save className="h-4 w-4 mr-1.5" />
                  {update.isPending ? "Saving…" : "Save changes"}
                </Button>
              </CardContent>
            </Card>

            {data.postedAt && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Posted</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    Marked posted: {formatBdt(data.postedAt)}
                  </p>
                  {data.postUrl && (
                    <a
                      href={data.postUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline break-all"
                      data-testid="link-live-post"
                    >
                      {data.postUrl}
                    </a>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
