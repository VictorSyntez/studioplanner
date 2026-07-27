# StudioPlanner — Handoff Document

**Date:** 2026-07-26 **rev 6** (supersedes rev 5, same date — rev 5 closed the rulings sitting (session 2); this revision closes **session 3**, the execution session that ran the three WOs)
**This revision:** produced in the planning layer after Claude Code executed all three work orders and after Victor's post-deploy verifications. All rulings of rev 5 are now applied and live.
**Current branch:** `main` at **`8c8bd38`**, tagged **`v0.4.0-data`**, pushed, **DEPLOYED** at https://dancepraktika-studioplanner.web.app/. **115 figures** (Waltz 34 / Tango 30 / **Foxtrot 31** / Quickstep 20), **60 audited / 55 parsed**. Badge-over-gate active.
**Repo:** https://github.com/VictorSyntez/studioplanner

**Tag chain (restored — every deploy reachable from a tag):**
| Tag | Commit | State |
|---|---|---|
| `v0.3.0-data` | `ef3b0fd` | Foxtrot+Quickstep audit + badge |
| `v0.3.1-data` | `c811da1` | Tango routine block (59/55) |
| `v0.3.2-ui` | `429dfc1` | all-bars rendering |
| **`v0.4.0-data`** | **`8c8bd38`** | **current — 115 figures, 60 audited, `studioLevel`** (minor bump = data-model change) |

---

## Session outcomes (2026-07-26, session 3 — execution)

1. **WO 1 — Waltz key renames EXECUTED.** Seven renames applied in both peer stores with `priorBgName` recorded: `Reverse Corte` · `Progressive Chasse to Right` · `Open Impetus & Cross Hesitation` · `Open Impetus & Wing` · `Turning Lock to Right` · `Hover Corte` · `Chasse from PP`. **Firestore session-plan sweep: verified no-op** — evidence-based (read-only deep-walk counter over `users/*/sessions/*` under a temporary admin service-account key), not assumed. Glossary prose referencing old names followed up per Victor's in-session ruling.
2. **WO 2 — Foxtrot #16 compound EXECUTED.** `Open Telemark, Natural Turn to Outside Swivel and Feather Ending` assembled from the four BG components (10 steps/role); **Victor's three seam rulings applied at the mandatory pre-commit review**; **audit clean — 20 steps / 0 deviations**; `dataStatus: 'audited'`. Standalone `Outside Swivel` → null-tier (chart retained, stays `parsed`, renders in Needs Review). Figure count 114 → **115** (Foxtrot 31).
3. **WO 3 — `studioLevel` schema EXECUTED.** Lazy option: resolution logic `studioLevel ?? syllabusLevel` in App.jsx; **no record carries the field yet**; library rendering byte-identical.
4. **Push + deploy approved by Victor**; deployed as `v0.4.0-data`.
5. **Post-deploy verifications (Victor):** compound located in the library (initial "missing figure" report was a lookup miss, withdrawn — no defect; the stale-PWA-cache hypothesis was not needed, but the missing update-prompt gap remains real and tracked under 4.5a). **Admin service-account key REVOKED and local file deleted** — sweep security loop closed.
6. **Two future-ruling flags recorded by Code in commit messages (open, tracked below):**
   - `studioLevel` **unrecognised-vocabulary handling** — Code made a defensive, reversible choice; the value vocabulary itself is unruled (belongs to the value-assignment sitting).
   - `scripts/parse_bg_waltz.js` **still hardcodes the seven old Waltz keys** — a landmine if any Waltz re-parse runs before the script is updated (exactly the WO 1 §7 hazard class). **No Waltz re-parse until fixed.**

## Fast re-entry — state on resume

1. **Pre-flight (standard):** clean tree at `8c8bd38` (`v0.4.0-data`), counts 34/30/31/20 (115), 60 audited / 55 parsed, build.
2. **Queue head: the 54-figure Waltz + Tango remainder audit** (Waltz 34 + Tango 20; NDCC-tiered figures — the null-tier `Outside Swivel` is outside this count). **Both bar-parameterization gates discharged:** Tango = Decision #22 (S=2/Q=1/4 beats), Waltz = Decision #29 (3 beats/bar; 1/2/3 = 1 beat; `&` = 0-beat subdivision; out-of-set tokens flag `bars: null` — known flag case: Waltz `Turning Lock` token `4`). Method carries over unchanged (against-source side-by-side, Decision A corrections schema, audited-exclusion guard). **Awaiting Victor's explicit direction to Code — not started.** Expect escalations back to the planning layer for `bars: null` flags and any source conflicts.
3. **KB refresh still pending (Victor):** `src/data.js` + `src/App.jsx` at `8c8bd38`, plus this rev 6.
4. Deploy workflow: Firebase throughout; one deploy per logical unit.

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion); **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max, Pixel 7; PS tablet migration is workstream two (Step 4.5). Scope: 8 dances (Standard parsed; Latin third workstream).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State (cumulative)

- **Phase 1** complete (`v0.2.0`). **Phase 2a Steps 0–4** complete (unified pipeline, dance-namespaced keying, Needs Review bucket, rhythm column).
- **Phase 2b (Foxtrot + Quickstep)** complete (`v0.3.0-data`). **Tango routine audit** complete (`v0.3.1-data`). **All-bars rendering** complete (`v0.3.2-ui`).
- **Session 2 (2026-07-26):** all rulings — Waltz reconciliation (decision #26), Foxtrot #16 compound (#27), null-tier schema = `studioLevel` (#28), Waltz bar parameterization (#29). PS-view verified.
- **Session 3 (2026-07-26):** the three WOs executed, deployed as **`v0.4.0-data`** — the current state summarized in the header.

---

## Locked decisions
1–25. As recorded in rev 3/rev 4 (no-dreaming #5; citation rule #12; peer-store rule #10; Decision A; Decision B; Tango parameterization #22; all-bars design #23; attribution #24; DC merge slot #25; etc.).
26–29. As recorded in rev 5 (Waltz reconciliation rulings incl. the two *scoped* accent-strips — **no accent policy exists**; Foxtrot #16 compound + mandatory seam review — discharged this session; `studioLevel` schema option (c); Waltz bar parameterization option (a)).
All of #26–#29 are now **applied and live**; the seam-review condition of #27 was honored and is discharged.

---

## Next action — queue (updated)
1. **Waltz + Tango remainder audit (54 figures)** — gates discharged; awaiting Victor's go to Code. Prerequisite note inside it: any Waltz *re-parse* (not audit) is blocked by the `parse_bg_waltz.js` old-keys flag; audits don't run the parser, so the audit itself is NOT blocked.
2. **`studioLevel` value-assignment sitting** (planning layer; includes ruling the value vocabulary — resolves Code's unrecognised-vocabulary flag). Slot at Victor's choice, any time after now.
3. **Latin parse** — prerequisites: mid-bar heuristic upgrade; Latin pre-flight list (Status Overview §3.2); PDF tracking decision.
4. **Option C gap-fill** (Quickstep 12 + Jive D-3).
5. **Auth QoL:** "Forgot password?" in AuthGate — pre-commercial requirement.
After-queue workstreams unchanged: **Step 4.5** (4.5a CSS pass — carries: orphaned `.bar-selector` CSS; dead `const bars` App.jsx ~92; optional-column design revisit; Needs-Review/non-syllabus visual treatment (shaped by #28); **PWA update prompt** (gap re-confirmed relevant this session); 4.5b PS notes/D-1) → **dancecentral enrichment merge** (Decision #25) → **Latin**.

---

## Deferred / tracked issues (delta vs rev 5)
- ~~WO 1 / WO 2 / WO 3 execution~~ — **closed 2026-07-26 session 3** (all committed, deployed, tag-verified).
- ~~Firestore sweep~~ — closed (verified no-op). ~~Admin key~~ — closed (revoked + file deleted).
- **NEW: `parse_bg_waltz.js` hardcodes the seven old Waltz keys** — must be updated before any Waltz re-parse (recorded in commit message). Blocks re-parse only, not audit.
- **NEW: `studioLevel` unrecognised-vocabulary handling** — defensive interim in code; superseded once the value vocabulary is ruled (queue item 2).
- All other standing items unchanged: Option C gap-fill; Step 4.5 blockers; Silver swivel cluster; Tango #8 gap; standalone Foxtrot `Outside Swivel` audit (parsed, unscheduled); security pre-commercial items; licensing review; D-1; Firebase CLI housekeeping; Data Acquisition Brief retirement candidate; `handleBarToggle` lexicographic sort note.

---

## Key Files (delta vs rev 5)
| File | Status |
|---|---|
| `src/data.js` | Changed by session 3 (renames + compound + null-tier edit). **KB copy stale — refresh to `8c8bd38`.** |
| `src/App.jsx` | Changed by session 3 (`studioLevel` resolution logic). **KB copy stale — refresh to `8c8bd38`.** |
| `src/index.css` | Unchanged this session (KB copy should already be at `429dfc1` per rev 4/5 flags). |
| Three WOs (`Waltz_Key_Renames` / `Foxtrot16_Compound_JOIN` / `StudioLevel_Schema`) | Executed; retained in KB as ruling/execution records. |
| `StudioPlanner_Handoff.md` | This file (rev 6). Repo `docs/` copy lags — update at next doc commit. |
| Everything else | As rev 5. |

---

## Notes for next session
- **Read at session start:** this handoff (rev 6) + `StudioPlanner_Session_Conduct_Review.md`.
- **Order:** standard pre-flight → Victor's go on the 54-figure remainder audit (Code) — or the `studioLevel` value sitting (planning layer) if Victor prefers it first.
- **NDCC is the syllabus authority.** KB-lag rule and canonical-source rule stand. No accent policy exists — the two accent-strips (#16, #6) are individually scoped; do not generalize. No Waltz re-parse until `parse_bg_waltz.js` is updated.
- **Upload at session close:** this rev 6 + refreshed `data.js` and `App.jsx`.
