# StudioPlanner — Phase 2a Step 3 (Foxtrot) — Anomaly Report

Generated: 2026-07-19

## Summary

| Category | Count |
|---|---|
| Foxtrot figures parsed | 30 |
| Blank Timing cells | 1 |
| Blank Rhythm cells | 1 |
| Blank Position cells | 1 |
| Blank Steps/Foot cells | 1 |
| Empty source rows dropped (step# only, no content) | 1 |
| **Table A vs B step-set mismatches (needs Victor)** | 2 |
| Two-page JOINS applied (Victor's #10 ruling) | 1 |
| New rhythm tokens (outside Tango S/Q/&) | 2 |
| NDCC — exact matches applied | 25 |
| NDCC — BG figures with no exact NDCC entry (null tier "Needs Review") | 5 |
| NDCC — NDCC entries with no exact BG page | 0 |
| Fuzzy near-match SUGGESTIONS (NOT applied) | 0 |
| BG → NDCC name renames applied | 3 |
| Within-Foxtrot duplicate keys | 0 |
| Gzipped source files (auto-handled) | 0 |

## NDCC — exact matches applied (auto)

- **Basic Weave** → tier=Bronze · number=8 · *auto-exact* → NDCC `Basic Weave`
- **Bounce Fallaway with Weave Ending** → tier=Gold · number=25 · *auto-exact* → NDCC `Bounce Fallaway with Weave Ending`
- **Change of Direction** → tier=Bronze · number=7 · *auto-exact* → NDCC `Change of Direction`
- **Closed Impetus & Feather Finish** → tier=Pre-Bronze · number=5 · *victor-override* → NDCC `Closed Impetus and Feather Finish`
- **Closed Telemark** → tier=Silver · number=9 · *auto-exact* → NDCC `Closed Telemark`
- **Curved Feather to Back Feather** → tier=Gold · number=21 · *victor-override* → NDCC `Curved Feather to Back Feather`
- **Fallaway Reverse & Slip Pivot** → tier=Gold · number=23 · *victor-override* → NDCC `Fallaway Reverse and Slip Pivot`
- **Feather Step** → tier=Pre-Bronze · number=1 · *auto-exact* → NDCC `Feather Step`
- **Hover Cross** → tier=Silver · number=15 · *victor-override* → NDCC `Cross`
- **Hover Feather** → tier=Silver · number=12 · *victor-override* → NDCC `Feather Hover`
- **Hover Telemark** → tier=Silver · number=14 · *victor-override* → NDCC `Telemark Hover`
- **Natural Hover Telemark** → tier=Gold · number=24 · *auto-exact* → NDCC `Natural Hover Telemark`
- **Natural Telemark** → tier=Silver · number=13 · *victor-override* → NDCC `Telemark Natural`
- **Natural Turn** → tier=Pre-Bronze · number=3 · *auto-exact* → NDCC `Natural Turn`
- **Natural Weave** → tier=Bronze · number=6 · *auto-exact* → NDCC `Natural Weave`
- **Open Impetus** → tier=Silver · number=17 · *auto-exact* → NDCC `Open Impetus`
- **Outside Swivel** → tier=Silver · number=16 · *victor-override* → NDCC `Open Telemark Outside Swivel and Feather Ending`
- **Reverse Turn & Feather Finish** → tier=Pre-Bronze · number=4 · *victor-override* → NDCC `Reverse Turn ( incl. Feather Finish )`
- **Reverse Wave** → tier=Silver · number=19 · *auto-exact* → NDCC `Reverse Wave`
- **Three Step** → tier=Pre-Bronze · number=2 · *auto-exact* → NDCC `Three Step`
- **Top Spin** → tier=Silver · number=11 · *victor-override* → NDCC `Top Spin Hover`
- **Natural Twist Turn** → tier=Gold · number=20 · *auto-exact* → NDCC `Natural Twist Turn`
- **Weave from PP** → tier=Silver · number=18 · *victor-override* → NDCC `Weave from PP`
- **Natural Zig-Zag from PP** → tier=Gold · number=22 · *victor-override* → NDCC `Natural Zig-Zag from PP`
- **Open Telemark & Feather Ending** → tier=Silver · number=10 · *victor-override* → NDCC `Open Telemark and Feather Ending`

## NDCC — ballroomguide figures with NO exact NDCC entry (null tier — surface in "Needs Review")

- **Open Natural Turn**  (BG tier label: Silver)
- **Foxtrot Prep Step**
- **Natural Twist Turn with Closed Impetus & Feather Finish Ending**  (BG tier label: Gold)
- **Natural Twist Turn with Open Impetus Ending**  (BG tier label: Gold)
- **Natural Twist Turn with Weave Ending**  (BG tier label: Gold)

## NDCC — NDCC Foxtrot entries with NO exact ballroomguide page

_None._

## SUGGESTED pairings for Victor (NORMALIZED near-matches — NOT applied; confirm figure-by-figure)

_None._

## Two-page JOINS (Victor's #10 ruling — seam continuity for review)

- **Open Telemark & Feather Ending** — Victor-ruled JOIN (#10): two BG pages merged into one figure; steps concatenated across the seam, no invented transition content.
  - page 1: `open_telemark.html` ("Open Telemark (Silver)") — 3 leader / 3 follower steps · Commenced: `Commenced Facing DC` · Ended: `Ended Moving LOD`
  - page 2: `feather_ending.html` ("Feather Ending (Silver)") — 3 leader / 3 follower steps · Commenced: `Commenced Moving to Centre` · Ended: `Ended Facing DC`
  - ⚠ **SEAM:** page 1 ends `Ended Moving LOD`; page 2 commences `Commenced Moving to Centre` — kept verbatim, NOT reconciled. Step data joins PP→PP / Facing DW→Facing DW (continuous). Confirm the moving-direction phrasing difference is acceptable.

## ⚠ Table A vs Table B step-number SET mismatches (source charts misaligned — NEEDS VICTOR, not auto-resolved)

- **Hover Cross** / leader — A steps [1,2,3,4,5,6,7,8] vs B steps [1,2,3,4,5,6,7]  · A-only: 8
- **Natural Zig-Zag from Promenade Position** / follower — A steps [1,2,3,5,6] vs B steps [1,2,3,4,5]  · A-only: 6  · B-only: 4

## Empty source rows dropped (only a step# present, no content — mechanical noise removal)

- **Hover Cross** / leader / source step# 8

## New rhythm tokens (Foxtrot-specific, outside Tango S/Q/& — stored verbatim)

- **Foxtrot Prep Step** / leader / source step# 1 — token `S(S)`
- **Foxtrot Prep Step** / follower / source step# 1 — token `S(S)`

## BG → NDCC name renames applied

- `Curved Feather to Back Feather & Feather Finish` → `Curved Feather to Back Feather` (NDCC #21: `Curved Feather to Back Feather`)
- `Weave from Promenade Position` → `Weave from PP` (NDCC #18: `Weave from PP`)
- `Natural Zig-Zag from Promenade Position` → `Natural Zig-Zag from PP` (NDCC #22: `Natural Zig-Zag from PP`)

## Within-Foxtrot duplicate keys (should be empty)

_None._

## Blank Timing cells in archive

- **Natural Zig-Zag from Promenade Position** / follower / source step# 6

## Blank Rhythm cells in archive

- **Natural Zig-Zag from Promenade Position** / follower / source step# 6

## Blank Position cells in archive

- **Natural Zig-Zag from Promenade Position** / follower / source step# 6

## Blank Steps/Foot cells in archive

- **Natural Zig-Zag from Promenade Position** / follower / source step# 4

## Mechanical / handled

- **Foxtrot Table B layout** (VERIFIED from source; supersedes work-order §3.3): 7 cols `Step_# | Timing | Rhythm | Position | Rise & Fall | Sway | Footwork` — a HYBRID carrying BOTH Tango's `Rhythm` AND Waltz's `Rise & Fall`/`Sway`. All three populated. Uniform across all 31 source files.
- **Rhythm field** stored verbatim. New Foxtrot token `S(S)` observed (Tango's set was `S`/`Q`/`&`); NOT normalized. See "New rhythm tokens" above.
- **'Moving' column** (Table A col 5): parsed and discarded, per Step 1.2 decision.
- **`cbm` and per-step `notes`** emitted as `''` (no source columns; coaching enrichment deferred to Step 4 dancecentral merge).
- **Bar derivation is PROVISIONAL.** Foxtrot timing tokens are beat-groupings (`12`,`3`,`4`,`56`,`78`...); the inherited "timing resets to bare 1" heuristic fires inconsistently. True musical-bar assignment is a **Phase 2b / Victor** decision. Per-step `timing` is preserved verbatim as the source of truth. Per-figure provisional bar counts are listed below.
- **No overrides/renames/consolidations applied this pass.** Only EXACT NDCC name matches auto-applied; everything else is null-tier "Needs Review". Victor confirms the suggested pairings figure-by-figure at the §7 checkpoint (mirrors the Tango Checkpoint-2 flow), after which `NDCC_OVERRIDES` is populated and the parser re-run.
- **No display-layer changes** this run: `App.jsx` untouched.
- **No cross-dance modifications:** parser writes into `FIGURE_RICH_DATA['Foxtrot']` and `FIGURES['Foxtrot']` only.

## Provisional per-figure bar counts (for audit)

- **Basic Weave** — leader 6 steps / follower 6 steps / provisional bars=2
- **Bounce Fallaway with Weave Ending** — leader 8 steps / follower 8 steps / provisional bars=1
- **Change of Direction** — leader 4 steps / follower 4 steps / provisional bars=1
- **Closed Impetus & Feather Finish** — leader 6 steps / follower 6 steps / provisional bars=1
- **Closed Telemark** — leader 3 steps / follower 3 steps / provisional bars=1
- **Curved Feather to Back Feather** — leader 9 steps / follower 9 steps / provisional bars=1
- **Fallaway Reverse & Slip Pivot** — leader 4 steps / follower 4 steps / provisional bars=1
- **Feather Step** — leader 3 steps / follower 3 steps / provisional bars=1
- **Hover Cross** — leader 7 steps / follower 7 steps / provisional bars=1
- **Hover Feather** — leader 2 steps / follower 2 steps / provisional bars=1
- **Hover Telemark** — leader 3 steps / follower 3 steps / provisional bars=1
- **Natural Hover Telemark** — leader 6 steps / follower 6 steps / provisional bars=1
- **Natural Telemark** — leader 5 steps / follower 5 steps / provisional bars=1
- **Natural Turn** — leader 6 steps / follower 6 steps / provisional bars=1
- **Natural Weave** — leader 7 steps / follower 7 steps / provisional bars=1
- **Open Impetus** — leader 3 steps / follower 3 steps / provisional bars=1
- **Open Natural Turn** — leader 3 steps / follower 3 steps / provisional bars=1
- **Outside Swivel** — leader 1 steps / follower 1 steps / provisional bars=1
- **Foxtrot Prep Step** — leader 3 steps / follower 3 steps / provisional bars=1
- **Reverse Turn & Feather Finish** — leader 6 steps / follower 6 steps / provisional bars=1
- **Reverse Wave** — leader 9 steps / follower 9 steps / provisional bars=1
- **Three Step** — leader 3 steps / follower 3 steps / provisional bars=1
- **Top Spin** — leader 4 steps / follower 4 steps / provisional bars=1
- **Natural Twist Turn** — leader 7 steps / follower 7 steps / provisional bars=1
- **Natural Twist Turn with Closed Impetus & Feather Finish Ending** — leader 9 steps / follower 9 steps / provisional bars=2
- **Natural Twist Turn with Open Impetus Ending** — leader 6 steps / follower 6 steps / provisional bars=1
- **Natural Twist Turn with Weave Ending** — leader 11 steps / follower 11 steps / provisional bars=2
- **Weave from PP** — leader 7 steps / follower 7 steps / provisional bars=1
- **Natural Zig-Zag from PP** — leader 5 steps / follower 6 steps / provisional bars=1
- **Open Telemark & Feather Ending** — leader 6 steps / follower 6 steps / provisional bars=2
