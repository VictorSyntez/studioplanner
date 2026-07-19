# StudioPlanner — Handoff Document

**Date:** 2026-07-18 (supersedes the 2026-06-14 evening revision)
**Current branch:** `main` — Phase 2a **Step 3 (Foxtrot parse) COMPLETE** (`fda1892`, NOT deployed — data-only) + **UI bugfix `a372ce0`** (dance-aware detail labels + vite dep-scan, NOT deployed). Prior: Step 2c (`a187d4e`), Step 2b (`bcc703c`, deployed).
**Session commits (in order):** `556ac3a` (outstanding handoff doc) → `a187d4e` (Step 2c) → `bcc703c` (Step 2b) → `3952966` (docs handoff) → `3c7874b` (routine sheets/floorcraft) → `fda1892` (Step 3 Foxtrot) → `05a80e6` (Step 3 handoff) → `a372ce0` (UI bugfix)
**Deployed at:** https://dancepraktika-studioplanner.web.app/ — last deploy 2026-07-18 includes Step 2c + Step 2b UI. **Step 3 (Foxtrot) is committed but NOT deployed** (data-only, per work order).
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Fast re-entry — state on resume
1. **Keying model:** Option B (dance-namespaced) — stable across Waltz/Tango/Foxtrot.
2. **Next major action: Phase 2a Step 4 — Quickstep parse** (clone `parse_bg_foxtrot.js`). No work started. Spec under *Next action*. **Read the Foxtrot learnings first** — Quickstep's Table B column set must be verified from source, NOT assumed.
3. **Josh-and-Jill legacy Tango item chore — RESOLVED (Victor-confirmed done, 2026-07-18).** No further action.
4. Tree should be clean at `a372ce0` — verify `git status` on resume per standard pre-flight.
5. **Two NDCC source PDFs restored into the repo (untracked):** `docs/NDCC_Ballroom_Syllabus.pdf` (Waltz/Tango/Foxtrot/Quickstep source) and `docs/NDCC_Latin_Syllabus.pdf` (future Latin step). Victor chose NOT to commit them with Step 3 — decide tracking at a later step.

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

### Phase 2a Step 3 (Foxtrot) — COMPLETE (`fda1892`, NOT deployed) ← NEW
30 Foxtrot figures (from 31 BG pages; `parse_bg_foxtrot.js` cloned from the Tango parser). Per-dance counts now **Waltz 34 / Tango 30 / Foxtrot 30**. Full NDCC #1–25 coverage; 5 ISTD-only figures null-tier. Details in `docs/StudioPlanner_Phase2a_Step3_Foxtrot_Anomalies.md`.
- **Table B is a 7-col HYBRID** (`Timing | Rhythm | Position | Rise & Fall | Sway | Footwork`) — carries BOTH Tango's `Rhythm` AND Waltz's `Rise & Fall`/`Sway`, all populated. This **contradicted the work order's §3.3 6-col spec**; the real source structure won (verified from all 31 files). *Lesson for Quickstep: verify Table B columns from source, never assume.*
- **New rhythm token `S(S)`** (Foxtrot Prep Step) outside Tango's `S/Q/&` set — stored verbatim, not normalized.
- **NDCC name-mapping (Victor's figure-by-figure §7 rulings):** 12 auto-exact + 13 overrides. Word-order pairs kept BG spelling as the key with NDCC number attached (e.g. `Hover Feather`→#12 "Feather Hover", `Natural Telemark`→#13, `Hover Telemark`→#14, `Hover Cross`→#15, `Top Spin`→#11, `Outside Swivel`→#16). Renames with `priorBgName`: `Weave from PP` (#18), `Curved Feather to Back Feather` (#21), `Natural Zig-Zag from PP` (#22).
- **#10 is a two-page JOIN** (Victor-ruled): `Open Telemark` + `Feather Ending` → one entry `Open Telemark & Feather Ending` (6 steps/role, bars 1–2, `priorBgName: 'Open Telemark + Feather Ending'`). Steps concatenated verbatim across the seam; step data continuous (PP→PP / Facing DW→DW); the prose moving-label difference (`Ended Moving LOD` vs `Commenced Moving to Centre`) kept verbatim and flagged.
- **5 residual null-tier ("Needs Review"):** Open Natural Turn, Foxtrot Prep Step, Natural Twist Turn with Closed Impetus & Feather Finish Ending / with Open Impetus Ending / with Weave Ending.
- **Two source-chart anomalies flagged (Phase 2b), NOT auto-corrected:** `Hover Cross` (Man) had a spurious empty trailing row (step 8, dropped as noise); `Natural Zig-Zag from PP` (Lady) has misaligned Steps-vs-Timing charts (A `{1,2,3,5,6}` vs B `{1,2,3,4,5}`) — left as-is per Victor.
- Build passes; `data.js` pure-addition (Waltz/Tango untouched); `App.jsx` untouched. No-Beginners tier edge case verified (library groups Foxtrot with no Beginners tier + "Needs Review"×5).

### Post-Step-3 UI bugfix — COMPLETE (`a372ce0`, NOT deployed) ← NEW
Reported symptom: mixed-dance session items "all show Waltz" and "render empty."
- **Root cause (the real bug): two hardcoded literal `"Waltz"` labels** — `FigureDetailPanel` header (`FIGURE · Waltz`) and the item-editor sub-label (`Waltz · N bars`). The DATA path resolved `item.dance` correctly; only the LABEL was a string literal → label-vs-data divergence (e.g. Open Telemark & Feather Ending rendered full Foxtrot data yet labeled Waltz). Fixed: both derive from the resolved dance (`resolvedDance` / `item.dance || 'Waltz'`).
- **The item-CREATION dance path was already correct — NO change made there.** All creation sites (`handleDropRoot`, `handleDropChild`, `handleMobileAddItem`) stamp `dance: data.dance || null`; every catalog entry carries `dance`; catalog↔rich accented-key parity is clean (`Reverse Corté` etc. resolve fine); Firestore save/load preserves `dance`. The "loses its dance stamp" premise did not hold.
- **The "empty step tables" symptom = broken vite dep-scan dev session, NOT a data bug.** Fixed with `optimizeDeps.entries=['index.html']` in `vite.config.js` (scanner was globbing the gitignored `sources/` mirror and choking on `.../<fig>?src=routine.html` names → ~106 `UNRESOLVED_ENTRY`). Victor live-tested post-fix: all figures render. **Do NOT re-investigate.**
- Legacy `|| 'Waltz'` fallback for pre-2c Firestore items preserved (mandatory/permanent).

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

## Next action — Phase 2a Step 4: Quickstep parse

Mechanical repeat under Option B. **Clone `scripts/parse_bg_foxtrot.js`** (the newest, cleanest template — namespaced output, NDCC override-with-rename + `priorBgName`, two-page JOIN support, within-dance dupe check, A/B step-set mismatch detection, empty-row dropping).
- **VERIFY Quickstep's Table B column set from source FIRST — do NOT assume.** Foxtrot's real Table B (7-col hybrid with `Rhythm` + `Rise & Fall` + `Sway`) contradicted its work order's stated 6-col spec. Also enumerate the rhythm/timing token set from source (Foxtrot surfaced a new `S(S)` token). Adapt the `join()` and `buildNewStep()` to whatever Quickstep actually prints.
- Extract Quickstep NDCC entries from `docs/NDCC_Ballroom_Syllabus.pdf` (**now in the repo**, column 4 of 4) via the pdftoppm rasterize + crop-and-enlarge method → `docs/ndcc_quickstep_syllabus.json`. NDCC Quickstep = 31 figures (Beginners 1–5, Pre-Bronze 6–13, Bronze 14–20, Silver 21–26, Gold 27–31).
- Source dir: `sources/ballroomguide/workshop/standard/quickstep/`.
- Integrity check: per-dance counts (`['Waltz']===34`, `['Tango']===30`, `['Foxtrot']===30`, + Quickstep) — md5 retired.
- Only EXACT NDCC matches auto-applied; fuzzy/word-order/join decisions → §-checkpoint, Victor confirms figure-by-figure; then populate `NDCC_OVERRIDES`/`JOINS` and re-run. Data-only (no deploy). Unmatched → null-tier "Needs Review."

## After Quickstep
Latin (Jive structural gap **D-3** surfaces there — ballroomguide thin, dancecentral promotion is Victor's call; `docs/NDCC_Latin_Syllabus.pdf` is restored in the repo). Then Phase 2b Victor-paced audit (Foxtrot's flagged zig-zag misalignment + provisional bar derivation land here), Step 4 dancecentral enrichment merge.

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
| `src/data.js` | `FIGURES` (dance-keyed) + **`FIGURE_RICH_DATA` (dance-NAMESPACED: Waltz 34 / Tango 30 / Foxtrot 30)**. Explicit null-tier guard + null-safe sort in `getFigures`. |
| `scripts/parse_bg_foxtrot.js` | **Newest / go-forward template for Quickstep/Latin.** Namespaced output, NDCC override-with-rename + `priorBgName`, two-page `JOINS`, within-dance dupe check, A/B step-set mismatch detection, empty-row dropping, 7-col hybrid Table B. |
| `scripts/parse_bg_tango.js` | Prior template (5-col Table B). Superseded by the Foxtrot parser as the clone source. |
| `scripts/parse_bg_waltz.js` | Historical (Step 1). Untouched by design. |
| `scripts/migrate_2c_nesting.js` | Provenance record of the Step 2c nesting migration. |
| `docs/ndcc_tango_syllabus.json` · `docs/ndcc_foxtrot_syllabus.json` | Verbatim NDCC tier/number sources (Tango 27, Foxtrot 25). |
| `docs/StudioPlanner_Phase2a_Step3_Foxtrot_Anomalies.md` | Step 3 anomaly report (blank timings, A/B mismatches, #10 join seam, ISTD-only bucket, provisional bar counts). |
| `docs/NDCC_Ballroom_Syllabus.pdf` · `docs/NDCC_Latin_Syllabus.pdf` | NDCC source PDFs restored from Trash (untracked — not committed with Step 3). |
| `sources/` | **Gitignored.** Archives + manifests. |

---

## Notes for next session
- **Resume at Quickstep (Step 4).** Baseline `a372ce0`; standard pre-flight (clean tree, per-dance counts 34/30/30, build). Clone `parse_bg_foxtrot.js`.
- **Biggest Foxtrot lesson:** the work order's stated Table B shape was WRONG (said 6-col, real source was 7-col hybrid). Verify Quickstep's columns + token set from source before writing the join. Standing rule held: real source won, flagged the discrepancy, no dreaming.
- Josh-and-Jill legacy Tango item chore — **resolved** (no longer an open item).
- NDCC is the syllabus authority, **not CDF**.
- **KB-lag rule:** check live file state before new work. (This session began with a stale KB `data.js` — the rule earned its keep.)
- **Canonical-source rule:** Code's memory files are recall, not truth — KB wins on any disagreement. Code has recorded the Step 2c learnings in its memory; this handoff remains the authority.
- **`docs/SCHEMA.md` recommendation stands** (not blocking): promote a canonical field-by-field schema reference into `docs/` — now including the nested `FIGURE_RICH_DATA` shape, `item.dance`, `rhythm`, `priorBgName`.
- **Upload this handoff** and modified files to the Project KB at session close.
