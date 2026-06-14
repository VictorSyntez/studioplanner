# StudioPlanner — Phase 2 Architecture & Roadmap (A+C)

**Date:** 2026-05-06
**Scope:** Data model (A) + Feature roadmap (C)
**Anchored to:** NDCC syllabus, cumulative Beginners→Bronze, 8 dances (Waltz, Tango, Foxtrot, Quickstep, Cha Cha, Rumba, Samba, Jive)
**Pilot context:** Dance Praktika internal use; commercialization gated on pilot validation
**PS role:** Fully subordinate (read-only execution of MT plan)

---

## Executive Takeaway

Architecture decisions for Bronze-cumulative scope are small: three new figure-fields, one new session-field, one helper-function refactor. Content acquisition is the binding constraint — scaling from 33 partially-audited Waltz figures to ~119 audited figures across 8 dances will dominate Phase 2 timeline. Engineering work is approximately two weekends; content audit is approximately three to six months at sustained pace.

The roadmap is therefore validation-gated rather than calendar-gated: ship Bronze Waltz cleanly, audit content steadily by dance, run a real pilot before any commercialization investment.

---

## Part A — Data Model

### A.1 Current state assessment

**What exists (iteration 2, WIP branch):**
- `FIGURES['Waltz']` — array of 20 Waltz figures with concise per-step data (counts, footwork, alignment, sway, rise/fall, notes).
- `FIGURE_RICH_DATA` — appended rich data for 33 parsed figures, with per-step leader/follower split, multi-bar support, coaching notes. Currently Waltz-only.
- `TEC_LIBRARY` — 16 technique/exercise/concept entries, mix of Standard and Waltz-specific.
- `Session` shape: `{id, title, date, time, studentNames[], sections[]}` where each section is one of `warmup`, `main`, `conclusion`, with items containing optional `alignmentOverrides` and `barsUsed`.
- Persistence: Firestore at `users/{uid}/sessions/{sessionId}`.

**What's missing for Bronze-cumulative scope:**
1. No `dance` field on figures (entire library is implicitly Waltz).
2. No `syllabusLevel` field — so no way to filter Bronze candidates from Silver/Gold figures already in the library.
3. No `syllabusNumber` field — can't sort figures in NDCC sequence (which matters for medal-test prep).
4. No `category` field — Standard vs. Latin distinction will be needed for UI grouping.
5. No `targetLevel` on sessions — can't constrain library view to a candidate's tier.
6. `FIGURES` is keyed by dance (`FIGURES['Waltz']`), which is awkward when dances are added: every consumer needs to know to iterate over keys.

### A.2 Coverage gap (verified against NDCC Appendix VI)

Cumulative-through-Bronze tier counts per dance:

| Dance | Beginners | Pre-Bronze | Bronze | Cumulative |
|---|---|---|---|---|
| Waltz | 6 | 3 | 7 | **16** |
| Tango | 5 | 4 | 4 | **13** |
| Foxtrot | 0 | 5 | 3 | **8** |
| Quickstep | 5 | 8 | 7 | **20** |
| Cha Cha | 5 | 4 | 6 | **15** |
| Rumba | 6 | 3 | 7 | **16** |
| Samba | 5 | 3 | 9 | **17** |
| Jive | 6 | ~4 | 6 | **~16** |
| **Total** | | | | **~121** |

Notes:
- **Foxtrot has no Beginners tier in NDCC** — it starts at Pre-Bronze. UI must not assume every dance has every tier.
- **Jive count is tentative** — PDF extraction had layout ambiguity around Pre-Bronze numbering. Verification needed against the NDCC source PDF directly.
- Reference: [NDCC Appendix VI (Ballroom)](https://www.dancesportcanada.ca/) and Appendix VII (Latin) — uploaded to project.

### A.3 Current Waltz library mapped to NDCC tiers

Of the 20 figures currently in `FIGURES['Waltz']`:

**Within Bronze-cumulative (keep, retag with `syllabusLevel`):**
| Figure | NDCC tier | NDCC # |
|---|---|---|
| Closed Change (RF/LF) | Beginners | 1 |
| Natural Turn | Beginners | 2 |
| Reverse Turn | Beginners | 3 |
| Natural Spin Turn | Beginners | 4 |
| Whisk | Beginners | 5 |
| Chassé from PP | Beginners | 6 |
| Closed Impetus | Pre-Bronze | 7 |
| Hesitation Change | Pre-Bronze | 8 |
| Outside Change | Pre-Bronze | 9 |
| Back Whisk | Bronze | 11 |
| Double Reverse Spin | Bronze | 13 |
| Back Lock | Bronze | 15 |
| Progressive Chassé to R | Bronze | 16 |

**Above Bronze (hide from active library; retain in code, gate by `syllabusLevel`):**
- Outside Spin (Silver, NDCC 24)
- Drag Hesitation (Silver, NDCC 21)
- Turning Lock (Silver, NDCC 25)
- Contra Check (Gold, NDCC 27)
- Hover Corté (Gold, NDCC 32)
- Fallaway Reverse & Slip Pivot (Gold, NDCC 30)

**Missing from `FIGURES['Waltz']` but required for Bronze:**
- Reverse Corte (Bronze, NDCC 10)
- Basic Weave (Bronze, NDCC 12) — *may exist in `FIGURE_RICH_DATA` per project memory, needs verification*
- Reverse Pivot (Bronze, NDCC 14) — *may exist in `FIGURE_RICH_DATA` per project memory, needs verification*

### A.4 Recommended schema

**Figure shape (additions in bold):**

```javascript
{
  // existing
  n: 'Natural Turn',
  c: '1-2-3',
  fw: 'HT,T,TH',
  al: 'FDW,FW,BDC',
  sw: 'S,R,R',
  rise: 'Rise e/o 1, top 2&3, lower e/o 3',
  notes: 'CBM on 1. Body swings R. No sway on step 1.',

  // NEW
  dance: 'Waltz',                  // 'Waltz' | 'Tango' | 'Foxtrot' | 'Quickstep' | 'Cha Cha' | 'Rumba' | 'Samba' | 'Jive'
  category: 'Standard',            // 'Standard' | 'Latin'
  syllabusLevel: 'Beginners',      // 'Beginners' | 'Pre-Bronze' | 'Bronze' | 'Silver' | 'Gold' | 'Gold Star'
  syllabusNumber: 2,               // NDCC ordering, integer
  syllabusBody: 'NDCC'             // 'NDCC' (only authority for now; field exists for future)
}
```

**Session shape (addition):**

```javascript
{
  // existing
  id, title, date, time, studentNames[], sections[],

  // NEW
  targetLevel: 'Bronze'            // 'Beginners' | 'Pre-Bronze' | 'Bronze' | null
                                   // Library shows figures at or below this tier when set
}
```

`targetLevel` is optional. When unset, MT sees all figures (planning flexibility). When set, library is filtered to ≤ target tier (medal-test prep mode).

**`FIGURES` export restructure:**

Move from dance-keyed nested object:
```javascript
FIGURES = { 'Waltz': [...] }
```

To flat array with helpers:
```javascript
FIGURES = [
  { dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', n: 'Natural Turn', ... },
  ...
]

// Helpers in data.js
export function getFigures({ dance, maxLevel, category })
export function getFiguresForSession(session) // applies session.targetLevel filter
```

**Why flat:** adding new fields, filtering across dance/level/category, and migrating to Firestore later all become trivial. Dance-keyed nesting hard-codes a hierarchy that won't survive multi-tenancy.

### A.5 TEC linkage — flag, don't fix

The current model attaches TECs as `children` of figures inside session items. At ~119 figures, the same TEC (e.g., "Frame & Topline") will be referenced from dozens of figures. This works but couples session data to the figure-template's child list.

**Recommendation:** leave as-is for Phase 1 and 2. Revisit if Phase 3 surfaces cases where MTs want to override the default TEC list per session item, or where TEC documents themselves need to be edited centrally and re-flow to all sessions.

### A.6 Figure-template vs. session-instance compatibility — needs decision before Phase 2

Open question: when you correct a master figure (e.g., fix an alignment error in `data.js` Natural Turn), do existing saved sessions inherit the fix automatically, or stay frozen at the version they were when added to the session?

**Implications:**
- *Inherit:* Sessions always reflect current best understanding. Risk: an MT prints a session plan, comes back next week, finds the description has changed.
- *Freeze:* Sessions are stable artifacts. Risk: corrections don't propagate; many sessions accumulate stale data.

**Recommendation:** *Inherit by reference* in Phase 1–2 (sessions store figure name + tier + per-instance overrides like `alignmentOverrides`, but pull description/footwork live from the figure template). Add an explicit "frozen snapshot" mode only if Phase 3 surfaces real conflicts. This matches current behavior; making it explicit closes an ambiguity.

---

## Part C — Feature Roadmap

Validation-gated, four phases. Each phase has a clear gate before the next begins.

### Phase 1 — Bronze Foundation (close iteration 2)

**Engineering scope (~2 weekends):**

1. Schema migration on `data.js`:
   - Restructure `FIGURES` to flat array with helpers.
   - Tag all 20 existing Waltz figures with `dance`, `category`, `syllabusLevel`, `syllabusNumber`, `syllabusBody`.
   - Add Reverse Corte (NDCC 10).
   - Verify Basic Weave (NDCC 12) and Reverse Pivot (NDCC 14) — pull from `FIGURE_RICH_DATA` if present, parse from dancecentral.info if not.

2. Session schema:
   - Add `targetLevel` field with UI selector at session creation (default null = unrestricted).
   - Library panel filters figures when `targetLevel` is set.

3. Library UI:
   - Group by `category` (Standard / Latin), then by dance, then by `syllabusLevel`.
   - Sort within tier by `syllabusNumber`.
   - For Phase 1 only Waltz is populated, but the structure is in place.

4. Branch hygiene:
   - Resolve open design TODOs in handoff (font sizes, panel widths, column widths).
   - Verify iOS Safari behavior on iPhone 14 Pro Max (currently pending per handoff).
   - Merge `wip/mobile-active-main-and-conclusion-time` into `main`.
   - Deploy.

5. Decision on figure-template vs. session-instance compatibility (A.6 above) before Phase 2 begins.

**Phase 1 gate:** Run 3 Dance Praktika supervised-practice sessions on Waltz Bronze using the deployed app, no data-model regrets surfaced. Document any model issues; fix before Phase 2.

### Phase 2 — Multi-dance content (content-bound)

**This is the binding constraint of the entire project.** Per the handoff, 1 of 33 Waltz figures is currently audited. Phase 2 requires audited rich data for ~99 additional figures across 7 dances.

**Engineering scope (~1 weekend):**
- Per-dance dropdown in session builder.
- Per-dance icon/color treatment in library panel (parallel to current Waltz purple).
- Verify parser script (`scripts/parse_dc.js`) handles non-Waltz figure HTML structures from dancecentral.info.

**Content scope (~3–6 months at sustained pace):**

| Dance | Cumulative figures | Estimated audit time |
|---|---|---|
| Waltz | 16 (mostly done) | 2 weeks completion |
| Tango | 13 | 4 weeks |
| Foxtrot | 8 | 3 weeks |
| Quickstep | 20 | 6 weeks |
| Cha Cha | 15 | 4 weeks |
| Rumba | 16 | 4 weeks |
| Samba | 17 | 5 weeks |
| Jive | ~16 | 4 weeks |
| **Total** | **~121** | **~32 weeks worst-case** |

Audit times are tentative and assume current per-figure pace. Risks:
- **Source coverage:** dancecentral.info may not cover all 8 dances at the depth currently parsed for Waltz. Verify before committing schedule. If gaps exist, alternative sources are ISTD manuals or NDCC-referenced texts (Hearns, Hampshire).
- **Per-figure-rule special-casing:** project memory documents 7+ figure-specific parsing rules already needed for Waltz. Latin figures will likely need different rules entirely (different bar structures, different footwork notation).

**Phase 2 gate:** All 8 dances audited at Bronze-cumulative depth, deployed, used in Dance Praktika sessions for at least one full lesson cycle.

### Phase 3 — Pilot validation (3–6 months in production use)

**No new features.** Use the product. Track:

- **Coverage:** which figures are actually used in sessions; which are never used (candidates for removal or de-emphasis).
- **PS usability:** are PSes able to find what they need mid-class, or do they fall back to other reference?
- **MT planning time:** is StudioPlanner faster than the previous workflow? By how much?
- **Medal-test outcomes:** of Dance Praktika students who used StudioPlanner-planned sessions for Bronze prep, what's the test pass rate? Compare to historical baseline if available.
- **Friction log:** every time the app gets in the way, write it down.

**Phase 3 gate:** evidence-backed go/no-go on commercialization. Specifically: at least one external teacher (not at Dance Praktika) has expressed unprompted interest in using the tool, or there's a documented set of medal-test results that demonstrate measurable benefit.

### Phase 4 — Commercialization readiness (only if Phase 3 gate passes)

This phase is sketched, not specified. Scope only confirmed once Phase 3 evidence is in.

Likely workstreams:
- **Multi-tenancy:** studio accounts with multiple MTs, role hierarchy beyond MT/PS (e.g., studio admin).
- **Externalize figure library:** move from bundled `data.js` to Firestore. Lets corrections deploy without app rebuild. Necessary for ≥1 customer with custom figure additions.
- **Billing:** subscription, trial period, payment flow. Stripe via Firebase Extensions is likely the lowest-friction path.
- **Onboarding:** non-technical teachers must be able to sign up, link a PS, build their first session in <15 minutes.
- **Marketing surface:** landing page, demo video, NDCC/CDTA-aware positioning.

**Critical caveat:** none of Phase 4 should be invested in until Phase 3 produces real demand signal. The most common failure mode for vertical-SaaS-from-internal-tool is investing in commercialization before validation.

---

## Risks & Open Decisions

### Risks (in descending order of expected impact)

1. **Content audit pace dominates timeline.** At current rate, 8-dance Bronze coverage is ~32 weeks. If the parser needs significant rework for Latin dances, this slips further. Mitigation: batch by dance, track audit velocity weekly, replan if pace drops below ~3 figures/week sustained.

2. **dancecentral.info coverage gaps.** Tentative — needs verification. If dancecentral.info doesn't cover all 8 dances at depth, parser plus data source decisions need revisiting before Phase 2 commits.

3. **NDCC numbering ambiguity in source.** Jive Pre-Bronze numbering in the uploaded PDF is unclear. Verify against authoritative NDCC source before tagging.

4. **Phase 2 over-scope creep.** Once Bronze works, Silver looks tempting. Hold the line: Silver expands the library by another ~50%, audit work proportional. Defer until Phase 3 evidence justifies.

5. **Firestore invite spoofing.** Documented in earlier review: any authenticated user can create an invite with arbitrary `mtId`. Low risk in single-studio context, must be fixed before Phase 4. Mitigation: add `request.resource.data.mtId == request.auth.uid` to invite create rule.

### Decisions needed before Phase 2

| # | Decision | Recommendation |
|---|---|---|
| 1 | Figure-template vs. session-instance compatibility (A.6) | Inherit by reference; freeze only if Phase 3 surfaces conflicts |
| 2 | Verify dancecentral.info covers all 8 dances at depth | Spot-check before Phase 2 commits |
| 3 | Verify NDCC Jive numbering | Confirm against source PDF |
| 4 | Verify Basic Weave and Reverse Pivot presence in `FIGURE_RICH_DATA` | Direct check of data.js |

### Decisions deferred to Phase 4

- Multi-tenant data model (studio → MT → PS hierarchy).
- Externalization of figure library to Firestore.
- Per-session PS sharing (currently all MT sessions are visible to linked PS).
- Sharing with non-PS roles (students, parent organizations).

---

## Appendix: Schema migration checklist for Phase 1

- [ ] Restructure `FIGURES` from `{dance: [...]}` to flat `[...]`.
- [ ] Add helper `getFigures({dance, maxLevel, category})` in `data.js`.
- [ ] Add helper `getFiguresForSession(session)` that applies `session.targetLevel`.
- [ ] Tag all 20 existing Waltz figures with 5 new fields each (~30 minutes).
- [ ] Add Reverse Corte to Waltz Bronze.
- [ ] Verify and migrate Basic Weave + Reverse Pivot from `FIGURE_RICH_DATA`.
- [ ] Add `targetLevel` selector to session creation UI.
- [ ] Update library panel to filter by `targetLevel`.
- [ ] Update library panel to group by category → dance → tier.
- [ ] Update PS view to surface session's `targetLevel` in the breadcrumb.
- [ ] Resolve 4 open design TODOs from handoff (font, layout, column widths).
- [ ] iOS Safari verification on iPhone 14 Pro Max.
- [ ] Merge WIP → main, deploy.
- [ ] Run 3 supervised-practice pilot sessions; document any data-model regrets.

---

*This document is the canonical Phase 2 plan as of 2026-05-06. Update in place as decisions resolve.*
