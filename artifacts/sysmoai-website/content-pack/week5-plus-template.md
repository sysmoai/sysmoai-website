# Week 5+ Content Pack — Data-Driven Template

The Week 1–4 pack was a hypothesis: 7 hook patterns × 4 pillars × 7 platforms,
balanced across the funnel. Week 5+ is **not a hypothesis** — it is built from
the actual signal of which Week 1–4 pieces drove the most audit bookings.

This template is filled in by running:

```bash
pnpm --filter @workspace/scripts run build-week5-pack
```

That script reads `scheduled_posts` (with `waitlistSignups` rolled up from
UTM-tagged audit bookings via the `attribution-rollup` admin endpoint) and
overwrites the `## Generated outline` section below with the recommended mix.
The narrative sections above the generated block are hand-edited and survive
each regeneration.

## How to use this template

1. After Week 4 closes, hit **Run attribution rollup** in the admin
   *Performance* page (or POST `/api/admin/scheduled-posts/attribution-rollup`
   with the automation token).
2. Verify the *Performance* dashboard shows non-zero signups for at least the
   top 5 pieces. If everything is zero, UTMs aren't landing — debug there
   first, don't write Week 5 copy from no-data.
3. Run `build-week5-pack`. It writes the outline below and a per-piece
   recommendation list with copy hooks.
4. Re-author every recommended piece by hand using `voice-guide.md` — the
   script suggests the angle, you write the copy. **Do not ship script-
   generated copy verbatim.**
5. Pull verified numbers from `proof-points.md` to replace any generic
   claims that survived from Week 1–4.

## Selection rules the planner applies

- **Top pillar gets 50% of the slots.** If "Proof + Specificity" drove 6 of
  the top 10 signups, Week 5+ leans into it heavily.
- **Bottom pillar is retired.** The pillar with the worst signups-per-piece
  is dropped from Week 5+ entirely (replaced by a new angle from
  `voice-guide.md`'s reserve list).
- **Best hook pattern × best platform combos are doubled.** If
  "Specificity Signal × LinkedIn" drove the most signups per piece, Week 5
  schedules 2 of those.
- **Slot timing stays the same** (BDT peak hours from the Week 1–4 pack).
- **Funnel mix shifts slightly bottom-ward.** Week 1–4 was TOF-heavy because
  there was no audience yet. Week 5+ assumes some recognition, so it adds
  one extra MOF→BOF slot per week.
- **Pieces under the "noise floor" are ignored.** Anything with < 50 clicks
  doesn't have enough data to call it a winner or loser, so it's treated as
  neutral, not a negative signal.

## Generated outline

> Run `pnpm --filter @workspace/scripts run build-week5-pack` to populate.
> The script writes its output below this marker.

<!-- WEEK5_PLANNER:BEGIN -->
_Not yet generated. The script overwrites this section._
<!-- WEEK5_PLANNER:END -->
