# StudioPlanner — Project Status Overview & KB Audit

**Date:** 2026-07-24
**Prepared from:** `StudioPlanner_Handoff.md` (2026-07-24 revision, canonical), all 14 Project chats (2026-04-11 → 2026-07-24), and live-state verification of every file currently in the Project KB.
**Baseline:** `a5ea367` (Step 4 Quickstep, pushed, not deployed) + `e8e8c2d` (doc-only). Deployed build: Step 2b (`bcc703c`). Live dances: Waltz + Tango. Per-dance counts: **Waltz 34 / Tango 30 / Foxtrot 30 / Quickstep 20 = 114 figures.**

---

## Executive takeaway

Phase 2a Standard-dance parsing is complete: all four Standard dances are in `FIGURE_RICH_DATA` under the Option B dance-namespaced keying model, with a proven, self-improving parse pipeline (`parse_bg_quickstep.js` is the go-forward template). The project's most durable achievement is not the data itself but the **operating system built around it** — the no-dreaming rule, the citation rule, the parsed→audited lifecycle with its deploy gate, and the checkpoint/pre-flight discipline — all of which transfer directly to Latin. The KB is current on all load-bearing files (verified this session). **All decisions from this review are ruled (2026-07-24):** sequencing is **Option A — Phase 2b audit → Step 4.5 tablet migration → Latin**; the 8-file retire list is confirmed (`ARCHIVE_PROVENANCE` stays); and both KB gaps are closed — the Tango anomalies doc and Tango NDCC JSON are uploaded, restoring citation-rule coverage for Tango.

---

# Part 1 — What has been achieved

## 1.1 Design / UI

| Area | State | Evidence |
|---|---|---|
| Session builder | Fixed structure (Warmup → N Main Topics → Conclusion), drag-to-reorder items, per-section dance/minutes | Phase 1, `v0.2.0` |
| Figure library | Grouped category → dance → tier; `targetLevel` cumulative filter; **"Needs Review"** bucket for null-tier figures rendered at the bottom of each dance section (explicit guard, no longer an `indexOf` coincidence) | Step 2b, deployed |
| Figure detail panel | Stacked Leader/Follower step tables, bar tabs for multi-bar figures, editable alignment cells (MT) stored as `alignmentOverrides` keyed `role-bar-stepIndex`, gold-italic override display (PS), **Rhythm column** as first optional column (auto-hidden for Waltz) | Phase 1 + Step 2b |
| Dance-aware labels | `FIGURE · {resolvedDance}` header and item-editor sub-label derive from `item.dance` — the two hardcoded `"Waltz"` literals are gone | `a372ce0` (committed, not deployed) |
| PS experience | Read-only session view, target-level badge, verified on iPhone 14 Pro Max + Pixel 7 | Phase 1 |
| Platform | PWA (vite-plugin-pwa/Workbox) on Firebase Hosting; deploy gate: only audited data ships | Live at dancepraktika-studioplanner.web.app |
| Design language | Brand blue `#1D69A2`, Montserrat headings, DM Mono technical data; vNext mockups (5 screens, alignment-compass glyph) held for conditional Phase 3.5 | `StudioPlanner_vNext_Mockups.jsx` |

## 1.2 Data structure

The data layer went through three generations and is now stable:

1. **Gen 1 (April):** flat `FIGURE_RICH_DATA`, dancecentral-scraped Waltz, rise fields contaminated with technique notes (OP-9), pipe-split display workaround.
2. **Gen 2 (Step 1, `5a94d66`):** OP-9 root fix — corrected step-row schema (`bar, timing, foot, alignment, turn, footwork, sway, position, rise, cbm, notes`), all Waltz re-sourced from ballroomguide Wayback captures, scraped notes preserved with traceable `[migrated-from-rise:]` tags.
3. **Gen 3 (Step 2c, `a187d4e`):** **Option B dance-namespaced store** — `FIGURE_RICH_DATA[dance][figureKey]`, clean NDCC-name keys, no display-name field, no anti-collision spellings. `item.dance` stamped at all creation sites; lookups resolve `item.dance || 'Waltz'` (**mandatory, permanent** — this is what keeps every pre-2c Firestore session resolving with zero migration).

Structural facts established along the way, none of which were assumable in advance:

- **Table B shape varies per dance:** Waltz 6-col, Tango 5-col, Foxtrot and Quickstep an identical 7-col hybrid (`Timing | Rhythm | Position | Rise & Fall | Sway | Footwork`). This falsified the Step 3 work order's spec and produced the standing lesson: *verify Table B columns and the token set from source before writing the parser*.
- **Rhythm tokens are stored verbatim, never normalized** — Tango's `S/Q/&`, Foxtrot's `S(S)`, Quickstep's `S(SS)`/`S(SSS)` and one column-shifted `12` (isolated to Quickstep Prep Step).
- **`dataStatus: 'parsed' | 'audited'` lifecycle** with a hard deploy gate — Foxtrot and Quickstep sit at `parsed` and are deliberately invisible to users.
- **`priorBgName`** records every rename so provenance survives the NDCC key mapping.
- **Null-tier figures are legitimate first-class data** (full structural content, `syllabusLevel: null`, surfaced in Needs Review) — currently 4 Tango, 5 Foxtrot, 1 Quickstep.
- **Verbatim per-dance NDCC syllabus JSONs** (Tango 27, Foxtrot 25, Quickstep 31) extracted from the four-column PDF via rasterize-and-crop; Quickstep used the stronger two-pass blind method (independent `pdftotext -layout` + independent 220-DPI crop transcription, diffed).

## 1.3 Approaches to issue resolution (the transferable method)

These are the patterns the project developed *in response to real failures*, each now a standing rule:

- **"No dreaming" (Locked Decision #5).** All dance-domain content comes from the archives plus your confirmation; missing data is flagged, never interpolated; conflicts are logged (ballroomguide wins structural), never silently resolved. Constrains content only, not engineering reasoning.
- **Citation rule (#12).** Born from the `Cross Chasse` tier error (planning layer labelled it Silver; the JSON had Bronze #17; caught by Code at encode time, not by review). Tier/number assignments are *quoted from the JSON at the moment of writing*, never restated from memory — and this binds the chat planning layer, not just the parser.
- **Peer-store audit rule (#10).** Born from the `getFigure()` defect (rich store namespaced, catalog left dance-blind → every Tango panel empty). Any `FIGURES[...]` lookup gets the same namespacing audit as `FIGURE_RICH_DATA[...]`.
- **Falsification before diagnosis.** The Step 2c defect was found because a *fresh* Tango item also failed, killing the stale-data hypothesis. The post-Step-3 "empty tables" symptom was correctly split into two causes (label literals vs. a vite dep-scan choke on the gitignored `sources/` mirror) rather than one imagined data bug.
- **Seam-dedupe test for two-page joins.** Bidirectional foot-exact overlap check — applied to Quickstep #30 (dedupe fired, 7 steps/role) and retroactively to Foxtrot #10 (no overlap, 6-step form confirmed, evidence recorded at `e8e8c2d`).
- **Process discipline:** pause-after-each-commit checkpoints; mandatory pre-flight (clean tree + per-dance counts + build) before touching data files; staged S1→S5 dance processing; one deploy per logical unit; KB canonical over Code's memory files; two-environment split (chat = planning docs, Code = repo artifacts).
- **Restraint discipline** (`StudioPlanner_Session_Conduct_Review.md`, 2026-07-24): the Step 4 self-review identified that most planning-layer errors came from *adding unrequested rigor* — scope creep and decision-batching. Counter-behaviors: do exactly what was asked; one stage at a time; serialize decisions.

## 1.4 Items currently on pause, with reasons

| Item | Why paused | Where it resumes |
|---|---|---|
| **Foxtrot + Quickstep deploy** | `dataStatus: 'parsed'` — deploy gate requires audit | Phase 2b |
| **Bar-timing truth** (Tipsy collapsed to bar 1; Foxtrot bar-reset heuristic inconsistent) | Provisional by design; true musical-bar assignment is dance-domain work only you can rule | Phase 2b |
| **Foxtrot source anomalies** (`Natural Zig-Zag from PP` Lady A/B misalignment; `Hover Cross` dropped row) | Flagged, not auto-corrected, per no-dreaming rule | Phase 2b |
| **Quickstep + Jive structural gap-fill (Option C)** | 12 Quickstep NDCC figures have no BG page; dancecentral has them only as prose — a lossier, different pipeline deserving its own checkpointed step. D-3 (Jive ~6 BG pages) is the same problem | Dedicated gap-fill step after Phase 2b |
| **Step 4 dancecentral enrichment merge** | Sequenced after structural parsing | After Phase 2b |
| **PS tablet migration (Step 4.5a/b)** | Blocked on your inputs: viewport measurement, notes-scope ruling, `index.html` + `firestore.rules` to KB, shared-login attribution decision | Can run parallel to Latin; brief in KB |
| **D-1 / PS writes (`psNotes`)** | Un-deferred by the tablet decision; now scoped as 4.5b — first-ever PS write path | Step 4.5b |
| **PWA update prompt** | Promoted to a 4.5a *prerequisite* (shared tablet + stale service worker = silent old build) | Before 4.5a |
| **Needs Review visual treatment** | Cosmetic | Polish pass |
| **Silver swivel/fallaway cluster; Open Reverse Turn, Lady in Line (#8) sourcing** | Below Bronze pilot scope / no BG figure | Later audit/sourcing |
| **Parser audited-exclusion fail-closed bug** | Latent, low-urgency | Phase 2b |
| **Firestore security hardening + licensing review (Risk #4)** | Pre-commercial only | Commercial checklist |
| **`docs/SCHEMA.md`** | Recommended, non-blocking | Any convenient session |

---

# Part 2 — KB audit

**Verified this session:** `data.js` (all 4 namespaces, 114 figures — current at `a5ea367`), `App.jsx` (contains the `a372ce0` fix — current), `seedData.js` (**still imported by `App.jsx` line 3 — do not remove**), handoff dated 2026-07-24.

## 2.1 Keep — active or load-bearing (16)

`StudioPlanner_Handoff_md.md` · `StudioPlanner_Session_Conduct_Review.md` (session-start read) · `App.jsx` · `data.js` · `index.css` · `seedData.js` · `vite_config.js` · `parse_bg_quickstep.js` (go-forward Latin template) · `StudioPlanner_Phase2a_Step3_Foxtrot_Anomalies.md` + `StudioPlanner_Phase2a_Step4_Quickstep_Anomalies.md` (Phase 2b inputs) · `ndcc_foxtrot_syllabus.json` + `ndcc_quickstep_syllabus.json` (citation rule #12 requires the planning layer to quote from these) · `NDCC_Latin_Syllabus.pdf` · `NDCC_Ballroom_Syllabus.pdf` (keep through Phase 2b) · `StudioPlanner_Step4_5_PS_Tablet_Migration_Brief.md` · `StudioPlanner_vNext_Mockups.jsx` + `StudioPlanner_Competitive_Research.md` (Phase 3.5 / commercial inputs).

**Keep with a caveat:** `StudioPlanner_Phase2_Architecture_Roadmap.md` is revision 2 (2026-06-12) — it predates Steps 1–4, Option B keying, the tablet decision, and Option C. It remains the only document holding the full phase map and Part D research integration, but on any conflict the handoff wins. Recommend a revision 3 at a natural boundary (e.g., Phase 2b close), not now.

**Keep until Phase 2b method is defined, then retire:** `StudioPlanner_Phase2a_Data_Acquisition_Brief.md` (mostly executed, but holds the `dataStatus` rationale and the routine-figure audit-priority framing that Phase 2b will draw on) and `StudioPlanner_Phase2a_Step1_Anomalies.md` (Waltz was never formally audited — pilot-as-audit; its anomaly record is a Phase 2b input if Waltz enters the audit queue).

## 2.2 Retired — confirmed by Victor 2026-07-24 (8 files)

Value fully absorbed into the handoff or duplicated in the repo; removal reduces KB noise and stale-read risk. Deletion is Victor's manual action in Project settings; nothing changes in the repo:

| File | Reason |
|---|---|
| `StudioPlanner_Chat_Overview.md` | Phase 1-era (2026-05-25) snapshot; superseded by the handoff |
| `StudioPlanner_Floorcraft_Chat_Overview_2026-06-12.md` | Session summary; outcomes captured in roadmap rev 2 + handoff |
| `StudioPlanner_KB_Update_Instructions_2026-06-12.md` | One-time instructions, executed |
| `StudioPlanner_Phase2a_Step0_Session_Summary_2026-06-12.md` | Captured in handoff + provenance doc |
| `StudioPlanner_Phase2a_Step1_ClaudeCode_Prompt.md` | Executed work order (`5a94d66`) |
| `StudioPlanner_Phase2a_Step1_Completion_Summary.md` | Captured in handoff |
| `StudioPlanner_Phase2a_Step2c_KeyingMigration_ClaudeCode_Prompt.md` | Executed (`a187d4e`); outcomes + reverts recorded in handoff |
| `parse_bg_foxtrot.js` | Superseded as clone template by the Quickstep parser; authoritative copy lives in the repo |

**Ruled:** `StudioPlanner_ARCHIVE_PROVENANCE.md` **stays in the KB** (Victor, 2026-07-24). It duplicates the repo copy at `d54e694` but is small and useful for planning-layer source questions.

## 2.3 Gaps — CLOSED 2026-07-24

1. **`StudioPlanner_Phase2a_Step2_Tango_Anomalies.md`** — ✅ uploaded to KB (was repo-only). The audit record for live Tango data is now readable by the planning layer.
2. **`ndcc_tango_syllabus.json`** — ✅ uploaded to KB. Citation rule #12 coverage for Tango is restored: the planning layer can again quote Tango tier/number assignments. (Waltz still has no NDCC JSON — its tagging predates the practice; backfill only if Waltz enters a formal audit.)
3. Cosmetic, unresolved and harmless: the KB filename is `StudioPlanner_Handoff_md.md` while the protocol references `StudioPlanner_Handoff.md` — normalizing avoids a future exact-match miss.

---

# Part 3 — Status update: moving toward Latin

## 3.1 Sequencing — RULED (Victor, 2026-07-24)

**Option A, extended: Phase 2b audit (Foxtrot + Quickstep) → Step 4.5 tablet migration → Latin.**

This adjusts the prior handoff text in two ways: Step 4.5 was previously listed as "can run in parallel" — it is now the explicitly sequenced second workstream; and Latin moves from directly-after-Phase-2b to third. The rejected alternatives, recorded for provenance: B (Latin parses first, consolidated audit later — rejected; grows audit debt behind ~90 figures) and C (interleave audit batches with Latin parses).

## 3.2 Latin readiness inventory

**In place:**
- `docs/NDCC_Latin_Syllabus.pdf` in the repo (untracked) and in the KB — readable by the planning layer.
- **Clone template:** `parse_bg_quickstep.js` (§7-rulings encoding, self-regenerating anomalies doc, seam-dedupe logic).
- **Proven NDCC extraction method:** two-pass blind (`pdftotext -layout` + 220-DPI rasterized crop, diffed) — explicitly flagged in the handoff as worth reusing for the Latin PDF.
- **Source archives:** ballroomguide Wayback + dancecentral mirrors acquired at Step 0 cover all 8 dances; provenance committed.
- **Process assets:** staged S1→S5 per-dance cycle, checkpoint discipline, citation rule, conduct-review counter-behaviors.

**Must be verified or decided at Latin start (do not assume — several are exactly the class of thing Steps 3–4 proved unassumable):**

1. **Latin PDF layout** — column count, dance order, and crop bounds are unknown; the Ballroom PDF's 4-column layout does not transfer. Two-pass extraction per dance, per the Quickstep precedent.
2. **Latin Table B shape and token set** — Standard produced three different shapes across four dances; Latin timing/rhythm conventions (beat-count tokens like `2 3 4&1`, `Q Q S` variants, guapacha etc.) are certain to differ. *Verify from source before the parser is written* — the Step 3 lesson, now standing.
3. **Per-dance BG coverage counts (S1)** — known only for Jive (~6 pages, thin — D-3 open). Cha Cha / Rumba / Samba coverage must be counted against the Wayback CDX before scoping each parse, with the Quickstep 12-gap experience as the model for what a shortfall looks like.
4. **D-3 ruling** — Jive: enrich-only vs. promoting dancecentral as structural fallback. The handoff already folds Jive into the Option C gap-fill step with Quickstep; confirm that stands, which would take Jive out of the Latin parse sequence entirely.
5. **NDCC PDF tracking decision** — the handoff explicitly defers "decide tracking when Latin begins." That trigger fires now.
6. **`ndcccrop.py` / `ndcccrop2.py`** — not in the repo; regenerate or commit at the Latin step (handoff notes both options).
7. **dancecentral alias map** — only one entry exists ("slow-foxtrot"); Latin naming variants unknown until enrichment or gap-fill.
8. **First Latin dance** — parse order within Latin (Cha Cha / Rumba / Samba) has never been ruled.

## 3.3 Immediate next actions (post-ruling state, 2026-07-24)

1. ~~Rule the sequencing question~~ — **DONE:** A → 4.5 → Latin.
2. ~~Upload the 2 missing Tango docs~~ — **DONE.**
3. **Pending (Victor, manual):** delete the 8 retired files in Project settings; upload this overview + the updated handoff to the KB.
4. **Next working session: Phase 2b** — define the audit method on a small scope (audit-in-app vs. against-source; routine-figure-first vs. by-tier), per the handoff's *Next action* section. The §3.2 Latin readiness inventory holds unchanged and activates after Step 4.5.

---

*Post-session rule: upload this document to the Project KB at session close, alongside any other modified files.*
