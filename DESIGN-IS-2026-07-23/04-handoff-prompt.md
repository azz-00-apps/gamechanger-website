/make-plan Redesign the Gamechanger Football site's conversion/interaction layer. Current design failed a Dieter Rams audit at 11/30 with critical gaps in principles #2 (useful), #6 (honest), and #8 (thorough).

Verdict paragraph (quoted from the audit):
> REDESIGN. Total score 11/30 (well below the REFINE threshold of 20), and principle #2 (useful) scored 0 — one of the three dimensions the rubric names as load-bearing — because the site's primary conversion mechanism, the contact form, does not functionally submit anywhere. This is not "the visual design is bad" — it isn't. The typography, motion, and spacing systems scored positively, copy honesty is strong, accessibility fundamentals are mostly solid. What's failing is narrow and concrete: one load-bearing functional gap (the form) plus a small cluster of locatable bugs (a contrast failure, a CSS specificity bug, a reduced-motion gap, dead code). REDESIGN here means "fix the thing that blocks the primary task before anything else, then clean up the concrete list below" — not "discard the visual language and start over."

Why redesign and not refine: principle #2 (useful) scored 0 because `contact.html:88`'s `<form action="contact.html" method="get">` has zero backend/JS submit handling (verified via a full read of `js/main.js`) — a real form submission just reloads the page with fields appended as a URL query string. No email sent, no data captured, no confirmation shown. This is the destination for the overwhelming majority of the site's 73 `.btn-primary` CTAs ("Book Now," "Start Now," "Enquire Now," "Book A Test" all funnel here).

Preserve from current design:
- Design tokens — `css/tokens.css` (spacing scale `--space-1`…`8` plus fluid section rhythm, type scale `--text-*`, color palette — confirmed a single coherent system, zero stray hex literals anywhere in `css/base.css`).
- Component library — `css/base.css`: `.card` (59 uses), `.btn-primary`/`.btn-ghost`/`.btn-ghost-light` (73/21/13 uses), `.statement` (25 uses), `.split`/`.split-sticky`, `.list-dash` (10 uses), `.price-card` (6 uses) — all confirmed genuinely reused, not accidentally similar.
- General Sans typography, binary 400/700 weight system (documented in `research/design-system.md`).
- The GSAP motion system's engineering in `js/main.js` — specifically its progressive-enhancement safety contract: content is visible by default in plain HTML, and GSAP only ever hides an element after confirming `window.gsap`/`window.ScrollTrigger` loaded, with independent 3-second safety-net timers per reveal batch. Keep this contract intact when touching the form — any new form-state JS must follow the same "never hide something you can't prove you'll bring back" discipline.
- 100% descriptive image alt text (42/42 images, zero filename-derived alts).
- All real business content (prices, coach credentials, addresses, testimonials) — verbatim-sourced from `research/gamechanger/*.md` and pricing-verified accurate. Do not alter any factual claim without re-checking that source.

Discard:
- The static self-submitting form pattern. Evidence: `contact.html:88`. Caused the #2 (useful) and #6 (honest) failures — the "Send" button implies the enquiry reaches the business and currently does not.
- `.eyebrow { color: var(--accent) }` applied unconditionally with no light-surface override. Evidence: `css/base.css:73` (contrast 1.56:1 against `--surface-light` #F5F3EE, live-confirmed at `index.html:68,102` and `contact.html:68,143`) vs. the already-correct dark-surface pattern at `css/base.css:388` (`.statement-eyebrow`, which overrides to a lighter gold and passes). Caused part of the #3 (aesthetic) and #4 (understandable) scores.
- `.nav-links a` (`css/base.css:182`, specificity 0,1,1) beating `.btn-primary` (`css/base.css:277`, specificity 0,1,0) in cascade order, wrongly coloring the mobile flyout's "Book Now" button text gray instead of near-black on its gold background. Live-confirmed at 390×844 viewport. Caused part of the #3 (aesthetic) score.

Top 5 moves from the audit (verbatim):
1. #2 Useful / #6 Honest / #8 Thorough: Make the contact form actually work, with real loading/error/success states once it does. Evidence: `contact.html:88` (form), `js/main.js` (zero submit handling found). This single fix addresses three separate 0-or-1 scores at once — it's the highest-leverage item in the whole audit.
2. #3 Aesthetic / #4 Understandable: Fix the `.eyebrow`-on-light contrast failure. Evidence: `css/base.css:73` vs. the working dark-surface pattern at `css/base.css:388` (`.statement-eyebrow`) — mirror that override for light surfaces.
3. #3 Aesthetic: Fix the mobile nav-button specificity bug. Evidence: `css/base.css:182` vs `:277`; live-confirmed wrong color at 390×844.
4. #9 Environmentally friendly: Gate magnetic/tilt hover on `prefers-reduced-motion`. Evidence: `js/main.js:179` — add the same `motionOK` check already used correctly elsewhere in the same file (lines 51-52).
5. #10 As little design as possible: Remove 11 dead CSS classes (`.on-dark`, `.surface-raised-dark`, `.grid-tight`, `.on-light`, `.mt-0`, `.mt-7`, `.mt-8`, `.mt-text`, `.mt-component`, `.max-w-prose-wide`, `.visually-hidden`) and 16 dead/transitively-dead custom properties in `css/tokens.css` (`--gc-charcoal-900`, `--gc-steel-500`, `--gc-paper-dim`, `--accent-tint`, `--space-1`, `--gutter-tablet`, `--ease-in-out`, `--duration-slow`, `--duration-reveal`, `--parallax-strength`, `--grid-gap-tight`, `--space-7`, `--space-8`, `--space-text`, `--space-component`, `--prose-max-wide`).

Redesign principles in priority order:
1. #2 Useful — the primary task (submit an enquiry, reach the business) must complete via the site's own primary mechanism, not require the user to notice a silent failure and fall back to phone/email.
2. #6 Honest — every button's label must map 1:1 to its actual behavior; "Send" must mean the message is sent.
3. #8 Thorough — the interactive surface that matters most (the contact form) needs empty/loading/error/success states designed, not just a static box.

Constraints (carried from the original project scope): static HTML/CSS/vanilla-JS site, zero build tooling, zero framework — this is a static Python-`http.server`-served site with no application backend today. A working form submission will require picking a form-handling approach appropriate to that constraint (a third-party form endpoint service like Formspree/Netlify Forms/Getform, or a minimal serverless function) — this is a real infrastructure decision, not a design one, and should be surfaced to the site owner as an explicit choice rather than assumed.

Deliverables for the plan:
- Form-handling approach decision (with the constraint above surfaced as an explicit question, not a silent choice) and implementation
- Loading/error/success state designs for the contact form, consistent with the existing design-token system (not a new visual language)
- Targeted CSS fixes for the two named bugs (`.eyebrow` contrast, nav-button specificity) with before/after contrast-ratio verification
- `prefers-reduced-motion` gate added to the magnetic/card-tilt hover block
- Dead-code removal pass (the 11 classes + 16 tokens named above), with a grep-based verification step confirming each is genuinely unused before deletion
- Migration path: none needed — this is fixing an existing static site in place, not moving users off an old system

Anti-patterns to guard against (specific to REDESIGN):
- Porting the current broken form pattern under new styling — the form must genuinely submit, not just look more finished
- Introducing a build pipeline, framework, or heavy form library to solve this — the project's own constraint is zero-build static HTML/CSS/vanilla-JS; solve within that
- Silently picking a specific third-party form service without surfacing the decision — this has cost/privacy/vendor implications the site owner should choose, not inherit by default
- Treating the "Preserve" list as optional — the token system, component library, typography, and motion engineering all scored well and should not be touched by this pass
- Redesigning visual language to chase a trend — principle #7 (long-lasting) already flagged the current motion bundle (magnetic buttons, cursor-tilt, scroll-scrubbed parallax, word-split reveals) as a recognizable, dateable 2020s convention; don't compound that by adding more of the same kind of effect while fixing the functional gaps above
