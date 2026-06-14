# StudioPlanner — Phase 2a Session Summary (Step 0 Acquisition)

**Date:** 2026-06-12
**Session focus:** Phase 2a kickoff — source acquisition (Step 0) and Step 1 preparation
**Outcome:** Step 0 **complete and committed** (`d54e694`). Stopped before Step 1 execution by choice; resuming at the Step 1 diff review (Checkpoint 2) next session.

---

## Executive summary

Phase 2a acquisition is done. Both source archives are in hand, manifested, and their provenance is committed to the repo (payloads gitignored per the OQ-2 decision). The session also produced a materially better plan than the brief started with: the structural source switched from the live ballroomguide mirror to a Wayback raw-capture archive after the live origin failed, and the OP-9 fix was reframed into a clean unified-pipeline re-parse. Step 1 is fully specified and ready to hand to Claude Code; it was deferred only because the diff review needs an attentive 2–3 hour block.

---

## Decisions locked this session

1. **Unified pipeline.** All 8 dances — Waltz included — take structural data (timing, rise & fall, sway, footwork, alignment) from ballroomguide; dancecentral is enrichment notes only, for every dance. Waltz is no longer a special case. *(Supersedes roadmap A.3 "Waltz canonical and untouched.")*
2. **Existing Waltz coaching notes are scraped, not hand-authored** (Victor confirmed) → Step 1 can re-parse structural fields cleanly while preserving existing notes; the dancecentral re-merge stays at Step 4.
3. **Structural source = Wayback raw captures of `idans.nl/workshop`.** Adopted after the live origin returned HTTP 522 (Cloudflare origin timeout). Live idans demoted to "revive-and-reconcile if it returns."
4. **OQ-2 resolved: manifest-only.** `sources/` gitignored; manifests + cdx index + logs + provenance doc committed.
5. **Standing rule registered (in memory + docs): "No dreaming, no assumptions on dance content."** All dance content comes from archives + Victor's confirmation; missing data flagged not interpolated; conflicts logged not silently resolved; constrains dance content only, not pipeline/engineering reasoning.

---

## What was done (Step 0)

- Pre-flight: confirmed wget 1.21.4, 296 GB free, `data.js` current (ends with `FIGURE_RICH_DATA`, 33 Waltz figures).
- URL probes: dancecentral live = 200 OK; idans.nl = **522** → triggered the Wayback contingency.
- **dancecentral** mirrored live via `wget --mirror` → 419 files, 135 MB, all 8 dances (Foxtrot filed under `slow-foxtrot`).
- **ballroomguide** acquired from Wayback: CDX query → newest 200/html capture per page → raw `id_` fetch. Initial pull was rate-limited (~50% ERR in bursts); recovered via idempotent gap-fill (`--retry` + backoff + 3s pacing). Final: **314 files, 8.2 MB**, completeness verified (expected 314 = present 314).
- Both trees manifested (sha256). Provenance documented in `StudioPlanner_ARCHIVE_PROVENANCE.md`.
- Commit `d54e694`: `.gitignore`, provenance doc, both manifests, cdx index, wget log (12,709 insertions; HTML payloads excluded).

## Final archive state

| Source | Role | Files | Size | Notes |
|---|---|---|---|---|
| ballroomguide (Wayback `id_`) | Structural | 314 | 8.2 MB | Waltz = 33, matches `data.js` 1:1 |
| dancecentral (live mirror) | Enrichment | 419 | 135 MB | All 8 dances; image-heavy |

Structural figure-page counts: Waltz 33 · Tango 31 · Foxtrot 31 · Quickstep 21 · Cha Cha 37 · Rumba 35 · Samba 45 · **Jive 6**.

---

## Flags carried forward (not blockers)

1. **Jive structural gap (D-3):** ballroomguide ~6 Jive pages vs. 30–45 others. dancecentral (~30 Jive pages) is the backfill. Resolution (enrich-only vs. promote dancecentral to structural fallback for Jive) is a Victor dance-content decision, logged.
2. **`foxtrot` ↔ `slow-foxtrot` alias:** first confirmed entry in the Step 4 cross-source alias map. Unambiguous → mechanical.
3. **26 http/https index duplicates** in `cdx_newest.txt` collapse to one file on disk. No corruption.

---

## Where we stopped / next action

Step 0 closed. **Next: Step 1** (unified-pipeline Waltz re-parse + OP-9 root fix) in **Claude Code** (`claude --continue`). Opening prompt is ready in `StudioPlanner_Phase2a_Step1_ClaudeCode_Prompt.md`. Step 1 stops at the **Waltz before/after diff (Checkpoint 2)** — the highest-stakes review of the weekend. Nothing non-Waltz parses until that diff is approved. Estimated ~30–45 min Claude Code execution to reach the diff, then 30–60 min Victor review.

## Open repo-hygiene threads (don't block Step 1)

- Continuity docs (`StudioPlanner_Handoff.md`, roadmap, `docs/`) are **untracked in git** — versioned only in KB. Worth a `docs:` commit.
- `.firebase/` should be gitignored.
- Roadmap path duplication: `phase_2_architecture_roadmap.md` (root) vs. `docs/StudioPlanner_Phase2_Architecture_Roadmap.md`. Pick one canonical location before the two environments edit different copies.
