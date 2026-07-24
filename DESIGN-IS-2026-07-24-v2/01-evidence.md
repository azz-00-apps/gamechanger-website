# Evidence — second re-audit, post-plans/04

Consolidated from 4 fresh evidence-gathering passes (Structural, Copy &
Honesty, Visual, Accessibility — all independently re-verified against
the live/current code, not assumed from `plans/04`'s own claims), a
lightweight direct Weight & Friction check (justified: nothing in
`plans/04` touched JS architecture, CDN dependencies, or idle-animation
behavior), and two further rounds of fixes made in response to what
those fresh passes found (a `.stat-label` dead class untouched since the
initial commit, a confusing "not affiliated with Wolverine Worldwide"
footer line with zero context anywhere else on the site, an incomplete
mobile-menu focus trap, and 8 residual soft marketing claims beyond the
original 7).

## Structural Evidence

- All `plans/04` structural changes confirmed intentional and correctly
  scoped: 5 new `.btn-primary` CTAs added to `pricing.html`'s price
  cards (verified via diff against the pre-`plans/04` commit), zero
  unintended tag additions/removals anywhere else on the home page
  surface. Interactive-element count (37) and max nesting depth (10,
  `html`=1) both independently re-parsed and confirmed unchanged from
  before `plans/04` — the testimonial fix and contrast fixes were
  CSS-only, no structural markup change.
- **Fresh dead-code sweep found one real miss from the two earlier
  "0 dead classes" sweeps today: `.stat-label`**, unused since the
  initial commit (every real `.stat` is paired with a plain
  `heading-sm`, never `.stat-label`) — now removed.
- `--accent-on-light` (the token several of today's fixes depend on)
  confirmed to have 5 real, live-reachable consumption sites — not a
  token defined and never actually used.
- Deleted `.testimonial-attribution` override rules confirmed cleanly
  gone with zero orphaned references anywhere.

## Copy & Honesty Evidence

**All 5 originally-claimed fixes independently re-verified PASS**, not
assumed: the 12+1 CTA renames (0 remaining "Book Now"/"Start
Now"/"Book A Test"/"Book a Session"/"Improve Your Speed Now"), the 7
softened claims (each re-checked in context, reads naturally), the 3
stale camp dates (removed, remaining single-card layout reads as
intentional), the fixed policies anchor, and all 6 pricing cards now
having a CTA.

**Fresh full sweep found two real, previously-unflagged issues**, now
fixed:
- A footer disclaimer ("Design concept — not affiliated with or
  endorsed by Wolverine Worldwide") on all 13 pages was the *only*
  place that name ever appeared in the site's live content — nothing
  else connects the two, so it read as a confusing non-sequitur to a
  real visitor rather than a meaningful disclaimer. Removed.
- 8 residual soft, unsubstantiated claims beyond the original 7
  ("proven" ×4, "leading football development program," "strong
  demand," "triple the size," "best in the world") — softer and less
  falsifiable than the original batch (a fabricated certification name,
  an uncited percentage, a dollar figure, an uncited record claim), but
  real puffery beyond the "≤1 minor inflation" bar. Softened, same
  approach as the original fix.

**Dark patterns: zero, re-confirmed.** **Label→behavior mismatches:
the contact form's "Send" button independently re-verified to
genuinely match its actual Forminit-backed behavior** — not just
re-stated from the original audit.

## Visual Evidence

**All five specifically-targeted contrast/focus regressions confirmed
fixed, live, with real computed-style contrast math — not re-stated
from source reading:**
- `.eyebrow` on light surfaces: 5.25:1 (was 1.00:1), text and dash each
  independently confirmed not equal to their background.
- `.stat`/`.price-card-figure`/`.list-dash li::before`: 5.25–5.82:1 on
  light surfaces (was ~1.56:1), confirmed dark-surface instances of the
  same classes remain correctly unchanged (9.96:1) on the same page
  (`video-analysis.html`) — the fix is surface-conditional, not a
  blanket recolor.
- `.testimonial-attribution`: 17.22:1 name / 10.4:1 role line (was
  1.07:1 / 2.49:1), confirmed on all 5 home-page testimonial cards.
- Site-wide `:focus-visible` ring: confirmed via real Tab keypresses
  landing on 9 distinct elements across 3 categories, all showing the
  designed gold ring, not the browser default.
- Mobile nav-button fix (from earlier today, unrelated to this round):
  confirmed still intact, 10.65:1, dark-on-gold.

**Lowest contrast ratio found across the entire pass: 5.25:1** — clears
the applicable 4.5:1 (normal text) threshold with real margin. Pricing
page (6 cards, each with a CTA) and School Holiday Camps (single
centered card) both screenshotted and confirmed to read as intentional,
not broken.

## Accessibility Evidence

**Mobile-menu keyboard fixes: PASS on open/Escape/click-to-navigate,
but the fresh pass found the fix was incomplete** — tabbing forward
past the last menu item still escaped to hidden content behind the
overlay (confirmed via a full manual 14-step Tab walk plus a screenshot
showing no visible focus ring on screen at that point). This was fixed
immediately after the finding: the handler now implements a full
bidirectional trap (toggle ↔ first link ↔ ... ↔ last link ↔ toggle),
re-verified with a clean 16-step forward Tab walk and a 5-step Shift+Tab
walk, both showing the exact expected element at every single step.

**Site-wide focus ring: PASS**, confirmed on 9 real landings across nav
links, buttons, the hamburger toggle, and footer links — all showing
the exact designed gold RGB value, live-verified, not assumed from the
token definition.

**Contact form focus order: PASS**, full 8-field walk confirmed in the
expected order without submitting the form; arrow-key navigation within
both radio groups confirmed working in both directions with correct
wraparound, atomic focus+selection movement.

**ARIA landmarks + skip-link: PASS, unchanged** — re-confirmed rather
than assumed stable.

**No new keyboard regressions**: confirmed the new focus-visible rule
doesn't double-outline with the pre-existing input/skip-link rules
(disjoint selectors by construction, live-verified single ring on each),
and confirmed the mobile-menu keydown handler correctly no-ops at
desktop width where the toggle isn't visible.

## Weight & Friction (lightweight direct check, not a full subagent pass)

`js/main.js` grew from 16,689 to 18,311 bytes (the focus-trap logic) —
total initial JS still ~78.4KB, comfortably under the 100KB/"score 3"
threshold. Zero `requestAnimationFrame`/`infinite` matches added
anywhere (no new continuous-animation loops). Zero new
modal/toast/cookie/consent/notification markup introduced by any
`plans/04` change (diffed against the pre-`plans/04` commit directly).
Nothing in this round touched `prefers-color-scheme` support, which
remains unimplemented.
