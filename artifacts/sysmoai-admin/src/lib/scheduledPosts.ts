import type { ScheduledPostPlatform, ScheduledPostStatus } from "@workspace/api-client-react";

export const PLATFORM_LABELS: Record<ScheduledPostPlatform, string> = {
  linkedin: "LinkedIn",
  x_standalone: "X — Standalone",
  x_thread: "X — Thread",
  instagram_feed: "Instagram Feed",
  instagram_story: "Instagram Story",
  tiktok_reel: "TikTok / Reel",
  newsletter: "Newsletter",
};

export const PLATFORM_VALUES: ScheduledPostPlatform[] = [
  "linkedin",
  "x_standalone",
  "x_thread",
  "instagram_feed",
  "instagram_story",
  "tiktok_reel",
  "newsletter",
];

export const POST_STATUSES: ScheduledPostStatus[] = [
  "queued",
  "posted",
  "skipped",
  "failed",
];

export function postStatusLabel(s: ScheduledPostStatus): string {
  switch (s) {
    case "queued": return "Queued";
    case "posted": return "Posted";
    case "skipped": return "Skipped";
    case "failed": return "Failed";
  }
}

export function postStatusColor(s: ScheduledPostStatus): string {
  switch (s) {
    case "queued":
      return "bg-blue-500/15 text-blue-700 border border-blue-500/30 dark:text-blue-300";
    case "posted":
      return "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 dark:text-emerald-300";
    case "skipped":
      return "bg-zinc-500/15 text-zinc-700 border border-zinc-500/30 dark:text-zinc-300";
    case "failed":
      return "bg-red-500/15 text-red-700 border border-red-500/30 dark:text-red-300";
  }
}

/** Render an instant in BDT (Asia/Dhaka, UTC+6). */
export function formatBdt(value: string | Date | null | undefined): string {
  if (!value) return "—";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString("en-GB", {
    timeZone: "Asia/Dhaka",
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }) + " BDT";
}
