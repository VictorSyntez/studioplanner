# StudioPlanner — Phase 2a Source Archive Provenance

**Created:** 2026-06-12 (acquisition session)
**Scope:** Records the origin, method, integrity, and known gaps of the two source archives used for Phase 2a multi-dance figure-data acquisition. This document is committed to the repo; the archive payloads themselves are **not** (see Storage decision).
**Governs:** acquisition provenance only. Phase gates live in `StudioPlanner_Phase2_Architecture_Roadmap.md`; acquisition mechanics in `StudioPlanner_Phase2a_Data_Acquisition_Brief.md`.

---

## Sources

### 1. ballroomguide — PRIMARY STRUCTURAL SOURCE
- **Origin:** Wayback Machine raw captures of `idans.nl/workshop/` (itself a mirror of the defunct `ballroomguide.com`).
- **Why Wayback, not live:** the live `idans.nl/workshop/` origin returned HTTP **522** (Cloudflare origin timeout) during acquisition; the live mirror is on a failing origin. The Wayback crawl is comprehensive and recent (per-page captures dated 2022–2026), so it was adopted as the source-of-record. Live idans is demoted to "revive-and-reconcile if it returns."
- **Method:**
  1. CDX query for all `200 / text/html` pages under `/workshop/` (prefix match).
  2. Reduced to the **newest** capture per page (`sort -k2,2 -k1,1r | sort -u -k2,2`).
  3. Fetched each as a **raw original capture** via the `id_` modifier (`https://web.archive.org/web/{timestamp}id_/{url}`) — no Wayback toolbar/link-rewriting, clean tables for parsing.
  4. Initial pull was rate-limited (~50% ERR in contiguous bursts); recovered with an idempotent gap-fill re-run (`--retry`/backoff, 3s pacing, skip non-empty files).
- **Result:** 314 HTML files, 8.2 MB. Completeness verified: expected (314) = present (314); in-scope dance "still missing" list empty.
- **Fetch index:** `cdx_newest.txt` (committed).
- **Integrity:** `ballroomguide.manifest.sha256` (committed).

### 2. dancecentral — ENRICHMENT SOURCE (coach notes / commentary)
- **Origin:** live `https://www.dancecentral.info/ballroom/international-style/`.
- **Method:** `wget --mirror --page-requisites --convert-links --adjust-extension --no-parent` with polite pacing.
- **Result:** 419 HTML files, 135 MB (image-heavy enrichment pages).
- **Integrity:** `dancecentral.manifest.sha256` (committed).

---

## Coverage (figure pages per in-scope dance)

| Dance | ballroomguide (structural) | dancecentral (enrichment) |
|---|---|---|
| Waltz | 33 (matches `data.js` 1:1) | 62 |
| Tango | 31 | 59 |
| Foxtrot | 31 | 58 (under `slow-foxtrot`) |
| Quickstep | 21 | 64 |
| Cha Cha | 37 | 33 |
| Rumba | 35 | 32 |
| Samba | 45 | 36 |
| Jive | **6** ⚠ | 29–31 |

Out-of-scope archived as insurance: Paso Doble, Viennese Waltz, technique subtrees (both sources).

---

## Known gaps & flags (carried into Step 4 / Step 5 / audit)

1. **Jive structural gap (D-3).** ballroomguide has only ~6 Jive figure pages vs. 30–45 for other dances. dancecentral's ~30 Jive pages are available as backfill. Resolution path — enrich-only vs. promote dancecentral to structural fallback for Jive — is a **dance-content decision for Victor**, logged against D-3. Not auto-resolved.
2. **`foxtrot` ↔ `slow-foxtrot` alias.** ballroomguide/NDCC use "foxtrot"; dancecentral files it under "slow-foxtrot". First confirmed entry in the Step 4 cross-source alias map. Unambiguous → mechanical alias.
3. **http/https index duplicates.** 26 rows in `cdx_newest.txt` are http/https pairs of the same path; they collapse to one file on disk (protocol stripped at write). No corruption; ~26 redundant fetches only.

---

## Conflict & content rules (reminder; authoritative versions in the brief)

- **Structural conflict rule:** where ballroomguide and dancecentral disagree on structural fields (timing, footwork, alignment, rise & fall, sway), **ballroomguide wins the field** and the disagreement is logged to a `conflicts` record for Victor's audit. Never averaged, never silently picked.
- **No dreaming / no assumptions on dance content:** all dance-domain content comes from these archives plus Victor's confirmation. Missing data is flagged, never interpolated. Source conflicts are logged, never silently resolved.

---

## Storage decision (OQ-2) — RESOLVED

- **Archives (`sources/`): gitignored**, stored outside the repo. Combined 143 MB; Git handles large static-HTML trees poorly.
- **Committed integrity/provenance layer:** both `*.manifest.sha256`, fetch/wget logs, `cdx_newest.txt`, and this document. (Force-add manifests if inside an ignored path.)
- Rationale: the manifests are the insurance — they detect drift/corruption and serve as the provenance trail. Storing HTML outside the repo doesn't weaken that.

---

## Licensing note (pre-commercial blocker — Risk #4)

Both sources closely follow ISTD technique books. Fine for the internal Dance Praktika pilot; a **licensing/provenance review is required before any commercial rollout** (on the pre-commercial checklist alongside Firestore hardening).
