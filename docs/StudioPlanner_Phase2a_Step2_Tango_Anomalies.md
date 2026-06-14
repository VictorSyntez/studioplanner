# StudioPlanner — Phase 2a Step 2 (Tango) — Anomaly Report

Generated: 2026-06-14

## Summary

| Category | Count |
|---|---|
| Tango figures parsed | 30 |
| Blank Timing cells | 0 |
| Blank Rhythm cells | 0 |
| Blank Position cells | 0 |
| Multi-chart pages (extra variants ignored) | 2 |
| NDCC — matches applied (auto-exact + Victor-confirmed) | 26 |
| NDCC — BG figures with no NDCC entry (null tier/number) | 4 |
| BG → NDCC name renames (priorBgName recorded) | 6 |
| Tango ↔ Waltz key collisions (documented exceptions) | 0 |
| NDCC — NDCC entries with no BG page (no rich data this run) | 3 |
| Gzipped source files (auto-handled) | 0 |

## NDCC — matches applied

- **Back Open** → tier=Silver · number=16 · *victor-override* → NDCC `Back Open`  (priorBgName: `Back Open Promenade`)
- **Basic Reverse Turn** → tier=Gold · number=23 · *auto-exact* → NDCC `Basic Reverse Turn`
- **Change Brush Tap** → tier=Silver · number=20 · *victor-override* → NDCC `Change Brush Tap`
- **The Chase** → tier=Gold · number=24 · *victor-override* → NDCC `The Chase`  (priorBgName: `Chase`)
- **Closed Promenade** → tier=Beginners · number=4 · *victor-override* → NDCC `Closed Promenade (resolves NDCC #4 truncation flag)`
- **Contra Check (Tango)** → tier=Gold · number=27 · *victor-override* → NDCC `Contra Check`  (priorBgName: `Contra Check`)  — EXCEPTION 2/2: dance-qualified key — Waltz already keys `Contra Check`; Victor-approved Option A (2026-06-14)
- **Back Corte** → tier=Pre-Bronze · number=7 · *auto-exact* → NDCC `Back Corte`
- **Fallaway Four Step** → tier=Gold · number=21 · *auto-exact* → NDCC `Fallaway Four Step`
- **Promenade Outside** → tier=Silver · number=17 · *victor-override* → NDCC `Promenade Outside`  (priorBgName: `Fallaway Promenade`)
- **Fallaway Reverse and Slip Pivot** → tier=Gold · number=25 · *victor-override* → NDCC `Fallaway Reverse & Slip Pivot`  — EXCEPTION 1/2: BG `and` kept (would collide with Waltz key `Fallaway Reverse & Slip Pivot`)
- **Five Step** → tier=Gold · number=26 · *auto-exact* → NDCC `Five Step`
- **Overturned Five Step** → tier=Gold · number=26 · *victor-override* → NDCC `Five Step`  — BG kept — Tango-Tango collision: shares NDCC #26 with Five Step
- **Four Step** → tier=Silver · number=15 · *auto-exact* → NDCC `Four Step`
- **Promenade Four Step** → tier=Silver · number=19 · *victor-override* → NDCC `Promenade Four Step`  (priorBgName: `Four Step Change`)
- **Open Promenade** → tier=Bronze · number=10 · *auto-exact* → NDCC `Open Promenade`
- **Open Reverse Turn, Lady Outside** → tier=Pre-Bronze · number=6 · *victor-override* → NDCC `Open Reverse Turn, Lady Outside`  (priorBgName: `Open Reverse Turn`)
- **Oversway** → tier=Gold · number=22 · *auto-exact* → NDCC `Oversway`
- **Progressive Link** → tier=Beginners · number=3 · *auto-exact* → NDCC `Progressive Link`
- **Promenade Link** → tier=Silver · number=14 · *auto-exact* → NDCC `Promenade Link`
- **Natural Promenade Turn** → tier=Bronze · number=13 · *auto-exact* → NDCC `Natural Promenade Turn`
- **Progressive Side Step** → tier=Beginners · number=2 · *auto-exact* → NDCC `Progressive Side Step`
- **Progressive Side Step Reverse Turn** → tier=Pre-Bronze · number=9 · *auto-exact* → NDCC `Progressive Side Step Reverse Turn`
- **Natural Twist Turn** → tier=Bronze · number=12 · *auto-exact* → NDCC `Natural Twist Turn`
- **Left Foot Walk** → tier=Beginners · number=1 · *victor-override* → NDCC `Walk`  — BG kept — Tango-Tango collision: LF/RF Walks share NDCC #1
- **Right Foot Walk** → tier=Beginners · number=1 · *victor-override* → NDCC `Walk`  — BG kept — Tango-Tango collision: LF/RF Walks share NDCC #1
- **Left Foot and Right Foot Rocks** → tier=Bronze · number=11 · *victor-override* → NDCC `Left Foot and Right Foot Rocks`

## NDCC — ballroomguide figures with no NDCC entry (null tier/number; standalone)

- **Outside Swivel**
- **Point to Promenade Position**
- **Reverse Outside Swivel**
- **Rock Turn**

## NDCC — NDCC Tango entries with no ballroomguide page (no rich data this run)

- **Promenade Rock Turn** (Beginners · #5)
- **Open Reverse Turn, Lady in Line** (Pre-Bronze · #8)
- **Swivels Fallaway** (Silver · #18)

## BG → NDCC name renames (priorBgName field set on the figure record)

- `Back Open Promenade` → `Back Open` (NDCC #16: `Back Open`)
- `Chase` → `The Chase` (NDCC #24: `The Chase`)
- `Contra Check` → `Contra Check (Tango)` (NDCC #27: `Contra Check`)
- `Fallaway Promenade` → `Promenade Outside` (NDCC #17: `Promenade Outside`)
- `Four Step Change` → `Promenade Four Step` (NDCC #19: `Promenade Four Step`)
- `Open Reverse Turn` → `Open Reverse Turn, Lady Outside` (NDCC #6: `Open Reverse Turn, Lady Outside`)

## Tango ↔ Waltz key collisions (documented exceptions)

_None._

## Multi-chart pages (extra Man/Lady variants present; only first chart parsed)

- **chase.html** — "Chase (Gold)" — 21 tables (canonical chart = T0..T3)
- **oversway.html** — "Oversway (Gold)" — 40 tables (canonical chart = T0..T3)

## Blank Timing cells in archive

_None._

## Blank Rhythm cells in archive

_None._

## Blank Position cells in archive

_None._

## Mechanical / handled

- **Tango Table B layout** differs from Waltz: 5 cols `Step_# | Timing | Rhythm | Position | Footwork` (no Rise & Fall, no Sway, NEW `Rhythm` column).
- **Rhythm field** added to step-row schema (`'S' | 'Q' | '&' | ''`), stored verbatim — '&' is NOT normalized. Waltz entries left untouched (no `rhythm` key).
- **`rise` and `sway`** emitted as `''` for every Tango step (no source columns).
- **'Moving' column** (Table A col 5): parsed and discarded, per Step 1.2 decision.
- **Gzipped files** auto-decompressed by parser: none this run.
- **No display-layer changes** this run: `App.jsx` untouched. `OPTIONAL_COLS` does NOT include `rhythm` — UI is a next-session task.
- **No Waltz modifications:** Tango appended to `FIGURES` and `FIGURE_RICH_DATA` only; no Waltz entry touched.
- **AUDIT_PRIORITY** for Tango: applied to `Chase` and `Oversway` (the two multi-chart pages) per Victor's checkpoint confirmation.
- **Tango per-step `notes` are empty by design.** Ballroomguide Tango pages don't carry per-step coaching commentary; coaching enrichment is deferred to **Step 4 (dancecentral merge)**.
- **Documented Tango↔Waltz exceptions:**
  - `Fallaway Reverse and Slip Pivot` (Tango) keeps the BG `and` spelling — would collide with Waltz `Fallaway Reverse & Slip Pivot`.
  - `Contra Check (Tango)` is a dance-qualified key (Victor-approved Option A, 2026-06-14) — NDCC name `Contra Check` preserved in `priorBgName`; Waltz `Contra Check` (#27) untouched.