# StudioPlanner — Session Report — Saturday 2026-07-25

**Session outcome:** Phase 2b (Foxtrot + Quickstep) complete and deployed to production as `v0.3.0-data` (commit `ef3b0fd`), verified live.

---

## Executive summary

This session took Phase 2b from "method undefined" to "complete and deployed" in a single day: 49 figures audited against source (Foxtrot 29/30, Quickstep 20/20), 26 source-quality defects corrected, a systemic transcription defect in the NDCC citation base discovered and repaired, and the result shipped to production. The audit gained permanent infrastructure (corrections provenance, parser write-protection, a deterministic bar heuristic) and the app gained its first user-facing data-trust feature (the "Not yet verified" badge).

---

## 1. Pilot (method definition)

- Rulings: mode = **against-source** (side-by-side with ballroomguide charts); order = **routine-first**; execution environment = **Claude Code** (local archive).
- Pilot figures (6): Feather Step, Reverse Turn & Feather Finish, Hover Cross (Foxtrot); Progressive Chasse to Right, Tipple Chasse to Right, Running Right Turn (Quickstep). All 6 audited; commit landed.
- Flip criteria for `'parsed'` → `'audited'`: both roles' full step data reviewed against source; all flagged anomalies ruled; bar assignment confirmed or corrected.
- Pilot finding: provisional bars were wrong on 5 of 6 figures; source typos required corrections with no provenance mechanism — leading directly to Decisions A and B.

## 2. Adopted infrastructure decisions

- **Decision A (adopted):** per-figure `corrections: [{role, step, field, from, to, ruledBy, date}]` log + audited-exclusion guard in the parsers (audited figures preserved byte-identical on re-parse; fail-closed). Proven: parser re-run is a no-op on `data.js`. Commit `fb19397`.
- **Decision B (adopted):** beat-accumulation provisional-bar heuristic — each timing digit = 1 beat, S = 2, Q = 1, 4 beats/bar; unrecognized tokens (`&`, `S(S)`, `S(SS)`, `S(SSS)`, prep `12`, blanks) flag `bars: null` for Victor's ruling, never computed. Beat values Victor-confirmed for Foxtrot + Quickstep only; do not generalize without a new ruling.
- **Frozen-docs rule:** Phase 2a anomaly docs are frozen historical artifacts; parser re-runs must not regenerate them (Option A ruling).

## 3. Full pass (Phase C)

- 43 further figures audited; final distribution at close: **49 audited / 65 parsed** (Foxtrot 29 + Quickstep 20 audited; Waltz 34 + Tango 30 + Foxtrot #16 parsed). Commit `12636c0`.
- **26 corrections logged**, including 3 structural rebuilds (Natural Zig-Zag follower 6→5 steps; Six Quick Run follower rebuild; Quickstep Prep Step step-3 column shift). Roughly 1 figure in 2 carried at least one source defect — the against-source rigor is justified.
- Beat-accumulation heuristic validated: reproduced every clean bar split; only mid-bar-commencement figures (1 this pass) needed the timing-beat-number method. **Latin note:** expect more mid-bar figures; upgrade the heuristic before the Latin parse.
- **New schema convention — `syllabusNotes`:** CDTA cross-body annotations (Closed Impetus #10, Reverse Pivot #12: NDCC Pre-Bronze kept as binding tier, CDTA Bronze annotated).

## 4. NDCC wrap-defect discovery and correction

- The dancecentral alias-map task flagged suspicious NDCC strings; raster re-verification of the syllabus page (crop-and-enlarge) proved **long figure names wrap across printed lines** in the narrow columns; the JSON transcriptions had cut at line boundaries, corrupting number→name bindings.
- **Victor-ruled corrections (2026-07-25):**
  - Foxtrot #11–15: Top Spin · Hover Feather · **#13 Hover Telemark · #14 Natural Telemark (swapped)** · Hover Cross.
  - Tango #4–5: Closed Promenade · Rock Turn. Tango #16–20: Back Open Promenade · Outside Swivels · Fallaway Promenade · Four Step Change · Brush Tap.
- Consequences applied (commits `38bec5d`, rename/renumber commit, parser-defuse commit `7fc7d66`-range):
  - Tango null-tier count 4 → 2 (Rock Turn → Beginners #5; Outside Swivel → Silver #17). Remaining nulls: Point to Promenade Position, Reverse Outside Swivel.
  - Four corrupted Tango `data.js` keys renamed to real BG names (Back Open Promenade, Fallaway Promenade, Four Step Change, Brush Tap); `priorBgName` repointed to retired keys; transient #17 collision resolved (Fallaway Promenade → #18).
  - `parse_bg_tango.js` NDCC_MAP updated to the ruled bindings (landmine defused — a re-run would have reverted both correction commits); dry-run verified no-op.
  - Tango NDCC coverage gaps 3 → 1 (only #8 "Open Reverse Turn, Lady in Line" remains).
- **Documented convention:** Tango #1 (Walk LF/RF) and #26 (Five Step + Overturned Five Step) are intentional shared-number split mappings; uniqueness checks treat them as known exceptions.
- **Latin-entry lesson:** all future NDCC column extractions require an explicit wrap check (text-line count vs figure-number count per tier band).

## 5. Waltz NDCC extraction

- `docs/ndcc_waltz_syllabus.json` created: 32 figures (Beginners 6 / Pre-Bronze 3 / Bronze 7 / Silver 9 / Gold 7); two extraction passes agreed exactly; **zero wrap artifacts** — the only clean column of the four. Citation-rule hole for Waltz closed.
- Method note: true two-context blindness unavailable (subagents off); ordering-based protection used and honestly recorded in provenance.
- Six name divergences flagged for later ruling: Chassé from Promenade (no "Position" printed); Reverse Corte / Hover Corte (no accents); Silver and/& inconsistency (#19–20 vs #22–23); Turning Lock to R vs "to Right"; Progressive Chassé to R vs "to Right" (#16).

## 6. Dancecentral alias map

- Full four-dance inventory: 126 figure pages, mirror complete (0 nav-linked-but-missing). Doc: `StudioPlanner_DC_Alias_Map_Candidates.md` (initial commit `f913f29`; post-correction regen `0805903`).
- Post-correction state: the four predicted Tango puzzles collapsed to **exact**; BG↔NDCC axis now classified for all four dances. Waltz reconciliation: 24 exact / 6 cosmetic / 2 candidates (Closed Changes 1→2 split; Chassé from Promenade three-way naming) / 1 bg-only.
- Flagged classification judgment awaiting confirmation: Outside Swivel vs "Outside Swivels" placed in cosmetic under a new singular/plural rule.
- **D-3 evidence (recorded, decision deferred):** Quickstep — all 12 NDCC gaps have dedicated dancecentral pages (complete overlap); Foxtrot — 0 gaps, 7 dc-only pages are extra-syllabus; Waltz — all three sources agree on coverage; Tango — 1 remaining gap.

## 7. Deploy: badge-over-gate ruling and v0.3.0-data

- Planned deploy halted on Claude Code's correct refusal: **no audited/parsed gate existed in code** — deploying would have exposed all 65 parsed figures.
- **Victor's ruling: option (a), badge not gate**, with two amendments: (1) badge copy = **"Not yet verified"** (evidence-based, not "provisional"); (2) badge renders in the **PS execution view**, not just Library/detail panel. Implemented as the first `App.jsx` change since Step 2b; verified in the built bundle (badge on exactly 65 parsed / 0 of 49 audited).
- **Standing planning rule (Victor):** no unaudited Tango figures in PS-executed session plans until their audits land. Consequence: **Tango routine-figure audits move to the front of the next Phase 2b block.**
- Outward chain: pushed `e8e8c2d..ef3b0fd`, tagged **`v0.3.0-data`**, `firebase deploy --only hosting`, live bundle verified byte-identical to the tested build; badge string + CSS confirmed in served files.
- Victor's desktop verification: **passed** (Library, badges, tiers, renamed Tango figures). **PS view: not yet tested** — pending verification item, to close at/before the first PS-supervised session on the new version.
- Housekeeping: Firebase token expired mid-deploy (re-authed); CLI runs via `npx firebase-tools` — consider global install or a `deploy` npm script.

## 8. Open items carried forward (queue order)

1. **Handoff rev 3** — first action next session (this report is input).
2. **Tango routine-figure audits** (front of queue per badge ruling; "Tango Rocks" resolves to Rock Turn, Beginners #5).
3. **PS-view verification** on `v0.3.0-data` (pending, not a defect).
4. **Waltz reconciliation sitting** — 6 naming rulings + 2 candidate rows + singular/plural confirmation.
5. **Foxtrot #16 Outside Swivel compound JOIN** — Victor ruling on construction (Open Telemark + Open Natural Turn + Outside Swivel + Feather Ending, ~10 steps; dancecentral page is the cross-check).
6. **Null-tier schema decision** — options (a) permanent non-syllabus section / (b) fold into tiers / (c) separate `studioLevel` field (recommended). Standing interim comment in use: audit step data, keep null tiers untouched.
7. **Waltz + Tango Phase 2b audit** (64 figures).
8. **Latin parse** — prerequisite: mid-bar-commencement heuristic upgrade; budget hand-set bars for flagged tokens.
9. **Option C gap-fill** (Quickstep 12 + Jive D-3) — informed by the D-3 evidence above.
10. Auth quality-of-life: "Forgot password?" link in AuthGate (`sendPasswordResetEmail`) — required before commercial pilot.

## 9. Key commits (chronological, this session)

| Commit | Content |
|---|---|
| `fb19397` | Decision A: corrections schema + audited-exclusion guard |
| (Phase B) | Decision B: beat-accumulation heuristic + re-parse under guard |
| `12636c0` | Phase 2b full audit complete (49 audited) |
| `f913f29` | Alias-map doc initial commit + Waltz NDCC column |
| `38bec5d` | Wrap-defect corrections (JSONs + data.js bindings) |
| (rename) | Tango key renames + #17 collision resolution |
| (defuse) | `parse_bg_tango.js` NDCC_MAP corrected; dry-run no-op verified |
| `0805903` | Alias-map regen post-correction |
| `ef3b0fd` | Badge implementation; pushed; tagged `v0.3.0-data`; deployed |

---

*Prepared in the planning layer at session close, 2026-07-25. Input document for Handoff rev 3.*
