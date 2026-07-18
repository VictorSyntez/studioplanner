#!/usr/bin/env node
// Phase 2a Step 2c — one-shot migration: re-nest FIGURE_RICH_DATA by dance +
// two Tango key reverts. Zero content changes.
//
// Approach: text-level surgery on src/data.js. We:
//   1. Locate the FIGURE_RICH_DATA export.
//   2. Split its body into figure blocks (each `  '...': {\n ... \n  },`).
//   3. For each block, determine `dance:` from its body.
//   4. Emit a nested structure:
//        export const FIGURE_RICH_DATA = {
//          'Waltz': {
//            ...figure blocks re-indented one level deeper...
//          },
//          'Tango': {
//            ...same...
//          },
//        }
//   5. Rename two Tango keys inline in the header line:
//        'Contra Check (Tango)': → 'Contra Check':
//        'Fallaway Reverse and Slip Pivot': → 'Fallaway Reverse & Slip Pivot':
//   6. Also update FIGURES['Tango'] to mirror the two renames on `.n:` values.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const DATA_JS = path.join(ROOT, 'src/data.js')

const src = fs.readFileSync(DATA_JS, 'utf-8')

// 1. Locate FIGURE_RICH_DATA
const startMarker = 'export const FIGURE_RICH_DATA = {'
const startIdx = src.indexOf(startMarker)
if (startIdx < 0) throw new Error('FIGURE_RICH_DATA export not found')
const bodyStart = startIdx + startMarker.length
// Find the matching close `}` at file scope — it's the LAST `\n}\s*$` in the file.
const closeMatch = src.match(/\n\}\s*$/)
if (!closeMatch) throw new Error('Final closing } not found')
const bodyEnd = src.length - closeMatch[0].length

const preamble = src.slice(0, startIdx)   // everything up to `export const FIGURE_RICH_DATA = {`
const body = src.slice(bodyStart, bodyEnd)  // between the `{` and the final `}`
const closer = src.slice(bodyEnd)           // the `\n}\n` and any trailing whitespace

// 2. Split body into blocks. Each figure block is:
//     '\n  \'<key>\': {\n ... \n  },'
// The body starts with a leading newline; each block ends with '\n  },'.
// We split conservatively: match `\n  '<key>': {\n ... \n  },` blocks.
// Use regex with non-greedy body match; anchored to `^  '` and `^  },` at line starts.
const blockRe = /(\n  '([^']+)': \{\n[\s\S]*?\n  \},)/g
const blocks = []
let m
while ((m = blockRe.exec(body)) !== null) {
  blocks.push({ raw: m[1], key: m[2], startIdx: m.index })
}

// Validate: the concatenated raw blocks should equal the body content
// (modulo whitespace between them). We reconstruct and compare.
const reconstructed = blocks.map(b => b.raw).join('')
if (reconstructed.trim() !== body.trim()) {
  // Diagnose
  console.error('BLOCK SPLIT MISMATCH')
  console.error('body length:', body.length, 'reconstructed length:', reconstructed.length)
  console.error('body first 200:', JSON.stringify(body.slice(0, 200)))
  console.error('reconstructed first 200:', JSON.stringify(reconstructed.slice(0, 200)))
  console.error('body last 200:', JSON.stringify(body.slice(-200)))
  console.error('reconstructed last 200:', JSON.stringify(reconstructed.slice(-200)))
  throw new Error('Block-split reconstruction mismatch — aborting')
}

console.log(`Split into ${blocks.length} figure blocks`)

// 3. Determine dance for each block by scanning body for `dance: '<Dance>'`
const danceOf = {}
for (const b of blocks) {
  const dm = b.raw.match(/dance: '([^']+)'/)
  if (!dm) throw new Error(`No dance: line in block ${b.key}`)
  danceOf[b.key] = dm[1]
}

// Group blocks by dance, preserving in-source order
const byDance = {}
for (const b of blocks) {
  const d = danceOf[b.key]
  ;(byDance[d] = byDance[d] || []).push(b)
}
for (const [d, arr] of Object.entries(byDance)) {
  console.log(`  ${d}: ${arr.length} figures`)
}

// 4. Apply the two Tango key renames
const RENAMES = {
  'Contra Check (Tango)': 'Contra Check',
  'Fallaway Reverse and Slip Pivot': 'Fallaway Reverse & Slip Pivot',
}
for (const b of blocks) {
  if (RENAMES[b.key]) {
    const newKey = RENAMES[b.key]
    // Rewrite the very first line of the block
    b.raw = b.raw.replace(`  '${b.key}': {`, `  '${newKey}': {`)
    console.log(`  RENAME: '${b.key}' → '${newKey}'`)
    b.key = newKey
  }
}

// 5. Re-indent each block by 2 spaces (one nesting level deeper).
// The original block starts with '\n' (leading newline) then '  ' (2-space
// indent on the key line) and '    ' on body lines. To nest, we add 2 spaces
// to every non-empty line — INCLUDING the key line.
function reindent(raw) {
  const lines = raw.split('\n')
  return lines.map(line => line === '' ? '' : '  ' + line).join('\n')
}

// 6. Emit the nested body
const DANCE_ORDER = ['Waltz', 'Tango']  // future dances just append to this list
const emitted = []
for (const d of DANCE_ORDER) {
  const arr = byDance[d]
  if (!arr) continue
  emitted.push(`\n  '${d}': {`)
  for (const b of arr) {
    // b.raw already begins with '\n' + '  ' + key. reindent adds 2 more spaces
    // to every non-empty line — key line becomes '    ' + key, body lines '      '.
    emitted.push(reindent(b.raw))
  }
  emitted.push('\n  },')
}
const nestedBody = emitted.join('')

// Assemble new file. nestedBody starts with '\n  \'<Dance>\': {' — the leading
// '\n' is what separates the FIGURE_RICH_DATA `= {` from the first dance block.
// closer starts with '\n}' (the outer FIGURE_RICH_DATA close).
const newSrc = preamble + startMarker + nestedBody + closer

// 7. Sanity: verify content preservation. Every step-row line ('      { bar: ...')
// from the original body should appear in the new body (with 2 extra spaces).
const stepLinesOriginal = body.split('\n').filter(l => /^      \{ bar:/.test(l))
const stepLinesNew = newSrc.split('\n').filter(l => /^        \{ bar:/.test(l))
if (stepLinesOriginal.length !== stepLinesNew.length) {
  throw new Error(`Step-row count mismatch: original ${stepLinesOriginal.length}, new ${stepLinesNew.length}`)
}
console.log(`Step-row preservation: ${stepLinesOriginal.length} lines (deeper indent) — OK`)

// 8. Mirror the two Tango renames in FIGURES['Tango']
// Original .n values in FIGURES catalog:
//   { n: 'Contra Check (Tango)', ... }
//   { n: 'Fallaway Reverse and Slip Pivot', ... }
let finalSrc = newSrc
for (const [oldN, newN] of Object.entries(RENAMES)) {
  const before = `n: '${oldN}',`
  const after  = `n: '${newN}',`
  const idx = finalSrc.indexOf(before)
  if (idx < 0) {
    console.warn(`  WARN: FIGURES entry n: '${oldN}' not found`)
  } else {
    finalSrc = finalSrc.slice(0, idx) + after + finalSrc.slice(idx + before.length)
    console.log(`  FIGURES catalog updated: n: '${oldN}' → n: '${newN}'`)
  }
}

fs.writeFileSync(DATA_JS, finalSrc)
console.log(`\nWrote: ${path.relative(ROOT, DATA_JS)}`)
