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
5. **Automate** — `n8n-workflow.json` is an hourly auto-publisher that:
   1. Polls `GET /api/admin/scheduled-posts?dueBefore=<now>` for queued
      posts whose slot has elapsed.
   2. Routes each post by `platform` to the right channel — **Buffer**
      for LinkedIn / X / Instagram / TikTok (one configured Buffer
      profile per channel), **Resend** for newsletter issues.
   3. On success, calls `PATCH /api/admin/scheduled-posts/{id}` with
      `status: "posted"` and the live permalink (the API stamps
      `postedAt` server-side).
   4. On failure or when `BUFFER_ACCESS_TOKEN` is unset, falls back to a
      Slack message with the exact copy block + deep link to mark it
      posted manually.

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

| Var                          | Purpose                                                   |
|------------------------------|-----------------------------------------------------------|
| `SYSMOAI_API_BASE`           | e.g. `https://yourdomain.com`                             |
| `SYSMOAI_ADMIN_TOKEN`        | Clerk session token (or bot allowlisted via `ADMIN_ALLOWED_EMAILS`) |
| `SYSMOAI_ADMIN_BASE`         | e.g. `https://yourdomain.com/admin`                       |
| `BUFFER_ACCESS_TOKEN`        | Buffer access token (one Business plan covers all four social profiles) |
| `BUFFER_PROFILE_LINKEDIN`    | Buffer profile ID for the LinkedIn page                   |
| `BUFFER_PROFILE_X`           | Buffer profile ID for the X account                       |
| `BUFFER_PROFILE_INSTAGRAM`   | Buffer profile ID for the IG account                      |
| `BUFFER_PROFILE_TIKTOK`      | Buffer profile ID for the TikTok account                  |
| `RESEND_API_KEY`             | Resend API key for the newsletter sends                   |
| `NEWSLETTER_FROM`            | e.g. `"SYSmoAI <hello@yourdomain.com>"`                   |
| `NEWSLETTER_AUDIENCE_ID`     | Resend audience or list email                             |
| `SLACK_FALLBACK_CHANNEL`     | e.g. `#sysmoai-publishing` for the manual-fallback path   |

The workflow runs hourly. The `dueBefore` filter only returns *queued* posts
whose `scheduledFor` has elapsed, so once `Mark posted` flips the row to
`posted` the same piece will not re-publish on the next tick — the workflow
is safe to re-trigger.

If you'd rather drive things from another tool (Hootsuite, Make, etc.) the
contract is the same: poll the `dueBefore` list, post via your channel
integration, then PATCH the row with `status: "posted"` and the permalink.
