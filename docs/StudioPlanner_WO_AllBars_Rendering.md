# StudioPlanner — Work Order: All-Bars Step Rendering (unified bar toggles)

**Date:** 2026-07-26 · **Prepared:** planning layer · **Executor:** Claude Code
**Baseline:** `c811da1` (`v0.3.1-data`), branch `main`
**Queue position:** inserted ahead of PS-view verification (Victor ruling 2026-07-26) — the verification runs once, against this corrected rendering, after deploy.
**Scope type:** UI/engineering only — `App.jsx` render logic. **No dance content is involved; `data.js` is untouched.**

---

## 1. Problem statement

`FigureDetailPanel` renders one bar at a time: bar tabs drive `activeBar`, and steps are filtered to `s.bar === activeBar`. This was invisible while figures sat at `bars: 1`, but the Phase 2b bar corrections split figures across real bars (e.g., Closed Promenade 1→2 bars, Progressive Side Step Reverse Turn 1→4), so the panel now shows only a slice of the figure — e.g., Closed Promenade opens showing 3 of its 4 steps. The data is correct; the per-bar viewer no longer fits it.

## 2. Ruled design (Victor, 2026-07-26 — confirmed point by point)

The bar tabs become **multi-select toggles unified with the item's `barsUsed`** — one mechanism, not two:

1. The step table displays **all toggled-on bars at once**, grouped in sequence (Bar 1 steps, then Bar 2, ...) — never one bar at a time.
2. **Toggling a bar off removes that bar's steps from the display** — this is the figure-splitting mechanism for connecting figures in routines.
3. **Default state: all bars on** — the complete figure prints in full on open.
4. The toggle state **is** `item.barsUsed` — today's separate view-tab (`activeBar`) and used-bar selector merge into one control. `activeBar` as a display concept is removed.
5. **PS view (read-only):** shows exactly the bars the MT toggled on for that item, all printed. The PS never sees a truncated slice of the scoped bars, and cannot change the toggles.
6. **Library / detail context outside a session item** (no `barsUsed` present): all bars, all steps, no toggles required to see everything.

## 3. Implementation constraints

- **Legacy default preserved:** items without `barsUsed` resolve to all bars (the existing `item.barsUsed || barNums` pattern) — mandatory, keeps all existing Firestore sessions rendering in full with zero migration.
- **`alignmentOverrides` are keyed role-bar-stepIndex.** Rendering multiple bars concurrently must apply each override to the correct bar's row — verify keying survives the change for both roles, including editable (MT) and read-only (PS) paths.
- Bar grouping in the table must visibly mark bar boundaries (heading row or equivalent — implementation's choice, minimal styling).
- Follower/leader tables both follow the same all-toggled-bars rendering.
- The badge logic (`dataStatus` → "Not yet verified") and all other panel content are untouched.
- Firestore schema unchanged — `barsUsed` array semantics are identical; only its UI representation changes.
- Pure `App.jsx` change expected (plus CSS if needed). If the change genuinely requires touching anything else, stop and report before doing it.

## 4. Verification (before commit)

1. **Closed Promenade (Tango):** opens showing all 4 steps, bars 1–2 grouped, both roles.
2. **Progressive Side Step Reverse Turn (Tango):** all steps across all 4 bars visible on open.
3. **Basic Weave (Waltz, bars: 2):** full 6-step render — confirms the fix isn't Tango-scoped.
4. Toggling bar 2 off on an item removes bar-2 steps from display and persists `barsUsed` to Firestore exactly as today.
5. A legacy item with no `barsUsed` renders all bars.
6. An item with an `alignmentOverride` on a bar-2 step shows the override on the correct row.
7. PS view of a session item with bars toggled shows exactly the toggled bars, read-only.
8. Single-bar figures (e.g., Back Whisk) render unchanged apart from the tab mechanics.
9. Build passes.

## 5. Checkpoints, commit, and close

1. One commit at completion, message referencing this WO; **pause for Victor's diff review** (non-negotiable).
2. Post-commit report: files touched, verification results 1–9, any deviations.
3. **Deploy is a separate Victor decision.** On deploy, PS-view verification (queue item 3) becomes actionable and covers this rendering plus the v0.3.1 badge state in one pass.

---

*Handoff rev 3 + the 2026-07-26 rulings recorded in this WO are canonical. On any conflict with live repo state, stop and report — do not reconcile silently.*
