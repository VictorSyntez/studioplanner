# Next Session — Where We Left Off

_Last updated: 2026-04-11_

## What just shipped this session

- **Theme flipped to light.** `src/index.css` `:root` palette inverted; hardcoded dark values (role-gate gradient, shadows, danger text `#e88 → #b83030`, `.detail-summary` bg) patched.
- **Item Editor layout.** Desktop builder-tree panel is now `360px` (1.5× Library); Item Editor fills the rest. Library item and tree item fonts bumped (14px / 15px) with fixed line-heights to keep box sizes steady.
- **Step table redesign.** `FigureDetailPanel` now:
  - Renders **CBM** as its own column.
  - **Hides empty columns per role** — a column is shown only if that role's table has at least one non-`'--'` value for it. Count and Foot always show.
  - Renders **notes as a spanning row** below each count, aligned to the Foot column, with a single `•` prefix. Not a column.
  - Shows `'--'` for empty cells.
- **Data audit started.** `src/data.js` entry for **Open Impetus and Wing** replaced with cleanly-parsed source data (visually validated by user). Every other waltz figure still has the old schema.

## What needs doing next

1. **Finish the data audit (32 figures left).**
   - Source HTMLs: `reference/waltz/` (gitignored, not in repo — on local disk only, originally from `/media/victor/Crucial X6/…/DanceCentral/www.dancecentral.info/ballroom/international-style/waltz/`).
   - Parser: `scripts/parse_dc.js` — Node, no deps. Usage: `node scripts/parse_dc.js reference/waltz/<file>.html > /tmp/out.json`.
   - **Exclude:** `waltz-technique.html`, `waltz-choreography.html` (not figures).
   - **Split:** `waltz-closed-changes.html` contains TWO figures (Natural + Reverse closed change) that need to be emitted as separate FIGURE_RICH_DATA entries.
   - Final count: **33 figures.**
   - Workflow: batch-parse → diff against current `data.js` → user review → apply.

2. **Column width polish** in the step table. User noted "some issues with column widths" — the current `10ch` cap works for most figures but may not be right for every column. Address after seeing the table with a real variety of figures.

3. **iPhone test feedback.** User is testing with an iPhone user and will report issues.

## Schema decisions (locked, don't re-ask)

Each step object in `FIGURE_RICH_DATA[figureName].leader[]` / `.follower[]`:

```js
{ bar, count, foot, alignment, footwork, turn, sway, cbm, rise, notes }
```

- `cbm` is its own field. Values: `'CBM'` or `'--'`.
- `notes` is a single string, space-joined from all source `<ul>` bullets for that count. `'This is "X"'` labels are stripped (whole bullets AND prefixes).
- Empty fields use `'--'` sentinel (not `''`, not `null`).
- `techniqueNotes` stays at the figure level.

## How the renderer reads the schema

`FigureDetailPanel` in `src/App.jsx`:
- Always shows Count + Foot columns.
- Shows Alignment/Footwork/Turn/Sway/CBM/Rise only if that role's table has ≥1 non-`'--'` value for the column.
- Renders notes as a second `<tr>` below each step row, colSpan = totalColumns − 1, prefixed with `•`.

## Files you'll touch next session

- `src/data.js` — replace 32 remaining figure entries.
- `reference/waltz/` — source HTMLs (not in git; must already be on disk).
- `scripts/parse_dc.js` — the parser (tracked, safe).

## Useful commands

```bash
# Parse one figure to stdout
node scripts/parse_dc.js reference/waltz/natural-turn-waltz.html

# Dev server (live HMR)
npm run dev

# Production build (writes dist/)
npm run build

# Deploy to Firebase hosting
npx firebase deploy --only hosting    # or: firebase deploy --only hosting
```
