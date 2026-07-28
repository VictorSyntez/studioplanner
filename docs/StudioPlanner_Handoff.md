# StudioPlanner — Handoff Document

**Date:** 2026-07-27 **rev 8** (supersedes rev 7, 2026-07-26 — rev 7 closed session 4, the remainder-audit session; this revision closes **session 5**, the `studioLevel` value-assignment session)
**This revision:** produced by the planning layer (Claude-in-chat) at Victor's instruction after the `studioLevel` value sitting was ruled, executed by Claude Code, reviewed, deployed and tagged. **Phase 2b remains complete; the null-tier placement question is now closed.**
**Current branch:** `main` at **`aabfb18`** (`git describe`: `v0.6.0-data-4-gaabfb18` — **four commits past the tag**), pushed. Last **shippable** commit is **`b864e9b`**, tagged **`v0.6.0-data`**, **DEPLOYED** at https://dancepraktika-studioplanner.web.app/. Of the four commits since, three are docs-only (`2e5be73`, `aafc306`, `aabfb18`) and **`3102bc5` also touched `src/data.js` — comment-only**, verified: the `v0.6.0-data..HEAD` diff for `src/data.js` contains no non-comment line, and the bundle hash is `index-D7Ke58jM.js` before and after. The live deployment is therefore still exactly `v0.6.0-data` content and **no new tag or deploy is warranted** — but note that "docs-only since the tag" is *not* literally true, and do not restate it that way when auditing the tag. **115 figures** (Waltz 34 / Tango 30 / Foxtrot 31 / Quickstep 20), **114 audited / 1 parsed**. Badge-over-gate active. **Standard "Needs Review" bucket is now empty.**
**Repo:** https://github.com/VictorSyntez/studioplanner

**Tag chain (every deploy reachable from a tag):**
| Tag | Commit | State |
|---|---|---|
| `v0.3.0-data` | `ef3b0fd` | Foxtrot+Quickstep audit + badge |
| `v0.3.1-data` | `c811da1` | Tango routine block (59/55) |
| `v0.3.2-ui` | `429dfc1` | all-bars rendering |
| `v0.4.0-data` | `8c8bd38` | 115 figures, 60 audited, `studioLevel` schema |
| `v0.5.0-data` | `88b48ea` | Phase 2b complete, 114 audited / 1 parsed |
| **`v0.6.0-data`** | **`b864e9b`** | **current — `studioLevel` values assigned, Needs Review empty** |

---

## Session outcomes (2026-07-27, session 5 — `studioLevel` value assignment)

1. **Stale-file check at session open — KB verified current.** The rev 7 flag on `data.js` ("KB copy stale — refresh to `88b48ea`") had already been discharged: the KB copy matched the `88b48ea` end state exactly (115 figures, 114 audited / 1 parsed, 114 `corrections` blocks, sole `parsed` = `Foxtrot/Outside Swivel`). `App.jsx` and `index.css` consistent with rev 7, including the two expected tracked artifacts (orphaned `.bar-selector` at `index.css:749`; dead `const bars` at `App.jsx` ~92).
2. **`studioLevel` value-assignment sitting COMPLETED** — the deferred half of `StudioPlanner_WO_StudioLevel_Schema.md` is discharged. Four rulings, all Victor's, all 2026-07-27. Captured in `StudioPlanner_WO_StudioLevel_Values.md`.
3. **Executed by Claude Code** at `b864e9b`, deployed, tagged `v0.6.0-data`. All ten `syllabusLevel: null` figures now carry a `studioLevel` in **both peer stores**. Everything else held: counts unchanged, `dataStatus` unchanged, corrections totals unchanged, no dance-content byte moved.
4. **Record error found and corrected.** Code's execution report described queue item 4 as "the Outside Swivel compound JOIN," conflating two distinct items. **Corrected:** queue item 4 is the *standalone `Foxtrot/Outside Swivel` **audit***; the **compound JOIN was Foxtrot #16**, shipped at `v0.4.0-data` and **discharged** (locked decisions 26–29). The pending Outside Swivel work is a source audit with no JOIN component.

---

## Locked decisions — additions this session

**31. `studioLevel` value vocabulary mirrors NDCC (Victor, 2026-07-27).** `studioLevel` values are drawn **only** from the existing `LEVEL_ORDER` = `['Beginners', 'Pre-Bronze', 'Bronze', 'Silver', 'Gold', 'Gold Star']`. No studio-specific level names; no extension of `LEVEL_ORDER`; no parallel ordering. Every assigned value is therefore already orderable, so tier grouping and the cumulative `targetLevel` filter absorbed the assignment **with no code change**. NDCC fields (`syllabusLevel`, `syllabusNumber`, `syllabusBody`) remain verbatim-or-null forever. Resolution logic unchanged: `effectiveLevel(f) = studioLevel ?? syllabusLevel` (decision #28).

> **#31 rider — the unrecognised-vocabulary guard is RETAINED. Do not delete it as dead defensive code.**
> #31 changed *why* the guard exists, not *whether* it is needed. `levelIndex` is `LEVEL_ORDER.indexOf(level)`, which returns **`-1`** for an out-of-vocabulary value — sorting it *below* `Beginners` (index 0) so it passes **every** cumulative `targetLevel` filter. The failure direction is therefore "shown to everyone, including beginners," not "hidden." The guard defends against future drift (hand-edits, Latin parse output, a future executor unaware of #31) — not against #31-compliant data, which by ruling cannot trigger it. **The Latin parse is the next process that will emit `studioLevel`-adjacent values, so this defence is live, not hypothetical.**
>
> **Empirical basis, not inference.** The direction was verified by Code at `3102bc5` by testing an out-of-vocabulary value against **all six** `targetLevel` settings: it was filtered out at **none** of them. It was not reasoned from the index comparison alone.
>
> **⚠️ `b864e9b`'s commit message states the mechanism BACKWARDS and is immutable.** `b864e9b` is the commit `v0.6.0-data` points at, so anyone reaching the guard by the natural route — tag → commit → message — reads the inverted mechanism with no signal that it is wrong. The **wrong** phrasings to recognise and discard are **"sorts above `Beginners`"** and **"outranking `Beginners`"**. The correct statement is the one in this rider. `3102bc5` is the commit that names and corrects them.
>
> *This rationale is recorded here because Code also wrote it to its internal memory, and per the KB-lag rule Code's memory is not canonical. This handoff is. The full rider text additionally lives in the `effectiveLevel` comment in `src/data.js`, which no handoff overwrite touches.*

**32. CDTA divergences ride in `syllabusNotes` (Victor, 2026-07-27).** Any cross-body (CDTA) tier divergence is recorded as free text in the figure's `syllabusNotes`. It never enters `syllabusLevel` and never enters `studioLevel`. Confirmed against existing precedent, quoted from `data.js` (`Quickstep / Closed Impetus`): `syllabusNotes: 'CDTA: Bronze figure (NDCC: Pre-Bronze #10).'` **No CDTA values assigned yet** — Victor's CDTA review is open.

**33. `Quickstep / Quickstep Prep Step` bars confirmed at 4 (Victor, 2026-07-27).** Surfaced at the sitting as an anomaly: the Waltz and Foxtrot Prep Steps are `bars: 2` with the same 3-steps-per-role shape, while Quickstep is `bars: 4`. **Victor ruled the stored value correct.** No data change, no `corrections[]` entry. Anomaly closed, not tracked forward.

**34. `firebase-tools` pinned as an exact devDependency (Victor, 2026-07-27) — PENDING EXECUTION.** Deploys had been running through `npx --yes firebase-tools@latest`, which re-downloads the CLI every time and — the substantive problem — places an unpinned, silently-changing tool in the deploy path, so deploys are not reproducible and a CLI change between two deploys is invisible in the repo. **Ruling:** install **`firebase-tools@15.24.0`** exact-pinned. Command: `npm i -D -E firebase-tools@15.24.0`. Verify `package.json` shows a bare `"15.24.0"` — no caret, no tilde. Commit `package.json` **and** `package-lock.json`. Deploys then run `npx firebase deploy --only hosting` (resolves to `./node_modules/.bin/firebase`, downloads nothing); optionally add a `"deploy"` script. Upgrades become deliberate and reviewable. **Note: this does not affect the Firebase CLI login** — credentials live in user config, not `node_modules`, so the session-4 re-auth issue is unchanged.
> **Status verified 2026-07-27 at `3102bc5`: NOT executed.** `grep firebase-tools package.json` returned no match, so the package is absent and deploys still run `npx --yes firebase-tools@latest`. Nothing is broken by this — the ruling is a reproducibility improvement, not a fix. Optional `npm pkg set scripts.deploy="firebase deploy --only hosting"` is a convenience shortcut only, and requires the local install first (no local `firebase` binary otherwise).

Decisions **1–30** as recorded in rev 3/4/5/7 — unchanged. (No-dreaming #5; peer-store #10; citation #12; corrections schema + audited-exclusion guard; Tango parameterization #22; all-bars #23; attribution #24; DC merge slot #25; Waltz reconciliation rulings and the two *scoped* accent-strips — **no accent policy exists**; Foxtrot #16 compound + seam review, **discharged**; `studioLevel` schema option (c) #28; Waltz bar parameterization option (a); Tango `&` = 0-beat subdivision #30.)

**Bar-derivation rule, validated across all four dances** — per-step `bar` derives from the **absolute timing beat number**, not naive cumulative accumulation. Cumulative-only breaks on mid-bar commencement (Foxtrot `Basic Weave`, starts on beat 3) and on resets that do not land on a bar boundary. Always self-test any proposed bar rule against the already-audited vectors before applying it to new figures.

---

## `studioLevel` assignment set (the complete record)

All ten figures that carried `syllabusLevel: null`. No other figure carries a `studioLevel`.

| # | Dance | Figure | `studioLevel` |
|---|---|---|---|
| 1 | Waltz | Waltz Prep Step | Bronze |
| 2 | Tango | Point to Promenade Position | Bronze |
| 3 | Tango | Reverse Outside Swivel | Silver |
| 4 | Foxtrot | Open Natural Turn | Silver |
| 5 | Foxtrot | Outside Swivel | Silver |
| 6 | Foxtrot | Foxtrot Prep Step | Bronze |
| 7 | Foxtrot | Natural Twist Turn with Closed Impetus & Feather Finish Ending | Gold |
| 8 | Foxtrot | Natural Twist Turn with Open Impetus Ending | Gold |
| 9 | Foxtrot | Natural Twist Turn with Weave Ending | Gold |
| 10 | Quickstep | Quickstep Prep Step | Bronze |

**Distribution: Bronze 4 · Silver 3 · Gold 3.**

> **Needs Review predicate — read carefully.** The bucket is defined by **`effectiveLevel(f) == null`**, *not* by `syllabusLevel == null`. Since `b864e9b` these two predicates **diverge** for exactly these ten figures: all ten still carry `syllabusLevel: null` and always will (NDCC fields are verbatim-or-null forever), yet none is in Needs Review, because `studioLevel` now satisfies `effectiveLevel`. Any future filter, report, or parser that reaches for `syllabusLevel == null` as a proxy for "unplaced" will be wrong by ten figures.

- All three Prep Steps → Bronze (ruled individually; consistent result).
- All three Natural Twist Turn ending-variants → Gold. Corroborating context quoted from `ndcc_foxtrot_syllabus.json`: the base figure `Natural Twist Turn` is **NDCC Gold #20**. Observed consistency, *not* the basis of the ruling.
- `Foxtrot / Outside Swivel` is placed at **Silver** but remains **`dataStatus: 'parsed'`** and still displays its "Not yet verified" badge, as ruled. Placement is independent of audit status.

---

## Fast re-entry — state on resume

1. **Pre-flight (standard):** clean tree at `b864e9b` (`v0.6.0-data`), counts 34/30/31/20 (115), **114 audited / 1 parsed**, `studioLevel` present on exactly 10 figures × 2 peer stores, build. *The working tree normally carries uncommitted planning-layer docs at session start — usual state, not a defect; commit them first.*
2. **Phase 2b is closed** and the null-tier placement question is closed. No audit work remains in the Standard dances apart from the single tracked `Foxtrot/Outside Swivel` standalone.
3. **Queue head: Ellever competitive capture** (see queue below) — it is *due now*, its scheduling condition having been met.
4. Deploy workflow: Firebase throughout; one deploy per logical unit; tag every deploy. **See decision #34 before the next deploy.**

---

## Project Overview
StudioPlanner is a PWA for ballroom dance lesson planning and delivery. **MT (Main Teacher)** builds session plans (warmup / N main topics / conclusion); **PS (Practice Supervisor)** views sessions read-only during class. Target devices: iPhone 14 Pro Max, Pixel 7; PS tablet migration is workstream two (Step 4.5). Scope: 8 dances (Standard complete; Latin third workstream).

## Tech Stack
React (Vite) · Firebase Auth / Firestore / Hosting · vite-plugin-pwa (Workbox).

---

## Current State (cumulative)

- **Phase 1** complete (`v0.2.0`). **Phase 2a Steps 0–4** complete (unified pipeline, dance-namespaced keying, Needs Review bucket, rhythm column).
- **Phase 2b (Foxtrot + Quickstep)** complete (`v0.3.0-data`). **Tango routine audit** (`v0.3.1-data`). **All-bars rendering** (`v0.3.2-ui`). **Renames + Foxtrot #16 compound + `studioLevel` schema** (`v0.4.0-data`).
- **Session 4 (2026-07-26): PHASE 2B COMPLETE** (`v0.5.0-data`) — all four Standard dances audited against source. **114 audited / 1 parsed.**
- **Session 5 (2026-07-27): `studioLevel` VALUES ASSIGNED** (`v0.6.0-data`) — 10 placements, **Standard Needs Review bucket empty**.
- **Corrections logged to date (in `corrections[]`), unchanged this session:** Tango 18 across 16 figures · Foxtrot 17 across 10 · Quickstep 11 across 7 · Waltz 5 across 3.

---

## Next action — queue (updated)

1. **Ellever competitive capture** — **due now.** Scheduled by the 2026-07-25 Session Overview for week 1 of the three-week no-class window (opened 2026-07-25), *contingent on Phase 2b completing*; Phase 2b closed 2026-07-26, so the condition is met. Capture free material first: ellever.com UI screenshots, **the plan-sharing / assistant-side view specifically** (highest value — direct analogue of PS Live and the input to the Step 4.5b notes-scope ruling), pricing + trial terms, YouTube walkthroughs. Subscription go/no-go immediately after: buy only if the assistant-side view remains invisible from free material; one month max, cancel after the screenshot session. Dance Vision full capture stays deferred to the Phase 3 gate.
2. **`firebase-tools` pin** (decision #34) — small engineering task; `package.json` + `package-lock.json` diff review.
3. **Latin parse** — prerequisites: mid-bar heuristic upgrade; Latin pre-flight list (Status Overview §3.2); PDF tracking decision. **Read the gzip note below before writing any new source reader.**
4. **Option C gap-fill** (Quickstep 12 + Jive D-3).
5. **Standalone `Foxtrot/Outside Swivel` audit** — the last `parsed` figure; null-tier (now `studioLevel: 'Silver'`); unscheduled. **This is an audit, not a JOIN** (see session outcome 4).
6. **Auth QoL:** "Forgot password?" in AuthGate — pre-commercial requirement.

After-queue workstreams unchanged: **Step 4.5** (4.5a CSS pass — carries: orphaned `.bar-selector` CSS; dead `const bars` App.jsx ~92; optional-column design revisit; **Needs-Review visual treatment — now a design question about an *empty* bucket rather than a populated one**; PWA update prompt; 4.5b PS notes/D-1) → **dancecentral enrichment merge** (Decision #25) → **Latin**.

---

## Open items on Victor's side

- **CDTA review** — results land as `syllabusNotes` per decision #32. Open, unscheduled, non-blocking.

---

## Deferred / tracked issues (delta vs rev 7)

- ~~`studioLevel` value-assignment sitting~~ — **closed 2026-07-27 session 5** (ruled, executed, deployed, tagged `v0.6.0-data`).
- ~~`studioLevel` unrecognised-vocabulary handling~~ — **resolved by decision #31 + rider**: guard retained deliberately, rationale recorded above.
- **NEW — `firebase-tools` unpinned in the deploy path** — ruled (#34), **execution pending** (verified unexecuted at `3102bc5`). Until executed, deploys still run `npx --yes firebase-tools@latest`.
- **NEW — repo `docs/` handoff has diverged from this file.** Claude Code committed two independent handoff edits (`2e5be73` "post-rev-7 corrections — queue item 4 disambiguated", `3102bc5` "#31 rider — unrecognised-vocabulary guard RETAINED, failure direction corrected") while the planning layer was writing rev 8 separately. **Reconciled 2026-07-27:** Code read `3102bc5` and raised five load-bearing items; rev 8 was checked against all five and amended where it fell short — the immutable-`b864e9b`-message warning, the empirical basis (all six `targetLevel` settings), the "live not hypothetical" scope note, and the `effectiveLevel == null` predicate divergence were **added**; `#31` in the locked-decisions list was already present. **Resolution: this KB rev 8 is canonical** (KB-lag rule) — overwrite `docs/StudioPlanner_Handoff.md` wholesale, no merge, docs-only commit, no tag, no deploy. *Record correction: `3102bc5` was Code correcting its own inverted claim using the direction supplied in the planning-layer rider — not a refinement of Code's reasoning, as rev 8 initially supposed.*
- **gzip hazard in the source mirror.** `sources/.../waltz/closed_impetus.html` is gzip-compressed on disk, as are **18 of 21 Quickstep pages**. A reader that opens these as UTF-8 gets **zero tables and silently skips the figure** — it does not error. The shipped parsers gunzip (`readPage` checks for the `1f 8b` magic); any ad-hoc harness must too. **Relevant to Latin, which will need new readers.**
- **`ruledBy: 'dancecentral'`** introduced on the three `Fallaway Whisk` corrections, as the source-authority analogue of `'ballroomguide'`. Left standing; revisit if a single attribution convention is wanted.
- **`parse_bg_waltz.js` hardcodes the seven old Waltz keys** — must be updated before any Waltz **re-parse**. Blocks re-parse only, not audits. Still open.
- **No structured entry/exit ("preceding figure") data exists.** Surfaced this session: the `FIGURE_RICH_DATA` schema has no preceding/following field (`priorBgName` is *rename provenance*, not a preceding-figure field). Preceding-figure information exists only incidentally, inside three free-text follower `notes` in Waltz. Adding it would be a schema change and a separate ruling — **raised, not opened.** Whether the ballroomguide source pages carry such information unparsed is unverified (source mirror lives in the repo, not the KB).
- All other standing items unchanged: Option C gap-fill; Step 4.5 blockers; Silver swivel cluster; Tango #8 gap (`Open Reverse Turn, Lady in Line` — no BG page, no catalog entry); security pre-commercial items; licensing review; D-1; **Firebase CLI login expiry** (needed `firebase login --reauth` in session 4; *not* addressed by #34); Data Acquisition Brief retirement candidate; `handleBarToggle` lexicographic sort note.

---

## Key Files (delta vs rev 7)

| File | Status |
|---|---|
| `src/data.js` | Changed by session 5 (10 `studioLevel` values × 2 peer stores at `b864e9b`; comment-only `effectiveLevel` rider text added at `3102bc5`). **KB copy stale — refresh from HEAD (`aabfb18`), not from the tag.** |
| `src/App.jsx` | Unchanged this session per Code's report (no code change was required for #31). |
| `src/index.css` | Unchanged since `429dfc1`. |
| `package.json` / `package-lock.json` | **Unchanged — #34 not yet executed** (verified at `3102bc5`: no `firebase-tools` entry). Will change when it is. |
| `docs/StudioPlanner_Handoff.md` (repo copy) | **Diverged** — edited by Code at `2e5be73` and `3102bc5`. Overwrite with this rev 8; see tracked issues. |
| `StudioPlanner_WO_StudioLevel_Values.md` | **NEW** — this session's work order; upload to KB and commit to `docs/` as the execution record. |
| `StudioPlanner_WO_StudioLevel_Schema.md` | Fully discharged by this session (schema half at `v0.4.0-data`, values half at `v0.6.0-data`). Retained as record. |
| `StudioPlanner_Handoff.md` | This file (rev 8). |
| Everything else | As rev 7. |

---

## Notes for next session

- **Read at session start:** this handoff (rev 8) + `StudioPlanner_Session_Conduct_Review.md`.
- **Order:** standard pre-flight → Ellever capture (queue item 1, due now), or the `firebase-tools` pin first if Victor prefers a short Code task to open.
- **NDCC is the syllabus authority.** KB-lag rule and canonical-source rule stand — **this handoff outranks Code's internal memory files and any role-prompt content.** No accent policy exists. No Waltz re-parse until `parse_bg_waltz.js` is updated.
- **Do not delete the `studioLevel` unrecognised-vocabulary guard** — see the #31 rider.
- **Before writing any new source reader: handle gzip.**
- **Upload at session close:** this rev 8 + `StudioPlanner_WO_StudioLevel_Values.md` + refreshed `data.js` at `b864e9b`.
