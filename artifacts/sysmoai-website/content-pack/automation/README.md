# Content Pack Publishing Automation

The 76-piece content pack (`content-pack/calendar.md` + per-platform files) is
imported into the admin queue and operated as a publishing dashboard.

## How it works

1. **Source of truth** — `content-pack/calendar.md` (master table) +
   `linkedin.md`, `x.md`, `instagram-feed.md`, `instagram-stories.md`,
   `tiktok-reels.md`, `newsletter.md`.
2. **Build the schedule JSON** —
   `pnpm --filter @workspace/scripts run build-content-schedule`
   parses all of the above into
   `artifacts/api-server/src/data/contentSchedule.json` (76 rows).
3. **Seed the queue** — sign in to the admin app and click *Import content
   pack* on the **Publishing queue** page (or `POST /api/admin/scheduled-posts/seed`).
   The seed is idempotent: re-running it refreshes copy/timing without
   wiping `status`, `postedAt`, `postUrl`, or metrics.
4. **Operate** — the **Publishing queue** dashboard shows posted / queued /
   skipped / failed counts plus per-platform and per-week breakdowns. Click a
   row to mark posted, log the live URL, and capture impressions / clicks /
   waitlist signups.
5. **Automate** — point n8n (or any scheduler) at
   `GET /api/admin/scheduled-posts?dueBefore=<now>` on a cron trigger; the
   sample workflow in `n8n-workflow.json` pings Slack / WhatsApp with the
   exact copy block and the deep link to mark it posted.

## BDT peak-hour publishing slots

All `scheduledFor` instants are computed from the calendar date plus the
optimal **Asia/Dhaka (UTC+6)** window for the platform:

| Platform          | BDT slot   | UTC equivalent | Why                                       |
|-------------------|-----------|----------------|-------------------------------------------|
| LinkedIn          | 09:00     | 03:00 Z        | Workday morning skim, 8–10am peak         |
| X — Standalone    | 12:30     | 06:30 Z        | Lunchtime peak (12–2pm)                   |
| X — Thread        | 21:00     | 15:00 Z        | Evening peak (8–11pm), longer dwell time  |
| Instagram Feed    | 13:00     | 07:00 Z        | Lunch scroll                              |
| Instagram Story   | 20:00     | 14:00 Z        | Evening peak                              |
| TikTok / Reel     | 21:00     | 15:00 Z        | Evening peak — highest watch-through      |
| Newsletter        | 10:00     | 04:00 Z        | Mid-morning send window                   |

If you want to shift the schedule (e.g. push the launch week back by 7 days),
edit `content-pack/calendar.md` dates, re-run the build script, and click
*Import content pack* again.

## Environment

`n8n-workflow.json` expects:

- `SYSMOAI_API_BASE` — e.g. `https://yourdomain.com`
- `SYSMOAI_ADMIN_TOKEN` — Clerk session token (or a dedicated bot allowlisted
  via `ADMIN_ALLOWED_EMAILS`)
- `SYSMOAI_ADMIN_BASE` — e.g. `https://yourdomain.com/admin`
- A configured Slack credential for the Slack node (swap for WhatsApp /
  Telegram / Email if preferred — payload stays the same)

The workflow runs hourly. The `dueBefore` filter only returns *queued* posts
whose `scheduledFor` has elapsed, so you can safely re-trigger without
sending duplicates after a row has been marked posted.
