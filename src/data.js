// ─── DANCE COLORS ────────────────────────────────────
export const DANCE_COLORS = {
  'Waltz': { bg: '#5a3d7a', lt: '#ede5f8' },
}

// ─── WALTZ FIGURES ───────────────────────────────────
export const FIGURES = {
  'Waltz': [
    { n: 'Natural Turn',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FW,BDC',           sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'CBM on 1. Body swings R. No sway on step 1.' },
    { n: 'Reverse Turn',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC,FC,BDW',           sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'CBM on 1. Heel turn step 2. Body swings L.' },
    { n: 'Closed Change (RF)',     c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC,FDC,FD',           sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Slight CBM step 1. Side step slightly fwd on 2.' },
    { n: 'Closed Change (LF)',     c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,FDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',    notes: 'Opposite of RF Closed Change.' },
    { n: 'Natural Spin Turn',      c: '1-2-3,4-5-6', fw: 'HT,T,TH,TH,T,TH',   al: 'FDW',                  sw: 'S,R,R,S,L,L', rise: 'Rise e/o 1, pivot on 3, top 5&6',      notes: 'Pivot on step 3. Strong body swing.' },
    { n: 'Double Reverse Spin',    c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDC',                  sw: 'S,L,L',       rise: 'Rise e/o 1, top 2, lower e/o 3',       notes: '3/8 turn L. Heel turn for lady.' },
    { n: 'Whisk',                  c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,BDW',          sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3',                  notes: 'Step 3 crosses behind into Promenade Position.' },
    { n: 'Chassé from PP',         c: '1-&-2',       fw: 'TH,T,TH',            al: 'LOD,LOD,LOD',          sw: 'S,S,S',       rise: 'Cont rise',                             notes: 'From PP. Side, close, side. Quick steps.' },
    { n: 'Hesitation Change',      c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FW,BDC',           sw: 'S,L,L',       rise: 'Rise e/o 1, lower e/o 3',               notes: 'Step 2: close foot without transferring weight.' },
    { n: 'Outside Change',         c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,FDW,BDC',          sw: 'S,R,R',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Leader steps outside partner on step 1. CBMP.' },
    { n: 'Hover Corté',            c: '1-2-3',       fw: 'HT,T,T',             al: 'FDW,BDW,BDW',          sw: 'S,L,L',       rise: 'Rise to top 2&3, no lower on 3',        notes: 'Hover action — do not lower on step 3.' },
    { n: 'Contra Check',           c: '1-2-3',       fw: 'HT,TH,T',            al: 'LOD,BLOD,BLOD',        sw: 'S,S,S',       rise: 'Lower into 1',                          notes: 'Strong forward check on 1. Body contra to feet.' },
    { n: 'Back Lock',              c: '1-2-3',       fw: 'TH,T,TH',            al: 'BDW,BDW,BDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Back, side-cross-behind, side. Lock action.' },
    { n: 'Back Whisk',             c: '1-2-3',       fw: 'TH,T,TH',            al: 'BDC,BDC,BDW',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3',                  notes: 'Backs into Promenade. Step 3 behind.' },
    { n: 'Closed Impetus',         c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW,BDW,FDC',          sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, lower e/o 3',     notes: 'Heel turn on 2. Used to change direction.' },
    { n: 'Fallaway Reverse & Slip Pivot', c: '1-2-3,4', fw: 'HT,T,TH,T',      al: 'FDC,BDW,FDW,Spot',     sw: 'S,L,L,S',    rise: 'Rise e/o 1, top 2&3, pivot 4',         notes: 'Ends in PP. Slip pivot is a strong rotation.' },
    { n: 'Outside Spin',           c: '1-2-3',       fw: 'HT,T,TH',            al: 'FDW',                  sw: 'S,R,R',       rise: 'Rise e/o 1, top 2, lower e/o 3',       notes: 'Leader outside partner. Strong spin.' },
    { n: 'Drag Hesitation',        c: '1-2-3',       fw: 'HT,T,T',             al: 'FDW,FW,FW',            sw: 'S,L,L',       rise: 'Rise e/o 1, top 2&3, no lower',        notes: 'Drag trailing foot. Held position on 3.' },
    { n: 'Progressive Chassé to R', c: '1-&-2',      fw: 'HT,T,TH',            al: 'FDW,FDW,FDW',          sw: 'S,S,S',       rise: 'Cont rise',                             notes: 'To the right. Side, close, side. Quick.' },
    { n: 'Turning Lock',           c: '1-2-3,4',     fw: 'HT,T,TH,T',          al: 'FDW',                  sw: 'S,R,R,S',     rise: 'Rise e/o 1, top 2&3, lower e/o 4',     notes: 'Lock on beat 4. Rotates to R.' },
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
