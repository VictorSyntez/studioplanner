# StudioPlanner — Handoff Document

**Date:** 2026-07-26 **rev 5** (supersedes rev 4, same date — rev 4 closed session 1 of 2026-07-26; this revision closes session 2, a rulings-only sitting)
**This revision:** produced in the planning layer at close of the 2026-07-26 **session 2** (PS-view verification · Waltz reconciliation sitting · Foxtrot #16 compound ruling · null-tier schema ruling · Waltz bar parameterization ruling). No code was written and nothing was committed this session — all outputs are rulings + three work orders + this handoff.
**Current branch:** `main` at `429dfc1` (**`v0.3.2-ui`**), unchanged since rev 4. Deployed and live at https://dancepraktika-studioplanner.web.app/ (bundle-verified). Badge-over-gate active: 59 audited / 55 parsed, 114 figures (Waltz 34 / Tango 30 / Foxtrot 30 / Quickstep 20).
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Session outcomes (2026-07-26, session 2)

1. **PS-view verification (queue item 3) CLOSED** — Victor ran the on-device pass (all-bars rendering, badge state, live Firestore `barsUsed` round-trip, phone layout) and verified it.
2. **Waltz reconciliation sitting COMPLETE** (queue item: resumed at ruling 1, ran to the end). Eight rulings, all Victor, 2026-07-26:
   - #10 → rename `Reverse Corte` (NDCC verbatim)
   - #16 → rename `Progressive Chasse to Right` (full word; **accent stripped by explicit scoped ruling** — deviation from NDCC print)
   - #22/#23 → rename `Open Impetus & Cross Hesitation` / `Open Impetus & Wing` (NDCC verbatim `&`; #19/#20 untouched — NDCC prints "and" there)
   - #29 → rename `Turning Lock to Right` (NDCC verbatim)
   - #32 → rename `Hover Corte` (NDCC verbatim)
   - #1 → **2-key split KEPT** (`Closed Change (LF)` + `(RF)`, both `syllabusNumber: 1`; key names stand)
   - #6 → rename `Chasse from PP` (BG/PP form kept; **accent stripped by explicit scoped ruling** — deviation from all three source prints; NDCC prints "Chassé from Promenade", DC "Chassé from Promenade Position")
   - Singular/plural **CONFIRMED as `cosmetic`** (alias-map classification rule stands)
   - **Net: SEVEN key renames** (planning-layer ledger in-session said "six" — corrected in the WO and here). **No accent policy exists** — the two accent-strips are individually scoped. Observed outcome: Waltz key set becomes fully ASCII.
   - WO: `StudioPlanner_WO_Waltz_Key_Renames.md` (produced this session, in KB).
3. **Foxtrot #16 compound JOIN RULED** (queue item 4): **option (a) — construct the compound**, from four BG components (Open Telemark 3 + Open Natural Turn 3 + Outside Swivel 1 + Feather Ending 3 = 10 steps/role). Sub-rulings: compound key named **`Open Telemark, Natural Turn to Outside Swivel and Feather Ending`** (dancecentral's form; NDCC verbatim "Open Telemark Outside Swivel and Feather Ending" carried via `syllabusNotes`); standalone `Outside Swivel` → **null-tier standalone** (chart retained, stays `parsed`). **Binding execution condition (Victor's dance-domain note):** all three seams presented to Victor for review pre-commit, showing commencing/ending positions + alignments for both roles at each connected point — his stated reason: the Natural Turn is danced from PP inside this grouped figure, unlike its usual closed-position context. WO: `StudioPlanner_WO_Foxtrot16_Compound_JOIN.md`.
4. **Null-tier schema RULED** (queue item 5): Victor first ruled (a), then **revised to (c) — separate `studioLevel` field** in the same sitting; (c) is binding. NDCC fields stay verbatim-or-null; effective level = `studioLevel ?? syllabusLevel`; no values assigned yet (dedicated future sitting); Needs-Review visual treatment stays a 4.5a item. WO: `StudioPlanner_WO_StudioLevel_Schema.md`.
5. **Waltz bar parameterization RULED** (the gate for the remainder audit; Decision #22 series, evidence-then-options pattern with web corroboration as directed by rev 4 conduct notes): **option (a) — 3 beats/bar; counts 1/2/3 = 1 beat each; `&` = zero-beat subdivision within its host count; bar advances at 3 accumulated beats; tokens outside {1, 2, 3, &} flag `bars: null`** for hand-ruling. Known flag case: Waltz `Turning Lock` timing token `4` (`c: '1-2-3,4'`). **The 54-figure Waltz + Tango remainder audit is now unblocked.**
6. **Conduct item for the record:** the in-session ledger miscounted the renames (six vs seven — #22/#23 tallied as one because they were one *ruling*). Caught at WO-writing time by recount against the ruling list. Counter-behavior: ledger counts are recounted against the itemized list before being stated.

## Fast re-entry — state on resume

1. **Pre-flight (standard):** clean tree at `429dfc1` (`v0.3.2-ui`), counts 34/30/30/20 (114), 59 audited / 55 parsed, build. Nothing committed since.
2. **Three WOs are ready for the execution layer**, in this order:
   1. **Waltz key renames** (7 renames; peer stores + `priorBgName` + session-plan sweep with hit-count report; one commit)
   2. **Foxtrot #16 compound JOIN** (assemble → seam-dedupe → **PAUSE for Victor's three-seam review** → apply + `Outside Swivel` null-tier → audit → commit). Lands figure count 115 (Foxtrot 31).
   3. **`studioLevel` schema** (lazy field + resolution logic `studioLevel ?? syllabusLevel`; no values; no visual redesign)
3. **Then queue item: Waltz + Tango remainder audit (54 figures)** — gate discharged (Waltz parameterization ruled, outcome 5 above); method carries over unchanged; Tango uses Decision #22, Waltz uses the new #29-series ruling below.
4. Deploy workflow: Firebase throughout; one deploy per logical unit (renames + compound + schema could ship as one deploy after all three commits pass review — Victor's call at the time).

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion); **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max, Pixel 7; PS tablet migration is workstream two (Step 4.5). Scope: 8 dances (Standard parsed; Latin third workstream).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State (cumulative)

- **Phase 1** complete (`v0.2.0`). **Phase 2a Steps 0–4** complete: unified pipeline, 114 figures, dance-namespaced keying (Option B), "Needs Review" bucket, rhythm column.
- **Phase 2b (Foxtrot + Quickstep)** complete + deployed `v0.3.0-data` (`ef3b0fd`): 49 audited, 26 corrections, Decisions A/B, NDCC wrap-defect repair, Waltz NDCC JSON (32 figures, clean), DC alias map, badge-over-gate.
- **Tango routine audit** complete + deployed `v0.3.1-data` (`c811da1`): 59 audited / 55 parsed.
- **All-bars rendering** complete + deployed `v0.3.2-ui` (`429dfc1`).
- **Session 2 of 2026-07-26:** PS-view verified; all rulings in Session outcomes above; three WOs pending execution.

---

## Locked decisions
1–25. As recorded in rev 3/rev 4 (no-dreaming #5; citation rule #12; peer-store rule #10; keying Option B; workstream sequence 2b→4.5→Latin; Decision A corrections+guard; Decision B heuristic; badge-over-gate; no unaudited Tango in PS plans; Tango bar parameterization #22; all-bars rendering design #23; corrections attribution #24; dancecentral merge slot #25; etc. Rev 3 is the reference text for 1–21).
26. **Waltz reconciliation rulings (Victor, 2026-07-26):** the eight rulings of Session outcome 2, including the seven renames, the #1 split retention, the singular/plural cosmetic confirmation, and the two *scoped* accent-strips (#16, #6 — explicitly not a policy). ← NEW
27. **Foxtrot #16 compound (Victor, 2026-07-26):** construct compound (option a); key = DC form `Open Telemark, Natural Turn to Outside Swivel and Feather Ending`; `Outside Swivel` → null-tier standalone; **mandatory pre-commit three-seam review by Victor** with both roles' positions/alignments at each connected point (PP-context Natural Turn is the stated concern). ← NEW
28. **Null-tier schema (Victor, 2026-07-26): option (c) `studioLevel`** — revised from an initial (a) ruling in the same sitting; (c) binding. NDCC fields verbatim-or-null forever; effective level = `studioLevel ?? syllabusLevel`; values are future Victor rulings. ← NEW
29. **Waltz bar parameterization (Victor, 2026-07-26): option (a)** — 3 beats/bar; 1/2/3 = 1 beat; `&` = 0-beat subdivision; out-of-set tokens flag `bars: null`. Per-dance ruling in the #22 series; Waltz gate discharged. ← NEW

---

## Next action — queue (updated)
1. **Execute WO: Waltz key renames** (Claude Code; diff review; commit)
2. **Execute WO: Foxtrot #16 compound JOIN** (Claude Code; **seam-review pause is mandatory**; audit; commit) → figure count 115
3. **Execute WO: `studioLevel` schema** (Claude Code; diff review; commit) — deploy grouping per Victor at the time
4. **Waltz + Tango remainder audit** (54 figures; both gates discharged — Decisions #22 + #29)
5. **Latin parse** — prerequisites: mid-bar heuristic upgrade; Latin pre-flight list (Status Overview §3.2); PDF tracking decision
6. **Option C gap-fill** (Quickstep 12 + Jive D-3)
7. **Auth QoL:** "Forgot password?" in AuthGate — pre-commercial requirement
After-queue workstreams unchanged: **Step 4.5** (4.5a CSS pass — carries: orphaned `.bar-selector` CSS removal; dead `const bars` App.jsx ~92; optional-column design revisit; **Needs-Review/non-syllabus visual treatment** (now shaped by Decision #28); PWA update prompt; 4.5b PS notes/D-1) → **dancecentral enrichment merge** (Decision #25) → **Latin**.

---

## Deferred / tracked issues (delta vs rev 4)
- ~~PS-view verification~~ — **closed 2026-07-26 session 2** (Victor on-device pass).
- ~~Waltz reconciliation sitting~~ / ~~Foxtrot #16 ruling~~ / ~~null-tier schema decision~~ — **all ruled; moved to WOs** (see queue 1–3).
- **`studioLevel` value-assignment sitting** — NEW, unscheduled; after the schema WO lands, before or during Step 4.5 at Victor's choice.
- **Standalone Foxtrot `Outside Swivel` audit** — NEW: stays `parsed` after its null-tier move; joins the general unaudited pool (not the 54-figure remainder count, which is NDCC-tiered figures).
- All other rev 4 items stand: Option C gap-fill; Step 4.5 blockers; null-tier guard; Silver swivel cluster; Tango #8 gap; security pre-commercial items; licensing review; D-1; Firebase CLI housekeeping; Data Acquisition Brief retirement candidate; `handleBarToggle` lexicographic sort note.

---

## Key Files (delta vs rev 4)
| File | Status |
|---|---|
| `src/App.jsx`, `src/index.css`, `src/data.js` | Unchanged this session; KB staleness flags from rev 4 still apply (refresh to `429dfc1` / `c811da1`). |
| `StudioPlanner_WO_Waltz_Key_Renames.md` | **NEW in KB** — pending execution (queue 1). |
| `StudioPlanner_WO_Foxtrot16_Compound_JOIN.md` | **NEW in KB** — pending execution (queue 2). |
| `StudioPlanner_WO_StudioLevel_Schema.md` | **NEW in KB** — pending execution (queue 3). |
| `StudioPlanner_Handoff.md` | This file (rev 5). Repo `docs/` copy at rev 3 — update at next doc commit. |
| Everything else | As rev 4. |

---

## Notes for next session
- **Read at session start:** this handoff (rev 5) + `StudioPlanner_Session_Conduct_Review.md`.
- **Order:** standard pre-flight → execute the three WOs in queue order (the #16 seam-review pause is a hard stop for Victor) → remainder audit.
- **NDCC is the syllabus authority.** KB-lag rule and canonical-source rule stand. Two-environment split stands. No accent policy exists — do not generalize the two scoped accent-strips.
- **Upload at session close:** rev 5 + the three WOs (this session's set).
