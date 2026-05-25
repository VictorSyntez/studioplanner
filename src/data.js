// ─── SYLLABUS LEVELS & FIGURE QUERIES ────────────────
export const LEVEL_ORDER = ['Beginners', 'Pre-Bronze', 'Bronze', 'Silver', 'Gold', 'Gold Star']

export function levelIndex(level) {
  return LEVEL_ORDER.indexOf(level)
}

// NOTE: FIGURES is still keyed by dance ({ 'Waltz': [...] }) in this pass, so we
// flatten its values rather than calling FIGURES.filter directly (see §4.3).
export function getFigures({ dance, maxLevel, category } = {}) {
  return Object.values(FIGURES).flat().filter(f => {
    if (dance && f.dance !== dance) return false
    if (category && f.category !== category) return false
    if (maxLevel && levelIndex(f.syllabusLevel) > levelIndex(maxLevel)) return false
    return true
  }).sort((a, b) =>
    levelIndex(a.syllabusLevel) - levelIndex(b.syllabusLevel) ||
    a.syllabusNumber - b.syllabusNumber
  )
}

export function getFiguresForSession(session) {
  return getFigures({ maxLevel: session.targetLevel || undefined })
}

// ─── DANCE COLORS ────────────────────────────────────
export const DANCE_COLORS = {
  'Waltz': { bg: '#1D69A2', lt: '#c4ddf0' },
}

// ─── WALTZ FIGURES ───────────────────────────────────
export const FIGURES = {
  'Waltz': [
    { n: 'Natural Turn',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FW,BDC',           sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'CBM on 1. Body swings R. No sway on step 1.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 2, syllabusBody: 'NDCC' },
    { n: 'Reverse Turn',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC,FC,BDW',           sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'CBM on 1. Heel turn step 2. Body swings L.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 3, syllabusBody: 'NDCC' },
    { n: 'Closed Change (RF)',     c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC,FDC,FD',           sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Slight CBM step 1. Side step slightly fwd on 2.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 1, syllabusBody: 'NDCC' },
    { n: 'Closed Change (LF)',     c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,FDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Opposite of RF Closed Change.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 1, syllabusBody: 'NDCC' },
    { n: 'Natural Spin Turn',      c: '1-2-3,4-5-6', fw: 'HT,T,TH,TH,T,TH',   al: 'FDW',                  sw: 'S,R,R,S,L,L', rise: 'Rise e/o 1, pivot on 3, top 5&6',      notes: 'Pivot on step 3. Strong body swing.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 4, syllabusBody: 'NDCC' },
    { n: 'Double Reverse Spin',    c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC',                  sw: 'S,L,L',       rise: 'Rise e/o 1, top 2, lower e/o 3',       notes: '3/8 turn L. Heel turn for lady.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 13, syllabusBody: 'NDCC' },
    { n: 'Whisk',                  c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,BDW',          sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3',                  notes: 'Step 3 crosses behind into Promenade Position.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 5, syllabusBody: 'NDCC' },
    { n: 'Chassé from PP',         c: '1-&-2',       fw: 'TH,T,TH',            al: 'LOD,LOD,LOD',          sw: 'S,S,S',       rise: 'Cont rise',                             notes: 'From PP. Side, close, side. Quick steps.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 6, syllabusBody: 'NDCC' },
    { n: 'Hesitation Change',      c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FW,BDC',           sw: 'S,L,L',       rise: 'Rise e/o 1, lower e/o 3',               notes: 'Step 2: close foot without transferring weight.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 8, syllabusBody: 'NDCC' },
    { n: 'Outside Change',         c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,BDC',          sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Leader steps outside partner on step 1. CBMP.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 9, syllabusBody: 'NDCC' },
    { n: 'Hover Corté',            c: '1-2-3',       fw: 'HT,T,T',             al: 'FDW,BDW,BDW',          sw: 'S,L,L',       rise: 'Rise to top 2&3, no lower on 3',        notes: 'Hover action — do not lower on step 3.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 32, syllabusBody: 'NDCC' },
    { n: 'Contra Check',           c: '1-2-3',       fw: 'HT,TH,T',            al: 'LOD,BLOD,BLOD',        sw: 'S,S,S',       rise: 'Lower into 1',                          notes: 'Strong forward check on 1. Body contra to feet.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 27, syllabusBody: 'NDCC' },
    { n: 'Back Lock',              c: '1-2-3',       fw: 'TH,T,TH',            al: 'BDW,BDW,BDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Back, side-cross-behind, side. Lock action.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 15, syllabusBody: 'NDCC' },
    { n: 'Back Whisk',             c: '1-2-3',       fw: 'TH,T,TH',            al: 'BDC,BDC,BDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3',                  notes: 'Backs into Promenade. Step 3 behind.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 11, syllabusBody: 'NDCC' },
    { n: 'Closed Impetus',         c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,BDW,FDC',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Heel turn on 2. Used to change direction.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 7, syllabusBody: 'NDCC' },
    { n: 'Fallaway Reverse & Slip Pivot', c: '1-2-3,4', fw: 'HT,T,TH,T',      al: 'FDC,BDW,FDW,Spot',     sw: 'S,L,L,S',    rise: 'Rise e/o 1, top 2&3, pivot 4',         notes: 'Ends in PP. Slip pivot is a strong rotation.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 30, syllabusBody: 'NDCC' },
    { n: 'Outside Spin',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW',                  sw: 'S,R,R',       rise: 'Rise e/o 1, top 2, lower e/o 3',       notes: 'Leader outside partner. Strong spin.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 24, syllabusBody: 'NDCC' },
    { n: 'Drag Hesitation',        c: '1-2-3',       fw: 'HT,T,T',             al: 'FDW,FW,FW',            sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, no lower',        notes: 'Drag trailing foot. Held position on 3.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 21, syllabusBody: 'NDCC' },
    { n: 'Progressive Chassé to R', c: '1-&-2',      fw: 'HT,T,TH',            al: 'FDW,FDW,FDW',          sw: 'S,S,S',       rise: 'Cont rise',                             notes: 'To the right. Side, close, side. Quick.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 16, syllabusBody: 'NDCC' },
    { n: 'Turning Lock',           c: '1-2-3,4',     fw: 'HT,T,TH,T',          al: 'FDW',                  sw: 'S,R,R,S',     rise: 'Rise e/o 1, top 2&3, lower e/o 4',     notes: 'Lock on beat 4. Rotates to R.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 25, syllabusBody: 'NDCC' },
    { n: 'Basic Weave',            c: '1-2-3,1-2-3', fw: 'TH,HT,TH,TH,T,TH',  al: 'BDW,BDW,BLOD,BDC,BDC,PDW', sw: 'S,S,S,S,S,S', rise: 'Rise e/o 2, top 3&4, lower e/o 3/6',  notes: 'Backing figure. Step 2 fwd against LOD.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 12, syllabusBody: 'NDCC' },
    { n: 'Closed Telemark',        c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC,BLOD,FDW',         sw: 'S,L,S',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'CBM on 1. Leads heel turn for lady.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 18, syllabusBody: 'NDCC' },
    { n: 'Closed Wing',            c: '1-2-3',       fw: 'H,WF,WF',            al: 'FDC,FDC,FDC',          sw: 'S,S,S',       rise: 'No rise',                              notes: 'OP on step 1. Lady closes to man.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 28, syllabusBody: 'NDCC' },
    { n: 'Fallaway Whisk',         c: '1-2-3',       fw: 'TH,TH,TH',           al: 'BLOD,BDC,FDC',         sw: 'S,S,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Ends in Fallaway PP.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 31, syllabusBody: 'NDCC' },
    { n: 'Left Whisk',             c: '1-2-3',       fw: 'H,TH,T',             al: 'FDW,FDW,FDW',          sw: 'S,S,S',       rise: 'No rise',                              notes: 'Man steps RF across in PP. Ends in PP.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 26, syllabusBody: 'NDCC' },
    { n: 'Open Impetus and Cross Hesitation', c: '1-2-3,1-2-3', fw: 'TH,HT,TH,HT,TT,TH', al: 'BLOD,FDC,FDC,FDC,FDC,FDC', sw: 'S,L,S,S,S,S', rise: 'Rise e/o 2, top 3&5, lower e/o 6', notes: 'Open Impetus bar 1, Cross Hesitation bar 2.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 22, syllabusBody: 'NDCC' },
    { n: 'Open Impetus and Wing',  c: '1-2-3,1-2-3', fw: 'TH,HT,TH,H,WF,WF',  al: 'BLOD,FDC,FDC,FDC,FDC,FDC', sw: 'S,L,S,S,S,S', rise: 'Rise e/o 2, top 3&5, lower e/o 6', notes: 'Open Impetus bar 1, Wing bar 2.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 23, syllabusBody: 'NDCC' },
    { n: 'Open Telemark and Cross Hesitation', c: '1-2-3,1-2-3', fw: 'HT,T,TH,HT,TT,TH', al: 'FDC,BDW,FDW,FDW,FDW,FDW', sw: 'S,L,S,S,S,S', rise: 'Rise e/o 1, top 2-5, lower e/o 6', notes: 'Open Telemark bar 1, Cross Hesitation bar 2.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 19, syllabusBody: 'NDCC' },
    { n: 'Open Telemark and Wing', c: '1-2-3,1-2-3', fw: 'HT,T,TH,H,WF,WF',   al: 'FDC,BDW,FDW,LOD,FDC,FDC', sw: 'S,L,S,S,S,S', rise: 'Rise e/o 1, top 2-5, lower e/o 6', notes: 'Open Telemark bar 1, Wing bar 2.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 20, syllabusBody: 'NDCC' },
    { n: 'Reverse Corté',          c: '1-2-3',       fw: 'TH,H,TH',            al: 'BLOD,BDC,BDC',         sw: 'S,S,R',       rise: 'Rise e/o 1, top 2, lower e/o 3',      notes: 'Back, close without weight, hold.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 10, syllabusBody: 'NDCC' },
    { n: 'Reverse Pivot',          c: '&',           fw: 'THT',                 al: 'DC',                   sw: 'S',           rise: 'Up',                                   notes: 'Single pivot on &. Foot turned in.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 14, syllabusBody: 'NDCC' },
    { n: 'Turning Lock to R',      c: '1-&-2-3',     fw: 'TH,T,T,TH',          al: 'BDC,BDC,FDW,FDW',     sw: 'S,S,S,S',     rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Turning lock rotating to right.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 29, syllabusBody: 'NDCC' },
    { n: 'Weave from PP',          c: '1-2-3,1-2-3,1', fw: 'HT,HT,TH,TH,T,TH,H', al: 'FDC,FC,BLOD,BDC,BDC,PDW,FDW', sw: 'S,S,S,S,S,S,S', rise: 'Rise e/o 1, top 2&5, lower e/o 3/6', notes: 'From PP. 3 bars. Ends OP.', dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 17, syllabusBody: 'NDCC' },
  ],
}

// ─── TEC LIBRARY ─────────────────────────────────────
// Each TEC has: id, name, category, summary, detail (full teaching text)
export const TEC_LIBRARY = [
  // ── Standard Technique ──────────────────────────────
  {
    id: 'tec-frame-topline',
    name: 'Frame & Topline',
    category: 'Standard',
    summary: 'Hold, arm position, head placement and upper body connection between partners.',
    detail: `Frame is the shape created by the joined arms and upper bodies of both partners. The man's right arm wraps around the lady's back, left arm extended. Lady's left arm rests on man's right upper arm.\n\nTopline refers to the line from elbow to elbow across both partners — it should be level and unbroken. Lady keeps her upper body to the left throughout all figures, giving the man the whole right side.\n\nKey points:\n• Keep upper body to the left (Lady)\n• Frame must "breathe" — allow bigger extension at the top of rise (beats 2 & 5)\n• Head follows elbow direction\n• No collapse of the frame on turning figures`,
  },
  {
    id: 'tec-dance-movement',
    name: 'Dance Movement',
    category: 'Standard',
    summary: 'The blend of progression, turn, rise/lower, and sway that creates ballroom movement.',
    detail: `Ballroom movement is a blend of five principal actions:\n\n1. Progression — leg action: forward, back, and side\n2. Turn & Rotation — body turning with partner; rotation is body turning without feet moving\n3. Lowering — leg action without changing body posture\n4. Rising — foot rise (ankle joint) and body rise (straightening knee)\n5. Sway — curvature of the spine maintained when swaying\n\nThese actions are combined in varying degrees in every figure. Understanding which action dominates in each beat is key to correct technique.`,
  },
  {
    id: 'tec-ballroom-positions',
    name: 'Ballroom Positions',
    category: 'Standard',
    summary: 'Closed position, Promenade Position (PP), Counter PP, and Outside Partner.',
    detail: `Closed Position: Partners face each other, offset slightly to the right. Man's right hand on lady's back, left hand joined.\n\nPromenade Position (PP): Both partners open to a V-shape, both facing LOD. Lady's right side and man's left side are open. Used in Whisk, Chassé from PP, etc.\n\nCounter Promenade Position (CPP): Opposite of PP — open to the other V-shape.\n\nOutside Partner (OP): Man steps outside lady on her right side. Used in Outside Change, Feather Step (Foxtrot), etc. Always with CBMP.`,
  },
  {
    id: 'tec-turns',
    name: 'Turns & Rotation',
    category: 'Standard',
    summary: 'How the body rotates and turns in standard dancing — heel turns, pivots, spin turns.',
    detail: `Turn is for the feet — the amount the foot/body rotates during a step.\nRotation is hip relative position to feet — body turning without feet moving (maximum is what the spine allows).\n\nHeel Turn: Lady's foot closes to standing foot on heel, pivoting. Used in Reverse Turn (Waltz), Feather Step (Foxtrot).\n\nPivot: A rotation on the ball of one foot. Found in Natural Spin Turn, Fallaway Reverse & Slip Pivot.\n\nSpin Turn: A sharp rotation with a pivot action. The body spins around the supporting leg.\n\nKey: On figures with strong rotation, reduce rise as rise slows down rotational momentum.`,
  },
  {
    id: 'tec-cbm',
    name: 'CBM — Contrary Body Movement',
    category: 'Standard',
    summary: 'Rotating the opposite shoulder/hip toward the moving leg on step 1 of turning figures.',
    detail: `CBM (Contrary Body Movement) is the rotation of the opposite side of the body toward the moving leg.\n\nExample: When stepping forward with the right foot, the left hip and shoulder move toward the right — creating a twisted body shape that initiates rotation.\n\nUsed on step 1 of all major turning figures: Natural Turn, Reverse Turn, Outside Change.\n\nCBMP (Contrary Body Movement Position): Placing the foot across the body line (as if CBM was used) WITHOUT body rotation. Used in Outside Partner steps and Promenade movements.`,
  },
  {
    id: 'tec-weight-transfer',
    name: 'Weight Transfer',
    category: 'Standard',
    summary: 'How and when weight moves between feet across the three beats of Waltz.',
    detail: `Correct weight transfer is fundamental to Waltz flow:\n\nCount 1 — Full weight transfer: driving step, push for maximum distance.\nCount 2 — Partial transfer: center of gravity over the foot, ready to transfer into the next step. On side steps, do not overshoot weight past the standing foot.\nCount 3 — Full transfer + collection: settle at end of step. Change timing to 3& — up on 3, lower on the & — "settle, put hips underneath."\n\nThe figure is not complete until the heel touches the ground and feet are together.\nLowering on count 3 should be controlled — both down and forward (or backward depending on next step direction).`,
  },

  // ── Waltz-Specific Technique ─────────────────────────
  {
    id: 'tec-waltz-movement',
    name: 'Waltz Movement',
    category: 'Waltz',
    summary: 'The dreamy, continuous character of Waltz — gliding steps, swing, and flow.',
    detail: `Waltz is a "dreamy" dance. There is continuity in the steps — the end of count 3 feeds into the next count 1.\n\nIn all steps, the feet should glide/slide/skim the floor before weight is transferred.\n\nCount 1: Driving step. Push for the biggest step. Full weight transfer.\nCount 2: Big and gliding. Slightly bent knees to allow more rise and balance. Do NOT close trailing foot to standing foot first — move directly to the side after clearing the knee.\nCount 3: Collection. Controlled lowering, both down and forward. When you begin to lower, acceleration into the next step starts.\n\nEnd of count 3 feeds seamlessly into count 1 — the dance never stops.`,
  },
  {
    id: 'tec-rise-fall',
    name: 'Rise & Fall',
    category: 'Waltz',
    summary: 'The signature up-and-down movement through the body that gives Waltz its wave-like quality.',
    detail: `Rise and Fall is the signature characteristic of Waltz:\n\n• Begin to rise at the end of beat 1 (e/o 1)\n• Continue rising on beat 2\n• Top of rise on beat 2 and into beat 3\n• Lower at end of beat 3 (e/o 3)\n\nThe rise is often slightly delayed — when weight is fully transferred on step 2, then rise.\n\nOn figures with strong rotation (e.g. Double Reverse Spin, heel turns): little or no rise, as rising slows down rotational momentum.\n\nFoot rise uses the ankle joint. Body rise is the straightening of the knee. Both contribute to the full rise action.\n\nReminder: "Rise e/o 1" = rise at the END of beat 1, not on beat 1.`,
  },
  {
    id: 'tec-sway',
    name: 'Sway',
    category: 'Waltz',
    summary: 'Inclination of the body to left or right — used on step 2 to extend reach and control momentum.',
    detail: `Sway is inclination of the body (not just the arms) to Left or Right. The curvature of the spine is maintained throughout.\n\nSway is primarily used on step 2 to step much longer (send the hips "out") and to slow down sideways momentum, bringing feet together on step 3.\n\nAlways sway forward — the upper body goes with the forward sway motion. Do NOT bend the upper body sideways to create a sway look ("broken sway") — this causes the Lady to block the Man.\n\nSway direction:\n• R sway — body inclines to the right (e.g. Natural Turn step 2)\n• L sway — body inclines to the left (e.g. Reverse Turn step 2)\n\nWhen movement is small, there will be little sway. Do not sway artificially.`,
  },
  {
    id: 'tec-posture-frame',
    name: 'Posture & Frame',
    category: 'Waltz',
    summary: 'Upright body alignment, partner connection, and the Waltz hold.',
    detail: `Posture: Stand tall with weight slightly forward. Spine is upright but not rigid. Knees are soft, not locked.\n\nLady's key points:\n• Always keep upper body to your left throughout figures\n• Leave the whole right side to the Man\n• Head follows your elbow\n• It is especially important to stay left in turning figures — otherwise Lady ends in front of Man and blocks him\n• On beats 2 & 5: stretch the head even more (more extension), bring hips and ribs to the Man\n• Frame needs to "breathe" — allow bigger extension at the top of rise\n\nFrame: The joined arms create a shape that is maintained throughout dancing. No collapse, no pulling.`,
  },
  {
    id: 'tec-preparation-step',
    name: 'Preparation Step',
    category: 'Waltz',
    summary: 'The pickup bar (123 456) used before the first figure, establishing hold and weight.',
    detail: `The preparation step is a 6-beat pickup (counts 1-2-3, 4-5-6) danced before entering the first figure.\n\nMan facing DW on long wall:\n• Counts 4-5: Lady keeps R side, rib and hip pressed to Man even more. Lady: no foot rise, L heel stays down.\n• Count 6: Do not lose R side pressure into the first step.\n\nThe prep step establishes:\n• Correct hold and frame\n• Weight placement (man on right foot, ready to step left)\n• Musical alignment — must start on count 1 of the music\n\nNever start a class without a prep step — it sets the connection and the tone.`,
  },
  {
    id: 'tec-count1-drive',
    name: 'Count 1 — Drive',
    category: 'Waltz',
    summary: 'The powerful first step of each Waltz bar — longest step, full weight transfer, generates momentum.',
    detail: `Count 1 is the driving step of Waltz — the most important step in each bar.\n\n• Push off the back leg strongly for the biggest possible step\n• Full weight transfer occurs on count 1\n• This is where the momentum for the entire bar is generated\n• CBM (Contrary Body Movement) occurs on count 1 for all turning figures\n• Footwork: Heel-Toe (HT) on forward steps — strike with the heel first\n\nCommon errors:\n• Stepping too small on count 1 — results in rushed, choppy Waltz\n• Not transferring full weight — creates imbalance on count 2\n• Forgetting CBM on turning figures — prevents rotation from initiating correctly`,
  },
  {
    id: 'tec-count3-settle',
    name: 'Count 3 — Settle',
    category: 'Waltz',
    summary: 'The closing/collection step — controlled lowering that feeds into the next bar.',
    detail: `Count 3 is collection — the settling of the body after the rise, preparing for the next count 1.\n\nTiming is: 3& — rise and be up on 3, then lower on the & (the "settle").\n• Put hips underneath on the &\n• This frees the body to move again immediately into the next step\n• Do NOT lower right on count 3 — it looks like plopping down\n\nThe figure is not complete until the heel touches the ground and feet are together.\n\nCollection must be:\n• Controlled — not a drop\n• Both DOWN and FORWARD (or backward, depending on next step direction)\n• When you begin to lower, acceleration into the next step must start simultaneously\n\nCount 3: Full transfer of weight.`,
  },
  {
    id: 'tec-heel-turn',
    name: 'Heel Turn',
    category: 'Waltz',
    summary: 'A closing action on the heel where one foot draws to the other, used in Reverse Turn and Closed Impetus.',
    detail: `A Heel Turn is when one foot closes to the other on the heel, with a rotation occurring during the closing action.\n\nHow it works:\n• Step back (or sideways) on the heel\n• Draw the other foot to close — both feet are briefly on heels together\n• Rotate during the closing action\n• Rise occurs on entry to the heel turn or is absent (on figures with strong rotation)\n\nFound in:\n• Reverse Turn (step 2 for Lady)\n• Closed Impetus (step 2)\n• Fallaway Reverse (step 2)\n\nKey coaching points:\n• Do not transfer weight too early — wait for the foot to fully close\n• The rotation happens DURING the close, not before or after\n• No rise on a heel turn — it interrupts the rotation`,
  },
  {
    id: 'tec-footwork',
    name: 'Footwork',
    category: 'Waltz',
    summary: 'Which part of the foot contacts the floor on each step — HT, TH, T, WF.',
    detail: `Footwork describes which part of the foot contacts the floor:\n\nHT (Heel-Toe): Step onto heel, roll through to toe. Used on forward steps in Waltz (count 1 forward).\nTH (Toe-Heel): Step onto toe/ball, lower to heel. Used on backward steps and side-closing steps.\nT (Toe only): Ball of foot only — no heel lowering. Used at top of rise, in some checks.\nWF (Whole Foot): Flat foot contact. Rare in Waltz.\n\nWaltz typical footwork per beat:\n• Count 1 (fwd): HT\n• Count 2 (side): T then inside edge of ball as trailing foot is drawn in\n• Count 3 (close): TH\n\nCommon error: Stepping flat on count 1 (not heel-first) — destroys the gliding quality.`,
  },
  {
    id: 'tec-musicality',
    name: 'Musicality & Timing',
    category: 'Waltz',
    summary: 'Understanding Waltz music: 3/4 time, the accent on beat 1, and how movement matches the phrase.',
    detail: `Waltz is in 3/4 time — three beats per bar, with a strong accent on beat 1.\n\nTiming: Count 1-2-3, 1-2-3. Each beat is equal in duration.\n\nTempo: International Waltz is danced at approximately 28-30 bars per minute.\n\nMusical phrasing:\n• Phrases are typically 8 bars (24 beats)\n• Figures should begin and end cleanly on phrase boundaries where possible\n• The rise on beats 2-3 mirrors the natural "lift" in Waltz music\n• The drive on beat 1 matches the musical accent\n\nCommon timing errors:\n• Starting on the wrong beat (not beat 1)\n• Rushing beat 2 (not allowing full rise)\n• Not pausing at end of beat 3 (no "settle")\n\nThe music tells you when to rise and when to settle — listen to it.`,
  },
]

// ─── GLOSSARY ─────────────────────────────────────────
export const GLOSSARY = {
  'CBM':  'Contrary Body Movement — rotating the opposite shoulder/hip toward the moving leg.',
  'CBMP': 'Contrary Body Movement Position — placing the foot across the body line without body rotation.',
  'LOD':  'Line of Dance — the anti-clockwise direction of travel around the floor.',
  'FDW':  'Facing diagonal wall.',
  'FDC':  'Facing diagonal centre.',
  'BDW':  'Backing diagonal wall.',
  'BDC':  'Backing diagonal centre.',
  'FC':   'Facing centre.',
  'FW':   'Facing wall.',
  'PP':   'Promenade Position — partners open to V-shape, both facing LOD.',
  'CPP':  'Counter Promenade Position — partners open to V-shape in opposite direction.',
  'HT':   'Heel-Toe footwork.',
  'TH':   'Toe-Heel footwork.',
  'T':    'Toe only.',
  'H':    'Heel only.',
  'WF':   'Whole Foot.',
  'BF':   'Ball of Foot.',
  'IF':   'Inside edge of foot.',
  'e/o':  'End of — as in "rise e/o 1" means rise at the end of beat 1.',
  'Sway': 'Inclination of the body to L or R, used in Smooth/Standard dances.',
  'Rise': 'The upward movement through the body, typically at the end of beat 1.',
  'Fall': 'The lowering action, typically at the end of a figure.',
}
// ─── FIGURE RICH DATA ────────────────────────────────
// Per-step leader/follower data with coaching notes
// Source: dancecentral.info
export const FIGURE_RICH_DATA = {
  'Back Lock': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 15, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back in CBMP', alignment: 'Backing DW', footwork: 'TH', turn: '--', sway: '--', rise: 'CBM | start to rise e/o 1, NFR', notes: '' },
      { bar: 1, count: '2 (1/2 beat)', foot: 'RF BW', alignment: 'Backing DW', footwork: 'T', turn: '--', sway: '--', rise: 'Continue to rise on 2 and 3', notes: '' },
      { bar: 1, count: '& (1/2 beat)', foot: 'LF crosses in front of RF', alignment: 'Backing DW', footwork: 'T', turn: '--', sway: '--', rise: '', notes: '' },
      { bar: 1, count: '3', foot: 'RF diag and back', alignment: 'Backing DW', footwork: 'TH', turn: '--', sway: '--', rise: 'Up. Lower e/o 4', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'FDW', footwork: 'HT', turn: '--', sway: '--', rise: 'slight CBM | start to rise e/o 1 Avoid jutting foot out before body moves', notes: 'All steps: push, drive big steps. Keep pressure on floor. When in outside partner position: hips turned but it is still quite "up" to the partner, shoulder square with partner, then, even more rotation to get momentum for next step. Travels DW, body should be facing between wall and DW. Feel slight inclination and stretch up through the R side of the body/rib cage. Lengthen R side, counter balance from head through the body. Don\'t drop R shoulder. keep R shoulder flat. Lady\'s left shoulder is quite forward. Pretend you are going between 2 glass panes. Keep head left.' },
      { bar: 1, count: '2', foot: 'LF diag fwd', alignment: 'FDW', footwork: 'T', turn: '--', sway: '--', rise: 'cont to rise on 2 and 3 keep feet parallel FDW', notes: '' },
      { bar: 1, count: '&', foot: 'RF cross behind LF', alignment: 'FDW', footwork: 'T', turn: '--', sway: '--', rise: '-- Lock is lead by moving more toward LOD relative to step 2', notes: '' },
      { bar: 1, count: '3', foot: 'LF diag fwd', alignment: 'FDW', footwork: 'TH', turn: '--', sway: '--', rise: 'Up, lower e/o 4 next step, starts CBMP', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Back Whisk': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 11, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF Back in CBMP', alignment: 'Backing DC against LOD', footwork: 'TH', turn: '--', sway: 'Sway(S)', rise: 'slight CBM | start to rise e/o 1, NFR Lower through R leg and hip to R using CBMP, allowing lady to step OP.', notes: '' },
      { bar: 1, count: '2', foot: 'RF diag back', alignment: 'Backing DC against LOD', footwork: 'T', turn: '--', sway: 'Sway(L)', rise: '- | continue to rise on 2 Rotate upper body to right, leaving hip in same place. Isolate the upper body.', notes: 'Point the foot in the finishing direction' },
      { bar: 1, count: '3', foot: 'LF crosses behind RF in PP', alignment: 'Facing DW', footwork: 'TH', turn: '--', sway: 'Sway(L)', rise: '-- | Up, lower e/o 3', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'Facing DC against LOD', footwork: 'HT', turn: 'Begin to turn R', sway: 'Sway(S)', rise: 'CBM | start to rise e/o 1 Into count 1: Lady activate L hip already, pick up/swing L lip. Ending L hip is lifted/higher.', notes: 'Head look pass left elbow, big first step, stay left of Man. Keep connection with Man.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'Facing Center', footwork: 'T', turn: '1/8 between 1 and 2', sway: 'Sway(R)', rise: '-- | continue to rise on 2 This is a strong forward step, ending as a side step. Same direction as first step (drive through diagonally up with left side), then turn the hips, body stays, and head is the last to turn. stay behind man, both elbows still in front your body.', notes: 'This step needs to be just big enough so that you don\'t become stuck in front Man. Keep step size in relation to Man. Use feet to rotate. Pull ab muscle back to spine. Shoulder does not rotate as much as hips. Dance underneath the rib cage. Lift hips up to Man. Hips should have connection.' },
      { bar: 1, count: '3', foot: 'RF crosses behind LF in PP', alignment: 'FDC', footwork: 'TH', turn: '1/8 between 2 and 3', sway: 'Sway(R)', rise: '-- | Up, lower e/o 3 Drag the toe along the floor right underneath the left foot.', notes: 'Shoulder stay in line, parallel to Man; hip first should go over on the foot, then turn hip, head weight left; head is the last thing to turn; look "outside" PP. Don\'t tilt forward. body stays back. Give R ribs to Man. Last step is small, it\'s just a hook and then settle on it.' },
    ],
    techniqueNotes: '',
  },
  'Basic Weave': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 12, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDW', footwork: 'TH', turn: '--', sway: '-', rise: 'CBM | --', notes: '' },
      { bar: 1, count: '2', foot: 'LF fwd', alignment: 'BDW', footwork: 'HT', turn: 'starts to turn L', sway: '-', rise: 'CBM | rise e/o 2', notes: '' },
      { bar: 1, count: '3', foot: 'RF to side', alignment: 'BLOD', footwork: 'TH', turn: '1/8 between 2-3', sway: '-', rise: 'up, lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'LF back in CBMP', alignment: 'BDC', footwork: 'TH', turn: '1/8 between 3-4', sway: '-', rise: 'starts to rise e/o4, NFR', notes: '' },
      { bar: 2, count: '2', foot: 'RF back', alignment: 'BDC', footwork: 'T', turn: 'starts to turn L', sway: '-', rise: 'CBM | continue to rise on 5', notes: '' },
      { bar: 2, count: '3', foot: 'LF to side and slightly fwd', alignment: 'PDW', footwork: 'TH', turn: '1/4 between 5-6, body turns less', sway: '-', rise: 'up, lower e/o 6 This could end in PP.', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'DW', footwork: 'H', turn: '--', sway: '-', rise: 'CBM | -- More advanced version: use ball of foot to whole foot on step 1.', notes: 'Soft knee on this step.' },
      { bar: 1, count: '2', foot: 'RF back', alignment: 'DW', footwork: 'T', turn: 'starts to turn L', sway: '-', rise: 'CBM | rise e/o 2 Take center back.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side', alignment: 'PDC', footwork: 'TH', turn: '1/4 between 2-3, body turn less', sway: '-', rise: 'up, lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'FDC', footwork: 'HT', turn: '-', sway: '-', rise: 'starts to rise e/o 4 This is like outside change step.', notes: 'Body stay behind the foot. Allow R side to relax down to create the diagonal. Avoid turn center and shoulder to left.' },
      { bar: 2, count: '2', foot: 'LF fwd', alignment: 'FDC', footwork: 'T', turn: 'starts to turn L', sway: '-', rise: 'CBM | cont to rise on 5 Taking spine to LF.', notes: '' },
      { bar: 2, count: '3', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '1/4 between 5-6, body turn less', sway: '-', rise: 'up, lower e/o 6 Finish the turn on LF (in previous step) before stepping RF diagonally back.', notes: 'This could end in PP.' },
    ],
    techniqueNotes: '',
  },
  'Chassé from PP': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 6, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd, across in PP and CBMP', alignment: 'FDW, moving LOD', footwork: 'HT', turn: '--', sway: '--', rise: 'slight CBM | Start to rise at end of 1', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side and slightly fwd', alignment: 'FDW', footwork: 'T', turn: '--', sway: '--', rise: 'Cont to rise on 2 and 3 Upper body/frame rotate to left to close the lady. Close hips.3', notes: '' },
      { bar: 1, count: '&', foot: 'RF closes to LF', alignment: 'FDW', footwork: 'T', turn: '--', sway: '--', rise: '--', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd', alignment: 'FDW', footwork: 'TH', turn: '--', sway: '--', rise: 'Up, lower e/o 4', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd, across in PP and CBMP', alignment: 'FDC, moving LOD', footwork: 'HT', turn: 'Starts to turn L', sway: '--', rise: 'CBM | Start to rise e/o 1 End o f previous 3 is building the energy to feed into this step. (Previous steps ends in PP or Whisk position.)', notes: 'From end of previous step, Lady has her L hip higher, inclining fwd, but don\'t keep the inclination for too long. Lowest point was end of 3. After that, starting changing hip tilt. Need to level off by finishing the "swooping action", do not keep body tilted forward when stepping out, finish tucking left hip, have legs ahead of body. Keep extension in PP while staying on left side. Going into Chasse, push, big step. Lady\'s R side stretch even more, shoulder flat, extend and stretch 6th vertebrae (don\'t break the neck, though), try to keep shoulder as parallel to Man as possible. Very important to not lose right shoulder, keep right side toward Man, feeling very twisted. Straighten left leg, slide left heel on floor, before bending left knee. Stay behind Man\'s hip.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'BW', footwork: 'T', turn: '1/8 btwn 1-2', sway: '--', rise: 'Cont to rise on 2 and 3 Swing the R leg and R hip up. Power is from the 1st step. This Count 2 is not redriving. Coast it, step is still pretty big. Feels like sending the hip around Man.', notes: 'Close the hip on this step. Do not overshoot weight, do not take the center pass the Inside Edge of RF. Head start turning back. R side shoulder higher. Tuck ab muscle to spine. Arms to Man, do not let elbow go behind.' },
      { bar: 1, count: '&', foot: 'LF closes to RF', alignment: 'BDW', footwork: 'T', turn: '1/8 btwn 2-3, body turns less', sway: '--', rise: '-- Head turns back to Man\'s R between 2-3 (on &).', notes: 'Keep body up. Extend upper body even more left. Weight onto LF before moving to next step. Do not fall backward into next step. When practicing, check balance on LF. Only start lower at end of the next step. Body is backing Wall. Do not over rotate. Create the "suspense" feeling, balanced.' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '--', sway: '--', rise: 'Up, lower e/o 4 This is not a side step. It\'s diagonally back. Pay attention to alignment. Make sure to settle and not be back weighted.', notes: 'First half of 3: body is still up, shoulder level out Second half &: Twisting upper body/shoulder to R to prepare outside partner' },
    ],
    techniqueNotes: '',
  },
  'Closed Change (LF)': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 1, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF forward', alignment: 'FDW', footwork: 'HT', turn: 'Sway(S)', sway: 'Slight CBM', rise: 'Start to rise at end of 1', notes: '' },
      { bar: 1, count: '2', foot: 'RF side, slightly fwd', alignment: 'FDW', footwork: 'T', turn: 'Sway(L)', sway: 'Cont to rise on 2 and 3', rise: '', notes: '' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'FDW', footwork: 'TH', turn: 'Sway(L)', sway: 'Lower at end of 3', rise: '', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDW', footwork: 'TH', turn: 'Sway(S)', sway: 'slight CBM', rise: 'Start to rise e/o 1, NFR', notes: '' },
      { bar: 1, count: '2', foot: 'LF side, slightly back', alignment: 'BDW', footwork: 'T', turn: 'Sway(R)', sway: 'Cont to rise on 2 and 3', rise: '', notes: '' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'BDW', footwork: 'TH', turn: 'Sway(R)', sway: 'Lower e/o 3', rise: '', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Closed Change (RF)': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 1, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF forward', alignment: 'FDC', footwork: 'HT', turn: 'Sway(S)', sway: 'Slight CBM', rise: 'Start to rise at end of 1', notes: 'When stepping forward, body naturally lowers to its lowest. When moving the other foot, body starts to rise.' },
      { bar: 1, count: '2', foot: 'LF side, slightly fwd', alignment: 'FDC', footwork: 'T', turn: 'Sway(R)', sway: 'Cont to rise on 2 and 3', rise: '', notes: 'LF should keep contact with floor all the time Start by point LF to side, then push off RF. At the end of 2, you are on slightly bent knees to allow for more rise and balance.' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'FD', footwork: 'TH', turn: 'Sway(R)', sway: 'Lower at end of 3', rise: '', notes: 'RF keeps contact with floor. Up then lower at end of 3. Do not drop heel too early.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BDC', footwork: 'TH', turn: 'Sway(S)', sway: 'slight CBM', rise: 'Start to rise e/o 1, NFR', notes: 'Start by bending R knee first, don\'t fall back which will be heavy on Man. Stretch L leg, show bottom of the shoe, then, pull center back to drag RF in.' },
      { bar: 1, count: '2', foot: 'RF side, slightly back', alignment: 'BDC', footwork: 'T', turn: 'Sway(L)', sway: 'Cont to rise on 2 and 3', rise: '', notes: 'RF to side; then push off LF which makes bigger side step. Partial weight is on RF, not full weight, do not overshoot center to R side.' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'BDC', footwork: 'TH', turn: 'Sway(L)', sway: 'Lower e/o 3', rise: '', notes: 'Start at up position, then lower at end of 3. Full weight. Do not dissolve sway too early.' },
    ],
    techniqueNotes: '',
  },
  'Closed Impetus': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 7, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'Backing LOD', footwork: 'TH', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | -- This step can be OP, depending on previous figure.', notes: '' },
      { bar: 1, count: '2', foot: 'RF closes to LF (Heel Turn)', alignment: 'Facing DC', footwork: 'HT', turn: '3/8 between 1-2', sway: 'Sway(L)', rise: 'Rise e/o 2 Man\'s heel turn.', notes: 'Legs should straighten as RF comes in, creating late rise. Late rise is required to allow lady to pass the man.Too early a rise will stop her. See note below. Need to drag heel on the closed impetus. Feet should not come together until weight is committed to RF. That’s going to provide the signal for the lady to commit her weight on her left foot. Turn continues on the ball of the foot through the 3rd step' },
      { bar: 1, count: '3', foot: 'LF to side and slightly back', alignment: 'Backing DC against the LOD', footwork: 'TH', turn: '1/4 between 2-3', sway: 'Sway(S)', rise: 'Up. Lower e/o 3 Left heel does not come down until feet are together.', notes: 'Turn continues on the ball of the foot through the 3rd step When followed by Reverse Pivot , place spine over RF stepping back for Reverse Pivot ,' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'LOD', footwork: 'HT', turn: 'starts to turn R', sway: 'Sway(S)', rise: 'CBM | -- Strong CBM (shoulder/upper body rotate to right), big step will make the step easier, lighter for Man. But always watch Man\'s central line.', notes: 'Keep head very left. Keep knees soft. Don\'t pop up. This step can be OP, depending on previous figure.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'BDC', footwork: 'T', turn: '3/8 between 1-2', sway: 'Sway(R)', rise: 'rise e/o 2 Drive this step using whole left side (not just shoulder) to give Man the momentum. He\'s just there for a ride.', notes: 'Should not commit weight early, and this step is really around the man. Wait and sense when Man commits weight. Otherwise, if lady steps too early, it\'s likely it\'s not the right position and will gap with Man. The lady’s hip sticks to the man’s hip as a guide to his weight changes. Lady’s two feet need to be pointing parallel at end of closed impetus. Turning axis is on left foot, Man actually put weight on it (compared to Outside Spin where turning axis is Lady\'s RF). Do not drop left side, stretch and lift left side to Man Difference from Natural Spin Turn : this is not spin. It\'s a side step (normally done as forward step, then turn.) Delayed rise. side step is a bit like diagonal, depending on how much Man turns. After side step, stay left, leave the right side to the Man, brush (contract thigh muscles) and then out. "Hover" - the good feeling of totally on balance, extend, express musicality. Frame needs to "breathe", give hand/arms to Man Steal time from front beat and back beat and show off rotation and extension. Body movement does not stop, it\'s continuous.' },
      { bar: 1, count: '3', foot: 'RF diag fwd having brushed to LF', alignment: 'FDC against LOD', footwork: 'TH', turn: '1/4 between 2-3', sway: 'Sway(S)', rise: 'up, lower e/o 3 Extend and respond to Man, make arm more flexible and "give it" to Man (or, think about "leaving the arms with Man") to allow to extend more.', notes: 'When followed by Reverse Pivot , the lowering only happens in foot, not in leg. Lady does not completely lower. Next step in Reverse Pivot will be a toe lead to complete the lowering.' },
    ],
    techniqueNotes: '',
  },
  'Closed Telemark': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 18, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'FDC', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise e/o 1 Use CBM and rise a bit early to lead heel turn.', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'almost BLOD', footwork: 'T', turn: 'slightly less than 3/8 between 1-2', sway: 'Sway(L)', rise: 'Up Get strong rotation through the feet, do not come off RF too early, which will allow Lady to turn. A little hover helps to keep Lady in front of Man.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd', alignment: 'Pointing DW', footwork: 'TH', turn: 'slightly over 3/8 between 2-3. body turns less', sway: 'Sway(S)', rise: 'Up, lower e/o 3', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDC', footwork: 'TH', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise slightly e/o 1, NFR Keep your own balance.', notes: 'When starting the figure, feel left hip flexor working, do not think about R leg moving back, think about standing on the L leg to get weight moving into the foot. Do not think about shoulder rotation at all, just think about strong diagonal stretch, stretching the left side, Turn is all going to happen through base area. Lower center/hips are rotating. From sternum area, feel strong leftward, upward sway from sternum up, no rotation through shoulders. If you rotate shoulder, you\'ll end up on Man\'s left side. Step straight back, not off to the side. Head: keep head at the same place, rotate body underneath and head ends up on the right and keep it there' },
      { bar: 1, count: '2', foot: 'LF closes to RF (Heel Turn)', alignment: 'LOD', footwork: 'HT', turn: '3/8 between 1-2', sway: 'Sway(R)', rise: 'continue to rise on 2 Heel turn, the feeling is the turn is mostly done on RF, has a slight feeling of pushing off LF, then RF step back on 3 to finish.', notes: 'Stay connected with Man.' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '3/8 between 2-3, body turns less', sway: 'Sway(S)', rise: 'Up, lower e/o 3 Keep moving, don\'t hover and stop, strong, bigger step (Man is waiting, need more power). Keep head position (which will make it shape to right).', notes: 'Keep head to right, then on 1 of next e.g Natural Spin Turn , rotate body underneath (no sharp head movement, just keep head at same place starting at 1, not later).' },
    ],
    techniqueNotes: '',
  },
  'Closed Wing': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 28, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'FDC', footwork: 'H', turn: '-', sway: '-', rise: '- | -', notes: '' },
      { bar: 1, count: '2', foot: 'LF starts to close to RF', alignment: 'FDC', footwork: 'WF, pressure on IE of T of LF', turn: 'Slight body turn to L on 2 and 3', sway: '-', rise: '- | Slight rise on 2 and 3 NFR', notes: '' },
      { bar: 1, count: '3', foot: 'LF closes to RF w/o weight', alignment: 'FDC', footwork: 'WF, pressure on IE of T of LF', turn: '-', sway: '-', rise: '- | -', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF back in CBMP', alignment: 'BDC', footwork: 'TH', turn: '-', sway: '-', rise: '- | start to rise e/o 1, NFR Keep upward balanced poised position, don\'t try to pull hip back to get around.', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side and slightly back (small step)', alignment: 'BDC', footwork: 'T', turn: '-', sway: 'Slight sway to L on 2 and 3', rise: '- | continue to rise on 2 This step is not too big. Keep it underneath body. (Man is not moving anywhere)', notes: '' },
      { bar: 1, count: '3', foot: 'LF fwd in CBMP, OP on L side', alignment: 'FDW against LOD', footwork: 'TH', turn: 'Slight body turn to L', sway: '-', rise: 'Up. Lower e/o 3 Lady keeps her head upward and leftward on step 3 and keep her poise back. L leg goes ahead of body to Wing position.', notes: 'Try not to think body rotating. Think about sway. Try to keep shoulders parallel to partner.' },
    ],
    techniqueNotes: '',
  },
  'Contra Check': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 27, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd in CBMP', alignment: 'DW, pointing almost LOD', footwork: 'H or Ball Flat', turn: 'Body turn to L', sway: '--', rise: 'CBM | Down with knees slightly flexed If preferred, could be LF fwd with foot flat.', notes: '' },
      { bar: 1, count: '2', foot: 'Transfer weight back to RF', alignment: 'DW', footwork: 'T', turn: 'Body turn to R', sway: '--', rise: 'Rise e/o 2', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side in PP', alignment: 'FDW, moving along LOD', footwork: 'TH', turn: '--', sway: '--', rise: 'Up, Lower e/o 3 Turn may be made between 2-3 to end in PP moving DC.', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back in CBMP', alignment: 'BDW, feet almost BLOD', footwork: 'T', turn: 'Body turn to L', sway: '--', rise: 'CBM | Down with knees slightly flexed The step needs to feel more free. Lady does not bend straight back, there is rotation and head continues to extend go along body line.', notes: 'Prep: bend/lower left knee, shoulder level off, rotate hips to left. Do not send stomach muscle forward, i.e. do not stick tummy up to Man at this time. connect center into hip joint, hip has to be able to move. Big step back after rotating hips (if step is too short, upper body weight will take over when doing contra check), also need bigger step to create more extension. CMBP (do not get into Man\'s space). RF point back first, RF toe turned in (for better balance), then on ball of feet, keep right heel up (solid, not heel moving down and then up), weight split. body rotate to left, but keep left side up to Man (though body is turning left and shaping). Don\'t break neck. Keep left toe down on floor, do not lift L toe. LF is pretty much flat on floor. Flex both knees, at this time, weight in the middle, not on back foot. Get there first, then give (R) hip and ribs to Man for extension, left leg can go more straight at this time, allowing for more extension, putting a bit more weight on RF, take the center back, but keep R heel up, R leg is bent, then extend upper body diagonally back. Extend R arm to Man. Lift glute and center up to Man. (butt cheek up) and give whole R side to Man. Imagine stretching R side longer to give to Man more, effect is shaping and extending to left. Upper body has the look of rotating/shaping to left (but don\'t rotate away from Man, upper body and hip to Man), head "finishes" the extension with breathing. (Don\'t be afraid to extend head more. Go into Man\'s R hand.) The whole body is not one straight piece. There is torch in upper body - rotation and sway (do not just bend backward) and at tail end, stretch even more before recovering. The elasticity doesn\'t stop. Continuous extension and all the way to head. Upper body, not locked and still, but stay soft and flexible, go and fill the space Man created with his R arm/hand. Don\'t "sit", don\'t just go "down" which feels heavy. Continuous shaping and then bounce up. Man start recovering after Lady finish extending head. Arms belong to partner, never pull arms back. extend the arm to give space. Frame: breathe, need to feel "free". Create elasticity feeling, continuous movement out and come back (no stopping and then rotate. movement is smooth and light.)' },
      { bar: 1, count: '2', foot: 'Transfer weight fwd to LF', alignment: 'Facing DC against LOD', footwork: 'T', turn: 'Body turn to R', sway: '--', rise: 'Rise e/o 2 Push off back foot into PP. Time the push off together with Man. Feet swivel underneath the body. Need to be individually balanced.', notes: 'Make sure to stay very left (has tendency to shift to R, get into Man\'s space). Keep big frame and give R side to Man, don\'t fall to PP. At end, start articulating head turn' },
      { bar: 1, count: '3', foot: 'RF to side in PP', alignment: 'FDC, moving LOD', footwork: 'TH', turn: '1/4 to R between 2-3', sway: '--', rise: 'Up. Lower e/o 3 Articulate head.', notes: 'Make sure R side is to Man. Prep for next step: Lower first and step big. Focus: smoothness, rotation, elasticity, lightness, softness, finish the extension.' },
    ],
    techniqueNotes: '',
  },
  'Double Reverse Spin': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 13, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'Starts to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise at end of 1 Important to do CBM. Give Lady the indication of left by lowering.', notes: 'Early rise is to lead Lady into closing her feet into a heel turn.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'BDW', footwork: 'T', turn: '3/8 btwn 1-2', sway: 'Sway(S)', rise: 'Up Wait until the lady\'s feet are together before taking this step.', notes: 'When taking step, point RF forward with straight knees, then step onto the straight knee and turn to L. Track your RF, don\'t do ronde. It will help with balance. Think about getting hips around, rather than shoulders or feet. Same for second step on any turn where Man is going forward. Lengthen spine, don\'t bend forward.' },
      { bar: 1, count: '3', foot: 'LF closes to RF without weight (Toe Pivot)', alignment: 'Facing DW', footwork: 'T', turn: '1/2 btwn 2-3', sway: 'Sway(S)', rise: 'Up, Lower at end of 3 settle and then drive to next step. Keep lengthening the spine.', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BLOD', footwork: 'TH', turn: 'starts to turn L', sway: 'Sway(S)', rise: 'CBM | rise slightly e/o 1, NFR Very important to do CBM, with CBM shoulder will clear way for Man to pass. Keep shoulder flat, and do not drop it on one side, do not pull left shoulder away from Man (It will "feel" left shoulder is "up", but in fact it will be flat.)', notes: 'Lift center, shoulder slightly to R, left side positive on left turning figures. Step directly back moving down the floor, turn RF in. Do not step to the side, bigger step. Start the turn with head (not including shoulder) Keep the head going left and look over your shoulder the whole time to avoid being pulled into the center of the turn. Stay very left to Man, give left side to Man more, do not get in front of Man. Do not pull left shoulder away from Man, i.e. do not peel off left side. Head can stretch more to left, move center (suck tummy). right arm to Man (this is from extending back) Use Man, lower first, move center, and then stepping RF/ R leg back, get on to the leg. Don\'t fall back or lean forward. Keep spine upright. Don\'t be afraid to move. Man leads early rise which signals heel turn, Lady drags her left heel with pressure to help balance (keep heel on the floor), LF toe release, begin turn on right heel. Do not lock the knees. Lengthen through center, but not locking knees. Carefully not to fall back and be back weighted . Keep middle center forward while moving back, spine upright, Show off extension during the whole spin figure by looking over the shoulder more.' },
      { bar: 1, count: '2', foot: 'LF closes to RF (Heel turn)', alignment: 'Facing LOD', footwork: 'HT', turn: '1/2 between 1 and 2', sway: 'Sway(S)', rise: 'Cont to rise on 2 Don\'t lift toes off ground (no need to show off the bottom of your shoe!), be sure feet are parallel and together.', notes: 'Draw trailing foot in, close the foot slowly, both legs should straighten, do not rise too early (though Man is rising), rise after heel turned, weight transferred to LF. Use the rules of head movement, head turns first, slightly more to left (don\'t do it too early, though). Keep head left to follow left elbow, and look over left shoulder the whole time to avoid being pulled into the center of the turn Keep body contact with Man throughout the heel turn. Do not allow spine to straighten up, keep left. Do not pause the turning action between 1 and 2, shoulder and head continue to turn left (while feet are together), then body follows in step 3 on \'&\'. Movement is continuous, but speed is different. "&3" is faster.' },
      { bar: 1, count: '&', foot: 'RF to side and slightly back', alignment: 'Backing wall', footwork: 'T', turn: '1/4 between 2-3', sway: 'Sway(S)', rise: 'Up Bigger step, push off left foot, get around (or "through") partner with more power.', notes: 'RF forward should be crossing LOD, Man is at one place, do not peel off from him, keep hips distance (on the right side), don\'t gap. Stay with Man, keep on his R side.' },
      { bar: 1, count: '3', foot: 'LF crosses in front of RF', alignment: 'Backing DW', footwork: 'TH', turn: '1/4 between 3-4', sway: 'Sway(S)', rise: 'Up. Lower e/o 4 Cross feet (LF maintains pressure on ground while dragging to cross RF), lower into plie. Hips up the Man.', notes: 'Do not lower too early, lower on "&" Advanced dancers often use the timing of 123& when the beat value would be 1, 1, 1/2, 1/2. Per coach: Timing: do 1 2 &3. Man\'s early rise signals Lady should do heel turn. Lady does RF "back", L heel closes to R heel, turn, rise and "forward", then RF "out" to side (after turning) and "cross", stay on left. Note: The Double Reverse Spin may be started DC, DW, or LOD. The amount of turn may vary between 3/4 and a whole turn. 3/4 turn: Man: 1/4 between 1-2, 1/2 between 2-3, or 3/8 between 102, 3/8 between 2-3 Lady: 3/8 between 1-2, 1/4 between 2-3, 1/8 between 3-4 7/8 turn: as shown in chart whole turn: Man: 3/8 between 1-2, and 5/8 between 2-3. Lady: 1/2 between 1-2, 3/8 between 2-3, 1/8 between 3-4.' },
    ],
    techniqueNotes: '',
  },
  'Drag Hesitation': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 21, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'start to turn L', sway: '-', rise: 'CBM | - Sending lady to inside of turn.', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'Backing Wall', footwork: 'T', turn: '1/4 btwn 1-2', sway: '-', rise: '- | rise e/o 2 Left side is axis point. Staying down at the beginning, rise takes place when R leg passes the body.', notes: 'Could add Sway, then level off at 3.' },
      { bar: 1, count: '3', foot: 'LF closes to RF w/o weight', alignment: 'BDW', footwork: 'T (both feet), then TH (RF)', turn: '1/8 btwn 2-3', sway: '-', rise: '- | up, then lower e/o 3 The following step, Man will lead Lady OP', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BLOD', footwork: 'TH', turn: 'start to turn L', sway: '-', rise: 'CBM | - Right shoulder relax down and connect to foot as axis point. Left hip rotate.', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'pointing btwn W and DW', footwork: 'T', turn: 'just over 1/4 to L btwn 1-2', sway: '-', rise: '- | rise e/o 2 Lady has slight foot swivel between 2 and 3.', notes: 'Body will turn slightly less than 3/8. If Man adds shaping and sways, Lady turns head to right to follow the shape. Man can also shape to L, then Lady keeps head to L, center to Man. When rising, be very aware to pull center back. Do not peak too early. Follow the Man\'s body. Lift chest up to Man. Man can change shape to do outside partner, Follow Man\'s shape.' },
      { bar: 1, count: '3', foot: 'RF closes to LF w/o weight', alignment: 'Facing DW', footwork: 'T (both feet), then TH (LF)', turn: 'under 1/8 to L btwn 2-3', sway: 'rise, then lower e/o 3 Lower at end of 3, ready to push.', rise: '', notes: 'Next step will be OP. The figure can commence with Man facing DC or DW.' },
    ],
    techniqueNotes: '',
  },
  'Fallaway Reverse & Slip Pivot': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 30, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'FDC', footwork: 'HT', turn: 'Start to turn L', sway: '-', rise: 'CBM | Rise e/o 1', notes: '' },
      { bar: 1, count: '2', foot: 'RF back in Fallaway, R side leading', alignment: 'BDW, Moving down LOD', footwork: 'T', turn: '1/4 between step 1-2', sway: '--', rise: 'Up', notes: '' },
      { bar: 1, count: '3', foot: 'LF back in CBMP and Fallaway', alignment: 'BLOD', footwork: 'TH', turn: '1/8 between 2-3, body turns less', sway: '--', rise: 'Up, Lower e/o 3', notes: '' },
      { bar: 1, count: '&', foot: 'RF back, LF held in CBMP', alignment: 'To center, toe turned in, end facing LOD or DW', footwork: 'THT', turn: '1/4 between 3-4, 1/4 or 1/8 on 4 (pivot)', sway: '--', rise: 'CBM | --', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDC', footwork: 'TH', turn: '--', sway: '--', rise: 'Rise e/o 1 NFR Similar to Double Reverse Spin , keep head left the whole time to help with the turn. Legs move backward, but body should not feel dancing backward. body feels upward, leftward curve dancing into Man\'s R side.', notes: 'Lower first . RF back, curve, toe turned in. Center can\'t fall back. Hips more forward and up to Man. Stay connected. Head goes even more left, stay outside. Lower center rotates, upper center ("dial") sway only. shoulder does not fall back.' },
      { bar: 1, count: '2', foot: 'LF back in Fallaway, L side leading', alignment: 'BDC, moving down LOD', footwork: 'T', turn: '--', sway: '--', rise: 'Up Keep chest area very lifted to Man.', notes: 'LF bigger step to match the first step, don\'t cut it short. Use head weight to L to help with turn. K eep head left throughout to help with turn, Head stretched more left. Curve. moving BDC. Suck tummy in, a little lift. Stay connected with Man.' },
      { bar: 1, count: '3', foot: 'RF back in CBMP and Fallaway (small step), LF held in CBMP', alignment: 'BDC, end facing center', footwork: 'T', turn: '5/8 to L on step 3 (Pivot)', sway: '--', rise: 'CBM | Up, lower e/o 3 It feels hip is more twisted to left. Do not close left hip. Pick up left side and open left hip, Man\'s right hip in middle of Lady\'s left hip and center.', notes: 'Lady keeps center lifted to Man. Use tummy muscle, pull center.' },
      { bar: 1, count: '&', foot: 'LF fwd in CBMP, RF held in CBMP', alignment: 'To center, end BLOD, or BDW', footwork: 'TH', turn: '1/4 or 1/8 on 4 (pivot)', sway: '--', rise: 'CBM Follow Man, don\'t gap.', notes: 'Timing: 1 2 3& (1 1 1/2 1/2) OR, 1, 2 &, 3 (1 1/2 1/2 1)' },
    ],
    techniqueNotes: '',
  },
  'Fallaway Whisk': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 31, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'Backing LOD', footwork: 'TH', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1, NFR', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side and slightly back', alignment: 'Pointing DC', footwork: 'TH', turn: '3/8 btwn 1-2, body turns less', sway: 'Sway(S)', rise: '- | Continue to rise on 2 Using "T" footwork is also correct.', notes: '' },
      { bar: 1, count: '3', foot: 'LF crosses loosely behind RF in Fallaway', alignment: 'Facing DC', footwork: 'TH', turn: 'Body continues to turn R', sway: 'Sway(R)', rise: '- | Lower on 3', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'Backing DC', footwork: 'TH', turn: '3/8 btwn 1-3', sway: 'Sway(S)', rise: '- | Continue to rise on 2 Even when footwork is "to side", still feel the body is traveling forward toward your partner.', notes: '' },
      { bar: 1, count: '3', foot: 'RF crosses loosely behind LF in Fallaway', alignment: 'Facing DC against LOD', footwork: 'TH', turn: '1/4 btwn 2-3, body continues to turn R', sway: 'Sway (L)', rise: '- | Lower on 3 Whisking action, keep body forward. upper body, arms belong to Man.', notes: 'Do not allow shoulder blade to collapse down Lady\'s head may be turned to L or R. Both are ok.' },
    ],
    techniqueNotes: '',
  },
  'Hesitation Change': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 8, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'Facing DW', footwork: 'HT', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'Backing DC', footwork: 'T', turn: '1/4 between 1-2', sway: 'Sway(R)', rise: 'Continue to rise on 2 and 3', notes: '' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'Backing LOD', footwork: 'TH', turn: 'TH', sway: '1/8 between 2-3', rise: 'Sway(R) | Lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'LF back', alignment: 'Backing LOD', footwork: 'H', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | --', notes: '' },
      { bar: 2, count: '2', foot: 'RF to side small step (Heel Pull)', alignment: 'Facing DC', footwork: 'IE of foot, whole foot', turn: '3/8 between 4-5', sway: 'Sway(L)', rise: '--', notes: '' },
      { bar: 2, count: '3', foot: 'LF closes to RF without weight', alignment: 'Facing DC', footwork: 'IE of toe (LF)', turn: '--', sway: 'Sway(L)', rise: '--', notes: 'When danced at a corner, 1/8 or 1/4 turn could be made between 4-5.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'Backing DW', footwork: 'TH', turn: 'starts to turn R', sway: 'Sway(S)', rise: 'CBM | start to rise e/o 1, NFR', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'Pointing LOD', footwork: 'T', turn: '3/8 between 1-2, body turns less', sway: 'Sway(L)', rise: 'continue to rise on 2 and 3', notes: '' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'Facing LOD', footwork: 'TH', turn: 'Body completes turn', sway: 'Sway(L)', rise: 'lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'start to turn R', sway: 'Sway(S)', rise: 'CBM | -- Drive. Do not cross Man\'s tie line.', notes: 'Keep knees very soft, try not to pop up and rise quickly. Keep action down into the legs.' },
      { bar: 2, count: '2', foot: 'LF to side', alignment: 'Backing DC', footwork: 'TH', turn: '3/8 between 4-5', sway: 'Sway(R)', rise: '-- Stay left to Man. Knees soft, compressed.', notes: '3 ways of doing shaping: No shaping: flat shoulder Shape to L, recover on 3 (some people do this) Shape to R, recover on 3 (still stay on Man\'s R side) - This is preferred. Do not pop up. Body rise only, no foot rise. Heel down. Stay low. Stretch and extend.' },
      { bar: 2, count: '3', foot: 'RF closes to LF without weight', alignment: 'Backing DC', footwork: 'IE of Toe (RF)', turn: 'Sway(R)', sway: 'Settle (recover from shaping)', rise: '', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Hover Corté': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 32, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BLOD', footwork: 'TH', turn: 'Start to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1, NFR', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side and slightly fwd', alignment: 'Pointing DW', footwork: 'T', turn: '3/8 btwn 1-2, body turns less; Continue to turn body on step 2.', sway: 'Sway(R)', rise: 'Continue to rise on 2', notes: '' },
      { bar: 1, count: '3', foot: 'Transfer weight to RF side and slightly back', alignment: 'Backing DC against LOD', footwork: 'TH', turn: '-', sway: 'Sway(S)', rise: 'Up. Lower e/o 3', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'Start to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1 Options: keep head closed, or open to PP (especially when dancing extra bar of music)', notes: 'Big step.' },
      { bar: 1, count: '2', foot: 'RF side and LF brushes towards RF', alignment: 'Facing center to end facing DC against LOD', footwork: 'T', turn: '1/4 btwn 1-2; continue to turn 1/4 on 2', sway: 'Sway(L)', rise: '- | Continue to rise on 2 Big step. Whole R side to Man, stretch, big shape, breathe the frame. articulate head. Then articulate LF coming out.', notes: 'Do not shape from lower waist area. Think about high jump, "up and over", pick up center, When developing the shape, do not take arms back, leave arms to Man, extend.' },
      { bar: 1, count: '3', foot: 'LF diag. fwd', alignment: 'Facing DC against LOD', footwork: 'TH', turn: '-', sway: 'Sway(S)', rise: '- | Up. Lower e/o 3', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Left Whisk': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 26, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd and across in PP and CBMP', alignment: 'FDW, moving along LOD', footwork: 'H', turn: '-', sway: '-', rise: '-', notes: '' },
      { bar: 1, count: '2', foot: 'LF to side and slightly fwd', alignment: 'Pointing DW', footwork: 'TH', turn: 'Body start to turn L', sway: '-', rise: '- | -', notes: '' },
      { bar: 1, count: '3', foot: 'RF crosses behind LF', alignment: 'FDW', footwork: 'T', turn: 'Body turn to L', sway: '-', rise: '- | - Man looks towards Lady\'s face, not over her R shoulder.', notes: 'Man\'s RH will lower as the next step is taken.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd and across in PP and CBMP', alignment: 'Facing DC, moving along LOD', footwork: 'HT', turn: 'start to turn L', sway: '-', rise: 'CBM | -', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '1/4 btwn 1-2', sway: '-', rise: '- RF forward, shape to R and close with Man, then R hip glued to Man. Follow hip curve.', notes: 'Lady tends to have a tendency to take her R elbow in, keep elbow slightly out to maintain volume, extend her R arm (give to Man, create room to create shape)' },
      { bar: 1, count: '3', foot: 'LF back in CBMP', alignment: 'BLOD', footwork: 'TH', turn: '1/8 btwn 2-3', sway: '-', rise: '- To produce big shape: Take step LF back (along original travel direction, don\'t go around Man), move weight back to LF (this is a step, otherwise you\'ll block Man), collect RF (crossed in front of LF, w/o weight).', notes: 'Butt and hip fwd to Man, don\'t turn out of Man. Hips stop turning, but body can continue to turn more to shape/sway without changing base. Contra within own body. Both L and R rib cage and hips fwd to Man and shape to L (w/o turning hips more), R side of body is longer (very stretched). Don\'t "sit" bottom down, heavy. Pick up center and bottom. Really pick up L side ribs to Man while rotating body to L and extending head to L. Head turns well to left and extend (without body peeling from Man) to finish the extension. Breathe out to extend head even more. Keep arm/elbow forward, extend the arm fwd to Man (check R elbow angle), give it to Man. Don\'t break shoulder or peel away shoulder. Can enter Left Whisk from different position, e.g. From Weave or Outside Change, ending in Closed Position, but with Lady\'s head turned to R. No rise in Left Whisk.' },
    ],
    techniqueNotes: '',
  },
  'Natural Spin Turn': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 4, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'FDW', footwork: 'HT', turn: 'Start to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise at end of 1 Need to "lower and drive forward".', notes: 'Don\'t lean to the right, when getting into the turn; struggle against that and put left side more forward. Spine tilted left, hip to Lady, so it won\'t gap. Do not turn feet when rotating/twisting the frame (CBM). Think about stepping forward through step 2, don\'t start turning too soon. Start turning as you come out of your first step, not as you go into it. In Natural turning figures, Man achieves the turn more through position.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'BDC', footwork: 'T', turn: '1/4 between 1-2', sway: 'Sway(R)', rise: 'Cont to rise on 2 and 3 Rise on toes, it will help to bring the feet together on 3rd step.', notes: 'Have continuous swing of the leg through the step.' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'BLOD', footwork: 'TH', turn: '1/8 between 2-3', sway: 'Sway(R)', rise: 'Lower at end of 3 Collect at the end of 3 and then drive straight back on next step.', notes: '' },
      { bar: 2, count: '1', foot: 'LF back', alignment: 'BLOD, toe turned in', footwork: 'THT', turn: '1/2 to R (pivot)', sway: 'Sway(S)', rise: 'CBM | No rise. Foot is placed turned 1/8 to right to prepare for turn.', notes: 'Pivot is made on toe. Heel is place on ground to stop turn. Although footwork "THT" - Heel is in contact with floor during turn. Roll up onto toe to generate movement into step 5. Variation: at corner, this step turns 3/8, another 1/4 between 5-6. Feet end in the same track, to avoid running into the follower\'s feet. CBMP is maintained through the end of this step. The leader\'s step is small, so that the follower can get around him. Leader maintains one track. Head stay far left.' },
      { bar: 2, count: '2', foot: 'RF fwd in CBMP', alignment: 'FLOD', footwork: 'HT', turn: 'Cont to turn', sway: 'Sway(S)', rise: 'CBM | Rise e/o 5 This is a large step, as the leader is on the outside of the turn. Avoid tendency to rise up on toe too soon, as this will negatively affect timing and balance. (Heel lead and rise up on toe completely, don\'t drop to heel too quickly to get into next step.) The rise and the turn happen together.', notes: '' },
      { bar: 2, count: '3', foot: 'LF to side and slightly back', alignment: 'BDC', footwork: 'TH', turn: '3/8 between 5-6', sway: 'Sway(S)', rise: 'Up, Lower e/o 6 Be sure next step is straight through under body, it is common to swing the leg out a bit on the next step but this is not correct.', notes: 'Variation: at corner, turn 1/4 between 5-6' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BDW', footwork: 'TH', turn: 'Starts to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1, NFR When preceded with the preparation step, the twist in the upper body to the left in preparation step should lessen as you collect onto RF and then to this step 1. Continue to twist upper body to R.', notes: 'CBM: different ways to think about this: left shoulder forward to the Man; turn right shoulder. Do not pull Man. Lift up left hip to Man, open door for Man to pass easily. Big driving step (just bigger, not a faster step), toe may turned in a little bit. it\'s more like side and slightly back in order to give Man room to step his right foot. But be careful not to change the direction of travel - it is still back, not to side, Follow the size of the Man\'s step. Do not lose frontal curve, sending middle center forward to Man, do not stick butt out. keep spine upright, not leaning forward or backward.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'PLOD', footwork: 'T', turn: '3/8 between 1-2, body turns less', sway: 'Sway(L)', rise: 'Cont to rise on 2 and 3 Swing right side up. Move RF a bit faster to get out of the way, pay attention not to be back-weighted. Do not place RF till Man does. Step RF first before moving body.', notes: 'This step will end up more diagonally forward than to the side. (Otherwise, there will be gap.) This is not a re-drive step. Let the effort from 1step flow. Body turns more and leave head "behind" (i.e. keep head in position and turn body underneath) to increase layout and extension. Changing head smoothly. Stretch head back. Use sway (in response to the Man\'s lead). Keep more left. Send middle/rib/hip forward. Do not get into Man\'s space. Keep feet on the floor with pressure to help maintain balance. More extension, taking body/side to Man more, breathe, do not hold breathe and get stiff. soft frame, finish head.' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'FLOD', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(L)', rise: 'Lower e/o 3 Stay left. Keep the feet with pressure on the ground in order to maintain balance on your toes when you collect on 3', notes: 'Show off extension between 2 & 3. Collect (controlled lowering) at end of 3, knee start going fwd, not down to prep for next step - drive straight forward. Even when rising, Lady\'s knees are still flexed, do not lock it. bend the knees slightly forward to counter balance Man. Man rise on knee/leg more. For ladies, it\'s more about extensions, not as much on rising on knees. Hips forward to Man. Extension: leave head where it was; spine more to the left (not just bending back) Send middle forward.' },
      { bar: 2, count: '1', foot: 'RF fwd', alignment: 'FLOD', footwork: 'HT', turn: '1/2 to R (pivot)', sway: 'Sway(S)', rise: 'CBM | No rise Start by connecting the shoulder and weight down to standing leg (L leg) and then drive. Do not lead with upper body.', notes: 'RF forward, CBM, strong, large, driving step, as follower is on outside of turn on this step. do not twist ankle when step. Step first, then pivot, L leg trailing (together with R leg, no big gap), keep legs rotating as one unit so the partners\' feet do not collide. Left side strongly forward down LOD using CBM. The momentum is moving forward. Not stationary CBM. Do not drop left shoulder. imagine nose passing left elbow (otherwise you\'ll invade Man\'s space), follow elbow. Do not square off during the turn. stay very left. It\'s very important to keep leg contact: Lady\'s R thigh to Man\'s R thigh. Should end this step with feet maintaining separate tracks, there needs to be enough room for leader to step between the follower\'s feet on the next step. Variation: at corner, this step turns 3/8, another 1/4 between 5-6.' },
      { bar: 2, count: '2', foot: 'LF back and slightly side', alignment: 'BLOD', footwork: 'T', turn: 'Cont to turn', sway: 'Sway(S)', rise: 'Rise e/o 5 Take a big step side/back on LF (help to stay behind Man) with pressure on RF toes to maintain balance; stay left.', notes: 'After stepping LF back, pull center back, use strong action to continue turning and collect/brush RF. Keep head strongly left all the way down LOD, keep head at outside circle, need to consciously do that so head won\'t get into Man\'s space. Send rib and hip forward to Man. Keep head distance with Man, keep the volume of the frame. Man counter balance. Man has CBM, Lady does not. When RF brushes to LF in next step, LF is on the ball. Lady: Rise is taken from ball of LF. Rise is the reason RF will brush to LF. Brush RF to LF and collect R hip, so Man can pass over. Keep R side (body contact) to Man. Stay balance on the foot until Man leads you to come out. Show off extension again.' },
      { bar: 2, count: '3', foot: 'RF diagonally fwd after brushing to LF', alignment: 'FDC', footwork: 'TH', turn: '3/8 between 5-6', sway: 'Sway(S)', rise: 'Up. Lower e/o 6 During brushing, ball of RF (not Heel) is in contact with floor. Collect/track LF under body before stepping fwd in next step, to avoid ronde kind of look.', notes: 'Lengthen L side, stretch Diagonally forward gently; don\'t put foot out too early. Push from LF and RF should slide out more. So RF is not "short". Have the middle of body go forward to Man and keep leg moving, but leaving head behind which creates more extension, then head catches up. Don\'t pause body, just leave head behind. At this point, both Man and Lady should be on their own balance. Lady: hips up to Man. Extension: rotate to right, extend. Then, collect, when feet are together is when shoulder is flat, then CBM the other direction Variation: at corner, turns 1/4 between 5-6 (earlier pivot would be 3/8 instead of 1/2 turn). First half is same as Natural Turn. Practice the rocking action ("pivoting"), keep legs "closed", don\'t do side steps when pivoting. Do rise & fall as much as your partner does. Always stay on your partner\'s right side. S haping variation (456): Lady turns her head to R (keep R side of body to Man and not peel off). Natural Spin Turn can be underturned: 3/8 for pivot, then 1/4 between 5-6. Compared to Closed Impetus : (last finishing part is the same) Spin turn: pivot action, then LF goes "back" and slightly side. 2 phase figure ( drive on 1, re-drive on 2 for greater amount of turn) . It turns around continuously; like spinning around a hinge, turns more than Closed Impetu s. Enter closed, existing outside partner position. Closed Impetus: Man stops "short" and Lady does "side step". 1 phase figure. Enter closed, exit closed position. Natural Spin Turn flows into L ock step very well.' },
    ],
    techniqueNotes: '',
  },
  'Natural Turn': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 2, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'FDW', footwork: 'HT', turn: 'Starts to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise at end of 1 Man starts to turn frame (CBM) as step begins, "opening the door" to allow him to pass the follower. (i.e. rotate frame 1/8 to the right.) 1/8 is about the max that is comfortable.', notes: 'Man drives, big step, to get through partner.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'DC', footwork: 'T', turn: '1/4 between 1 and 2', sway: 'Sway(R)', rise: 'Cont to rise on 2 and 3 Though written as side step, Man actually starts by pointing LF straight forward, then as you push off RF, turning the body as well, it ends up being a side step. Continue turning on next step to end BLOD.', notes: '' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'LOD', footwork: 'TH', turn: '1/8 between 2 and 3', sway: 'Sway(R)', rise: 'Lower at end of 3 Do not lower too early.', notes: '' },
      { bar: 2, count: '1', foot: 'LF back', alignment: 'BLOD', footwork: 'TH', turn: 'Starts to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 4, NFR The leader starts to turn his frame right (CBM) to allow follower to pass', notes: '' },
      { bar: 2, count: '2', foot: 'RF to side', alignment: 'PDC', footwork: 'T', turn: '3/8 between 4 and 5, body turns less', sway: 'Sway(L)', rise: 'Cont to rise on 5 and 6', notes: '' },
      { bar: 2, count: '3', foot: 'LF closes to RF', alignment: 'FDC', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(L)', rise: 'Lower e/o 6', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BDW', footwork: 'TH', turn: 'starts to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1, NFR Do not move weight off too quickly, Relax R hip to prepare.', notes: 'On inside turn, smaller step. LF turned in. At the end of 1, LF and hip turns, leaving body with partner, hip separated from upper body, RF tracks under body before stepping to side and PLOD. The turning of the fame continues (CBM) at the end of 1 to allow Man to pass through.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'PLOD', footwork: 'T', turn: '3/8 between 1 and 2, body turns less', sway: 'Sway(L)', rise: 'Cont to rise on 2 and 3 Opening out to let Man through.', notes: 'Timing of the turn of the upper body needs to be a littler smoother and earlier. Very important to keep upper body very left to Man, otherwise, Lady\'s body will block him. Keep head position, turn body underneath, which will create bigger extension. Body has a strong diagonal now. Do not allow R shoulder to turn to R, R side positive. Swing hip "forward", then body will catch up in step 3. Use the hip, banking a bit to the side (angle the hip a bit) to help slow movement/redirect, and not overshoot. Try not to produce shape too early. Move partial weight onto RF (bent R knee at this time), Not trying to balance solely on RF, there is a bit pressure on LF. Then p ressure RF into the floor, working up into the shape (straightening R leg and stretching the R side).' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'LOD', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(L)', rise: 'Lower e/o 3 Keep the feet with pressure on the ground in order to maintain balance on your toes when you collect on 3.', notes: 'Then body starts catching up, then collect and close LF to RF. Settle to normal position and "sit", hips underneath, free to move again. Do not try to shape back early. Body should feel it\'s poised forward. Lady\'s R hip is high (sway), hip is also rotated (relative to feet), L hip behind, this is the wind up. for next 1. The power for movement on next 1 comes from the end of 3, lowering into L heel and then pushing off on standing leg. Use the circular movement action. It may feel like moving \'away\' from partner when working moving weight onto L heel.' },
      { bar: 2, count: '1', foot: 'RF fwd', alignment: 'LOD', footwork: 'HT', turn: 'starts to turn R', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 4 Shoulder connects down to hip joints, release the joints, then drive the spine (move weight from heel to center to ball of LF and then push to step RF fwd)', notes: 'Do not dance the body forward too quickly. Or dance the legs too quickly. Really drive, bigger step (for person on the outside of the turn)' },
      { bar: 2, count: '2', foot: 'LF to side', alignment: 'FW', footwork: 'T', turn: '1/4 between 4 and 5', sway: 'Sway(R)', rise: 'cont to rise on 5 and 6 Though written as side step, Lady actually starts by pointing LF straight forward, then as you push off RF, turning the body as well, it ends up being a side step.', notes: 'LF tracks under body, passing through RF/ankle before pushing off RF to step LF to side. Big step.' },
      { bar: 2, count: '3', foot: 'RF closes to LF', alignment: 'BDC', footwork: 'TH', turn: '1/8 between 5 and 6', sway: 'Sway(S)', rise: 'Lower e/o 6 Circular movement action. In this case, next step is backward, moving weight onto front ball of RF, then to center, then heel. It may feel like moving \'into\' partner.', notes: 'Keep posture: adjust step size, follower always stays on leader\'s right side' },
    ],
    techniqueNotes: '',
  },
  'Open Impetus and Cross Hesitation': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 22, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BLOD', footwork: 'TH', turn: 'start to turn R', sway: 'Sway(S)', rise: 'CBM | - This is "Open Impetus".', notes: 'Main the sway from previous Natural Turn and transition into PP. See Open Impetus to Wing Notes' },
      { bar: 1, count: '2', foot: 'RF closes to LF (Heel Turn)', alignment: 'FDC', footwork: 'HT', turn: '3/8 btwn 1-2', sway: 'Sway(L)', rise: 'rise e/o 2', notes: '' },
      { bar: 1, count: '3', foot: 'LF diag. fwd in PP, L side leading', alignment: 'Pointing DC, body facing LOD', footwork: 'TH', turn: 'slight body turn to R', sway: 'Sway(S)', rise: 'up, lower e/o 3 Think about a diagonal line to come out in PP.', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd in PP and CBMP', alignment: 'Pointing DC, body facing LOD', footwork: 'HT', turn: '--', sway: 'Sway(S)', rise: 'rise e/o 4 This is "Cross Hesitation".', notes: '' },
      { bar: 2, count: '2', foot: 'LF closes to RF w/o weight', alignment: 'FDC', footwork: 'Toes of both feet', turn: 'body turn to L', sway: 'Sway(S)', rise: 'cont to rise 5 and 6 As you bring feet together, rise on toes.', notes: 'Different from leading Wing, in which, Man allows upper body to do extra rotation to allow Lady to pass from one side of body to another. In this Cross Hesitation, Man\'s arms remain on his right side, you want Lady to stay in your right front.' },
      { bar: 2, count: '3', foot: 'Position held', alignment: 'FDC', footwork: 'TH (RF)', turn: '--', sway: 'Sways(S)', rise: 'lower e/o 6', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'FLOD', footwork: 'HT', turn: 'start to turn R', sway: 'Sway(S)', rise: 'CBM | -- This is "Open Impetus"', notes: 'See Open Impetus to Wing Notes Big step. Depending on Man\'s lead, may have big swooping action here.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'BDC', footwork: 'T', turn: '3/8 btwn 1-2', sway: 'Sway(R)', rise: 'rise e/o 2 Allow feet to turn, delay head.', notes: 'Step should be adequately large in order to keep balance , keep extending left side, then lift left side to turn head to the right at end of 2' },
      { bar: 1, count: '3', foot: 'RF to side in PP having brushed to LF', alignment: 'Pointing Center, moving DC', footwork: 'TH', turn: '3/8 btwn 2-3, body turns less', sway: 'Sway(S)', rise: 'up, lower e/o 3 Keep shoulders/arms toward Man.', notes: 'Lift the left side of hip to Man, which makes Lady feel like the shoulder line is tilted upward. Extension: shoulder and chest - "rotate up" feel like high jump. Head: do not break the neck.' },
      { bar: 2, count: '1', foot: 'LF fwd and across in PP and CBMP', alignment: 'Pointing Center, moving DC', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | start to rise e/o 4 This is "Cross Hesitation"', notes: 'Shape to left. stay with Man. Don\'t peel R shoulder off Man.' },
      { bar: 2, count: '2', foot: 'RF to side', alignment: 'BLOD', footwork: 'T', turn: '1/4 btwn 4-5', sway: 'Sway(L)', rise: 'cont to rise on 5 and 6 Monitor Man\'s position.', notes: 'Do not step big. Turn feet underneath the body.' },
      { bar: 2, count: '3', foot: 'LF closes to RF', alignment: 'BDC', footwork: 'TH', turn: '1/8 btwn 5-6', sway: 'Sway(L)', rise: 'lower e/o 6', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Open Impetus and Wing': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 23, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BLOD', footwork: 'TH', turn: 'start to turn R', sway: 'Sway(S)', cbm: 'CBM', rise: '--', notes: 'Do not dissolve the sway from previous Natural Turn. Maintain the sway through the heel turn (longer than you normally would.)' },
      { bar: 1, count: '2', foot: 'RF closes to LF (Heel Turn)', alignment: 'FDC', footwork: 'HT', turn: '3/8 btwn 1-2', sway: 'Sway(L)', cbm: '--', rise: 'rise e/o 2', notes: 'Rise through the diagonal of the body. Rotate the body pass the base and stretch the right side. Head is forward, sending body diagonally back, changing angle. Do not lift foot. Keep foot very flat during heel turn, ball of feet just free enough to swivel.' },
      { bar: 1, count: '3', foot: 'LF diag. fwd in PP, L side leading', alignment: 'Pointing DC, body facing LOD', footwork: 'TH', turn: 'slight body turn to R', sway: 'Sway(S)', cbm: '--', rise: 'up, lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd in PP and CBMP', alignment: 'Pointing DC, body facing LOD', footwork: 'H', turn: '--', sway: 'Sway(S)', cbm: '--', rise: '--', notes: 'Start swaying to right, smooth transition through the measure, not producing sway in one beat.' },
      { bar: 2, count: '2', foot: 'LF start to close to RF', alignment: 'towards alignment of step 6', footwork: 'Pressure on T of RF with foot flat, and pressure on IE of T (LF)', turn: 'body turn to L on 5', sway: 'Sway(S)', cbm: '--', rise: 'slight rise on 5 and 6, NFR', notes: 'Body is slightly rotated to left to allow Lady to pass the hip.' },
      { bar: 2, count: '3', foot: 'LF closes to RF w/o weight', alignment: 'FDC', footwork: 'same as step 5', turn: 'body turn to L on 6', sway: 'Sway(S)', cbm: '--', rise: '--', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'start to turn R', sway: 'Sway(S)', cbm: 'CBM', rise: '--', notes: 'Keep right side positive. Right side connected to Man.' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'BDC', footwork: 'T', turn: '3/8 to R btwn 1-2', sway: 'Sway(R)', cbm: '--', rise: 'rise e/o 2', notes: 'Right front is still positive, do not pull R shoulder away. Allow base to turn first, turn feet underneath the body, head the last to turn. Create soft action. Try not to anticipate promenade and turn too early. Delay the turn. Turn through the feet first.' },
      { bar: 1, count: '3', foot: 'RF to side in PP, having brushed to LF', alignment: 'Pointing to center (moving DC)', footwork: 'TH', turn: '3/8 btwn 2-3, body turns less', sway: 'Sway(S)', cbm: '--', rise: 'up, lower e/o 3', notes: 'Feel the turn, delay the head. Develop strong left side stretch at the end.' },
      { bar: 2, count: '1', foot: 'LF fwd in PP and CBMP', alignment: 'BDW', footwork: 'HT', turn: '1/8 to L btwn 3-4', sway: 'Sway(S)', cbm: 'CBM', rise: 'start to rise e/o 4', notes: "Big step. Don't change sway too soon. At end of count 1, hip is just about square. As you land on L leg. L shoulder becomes the swing point, it's preference whether you want to get swing going early." },
      { bar: 2, count: '2', foot: 'RF fwd preparing to step OP on L side', alignment: 'BLOD', footwork: 'T', turn: '1/8 btwn 4-5', sway: 'Sway(L)', cbm: '--', rise: 'cont to rise on 5', notes: "Right side leading. Small steps on 2 and 3, walk closely around Man, do not travel too far away from Man. Try not to gap with Man. Going to the wrong position, Lady's Left side connects with Man's Left side. Head dances \"up and over\" the bar (where bra strap is). Do not collapse back muscle. Feel a strong upward curved. Pick up the center. Take head back. Feel that you are in a lengthened, picked up position. By the end of Count 2, head will be \"square\" to Man, closed." },
      { bar: 2, count: '3', foot: 'LF fwd in CBMP, OP on L side', alignment: 'BDC', footwork: 'TH', turn: '1/8 btwn 5-6', sway: 'Sway(L)', cbm: '--', rise: 'up, lower e/o 6', notes: "Allow arms to become part of Man's shape. Elbows forward and head back. Ending in Wrong Position: Lady head quadrant should still be on Man's right side, but hips and feet are on wrong side. Do not go too far to Man's left, which will make next step difficult. Two ways to do shaping: Slower, more gradual turning head to head over 1-2-3. Faster, sharper turning: all happens on 1" },
    ],
    techniqueNotes: '',
  },
  'Open Telemark and Cross Hesitation': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 19, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'DC', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise e/o 1 This is "Open Telemark"', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'BDW', footwork: 'T', turn: '1/4 btwn 1-2', sway: 'Sway(L)', rise: 'up Has strong swivel action in the base area.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd in PP', alignment: 'Pointing DW, body facing wall', footwork: 'TH', turn: '1/2 btwn 2-3, body turns less', sway: 'Sway(S)', rise: 'up, lower e/o 3 Man complete Telemark with feet.', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd in PP and CBMP', alignment: 'Pointing DW, body facing wall', footwork: 'HT', turn: '--', sway: 'Sway(S)', rise: 'rise e/o 4 This is "Cross Hesitation"', notes: 'See " Open Impetus and Cross Hesitation "' },
      { bar: 2, count: '2', foot: 'LF closes to RF w/o weight', alignment: 'FDW', footwork: 'Toes of both feet', turn: 'body completes turn', sway: 'Sway(S)', rise: 'cont to rise 5 and 6', notes: '' },
      { bar: 2, count: '3', foot: 'Position held', alignment: 'FDW', footwork: 'TH (RF)', turn: '--', sway: 'Sway(S)', rise: 'lower e/o 6', notes: 'Cross Hesitation can be used from other positions and can be overturned. If overturned, RF position will be "fwd and across". There is no foot swivel on step 4 unless cross hesitation is overturned. Normal ending is stepping back with Lady outside.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDC', footwork: 'TH', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise slightly e/o 1, NFR This is "Open Telemark"', notes: 'Straight back, do use CBM, but do not veer to right which will cut in front of Man. When doing CBM, it really just makes body "neutral", do not over do CBM, which will pull Man. Rotate through the hip, changing sway angle through the upper body (upward leftward diagonal), connect the R shoulder and R hip down. anchor, pull in center.' },
      { bar: 1, count: '2', foot: 'LF closes to RF (Heel Turn)', alignment: 'FLOD', footwork: 'HT', turn: '3/8 btwn 1-2', sway: 'Sway(R)', rise: 'cont rise on 2 Anchor, pull in center. Let base rotate. Do not cross center of Man.', notes: 'Heel turn, close feet slowly' },
      { bar: 1, count: '3', foot: 'RF diag. fwd in PP, R side leading', alignment: 'Pointing LOD', footwork: 'TH', turn: 'slightly body turn to L', sway: 'Sway(S)', rise: 'up, lower e/o 3 Completing the Telemark with body turning to PP.', notes: '' },
      { bar: 2, count: '1', foot: 'LF fwd and across in PP and CBMP', alignment: 'Pointing LOD, moving DW', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | start to rise e/o 4 This is "Cross Hesitation"', notes: 'See " Open Impetus and Cross Hesitation "' },
      { bar: 2, count: '2', foot: 'RF to side', alignment: 'Backing Wall', footwork: 'T', turn: '1/4 L btwn 4-5', sway: 'Sway(L)', rise: 'cont to rise on 5 and 6 Swing R hip ahead of body.', notes: '' },
      { bar: 2, count: '3', foot: 'LF closes to RF', alignment: 'BDW', footwork: 'TH', turn: '1/8 btwn 5-6', sway: 'Sway(L)', rise: 'lower e/o 6 Add shaping to left.', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Open Telemark and Wing': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 20, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'DC', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise e/o 1 This is "Open Telemark".', notes: 'Left side is axis point, stretch diagonal. See " Closed Telemark " for leading Lady to do heel turn.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'BDW', footwork: 'T', turn: '1/4 btwn 1-2', sway: 'Sway(L)', rise: 'up', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd in PP', alignment: 'Pointing DW, body facing wall', footwork: 'TH', turn: '1/2 btwn 2-3, body turns less', sway: 'Sway(S)', rise: 'up, lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'RF fwd and across in PP and CBMP', alignment: 'Pointing to LOD', footwork: 'H', turn: '1/8 btwn 3-4', sway: 'Sway(S)', rise: '-- This is "Wing". See Open Impetus and Wing .', notes: '' },
      { bar: 2, count: '2', foot: 'LF start to close to RF', alignment: 'towards alignment of step 6', footwork: 'Pressure on T of RF with foot flat, and pressure on IE of T (LF)', turn: 'body turn on 5', sway: 'Sway(S)', rise: 'slight rise on 5 and 6, NFR No foot swivel, but body turn only to face LOD', notes: '' },
      { bar: 2, count: '3', foot: 'LF closes to RF w/o weight', alignment: 'FDC', footwork: 'same as step 5', turn: '1/8 btwn 5-6', sway: 'Sway(S)', rise: '-- Foot swivel is used to end facing DC.', notes: 'Wing can be used from other positions. Less turn can be made on Wing to end facing LOD.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDC', footwork: 'TH', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | rise slightly e/o 1, NFR This is "Open Telemark"', notes: 'See " Closed Telemark " on doing heel turn.' },
      { bar: 1, count: '2', foot: 'LF closes to RF (Heel Turn)', alignment: 'FLOD', footwork: 'HT', turn: '3/8 btwn 1-2', sway: 'Sway(R)', rise: 'cont rise on 2', notes: '' },
      { bar: 1, count: '3', foot: 'RF diag. fwd and slightly to R in PP, R side leading', alignment: 'Pointing LOD', footwork: 'TH', turn: 'slightly body turn to L', sway: 'Sway(S)', rise: 'up, lower e/o 3', notes: '' },
      { bar: 2, count: '1', foot: 'LF fwd in PP and CBMP', alignment: 'FDC', footwork: 'HT', turn: '1/8 btwn 3-4', sway: 'Sway(S)', rise: 'CBM | start to rise e/o 4 This is "Wing"', notes: 'See " Open Impetus and Wing " for Wing.' },
      { bar: 2, count: '2', foot: 'RF fwd preparing to step OP on L side', alignment: 'Facing Centre', footwork: 'T', turn: '1/8 btwn 4-5', sway: 'Sway(L)', rise: 'cont to rise on 5 Right side leading.', notes: 'Head up and leftward.' },
      { bar: 2, count: '3', foot: 'LF fwd in CBMP, OP on L side', alignment: 'Facing against LOD, continue to turn to BDC', footwork: 'TH', turn: '1/4 btwn 5-6, then continue to turn body to BDC.', sway: 'Sway(L)', rise: 'up, lower e/o 6 No swivel on LF.', notes: 'Stay connected with Man on the wrong side.' },
    ],
    techniqueNotes: '',
  },
  'Outside Change': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Pre-Bronze', syllabusNumber: 9, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back', alignment: 'BDC', footwork: 'TH', turn: '--', sway: 'Start to rise e/o 1 Use range of motion.', rise: '', notes: '' },
      { bar: 1, count: '2', foot: 'RF back', alignment: 'BDC', footwork: 'T', turn: 'starts to turn L', sway: '-', rise: 'CBM | continue to rise on 2 Watch lady\'s position, do not turn hips without lady. Keep lady in front to the R side.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd', alignment: 'Pointing DW', footwork: 'TH', turn: '1/4 between 2-3, body turns less', sway: '-', rise: 'up, lower e/o 3', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd', alignment: 'Facing DC', footwork: 'HT', turn: '--', sway: 'Start to rise e/o 1 Relax knees, connect shoulder to hip joint. Big steps. Lift up center. Direct spine to RF.', rise: '', notes: 'This can start from OP, then it\'s like stepping between 2 glass panes Some coach suggest: Use CBM on this step to wind up (shoulder turned to R)' },
      { bar: 1, count: '2', foot: 'LF fwd', alignment: 'Facing DC', footwork: 'T', turn: 'starts to turn L', sway: '-', rise: 'CBM | Continue to rise on 2 Stepping in same direction as 1st step.', notes: 'Styling option: Keep head very left. Shape and turn head to right. head turns back to normal in next figure. Head is very left and only start changing head after weight is on LF, then shape to R. Change head only if being led. Don\'t change head if not led. When followed by Natural Turn with head turned to R, don\'t close head on 1 into Natural Turn , listen to lead, closing at end of 2. (all changes happen before end of 2) lead has to be strong enough. "Hover" - the good feeling of totally on balance, extend, express musicality. Take center back. don\'t gap with partner Some coach suggest: "Unwind" - after stepping LF, swivel on it to L, but keep shoulder where it is, it shoulder ends up rotated to R. Body feels twisted, middle of body connect with Man, left shoulder side very forward, following Man\'s shape, body may shape (twist) more to left, but relative to hips, left side is fwd. Variation: Finish in Promenade Position, in which case, foot position doesn\'t change, but turn shoulders toward Man. Keep head outside shoulder.' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'Backing DW', footwork: 'TH', turn: '1/4 between 2-3, body turn less', sway: 'up, lower e/o 3 The step can be thought of side or back step, depending on the moment looking at the step.', rise: '', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Outside Spin': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 24, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF back in CBMP (small step)', alignment: 'DC against LOD, toe turned in', footwork: 'THT', turn: '3/8 to R on 1 (pivot)', sway: '--', rise: 'CBM | - This is outside partner. Leave RF back in CBMP, to give lady room to get by.', notes: 'Start by turning right from the knees up. Upper body is twisting right much faster than feet. This is a very small step. Then just swivel the left foot. Rotation is much more in the base area (waist down to feet), leaving right side through diagonal. Do not over turn upper body. Keep head on your own left.' },
      { bar: 1, count: '2', foot: 'RF fwd in CBMP, OP', alignment: 'Facing against LOD', footwork: 'HT', turn: 'continue to turn', sway: '--', rise: 'CBM | rise e/o 2 Maintain CBMP stepping forward on RF, step behind the lady (step outside the lady, otherwise the leg is going to block lady and knock her off balance), give lady a chance to come around and close before stepping back and pivoting on the LF. This feels like a rock turn to the man.', notes: 'Really drive deep. Sharper rise to make Lady close her feet.' },
      { bar: 1, count: '3', foot: 'LF to side ending with LF back', alignment: 'FDC, end FDW', footwork: 'TH', turn: '3/8 btwn 2-3, 1/4 on 3', sway: '--', rise: 'up, lower e/o 3 Step side, ending with frame aligned with feet.', notes: 'Do not overturn body at the end, which will make it hard to collect and brush feet for the following reverse turn. The twisting of upper bodies will get both out of each other\'s ways.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'Facing DC against LOD', footwork: 'HT', turn: 'Cont. to turn R', sway: '--', rise: 'CBM | start to rise e/o 1 Outside Spin can start from different alignments. This is starting from Facing DC against LOD (with a full turn), it could also start from Facing DW, or Facing DW against LOD. (See notes below for amounts of turn when starting in different alignments.)', notes: 'Think about stepping "behind" Man\'s feet. Outside Spin vs. Spin Turn action: Spin Turn action: the left side of Lady is the axis for turning. Outside Spin: the right side is the axis and center for the turn. To tell if it\'s an outside partner spin turn or outside spin, be patient and wait. Outside Spin has an earlier and sharper, accelerated rise (and the axis is on Lady\'s RF). Relax right shoulder down, turn center and spine to right foot. Weight is centrally strong on R side. Don\'t lose R side connection to Man. Really work hard to give R side to Man and it will look like you didn\'t change, otherwise, R side pull away from Man. Take head to widest point, following the elbow. It\'s important to keep the left side up and not drop left side, otherwise it feels heavy to Man.' },
      { bar: 1, count: '2', foot: 'LF closes to RF', alignment: 'Facing wall', footwork: 'T', turn: '5/8 btwn 1-2', sway: '--', rise: 'cont to rise on 2 Stretch and keep R side to Man. Do not drift into Man\'s space. Allow L arm to rotate and get in front of body.', notes: 'Head turning: gradual, smooth. Starting head on left, as body changes shape during pivot, head changes. Head turning helps the spin. As the feet closes (make sure to close feet), keep center to Man, the waist area down is still continuing to rotate (hip continue to rotate which gives room for Man to step), then body catches up with hip and foot in next step. During all steps, make sure R side is kept to Man, do not bend R side, stay with Man, so you won\'t cross Man\'s middle to wrong side. Do not keep knees bent, finish rising during 2, don\'t pop up on 3' },
      { bar: 1, count: '3', foot: 'RF fwd, ending in CBMP', alignment: 'Facing against LOD, ending BDW', footwork: 'TH', turn: '1/4 btwn 2-3, 1/8 on 3', sway: '--', rise: 'up, lower e/o 3 RF step between Man\'s feet. Don\'t pop up.', notes: 'Body catches ups, keep rotating and extending upper body (otherwise it pulls Man), don\'t rush to exit. Lady sends R hip toward Man, needs to be really on RF, balanced, then lowering R knee and prep to go LF back. Do not rush off. Shaping: create shape by sending middle of body forward, head turn to R, do not go to R and get in front of Man, also do not lean back from lower back. shape is from sternum up. Man: 3/4 from BDW: 3/8 on 1, 3/8 between 2-3 1/2 from BDW against LOD: 1/4 on 1, 1/4 between 2-3 Lady: 3/4 from FDW: 1/2 between 1-2, 1/4 between 2-3 1/2 from FDW against LOD: 3/8 between 1-2, 1/8 between 2-3' },
    ],
    techniqueNotes: '',
  },
  'Progressive Chassé to R': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 16, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'Facing DC', footwork: 'HT', turn: 'Start to turn L', sway: '-', rise: 'CBM | start to rise e/o 1', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'Backing Wall', footwork: 'T', turn: '1/8 between 1 and 2', sway: '--', rise: 'continue to rise on 2 and 3 Track foot, no rondes.', notes: '' },
      { bar: 1, count: '&', foot: 'LF closes to RF', alignment: 'Backing DW', footwork: 'T', turn: '1/8 between 2 and 3, body turns less', sway: '--', rise: 'Up, lower e/o 4', notes: '' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'Backing DW', footwork: 'TH', turn: '--', sway: '--', rise: '--', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'Backing DC', footwork: 'TH', turn: 'Begin to turn L', sway: '-', rise: 'CBM | start to rise e/o 1, NFR Inside of turn, don\'t dance too quickly ahead of Man.', notes: 'Don\'t stick foot out early, lower body first. let the body initiate smooth movement. R shoulder and hip connecting down, axis point, strong stretch through left side of body, RF straight back. Turn your hips from the crossed position All steps of chasse should glide, big steps Keep head left' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'Pointing DW', footwork: 'T', turn: '1/4 between 1 and 2, body turns less', sway: '-', rise: 'continue to rise on 2 and 3 Track foot. Pull ab muscle back to spine. Keep centers long, not push tummy out to connect with Man.', notes: '' },
      { bar: 1, count: '&', foot: 'RF closes to LF', alignment: 'Facing DW', footwork: 'T', turn: 'slight body turn', sway: '-', rise: '-- Do not rush, stay on top longer, keep with Man. Give R side to Man.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd', alignment: 'Facing DW', footwork: 'TH', turn: '--', sway: '-', rise: '-- Left shoulder is quite forward.', notes: 'Finishing position: hips lifted to Man (especially left side), don\'t just turn upper body.' },
    ],
    techniqueNotes: '',
  },
  'Reverse Corté': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 10, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BLOD', footwork: 'TH', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | -- Do not step side ways, straight back, use CBM', notes: '' },
      { bar: 1, count: '2', foot: 'LF closes to RF without weight', alignment: 'BDC against LOD (or BDC on new LOD)', footwork: 'H(LF) then toes both feet', turn: '3/8 between 1-2', sway: 'Sway(R)', rise: 'rise on 2 Track foot. Drag LF in with heel. No rondes. Keep feet flat, keep knees flexed. Do not pop up both toes too early. Stay down till lady gets on her RF, then rise.', notes: '' },
      { bar: 1, count: '3', foot: 'Position held', alignment: 'BDC against LOD (or BDC on new LOD)', footwork: 'TH(RF)', turn: 'TH(RF)', sway: '--', rise: 'Sway(R) | up, lower e/o 3 Lower down through the right foot.', notes: 'Step 1 of all following figures would be CBMP, Lady OP. On step 2 turn may be made on ball of RF with foot flat. Footwork would then be 1. THT; 2 Toes both feet; 3 TH(RF) Note: Other alignments (between steps 1-2) are the following, with different ending alignment: backing LOD, 1/2 L between 1-2, ending against LOD backing LOD, 5/8 L between 1-2, ending BDW against LOD backing DC, 1/4 to L between 1-2, ending BDC against LOD.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'Facing LOD', footwork: 'HT', turn: 'start to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1 This is the same footwork as second half of Reverse Turn .', notes: 'Use CBM to help with the turn and stay together with Man. Do not drive using upper body. Connect shoulder with hip joint, release hip joint forward which starts the motion.' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'Facing Center', footwork: 'T', turn: '1/4 turn between 1-2', sway: 'Sway(L)', rise: 'Continue to rise on 2 and 3 Track RF.', notes: 'Do not step too big, it will pull man off his feet. Stay very left. Connect L shoulder down. If spine travels to the right, it will pull weight over to right and off balance. Show off extension between 2 and 3.' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'BDC against LOD (or BDC on new LOD)', footwork: 'TH(RF)', turn: '1/8 between 2-3', sway: 'Sway(L)', rise: 'lower e/o 3 Gracefully collect and get back (especially when extensions last extra measure.)', notes: 'Step 1 of all following figures would be CBMP, Lady OP, RF fwd. Just over 1/4 to L between 1-2, just under 1/4 to L between 2-3 3/8 to L between 1-2, 1/4 to L between 2-3 1/8 to L between 1-2, 1/8 to L between 2-3' },
    ],
    techniqueNotes: '',
  },
  'Reverse Pivot': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Bronze', syllabusNumber: 14, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '&', foot: 'RF back in CBMP (small step), LF held in CBMP', alignment: 'DC toe turned in', footwork: 'THT', turn: 'up to 1/2 to L (Pivot)', sway: '--', rise: 'CBM | -- RF should track under the body. Body begins turning at the beginning of this step.', notes: 'Small step. Straight back. Keep head weight on your left. Watch Lady\'s position, don\'t pivot too much too early, which will peel off from lady.' },
    ],
    follower: [
      { bar: 1, count: '&', foot: 'LF fwd in CBMP (small step) RF held in CBMP', alignment: 'DC', footwork: 'TH', turn: 'up to 1/2 L (Pivot)', sway: 'Every time when turning to the left, imagine the belly button and center slightly turning to the right. Do not allow shoulder to completely line up with hips. R shoulder and R hip feel slightly open in left turning figures.', rise: '', notes: 'Step forward, head goes more left. Show off extension. Primary contact between man and lady is the inside of the lady\'s upper thighs: her right thigh to inside of his R leg; her left thigh to outside of his R leg. Lady\'s L leg should track Man\'s R leg when stepping this step. keep with Man, do not travel too much. Controlled lowering at the end, before next step If the Reverse Pivot is started backing DC the alignment for the Pivot (Man) would be "to center, toe turned in". Note also that this step is in CBMP owing to the body turning strongly to L as the RF foot slips back. This step is on the half beat, at end of last step of previous figure (e.g. Closed Impetus) - body has not completely lowered in previous figure when stepping on this step. Allow this step to blend smoothly with the preceding step, if necessary borrowing from the next beat.' },
    ],
    techniqueNotes: '',
  },
  'Reverse Turn': {
    bars: 2,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 3, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'FDC', footwork: 'HT', turn: 'Stars to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise at end of 1 In Reverse turning figures, Man should maintain the frame orientation. The turn is achieved through movement (than position).', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side', alignment: 'BDW', footwork: 'T', turn: '1/4 btwn 1-2', sway: 'Sway(L)', rise: 'Cont to rise on 2 and 3 Track and brush feet. No ronde.', notes: '' },
      { bar: 1, count: '3', foot: 'LF closes to RF', alignment: 'BLOD', footwork: 'TH', turn: '1/8 btwn 2-3', sway: 'Sway(L)', rise: 'Lower at end of 3', notes: '' },
      { bar: 2, count: '1', foot: 'RF back', alignment: 'BLOD', footwork: 'TH', turn: 'Cont to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 4, NFR', notes: '' },
      { bar: 2, count: '2', foot: 'LF to side', alignment: 'PDW', footwork: 'T', turn: '3/8 btwn 4-5, body turns less', sway: 'Sway(R)', rise: 'Cont to rise on 5 and 6', notes: '' },
      { bar: 2, count: '3', foot: 'RF closes to LF', alignment: 'FDW', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(R)', rise: 'Lower e/o 6', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDC', footwork: 'TH', turn: 'starts to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 1, NFR Start from perfect balance, lower first, release into L knee and hip, hip rotates, body and drive big, gliding smooth steps, keep pressure on floor. Curve.', notes: 'Then release L leg to prepare next step and make room for Man, but don\'t step onto LF yet, wait till Man decides how big 2nd step is. At end of 1, RF swivels to L and then pushes off. Keep the head/upper body turning left with counter-balance in the shoulder for stability' },
      { bar: 1, count: '2', foot: 'LF to side', alignment: 'PLOD', footwork: 'T', turn: '3/8 between 1 and 2, body turns less', sway: 'Sway(R)', rise: 'Cont to rise on 2 and 3 LF really needs to track under body, collect to RF before stepping to side (pushes off RF).', notes: 'Lady is on inside of the turn and will finish the rotation early (which doesn\'t mean she\'ll step early). When there is big movement, there is sway to stop the movement, then we need shaping. In Reverse Turn, Lady could turn head to right and be very careful not to get in front of Man. LF to side, extend left side, keep R side to Man, stretch up and leave head, so head effectively turns to R, keep it there, it will create shaping to R. Lady\'s head turning comes from Man\'s shaping/sway. When spine shapes/sways to one side, it\'s comfortable (and looks better) for head to go with the spine and shape/turn. If Man shapes, and Lady\'s head doesn\'t turn, Man feels resistance. Shaping is for improved balance and it looks better. Sway: remember to go forward, don\'t do broken sway which gets Lady in front of Man. Keep shoulder, head position all the same, relative to the spine. Spine sways. This step will appear that left elbow is aiming upward, be careful not to raise shoulder. Stay very left. Show off extension between 2 & 3' },
      { bar: 1, count: '3', foot: 'RF closes to LF', alignment: 'FLOD', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(R)', rise: 'Lower e/o 3 Keep foot on floor with pressure.', notes: '' },
      { bar: 2, count: '1', foot: 'LF fwd', alignment: 'FLOD', footwork: 'HT', turn: 'Cont to turn L', sway: 'Sway(S)', rise: 'CBM | Start to rise e/o 4 Really drive, bigger step.', notes: '' },
      { bar: 2, count: '2', foot: 'RF to side', alignment: 'BW', footwork: 'T', turn: '1/4 between 4 and 5', sway: 'Sway(L)', rise: 'cont to rise on 5 and 6', notes: '' },
      { bar: 2, count: '3', foot: 'LF closes to RF', alignment: 'BDW', footwork: 'TH', turn: '1/8 between 5 and 6', sway: 'Sway(L)', rise: 'Lower e/o 6', notes: '' },
    ],
    techniqueNotes: '',
  },
  'Turning Lock': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 25, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1 (1/2 beat)', foot: 'RF back, R side leading', alignment: 'BDC', footwork: 'T', turn: '--', sway: 'Sway(L)', rise: 'start to rise e/o 1 Thigh and hips are 1/8 to R. (not turning feet)', notes: 'Angle through diagonal, head stretch leftward. Poised diagonally forward. Do not pull back.' },
      { bar: 1, count: '& (1/2 beat)', foot: 'LF crosses in front of RF', alignment: 'BDC', footwork: 'T', turn: '--', sway: 'Sway(L)', rise: 'rise on 2 and 3', notes: '' },
      { bar: 1, count: '2', foot: 'RF back and slightly R', alignment: 'BDC', footwork: 'T', turn: 'start to turn L', sway: 'Sway(S)', rise: '-- Rotate through the hips, pivot RF and turn, make sure Lady stays with you.', notes: '' },
      { bar: 1, count: '3', foot: 'LF to side and slightly fwd', alignment: 'Pointing DW', footwork: 'TH', turn: '1/4 btwn 3-4, body turns less', sway: 'Sway(S)', rise: 'up, lower e/o 4', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1 (1/2 beat)', foot: 'LF fwd, L side leading', alignment: 'DC', footwork: 'T', turn: '--', sway: 'Sway(R)', rise: 'start to rise e/o 1 After end of previous step (often, Natural Spin Turn) which is ending R side lead, connect R shoulder down. Really swing L side forward, let L hip and L side come diagonally forward (feels like shoulder rotating to R) sooner, changing it to L side lead. Not simply sticking LF fwd, the left side has to come through.', notes: 'L side leading, but left is not the driving side. The driving side is actually from standing leg and right lat muscle at end of previous step. Man starts opening up body and shaping to R, leading Lady to turn body/head to R Don\'t think about dancing around the Man, think about dancing "through" the Man. Keep all step size in sync with Man. Middle of body stays with Man, keep contact and fill in the space' },
      { bar: 1, count: '& (1/2 beat)', foot: 'RF crosses behind LF', alignment: 'DC', footwork: 'T', turn: '--', sway: 'Sway(R)', rise: 'rise on 2 and 3 Glute forward, don\'t sag. head weight to left.', notes: 'Both knees are flexed, cushioned. Both feet on toes, soft. Make sure weight is over ball of RF, soft, cushioned. Use the ankle and knees to push out.' },
      { bar: 1, count: '2', foot: 'LF fwd and slightly L', alignment: 'DC', footwork: 'T', turn: 'start to turn L', sway: 'Sway(S) Be very ab aware when rising, pull center back and stay on your own balance.', rise: '', notes: 'Body dancing forward, arms to partner.' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '1/4 btwn 3-4, body turns less', sway: 'Sway(S)', rise: 'up, lower e/o 4 This is closed finish.', notes: 'This could end in PP (after RF brushes to LF) in which case, head shape to right in its space. Do not turn head too fast or too early.' },
    ],
    techniqueNotes: '',
  },
  'Turning Lock to R': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Gold', syllabusNumber: 29, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF back R side leading', alignment: 'Down LOD', footwork: 'T', turn: '-', sway: 'Sway (L or R)', rise: '- | Start to rise e/o 1', notes: 'Sway: LLSS or RRSS Count &: LF crosses loosely in front of RF | Facing center | T | 1/4 to R btwn 1-2 | Sway (L or R) | - | Continue to rise 2 and 3' },
      { bar: 1, count: '2', foot: 'RF to side and slightly fwd, small step, btwn partner\'s feet', alignment: 'FDC', footwork: 'T', turn: '1/8 btwn 2-3', sway: 'Sway(S)', rise: '- | -', notes: '' },
      { bar: 1, count: '3', foot: 'LF diag. fwd, left side leading in PP', alignment: 'Pointing DC, body facing LOD', footwork: 'TH', turn: 'Slight body turn to R', sway: 'Sway(S)', rise: '- | Up. Lower e/o 4', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd L side leading', alignment: 'Down LOD', footwork: 'T', turn: '-', sway: 'Sway (R or L)', rise: '- | Start to rise e/o 1', notes: 'Lady will not brush on preceding Natural Spin Turn, but brush towards when moving into step 4 of Turning Lock to R. Sway: either RRSS, or LLSS Lady\'s head weight to left which helps the turn. Only turn to R going into count 3. Count &: RF crosses loosely behind LF | Backing center | T | 1/4 to R btwn 1-2 | Sway (R or L) | - | Continue to rise on 2 and 3 Small step. hip fwd' },
      { bar: 1, count: '2', foot: 'LF to side and slightly back', alignment: 'BDC', footwork: 'T', turn: '1/8 btwn 2-3', sway: 'Sway(S)', rise: '- | -', notes: 'LF sort of around Man, bigger step, so Lady can stay behind Man. Stretch. After weight is on LF, articulate head to PP.' },
      { bar: 1, count: '3', foot: 'RF to side in PP, having brushed towards LF', alignment: 'Pointing to Center, moving DC', footwork: 'TH', turn: '3/8 btwn 3-4, body turns less', sway: 'Sway(S)', rise: '- | Up. Lower e/o 4', notes: 'Keep big step. There are continuously big steps, if one step is shorter, it stops momentum. Body dance smoothly and continuously. Lady R side/arm to Man. Check R elbow at correct angle. R side can never be "dead".' },
    ],
    techniqueNotes: '',
  },
  'Weave from PP': {
    bars: 3,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Silver', syllabusNumber: 17, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'RF fwd and across in PP and CBMP', alignment: 'Pointing DC, body facing LOD, traveling DC', footwork: 'HT', turn: '1/8 btwn preceding step and 1', sway: '-', rise: 'Start to rise at end of 1', notes: '3 different points in PP: base: waist area down to feet, rotate slightly to left belly button: low center, slightly different angle. sternum: high center 3 different points enables you to stay parallel to Lady. Do not turn hips and feet too much to the Lady (makes position awkward). For this left turning figure, keep the differential consistent while moving in a curve, maintain upper body toward to Lady. Don\'t let upper body rotate further than feet, which will pull the lady to your left.' },
      { bar: 1, count: '2', foot: 'LF fwd', alignment: 'Facing center', footwork: 'T', turn: 'cont to turn L', sway: '-', rise: 'CBM | Cont to rise on 2 and 3', notes: '' },
      { bar: 1, count: '3', foot: 'RF to side and slightly back', alignment: 'BLOD', footwork: 'TH', turn: '1/4 btwn 2-3', sway: '-', rise: 'Up. Lower at end of 3', notes: 'Do not anticipate moving LOD. Allow energy to continue to move / follow through diagonal center.' },
      { bar: 2, count: '1', foot: 'LF back in CBMP', alignment: 'BDC', footwork: 'TH', turn: '1/8 betwn 3-4', sway: '-', rise: 'cont to rise e/o 4', notes: 'Lead Lady outside partner. Use CBM. Lower through right leg and hip, use abdominal muscle, dance diagonal stretch.' },
      { bar: 2, count: '2', foot: 'RF back', alignment: 'BDC', footwork: 'T', turn: 'start to turn L', sway: '-', rise: 'CBM | Rise e/o 5', notes: 'Rotate the hip, open the door for Lady. Stay parallel.' },
      { bar: 2, count: '3', foot: 'LF side and slightly fwd', alignment: 'Pointing DW', footwork: 'TH', turn: '1/4 btwn 5-6, body turns less', sway: '-', rise: 'Up, Lower e/o 6', notes: '' },
      { bar: 3, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'Facing DW', footwork: 'H', turn: '--', sway: '-', rise: 'CBM | -', notes: '' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'LF fwd in PP and CBMP', alignment: 'Facing DC, traveling DC', footwork: 'HT', turn: 'start to turn L', sway: '--', rise: 'CBM | Start to rise e/o 1', notes: 'Both step 1 and 2, think about stepping straight forward, forward, do not curve into Man, do not turn too early (don\'t turn late either). Legs are ahead of body. Big step. Stay connected with Man. Work the R side a lot to stay with Man. Shaping: starting from PP (L hip up). on count 1, R hip begins to pick up.' },
      { bar: 1, count: '2', foot: 'RF to side and slightly back', alignment: 'BDC', footwork: 'T', turn: '1/4 to half turn btwn 1-2', sway: '--', rise: 'Cont to rise on 2 and 3', notes: 'Swing leg strongly forward, big step. Don\'t turn right away. Head traveling forward with the RF first, Get weight on RF, balance on RF, then turn body and head. Don\'t lose R side. Give R side and hip to Man. Do not just rise and let body fall backward. Think about going forward along the curve which will give you better rotation, give Man more space. At end of this step, R hip is swung up at its maximum. Think about "swing up and hover". Always stay on left side (Man\'s right). Give R side to Man. Stretch, create bigger, fuller shape. On' },
      { bar: 2, count: '2', foot: 'head is just about vertical, square. At end of 2 into 3: really shape. Need to be fully balanced.', alignment: '', footwork: '', turn: '', sway: '', rise: '', notes: '' },
      { bar: 2, count: '3', foot: 'LF to side and slightly fwd', alignment: 'Pointing DC', footwork: 'TH', turn: '1/2 btwn 2-3, body turn less', sway: '--', rise: 'Up. Lower e/o 3', notes: 'It may feel like a diagonally backward step, but because of the turn it will end side and slightly fwd. Do not do directly side step, that will not leave enough room for CBMP in next step.' },
      { bar: 3, count: '1', foot: 'RF fwd in CBMP, OP', alignment: 'FDC', footwork: 'HT } --', turn: '--', sway: 'Cont to rise e/o 4', rise: '', notes: 'To go outside forward, relax R shoulder down, do not take it back (which peels off from Man), connecting R shoulder down will drive the R leg forward. Think of Man\'s elbow as limbo bar, try not to beat it with upper body forward. Contra body. Left side more forward. Stretch head even more.' },
      { bar: 3, count: '2', foot: 'LF fwd', alignment: 'FDC', footwork: 'T', turn: 'start to turn L', sway: '--', rise: 'CBM | Rise e/o 5', notes: 'LF to left of Man, stay very left/behind Man. Get on LF first, then: If the figure finishes in PP: turn to PP, don\'t fallback off to PP. Turn head when rising (after getting weight on foot), feet turn to PP as well. Pull center back whenever you rise, be on your own balance.' },
      { bar: 3, count: '3', foot: 'RF to side and slightly back', alignment: 'BDW', footwork: 'TH', turn: '1/4 btwn 5-6, body turns less', sway: '--', rise: 'Up. Lower e/o 6', notes: 'This is closed finish. keep head position and only turn body, give R side to Man, then head ends up to R and body shapes to R. It could end in PP: lift left hip to Man, think about high jump. R side to Man. Check R arm/elbow.' },
      { bar: 4, count: '1', foot: 'LF back in CBMP', alignment: 'BDW', footwork: 'T', turn: '--', sway: '--', rise: 'CBM | - Notes:', notes: 'Man: 1/8 to L can be made between 2-3, so 4-5 may be taken BLOD. Less turn can be made on Whisk to end facing LOD, or the Open Impetus could be used an an entry, when the body would be facing LOD. Then, the alignment will be like the Weave in Foxtrot. This may end in PP, same as Outside change to PP from step 4.' },
    ],
    techniqueNotes: '',
  },
  'Whisk': {
    bars: 1,
    dance: 'Waltz', category: 'Standard', syllabusLevel: 'Beginners', syllabusNumber: 5, syllabusBody: 'NDCC',
    leader: [
      { bar: 1, count: '1', foot: 'LF fwd', alignment: 'FDW', footwork: 'HT', turn: 'Nil', sway: 'Sway(S)', rise: 'slight | Start to rise at end of 1', notes: '' },
      { bar: 1, count: '2', foot: 'RF to side and slightly fwd', alignment: 'FDW', footwork: 'T', turn: 'Nil', sway: 'Sway(L)', rise: 'Cont to rise on 2 and 3 Position of this step is consistent with step 2 of LF Closed Change .', notes: 'This is not a side step (which will be abrupt change of direction), it\'s a forward step (smoother) When pushing LF, allow RF to slide on the floor, so the weight doesn\'t pass the foot (otherwise, momentum carries weight to right which causes balance issue). Rotate upper body to right to lead lady to whisk' },
      { bar: 1, count: '3', foot: 'LF crosses behind RF in PP', alignment: 'FDW', footwork: 'TH', turn: 'Nil', sway: 'Sway(L)', rise: 'Lower at end of 3 Brush LF, turn the frame, bring the foot right underneath the body, knees are touching, both feet facing same direction, foot does not turn out.', notes: 'Leader needs to step far enough back on 3 so that it is clear to follower that she should pass her feet. Big twist, keep hips lifted toward lady. In PP, frame facing your partner, don\'t open up with shoulder facing LOD.' },
    ],
    follower: [
      { bar: 1, count: '1', foot: 'RF back', alignment: 'BDW', footwork: 'TH', turn: 'Nil', sway: 'Sway(S)', rise: '-- | Start to rise e/o 1, NFR Whisk starts with a contra check action to begin with, wind up, commit enough weight on RF and then unwind and go to side (basic version)', notes: 'In contra checks: weight has to go on back foot more than 50%, in order to push up and sprint (you can\'t push with 50-50 split weight . Action: coil up, and then rebounce.)' },
      { bar: 1, count: '2', foot: 'LF diagonally back', alignment: 'PDC', footwork: 'T', turn: '1/4 to R btwn 1-2, body turns less', sway: 'Sway(R)', rise: '-- | Cont to rise on 2 and 3 Before taking step, LF needs to track under body.', notes: 'Lady keep moving one direction till Man signals to turn at e/o 2. Feet completes the turn by swiveling at e/o 2, frame now faces wall, sort of in a funny position. Lady\'s L leg should track Man\'s R leg, so it will step in the right place and stay behind man. Take this step bigger. Feet complete the turn between 1-2. Allow legs and hips to turn, but try very hard to keep upper body parallel with Man, almost feeling like upper body is twisting to left. Whenever rising up to toes on both feet, you must take abdominal muscle/lower center back to the spine which will give give you internal balance. Lady would feel her left hip is led to rise, lift left hip higher.' },
      { bar: 1, count: '3', foot: 'RF crosses behind LF in PP', alignment: 'FDC', footwork: 'TH', turn: 'body completes turn', sway: 'Sway(R)', rise: '-- | Lower e/o 3 Foot: RF comes right underneath the body. Do not leave lot of space between RF and LF. RF and LF should be parallel pointing to the same direction.', notes: 'There is no more movement on 3rd step. Two thighs are very together, no space to see through. Man\'s R thigh is on Lady\'s inside of Left thigh. (Then, going to Chasse, Lady\'s left leg is going to follow Man\'s R leg.) Hip: rotate hip to turn to right. lift up R hip toward Man, do not drop it. R leg is the standing leg, but L hip is higher. Head: is along the line of the spine. (Imagine pony tail being pulled back) Do not drop L shoulder, stretch left side. Shoulder does not tilt. Right shoulder forward. When taking the weight back, do not take R shoulder/arm with it. Leave R shoulder quite forward to Man, tuck shoulder under and in. In PP, frame is backing wall, facing your partner, while feet is DC. Keep center to partner. don\'t open up with shoulder facing LOD. When turning into promenade, the lady\'s head is the last thing to turn, between 2-3. When the lady moves between promenade and closed position, her head should "go over the moon", i.e., the nose describes an upward arc, to prevent the chin from going down. Head turn is a result of lady turning her Left side toward Man. body and head should not turn "on its own". Head should be over the "high jump bar" on the other side of the arm. Think about "sit back" - don\'t lean head forward. Whisk is a figure to connect two positions: Closed Position and Promenade Position.' },
    ],
    techniqueNotes: '',
  },
}