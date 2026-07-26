# StudioPlanner — dancecentral Name Inventory & Candidate Alias Map

**Dances:** Waltz · Tango · Foxtrot (`slow-foxtrot/`) · Quickstep
**Purpose:** Prep for dancecentral description enrichment (Brief Step 4). Establishes an explicit,
per-figure dancecentral ↔ BG-key ↔ NDCC correspondence **before** any description text is attached.
**Date compiled:** 2026-07-25
**Last updated:** 2026-07-25 — Tango & Foxtrot regenerated against the corrected (wrap-defect-fixed) NDCC files (`38bec5d`); BG↔NDCC axis now run for all four dances.
**Applied to `data.js`:** **NOTHING.** This document is a proposal set only.

> **Standing rule #5 — every pairing below is a proposal. Victor confirms figure-by-figure.**
> Rows marked `candidate` and `dc-only` in particular carry dance-domain judgment that has
> deliberately **not** been made here.

---

## Sources read (live, at write time)

| Side | Source | Notes |
|---|---|---|
| dancecentral names | `sources/dancecentral/www.dancecentral.info/ballroom/international-style/{waltz,tango,slow-foxtrot,quickstep}/` | Names are the **printed page title** (`<h1>`), not the filename. |
| BG keys | `src/data.js` → `FIGURE_RICH_DATA['<Dance>']` object keys | Read via module import, not grep. |
| NDCC | `docs/ndcc_waltz_syllabus.json`, `docs/ndcc_tango_syllabus.json`, `docs/ndcc_foxtrot_syllabus.json`, `docs/ndcc_quickstep_syllabus.json` | **Citation rule #12** — every NDCC name/number/tier in this doc is quoted verbatim from these files at write time, never restated from memory. |

### NDCC Waltz source now exists

`docs/ndcc_waltz_syllabus.json` was extracted on 2026-07-25 (commit `6b7a4e1`, two-pass blind
method, 32 figures, status `EXTRACTED — pending Victor's confirmation`). The Waltz NDCC values in
this document are read live from that file, the same as the other three dances. The earlier
placeholder column, which reported the `syllabusNumber` stored on the BG record itself, has been
replaced by real citations.

The Waltz extraction carried the mandatory wrap check and came back clean — 32 figure numbers and
32 printed text lines, 1:1 in every tier band, no name wrapping anywhere in the column. So unlike
Tango and Foxtrot, the Waltz number→name bindings below are **not** subject to the staleness note
above.

### Mirror completeness

Every figure page linked from each dance's index page (`waltz.html`, `tango.html`,
`slow-foxtrot.html`, `quickstep.html`) is present in the local mirror — **0 linked-but-not-mirrored
pages across all four dances**. The only mirrored-but-not-in-nav pages are the routine-builder /
showcase sub-pages, which the index links to indirectly. The inventory below is complete for the
mirror **and** for the site nav as mirrored.

`?src=routine.html` duplicates (byte-identical query-string copies of the same page) are deduplicated
throughout; counts below are of distinct pages.

---

## Summary

### Bucket counts — dancecentral ↔ BG key

| Dance | DC figure pages | `exact` | `cosmetic` | `candidate` | `dc-only` | BG keys | `bg-only` |
|---|---:|---:|---:|---:|---:|---:|---:|
| Waltz | 32 | 25 | 6 | 1 | 0 | 34 | 1 |
| Tango | 29 | 22 | 4 | 1 | 2 | 30 | 2 |
| Foxtrot | 32 | 19 | 4 | 2 | 7 | 30 | 5 |
| Quickstep | 33 | 16 | 3 | 0 | 14 | 20 | 1 |
| **Total** | **126** | **82** | **17** | **4** | **23** | **114** | **9** |

Reconciliation: 82 + 17 + 4 + 23 = 126 DC figure pages. 103 matched DC rows cover 105 BG keys
(two `candidate` rows are 1-page→2-key splits — Waltz `Closed Changes`, Tango `Walk`); 105 + 9
`bg-only` = 114 BG keys. ✓

**Tango deltas vs the pre-correction run** (all driven by the wrap-defect key renames in `e7435ab`):
`exact` 18 → 22, `candidate` 3 → 1, `dc-only` 4 → 2, `bg-only` 4 → 2. The four collapsed puzzles are
enumerated in the Tango section.

### Bucket counts — BG key ↔ NDCC

All four dances are now classified on this axis. The counts below are of **NDCC entries** for
`exact` / `cosmetic` / `candidate` / `ndcc-only`, and of **BG keys** for `bg-only` (an NDCC entry
and a BG key on the same `syllabusNumber` whose names disagree substantively is one `candidate`).
Tango and Foxtrot are read from the corrected (wrap-defect-fixed) syllabus files.

| Dance | NDCC figures | `exact` | `cosmetic` | `candidate` | `ndcc-only` | `bg-only` | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Waltz | 32 | 24 | 6 | 2 | 0 | 1 | classified — see the Waltz section |
| Tango | 27 | 24 | 1 | 1 | 1 | 2 | classified — see the Tango section |
| Foxtrot | 25 | 20 | 3 | 2 | 0 | 5 | classified — see the Foxtrot section |
| Quickstep | 31 | 15 | 4 | 0 | 12 | 1 | classified — see the Quickstep section |

NDCC coverage: **Waltz 0 gaps · Tango 1 gap (#8) · Foxtrot 0 gaps · Quickstep 12 gaps.** The one
Tango `candidate` NDCC entry (#1 Walk → LF/RF Walk) covers **3** BG keys once the shared-number
variant `Overturned Five Step` (#26) is included; details in the Tango BG↔NDCC sub-section.

### Bucket definitions

| Bucket | Meaning |
|---|---|
| `exact` | DC printed title is character-identical to the BG key. |
| `cosmetic` | Differs only in punctuation, `&`/`And`, accents, case, whitespace, singular/plural, a trailing `- <Dance>` suffix, or an abbreviation pair (`PP`↔`Promenade Position`, `R`↔`Right`, `LF`↔`Left Foot`). The `Δ` column names which. Still listed for confirmation. |
| `candidate` | Any **substantive** name difference, or a cardinality mismatch (one DC page ↔ two BG keys). **Needs Victor.** |
| `dc-only` | dancecentral page with no BG key in `FIGURE_RICH_DATA`. |
| `bg-only` | BG key with no dedicated dancecentral page. |

On the BG ↔ NDCC axis the same four buckets apply, with the one-side-only buckets reading
`ndcc-only` (NDCC entry with no BG key) and `bg-only` (BG key with no NDCC entry).

### Non-figure pages (excluded from all buckets)

14 pages, listed here for inventory completeness only:

| Dance | Pages |
|---|---|
| Waltz | `waltz-technique.html` "Waltz Technique" · `waltz-choreography.html` "Waltz Choreography" · `waltz-choreography/waltz-routine-builder.html` "Waltz Routine Builder" |
| Tango | `tango-technique.html` "Tango Technique" · `tango-choreography.html` "Tango Choreography" · `tango-choreography/tango-routine-builder.html` "Tango Routine Builder" |
| Foxtrot | `technique.html` "Foxtrot Technique" · `foxtrot-choreography.html` "Foxtrot Choreography" · `foxtrot-choreography/foxtrot-routine-builder.html` "Foxtrot Routine Builder" · `foxtrot-choreography/foxtrot-showcase-routine.html` "Foxtrot Showcase Routine" |
| Quickstep | `technique.html` "Quickstep Technique" · `quickstep-choreography.html` "Quickstep Choreography" · `quickstep-choreography/quickstep-routine-builder.html` "Quickstep Routine Builder" · `quickstep-hopping-figures.html` "Quickstep Hopping Figures" |

`quickstep-hopping-figures.html` is a collection/topic page, not a single figure — classified
non-figure. Flagging in case Victor reads it as a figure page.

---

## Waltz

NDCC values are read live from `docs/ndcc_waltz_syllabus.json` (32 figures, status
`EXTRACTED — pending Victor's confirmation. Not yet audited.`), per citation rule #12.

The buckets in this section classify **dancecentral ↔ BG key**. A separate BG ↔ NDCC classification
for Waltz, using the same four buckets, follows at the end of this section.

### exact — 25

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name |
|---|---|---|---|
| Back Lock | `back-lock.html` | `Back Lock` | 15 / Bronze / "Back Lock" |
| Back Whisk | `back-whisk.html` | `Back Whisk` | 11 / Bronze / "Back Whisk" |
| Basic Weave | `basic-weave.html` | `Basic Weave` | 12 / Bronze / "Basic Weave" |
| Closed Impetus | `closed-impetus.html` | `Closed Impetus` | 7 / Pre-Bronze / "Closed Impetus" |
| Closed Telemark | `closed-telemark.html` | `Closed Telemark` | 18 / Silver / "Closed Telemark" |
| Closed Wing | `closed-wing.html` | `Closed Wing` | 28 / Gold / "Closed Wing" |
| Double Reverse Spin | `double-reverse-spin.html` | `Double Reverse Spin` | 13 / Bronze / "Double Reverse Spin" |
| Drag Hesitation | `drag-hesitation.html` | `Drag Hesitation` | 21 / Silver / "Drag Hesitation" |
| Fallaway Whisk | `fallaway-whisk.html` | `Fallaway Whisk` | 31 / Gold / "Fallaway Whisk" |
| Hesitation Change | `hesitation-change.html` | `Hesitation Change` | 8 / Pre-Bronze / "Hesitation Change" |
| Left Whisk | `left-whisk.html` | `Left Whisk` | 26 / Gold / "Left Whisk" |
| Natural Spin Turn | `waltz-natural-spin-turn.html` | `Natural Spin Turn` | 4 / Beginners / "Natural Spin Turn" |
| Natural Turn | `waltz-natural-turn.html` | `Natural Turn` | 2 / Beginners / "Natural Turn" |
| Open Impetus and Cross Hesitation | `open-impetus-and-cross-hesitation.html` | `Open Impetus and Cross Hesitation` | 22 / Silver / "Open Impetus & Cross Hesitation" |
| Open Impetus and Wing | `open-impetus-and-wing.html` | `Open Impetus and Wing` | 23 / Silver / "Open Impetus & Wing" |
| Open Telemark and Cross Hesitation | `open-telemark-and-cross-hesitation.html` | `Open Telemark and Cross Hesitation` | 19 / Silver / "Open Telemark and Cross Hesitation" |
| Open Telemark and Wing | `open-telemark-and-wing.html` | `Open Telemark and Wing` | 20 / Silver / "Open Telemark and Wing" |
| Outside Change | `outside-change.html` | `Outside Change` | 9 / Pre-Bronze / "Outside Change" |
| Outside Spin | `outside-spin.html` | `Outside Spin` | 24 / Silver / "Outside Spin" |
| Reverse Corté | `reverse-corte.html` | `Reverse Corté` | 10 / Bronze / "Reverse Corte" |
| Reverse Pivot | `reverse-pivot.html` | `Reverse Pivot` | 14 / Bronze / "Reverse Pivot" |
| Reverse Turn | `waltz-reverse-turn.html` | `Reverse Turn` | 3 / Beginners / "Reverse Turn" |
| Turning Lock | `turning-lock.html` | `Turning Lock` | 25 / Silver / "Turning Lock" |
| Turning Lock to R | `turning-lock-to-r.html` | `Turning Lock to R` | 29 / Gold / "Turning Lock to Right" |
| Whisk | `waltz-whisk.html` | `Whisk` | 5 / Beginners / "Whisk" |

### cosmetic — 6

| dancecentral printed title | file | BG key | Δ | NDCC # / tier / verbatim name |
|---|---|---|---|---|
| Chassé from Promenade Position | `chasse-from-promenade-position.html` | `Chassé from PP` | abbrev (`PP`) | 6 / Beginners / "Chassé from Promenade" |
| Contra Check - Waltz | `contra-check.html` | `Contra Check` | dance suffix | 27 / Gold / "Contra Check" |
| Fallaway Reverse And Slip Pivot | `fallaway-reverse-and-slip-pivot.html` | `Fallaway Reverse & Slip Pivot` | `And` vs `&` | 30 / Gold / "Fallaway Reverse & Slip Pivot" |
| Hover Corte | `hover-corte.html` | `Hover Corté` | accent | 32 / Gold / "Hover Corte" |
| Progressive Chassé to Right | `progressive-chasse-to-r.html` | `Progressive Chassé to R` | abbrev (`R`) | 16 / Bronze / "Progressive Chassé to Right" |
| Weave from Promenade Position | `weave-from-promenade-position.html` | `Weave from PP` | abbrev (`PP`) | 17 / Silver / "Weave from PP" |

### candidate — 1 (needs Victor)

| dancecentral printed title | file | BG key(s) | Why it needs Victor |
|---|---|---|---|
| Closed Changes | `waltz-closed-changes.html` | `Closed Change (LF)` **and** `Closed Change (RF)` | **1 page → 2 BG keys.** The page carries both figures as explicit sub-sections: h2 "Waltz RF Closed Change (Natural to Reverse)" and h2 "Waltz LF Closed Change (Reverse to Natural)". Enrichment must split the page, not attach it whole. Both BG keys hold `syllabusNumber: 1`. |

### dc-only — 0

None. Every Waltz dancecentral figure page has a BG key.

### bg-only — 1

| BG key | NDCC # / tier / verbatim name | Note |
|---|---|---|
| `Waltz Prep Step` | — (not an NDCC figure; `data.js` holds `syllabusNumber: 33` with no `syllabusBody`) | No dedicated DC page. DC covers it as an h3 section **"Waltz Preparation Step"** inside `waltz-technique.html`. Enrichment source exists but is a section, not a page. |

### Waltz — BG key ↔ NDCC classification

Same four buckets and the same rules as the dancecentral ↔ BG run above, applied to the **other**
axis: each `data.js` Waltz BG key against `docs/ndcc_waltz_syllabus.json`. Pairings are made on the
**`syllabusNumber` already stored on the BG record**; this section reports whether the *names*
agree at that number. It does **not** re-derive or propose new number bindings.

> **Every non-`exact` row below is a proposal for Victor's figure-by-figure ruling — including the
> `cosmetic` ones.** Nothing here is applied to `data.js`.

| Bucket | Count | NDCC entries | BG keys |
|---|---:|---:|---:|
| `exact` | 24 | 24 | 24 |
| `cosmetic` | 6 | 6 | 6 |
| `candidate` | 2 | 2 | 3 |
| `ndcc-only` (no BG key) | 0 | 0 | — |
| `bg-only` (no NDCC entry) | 1 | — | 1 |
| **Total** | | **32** | **34** |

All 32 NDCC Waltz numbers are claimed by a BG key — **0 NDCC coverage gaps for Waltz.**
BG reconciliation: 24 + 6 + 3 (the `candidate` bucket covers 3 keys, one row being a 1→2 split) + 1
`bg-only` = 34. ✓

#### exact — 24

`#2 Natural Turn` · `#3 Reverse Turn` · `#4 Natural Spin Turn` · `#5 Whisk` · `#7 Closed Impetus` ·
`#8 Hesitation Change` · `#9 Outside Change` · `#11 Back Whisk` · `#12 Basic Weave` ·
`#13 Double Reverse Spin` · `#14 Reverse Pivot` · `#15 Back Lock` · `#17 Weave from PP` ·
`#18 Closed Telemark` · `#19 Open Telemark and Cross Hesitation` · `#20 Open Telemark and Wing` ·
`#21 Drag Hesitation` · `#24 Outside Spin` · `#25 Turning Lock` · `#26 Left Whisk` ·
`#27 Contra Check` · `#28 Closed Wing` · `#30 Fallaway Reverse & Slip Pivot` · `#31 Fallaway Whisk`

BG key string is character-identical to the NDCC `ndccName` at that number.

#### cosmetic — 6

| # / tier | BG key | NDCC verbatim name | Δ |
|---|---|---|---|
| 10 / Bronze | `Reverse Corté` | "Reverse Corte" | accent — NDCC prints no acute on `Corte` |
| 16 / Bronze | `Progressive Chassé to R` | "Progressive Chassé to Right" | abbrev (`R` ↔ `Right`) |
| 22 / Silver | `Open Impetus and Cross Hesitation` | "Open Impetus & Cross Hesitation" | `and` vs `&` |
| 23 / Silver | `Open Impetus and Wing` | "Open Impetus & Wing" | `and` vs `&` |
| 29 / Gold | `Turning Lock to R` | "Turning Lock to Right" | abbrev (`R` ↔ `Right`) |
| 32 / Gold | `Hover Corté` | "Hover Corte" | accent — NDCC prints no acute on `Corte` |

#### candidate — 2 (needs Victor)

| # / tier | BG key(s) | NDCC verbatim name | Why it needs Victor |
|---|---|---|---|
| 1 / Beginners | `Closed Change (LF)` **and** `Closed Change (RF)` | "Closed Changes" | **1 NDCC entry → 2 BG keys**, plus a singular/plural difference. Both BG keys already hold `syllabusNumber: 1`. Mirrors the dancecentral-side split at `waltz-closed-changes.html`. |
| 6 / Beginners | `Chassé from PP` | "Chassé from Promenade" | **Substantive.** NDCC prints "Promenade", **not** "Promenade Position" — the wrap check confirms there is no continuation line, so `PP` is not an abbreviation of what NDCC actually prints. dancecentral prints the third variant, "Chassé from Promenade Position". Three sources, three names. |

#### ndcc-only — 0

Every NDCC Waltz number 1–32 is claimed by a BG key.

#### bg-only — 1

| BG key | Note |
|---|---|
| `Waltz Prep Step` | Not an NDCC figure. `data.js` holds `syllabusNumber: 33` with **no** `syllabusBody`, i.e. it was never asserted to be NDCC — and NDCC Waltz stops at 32. Consistent, not a conflict. |

#### Relation to the five flagged divergences

The extraction commit (`6b7a4e1`) flagged five verbatim divergences between NDCC and existing
`data.js` Waltz keys. All five appear above: **Chassé from Promenade** (`candidate` #6), **the two
`Corte` accents** (`cosmetic` #10, #32), **`and`/`&`** (`cosmetic` #22, #23), and **Turning Lock to
R** (`cosmetic` #29).

**One further divergence of the same class was found during this classification and was not in that
list of five: `#16 Progressive Chassé to R` vs NDCC "Progressive Chassé to Right"** — the identical
`R` ↔ `Right` abbreviation as #29. So the count is **six**, not five. Flagging explicitly so the
figure-by-figure ruling covers it.

Note also that the source is internally inconsistent on `and`/`&` within the Silver band: NDCC #19
and #20 print the word "and" (and match the BG keys exactly), while #22 and #23 print "&". The BG
store uses "and" throughout. Whether to follow the source's inconsistency or normalise is Victor's
call.

### Waltz notes

- `Fallaway Whisk` is the only Waltz BG record whose `sources` is `['dancecentral']` rather than
  `['ballroomguide']` — worth noting since re-enrichment may double up on an already-DC-sourced record.
- Three DC pages carry variant sub-sections that have no BG key and are not counted as separate
  figures here: `back-whisk.html` → "Waltz Back Whisk - Turning to R"; `left-whisk.html` →
  "Alternative Alignment…" and "Variation: Left Whisk on Count 1 with Contra Check";
  `waltz-whisk.html` → three ending-alignment variants; `hover-corte.html` → "Dance with extra bar
  of music". Flagging as content that enrichment would pull in wholesale unless scoped.

---

## Tango

NDCC values quoted verbatim from `docs/ndcc_tango_syllabus.json` (27 figures, status
`EXTRACTED — pending Victor's confirmation. Not yet audited.`), **regenerated against the
corrected file** after the wrap-defect binding fix (`38bec5d`) and the BG-key renames (`e7435ab`).

**Four puzzles collapsed as predicted** by the pre-correction wrap note. The three renamed BG keys
plus the un-renamed `Change Brush Tap → Brush Tap` reconnected DC pages that had been stranded:
`Back Open Promenade` (was `candidate` vs BG `Back Open`) and `Brush Tap` (was `candidate` vs BG
`Change Brush Tap`) are now **exact**; `Fallaway Promenade` and `Four Step Change` (both `dc-only`,
no BG key) are now **exact** against the renamed keys; and the two `bg-only` strays
(`Promenade Outside`, `Promenade Four Step`) are gone.

### exact — 22

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name |
|---|---|---|---|
| Back Corte | `back-corte.html` | `Back Corte` | 7 / Pre-Bronze / "Back Corte" |
| Back Open Promenade | `back-open-promenade.html` | `Back Open Promenade` | 16 / Silver / "Back Open Promenade" |
| Basic Reverse Turn | `basic-reverse-turn.html` | `Basic Reverse Turn` | 23 / Gold / "Basic Reverse Turn" |
| Brush Tap | `brush-tap.html` | `Brush Tap` | 20 / Silver / "Brush Tap" |
| Closed Promenade | `closed-promenade.html` | `Closed Promenade` | 4 / Beginners / "Closed Promenade" |
| Fallaway Promenade | `fallaway-promenade.html` | `Fallaway Promenade` | 18 / Silver / "Fallaway Promenade" |
| Five Step | `five-step.html` | `Five Step` | 26 / Gold / "Five Step" |
| Four Step | `four-step.html` | `Four Step` | 15 / Silver / "Four Step" |
| Four Step Change | `four-step-change.html` | `Four Step Change` | 19 / Silver / "Four Step Change" |
| Natural Promenade Turn | `natural-promenade-turn.html` | `Natural Promenade Turn` | 13 / Bronze / "Natural Promenade Turn" |
| Natural Twist Turn | `natural-twist-turn.html` | `Natural Twist Turn` | 12 / Bronze / "Natural Twist Turn" |
| Open Promenade | `open-promenade.html` | `Open Promenade` | 10 / Bronze / "Open Promenade" |
| Open Reverse Turn, Lady Outside | `open-reverse-turn-lady-outside.html` | `Open Reverse Turn, Lady Outside` | 6 / Pre-Bronze / "Open Reverse Turn, Lady Outside" |
| Outside Swivel | `outside-swivel.html` | `Outside Swivel` | 17 / Silver / "Outside Swivels" (NDCC prints the plural — see BG↔NDCC `cosmetic`) |
| Oversway | `oversway.html` | `Oversway` | 22 / Gold / "Oversway" |
| Progressive Link | `progressive-link.html` | `Progressive Link` | 3 / Beginners / "Progressive Link" |
| Progressive Side Step | `progressive-side-step.html` | `Progressive Side Step` | 2 / Beginners / "Progressive Side Step" |
| Progressive Side Step Reverse Turn | `progressive-side-step-reverse-turn.html` | `Progressive Side Step Reverse Turn` | 9 / Pre-Bronze / "Progressive Side Step Reverse Turn" |
| Promenade Link | `promenade-link.html` | `Promenade Link` | 14 / Silver / "Promenade Link" |
| Reverse Outside Swivel | `reverse-outside-swivel.html` | `Reverse Outside Swivel` | — (BG record is null-tier) |
| Rock Turn | `rock-turn.html` | `Rock Turn` | 5 / Beginners / "Rock Turn" |
| The Chase | `the-chase.html` | `The Chase` | 24 / Gold / "The Chase" |

### cosmetic — 4

| dancecentral printed title | file | BG key | Δ | NDCC # / tier / verbatim name |
|---|---|---|---|---|
| Contra Check - Tango | `contra-check.html` | `Contra Check` | dance suffix | 27 / Gold / "Contra Check" |
| Fallaway Fourstep | `fallaway-fourstep.html` | `Fallaway Four Step` | spacing | 21 / Gold / "Fallaway Four Step" |
| Fallaway Reverse and Slip Pivot | `fallaway-reverse-and-slip-pivot.html` | `Fallaway Reverse & Slip Pivot` | `and` vs `&` | 25 / Gold / "Fallaway Reverse & Slip Pivot" |
| LF and RF Rocks | `lf-and-rf-rocks.html` | `Left Foot and Right Foot Rocks` | abbrev (`LF`/`RF`) | 11 / Bronze / "Left Foot and Right Foot Rocks" |

### candidate — 1 (needs Victor)

| dancecentral printed title | file | BG key(s) | NDCC # / verbatim name | Why it needs Victor |
|---|---|---|---|---|
| Walk | `walk.html` | `Left Foot Walk` **and** `Right Foot Walk` | 1 / Beginners / "Walk" | **1 page → 2 BG keys.** Unlike the Waltz Closed Changes page, the DC Walk page does **not** sub-split LF/RF — it has a single "Tango Walk" section. Enrichment cannot mechanically split it. Both BG keys hold `syllabusNumber: 1`. |

### dc-only — 2

| dancecentral printed title | file | Overlaps an NDCC entry? |
|---|---|---|
| Open/Closed Finish | `open-finish.html` | No NDCC entry. Page carries **two** figures as sub-sections: h2 "Closed Finish" and h2 "Open Finish". |
| Open Reverse Turn, Lady Inline | `open-reverse-turn-lady-inside.html` | **Yes** — NDCC **#8 / Pre-Bronze / "Open Reverse Turn, Lady in Line"**, the sole NDCC entry with no BG key. Note DC prints "Inline", NDCC prints "in Line". |

### bg-only — 2

| BG key | NDCC # / tier / verbatim name | Note |
|---|---|---|
| `Overturned Five Step` | 26 / Gold (shares #26 with `Five Step`) | No DC page. Intentional shared-number variant. |
| `Point to Promenade Position` | — (null-tier) | No DC page. |

### NDCC Tango numbers with no BG key

**1 gap:** #8 "Open Reverse Turn, Lady in Line". (The former #5 and #18 gaps closed: #5 "Rock Turn"
and #18 "Fallaway Promenade" are now claimed by BG keys of the same name.)

### Tango — BG key ↔ NDCC classification

Same four buckets and rules as the Waltz run: each `data.js` Tango BG key against the corrected
`docs/ndcc_tango_syllabus.json`, paired on the **`syllabusNumber` already stored on the BG record**.
Reports whether the *names* agree at that number; does **not** re-derive number bindings.

> **Every non-`exact` row below is a proposal for Victor's figure-by-figure ruling.** Nothing applied.

| Bucket | Count | NDCC entries | BG keys |
|---|---:|---:|---:|
| `exact` | 24 | 24 | 24 |
| `cosmetic` | 1 | 1 | 1 |
| `candidate` | 2 rows | 1 (#1) + #26 shared | 3 |
| `ndcc-only` (no BG key) | 1 | 1 | — |
| `bg-only` (no NDCC entry) | 2 | — | 2 |
| **Total** | | **27** | **30** |

26 of 27 NDCC Tango numbers are claimed (**1 gap: #8**). BG reconciliation: 24 + 1 + 3 + 2 = 30. ✓
The `candidate` bucket's #26 row is the extra `Overturned Five Step` key sharing a number whose base
figure (`Five Step`) is itself `exact`; it adds a BG key, not an NDCC entry.

#### exact — 24

`#2 Progressive Side Step` · `#3 Progressive Link` · `#4 Closed Promenade` · `#5 Rock Turn` ·
`#6 Open Reverse Turn, Lady Outside` · `#7 Back Corte` · `#9 Progressive Side Step Reverse Turn` ·
`#10 Open Promenade` · `#11 Left Foot and Right Foot Rocks` · `#12 Natural Twist Turn` ·
`#13 Natural Promenade Turn` · `#14 Promenade Link` · `#15 Four Step` · `#16 Back Open Promenade` ·
`#18 Fallaway Promenade` · `#19 Four Step Change` · `#20 Brush Tap` · `#21 Fallaway Four Step` ·
`#22 Oversway` · `#23 Basic Reverse Turn` · `#24 The Chase` · `#25 Fallaway Reverse & Slip Pivot` ·
`#26 Five Step` · `#27 Contra Check`

BG key string is character-identical to the NDCC `ndccName` at that number. Note `#4`, `#5`, `#16`,
`#18`, `#19`, `#20` are exact **only after** the wrap-defect correction — before it they were the
corrupted strings.

#### cosmetic — 1

| # / tier | BG key | NDCC verbatim name | Δ |
|---|---|---|---|
| 17 / Silver | `Outside Swivel` | "Outside Swivels" | singular/plural — NDCC prints the plural. A looser call than punctuation; flagged. |

#### candidate — 2 (needs Victor)

| # / tier | BG key(s) | NDCC verbatim name | Why it needs Victor |
|---|---|---|---|
| 1 / Beginners | `Left Foot Walk` **and** `Right Foot Walk` | "Walk" | **1 NDCC entry → 2 BG keys.** Both already hold `syllabusNumber: 1`. Mirrors the DC-side `Walk` split. |
| 26 / Gold | `Overturned Five Step` (base `Five Step` is `exact`) | "Five Step" | **Shared-number variant.** `Five Step` matches "Five Step" exactly; `Overturned Five Step` is the overturned variant carrying the same #26. Enrichment/tiering ruling is Victor's. |

#### ndcc-only — 1

| # / tier | NDCC verbatim name | Note |
|---|---|---|
| 8 / Pre-Bronze | "Open Reverse Turn, Lady in Line" | No BG key. A dancecentral page exists ("Open Reverse Turn, Lady Inline" — see DC `dc-only`). |

#### bg-only — 2

| BG key | Note |
|---|---|
| `Point to Promenade Position` | Not an NDCC figure. `data.js` holds `syllabusNumber: null`. |
| `Reverse Outside Swivel` | Not an NDCC figure. `data.js` holds `syllabusNumber: null`. |

### Tango notes

- `outside-swivel.html` carries three method sub-sections ("Outside Swivel Method 1", "Method 2",
  "Reverse Outside Swivel Method"), and `reverse-outside-swivel.html` repeats two of them. The two
  BG keys `Outside Swivel` and `Reverse Outside Swivel` therefore have **overlapping** DC source
  content. Enrichment needs a rule for which page owns which method.
- `oversway.html` also carries "Drop Oversway" (no BG key).

---

## Foxtrot (`slow-foxtrot/`)

Directory alias `slow-foxtrot/` → dance `Foxtrot`, already logged in the Step 4 alias map.
NDCC values quoted verbatim from `docs/ndcc_foxtrot_syllabus.json` (25 figures, status
`EXTRACTED — pending Victor's confirmation. Not yet audited.`).

### exact — 19

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name |
|---|---|---|---|
| Basic Weave | `basic-weave.html` | `Basic Weave` | 8 / Bronze / "Basic Weave" |
| Bounce Fallaway with Weave Ending | `bounce-fallaway-with-weave-ending.html` | `Bounce Fallaway with Weave Ending` | 25 / Gold / "Bounce Fallaway with Weave Ending" |
| Change of Direction | `change-of-direction.html` | `Change of Direction` | 7 / Bronze / "Change of Direction" |
| Closed Telemark | `closedtelemark.html` | `Closed Telemark` | 9 / Silver / "Closed Telemark" |
| Curved Feather to Back Feather | `curved-feather-to-back-feather.html` | `Curved Feather to Back Feather` | 21 / Gold / "Curved Feather to Back Feather" |
| Feather Step | `feather-step.html` | `Feather Step` | 1 / Pre-Bronze / "Feather Step" |
| Hover Cross | `hover-cross.html` | `Hover Cross` | 15 / Silver / "Hover Cross" |
| Hover Feather | `hover-feather.html` | `Hover Feather` | 12 / Silver / "Hover Feather" |
| Hover Telemark | `hover-telemark.html` | `Hover Telemark` | 13 / Silver / "Hover Telemark" |
| Natural Hover Telemark | `natural-hover-telemark.html` | `Natural Hover Telemark` | 24 / Gold / "Natural Hover Telemark" |
| Natural Telemark | `natural-telemark.html` | `Natural Telemark` | 14 / Silver / "Natural Telemark" |
| Natural Turn | `natural-turn.html` | `Natural Turn` | 3 / Pre-Bronze / "Natural Turn" |
| Natural Twist Turn | `natural-twist-turn.html` | `Natural Twist Turn` | 20 / Gold / "Natural Twist Turn" |
| Natural Weave | `natural-weave.html` | `Natural Weave` | 6 / Bronze / "Natural Weave" |
| Natural Zig-Zag from PP | `natural-zig-zag-from-pp.html` | `Natural Zig-Zag from PP` | 22 / Gold / "Natural Zig-Zag from PP" |
| Open Impetus | `open-impetus.html` | `Open Impetus` | 17 / Silver / "Open Impetus" |
| Reverse Wave | `reverse-wave.html` | `Reverse Wave` | 19 / Silver / "Reverse Wave" |
| Three Step | `three-step.html` | `Three Step` | 2 / Pre-Bronze / "Three Step" |
| Top Spin | `top-spin.html` | `Top Spin` | 11 / Silver / "Top Spin" |

The former `⚠wrap` markers on #11–#15 are **resolved**: the NDCC strings are now the corrected,
Victor-ruled names (`38bec5d`), and #13/#14 hold the Telemark bindings in corrected order
(#13 Hover Telemark, #14 Natural Telemark). Every DC↔BG pairing here was exact throughout;
only the NDCC citation changed.

### cosmetic — 4

| dancecentral printed title | file | BG key | Δ | NDCC # / tier / verbatim name |
|---|---|---|---|---|
| Closed Impetus And Feather Finish | `closed-impetus.html` | `Closed Impetus & Feather Finish` | `And` vs `&` | 5 / Pre-Bronze / "Closed Impetus and Feather Finish" |
| Fallaway Reverse and Slip Pivot | `fallaway-reverse-and-slip-pivot.html` | `Fallaway Reverse & Slip Pivot` | `and` vs `&` | 23 / Gold / "Fallaway Reverse and Slip Pivot" |
| Open Telemark and Feather Ending | `open-telemark-and-feather-ending.html` | `Open Telemark & Feather Ending` | `and` vs `&` | 10 / Silver / "Open Telemark and Feather Ending" |
| Weave From PP | `weave-from-pp.html` | `Weave from PP` | case (`From`/`from`) | 18 / Silver / "Weave from PP" |

### candidate — 2 (needs Victor)

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name | Why it needs Victor |
|---|---|---|---|---|
| Open Telemark, Natural Turn to Outside Swivel and Feather Ending | `open-telemark-natural-turn-to-outside-swivel-and-feather-ending.html` | `Outside Swivel` | 16 / Silver / "Open Telemark Outside Swivel and Feather Ending" | **The verified reference case from the brief.** Substantive: BG key names only the swivel; DC and NDCC name the whole grouped figure. Confirms the divergence pattern this doc exists to enumerate. |
| Reverse Turn | `reverse-turn.html` | `Reverse Turn & Feather Finish` | 4 / Pre-Bronze / "Reverse Turn ( incl. Feather Finish )" | Substantive: DC names the bare figure, BG and NDCC both bind the Feather Finish into the name. Note the source JSON flags "Feather Finish" as **not** a standalone numbered Foxtrot figure. |

### dc-only — 7

| dancecentral printed title | file | Overlaps an NDCC entry? |
|---|---|---|
| Curved Feather from Promenade Position | `curved-feather-from-promenade-position.html` | No. Not in the NDCC Foxtrot column. |
| Foxtrot Curved Three Step (*) | `curved-three-step.html` | No. Not in the NDCC Foxtrot column. |
| Hover Telemark to PP | `hover-telemark-to-pp.html` | No. Not in the NDCC Foxtrot column. |
| Quick Natural Weave | `quick-natural-weave.html` | No. Not in the NDCC Foxtrot column. |
| Quick Open Reverse | `quick-open-reverse.html` | No **Foxtrot** NDCC entry. A figure of this exact name exists in the NDCC **Quickstep** column (#21 / Silver) — different dance, noted only to prevent a cross-dance mis-key. |
| Reverse Pivot | `reverse-pivot.html` | No. Not in the NDCC Foxtrot column. BG Foxtrot has no `Reverse Pivot` key (BG Waltz and BG Quickstep both do). |
| Tumble Turn | `tumble-turn.html` | No. Not in the NDCC Foxtrot column. |

**`curved-three-step.html` page-title anomaly:** this is the **only** page across all four dances
with **no `<h1>` at all**. Its printed heading is an `<h2>` reading **"Foxtrot Curved Three Step (*)"**,
while its `<title>` reads "Dance Central - Curved Three Step". The `(*)` marker is used elsewhere on
dancecentral for closed/restricted material (e.g. "Waltz Closed Gold Routine (*)", "Foxtrot Gold
Routine #2 (*)"). Flagging: the canonical printed name for this page is ambiguous, and any
title-extraction script that assumes an `<h1>` will silently drop it.

### bg-only — 5

| BG key | NDCC # / tier | Note |
|---|---|---|
| `Natural Twist Turn with Closed Impetus & Feather Finish Ending` | — (null-tier) | No dedicated DC page, **but** DC covers it as an h2 sub-section of `natural-twist-turn.html`: "Natural Twist Turn with Closed Impetus And Feather Finish Ending" (`And` vs `&`). |
| `Natural Twist Turn with Open Impetus Ending` | — (null-tier) | Same: h2 sub-section "Natural Twist Turn with Open Impetus Ending" on `natural-twist-turn.html`. Exact string match. |
| `Natural Twist Turn with Weave Ending` | — (null-tier) | Same page carries h2 "Natural Twist Turn with **Natural** Weave Ending" — substantive word difference, **needs Victor**. That page also carries a fourth variant, "Natural Twist Turn with Hover Feather Ending", with **no** BG key. |
| `Open Natural Turn` | — (null-tier) | No DC page and no DC sub-section found. |
| `Foxtrot Prep Step` | — (null-tier) | No dedicated DC page. DC covers it as an h2 section **"Foxtrot Preparation Step"** inside `technique.html`. |

### NDCC Foxtrot numbers with no BG key

**0 gaps.** All 25 NDCC Foxtrot numbers (1–25) are claimed by a BG key. The Foxtrot column also has
**no Beginners figures** (blank cell in the source; numbering starts at 1 in Pre-Bronze), per the
source JSON's `_provenance.notes`.

### Foxtrot — BG key ↔ NDCC classification

Each `data.js` Foxtrot BG key against the corrected `docs/ndcc_foxtrot_syllabus.json`, paired on the
stored `syllabusNumber`; reports name agreement only.

> **Every non-`exact` row below is a proposal for Victor's figure-by-figure ruling.** Nothing applied.

| Bucket | Count | NDCC entries | BG keys |
|---|---:|---:|---:|
| `exact` | 20 | 20 | 20 |
| `cosmetic` | 3 | 3 | 3 |
| `candidate` | 2 | 2 | 2 |
| `ndcc-only` (no BG key) | 0 | 0 | — |
| `bg-only` (no NDCC entry) | 5 | — | 5 |
| **Total** | | **25** | **30** |

All 25 NDCC Foxtrot numbers are claimed (**0 gaps**). BG reconciliation: 20 + 3 + 2 + 5 = 30. ✓

#### exact — 20

`#1 Feather Step` · `#2 Three Step` · `#3 Natural Turn` · `#6 Natural Weave` ·
`#7 Change of Direction` · `#8 Basic Weave` · `#9 Closed Telemark` · `#11 Top Spin` ·
`#12 Hover Feather` · `#13 Hover Telemark` · `#14 Natural Telemark` · `#15 Hover Cross` ·
`#17 Open Impetus` · `#18 Weave from PP` · `#19 Reverse Wave` · `#20 Natural Twist Turn` ·
`#21 Curved Feather to Back Feather` · `#22 Natural Zig-Zag from PP` · `#24 Natural Hover Telemark` ·
`#25 Bounce Fallaway with Weave Ending`

`#11–#15` are exact **only after** the wrap-defect correction — before it the NDCC strings were the
corrupted "Top Spin Hover / Feather Hover / Telemark Natural / Telemark Hover / Cross".

#### cosmetic — 3

| # / tier | BG key | NDCC verbatim name | Δ |
|---|---|---|---|
| 5 / Pre-Bronze | `Closed Impetus & Feather Finish` | "Closed Impetus and Feather Finish" | `&` vs `and` |
| 10 / Silver | `Open Telemark & Feather Ending` | "Open Telemark and Feather Ending" | `&` vs `and` |
| 23 / Gold | `Fallaway Reverse & Slip Pivot` | "Fallaway Reverse and Slip Pivot" | `&` vs `and` |

#### candidate — 2 (needs Victor)

| # / tier | BG key | NDCC verbatim name | Why it needs Victor |
|---|---|---|---|
| 4 / Pre-Bronze | `Reverse Turn & Feather Finish` | "Reverse Turn ( incl. Feather Finish )" | Substantive: NDCC binds the Feather Finish in a parenthetical; BG conjoins with `&`. Source JSON flags "Feather Finish" as **not** a standalone numbered figure. |
| 16 / Silver | `Outside Swivel` | "Open Telemark Outside Swivel and Feather Ending" | Substantive: BG key names only the swivel; NDCC names the whole grouped figure. The verified reference case from the brief; also a `candidate` on the DC↔BG axis. |

#### ndcc-only — 0

Every NDCC Foxtrot number 1–25 is claimed by a BG key.

#### bg-only — 5

| BG key | Note |
|---|---|
| `Open Natural Turn` | Not an NDCC figure (`syllabusNumber: null`). Component of the #16 grouped figure. |
| `Foxtrot Prep Step` | Not an NDCC figure (`syllabusNumber: null`). |
| `Natural Twist Turn with Closed Impetus & Feather Finish Ending` | Not an NDCC figure (`syllabusNumber: null`). Twist-ending variant. |
| `Natural Twist Turn with Open Impetus Ending` | Not an NDCC figure (`syllabusNumber: null`). Twist-ending variant. |
| `Natural Twist Turn with Weave Ending` | Not an NDCC figure (`syllabusNumber: null`). Twist-ending variant. |

---

## Quickstep

NDCC values quoted verbatim from `docs/ndcc_quickstep_syllabus.json` (31 figures, two-pass blind
verification, status `EXTRACTED — pending Victor's confirmation. Not yet audited.`).

### exact — 16

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name |
|---|---|---|---|
| Back Lock | `back-lock.html` | `Back Lock` | 11 / Pre-Bronze / "Back Lock" |
| Change of Direction | `change-of-direction.html` | `Change of Direction` | 18 / Bronze / "Change of Direction" |
| Chasse Reverse Turn | `chasse-reverse-turn.html` | `Chasse Reverse Turn` | 9 / Pre-Bronze / "Chassé Reverse Turn" |
| Closed Impetus | `closed-impetus.html` | `Closed Impetus` | 10 / Pre-Bronze / "Closed Impetus" |
| Closed Telemark | `closed-telemark.html` | `Closed Telemark` | 26 / Silver / "Closed Telemark" |
| Cross Chasse | `cross-chasse.html` | `Cross Chasse` | 17 / Bronze / "Cross Chassé" |
| Fishtail | `fishtail.html` | `Fishtail` | 22 / Silver / "Fishtail" |
| Forward Lock | `forward-lock.html` | `Forward Lock` | 4 / Beginners / "Forward Lock" |
| Natural Pivot Turn | `natural-pivot-turn.html` | `Natural Pivot Turn` | 7 / Pre-Bronze / "Natural Pivot Turn" |
| Natural Spin Turn | `natural-spin-turn.html` | `Natural Spin Turn` | 5 / Beginners / "Natural Spin Turn" |
| Quarter Turn to Right | `quarter-turn-to-right.html` | `Quarter Turn to Right` | 1 / Beginners / "Quarter Turn to Right" |
| Reverse Pivot | `reverse-pivot.html` | `Reverse Pivot` | 12 / Pre-Bronze / "Reverse Pivot" |
| Running Finish | `running-finish.html` | `Running Finish` | 15 / Bronze / "Running Finish" |
| Running Right Turn | `running-right-turn.html` | `Running Right Turn` | 23 / Silver / "Running Right Turn" |
| Six Quick Run | `six-quick-run.html` | `Six Quick Run` | 28 / Gold / "Six Quick Run" |
| V6 | `v6.html` | `V6` | 25 / Silver / "V6" |

Note: `Chasse Reverse Turn` and `Cross Chasse` are DC↔BG **exact**; the NDCC side spells `Chassé`
with the accent. That is an NDCC-side cosmetic difference, not a DC↔BG one.

### cosmetic — 3

| dancecentral printed title | file | BG key | Δ | NDCC # / tier / verbatim name |
|---|---|---|---|---|
| Progressive Chassé to Right | `progressive-chasse-to-r.html` | `Progressive Chasse to Right` | accent | 13 / Pre-Bronze / "Progressive Chassé to Right" |
| Tipple Chasse To Right | `tipple-chasse-to-r.html` | `Tipple Chasse to Right` | case (`To`/`to`) | 14 / Bronze / "Tipple Chassé to Right" |
| Tipsy to Right and Left | `tipsy-to-right-and-left.html` | `Tipsy to Right & Left` | `and` vs `&` | 30 / Gold / "Tipsy to Right & Left" |

### candidate — 0

No Quickstep DC page differs substantively from a BG key it pairs with.

### dc-only — 14

| dancecentral printed title | file | Overlaps an NDCC entry? |
|---|---|---|
| Cross Swivel | `cross-swivel.html` | **Yes — NDCC gap #27 / Gold / "Cross Swivel"** |
| Double Reverse Spin | `double-reverse-spin.html` | **Yes — NDCC gap #20 / Bronze / "Double Reverse Spin"** |
| Four Quick Run | `four-quick-run.html` | **Yes — NDCC gap #24 / Silver / "Four Quick Run"** |
| Heel Pivot (Quarter Turn To Left) | `heel-pivot-quarter-turn-to-left.html` | **Yes — NDCC gap #2 / Beginners / "Heel Pivot ( Quarter Turn to Left )"** |
| Hover Corte | `hover-corte.html` | **Yes — NDCC gap #31 / Gold / "Hover Corte"** |
| Natural Turn | `natural-turn.html` | **Yes — NDCC gap #6 / Pre-Bronze / "Natural Turn"** |
| Natural Turn and Back Lock | `natural-turn-and-back-lock.html` | **Yes — NDCC gap #19 / Bronze / "Natural Turn and Back Lock"** |
| Natural Turn with Hesitation | `natural-turn-with-hesitation.html` | **Yes — NDCC gap #8 / Pre-Bronze / "Natural Turn with Hesitation"** |
| Progressive Chasse | `progressive-chasse.html` | **Yes — NDCC gap #3 / Beginners / "Progressive Chassé"** |
| Quick Open Reverse | `quick-open-reverse.html` | **Yes — NDCC gap #21 / Silver / "Quick Open Reverse"** |
| Rumba Cross | `rumba-cross.html` | **Yes — NDCC gap #29 / Gold / "Rumba Cross"** |
| Zig-Zag, Back Lock And Running Finish | `zig-zag-back-lock-and-running-finish.html` | **Yes — NDCC gap #16 / Bronze / "Zig-Zag Back Lock & Running Finish"** (DC adds a comma, `And` vs `&`) |
| Passing Natural Turn | `passing-natural-turn.html` | No NDCC entry. |
| Running Spin Turn | `running-spin-turn.html` | No NDCC entry. |

### bg-only — 1

| BG key | NDCC # / tier | Note |
|---|---|---|
| `Quickstep Prep Step` | — (null-tier) | No dedicated DC page, and **no** prep-step section found on `technique.html` (unlike Waltz and Foxtrot, whose technique pages both carry one). |

### NDCC Quickstep numbers with no BG key

**12 gaps** — the known figure: #2, #3, #6, #8, #16, #19, #20, #21, #24, #27, #29, #31.

### Quickstep — BG key ↔ NDCC classification

Each `data.js` Quickstep BG key against `docs/ndcc_quickstep_syllabus.json` (current — no wrap
defect), paired on the stored `syllabusNumber`; reports name agreement only. This axis had not
previously been run for Quickstep.

> **Every non-`exact` row below is a proposal for Victor's figure-by-figure ruling.** Nothing applied.

| Bucket | Count | NDCC entries | BG keys |
|---|---:|---:|---:|
| `exact` | 15 | 15 | 15 |
| `cosmetic` | 4 | 4 | 4 |
| `candidate` | 0 | 0 | 0 |
| `ndcc-only` (no BG key) | 12 | 12 | — |
| `bg-only` (no NDCC entry) | 1 | — | 1 |
| **Total** | | **31** | **20** |

19 of 31 NDCC Quickstep numbers are claimed (**12 gaps** — same 12 listed above). BG reconciliation:
15 + 4 + 0 + 1 = 20. ✓ Quickstep is the only dance where NDCC substantially out-covers the BG store.

#### exact — 15

`#1 Quarter Turn to Right` · `#4 Forward Lock` · `#5 Natural Spin Turn` · `#7 Natural Pivot Turn` ·
`#10 Closed Impetus` · `#11 Back Lock` · `#12 Reverse Pivot` · `#15 Running Finish` ·
`#18 Change of Direction` · `#22 Fishtail` · `#23 Running Right Turn` · `#25 V6` ·
`#26 Closed Telemark` · `#28 Six Quick Run` · `#30 Tipsy to Right & Left`

#### cosmetic — 4

| # / tier | BG key | NDCC verbatim name | Δ |
|---|---|---|---|
| 9 / Pre-Bronze | `Chasse Reverse Turn` | "Chassé Reverse Turn" | accent (`Chassé`) |
| 13 / Pre-Bronze | `Progressive Chasse to Right` | "Progressive Chassé to Right" | accent (`Chassé`) |
| 14 / Bronze | `Tipple Chasse to Right` | "Tipple Chassé to Right" | accent (`Chassé`) |
| 17 / Bronze | `Cross Chasse` | "Cross Chassé" | accent (`Chassé`) |

All four are the same `Chassé`-accent difference; the BG store drops the acute throughout.

#### candidate — 0

No Quickstep BG key differs substantively from the NDCC name at its number.

#### ndcc-only — 12

`#2 Heel Pivot ( Quarter Turn to Left )` · `#3 Progressive Chassé` · `#6 Natural Turn` ·
`#8 Natural Turn with Hesitation` · `#16 Zig-Zag Back Lock & Running Finish` ·
`#19 Natural Turn and Back Lock` · `#20 Double Reverse Spin` · `#21 Quick Open Reverse` ·
`#24 Four Quick Run` · `#27 Cross Swivel` · `#29 Rumba Cross` · `#31 Hover Corte`

All 12 have a dedicated dancecentral page (see the DC↔BG `dc-only` bucket and the coverage-gap
overlap section) — they are the known Quickstep coverage gaps, not new findings.

#### bg-only — 1

| BG key | Note |
|---|---|
| `Quickstep Prep Step` | Not an NDCC figure (`syllabusNumber: null`). |

---

## NDCC coverage-gap overlap with dancecentral-only pages

Recorded as evidence for the deferred prose-as-structural-fallback decision (D-3-class).
**No recommendation is made here.**

| Dance | NDCC gaps (numbers with no BG key) | Gaps covered by a `dc-only` page | Gaps with no DC page | `dc-only` pages outside NDCC |
|---|---:|---:|---:|---:|
| Waltz | **0** | 0 | 0 | 0 |
| Tango | **1** (#8) | **1** (#8 ← "Open Reverse Turn, Lady Inline") | 0 | 1 |
| Foxtrot | **0** | 0 | 0 | **7** |
| Quickstep | 12 (#2,3,6,8,16,19,20,21,24,27,29,31) | **12 — all of them** | 0 | 2 |

Points of fact for the D-3 file:

1. **Quickstep: complete overlap.** Every one of the 12 NDCC Quickstep numbers currently lacking a
   BG key has a dedicated dancecentral page. There is no NDCC Quickstep gap for which dancecentral
   has nothing. Two further DC Quickstep pages ("Passing Natural Turn", "Running Spin Turn") sit
   outside the NDCC column entirely.
2. **Foxtrot: zero overlap, because there are zero gaps.** All 25 NDCC Foxtrot numbers are already
   claimed by a BG key. Foxtrot's 7 `dc-only` pages are therefore **not** NDCC coverage gaps — they
   are extra-syllabus material (Curved Feather from PP, Curved Three Step, Hover Telemark to PP,
   Quick Natural Weave, Quick Open Reverse, Reverse Pivot, Tumble Turn). This is the opposite
   evidentiary situation to Quickstep and should not be pooled with it.
3. **Tango: near-complete after the correction.** Only **1 gap** remains (#8 "Open Reverse Turn,
   Lady in Line"), and it has a dancecentral page under a recognisable name ("…Lady Inline"). The
   former #5 and #18 "gaps" were wrap-defect artifacts: they are now claimed by the BG keys
   `Rock Turn` (#5) and `Fallaway Promenade` (#18) of the same name.
4. **Waltz: nothing to weigh, in either direction.** Now assessable against
   `ndcc_waltz_syllabus.json`. All 32 NDCC Waltz numbers are claimed by a BG key (**0 gaps**), and
   every Waltz dancecentral figure page has a BG key (**0 `dc-only` pages**). Waltz therefore
   contributes no evidence to the D-3 question at all — it is neither a Quickstep-style case nor a
   Foxtrot-style one. Of the four dances, Waltz is the only one where all three sources agree on
   coverage; the open questions there are purely about *naming*, not about missing figures.
5. **All four rows are now current.** Tango and Foxtrot were regenerated against the corrected NDCC
   files (`38bec5d`); they are no longer provisional. Waltz and Quickstep were never affected.

---

## NDCC transcription line-wrap observations — RESOLVED (2026-07-25)

The line-wrap defect these observations flagged has been confirmed by raster re-verification,
Victor-ruled, and committed. The corrected number→name bindings are now live in the syllabus JSONs
and reflected throughout this document. The wrap-suspect readings are retained below only as the
historical record of what was found.

**Resolution commits:** `38bec5d` (NDCC JSON + `data.js` binding corrections), `e7435ab` (Tango
BG-key renames + #17→#18 renumber), `7fc7d66` (parser `NDCC_MAP` corrected).

- **Foxtrot #11–#15** — the wrap stream re-split exactly as predicted:
  #11 Top Spin · #12 Hover Feather · #13 Hover Telemark · #14 Natural Telemark · #15 Hover Cross.
  The #13/#14 Telemark order was corrected; both are audited figures, so each swap is logged in that
  record's `corrections` array. (Pre-correction strings were "Top Spin Hover / Feather Hover /
  Telemark Natural / Telemark Hover / Cross".)
- **Tango #4–#5 and #16–#20** — confirmed:
  #4 Closed Promenade · #5 Rock Turn · #16 Back Open Promenade · #17 Outside Swivels ·
  #18 Fallaway Promenade · #19 Four Step Change · #20 Brush Tap.
  **Four of the six** former Tango `candidate`/`dc-only` puzzles collapsed as the note predicted, and
  three BG keys were renamed — `Back Open`→`Back Open Promenade`, `Promenade Outside`→
  `Fallaway Promenade`, `Promenade Four Step`→`Four Step Change` — plus the un-renamed
  `Change Brush Tap`→`Brush Tap`. (Pre-correction strings were "Closed / Promenade Rock Turn /
  Back Open / Promenade Outside / Swivels Fallaway / Promenade Four Step / Change Brush Tap".)

---

## Open items for Victor

### dancecentral ↔ BG key

1. Confirm or reject each of the **4 `candidate`** pairings (Waltz 1, Tango 1, Foxtrot 2), figure by
   figure. (Tango dropped from 3 to 1 — `Back Open Promenade` and `Brush Tap` are now `exact`.)
2. Confirm the **17 `cosmetic`** rows are genuinely cosmetic — in particular the 4 abbreviation
   pairs (Waltz `Chassé from PP`, `Progressive Chassé to R`, `Weave from PP`; Tango
   `Left Foot and Right Foot Rocks`), which are a looser call than punctuation.
3. Rule on the two cardinality splits (Waltz `Closed Changes` → 2 keys, Tango `Walk` → 2 keys):
   how should enrichment attach one page to two records?

### BG key ↔ NDCC — Waltz (unchanged; still open)

4. Rule on the **2 Waltz `candidate`** rows: `#1` "Closed Changes" → `Closed Change (LF)` +
   `Closed Change (RF)` (1→2 split, plus singular/plural), and `#6` "Chassé from Promenade" vs
   `Chassé from PP` (NDCC prints no "Position"; dancecentral prints a third variant).
5. Rule on the **6 Waltz `cosmetic`** rows — the two `Corte` accents (#10, #32), the two `R`↔`Right`
   abbreviations (#16, #29), and the two `and`/`&` differences (#22, #23). All six are proposals,
   not applied. **Note #16 was not among the five divergences flagged in the extraction commit** —
   it is a sixth of the same class, surfaced by this classification.
6. Decide whether to follow the NDCC source's internal `and`/`&` inconsistency within the Silver
   band (#19/#20 print "and", #22/#23 print "&") or normalise it in `data.js`.

### BG key ↔ NDCC — Tango, Foxtrot, Quickstep (newly classified this regen)

7. **Tango** — 1 `cosmetic` (#17 `Outside Swivel` vs "Outside Swivels", singular/plural) and 2
   `candidate` (#1 "Walk" → `Left Foot Walk` + `Right Foot Walk`, 1→2 split; #26 `Overturned Five
   Step` sharing #26 with the `exact` `Five Step`). All proposals.
8. **Foxtrot** — 3 `cosmetic` (`&`/`and` at #5, #10, #23) and 2 `candidate` (#4 `Reverse Turn &
   Feather Finish` vs the parenthetical "Reverse Turn ( incl. Feather Finish )"; #16 `Outside Swivel`
   vs the grouped "Open Telemark Outside Swivel and Feather Ending"). All proposals.
9. **Quickstep** — 4 `cosmetic`, all the same `Chassé`-accent drop (#9, #13, #14, #17); no
   `candidate` rows. Separately: **12 NDCC coverage gaps** (#2,3,6,8,16,19,20,21,24,27,29,31), each
   with a dancecentral page — feeds the deferred D-3 gap-fill decision, not a naming ruling.

### Cross-cutting

10. ✓ **RESOLVED** — the **Foxtrot #11–#15** and **Tango #4–5 / #16–20** wrap observations were
    ruled and committed (`38bec5d`, `e7435ab`, `7fc7d66`); the Tango and Foxtrot sections of this doc
    have been regenerated against the corrected files.
11. Rule on overlapping DC source content: Tango `outside-swivel.html` vs `reverse-outside-swivel.html`
    share method sections; Foxtrot `natural-twist-turn.html` hosts four ending variants against three
    BG keys (with one name mismatch: DC "…with **Natural** Weave Ending" vs BG "…with Weave Ending",
    and one DC variant "…with Hover Feather Ending" having no BG key at all).
12. Rule on the `curved-three-step.html` printed-name ambiguity (`<h2>` "Foxtrot Curved Three Step (*)"
    vs `<title>` "Curved Three Step"; no `<h1>`).
13. Decide whether `quickstep-hopping-figures.html` is in or out of scope as a figure page.

---

*Nothing in this document has been written to `src/data.js`.*
