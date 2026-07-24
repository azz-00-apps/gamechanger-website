# Scope — Gamechanger Football and Performance, second re-audit

**Date:** 2026-07-24 (same day, following `DESIGN-IS-2026-07-24/`, which
scored 18/30)

**What changed since that audit:** `plans/04-close-the-audit-gap-to-26.md`,
7 phases, all committed and pushed:
1. Fixed the complete `--accent`-on-light-surface contrast bug class
   (`.eyebrow`, `.stat`, `.price-card-figure`, `.list-dash li::before`).
2. Fixed `.testimonial-attribution` rendering near-invisible on the home
   page's own testimonial cards.
3. Renamed 12 "Book Now"/"Start Now"/"Book A Test"/"Book a Session" CTAs
   to "Enquire Now," matching what `contact.html` actually does.
4. Softened or removed 7 unsubstantiated marketing claims.
5. Fixed the broken `pricing.html#policies` anchor, added per-card CTAs
   to 5 of 6 pricing cards, fixed `.footer-heading`'s specificity bug.
6. Added site-wide `:focus-visible` styling and fixed two mobile-menu
   keyboard gaps (Escape-to-close, focus management).
7. Removed 3 stale School Holiday Camps event dates.

**Target for this audit:** confirm whether the site now scores ≥26/30 —
this is the actual verification gate for the session's goal, not a
formality. Score honestly; if it's still below 26, that's the real
result and feeds the next iteration.

**Scope and method:** same as `DESIGN-IS-2026-07-24/00-scope.md` (all 13
pages, gstack `browse` exclusively for live checks, one gstack process at
a time). Re-gathering Structural, Copy & Honesty, Visual, and
Accessibility evidence fresh, since all four were directly affected by
`plans/04`. Weight & Friction is carried forward from the prior audit
without a full re-run: nothing in `plans/04` touched `js/main.js`'s
script-loading architecture, CDN dependencies, image usage, or idle
animation — the only JS change was a small keydown listener and a
refactor inside the existing mobile-menu handler (bytes-negligible,
confirmed by reading the diff, not assumed) — but a lightweight direct
check (idle-animation/notification count, zero new JS dependencies) is
still run below rather than skipped outright.
