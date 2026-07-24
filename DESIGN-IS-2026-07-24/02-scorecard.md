# Scorecard — Gamechanger Football and Performance, re-audit

Scored by the orchestrator against the anchors, worst-instance (not
average) where a principle has multiple representative instances,
ties broken toward the lower score.

1. Good design is innovative — **Score: 2/3**
   Evidence: motion language (Lenis smooth scroll, magnetic buttons,
   card tilt, cursor-spotlight) is explicitly and documentedly derived
   from named reference sites (wolverineworldwide.com primary,
   day1-run.webflow.io + podium.global supplementary), not invented.
   Justification: refreshes established premium-web patterns with a
   clear improvement over the category norm (local youth-sports
   training sites essentially never get this treatment) — real, but not
   a novel contribution to the form itself, so not a 3.

2. Good design makes a product useful — **Score: 2/3**
   Evidence: the contact form now genuinely works end-to-end (verified,
   two real Forminit submissions today) — the single biggest change
   since the last audit. But `01-evidence.md` "Copy & Honesty" — 5 of 6
   pricing cards have no per-card CTA despite copy promising one for
   "any of the listed sessions," and the systemic "Book Now" mislabel
   (below) adds a trust-friction cost to the site's most-repeated entry
   point into that same task.
   Justification: primary task completes, but real adjacent-surface
   friction exists for at least two plausible entry paths — matches "2:
   completes but adjacent surface adds steps," not the clean "3."

3. Good design is aesthetic — **Score: 1/3**
   Evidence: `01-evidence.md` "Visual" — `.eyebrow` text on every
   light-surface section is **completely invisible** (1.00:1, text and
   its own background are byte-identical — a regression introduced by
   today's own contrast fix). Pre-existing, separate: testimonial names
   render at 1.07:1 and bylines at 2.49:1 on the home page's own
   testimonials section. Also pre-existing: `.stat`/`.price-card-figure`
   at 1.56:1 (Accessibility evidence). Plus one cosmetic
   `.footer-heading` color mismatch.
   Justification: the underlying spacing/type-scale system is genuinely
   coherent (verified live, matches token math exactly across every
   sample) — this isn't "no system," but three independent, severe,
   content-destroying contrast failures is well past "one jarring
   violation," landing at 1, not 0.

4. Good design makes a product understandable — **Score: 1/3**
   Evidence: `01-evidence.md` "Copy & Honesty" — 12 instances of
   "Book Now"/"Start Now"/"Book A Test"/"Book a Session," the site's
   single most-repeated CTA family, all route to a form whose own
   heading is "Join the waiting list" and whose success message is
   "we'll be in touch shortly" — not a booking. The same nav bar uses
   both this label and the accurate "Waiting List" for the identical
   destination. Real unexplained jargon present throughout (NPL, TSP
   Program, ASCA, VALD, "stretch shortening cycle").
   Justification: the primary action is identifiable as clickable, but
   a first-time user cannot correctly predict what it does — matches
   "2-3 controls unclear; jargon present," not "0" (it IS identifiable,
   just mislabeled).

5. Good design is unobtrusive — **Score: 3/3**
   Evidence: `01-evidence.md` "Weight & Friction" — zero visually
   perceptible idle animation (every effect is scroll/pointer-triggered,
   confirmed via code, zero `infinite` keyframes or raw `requestAnimationFrame`
   calls); zero notifications/modals/badges/popups on any of 13 pages
   (grepped); nav starts fully transparent and only solidifies on
   scroll.
   Justification: concrete, positively-confirmed evidence of chrome
   receding rather than just an absence of negative findings — earns
   the full 3.

6. Good design is honest — **Score: 1/3**
   Evidence: `01-evidence.md` "Copy & Honesty" — at least 7 distinct
   unsubstantiated or contradicted claims ("multi-million dollar
   facility" vs. the same page disclosing 3 of 4 amenities still under
   construction; "FIFA certified A+," not a real FIFA rating tier;
   uncited "50% Reduction in injury risk"; uncited "Youngest Ever...in
   NPL History"; "hundreds of footballers"; "overwhelming demand"), the
   systemic Book-Now mismatch above, a footer link promising a specific
   page section (`pricing.html#policies`) that doesn't exist, and three
   School Holiday Camps events presented as "upcoming" that are already
   7 to ~200+ days in the past as of today.
   Justification: far exceeds the "2+ inflations" bar for 1. Does not
   drop to 0 — no forced continuity, hidden cost, or fake scarcity
   language was found anywhere (checked explicitly, zero hits); the
   0-anchor is reserved for active deceptive flows, not overstatement
   or mislabeling, however extensive.

7. Good design is long-lasting — **Score: 2/3**
   Evidence: the visual language itself (typography, restrained
   gold/black/paper palette, generous whitespace) carries no obvious
   trend markers (no glassmorphism/neumorphism/fad gradients) and
   should read as current for years. But the School Holiday Camps page
   hardcodes specific calendar dates directly into static content with
   no mechanism to keep them current — and per the evidence above, it
   has already gone stale within the site's own lifetime.
   Justification: one concrete, already-manifested "appears antiquated"
   failure mode (content staleness by construction), against an
   otherwise durable visual system — matches "1 dated marker," not the
   clean 3, and not 2-3 markers since this is one class of problem, not
   several.

8. Good design is thorough down to the last detail — **Score: 2/3**
   Evidence: the contact form (the site's only form) has real,
   considered empty/loading/error/success states, verified live and
   first-hand today (real Forminit submissions, real error triggers).
   Focus state exists but is inconsistent: inputs get a deliberate gold
   ring; the submit button and every other interactive element site-wide
   (nav links, all buttons, the hamburger toggle) rely entirely on the
   browser's unstyled default ring — present, but not designed.
   Justification: 5 of 6 states are genuinely present and well-executed;
   focus is real but rough and inconsistent — matches "1 state missing
   or rough," not a clean 3.

9. Good design is environmentally friendly — **Score: 2/3**
   Evidence: `01-evidence.md` "Weight & Friction" — ~77KB total initial
   JS (well under the 100KB/3 threshold), zero idle animation,
   `prefers-reduced-motion` respected across every motion subsystem
   including today's own Phase 4 fix to the hover block. No evidence of
   `prefers-color-scheme` / dark-mode-preference handling found anywhere
   in the codebase.
   Justification: clears the JS-weight and motion-gating bar for 3
   comfortably, but the anchor for 3 is an explicit four-part
   requirement including "dark mode honored," which isn't implemented —
   lands at 2, matching "<500KB, motion gated."

10. Good design is as little design as possible — **Score: 2/3**
    Evidence: `01-evidence.md` "Structural" — a genuinely disciplined,
    fully-reused component system (0 dead classes/properties across a
    fresh, independent sweep of all 139 currently-defined items). One
    concrete duplicated affordance found: the header nav has both
    "Waiting List" and "Book Now" pointing to the identical destination,
    sitting in the same nav bar.
    Justification: one clear, removable-without-losing-function
    redundancy against an otherwise very disciplined system — matches
    "≤2 removable elements," not the clean 3.

---

## Total: 18/30

(prior audit, `DESIGN-IS-2026-07-23/`: 11/30)
