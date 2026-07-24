# Verdict — second re-audit, post-plans/04

## REFINE — 27/30 (prior: 18/30 this morning, 11/30 yesterday)

Total ≥20 and no principle scored 0 — REFINE, mechanically, per the
scoring rule. This clears the session's goal (minimum 26/30) with a
1-point margin; the most debatable individual call (#4 Understandable,
3 vs. a more conservative 2) still leaves the total at exactly 26 even
under the stricter reading, so the result isn't contingent on one
generous judgment call.

Everything that moved the score from 18 to 27 was a concrete, verified
fix, not a re-scoring of the same evidence: the complete
`--accent`-on-light-surface contrast bug class (4 components, not just
the one the first audit named), the `.testimonial-attribution`
near-invisible bug, the systemic "Book Now" mismatch (13 instances, one
beyond the original grep), 15 unsubstantiated or self-contradicting
claims across two rounds of scrutiny, 3 stale event dates, a confusing
unexplained disclaimer, a broken anchor link, a pricing-page copy/CTA
mismatch, a genuinely-complete dead-code sweep (one real miss caught),
and a fully bidirectional mobile-menu keyboard trap (the first
attempt at this was incomplete — the re-audit caught it mid-flight and
it was fixed and re-verified before this scorecard was written).

## What's still holding this below a perfect score

1. **#1 Innovative (2/3)** — refreshes established patterns rather than
   introducing a new one; not something a bug-fix pass changes. Would
   need a genuinely novel interaction or presentation idea, evaluated
   against 5+ peer products, to move further — a design exercise, not a
   fix list.
2. **#9 Environmentally friendly (2/3)** — `prefers-color-scheme`
   (dark-mode) support is the one unmet condition in the anchor for 3.
   Deliberately not attempted this round: implementing a second color
   mode for a site whose whole visual identity is built around
   deliberate light/dark SECTION alternation (not a single toggleable
   theme) is a real design decision, not a quick CSS patch — flagging
   for a future session to decide, not silently skipping.
3. **#10 As little design as possible (2/3)** — the header's "Waiting
   List" nav link and "Enquire Now" CTA button point to the same
   destination. Deliberately preserved: both are now individually
   honest, and collapsing them into one would touch the IA the original
   audit's own "preserve" list explicitly protected. A future pass
   could revisit this specific call if desired, but it's a judgment
   call already made once, not an oversight.

None of these are load-bearing gaps the way the original REDESIGN
verdict's issues were — they're the kind of thing a REFINE pass
optionally continues to sand down, not urgent problems.

## Explicitly not recommended

- Touching the token system, component library, motion system, or IA —
  all confirmed strong across both audits and both re-verification
  passes today.
- Chasing #1/#9/#10 to squeeze out the remaining 3 points immediately —
  the goal (≥26) is met with real margin; further work there is
  optional polish, not a gap-closing exercise.
