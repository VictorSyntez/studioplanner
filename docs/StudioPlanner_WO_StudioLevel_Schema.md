# StudioPlanner — Work Order: `studioLevel` Schema (Null-Tier Decision = option c)

**Date ruled:** 2026-07-26 (session 2) · **ruledBy: Victor** · **Executor:** Claude Code
**Ruling history, for the record:** Victor initially ruled option (a) (permanent non-syllabus section), then **revised to option (c)** within the same sitting. (c) is the binding ruling; (a) is superseded.

## The ruling

A new, independent **`studioLevel`** field carries the studio's own level placement for any figure. NDCC fields (`syllabusLevel`, `syllabusNumber`, `syllabusBody`) remain strictly **verbatim-or-null** — never repurposed, never receiving studio-assigned values.

## Schema

- **Field:** `studioLevel` — optional, on figure records in **both peer stores** (`FIGURES` and `FIGURE_RICH_DATA`), matching the existing duplication pattern of the tier metadata; peer-store audit rule applies.
- **Default:** absent/undefined for all 114 (→115) figures at schema introduction. **No values are assigned in this WO** — per-figure `studioLevel` values are Victor's rulings, gathered in a dedicated future sitting.
- **Value domain:** to be ruled by Victor at that sitting (e.g., whether it mirrors the NDCC tier vocabulary or uses studio-specific names). Do not pre-encode a value list.

## Resolution logic (UI/engineering)

- Effective level for filtering/grouping: **`studioLevel ?? syllabusLevel`**.
- `targetLevel` cumulative filter and library tier grouping read the effective level.
- Figures with **neither** field remain in the "Needs Review" bucket exactly as today (explicit guard preserved).
- PS execution view and badges: no behavior change in this WO.

## Explicitly out of scope

- Assigning any `studioLevel` values (future sitting).
- "Needs Review" bucket visual redesign/renaming — remains the tracked **Step 4.5a** design-pass line item.
- Any change to the cumulative-tier ordering logic beyond the fallback read.

## Execution requirements

- No dance-content changes; `data.js` chart fields byte-identical apart from nothing at all in this WO if the field is introduced lazily (preferred: introduce the resolution logic in `App.jsx` reading an optional field; add the field to records only when values are ruled). If Code judges an explicit `studioLevel: null` scaffold on records is needed, flag to Victor first — default is the lazy option.
- Diff review by Victor before commit.

## Verification

- Build passes; library rendering unchanged for all current figures (no figure has `studioLevel` yet).
- Manual check: a temporary test value on one figure moves it to the corresponding tier group and back when removed (test not committed).
