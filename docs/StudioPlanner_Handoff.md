# StudioPlanner — Handoff Document

**Date:** 2026-06-14 (evening — supersedes the earlier 2026-06-14 / Step 1 revision)
**Current branch:** `main` — Phase 2a **Step 2 (Tango) COMPLETE** (committed `898211a`)
**Step 2 commit hash:** `898211a` (prior Step 1 commit: `5a94d66`)
**Deployed at:** https://dancepraktika-studioplanner.web.app/ (still `v0.2.0` — Step 2 is data-only, no deploy. The deploy happens at the micro-step below.)
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Fast re-entry — open items needing Victor on resume
1. **Tango commit `898211a` is in** — verify clean tree on resume (`git status`), then proceed.
2. **Resume at the micro-step** (null-figure library visibility + deploy) — fully specced under *Next action*.
3. **One decision pending:** fold `rhythm`-column rendering into the same micro-step, or keep separate (both are App.jsx + deploy). Recommendation: fold. See *Next action* §Decision.
4. **Open decision before Foxtrot — keying model.** Two Tango↔Waltz collisions were resolved two different ways (orthographic "and" vs. dance-qualified "(Tango)"). Cross-dance name collisions recur heavily from Foxtrot on (Natural Turn, Reverse Turn, Closed Telemark, Contra Check). Pick ONE durable rule — likely dance-qualify all keys + a separate clean display-name field so the library doesn't show redundant suffixes like "Contra Check (Tango)". Resolve before parsing the next dance.

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
OP-9 root fix + unified-pipeline Waltz re-parse. Corrected step-row schema. 34 Waltz figures. Pipeline proven end-to-end on Waltz.

### Phase 2a Step 2 (Tango) — COMPLETE, pending commit verification ← NEW
Mechanical repeat of Step 1 on Tango, executed in Claude Code, approved at the §4 checkpoint.

**What changed:**
- **New parser** `scripts/parse_bg_tango.js` (clone of the Waltz parser, Tango source dir `sources/ballroomguide/workshop/standard/tango/`).
- **30 Tango figures** added to `FIGURE_RICH_DATA` and `FIGURES['Tango']` (dance-keyed object shape preserved). **Waltz untouched** (md5 unchanged); diff is pure-additive (~+594 lines, −0). Build passes. `FIGURE_RICH_DATA` = 34 Waltz + 30 Tango = 64.
- **New step-row field `rhythm`** (verbatim `S` / `Q` / `&` / `''`) added to the schema — Tango's defining slow/quick data. Waltz entries carry no `rhythm` key (read as empty). **STORED, NOT YET RENDERED** (no App.jsx touch this run).
- **NDCC tagging** from `docs/ndcc_tango_syllabus.json` (27 verbatim Tango entries, extracted from `NDCC_Ballroom_Syllabus.pdf`). **26 figures matched** (tier + number); **4 left null-standalone** (full structural data, no tier).
- **Naming convention:** the **NDCC name is the figure key** for matched figures, with the prior BG name recorded in a new **`priorBgName`** field. 6 renames applied (Back Open Promenade → Back Open, Chase → The Chase, Fallaway Promenade → Promenade Outside, Four Step Change → Promenade Four Step, Open Reverse Turn → Open Reverse Turn, Lady Outside, Contra Check → Contra Check (Tango)).
- **TWO documented Tango↔Waltz collision exceptions — handled by two *different* mechanisms** (see Open decision below): (a) **`Fallaway Reverse and Slip Pivot`** keeps the BG "and" spelling (orthographic anti-collision with Waltz `Fallaway Reverse & Slip Pivot`); (b) **`Contra Check (Tango)`** is dance-qualified (Victor "Option A", 2026-06-14), NDCC name `Contra Check` preserved in `priorBgName`. Waltz untouched in both.
- **`Closed Promenade` (#4) is a Victor-corrected name** — the NDCC JSON holds the flagged-truncated `Closed`; Victor authorized the expansion. So #4's key is neither verbatim-NDCC nor BG.
- **Tango source Table B is 5-column** (Step# | Timing | Rhythm | Position | Footwork): **no Rise & Fall, no Sway columns.** `rise`/`sway` are empty for all 30 Tango figures — by source, not parse loss.
- **`#4 Closed` provisional flag RESOLVED** → matched to NDCC #4 (Beginners) as `Closed Promenade` via override (resolves the truncation flag carried in the syllabus JSON).
- **4 null-standalone Tango figures** (Victor's calls — kept as standalone, no tier, `syllabusLevel: null`): **Rock Turn, Point to Promenade Position, Outside Swivel, Reverse Outside Swivel.** These are NOT currently visible in the library (a null tier falls outside every tier filter) — the **micro-step fixes this**.
- **NDCC entries with no BG figure this run** (kept in the syllabus JSON, not deleted): **#5 Promenade Rock Turn, #8 Open Reverse Turn Lady in Line, #18 Swivels Fallaway.**
- **`auditPriority: 'high'`:** Chase, Oversway (multi-chart source pages).
- **Tango per-step `notes` are empty BY DESIGN** — ballroomguide Tango pages carry the structural layer only; coaching prose arrives at the **Step 4 dancecentral merge**. Logged in the anomaly report so it isn't mistaken for parse loss.
- **Docs produced:** `docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md`, `docs/Tango_Null_Figures_Audit.md`.

---

## Locked decisions (Phase 2a)
1. **Unified pipeline** — all 8 dances take structural data from ballroomguide; dancecentral is enrichment only.
2. **Structural source = Wayback** captures of `idans.nl/workshop`.
3. **OQ-2 = manifest-only** (archives gitignored).
4. **Existing notes are scraped**; dancecentral re-merge stays at Step 4.
5. **STANDING RULE: "No dreaming, no assumptions on dance content."** All dance content from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved (ballroomguide wins structural). Constrains dance content only, not pipeline mechanics.
6. **`rhythm` field** added to the step-row schema for Standard dances — verbatim `S`/`Q`/`&`. Stored now; rendering deferred. ← NEW
7. **NDCC name = figure key** for NDCC-matched figures; prior BG name kept in `priorBgName`. Two documented Tango↔Waltz collision exceptions resolved by two different mechanisms (orthographic "and" for Fallaway Reverse and Slip Pivot; dance-qualified suffix for Contra Check (Tango)) — **a consistent keying rule is an open decision before Foxtrot (see Open decision).** ← NEW
8. **Null-standalone figures are legitimate** — a parsed figure with no clean NDCC match keeps full structural data and `syllabusLevel: null`; it must be reviewable via a library "Needs Review" bucket (micro-step). ← NEW
9. **#18 Swivels Fallaway stays in the NDCC JSON, unmatched** (no-op) — not deleted. ← NEW

---

## Next action — Phase 2a Step 2b "micro-step": null-figure library visibility (App.jsx + deploy)

**Goal:** surface every `syllabusLevel: null` figure in the library so Victor can review them on-device. This is a UI + deploy step — deliberately separated from the data-only Tango commit.

**Step 0 — verify (report, then go):**
- `git log --oneline -3` — confirm HEAD is `898211a` (Tango Step 2); record any divergence.
- `git status` clean; `FIGURES` = Waltz 34 + Tango 30; `npm run build` OK.

**Do:**
- Read the **live** `App.jsx` library-render logic (ranged reads — file is large; ranges that worked before: `[1,223]`, `[223,700]`, `[700,1090]`). Locate where figures are grouped by `syllabusLevel` for the library / tier filter.
- Add a **"Needs Review / Unassigned"** library group that catches figures where `syllabusLevel == null`. Make it **dance-agnostic and durable** — it must catch nulls in every future dance, not be Tango-specific.
- Result: the 4 Tango nulls (Rock Turn, Point to Promenade Position, Outside Swivel, Reverse Outside Swivel) appear in that bucket; matched figures — including the two Group-3 Silver matches (Promenade Outside, Promenade Four Step) — appear under their tiers and are **excluded** from the bucket.
- **Checkpoint:** review the App.jsx diff before commit.
- **Deploy** to Firebase Hosting (may need `--reauth`) so the nulls are reviewable on iPhone 14 Pro Max / Pixel 7.

**Decision to make at resume:** fold **`rhythm`-column rendering** into this same micro-step? It is also an App.jsx + deploy change (add `rhythm` to `OPTIONAL_COLS` + a column header in `FigureDetailPanel` so the S/Q/& tokens display). **Recommendation: fold it in** — one App.jsx touch, one deploy, and Tango figures then show their defining rhythm. Victor's call.

**Scope guard — "commenting":** Victor's post-commit review = his own notes back to chat/Code, **NOT an in-app comment feature.** In-app PS commenting is the unbuilt PS-write capability (open question **D-1**) — do **not** build it in the micro-step.

---

## After the micro-step — Step 2 continues
Parse **Foxtrot → Quickstep** (Standard), then the **Latin** dances, reusing the Tango process. Carry forward:
- **Clone the TANGO parser (`parse_bg_tango.js`), NOT the Waltz one.** Tango's already encodes the Standard-dance variants future dances need: 5-col Table B, NDCC override-with-rename + `priorBgName`, and collision verification.
- **`rhythm` field is now part of the schema** — Foxtrot/Quickstep use S/Q too (it's Tango-only in the data so far).
- **Integrity check for future parses:** Waltz md5 alone is NOT sufficient. Use `Object.keys(FIGURE_RICH_DATA).length` **plus a per-dance count** (e.g. Waltz 34 / Tango 30 / + new) to confirm additive-only, no clobber.
- **Cross-dance key collisions are expected from Foxtrot on** — Natural Turn, Reverse Turn, Contra Check, Open Telemark all recur across dances. Resolve the keying-model open decision (fast re-entry #4) BEFORE parsing, so collisions are handled by one consistent rule, not ad-hoc.
- **Jive structural gap (D-3)** surfaces at Latin (ballroomguide ~6 pages; dancecentral ~30 as backfill — Victor decides resolution).
- **`foxtrot` ↔ `slow-foxtrot` alias** — a Step 4 cross-source merge concern.

---

## Deferred / tracked issues
- **`rhythm` column not rendered yet** — pending the micro-step decision above.
- **Silver swivel/fallaway audit cluster:** Outside Swivel + Reverse Outside Swivel remain null-standalone; #18 Swivels Fallaway unmatched. A deeper NDCC reconciliation may revisit these — below Bronze pilot scope, low urgency.
- **Open Reverse Turn, Lady in Line (#8)** has no BG figure — may need sourcing or a split later.
- **Parser audited-exclusion fail-closed bug** — still deferred to Phase 2b; inert this run (no audited Tango figures).
- **Security (pre-commercial):** Firestore `get()` latency in PS read rules; over-permissive invite create rule.
- **Licensing review (Risk #4)** before any commercial rollout.

---

## Key Files
| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app. **Micro-step target** (library grouping; optionally `rhythm` rendering). Ranged reads required. |
| `src/data.js` | `FIGURES` (Waltz 34 + Tango 30) + `FIGURE_RICH_DATA` (64). Corrected schema **+ `rhythm`**. Don't revert to `count`. |
| `scripts/parse_bg_waltz.js` | Step 1 parser (Waltz). |
| `scripts/parse_bg_tango.js` | Step 2 parser (Tango); template for Foxtrot/Quickstep/Latin. |
| `docs/ndcc_tango_syllabus.json` | Verbatim NDCC Tango tier/number source (27 entries). |
| `docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` | Step 2 anomaly report / audit worklist. |
| `docs/Tango_Null_Figures_Audit.md` | Per-figure step dump for the 7 null candidates (audit record). |
| `docs/StudioPlanner_Phase2a_Step2_Tango_ClaudeCode_Prompt.md` | Step 2 work order. |
| `sources/` | **Gitignored.** Archives + manifests. ballroomguide tree under `workshop/`. |

---

## Notes for next session
- **Resume at the micro-step** (App.jsx + deploy), fully specced above. Commit baseline is `898211a`.
- NDCC is the syllabus authority, **not CDF**.
- **KB-lag rule:** check live file state before new work (e.g. confirm `data.js` carries the `rhythm` field and Tango block before editing).
- **Canonical-source rule:** Code maintains its own memory files (`project_data_audit.md`, `project_figure_schema.md`, `MEMORY.md`). These are Code's recall, **not** the source of truth — if Code's memory and this handoff/KB ever disagree, **the KB wins; reconcile rather than trust Code's recall.**
- **Recommended prep (not blocking):** promote a canonical **`docs/SCHEMA.md`** into the repo/KB — Code has a schema doc only in its own memory; the shared field-by-field reference (incl. per-dance Table B variance, `rhythm`, `priorBgName`, record-level fields) should live in `docs/` so this chat, Code, and the KB share one authority. Best generated from the committed `data.js`.
- **Upload this handoff** and any modified docs to the Project KB at session close so this chat and Claude Code resume from the same state.
