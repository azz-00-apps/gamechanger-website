/make-plan Refine the Gamechanger Football and Performance website (`/Users/azzop/Gamechanger Website/`) based on a Dieter Rams audit (total 27/30).

Verdict paragraph (quoted from `03-verdict.md`):
> Total ≥20 and no principle scored 0 — REFINE, mechanically, per the scoring rule. This clears the session's goal (minimum 26/30) with a 1-point margin. Everything that moved the score from 18 to 27 was a concrete, verified fix, not a re-scoring of the same evidence.

Keep (already strong, do NOT touch in this pass):
- Principle #5 (Unobtrusive) scored 3 — Evidence: zero idle animation (no `infinite` keyframes, no raw `requestAnimationFrame` loops in `js/main.js`), zero notifications/modals/popups across all 13 pages. Regression check: re-grep both, re-confirm 0.
- Principle #3 (Aesthetic) scored 3 — Evidence: token system spacing/type scale live-verified matching exactly; all contrast failures fixed with real margin (lowest ratio 5.25:1). Regression check: re-run the same live contrast checks on `.eyebrow`, `.stat`, `.price-card-figure`, `.list-dash li::before`, `.testimonial-attribution` after any further change.
- Principle #6 (Honest) scored 3 — Evidence: zero dark patterns (confirmed twice), all identified inflated/unsubstantiated claims fixed across two independent sweeps. Regression check: don't reintroduce unquantified superlatives ("proven," "leading," "world class," specific uncited stats) when adding new copy.
- The token system, component library, and motion system (`css/tokens.css`, `css/base.css`, `js/main.js`) — untouched structurally by every fix so far, confirmed coherent across two audits.

Fix in priority order (the three principles still below 3):
1. **#9 Environmentally friendly**: decide on and implement `prefers-color-scheme: dark` support, OR make a deliberate, documented decision that the site's existing light/dark section-alternation pattern is the intended design and dark-mode-preference support isn't appropriate for this design language — either is a valid outcome, but it should be a decision, not a silent gap. Evidence: `01-evidence.md`, Weight & Friction section.
2. **#10 As little design as possible**: revisit whether the header's "Waiting List" nav link and "Enquire Now" CTA button should be consolidated, given both now say materially similar things. Evidence: `partials/header.html:25,29`. Note: this was deliberately left alone in the prior pass as a legitimate nav-link-plus-CTA pattern — revisit only if there's a concrete reason to believe it's actually confusing users, not just because it's theoretically "removable."
3. **#1 Innovative**: this is a design-exploration task, not a bug fix — would need a genuinely new interaction or presentation idea evaluated against 5+ peer sites in this space, not something to force into a quick pass.

Out of scope for this refine pass: any change to the IA, IA labels beyond what's named above, the token system's values, or the IA/motion patterns already confirmed strong.

Deliverables for the plan:
- Per-fix: target files, exact change, verification step (live computed-style/contrast checks via gstack `browse`, matching this project's established methodology — not eyeballing).
- Regression checklist for every "Keep" item above.
- If #9's dark-mode question is answered "no, not appropriate for this design" — document that decision somewhere durable (a code comment in `tokens.css` is this project's established pattern) so a future session doesn't re-raise it without context.

Anti-patterns to guard against (specific to this refine pass):
- Adding new abstractions (a theme-switcher component, a settings panel) where a direct `prefers-color-scheme` media query would suffice, if dark mode is pursued at all.
- Restyling anything under principles #3, #5, #6, or #8 — they're already at 3, this pass isn't about them.
- Treating the remaining 3 points as urgent — they're optional polish on a site that already cleared its functional/honesty/accessibility bar; don't rush a design decision (#9, #10) just to hit a higher number.
