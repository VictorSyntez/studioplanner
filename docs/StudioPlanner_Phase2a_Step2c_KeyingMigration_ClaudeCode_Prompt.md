# StudioPlanner — Phase 2a Step 2c: Keying-Model Migration (Claude Code Work Order)

**Date:** 2026-07-18
**Baseline commit:** `898211a` (Tango Step 2)
**Decision (Victor, 2026-07-18):** **Option B — dance-namespaced rich data.**
`FIGURE_RICH_DATA` becomes `{ 'Waltz': { ...34 figures }, 'Tango': { ...30 figures } }`.
Figure keys are clean NDCC names (BG name where unmatched). Cross-dance key collisions are permitted and meaningless — each dance is its own namespace. This **supersedes locked decision #7's two ad-hoc collision mechanisms** and resolves the open keying-model decision blocking Foxtrot.

**Scope guard:** This is a **structural/engineering migration only**. Zero dance-content changes — no timing, footwork, alignment, rise, sway, rhythm, notes, or NDCC tier/number values may change. The only key-string changes are the two Tango reverts specified in §2. Standing rule ("no dreaming") applies as always.

**No deploy this step.** Commit only — the deploy folds into the Step 2b micro-step that follows.

---

## §1 Pre-flight (report results, then proceed)

1. `git status` clean; `git log --oneline -3` — confirm HEAD is `898211a`. Record any divergence and STOP if diverged.
2. Verify live `data.js` state (KB-lag rule — the KB copy is known stale):
   - `FIGURE_RICH_DATA` is currently a **flat** object with 64 keys.
   - Per-dance counts by `dance` field: Waltz 34, Tango 30.
   - Tango entries carry `rhythm` and (where renamed) `priorBgName`.
   - Confirm the exact current key strings for the two collision exceptions by grep — expected: `Contra Check (Tango)` and `Fallaway Reverse and Slip Pivot`. Report the verbatim strings found; do not assume.
3. `npm run build` passes at baseline.
4. Grep **all** lookup/reference sites — do not trust line numbers from the KB copy:
   - `grep -n "FIGURE_RICH_DATA" src/ scripts/ -r`
   - `grep -n "kind: 'figure'" src/ -r` (item creation sites)
   - Check `seedData.js` for figure items.
   - Report the full site list before editing.

---

## §2 data.js migration

1. **Restructure** `FIGURE_RICH_DATA` from flat to dance-namespaced:
   ```js
   export const FIGURE_RICH_DATA = {
     'Waltz': { /* 34 entries, byte-identical content */ },
     'Tango': { /* 30 entries, byte-identical content except the two key renames below */ },
   }
   ```
   Group by each entry's existing `dance` field. Entry **contents unchanged** — this is a re-nesting, not a rewrite.
2. **Two Tango key reverts** (Victor-confirmed 2026-07-18):
   - `Contra Check (Tango)` → **`Contra Check`**. Keep `priorBgName` as-is (historical record).
   - `Fallaway Reverse and Slip Pivot` → **`Fallaway Reverse & Slip Pivot`** (`&` symbol, per Victor). If a `priorBgName` does not exist on this entry, add none — record the "and" spelling in the migration note in the handoff instead, not in data.
3. **Mirror both renames in `FIGURES['Tango']`** — update the corresponding `.n` values so `FIGURES` and `FIGURE_RICH_DATA['Tango']` keys match exactly. **Waltz `.n` values and Waltz rich-data keys: untouched.**
4. If any helper in `data.js` iterates `FIGURE_RICH_DATA` flat (e.g. `Object.keys(FIGURE_RICH_DATA)`), update it for the nested shape.

## §3 App.jsx lookup migration

1. Every `FIGURE_RICH_DATA[name]` lookup becomes `FIGURE_RICH_DATA[dance]?.[name]`.
2. **Dance context for lookups — item schema addition:**
   - At every figure-item **creation** site (library drag `onDragStart`, `handleTapAdd`, and any other found in §1.4): store `dance: fig.dance` on the item alongside `name`.
   - At every **lookup** site: resolve dance as `item.dance || 'Waltz'`. The `|| 'Waltz'` legacy default is **mandatory and permanent** — it is what keeps every existing Firestore session (all Waltz-era) resolving with zero data migration.
   - Components receiving `figureName` as a prop (e.g. the figure detail panel) also receive/derive the dance.
3. `seedData.js`: add explicit `dance: 'Waltz'` to figure items if trivially done; otherwise the legacy default covers it — note which path was taken.
4. **Do NOT touch the library tier-grouping logic** — that is the Step 2b micro-step, a separate commit.

## §4 Parser template + integrity-check updates

1. `scripts/parse_bg_tango.js` (the Foxtrot template): update its output/merge target to write into `FIGURE_RICH_DATA[dance]`, and remove/neutralize any flat-key collision-detection logic — under namespacing, cross-dance collision checks are obsolete. **Within-dance** duplicate-key detection stays.
2. Integrity check going forward: `Object.keys(FIGURE_RICH_DATA['Waltz']).length === 34`, `['Tango'] === 30`, plus total. Waltz md5 is void this step (re-nesting moves every line); per-dance counts + spot content diffs replace it.

## §5 Verification

1. `npm run build` passes.
2. Per-dance counts: Waltz 34 / Tango 30 / total 64.
3. **Content-integrity spot check:** for 3 Waltz + 3 Tango figures (include `Contra Check` and `Fallaway Reverse & Slip Pivot`), diff the entry bodies pre/post migration — must be identical except nesting/indent and the two key strings.
4. `npm run dev` smoke test: (a) open an **existing saved session** — legacy Waltz figure items resolve rich data via the `'Waltz'` default; (b) add a Tango figure from the library (any tier-visible one) — detail panel resolves; (c) confirm `Contra Check` and `Fallaway Reverse & Slip Pivot` appear with clean names.

## §6 Checkpoint — STOP for Victor

Present before commit:
- Full diff summary (`data.js`, `App.jsx`, `seedData.js`, `scripts/parse_bg_tango.js`).
- The §1.4 site list and how each was handled.
- §5 verification results.

**Wait for Victor's approval, then commit** with message:
`Phase 2a Step 2c: dance-namespaced FIGURE_RICH_DATA keying model (Option B); revert Tango collision-exception keys`

No deploy. Next action after commit: Step 2b micro-step (null-figure bucket + rhythm column + single deploy).

---

## §7 Records to update (this session's close)

- Handoff: replace locked decision #7 with the Option B rule; mark fast re-entry #4 RESOLVED; add `item.dance` (legacy default `'Waltz'`) to the data-model notes; note Waltz-md5 integrity check superseded by per-dance counts.
- Log in the Tango anomaly doc: both collision-exception mechanisms superseded 2026-07-18; "and"-spelling historical note for Fallaway.
