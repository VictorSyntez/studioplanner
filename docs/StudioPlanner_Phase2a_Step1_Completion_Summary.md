# StudioPlanner — Phase 2a Step 1 Completion Summary

**Date:** 2026-06-13/14
**Focus:** OP-9 root fix + unified-pipeline Waltz re-parse (Phase 2a Step 1)
**Outcome:** **COMPLETE and committed.** Approved at Checkpoint 2. Session paused before Step 2 by choice.

---

## Executive summary

Step 1 shipped the OP-9 root fix by re-parsing all Waltz figures' structural data from the archived ballroomguide source into a corrected schema, removing the display-layer workaround in the same commit. The unified pipeline is now proven end-to-end on Waltz (archive -> parse -> corrected schema -> clean render), which de-risks the remaining 7 dances into mechanical repeats. Checkpoint 2 review caught and resolved two real issues — an audited-figure data overwrite and a provenance-label risk — and encoded a 6-figure audit worklist into the data itself. No content was lost; all figures are honestly labeled `parsed` (un-audited, pending pilot validation).

---

## What was done

- **Parser** `scripts/parse_bg_waltz.js` rebuilds `FIGURE_RICH_DATA` from `sources/ballroomguide/workshop/standard/waltz/`.
- **Corrected schema:** `rise` (rise & fall only) / `cbm` (own field) / `timing` (verbatim) / `position` / `notes`. OP-9 pipe contamination eliminated (0 pipes, confirmed on-screen). Technique fragments preserved into `notes` with `[migrated-from-rise: ...]` tags. 'Moving' column parsed, not stored.
- **Workaround removed:** `FigureDetailPanel` pipe-split deleted; binds `s.timing`; `position` added to `OPTIONAL_COLS`.
- **Figure set:** 33 -> 34 (`Waltz Prep Step` added, Victor-confirmed).
- **Anomaly report:** `docs/StudioPlanner_Phase2a_Step1_Anomalies.md` — 252 items, 0 unparseable, 0 conflicts.

## Checkpoint 2 — issues caught and resolved

1. **Audited-figure overwrite (real bug).** The parser applied the `audited` label to Open Impetus and Wing but overwrote its values with ballroomguide. Victor's decision: **accept the ballroomguide values**, relabel `dataStatus: 'parsed'`, return it to the audit queue. The underlying parser bug (label applied, data not hard-protected) is logged for a fail-closed fix before any Phase 2b audited re-parse.
2. **Provenance label (integrity check).** Fallaway Whisk has no ballroomguide source. Confirmed correctly labeled `sources: ['dancecentral']` — not falsely ballroomguide.
3. **Bar-count false alarm.** Apparent "3 vs 6 / 7 step" discrepancies were the two-bar render (3 counts per bar, BAR 1 / BAR 2 tabs) — not a parser error.

## Audit worklist encoded (Phase 2b)

6 figures tagged `auditPriority: 'high'` (parser re-emits via `AUDIT_PRIORITY` map):
Back Lock, Double Reverse Spin, Hesitation Change, Left Whisk, Turning Lock to R, Weave from PP — reasons: step-count mismatches (note-placement may be misaligned) and/or blank rise & fall in source.

## Key learning

The 252 anomalies are overwhelmingly cosmetic rise-phrasing normalization (ballroomguide house style). The substantive risk is concentrated in the step-count-mismatch figures, where old and new step decompositions differ and migrated notes may sit on the wrong step — now flagged for audit rather than silently shipped.

---

## Where we stopped / next action

Step 1 committed; session paused. **Next: Phase 2a Step 2** (Tango -> Foxtrot -> Quickstep, then Latin) in Claude Code — a mechanical repeat of the validated Step 1 process. The Step 2 prompt (to be drafted in the claude.ai Project) must fold in: the `workshop/` path prefix, the Jive structural gap (D-3) surfacing at Latin, and the `foxtrot` <-> `slow-foxtrot` alias.

## Outstanding (non-blocking)
- Apply brief + roadmap doc edits (one full regen now that Step 1 is settled).
- Confirm `.firebase/` gitignored; resolve roadmap path duplication.
- Parser audited-exclusion fail-closed fix — before Phase 2b.
