# StudioPlanner — Work Order: `studioLevel` Value Assignment

**Date ruled:** 2026-07-27 · **ruledBy: Victor** · **Executor:** Claude Code
**Supersedes nothing.** This WO discharges the deferred half of `StudioPlanner_WO_StudioLevel_Schema.md`, which introduced the `studioLevel` field lazily and explicitly deferred both the value vocabulary and all per-figure values to "a dedicated future sitting." This is that sitting.
**Baseline:** `main` at `88b48ea`, tag `v0.5.0-data`. 115 figures, 114 audited / 1 parsed.

---

## Ruling 1 — Value vocabulary: mirror NDCC (locked decision #31)

`studioLevel` values are drawn **only** from the existing `LEVEL_ORDER` in `data.js`:

```
['Beginners', 'Pre-Bronze', 'Bronze', 'Silver', 'Gold', 'Gold Star']
```

No studio-specific level names. No extension of `LEVEL_ORDER`. No parallel ordering.

**Consequences:**
- Every assigned value is already orderable, so tier grouping and the cumulative `targetLevel` filter work on assignment with **no code change**.
- **Code's `studioLevel` unrecognised-vocabulary defensive interim is retired by this ruling.** Removing or keeping the guard is Code's engineering call; if removed, say so at diff review.
- NDCC fields (`syllabusLevel`, `syllabusNumber`, `syllabusBody`) remain verbatim-or-null forever, untouched by this WO.
- Resolution logic is unchanged: `effectiveLevel(f) = studioLevel ?? syllabusLevel` (locked decision #28).

*(Decision number #31 assigned by the planning layer; #30 is the Tango `&` ruling assigned by Code at rev 7.)*

## Ruling 2 — Cross-body (CDTA) divergences ride in `syllabusNotes`

Confirmed against existing precedent, quoted from `data.js` (`Quickstep / Closed Impetus`):

```
syllabusLevel: 'Pre-Bronze', syllabusNumber: 10, syllabusBody: 'NDCC',
syllabusNotes: 'CDTA: Bronze figure (NDCC: Pre-Bronze #10).',
```

Any CDTA tier divergence Victor identifies is recorded as free text in `syllabusNotes` on the figure. It never enters `syllabusLevel` and never enters `studioLevel`. **No CDTA values are assigned in this WO** — Victor's CDTA review is a separate, open item.

## Ruling 3 — `Quickstep / Quickstep Prep Step` bars confirmed at 4

Surfaced at the sitting as an anomaly (Waltz and Foxtrot Prep Steps are `bars: 2` with the same 3-steps-per-role shape; Quickstep is `bars: 4`). **Victor ruled the stored value correct.** No data change, no correction entry. Anomaly closed, not tracked forward.

---

## Ruling 4 — Per-figure values (the full assignment set)

All ten figures carrying `syllabusLevel: null` receive a `studioLevel`. **This is the complete candidate set** — verified at time of writing by scanning `FIGURE_RICH_DATA` for `syllabusLevel: null`. No other figure receives a `studioLevel` in this WO.

| # | Dance | Figure | `studioLevel` |
|---|---|---|---|
| 1 | Waltz | Waltz Prep Step | **Bronze** |
| 2 | Tango | Point to Promenade Position | **Bronze** |
| 3 | Tango | Reverse Outside Swivel | **Silver** |
| 4 | Foxtrot | Open Natural Turn | **Silver** |
| 5 | Foxtrot | Outside Swivel | **Silver** |
| 6 | Foxtrot | Foxtrot Prep Step | **Bronze** |
| 7 | Foxtrot | Natural Twist Turn with Closed Impetus & Feather Finish Ending | **Gold** |
| 8 | Foxtrot | Natural Twist Turn with Open Impetus Ending | **Gold** |
| 9 | Foxtrot | Natural Twist Turn with Weave Ending | **Gold** |
| 10 | Quickstep | Quickstep Prep Step | **Bronze** |

**Distribution:** Bronze 4 · Silver 3 · Gold 3.

**Notes on the set:**
- All three Prep Steps → Bronze (ruled individually, consistent result).
- All three Natural Twist Turn ending-variants → Gold. Corroborating context quoted from `ndcc_foxtrot_syllabus.json`: the base figure `Natural Twist Turn` is **NDCC Gold #20**. This was an observed consistency, not the basis of the ruling.
- `Foxtrot / Outside Swivel` is `dataStatus: 'parsed'` — the sole unaudited figure. Its placement is independent of audit status; it continues to display the "Not yet verified" badge until its standalone audit lands (handoff queue item 4). **Do not flip its `dataStatus` in this WO.**

---

## Execution requirements

1. **Peer-store rule (locked decision #10):** every `studioLevel` value lands in **both** `FIGURES` and `FIGURE_RICH_DATA`. Namespacing or writing one store without the other is a half-fix.
2. **No dance-content changes.** All chart fields (`timing`, `foot`, `alignment`, `turn`, `footwork`, `sway`, `position`, `rise`, `cbm`, `notes`, `rhythm`), `bars`, and all NDCC fields must be **byte-identical** before and after. The only delta is the addition of ten `studioLevel` fields per store.
3. **No `corrections[]` entries.** `studioLevel` is a studio placement, not a correction to source data. The corrections log stays at its current totals (Tango 18 / Foxtrot 17 / Quickstep 11 / Waltz 5).
4. **No `dataStatus` changes.** 114 audited / 1 parsed must hold after execution.
5. **Diff review by Victor before commit** (non-negotiable checkpoint).
6. One commit, then pause for review. Deploy + tag per standard workflow if Victor approves.

## Verification

- Build passes.
- Counts unchanged: 115 figures (Waltz 34 / Tango 30 / Foxtrot 31 / Quickstep 20), **114 audited / 1 parsed**.
- `grep -c "studioLevel:" ` on `data.js` returns **20** value-carrying occurrences (10 figures × 2 peer stores), excluding comment lines.
- Library rendering: the ten figures move out of the **Needs Review** bucket into their assigned tier groups. **The Needs Review bucket for Standard should now be empty** — confirm this and report it, since it is the visible end state of the sitting.
- Cumulative `targetLevel` filter: setting target to Bronze surfaces the four Bronze-placed figures; setting to Silver additionally surfaces the three Silver; Gold additionally surfaces the three Gold.
- Spot-check one figure in **both** stores to confirm the peer-store write.

## Explicitly out of scope

- Any CDTA `syllabusNotes` values (Victor's review pending).
- The `Foxtrot / Outside Swivel` standalone audit (handoff queue item 4).
- Needs Review bucket visual redesign/renaming — remains the tracked **Step 4.5a** design-pass item.
- Any change to `LEVEL_ORDER` or to the cumulative-tier ordering logic.
- Latin work.
