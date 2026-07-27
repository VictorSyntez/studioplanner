# StudioPlanner — Work Order: Foxtrot #16 Compound JOIN

**Date ruled:** 2026-07-26 (session 2) · **ruledBy: Victor** · **Executor:** Claude Code
**Resolves:** the single unaudited Foxtrot figure (queue item "Foxtrot #16 Outside Swivel compound JOIN ruling").

## Rulings (all Victor, 2026-07-26)

1. **Construction: option (a)** — build the full grouped figure as a new compound key by JOIN of four ballroomguide components. NOT the keep-as-is 1-step swivel representation.
2. **Compound key name:** `Open Telemark, Natural Turn to Outside Swivel and Feather Ending` — dancecentral's form, a deliberate deviation from NDCC print. NDCC verbatim syllabus name remains **"Open Telemark Outside Swivel and Feather Ending"** (`ndcc_foxtrot_syllabus.json` #16 / Silver) and must be carried on the record (use `syllabusNotes` per the established pattern for name-divergent figures).
3. **Standalone `Outside Swivel` (Foxtrot) disposition:** becomes a **null-tier standalone** — `syllabusLevel: null, syllabusNumber: null, syllabusBody: null`. Its 1-step chart is retained unchanged; `dataStatus` remains `parsed` (its own audit is not ruled here). #16 is carried solely by the compound.
4. **MANDATORY REVIEW CONDITION (binding, from Victor's dance-domain note):** every seam is presented to Victor explicitly for review **before commit**, showing for both roles at each connected point: the ending step's position + alignment on the earlier component and the commencing step's position + alignment on the later component. Victor's stated reason, recorded verbatim in substance: within this grouped figure the Natural Turn is danced from Promenade Position, unlike its usual closed-position context — connected points and connected positions of leader and follower need special attention. This is a review criterion for Victor's eyes; Claude does not resolve seam questions itself.

## Construction plan

**Components (source: existing `src/data.js` BG-derived charts; step counts are engineering facts from the file):**

| Order | Component | Source | Steps/role |
|---|---|---|---|
| 1 | Open Telemark | page 1 of the audited `Open Telemark & Feather Ending` JOIN (`open_telemark.html`) | 3 |
| 2 | Open Natural Turn | `Open Natural Turn` key (audited 2026-07-25, null-tier; alias map: "Component of the #16 grouped figure"; chart commences `position: 'PP'` both roles) | 3 |
| 3 | Outside Swivel | `Outside Swivel` key (parsed) | 1 |
| 4 | Feather Ending | page 2 of the audited `Open Telemark & Feather Ending` JOIN (`feather_ending.html`) | 3 |

Total **10 steps/role** (matches the handoff construction note "~10 steps").

**Seams (three), each subject to ruling 4's mandatory presentation:**
- S1: Open Telemark step 3 → Open Natural Turn step 1
- S2: Open Natural Turn step 3 → Outside Swivel step 1
- S3: Outside Swivel step 1 → Feather Ending step 1

**JOIN mechanics — established rules apply unchanged (Victor's Foxtrot #10 JOIN ruling + seam-dedupe test):**
- Steps concatenated across seams; **no invented transition content** (no-dreaming rule).
- **Seam-dedupe test** (bidirectional foot-exact overlap check, as applied to Quickstep #30 and Foxtrot #10) run at all three seams; results included in the seam presentation.
- Source phrasing at seams kept **verbatim, not reconciled**; any commenced/ended phrasing mismatch is flagged in the presentation (precedent: the Foxtrot #10 `Ended Moving LOD` / `Commenced Moving to Centre` seam).
- **Cross-check:** dancecentral page `open-telemark-natural-turn-to-outside-swivel-and-feather-ending.html` — cross-check only; ballroomguide wins structural fields; conflicts logged for Victor, never silently resolved.

**Metadata for the compound:** `dance: 'Foxtrot'`, `syllabusLevel: 'Silver'`, `syllabusNumber: 16`, `syllabusBody: 'NDCC'` (quoted from `ndcc_foxtrot_syllabus.json` at encode time per citation rule #12), `dataStatus: 'parsed'` at creation; flips to `audited` only after the against-source audit of the assembled figure passes under the standard Phase 2b method. Provisional `bars` via **Decision B Foxtrot parameterization** (S=2, Q=1, 4 beats/bar); out-of-set tokens flag `bars: null`.

**Peer stores:** the new key is added to BOTH `FIGURES` and `FIGURE_RICH_DATA` (peer-store rule); the `Outside Swivel` null-tier edit is applied in both.

## Sequencing

1. Assemble compound in a working copy; run seam-dedupe; prepare the three-seam presentation.
2. **PAUSE — Victor seam review (ruling 4). No commit before his confirmation.**
3. Apply confirmed assembly + `Outside Swivel` null-tier edit + `syllabusNotes`.
4. Audit the compound against source (standard method); log corrections per Decision A schema.
5. Diff review by Victor → commit.

## Verification

- Figure count 114 → **115** (Foxtrot 30 → 31); audited count updates per audit outcome.
- `Outside Swivel` renders in the non-syllabus/Needs-Review bucket; compound renders in Foxtrot Silver.
- No other figure's data changes (sha-check other dances byte-identical).
