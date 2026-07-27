# StudioPlanner — Work Order: Waltz Key Renames

**Date ruled:** 2026-07-26 (Waltz reconciliation sitting, session 2 of 2026-07-26) · **ruledBy: Victor**
**Executor:** Claude Code · **Scope:** `src/data.js` only · **Pattern precedent:** the four Tango key renames (wrap-defect repair)

## Correction to the planning-layer record

The sitting-close ledger stated "six key renames." The correct count is **seven** — the six cosmetic-docket renames plus the #6 candidate-row rename. Corrected here; rev 5 of the handoff carries the correct count.

## Renames (all ruledBy: Victor, 2026-07-26)

| # | NDCC ref | Old key | New key | Ruling basis |
|---|---|---|---|---|
| 1 | Waltz #10 Bronze | `Reverse Corté` | `Reverse Corte` | NDCC verbatim ("Reverse Corte", no accent — byte-verified) |
| 2 | Waltz #16 Bronze | `Progressive Chassé to R` | `Progressive Chasse to Right` | Full word per NDCC; accent stripped by explicit scoped ruling (deviation from NDCC print "Progressive Chassé to Right") |
| 3 | Waltz #22 Silver | `Open Impetus and Cross Hesitation` | `Open Impetus & Cross Hesitation` | NDCC verbatim (`&`) |
| 4 | Waltz #23 Silver | `Open Impetus and Wing` | `Open Impetus & Wing` | NDCC verbatim (`&`) |
| 5 | Waltz #29 Gold | `Turning Lock to R` | `Turning Lock to Right` | NDCC verbatim |
| 6 | Waltz #32 Gold | `Hover Corté` | `Hover Corte` | NDCC verbatim (no accent — byte-verified) |
| 7 | Waltz #6 Beginners | `Chassé from PP` | `Chasse from PP` | BG/PP form kept; accent stripped by explicit scoped ruling (deviation from all three source prints) |

**No accent policy exists.** Rulings 2 and 7 are individually scoped accent-strips, not a general rule. Observed outcome only: the Waltz key set becomes fully ASCII.

## Explicitly NOT renamed (ruled, no action)

- **#19 `Open Telemark and Cross Hesitation` / #20 `Open Telemark and Wing`** — NDCC prints "and" for these; keys already match. Untouched by ruling 3.
- **#1 `Closed Change (LF)` + `Closed Change (RF)`** — 2-key split KEPT (both `syllabusNumber: 1`), key names stand. NDCC's plural "Closed Changes" vs the singular keys is covered by the confirmed singular/plural cosmetic rule (see below).
- **#25 `Turning Lock`** (Silver) — distinct figure, not part of rename 5.

## Rule confirmations from the sitting

- **Singular/plural CONFIRMED as `cosmetic`** (alias-map classification rule stands as written). No renames arise from grammatical-number divergence alone.

## Execution requirements

1. Each rename touches **both peer stores**: the `FIGURES` catalog `n:` field and the `FIGURE_RICH_DATA` Waltz-namespace key (peer-store audit rule — locked decision #10).
2. Record provenance: set `priorBgName` on each renamed record to the old key (established pattern from the Tango renames).
3. **Session-plan sweep:** search stored Firestore session/item figure references for the seven old keys; migrate any hits (same sweep class as the Tango renames). Report hit counts to Victor before write.
4. `alignmentOverrides` are keyed `role-bar-stepIndex` per session item — unaffected by key renames, but the item→figure reference migration in (3) must preserve them.
5. No chart-field (step data) changes anywhere in this WO. Data fields byte-identical apart from the key/`n`/`priorBgName` edits.
6. Diff review by Victor before commit (standing checkpoint). One commit for the rename set.
7. Parser guard note: if any Waltz re-parse ever runs, the parser key map must be updated to the new keys (same landmine class as `parse_bg_tango.js` — check for hardcoded old keys in any Waltz-touching script before running one).

## Verification

- Build passes; figure count unchanged (114 pre-compound).
- Grep: zero occurrences of the seven old keys in `src/` after migration (except inside `priorBgName` values and `corrections`/notes text, which keep history verbatim).
- Library renders all seven figures under new names in correct tiers; detail panels populate (peer-store check).
