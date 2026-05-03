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

## Generated plan + analysis

> Run `pnpm --filter @workspace/scripts run build-week5-pack` to populate.
> The script writes a 4-week / 76-slot concrete plan plus the
> recommendation tables it was derived from below this marker. Re-author
> each planned slot by hand — the script never ships copy verbatim.

<!-- WEEK5_PLANNER:BEGIN -->
_Generated 2026-05-03T08:14:34.830Z from 0 scheduled posts (0 attributed signups, no-data fallback)._

### Week 5–8 concrete plan

_No attributed signups found yet — pillar/hook ranking falls back to the Week 1–4 default order. Re-run this script after the rollup populates `waitlistSignups` to get a data-driven plan._

| # | Week | Date | Day | Platform | File Ref | Pillar | Hook | Funnel | CTA | Planned utm_campaign |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | W5 | 08 Jun | Mon | linkedin | W5L1 | Pain Recognition | Specificity Signal | TOF | [A] | `w5-w5l1` |
| 2 | W5 | 08 Jun | Mon | instagram_feed | W5IF1 | Pain Recognition | Negative Hook | TOF | [A] | `w5-w5if1` |
| 3 | W5 | 08 Jun | Mon | instagram_story | W5IS1 | Pain Recognition | Callout | TOF | [A] | `w5-w5is1` |
| 4 | W5 | 08 Jun | Mon | x_standalone | W5X1 | Pain Recognition | Curiosity Gap | TOF | [A] | `w5-w5x1` |
| 5 | W5 | 09 Jun | Tue | linkedin | W5L2 | Pain Recognition | Slippery Slope | TOF | [A] | `w5-w5l2` |
| 6 | W5 | 09 Jun | Tue | x_standalone | W5X2 | Pain Recognition | Educational | TOF | [A] | `w5-w5x2` |
| 7 | W5 | 09 Jun | Tue | tiktok_reel | W5TR1 | Pain Recognition | Question | MOF | [A] | `w5-w5tr1` |
| 8 | W5 | 10 Jun | Wed | linkedin | W5L3 | Pain Recognition | Specificity Signal | MOF | [A] | `w5-w5l3` |
| 9 | W5 | 10 Jun | Wed | instagram_feed | W5IF2 | Pain Recognition | Negative Hook | MOF | [A] | `w5-w5if2` |
| 10 | W5 | 10 Jun | Wed | instagram_story | W5IS2 | Pain Recognition | Callout | MOF | [A] | `w5-w5is2` |
| 11 | W5 | 10 Jun | Wed | x_standalone | W5X3 | What Good Looks Like | Curiosity Gap | MOF | [A] | `w5-w5x3` |
| 12 | W5 | 10 Jun | Wed | x_thread | W5XT1 | What Good Looks Like | Slippery Slope | MOF | [A] | `w5-w5xt1` |
| 13 | W5 | 11 Jun | Thu | linkedin | W5L4 | What Good Looks Like | Educational | MOF | [A] | `w5-w5l4` |
| 14 | W5 | 11 Jun | Thu | x_standalone | W5X4 | What Good Looks Like | Question | MOF | [A] | `w5-w5x4` |
| 15 | W5 | 11 Jun | Thu | tiktok_reel | W5TR2 | What Good Looks Like | Specificity Signal | BOF | [A] | `w5-w5tr2` |
| 16 | W5 | 12 Jun | Fri | linkedin | W5L5 | Trust + Authority | Negative Hook | BOF | [A] | `w5-w5l5` |
| 17 | W5 | 12 Jun | Fri | instagram_feed | W5IF3 | Trust + Authority | Callout | BOF | [A] | `w5-w5if3` |
| 18 | W5 | 12 Jun | Fri | instagram_story | W5IS3 | Trust + Authority | Curiosity Gap | BOF | [A] | `w5-w5is3` |
| 19 | W5 | 12 Jun | Fri | newsletter | W5NL1 | Trust + Authority | Slippery Slope | MOF_BOF | [A] | `w5-w5nl1` |
| 20 | W6 | 15 Jun | Mon | linkedin | W6L1 | Pain Recognition | Negative Hook | TOF | [A] | `w6-w6l1` |
| 21 | W6 | 15 Jun | Mon | instagram_feed | W6IF1 | Pain Recognition | Callout | TOF | [A] | `w6-w6if1` |
| 22 | W6 | 15 Jun | Mon | instagram_story | W6IS1 | Pain Recognition | Curiosity Gap | TOF | [A] | `w6-w6is1` |
| 23 | W6 | 15 Jun | Mon | x_standalone | W6X1 | Pain Recognition | Slippery Slope | TOF | [A] | `w6-w6x1` |
| 24 | W6 | 16 Jun | Tue | linkedin | W6L2 | Pain Recognition | Educational | TOF | [A] | `w6-w6l2` |
| 25 | W6 | 16 Jun | Tue | x_standalone | W6X2 | Pain Recognition | Question | TOF | [A] | `w6-w6x2` |
| 26 | W6 | 16 Jun | Tue | tiktok_reel | W6TR1 | Pain Recognition | Specificity Signal | MOF | [A] | `w6-w6tr1` |
| 27 | W6 | 17 Jun | Wed | linkedin | W6L3 | Pain Recognition | Negative Hook | MOF | [A] | `w6-w6l3` |
| 28 | W6 | 17 Jun | Wed | instagram_feed | W6IF2 | Pain Recognition | Callout | MOF | [A] | `w6-w6if2` |
| 29 | W6 | 17 Jun | Wed | instagram_story | W6IS2 | Pain Recognition | Curiosity Gap | MOF | [A] | `w6-w6is2` |
| 30 | W6 | 17 Jun | Wed | x_standalone | W6X3 | What Good Looks Like | Slippery Slope | MOF | [A] | `w6-w6x3` |
| 31 | W6 | 17 Jun | Wed | x_thread | W6XT1 | What Good Looks Like | Educational | MOF | [A] | `w6-w6xt1` |
| 32 | W6 | 18 Jun | Thu | linkedin | W6L4 | What Good Looks Like | Question | MOF | [A] | `w6-w6l4` |
| 33 | W6 | 18 Jun | Thu | x_standalone | W6X4 | What Good Looks Like | Specificity Signal | MOF | [A] | `w6-w6x4` |
| 34 | W6 | 18 Jun | Thu | tiktok_reel | W6TR2 | What Good Looks Like | Negative Hook | BOF | [A] | `w6-w6tr2` |
| 35 | W6 | 19 Jun | Fri | linkedin | W6L5 | Trust + Authority | Callout | BOF | [A] | `w6-w6l5` |
| 36 | W6 | 19 Jun | Fri | instagram_feed | W6IF3 | Trust + Authority | Curiosity Gap | BOF | [A] | `w6-w6if3` |
| 37 | W6 | 19 Jun | Fri | instagram_story | W6IS3 | Trust + Authority | Slippery Slope | BOF | [A] | `w6-w6is3` |
| 38 | W6 | 19 Jun | Fri | newsletter | W6NL1 | Trust + Authority | Educational | MOF_BOF | [A] | `w6-w6nl1` |
| 39 | W7 | 22 Jun | Mon | linkedin | W7L1 | Pain Recognition | Callout | TOF | [A] | `w7-w7l1` |
| 40 | W7 | 22 Jun | Mon | instagram_feed | W7IF1 | Pain Recognition | Curiosity Gap | TOF | [A] | `w7-w7if1` |
| 41 | W7 | 22 Jun | Mon | instagram_story | W7IS1 | Pain Recognition | Slippery Slope | TOF | [A] | `w7-w7is1` |
| 42 | W7 | 22 Jun | Mon | x_standalone | W7X1 | Pain Recognition | Educational | TOF | [A] | `w7-w7x1` |
| 43 | W7 | 23 Jun | Tue | linkedin | W7L2 | Pain Recognition | Question | TOF | [A] | `w7-w7l2` |
| 44 | W7 | 23 Jun | Tue | x_standalone | W7X2 | Pain Recognition | Specificity Signal | TOF | [A] | `w7-w7x2` |
| 45 | W7 | 23 Jun | Tue | tiktok_reel | W7TR1 | Pain Recognition | Negative Hook | MOF | [A] | `w7-w7tr1` |
| 46 | W7 | 24 Jun | Wed | linkedin | W7L3 | Pain Recognition | Callout | MOF | [A] | `w7-w7l3` |
| 47 | W7 | 24 Jun | Wed | instagram_feed | W7IF2 | Pain Recognition | Curiosity Gap | MOF | [A] | `w7-w7if2` |
| 48 | W7 | 24 Jun | Wed | instagram_story | W7IS2 | Pain Recognition | Slippery Slope | MOF | [A] | `w7-w7is2` |
| 49 | W7 | 24 Jun | Wed | x_standalone | W7X3 | What Good Looks Like | Educational | MOF | [A] | `w7-w7x3` |
| 50 | W7 | 24 Jun | Wed | x_thread | W7XT1 | What Good Looks Like | Question | MOF | [A] | `w7-w7xt1` |
| 51 | W7 | 25 Jun | Thu | linkedin | W7L4 | What Good Looks Like | Specificity Signal | MOF | [A] | `w7-w7l4` |
| 52 | W7 | 25 Jun | Thu | x_standalone | W7X4 | What Good Looks Like | Negative Hook | MOF | [A] | `w7-w7x4` |
| 53 | W7 | 25 Jun | Thu | tiktok_reel | W7TR2 | What Good Looks Like | Callout | BOF | [A] | `w7-w7tr2` |
| 54 | W7 | 26 Jun | Fri | linkedin | W7L5 | Trust + Authority | Curiosity Gap | BOF | [A] | `w7-w7l5` |
| 55 | W7 | 26 Jun | Fri | instagram_feed | W7IF3 | Trust + Authority | Slippery Slope | BOF | [A] | `w7-w7if3` |
| 56 | W7 | 26 Jun | Fri | instagram_story | W7IS3 | Trust + Authority | Educational | BOF | [A] | `w7-w7is3` |
| 57 | W7 | 26 Jun | Fri | newsletter | W7NL1 | Trust + Authority | Question | MOF_BOF | [A] | `w7-w7nl1` |
| 58 | W8 | 29 Jun | Mon | linkedin | W8L1 | Pain Recognition | Curiosity Gap | TOF | [A] | `w8-w8l1` |
| 59 | W8 | 29 Jun | Mon | instagram_feed | W8IF1 | Pain Recognition | Slippery Slope | TOF | [A] | `w8-w8if1` |
| 60 | W8 | 29 Jun | Mon | instagram_story | W8IS1 | Pain Recognition | Educational | TOF | [A] | `w8-w8is1` |
| 61 | W8 | 29 Jun | Mon | x_standalone | W8X1 | Pain Recognition | Question | TOF | [A] | `w8-w8x1` |
| 62 | W8 | 30 Jun | Tue | linkedin | W8L2 | Pain Recognition | Specificity Signal | TOF | [A] | `w8-w8l2` |
| 63 | W8 | 30 Jun | Tue | x_standalone | W8X2 | Pain Recognition | Negative Hook | TOF | [A] | `w8-w8x2` |
| 64 | W8 | 30 Jun | Tue | tiktok_reel | W8TR1 | Pain Recognition | Callout | MOF | [A] | `w8-w8tr1` |
| 65 | W8 | 01 Jul | Wed | linkedin | W8L3 | Pain Recognition | Curiosity Gap | MOF | [A] | `w8-w8l3` |
| 66 | W8 | 01 Jul | Wed | instagram_feed | W8IF2 | Pain Recognition | Slippery Slope | MOF | [A] | `w8-w8if2` |
| 67 | W8 | 01 Jul | Wed | instagram_story | W8IS2 | Pain Recognition | Educational | MOF | [A] | `w8-w8is2` |
| 68 | W8 | 01 Jul | Wed | x_standalone | W8X3 | What Good Looks Like | Question | MOF | [A] | `w8-w8x3` |
| 69 | W8 | 01 Jul | Wed | x_thread | W8XT1 | What Good Looks Like | Specificity Signal | MOF | [A] | `w8-w8xt1` |
| 70 | W8 | 02 Jul | Thu | linkedin | W8L4 | What Good Looks Like | Negative Hook | MOF | [A] | `w8-w8l4` |
| 71 | W8 | 02 Jul | Thu | x_standalone | W8X4 | What Good Looks Like | Callout | MOF | [A] | `w8-w8x4` |
| 72 | W8 | 02 Jul | Thu | tiktok_reel | W8TR2 | What Good Looks Like | Curiosity Gap | BOF | [A] | `w8-w8tr2` |
| 73 | W8 | 03 Jul | Fri | linkedin | W8L5 | Trust + Authority | Slippery Slope | BOF | [A] | `w8-w8l5` |
| 74 | W8 | 03 Jul | Fri | instagram_feed | W8IF3 | Trust + Authority | Educational | BOF | [A] | `w8-w8if3` |
| 75 | W8 | 03 Jul | Fri | instagram_story | W8IS3 | Trust + Authority | Question | BOF | [A] | `w8-w8is3` |
| 76 | W8 | 03 Jul | Fri | newsletter | W8NL1 | Trust + Authority | Specificity Signal | MOF_BOF | [A] | `w8-w8nl1` |

### Recommendations

- **Funnel mix:** shift one TOF slot per week to MOF→BOF (Sprint offer).
- **Below the noise floor:** 0 pieces had < 50 clicks — treat as neutral, not negative signal.

### Top performers (signups, then clicks)

| File ref | Platform | Pillar | Hook | Signups | Clicks |
|---|---|---|---|---:|---:|
_(no piece has any attributed signups yet)_

### Signups per pillar

| Pillar | Signups | Pieces | Signups / piece |
|---|---:|---:|---:|
_(no data for pillar)_

### Signups per hook pattern

| Hook | Signups | Pieces | Signups / piece |
|---|---:|---:|---:|
_(no data for hook)_

### Signups per platform

| Platform | Signups | Pieces | Signups / piece |
|---|---:|---:|---:|
_(no data for platform)_

_Re-author each planned slot by hand — do not ship script-generated copy. See `voice-guide.md` for tone and `proof-points.md` for verified numbers._
<!-- WEEK5_PLANNER:END -->
