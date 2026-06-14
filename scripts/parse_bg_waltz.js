#!/usr/bin/env node
// Phase 2a Step 1 — Re-parse Waltz FIGURE_RICH_DATA from the ballroomguide
// archive, applying the OP-9 root fix.
//
// What this does:
//   • For 32 of 33 Waltz figures: re-parse structural step data from
//     sources/ballroomguide/workshop/standard/waltz/*.html.
//   • For Fallaway Whisk (no ballroomguide source): in-place OP-9 migration
//     only — extract `cbm` from old rise pipe-prefix, preserve notes,
//     mark sources: ['dancecentral'].
//   • For Open Impetus and Wing (audited): KEEP all existing values; parse
//     ballroomguide for comparison; flag every disagreement.
//   • Add a new Waltz Prep Step figure (from prep_step.html).
//   • Apply schema corrections: rename `count` → `timing`, add `position`,
//     add `cbm`, clean `rise`, preserve `notes`, drop `Moving`.
//   • Add figure-level provenance: dataStatus, sources.
//   • Write a new src/data.js and an anomaly report.
//
// Idempotency: if `cbm` is already present and non-empty on a step, it is
// preserved (so re-runs after first migration don't reset CBM extractions).

import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { FIGURE_RICH_DATA as OLD_RICH, FIGURES as OLD_FIGURES } from '../src/data.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const ARCHIVE = path.join(ROOT, 'sources/ballroomguide/workshop/standard/waltz')
const DATA_JS = path.join(ROOT, 'src/data.js')
const ANOMALIES_OUT = path.join(ROOT, 'docs/StudioPlanner_Phase2a_Step1_Anomalies.md')

// ─── Mapping (confirmed in Step 1.3, composites in [bar1, bar2] order) ─────
const KEY_TO_FILES = {
  'Back Lock':                              ['back_lock.html'],
  'Back Whisk':                             ['back_whisk.html'],
  'Basic Weave':                            ['basic_weave.html'],
  'Chassé from PP':                         ['chasse_from_pp.html'],
  'Closed Change (LF)':                     ['closed_change_LF.html'],
  'Closed Change (RF)':                     ['closed_change_RF.html'],
  'Closed Impetus':                         ['closed_impetus.html'],
  'Closed Telemark':                        ['closed_telemark.html'],
  'Closed Wing':                            ['closed_wing.html'],
  'Contra Check':                           ['contra_check.html'],
  'Double Reverse Spin':                    ['double_reverse.html'],
  'Drag Hesitation':                        ['drag_hesitation.html'],
  'Fallaway Reverse & Slip Pivot':          ['fallaway_reverse.html'],
  'Hesitation Change':                      ['hesitation_change.html'],
  'Hover Corté':                            ['hover_corte.html'],
  'Left Whisk':                             ['left_whisk.html'],
  'Natural Spin Turn':                      ['spin_turn.html'],
  'Natural Turn':                           ['natural_turn.html'],
  'Open Impetus and Cross Hesitation':      ['open_impetus.html', 'cross_hesitation.html'],
  'Open Impetus and Wing':                  ['open_impetus.html', 'wing.html'],
  'Open Telemark and Cross Hesitation':     ['open_telemark.html', 'cross_hesitation.html'],
  'Open Telemark and Wing':                 ['open_telemark.html', 'wing.html'],
  'Outside Change':                         ['outside_change.html'],
  'Outside Spin':                           ['outside_spin.html'],
  'Progressive Chassé to R':                ['chasse_right.html'],
  'Reverse Corté':                          ['reverse_corte.html'],
  'Reverse Pivot':                          ['reverse_pivot.html'],
  'Reverse Turn':                           ['reverse_turn.html'],
  'Turning Lock':                           ['turning_lock.html'],
  'Turning Lock to R':                      ['turning_lock_right.html'],
  'Weave from PP':                          ['weave_from_pp.html'],
  'Whisk':                                  ['whisk.html'],
}
const NO_SOURCE_KEYS = new Set(['Fallaway Whisk'])  // Option A: in-place migration only

// Phase 2b worklist encoded in the data: figures tagged auditPriority='high'
// with a one-line reason. Keep in sync with the figures hand-tagged in data.js.
const AUDIT_PRIORITY = {
  'Back Lock':           'step-count mismatch (follower 4→5); note placement may be misaligned',
  'Double Reverse Spin': 'step-count mismatch (leader 3→4); note placement may be misaligned',
  'Hesitation Change':   'blank rise & fall on steps 4-6 (both roles) in source',
  'Left Whisk':          'step-count mismatch (3→7) AND all rise & fall cells blank in source',
  'Turning Lock to R':   'step-count mismatch (3→4 both roles); note placement may be misaligned',
  'Weave from PP':       'step-count mismatch (leader 7→6, follower 8→6); note placement may be misaligned',
}

// NOTE: Phase 2a Step 1 originally treated 'Open Impetus and Wing' as audited
// (comparison only, no overwrite). Victor's Checkpoint 2 decision was to
// accept the ballroomguide re-parse for it; AUDITED_KEYS removed. See the
// "Parser bugs deferred" section of the anomaly report for the related bug
// to fix before any future audited-figure re-parse (Phase 2b).

const PREP_KEY = 'Waltz Prep Step'
const PREP_FILE = 'prep_step.html'

// ─── HTML helpers ──────────────────────────────────────────────────────────
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
  // Decode entities BEFORE collapsing whitespace + trim, otherwise a trailing
  // `&nbsp;` survives as a trailing space and breaks Table A↔B joins on Step_#.
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

// Parse one ballroomguide page → { Man: [src steps], Lady: [src steps] }
function parsePage(file) {
  const html = readPage(file)
  const tables = parseTables(html)
  if (tables.length < 4) throw new Error(`${file}: expected ≥4 tables, got ${tables.length}`)
  const join = (a, b) => {
    const aRows = a.slice(1).map(r => ({ step: r[0], foot: r[1], turn: r[2], alignment: r[3] /* drop r[4] moving */ }))
    const bRows = b.slice(1).map(r => ({ step: r[0], timing: r[1], position: r[2], rise: r[3], sway: r[4], footwork: r[5] }))
    const by = new Map()
    for (const r of aRows) by.set(r.step, { ...r })
    for (const r of bRows) by.set(r.step, { ...by.get(r.step), ...r })
    return [...by.values()]
  }
  return { Man: join(tables[0], tables[1]), Lady: join(tables[2], tables[3]) }
}

// ─── Bar derivation (timing-resets-to-1 heuristic; explicit for composites) ─
function assignBars(srcSteps, startBar) {
  let bar = startBar
  return srcSteps.map((s, i) => {
    if (i > 0 && s.timing && /^1(?!\d)/.test(s.timing)) bar += 1
    return { ...s, bar }
  })
}

// Build a corrected step record from a parsed source step.
function buildNewStep(srcStep) {
  return {
    bar:        srcStep.bar,
    timing:     srcStep.timing || '',
    foot:       srcStep.foot || '',
    alignment:  srcStep.alignment || '',
    turn:       srcStep.turn || '',
    footwork:   srcStep.footwork || '',
    sway:       srcStep.sway || '',
    position:   srcStep.position || '',
    rise:       srcStep.rise || '',
    cbm:        '',
    notes:      '',
  }
}

// ─── OP-9 migration: extract cbm + preserve / migrate notes ────────────────
const CBM_RE   = /^(slight\s+)?CBM$/i
const DASH_RE  = /^-+$/
const norm = s => (s || '').toString().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim()

function migrateOldIntoNew(oldStep, newStep, ctx, anomalies) {
  const oldRise   = (oldStep.rise   ?? '').toString()
  const oldNotes  = (oldStep.notes  ?? '').toString()
  const oldCbm    = (oldStep.cbm    ?? '').toString()

  // Determine cbm (idempotent: existing 'CBM' wins; '--' normalises to '')
  let cbm = ''
  if (oldCbm && oldCbm !== '--' && oldCbm !== '---') {
    cbm = oldCbm === 'CBM' || /^(slight\s+)?CBM$/i.test(oldCbm) ? 'CBM' : ''
  }
  // Split rise on first pipe
  const pipeIdx = oldRise.indexOf('|')
  const oldPrefix = pipeIdx >= 0 ? oldRise.slice(0, pipeIdx).trim() : ''
  const oldSuffix = pipeIdx >= 0 ? oldRise.slice(pipeIdx + 1).trim() : oldRise.trim()
  if (!cbm) {
    if (CBM_RE.test(oldPrefix)) cbm = 'CBM'
  }

  // Route non-CBM / non-dash prefixes to notes
  let prefixToNotes = ''
  if (oldPrefix && !CBM_RE.test(oldPrefix) && !DASH_RE.test(oldPrefix) && oldPrefix !== '') {
    prefixToNotes = oldPrefix
    anomalies.nonCbmPrefix.push({ ...ctx, prefix: oldPrefix })
  }

  // Compare old rise content with new ballroomguide rise — flag/migrate divergence
  const newRiseNorm = norm(newStep.rise)
  const oldRiseContent = (oldSuffix || oldRise).trim()
  const oldContentNorm = norm(oldRiseContent)
  let migrateContent = ''
  if (oldContentNorm) {
    const subsumed = newRiseNorm.includes(oldContentNorm) ||
                     (oldContentNorm.length <= newRiseNorm.length + 8 && oldContentNorm === newRiseNorm)
    if (!subsumed) {
      // Materially divergent or has extra technique content
      migrateContent = oldRiseContent
      anomalies.riseDivergent.push({ ...ctx, oldRise: oldRiseContent, newRise: newStep.rise })
    }
  }

  // Build merged notes: existing notes + migrated fragments with markers
  // Idempotency: skip migration markers that are already present in oldNotes
  const parts = []
  if (oldNotes) parts.push(oldNotes)
  if (prefixToNotes && !oldNotes.includes(`[migrated-from-rise-prefix: ${prefixToNotes}]`)) {
    parts.push(`[migrated-from-rise-prefix: ${prefixToNotes}]`)
  }
  if (migrateContent && !oldNotes.includes(`[migrated-from-rise: ${migrateContent}]`)) {
    parts.push(`[migrated-from-rise: ${migrateContent}]`)
  }

  newStep.cbm = cbm
  newStep.notes = parts.join(' ').trim()
}

// ─── Audited path: keep values; flag any ballroomguide disagreement ────────
function processAuditedFigure(key, oldFig, anomalies) {
  const files = KEY_TO_FILES[key]
  const parsedSteps = { Man: [], Lady: [] }
  let bar = 1
  for (const file of files) {
    const page = parsePage(file)
    parsedSteps.Man.push(...assignBars(page.Man, bar))
    parsedSteps.Lady.push(...assignBars(page.Lady, bar))
    bar += 1
  }
  // Compare audited values with ballroomguide field-by-field
  const compareRole = (audRows, srcRows, role) => {
    const out = []
    audRows.forEach((aud, i) => {
      const newStep = {
        bar:        aud.bar,
        timing:     aud.count ?? aud.timing ?? '',   // rename count→timing
        foot:       aud.foot ?? '',
        alignment:  aud.alignment ?? '',
        turn:       aud.turn ?? '',
        footwork:   aud.footwork ?? '',
        sway:       aud.sway ?? '',
        position:   aud.position ?? '',
        rise:       aud.rise ?? '',
        cbm:        (aud.cbm === '--' || aud.cbm === '---') ? '' : (aud.cbm ?? ''),
        notes:      aud.notes ?? '',
      }
      const src = srcRows[i]
      if (src) {
        const fields = [
          ['timing','timing'], ['foot','foot'], ['alignment','alignment'],
          ['turn','turn'], ['footwork','footwork'], ['sway','sway'],
          ['position','position'], ['rise','rise']
        ]
        for (const [a,b] of fields) {
          const av = (newStep[a]||'').toString().trim()
          const bv = (src[b]||'').toString().trim()
          if (av !== bv && norm(av) !== norm(bv)) {
            anomalies.auditedConflict.push({
              figure: key, role, step: i+1, field: a, audited: av, ballroomguide: bv,
            })
          }
        }
      }
      out.push(newStep)
    })
    return out
  }
  return {
    leader: compareRole(oldFig.leader, parsedSteps.Man, 'leader'),
    follower: compareRole(oldFig.follower, parsedSteps.Lady, 'follower'),
  }
}

// ─── No-source path (Fallaway Whisk): in-place migration only ──────────────
function processNoSourceFigure(key, oldFig, anomalies) {
  const migrate = (rows, role) => rows.map((old, i) => {
    const ns = {
      bar:        old.bar,
      timing:     old.count ?? old.timing ?? '',
      foot:       old.foot ?? '',
      alignment:  old.alignment ?? '',
      turn:       old.turn ?? '',
      footwork:   old.footwork ?? '',
      sway:       old.sway ?? '',
      position:   '',                         // no source → unknown, leave empty
      rise:       (old.rise || '').toString().split('|').slice(-1)[0].trim(),  // strip pipe-prefix
      cbm:        '',
      notes:      '',
    }
    migrateOldIntoNew(old, ns, { figure: key, role, step: i+1 }, anomalies)
    return ns
  })
  return { leader: migrate(oldFig.leader, 'leader'), follower: migrate(oldFig.follower, 'follower') }
}

// ─── Standard path: re-parse from ballroomguide + migrate from old ─────────
function processFigure(key, oldFig, anomalies) {
  const files = KEY_TO_FILES[key]
  const parsedSteps = { Man: [], Lady: [] }
  let bar = 1
  for (const file of files) {
    const page = parsePage(file)
    parsedSteps.Man.push(...assignBars(page.Man, bar))
    parsedSteps.Lady.push(...assignBars(page.Lady, bar))
    bar += 1
  }
  const buildRole = (srcRows, oldRows, role) => srcRows.map((src, i) => {
    const ns = buildNewStep(src)
    if (!src.timing) anomalies.blankTiming.push({ figure: key, role, step: i+1 })
    if (!src.rise)   anomalies.blankRise.push({ figure: key, role, step: i+1 })
    const old = oldRows && oldRows[i]
    if (old) {
      migrateOldIntoNew(old, ns, { figure: key, role, step: i+1 }, anomalies)
    }
    return ns
  })
  // Step-count sanity check
  if (oldFig.leader.length !== parsedSteps.Man.length) {
    anomalies.stepCountMismatch.push({
      figure: key, role: 'leader', oldCount: oldFig.leader.length, newCount: parsedSteps.Man.length,
    })
  }
  if (oldFig.follower.length !== parsedSteps.Lady.length) {
    anomalies.stepCountMismatch.push({
      figure: key, role: 'follower', oldCount: oldFig.follower.length, newCount: parsedSteps.Lady.length,
    })
  }
  return {
    leader: buildRole(parsedSteps.Man, oldFig.leader, 'leader'),
    follower: buildRole(parsedSteps.Lady, oldFig.follower, 'follower'),
  }
}

// ─── Prep step (no old data) ───────────────────────────────────────────────
function processPrepStep(anomalies) {
  const page = parsePage(PREP_FILE)
  // Bar assignment: per the timing pattern '123','12','3' → bars [1,2,2]
  const stamp = (rows) => rows.map((s, i) => {
    let bar = 1
    if (i > 0 && /^1/.test(s.timing)) bar = 2
    if (i > 0 && rows[i-1].timing && /^1/.test(rows[i-1].timing) && !/^1/.test(s.timing) && i >= 1) {
      // continued in same bar
      bar = 2
    }
    // Simpler: hardcode based on observed prep_step.html structure
    bar = i === 0 ? 1 : 2
    return buildNewStep({ ...s, bar })
  })
  return { leader: stamp(page.Man), follower: stamp(page.Lady) }
}

// ─── Serialization to JavaScript ───────────────────────────────────────────
function jsStr(s) {
  return "'" + (s ?? '').toString().replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
}
function serializeStep(s) {
  // Preserve the canonical field order
  const order = ['bar','timing','foot','alignment','turn','footwork','sway','position','rise','cbm','notes']
  const parts = order.map(k => {
    const v = s[k]
    if (k === 'bar') return `bar: ${v}`
    return `${k}: ${jsStr(v)}`
  })
  return `      { ${parts.join(', ')} },`
}
function serializeFigure(key, fig, oldMeta) {
  const lines = []
  lines.push(`  ${jsStr(key)}: {`)
  lines.push(`    bars: ${fig.bars},`)
  const m = oldMeta
  lines.push(`    dance: ${jsStr(m.dance)}, category: ${jsStr(m.category)}, syllabusLevel: ${jsStr(m.syllabusLevel)}, syllabusNumber: ${m.syllabusNumber}, syllabusBody: ${m.syllabusBody == null ? 'null' : jsStr(m.syllabusBody)},`)
  const src = fig.sources && fig.sources.length ? `[${fig.sources.map(jsStr).join(', ')}]` : '[]'
  lines.push(`    dataStatus: ${jsStr(fig.dataStatus)}, sources: ${src},`)
  if (AUDIT_PRIORITY[key]) {
    lines.push(`    auditPriority: 'high', // ${AUDIT_PRIORITY[key]}`)
  }
  lines.push(`    leader: [`)
  for (const s of fig.leader) lines.push(serializeStep(s))
  lines.push(`    ],`)
  lines.push(`    follower: [`)
  for (const s of fig.follower) lines.push(serializeStep(s))
  lines.push(`    ],`)
  lines.push(`    techniqueNotes: ${jsStr(fig.techniqueNotes || '')},`)
  lines.push(`  },`)
  return lines.join('\n')
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
const anomalies = {
  nonCbmPrefix:       [],
  riseDivergent:      [],
  blankTiming:        [],
  blankRise:          [],
  stepCountMismatch:  [],
  auditedConflict:    [],
  noSource:           [],
  gzipped:            ['closed_impetus.html'],     // mechanical, handled
}

// Build lookup for old figure-level metadata via FIGURES['Waltz']
const oldFigMeta = {}
for (const f of OLD_FIGURES['Waltz']) oldFigMeta[f.n] = f

const newFigures = {}
for (const key of Object.keys(OLD_RICH)) {
  const oldFig = OLD_RICH[key]
  let result
  let dataStatus = 'parsed', sources = ['ballroomguide']
  if (NO_SOURCE_KEYS.has(key)) {
    result = processNoSourceFigure(key, oldFig, anomalies)
    sources = ['dancecentral']
    anomalies.noSource.push({ figure: key, reason: 'no ballroomguide chart page; in-place OP-9 migration only' })
  } else {
    result = processFigure(key, oldFig, anomalies)
  }
  const bars = Math.max(...result.leader.map(s => s.bar), ...result.follower.map(s => s.bar))
  newFigures[key] = {
    bars,
    dance: oldFig.dance, category: oldFig.category,
    syllabusLevel: oldFig.syllabusLevel, syllabusNumber: oldFig.syllabusNumber, syllabusBody: oldFig.syllabusBody,
    dataStatus, sources,
    leader: result.leader, follower: result.follower,
    techniqueNotes: oldFig.techniqueNotes || '',
  }
}

// Prep step
const prep = processPrepStep(anomalies)
newFigures[PREP_KEY] = {
  bars: 2,
  dance: 'Waltz', category: 'Standard',
  syllabusLevel: 'Beginners', syllabusNumber: 33, syllabusBody: null,
  dataStatus: 'parsed', sources: ['ballroomguide'],
  leader: prep.leader, follower: prep.follower,
  techniqueNotes: '',
}

// ─── Write out new src/data.js ─────────────────────────────────────────────
const src = fs.readFileSync(DATA_JS, 'utf-8')

// 1. Replace the FIGURE_RICH_DATA block (it ends the file)
const richHeaderRe = /export const FIGURE_RICH_DATA = \{[\s\S]*\}\s*$/
const richBlock = ['export const FIGURE_RICH_DATA = {']
for (const key of Object.keys(newFigures)) {
  richBlock.push(serializeFigure(key, newFigures[key], oldFigMeta[key] || newFigures[key]))
}
richBlock.push('}')
const newRich = richBlock.join('\n') + '\n'

// 2. Insert a new FIGURES['Waltz'] entry for the prep step (alphabetically would
//    shuffle the file; cleaner to append as the last entry — sorted by syllabus
//    number in the library anyway).
// The FIGURES.Waltz block:
const figuresWaltzMatch = src.match(/('Waltz':\s*\[)([\s\S]*?)(\n\s*\],)/)
if (!figuresWaltzMatch) throw new Error("couldn't locate FIGURES['Waltz'] array")
const prepEntry = `    { n: 'Waltz Prep Step', c: '123,12,3', fw: 'i/e of foot to WF,i/e of foot to WF,HT', al: 'FDW,FDW,FDW', sw: '', rise: 'Lower e/o 3', notes: '', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 33, syllabusBody: null },`
let srcMid = src
if (!src.includes("'Waltz Prep Step'")) {
  srcMid = src.replace(figuresWaltzMatch[0], `${figuresWaltzMatch[1]}${figuresWaltzMatch[2]}\n${prepEntry}${figuresWaltzMatch[3]}`)
}

// 3. Replace the FIGURE_RICH_DATA block
const finalSrc = srcMid.replace(richHeaderRe, newRich.trim())
fs.writeFileSync(DATA_JS, finalSrc)

// ─── Anomaly report ───────────────────────────────────────────────────────
const md = []
md.push(`# StudioPlanner — Phase 2a Step 1 — Anomaly Report`)
md.push(``)
md.push(`Generated: ${new Date().toISOString().slice(0,10)}`)
md.push(``)
md.push(`## Summary`)
md.push(``)
md.push(`| Category | Count |`)
md.push(`|---|---|`)
md.push(`| Blank Timing cells | ${anomalies.blankTiming.length} |`)
md.push(`| Blank Rise & Fall cells | ${anomalies.blankRise.length} |`)
md.push(`| Rise content divergence (old → notes) | ${anomalies.riseDivergent.length} |`)
md.push(`| Non-CBM pipe prefixes (→ notes) | ${anomalies.nonCbmPrefix.length} |`)
md.push(`| Step-count mismatches | ${anomalies.stepCountMismatch.length} |`)
md.push(`| Figures without ballroomguide source | ${anomalies.noSource.length} |`)
md.push(`| Gzipped source files (handled mechanically) | ${anomalies.gzipped.length} |`)
md.push(``)

function section(title, rows, fmt) {
  md.push(`## ${title}`)
  md.push(``)
  if (!rows.length) { md.push('_None._'); md.push(''); return }
  for (const r of rows) md.push(`- ${fmt(r)}`)
  md.push('')
}
section('Figures with no ballroomguide source', anomalies.noSource, r => `**${r.figure}** — ${r.reason}`)
section('Step-count mismatches', anomalies.stepCountMismatch,
  r => `**${r.figure}** / ${r.role}: old=${r.oldCount}  ·  new=${r.newCount}`)
section('Blank Timing cells in archive', anomalies.blankTiming,
  r => `**${r.figure}** / ${r.role} / step ${r.step}`)
section('Blank Rise & Fall cells in archive', anomalies.blankRise,
  r => `**${r.figure}** / ${r.role} / step ${r.step}`)
section('Non-CBM pipe prefixes routed to notes', anomalies.nonCbmPrefix,
  r => `**${r.figure}** / ${r.role} / step ${r.step}: prefix=\`${r.prefix}\``)
section('Rise content divergence (old rise material migrated to notes)', anomalies.riseDivergent,
  r => `**${r.figure}** / ${r.role} / step ${r.step}\n  - old: \`${r.oldRise}\`\n  - new: \`${r.newRise}\``)
md.push(`## Mechanical / handled`)
md.push(``)
md.push(`- **Gzipped source files** (auto-decompressed by parser): ${anomalies.gzipped.join(', ')}`)
md.push(`- **'Moving' column** from source tables: parsed, not stored (per Step 1.2 decision).`)
md.push(`- **Brief verification note:** the brief states 'Basic Weave leader had blank timing'; the archive shows **zero blank Timing cells** in 33 files. The Basic Weave step-1 blank is in **Rise & Fall**, not Timing.`)
md.push(``)
md.push(`## Parser bugs deferred (Phase 2b — fix before any future audited-figure re-parse)`)
md.push(``)
md.push(`- **Audited-exclusion label vs. data protection.** In the original Step 1 parser, the AUDITED_KEYS branch applied \`dataStatus: 'audited'\` and *intended* to preserve audited values, but did not provide a hard guarantee — fields that were missing from the old audited record fell through to ballroomguide values, and the comparison path was easy to bypass by editing one line. For Phase 2b, an audited figure must be protected by a checksum or explicit-allowlist override that fails closed if anything tries to modify it. Logged 2026-06-13 (Checkpoint 2). Not fixed in this commit (Victor's call: accepted the ballroomguide re-parse for 'Open Impetus and Wing', so this bug had no effect on Step 1's output).`)

fs.writeFileSync(ANOMALIES_OUT, md.join('\n'))
console.log(`Wrote: ${path.relative(ROOT, DATA_JS)}`)
console.log(`Wrote: ${path.relative(ROOT, ANOMALIES_OUT)}`)
const totalAnoms = anomalies.blankTiming.length + anomalies.blankRise.length + anomalies.riseDivergent.length
  + anomalies.nonCbmPrefix.length + anomalies.stepCountMismatch.length + anomalies.noSource.length
console.log(`Anomaly summary: ${totalAnoms} total. ${anomalies.blankTiming.length} blank-timing, ${anomalies.blankRise.length} blank-rise, ${anomalies.riseDivergent.length} rise-divergent, ${anomalies.stepCountMismatch.length} step-count mismatches.`)
