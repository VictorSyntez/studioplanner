# StudioPlanner — KB Update Instructions (2026-06-12 session)

These are the in-place edits to apply to two existing KB docs so they reflect this session's locked decisions. Apply directly (or hand to Claude Code). Goal: keep the brief and roadmap as single canonical docs — avoid leaving a separate "updates" doc in the KB alongside stale originals.

> Recommendation: apply these now for continuity, then **regenerate both docs in full after Step 1** so the Waltz re-parse outcome (anomaly counts, any conflicts) is folded in. The deltas below are the minimum to keep the docs truthful in the meantime.

---

## A. `StudioPlanner_Phase2a_Data_Acquisition_Brief.md`

1. **§2 Decisions locked — add three rows:**
   - *Primary structural source* → "**Wayback Machine raw `id_` captures** of `idans.nl/workshop`. Adopted after live idans returned HTTP 522. Live mirror demoted to revive-and-reconcile."
   - *Waltz notes* → "Existing Waltz coaching notes are **scraped, not hand-authored** (Victor confirmed). Step 1 preserves them and moves only the contaminating fragments out of `rise`; full dancecentral re-merge stays at Step 4."
   - *Standing rule* → "**No dreaming, no assumptions on dance content** (see §11)."

2. **§3 Step 0 — replace the live `wget` block for ballroomguide** with the Wayback method actually used: CDX query → newest 200/html capture per page → raw `id_` fetch → idempotent gap-fill on rate-limit. Mark **Step 0 COMPLETE** (314 files / 8.2 MB ballroomguide; 419 files / 135 MB dancecentral; committed `d54e694`).

3. **§4 Step 1 — reframe:** structural source is the Wayback ballroomguide captures (not the original dancecentral strings). The fix re-parses rise & fall from source and routes technique fragments to `notes`/`cbm`, **preserving existing scraped notes**. Add the OP-9 scope finding: 301 rise fields (104 piped — tokens `CBM`×69, `-`/`--`×29, `slight`/`slight CBM`×4, `Sway(R)`×2; 197 no-pipe run-ons).

4. **§11 Standing rules — add:** the full "no dreaming / no assumptions on dance content" rule (dance content only, not pipeline mechanics; missing flagged not interpolated; conflicts logged, ballroomguide wins structural).

5. **Coverage note — add:** ballroomguide Jive = ~6 figure pages (gap, D-3); dancecentral Jive ~30 available as backfill. Seed alias `foxtrot` ↔ `slow-foxtrot`.

---

## B. `StudioPlanner_Phase2_Architecture_Roadmap.md`

1. **A.3 Waltz library — supersede:** the line "Waltz data is **canonical and untouched** in Phase 2a except for OP-9" is replaced — under the unified pipeline, **Waltz is re-sourced structurally from ballroomguide** like the other 7 dances. Open Impetus and Wing (audited) is protected from auto-replace.

2. **Changelog (rev 2 table) — add a row:** "Sources / Step 1 — structural source for ALL dances incl. Waltz = Wayback ballroomguide captures; live idans 522 → Wayback adopted; Waltz no longer a special case."

3. **Risks #2 (source fragility) — update:** realized this session (idans 522). Mitigated: Wayback archive committed via manifest; risk now near-zero.

4. **Open decisions — D-3:** annotate "ballroomguide structural Jive coverage confirmed thin (~6 pages); dancecentral ~30 pages available as backfill — resolution is enrich-only vs. promote dancecentral to structural fallback for Jive."

5. **OQ-2 — mark RESOLVED:** manifest-only; archives gitignored; manifests + provenance committed.

6. **Appendix 1 checklist — mark Checkpoint 1 (Step 0) items complete** (`d54e694`).

---

## C. New files added to KB this session

- `StudioPlanner_ARCHIVE_PROVENANCE.md` (also committed to repo)
- `StudioPlanner_Phase2a_Step0_Session_Summary_2026-06-12.md`
- `StudioPlanner_Phase2a_Step1_ClaudeCode_Prompt.md`
- Updated `StudioPlanner_Handoff.md` (full regen)
