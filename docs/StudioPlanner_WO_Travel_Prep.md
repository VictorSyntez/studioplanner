# StudioPlanner — Work Order: Travel Preparation (Brazil, ~2–3 weeks)

**Date:** 2026-07-28 **rev 3** (supersedes rev 2, same date — rev 2 recorded Stage 1.1–1.3; this revision records **1.4 execution** and amends **Stage 2.4** for the `sources/` tarball)
**Ruling (Victor, 2026-07-28 — locked decision #35):** Option **(a)** — repo cloned to laptop 5500's **internal disk**; the Crucial X6 is **backup and transport only**, never the working copy.
**Baseline:** handoff **rev 9** — `main` == `origin/main` at **`a5c87a7`**, pushed; deployed content = `v0.6.0-data` (`b864e9b`); both session-6 commits bundle-neutral (verified byte-for-byte).

---

## Stage 1 — Desktop close-out (Claude Code) — STATUS

**1.1 Repo completeness check — ✅ DONE, commit `944c9dd` (pushed).**
`main` was fully pushed; nothing unpushed. Committed: repo-handoff amendment line; `StudioPlanner_Project_Status_Overview_2026-07-24.md`; both NDCC syllabus PDFs (mode fixed 755→644); the two session records formerly at repo root (paths per `944c9dd`'s diff). **Not committed (local-only → X6):** `.env` (Firebase config, gitignored), `reference/` 8.6 M + `sources/` 143 M (gitignored source archives), `.firebase/`, `dist/`, `.claude/`, `files.zip` (superseded KB export — all content already in git history; deletion candidate on return).

**1.2 Decision #34 — ✅ EXECUTED-AS-AMENDED, commit `a5c87a7` (pushed).**
Blocker found: plain `npm install` was already failing on the committed tree (vite `^8.0.4` vs `vite-plugin-pwa@1.2.0` peer range topping out at `^7`). **Ruled route B+:** install `firebase-tools@15.24.0` with `--legacy-peer-deps` and commit an `.npmrc` (`legacy-peer-deps=true`). Verified: bare `"15.24.0"`, CLI runs locally, **plain `npm install` now succeeds** (this is what makes Stage 2.3 work), bundle byte-identical to deployed. `.npmrc` is **temporary** — deleted at the deferred **Route A** sitting (post-travel: bump `vite-plugin-pwa` → `^1.3.0`, build + smoke + deploy). Known noise: 36 `npm audit` findings in the firebase-tools devDependency tree — **no action; never `npm audit fix --force`**, desktop or laptop.

**1.3 KB refresh — ✅ DONE.**
KB `data.js` refreshed from HEAD; content identity `3102bc5`; fingerprint 114 audited / 1 parsed, 230 `syllabusLevel` (20 null), 114 `corrections` arrays; sha256 `b4c5e632…9eef67`, 387,004 bytes.

**1.4 X6 backup — ✅ DONE, verified.**
Mirror at `/media/victor/Crucial X6/studioplanner` — 621 files, 469 MB on disk (512 KB exFAT clusters inflate 175 MB of data; harmless). Carried: `.git`, `.env`, `reference/`, `dist/`, `.firebase/`, `.claude/`, `.npmrc`, `files.zip`, **`sources.tar.gz`**. Excluded: `node_modules/` only. Restore instructions: `studioplanner_MIRROR_README.txt` on the drive. Four findings, all handled:
- **exFAT filename limits:** 106 dancecentral pages carry `?` in their names (e.g. `waltz-natural-turn?src=routine.html`), which exFAT cannot store — a plain copy would have silently dropped all 106. **`sources/` therefore travels as `sources.tar.gz` (20 MB)**, read back off the drive and verified 737/737 files with all 106 problem names intact; the partial `sources/` folder was removed from the drive so it cannot be mistaken for complete.
- **Mode-bit noise (cosmetic):** exFAT drops the executable bit, so `git status` on the drive shows 83 "modified" files — contents checksum-identical. Expected; ignore.
- **Collateral deletion, corrected:** removing the partial `sources/` also removed its 4 *tracked* files (manifests, wget log); restored.
- **Fallback proven:** `git clone` from the drive yields a clean checkout at `a5c87a7` with full history (`e9a1484` → `944c9dd` → `a5c87a7`).

**1.5 Docs-tracking commit — ⬜ PENDING (final desktop Code action).**
Gap found at 1.4: Stage 2 clones from GitHub, but the repo carries only the rev 8 handoff and no travel work order — the laptop would clone without the document Stage 2 runs from. **One docs-only commit:** (1) `docs/StudioPlanner_Handoff.md` overwritten wholesale with rev 9 (discharging rev 9's own tracked instruction to do so); (2) `docs/StudioPlanner_WO_Travel_Prep.md` — **this rev 3**. Push. No tag, no deploy. The X6 being one docs-commit behind is acceptable — GitHub carries the commit, and both documents already sit on the drive as loose files.

---

## Stage 2 — Laptop 5500 setup (Victor; verify BEFORE departure if at all possible)

**2.1 Tooling.** Install: git, Node.js (match desktop's **major 22** (desktop: Node v22.23.1, npm 10.9.8, git 2.43.0)), Claude Code.

**2.2 GitHub auth.** New machine needs push access — SSH key or credential login for `github.com/VictorSyntez/studioplanner`; verify with a test `git fetch`.

**2.3 Clone + install.** `git clone` into the laptop's home directory (internal disk, not the X6). Then plain `npm install` — works as of `a5c87a7`, and brings the pinned `firebase-tools`.

**2.4 Restore local-only files from the X6 into the clone** *(a clone does NOT carry these; `reference/` and `sources/` are gitignored)*:
- `.env` → repo root (plain copy)
- `reference/` → repo root (plain copy)
- **`sources/` → extract `sources.tar.gz` at repo root** — *do NOT look for a `sources/` folder on the drive; it isn't there.* exFAT cannot store the 106 `?`-named dancecentral pages, so `sources/` travels only as the tarball. Extract on the laptop's internal disk (ext4 handles the names fine), then spot-check that a `?`-named file exists. Without this there is no against-source audit capability; the **gzip hazard** applies to the extracted tree as always.
- `.claude/` → repo root (optional — Code settings convenience)

**2.5 Firebase auth.** `firebase login` on the laptop (opens a browser). Machine-local credential — **cannot** be carried on the drive (same mechanism as the session-4 desktop re-auth). Do it before travel.

**2.6 Smoke test.** `npm run dev` builds and serves; open the app locally. No deploy warranted — live site is exactly `v0.6.0-data` content.

**2.7 KB access.** Log into claude.ai on the laptop and confirm this project and its knowledge base open. Nothing to migrate — the KB is cloud-hosted.

---

## While traveling — working model

- **Working copy:** laptop internal disk only. Push to `origin/main` as usual; deploys work from anywhere once 2.5 is done (`npx firebase deploy --only hosting` — resolves locally, no download).
- **X6:** read-only fallback, clone-don't-copy (proven at 1.4; see the drive's `studioplanner_MIRROR_README.txt`). If used to restore, restore *to the internal disk*, extract the tarball, then `git pull` to catch up.
- **KB:** unchanged workflow — session-open handoff read (rev 9), session-close KB upload. First laptop session runs Stage 2 verification before any queue work; queue head is the Ellever capture (travel-compatible, browser-only).
- **Do not do on travel wifi:** Route A (the vite-plugin-pwa bump — bundle change needing build + smoke + deploy), `npm audit fix`.

## On return

- Desktop `git pull` to catch up with travel commits.
- Refresh the X6 mirror or retire it.
- Delete `files.zip` (candidate — confirm first).
- Schedule the **Route A** sitting: `vite-plugin-pwa` → `^1.3.0`, build + smoke test + deploy + tag as one logical unit, **and delete `.npmrc` at that same sitting**.
- Reconcile any laptop-only edits via git, never via the drive.

---

**Verification record:**
- [x] 1.1 inventory: commit `944c9dd`, pushed
- [x] 1.2 #34: commit `a5c87a7` (route B+), pushed; bundle byte-identical
- [x] 1.3 KB `data.js` refreshed (content identity `3102bc5`)
- [x] 1.4 X6 mirror created; `sources.tar.gz` verified 737/737; clone-from-drive proven at `a5c87a7`
- [x] 1.5 docs-tracking commit (rev 9 handoff + this rev 3): commit `8e9cee8`, pushed; X6 re-synced to `8e9cee8`, clone-from-drive re-proven
- [x] Desktop tooling recorded: Node v22.23.1 (major 22), npm 10.9.8, git 2.43.0
- [ ] Stage 2 complete on laptop 5500 (2.1–2.7)
