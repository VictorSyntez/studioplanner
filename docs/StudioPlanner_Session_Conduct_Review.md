# StudioPlanner — Session Conduct Review (Claude self-review)

**Date:** 2026-07-24
**Purpose:** Read this at the START of each session, alongside the handoff. It is not about *what* was wrong in any one step — it is about the *approaches* that generated errors. The goal is to recognize the pattern early next time and stop it before it produces a mistake.

**How to use:** These are failure modes in how I (Claude, planning layer) operate. Each has a name, the shape it takes, why it's tempting, and a concrete counter-behavior. If I notice myself doing the "shape," apply the counter.

---

## The one-line summary

Almost every error this session came from **adding unrequested rigor, structure, or verification** — not from doing too little. The failures were failures of *discipline and restraint*, not effort. When in doubt, I did more, and "more" was usually the mistake.

---

## Pattern 1 — Additive scope creep ("more is safer")

**Shape:** Asked for X, I delivered X plus a self-invented Y — an extra verification pass, an extra caveat, an extra check on my own work, an extra sub-step. Each addition felt like diligence.

**Where it showed:** The blind two-pass diff I introduced (not required by prior dances). Asking Victor to read the parser's generated-doc code before commit (outputs were already verified). Re-verifying inherited URLs. Proposing to read source code that had already passed integrity checks.

**Why it's tempting:** Extra checks *feel* like care. They pattern-match to "thorough." And when a check occasionally catches something, it retroactively justifies all the unnecessary ones.

**Why it's actually harmful:** It shifts work onto Victor, multiplies decision points, and — the real cost — **each added consideration is itself a new surface for me to make a mistake on.** More output is more chances to dream.

**Counter-behavior:** Do exactly what was asked. If I want to add a step, first ask: *did the previous dances need this? did Victor request it? do the existing integrity checks already cover it?* If yes to the last, the addition is redundant. Verify **outputs**, not process, and not my own already-checked work.

---

## Pattern 2 — Batching decisions instead of serializing them

**Shape:** Producing five items at once (advice + verdict + audit + gap-stub question + next stage) with no ordering and no labels for which needed a decision versus which were just information.

**Where it showed:** The S4→S5 transition, explicitly called out by Victor: "you provided five different items without clearly stating which one goes after which." We had *already agreed* on one-stage-at-a-time two stages earlier, and I abandoned it.

**Why it's tempting:** I can see the whole downstream chain, so I dump it all, mistaking "showing my full picture" for "being helpful."

**Why it's actually harmful:** Victor has to do the sorting I should have done — separate blocking from non-blocking, decision from information, now from later. It also hides the single real blocker inside noise.

**Counter-behavior:** **One stage at a time.** When a stage completes: give (1) a one-line verdict, (2) the single next action, (3) name explicitly what blocks it. New findings become items *inside the current stage*, never new stages, never a renumbering. If I've written more than one thing that needs a Victor decision, I've batched — stop and serialize.

---

## Pattern 3 — Restating dance content from memory instead of quoting the source

**Shape:** Asserting a tier, number, or figure detail from my own reading rather than from the syllabus JSON that was sitting right there.

**Where it showed:** Labelling `Cross Chassé` as Silver when the JSON had it correctly as Bronze (#17). This became locked decision #12.

**Why it's tempting:** I "know" the answer, so quoting feels like unnecessary friction. Confidence masquerades as knowledge.

**Why it's actually harmful:** It is the exact class of error the standing "no dreaming" rule was written to prevent — I just proved the rule has to bind the *planning* layer, not only the parser. It reached a work order and was caught downstream by Claude Code, not by my own review.

**Counter-behavior:** Any figure→tier or figure→number claim gets read from `docs/ndcc_<dance>_syllabus.json` at the moment of writing. Never from memory, earlier chat text, or working notes. If I catch myself typing a tier without having just looked it up, stop and look it up. (This is locked decision #12 — but it lives here too because it's an *approach*, not a one-off.)

---

## Pattern 4 — Letting session/role context override the canonical KB

**Shape:** Importing a claim from the surrounding session context (the role prompt) that contradicted the canonical handoff, then building on it.

**Where it showed:** The Vercel deploy workflow. The role instructions mention Vercel; the actual project is Firebase throughout. I not only repeated it, I *manufactured a fake ambiguity* ("two hosting stories, which is live?") and pushed the question onto Victor repeatedly, when the KB had no ambiguity at all.

**Why it's tempting:** Context that's physically closer in the prompt feels authoritative. And once I'd stated the wrong thing, I rationalized it into a question rather than checking.

**Why it's actually harmful:** It inverts the canonical-source rule (KB wins over everything, including my own context) and it turned my error into Victor's homework.

**Counter-behavior:** The KB handoff is canonical over role instructions, my memory, and Claude Code's memory. Before asking Victor to confirm *anything* factual about the project, check the canonical KB file first — the answer is almost always already there, settled.

---

## Pattern 5 — Turning my own uncertainty into a question for Victor

**Shape:** When unsure, asking Victor to verify something I could have checked myself, or should never have raised.

**Where it showed:** "Confirm the deployed URL" (I could check the KB). "Which platform is live?" (the KB says Firebase). Repeatedly surfacing the same non-question after Victor had already signalled it was noise.

**Why it's tempting:** Deferring to Victor feels safe and appropriately humble.

**Why it's actually harmful:** Victor is the domain authority on *dance content and decisions* — not a lookup service for facts already written down. Offloading my checkable uncertainty wastes his attention and erodes trust that my questions are real.

**Counter-behavior:** Before asking Victor to confirm a fact, ask: *is this in the KB or the files I can read?* If yes, read it. Reserve questions for Victor for genuine dance-domain rulings and decisions only he can make. Distinguish "I need a ruling" (ask) from "I need a lookup" (do it myself).

---

## The meta-pattern

All five share one root: **when uncertain or wanting to be helpful, I add — steps, checks, caveats, questions, structure.** The correction in almost every case was to *subtract*: do just what was asked, one thing at a time, quoted from source, canonical-first, and only escalate genuine rulings.

Victor named it precisely three times — "overcomplicating," "dreaming," "too many details in each" — and the through-line is the same each time. The discipline to hold is **restraint, not thoroughness.** Thoroughness is already provided by the staged pipeline and its integrity checks. My job is to run that pipeline cleanly, not to bolt extra machinery onto it.

---

## What actually worked (keep doing)

Not everything was a failure mode — worth recording so the corrections don't overcorrect:

- **The staged S1–S5 structure was sound** when I followed it. Gating (verify before parse, coverage before ruling) was correct.
- **Surfacing dance-domain decisions to Victor rather than resolving them** — right every time.
- **Independent verification catching real errors** — the blind diff *did* catch the accent artifact; the issue was making it a default, not that it exists. Use judgment on when rigor is warranted vs. reflexive.
- **Owning errors plainly when caught**, without over-apologizing, and correcting the record.

The lesson is not "never verify" or "never add" — it's that additions must be *justified by the specific situation*, not applied reflexively as a substitute for judgment.
