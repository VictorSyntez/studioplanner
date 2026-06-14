# StudioPlanner — Phase 2a Step 1: Claude Code Opening Prompt

**How to use:** Launch Claude Code in the repo with `claude --continue`. Paste the block below as the first message. Claude Code will pause at each marked point; reply "approved / proceed" or correct it. The final pause (Step 1.6) is **Checkpoint 2** — bring the diff to the claude.ai Project for a second read before approving if desired.

**Estimated time to the diff:** ~30–45 min of Claude Code execution under attentive conditions, then 30–60 min for the Checkpoint 2 review.

---

```
We are doing Phase 2a, Step 1 of StudioPlanner: the OP-9 root fix + unified-pipeline Waltz re-parse. Work step by step and PAUSE for my approval at every commit and at every point marked PAUSE below.

STANDING RULE — no dreaming, no assumptions on dance content:
All dance-domain content (timings, footwork, alignment, rise & fall, sway, step content) comes ONLY from the source archive. Blank/missing cells are FLAGGED, never interpolated. Figure-name → source-file matches that aren't obvious are FLAGGED for me, never guessed. Where sources disagree on a structural field, ballroomguide wins and the conflict is logged — never silently resolved. This holds even when you're confident. It constrains dance content only, not parser/schema/file mechanics.

PREREQUISITE READING (read before any work):
- StudioPlanner_Phase2a_Data_Acquisition_Brief.md
- StudioPlanner_Handoff.md
- StudioPlanner_ARCHIVE_PROVENANCE.md

STEP 1.0 — Verify environment:
- git status clean on main (last commit d54e694).
- Confirm data.js is current: file ENDS with the FIGURE_RICH_DATA block.
- Confirm the Waltz source archive exists at sources/ballroomguide/standard/waltz/ (33 html files).
- Report findings. PAUSE.

STEP 1.1 — Inspect source structure (do NOT assume):
- Open 1-2 archived Waltz pages (e.g. basic_weave.html, natural_turn.html).
- Confirm the documented two-table layout: Table A (Step# | Steps | Turn | Alignment | Moving) and Table B (Step# | Timing | Position | Rise & Fall | Sway | Footwork), per role.
- If the actual structure differs from the brief, STOP and report it. Do not adapt silently.
- Report the confirmed column mapping. PAUSE.

STEP 1.2 — Define the corrected step-row schema explicitly:
- rise: rise & fall text ONLY (from the Rise & Fall column)
- cbm: own field ('CBM' / '' ); never inside rise
- timing: verbatim tokens from the Timing column (1, 2, 3, &, etc.) — never interpolated
- notes: technique commentary
- Show me the schema and the parser's field-routing plan. PAUSE before writing the migration.

STEP 1.3 — Build figure-key → source-file mapping:
- Map each of the 33 data.js FIGURE_RICH_DATA keys to its ballroomguide source file.
- FLAG any non-1:1 cases for me (e.g. a data.js key that may correspond to two source files, or vice versa). Do not guess these.
- Report the mapping + flagged cases. PAUSE.

STEP 1.4 — Parse + migrate (script, not hand-edit):
- Parse all 33 Waltz figures' STRUCTURAL fields from the archive into the corrected schema.
- PRESERVE existing coaching notes from current data.js; move technique fragments currently contaminating the rise field into notes (or cbm where appropriate). Do NOT delete existing notes — the dancecentral re-merge is Step 4, not now.
- Add provenance fields: dataStatus: 'parsed' and sources: ['ballroomguide'] on every figure, EXCEPT 'Open Impetus and Wing' which stays dataStatus: 'audited' — do NOT overwrite its audited values; if ballroomguide disagrees with them, FLAG it, don't change it.
- Flag every blank timing, unparseable row, and any source/existing-data conflict in an anomaly report.

STEP 1.5 — Remove the workaround in the SAME commit:
- Remove the FigureDetailPanel pipe-split workaround.
- Read App.jsx in ranges ([1,223], [223,700], [700,1090]) — it is too large for a single read.

STEP 1.6 — Verify + diff:
- Run npm run dev; confirm Rise cells render clean (no pipe contamination).
- Produce a before/after diff of data.js Waltz data for my review (Checkpoint 2).
- Deliver: the diff + the anomaly report + the flagged mapping cases. PAUSE for my approval.

Do not parse any non-Waltz dance until I approve the Step 1 diff.
```

---

## Checkpoint 2 review focus (for Victor)

- Pipe contamination gone from **every** `rise` field; `cbm` and `timing` populated correctly; nothing non-Waltz changed.
- Spot-check figures known cold: **Natural Turn, Whisk, Open Impetus and Wing**.
- **Open Impetus and Wing** is the one audited figure — its source `open_impetus.html` was a gap-fill recovery, so confirm it parsed clean and its audited values were preserved (any ballroomguide disagreement should be flagged, not applied).
- Read the anomaly report (blank timings, unparseable rows, conflicts) and resolve or defer each item explicitly.
