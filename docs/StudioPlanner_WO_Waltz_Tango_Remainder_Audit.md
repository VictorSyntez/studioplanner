# StudioPlanner — Work Order: Waltz + Tango Remainder Audit (54 figures)

**Date:** 2026-07-26
**Issued by:** Victor (via planning layer), per Handoff rev 6 queue item 1
**Executor:** Claude Code
**Authority:** Handoff rev 6 is canonical. NDCC syllabus JSONs (`docs/ndcc_waltz_syllabus.json`, `docs/ndcc_tango_syllabus.json`) are the syllabus authority. Ballroomguide charts are the structural source of truth.

---

## 0. Pre-flight (standard — run before anything else)

1. Clean working tree at `8c8bd38`, tag `v0.4.0-data`, branch `main`, in sync with `origin/main`.
2. Figure counts: Waltz 34 / Tango 30 / Foxtrot 31 / Quickstep 20 = **115 total**; **60 audited / 55 parsed**.
3. Build passes (`npm run build`).
4. If any pre-flight check fails: **stop and report.** Do not proceed.

---

## 1. Scope

Audit the **54 remaining NDCC-tiered figures**:

- **Waltz: all 34 figures.**
- **Tango: the 20 figures not audited in the routine block** (`v0.3.1-data`). The audited-exclusion guard identifies these — do not re-derive the list manually; the guard is authoritative.

**Explicitly OUT of scope:**
- The 10 already-audited Tango routine figures (guard-excluded; must remain byte-identical).
- The null-tier Foxtrot `Outside Swivel` (parsed, unscheduled — separate tracked item).
- All Foxtrot and Quickstep figures (audit complete).
- Any parser runs (see §4 hazard).

---

## 2. Method — carries over unchanged from Foxtrot/Quickstep

1. **Against-source, side-by-side:** each figure's `FIGURE_RICH_DATA` entry compared field-by-field against its ballroomguide chart, both roles, every step.
2. **Corrections schema (Decision A):** every deviation corrected in place and logged in the per-figure `corrections` array with fields `role / step / field / from / to / ruledBy / date`. `ruledBy: 'ballroomguide'` for structural fields resolved by source authority; anything requiring judgment escalates (see §5).
3. **Peer-store rule (Decision #10):** any change touching a figure key or catalog-visible field is checked against both `FIGURE_RICH_DATA` and `FIGURES`.
4. **Citation rule (Decision #12):** any tier or syllabus-number reference is read from the relevant `ndcc_*_syllabus.json` at the moment of writing — never from memory or commit history.
5. **On completion of a figure's audit:** set `dataStatus: 'audited'`.
6. **Audited-exclusion guard:** active throughout; audited figures byte-identical before/after (this is the proven property — verify it holds on each commit).

---

## 3. Bar parameterization (per dance — both gates discharged)

**Tango — Decision #22:** S = 2 beats, Q = 1 beat, 4 beats/bar. Unrecognized timing tokens → `bars: null` flag, escalate.

**Waltz — Decision #29:** 3 beats/bar; tokens `1`, `2`, `3` = 1 beat each; `&` = 0-beat subdivision; any out-of-set token → `bars: null` flag, escalate.
- **Known expected flag:** Waltz `Turning Lock` contains token `4`. When hit, flag it per the rule and escalate — do not special-case it, do not interpolate a beat value.

---

## 4. Hazards and hard constraints

1. **NO WALTZ RE-PARSE.** `scripts/parse_bg_waltz.js` still hardcodes the seven pre-rename Waltz keys. Audits do not run the parser, so this WO is not blocked — but do not invoke `parse_bg_waltz.js` for any reason during this WO. If a situation appears to require a re-parse, **stop and escalate.**
2. **Seven renamed Waltz keys (WO 1):** `Reverse Corte`, `Progressive Chasse to Right`, `Open Impetus & Cross Hesitation`, `Open Impetus & Wing`, `Turning Lock to Right`, `Hover Corte`, `Chasse from PP`. Each carries `priorBgName`. When locating these figures' ballroomguide source charts, **match via `priorBgName`**, not the current key.
3. **No accent policy exists.** The two accent-strips ruled earlier (#16, #6) are individually scoped. Do not generalize an accent rule to any figure in this audit; any accent question is an escalation.
4. **No-dreaming rule (Decision #5):** no dance-domain content (timings, footwork, alignments, rise & fall, sway, CBM, tier/number mappings) supplied from model knowledge. Source + Victor's rulings only. Missing data is flagged, never interpolated.

---

## 5. Escalation protocol

Pause and escalate to the planning layer / Victor — do not resolve locally — for:
- Any `bars: null` flag (including the expected Turning Lock `4`).
- Any conflict between sources, or between source and current data, that is not a plain structural-field correction covered by `ruledBy: 'ballroomguide'`.
- Any figure whose BG chart cannot be located (including via `priorBgName`).
- Anything that would touch an already-audited figure.

Escalations are batched **per dance at most** — surface them at the natural pause point (end of that dance's audit pass) unless one blocks continuing, in which case stop immediately.

---

## 6. Sequencing, commits, deploy

1. **Order: Tango remainder first (20 figures), then Waltz (34 figures).** Rationale: Tango's parameterization (#22) is already battle-tested from the routine audit; Waltz's (#29) is first-use and carries the known flag case.
2. **One commit per dance.** After each commit: **pause for Victor's diff review** before proceeding. Non-negotiable checkpoint.
3. Commit messages record: figures audited, corrections count, any flags raised (matching the established pattern of recording future-ruling flags in commit messages).
4. **One deploy for the whole WO**, after both commits are reviewed and approved by Victor. Expected end state: **114 audited / 1 parsed** (the sole remaining `parsed` figure being the null-tier Foxtrot `Outside Swivel`). Version tag proposal to Victor at deploy time.
5. Post-audit verification per commit: build passes; audited-exclusion byte-identity holds for previously audited figures; counts reconcile.

---

## 7. Reporting back

At WO close, report to the planning layer: per-dance corrections totals, all escalations and their resolutions, final counts, commit hashes, and deploy tag — for incorporation into Handoff rev 7.
