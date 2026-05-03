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
   `artifacts/api-server/src/data/contentSchedule.json` (76 rows). The JSON is
   statically imported into the API server bundle, so it ships with `dist/`.
3. **Seed the queue** — sign in to the admin app and click *Import content
   pack* on the **Publishing queue** page (or `POST /api/admin/scheduled-posts/seed`).
   The seed is idempotent: re-running it refreshes copy/timing without
   wiping `status`, `postedAt`, `postUrl`, or metrics.
4. **Operate** — the **Publishing queue** dashboard shows posted / queued /
   skipped / failed counts plus per-platform and per-week breakdowns. Click a
   row to mark posted, log the live URL, and capture impressions / clicks /
   waitlist signups.
5. **Automate** — `n8n-workflow.json` is an hourly sweeper that hands posts
   off to the right channel **using each row's own BDT slot**:
   1. Polls `GET /api/admin/scheduled-posts?status=queued&from=<now-30m>&to=<now+24h>`.
      The lower bound (`now-30m`) prevents stale queued rows (e.g. a slot
      we missed days ago) from being auto-published or auto-alerted.
   2. Skips rows whose `postUrl` is already populated (already pushed).
   3. Routes by `platform`:
      - **LinkedIn / X standalone** → pushed to **Buffer** with
        `scheduled_at = scheduledFor` (unix epoch). Buffer publishes at the
        row's exact peak slot — the cron only acts as a queue feeder, so
        slot timing is preserved no matter when the cron fires.
      - **X thread** → a Code node parses `content` into individual tweets
        (split on `\n---\n`, strips the leading `Tweet N/M` header,
        validates each ≤ 280 chars), then schedules a real Buffer X thread
        (`text=tweet1`, `thread[][text]=tweet2..N`, single
        `scheduled_at`). Buffer fires the whole sequence at the slot.
      - **Instagram feed / story** → IF `assetUrl` is set on the row,
        pushed to **Buffer** with `scheduled_at = scheduledFor` and
        `media[photo] = assetUrl`. If `assetUrl` is empty, falls through to
        a Slack manual-publish alert (gated to "within 1h of slot") so the
        operator publishes at the peak time. The Slack branch deliberately
        does **not** write `postUrl`, so the row stays queued and the next
        sweep keeps alerting until the operator either attaches an
        `assetUrl` (auto-scheduled on the next pass) or marks the row
        posted in the admin UI.
      - **TikTok** → IF `assetUrl` is set, pushed to **Buffer** with
        `media[video] = assetUrl`. Same Slack-at-slot retry-loop fallback
        when no asset is attached.
      - **Newsletter** → only sent when its slot is within the next hour
        (Resend has no provider-side scheduling), via Resend's `/emails`.

   Operators attach IG / TikTok asset URLs from the post detail page in
   the admin UI; once `assetUrl` is set, the next sweep will hand the row
   to Buffer with provider-side scheduling and no further manual action
   is required.
   4. After Buffer accepts a post, the workflow PATCHes the row with
      `postUrl=buffer://<update-id>` and a note. Status stays `queued` —
      Buffer flips it to live at the slot, and the operator marks it posted
      in the admin UI (Buffer webhooks would close the loop in a future
      iteration). Newsletter sends flip status to `posted` immediately.
   5. Any provider failure (network error, missing `BUFFER_ACCESS_TOKEN`,
      Resend 4xx, etc.) routes via `continueErrorOutput` to a Slack
      `Slack — provider failure` alert with the copy block + deep link.

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

## Channel coverage at a glance

| Channel         | Auto-publish via | Slot honoring                       | Notes                                              |
|-----------------|------------------|-------------------------------------|----------------------------------------------------|
| LinkedIn        | Buffer           | Provider-side `scheduled_at`        | Fully automated                                    |
| X standalone    | Buffer           | Provider-side `scheduled_at`        | Fully automated                                    |
| X thread        | Buffer (real thread) | Provider-side `scheduled_at`    | Code node splits + sends `thread[][text]` 2..N    |
| Newsletter      | Resend           | Cron must hit within 1h of slot     | Hourly cron + 1h IF gate                          |
| Instagram feed  | Buffer w/ media OR Slack | Provider-side if `assetUrl` set; else Slack at slot | Set `assetUrl` in admin UI to fully automate |
| Instagram story | Buffer w/ media OR Slack | Provider-side if `assetUrl` set; else Slack at slot | Set `assetUrl` in admin UI to fully automate |
| TikTok / Reel   | Buffer w/ media OR Slack | Provider-side if `assetUrl` set; else Slack at slot | Set `assetUrl` (video URL) in admin UI       |

## Authentication (least-privilege M2M)

n8n authenticates to the admin API with a static bearer token, **not** a
Clerk session.

The bearer-token path is implemented in
`artifacts/api-server/src/middlewares/requireAdminOrAutomation.ts` and is
mounted **only on the `/api/admin/scheduled-posts/*` router**. Every other
admin route (waitlist, contacts, audits, sprint availability, …) keeps the
Clerk-only `requireAdmin` middleware. So even if the automation token leaks,
the blast radius is restricted to the publishing queue — no PII access.

Set the secret on **both sides**:

- API server env: `SYSMOAI_AUTOMATION_TOKEN=<long random string, ≥ 24 chars>`
- n8n credential: same value, sent as `Authorization: Bearer …`

If the env var is unset (or under 24 chars) the bypass is disabled, and the
publishing endpoints fall back to Clerk-only auth — the human dashboard
path keeps working in either case.

## Environment

`n8n-workflow.json` expects:

| Var                          | Purpose                                                   |
|------------------------------|-----------------------------------------------------------|
| `SYSMOAI_API_BASE`           | e.g. `https://yourdomain.com`                             |
| `SYSMOAI_AUTOMATION_TOKEN`   | Static M2M bearer (matches API env of the same name)      |
| `SYSMOAI_ADMIN_BASE`         | e.g. `https://yourdomain.com/admin`                       |
| `BUFFER_ACCESS_TOKEN`        | Buffer access token (one Business plan covers all profiles) |
| `BUFFER_PROFILE_LINKEDIN`    | Buffer profile ID for the LinkedIn page                   |
| `BUFFER_PROFILE_X`           | Buffer profile ID for the X account                       |
| `RESEND_API_KEY`             | Resend API key for the newsletter sends                   |
| `NEWSLETTER_FROM`            | e.g. `"SYSmoAI <hello@yourdomain.com>"`                   |
| `NEWSLETTER_AUDIENCE_ID`     | Resend audience or list email                             |
| `SLACK_FALLBACK_CHANNEL`     | e.g. `#sysmoai-publishing` for both manual + failure paths |

The cron runs hourly. The `postUrl` filter in `Skip if already queued` makes
the workflow idempotent — once a row is in Buffer (or has been Slack-alerted),
it won't be re-queued on the next tick.

If you'd rather drive things from another tool (Hootsuite, Make, etc.) the
contract is the same: poll the `dueBefore` list, push to your channel
integration with provider-side scheduling, then PATCH the row with
`postUrl` and (when it's truly live) `status: "posted"`.
