# StudioPlanner — Handoff Document

**Date:** 2026-07-25 **rev 3** (supersedes rev 2 of 2026-07-24)
**This revision:** produced in the planning layer from `StudioPlanner_Session_Report_2026-07-25.md` (the designated input document). The 2026-07-25 session was a full working session: code, data, commits, and a production deploy.
**Current branch:** `main` — **Phase 2b (Foxtrot + Quickstep) COMPLETE and DEPLOYED** as **`v0.3.0-data`** (commit `ef3b0fd`, tagged, pushed, `firebase deploy --only hosting`, live bundle verified byte-identical to the tested build).
**Deployed at:** https://dancepraktika-studioplanner.web.app/ — live version is `v0.3.0-data`. **Badge-over-gate policy active:** all 114 figures visible; the 65 `parsed` figures display a **"Not yet verified"** badge (Library rows, detail panels, PS execution view); the 49 `audited` figures display no badge.
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Session outcome summary (2026-07-25)

Phase 2b went from "method undefined" to "complete and deployed" in one day:
- **49 figures audited against source** (Foxtrot 29/30, Quickstep 20/20); **26 source-quality defects corrected** with full provenance.
- **Permanent audit infrastructure adopted:** per-figure `corrections` log (Decision A), audited-exclusion parser guard (fail-closed, proven byte-identical no-op on re-parse), beat-accumulation provisional-bar heuristic (Decision B).
- **Systemic NDCC transcription defect (wrap artifacts) discovered and repaired** — Foxtrot #11–15 and Tango #4–5, #16–20 rebindings, four Tango `data.js` key renames, a live #17 collision resolved, `parse_bg_tango.js` NDCC_MAP defused.
- **`docs/ndcc_waltz_syllabus.json` created** (32 figures, zero wrap artifacts — the only clean column). Citation rule #12 now serviceable for all four Standard dances.
- **Dancecentral alias map** completed for all four dances (126 pages, mirror complete) — `StudioPlanner_DC_Alias_Map_Candidates.md`.
- **First user-facing data-trust feature shipped:** "Not yet verified" badge (first `App.jsx` change since Step 2b).

---

## Fast re-entry — state on resume

1. **Baseline `ef3b0fd` (`v0.3.0-data`), deployed and desktop-verified.** Per-dance counts unchanged: **Waltz 34 / Tango 30 / Foxtrot 30 / Quickstep 20 (114 total).** Audit distribution: **49 audited** (Foxtrot 29 + Quickstep 20) / **65 parsed** (Waltz 34 + Tango 30 + Foxtrot #16). Standard pre-flight on resume: clean tree, counts, build.
2. **Workstream order (Decision #13): Phase 2b → Step 4.5 → Latin.** Phase 2b is complete for Foxtrot + Quickstep; **the remaining Phase 2b block is Waltz + Tango (64 figures), with Tango routine figures at the front** (see standing planning rule below).
3. **First action of the next session: this handoff (rev 3) is that action — done.** The working queue then starts at **Tango routine-figure audits** (queue order in *Next action* below).
4. **Standing planning rule (Victor, 2026-07-25):** **no unaudited Tango figures in PS-executed session plans until their audits land.** ("Tango Rocks" in existing plans resolves to Rock Turn, Beginners #5.)
5. **PS-view verification on `v0.3.0-data` is pending** (desktop verification passed; PS view not yet tested). Close at/before the first PS-supervised session on the new version. Pending item, not a defect.
6. **Two NDCC source PDFs in the repo (untracked):** `docs/NDCC_Ballroom_Syllabus.pdf` and `docs/NDCC_Latin_Syllabus.pdf`. Tracking decision fires when Latin begins (third workstream).
7. **Deploy workflow:** edit → push to GitHub → **Firebase Hosting** (`firebase deploy`). Stack is Firebase throughout (Auth / Firestore / Hosting). No Vercel. Housekeeping note: Firebase token expired mid-deploy last session (re-authed); CLI runs via `npx firebase-tools` — consider a global install or a `deploy` npm script.

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion) containing figures and TECs; **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max (iOS Safari), Pixel 7 (Android Chrome). **PS device migration to a Lenovo tablet is the sequenced second workstream (Step 4.5).** Scope is expanding from Waltz to all 8 dances (Phase 2a Standard complete; Latin third workstream).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State

### Phase 1 — COMPLETE (`v0.2.0`, deployed 2026-05-24)
Auth, builder, rich figure data, NDCC metadata on Waltz figures, `targetLevel` filtering, PS badge.

### Phase 2a Step 0 — COMPLETE (`d54e694`)
Source acquisition: ballroomguide (structural, Wayback) + dancecentral (enrichment). Archives gitignored; manifests + provenance committed. See `StudioPlanner_ARCHIVE_PROVENANCE.md` (KB + repo).

### Phase 2a Step 1 — COMPLETE (`5a94d66`)
OP-9 root fix + unified-pipeline Waltz re-parse. Corrected step-row schema. 34 Waltz figures. Anomaly record: `StudioPlanner_Phase2a_Step1_Anomalies.md` (KB — Phase 2b input for the Waltz audit).

### Phase 2a Step 2 (Tango) — COMPLETE (`898211a`)
30 Tango figures; `rhythm` field added to schema. Details in `StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` (KB). **Post-wrap-correction state (2026-07-25):** 28 NDCC-matched, **2 null-standalone** (Point to Promenade Position, Reverse Outside Swivel); NDCC coverage gap down to **1** (#8 "Open Reverse Turn, Lady in Line").

### Phase 2a Step 2c (keying migration) — COMPLETE (`a187d4e`)
- **`FIGURE_RICH_DATA` restructured to dance-namespaced.** Figure keys are clean NDCC names (BG name where unmatched). Cross-dance key collisions structurally meaningless.
- **`item.dance` added to figure-item schema** at all creation sites; **lookups resolve `item.dance || 'Waltz'` — the legacy default is MANDATORY and PERMANENT** (keeps all pre-2c Firestore sessions resolving with zero migration). Do not "clean it up."
- **Defect fixed in-step:** `getFigure()` was hardcoded to `FIGURES['Waltz']`; now `getFigure(name, dance)` with the `|| 'Waltz'` default; repo-wide grep confirmed no remaining dance-blind `FIGURES[...]` reads.
- Migration script `scripts/migrate_2c_nesting.js` committed as provenance.

### Phase 2a Step 2b (micro-step) — COMPLETE (`bcc703c`, deployed)
- **"Needs Review" library bucket** for null-tier figures, with an **explicit guard** in `getFigures` (`f.syllabusLevel != null && ...`) — do not remove when refactoring. Null tier sorts to bottom (`Infinity` comparator; `syllabusNumber ?? Infinity` tiebreaker).
- **Rhythm column rendered** (first optional column). Waltz unaffected (no `rhythm` key → hidden).

### Phase 2a Step 3 (Foxtrot) — COMPLETE (`fda1892`)
30 Foxtrot figures. **Table B is a 7-col HYBRID** (`Timing | Rhythm | Position | Rise & Fall | Sway | Footwork`) — verified from source against a wrong 6-col spec; *lesson: verify Table B columns from source, never assume.* New rhythm token `S(S)` (Foxtrot Prep Step), stored verbatim. #10 `Open Telemark & Feather Ending` is a Victor-ruled two-page JOIN (6 steps/role; seam re-checked at Step 4, stands, `e8e8c2d`). 5 residual null-tier figures. Details in `StudioPlanner_Phase2a_Step3_Foxtrot_Anomalies.md` (KB). **The two flagged source-chart anomalies (Hover Cross Man trailing row; Natural Zig-Zag Lady A/B misalignment) were resolved in the Phase 2b audit** — see the corrections log in `data.js`.

### Post-Step-3 UI bugfix — COMPLETE (`a372ce0`)
Two hardcoded `"Waltz"` labels fixed (FigureDetailPanel header, item-editor sub-label) — both now derive from the resolved dance. Item-creation dance path was already correct. The "empty step tables" symptom was a broken vite dep-scan session, fixed with `optimizeDeps.entries=['index.html']` in `vite.config.js` — **do NOT re-investigate.**

### Phase 2a Step 4 (Quickstep) — COMPLETE (`a5ea367`)
20 figures parsed. Table B same 7-col hybrid as Foxtrot (verified before the parser was written). Two-pass blind NDCC extraction → `docs/ndcc_quickstep_syllabus.json` (31 figures). **Coverage 19 of 31** — 12 NDCC figures have no ballroomguide page; **Option C** ruled: gap-fill deferred to a dedicated step. #30 `Tipsy to Right & Left` is a two-page JOIN with seam-dedupe (7 steps/role). Details in `StudioPlanner_Phase2a_Step4_Quickstep_Anomalies.md` (KB).

### Phase 2b (Foxtrot + Quickstep audit) — COMPLETE (`12636c0` audit, `ef3b0fd` deploy) ← NEW

**1. Pilot (method definition):**
- Rulings: mode = **against-source** (side-by-side with ballroomguide charts); order = **routine-first**; execution environment = **Claude Code** (local archive).
- Pilot figures (6): Feather Step, Reverse Turn & Feather Finish, Hover Cross (Foxtrot); Progressive Chasse to Right, Tipple Chasse to Right, Running Right Turn (Quickstep).
- **Flip criteria `'parsed'` → `'audited'`:** both roles' full step data reviewed against source; all flagged anomalies ruled; bar assignment confirmed or corrected.
- Pilot finding: provisional bars wrong on 5 of 6 figures; source typos needed corrections with no provenance mechanism — leading directly to Decisions A and B.

**2. Adopted infrastructure:**
- **Decision A:** per-figure `corrections: [{role, step, field, from, to, ruledBy, date}]` log + **audited-exclusion guard** in the parsers (audited figures preserved byte-identical on re-parse; fail-closed). Proven: parser re-run is a no-op on `data.js`. Commit `fb19397`.
- **Decision B:** **beat-accumulation provisional-bar heuristic** — each timing digit = 1 beat, S = 2, Q = 1, 4 beats/bar; unrecognized tokens (`&`, `S(S)`, `S(SS)`, `S(SSS)`, prep `12`, blanks) flag `bars: null` for Victor's ruling, never computed. Beat values Victor-confirmed for **Foxtrot + Quickstep only — do not generalize without a new ruling.**
- **Frozen-docs rule:** Phase 2a anomaly docs are frozen historical artifacts; parser re-runs must not regenerate them.

**3. Full pass:**
- 43 further figures audited; close distribution **49 audited / 65 parsed** (Foxtrot 29 + Quickstep 20 audited; Waltz 34 + Tango 30 + **Foxtrot #16** parsed). Commit `12636c0`.
- **26 corrections logged**, incl. 3 structural rebuilds (Natural Zig-Zag follower 6→5 steps; Six Quick Run follower rebuild; Quickstep Prep Step step-3 column shift). ~1 figure in 2 carried a source defect — against-source rigor justified.
- Beat heuristic validated: reproduced every clean bar split; 1 mid-bar-commencement figure needed the timing-beat-number method. **Latin note: expect more mid-bar figures — upgrade the heuristic before the Latin parse.**
- **New schema convention — `syllabusNotes`:** CDTA cross-body annotations (Closed Impetus #10, Reverse Pivot #12: NDCC Pre-Bronze kept as the binding tier, CDTA Bronze annotated).

**4. NDCC wrap-defect discovery and correction:**
- Raster re-verification proved long figure names wrap across printed lines in the narrow columns; the JSON transcriptions had cut at line boundaries, corrupting number→name bindings.
- **Victor-ruled corrections (2026-07-25):** Foxtrot #11–15: Top Spin · Hover Feather · **#13 Hover Telemark · #14 Natural Telemark (swapped)** · Hover Cross. Tango #4–5: Closed Promenade · Rock Turn. Tango #16–20: Back Open Promenade · Outside Swivels · Fallaway Promenade · Four Step Change · Brush Tap.
- Consequences applied (`38bec5d` + rename/renumber + parser-defuse commits): Tango null-tier 4 → 2 (Rock Turn → Beginners #5; Outside Swivel → Silver #17); four corrupted Tango `data.js` keys renamed to real BG names with `priorBgName` repointed; transient #17 collision resolved (Fallaway Promenade → #18); **`parse_bg_tango.js` NDCC_MAP updated to the ruled bindings (landmine defused — a re-run would have reverted both correction commits); dry-run verified no-op.** Tango coverage gaps 3 → 1.
- **Documented convention:** Tango #1 (Walk LF/RF) and #26 (Five Step + Overturned Five Step) are intentional shared-number split mappings; uniqueness checks treat them as known exceptions.
- **Latin-entry lesson:** all future NDCC column extractions require an explicit **wrap check** (text-line count vs figure-number count per tier band).

**5. Waltz NDCC extraction:**
- `docs/ndcc_waltz_syllabus.json` created: 32 figures (Beginners 6 / Pre-Bronze 3 / Bronze 7 / Silver 9 / Gold 7); two extraction passes agreed exactly; **zero wrap artifacts** — the only clean column of the four. Citation-rule hole for Waltz closed.
- Method note: true two-context blindness unavailable (subagents off); ordering-based protection used, honestly recorded in provenance.
- **Six name divergences flagged for later ruling:** Chassé from Promenade (no "Position" printed); Reverse Corte / Hover Corte (no accents); Silver and/& inconsistency (#19–20 vs #22–23); Turning Lock to R vs "to Right"; Progressive Chassé to R vs "to Right" (#16).

**6. Dancecentral alias map:**
- Full four-dance inventory: 126 figure pages, mirror complete (0 nav-linked-but-missing). Doc: `StudioPlanner_DC_Alias_Map_Candidates.md` (initial `f913f29`; post-correction regen `0805903`).
- Post-correction: the four predicted Tango puzzles collapsed to **exact**; BG↔NDCC axis classified for all four dances. Waltz reconciliation: 24 exact / 6 cosmetic / 2 candidates (Closed Changes 1→2 split; Chassé from Promenade three-way naming) / 1 bg-only.
- Awaiting confirmation: Outside Swivel vs "Outside Swivels" placed in *cosmetic* under a new singular/plural rule.
- **D-3 evidence (recorded, decision deferred):** Quickstep — all 12 NDCC gaps have dedicated dancecentral pages (complete overlap); Foxtrot — 0 gaps, 7 dc-only pages extra-syllabus; Waltz — all three sources agree; Tango — 1 remaining gap.

**7. Deploy — badge-over-gate ruling and `v0.3.0-data`:**
- Planned deploy halted on Claude Code's correct refusal: **no audited/parsed gate existed in code.**
- **Victor's ruling: badge, not gate**, with two amendments: badge copy = **"Not yet verified"** (evidence-based, not "provisional"); badge renders in the **PS execution view** as well as Library/detail panel. First `App.jsx` change since Step 2b; verified in the built bundle (badge on exactly 65 parsed / 0 of 49 audited).
- Outward chain: pushed `e8e8c2d..ef3b0fd`, tagged `v0.3.0-data`, deployed, live bundle byte-identical; badge string + CSS confirmed in served files.
- **Desktop verification passed** (Library, badges, tiers, renamed Tango figures). **PS view not yet tested** — pending item.

---

## Locked decisions
1. **Unified pipeline** — all 8 dances take structural data from ballroomguide; dancecentral is enrichment only.
2. **Structural source = Wayback** captures of `idans.nl/workshop`.
3. **OQ-2 = manifest-only** (archives gitignored).
4. **Existing notes are scraped**; dancecentral re-merge stays at the enrichment-merge step.
5. **STANDING RULE: "No dreaming, no assumptions on dance content."** All dance content from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved (ballroomguide wins structural). Constrains dance content only, not pipeline mechanics.
6. **`rhythm` field** in the step-row schema for Standard dances — verbatim. Rendered (first optional column).
7. **KEYING MODEL (Option B):** `FIGURE_RICH_DATA[dance][figureKey]`; keys are clean NDCC names (BG name where unmatched); no `displayName`, no suffixes, no anti-collision spellings. Lookup dance context from `item.dance`, legacy default `'Waltz'` (mandatory, permanent).
8. **Null-standalone figures are legitimate** — full structural data, `syllabusLevel: null`, "Needs Review" bucket. (Schema future: see open item — `studioLevel` option c recommended, unruled.)
9. **#18 Swivels Fallaway stays in the NDCC JSON, unmatched** — not deleted.
10. **AUDIT RULE (peer stores):** any lookup touching `FIGURES[...]` gets the same dance-namespacing audit as `FIGURE_RICH_DATA[...]`.
11. **Legacy pre-2c Tango test items are repaired manually**, never by script or name-based guessing.
12. **CITATION RULE:** tier and syllabus-number assignments are quoted from the relevant `docs/ndcc_<dance>_syllabus.json` at the moment of writing — never recalled from memory. Binds the planning layer and the pipeline. **Now serviceable for all four Standard dances** (Waltz JSON created 2026-07-25).
13. **WORKSTREAM SEQUENCE (Victor, 2026-07-24): Phase 2b → Step 4.5 → Latin.**
14. **Decision A (Victor, 2026-07-25): corrections provenance + parser write-protection.** Per-figure `corrections` log (`role/step/field/from/to/ruledBy/date`); audited-exclusion guard, fail-closed, proven byte-identical. ← NEW
15. **Decision B (Victor, 2026-07-25): beat-accumulation provisional-bar heuristic** (S=2, Q=1, 4 beats/bar; unrecognized tokens → `bars: null`, never computed). Confirmed for Foxtrot + Quickstep only. ← NEW
16. **Frozen-docs rule (2026-07-25):** Phase 2a anomaly docs are frozen historical artifacts; parser re-runs must not regenerate them. ← NEW
17. **Badge-over-gate (Victor, 2026-07-25):** unaudited figures ship visible with the "Not yet verified" badge (Library, detail panel, PS execution view) rather than being gated out. ← NEW
18. **Standing planning rule (Victor, 2026-07-25): no unaudited Tango figures in PS-executed session plans until their audits land.** Consequence: Tango routine-figure audits at the front of the next Phase 2b block. ← NEW
19. **`syllabusNotes` schema convention (2026-07-25):** cross-body (CDTA) tier annotations recorded per figure; NDCC remains the binding tier. ← NEW
20. **Tango shared-number convention (2026-07-25):** #1 and #26 are intentional split mappings; uniqueness checks treat them as known exceptions. ← NEW
21. **NDCC extraction wrap check (2026-07-25):** every future NDCC column extraction requires an explicit wrap check (text-line count vs figure-number count per tier band). ← NEW

---

## Next action — carried-forward queue (order ruled at 2026-07-25 close)
1. ~~**Handoff rev 3**~~ — **this document; done.**
2. **Tango routine-figure audits** — front of queue per Decision #18. ("Tango Rocks" resolves to Rock Turn, Beginners #5.)
3. **PS-view verification** on `v0.3.0-data` — pending, not a defect; close at/before the first PS-supervised session.
4. **Waltz reconciliation sitting** — 6 naming rulings + 2 candidate rows (Closed Changes split; Chassé from Promenade three-way) + singular/plural rule confirmation.
5. **Foxtrot #16 Outside Swivel compound JOIN** — Victor ruling on construction (Open Telemark + Open Natural Turn + Outside Swivel + Feather Ending, ~10 steps; dancecentral page is the cross-check). The single unaudited Foxtrot figure.
6. **Null-tier schema decision** — options (a) permanent non-syllabus section / (b) fold into tiers / (c) separate `studioLevel` field (**recommended**). Interim: audit step data, keep null tiers untouched.
7. **Waltz + Tango Phase 2b audit** (64 figures) — completes Phase 2b.
8. **Latin parse** — prerequisite: mid-bar-commencement heuristic upgrade; budget hand-set bars for flagged tokens. (Then the Latin pre-flight list, Status Overview §3.2, and the PDF tracking decision.)
9. **Option C gap-fill** (Quickstep 12 + Jive D-3) — informed by the recorded D-3 evidence (all 12 Quickstep gaps have dancecentral pages).
10. **Auth QoL:** "Forgot password?" link in AuthGate (`sendPasswordResetEmail`) — required before commercial pilot.

**Note on sequence:** items 2–7 are the remaining Phase 2b block; Step 4.5 (tablet migration) follows Phase 2b completion per Decision #13; Latin is third. Competitive-research capture (Ellever free material) is slotted for the first no-class week after Phase 2b completes, feeding Step 4.5b planning.

---

## Deferred / tracked issues
- **Quickstep + Jive structural gap-fill (Option C):** 12 NDCC Quickstep figures (#2, 3, 6, 8, 16, 19, 20, 21, 24, 27, 29, 31) have no ballroomguide page; all 12 exist on dancecentral as prose step-lists (no Table A/B) — lossier prose-parse, dedicated step with its own checkpoint. D-3 (Jive thinness) is the same problem. **D-3 evidence now recorded** (alias-map §6 above); decision still deferred.
- **PS tablet migration (Step 4.5)** — sequenced after Phase 2b: Lenovo Idea Tab TB336FU (11" 2560×1600), landscape on stand, shared tablet. **4.5a** CSS touch-target/layout pass (44px targets trapped in the phone-only `@media (max-width:768px)` block); **4.5b** PS notes editing (un-defers D-1, first PS write path). Blocked on Victor inputs: viewport measurement, notes-scope ruling, `index.html` + `firestore.rules` into KB, shared-login attribution. Scope: `StudioPlanner_Step4_5_PS_Tablet_Migration_Brief.md` (KB).
- **PWA update prompt** — prerequisite of Step 4.5a (stale service-worker cache on a shared tablet runs an old build silently).
- **Visual treatment for the "Needs Review" tier** — polish pass; interacts with the null-tier schema decision (queue item 6).
- **Null-tier guard fragility note (mitigated):** explicit documented guard in `getFigures` — do not remove when refactoring.
- **Silver swivel/fallaway audit cluster** — below Bronze pilot scope. (Note: post-wrap-correction, Outside Swivel is Silver #17; remaining Tango nulls are Point to Promenade Position and Reverse Outside Swivel.)
- **Open Reverse Turn, Lady in Line (Tango #8)** — the single remaining Tango NDCC coverage gap; may need sourcing or a split later.
- ~~Parser audited-exclusion fail-closed bug~~ — **resolved in Phase 2b** (Decision A guard, proven).
- **Security (pre-commercial):** Firestore `get()` latency in PS read rules; over-permissive invite create rule.
- **Licensing review (Risk #4)** before any commercial rollout.
- **D-1 (PS Firestore writes / `psNotes`)** — narrowly scoped as Step 4.5b; full resolution at Phase 3.5 entry.
- ~~Waltz NDCC JSON does not exist~~ — **resolved 2026-07-25** (`docs/ndcc_waltz_syllabus.json`, 32 figures, clean).
- **Firebase CLI housekeeping:** global `firebase-tools` install or a `deploy` npm script (currently `npx`).
- **KB retirement candidate:** `StudioPlanner_Phase2a_Data_Acquisition_Brief.md` was retained "until the Phase 2b method is defined" — the method is now defined and executed; retire on Victor's confirmation at next KB hygiene pass.

---

## Key Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app. `getFigure(name, dance)` dance-aware; "Needs Review" grouping; `rhythm` in `OPTIONAL_COLS`; **"Not yet verified" badge (Library / detail panel / PS view) — first change since Step 2b, in `ef3b0fd`.** Ranged reads required. **KB copy needs refresh to `ef3b0fd`.** |
| `src/data.js` | `FIGURES` + `FIGURE_RICH_DATA` (dance-namespaced, 34/30/30/20). **Now carries `dataStatus` at 49 audited / 65 parsed, per-figure `corrections` logs (26 entries), `syllabusNotes`, and the four Tango key renames.** **KB copy needs refresh to `ef3b0fd`.** |
| `src/seedData.js` | **Still a live import** (`App.jsx` line 3). Do not treat as legacy. |
| `scripts/parse_bg_quickstep.js` | Go-forward clone template for Latin (with audited-exclusion guard). In KB. |
| `scripts/parse_bg_tango.js` | **No longer inert-historical: NDCC_MAP corrected 2026-07-25 (landmine defused, dry-run no-op verified).** Repo; KB copy present — verify currency before any Tango re-parse. |
| `scripts/parse_bg_foxtrot.js` · `scripts/parse_bg_waltz.js` | Historical (Foxtrot superseded as clone source). |
| `scripts/migrate_2c_nesting.js` | Step 2c provenance. Repo only. |
| `docs/ndcc_waltz_syllabus.json` | **NEW 2026-07-25** — 32 figures, zero wrap artifacts. In KB. |
| `docs/ndcc_tango_syllabus.json` | **Wrap-corrected 2026-07-25** (#4–5, #16–20 rebindings). KB copy must be the corrected version — verify. |
| `docs/ndcc_foxtrot_syllabus.json` | **Wrap-corrected 2026-07-25** (#11–15, incl. #13/#14 swap). KB copy must be the corrected version — verify. |
| `docs/ndcc_quickstep_syllabus.json` | Verbatim NDCC (31 figures), unaffected by wrap defect. In KB. |
| `StudioPlanner_DC_Alias_Map_Candidates.md` | **NEW 2026-07-25** — four-dance dancecentral inventory + BG↔NDCC classification (`0805903`). In KB. |
| `StudioPlanner_Session_Report_2026-07-25.md` | Input document for this revision. In KB. |
| `StudioPlanner_Phase2a_Step1_Anomalies.md` | Waltz anomaly record — **Phase 2b input for the Waltz audit (queue item 7).** |
| `StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` · `..._Step3_Foxtrot_...` · `..._Step4_Quickstep_...` | Frozen historical artifacts (Decision #16). In KB. |
| `docs/NDCC_Ballroom_Syllabus.pdf` · `docs/NDCC_Latin_Syllabus.pdf` | NDCC source PDFs (untracked in repo; both in KB). |
| `StudioPlanner_Step4_5_PS_Tablet_Migration_Brief.md` | Step 4.5 scope + Victor inputs needed (KB). |
| `StudioPlanner_Project_Status_Overview_2026-07-24.md` | Retrospective + Latin readiness inventory (§3.2 = Latin pre-flight list). Reference, not session-start read. |
| `StudioPlanner_Session_Conduct_Review.md` | Planning-layer failure-mode counter-behaviors — **read at every session start alongside this handoff.** |
| `sources/` | Gitignored. Archives + manifests. |

---

## Notes for next session
- **Read at session start:** this handoff (rev 3) + `StudioPlanner_Session_Conduct_Review.md`.
- **Resume at queue item 2: Tango routine-figure audits.** Baseline `ef3b0fd` (`v0.3.0-data`); standard pre-flight (clean tree, counts 34/30/30/20, 49 audited / 65 parsed, build).
- **KB refresh needed before code work:** `App.jsx` and `data.js` KB copies predate `ef3b0fd`; the two wrap-corrected NDCC JSONs (Tango, Foxtrot) must be verified as the corrected versions in KB. Per the KB-lag rule, verify live file state first.
- **Audit method is now defined and proven** (against-source, routine-first, Claude Code, flip criteria per Phase 2b §1) — reuse as-is for Waltz + Tango; no re-piloting needed unless Victor rules otherwise.
- **Beat heuristic (Decision B) is Foxtrot/Quickstep-scoped** — a new Victor ruling is required before applying beat values to Waltz or Tango bars, and the mid-bar upgrade is a Latin prerequisite.
- **NDCC is the syllabus authority, not CDF** (CDTA divergences go in `syllabusNotes`).
- **KB-lag rule:** check live file state before new work. **Canonical-source rule:** this handoff wins over role prompts and Code's memory files.
- **Two-environment split:** Claude Code owns repo/executable artifacts; Claude-in-chat owns KB planning docs.
- **`docs/SCHEMA.md` recommendation stands** (not blocking).
- **Upload this handoff** and any modified files to the Project KB at session close.
