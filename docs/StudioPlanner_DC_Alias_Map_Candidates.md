# StudioPlanner — dancecentral Name Inventory & Candidate Alias Map

**Dances:** Waltz · Tango · Foxtrot (`slow-foxtrot/`) · Quickstep
**Purpose:** Prep for dancecentral description enrichment (Brief Step 4). Establishes an explicit,
per-figure dancecentral ↔ BG-key ↔ NDCC correspondence **before** any description text is attached.
**Date compiled:** 2026-07-25
**Last updated:** 2026-07-25 — Waltz NDCC column added (see below)
**Applied to `data.js`:** **NOTHING.** This document is a proposal set only.

> **Standing rule #5 — every pairing below is a proposal. Victor confirms figure-by-figure.**
> Rows marked `candidate` and `dc-only` in particular carry dance-domain judgment that has
> deliberately **not** been made here.

---

## ⚠ STALENESS NOTE — Tango and Foxtrot NDCC columns

**The Tango and Foxtrot NDCC columns in this document are stale and will be regenerated.**

They were read from `docs/ndcc_tango_syllabus.json` and `docs/ndcc_foxtrot_syllabus.json` as those
files stood on 2026-07-25, i.e. **before** the wrap-defect binding corrections. Victor ruled on
those corrections on 2026-07-25, but **that ruling is not yet committed**. The affected bands are
the ones enumerated in the wrap-observations section at the foot of this doc — Foxtrot **#11–#15**
and Tango **#4–#5** / **#16–#20**. Every NDCC number→name binding in those ranges, and any row in
this document that cites one, should be treated as provisional until the corrected syllabus files
land.

Once that commit is in, the Tango and Foxtrot sections of this document are to be regenerated
against the corrected files rather than hand-patched.

**Not affected:** the **Waltz** column (extracted 2026-07-25 with the wrap check applied, `6b7a4e1`
— 32 numbers / 32 text lines, no wraps present) and the **Quickstep** column (two-pass blind
extraction, no wrap defects identified). Those two are current.

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
| Tango | 29 | 18 | 4 | 3 | 4 | 30 | 4 |
| Foxtrot | 32 | 19 | 4 | 2 | 7 | 30 | 5 |
| Quickstep | 33 | 16 | 3 | 0 | 14 | 20 | 1 |
| **Total** | **126** | **78** | **17** | **6** | **25** | **114** | **11** |

Reconciliation: 78 + 17 + 6 + 25 = 126 DC figure pages. 101 matched DC rows cover 103 BG keys
(two `candidate` rows are 1-page→2-key splits); 103 + 11 `bg-only` = 114 BG keys. ✓

### Bucket counts — BG key ↔ NDCC

Only **Waltz** has been classified on this axis so far; it is added here because
`ndcc_waltz_syllabus.json` is new and current. Tango and Foxtrot are deliberately **not** classified
on this axis yet — their NDCC files are stale pending the wrap-defect correction commit (see the
staleness note above), so any BG↔NDCC pairing built from them now would have to be thrown away.
Quickstep's NDCC file is current but has not been run on this axis.

| Dance | NDCC figures | `exact` | `cosmetic` | `candidate` | `ndcc-only` | `bg-only` | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| Waltz | 32 | 24 | 6 | 2 | 0 | 1 | classified — see the Waltz section |
| Tango | 27 | — | — | — | — | — | **deferred — NDCC file stale** |
| Foxtrot | 25 | — | — | — | — | — | **deferred — NDCC file stale** |
| Quickstep | 31 | — | — | — | — | — | not yet run |

### Bucket definitions

| Bucket | Meaning |
|---|---|
| `exact` | DC printed title is character-identical to the BG key. |
| `cosmetic` | Differs only in punctuation, `&`/`And`, accents, case, whitespace, a trailing `- <Dance>` suffix, or an abbreviation pair (`PP`↔`Promenade Position`, `R`↔`Right`, `LF`↔`Left Foot`). The `Δ` column names which. Still listed for confirmation. |
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
`EXTRACTED — pending Victor's confirmation. Not yet audited.`).

### exact — 18

| dancecentral printed title | file | BG key | NDCC # / tier / verbatim name |
|---|---|---|---|
| Back Corte | `back-corte.html` | `Back Corte` | 7 / Pre-Bronze / "Back Corte" |
| Basic Reverse Turn | `basic-reverse-turn.html` | `Basic Reverse Turn` | 23 / Gold / "Basic Reverse Turn" |
| Closed Promenade | `closed-promenade.html` | `Closed Promenade` | 4 / Beginners / "Closed" ⚠ |
| Five Step | `five-step.html` | `Five Step` | 26 / Gold / "Five Step" |
| Four Step | `four-step.html` | `Four Step` | 15 / Silver / "Four Step" |
| Natural Promenade Turn | `natural-promenade-turn.html` | `Natural Promenade Turn` | 13 / Bronze / "Natural Promenade Turn" |
| Natural Twist Turn | `natural-twist-turn.html` | `Natural Twist Turn` | 12 / Bronze / "Natural Twist Turn" |
| Open Promenade | `open-promenade.html` | `Open Promenade` | 10 / Bronze / "Open Promenade" |
| Open Reverse Turn, Lady Outside | `open-reverse-turn-lady-outside.html` | `Open Reverse Turn, Lady Outside` | 6 / Pre-Bronze / "Open Reverse Turn, Lady Outside" |
| Outside Swivel | `outside-swivel.html` | `Outside Swivel` | — (BG record is null-tier) |
| Oversway | `oversway.html` | `Oversway` | 22 / Gold / "Oversway" |
| Progressive Link | `progressive-link.html` | `Progressive Link` | 3 / Beginners / "Progressive Link" |
| Progressive Side Step | `progressive-side-step.html` | `Progressive Side Step` | 2 / Beginners / "Progressive Side Step" |
| Progressive Side Step Reverse Turn | `progressive-side-step-reverse-turn.html` | `Progressive Side Step Reverse Turn` | 9 / Pre-Bronze / "Progressive Side Step Reverse Turn" |
| Promenade Link | `promenade-link.html` | `Promenade Link` | 14 / Silver / "Promenade Link" |
| Reverse Outside Swivel | `reverse-outside-swivel.html` | `Reverse Outside Swivel` | — (BG record is null-tier) |
| Rock Turn | `rock-turn.html` | `Rock Turn` | — (BG record is null-tier; NDCC #5 "Promenade Rock Turn" is unclaimed — see wrap note) |
| The Chase | `the-chase.html` | `The Chase` | 24 / Gold / "The Chase" |

⚠ NDCC #4 prints as bare **"Closed"**; the source JSON's own `_provenance.notes` flags it as an
apparent truncation and says "CONFIRM intended name". The DC↔BG pairing is unaffected.

### cosmetic — 4

| dancecentral printed title | file | BG key | Δ | NDCC # / tier / verbatim name |
|---|---|---|---|---|
| Contra Check - Tango | `contra-check.html` | `Contra Check` | dance suffix | 27 / Gold / "Contra Check" |
| Fallaway Fourstep | `fallaway-fourstep.html` | `Fallaway Four Step` | spacing | 21 / Gold / "Fallaway Four Step" |
| Fallaway Reverse and Slip Pivot | `fallaway-reverse-and-slip-pivot.html` | `Fallaway Reverse & Slip Pivot` | `and` vs `&` | 25 / Gold / "Fallaway Reverse & Slip Pivot" |
| LF and RF Rocks | `lf-and-rf-rocks.html` | `Left Foot and Right Foot Rocks` | abbrev (`LF`/`RF`) | 11 / Bronze / "Left Foot and Right Foot Rocks" |

### candidate — 3 (needs Victor)

| dancecentral printed title | file | BG key(s) | NDCC # / verbatim name | Why it needs Victor |
|---|---|---|---|---|
| Back Open Promenade | `back-open-promenade.html` | `Back Open` | 16 / Silver / "Back Open" | Substantive word difference. BG key is a verbatim copy of the NDCC string, which is itself wrap-suspect (see wrap note below). |
| Brush Tap | `brush-tap.html` | `Change Brush Tap` | 20 / Silver / "Change Brush Tap" | Substantive word difference, and entangled with the #19/#20 wrap question and with the DC-only page "Four Step Change". |
| Walk | `walk.html` | `Left Foot Walk` **and** `Right Foot Walk` | 1 / Beginners / "Walk" | **1 page → 2 BG keys.** Unlike the Waltz Closed Changes page, the DC Walk page does **not** sub-split LF/RF — it has a single "Tango Walk" section. Enrichment cannot mechanically split it. Both BG keys hold `syllabusNumber: 1`. |

### dc-only — 4

| dancecentral printed title | file | Overlaps an NDCC entry? |
|---|---|---|
| Fallaway Promenade | `fallaway-promenade.html` | No NDCC entry of this name. NDCC **#18 "Swivels Fallaway"** (Silver) is unclaimed by any BG key — see wrap note. |
| Four Step Change | `four-step-change.html` | No NDCC entry of this name. NDCC **#19 "Promenade Four Step"** / **#20 "Change Brush Tap"** are wrap-suspect — see wrap note. |
| Open/Closed Finish | `open-finish.html` | No NDCC entry. Page carries **two** figures as sub-sections: h2 "Closed Finish" and h2 "Open Finish". |
| Open Reverse Turn, Lady Inline | `open-reverse-turn-lady-inside.html` | **Yes** — NDCC **#8 / Pre-Bronze / "Open Reverse Turn, Lady in Line"**, an NDCC entry with no BG key. Note DC prints "Inline", NDCC prints "in Line". |

### bg-only — 4

| BG key | NDCC # / tier / verbatim name | Note |
|---|---|---|
| `Promenade Outside` | 17 / Silver / "Promenade Outside" | No DC page of this name. Wrap-suspect — see note. |
| `Promenade Four Step` | 19 / Silver / "Promenade Four Step" | No DC page of this name. Wrap-suspect — see note. |
| `Overturned Five Step` | 26 / Gold (shares #26 with `Five Step`) | No DC page. |
| `Point to Promenade Position` | — (null-tier) | No DC page. |

### NDCC Tango numbers with no BG key

**3 gaps:** #5 "Promenade Rock Turn", #8 "Open Reverse Turn, Lady in Line", #18 "Swivels Fallaway".

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
| Hover Cross | `hover-cross.html` | `Hover Cross` | 15 / Silver / "Cross" ⚠wrap |
| Hover Feather | `hover-feather.html` | `Hover Feather` | 12 / Silver / "Feather Hover" ⚠wrap |
| Hover Telemark | `hover-telemark.html` | `Hover Telemark` | 14 / Silver / "Telemark Hover" ⚠wrap |
| Natural Hover Telemark | `natural-hover-telemark.html` | `Natural Hover Telemark` | 24 / Gold / "Natural Hover Telemark" |
| Natural Telemark | `natural-telemark.html` | `Natural Telemark` | 13 / Silver / "Telemark Natural" ⚠wrap |
| Natural Turn | `natural-turn.html` | `Natural Turn` | 3 / Pre-Bronze / "Natural Turn" |
| Natural Twist Turn | `natural-twist-turn.html` | `Natural Twist Turn` | 20 / Gold / "Natural Twist Turn" |
| Natural Weave | `natural-weave.html` | `Natural Weave` | 6 / Bronze / "Natural Weave" |
| Natural Zig-Zag from PP | `natural-zig-zag-from-pp.html` | `Natural Zig-Zag from PP` | 22 / Gold / "Natural Zig-Zag from PP" |
| Open Impetus | `open-impetus.html` | `Open Impetus` | 17 / Silver / "Open Impetus" |
| Reverse Wave | `reverse-wave.html` | `Reverse Wave` | 19 / Silver / "Reverse Wave" |
| Three Step | `three-step.html` | `Three Step` | 2 / Pre-Bronze / "Three Step" |
| Top Spin | `top-spin.html` | `Top Spin` | 11 / Silver / "Top Spin Hover" ⚠wrap |

`⚠wrap` = the DC↔BG pairing is exact and unaffected; the **NDCC string** at that number is
wrap-suspect. See the wrap note below.

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

---

## NDCC coverage-gap overlap with dancecentral-only pages

Recorded as evidence for the deferred prose-as-structural-fallback decision (D-3-class).
**No recommendation is made here.**

| Dance | NDCC gaps (numbers with no BG key) | Gaps covered by a `dc-only` page | Gaps with no DC page | `dc-only` pages outside NDCC |
|---|---:|---:|---:|---:|
| Waltz | **0** | 0 | 0 | 0 |
| Tango | 3 (#5, #8, #18) | **1** (#8 ← "Open Reverse Turn, Lady Inline") | 2 (#5, #18) | 3 |
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
3. **Tango: partial.** Of 3 gaps, only #8 has a dancecentral page under a recognisable name. #5 and
   #18 are both wrap-suspect strings (below), so whether they are "gaps" at all is unresolved.
4. **Waltz: nothing to weigh, in either direction.** Now assessable against
   `ndcc_waltz_syllabus.json`. All 32 NDCC Waltz numbers are claimed by a BG key (**0 gaps**), and
   every Waltz dancecentral figure page has a BG key (**0 `dc-only` pages**). Waltz therefore
   contributes no evidence to the D-3 question at all — it is neither a Quickstep-style case nor a
   Foxtrot-style one. Of the four dances, Waltz is the only one where all three sources agree on
   coverage; the open questions there are purely about *naming*, not about missing figures.
5. **Tango and Foxtrot rows above are provisional** — both rest on NDCC files that predate the
   wrap-defect correction (see the staleness note at the top). The Waltz and Quickstep rows are not
   affected.

---

## NDCC transcription line-wrap observations

These are **mechanical string observations** about the NDCC JSON files, surfaced because they
directly affect how the alias map should be read. They are **not** applied, and no dance-domain
call is made. All strings below are quoted verbatim from the JSON at write time.

### Foxtrot #11–#15

The source JSON's `_provenance.notes` already flags line-wrap in figures 5, 16 and 25. Figures
**11–15 show the same signature but are not flagged**:

| # | verbatim `ndccName` | BG key holding that `syllabusNumber` |
|---|---|---|
| 11 | "Top Spin Hover" | `Top Spin` |
| 12 | "Feather Hover" | `Hover Feather` |
| 13 | "Telemark Natural" | `Natural Telemark` |
| 14 | "Telemark Hover" | `Hover Telemark` |
| 15 | "Cross" | `Hover Cross` |

Read as a single stream, #11–#15 concatenate to
`Top Spin Hover Feather Hover Telemark Natural Telemark Hover Cross`, which re-splits cleanly into
five two-word-plus figure names. Each of those five has a dancecentral page and a BG key. **The
number→name binding for Foxtrot #11–#15 is therefore not trustworthy as transcribed**, and the
BG records' `syllabusNumber` values in that range rest on it. Note in particular that the stream
reading and BG's current assignment disagree on the order of #13/#14. **Flagged for Victor — not
resolved.**

### Tango #4–#5 and #16–#20

| # | verbatim `ndccName` | BG key holding that `syllabusNumber` |
|---|---|---|
| 4 | "Closed" | `Closed Promenade` |
| 5 | "Promenade Rock Turn" | *(none — gap)* |
| 16 | "Back Open" | `Back Open` |
| 17 | "Promenade Outside" | `Promenade Outside` |
| 18 | "Swivels Fallaway" | *(none — gap)* |
| 19 | "Promenade Four Step" | `Promenade Four Step` |
| 20 | "Change Brush Tap" | `Change Brush Tap` |

#4–#5 concatenate to `Closed Promenade Rock Turn`; the JSON already flags #4 as an apparent
truncation. #16–#20 concatenate to
`Back Open Promenade Outside Swivels Fallaway Promenade Four Step Change Brush Tap`. Every segment
of a five-way re-split of that stream corresponds to an existing dancecentral page — including all
four Tango `dc-only` pages and the two `candidate` rows. **Flagged for Victor — not resolved.**
If this reading is confirmed, four of the six Tango `candidate`/`dc-only` puzzles collapse at once
and three BG keys (`Back Open`, `Promenade Outside`, `Promenade Four Step`) would need renaming;
if it is rejected, they stand as listed. Either way the decision is Victor's, and nothing in this
doc presumes it.

---

## Open items for Victor

### dancecentral ↔ BG key

1. Confirm or reject each of the **6 `candidate`** pairings (Waltz 1, Tango 3, Foxtrot 2), figure by
   figure.
2. Confirm the **17 `cosmetic`** rows are genuinely cosmetic — in particular the 4 abbreviation
   pairs (Waltz `Chassé from PP`, `Progressive Chassé to R`, `Weave from PP`; Tango
   `Left Foot and Right Foot Rocks`), which are a looser call than punctuation.
3. Rule on the two cardinality splits (Waltz `Closed Changes` → 2 keys, Tango `Walk` → 2 keys):
   how should enrichment attach one page to two records?

### BG key ↔ NDCC (Waltz)

4. Rule on the **2 Waltz `candidate`** rows: `#1` "Closed Changes" → `Closed Change (LF)` +
   `Closed Change (RF)` (1→2 split, plus singular/plural), and `#6` "Chassé from Promenade" vs
   `Chassé from PP` (NDCC prints no "Position"; dancecentral prints a third variant).
5. Rule on the **6 Waltz `cosmetic`** rows — the two `Corte` accents (#10, #32), the two `R`↔`Right`
   abbreviations (#16, #29), and the two `and`/`&` differences (#22, #23). All six are proposals,
   not applied. **Note #16 was not among the five divergences flagged in the extraction commit** —
   it is a sixth of the same class, surfaced by this classification.
6. Decide whether to follow the NDCC source's internal `and`/`&` inconsistency within the Silver
   band (#19/#20 print "and", #22/#23 print "&") or normalise it in `data.js`.

### Cross-cutting

7. Rule on the **Foxtrot #11–#15** and **Tango #4–5 / #16–20** wrap observations above, and land the
   correction commit so the Tango and Foxtrot sections of this doc can be regenerated.
8. Rule on overlapping DC source content: Tango `outside-swivel.html` vs `reverse-outside-swivel.html`
   share method sections; Foxtrot `natural-twist-turn.html` hosts four ending variants against three
   BG keys (with one name mismatch: DC "…with **Natural** Weave Ending" vs BG "…with Weave Ending",
   and one DC variant "…with Hover Feather Ending" having no BG key at all).
9. Rule on the `curved-three-step.html` printed-name ambiguity (`<h2>` "Foxtrot Curved Three Step (*)"
   vs `<title>` "Curved Three Step"; no `<h1>`).
10. Decide whether `quickstep-hopping-figures.html` is in or out of scope as a figure page.

---

*Nothing in this document has been written to `src/data.js`.*
