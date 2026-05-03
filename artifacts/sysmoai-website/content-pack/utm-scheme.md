# UTM Attribution Scheme

Every CTA link in the 4-week pack carries UTM parameters so that an audit
booking or waitlist signup can be tied back to the exact post that drove it.
The scheme is deliberately small and predictable so it can be hand-built
during writing and machine-rolled-up afterwards.

## URL shape

```
https://sysmoai.com/free-ai-audit?utm_source=<platform>&utm_medium=<medium>&utm_campaign=w<week>-<fileref-slug>
```

Real examples:

| File ref       | UTM URL                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------|
| L1 (Week 1)    | `https://sysmoai.com/free-ai-audit?utm_source=linkedin&utm_medium=social&utm_campaign=w1-l1`  |
| Thread W1      | `https://sysmoai.com/free-ai-audit?utm_source=x&utm_medium=social&utm_campaign=w1-threadw1`   |
| IF7 (Week 3)   | `https://sysmoai.com/free-ai-audit?utm_source=instagram&utm_medium=social&utm_campaign=w3-if7`|
| TR5 (Week 3)   | `https://sysmoai.com/free-ai-audit?utm_source=tiktok&utm_medium=social&utm_campaign=w3-tr5`   |
| NL2 (Week 2)   | `https://sysmoai.com/free-ai-audit?utm_source=newsletter&utm_medium=email&utm_campaign=w2-nl2`|

WhatsApp CTAs do not carry UTMs (the wa.me link can't preserve query params
through the WhatsApp open flow), so prefer the `[A]` audit link whenever the
goal is attribution. Use `[W]` only for hand-off CTAs once the prospect is
already a known lead.

## Field rules

| Param          | Allowed values                                                       |
|----------------|----------------------------------------------------------------------|
| `utm_source`   | `linkedin` · `x` · `instagram` · `tiktok` · `newsletter`             |
| `utm_medium`   | `social` for everything except newsletter, which uses `email`        |
| `utm_campaign` | `w<week>-<fileref-slug>` — lowercased, hyphenated. Examples below.   |
| `utm_content`  | Optional. Use for A/B variants of the same piece (`hook-a`, `hook-b`)|

### Campaign slug rules

`<fileref-slug>` is the post's `fileRef` lowercased with all non-alphanumerics
**stripped** (not replaced with hyphens — removed entirely). Examples:
`Thread W1` → `threadw1`, `IS3 — 3-Frame Seq` → `is33frameseq`,
`L5 [CAROUSEL]` → `l5carousel`, `L1` → `l1`, `NL2` → `nl2`. The week number
prefix is the BDT week the row publishes in (W1 = 11–15 May 2026,
W2 = 18–22 May, W3 = 25–29 May, W4 = 1–5 Jun). The canonical implementation
lives in `scripts/src/buildContentSchedule.ts` (`campaignSlugFor`); the
admin rollup at `POST /api/admin/scheduled-posts/attribution-rollup`
computes the same slug at read time.

You do **not** need to hand-write these — `scripts/src/buildContentSchedule.ts`
exposes `campaignSlugFor(weekNumber, fileRef)` and `auditUrlWithUtm(weekNumber,
fileRef, platform)` and uses them to bake UTM URLs into every row of
`contentSchedule.json` at build time. The admin **Performance** view + the
`POST /admin/scheduled-posts/attribution-rollup` endpoint compute the same
slug at read time so build-time and rollup-time stay in lockstep.

## How attribution flows

1. Visitor clicks a CTA — UTM params land in the URL of `/free-ai-audit`.
2. `FreeAudit.tsx` calls `captureUtmFromLocation()` on mount, which writes
   the snapshot to sessionStorage so it survives re-renders and brief
   navigation.
3. On submit, `readUtmSnapshot()` reads the snapshot back and POSTs it as
   part of the `audit_requests` insert.
4. The columns `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
   `utm_term`, `referrer` are persisted on `audit_requests` and
   `waitlist_signups`.
5. The admin **Performance** page (and the `POST
   /api/admin/scheduled-posts/attribution-rollup` endpoint) recomputes
   `scheduled_posts.waitlistSignups` per piece by matching `utm_campaign`
   against the row's canonical slug. Idempotent — safe to run any time.
6. The Week 5+ planner script
   (`pnpm --filter @workspace/scripts run build-week5-pack`) reads the
   rolled-up signups and emits a recommended Week 5+ outline, doubling
   down on the top-performing pillar / hook-pattern / platform combos.

## Building the URL during content writing

When drafting a post body, write the plain URL `https://sysmoai.com/free-ai-audit`.
At build time, `scripts/src/buildContentSchedule.ts` matches every plain
audit URL in each row's `content` / `hookLine` and replaces it with the
UTM-tagged variant computed by `auditUrlWithUtm(weekNumber, fileRef,
platform)`. The substitution is idempotent — re-running the build never
double-tags. Markdown content-pack files keep the plain URL so they stay
human-readable; only the published JSON carries UTM URLs.
