# StudioPlanner — Phase 1 Implementation Brief

**Date:** 2026-05-06
**Audience:** Claude Code (executor); Victor (reviewer)
**Status:** All decisions resolved; ready to execute
**Source authority:** NDCC (National Dance Council of Canada) syllabus
**Branch baseline:** `wip/mobile-active-main-and-conclusion-time`

---

## 1. Purpose

Convert StudioPlanner from a Waltz-only prototype into a Bronze-medal-test-ready tool, by tagging the existing figure library with syllabus metadata and adding a tier-filter to the session builder. No new figure content required — all 16 NDCC Bronze-cumulative Waltz figures are already in `data.js` with full rich data.

## 2. Scope

**In:**
- Schema migration in `data.js` to support multi-dance, syllabus-tier-aware figures
- `targetLevel` filter on session creation and library view
- Library UI restructure: group by category → dance → tier
- Resolve 4 design TODOs carried from handoff
- iOS Safari verification on iPhone 14 Pro Max
- Merge WIP branch → `main`, deploy

**Out:**
- New figure content (Phase 2)
- Adding non-Waltz dances (Phase 2)
- Firestore externalization of figure library (Phase 4)
- Component decomposition / refactor (deferred)
- Audit/correction of FIGURE_RICH_DATA entries (handled reactively during pilot)

## 3. Resolved decisions

| # | Decision | Resolution |
|---|---|---|
| 1 | Master-figure vs. session-instance compatibility | Inherit by reference; corrections to master propagate to existing sessions automatically. Per-instance variations captured via existing `alignmentOverrides`. |
| 2 | Branch baseline | `wip/mobile-active-main-and-conclusion-time` |
| 3 | Bronze definition | Cumulative — Beginners + Pre-Bronze + Bronze (16 NDCC figures for Waltz) |
| 4 | Content gaps | None. All 16 Bronze-cumulative figures already in `data.js` and `FIGURE_RICH_DATA`. |
| 5 | Source authority | NDCC (not CDF). Use "NDCC" in code, UI, marketing. |
| 6 | Audit timing | Launch with parsed data; pilot use surfaces errors faster than desk review. |

## 4. Schema specifications

### 4.1 Figure shape — additions

All figures (in both `FIGURES` array and `FIGURE_RICH_DATA`) gain five new fields:

```javascript
{
  // EXISTING (unchanged)
  n: 'Natural Turn',
  c: '1-2-3',
  fw: 'HT,T,TH',
  al: 'FDW,FW,BDC',
  sw: 'S,R,R',
  rise: 'Rise e/o 1, top 2&3, lower e/o 3',
  notes: '...',

  // NEW
  dance: 'Waltz',                  // Phase 1: only 'Waltz' populated
  category: 'Standard',            // 'Standard' | 'Latin'
  syllabusLevel: 'Beginners',      // see LEVEL_ORDER below
  syllabusNumber: 2,               // NDCC ordering, integer
  syllabusBody: 'NDCC'             // constant for Phase 1
}
```

### 4.2 Session shape — addition

```javascript
{
  // existing fields unchanged
  targetLevel: null    // 'Beginners' | 'Pre-Bronze' | 'Bronze' | 'Silver' | 'Gold' | 'Gold Star' | null
}
```

- `null` = no filter (MT sees full library) — default for backward compatibility
- Set value = library shows figures with `syllabusLevel` ≤ `targetLevel` (cumulative)

### 4.3 FIGURES export restructure

**Before:**
```javascript
export const FIGURES = { 'Waltz': [...] }
```

**After:**
```javascript
export const FIGURES = [...]  // flat array, all figures across all dances

export const LEVEL_ORDER = [
  'Beginners', 'Pre-Bronze', 'Bronze', 'Silver', 'Gold', 'Gold Star'
]

export function levelIndex(level) {
  return LEVEL_ORDER.indexOf(level)
}

export function getFigures({ dance, maxLevel, category } = {}) {
  return FIGURES.filter(f => {
    if (dance && f.dance !== dance) return false
    if (category && f.category !== category) return false
    if (maxLevel && levelIndex(f.syllabusLevel) > levelIndex(maxLevel)) return false
    return true
  }).sort((a, b) =>
    levelIndex(a.syllabusLevel) - levelIndex(b.syllabusLevel) ||
    a.syllabusNumber - b.syllabusNumber
  )
}

export function getFiguresForSession(session) {
  return getFigures({ maxLevel: session.targetLevel || undefined })
}
```

### 4.4 NDCC tagging table — all 33 Waltz figures

Apply these tags to both legacy `FIGURES` array and `FIGURE_RICH_DATA` entries.

| Figure (as in data.js) | dance | category | syllabusLevel | syllabusNumber |
|---|---|---|---|---|
| Closed Change (RF) | Waltz | Standard | Beginners | 1 |
| Closed Change (LF) | Waltz | Standard | Beginners | 1 |
| Natural Turn | Waltz | Standard | Beginners | 2 |
| Reverse Turn | Waltz | Standard | Beginners | 3 |
| Natural Spin Turn | Waltz | Standard | Beginners | 4 |
| Whisk | Waltz | Standard | Beginners | 5 |
| Chassé from PP | Waltz | Standard | Beginners | 6 |
| Closed Impetus | Waltz | Standard | Pre-Bronze | 7 |
| Hesitation Change | Waltz | Standard | Pre-Bronze | 8 |
| Outside Change | Waltz | Standard | Pre-Bronze | 9 |
| Reverse Corté | Waltz | Standard | Bronze | 10 |
| Back Whisk | Waltz | Standard | Bronze | 11 |
| Basic Weave | Waltz | Standard | Bronze | 12 |
| Double Reverse Spin | Waltz | Standard | Bronze | 13 |
| Reverse Pivot | Waltz | Standard | Bronze | 14 |
| Back Lock | Waltz | Standard | Bronze | 15 |
| Progressive Chassé to R | Waltz | Standard | Bronze | 16 |
| Weave from PP | Waltz | Standard | Silver | 17 |
| Closed Telemark | Waltz | Standard | Silver | 18 |
| Open Telemark and Cross Hesitation | Waltz | Standard | Silver | 19 |
| Open Telemark and Wing | Waltz | Standard | Silver | 20 |
| Drag Hesitation | Waltz | Standard | Silver | 21 |
| Open Impetus and Cross Hesitation | Waltz | Standard | Silver | 22 |
| Open Impetus and Wing | Waltz | Standard | Silver | 23 |
| Outside Spin | Waltz | Standard | Silver | 24 |
| Turning Lock | Waltz | Standard | Silver | 25 |
| Left Whisk | Waltz | Standard | Gold | 26 |
| Contra Check | Waltz | Standard | Gold | 27 |
| Closed Wing | Waltz | Standard | Gold | 28 |
| Turning Lock to R | Waltz | Standard | Gold | 29 |
| Fallaway Reverse & Slip Pivot | Waltz | Standard | Gold | 30 |
| Fallaway Whisk | Waltz | Standard | Gold | 31 |
| Hover Corté | Waltz | Standard | Gold | 32 |

**Note:** Closed Change (RF) and Closed Change (LF) both map to NDCC #1 (Closed Changes), so both carry `syllabusNumber: 1`. UI sort within tier should be stable — ordering between RF and LF doesn't matter pedagogically.

---

## 5. Engineering steps

### Step 1 — Schema migration in `data.js` (~1 hour)

- Restructure `FIGURES` from `{Waltz: [...]}` to flat array.
- Apply tagging table (§4.4) to all 33 entries.
- Apply same tags to corresponding `FIGURE_RICH_DATA` entries (or merge into single source of truth — see below).
- Add `LEVEL_ORDER`, `levelIndex`, `getFigures`, `getFiguresForSession` helpers per §4.3.
- Update all import sites (search for `FIGURES['Waltz']` and `FIGURES.Waltz`).

**Optional consolidation:** `FIGURES` (concise) and `FIGURE_RICH_DATA` (detailed) currently store overlapping data for the same 33 figures. Recommended: merge into single source of truth where each entry contains both concise and rich fields. This is a refactor, not strictly Phase 1 — defer if time-constrained.

**Commit:** `feat(data): add syllabus metadata and flat FIGURES array`

### Step 2 — Session schema and creation UI (~1 hour)

- Add `targetLevel: null` to session creation default.
- Add tier dropdown to session creation form: options = `['Any', 'Beginners', 'Pre-Bronze', 'Bronze', 'Silver', 'Gold', 'Gold Star']`. "Any" maps to null.
- For backward compatibility: existing sessions without `targetLevel` field treated as null (no filter).

**Commit:** `feat(session): add targetLevel field with tier selector`

### Step 3 — Library UI restructure (~3 hours)

- Group library figures by `category` (Standard / Latin) → `dance` → `syllabusLevel`.
- Within tier, sort by `syllabusNumber`.
- Apply `targetLevel` filter when active session has one set: hide figures with `syllabusLevel > targetLevel`.
- Maintain current drag-and-drop, search, and figure-detail behavior.
- For Phase 1, only Standard → Waltz section is populated; structure must be in place for Phase 2.

**Commit:** `feat(library): group by category/dance/tier, apply session targetLevel filter`

### Step 4 — PS view header (~30 min)

- Show session's `targetLevel` in PS view header / breadcrumb when set.
- Format: small badge or text — e.g., "Bronze prep" or "Target: Bronze".

**Commit:** `feat(ps-view): surface session targetLevel in header`

### Step 5 — Resolve 4 design TODOs from handoff (~3 hours)

From handoff Section "Design & Readability":

1. Bigger font for tree items (`.tree-item-name`) without increasing box size.
2. Desktop layout: Item Editor dominates; Session/Builder panel = 1.5× Library width. Adjust `.mt-builder` grid.
3. Item Editor column widths: all columns before "Rise" limited to ~10 characters; Rise takes remaining space. Adjust `.step-table` / `.alignment-grid`.
4. Rise column last count: do not stretch full width unless content contains a dot.

**Commit:** `style(layout): tree font, desktop panel ratios, item editor columns`

### Step 6 — iOS Safari verification (~1 hour)

- Test on iPhone 14 Pro Max physical device.
- Verify: app loads, login works, builder is usable, PS view is usable, "Add to Home Screen" produces working PWA, PWA loads when offline (if previously visited).
- Document any issues found — minor issues fix in this step; substantial issues file as Phase 2 follow-ups.

**Commit (if fixes needed):** `fix(ios): [description of specific fix]`

### Step 7 — Branch merge and deploy (~30 min)

- Verify all changes work locally on Pixel 7 Android (existing testing path).
- Merge `wip/mobile-active-main-and-conclusion-time` → `main`.
- Build: `npm run build`.
- Deploy: `npx firebase-tools deploy --only hosting`.
- Smoke test deployed version: https://dancepraktika-studioplanner.web.app/

**Commit:** Merge commit on main; tag as `v0.2.0` or similar.

---

**Total Phase 1 engineering estimate: ~10 hours focused work, or 2 weekends realistically.**

## 6. Verification checklist

Before declaring Phase 1 complete, verify all of:

- [ ] Create a session with `targetLevel: 'Bronze'`. Library shows 17 Waltz figure entries (16 Bronze-cumulative; Closed Changes = 2 entries).
- [ ] Create a session with `targetLevel: null` (Any). Library shows all 33 Waltz figure entries.
- [ ] Within the library, figures are sorted Beginners → Pre-Bronze → Bronze etc., and within each tier by syllabusNumber.
- [ ] Existing sessions (created before migration) still load and display correctly.
- [ ] Drag-and-drop still works for all figure additions.
- [ ] PS view shows current `targetLevel` when set.
- [ ] Mobile (Android Pixel 7): library filter works; touch targets adequate.
- [ ] Mobile (iOS iPhone 14 Pro Max): library filter works; touch targets adequate; PWA installs.
- [ ] Linked PS account can read sessions per Firestore rules (no regression).
- [ ] Deployment to https://dancepraktika-studioplanner.web.app/ succeeds.
- [ ] First load on a fresh browser shows the seed session correctly.

## 7. Phase 1 gate (before starting Phase 2)

Run **3 supervised-practice Dance Praktika sessions** on Waltz Bronze using the deployed app. Document:

- Any data-model regrets (would I structure this differently in retrospect?)
- PS usability issues observed during practice
- MT planning friction points
- Errors found in figure data (note for Phase 2 audit work)

If gate passes, start Phase 2 (multi-dance content acquisition). If significant data-model issues surface, fix them before Phase 2 — schema changes get more expensive once 7 more dances are loaded.

---

## 8. How to use this brief with Claude Code

**Recommended workflow:**

1. Save this file to `~/studioplanner/docs/phase1_brief.md` (create `docs/` dir if needed).
2. Open terminal, navigate to project: `cd ~/studioplanner`
3. Launch Claude Code with continuity: `claude --continue` (or `claude --resume` to pick from list).
4. Paste this directive into Claude Code:

   > Implement the Phase 1 brief at `docs/phase1_brief.md`. Start with Step 1 (schema migration). After each step, run the relevant portion of the verification checklist (§6) and commit with the suggested message. Pause after Step 1 so I can review before proceeding to Step 2.

5. Review each commit before approving the next step.
6. After Step 7 (deploy), run the full verification checklist (§6).
7. Schedule and run the Phase 1 gate sessions (§7).

**When to come back to chat (claude.ai):**
- Major decisions Claude Code wants to defer (e.g., consolidation in Step 1).
- Unexpected schema conflicts.
- iOS issues that aren't trivial fixes.
- Phase 1 gate completion — for Phase 2 planning.

**When to stay in Claude Code:**
- Routine implementation.
- Bug fixes.
- Refactors that don't change scope.
- Local testing.

---

*This document is the canonical Phase 1 work order as of 2026-05-06. Update in place if scope or decisions change.*
