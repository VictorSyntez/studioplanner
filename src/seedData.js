let _id = 1
const id = () => `seed-${_id++}`

export const SEED_SESSIONS = [
  {
    id: id(),
    title: 'Supervised Practice — Beginner Waltz',
    date: new Date().toISOString().slice(0, 10),
    time: '16:30',
    totalMinutes: 55,
    studentNames: ['Anna & Michael', 'Sarah & James'],
    sections: [
      // ── 1. WARM-UP ──────────────────────────────────
      {
        id: id(),
        type: 'warmup',
        title: 'Warm-up',
        minutes: 10,
        dances: [
          { dance: 'Waltz', minutes: 10 },
        ],
      },

      // ── 2. MAIN TOPIC 1 — Figures-led ───────────────
      {
        id: id(),
        type: 'main',
        title: 'Waltz Sequence',
        minutes: 20,
        mode: 'figures',   // figures are primary, TECs are subordinate
        items: [
          {
            id: id(),
            kind: 'figure',
            dance: 'Waltz',
            name: 'Closed Change (RF)',
            minutes: 4,
            mtNotes: 'Start here — simplest figure. Check heel-toe footwork.',
            children: [
              { id: id(), kind: 'tec', tecId: 'tec-footwork', name: 'Footwork' },
              { id: id(), kind: 'tec', tecId: 'tec-count1-drive', name: 'Count 1 — Drive' },
            ],
          },
          {
            id: id(),
            kind: 'figure',
            dance: 'Waltz',
            name: 'Natural Turn',
            minutes: 8,
            mtNotes: 'Emphasise CBM on step 1. Don\'t rush beat 2.',
            children: [
              { id: id(), kind: 'tec', tecId: 'tec-cbm', name: 'CBM — Contrary Body Movement' },
              { id: id(), kind: 'tec', tecId: 'tec-rise-fall', name: 'Rise & Fall' },
              { id: id(), kind: 'tec', tecId: 'tec-sway', name: 'Sway' },
            ],
          },
          {
            id: id(),
            kind: 'figure',
            dance: 'Waltz',
            name: 'Closed Change (LF)',
            minutes: 3,
            mtNotes: 'Link back from Natural Turn. Mirror of RF Change.',
            children: [],
          },
          {
            id: id(),
            kind: 'figure',
            dance: 'Waltz',
            name: 'Reverse Turn',
            minutes: 5,
            mtNotes: 'Heel turn on step 2 for lady. Leader drives strongly on 1.',
            children: [
              { id: id(), kind: 'tec', tecId: 'tec-heel-turn', name: 'Heel Turn' },
            ],
          },
        ],
      },

      // ── 3. MAIN TOPIC 2 — TEC-led ───────────────────
      {
        id: id(),
        type: 'main',
        title: 'Rise & Fall Focus',
        minutes: 15,
        mode: 'tec',   // TEC is primary, figures are illustrations
        items: [
          {
            id: id(),
            kind: 'tec',
            tecId: 'tec-rise-fall',
            name: 'Rise & Fall',
            minutes: 8,
            mtNotes: 'Wall exercise: hand on wall, practise rising and lowering before adding partner.',
            children: [
              { id: id(), kind: 'figure', dance: 'Waltz', name: 'Natural Turn' },
              { id: id(), kind: 'figure', dance: 'Waltz', name: 'Reverse Turn' },
            ],
          },
          {
            id: id(),
            kind: 'tec',
            tecId: 'tec-count3-settle',
            name: 'Count 3 — Settle',
            minutes: 7,
            mtNotes: 'Use the 3& timing exercise. Clap on the &. Students feel the difference.',
            children: [
              { id: id(), kind: 'figure', dance: 'Waltz', name: 'Closed Change (RF)' },
              { id: id(), kind: 'figure', dance: 'Waltz', name: 'Closed Change (LF)' },
            ],
          },
        ],
      },

      // ── 4. CONCLUSION ────────────────────────────────
      {
        id: id(),
        type: 'conclusion',
        title: 'Conclusion',
        minutes: 10,
        teachingNotes: 'Run through the full sequence: Closed Change RF → Natural Turn → Closed Change LF → Reverse Turn. Focus on continuity between figures — end of count 3 feeds into next count 1. Remind students to practise the wall exercise at home for Rise & Fall.',
      },
    ],
  },
]
