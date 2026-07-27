# StudioPlanner — Handoff Document

**Date:** 2026-07-26 **rev 7** (supersedes rev 6, same date — rev 6 closed session 3, the WO-execution session; this revision closes **session 4**, the remainder-audit session)
**This revision:** produced by Claude Code at Victor's instruction after the Waltz + Tango remainder audit was executed, reviewed, deployed and tagged. **Phase 2b is COMPLETE.**
**Current branch:** `main` at **`88b48ea`**, tagged **`v0.5.0-data`**, pushed, **DEPLOYED** at https://dancepraktika-studioplanner.web.app/ (bundle byte-verified against the local build). **115 figures** (Waltz 34 / Tango 30 / Foxtrot 31 / Quickstep 20), **114 audited / 1 parsed**. Badge-over-gate active.
**Repo:** https://github.com/VictorSyntez/studioplanner

**Tag chain (every deploy reachable from a tag):**
| Tag | Commit | State |
|---|---|---|
| `v0.3.0-data` | `ef3b0fd` | Foxtrot+Quickstep audit + badge |
| `v0.3.1-data` | `c811da1` | Tango routine block (59/55) |
| `v0.3.2-ui` | `429dfc1` | all-bars rendering |
| `v0.4.0-data` | `8c8bd38` | 115 figures, 60 audited, `studioLevel` |
| **`v0.5.0-data`** | **`88b48ea`** | **current — Phase 2b complete, 114 audited / 1 parsed** |

---

## Session outcomes (2026-07-26, session 4 — remainder audit)

1. **Waltz + Tango remainder audit EXECUTED — 54 figures, Phase 2b closed.** One commit per dance as the WO required, each followed by Victor's diff review.
   - **Tango 20** (`e190c3e`): step data **100% clean** — zero field deviations across both roles and all seven chart fields. **10 corrections, all bars** (the same Step-2 parse defect as the routine block: the reset-on-"1" heuristic never fired for compound timings like `12,3,4,56`). Both multi-chart pages audited against the canonical T0–T3 chart (`chase.html` 21 tables, `oversway.html` 40).
   - **Waltz 34** (`88b48ea`): step data clean on 33 of 34 across all eight compared fields, including the four two-page JOINs. **Zero bar corrections.** 5 corrections across 3 figures, all from Victor's escalation rulings.
2. **Four escalations raised, all ruled by Victor 2026-07-26:**
   - **Tango `&` token** → `&` = 0-beat subdivision in Tango, extending the Decision #29 Waltz treatment. Corroborated at escalation by all five already-audited `&` figures in Foxtrot/Quickstep. Under it, `Brush Tap` and `Four Step Change` are Q+Q+0+S = 4 beats = 1 bar — their stored values were already correct, so both confirmed with no correction.
   - **`Back Lock` follower** → rebuild 5 → 4 steps. Source Lady Table A row 4 carries a *blank* step number while Table B row 4 is `"4"`, so merge-by-step-number split one real step into two (foot without timing, then timing without foot). Re-paired and verified field-by-field against the correct source pairing. Same defect class as the Foxtrot `Natural Zig-Zag from PP` rebuild.
   - **`Waltz Prep Step`** → bars confirmed at 2; **null-tiered non-syllabus** (was `Beginners #33`) in both peer stores, matching the Foxtrot and Quickstep Prep Steps. Independent support: `ndcc_waltz_syllabus.json` runs **#1–32 only**, so `#33` had no NDCC referent.
   - **`Fallaway Whisk`** → the only Waltz figure with no ballroomguide chart (`sources: ['dancecentral']`). Victor ruled dancecentral carries it; audited against `reference/waltz/fallaway-whisk.html`. Everything matched except three `rise` fields that had swallowed the source note text — de-merged to the source split.
3. **Decision #29 corroborated on first use.** 32 of 34 Waltz figures already carried correct bars. Waltz timings use bare `1/2/3` tokens, which the original parse's reset-on-"1" heuristic handles correctly — which is why Waltz needed no bar work while Tango needed 10. The two exceptions were the out-of-set token cases, both escalated rather than computed, per §3.
4. **Push + deploy + tag approved by Victor**; deployed and tagged `v0.5.0-data`, production bundle byte-verified identical to the local build.
5. **The WO's expected end state was hit exactly:** 114 audited / 1 parsed, the sole remaining `parsed` figure being the null-tier `Foxtrot/Outside Swivel` (always out of scope; separate tracked item).

## Fast re-entry — state on resume

1. **Pre-flight (standard):** clean tree at `88b48ea` (`v0.5.0-data`), counts 34/30/31/20 (115), **114 audited / 1 parsed**, build. *Note: the working tree normally carries uncommitted planning-layer docs at session start — that is the usual state, not a defect; commit them first as in sessions 3 and 4.*
2. **Phase 2b is closed.** No audit work remains in the Standard dances apart from the single tracked `Foxtrot/Outside Swivel` standalone.
3. **Queue head: the `studioLevel` value-assignment sitting** (planning layer) — it also resolves Code's unrecognised-vocabulary flag. Then Latin.
4. Deploy workflow: Firebase throughout; one deploy per logical unit; tag every deploy.

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion); **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max, Pixel 7; PS tablet migration is workstream two (Step 4.5). Scope: 8 dances (Standard complete; Latin third workstream).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State (cumulative)

- **Phase 1** complete (`v0.2.0`). **Phase 2a Steps 0–4** complete (unified pipeline, dance-namespaced keying, Needs Review bucket, rhythm column).
- **Phase 2b (Foxtrot + Quickstep)** complete (`v0.3.0-data`). **Tango routine audit** (`v0.3.1-data`). **All-bars rendering** (`v0.3.2-ui`). **Renames + Foxtrot #16 compound + `studioLevel`** (`v0.4.0-data`).
- **Session 4 (2026-07-26): PHASE 2B COMPLETE** (`v0.5.0-data`) — all four Standard dances audited against source. **114 audited / 1 parsed.**
- **Corrections logged to date (in `corrections[]`):** Tango 18 across 16 figures · Foxtrot 17 across 10 · Quickstep 11 across 7 · Waltz 5 across 3.

---

## Locked decisions
1–25. As recorded in rev 3/rev 4 (no-dreaming #5; peer-store rule #10; citation rule #12; Decision A corrections schema + audited-exclusion guard; Decision B; Tango parameterization #22; all-bars design #23; attribution #24; DC merge slot #25).
26–29. As recorded in rev 5 — all applied and live (Waltz reconciliation rulings incl. the two *scoped* accent-strips — **no accent policy exists**; Foxtrot #16 compound + seam review, discharged; `studioLevel` schema option (c); Waltz bar parameterization option (a)).
30. **Tango `&` = 0-beat subdivision (Victor, 2026-07-26)** — extends the #29 Waltz treatment to Tango; Decision #22 was silent on `&`. ← NEW *(number assigned by Code at rev 7; renumber if the planning layer has other plans for #30)*

**Bar-derivation rule, now validated across all four dances** — worth keeping explicit because it is the single most error-prone mechanic in the pipeline: per-step `bar` derives from the **absolute timing beat number**, not naive cumulative accumulation. Cumulative-only breaks on mid-bar commencement (Foxtrot `Basic Weave`, starts on beat 3) and on resets that do not land on a bar boundary. Always self-test any proposed bar rule against the already-audited vectors before applying it to new figures.

---

## Next action — queue (updated)
1. **`studioLevel` value-assignment sitting** (planning layer) — rule the value vocabulary and per-figure placements; resolves Code's unrecognised-vocabulary flag.
2. **Latin parse** — prerequisites: mid-bar heuristic upgrade; Latin pre-flight list (Status Overview §3.2); PDF tracking decision. **Read the gzip note below before writing any new source reader.**
3. **Option C gap-fill** (Quickstep 12 + Jive D-3).
4. **Standalone `Foxtrot/Outside Swivel` audit** — the last `parsed` figure; null-tier, unscheduled.
5. **Auth QoL:** "Forgot password?" in AuthGate — pre-commercial requirement.
After-queue workstreams unchanged: **Step 4.5** (4.5a CSS pass — carries: orphaned `.bar-selector` CSS; dead `const bars` App.jsx ~92; optional-column design revisit; Needs-Review/non-syllabus visual treatment (shaped by #28); PWA update prompt; 4.5b PS notes/D-1) → **dancecentral enrichment merge** (Decision #25) → **Latin**.

---

## Deferred / tracked issues (delta vs rev 6)
- ~~Waltz + Tango remainder audit~~ — **closed 2026-07-26 session 4** (committed, deployed, tagged `v0.5.0-data`).
- **NEW — gzip hazard in the source mirror.** `sources/.../waltz/closed_impetus.html` is gzip-compressed on disk, as are **18 of 21 Quickstep pages**. A reader that opens these as UTF-8 gets **zero tables and silently skips the figure** — it does not error. The shipped parsers gunzip (`readPage` checks for the `1f 8b` magic); any ad-hoc harness must too. This bit once during session 4 and was caught only because the page count didn't reconcile. **Relevant to Latin, which will need new readers.**
- **NEW — `ruledBy: 'dancecentral'`** introduced on the three `Fallaway Whisk` corrections, as the source-authority analogue of `'ballroomguide'`. Flagged to Victor at diff review and left standing; revisit if a single attribution convention is wanted.
- **`parse_bg_waltz.js` hardcodes the seven old Waltz keys** — must be updated before any Waltz **re-parse**. Blocks re-parse only, not audits. Still open.
- **`studioLevel` unrecognised-vocabulary handling** — defensive interim in code; superseded once the value vocabulary is ruled (queue item 1).
- All other standing items unchanged: Option C gap-fill; Step 4.5 blockers; Silver swivel cluster; Tango #8 gap (`Open Reverse Turn, Lady in Line` — no BG page, no catalog entry); security pre-commercial items; licensing review; D-1; Firebase CLI housekeeping (**note: the CLI login expired mid-session 4 and needed `firebase login --reauth`**); Data Acquisition Brief retirement candidate; `handleBarToggle` lexicographic sort note.

---

## Key Files (delta vs rev 6)
| File | Status |
|---|---|
| `src/data.js` | Changed by session 4 (54 figures flipped to `audited`; 15 corrections). **KB copy stale — refresh to `88b48ea`.** |
| `src/App.jsx` | Unchanged this session (last changed at `8c8bd38`). |
| `src/index.css` | Unchanged since `429dfc1`. |
| `StudioPlanner_WO_Waltz_Tango_Remainder_Audit.md` | Executed; committed to `docs/` at `2415e04`, retained as the execution record. |
| `StudioPlanner_Handoff.md` | This file (rev 7), committed to `docs/`. |
| Everything else | As rev 6. |

---

## Notes for next session
- **Read at session start:** this handoff (rev 7) + `StudioPlanner_Session_Conduct_Review.md`.
- **Order:** standard pre-flight → the `studioLevel` value sitting (planning layer), or Latin prep if Victor prefers Code work first.
- **NDCC is the syllabus authority.** KB-lag rule and canonical-source rule stand. No accent policy exists — the two accent-strips (#16, #6) are individually scoped. No Waltz re-parse until `parse_bg_waltz.js` is updated.
- **Before writing any new source reader: handle gzip** (see the tracked issue above).
- **Upload at session close:** this rev 7 + refreshed `data.js`.
