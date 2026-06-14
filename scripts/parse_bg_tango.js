#!/usr/bin/env node
// Phase 2a Step 2 — Parse Tango FIGURE_RICH_DATA from the ballroomguide archive.
// Clone of scripts/parse_bg_waltz.js (Step 1) with the deltas required for Tango:
//   • Source directory: sources/ballroomguide/workshop/standard/tango/
//   • Figure-set keying: derived programmatically from each page's <h2> title
//     (sans tier suffix), since data.js has no existing Tango entries.
//   • Table B layout differs from Waltz: 5 cols
//       Step_# | Timing | Rhythm | Position | Footwork
//     (Waltz had 6 — Tango has no Rise & Fall, no Sway, and a new Rhythm column.)
//   • Schema: adds `rhythm: 'S'|'Q'|'&'|''` per step (Tango-only). Waltz entries
//     are NEVER modified. `rise` and `sway` are emitted as '' for Tango.
//   • No OLD-data migration: this is a fresh parse (no prior Tango entries),
//     so no cbm extraction from old rise and no [migrated-from-rise: ...] markers.
//   • NDCC matching: figure-name → tier/number is done by exact comparison
//     against docs/ndcc_tango_syllabus.json. Fuzzy / unmatched are FLAGGED;
//     never guessed. Matched figures get syllabusLevel/syllabusNumber populated.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const ARCHIVE = path.join(ROOT, 'sources/ballroomguide/workshop/standard/tango')
const DATA_JS = path.join(ROOT, 'src/data.js')
const NDCC_JSON = path.join(ROOT, 'docs/ndcc_tango_syllabus.json')
const ANOMALIES_OUT = path.join(ROOT, 'docs/StudioPlanner_Phase2a_Step2_Tango_Anomalies.md')

// AUDIT_PRIORITY map for Tango — populated at Victor's §4 Checkpoint 2
// confirmation (2026-06-14) from the two multi-chart pages.
const AUDIT_PRIORITY = {
  'Chase':    'multi-chart page (21 tables); only canonical chart T0–T3 parsed; ~4 additional Man/Lady variant chart sets present in source',
  'Oversway': 'multi-chart page (40 tables); only canonical chart T0–T3 parsed; ~9 additional Man/Lady variant chart sets present in source',
}

// ─── Victor's Checkpoint 2 NDCC pairings (2026-06-13/14) ───────────────────
// Override map. Each entry carries NDCC tier/number/name and OPTIONALLY a
// `targetKey` — if present, the figure is renamed to that key in storage and
// the original BG name is recorded as `priorBgName` on the figure record.
// `note` is a human-readable rationale that goes into the anomaly report.
const NDCC_OVERRIDES = {
  // ── Renames to NDCC name ──────────────────────────────────────────────
  'Back Open Promenade':            { number: 16, ndccName: 'Back Open',                          tier: 'Silver',     targetKey: 'Back Open' },
  'Chase':                          { number: 24, ndccName: 'The Chase',                          tier: 'Gold',       targetKey: 'The Chase' },
  'Fallaway Promenade':             { number: 17, ndccName: 'Promenade Outside',                  tier: 'Silver',     targetKey: 'Promenade Outside' },
  'Four Step Change':               { number: 19, ndccName: 'Promenade Four Step',                tier: 'Silver',     targetKey: 'Promenade Four Step' },
  'Open Reverse Turn':              { number: 6,  ndccName: 'Open Reverse Turn, Lady Outside',    tier: 'Pre-Bronze', targetKey: 'Open Reverse Turn, Lady Outside' },

  // ── Closed Promenade: NDCC source name `'Closed'` is truncated; Victor's
  //    #1 decision resolved the truncation to `'Closed Promenade'`. Key kept
  //    as `'Closed Promenade'` (resolved name == BG name).
  'Closed Promenade':               { number: 4,  ndccName: 'Closed Promenade (resolves NDCC #4 truncation flag)', tier: 'Beginners' },

  // ── Tango-Tango anti-collision (multiple BG pages → one NDCC number) ──
  //    BG names retained because both share the same NDCC entry.
  'Left Foot Walk':                 { number: 1,  ndccName: 'Walk', tier: 'Beginners', note: 'BG kept — Tango-Tango collision: LF/RF Walks share NDCC #1' },
  'Right Foot Walk':                { number: 1,  ndccName: 'Walk', tier: 'Beginners', note: 'BG kept — Tango-Tango collision: LF/RF Walks share NDCC #1' },
  'Overturned Five Step':           { number: 26, ndccName: 'Five Step', tier: 'Gold', note: 'BG kept — Tango-Tango collision: shares NDCC #26 with Five Step' },

  // ── BG names that already match NDCC name (override included for clarity)
  'Change Brush Tap':               { number: 20, ndccName: 'Change Brush Tap',                   tier: 'Silver' },
  'Left Foot and Right Foot Rocks': { number: 11, ndccName: 'Left Foot and Right Foot Rocks',     tier: 'Bronze' },

  // ── Documented exception (Tango-Waltz orthographic collision) ─────────
  'Fallaway Reverse and Slip Pivot':{ number: 25, ndccName: 'Fallaway Reverse & Slip Pivot',     tier: 'Gold',
    note: 'EXCEPTION 1/2: BG `and` kept (would collide with Waltz key `Fallaway Reverse & Slip Pivot`)' },

  // ── Documented exception (Tango-Waltz identical-name collision, Option A) —
  //    Victor approved (2026-06-14): dance-qualified storage key for Tango;
  //    NDCC name preserved in priorBgName.
  'Contra Check':                   { number: 27, ndccName: 'Contra Check',                       tier: 'Gold',       targetKey: 'Contra Check (Tango)',
    note: 'EXCEPTION 2/2: dance-qualified key — Waltz already keys `Contra Check`; Victor-approved Option A (2026-06-14)' },
}

// BG title → data.js key rename (Victor's decision: "Change Brush Tap").
const KEY_RENAMES = {
  'Brush Tap': 'Change Brush Tap',
}

// Multiple BG pages consolidated into ONE figure with a per-file bar split
// (Victor: "create a bar split like in Change Steps" for LF/RF rocks).
const CONSOLIDATIONS = [
  { targetKey: 'Left Foot and Right Foot Rocks', sourceFiles: ['rock_LF.html', 'rock_RF.html'] },
]
const CONSOLIDATED_FILES = new Set(CONSOLIDATIONS.flatMap(c => c.sourceFiles))

// ─── HTML helpers (verbatim from Step 1 parser) ────────────────────────────
function readPage(file) {
  const buf = fs.readFileSync(path.join(ARCHIVE, file))
  const decoded = (buf[0] === 0x1f && buf[1] === 0x8b) ? zlib.gunzipSync(buf) : buf
  return decoded.toString('utf-8')
}
function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&#160;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
}
function stripTags(s) {
  // Decode entities BEFORE trim, per the Step 1 fix for trailing-&nbsp; join bugs.
  return decodeEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}
function parseTables(html) {
  const out = []
  for (const m of html.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/g)) {
    const rows = []
    for (const rm of m[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)) {
      const cells = []
      for (const cm of rm[1].matchAll(/<(?:th|td)[^>]*>([\s\S]*?)<\/(?:th|td)>/g)) cells.push(stripTags(cm[1]))
      rows.push(cells)
    }
    out.push(rows)
  }
  return out
}
function extractTitle(html) {
  const m = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)
  if (!m) return null
  return stripTags(m[1])
}
// "Left Foot Walk (PreBronze)" → { name: "Left Foot Walk", tier: "PreBronze" }
function splitTitle(title) {
  const m = title.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
  if (!m) return { name: title, tier: null }
  return { name: m[1].trim(), tier: m[2].trim() }
}

// Parse one Tango page → { Man: [src steps], Lady: [src steps] } using the
// FIRST 4 tables (standard Man-A, Man-B, Lady-A, Lady-B order; extra tables
// in multi-variant pages like chase.html / oversway.html are ignored here
// and the variant count is reported in anomalies).
function parsePage(file) {
  const html = readPage(file)
  const title = extractTitle(html)
  const tables = parseTables(html)
  if (tables.length < 4) throw new Error(`${file}: expected ≥4 tables, got ${tables.length}`)
  const variantCount = Math.max(0, Math.floor((tables.length - 4 - 2) / 4))  // rough; reported but not used
  const join = (a, b) => {
    // Table A (5 cols): Step_# | Steps | Turn | Alignment | Moving  (Moving dropped per Step 1.2)
    const aRows = a.slice(1).map(r => ({ step: r[0], foot: r[1], turn: r[2], alignment: r[3] /* drop r[4] moving */ }))
    // Table B (5 cols, Tango-specific): Step_# | Timing | Rhythm | Position | Footwork
    const bRows = b.slice(1).map(r => ({ step: r[0], timing: r[1], rhythm: r[2], position: r[3], footwork: r[4] }))
    const by = new Map()
    for (const r of aRows) by.set(r.step, { ...r })
    for (const r of bRows) by.set(r.step, { ...by.get(r.step), ...r })
    return [...by.values()]
  }
  return { title, variantCount, tableCount: tables.length, Man: join(tables[0], tables[1]), Lady: join(tables[2], tables[3]) }
}

// Bar derivation — increment when Timing resets to '1' (same heuristic as Waltz).
function assignBars(srcSteps, startBar) {
  let bar = startBar
  return srcSteps.map((s, i) => {
    if (i > 0 && s.timing && /^1(?!\d)/.test(s.timing)) bar += 1
    return { ...s, bar }
  })
}

// Build a corrected Tango step record. rise/sway are '' (no source columns).
// rhythm is the NEW Tango-only field — verbatim from source Rhythm column,
// with '&' preserved literally (not normalized).
function buildNewStep(srcStep) {
  return {
    bar:        srcStep.bar,
    timing:     srcStep.timing || '',
    foot:       srcStep.foot || '',
    alignment:  srcStep.alignment || '',
    turn:       srcStep.turn || '',
    footwork:   srcStep.footwork || '',
    sway:       '',                            // Tango: no Sway column in source
    position:   srcStep.position || '',
    rise:       '',                            // Tango: no Rise & Fall column in source
    cbm:        '',                            // Tango: no source for CBM yet (dancecentral Step 4)
    notes:      '',
    rhythm:     srcStep.rhythm || '',          // NEW — verbatim
  }
}

// ─── NDCC matching (figure-name → tier/number; never guess) ────────────────
function loadNdcc() {
  const j = JSON.parse(fs.readFileSync(NDCC_JSON, 'utf-8'))
  return j.figures
}
function matchNdcc(parsedKey, ndccList) {
  const exact = ndccList.find(e => e.ndccName === parsedKey)
  return exact || null
}

// ─── Serialization to JavaScript ───────────────────────────────────────────
function jsStr(s) {
  return "'" + (s ?? '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}
const STEP_FIELD_ORDER = ['bar','timing','foot','alignment','turn','footwork','sway','position','rise','cbm','notes','rhythm']
function serializeStep(s) {
  const parts = STEP_FIELD_ORDER.map(k => {
    const v = s[k]
    if (k === 'bar') return `bar: ${v}`
    return `${k}: ${jsStr(v)}`
  })
  return `      { ${parts.join(', ')} },`
}
function serializeRichFigure(key, fig) {
  const lines = []
  lines.push(`  ${jsStr(key)}: {`)
  lines.push(`    bars: ${fig.bars},`)
  const sl = fig.syllabusLevel == null ? 'null' : jsStr(fig.syllabusLevel)
  const sn = fig.syllabusNumber == null ? 'null' : String(fig.syllabusNumber)
  const sb = fig.syllabusBody == null ? 'null' : jsStr(fig.syllabusBody)
  lines.push(`    dance: 'Tango', category: 'Standard', syllabusLevel: ${sl}, syllabusNumber: ${sn}, syllabusBody: ${sb},`)
  lines.push(`    dataStatus: ${jsStr(fig.dataStatus)}, sources: [${fig.sources.map(jsStr).join(', ')}],`)
  if (fig.priorBgName) {
    lines.push(`    priorBgName: ${jsStr(fig.priorBgName)},`)
  }
  if (AUDIT_PRIORITY[key]) {
    lines.push(`    auditPriority: 'high', // ${AUDIT_PRIORITY[key]}`)
  }
  lines.push(`    leader: [`)
  for (const s of fig.leader) lines.push(serializeStep(s))
  lines.push(`    ],`)
  lines.push(`    follower: [`)
  for (const s of fig.follower) lines.push(serializeStep(s))
  lines.push(`    ],`)
  lines.push(`    techniqueNotes: '',`)
  lines.push(`  },`)
  return lines.join('\n')
}
// FIGURES['Tango'] catalog entry — minimal (name + dance + NDCC metadata).
// Step-detail summary fields (c/fw/al/sw/rise/notes) left empty; FIGURE_RICH_DATA
// is the source of truth for step content.
function serializeCatalogEntry(fig) {
  const sl = fig.syllabusLevel == null ? 'null' : jsStr(fig.syllabusLevel)
  const sn = fig.syllabusNumber == null ? 'null' : String(fig.syllabusNumber)
  const sb = fig.syllabusBody == null ? 'null' : jsStr(fig.syllabusBody)
  return `    { n: ${jsStr(fig.key)}, c: '', fw: '', al: '', sw: '', rise: '', notes: '', dance: 'Tango', category: 'Standard', syllabusLevel: ${sl}, syllabusNumber: ${sn}, syllabusBody: ${sb} },`
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
const anomalies = {
  blankTiming:        [],
  blankRhythm:        [],
  blankPosition:      [],
  multiChartPages:    [],     // chase.html, oversway.html — first chart used
  gzipped:            [],
  ndccExactMatches:   [],
  ndccBgNoMatch:      [],     // BG figures with no NDCC entry — null tier
  ndccNdccNoBg:       [],     // NDCC entries with no BG page — no rich data this run
  renames:            [],     // figures renamed BG → NDCC name (priorBgName recorded)
  waltzCollisions:    [],     // Tango keys that collide with Waltz keys
}

const ndccList = loadNdcc()
const files = fs.readdirSync(ARCHIVE).filter(f => f.endsWith('.html')).sort()

function buildRoleSteps(rows, role, figKey) {
  return rows.map((src, i) => {
    if (!src.timing) anomalies.blankTiming.push({ figure: figKey, role, step: i+1 })
    if (!src.rhythm) anomalies.blankRhythm.push({ figure: figKey, role, step: i+1 })
    if (!src.position) anomalies.blankPosition.push({ figure: figKey, role, step: i+1 })
    return buildNewStep(src)
  })
}

// 1) Parse every page EXCEPT those consumed by consolidations
const figures = []
for (const file of files) {
  if (CONSOLIDATED_FILES.has(file)) continue   // handled in consolidation pass below
  const raw = fs.readFileSync(path.join(ARCHIVE, file))
  if (raw[0] === 0x1f && raw[1] === 0x8b) anomalies.gzipped.push(file)
  const page = parsePage(file)
  let figKey = splitTitle(page.title || file.replace(/\.html$/, '')).name
  if (KEY_RENAMES[figKey]) figKey = KEY_RENAMES[figKey]
  if (page.tableCount > 6) {
    anomalies.multiChartPages.push({ file, title: page.title, tableCount: page.tableCount, key: figKey })
  }
  const manBarred = assignBars(page.Man, 1)
  const ladyBarred = assignBars(page.Lady, 1)
  const leader = buildRoleSteps(manBarred, 'leader', figKey)
  const follower = buildRoleSteps(ladyBarred, 'follower', figKey)
  const bars = Math.max(...leader.map(s => s.bar), ...follower.map(s => s.bar))
  figures.push({
    key: figKey, file, tier: splitTitle(page.title).tier,
    bars, leader, follower,
    dataStatus: 'parsed', sources: ['ballroomguide'],
    syllabusLevel: null, syllabusNumber: null, syllabusBody: null,
  })
}

// 2) Consolidations — multiple BG pages → one figure with a per-file bar split
for (const c of CONSOLIDATIONS) {
  const leader = []
  const follower = []
  c.sourceFiles.forEach((file, idx) => {
    const raw = fs.readFileSync(path.join(ARCHIVE, file))
    if (raw[0] === 0x1f && raw[1] === 0x8b) anomalies.gzipped.push(file)
    const page = parsePage(file)
    const bar = idx + 1
    const manStamped = page.Man.map(s => ({ ...s, bar }))
    const ladyStamped = page.Lady.map(s => ({ ...s, bar }))
    leader.push(...buildRoleSteps(manStamped, 'leader', c.targetKey))
    follower.push(...buildRoleSteps(ladyStamped, 'follower', c.targetKey))
  })
  figures.push({
    key: c.targetKey, file: c.sourceFiles.join(' + '), tier: null,
    bars: c.sourceFiles.length, leader, follower,
    dataStatus: 'parsed', sources: ['ballroomguide'],
    syllabusLevel: null, syllabusNumber: null, syllabusBody: null,
  })
}

// 3) NDCC assignment — overrides FIRST (so renames can happen), then auto-exact
for (const fig of figures) {
  const override = NDCC_OVERRIDES[fig.key]
  let info = null
  if (override) {
    info = { source: 'victor-override', ndccName: override.ndccName, tier: override.tier, number: override.number, note: override.note || null }
    if (override.targetKey && override.targetKey !== fig.key) {
      fig.priorBgName = fig.key
      fig.key = override.targetKey
      anomalies.renames.push({ priorBgName: fig.priorBgName, newKey: fig.key, ndccName: override.ndccName, number: override.number })
    }
  } else {
    const exact = matchNdcc(fig.key, ndccList)
    if (exact) info = { source: 'auto-exact', ndccName: exact.ndccName, tier: exact.syllabusLevel, number: exact.syllabusNumber, flag: exact.flag || null }
  }
  if (info) {
    fig.syllabusLevel = info.tier
    fig.syllabusNumber = info.number
    fig.syllabusBody = 'NDCC'
    anomalies.ndccExactMatches.push({ figure: fig.key, priorBgName: fig.priorBgName || null, ndccName: info.ndccName, tier: info.tier, number: info.number, source: info.source, note: info.note || null, flag: info.flag || null })
  } else {
    anomalies.ndccBgNoMatch.push({ figure: fig.key })
  }
}

// 4) Tango-Waltz collision verification — final sanity check.
// Read the current data.js text (must be at HEAD via `git restore` before this
// script runs) and collect Waltz-only keys by parsing each FIGURE_RICH_DATA
// block's `dance:` line. Any Tango key that matches a Waltz key would silently
// overwrite Waltz at runtime — those are flagged here.
{
  const text = fs.readFileSync(DATA_JS, 'utf-8')
  const waltzOnly = new Set()
  const blockRe = /^  '([^']+)':\s*\{\n    bars:[\s\S]*?\n    dance:\s*'([^']+)'/gm
  let bm
  while ((bm = blockRe.exec(text)) !== null) {
    if (bm[2] === 'Waltz') waltzOnly.add(bm[1])
  }
  for (const tk of figures.map(f => f.key)) {
    if (waltzOnly.has(tk)) {
      anomalies.waltzCollisions.push({ tangoKey: tk, waltzKey: tk, note: 'IDENTICAL key — would silently overwrite Waltz at runtime; documented exception required' })
    }
  }
}

// NDCC entries with no BG page (informational; post-overrides)
const matchedNdccNumbers = new Set(anomalies.ndccExactMatches.map(m => m.number))
for (const e of ndccList) {
  if (!matchedNdccNumbers.has(e.syllabusNumber)) {
    anomalies.ndccNdccNoBg.push({ ndccName: e.ndccName, tier: e.syllabusLevel, number: e.syllabusNumber, flag: e.flag || null })
  }
}

// ─── Splice into src/data.js (NEVER touching Waltz) ────────────────────────
const src = fs.readFileSync(DATA_JS, 'utf-8')

// 1. FIGURES['Tango'] — insert after FIGURES['Waltz'] closing `],` and before
//    the FIGURES `}` close. Pattern in current file:
//       …Waltz: [
//         …entries…
//       ],
//       }              <-- this `}` closes FIGURES
const figuresInsert = `  'Tango': [\n${figures.map(serializeCatalogEntry).join('\n')}\n  ],\n`
// Match the close of FIGURES = the FIRST `\n}\n` after the start of FIGURES.
const figStart = src.indexOf('export const FIGURES = {')
const figEnd = src.indexOf('\n}\n', figStart)
if (figStart < 0 || figEnd < 0) throw new Error("can't locate FIGURES block")
// Insert before `\n}\n` close
const srcWithFigures = src.slice(0, figEnd + 1) + figuresInsert + src.slice(figEnd + 1)

// 2. FIGURE_RICH_DATA — append before the final `}` of the file (FIGURE_RICH_DATA
//    is the last export and ends the file). Find the LAST `\n}\s*$` and insert
//    Tango blocks immediately before it.
const tangoRichBlock = figures.map(f => serializeRichFigure(f.key, f)).join('\n')
// The file ends with `...,\n  },\n}` — final `}` is the FIGURE_RICH_DATA close
// Find the position of the final `}` on its own line at end of file
const finalCloseMatch = srcWithFigures.match(/\n\}\s*$/)
if (!finalCloseMatch) throw new Error("can't locate final FIGURE_RICH_DATA close `}`")
const finalCloseIdx = srcWithFigures.length - finalCloseMatch[0].length
const finalSrc = srcWithFigures.slice(0, finalCloseIdx) + '\n' + tangoRichBlock + srcWithFigures.slice(finalCloseIdx)

fs.writeFileSync(DATA_JS, finalSrc)

// ─── Anomaly report (Step 1 format) ────────────────────────────────────────
const md = []
md.push(`# StudioPlanner — Phase 2a Step 2 (Tango) — Anomaly Report`)
md.push(``)
md.push(`Generated: ${new Date().toISOString().slice(0,10)}`)
md.push(``)
md.push(`## Summary`)
md.push(``)
md.push(`| Category | Count |`)
md.push(`|---|---|`)
md.push(`| Tango figures parsed | ${figures.length} |`)
md.push(`| Blank Timing cells | ${anomalies.blankTiming.length} |`)
md.push(`| Blank Rhythm cells | ${anomalies.blankRhythm.length} |`)
md.push(`| Blank Position cells | ${anomalies.blankPosition.length} |`)
md.push(`| Multi-chart pages (extra variants ignored) | ${anomalies.multiChartPages.length} |`)
md.push(`| NDCC — matches applied (auto-exact + Victor-confirmed) | ${anomalies.ndccExactMatches.length} |`)
md.push(`| NDCC — BG figures with no NDCC entry (null tier/number) | ${anomalies.ndccBgNoMatch.length} |`)
md.push(`| BG → NDCC name renames (priorBgName recorded) | ${anomalies.renames.length} |`)
md.push(`| Tango ↔ Waltz key collisions (documented exceptions) | ${anomalies.waltzCollisions.length} |`)
md.push(`| NDCC — NDCC entries with no BG page (no rich data this run) | ${anomalies.ndccNdccNoBg.length} |`)
md.push(`| Gzipped source files (auto-handled) | ${anomalies.gzipped.length} |`)
md.push(``)

function section(title, rows, fmt) {
  md.push(`## ${title}`); md.push(``)
  if (!rows.length) { md.push('_None._'); md.push(''); return }
  for (const r of rows) md.push(`- ${fmt(r)}`)
  md.push('')
}
section('NDCC — matches applied', anomalies.ndccExactMatches,
  r => `**${r.figure}** → tier=${r.tier} · number=${r.number} · *${r.source}* → NDCC \`${r.ndccName}\`${r.priorBgName ? '  (priorBgName: `'+r.priorBgName+'`)' : ''}${r.note ? '  — '+r.note : ''}${r.flag ? '  ⚠ '+r.flag : ''}`)
section('NDCC — ballroomguide figures with no NDCC entry (null tier/number; standalone)', anomalies.ndccBgNoMatch,
  r => `**${r.figure}**`)
section('NDCC — NDCC Tango entries with no ballroomguide page (no rich data this run)', anomalies.ndccNdccNoBg,
  r => `**${r.ndccName}** (${r.tier} · #${r.number})${r.flag ? '  ⚠ '+r.flag : ''}`)
section('BG → NDCC name renames (priorBgName field set on the figure record)', anomalies.renames,
  r => `\`${r.priorBgName}\` → \`${r.newKey}\` (NDCC #${r.number}: \`${r.ndccName}\`)`)
section('Tango ↔ Waltz key collisions (documented exceptions)', anomalies.waltzCollisions,
  r => `**\`${r.tangoKey}\`** also exists as a Waltz key — ${r.note}`)
section('Multi-chart pages (extra Man/Lady variants present; only first chart parsed)', anomalies.multiChartPages,
  r => `**${r.file}** — "${r.title}" — ${r.tableCount} tables (canonical chart = T0..T3)`)
section('Blank Timing cells in archive', anomalies.blankTiming,
  r => `**${r.figure}** / ${r.role} / step ${r.step}`)
section('Blank Rhythm cells in archive', anomalies.blankRhythm,
  r => `**${r.figure}** / ${r.role} / step ${r.step}`)
section('Blank Position cells in archive', anomalies.blankPosition,
  r => `**${r.figure}** / ${r.role} / step ${r.step}`)
md.push(`## Mechanical / handled`)
md.push(``)
md.push(`- **Tango Table B layout** differs from Waltz: 5 cols \`Step_# | Timing | Rhythm | Position | Footwork\` (no Rise & Fall, no Sway, NEW \`Rhythm\` column).`)
md.push(`- **Rhythm field** added to step-row schema (\`'S' | 'Q' | '&' | ''\`), stored verbatim — '&' is NOT normalized. Waltz entries left untouched (no \`rhythm\` key).`)
md.push(`- **\`rise\` and \`sway\`** emitted as \`''\` for every Tango step (no source columns).`)
md.push(`- **'Moving' column** (Table A col 5): parsed and discarded, per Step 1.2 decision.`)
md.push(`- **Gzipped files** auto-decompressed by parser: ${anomalies.gzipped.length ? anomalies.gzipped.join(', ') : 'none this run'}.`)
md.push(`- **No display-layer changes** this run: \`App.jsx\` untouched. \`OPTIONAL_COLS\` does NOT include \`rhythm\` — UI is a next-session task.`)
md.push(`- **No Waltz modifications:** Tango appended to \`FIGURES\` and \`FIGURE_RICH_DATA\` only; no Waltz entry touched.`)
md.push(`- **AUDIT_PRIORITY** for Tango: applied to \`Chase\` and \`Oversway\` (the two multi-chart pages) per Victor's checkpoint confirmation.`)
md.push(`- **Tango per-step \`notes\` are empty by design.** Ballroomguide Tango pages don't carry per-step coaching commentary; coaching enrichment is deferred to **Step 4 (dancecentral merge)**.`)
md.push(`- **Documented Tango↔Waltz exceptions:**`)
md.push(`  - \`Fallaway Reverse and Slip Pivot\` (Tango) keeps the BG \`and\` spelling — would collide with Waltz \`Fallaway Reverse & Slip Pivot\`.`)
md.push(`  - \`Contra Check (Tango)\` is a dance-qualified key (Victor-approved Option A, 2026-06-14) — NDCC name \`Contra Check\` preserved in \`priorBgName\`; Waltz \`Contra Check\` (#27) untouched.`)

fs.writeFileSync(ANOMALIES_OUT, md.join('\n'))
console.log(`Wrote: ${path.relative(ROOT, DATA_JS)}`)
console.log(`Wrote: ${path.relative(ROOT, ANOMALIES_OUT)}`)
console.log(`Tango: ${figures.length} figures parsed.`)
console.log(`NDCC: ${anomalies.ndccExactMatches.length} applied (auto+override), ${anomalies.ndccBgNoMatch.length} BG-no-NDCC, ${anomalies.ndccNdccNoBg.length} NDCC-no-BG.`)
