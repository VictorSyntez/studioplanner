# StudioPlanner — Handoff Document

**Date:** 2026-06-14 (supersedes 2026-06-12)
**Current branch:** `main` — Phase 2a **Step 1 COMPLETE** (OP-9 root fix committed)
**Step 1 commit hash:** `5a94d66`
**Deployed at:** https://dancepraktika-studioplanner.web.app/ (still `v0.2.0`; no deploy this session — Step 1 is data/source work, not a release)
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Project Overview

StudioPlanner is a PWA for ballroom dance lesson planning and delivery. MT (Main Teacher) builds session plans (warmup / N main topics / conclusion) containing figures and TECs; PS (Practice Supervisor) views sessions read-only during class. Target devices: iPhone 14 Pro Max (iOS Safari), Pixel 7 (Android Chrome).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State

### Phase 1 — COMPLETE (`v0.2.0`, deployed 2026-05-24)
Auth, builder, rich figure data, NDCC metadata on 33 Waltz figures, `targetLevel` filtering, PS badge. (Detail in prior handoff revisions.)

### Phase 2a — Step 0 COMPLETE (2026-06-12)
Source acquisition committed (`d54e694`). ballroomguide (structural) from Wayback raw captures — 314 files; dancecentral (enrichment) live mirror — 419 files. Archives gitignored (OQ-2 manifest-only); manifests + provenance committed. See `StudioPlanner_ARCHIVE_PROVENANCE.md`.

### Phase 2a — Step 1 COMPLETE (2026-06-13/14) <- NEW
OP-9 root fix + unified-pipeline Waltz re-parse, executed in Claude Code, approved at Checkpoint 2, committed. The unified pipeline is now **proven end-to-end on Waltz**: archive -> parse -> corrected schema -> clean render.

What changed:
- **New parser** `scripts/parse_bg_waltz.js` builds `FIGURE_RICH_DATA` from archived ballroomguide pages.
- **Corrected step-row schema** — fields are now `bar, timing, foot, alignment, turn, footwork, sway, position, rise, cbm, notes`. (Was: `count, foot, alignment, footwork, turn, sway, rise, notes`.) OP-9 contamination gone: `rise` holds rise & fall only; `cbm` is its own field; `timing` is verbatim from source; technique fragments migrated into `notes` tagged `[migrated-from-rise: ...]`. The source 'Moving' column is parsed but not stored.
- **Workaround removed** — `FigureDetailPanel` pipe-split deleted; binds to `s.timing`; `position` added to `OPTIONAL_COLS`.
- **Figure count 33 -> 34** — added `Waltz Prep Step` (syllabusLevel 'Beginners', syllabusNumber 33), confirmed with Victor.
- **Provenance per figure:** all `dataStatus: 'parsed'`. `sources: ['ballroomguide']` except **Fallaway Whisk** = `['dancecentral']` (no ballroomguide source; OP-9 in-place migration only) and the Prep Step.
- **Open Impetus and Wing** (was the only audited figure): Victor accepted ballroomguide values -> `dataStatus: 'parsed'`, re-enters audit queue.
- **Anomaly report** `docs/StudioPlanner_Phase2a_Step1_Anomalies.md` — 252 items, **0 unparseable, 0 conflicts**. Overwhelmingly cosmetic rise-phrasing normalization.
- **6 figures tagged `auditPriority: 'high'`** (Phase 2b worklist; parser re-emits via `AUDIT_PRIORITY` map): Back Lock, Double Reverse Spin, Hesitation Change, Left Whisk, Turning Lock to R, Weave from PP.

---

## Locked decisions (Phase 2a)
1. **Unified pipeline** — all 8 dances take structural data from ballroomguide; dancecentral is enrichment only. Supersedes roadmap A.3.
2. **Structural source = Wayback** captures of `idans.nl/workshop` (live idans 522 -> demoted to revive-and-reconcile).
3. **OQ-2 = manifest-only.**
4. **Existing notes are scraped** — preserved during re-parse; dancecentral re-merge stays at Step 4.
5. **STANDING RULE: "No dreaming, no assumptions on dance content."** All dance content from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved (ballroomguide wins structural). Constrains dance content only, not pipeline mechanics. (Also in Claude's memory for this Project.)

---

## Next action — Phase 2a Step 2 (in Claude Code)
Parse Tango -> Foxtrot -> Quickstep (Standard), then the Latin dances, using the **same validated process** as Step 1. Steps 2-3 are mechanical repeats — this is where the timeline collapses. Fresh checkpoint cycle; do NOT start mid-session without a review block.

**Step 2 prompt must fold in three things learned this session:**
- **Path prefix:** ballroomguide tree is `sources/ballroomguide/workshop/standard/<dance>/` and `.../workshop/latin/<dance>/` (extra `workshop/` segment).
- **Jive structural gap (D-3):** surfaces when Latin is reached — ballroomguide ~6 Jive pages; dancecentral ~30 available as backfill. Victor decides resolution (enrich-only vs. promote dancecentral to structural fallback for Jive).
- **`foxtrot` <-> `slow-foxtrot` alias:** ballroomguide/NDCC use "foxtrot"; dancecentral uses "slow-foxtrot". Seeded for the Step 4 cross-source merge.

Reuse the schema, provenance fields, anomaly-report format, and `auditPriority` tagging established in Step 1.

---

## Deferred / tracked issues
- **OP-9: RESOLVED** (root fix shipped in Step 1). Display-layer workaround removed.
- **6 `auditPriority:'high'` figures** — note-placement may be misaligned on step-count-mismatch figures; Left Whisk + Hesitation Change have blank rise in source. Phase 2b / pilot validates.
- **Left Whisk structure** — 3->7 step count + all rise blank; worth confirming ballroomguide structures it as 7 vs. parser mis-segmentation (open source page during audit).
- **Parser audited-exclusion bug** — applied the `dataStatus` label but did not hard-protect audited *data* (fell through to ballroomguide where fields were missing). Moot for Step 1 (OIW accepted as parsed). **Must be fixed with a fail-closed checksum/allowlist before any future audited-figure re-parse in Phase 2b.** Logged in the anomaly report.
- **Security (pre-commercial):** Firestore `get()` latency in PS read rules; over-permissive invite create rule.

---

## Key Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app; FigureDetailPanel now binds `s.timing`, `position` in OPTIONAL_COLS. Ranged reads ([1,223],[223,700],[700,1090]). |
| `src/data.js` | `FIGURES` + `FIGURE_RICH_DATA` (34 Waltz, corrected schema). |
| `scripts/parse_bg_waltz.js` | Step 1 parser (corrected schema, note migration, AUDIT_PRIORITY map). Template for Step 2-3. |
| `docs/StudioPlanner_Phase2a_Step1_Anomalies.md` | Step 1 anomaly report / audit worklist. |
| `sources/` | **Gitignored.** Archives + manifests. ballroomguide tree under `workshop/`. |
| `StudioPlanner_ARCHIVE_PROVENANCE.md` | Source origin, method, counts, gaps, OQ-2. |
| `StudioPlanner_Phase2a_Data_Acquisition_Brief.md` | Executable Phase 2a spec (in KB; save to repo `docs/` if Claude Code needs it). |
| `StudioPlanner_Phase2_Architecture_Roadmap.md` | Phase 2 data model, roadmap, gates. |

---

## Repo-hygiene TODO (non-blocking)
- Continuity docs reorganized into `docs/` and committed this session (was untracked). Confirm `.firebase/` is gitignored.
- Roadmap path duplication: `phase_2_architecture_roadmap.md` (root) vs. `docs/StudioPlanner_Phase2_Architecture_Roadmap.md` — pick one canonical location.
- Brief + roadmap still need the edits in `StudioPlanner_KB_Update_Instructions_2026-06-12.md` applied (plus a Step 1-complete pass). Best done as one full regen now that Step 1 is settled.

---

## Notes for next session
- **Resume at Step 2** in Claude Code; draft the Step 2 prompt in the claude.ai Project first (folds in the 3 learnings above).
- `data.js` step rows use the **new schema** (`timing`/`cbm`/`position`) — don't revert to `count`.
- App.jsx is large — ranged reads required.
- NDCC is the syllabus authority, not CDF.
- Claude Code persisted Step 2 context + the standing rule to its own project memory (recalled at session start). Treat the handoff/KB as the canonical source of truth; if Code's memory and the KB ever disagree, the KB wins — reconcile rather than trust Code's recall.
