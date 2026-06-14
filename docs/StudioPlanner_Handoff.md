# StudioPlanner — Handoff Document

**Date:** 2026-06-12 (supersedes 2026-05-24)
**Current branch:** `main` — last commit `d54e694` (Phase 2a Step 0 complete)
**Deployed at:** https://dancepraktika-studioplanner.web.app/ (still `v0.2.0`; no deploy this session)
**Repo:** https://github.com/VictorSyntez/studioplanner

---

## Project Overview

StudioPlanner is a PWA for ballroom dance lesson planning and delivery. Teachers (MT role = Main Teacher) build session plans with warmup, main topics, and conclusion sections containing figures and TECs. A Practice Supervisor (PS role) can be linked via invite to view sessions during class (read-only execution).

**Target devices:** iPhone 14 Pro Max (iOS Safari) and Pixel 7 (Android Chrome)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Auth | Firebase Authentication (email/password) |
| Database | Cloud Firestore |
| Hosting | Firebase Hosting |
| PWA | vite-plugin-pwa (Workbox) |

---

## Current State

### Phase 1 — COMPLETE (`v0.2.0`, deployed 2026-05-24)
All Phase 1 features shipped: Firebase Auth/Firestore/PWA; desktop three-panel + mobile three-tab layouts; session builder (warmup / N mains / conclusion); drag-reorder; rich figure data with leader/follower steps, alignment grid, bar selector; NDCC syllabus metadata on all 33 Waltz figures; `targetLevel` tier dropdown + grouped/filtered Library; PS target-level badge; OP-9 display-layer pipe-split workaround. Commit-level record in the previous handoff revision.

### Phase 2a — Step 0 COMPLETE (this session, 2026-06-12)
Source acquisition done and committed (`d54e694`). See `StudioPlanner_ARCHIVE_PROVENANCE.md` and `StudioPlanner_Phase2a_Step0_Session_Summary_2026-06-12.md`.

- **ballroomguide** (PRIMARY STRUCTURAL): 314 files / 8.2 MB, from **Wayback raw `id_` captures** of `idans.nl/workshop` (live origin returned 522). Waltz = 33, matches `data.js` 1:1.
- **dancecentral** (ENRICHMENT): 419 files / 135 MB, live `wget --mirror`. All 8 dances (Foxtrot under `slow-foxtrot`).
- Archives gitignored (OQ-2 = manifest-only); manifests + cdx index + logs + provenance committed.

---

## Locked decisions (Phase 2a)

1. **Unified pipeline** — all 8 dances (incl. Waltz) take structural data from ballroomguide; dancecentral is enrichment only. **Supersedes roadmap A.3.**
2. **Existing Waltz notes are scraped** — Step 1 preserves them while re-parsing structural fields; dancecentral re-merge stays at Step 4.
3. **Structural source = Wayback** captures of idans.nl/workshop; live idans demoted to revive-and-reconcile.
4. **OQ-2 = manifest-only.**
5. **STANDING RULE: "No dreaming, no assumptions on dance content."** All dance content from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved (ballroomguide wins structural fields). Constrains dance content only, not pipeline/engineering reasoning.

---

## Next action — Phase 2a Step 1 (in Claude Code)

Unified-pipeline Waltz re-parse + OP-9 root fix. Opening prompt ready in `StudioPlanner_Phase2a_Step1_ClaudeCode_Prompt.md`. Launch with `claude --continue`; pause-after-each-commit pattern. Step 1 ends at the **Waltz before/after diff = Checkpoint 2** (highest-stakes review). Nothing non-Waltz parses until that diff is approved.

OP-9 scope note (from this session's `data.js` audit): contamination is broader than "CBM | rise". 301 rise fields total — 104 piped (tokens: `CBM` ×69, `-`/`--` ×29, `slight`/`slight CBM` ×4, `Sway(R)` ×2), 197 with no pipe but run-on technique text. Root fix = re-parse rise & fall from ballroomguide source, route technique fragments to `notes`/`cbm`, preserve existing scraped notes.

---

## Flags carried forward

- **Jive structural gap (D-3):** ballroomguide ~6 Jive pages; dancecentral ~30 available as backfill. Victor decides resolution path.
- **`foxtrot` ↔ `slow-foxtrot` alias:** seeded for Step 4 cross-source matching.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app — panels, builder, state, FigureDetailPanel (ranged reads: [1,223],[223,700],[700,1090]) |
| `src/index.css` | All styling |
| `src/firebase.js` | Firebase init, auth, Firestore CRUD |
| `src/data.js` | `FIGURES` (dance-keyed object), `FIGURE_RICH_DATA` (33 Waltz), helpers. Ends with `FIGURE_RICH_DATA` = current; `GLOSSARY` export present upstream (verify if dead code). |
| `firestore.rules` | Security rules |
| `sources/` | **Gitignored.** Source archives (ballroomguide, dancecentral) + manifests |
| `StudioPlanner_ARCHIVE_PROVENANCE.md` | Source origin, method, counts, gaps, OQ-2 (committed) |
| `StudioPlanner_Phase2a_Data_Acquisition_Brief.md` | Executable Phase 2a spec |
| `StudioPlanner_Phase2_Architecture_Roadmap.md` | Phase 2 data model + roadmap + gates |

---

## Repo-hygiene TODO (non-blocking)

- Continuity docs (this handoff, roadmap, `docs/`) are **untracked in git** — commit them.
- `.firebase/` → gitignore.
- Roadmap path duplication: `phase_2_architecture_roadmap.md` (root) vs. `docs/StudioPlanner_Phase2_Architecture_Roadmap.md` — pick one canonical location.

---

## Notes for next session

- **Resume at Step 1** in Claude Code using the ready prompt; stop at Checkpoint 2; bring the diff to the claude.ai Project for review if a second read is wanted.
- **App.jsx is large** — ranged reads required.
- **NDCC is the syllabus authority**, not CDF.
- After Step 1: regenerate the brief + roadmap in full to fold in the Waltz re-parse outcome (this session's deltas are captured in `StudioPlanner_KB_Update_Instructions_2026-06-12.md`).
