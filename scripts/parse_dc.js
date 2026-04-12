#!/usr/bin/env node
// Parses a DanceCentral figure HTML file and extracts structured step data.
// Usage: node scripts/parse_dc.js <path-to-html>
//
// Input:  one HTML file from reference/waltz/ (HTTrack mirror of dancecentral.info)
// Output: JSON matching the FIGURE_RICH_DATA[figureName] shape in src/data.js,
//         i.e. { bars, leader: [...], follower: [...], techniqueNotes: '' }.
//
// Each step is parsed from a pipe-separated line inside a <p> tag:
//   "Count N: foot | alignment | footwork | turn | sway | [CBM |] rise"
// Notes come from <ul> bullets inside the same step <li>; multiple bullets are
// space-joined, and 'This is "X"' labels are stripped (as whole bullets or prefixes).
// Empty fields normalise to '--'.
//
// Schema decisions recorded in .claude memory (project_figure_schema.md).

const fs = require('fs')

const file = process.argv[2]
if (!file) { console.error('usage: parse_dc.js <file>'); process.exit(1) }
const html = fs.readFileSync(file, 'utf8')

const decode = s => s
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&nbsp;/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const textOf = s => decode(s.replace(/<[^>]+>/g, ' '))

// Find the byte offset after a heading that contains any of the given labels.
function findRoleStart(html, labels) {
  for (const label of labels) {
    const re = new RegExp(`>\\s*${label}\\s*</(?:h[1-6]|div)>`, 'i')
    const m = html.match(re)
    if (m) return m.index + m[0].length
  }
  return -1
}

const leaderStart = findRoleStart(html, ['Leader', 'Man'])
const followerStart = findRoleStart(html, ['Follower', 'Lady'])

if (leaderStart === -1 || followerStart === -1) {
  console.error(`Role headings not found (leader=${leaderStart}, follower=${followerStart})`)
  process.exit(2)
}

// Follower section ends at the next <h3> heading (if any) so we don't pick up
// trailing "Connecting Figures" etc.
const nextH3Re = /<h3[^>]*>/g
nextH3Re.lastIndex = followerStart
const nextH3 = nextH3Re.exec(html)
const followerEnd = nextH3 ? nextH3.index : html.length

const leaderHtml = html.slice(leaderStart, followerStart)
const followerHtml = html.slice(followerStart, followerEnd)

function extractSteps(sectionHtml) {
  const countRe = /<p[^>]*>Count (\d+):\s*([^<]*)<\/p>/g
  const marks = []
  let m
  while ((m = countRe.exec(sectionHtml)) !== null) {
    marks.push({
      start: m.index,
      end: m.index + m[0].length,
      count: +m[1],
      body: decode(m[2]),
    })
  }

  const steps = []
  let bar = 0
  let prevCount = 0

  for (let i = 0; i < marks.length; i++) {
    const cur = marks[i]
    const next = marks[i + 1]
    if (cur.count <= prevCount || i === 0) bar++
    prevCount = cur.count

    // Notes = all <p> texts inside <ul>s between this step and the next
    const noteChunk = sectionHtml.slice(cur.end, next ? next.start : sectionHtml.length)
    const notes = []
    const ulRe = /<ul[^>]*>([\s\S]*?)<\/ul>/g
    let um
    while ((um = ulRe.exec(noteChunk)) !== null) {
      const pRe = /<p[^>]*>([\s\S]*?)<\/p>/g
      let pm
      while ((pm = pRe.exec(um[1])) !== null) {
        const text = textOf(pm[1])
        if (text) notes.push(text)
      }
    }

    // Parse pipe-separated step body
    const fields = cur.body.split(/\s*\|\s*/).map(f => f.trim())
    let foot = '', alignment = '', footwork = '', turn = '', sway = '', cbm = '', rise = ''
    if (fields.length === 7) {
      ;[foot, alignment, footwork, turn, sway, cbm, rise] = fields
    } else if (fields.length === 6) {
      if (/^CBM$/i.test(fields[5])) {
        ;[foot, alignment, footwork, turn, sway, cbm] = fields
        rise = ''
      } else {
        ;[foot, alignment, footwork, turn, sway, rise] = fields
      }
    } else {
      console.error(`[warn] unusual field count ${fields.length}: ${cur.body}`)
      const padded = [...fields, '', '', '', '', '', '', '']
      ;[foot, alignment, footwork, turn, sway, cbm, rise] = padded
    }

    // Drop 'This is "X"' labels — either as a whole bullet or as a prefix
    const filtered = notes
      .map(n => n.replace(/^\s*This is ["'][^"']+["']\.?\s*/, ''))
      .filter(Boolean)
    const combined = filtered.join(' ').trim()

    const norm = s => {
      const t = (s || '').trim()
      if (!t || t === '-' || t === '--' || t === '---') return '--'
      return t
    }

    steps.push({
      bar,
      count: String(cur.count),
      foot:      norm(foot),
      alignment: norm(alignment),
      footwork:  norm(footwork),
      turn:      norm(turn),
      sway:      norm(sway),
      cbm:       norm(cbm),
      rise:      norm(rise),
      notes:     combined,
    })
  }

  return steps
}

const leader = extractSteps(leaderHtml)
const follower = extractSteps(followerHtml)

const result = {
  bars: Math.max(
    ...leader.map(s => s.bar),
    ...follower.map(s => s.bar),
  ),
  leader,
  follower,
  techniqueNotes: '',
}

console.log(JSON.stringify(result, null, 2))
