# StudioPlanner — Phase 2a Step 4 (Quickstep) — Anomaly Report

Generated: 2026-07-24

## Summary

| Category | Count |
|---|---|
| Quickstep figures parsed | 20 |
| Blank Timing cells | 0 |
| Blank Rhythm cells | 0 |
| Blank Position cells | 0 |
| Blank Steps/Foot cells | 0 |
| Empty source rows dropped (step# only, no content) | 0 |
| **Table A vs B step-set mismatches (needs Victor)** | 0 |
| Two-page JOINS applied | 1 |
| New rhythm tokens (outside Tango S/Q/&) | 6 |
| NDCC — exact matches applied | 19 |
| NDCC — BG figures with no exact NDCC entry (null tier "Needs Review") | 1 |
| NDCC — NDCC entries with no exact BG page | 12 |
| Fuzzy near-match SUGGESTIONS (NOT applied) | 0 |
| BG → NDCC name renames applied | 1 |
| Within-Quickstep duplicate keys | 0 |
| Gzipped source files (auto-handled) | 18 |

## Victor's §7 ruling notes

- **#13 not #3:** `Progressive Chasse to Right` → NDCC #13 `Progressive Chassé to Right` (Pre-Bronze). The fuzzy suggester's accent artifact proposed #3 `Progressive Chassé`; that suggestion is WRONG and was overridden.
- **#17 tier correction:** `Cross Chasse` → #17 `Cross Chassé`. Victor's ruling text said "Silver"; #17 is a **Bronze** figure (syllabus 14–20) and number/name/tier agree on Bronze — confirmed a slip, corrected to Bronze (2026-07-24).
- **Tipple rename matches NEITHER source verbatim:** Victor ruled the BG spelling with the abbreviation expanded — key `Tipple Chasse to Right`. BG prints `Tipple Chasse to R`; NDCC prints `Tipple Chassé to Right` (accent). An explicit keying decision, NOT a transcription error.
- **#30 seam-dedupe:** page 2's step 1 is dropped as the shared entry step — see the "Two-page JOINS" section for the dropped row (verbatim) and the bidirectional-overlap evidence.

## ballroomguide coverage gaps — Victor's ruling: Option C

12 of the 31 NDCC Quickstep figures have **no ballroomguide source page under any spelling** (confirmed against a fresh Wayback CDX query — 21/21 pages present, not a capture loss; Foxtrot control 31/31):

| # | Tier | NDCC figure |
|---|---|---|
| 2 | Beginners | Heel Pivot ( Quarter Turn to Left ) |
| 3 | Beginners | Progressive Chassé |
| 6 | Pre-Bronze | Natural Turn |
| 8 | Pre-Bronze | Natural Turn with Hesitation |
| 16 | Bronze | Zig-Zag Back Lock & Running Finish |
| 19 | Bronze | Natural Turn and Back Lock |
| 20 | Bronze | Double Reverse Spin |
| 21 | Silver | Quick Open Reverse |
| 24 | Silver | Four Quick Run |
| 27 | Gold | Cross Swivel |
| 29 | Gold | Rumba Cross |
| 31 | Gold | Hover Corte |

**RULING — Option C (Victor):** parse ballroomguide now (this Step 4 pass), and **defer gap-fill to its own dedicated step covering Quickstep and Jive together.** Rationale: both dances have structural coverage gaps at ballroomguide (Quickstep 12 missing; Jive D-3, only ~6 pages) whose only backfill source is dancecentral — a prose/list source with no Table A/B step charts (all dancecentral Quickstep pages carry zero `<table>` step charts). Promoting a prose source to structural fallback is one decision, made once, for both dances at that step — not piecemeal here. These figures have no BG page to parse, so they are **not** in `data.js` this pass; they surface only in the "NDCC entries with no exact ballroomguide page" list below.

## NDCC — exact matches applied (auto)

- **Back Lock** → tier=Pre-Bronze · number=11 · *auto-exact* → NDCC `Back Lock`
- **Change of Direction** → tier=Bronze · number=18 · *auto-exact* → NDCC `Change of Direction`
- **Chasse Reverse Turn** → tier=Pre-Bronze · number=9 · *victor-override* → NDCC `Chassé Reverse Turn`
- **Progressive Chasse to Right** → tier=Pre-Bronze · number=13 · *victor-override* → NDCC `Progressive Chassé to Right`
- **Closed Impetus** → tier=Pre-Bronze · number=10 · *auto-exact* → NDCC `Closed Impetus`
- **Closed Telemark** → tier=Silver · number=26 · *auto-exact* → NDCC `Closed Telemark`
- **Cross Chasse** → tier=Bronze · number=17 · *victor-override* → NDCC `Cross Chassé`
- **Fishtail** → tier=Silver · number=22 · *auto-exact* → NDCC `Fishtail`
- **Forward Lock** → tier=Beginners · number=4 · *auto-exact* → NDCC `Forward Lock`
- **Natural Pivot Turn** → tier=Pre-Bronze · number=7 · *auto-exact* → NDCC `Natural Pivot Turn`
- **Quarter Turn to Right** → tier=Beginners · number=1 · *auto-exact* → NDCC `Quarter Turn to Right`
- **Reverse Pivot** → tier=Pre-Bronze · number=12 · *auto-exact* → NDCC `Reverse Pivot`
- **Running Finish** → tier=Bronze · number=15 · *auto-exact* → NDCC `Running Finish`
- **Running Right Turn** → tier=Silver · number=23 · *auto-exact* → NDCC `Running Right Turn`
- **Six Quick Run** → tier=Gold · number=28 · *auto-exact* → NDCC `Six Quick Run`
- **Natural Spin Turn** → tier=Beginners · number=5 · *auto-exact* → NDCC `Natural Spin Turn`
- **Tipple Chasse to Right** → tier=Bronze · number=14 · *victor-override* → NDCC `Tipple Chassé to Right`
- **V6** → tier=Silver · number=25 · *auto-exact* → NDCC `V6`
- **Tipsy to Right & Left** → tier=Gold · number=30 · *victor-override* → NDCC `Tipsy to Right & Left`

## NDCC — ballroomguide figures with NO exact NDCC entry (null tier — surface in "Needs Review")

- **Quickstep Prep Step**

## NDCC — NDCC Quickstep entries with NO exact ballroomguide page

- **Heel Pivot ( Quarter Turn to Left )** (Beginners · #2)
- **Progressive Chassé** (Beginners · #3)
- **Natural Turn** (Pre-Bronze · #6)
- **Natural Turn with Hesitation** (Pre-Bronze · #8)
- **Zig-Zag Back Lock & Running Finish** (Bronze · #16)  ⚠ Compound figure. Its components have their own ballroomguide pages (Back Lock #11, Running Finish #15) but the combined figure does not. Victor's ruling at the §7 checkpoint.
- **Natural Turn and Back Lock** (Bronze · #19)
- **Double Reverse Spin** (Bronze · #20)
- **Quick Open Reverse** (Silver · #21)
- **Four Quick Run** (Silver · #24)
- **Cross Swivel** (Gold · #27)
- **Rumba Cross** (Gold · #29)
- **Hover Corte** (Gold · #31)

## SUGGESTED pairings for Victor (NORMALIZED near-matches — NOT applied; confirm figure-by-figure)

_None._

## Two-page JOINS (seam continuity for review)

- **Tipsy to Right & Left** — Victor-ruled JOIN (#30): two BG pages (Tipsy to Right + Tipsy to Left) merged into one figure. SEAM-DEDUPE (Victor 2026-07-24): each page's step 1 is the shared entry step (a restatement of the preceding figure's step 4), so page 2's step 1 is dropped for both roles → page-1 steps 1–4 + page-2 steps 2–4 = 7 steps/role. Retained rows verbatim, NOT renumbered or reconciled; bars recomputed from the 7-step sequence.
  - page 1: `tipsy_to_R.html` ("Tipsy to Right (Gold)") — 4 leader / 4 follower steps retained · Commenced: `Commenced Backing DW` · Ended: `Ended Facing DC`
  - page 2: `tipsy_to_L.html` ("Tipsy to Left (Gold)") — 3 leader / 3 follower steps retained · seam-dedupe: dropped step 1 (leader) / 1 (follower) · Commenced: `Commenced Facing LOD` · Ended: `Ended Backing DC`
  - **SEAM-DEDUPE — Victor's explicit ruling (#30, 2026-07-24):** each page's step 1 is the shared ENTRY step (a restatement of the preceding figure's step 4), NOT a new step. Page 2's step 1 dropped for both roles; retained rows verbatim, NOT renumbered or reconciled; bars recomputed over the 7-step sequence.
  - **Dropped rows (verbatim):**
    - leader — `Tipsy to Left (Gold)` — step 1: foot="RF fwd" turn="Com to turn R" alignment="Facing DW" position="Closed" timing="12" rhythm="S" rise="" sway="" footwork="HT"
    - follower — `Tipsy to Left (Gold)` — step 1: foot="LF back" turn="Com to turn R" alignment="Backing DW" position="Closed" timing="12" rhythm="S" rise="" sway="" footwork="HT"
  - **Bidirectional-overlap evidence** (each page's step 1 matches the OTHER page's step 4 on foot / alignment / moving):
    - leader: page-2 step 1 [foot="RF fwd", align="Facing DW", moving="DW"]  ≡  page-1 step 4 [foot="RF fwd, small step", align="Facing DW", moving="DW"]
    - leader: page-1 step 1 [foot="LF back", align="Backing DW", moving="DW"]  ≡  page-2 step 4 [foot="LF back, small step", align="Backing DW", moving="DW"]
    - follower: page-2 step 1 [foot="LF back", align="Backing DW", moving="DW"]  ≡  page-1 step 4 [foot="LF back, small step", align="Backing DW", moving="DW"]
    - follower: page-1 step 1 [foot="RF fwd", align="Facing DW", moving="DW"]  ≡  page-2 step 4 [foot="RF fwd, small step", align="Facing DW", moving="DW"]

## ⚠ Table A vs Table B step-number SET mismatches (source charts misaligned — NEEDS VICTOR, not auto-resolved)

_None._

## Empty source rows dropped (only a step# present, no content — mechanical noise removal)

_None._

## New rhythm tokens (Quickstep-specific, outside Tango S/Q/& — stored verbatim)

- **Quickstep Prep Step** / leader / source step# 1 — token `S(SSS)`
- **Quickstep Prep Step** / leader / source step# 2 — token `S(SS)`
- **Quickstep Prep Step** / leader / source step# 3 — token `12`
- **Quickstep Prep Step** / follower / source step# 1 — token `S(SSS)`
- **Quickstep Prep Step** / follower / source step# 2 — token `S(SS)`
- **Quickstep Prep Step** / follower / source step# 3 — token `12`

## ⚠ Table B shape anomalies — irregular Timing/Rhythm cells (verbatim, for Victor's inspection)

| Figure | Role | Step | timing | rhythm | position | footwork |
|---|---|:--:|---|---|---|---|
| Quickstep Prep Step | leader | 1 | `1234.1234` | `S(SSS)` | `Closed` | `i/e of foot to WF` |
| Quickstep Prep Step | leader | 2 | `1234.12` | `S(SS)` | `Closed` | `i/e of foot to WF` |
| Quickstep Prep Step | leader | 3 | `34` | `12` | `S` | *(blank)* |
| Quickstep Prep Step | follower | 1 | `1234.1234` | `S(SSS)` | `Closed` | `i/e of foot to WF` |
| Quickstep Prep Step | follower | 2 | `1234.12` | `S(SS)` | `Closed` | `i/e of foot to WF` |
| Quickstep Prep Step | follower | 3 | `34` | `12` | `S` | *(blank)* |

- All rows above are from **Quickstep Prep Step** (non-syllabus BG extra; permanent null-tier, mirroring "Waltz Prep Step"). Any `rhythm` that reads like a beat-count and any `timing` with a period suggests a **column-shifted source row** — e.g. `position="S"` reads like a rhythm value. Stored **verbatim, NOT corrected**. No NDCC-syllabus figure is affected.

## BG → NDCC name renames applied

- `Tipple Chasse to R` → `Tipple Chasse to Right` (NDCC #14: `Tipple Chassé to Right`)

## Within-Quickstep duplicate keys (should be empty)

_None._

## Blank Timing cells in archive

_None._

## Blank Rhythm cells in archive

_None._

## Blank Position cells in archive

_None._

## Blank Steps/Foot cells in archive

_None._

## Mechanical / handled

- **Quickstep Table B layout** (VERIFIED from source): 7 cols `Step_# | Timing | Rhythm | Position | Rise & Fall | Sway | Footwork` — the SAME hybrid as Foxtrot (carries BOTH Tango's `Rhythm` AND Waltz's `Rise & Fall`/`Sway`). Table A is the same 5-col. Uniform across all 21 source files.
- **Rhythm field** stored verbatim, NOT normalized. Tokens outside Tango's `S`/`Q`/`&` set are listed under "New rhythm tokens" above.
- **'Moving' column** (Table A col 5): parsed and discarded, per Step 1.2 decision.
- **`cbm` and per-step `notes`** emitted as `''` (no source columns; coaching enrichment deferred to Step 4/5 dancecentral merge).
- **`prep_step.html`** ("Quickstep Prep Step") has only 5 tables (no trailing "Ended Facing" table). Harmless — only the first 4 chart tables are used. It is a BG extra with no NDCC entry → null tier.
- **Bar derivation is PROVISIONAL.** Quickstep timing tokens are beat-groupings; the inherited "timing resets to bare 1" heuristic fires inconsistently. True musical-bar assignment is a **Phase 2b / Victor** decision. Per-step `timing` is preserved verbatim as the source of truth. Per-figure provisional bar counts are listed below.
- **Victor's §7 rulings APPLIED this pass** (2026-07-24): 5 overrides + 1 JOIN. Auto-exact matches cover the rest. Only `Quickstep Prep Step` (non-syllabus BG extra) remains null-tier "Needs Review" — permanent, mirroring "Waltz Prep Step". See the dedicated rulings section for details.
- **No display-layer changes** this run: `App.jsx` untouched.
- **No cross-dance modifications:** parser writes into `FIGURE_RICH_DATA['Quickstep']` and `FIGURES['Quickstep']` only.

## Provisional per-figure bar counts (for audit)

- **Back Lock** — leader 4 steps / follower 4 steps / provisional bars=1
- **Change of Direction** — leader 3 steps / follower 3 steps / provisional bars=1
- **Chasse Reverse Turn** — leader 3 steps / follower 3 steps / provisional bars=1
- **Progressive Chasse to Right** — leader 4 steps / follower 4 steps / provisional bars=1
- **Closed Impetus** — leader 3 steps / follower 3 steps / provisional bars=1
- **Closed Telemark** — leader 3 steps / follower 3 steps / provisional bars=1
- **Cross Chasse** — leader 3 steps / follower 3 steps / provisional bars=1
- **Fishtail** — leader 6 steps / follower 6 steps / provisional bars=1
- **Forward Lock** — leader 4 steps / follower 4 steps / provisional bars=1
- **Natural Pivot Turn** — leader 4 steps / follower 4 steps / provisional bars=1
- **Quickstep Prep Step** — leader 3 steps / follower 3 steps / provisional bars=1
- **Quarter Turn to Right** — leader 4 steps / follower 4 steps / provisional bars=1
- **Reverse Pivot** — leader 1 steps / follower 1 steps / provisional bars=1
- **Running Finish** — leader 3 steps / follower 3 steps / provisional bars=1
- **Running Right Turn** — leader 10 steps / follower 10 steps / provisional bars=1
- **Six Quick Run** — leader 6 steps / follower 6 steps / provisional bars=1
- **Natural Spin Turn** — leader 6 steps / follower 6 steps / provisional bars=1
- **Tipple Chasse to Right** — leader 7 steps / follower 7 steps / provisional bars=1
- **V6** — leader 7 steps / follower 7 steps / provisional bars=2
- **Tipsy to Right & Left** — leader 7 steps / follower 7 steps / provisional bars=1
