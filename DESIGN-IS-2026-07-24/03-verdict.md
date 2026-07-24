# Verdict — Gamechanger Football and Performance, re-audit

## REDESIGN — 18/30 (prior audit: 11/30)

The score moved up 7 points and the one load-bearing zero from the prior
audit is gone — the contact form genuinely works now, verified with real
submissions against the live Forminit backend, not just claimed. But the
total is still below the REFINE threshold of 20, driven by real, specific
problems the evidence surfaced: a severe visual regression in today's own
contrast fix, a systemic label-versus-behavior mismatch on the site's
single most-repeated call to action, and a cluster of unsubstantiated or
stale claims. None of these are "the codebase is large, be conservative" —
each is a concrete, cited defect a first-time visitor would actually hit.

## Top 5 highest-leverage moves

1. **#3 Aesthetic — fix the `.eyebrow` invisible-text regression and sweep
   the whole `--accent`-on-light-surface bug class, not just one
   instance.** Evidence: `base.css:88-92` applies both `color` and
   `background: var(--accent-on-light)` to the same selector list
   covering the real text element, making it render at 1.00:1 (invisible)
   against its own background — worse than the ~1.56:1 problem it was
   meant to fix. The same underlying bug (raw `--accent` used directly on
   a light surface instead of `--accent-on-light`) independently affects
   `.stat` (`base.css:104-111`) and `.price-card-figure` (`base.css:363`),
   both at 1.56:1, on `strength-and-conditioning.html`,
   `speed-and-agility.html`, `video-analysis.html` (9 instances), and
   every price on `pricing.html` (5 instances) — none of these were part
   of today's fix, meaning the original audit's finding was patched in
   exactly one place and never generalized to the bug class.

2. **#4 Understandable / #6 Honest — resolve the "Book Now" vs.
   "waitlist" mismatch, site-wide.** Evidence: 12 CTAs ("Book Now" ×6,
   "Start Now" ×3, "Book A Test" ×2, "Book a Session" ×1) all route to
   `contact.html`, whose own H1 is "Join the waiting list," intro says
   "make an inquiry," and success message says "we'll be in touch
   shortly" — the same nav bar (`partials/header.html:25,29`) uses both
   this label and the accurate "Waiting List" for the identical
   destination.

3. **#3 Aesthetic — fix the pre-existing testimonial-attribution contrast
   failure on the home page's own trust section.** Evidence:
   `.surface-light .testimonial-attribution`'s descendant-combinator
   selector incorrectly overrides the correct dark-card styling whenever
   a `.card-on-dark` sits inside a `.surface-light` section — exactly the
   layout of `content/home.html:58-87`'s five testimonials — rendering
   names at 1.07:1 and role/club lines at 2.49:1. Not part of any prior
   session's changes; pre-existing since the component was first built.

4. **#6 Honest / #7 Long-lasting — fix or remove the stale School Holiday
   Camps dates.** Evidence: `content/school-holiday-camps.html:47,61,68`
   present three dated "masterclasses" under an "upcoming" heading that
   are already 7, 18, and roughly 200+ days in the past as of today
   (2026-07-24), each linking to an Instagram post about an event that
   already happened. This is a content-maintenance gap, not a code bug —
   the fix is either real upcoming dates from the site owner or removing
   the stale cards, not something this audit can resolve on its own.

5. **#6 Honest — substantiate or soften the unsubstantiated claims.**
   Evidence: "multi-million dollar facility" and "at the world class
   Gamechanger HQ" (`facility.html:9`, `pricing.html:66`) both contradicted
   by the facility page's own disclosure that 3 of 4 listed amenities are
   still under construction; "FIFA certified A+ half pitch"
   (`facility.html:63`) names a certification tier FIFA doesn't actually
   have; "50% Reduction in injury risk" (`strength-and-conditioning.html:51-52`)
   and "Youngest Ever 1st Grade Debutant in NPL History"
   (`coaches.html:106`) are both specific, checkable claims with zero
   citation anywhere on the site.

## Explicitly not recommended

- A ground-up visual redesign — the token system, spacing/type scale, and
  component library all scored well and are load-bearing "keep" items;
  "REDESIGN" here means fixing what's broken, not starting over on what
  isn't.
- Treating this as a reason to distrust `plans/01`–`03`'s other work —
  the motion system, reduced-motion gating, and dead-code removal all
  independently re-verified clean in this audit's evidence.
