# Sprint Client Proof Points — Living Doc

This file is the canonical source for new proof points gathered from Month 1
Sprint clients. The Week 5+ pack pulls from here when re-authoring copy,
because specific verified numbers convert better than the generic placeholders
used in the Week 1–4 pack.

**Rule:** never put a number in published copy unless it appears in this file
with a verified source. Generic claims like "3x more replies" are not allowed
in Week 5+ — replace with the real number from a real client (e.g. "Tarek's
F-commerce: from 4hr first-reply to 12 minutes after the auto-reply system
went live, 3 weeks of data").

## How to add a proof point

When a Sprint client closes a milestone:

1. Confirm the number with them in writing (DM, email, or WhatsApp).
2. Add a row below using the template.
3. Mark `consentToUse` = `yes` only when the client has explicitly OK'd public
   use. Anonymised numbers (`F-commerce client, 200+ orders/month`) are fine
   without consent if the client OKs anonymised use.
4. Tag it with the pillar(s) and platform(s) it can support.

## Template

```yaml
- id: PP-001
  collectedOn: 2026-MM-DD
  client: <name or "F-commerce client A" if anonymised>
  consentToUse: yes | anonymised | no
  pillar: Pain Recognition | What Good Looks Like | Proof + Specificity | CTA / Offer
  metric: <single short claim>
  detail: <one-paragraph context — what was the before, what was the change, over what period>
  source: <DM screenshot ref / Sprint debrief notes / dashboard URL>
  bestFor: [linkedin, x, instagram_feed]   # platforms where this lands
  notes: <optional — caveats, why we believe it, what to avoid>
```

## Proof points

<!-- Add new entries above this line. -->

> _No Sprint clients have closed Month 1 yet. The first proof points will
> land after the Week 4 cohort completes their sprint debriefs. Until then,
> Week 5+ copy must reuse the existing 4-week proof points (Tarek 18hrs/wk,
> 847 unread DMs anchor) or be rewritten in question form ("how would you
> measure if your auto-reply is actually working?")._

## Dry-run example proof points (placeholder — DO NOT publish)

> ⚠️ The entries below are **shape-only examples** illustrating what a real
> Month 1 proof point looks like. They are not real clients and must NOT
> appear in published copy. Delete this section as soon as PP-001 is
> verified from a real Sprint debrief.

```yaml
- id: PP-EXAMPLE-1
  collectedOn: 2026-06-15  # placeholder
  client: "F-commerce client A (anonymised)"
  consentToUse: anonymised
  pillar: Proof + Specificity
  metric: "DM first-reply: 4hr → 12 min over 3 weeks"
  detail: >
    Before: founder-handled DMs, average first reply 4 hours, ~30% of evening
    inquiries lost overnight. After: Messenger API + n8n auto-reply deployed
    Week 1, 12-minute median first reply by Week 3 (measured from inbox
    timestamp to outbound reply timestamp in n8n logs).
  source: n8n execution log + client WhatsApp confirmation
  bestFor: [linkedin, x_standalone, newsletter]
  notes: >
    Replaces the generic "3x faster reply" claim used in Week 1–4.

- id: PP-EXAMPLE-2
  collectedOn: 2026-06-20  # placeholder
  client: "Service business B (anonymised)"
  consentToUse: anonymised
  pillar: What Good Looks Like
  metric: "18 hours/week reclaimed in admin time"
  detail: >
    Founder previously spent ~3 hours/day in DMs, calendar back-and-forth, and
    proposal drafting. After Sprint deployment of CRM + booking automation +
    proposal templates, time tracking shows 18 hours/week reduction sustained
    over 4 weeks.
  source: Toggl export + Sprint debrief notes
  bestFor: [linkedin, instagram_feed]
  notes: >
    Pairs well with Proof + Specificity pillar. Use when audience leans
    service-business rather than F-commerce.
```
