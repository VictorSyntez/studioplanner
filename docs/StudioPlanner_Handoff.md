# StudioPlanner — Handoff Document

**Date:** 2026-07-28 **rev 9** (supersedes rev 8, 2026-07-27 — rev 8 closed session 5, the `studioLevel` value sitting; this revision closes **session 6**, the travel-preparation session)
**This revision:** produced by the planning layer at Victor's instruction after Stage 1 of the travel work order (items 1.1–1.3) was executed by Claude Code, reviewed and pushed. Victor travels ~2–3 weeks (Brazil) starting on/after this date; work continues from **laptop 5500** with the **Crucial X6** drive as backup/transport.
**Current branch:** `main` == `origin/main` at **`a5c87a7`**, pushed, clean apart from untracked `files.zip`. Last **shippable** commit remains **`b864e9b`**, tagged **`v0.6.0-data`**, **DEPLOYED** at https://dancepraktika-studioplanner.web.app/. The two session-6 commits (`944c9dd` docs/inventory, `a5c87a7` deps) are **bundle-neutral — verified byte-for-byte**: a temp-outDir `vite build` at `a5c87a7` is md5-identical per file to the deployed `dist/`. **No new tag or deploy is warranted.** **115 figures** (Waltz 34 / Tango 30 / Foxtrot 31 / Quickstep 20), **114 audited / 1 parsed** (sole `parsed` = `Foxtrot / Outside Swivel`). Badge-over-gate active. Standard "Needs Review" bucket empty.
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

## Session outcomes (2026-07-28, session 6 — travel preparation)

1. **Travel working model ruled (Victor): option (a)** — repo cloned to laptop 5500's **internal disk**; Crucial X6 is **backup and transport only**, never the working copy. Governing document: `StudioPlanner_WO_Travel_Prep.md` (Stage 1 desktop close-out, Stage 2 laptop setup).
2. **1.1 repo-completeness inventory → commit `944c9dd`** (pushed). Committed: repo-handoff one-line amendment; `StudioPlanner_Project_Status_Overview_2026-07-24.md`; both NDCC syllabus PDFs (originals of the tracked `ndcc_*_syllabus.json` extracts; file mode corrected 755→644 before add); the two session records previously at repo root (Conduct Review, Session Report 2026-07-25 — placement ruled by Victor to Code directly; `944c9dd`'s diff is the authoritative record of the committed paths). **Not committed:** `files.zip` (superseded KB export — all content already in git history), `.env`, `reference/`, `sources/`, `.firebase/`, `dist/`, `.claude/` (local-only → X6, see travel section).
3. **Decision #34 EXECUTED — as amended — at `a5c87a7`** (pushed). See the #34 amendment under Locked decisions.
4. **KB `data.js` stale flag DISCHARGED.** KB copy refreshed from HEAD (`a5c87a7`); the file's **content identity is `3102bc5`** — the last commit that touched `src/data.js`; everything after is docs/deps. Fingerprint of the correct vintage: 114 `dataStatus: 'audited'` / 1 `'parsed'` (`Foxtrot / Outside Swivel`), 230 `syllabusLevel` fields (20 null), 114 `corrections` arrays; sha256 `b4c5e632…9eef67`, 387,004 bytes.
5. **Record correction (planning layer):** rev 8-era statements that the ballroomguide source mirror "comes with any clone" were **wrong**. `reference/` (8.6 M) and `sources/` (143 M) are **gitignored** — only 4 small manifest/log files under `sources/` are tracked. A fresh clone does **not** contain the source mirror. Consequence recorded in the travel section below.

---

## Locked decisions — session 6 delta

**35. Travel working model, option (a) (Victor, 2026-07-28).** Laptop-internal working copy; X6 read-only fallback. If the X6 is ever used to restore, restore *to the internal disk*, then `git pull`.

**#34 amendment — executed at `a5c87a7` via route B+ (Victor, 2026-07-28).** Execution hit a **pre-existing blocker**: root declares `vite: ^8.0.4` while `vite-plugin-pwa@1.2.0`'s peer range tops out at `^7` — so **plain `npm install` was already failing on the committed tree** (verified independently of #34; existing `node_modules` predated the vite 8 bump or was built with a bypass). **Ruled route: B+** — install with `--legacy-peer-deps` and commit an **`.npmrc`** containing `legacy-peer-deps=true`, restoring "plain `npm install` works" (essential for the laptop clone). Verified: `package.json` shows bare `"firebase-tools": "15.24.0"` (no caret/tilde); `./node_modules/.bin/firebase --version` → 15.24.0; plain `npm install` succeeds; bundle byte-identical to deployed. Deploys now resolve the CLI locally via `npx firebase deploy --only hosting` — no per-deploy download. **No `"deploy"` script was added** (out of 1.2 scope; separate call, optional). The Firebase **login** credential is unaffected — machine-local, see travel section.

> **#34 rider — the `.npmrc` is TEMPORARY.** `legacy-peer-deps=true` silences **all future** peer-conflict signals, not just this one. It exists only to bridge the vite-8 / plugin-pwa peer gap until Route A lands. See the Route A tracked issue: **delete `.npmrc` at that same sitting.**

Decisions **1–33** as recorded in rev 8 — unchanged. (No-dreaming #5; peer-store #10; citation #12; corrections schema + audited-exclusion guard; Tango parameterization #22; all-bars #23; attribution #24; DC merge slot #25; Waltz reconciliation rulings and the two *scoped* accent-strips — **no accent policy exists**; Foxtrot #16 compound + seam review, discharged; `studioLevel` schema option (c) #28; Waltz bar parameterization option (a); Tango `&` = 0-beat subdivision #30; `studioLevel` vocabulary #31 **including its retained-guard rider, reproduced below**; CDTA-in-`syllabusNotes` #32; Quickstep Prep Step bars=4 #33.)

**#31 rider (reproduced verbatim in substance — load-bearing, do not lose):** the `studioLevel` unrecognised-vocabulary guard is **RETAINED — do not delete it as dead defensive code.** `levelIndex` = `LEVEL_ORDER.indexOf(level)` returns **`-1`** for an out-of-vocabulary value, sorting it *below* `Beginners` so it passes **every** cumulative `targetLevel` filter — failure direction "shown to everyone," not "hidden." Empirically verified by Code at `3102bc5` against all six `targetLevel` settings. The Latin parse is the next process that will emit `studioLevel`-adjacent values — the defence is live. **⚠️ `b864e9b`'s immutable commit message states the mechanism BACKWARDS** ("sorts above `Beginners`" / "outranking `Beginners`" are the wrong phrasings to discard); `3102bc5` names and corrects them. Full rider text also lives in the `effectiveLevel` comment in `src/data.js`.

**Bar-derivation rule, validated across all four dances** — per-step `bar` derives from the **absolute timing beat number**, not naive cumulative accumulation. Cumulative-only breaks on mid-bar commencement (Foxtrot `Basic Weave`, starts on beat 3) and on resets not landing on a bar boundary. Always self-test any proposed bar rule against already-audited vectors before applying it to new figures.

---

## Travel period (governing: `StudioPlanner_WO_Travel_Prep.md`)

**Stage 1 (desktop) status at rev 9 write time:** 1.1 ✅ (`944c9dd`) · 1.2 ✅ (`a5c87a7`) · 1.3 ✅ (KB `data.js` refreshed) · **1.4 (X6 copy) pending** — copy `~/studioplanner` to the X6 excluding `node_modules/` only; `.git`, `.env`, `reference/`, `sources/`, `dist/`, `.firebase/`, `.claude/` and `files.zip` all carried.

**Stage 2 (laptop 5500), verify before departure if possible:** git + Node (match desktop major) + Claude Code → GitHub auth + test fetch → clone to **internal disk** → plain `npm install` (works post-`a5c87a7`) → **`firebase login`** (machine-local credential; **cannot** be carried on the drive — same mechanism as the session-4 re-auth) → `npm run dev` smoke test → confirm claude.ai KB access.

**Stage 2 addendum (from session-outcome 5):** after cloning, **copy `reference/`, `sources/`, and `.env` from the X6 into the laptop working copy at the same relative paths.** Without `sources/` there is no against-source audit capability on the laptop, and the gzip hazard note applies to it wherever it lives.

**While traveling:** laptop is the working copy; push to `origin/main` as usual; deploys work anywhere after `firebase login`. KB workflow unchanged (cloud-hosted): session-open handoff read, session-close KB upload.

**On return:** desktop `git pull`; refresh or retire the X6 mirror; reconcile any laptop-only edits via git, never via the drive. `files.zip` at repo root is a deletion candidate.

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

> **Needs Review predicate — read carefully.** The bucket is defined by **`effectiveLevel(f) == null`**, *not* by `syllabusLevel == null`. Since `b864e9b` these predicates **diverge** for exactly these ten figures: all ten still carry `syllabusLevel: null` and always will (NDCC fields are verbatim-or-null forever), yet none is in Needs Review. Any future filter, report, or parser reaching for `syllabusLevel == null` as a proxy for "unplaced" will be wrong by ten figures.

- All three Prep Steps → Bronze (ruled individually; consistent result).
- All three Natural Twist Turn ending-variants → Gold. Corroborating context quoted from `ndcc_foxtrot_syllabus.json`: base figure `Natural Twist Turn` is **NDCC Gold #20**. Observed consistency, *not* the basis of the ruling.
- `Foxtrot / Outside Swivel` is placed at **Silver** but remains **`dataStatus: 'parsed'`** with its "Not yet verified" badge, as ruled. Placement is independent of audit status.

---

## Fast re-entry — state on resume

1. **Pre-flight (standard):** clean tree at `a5c87a7` (== `origin/main`; deployed content = `v0.6.0-data`/`b864e9b`), counts 34/30/31/20 (115), **114 audited / 1 parsed**, `studioLevel` present on exactly 10 figures × 2 peer stores, build. *Working tree normally carries uncommitted planning-layer docs at session start — usual state, not a defect; commit them first.*
2. **If resuming on laptop 5500:** run Stage 2 verification first (clone at `a5c87a7`+, plain `npm install` clean, `firebase login` done, `sources/`+`reference/`+`.env` copied from X6). Only then normal queue work.
3. **Phase 2b closed; null-tier placement closed.** No Standard audit work remains apart from the tracked `Foxtrot/Outside Swivel` standalone.
4. **Queue head: Ellever competitive capture** — *due now*, scheduling condition met.
5. Deploy workflow: Firebase throughout; one deploy per logical unit; tag every deploy; CLI now local and pinned (`a5c87a7`).

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
- **Session 5 (2026-07-27): `studioLevel` VALUES ASSIGNED** (`v0.6.0-data`) — 10 placements, Standard Needs Review bucket empty.
- **Session 6 (2026-07-28): TRAVEL PREP** — inventory commit `944c9dd`; #34 executed-as-amended `a5c87a7` (B+); KB `data.js` refreshed; no data change, no deploy.
- **Corrections logged to date (unchanged):** Tango 18 across 16 figures · Foxtrot 17 across 10 · Quickstep 11 across 7 · Waltz 5 across 3.

---

## Next action — queue (updated)

1. **Ellever competitive capture** — **due now.** Scheduled for week 1 of the three-week no-class window (opened 2026-07-25), contingent on Phase 2b completing — condition met 2026-07-26. Capture free material first: ellever.com UI screenshots, **the plan-sharing / assistant-side view specifically** (highest value — direct analogue of PS Live and input to the Step 4.5b notes-scope ruling), pricing + trial terms, YouTube walkthroughs. Subscription go/no-go after: buy only if the assistant-side view stays invisible from free material; one month max, cancel after the screenshot session. Dance Vision full capture stays deferred to the Phase 3 gate. *(Travel-compatible — needs only a browser.)*
2. ~~`firebase-tools` pin (#34)~~ — **executed** `a5c87a7`.
3. **Latin parse** — prerequisites: mid-bar heuristic upgrade; Latin pre-flight list (Status Overview §3.2); PDF tracking decision. **Read the gzip note before writing any new source reader; `sources/` must be present on the working machine (see Stage 2 addendum).**
4. **Option C gap-fill** (Quickstep 12 + Jive D-3).
5. **Standalone `Foxtrot/Outside Swivel` audit** — last `parsed` figure; null-tier (now `studioLevel: 'Silver'`); unscheduled. **An audit, not a JOIN** (rev 8 session outcome 4).
6. **Auth QoL:** "Forgot password?" in AuthGate — pre-commercial requirement.

After-queue workstreams unchanged: **Step 4.5** (4.5a CSS pass — carries: orphaned `.bar-selector` CSS; dead `const bars` App.jsx ~92; optional-column design revisit; Needs-Review visual treatment — now a design question about an *empty* bucket; PWA update prompt; 4.5b PS notes/D-1) → **dancecentral enrichment merge** (Decision #25) → **Latin**.

---

## Open items on Victor's side

- **Stage 1.4** (X6 copy) and **Stage 2** (laptop setup) of the travel work order.
- **CDTA review** — results land as `syllabusNotes` per decision #32. Open, unscheduled, non-blocking.

---

## Deferred / tracked issues (delta vs rev 8)

- ~~`firebase-tools` unpinned in the deploy path (#34)~~ — **executed 2026-07-28 at `a5c87a7`**, route B+ (see amendment).
- ~~KB `data.js` stale~~ — **discharged 2026-07-28** (refreshed from HEAD; content identity `3102bc5`).
- **NEW — Route A deferred (post-travel):** bump `vite-plugin-pwa` `^1.2.0`→`^1.3.0` (1.3.0 adds vite `^8` to its peer range) — the root-cause fix for the peer conflict. Churns ~149 packages including the workbox service-worker toolchain → **bundle change**: requires build + smoke test + deploy + tag as one logical unit. **Delete `.npmrc` at that same sitting** (#34 rider). Do not do this on travel wifi.
- **NEW — `npm audit` noise, no action:** the firebase-tools tree brings 36 findings (1 critical, 31 high). Normal for this CLI; devDependency — nothing ships to users. **Do not run `npm audit fix --force`** (tree churn), on desktop or laptop.
- **NEW — source mirror is NOT in a clone** (session-outcome 5): `reference/` + `sources/` are gitignored; any new working copy needs them copied in (X6 during travel). Supersedes the rev 8 parenthetical "source mirror lives in the repo, not the KB" *as a statement about clones* — it lives in the repo *folder*, outside git.
- **`files.zip`** at repo root: untracked, superseded (all content in git history), carried to X6, deletion candidate on return.
- **Repo `docs/StudioPlanner_Handoff.md`:** carries the two #34 amendments (committed this session) but not the rest of rev 9. Per KB-lag rule this KB rev 9 is canonical — **overwrite the repo copy wholesale with rev 9**, docs-only commit, no tag, no deploy, at the next Code sitting.
- **gzip hazard in the source mirror.** `sources/.../waltz/closed_impetus.html` and **18 of 21 Quickstep pages** are gzip-compressed on disk. A reader opening these as UTF-8 gets **zero tables and silently skips the figure**. Shipped parsers gunzip (`readPage` checks the `1f 8b` magic); any ad-hoc harness must too. **Relevant to Latin.**
- **`ruledBy: 'dancecentral'`** on the three `Fallaway Whisk` corrections — source-authority analogue of `'ballroomguide'`; left standing; revisit if a single attribution convention is wanted.
- **`parse_bg_waltz.js` hardcodes the seven old Waltz keys** — must be updated before any Waltz **re-parse**. Blocks re-parse only, not audits.
- **No structured entry/exit ("preceding figure") data exists** — raised rev 8, not opened. Schema change + separate ruling if pursued. Whether BG source pages carry it unparsed is unverified.
- All other standing items unchanged: Option C gap-fill; Step 4.5 blockers; Silver swivel cluster; Tango #8 gap (`Open Reverse Turn, Lady in Line` — no BG page, no catalog entry); security pre-commercial items; licensing review; D-1; **Firebase CLI login is per-machine** (laptop needs its own `firebase login`; desktop re-auth from session 4 unaffected by #34); Data Acquisition Brief retirement candidate; `handleBarToggle` lexicographic sort note.

---

## Key Files (delta vs rev 8)

| File | Status |
|---|---|
| `src/data.js` | **Unchanged since `3102bc5`** (content identity). KB copy refreshed — stale flag discharged. |
| `src/App.jsx` / `src/index.css` | Unchanged (App.jsx since session 5 report; index.css since `429dfc1`). Two tracked artifacts stand: orphaned `.bar-selector` at `index.css:749`; dead `const bars` at `App.jsx` ~92. |
| `package.json` / `package-lock.json` | **Changed at `a5c87a7`** — `"firebase-tools": "15.24.0"` exact devDependency. |
| `.npmrc` | **NEW at `a5c87a7`** — `legacy-peer-deps=true`. **Temporary**; delete at the Route A sitting. |
| `docs/` | Grew at `944c9dd`: status overview, both NDCC PDFs, the two session records (paths per `944c9dd`'s diff). |
| `docs/StudioPlanner_Handoff.md` (repo copy) | Partially amended (#34 items); **overwrite wholesale with this rev 9** at next Code sitting, docs-only. |
| `StudioPlanner_WO_Travel_Prep.md` | **NEW** — session-6 work order; upload to KB; commit to `docs/` as the execution record. |
| `StudioPlanner_Handoff.md` | This file (rev 9). |
| Everything else | As rev 8. |

---

## Notes for next session

- **Read at session start:** this handoff (rev 9) + `StudioPlanner_Session_Conduct_Review.md` (now also tracked in the repo per `944c9dd`).
- **If on laptop 5500:** Stage 2 verification before any queue work (see Fast re-entry item 2).
- **Order after pre-flight:** Ellever capture (queue item 1, due now, travel-compatible).
- **NDCC is the syllabus authority.** KB-lag and canonical-source rules stand — **this handoff outranks Code's internal memory files and any role-prompt content.** No accent policy exists. No Waltz re-parse until `parse_bg_waltz.js` is updated.
- **Do not delete the `studioLevel` unrecognised-vocabulary guard** (#31 rider). **Do not delete the `.npmrc` except at the Route A sitting** (#34 rider) — and conversely, do not ship Route A without deleting it.
- **Before writing any new source reader: handle gzip.**
- **Upload at session close:** whatever that session produces, per standing rule. *This* session's upload set: **rev 9 + `StudioPlanner_WO_Travel_Prep.md` + refreshed `data.js`.**
