# StudioPlanner — Handoff Document

**Date:** 2026-07-18 (supersedes the 2026-06-14 evening revision)
**Current branch:** `main` — Phase 2a **Step 2c (keying migration) COMPLETE** (`a187d4e`) and **Step 2b micro-step COMPLETE** (`bcc703c`, deployed)
**Session commits (in order):** `556ac3a` (outstanding handoff doc) → `a187d4e` (Step 2c) → `bcc703c` (Step 2b)
**Deployed at:** https://dancepraktika-studioplanner.web.app/ — deploy of 2026-07-18 includes the Step 2c migration and Step 2b UI; verified on-device (Android; iOS check per Victor's usual routine). No version-string bump was recorded this session.
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Fast re-entry — state on resume
1. **Keying model RESOLVED (2026-07-18): Option B — dance-namespaced rich data.** The former open decision #4 is closed. Foxtrot is **unblocked**.
2. **Next major action: Phase 2a Step 3 — Foxtrot parse** (clone the Tango parser). No work started. Spec under *Next action*.
3. **Small chore (Victor, manual, ~2 min):** delete the pre-2c Tango figure items in the "Josh and Jill" test session and re-add them from the library so they carry a `dance` stamp. Agreed: no repair script. **Status at session close: not yet confirmed done.**
4. Tree should be clean at `bcc703c` — verify `git status` on resume per standard pre-flight.

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion) containing figures and TECs; **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max (iOS Safari), Pixel 7 (Android Chrome). Scope is expanding from Waltz to all 8 dances (Phase 2a).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State

### Phase 1 — COMPLETE (`v0.2.0`, deployed 2026-05-24)
Auth, builder, rich figure data, NDCC metadata on Waltz figures, `targetLevel` filtering, PS badge.

### Phase 2a Step 0 — COMPLETE (`d54e694`)
Source acquisition: ballroomguide (structural, Wayback) + dancecentral (enrichment). Archives gitignored; manifests + provenance committed. See `StudioPlanner_ARCHIVE_PROVENANCE.md`.

### Phase 2a Step 1 — COMPLETE (`5a94d66`)
OP-9 root fix + unified-pipeline Waltz re-parse. Corrected step-row schema. 34 Waltz figures.

### Phase 2a Step 2 (Tango) — COMPLETE (`898211a`)
30 Tango figures; `rhythm` field added to schema; 26 NDCC-matched, 4 null-standalone. Total 64 figures. Details in the 2026-06-14 handoff revision and `docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md`.

### Phase 2a Step 2c (keying migration) — COMPLETE (`a187d4e`) ← NEW
Executed per `StudioPlanner_Phase2a_Step2c_KeyingMigration_ClaudeCode_Prompt.md` (in KB).
- **`FIGURE_RICH_DATA` restructured to dance-namespaced:** `{ 'Waltz': {34}, 'Tango': {30} }`. Figure keys are clean NDCC names (BG name where unmatched). Cross-dance key collisions are structurally meaningless.
- **Two Tango key reverts (Victor, 2026-07-18):** `Contra Check (Tango)` → `Contra Check`; `Fallaway Reverse and Slip Pivot` → `Fallaway Reverse & Slip Pivot` ("&" per Victor). `FIGURES['Tango']` `.n` values mirrored. Waltz keys unchanged.
- **`item.dance` added to figure-item schema** at all creation sites; **lookups resolve `item.dance || 'Waltz'` — the legacy default is MANDATORY and PERMANENT** (it is what keeps all pre-2c Firestore sessions resolving with zero data migration). Do not "clean it up."
- **Defect found and fixed in-step:** `getFigure()` in `App.jsx` was hardcoded to search `FIGURES['Waltz']` only (via a `WALTZ_FIGURES` closure, now removed). Root cause of all Tango detail panels rendering empty. Fixed to `getFigure(name, dance)` with the same `|| 'Waltz'` default; both call sites updated; repo-wide grep confirmed no remaining dance-blind `FIGURES[...]` reads.
- **Migration script `scripts/migrate_2c_nesting.js` committed** as provenance record (Victor-approved).
- Smoke-verified: legacy Waltz sessions resolve; fresh Tango adds resolve with "FIGURE · TANGO" context.

### Phase 2a Step 2b (micro-step) — COMPLETE (`bcc703c`, DEPLOYED) ← NEW
- **"Needs Review" library bucket:** the former accidental `|| 'Other'` tier fallback renamed and made intentional. Null-tier figures (`syllabusLevel: null`) now pass the `targetLevel` filter via an **explicit guard** in `getFigures` (`f.syllabusLevel != null && ...`) — no longer reliant on the `levelIndex(null) === -1` indexOf coincidence. Verified at every tier including Gold Star.
- **Sort:** null tier → `Infinity` in the comparator — "Needs Review" renders at the **bottom** of each dance section. `syllabusNumber ?? Infinity` null-safe tiebreaker added.
- **Rhythm column rendered:** `{ key: 'rhythm', label: 'Rhythm' }` added FIRST in `OPTIONAL_COLS` (table architecture does not allow adjacency to Timing; first-optional is the closest achievable). Waltz unaffected (no `rhythm` key → column hidden by `visibleOptional` filter).
- Category/dance `|| 'Other'` fallbacks untouched (unreachable in current data). Visual treatment of the "Needs Review" tier deferred to a polish pass.
- **Deployed to Firebase Hosting and verified on-device:** 4 Tango nulls (Rock Turn, Point to Promenade Position, Outside Swivel, Reverse Outside Swivel) visible under "Needs Review" below Gold at all target levels; Tango detail panels show S/Q/& rhythm; Waltz panels unchanged.

---

## Locked decisions (Phase 2a)
1. **Unified pipeline** — all 8 dances take structural data from ballroomguide; dancecentral is enrichment only.
2. **Structural source = Wayback** captures of `idans.nl/workshop`.
3. **OQ-2 = manifest-only** (archives gitignored).
4. **Existing notes are scraped**; dancecentral re-merge stays at Step 4.
5. **STANDING RULE: "No dreaming, no assumptions on dance content."** All dance content from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved (ballroomguide wins structural). Constrains dance content only, not pipeline mechanics.
6. **`rhythm` field** in the step-row schema for Standard dances — verbatim `S`/`Q`/`&`. **Now rendered** (first optional column).
7. **KEYING MODEL (Option B, 2026-07-18) — SUPERSEDES the former decision #7:** `FIGURE_RICH_DATA` is namespaced by dance (`FIGURE_RICH_DATA[dance][figureKey]`); keys are clean NDCC names (BG name where unmatched); no `displayName` field; no dance-qualified suffixes; no orthographic anti-collision spellings. The two former Tango collision-exception mechanisms are retired (keys reverted, see Step 2c). Lookup dance context comes from `item.dance`, legacy default `'Waltz'` (mandatory, permanent).
8. **Null-standalone figures are legitimate** — full structural data, `syllabusLevel: null`, surfaced in the **"Needs Review"** library bucket (built, deployed).
9. **#18 Swivels Fallaway stays in the NDCC JSON, unmatched** (no-op) — not deleted.
10. **AUDIT RULE (from the Step 2c defect): the rich store and the catalog are peer stores.** Any lookup touching `FIGURES[...]` gets the same dance-namespacing audit as `FIGURE_RICH_DATA[...]`. Namespacing one without the other is a half-fix. ← NEW
11. **Legacy pre-2c Tango test items are repaired manually** (delete/re-add), never by script or name-based dance guessing (silent wrong-render risk). ← NEW

---

## Next action — Phase 2a Step 3: Foxtrot parse

Mechanical repeat of the Tango process under the Option B keying model. Work order to be drafted at session start.
- **Clone `parse_bg_tango.js`** (NOT the Waltz parser) — it carries the 5-col Table B handling, NDCC override-with-rename + `priorBgName`, and now writes into `FIGURE_RICH_DATA[dance]`. Cross-dance collision detection is obsolete under Option B; **within-dance** duplicate-key detection stays.
- Extract Foxtrot NDCC entries from `NDCC_Ballroom_Syllabus.pdf` (pdftoppm rasterize + crop method, as for Tango) → `docs/ndcc_foxtrot_syllabus.json`.
- Source dir: `sources/ballroomguide/workshop/standard/foxtrot/`. (dancecentral's `slow-foxtrot` alias is a Step 4 merge concern only.)
- **Expected recurring names (Natural Turn, Reverse Turn, etc.) need NO collision handling** — clean NDCC keys inside the Foxtrot namespace.
- Integrity check: per-dance counts (`Object.keys(FIGURE_RICH_DATA['Waltz']).length === 34`, `['Tango'] === 30`, + Foxtrot) — Waltz md5 is retired as the check.
- Victor confirms NDCC matches figure-by-figure; §-checkpoint before commit; data-only (no deploy).
- Any unmatched figures → `syllabusLevel: null` → they surface automatically in "Needs Review."

## After Foxtrot
Quickstep, then Latin (Jive structural gap **D-3** surfaces there — ballroomguide thin, dancecentral promotion is Victor's call). Then Phase 2b Victor-paced audit, Step 4 dancecentral enrichment merge.

---

## Deferred / tracked issues
- **PWA update prompt** (vite-plugin-pwa "new version available — refresh") — quality-of-life for Victor now, PS users and commercial studios later. Pre-commercial polish item. ← NEW
- **Visual treatment for the "Needs Review" tier** (badge / italic header) — polish pass. ← NEW
- **Fragility note (mitigated):** null-tier library visibility formerly depended on `levelIndex(null) === -1` slipping past the maxLevel filter; now an explicit documented guard in `getFigures`. Do not remove the guard when refactoring the filter. ← NEW
- **Silver swivel/fallaway audit cluster:** Outside Swivel + Reverse Outside Swivel null-standalone; #18 Swivels Fallaway unmatched — below Bronze pilot scope.
- **Open Reverse Turn, Lady in Line (#8)** has no BG figure — may need sourcing or a split later.
- **Parser audited-exclusion fail-closed bug** — deferred to Phase 2b.
- **Security (pre-commercial):** Firestore `get()` latency in PS read rules; over-permissive invite create rule.
- **Licensing review (Risk #4)** before any commercial rollout.
- **D-1 (PS Firestore writes / `psNotes`)** — deferred to Phase 3.5 entry.

---

## Key Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app. `getFigure(name, dance)` now dance-aware; "Needs Review" grouping; `rhythm` in `OPTIONAL_COLS`. Ranged reads required. |
| `src/data.js` | `FIGURES` (dance-keyed) + **`FIGURE_RICH_DATA` (dance-NAMESPACED: Waltz 34 / Tango 30)**. Explicit null-tier guard + null-safe sort in `getFigures`. |
| `scripts/parse_bg_tango.js` | Template for Foxtrot/Quickstep/Latin — writes into `FIGURE_RICH_DATA[dance]`. |
| `scripts/parse_bg_waltz.js` | Historical (Step 1). Untouched by design. |
| `scripts/migrate_2c_nesting.js` | Provenance record of the Step 2c nesting migration. |
| `docs/ndcc_tango_syllabus.json` | Verbatim NDCC Tango tier/number source (27 entries). |
| `docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` | Step 2 anomaly report — amend: both collision-exception mechanisms superseded 2026-07-18 (Option B); Fallaway "and" spelling is historical. |
| `sources/` | **Gitignored.** Archives + manifests. |

---

## Notes for next session
- **Resume at Foxtrot (Step 3).** Baseline `bcc703c`; standard pre-flight (clean tree, per-dance counts 34/30, build).
- First: confirm the Josh-and-Jill legacy Tango item chore is done (fast re-entry #3).
- NDCC is the syllabus authority, **not CDF**.
- **KB-lag rule:** check live file state before new work. (This session began with a stale KB `data.js` — the rule earned its keep.)
- **Canonical-source rule:** Code's memory files are recall, not truth — KB wins on any disagreement. Code has recorded the Step 2c learnings in its memory; this handoff remains the authority.
- **`docs/SCHEMA.md` recommendation stands** (not blocking): promote a canonical field-by-field schema reference into `docs/` — now including the nested `FIGURE_RICH_DATA` shape, `item.dance`, `rhythm`, `priorBgName`.
- **Upload this handoff** and modified files to the Project KB at session close.
