import { useState, useEffect, useCallback } from 'react'
import { DANCE_COLORS, FIGURES, TEC_LIBRARY, GLOSSARY, FIGURE_RICH_DATA } from './data.js'
import { SEED_SESSIONS } from './seedData.js'

// ─── HELPERS ──────────────────────────────────────────
let _uid = Date.now()
const uid = () => `id-${_uid++}`

const WALTZ_FIGURES = FIGURES['Waltz'] || []
const WALTZ_COLOR = DANCE_COLORS['Waltz']

function totalSectionMinutes(section) {
  if (section.type === 'warmup') return (section.dances || []).reduce((s, d) => s + (Number(d.minutes) || 0), 0)
  if (section.type === 'conclusion') return section.minutes || 0
  return (section.items || []).reduce((s, item) => s + (Number(item.minutes) || 0), 0)
}

function totalSessionMinutes(sections) {
  return (sections || []).reduce((s, sec) => s + totalSectionMinutes(sec), 0)
}

function getTec(tecId) {
  return TEC_LIBRARY.find(t => t.id === tecId) || null
}

function getFigure(name) {
  return WALTZ_FIGURES.find(f => f.n === name) || null
}

function sectionTypeLabel(type) {
  if (type === 'warmup') return 'Warm-up'
  if (type === 'main') return 'Main Topic'
  if (type === 'conclusion') return 'Conclusion'
  return type
}

function sectionIcon(type) {
  if (type === 'warmup') return '🌅'
  if (type === 'main') return '🎯'
  if (type === 'conclusion') return '📝'
  return '•'
}

// ─── ROLE GATE ────────────────────────────────────────
function RoleGate({ onSelect }) {
  return (
    <div className="role-gate">
      <div className="role-gate-card">
        <div className="role-gate-logo">StudioPlanner</div>
        <p className="role-gate-sub">Ballroom lesson planning &amp; delivery</p>
        <div className="role-options">
          <button className="role-option" onClick={() => onSelect('mt')}>
            <span className="role-icon">🎓</span>
            <div>
              <div className="role-title">Main Teacher</div>
              <div className="role-desc">Build sessions, drag figures &amp; TECs, manage content</div>
            </div>
          </button>
          <button className="role-option role-option-ps" onClick={() => onSelect('ps')}>
            <span className="role-icon">📋</span>
            <div>
              <div className="role-title">Practice Supervisor</div>
              <div className="role-desc">View session plan, drill into sections &amp; figures</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── FIGURE DETAIL PANEL ─────────────────────────────
function FigureDetailPanel({ figureName, mtNotes, onClose, alignmentOverrides, barsUsed, onAlignmentChange, isEditable }) {
  const rich = FIGURE_RICH_DATA[figureName]
  const fig = getFigure(figureName)
  const [activeBar, setActiveBar] = useState(1)

  if (!rich && !fig) return (
    <div className="detail-panel">
      <div style={{color:'var(--ink-faint)', padding: 16}}>Figure not found in database.</div>
    </div>
  )

  // If we have rich data, use it; otherwise fall back to old simple display
  const bars = rich ? rich.bars : 1
  const barNums = rich ? [...new Set(rich.leader.map(s => s.bar))] : [1]

  // Filter steps to active bar
  const leaderSteps = rich ? rich.leader.filter(s => s.bar === activeBar) : []
  const followerSteps = rich ? rich.follower.filter(s => s.bar === activeBar) : []

  const getAlignment = (role, stepIdx) => {
    const key = `${role}-${activeBar}-${stepIdx}`
    return (alignmentOverrides && alignmentOverrides[key]) || (role === 'leader' ? leaderSteps[stepIdx]?.alignment : followerSteps[stepIdx]?.alignment) || '—'
  }

  const handleAlignmentChange = (role, stepIdx, val) => {
    if (!onAlignmentChange) return
    const key = `${role}-${activeBar}-${stepIdx}`
    onAlignmentChange(key, val)
  }

  const renderStepsTable = (steps, role) => (
    <div className="rich-role-section">
      <div className="rich-role-label">{role === 'leader' ? 'Leader' : 'Follower'}</div>
      <table className="detail-table">
        <thead>
          <tr><th>Count</th><th>Foot</th><th>Alignment</th><th>Footwork</th><th>Sway</th><th>Rise</th></tr>
        </thead>
        <tbody>
          {steps.map((s, i) => (
            <tr key={i}>
              <td style={{fontFamily:'var(--font-mono)', color:'var(--gold)', whiteSpace:'nowrap'}}>{s.count}</td>
              <td>{s.foot}</td>
              <td>
                {isEditable ? (
                  <input
                    className="alignment-edit-input"
                    value={getAlignment(role, i)}
                    onChange={e => handleAlignmentChange(role, i, e.target.value)}
                    title="Edit alignment for this session"
                  />
                ) : (
                  <span style={alignmentOverrides && alignmentOverrides[`${role}-${activeBar}-${i}`] ? {color:'var(--gold-lt)', fontStyle:'italic'} : {}}>
                    {getAlignment(role, i)}
                  </span>
                )}
              </td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:11}}>{s.footwork}</td>
              <td style={{fontFamily:'var(--font-mono)', fontSize:11}}>{s.sway}</td>
              <td style={{fontSize:11, color:'var(--ink-faint)'}}>{s.rise}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {steps.filter(s => s.notes).map((s, i) => s.notes ? (
        <div key={i} className="rich-step-note">
          <span className="rich-step-note-count">{s.count}</span>
          <span>{s.notes}</span>
        </div>
      ) : null)}
    </div>
  )

  return (
    <div className="detail-panel">
      <div className="detail-panel-header">
        <div>
          <div className="detail-panel-type">FIGURE · Waltz</div>
          <div className="detail-panel-name">{figureName}</div>
        </div>
        {onClose && <button className="icon-btn" onClick={onClose}>✕</button>}
      </div>

      {/* Bar selector — only shown if figure has multiple bars */}
      {barNums.length > 1 && (
        <div className="bar-tabs">
          {barNums.map(b => (
            <button
              key={b}
              className={`bar-tab${activeBar === b ? ' active' : ''}${barsUsed && !barsUsed.includes(b) ? ' unused' : ''}`}
              onClick={() => setActiveBar(b)}
            >
              Bar {b}
            </button>
          ))}
        </div>
      )}

      {rich ? (
        <div className="rich-detail-body">
          {renderStepsTable(leaderSteps, 'leader')}
          {renderStepsTable(followerSteps, 'follower')}
          {rich.techniqueNotes && (
            <div className="detail-notes" style={{marginTop: 8}}>
              <span style={{fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--ink-faint)'}}>Technique · </span>
              {rich.techniqueNotes}
            </div>
          )}
        </div>
      ) : (
        // Fallback for figures without rich data
        <div>
          {fig && <div className="detail-rise">{fig.rise}</div>}
          {fig && (
            <table className="detail-table">
              <thead><tr><th>Beat</th><th>Footwork</th><th>Sway</th><th>Alignment</th></tr></thead>
              <tbody>
                {fig.c.split(',').map((beat, i) => (
                  <tr key={i}>
                    <td>{beat}</td>
                    <td>{(fig.fw.split(',')[i]) || '—'}</td>
                    <td>{(fig.sw||'').split(',')[i] || '—'}</td>
                    <td>{(fig.al||'').split(',')[i] || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {fig?.notes && <div className="detail-notes">{fig.notes}</div>}
        </div>
      )}

      {mtNotes && (
        <div className="detail-mt-notes">
          <span className="detail-mt-notes-label">MT Notes</span>
          <div>{mtNotes}</div>
        </div>
      )}
    </div>
  )
}

// ─── TEC DETAIL PANEL ────────────────────────────────
function TecDetailPanel({ tecId, mtNotes, onClose }) {
  const tec = getTec(tecId)
  if (!tec) return <div className="detail-panel"><div style={{color:'var(--ink-faint)'}}>TEC not found.</div></div>
  return (
    <div className="detail-panel">
      {onClose && (
        <div className="detail-panel-header">
          <div>
            <div className="detail-panel-type">TEC · {tec.category}</div>
            <div className="detail-panel-name">{tec.name}</div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
      )}
      {!onClose && (
        <div className="detail-panel-header">
          <div className="detail-panel-type">TEC · {tec.category}</div>
          <div className="detail-panel-name">{tec.name}</div>
        </div>
      )}
      <div className="detail-summary">{tec.summary}</div>
      <div className="detail-body">
        {tec.detail.split('\n').map((line, i) =>
          line === '' ? <br key={i} /> : <p key={i}>{line}</p>
        )}
      </div>
      {mtNotes && (
        <div className="detail-mt-notes">
          <span className="detail-mt-notes-label">MT Notes</span>
          <div>{mtNotes}</div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────
// ─── PS VIEW — 3 LEVELS ──────────────────────────────
// ─────────────────────────────────────────────────────
function PSView({ session }) {
  const [level, setLevel] = useState(1)
  const [activeSection, setActiveSection] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const goToSection = (section) => { setActiveSection(section); setLevel(2) }
  const goToItem = (item) => { setActiveItem(item); setLevel(3) }
  const goBack = () => {
    if (level === 3) { setLevel(2); setActiveItem(null) }
    else if (level === 2) { setLevel(1); setActiveSection(null) }
  }

  return (
    <div className="ps-view">
      {/* Breadcrumb */}
      <div className="ps-breadcrumb">
        <span
          className={`ps-crumb${level === 1 ? ' active' : ' clickable'}`}
          onClick={() => { if (level > 1) { setLevel(1); setActiveSection(null); setActiveItem(null) } }}
        >Session</span>
        {level >= 2 && activeSection && (
          <>
            <span className="ps-crumb-sep">›</span>
            <span
              className={`ps-crumb${level === 2 ? ' active' : ' clickable'}`}
              onClick={() => { if (level === 3) goBack() }}
            >{activeSection.title}</span>
          </>
        )}
        {level === 3 && activeItem && (
          <>
            <span className="ps-crumb-sep">›</span>
            <span className="ps-crumb active">{activeItem.name}</span>
          </>
        )}
      </div>

      {/* ── LEVEL 1 — Session overview ── */}
      {level === 1 && (
        <div className="ps-level1">
          <div className="ps-session-header">
            <h2>{session.title}</h2>
            <div className="ps-session-meta">
              <span>📅 {session.date}</span>
              {session.time && <span>🕐 {session.time}</span>}
              <span>⏱ {totalSessionMinutes(session.sections)} min total</span>
              {(session.studentNames || []).length > 0 && (
                <span>👥 {session.studentNames.join(', ')}</span>
              )}
            </div>
          </div>
          <div className="ps-hint">Tap a section to open ›</div>
          <div className="ps-section-cards">
            {session.sections.map((sec, i) => (
              <div key={sec.id} className="ps-section-card" onClick={() => goToSection(sec)}>
                <div className="ps-section-card-left">
                  <span className="ps-section-number">{i + 1}</span>
                  <span className="ps-section-icon-lg">{sectionIcon(sec.type)}</span>
                  <div>
                    <div className="ps-section-card-type">{sectionTypeLabel(sec.type)}</div>
                    <div className="ps-section-card-title">{sec.title}</div>
                    {sec.type === 'main' && (
                      <div className="ps-section-card-mode">
                        {sec.mode === 'figures' ? '▶ Figures-led' : '◆ TEC-led'} · {(sec.items || []).length} items
                      </div>
                    )}
                    {sec.type === 'warmup' && (
                      <div className="ps-section-card-mode">
                        {(sec.dances || []).map(d => `${d.dance} ${d.minutes}min`).join(' · ')}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ps-section-card-right">
                  <div className="ps-section-card-time">{totalSectionMinutes(sec)}<span style={{fontSize:10,marginLeft:2}}>min</span></div>
                  <span className="ps-section-card-chevron">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LEVEL 2 — Section detail ── */}
      {level === 2 && activeSection && (
        <div className="ps-level2">
          <button className="ps-back-btn" onClick={goBack}>← Back</button>
          <div className="ps-level2-header">
            <div className="ps-level2-type">{sectionIcon(activeSection.type)} {sectionTypeLabel(activeSection.type)}</div>
            <h2>{activeSection.title}</h2>
            <div className="ps-level2-time">⏱ {totalSectionMinutes(activeSection)} min</div>
          </div>

          {activeSection.type === 'warmup' && (
            <div className="ps-warmup">
              <div className="ps-hint">Dances in rotation — 1:45 each</div>
              {(activeSection.dances || []).map((d, i) => (
                <div key={i} className="ps-warmup-dance">
                  <span className="ps-warmup-dance-name">{d.dance}</span>
                  <span className="ps-warmup-dance-time">{d.minutes} min</span>
                </div>
              ))}
            </div>
          )}

          {activeSection.type === 'main' && (
            <div className="ps-main">
              <div className="ps-hint">Tap any card to see full description ›</div>
              <div className="ps-items-list">
                {(activeSection.items || []).map((item, i) => {
                  const isPrimary = activeSection.mode === 'figures'
                    ? item.kind === 'figure'
                    : item.kind === 'tec'
                  const tec = item.kind === 'tec' ? getTec(item.tecId) : null
                  return (
                    <div key={item.id} className={`ps-item-card${isPrimary ? ' primary' : ''}`}>
                      <div className="ps-item-card-main" onClick={() => goToItem(item)}>
                        <div className="ps-item-card-left">
                          <span className="ps-item-num">{i + 1}</span>
                          <span className={`ps-item-kind-icon kind-${item.kind}`}>
                            {item.kind === 'figure' ? '▶' : '◆'}
                          </span>
                          <div className="ps-item-text">
                            <div className="ps-item-name">{item.name}</div>
                            {tec && <div className="ps-item-sub">{tec.summary.slice(0, 70)}{tec.summary.length > 70 ? '…' : ''}</div>}
                            {isPrimary && <span className="ps-item-primary-badge">PRIMARY</span>}
                          </div>
                        </div>
                        <div className="ps-item-card-right">
                          {item.minutes && <span className="ps-item-time">{item.minutes}m</span>}
                          <span className="ps-item-chevron">›</span>
                        </div>
                      </div>
                      {(item.children || []).length > 0 && (
                        <div className="ps-item-children">
                          {item.children.map(child => (
                            <div key={child.id} className="ps-child-chip" onClick={() => goToItem(child)}>
                              <span className={`ps-child-icon kind-${child.kind}`}>
                                {child.kind === 'figure' ? '▶' : '◆'}
                              </span>
                              <span>{child.name}</span>
                              <span className="ps-child-chevron">›</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeSection.type === 'conclusion' && (
            <div className="ps-conclusion">
              <div className="ps-conclusion-label">Teaching Notes from MT</div>
              <div className="ps-conclusion-text">{activeSection.teachingNotes || 'No notes provided.'}</div>
            </div>
          )}
        </div>
      )}

      {level === 3 && activeItem && (
        <div className="ps-level3">
          <button className="ps-back-btn" onClick={goBack}>← Back</button>
          {activeItem.kind === 'figure' && (
            <FigureDetailPanel
              figureName={activeItem.name}
              mtNotes={activeItem.mtNotes}
              alignmentOverrides={activeItem.alignmentOverrides}
              barsUsed={activeItem.barsUsed}
              isEditable={false}
            />
          )}
          {activeItem.kind === 'tec' && (
            <TecDetailPanel tecId={activeItem.tecId} mtNotes={activeItem.mtNotes} />
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────
// ─── MT BUILDER ──────────────────────────────────────
// ─────────────────────────────────────────────────────
function LibraryPanel() {
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState('figures')

  const figures = WALTZ_FIGURES.filter(f => f.n.toLowerCase().includes(search.toLowerCase()))
  const tecs = TEC_LIBRARY.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  )

  const dragStart = (e, data) => {
    e.dataTransfer.setData('application/json', JSON.stringify(data))
    e.dataTransfer.effectAllowed = 'copy'
  }

  return (
    <div className="library-panel">
      <div className="library-header">
        <div className="library-title">Library · Waltz</div>
        <input className="library-search" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="library-tabs">
          <button className={`library-tab${tab === 'figures' ? ' active' : ''}`} onClick={() => setTab('figures')}>
            ▶ Figures
          </button>
          <button className={`library-tab${tab === 'tec' ? ' active' : ''}`} onClick={() => setTab('tec')}>
            ◆ TECs
          </button>
        </div>
      </div>
      <div className="library-list">
        {tab === 'figures' && figures.map(fig => (
          <div
            key={fig.n}
            className="library-item library-figure"
            draggable
            onDragStart={e => dragStart(e, { kind: 'figure', name: fig.n })}
            title={fig.notes}
          >
            <span className="lib-icon">▶</span>
            <div className="lib-text">
              <div className="lib-name">{fig.n}</div>
              <div className="lib-sub">{fig.c} · {fig.fw}</div>
            </div>
          </div>
        ))}
        {tab === 'tec' && tecs.map(tec => (
          <div
            key={tec.id}
            className="library-item library-tec"
            draggable
            onDragStart={e => dragStart(e, { kind: 'tec', tecId: tec.id, name: tec.name })}
            title={tec.summary}
          >
            <span className="lib-icon tec-icon">◆</span>
            <div className="lib-text">
              <div className="lib-name">{tec.name}</div>
              <div className="lib-sub">{tec.category}</div>
            </div>
          </div>
        ))}
        {((tab === 'figures' && figures.length === 0) || (tab === 'tec' && tecs.length === 0)) && (
          <div className="library-empty">No results</div>
        )}
      </div>
    </div>
  )
}

function BuilderSection({ section, onUpdate, onDelete, selectedItemId, onSelectItem }) {
  const [rootDragOver, setRootDragOver] = useState(false)
  const [childDragOver, setChildDragOver] = useState(null)
  const [reorderDragId, setReorderDragId] = useState(null)
  const [reorderOverId, setReorderOverId] = useState(null)

  const update = (changes) => onUpdate({ ...section, ...changes })

  const handleDropRoot = (e) => {
    e.preventDefault(); setRootDragOver(false)
    if (section.type !== 'main') return
    // Ignore reorder drops — handled by item drop handlers
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      if (data._reorder) return
      const newItem = { id: uid(), kind: data.kind, name: data.name, tecId: data.tecId || null, minutes: 5, mtNotes: '', children: [] }
      update({ items: [...(section.items || []), newItem] })
    } catch {}
  }

  const handleDropChild = (e, parentId) => {
    e.preventDefault(); e.stopPropagation(); setChildDragOver(null)
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'))
      if (data._reorder) return
      const newChild = { id: uid(), kind: data.kind, name: data.name, tecId: data.tecId || null }
      update({ items: (section.items || []).map(it => it.id === parentId ? { ...it, children: [...(it.children || []), newChild] } : it) })
    } catch {}
  }

  const handleReorderDrop = (e, targetId) => {
    e.preventDefault(); e.stopPropagation()
    setReorderOverId(null); setReorderDragId(null)
    if (!reorderDragId || reorderDragId === targetId) return
    const items = section.items || []
    const fromIdx = items.findIndex(i => i.id === reorderDragId)
    const toIdx = items.findIndex(i => i.id === targetId)
    if (fromIdx === -1 || toIdx === -1) return
    const next = [...items]
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    update({ items: next })
  }

  const deleteItem = (id) => update({ items: (section.items || []).filter(it => it.id !== id) })
  const deleteChild = (parentId, childId) => update({
    items: (section.items || []).map(it => it.id === parentId
      ? { ...it, children: (it.children || []).filter(c => c.id !== childId) }
      : it)
  })

  const sectionAccent = section.type === 'warmup' ? '#4a8a50'
    : section.type === 'conclusion' ? '#4a5a8a'
    : WALTZ_COLOR.bg

  return (
    <div className="builder-section" style={{ borderLeftColor: sectionAccent }}>
      <div className="builder-section-header">
        <span className="builder-section-icon">{sectionIcon(section.type)}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input
            className="builder-section-title-input"
            value={section.title}
            onChange={e => update({ title: e.target.value })}
            placeholder="Section title"
          />
          <div className="builder-section-meta">
            {sectionTypeLabel(section.type)} · {totalSectionMinutes(section)} min
            {section.type === 'main' && (
              <span className="mode-toggle-inline">
                <button className={`mode-btn${section.mode === 'figures' ? ' active' : ''}`}
                  onClick={() => update({ mode: 'figures' })}>Figures-led</button>
                <button className={`mode-btn${section.mode === 'tec' ? ' active' : ''}`}
                  onClick={() => update({ mode: 'tec' })}>TEC-led</button>
              </span>
            )}
          </div>
        </div>
        <button className="icon-btn danger" onClick={() => onDelete(section.id)}>✕</button>
      </div>

      {/* WARMUP */}
      {section.type === 'warmup' && (
        <div className="builder-section-body">
          {(section.dances || []).map((d, i) => (
            <div key={i} className="warmup-row">
              <span className="warmup-dance-lbl">{d.dance}</span>
              <input className="form-input minutes-input" type="number" min={1} max={60} value={d.minutes}
                onChange={e => { const dd = [...section.dances]; dd[i] = { ...d, minutes: +e.target.value }; update({ dances: dd }) }} />
              <span className="unit-lbl">min</span>
              <button className="icon-btn danger" onClick={() => update({ dances: section.dances.filter((_, j) => j !== i) })}>✕</button>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 6 }}
            onClick={() => update({ dances: [...(section.dances || []), { dance: 'Waltz', minutes: 2 }] })}>
            + Add dance
          </button>
        </div>
      )}

      {/* MAIN TOPIC TREE */}
      {section.type === 'main' && (
        <div className="builder-section-body">
          <div
            className={`builder-drop-zone${rootDragOver ? ' drag-over' : ''}`}
            onDragOver={e => { e.preventDefault(); setRootDragOver(true) }}
            onDragLeave={() => setRootDragOver(false)}
            onDrop={handleDropRoot}
          >
            {(section.items || []).length === 0 && (
              <div className="drop-hint">← Drag figures or TECs from the library</div>
            )}
            {(section.items || []).map((item) => {
              const isPrimary = section.mode === 'figures' ? item.kind === 'figure' : item.kind === 'tec'
              const isDragging = reorderDragId === item.id
              const isOver = reorderOverId === item.id
              return (
                <div
                  key={item.id}
                  className={`tree-item${selectedItemId === item.id ? ' selected' : ''}${isDragging ? ' reorder-dragging' : ''}${isOver ? ' reorder-over' : ''}`}
                  draggable
                  onDragStart={e => { setReorderDragId(item.id); e.dataTransfer.setData('application/json', JSON.stringify({ _reorder: true })) }}
                  onDragEnd={() => { setReorderDragId(null); setReorderOverId(null) }}
                  onDragOver={e => { e.preventDefault(); e.stopPropagation(); setReorderOverId(item.id) }}
                  onDragLeave={e => { e.stopPropagation(); setReorderOverId(null) }}
                  onDrop={e => handleReorderDrop(e, item.id)}
                  onClick={() => onSelectItem(section.id, item, section.mode)}
                >
                  <div className="tree-item-row">
                    <span className="tree-drag-handle" title="Drag to reorder">⠿</span>
                    <span className={`tree-kind kind-${item.kind}`}>{item.kind === 'figure' ? '▶' : '◆'}</span>
                    <span className="tree-item-name">{item.name}</span>
                    {isPrimary && <span className="tree-primary-badge">MAIN</span>}
                    <input
                      className="form-input minutes-input-sm"
                      type="number" min={1} max={120}
                      value={item.minutes || ''}
                      onChange={e => update({ items: (section.items || []).map(it => it.id === item.id ? { ...it, minutes: +e.target.value } : it) })}
                      onClick={e => e.stopPropagation()}
                      placeholder="min"
                      title="Duration"
                    />
                    <button className="icon-btn danger" onClick={e => { e.stopPropagation(); deleteItem(item.id) }}>✕</button>
                  </div>
                  {(item.children || []).map(child => (
                    <div key={child.id} className="tree-child-row">
                      <span className="tree-child-connector">└─</span>
                      <span className={`tree-kind tree-kind-sm kind-${child.kind}`}>{child.kind === 'figure' ? '▶' : '◆'}</span>
                      <span className="tree-child-name">{child.name}</span>
                      <button className="icon-btn danger" style={{ marginLeft: 'auto' }}
                        onClick={e => { e.stopPropagation(); deleteChild(item.id, child.id) }}>✕</button>
                    </div>
                  ))}
                  <div
                    className={`child-drop-zone${childDragOver === item.id ? ' drag-over' : ''}`}
                    onDragOver={e => { e.preventDefault(); e.stopPropagation(); setChildDragOver(item.id) }}
                    onDragLeave={e => { e.stopPropagation(); setChildDragOver(null) }}
                    onDrop={e => handleDropChild(e, item.id)}
                  >
                    drop child here
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* CONCLUSION */}
      {section.type === 'conclusion' && (
        <div className="builder-section-body">
          <label className="form-label">Teaching Notes</label>
          <textarea className="form-textarea" value={section.teachingNotes || ''}
            onChange={e => update({ teachingNotes: e.target.value })}
            placeholder="Summary, key reminders, homework…" style={{ minHeight: 90 }} />
        </div>
      )}
    </div>
  )
}

function ItemEditor({ item, onUpdate }) {
  if (!item) return (
    <div className="editor-empty">
      <div style={{ fontSize: 32, opacity: 0.2, marginBottom: 10 }}>✎</div>
      <div>Select an item<br />from the tree to edit</div>
    </div>
  )
  const update = (c) => onUpdate({ ...item, ...c })
  const tec = item.kind === 'tec' ? getTec(item.tecId) : null
  const fig = item.kind === 'figure' ? getFigure(item.name) : null
  const rich = item.kind === 'figure' ? FIGURE_RICH_DATA[item.name] : null
  const barNums = rich ? [...new Set(rich.leader.map(s => s.bar))] : []
  const barsUsed = item.barsUsed || barNums

  const handleBarToggle = (bar) => {
    const current = item.barsUsed || barNums
    const next = current.includes(bar)
      ? current.filter(b => b !== bar)
      : [...current, bar].sort()
    // Must keep at least one bar
    if (next.length === 0) return
    update({ barsUsed: next })
  }

  const handleAlignmentChange = (key, val) => {
    const overrides = { ...(item.alignmentOverrides || {}) }
    if (val === '') {
      delete overrides[key]
    } else {
      overrides[key] = val
    }
    update({ alignmentOverrides: overrides })
  }

  return (
    <div className="item-editor">
      <div className="item-editor-header">
        <span className={`editor-kind-badge kind-${item.kind}`}>{item.kind === 'figure' ? '▶ Figure' : '◆ TEC'}</span>
        <div className="editor-item-name">{item.name}</div>
        {tec && <div className="editor-item-sub">{tec.category} · {tec.summary}</div>}
        {fig && rich && <div className="editor-item-sub">Waltz · {rich.bars} bar{rich.bars > 1 ? 's' : ''}</div>}
      </div>

      <div className="form-group">
        <label className="form-label">Duration (min)</label>
        <input type="number" min={1} max={120} className="form-input minutes-input"
          value={item.minutes || ''} onChange={e => update({ minutes: +e.target.value })} />
      </div>

      {/* Bar selector — only for multi-bar figures */}
      {barNums.length > 1 && (
        <div className="form-group">
          <label className="form-label">Bars to use</label>
          <div className="bar-selector">
            {barNums.map(b => (
              <button
                key={b}
                className={`bar-select-btn${barsUsed.includes(b) ? ' active' : ''}`}
                onClick={() => handleBarToggle(b)}
              >
                Bar {b}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <label className="form-label">MT Notes</label>
        <textarea className="form-textarea" value={item.mtNotes || ''}
          onChange={e => update({ mtNotes: e.target.value })}
          placeholder="Teaching focus, corrections, drill instructions…" style={{ minHeight: 90 }} />
      </div>

      <div className="editor-detail-section">
        {fig && (
          <FigureDetailPanel
            figureName={item.name}
            alignmentOverrides={item.alignmentOverrides}
            barsUsed={barsUsed}
            onAlignmentChange={handleAlignmentChange}
            isEditable={true}
          />
        )}
        {tec && <TecDetailPanel tecId={item.tecId} />}
      </div>
    </div>
  )
}

function MTBuilder({ session, onSessionChange }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const update = (c) => onSessionChange({ ...session, ...c })

  const updateSection = (updated) => {
    const sections = session.sections.map(s => s.id === updated.id ? updated : s)
    update({ sections })
    if (selectedItem) {
      const sec = sections.find(s => s.type === 'main' && (s.items || []).some(i => i.id === selectedItem.id))
      if (sec) {
        const fresh = sec.items.find(i => i.id === selectedItem.id)
        if (fresh) setSelectedItem(fresh)
      }
    }
  }

  const deleteSection = (id) => {
    update({ sections: session.sections.filter(s => s.id !== id) })
    if (selectedItem) setSelectedItem(null)
  }

  const addSection = (type) => {
    const base = { id: uid(), title: sectionTypeLabel(type) }
    const newSec = type === 'warmup'
      ? { ...base, type, minutes: 10, dances: [{ dance: 'Waltz', minutes: 10 }] }
      : type === 'main'
        ? { ...base, type, minutes: 15, mode: 'figures', items: [] }
        : { ...base, type, minutes: 10, teachingNotes: '' }
    update({ sections: [...session.sections, newSec] })
  }

  const handleSelectItem = (sectionId, item) => setSelectedItem(item)

  const handleItemUpdate = (updatedItem) => {
    const sections = session.sections.map(sec => {
      if (sec.type !== 'main') return sec
      return { ...sec, items: (sec.items || []).map(it => it.id === updatedItem.id ? updatedItem : it) }
    })
    update({ sections })
    setSelectedItem(updatedItem)
  }

  return (
    <div className="mt-builder">
      <LibraryPanel />

      <div className="builder-tree-panel">
        <div className="builder-tree-topbar">
          <input className="session-title-input" value={session.title}
            onChange={e => update({ title: e.target.value })} placeholder="Session title" />
          <div className="session-meta-row">
            <input type="date" className="form-input" style={{ width: 140 }} value={session.date || ''}
              onChange={e => update({ date: e.target.value })} />
            <input type="time" className="form-input" style={{ width: 100 }} value={session.time || ''}
              onChange={e => update({ time: e.target.value })} />
            <span className="session-total-badge">{totalSessionMinutes(session.sections)} min</span>
          </div>
          <div className="session-meta-row">
            <span className="form-label" style={{ marginBottom: 0, flexShrink: 0 }}>Students</span>
            <input className="form-input" style={{ flex: 1 }}
              value={(session.studentNames || []).join(', ')}
              onChange={e => update({ studentNames: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
              placeholder="Names, comma-separated" />
          </div>
        </div>

        <div className="builder-sections-scroll">
          {session.sections.map((sec, i) => (
            <BuilderSection
              key={sec.id}
              section={sec}
              onUpdate={updateSection}
              onDelete={deleteSection}
              selectedItemId={selectedItem?.id}
              onSelectItem={handleSelectItem}
            />
          ))}
          {session.sections.length === 0 && (
            <div className="empty-state">
              <div style={{ fontSize: 36, opacity: 0.2, marginBottom: 10 }}>🎼</div>
              <div>Add sections below to build your session</div>
            </div>
          )}
        </div>

        <div className="builder-add-bar">
          <button className="btn btn-ghost btn-sm" onClick={() => addSection('warmup')}>+ Warm-up</button>
          <button className="btn btn-primary btn-sm" onClick={() => addSection('main')}>+ Main Topic</button>
          <button className="btn btn-ghost btn-sm" onClick={() => addSection('conclusion')}>+ Conclusion</button>
        </div>
      </div>

      <div className="builder-editor-panel">
        <div className="builder-editor-header">Item Editor</div>
        <div className="builder-editor-body">
          <ItemEditor item={selectedItem} onUpdate={handleItemUpdate} />
        </div>
      </div>
    </div>
  )
}

// ─── SESSION LIST ─────────────────────────────────────
function SessionList({ sessions, activeId, onSelect, onNew, onDelete, readOnly }) {
  return (
    <div className="sessions-page">
      <div className="sessions-header">
        <h2>Sessions</h2>
        {!readOnly && <button className="btn btn-primary" onClick={onNew}>+ New Session</button>}
      </div>
      {sessions.length === 0 ? (
        <div className="empty-state">
          <div style={{ fontSize: 40, opacity: 0.25, marginBottom: 12 }}>🎼</div>
          <div>No sessions yet</div>
          {!readOnly && <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={onNew}>Create your first session</button>}
        </div>
      ) : sessions.map(s => (
        <div key={s.id} className={`session-card${s.id === activeId ? ' active' : ''}`} onClick={() => onSelect(s.id)}>
          <div className="session-card-info">
            <div className="session-card-title">{s.title || 'Untitled'}</div>
            <div className="session-card-meta">
              <span>📅 {s.date || '—'}</span>
              {s.time && <span>🕐 {s.time}</span>}
              <span>⏱ {totalSessionMinutes(s.sections)} min</span>
              <span>{(s.sections || []).filter(sec => sec.type === 'main').length} main topics</span>
            </div>
            {(s.studentNames || []).length > 0 && (
              <div className="session-card-students">👥 {s.studentNames.join(', ')}</div>
            )}
          </div>
          {!readOnly && (
            <button className="btn btn-danger" onClick={e => { e.stopPropagation(); onDelete(s.id) }}>Delete</button>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── GLOSSARY ─────────────────────────────────────────
function GlossaryView() {
  const [search, setSearch] = useState('')
  const terms = Object.entries(GLOSSARY).filter(([k, v]) =>
    k.toLowerCase().includes(search.toLowerCase()) || v.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="sessions-page">
      <div className="sessions-header"><h2>Glossary</h2></div>
      <input className="form-input" style={{ marginBottom: 16 }} placeholder="Search…"
        value={search} onChange={e => setSearch(e.target.value)} />
      <div className="glossary-grid">
        {terms.map(([k, v]) => (
          <div key={k} className="glossary-item">
            <div className="glossary-term">{k}</div>
            <div className="glossary-def">{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── APP ROOT ─────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState(null)
  const [view, setView] = useState('sessions')
  const [sessions, setSessions] = useState(() => {
    try { const s = localStorage.getItem('sp-sessions'); return s ? JSON.parse(s) : SEED_SESSIONS } catch { return SEED_SESSIONS }
  })
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('sp-sessions', JSON.stringify(sessions)) } catch {}
  }, [sessions])

  const active = sessions.find(s => s.id === activeId) || null
  const isPS = role === 'ps'

  const newSession = () => {
    const s = { id: uid(), title: 'New Session', date: new Date().toISOString().slice(0,10), time: '', studentNames: [], sections: [] }
    setSessions(ss => [s, ...ss])
    setActiveId(s.id)
    setView('builder')
  }

  if (!role) return <RoleGate onSelect={setRole} />

  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-brand">StudioPlanner</div>
        <div className="topbar-nav">
          <button className={`btn-nav${view === 'sessions' ? ' active' : ''}`} onClick={() => setView('sessions')}>Sessions</button>
          {active && (
            <button className={`btn-nav${view === 'builder' ? ' active' : ''}`} onClick={() => setView('builder')}>
              {isPS ? 'View Plan' : 'Builder'}
            </button>
          )}
          <button className={`btn-nav${view === 'glossary' ? ' active' : ''}`} onClick={() => setView('glossary')}>Glossary</button>
        </div>
        <div className="topbar-right">
          <span className={`role-badge ${role}`}>{isPS ? 'Practice Supervisor' : 'Main Teacher'}</span>
          <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setRole(null)}>Switch Role</button>
        </div>
      </div>
      <div className="main-content">
        {view === 'sessions' && (
          <SessionList sessions={sessions} activeId={activeId}
            onSelect={id => { setActiveId(id); setView('builder') }}
            onNew={newSession}
            onDelete={id => { setSessions(ss => ss.filter(s => s.id !== id)); if (activeId === id) { setActiveId(null); setView('sessions') } }}
            readOnly={isPS}
          />
        )}
        {view === 'builder' && active && (
          isPS ? <PSView session={active} /> : <MTBuilder session={active} onSessionChange={u => setSessions(ss => ss.map(s => s.id === u.id ? u : s))} />
        )}
        {view === 'builder' && !active && (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--ink-faint)' }}>Select a session first</div>
        )}
        {view === 'glossary' && <GlossaryView />}
      </div>
    </div>
  )
}
