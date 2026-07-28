# StudioPlanner — Work Order: Tango Routine-Figure Audit (Phase 2b, targeted block)

**Date:** 2026-07-26 · **Prepared:** planning layer · **Executor:** Claude Code
**Baseline:** `ef3b0fd` (`v0.3.0-data`), branch `main`
**Queue position:** item 2 of the carried-forward queue (Handoff rev 3). Satisfies Decision #18 (standing planning rule): no unaudited Tango figures in PS-executed session plans until their audits land.
**Scope type:** targeted subset — the 10 Tango chart figures appearing in the PS-executed Bronze routine. The full Waltz + Tango audit (64 figures) remains queue item 7; this block reduces the Tango remainder 30 → 20 on completion.

---

## 1. Pre-flight (standard)

1. Clean tree on `main` at `ef3b0fd`; `git status` clean.
2. Per-dance counts: Waltz 34 / Tango 30 / Foxtrot 30 / Quickstep 20 (114 total); `dataStatus` distribution 49 audited / 65 parsed.
3. Build passes.
4. **KB-lag check:** this WO was written against the KB `data.js` copy, which contains the post-rename Tango keys. Verify the live `data.js` Tango keys match the scope table below before starting; report any divergence and stop.
5. Confirm the local ballroomguide Tango archive (`sources/` mirror) is present and readable — the audit is against-source.

---

## 2. Scope — 10 figures, first-appearance order in the routine

All tier/number values quoted from `docs/ndcc_tango_syllabus.json` (wrap-corrected 2026-07-25) at the moment of writing, per citation rule #12. Routine-name→chart-figure mappings ruled by Victor 2026-07-26.

| # | `data.js` key (audit unit) | NDCC | Tier | Routine-name provenance |
|---|---|---|---|---|
| 1 | `Left Foot Walk` | #1 "Walk" | Beginners | "Two Walks" (Victor ruling 2026-07-26; shared-number split per Decision #20) |
| 2 | `Right Foot Walk` | #1 "Walk" | Beginners | "Two Walks" (same ruling) |
| 3 | `Progressive Link` | #3 | Beginners | "Argentine Link" (Victor ruling 2026-07-26) |
| 4 | `Open Promenade` | #10 | Bronze | Exact name |
| 5 | `Open Reverse Turn, Lady Outside` | #6 | Pre-Bronze | Exact name (comma only) |
| 6 | `Closed Promenade` | #4 | Beginners | Exact name |
| 7 | `Progressive Side Step Reverse Turn` | #9 | Pre-Bronze | Exact name |
| 8 | `Left Foot and Right Foot Rocks` | #11 | Bronze | "back rocks" (Victor ruling 2026-07-26; routine instance uses the Left Foot rock only — audit unit is the full chart figure) |
| 9 | `Back Corte` | #7 | Pre-Bronze | Exact name |
| 10 | `Natural Twist Turn` | #12 | Bronze | Exact name |

**Explicitly OUT of scope:** NDCC #8 "Open Reverse Turn, Lady in Line" — appears in the routine but has no ballroomguide page and no catalog entry (the single remaining Tango coverage gap). Cannot be audited against source. Carried as flagged; do not attempt sourcing in this block.

---

## 3. Method (as proven in Phase 2b — reuse unchanged)

- **Mode:** against-source — parsed fields checked side-by-side with the ballroomguide chart, both roles, full step data.
- **Order:** the scope-table order above (routine first-appearance).
- **Flip criteria `'parsed'` → `'audited'`** (per Phase 2b §1): (a) both roles' full step data reviewed against source; (b) all flagged anomalies ruled; (c) bar assignment confirmed or corrected.
- **Corrections (Decision A):** every deviation from current `data.js` values is logged in the figure's `corrections` array — `{role, step, field, from, to, ruledBy, date}` — never silently applied. Source-quality defects (chart typos, misalignments) are Victor rulings (`ruledBy: 'Victor'`); mechanical transcription fixes verifiable from source are recorded with their basis.
- **No-dreaming rule applies in full:** missing source data is flagged, never interpolated; source conflicts logged for Victor (ballroomguide wins structural fields); anything borderline is treated as dance content and escalated.
- **Anomaly handling:** surface each dance-domain question to Victor one at a time, with the source evidence, at the point it arises. Do not batch rulings.

---

## 4. Bars — Tango parameter set ruled (Victor, 2026-07-26)

**Victor-ruled 2026-07-26: Tango bar heuristic uses the practical 4-count parameterization — S = 2 beats, Q = 1 beat, 4 beats/bar.** Ruling context: external sources confirm Tango's conventional time signature is 2/4 (S=1, Q=½, 2 beats/bar) while ballroom Standard practice counts in 4s; the two parameterizations produce identical bar boundaries (all values double), and Victor ruled option (b), the 4-count. This extends Decision B to Tango as an explicit per-dance ruling, not a generalization. (Foxtrot + Quickstep values externally corroborated same date: 4/4, S=2, Q=1. Waltz remains outside Decision B — ruling fires at queue item 7.)

Procedure:
1. Apply the beat-accumulation heuristic to confirm or correct bar assignments on the 10 scoped figures. Tango bar values in `data.js` are provisional from the original Step 2 parse — treat as unverified input, not ground truth.
2. Unrecognized tokens (`&`, blanks, anything outside S/Q) flag `bars: null` for Victor's per-figure ruling — never computed (Decision B mechanism, unchanged; the ruling covers S and Q values only).
3. Mid-bar-commencement cases, if any, are escalated individually (1 occurred in Foxtrot/Quickstep; method: timing-beat-number, Victor-paced).
4. Bar corrections are logged in the `corrections` array like any other field (Decision A).

---

## 5. Standing constraints

- **Do NOT run `parse_bg_tango.js`.** Its NDCC_MAP was corrected and defused 2026-07-25 (dry-run no-op verified), but this block is an audit, not a parse. The audited-exclusion guard will protect these 10 figures on any *future* sanctioned re-run.
- **Frozen-docs rule (Decision #16):** do not regenerate `StudioPlanner_Phase2a_Step2_Tango_Anomalies.md` or any Phase 2a anomaly doc.
- **Peer-store rule (Decision #10):** if any correction touches a `FIGURES['Tango']` catalog field, apply the same dance-namespaced discipline as for `FIGURE_RICH_DATA['Tango']`.
- `App.jsx` is expected untouched in this block (the badge logic keys off `dataStatus` — flips propagate automatically).
- Pure-edit discipline: Waltz / Foxtrot / Quickstep entries byte-untouched.

---

## 6. Checkpoints, commit, and close

1. **Per-figure:** verdict line (clean / corrected / flagged) as each figure completes; Victor rulings serialized as they arise.
2. **Commit:** one commit at block completion (message referencing this WO), then **pause for Victor's diff review** (non-negotiable checkpoint).
3. **Post-commit report:** figures flipped (target 10/10), corrections count, any figures NOT flipped and why, updated distribution (target: 59 audited / 55 parsed), build verification.
4. **Deploy is a separate Victor decision** — on flip, the "Not yet verified" badge disappears for these 10 figures in the next deployed build; do not deploy without an explicit go.
5. Anomalies discovered but not resolvable in-block are logged for the queue, not expanded into new scope.

---

*Handoff rev 3 is the canonical context document for this WO. On any conflict between this WO and live repo state, stop and report — do not reconcile silently.*
