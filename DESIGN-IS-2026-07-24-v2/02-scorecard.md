# Scorecard — second re-audit, post-plans/04

1. Good design is innovative — **Score: 2/3** (unchanged)
   Evidence: nothing in `plans/04` touched the site's relationship to
   its reference patterns (Wolverine-derived motion/type language).
   Justification: same reasoning as the first audit — refreshes
   established patterns with a clear improvement for this category of
   business, not a novel contribution to the form itself.

2. Good design makes a product useful — **Score: 3/3** (was 2)
   Evidence: `01-evidence.md` — all 6 pricing cards now have their own
   CTA (was 1 of 6), the broken `pricing.html#policies` anchor now
   resolves to the real section, and the mobile-menu keyboard trap
   (found incomplete mid-audit, then fully fixed and re-verified with a
   16-step Tab walk) means keyboard users can now reliably reach and use
   the primary contact path without landing on hidden content.
   Justification: every friction point identified against this
   principle in the first audit is now concretely fixed and
   independently re-verified — primary task completes in the fewest
   steps via multiple paths, no remaining decoy actions found.

3. Good design is aesthetic — **Score: 3/3** (was 1)
   Evidence: all three severe contrast failures (`.eyebrow` 1.00:1→
   5.25:1, `.testimonial-attribution` 1.07:1→17.22:1,
   `.stat`/`.price-card-figure`/`.list-dash` ~1.56:1→5.25-5.82:1)
   independently re-verified live with real computed-style contrast
   math, not re-stated from source. `.footer-heading`'s specificity bug
   and the dead `.stat-label` class also resolved.
   Justification: the token system was already confirmed coherent; the
   severe execution bugs that kept this at 1 are now fixed with real
   margin (lowest ratio found across the entire pass: 5.25:1, clearing
   4.5:1) — no jarring violations remain in the fresh Visual evidence.

4. Good design makes a product understandable — **Score: 3/3** (was 1)
   Evidence: the systemic "Book Now" mismatch is fully resolved (13
   instances including one — "Improve Your Speed Now" — the original
   grep missed), and a footer line mentioning "Wolverine Worldwide"
   with zero context anywhere else on the site (a genuine
   first-time-visitor confusion point the original audit didn't catch)
   is removed.
   Justification: every primary control now accurately describes what
   it does. Real jargon remains in descriptive/credential body copy
   (NPL, TSP Program, VALD), but not on any interactive control — a
   visitor doesn't need to understand that jargon to correctly predict
   what clicking "Enquire Now" or "Send" does. This is the most
   debatable score on this card; a stricter reading that penalizes
   body-copy jargon regardless of control-clarity would land this at 2
   instead — noted explicitly rather than glossed over.

5. Good design is unobtrusive — **Score: 3/3** (unchanged)
   Evidence: nothing in `plans/04` touched idle animation, chrome
   behavior, or notification/modal count — re-confirmed via the
   lightweight Weight & Friction check, not just assumed stable.

6. Good design is honest — **Score: 3/3** (was 1)
   Evidence: all 7 originally-flagged claims fixed and independently
   re-verified in context; the systemic CTA mismatch, broken anchor,
   and stale dates all fixed; PLUS the fresh Copy & Honesty sweep found
   and this session then fixed 8 further residual soft claims ("proven"
   ×4, an unsubstantiated market-leadership claim, an echo of the
   "demand" pattern already removed once from the same page, an
   unverified size multiplier, an unfalsifiable comparison) and the
   confusing Wolverine footer line. Zero dark patterns, confirmed twice
   independently.
   Justification: two independent audit passes (original + fresh
   re-sweep) have now both had their findings fully addressed — every
   claim, badge, and label maps to actual, checkable, or genuinely
   softened-to-defensible content.

7. Good design is long-lasting — **Score: 3/3** (was 2)
   Evidence: the one concrete "already antiquated" finding (hardcoded
   camp dates already stale as of the audit date) is fixed — the
   remaining single card makes no time-bound claim, and the page now
   points to Instagram/Facebook for current dates instead of hardcoding
   them into static content.
   Justification: no dated markers — visual or content — remain in
   either audit pass's evidence.

8. Good design is thorough down to the last detail — **Score: 3/3** (was 2)
   Evidence: focus state is now consistently, deliberately designed
   site-wide (9 real Tab-landing confirmations, same gold ring
   everywhere) rather than inputs-only; the mobile-menu interaction
   state, found incompletely handled mid-audit (forward-Tab could still
   escape to hidden content), was fixed to a full bidirectional trap and
   re-verified with a clean 16+5-step keypress walk. Empty/loading/
   error/success states on the contact form were already confirmed
   present.
   Justification: all six states (empty/loading/error/success/focus/
   disabled) are now genuinely present and consistently executed, not
   just present-but-rough.

9. Good design is environmentally friendly — **Score: 2/3** (unchanged)
   Evidence: `main.js` grew by 1.6KB (the focus-trap logic) — total
   initial JS still ~78.4KB, comfortably under the 100KB bar; zero new
   idle-animation loops; `prefers-reduced-motion` still respected
   throughout. `prefers-color-scheme` (dark-mode) support remains
   unimplemented — deliberately scoped out of `plans/04` as a
   disproportionate-effort stretch item, not attempted this round.
   Justification: the anchor for 3 requires dark-mode support as one of
   four AND-ed conditions; three of four are met with margin, one isn't
   — matches "<500KB, motion gated" (2), not the clean 3.

10. Good design is as little design as possible — **Score: 2/3** (unchanged)
    Evidence: the dead-code sweep is now genuinely exhaustive (the one
    real miss, `.stat-label`, found and removed) — 0 dead classes/
    properties across the full current token and class inventory. The
    one remaining "duplicated affordance" — the header's "Waiting List"
    nav link and "Enquire Now" CTA button both pointing to
    `contact.html` — was deliberately left as-is: both labels are now
    individually honest, and a persistent nav link alongside a distinct
    CTA button is a common, legitimate pattern, not accidental
    redundancy.
    Justification: strictly, either the nav link or the button could be
    removed without breaking the primary task, which doesn't quite
    clear the "removing any one breaks the task" bar for 3 — matches
    "≤2 removable elements" (2), same reasoning as the first audit,
    unchanged by this round's fixes since the nav structure itself was
    intentionally not touched.

---

## Total: 27/30

(first re-audit today, `DESIGN-IS-2026-07-24/`: 18/30. Original audit
yesterday, `DESIGN-IS-2026-07-23/`: 11/30.)

**Sensitivity note:** the most debatable single call on this card is
principle #4 (Understandable) at 3 rather than 2, over how much weight
unexplained body-copy jargon should carry once every interactive
control is independently confirmed clear and honest. Even scoring that
principle at 2 instead — the more conservative reading — the total is
26/30, still at the goal's minimum. The result isn't riding on one
generous call.
