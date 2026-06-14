# Floorcraft Trajectory Board — Project Overview
_Dance Praktika · compiled 10 June 2026 · for transfer to a new project_

## Purpose
Interactive teaching tool for showing DanceSport routines on a virtual ballroom floor (30 m × 20 m), used in classes and intended for publication as per-routine links (Claude artifact publish → opened on Android/tablet in class). Companion letter-size PDFs serve as student handouts.

## The board (artifact: `floorcraft-trajectory-board.jsx`)
- **Views:** Ceiling (top-down, fully interactive) and Floor (perspective from the short end; drag and stamp only).
- **Dancers:** leader **black**, follower **red**, drawn oversized (~3× width, not floor-scaled) as shoulder-ellipse + head + facing tick. Closed-hold couple by default.
- **Manipulation modes:** *Couple unit* (drag dashed circle to travel, outer handle to rotate) and *Individual* (each dancer draggable with own facing handle). *Re-form hold* snaps the follower back.
- **Trajectory:** black line tracing the couple's common centre (midpoint, marked with a dot).
- **Stamps (ghosts):** *Stamp position* drops a numbered, 45 %-opacity frozen couple. Ghosts are draggable; tap to select → rotation handle turns the whole ghost couple (positions + facings) about its centre. No alignment captions — the ghost's own orientation shows the alignment. No "End" caption either; the live couple shows the finish.
- **Figure labels:** blue, placed BETWEEN stamps (a name labels the travel, not the position). Tap to select → drag to move, ↻ handle rotates, ↵ button cycles a line break through the words. Edits survive *Path from stamps* rebuilds.
- **Path from stamps:** redraws the trajectory (and re-seats labels) through the current ghost centres in stamp order, ending at the live couple. Each ghost stores its figure's initial travel direction so curve shapes are preserved.
- **Copy layout:** exports the full state (couple, ghosts, labels, path) as JSON to clipboard + textarea. This is the **bake round-trip**: arrange on the board → Copy layout → paste JSON to Claude → Claude hard-codes it into the preset so reloads and published links reproduce the arrangement exactly. Used because artifact state is browser-local and resets on code updates.

## Floor conventions
- LOD = left → right along the bottom long wall; wall = bottom edge, centre of floor = top.
- Alignments (leader, screen angles): facing LOD = 0°, DW = +45° (toward wall), DC = −45° (toward centre), facing wall = +90°, backing LOD = 180°, backing DC = +135°.
- New sequences default to equal-length segments spanning the full long line, corner to corner; Victor then rearranges by hand.

## Baked routines (all hand-arranged by Victor, layouts stored as constants in the artifact)
| Button | Figures (labels between stamps) | Key dictated alignments |
|---|---|---|
| **Foxtrot** | Feather Step · Reverse Turn · Feather Finish · Three Step · Natural Turn · Heel Pull | Start corner facing DC; Feather DC→DC; Reverse Turn → backing LOD; Feather Finish → facing DW; Natural Turn → backing LOD; Heel Pull → facing DC |
| **Tango** | Two Walks · Progressive Link · Closed Promenade · Open Reverse Turn, Lady Outside · Two Walks · Tango Rocks · Back Corté | Walks commence facing DW; Link ends PP still DW; Closed Promenade travels diagonally to centre, ends facing LOD; Open Reverse travels straight along LOD, ends facing DW; second Two Walks end facing wall; Rocks end backing DC; Back Corté ends facing DC |
| **Quickstep** (Pre-Bronze) | LF Walk + Half Natural Turn · Hesitation · Progressive Chasse to Right · Lock · Tipple Chasse to Right · Lock · Lock Forward | Start facing DW with extra LF step; Half Natural → backing LOD; Hesitation → facing DC; Prog. Chasse → backing LOD; backward Lock → backing LOD; Tipple → facing LOD; Lock at LOD; Lock Forward ends between LOD and DW (+22.5°) |
| **Waltz 1** (Pre-Bronze) | Half Natural · Hesitation · Half Reverse · Weave · Outside Change to PP · Chasse from PP | Start facing DW; Half Natural → backing LOD; Hesitation → facing DC; Half Reverse → backing LOD; Weave → backing LOD, closer to middle; Outside Change to PP → between facing wall and DW (67.5°); Chasse from PP ends facing wall |

## PDFs (letter, landscape, plain analytical — no branding, no grid)
`Foxtrot_Routine.pdf`, `Tango_Routine.pdf`, `Quickstep_PreBronze_Routine.pdf`, `Waltz_PreBronze_Routine_1.pdf`. Generated from the baked layouts, uniformly rescaled so each path spans the long line (x ≈ 2–28 m); leader black / follower red / track black; blue numbered stamps and figure labels at Victor's positions with his rotations and line breaks; LOD arrow; one-line legend. Generator: Python + ReportLab (script rebuildable from the baked layout constants in the artifact).

## Workflows
1. **New routine:** Victor dictates figure list + alignment corrections (watch for voice-transcription artifacts; flag and confirm with ONE focused question). Claude builds a computed preset (equal segments, full wall), Victor corrects alignments, arranges on the board, exports via Copy layout, Claude bakes it.
2. **PDF export:** consume baked layout → spread across LOD → letter landscape render → visual check via rasterization before delivery.
3. **Publishing (pending):** split the master board into one artifact per routine, sequence pre-loaded on open; publish each as a link; open on Android via Claude app or shared link in Chrome.

## Open items
- Waltz routine 2 (figure list to come); possible Tango 2 and Quickstep 2/3.
- Per-routine publish-ready artifacts + the batch publish of class links.
- Optional: timing notation (SQQ etc.) on labels; foot-position markers; standalone offline HTML version for venues without Wi-Fi.
