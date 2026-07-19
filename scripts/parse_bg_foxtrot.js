#!/usr/bin/env node
// Phase 2a Step 3 — Parse Foxtrot FIGURE_RICH_DATA from the ballroomguide archive.
// Clone of scripts/parse_bg_tango.js (Step 2) under the locked namespaced schema
// (Option B, Step 2c). Deltas required for Foxtrot:
//   • Source directory: sources/ballroomguide/workshop/standard/foxtrot/
//   • Figure-set keying: derived programmatically from each page's <h2> title
//     (sans tier suffix), since data.js has no existing Foxtrot entries.
//   • Table B layout (VERIFIED FROM SOURCE — does NOT match the work-order §3.3
//     6-col spec): Foxtrot Table B has 7 columns, a HYBRID of Tango + Waltz:
//         Step_# | Timing | Rhythm | Position | Rise & Fall | Sway | Footwork
//     i.e. it carries BOTH Tango's `Rhythm` column AND Waltz's `Rise & Fall`
//     and `Sway`. All three are populated for Foxtrot (Tango left rise/sway '';
//     Waltz had no rhythm). Verbatim, uniform across all 31 source files.
//   • NEW Foxtrot rhythm token `S(S)` observed (Tango's set was S/Q/&) — stored
//     verbatim, NOT normalized (per §3.4: do not assume Foxtrot's token set).
//   • Waltz/Tango entries are NEVER modified. `cbm` and per-step `notes` are ''
//     (no source columns; coaching enrichment deferred to Step 4 dancecentral).
//   • NDCC matching: figure-name → tier/number by EXACT comparison against
//     docs/ndcc_foxtrot_syllabus.json ONLY. No overrides/renames/consolidations
//     are invented this pass — those come from Victor's §7 figure-by-figure
//     confirmation (mirrors the Tango Checkpoint-2 flow). Unmatched → null tier
//     ("Needs Review" bucket). Fuzzy near-matches are REPORTED as suggestions,
//     never applied.
//
// NOTE (bar derivation): Foxtrot timing tokens are beat-groupings within 4/4
// bars ("12","3","4","56","78"...). The inherited "timing resets to bare 1"
// bar heuristic fires INCONSISTENTLY for Foxtrot (some figures never reset,
// others reset mid-figure). Bars are therefore PROVISIONAL and flagged for the
// Phase 2b timing audit / Victor. Per-step `timing` is preserved verbatim and
// is the source of truth.

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const ARCHIVE = path.join(ROOT, 'sources/ballroomguide/workshop/standard/foxtrot')
const DATA_JS = path.join(ROOT, 'src/data.js')
const NDCC_JSON = path.join(ROOT, 'docs/ndcc_foxtrot_syllabus.json')
const ANOMALIES_OUT = path.join(ROOT, 'docs/StudioPlanner_Phase2a_Step3_Foxtrot_Anomalies.md')

const THIS_DANCE = 'Foxtrot'

// AUDIT_PRIORITY map for Foxtrot — EMPTY. Foxtrot has no multi-chart source
// pages (scan confirmed every file is a clean 6-table page: 4 step charts +
// "Commenced/Ended Facing" suggestion tables). Populated at Victor's §7
// confirmation only if needed.
const AUDIT_PRIORITY = {}

// ─── NDCC pairings — Victor's §7 rulings (2026-07-18, final & complete) ─────
// Keyed by the BG parsed figure name. `targetKey` renames the storage key to
// the NDCC/short form (BG original preserved as `priorBgName`); absent means
// the BG name IS kept as the key (only tier/number/ndccName assigned).
// #10 is handled separately as a two-page JOIN (see JOINS below), not here.
const NDCC_OVERRIDES = {
  // ── key == BG name (assign NDCC tier/number; BG name kept as key) ─────────
  'Reverse Turn & Feather Finish':   { number: 4,  ndccName: 'Reverse Turn ( incl. Feather Finish )', tier: 'Pre-Bronze' },
  'Closed Impetus & Feather Finish': { number: 5,  ndccName: 'Closed Impetus and Feather Finish',      tier: 'Pre-Bronze' },
  'Top Spin':                        { number: 11, ndccName: 'Top Spin Hover',                          tier: 'Silver' },
  'Hover Feather':                   { number: 12, ndccName: 'Feather Hover',                            tier: 'Silver' },
  'Natural Telemark':                { number: 13, ndccName: 'Telemark Natural',                         tier: 'Silver' },
  'Hover Telemark':                  { number: 14, ndccName: 'Telemark Hover',                           tier: 'Silver' },
  'Hover Cross':                     { number: 15, ndccName: 'Cross',                                    tier: 'Silver' },
  'Outside Swivel':                  { number: 16, ndccName: 'Open Telemark Outside Swivel and Feather Ending', tier: 'Silver' },
  'Fallaway Reverse & Slip Pivot':   { number: 23, ndccName: 'Fallaway Reverse and Slip Pivot',          tier: 'Gold' },
  // ── renames (targetKey ≠ BG name → priorBgName recorded) ─────────────────
  'Weave from Promenade Position':                   { number: 18, ndccName: 'Weave from PP',                     tier: 'Silver', targetKey: 'Weave from PP' },
  'Curved Feather to Back Feather & Feather Finish':  { number: 21, ndccName: 'Curved Feather to Back Feather',    tier: 'Gold',   targetKey: 'Curved Feather to Back Feather' },
  'Natural Zig-Zag from Promenade Position':         { number: 22, ndccName: 'Natural Zig-Zag from PP',           tier: 'Gold',   targetKey: 'Natural Zig-Zag from PP' },
  // NOTE: #17 'Open Impetus' resolves via auto-exact (BG name == NDCC name); no override needed.
}

// BG title → data.js key rename (pre-NDCC). None needed (renames handled via
// NDCC_OVERRIDES targetKey above).
const KEY_RENAMES = {}

// ── Sequential two-page JOINS (Victor's #10 ruling) ──────────────────────────
// Merge ordered BG pages into ONE figure: steps concatenated verbatim across
// the seam (NO invented transition content); bars continue across the seam
// (page N bars offset past page N-1). Seam continuity text from each page is
// captured and flagged for Victor. NDCC assignment applied via `ndcc`.
const JOINS = [
  {
    targetKey: 'Open Telemark & Feather Ending',
    priorBgName: 'Open Telemark + Feather Ending',
    sourceFiles: ['open_telemark.html', 'feather_ending.html'],
    ndcc: { number: 10, ndccName: 'Open Telemark and Feather Ending', tier: 'Silver' },
    note: "Victor-ruled JOIN (#10): two BG pages merged into one figure; steps concatenated across the seam, no invented transition content.",
  },
]
const CONSOLIDATIONS = []
const CONSOLIDATED_FILES = new Set([
  ...CONSOLIDATIONS.flatMap(c => c.sourceFiles),
  ...JOINS.flatMap(j => j.sourceFiles),
])

// ─── HTML helpers (verbatim from Step 1/2 parser) ──────────────────────────
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
// "Feather Step (PreBronze)" → { name: "Feather Step", tier: "PreBronze" }
function splitTitle(title) {
  const m = title.match(/^(.+?)\s*\(([^)]+)\)\s*$/)
  if (!m) return { name: title, tier: null }
  return { name: m[1].trim(), tier: m[2].trim() }
}

// Parse one Foxtrot page → { Man: [src steps], Lady: [src steps] } using the
// FIRST 4 tables (standard Man-A, Man-B, Lady-A, Lady-B order). Tables 5/6 are
// the "Commenced/Ended Facing" preceding/following-figure suggestion tables and
// are ignored.
function parsePage(file) {
  const html = readPage(file)
  const title = extractTitle(html)
  const tables = parseTables(html)
  if (tables.length < 4) throw new Error(`${file}: expected ≥4 tables, got ${tables.length}`)
  const join = (a, b) => {
    // Table A (5 cols): Step_# | Steps | Turn | Alignment | Moving  (Moving dropped per Step 1.2)
    const aRows = a.slice(1).map(r => ({ step: r[0], foot: r[1], turn: r[2], alignment: r[3] /* drop r[4] moving */ }))
    // Table B (7 cols, Foxtrot hybrid): Step_# | Timing | Rhythm | Position | Rise & Fall | Sway | Footwork
    const bRows = b.slice(1).map(r => ({ step: r[0], timing: r[1], rhythm: r[2], position: r[3], rise: r[4], sway: r[5], footwork: r[6] }))
    const aSet = aRows.map(r => r.step).filter(Boolean)
    const bSet = bRows.map(r => r.step).filter(Boolean)
    const by = new Map()
    for (const r of aRows) by.set(r.step, { ...r })
    for (const r of bRows) by.set(r.step, { ...by.get(r.step), ...r })
    // Order the union by numeric step# (so a B-only step interleaves correctly
    // rather than being appended out of order). Non-numeric keys sort last, stably.
    const rows = [...by.values()].sort((x, y) => {
      const nx = parseInt(x.step, 10), ny = parseInt(y.step, 10)
      if (Number.isNaN(nx) && Number.isNaN(ny)) return 0
      if (Number.isNaN(nx)) return 1
      if (Number.isNaN(ny)) return -1
      return nx - ny
    })
    return { rows, aSet, bSet }
  }
  return { title, tableCount: tables.length, Man: join(tables[0], tables[1]), Lady: join(tables[2], tables[3]) }
}

// Seam continuity labels for a JOIN page: table[4] header = "Commenced …",
// table[5] header = "Ended …" (the prose facing/moving summary rows).
function readSeamLabels(file) {
  const tables = parseTables(readPage(file))
  const commenced = tables[4] && tables[4][0] ? tables[4][0][0] : ''
  const ended = tables[5] && tables[5][0] ? tables[5][0][0] : ''
  return { commenced, ended }
}

// Bar derivation — inherited Tango heuristic (increment when Timing resets to a
// bare '1'). PROVISIONAL for Foxtrot (see file header note); flagged for audit.
function assignBars(srcSteps, startBar) {
  let bar = startBar
  return srcSteps.map((s, i) => {
    if (i > 0 && s.timing && /^1(?!\d)/.test(s.timing)) bar += 1
    return { ...s, bar }
  })
}

// Build a Foxtrot step record. Unlike Tango, rise/sway ARE populated (source
// has Rise & Fall + Sway columns). rhythm populated verbatim ('&'/'S(S)' NOT
// normalized). cbm/notes empty (no source; Step 4 dancecentral enrichment).
function buildNewStep(srcStep) {
  return {
    bar:        srcStep.bar,
    timing:     srcStep.timing || '',
    foot:       srcStep.foot || '',
    alignment:  srcStep.alignment || '',
    turn:       srcStep.turn || '',
    footwork:   srcStep.footwork || '',
    sway:       srcStep.sway || '',            // Foxtrot: Sway column present
    position:   srcStep.position || '',
    rise:       srcStep.rise || '',            // Foxtrot: Rise & Fall column present
    cbm:        '',                            // no CBM source column
    notes:      '',                            // no per-step notes (Step 4 dancecentral)
    rhythm:     srcStep.rhythm || '',          // Foxtrot: Rhythm column present, verbatim
  }
}

// ─── NDCC matching (figure-name → tier/number; EXACT only; never guess) ─────
function loadNdcc() {
  const j = JSON.parse(fs.readFileSync(NDCC_JSON, 'utf-8'))
  return j.figures
}
function matchNdcc(parsedKey, ndccList) {
  const exact = ndccList.find(e => e.ndccName === parsedKey)
  return exact || null
}
// Transparent normalization used ONLY to SUGGEST candidate pairings in the
// anomaly report (never applied to data). Lower-cases, expands PP→promenade
// position, unifies & / and, strips parenthticals/punctuation/extra words.
function normalizeForSuggestion(s) {
  return (s || '')
    .toLowerCase()
    .replace(/\(([^)]*)\)/g, ' $1 ')      // unwrap parentheticals ("( incl. feather finish )")
    .replace(/\bincl\.?\b/g, ' ')
    .replace(/\bpp\b/g, 'promenade position')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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
  lines.push(`    dance: '${THIS_DANCE}', category: 'Standard', syllabusLevel: ${sl}, syllabusNumber: ${sn}, syllabusBody: ${sb},`)
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
function serializeCatalogEntry(fig) {
  const sl = fig.syllabusLevel == null ? 'null' : jsStr(fig.syllabusLevel)
  const sn = fig.syllabusNumber == null ? 'null' : String(fig.syllabusNumber)
  const sb = fig.syllabusBody == null ? 'null' : jsStr(fig.syllabusBody)
  return `    { n: ${jsStr(fig.key)}, c: '', fw: '', al: '', sw: '', rise: '', notes: '', dance: '${THIS_DANCE}', category: 'Standard', syllabusLevel: ${sl}, syllabusNumber: ${sn}, syllabusBody: ${sb} },`
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
const anomalies = {
  blankTiming:        [],
  blankRhythm:        [],
  blankPosition:      [],
  blankFoot:          [],
  emptyRowsDropped:   [],     // fully-empty source rows (step# only) — dropped
  abStepMismatch:     [],     // Table A vs Table B step-number set mismatches
  newRhythmTokens:    [],     // Foxtrot rhythm tokens not in Tango's S/Q/& set
  gzipped:            [],
  ndccExactMatches:   [],
  ndccBgNoMatch:      [],     // BG figures with no exact NDCC entry — null tier
  ndccNdccNoBg:       [],     // NDCC entries with no exact BG page
  renames:            [],
  withinDanceDupes:   [],
  suggestions:        [],     // fuzzy near-match SUGGESTIONS (not applied)
  joinSeams:          [],     // #10-style two-page joins: seam continuity report
}
const TANGO_RHYTHM_SET = new Set(['S', 'Q', '&', ''])

const ndccList = loadNdcc()
const files = fs.readdirSync(ARCHIVE).filter(f => f.endsWith('.html')).sort()

const CONTENT_FIELDS = ['foot','turn','alignment','timing','rhythm','position','rise','sway','footwork']
function isEmptyRow(src) { return CONTENT_FIELDS.every(k => !src[k]) }
function buildRoleSteps(rows, role, figKey) {
  const out = []
  for (const src of rows) {
    // Drop fully-empty rows (a stray step# with no content in ANY A/B field —
    // a source parsing artifact, e.g. hover_cross Man step 8 = ["8"]). Mechanical
    // noise removal, reported so it is transparent and reversible.
    if (isEmptyRow(src)) {
      anomalies.emptyRowsDropped.push({ figure: figKey, role, sourceStep: src.step || '(none)' })
      continue
    }
    const sn = src.step || '?'
    if (!src.timing) anomalies.blankTiming.push({ figure: figKey, role, sourceStep: sn })
    if (!src.rhythm) anomalies.blankRhythm.push({ figure: figKey, role, sourceStep: sn })
    if (!src.position) anomalies.blankPosition.push({ figure: figKey, role, sourceStep: sn })
    if (!src.foot) anomalies.blankFoot.push({ figure: figKey, role, sourceStep: sn })
    if (src.rhythm && !TANGO_RHYTHM_SET.has(src.rhythm)) {
      anomalies.newRhythmTokens.push({ figure: figKey, role, sourceStep: sn, token: src.rhythm })
    }
    out.push(buildNewStep(src))
  }
  return out
}
// Report A/B step-number SET mismatches per role (a count-equal but misaligned
// join, e.g. zig_zag Lady A={1,2,3,5,6} vs B={1,2,3,4,5}). NOT auto-resolved —
// dance content; surfaced for Victor.
function flagAbMismatch(figKey, role, page) {
  const a = new Set(page.aSet), b = new Set(page.bSet)
  const aOnly = page.aSet.filter(s => !b.has(s))
  const bOnly = page.bSet.filter(s => !a.has(s))
  if (aOnly.length || bOnly.length) {
    anomalies.abStepMismatch.push({ figure: figKey, role, aOnly, bOnly, aSet: page.aSet.join(','), bSet: page.bSet.join(',') })
  }
}

// 1) Parse every page EXCEPT those consumed by consolidations
const figures = []
for (const file of files) {
  if (CONSOLIDATED_FILES.has(file)) continue
  const raw = fs.readFileSync(path.join(ARCHIVE, file))
  if (raw[0] === 0x1f && raw[1] === 0x8b) anomalies.gzipped.push(file)
  const page = parsePage(file)
  let figKey = splitTitle(page.title || file.replace(/\.html$/, '')).name
  if (KEY_RENAMES[figKey]) figKey = KEY_RENAMES[figKey]
  flagAbMismatch(figKey, 'leader', page.Man)
  flagAbMismatch(figKey, 'follower', page.Lady)
  const manBarred = assignBars(page.Man.rows, 1)
  const ladyBarred = assignBars(page.Lady.rows, 1)
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

// 2) Consolidations — none this pass.
for (const c of CONSOLIDATIONS) {
  const leader = []
  const follower = []
  c.sourceFiles.forEach((file, idx) => {
    const page = parsePage(file)
    flagAbMismatch(c.targetKey, 'leader', page.Man)
    flagAbMismatch(c.targetKey, 'follower', page.Lady)
    const bar = idx + 1
    const manStamped = page.Man.rows.map(s => ({ ...s, bar }))
    const ladyStamped = page.Lady.rows.map(s => ({ ...s, bar }))
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

// 2b) JOINS — Victor's #10 ruling: concatenate ordered BG pages into ONE figure,
//     steps verbatim across the seam, bars continuing across the seam. Seam
//     continuity labels captured and flagged.
for (const j of JOINS) {
  const leader = []
  const follower = []
  let barOffset = 0
  const seam = { targetKey: j.targetKey, note: j.note, pages: [] }
  j.sourceFiles.forEach((file) => {
    const raw = fs.readFileSync(path.join(ARCHIVE, file))
    if (raw[0] === 0x1f && raw[1] === 0x8b) anomalies.gzipped.push(file)
    const page = parsePage(file)
    flagAbMismatch(j.targetKey, 'leader', page.Man)
    flagAbMismatch(j.targetKey, 'follower', page.Lady)
    const manBarred = assignBars(page.Man.rows, barOffset + 1)
    const ladyBarred = assignBars(page.Lady.rows, barOffset + 1)
    const lSteps = buildRoleSteps(manBarred, 'leader', j.targetKey)
    const fSteps = buildRoleSteps(ladyBarred, 'follower', j.targetKey)
    leader.push(...lSteps)
    follower.push(...fSteps)
    barOffset = Math.max(...lSteps.map(s => s.bar), ...fSteps.map(s => s.bar))
    const labels = readSeamLabels(file)
    seam.pages.push({ file, title: page.title, commencedLabel: labels.commenced, endedLabel: labels.ended, leaderSteps: lSteps.length, followerSteps: fSteps.length })
  })
  anomalies.joinSeams.push(seam)
  const bars = Math.max(...leader.map(s => s.bar), ...follower.map(s => s.bar))
  figures.push({
    key: j.targetKey, file: j.sourceFiles.join(' + '), tier: null,
    bars, leader, follower,
    dataStatus: 'parsed', sources: ['ballroomguide'],
    syllabusLevel: null, syllabusNumber: null, syllabusBody: null,
    priorBgName: j.priorBgName,
  })
  // Register the join's NDCC info so the standard assignment loop applies it
  // (key already equals targetKey → no rename; priorBgName already set above).
  NDCC_OVERRIDES[j.targetKey] = { number: j.ndcc.number, ndccName: j.ndcc.ndccName, tier: j.ndcc.tier, note: j.note }
}

// 3) NDCC assignment — overrides FIRST, then auto-EXACT only.
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
    anomalies.ndccBgNoMatch.push({ figure: fig.key, bgTier: fig.tier })
  }
}

// 4) Within-dance duplicate-key check (cross-dance collisions OBSOLETE post-2c).
{
  const seen = new Set()
  for (const f of figures) {
    if (seen.has(f.key)) {
      anomalies.withinDanceDupes.push({ key: f.key, note: 'DUPLICATE key within Foxtrot namespace — one entry will overwrite the other' })
    }
    seen.add(f.key)
  }
}

// NDCC entries with no exact BG page (informational; post-overrides)
const matchedNdccNumbers = new Set(anomalies.ndccExactMatches.map(m => m.number))
for (const e of ndccList) {
  if (!matchedNdccNumbers.has(e.syllabusNumber)) {
    anomalies.ndccNdccNoBg.push({ ndccName: e.ndccName, tier: e.syllabusLevel, number: e.syllabusNumber, flag: e.flag || null })
  }
}

// 4b) Fuzzy SUGGESTIONS for Victor (NOT applied). For each unmatched BG figure,
//     list NDCC-no-BG entries whose normalized form matches or contains it.
for (const bg of anomalies.ndccBgNoMatch) {
  const bn = normalizeForSuggestion(bg.figure)
  const cands = anomalies.ndccNdccNoBg
    .map(e => ({ e, en: normalizeForSuggestion(e.ndccName) }))
    .filter(({ en }) => en === bn || en.includes(bn) || bn.includes(en))
    .map(({ e }) => `#${e.number} ${e.tier}: ${e.ndccName}`)
  if (cands.length) anomalies.suggestions.push({ bg: bg.figure, candidates: cands })
}

// ─── Splice into src/data.js (dance-namespaced; generic per-dance logic) ────
const src = fs.readFileSync(DATA_JS, 'utf-8')

// 1. FIGURES['<dance>'] — insert-or-replace the dance's catalog array.
const catalogEntries = figures.map(serializeCatalogEntry).join('\n')
const existingCatalogRe = new RegExp(`  '${THIS_DANCE}':\\s*\\[[\\s\\S]*?\\n  \\],\\n`, 'm')
let srcWithFigures
if (existingCatalogRe.test(src)) {
  srcWithFigures = src.replace(existingCatalogRe, `  '${THIS_DANCE}': [\n${catalogEntries}\n  ],\n`)
} else {
  const figStart = src.indexOf('export const FIGURES = {')
  const figEnd = src.indexOf('\n}\n', figStart)
  if (figStart < 0 || figEnd < 0) throw new Error("can't locate FIGURES block")
  srcWithFigures = src.slice(0, figEnd + 1) + `  '${THIS_DANCE}': [\n${catalogEntries}\n  ],\n` + src.slice(figEnd + 1)
}

// 2. FIGURE_RICH_DATA[<dance>] — nested; insert-or-replace the dance block.
const richEntries = figures.map(f => serializeRichFigure(f.key, f)).join('\n')
const richEntriesNested = richEntries.split('\n').map(l => l ? '  ' + l : l).join('\n')
const danceBlockRe = new RegExp(`  '${THIS_DANCE}':\\s*\\{\\n[\\s\\S]*?\\n  \\},\\n`, 'm')
let finalSrc
if (danceBlockRe.test(srcWithFigures)) {
  finalSrc = srcWithFigures.replace(danceBlockRe, `  '${THIS_DANCE}': {\n${richEntriesNested}\n  },\n`)
} else {
  const finalCloseMatch = srcWithFigures.match(/\n\}\s*$/)
  if (!finalCloseMatch) throw new Error("can't locate final FIGURE_RICH_DATA close `}`")
  const finalCloseIdx = srcWithFigures.length - finalCloseMatch[0].length
  finalSrc = srcWithFigures.slice(0, finalCloseIdx) + `\n  '${THIS_DANCE}': {\n${richEntriesNested}\n  },\n` + srcWithFigures.slice(finalCloseIdx)
}

fs.writeFileSync(DATA_JS, finalSrc)

// ─── Anomaly report ────────────────────────────────────────────────────────
const md = []
md.push(`# StudioPlanner — Phase 2a Step 3 (Foxtrot) — Anomaly Report`)
md.push(``)
md.push(`Generated: ${new Date().toISOString().slice(0,10)}`)
md.push(``)
md.push(`## Summary`)
md.push(``)
md.push(`| Category | Count |`)
md.push(`|---|---|`)
md.push(`| Foxtrot figures parsed | ${figures.length} |`)
md.push(`| Blank Timing cells | ${anomalies.blankTiming.length} |`)
md.push(`| Blank Rhythm cells | ${anomalies.blankRhythm.length} |`)
md.push(`| Blank Position cells | ${anomalies.blankPosition.length} |`)
md.push(`| Blank Steps/Foot cells | ${anomalies.blankFoot.length} |`)
md.push(`| Empty source rows dropped (step# only, no content) | ${anomalies.emptyRowsDropped.length} |`)
md.push(`| **Table A vs B step-set mismatches (needs Victor)** | ${anomalies.abStepMismatch.length} |`)
md.push(`| Two-page JOINS applied (Victor's #10 ruling) | ${anomalies.joinSeams.length} |`)
md.push(`| New rhythm tokens (outside Tango S/Q/&) | ${anomalies.newRhythmTokens.length} |`)
md.push(`| NDCC — exact matches applied | ${anomalies.ndccExactMatches.length} |`)
md.push(`| NDCC — BG figures with no exact NDCC entry (null tier "Needs Review") | ${anomalies.ndccBgNoMatch.length} |`)
md.push(`| NDCC — NDCC entries with no exact BG page | ${anomalies.ndccNdccNoBg.length} |`)
md.push(`| Fuzzy near-match SUGGESTIONS (NOT applied) | ${anomalies.suggestions.length} |`)
md.push(`| BG → NDCC name renames applied | ${anomalies.renames.length} |`)
md.push(`| Within-Foxtrot duplicate keys | ${anomalies.withinDanceDupes.length} |`)
md.push(`| Gzipped source files (auto-handled) | ${anomalies.gzipped.length} |`)
md.push(``)

function section(title, rows, fmt) {
  md.push(`## ${title}`); md.push(``)
  if (!rows.length) { md.push('_None._'); md.push(''); return }
  for (const r of rows) md.push(`- ${fmt(r)}`)
  md.push('')
}
section('NDCC — exact matches applied (auto)', anomalies.ndccExactMatches,
  r => `**${r.figure}** → tier=${r.tier} · number=${r.number} · *${r.source}* → NDCC \`${r.ndccName}\`${r.flag ? '  ⚠ '+r.flag : ''}`)
section('NDCC — ballroomguide figures with NO exact NDCC entry (null tier — surface in "Needs Review")', anomalies.ndccBgNoMatch,
  r => `**${r.figure}**${r.bgTier ? '  (BG tier label: '+r.bgTier+')' : ''}`)
section('NDCC — NDCC Foxtrot entries with NO exact ballroomguide page', anomalies.ndccNdccNoBg,
  r => `**${r.ndccName}** (${r.tier} · #${r.number})${r.flag ? '  ⚠ '+r.flag : ''}`)
section('SUGGESTED pairings for Victor (NORMALIZED near-matches — NOT applied; confirm figure-by-figure)', anomalies.suggestions,
  r => `BG **${r.bg}**  ⇢  ${r.candidates.join('  |  ')}`)
md.push(`## Two-page JOINS (Victor's #10 ruling — seam continuity for review)`); md.push('')
if (!anomalies.joinSeams.length) { md.push('_None._'); md.push('') }
for (const s of anomalies.joinSeams) {
  md.push(`- **${s.targetKey}** — ${s.note}`)
  s.pages.forEach((p, i) => {
    md.push(`  - page ${i+1}: \`${p.file}\` ("${p.title}") — ${p.leaderSteps} leader / ${p.followerSteps} follower steps · Commenced: \`${p.commencedLabel}\` · Ended: \`${p.endedLabel}\``)
  })
  const a = s.pages[0], b = s.pages[1]
  if (a && b) md.push(`  - ⚠ **SEAM:** page 1 ends \`${a.endedLabel}\`; page 2 commences \`${b.commencedLabel}\` — kept verbatim, NOT reconciled. Step data joins PP→PP / Facing DW→Facing DW (continuous). Confirm the moving-direction phrasing difference is acceptable.`)
  md.push('')
}
section('⚠ Table A vs Table B step-number SET mismatches (source charts misaligned — NEEDS VICTOR, not auto-resolved)', anomalies.abStepMismatch,
  r => `**${r.figure}** / ${r.role} — A steps [${r.aSet}] vs B steps [${r.bSet}]${r.aOnly.length ? '  · A-only: '+r.aOnly.join(',') : ''}${r.bOnly.length ? '  · B-only: '+r.bOnly.join(',') : ''}`)
section('Empty source rows dropped (only a step# present, no content — mechanical noise removal)', anomalies.emptyRowsDropped,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep}`)
section('New rhythm tokens (Foxtrot-specific, outside Tango S/Q/& — stored verbatim)', anomalies.newRhythmTokens,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep} — token \`${r.token}\``)
section('BG → NDCC name renames applied', anomalies.renames,
  r => `\`${r.priorBgName}\` → \`${r.newKey}\` (NDCC #${r.number}: \`${r.ndccName}\`)`)
section('Within-Foxtrot duplicate keys (should be empty)', anomalies.withinDanceDupes,
  r => `**\`${r.key}\`** — ${r.note}`)
section('Blank Timing cells in archive', anomalies.blankTiming,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep}`)
section('Blank Rhythm cells in archive', anomalies.blankRhythm,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep}`)
section('Blank Position cells in archive', anomalies.blankPosition,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep}`)
section('Blank Steps/Foot cells in archive', anomalies.blankFoot,
  r => `**${r.figure}** / ${r.role} / source step# ${r.sourceStep}`)
md.push(`## Mechanical / handled`)
md.push(``)
md.push(`- **Foxtrot Table B layout** (VERIFIED from source; supersedes work-order §3.3): 7 cols \`Step_# | Timing | Rhythm | Position | Rise & Fall | Sway | Footwork\` — a HYBRID carrying BOTH Tango's \`Rhythm\` AND Waltz's \`Rise & Fall\`/\`Sway\`. All three populated. Uniform across all ${files.length} source files.`)
md.push(`- **Rhythm field** stored verbatim. New Foxtrot token \`S(S)\` observed (Tango's set was \`S\`/\`Q\`/\`&\`); NOT normalized. See "New rhythm tokens" above.`)
md.push(`- **'Moving' column** (Table A col 5): parsed and discarded, per Step 1.2 decision.`)
md.push(`- **\`cbm\` and per-step \`notes\`** emitted as \`''\` (no source columns; coaching enrichment deferred to Step 4 dancecentral merge).`)
md.push(`- **Bar derivation is PROVISIONAL.** Foxtrot timing tokens are beat-groupings (\`12\`,\`3\`,\`4\`,\`56\`,\`78\`...); the inherited "timing resets to bare 1" heuristic fires inconsistently. True musical-bar assignment is a **Phase 2b / Victor** decision. Per-step \`timing\` is preserved verbatim as the source of truth. Per-figure provisional bar counts are listed below.`)
md.push(`- **No overrides/renames/consolidations applied this pass.** Only EXACT NDCC name matches auto-applied; everything else is null-tier "Needs Review". Victor confirms the suggested pairings figure-by-figure at the §7 checkpoint (mirrors the Tango Checkpoint-2 flow), after which \`NDCC_OVERRIDES\` is populated and the parser re-run.`)
md.push(`- **No display-layer changes** this run: \`App.jsx\` untouched.`)
md.push(`- **No cross-dance modifications:** parser writes into \`FIGURE_RICH_DATA['${THIS_DANCE}']\` and \`FIGURES['${THIS_DANCE}']\` only.`)
md.push(``)
md.push(`## Provisional per-figure bar counts (for audit)`)
md.push(``)
for (const f of figures) md.push(`- **${f.key}** — leader ${f.leader.length} steps / follower ${f.follower.length} steps / provisional bars=${f.bars}`)
md.push(``)

fs.writeFileSync(ANOMALIES_OUT, md.join('\n'))
console.log(`Wrote: ${path.relative(ROOT, DATA_JS)}`)
console.log(`Wrote: ${path.relative(ROOT, ANOMALIES_OUT)}`)
console.log(`Foxtrot: ${figures.length} figures parsed.`)
console.log(`NDCC: ${anomalies.ndccExactMatches.length} exact-applied, ${anomalies.ndccBgNoMatch.length} BG-no-NDCC (null tier), ${anomalies.ndccNdccNoBg.length} NDCC-no-BG.`)
console.log(`Blank timing: ${anomalies.blankTiming.length}, new rhythm tokens: ${anomalies.newRhythmTokens.length}, suggestions: ${anomalies.suggestions.length}.`)
console.log(`Empty rows dropped: ${anomalies.emptyRowsDropped.length}, A/B step-set mismatches: ${anomalies.abStepMismatch.length}.`)
