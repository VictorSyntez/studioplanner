# StudioPlanner — Phase 2a Implementation Brief: Multi-Dance Figure Data Acquisition

**Date:** 2026-06-12 **Author:** Claude (claude.ai Project session with Victor) **Executor:** Claude Code (`claude --continue`), step-by-step commit approval per standing pattern **Prerequisite reading:** `StudioPlanner_Handoff.md`, `StudioPlanner_Phase2_Architecture_Roadmap.md`

------

## 1. Context and goal

Phase 2 of StudioPlanner is content-bound: ~99 additional figures across 7 dances need rich data. A parallel consumer now exists — the **Praktika Counts** app (dance count metronome, prototype delivered 2026-06-12) — which derives rhythm tracks from the per-step timing in figure data. One acquisition effort feeds both.

**Goal of Phase 2a:** produce parsed (not yet audited) `FIGURE_RICH_DATA`-shaped entries for all Bronze-cumulative figures in the 7 remaining dances (Tango, Foxtrot, Quickstep, Cha Cha, Rumba, Samba, Jive), using a dual-source pipeline, with routine figures prioritized and an explicit audit-status field.

**Existing Waltz data is canonical and untouched** except for the OP-9 root fix (Section 4).

------

## 2. Decisions locked (2026-06-12 session)

| Decision                  | Resolution                                                   |
| ------------------------- | ------------------------------------------------------------ |
| Scope                     | 8 target dances. Viennese Waltz / Paso Doble only if marginal effort after pipeline is proven — assess at end, do not build for them. |
| Primary structural source | **Ballroomguide mirror** at `idans.nl/workshop/` — clean per-step tables with explicit Timing column, Standard + Latin, Pre-Bronze→Gold. |
| Enrichment source         | **dancecentral.info** — coach notes and commentary, merged where pages exist. Same source family as existing Waltz data. |
| Timing authority          | Parsed timing is provisional. **Victor confirms timing figure-by-figure** for routine figures now; Bronze-cumulative figures promoted to audited later. No silent timing assumptions. |
| Data status model         | Every figure gets `dataStatus: 'parsed' | 'audited'`. Existing Waltz figures: `'parsed'` except the 1 previously audited figure. Promotion to `'audited'` only on Victor's explicit confirmation. |
| OP-9                      | Root fix is now a **prerequisite**, not a deferred item — fix the parser output shape before bulk parsing, or the defect replicates across ~99 figures. |
| Syllabus mapping          | Ballroomguide uses ISTD tiers; NDCC remains the authority for `syllabusLevel` / `syllabusNumber`. Mapping verified per dance against NDCC Appendix VI/VII (in project KB). Mismatches flagged to Victor, never silently resolved. |

------

## 3. Step 0 — Archive (insurance, do first)

The idans.nl site is a mirror; the original ballroomguide.com appears defunct. Archive before parsing.

bash

```bash
mkdir -p ~/studioplanner/sources/ballroomguide
wget --mirror --convert-links --adjust-extension --no-parent \
     --wait=1 --random-wait \
     -P ~/studioplanner/sources/ballroomguide \
     http://idans.nl/workshop/

mkdir -p ~/studioplanner/sources/dancecentral
# Mirror only the international-style subtree:
wget --mirror --convert-links --adjust-extension --no-parent \
     --wait=1 --random-wait \
     -P ~/studioplanner/sources/dancecentral \
     https://www.dancecentral.info/ballroom/international-style/
```

Verify both archives open locally. Commit archives' index/manifest (not necessarily the full HTML payload — Victor's call on repo size; alternatively store outside repo and commit a manifest with checksums).

**Checkpoint: Victor approves before Step 1.**

------

## 4. Step 1 — OP-9 root fix in the parser output shape

**Problem:** original dancecentral parse merged technique notes into the `rise` field with pipe delimiters (e.g., `"CBM | Start to rise at end of 1"`). A display-layer split is live in `FigureDetailPanel`; the data is still wrong at source.

**Fix:**

1. Define the step-row output schema explicitly:
   - `rise` — rise & fall text only
   - `cbm` — boolean or short token (`'CBM'` / `''`), its own field
   - `notes` — technique commentary
2. Update the parser so CBM and technique fragments route to their own fields.
3. Re-run against the archived Waltz pages; diff the result against current `FIGURE_RICH_DATA` to confirm (a) the pipe contamination is gone and (b) nothing else regressed.
4. Migrate existing Waltz `FIGURE_RICH_DATA` to the corrected shape (script, not hand-edit). Remove the `FigureDetailPanel` pipe-split workaround in the same commit.

**Checkpoint: Victor reviews the Waltz diff before any non-Waltz parsing.**

------

## 5. Step 2 — Ballroomguide parser (Standard dances)

Page structure (verified on Waltz Basic Weave, 2026-06-12): per role, two tables —

- Table A: `Step# | Steps | Turn | Alignment | Moving`
- Table B: `Step# | Timing | Position | Rise & Fall | Sway | Footwork`

plus commencing/ending text, numbered chart notes, and Preceding/Following figure lists.

**Parser requirements:**

1. Join Tables A and B on `Step#` into one step row per role.
2. **Timing column is the count-app payload** — preserve tokens verbatim (`1`, `2`, `3`, `&`, `S`, `Q`, `a`). Empty timing cells (observed: step 2 of Basic Weave leader had blank timing in the mirror's markup) must be **flagged, not interpolated** — list all occurrences for Victor.
3. Capture chart notes, commencing/ending positions, preceding/following lists into the figure record.
4. Output shape = corrected `FIGURE_RICH_DATA` schema from Step 1, plus:
   - `dataStatus: 'parsed'`
   - `sources: ['ballroomguide']`
   - `syllabusLevel` / `syllabusNumber`: from NDCC mapping pass (Step 5), not from ISTD page grouping.

**Order:** Tango → Foxtrot → Quickstep (Standard table format is now known; prove the parser on Tango, then the other two are mechanical).

**Checkpoint per dance:** anomaly report to Victor (unparseable rows, blank timings, structural surprises) before committing that dance's data.

------

## 6. Step 3 — Ballroomguide parser (Latin dances)

Latin chart pages confirmed to exist for the full Cha Cha syllabus; **table column structure unverified** — expect differences (no Rise & Fall; likely Footwork/Hip action columns; Cha Cha timing tokens like `2 3 4&1`, Jive `Q a Q`, Samba `1 a 2`, `S`).

1. Inspect one archived Cha Cha Pre-Bronze page; adapt column mapping.
2. Half-beat and quarter-beat tokens (`&`, `a`) are valid step labels — established Waltz precedent (`Count &` in Reverse Pivot).
3. Order: Cha Cha → Rumba → Jive → Samba.

**Checkpoint per dance, as above.**

------

## 7. Step 4 — dancecentral enrichment merge

For each parsed figure, if a dancecentral page exists in the archive:

1. Parse coach notes / commentary (the existing Waltz parser logic, post-OP-9 fix).
2. Merge into the figure record's `notes` fields; append `'dancecentral'` to `sources`.
3. **Conflict rule:** where the two sources disagree on structural data (timing, footwork, alignment), ballroomguide wins the field, the conflict goes into a `conflicts` log for Victor's audit. Never average or pick silently.
4. Figure-name matching between sources will be imperfect (e.g., "Heel Pivot (Quarter Turn To Left)"). Maintain an explicit alias map; unmatched pages reported, not guessed.

------

## 8. Step 5 — NDCC mapping pass

For each dance, map parsed figures to NDCC Appendix VI/VII tiers and numbers (reference tables in `StudioPlanner_Phase2_Architecture_Roadmap.md`, Section A.2 — note Foxtrot has no Beginners tier; Jive Pre-Bronze count is tentative and needs verification against the NDCC PDF).

Output per dance: a mapping table — ballroomguide figure name → NDCC name / tier / number — with three buckets: matched, ISTD-only (present in charts, absent from NDCC Bronze-cumulative), NDCC-only (required by NDCC, no chart found). **Victor resolves the last two buckets explicitly.**

Figures above Bronze-cumulative: parse and retain (Waltz precedent — Silver/Gold figures exist in the library, gated by `syllabusLevel`), but they are out of audit scope.

------

## 9. Step 6 — Routine-priority audit queue

Timing audits with Victor proceed in this order (figures from the four floorcraft routines, deduplicated). Routine names are shorthand — the **mapping to chart figure keys below is provisional and itself part of the audit**:

| #    | Routine name (floorcraft sheet) | Probable chart figure                                        | Dance     |
| ---- | ------------------------------- | ------------------------------------------------------------ | --------- |
| 1    | Two Walks                       | Walk (LF, RF)                                                | Tango     |
| 2    | Progressive Link                | Progressive Link                                             | Tango     |
| 3    | Closed Promenade                | Closed Promenade                                             | Tango     |
| 4    | Open Reverse Turn, Lady Outside | Open Reverse Turn, Lady Outside                              | Tango     |
| 5    | Tango Rocks                     | Rock Turn or Rock Back — **Victor to disambiguate**          | Tango     |
| 6    | Back Corté                      | Back Corté                                                   | Tango     |
| 7    | Feather Step                    | Feather Step                                                 | Foxtrot   |
| 8    | Reverse Turn                    | Reverse Turn (incl. Feather Finish as steps 4-6 or separate — confirm) | Foxtrot   |
| 9    | Feather Finish                  | (see above)                                                  | Foxtrot   |
| 10   | Three Step                      | Three Step                                                   | Foxtrot   |
| 11   | Natural Turn                    | Natural Turn                                                 | Foxtrot   |
| 12   | Heel Pull                       | Natural Turn with Heel Pull / corner ending — **confirm**    | Foxtrot   |
| 13   | LF Walk + Half Natural Turn     | Walk + Natural Turn 1-3 — **confirm decomposition**          | Quickstep |
| 14   | Hesitation                      | Natural Turn with Hesitation — **confirm**                   | Quickstep |
| 15   | Progressive Chasse to Right     | Progressive Chasse to R                                      | Quickstep |
| 16   | Lock (×3 occurrences)           | Forward Lock / Back Lock — **confirm which**                 | Quickstep |
| 17   | Tipple Chasse to Right          | Tipple Chasse to R                                           | Quickstep |

Waltz Pre-Bronze Routine 1 figures are already covered by existing Waltz data (Half Natural, Hesitation, Half Reverse, Weave, Outside Change to PP, Chasse from PP) — they enter the same audit queue but need no new parsing.

After routine figures: remaining Bronze-cumulative figures, dance by dance, as Victor's schedule allows. Audited figures get `dataStatus: 'audited'` plus an `auditedDate`.

------

## 10. Step 7 — Integration into data.js

1. Extend `FIGURES` and `FIGURE_RICH_DATA` per dance. **Keep the `FIGURES` object shape** (`{ 'Waltz': [...], 'Tango': [...] }`) — established decision; do not flatten.
2. Library UI already groups by category → dance → tier (Phase 1); verify non-Waltz dances render, including the Foxtrot no-Beginners edge case.
3. Per-dance color treatment per the Phase 2 roadmap (parallel to Waltz purple) — minimal pass, polish later.
4. Tag release `v0.3.0-data` on completion.

------

## 11. Standing rules for this work

- Step-by-step commit approval: pause after each commit for Victor's review.
- Anomalies surfaced proactively; no silent assumptions, no silent timing interpolation, no silent name matching.
- `App.jsx` reads must be ranged (`[1,223]`, `[223,700]`, `[700,1090]`).
- If `data.js` version is uncertain, verify the file ends with the `FIGURE_RICH_DATA` block (current) vs. `GLOSSARY` export (stale).
- Post-session: modified files and this brief's status updates go back to the Project KB.

## 12. Out of scope for Phase 2a (tracked, not actioned)

- Praktika Counts integration (count-string → timeline parser consuming this data) — next brief, after routine figures are audited.
- Firestore security hardening items (pre-commercial checklist).
- **Licensing/provenance review of chart-derived data before any commercial rollout** — both sources closely follow ISTD technique books; fine for internal pilot, requires review before selling. Added to the pre-commercial checklist alongside the Firestore items.
- Viennese Waltz / Paso Doble — reassess effort after the pipeline is proven on 7 dances.

## 13. Acceptance criteria

1. Both source archives exist locally with manifests.
2. OP-9 fixed at source; Waltz data migrated; display workaround removed; Victor approved the diff.
3. All Bronze-cumulative figures for 7 dances present in `data.js` with `dataStatus: 'parsed'`, correct NDCC tier/number, and `sources` provenance.
4. Per-dance anomaly reports and NDCC mapping tables delivered and resolved by Victor.
5. Routine-figure audit queue (Section 9) established with the disambiguation items answered.
6. App deploys and renders all dances; tagged `v0.3.0-data`.