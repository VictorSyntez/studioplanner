# StudioPlanner — Phase 2a Step 2 (Tango) — Claude Code Work Order

**Date:** 2026-06-14
**Scope:** Tango **structural** parse only (Step 2). ballroomguide → `FIGURE_RICH_DATA`. Data-only; no release.
**Template:** Step 1 Waltz (`scripts/parse_bg_waltz.js`, commit `5a94d66`). This is a mechanical repeat of the validated Step 1 process.
**Branch:** `main`, off `v0.2.0` / Step 1 commit `5a94d66`.

---

## 0. Pre-flight — report findings, then STOP and wait for "go". Do NOT parse or write yet.

1. `git status` — confirm `main` is clean and HEAD is at the Step 1 commit `5a94d66`. Report the actual HEAD if different.
2. Open the **live** `src/data.js`. Confirm it ends with the corrected-schema Waltz `FIGURE_RICH_DATA` block — 34 figures, step rows with fields `bar, timing, foot, alignment, turn, footwork, sway, position, rise, cbm, notes` — NOT an older `count`-based shape and NOT a `GLOSSARY` export. Paste the last ~15 lines so I can confirm.
3. Open the **live** `scripts/parse_bg_waltz.js`. This is the canonical template — match its structure exactly. Do not work from memory of it.
4. Confirm `sources/ballroomguide/workshop/standard/tango/` exists (note the extra `workshop/` segment). List the file count. Expected ≈ **31** pages per the provenance manifest — report actual vs. manifest and name any discrepancy.
5. Confirm the NDCC source files are present **in the repo** (not just the KB — you read the filesystem, not Project Knowledge):
   - Primary: `docs/ndcc_tango_syllabus.json` — a clean, pre-extracted, verbatim transcription of the Tango column (27 figures, `syllabusNumber` 1–27). **Use this as the NDCC source; do not re-parse the PDF at runtime.**
   - Provenance fallback: `docs/NDCC_Ballroom_Syllabus.pdf` — the original. Only open it if you need to verify a flagged entry. **Tango is Ballroom/Standard — never use `NDCC_Latin_Syllabus.pdf`.**
   - If `ndcc_tango_syllabus.json` is absent, stop and tell me.

---

## 1. Build the Tango parser

Clone `scripts/parse_bg_waltz.js` → `scripts/parse_bg_tango.js`. Change **only** the source directory (`.../workshop/standard/tango/`) and the figure-set keying. Preserve everything else from the Step 1 parser:

- **Corrected step-row schema (do not deviate):** `bar, timing, foot, alignment, turn, footwork, sway, position, rise, cbm, notes`.
- **OP-9 handling:** `rise` holds rise & fall **only**; `cbm` is its own field; `timing` is **verbatim** from source; technique fragments migrated out of the rise column go into `notes` tagged `[migrated-from-rise: ...]`. The source **'Moving' column is parsed but not stored**.
- **gzip:** auto-decompress any gzipped source files mechanically (Step 1 hit one).
- **Provenance per figure:** `dataStatus: 'parsed'`, `sources: ['ballroomguide']`. If any Tango figure has **no** ballroomguide page, **flag it** in the anomaly report — do not fabricate, and do not pull from dancecentral (that is Step 4).
- **`AUDIT_PRIORITY` map:** start **empty** for Tango. Populate it only from anomalies surfaced *this run* (step-count mismatches and/or blank rise & fall), and only at the checkpoint with my confirmation.

## 1.5 Load the NDCC Tango tier/number list

The NDCC tier/number data has already been extracted verbatim from `NDCC_Ballroom_Syllabus.pdf` into `docs/ndcc_tango_syllabus.json`. **Read that file — do not re-parse the PDF.** It contains 27 Tango figures, each `{ syllabusNumber, syllabusLevel, ndccName }`, numbered per-dance 1–27 across tiers (Beginners → Gold), plus a `_provenance` block.

Honor these from the file:
- One entry (`Closed`, #4) carries a `flag` noting it may be truncated in the source. Treat any flagged NDCC entry as provisional — surface it at the checkpoint; do not silently expand it.
- Gold Star has no individual figures (source note only) — there are no #28+ entries by design.
- If the JSON is missing or malformed, stop and tell me; only then fall back to reading the PDF's Tango column (column 2 of 4), and if you do, isolate that column and verify by rasterizing — never trust a naive full-page text extract.

## 1.6 Match parsed figures to NDCC entries — propose, don't guess

Match each parsed **ballroomguide** Tango figure (§1) to an NDCC Tango entry (§1.5) by name:
- **Exact name match** → apply `syllabusLevel` / `syllabusNumber`; set `targetLevel` to the same tier.
- **Non-exact / fuzzy match** (different wording, abbreviation, ordering) → **do NOT finalize.** List the proposed pairing in the anomaly report for my confirmation; leave NDCC fields `null` until I confirm.
- **ballroomguide figure with no NDCC entry** → leave NDCC fields `null` and flag.
- **NDCC entry with no ballroomguide page** → note it (it simply gets no rich data this run; not an error).

Figure-name → tier/number is dance content under the standing rule: the NDCC syllabus file supplies it, I confirm the fuzzy ones, you never guess.



- **Append** parsed Tango figures to `FIGURE_RICH_DATA` in `src/data.js`, keyed by figure name. **Do NOT modify any Waltz entry. Do NOT revert the schema to `count`.**
- **`FIGURES` catalog:** create `FIGURES['Tango']` entries (preserve the **dance-keyed object shape — do not flatten**) for each parsed figure, with name + dance.
- **NDCC metadata (`targetLevel` / `syllabusLevel` / `syllabusNumber`):** populate from the §1.5–§1.6 result only. Exact-match figures get their tier/number; fuzzy-match and unmatched figures stay `null` until I confirm at the checkpoint. **Never assign tiers or numbers from model knowledge or from the Latin syllabus.**
- **No display-layer changes.** `FigureDetailPanel` already binds `s.timing` and has `position` in `OPTIONAL_COLS` (fixed in Step 1). **Do NOT touch `App.jsx`, `FigureDetailPanel`, `barsUsed`, or `reorderDragId`.** No deploy.

## 3. Anomaly report

Write `docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` in the **same format as Step 1** (`docs/StudioPlanner_Phase2a_Step1_Anomalies.md`):

- Summary count table
- Figures with no ballroomguide source
- Step-count mismatches (old vs. new, per role)
- Blank Timing cells
- Blank Rise & Fall cells
- Non-CBM pipe prefixes routed to notes
- Rise content divergence (old → new)
- **NDCC matching — exact matches applied** (figure → tier/number)
- **NDCC matching — fuzzy matches needing my confirmation** (ballroomguide name → proposed NDCC entry)
- **NDCC matching — ballroomguide figures with no NDCC entry** (NDCC fields left null)
- **NDCC matching — NDCC Tango entries with no ballroomguide page** (no rich data this run)
- Mechanical / handled

## 4. Checkpoint — STOP for review before any commit

Present: parsed Tango figure count vs. manifest; the `data.js` diff (**Tango additions only**); the anomaly report; the **NDCC fuzzy-match list for my confirmation** (none of those tiers get written until I approve them); and any proposed `auditPriority: 'high'` tags with reasons. **Pause. Commit only after I approve.** Do not begin any other dance — Foxtrot/Quickstep/Latin are separate runs with their own checkpoint cycles.

---

## Standing rule (binding — dance content)

**No dreaming, no assumptions on dance content.** All dance-domain content (timings, footwork, alignment, rise & fall, sway, step content, figure-name → NDCC tier/number) comes from the archives plus my confirmation. Missing data is **flagged, never interpolated**. Source conflicts are **logged, never silently resolved** (ballroomguide wins structural fields). Borderline cases are treated as dance content and flagged. This constrains dance content only — not parser/schema/file mechanics.

## Explicitly OUT OF SCOPE this run

- **dancecentral enrichment merge** — that is Step 4, not now. Step 2 is ballroomguide structural only.
- **Jive structural gap (D-3)** — Latin only; irrelevant to Tango.
- **`foxtrot` ↔ `slow-foxtrot` alias** — a Foxtrot / Step 4 concern; irrelevant to Tango.
- **Audited-figure protection** — no Tango figure is audited. If one unexpectedly appears flagged audited, **flag it and do not overwrite** (the fail-closed parser fix is still deferred to Phase 2b).
- **Any deploy, `App.jsx`, or render-layer change.**
