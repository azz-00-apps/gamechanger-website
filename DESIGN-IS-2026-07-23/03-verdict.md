# Verdict

**REDESIGN.** Total score 11/30 (well below the REFINE threshold of 20),
and principle #2 (useful) scored 0 — one of the three dimensions the rubric
names as load-bearing — because the site's primary conversion mechanism,
the contact form, does not functionally submit anywhere.

## Scope note (per the anti-pattern guard against over-scoping REDESIGN)

This is not "the visual design is bad" — it isn't. The typography, motion,
and spacing systems scored positively (#1, #3, #5, #9 all landed 1-2/3, not
0), copy honesty is strong (every inflated claim traces to the real
business's own prior site, not invented), accessibility fundamentals are
mostly solid (100% real alt text, correct skip-link, no synthetic
click-handler substitutes, clean tab order). What's failing is narrow and
concrete: one load-bearing functional gap (the form) plus a small cluster
of locatable bugs (a contrast failure, a CSS specificity bug, a
reduced-motion gap, dead code). REDESIGN here means "fix the thing that
blocks the primary task before anything else, then clean up the concrete
list below" — not "discard the visual language and start over."

## Preserve from current design

- Design token system — `css/tokens.css` (spacing scale, type scale, color
  palette — Visual evidence confirmed a single coherent system, zero stray
  hex literals in CSS).
- Component library — `css/base.css` `.card`, `.btn-primary`/`.btn-ghost`/
  `.btn-ghost-light`, `.statement`, `.split`/`.split-sticky`, `.list-dash`,
  `.price-card` (Structural evidence confirmed genuine reuse across 3+
  locations each, not accidental similarity).
- General Sans typography and the binary 400/700 weight system
  (`research/design-system.md`, dated 2026-07-23).
- The GSAP motion system's engineering (`js/main.js`) — the
  progressive-enhancement safety contract (content visible by default,
  GSAP only ever hides what it can prove it will reveal), the
  ScrollTrigger.batch reveal/parallax/split-headline implementation.
- 100% descriptive image alt text (42/42 images, Accessibility evidence).
- All real business content — prices, coach credentials, addresses,
  testimonials — verbatim-sourced and verified accurate against
  `research/gamechanger/*.md`.

## Discard / fix

- The static `<form action="contact.html" method="get">` pattern
  (`contact.html:88`) — no backend, no confirmation, functionally
  decorative. Caused the #2 and #6 failures.
- `.eyebrow { color: var(--accent) }` unconditionally applied
  (`css/base.css:73`) with no light-surface override — 1.56:1 contrast,
  visually near-invisible. Caused part of the #3 and #4 scores.
- `.nav-links a` (`css/base.css:182`) beating `.btn-primary`
  (`css/base.css:277`) in cascade specificity on the mobile "Book Now"
  pill — wrong text color on a gold button. Caused part of the #3 score.
- 11 unused CSS classes / 16 dead custom properties (full list in
  01-evidence.md "Structural") — caused the #10 score.
- Magnetic-button/card-tilt hover block (`js/main.js:179-228`) with no
  `prefers-reduced-motion` gate — caused part of the #9 score.

## Top 5 highest-leverage moves

1. **#2 Useful / #6 Honest / #8 Thorough — Make the contact form actually
   work**, with real loading/error/success states once it does. Evidence:
   `contact.html:88` (form), `js/main.js` (zero submit handling found).
   This single fix addresses three separate 0-or-1 scores at once — it's
   the highest-leverage item in the whole audit.
2. **#3 Aesthetic / #4 Understandable — Fix the `.eyebrow`-on-light
   contrast failure.** Evidence: `css/base.css:73` vs. the working
   dark-surface pattern at `css/base.css:388` (`.statement-eyebrow`) —
   mirror that override for light surfaces.
3. **#3 Aesthetic — Fix the mobile nav-button specificity bug.** Evidence:
   `css/base.css:182` vs `:277`; live-confirmed wrong color at 390×844.
4. **#9 Environmentally friendly — Gate magnetic/tilt hover on
   `prefers-reduced-motion`.** Evidence: `js/main.js:179` — add the same
   `motionOK` check already used correctly elsewhere in the same file
   (lines 51-52).
5. **#10 As little design as possible — Remove the 11 dead CSS classes and
   16 dead custom properties.** Evidence: full list in 01-evidence.md
   "Structural."
