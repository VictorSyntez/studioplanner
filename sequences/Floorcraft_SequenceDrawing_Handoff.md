# Floorcraft Trajectory Board — Sequence Drawing Project Handoff

**Date:** 2026-07-08  (updated; prior 2026-07-03)
**Purpose:** Seed document for a **new, dedicated Claude project** scoped *strictly* to sequence drawing — the Floorcraft Trajectory Board and its printed routine sheets. This is a **separate track** from StudioPlanner (parallel, not a sub-phase).
**Canonical source of truth:** `floorcraft-trajectory-board-v3.jsx`

This document has two parts:
- **PART A** → copy verbatim into the new project's **custom instructions** field (Project settings → "What should Claude consider…").
- **PART B** → the technical handoff; keep it as a project knowledge file (upload it), or paste it below the instructions. It is the first thing to read at the start of every session.

---

# PART A — PROJECT INSTRUCTIONS (paste into the new project's instruction field)

**Role:** You are Victor's technical assistant for the **Floorcraft Trajectory Board** — a React interactive board that plots the trajectory of a couple's common centre through a ballroom routine, plus the matching printed PDF routine sheets. Work is planning, review, code changes to the board/generator, and documentation.

**Scope — sequence drawing only.** In scope: the board (`floorcraft-trajectory-board-v3.jsx`), the offline HTML bundle, the PDF generator (`gen_routine_sheets.py`), and the routine sheets. **Out of scope:** StudioPlanner's session model (MT/PS roles, `barsUsed`, `alignmentOverrides`), its Firestore/Firebase data pipeline, its Vercel/`~/studioplanner/src` deploy, and NDCC syllabus parsing. The StudioPlanner role framing does **not** govern this board. If a request drifts into StudioPlanner territory, flag it and confirm before proceeding.

**Standing rule — no dreaming on dance content.** Never supply dance-domain content (alignments, facings, trajectory geometry, figure timing/footwork, figure-name mappings) from your own knowledge. All such content comes from Victor's explicit input plus source/convention corroboration (the baked KB convention comments in the JSX). Missing data is **flagged, never interpolated**. This holds even when you are confident. **Borderline cases — including trajectory geometry — are treated as dance content and flagged.**

**Bake verbatim, don't interpret.** Layout positions are Victor's **hand-set authoritative data**, captured via the board's **Copy layout** (`exportLayout`) button. Bake the export verbatim into a named `*_LAYOUT` constant; do **not** compute or infer pose geometry. Computed conventions apply only where nothing is hand-set, and any computed bake is a first draft for Victor's hand-audit, never final. (History: three failed computed attempts at Promenade Position geometry led to the direct per-dancer handle architecture — do not attempt to infer closed vs. PP pose geometry; use direct control.)

**KB is canonical.** The Project knowledge base is authoritative over any internal/Claude Code memory files. Never assume KB files are current — confirm the deployed/current version before touching `floorcraft-trajectory-board-v3.jsx`, the offline bundle, or `gen_routine_sheets.py`.

**Two-environment workflow.** This Project chat handles architecture, planning, review, and documentation. Claude Code (terminal, `claude --continue`) handles routine implementation and execution. Step-by-step commit approval: pause after each commit for Victor's review; a hard checkpoint stop before commits is mandatory.

**Session protocols.**
- **Session start:** read the handoff (PART B) before touching any file.
- **Session close:** remind Victor to upload all modified files back to the Project KB — **mandatory, not optional.** (Claude cannot write to the KB; this is a manual step.)

**Decision surfacing.** Flag anomalies, naming conflicts, and ambiguous content decisions with specific evidence; present options with a clear recommendation. Never silently resolve.

**Voice-dictation awareness.** Victor uses voice dictation extensively; interpret transcription artifacts contextually (e.g., "vaults" → Waltz, "charger" → Cha Cha, "colloid code" → Claude Code).

**Communication preferences.** Be substantive and precise; use specific numbers/dates/evidence; lead with the answer or key finding, then detail; technical language is fine; flag uncertainty with calibrated terms ("strong evidence", "tentative", "unclear from available data"); working language English. Start and finish every reply with "This is a reply from Claude, your AI assistant". Ask for clarification when genuinely ambiguous rather than assuming.

---

# PART B — HANDOFF (read first each session)

## 1. Board overview

React interactive board over a **30 m × 20 m floor** plotting the trajectory of a couple's **common centre** through a routine. The couple and ghost couples are **placed and rotated by hand**; figure names sit between stamps; an optional rhythm legend sits inside the floor. Positions are **Victor's hand-set authoritative data** — captured via **Copy layout** (`exportLayout`) and pasted back to be baked into a named `*_LAYOUT` constant + a `load*Demo()` loader + a toolbar button.

## 2. Stack

- React **19.2.5** / ReactDOM **19.2.5** (CJS), TypeScript **6.0.3** (JSX transpile).
- Zero-CDN offline HTML bundle (`Floorcraft_Board_offline_v3.html`) for in-class use (no network dependency).
- PDF routine sheets via `gen_routine_sheets.py` (matplotlib; **Montserrat / DM Mono** with **DejaVu fallback**; `SHEETS_OUTDIR` env var controls output directory).
- Design language: brand blue **`#1D69A2`**, Montserrat headings, DM Mono for technical data.

## 3. Angle / alignment conventions (from the board — dance content, copy verbatim)

LOD = **+x along the bottom wall.**
- facing **DC** → `a = -0.785`, `dir = (0.707, -0.707)`
- facing **DW** → `a = 0.785`, `dir = (0.707, 0.707)`
- facing **LOD** → `a = 0`, `dir = (1, 0)`
- backing **LOD** → `a = π`, `dir = (1, 0)` (travel still +x)

Key functions:
- `loadSequence(states, figNames)` — generates ghosts + a quadratic-Bézier path + labels from per-stamp `{c, a, name, dir}`.
- `coupleFromCentre` — derives Leader/Follower from a centre + facing (offset **0.45 fwd + 0.15 right**).
- `pathFromStamps` — recomputes the path through the hand-placed ghosts.

**`figNames` count invariant:** for path-from-stamps relabeling to fire, the `figNames` array must equal the ghost count (e.g., the Foxtrot-Newcomer 6-ghost layout requires exactly 6 names).

## 4. Workflow — building a new sequence

1. `loadSequence(states, figNames)` to seed draggable shadows on the board.
2. **Hand-set** each ghost's position and rotation on the board (Victor's authoritative placement).
3. **Copy layout** (`exportLayout`) → paste the export.
4. **Bake verbatim** as a new `*_LAYOUT` constant + a `load*Demo()` loader (mirroring `loadWaltz1Demo`) + a toolbar button.
5. **Regenerate the offline bundle** (procedure in §6).
6. Add a matching entry to the `SHEETS` list in `gen_routine_sheets.py` and render the PDF.

*Note:* `exportLayout` previously silently dropped the `rhythm` array on round-trips — this was fixed; keep the `rhythm` array intact when round-tripping.

## 5. Byte-parity invariant (must be maintained)

Each `*_LAYOUT` must be **byte-identical data across three places**: the JSX, the offline bundle (transpiled from that JSX), and `gen_routine_sheets.py` — and must match the rendered PDF and Victor's original export. Any edit to a layout updates all three **in lockstep** or the invariant breaks. Integrity check: **per-layout key/ghost/path counts**, not an md5 of one dance alone.

## 6. Offline bundle regen procedure (canonical — the original build script is LOST)

The bundle is a set of inline CJS modules (`window.__cjs.define(...)`): a loader/shim, then `react`, `react/jsx-runtime`, `scheduler`, `react-dom`, `react-dom/client`, then the pre-transpiled **`__component__`** module, then a bootstrap that runs `createRoot(...).render(React.createElement(require("__component__").default))`. Zero-CDN (no `src` anywhere). To rebuild after a JSX change:

1. Transpile the updated `floorcraft-trajectory-board-v3.jsx` with **TypeScript 6.0.3**: `module: CommonJS`, `jsx: react-jsx` (automatic runtime → `require("react/jsx-runtime")`), `target: ES2019`, `esModuleInterop: false`. Output shape must be `exports.default = FloorcraftBoard;` + `require("react/jsx-runtime")` + `require("react")`.
2. In the existing bundle, replace **only** the body of `window.__cjs.define("__component__", function(module, exports, require){ … })` with the new transpiled output. Leave every other script block untouched (React runtime stays byte-identical → zero-CDN preserved).
3. Verify: `node --check` the transpiled module; confirm no literal `</script>` in it; confirm `<script>`/`</script>` counts unchanged (**9 / 8** — one `</script>` is escaped `\x3c/script>` inside react-dom, leave it); Node SSR `renderToString(React.createElement(require("__component__").default))` renders without throwing and includes the expected buttons.
4. **Then** do an on-device browser check — SSR-clean is strong evidence, **not** a browser test.

*Follow-up idea (tracked):* codify this as a small `build_offline.mjs` so regen isn't a manual reconstruction each time.

## 7. Layout inventory (9 baked)

`WALTZ1_LAYOUT` (Pre-Bronze R1, incl. PP figure) · `WALTZ2_LAYOUT` (Waltz Intermediate R1 — VBDS group naming; formerly Pre-Bronze R2) · `WALTZ_NEWCOMER_LAYOUT` · `TANGO_LAYOUT` · `TANGO_NEWCOMER_LAYOUT` · `FOXTROT_LAYOUT` · `QUICKSTEP_LAYOUT` · `FOXTROT_NEWCOMER_LAYOUT` · **`FOXTROT_INTERMEDIATE_LAYOUT`** (added 2026-07-08).

Foxtrot-Newcomer detail: Waltz figures danced to Foxtrot SQQ timing; 6-ghost layout with per-bar turn stamps (`figNames` must equal 6).

**Updated 2026-07-08:**
- **`FOXTROT_INTERMEDIATE_LAYOUT`** (Foxtrot Intermediate R1) — 6 ghosts: Change Step (RF) → Reverse Turn ①② → Change Step (LF) → Natural Turn ①②; leader starts facing DC; SQQ × 6.
- **`TANGO_LAYOUT`** (Tango Intermediate R1) — revised to **8 ghosts**: Open Reverse Turn split into ①/② (hand-set mid-figure pose), **Back Corté finishes facing DW** (was DC). Figures: Two Walks · Progressive Link · Closed Promenade · Open Reverse Turn ①② · Two Walks · Tango Rocks · Back Corté; 8-entry rhythm. Ghost 5 `name` tag reads "facing LOD" but its rotation is ~Centre — baked verbatim; compass emphasis reads the rotation, not the tag.
- **`WALTZ2_LAYOUT`** now carries a 6-entry `1 2 3` rhythm; Waltz Intermediate subtitle blanked.

## 7A. PDF sheet formatting (print-side — added 2026-07-08)

Rendered by `gen_routine_sheets.py` onto **every** sheet; the interactive board does NOT show these (print-only):
- **Alignment compass** (`draw_compass`), top-left — 8-ray rosette, leader-facing convention. Labelled rays: LOD · against LOD · DW · DC · Wall · Centre · **BDC** (back-diagonally-centre, 135°, between against-LOD and Wall); the 225° ray is unlabelled. **Emphasis is angle-based** (`_emph_from_ghosts` + `_RAYLAB`): each ghost's leader heading `a` is rounded to the nearest 45° and that ray drawn black — reads the real rotation, not the (possibly stale) `name` tag.
- **Dancers key** (`draw_shadow_legend`), top-right above the rhythm block — Leader (INK `#222`) + Follower (RED `#C0392B`) swatches at ghost opacity.
- **Rhythm legend** (`draw_rhythm`) — header `Rhythm` (dance-agnostic, was "Rhythm — SQQ per bar"); one entry per stamp/half; block at x0=18, **y0=2.65**; rows step 0.95 m so shadows→Rhythm and Rhythm→first-entry gaps are both 1.05.
- **No 1 m grid, no bottom-left footnote** — both removed from the print (the board keeps its own grid).
- Rhythm patterns are **dance content** — sourced from Victor, never invented (Foxtrot `S Q Q`, Waltz `1 2 3`, Tango S/Q per figure).

## 8. Key lessons / principles

- **Bake verbatim, don't interpret.** Layout positions are Victor's hand-set authoritative export; bake it, don't compute geometry.
- **No dreaming on dance content.** Alignments come from Victor and are cross-checked against the JSX's baked KB convention comments — never invented, even when confident. Trajectory geometry is treated as dance content.
- **The PP saga.** Three failed computed attempts at Promenade Position geometry → the direct per-dancer handle architecture. Don't infer closed-vs-PP pose; use direct control.
- **The offline bundle is a derived artifact.** Regenerate it from the JSX after any change; the React runtime is reusable, only `__component__` changes.
- **Check the JSX source, not print conventions**, when regenerating PDFs (e.g., no 180° flip in the generator unless it's present in the board).
- **KB is canonical.** Verify KB copies are current before editing.

## 9. Files that belong to this track

| File | Role |
|---|---|
| `floorcraft-trajectory-board-v3.jsx` | **Canonical source** — the board |
| `Floorcraft_Board_offline_v3.html` | Derived zero-CDN offline bundle (in-class use) |
| `gen_routine_sheets.py` | PDF routine-sheet generator (**9 layouts / 9 sheets**) |
| `Waltz_Newcomer_Routine_1_v1.pdf` | Reference routine sheet |
| `Waltz_PreBronze_Routine_1_v4.pdf` | Reference routine sheet |
| `Waltz_Intermediate_Routine_1_v1.pdf` | Reference sheet (WALTZ2_LAYOUT; renamed from Pre-Bronze R2; on-brand re-render pending) |
| `Tango_Newcomer_Routine_1_v1.pdf` | Reference routine sheet |
| `Tango_Intermediate_Routine_1_v1.pdf` | Reference routine sheet |
| `Quickstep_PreBronze_Routine_1_v1.pdf` | Reference routine sheet |
| `Foxtrot_Bronze_Routine_1_v1.pdf` | Reference routine sheet |
| `Foxtrot_Newcomer_Routine_1_v1.pdf` | Reference routine sheet |
| `Foxtrot_Intermediate_Routine_1_v1.pdf` | Reference sheet (FOXTROT_INTERMEDIATE_LAYOUT; on-brand re-render pending) |

**Devices for verification:** iPhone 14 Pro Max (iOS), Pixel 7 (Android), Lenovo Idea Tab (Android, in-class teaching — requires full offline capability).

## 10. Open items on entry (need Victor)

1. **KB upload of the 2026-07-08 bake is PENDING.** The current `floorcraft-trajectory-board-v3.jsx`, `Floorcraft_Board_offline_v3.html`, `gen_routine_sheets.py`, this handoff, and all re-rendered PDFs live in that session's outputs — **not yet confirmed in the KB**. Migrate the *latest* versions. (This supersedes the earlier pending WALTZ2 upload — WALTZ2 is now baked into these files.)
2. **Brand-font re-render of the FULL set.** The 2026-07-08 formatting changes (compass, Dancers key, grid/footnote removal, spacing, header) touch **every** sheet, so re-run `gen_routine_sheets.py` on Victor's machine (Montserrat / DM Mono) for all 9 sheets. The delivered PDFs were DejaVu-fallback previews.
3. **Offline bundle — on-device browser check outstanding.** Bundle now ~**660 KB** (was ~651 KB). Verified here: 9/8(+1) script counts, both new layout consts parse, injected loader `node --check`-clean, byte-parity. **Not** browser-tested — open on the Lenovo Idea Tab and confirm it loads, the **Foxtrot Int** button seeds the 6-ghost routine, and **Tango** loads the 8-ghost version.
4. **Naming note (tracked):** the Foxtrot / Slow-Foxtrot label alias concern — verify the Bronze sheet label before relying on it.

## 11. Session log — 2026-07-08

Baked into all three canonical artifacts (byte-parity verified):
1. **New** `FOXTROT_INTERMEDIATE_LAYOUT` + `loadFoxtrotIntermediateDemo` + "Foxtrot Int" button (hand-set export, 6 ghosts, SQQ × 6).
2. `TANGO_LAYOUT` **replaced** with hand-set 8-ghost export (Open Reverse split, DW finish); `loadTangoDemo` figNames → 8 ("Open Reverse Turn ①/②", drops "Lady Outside" per hand-set).
3. `WALTZ2_LAYOUT` rhythm `1 2 3 × 6`; Waltz Intermediate subtitle removed.
4. Generator formatting: alignment compass (angle-emphasis + **BDC** ray), Dancers key, grid + footnote removal, rhythm spacing (y0→2.65) + generic `Rhythm` header.

Verification performed in-session: generator renders all 9 sheets, one each; both new layout consts parse; bundle 9/8(+1) script counts + `node --check`; byte-parity TANGO `(8,8,88,8)` / FOXTROT_INTERMEDIATE `(6,6,66,6)` across generator, JSX, bundle. Paths were board-Bézier reconstructions confirmed byte-matching Victor's exports at sampled points.

---

*End of handoff. Sequence-drawing scope only. StudioPlanner is a separate track.*
