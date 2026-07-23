# Plan: Motion refinement from cross-site reference research

**Source:** behavioral research (computed styles, measured ratios, synthetic
pointer events — never source code) across three reference sites:
day1-run.webflow.io, wolverineworldwide.com, podium.global. Extends
`plans/01-award-winning-motion-and-typography.md` and
`plans/02-redesign-conversion-layer.md` — does not re-litigate typography,
the existing GSAP reveal/parallax/sticky/magnetic-button system, or the
contact-form redesign.

**Decision already made (site owner, this session):** keep the native
cross-document View Transitions API for page navigation rather than
adopting a JS routing library (Barba.js/Swup.js-equivalent) — all three
reference sites use one, but the re-architecture cost (AJAX page-swapping,
re-initializing GSAP/ScrollTrigger contexts per navigation, back-button/SEO
risk across 13 pages) wasn't judged worth it against an already-working
zero-dependency solution. Phase 5 below polishes the existing native
transition instead.

**Explicitly out of scope** (considered, declined, reasoning preserved so a
future session doesn't silently re-raise these without context):
- **Custom cursor replacement** — only 1 of 3 reference sites does this
  (day1-run); the other two (wolverineworldwide.com, podium.global — both
  arguably the more restrained/premium-reading of the three) use the
  native OS cursor. Real accessibility/usability cost (harder to track for
  some users, needs a careful touch-device fallback) against a 1-of-3
  signal isn't a strong enough case for this site.
- **Horizontal-scroll-hijacking** — zero of the three reference sites use
  it. Not a gap to fill.

---

## Phase 0: Documentation Discovery (complete — consolidated below)

Fetched live (not from training memory) — Lenis has had breaking changes
across versions, so this matters.

### Lenis — current API (v1.3.25, confirmed via npm registry + unpkg +
the library's own embedded version string, README last updated 2026-07-20)

**CDN, zero-build** (Lenis's own documented "No-code usage" pattern):
```html
<link rel="stylesheet" href="https://unpkg.com/lenis@1.3.25/dist/lenis.css">
<script src="https://unpkg.com/lenis@1.3.25/dist/lenis.min.js"></script>
```
Both files verified to actually exist at those paths (18.4KB JS, 513B CSS).

**Init:**
```js
const lenis = new Lenis({ autoRaf: true });
```
`autoRaf` defaults to `false` in the library itself — without it (or a
manual `requestAnimationFrame` loop calling `lenis.raf(time)`), Lenis
initializes but never actually drives anything. This project should use
`autoRaf: true` for a self-contained setup UNLESS the GSAP-ticker
integration below is used instead (which drives Lenis itself, making a
second independent raf loop from `autoRaf` redundant/wasteful — see
Phase 1 for which one this project actually needs given it already runs a
GSAP ticker).

**Load-failure detection:** `window.Lenis` is the correct global to check
(confirmed via the compiled source's `browser.ts` region, which does
`globalThis.Lenis = Lenis` — but only in the script-tag build, not the ESM
build, so this only holds because we're using the CDN `<script>` path
above). Lenis's constructor never throws on its own; there's no library-
level "did it fail" signal beyond checking the global exists.

**`prefers-reduced-motion`: confirmed, exhaustively, NOT to exist as a
Lenis option or documented pattern.** Checked: full README settings table,
live TypeScript definitions, the entire GitHub repo file tree (140 files)
grepped for `reduc|a11y|accessib|motion`, GitHub issues/discussions search
— zero hits anywhere. **This means the reduced-motion handling for this
feature is entirely this project's own responsibility to design** — see
Phase 1's anti-pattern guard.

### Lenis + GSAP ScrollTrigger — current integration pattern

Sourced from Lenis's own README (the only of the two libraries' docs that
addresses this pairing by name — GSAP's own docs at gsap.com don't mention
Lenis anywhere, checked across ScrollTrigger/ScrollSmoother docs and the
resources index):

```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // GSAP ticker time is in seconds, Lenis wants ms
});
gsap.ticker.lagSmoothing(0);
```

`ScrollTrigger.scrollerProxy()` — **confirmed NOT part of the current
pattern.** That API exists for scrollers that fully replace native scroll
(like GSAP's own ScrollSmoother); Lenis instead wraps native scroll, so no
proxy is needed.

**Important implication for this codebase:** this pattern uses
`gsap.ticker` to drive Lenis, which makes Lenis's own `autoRaf: true`
redundant (two independent raf-driving mechanisms would both be trying to
advance Lenis). Use `autoRaf: false` (the library default — just omit the
option) when wiring the GSAP-ticker integration.

### Known gaps carried into this plan

- No corroborating GSAP-authored source for the integration pattern above
  exists in GSAP's own current docs — it's sourced from Lenis's README
  alone. Treat as correct (it's the library's own maintainers documenting
  their own integration) but there's no second source to cross-check
  against.
- Lenis v2 is roadmapped (unreleased) and will restructure option names
  (`wheel`/`touch` nesting) and flip some defaults — irrelevant to
  implementing against the current 1.3.25 API today, but worth knowing if
  this plan's execution is delayed significantly.

---

## Phase 1: Lenis integration, with explicit reduced-motion handling

**Addresses:** the cross-site-confirmed smooth-scroll pattern (all 3
reference sites use it).

### What to implement

1. Add the two Lenis CDN tags (exact URLs from Phase 0) to `build.py`'s
   `SHELL` template, alongside the existing GSAP/ScrollTrigger/SplitType
   tags — same `defer` pattern for the script; the CSS link goes in
   `<head>` alongside `tokens.css`/`base.css`.
2. In `js/main.js`, since Lenis has no reduced-motion option of its own
   (Phase 0 finding), the correct fix is architectural, not
   configuration: **only instantiate Lenis at all when
   `prefers-reduced-motion: no-preference` matches.** Under reduced
   motion, skip Lenis entirely — native scroll remains active, which
   inherently satisfies reduced-motion (there's no smoothing layer to
   disable). This is a cleaner solution than trying to configure a
   smoothing library to feel "reduced" and matches this project's
   existing philosophy of gating whole motion subsystems behind
   `gsap.matchMedia()`'s `motionOK` condition rather than trying to
   produce a lesser version of the same effect.
3. Wire the exact GSAP-ticker integration pattern from Phase 0
   (`lenis.on('scroll', ScrollTrigger.update)`, `gsap.ticker.add(...)`,
   `gsap.ticker.lagSmoothing(0)`) — this must happen inside the SAME
   `gsap.matchMedia()` desktop/motionOK-gated context that already wraps
   the rest of `js/main.js`'s motion setup, not as a separate top-level
   block, so Lenis's lifecycle is tied to the same reduced-motion/
   breakpoint condition changes the rest of the file already handles via
   matchMedia's automatic cleanup.
4. Safety contract, matching every other motion feature in this file: if
   `window.Lenis` is undefined after the script tag should have loaded
   (CDN failure — check the same way `gsapReady` is already checked),
   skip the whole Lenis block. Native scroll continues working exactly as
   it does today; nothing regresses, the site just doesn't get the
   smoothing enhancement. **Do not gate any OTHER functionality behind
   Lenis loading successfully** — reveal/parallax/reveal-image/sticky/
   magnetic-buttons must all continue to work on native scroll exactly as
   they did before this phase, whether or not Lenis loaded.

### Documentation references

- CDN URLs, init pattern, `autoRaf` behavior: Phase 0 "Lenis — current
  API" above (sourced from `unpkg.com/lenis@1.3.25` + the library's own
  README, fetched 2026-07-23).
- GSAP ticker integration: Phase 0 "Lenis + GSAP ScrollTrigger" above,
  quoted verbatim from Lenis's README.
- Existing pattern to match for the reduced-motion gate and CDN-failure
  safety check: `js/main.js`'s existing `gsapReady` variable and
  `gsap.matchMedia().add({ motionOK: ..., desktop: ... }, ...)` block —
  read this before writing the Lenis block, don't invent a parallel
  pattern.

### Verification checklist

- [ ] `window.Lenis` resolves after page load; `document.documentElement`
      gains Lenis's expected class/attribute (check what Lenis actually
      applies — its README examples above don't show one added manually,
      confirm via live inspection what the library does on init before
      assuming a specific selector to test against).
- [ ] **Critical regression check — re-verify the ENTIRE existing motion
      system still works correctly with Lenis active**, using the same
      methodology already established and proven in this project's prior
      sessions (scroll to a position, read `getComputedStyle`/`.style`
      values, don't just eyeball screenshots):
      - `.reveal` elements still trigger at the same relative scroll
        position and animate correctly (opacity/y/scale).
      - `[data-parallax]` elements' transform still updates continuously
        and smoothly as scroll position changes (this is the single
        highest-risk regression — parallax depends entirely on
        ScrollTrigger's scrub staying in sync with actual scroll
        position, which is exactly what `lenis.on('scroll',
        ScrollTrigger.update)` exists to guarantee; if this wiring is
        wrong, parallax will visibly desync or freeze).
      - `.split-sticky` columns still pin and release correctly (this is
        pure CSS `position: sticky`, should be unaffected by a JS scroll
        library, but verify rather than assume — Lenis wrapping native
        scroll could theoretically interact with how the browser
        computes sticky positioning).
      - Magnetic buttons and card-tilt (mousemove-driven, not
        scroll-driven) are unaffected — quick sanity check only.
- [ ] Reduced-motion check: with `prefers-reduced-motion: reduce`
      simulated (note: this project's available browser tooling — gstack
      `browse` — has previously been unable to emulate this media feature
      live via CDP, since `Emulation.setEmulatedMedia` isn't on its
      allowlist; verify via direct code inspection that the
      `no-preference` matchMedia condition genuinely gates Lenis
      instantiation, the same limitation and workaround already used
      elsewhere in this project).
- [ ] Simulate Lenis CDN failure (temporarily break the script URL) and
      confirm the whole site — nav, reveal, parallax, sticky, forms —
      continues working on native scroll with zero console errors.
- [ ] Zero console errors on a fresh load of every one of the 13 pages,
      matching this project's established QA bar.

### Anti-pattern guards

- Do not invent a bespoke "reduced Lenis" configuration (shorter
  `duration`, lower `lerp`, etc.) as a substitute for the missing
  `prefersReducedMotion` option — Phase 0 confirmed no such pattern is
  documented or recommended by Lenis itself; the skip-instantiation
  approach above is the only sourced-and-justified path.
- Do not add `ScrollTrigger.scrollerProxy()` — confirmed not part of the
  current integration pattern; it solves a different problem (scrollers
  that fully replace native scroll, which Lenis doesn't do).
- Do not use both `autoRaf: true` AND the manual `gsap.ticker.add`
  wiring — pick the ticker-driven approach (this project already runs a
  GSAP ticker for everything else) and leave `autoRaf` at its default
  `false`.

---

## Phase 2: Header hide-on-scroll-down / show-on-scroll-up

**Addresses:** the wolverineworldwide.com-observed pattern (measured
`-82px` translate on scroll-down, reset on scroll-up) — Gamechanger's nav
currently only solidifies its background on scroll, it doesn't hide/show.

### What to implement

Extend the existing scroll listener at `js/main.js:6-13` (`.site-nav` /
`.is-scrolled` toggle) with directional detection: track the previous
scroll position, compare to the current one each scroll event, and toggle
a new class (e.g. `.is-hidden`) that translates the nav up by its own
height when scrolling down past a threshold, removing it when scrolling up.
Needs a minimum scroll-delta threshold (don't react to sub-pixel/jitter
scroll noise) and should probably not hide the nav at all near the very
top of the page (e.g. skip the hide behavior below some small `scrollY`
threshold, so the header doesn't flicker away on a tiny initial scroll).

**Integration note with Phase 1:** confirm whether this listener should
read from Lenis's own `scroll` event (`lenis.on('scroll', ...)`) or can
keep using the native `window.addEventListener('scroll', ...)` — Lenis
documents itself as wrapping native scroll rather than replacing it, which
suggests the existing native listener should keep firing correctly, but
verify this empirically (log scroll deltas from both sources side-by-side
during testing) rather than assuming — if Lenis's own scroll values prove
smoother/more reliable for this specific direction-detection use case,
switch to `lenis.on('scroll', ...)` instead, gated the same way (only
subscribe to Lenis's event if Lenis actually initialized; fall back to the
native listener otherwise, so this feature works identically regardless of
whether Phase 1 loaded successfully).

### Documentation references

- Existing scroll listener to extend: `js/main.js:6-13`.
- Existing CSS transition pattern for `.site-nav` to extend (don't invent
  a new transition property list): `css/base.css` — grep for
  `.site-nav` and `.is-scrolled`.

### Verification checklist

- [ ] Scroll down past the threshold: nav translates away within one
      animation frame's worth of visible delay, doesn't flicker.
- [ ] Scroll up any amount: nav returns immediately.
- [ ] Near the top of the page (small scrollY), nav does not hide even
      when scrolling down — only activates past whatever threshold is
      chosen.
- [ ] Nav's own mobile flyout menu (`.nav-links.is-open`) is unaffected —
      if the hide behavior would hide an OPEN mobile menu when the user
      scrolls the flyout's own content, that's a bug; verify the hide
      class doesn't apply while the mobile menu is open.
- [ ] Works identically whether Lenis (Phase 1) loaded or not.

### Anti-pattern guards

- Don't hide the header while any nav dropdown or the mobile flyout is
  open — that would hide UI the user is actively interacting with.
- Don't use `display: none` for the hide state (breaks the transition) —
  use `transform: translateY(-100%)` or equivalent, matching how this
  project already prefers transform-only animation for CLS/performance
  reasons elsewhere (see `plans/01`'s parallax implementation notes).

---

## Phase 3: Cursor-spotlight glow on card hover

**Addresses:** the podium.global-observed, quantitatively-verified pattern
(cursor-relative radial-gradient tracking, confirmed to 4 significant
figures of positional accuracy in the research pass).

### What to implement

A new hover treatment for `.card`/`.card-media` elements: a radial-gradient
background layer whose center position is updated via JS to track the
cursor's position within the element's bounds, creating a "spotlight"
effect. This is additive to (not a replacement for) the existing card-tilt
effect from `plans/01` Phase 3 (`js/main.js`, the `.card-media`
`gsap.quickTo` block) — tilt affects the element's `transform`; the
spotlight affects a separate visual layer (e.g. a CSS custom property like
`--spotlight-x`/`--spotlight-y` consumed by a `background: radial-gradient(
circle at var(--spotlight-x) var(--spotlight-y), ...)` rule), so the two
effects don't compete for the same CSS property the way the parallax/tilt
separation already established in `plans/01` avoided a conflict between
`[data-parallax]` and card-tilt.

Gate behind the same `(hover: hover) and (pointer: fine)` condition already
used for magnetic buttons and card-tilt — this is a desktop-pointer-only
enhancement, matching the existing pattern exactly.

### Documentation references

- Existing card-tilt implementation to sit alongside without conflicting:
  `js/main.js`, the `.card-media` `gsap.quickTo('x'/'y'/'rotation')` block
  from `plans/01` Phase 3 — read this fully before adding the spotlight
  logic, to confirm which CSS properties are already claimed by tilt
  (`transform`) so the spotlight (background/custom-properties) doesn't
  collide.
- Existing hover-gate pattern:
  `gsap.matchMedia().add('(hover: hover) and (pointer: fine)', ...)`.

### Verification checklist

- [ ] Dispatch a synthetic `mousemove` at a known offset within a card
      (matching this project's own established verification technique
      from `plans/01`'s magnetic-button testing) and confirm the gradient
      position updates to the mathematically expected coordinates.
- [ ] Confirm the spotlight and the existing tilt effect both animate
      correctly and simultaneously on the same card without visual
      conflict or jank.
- [ ] Confirm it's absent (no listener attached, no visual effect) on
      touch/non-hover devices.

### Anti-pattern guards

- Don't replace the existing card-tilt — this is additive, both from the
  research (podium.global's spotlight and this project's own already-
  planned tilt are two different, compatible techniques) and from the
  plan's own scope (`plans/01`'s tilt effect is out of this plan's scope
  to remove or alter).
- Don't drive the gradient position via a GSAP tween on the same
  `x`/`y` properties already used for tilt's translate — use CSS custom
  properties as the shared interface (set via `element.style.setProperty`
  or a lightweight `gsap.quickTo` targeting the custom properties
  specifically, not the transform).

---

## Phase 4: Parallax strength calibration (sanity check only)

**Addresses:** day1-run.webflow.io's measured parallax ratios (~0.83:1 and
~0.90-0.92:1) as a reference point for Gamechanger's existing
`[data-parallax]` system.

### What to implement

This project's parallax (`js/main.js`, the `[data-parallax]` ScrollTrigger-
scrub block from `plans/01` Phase 2) and the reference site's use different
underlying calculation methods (this project computes a bounded
translateY offset via `-80 * strength * 10`, capped by scrub timing; the
reference measured a direct position-delta ratio), so the two numbers
aren't directly interchangeable — **do not mechanically copy the reference
ratios into this project's strength values.** Instead: with Phase 1-3
complete and live, do a side-by-side visual comparison (screenshot or
direct observation) of Gamechanger's current parallax intensity against
the qualitative feel of the measured reference range, and adjust the
default `data-parallax-strength` value ONLY if the comparison reveals
Gamechanger's current effect reads as clearly weaker or stronger than that
range — this is a judgment call informed by the research, not a formula to
apply mechanically.

### Verification checklist

- [x] If a change is made, re-verify via the same transform-value-at-
      scroll-position measurement technique already used throughout this
      project (not just a visual impression) that the new strength value
      produces a smooth, continuous parallax curve with no jank. — N/A,
      no change made (see finding below).
- [x] If no change is warranted, say so explicitly in the commit message
      rather than silently skipping the phase — this is a real
      verification step even when its outcome is "no change needed."

**Finding (2026-07-23): no change made.** Measured the live effect
(index.html hero, default strength 0.08): the `[data-parallax]` `<img>`
moves the full -64px (`-80 * strength * 10`) across roughly one
viewport-height of scroll (the trigger's `top bottom`→`bottom top` range
on a 900px-tall section is ~900px of scroll) — confirmed both from the
Phase 1 regression-check transform readings (already -53px of -64px
travelled by scrollY 600) and fresh side-by-side viewport screenshots at
scrollY 0 and 450. That reads as a real, continuously-smooth drift at a
restrained, editorial magnitude — present but understated, with the
1.12 scale headroom correctly hiding the image edges at every position
checked.

Did not adopt day1-run.webflow.io's measured ~0.83–0.92:1 ratios: those
describe a fundamentally different model (near-1:1 scroll-proportional
tracking over the element's full scroll life) than this project's
bounded-total-drift model (a fixed ≤64px/40px travel regardless of how
long the section is on screen) — mechanically matching the ratio would
mean multiplying the current travel distance roughly 10x, which would
read as aggressive/dramatic rather than the restrained, editorial feel
this whole project has taken from wolverineworldwide.com (the primary
reference throughout `plans/01`-`03`, vs. day1-run being one of three
secondary references for this one research pass). The current values
already sit in a deliberately-chosen, verified-smooth place; day1-run's
numbers aren't a bar this site is trying to clear.

### Anti-pattern guards

- Don't treat this as a required code change — the checklist above
  explicitly allows "no change" as a valid, verified outcome.

---

## Phase 5: Page-transition visual polish (CSS-only, no routing library)

**Addresses:** the cross-site page-transition pattern, within the
constraint (site owner's decision, above) of keeping the native View
Transitions API rather than adopting a JS router.

### What to implement

Refine `css/base.css`'s existing `@view-transition` block (currently a
plain opacity crossfade via `gc-page-out`/`gc-page-in` keyframes) toward
something with more of the deliberate, considered feel observed in the
reference sites' curtain-style transitions — within what's actually
achievable via `::view-transition-old(root)`/`::view-transition-new(root)`
pseudo-elements and CSS-only `@keyframes` (no JS route interception, no
new dependency). Concrete options to consider, all CSS-only: a combined
opacity+scale transition (subtle zoom alongside the fade, echoing the
scale-in pattern already used in `plans/01`'s reveal system and this
plan's Phase 0 findings about `.anim-fade-scale`-style combined
treatments), or adjusting timing/easing to feel less like a generic
crossfade and more like a considered beat (e.g. a slightly longer, more
choreographed duration than the current 220ms/320ms out/in split).

### Documentation references

- Existing implementation: `css/base.css`, the `@view-transition` block
  and its `gc-page-out`/`gc-page-in` `@keyframes` (added in `plans/01`
  Phase 3).
- MDN's current View Transitions API reference for what's actually
  animatable via these pseudo-elements, if extending beyond what's already
  used — verify any new CSS property choice is genuinely supported by
  `::view-transition-*` pseudo-elements before committing to it (not
  every CSS property behaves the same way inside a view-transition
  pseudo-element as it does on a normal element).

### Verification checklist

- [ ] Cross-page navigation (in a browser that supports cross-document
      view transitions) shows the refined transition, not just the
      original crossfade.
- [ ] Unsupported browsers (the existing progressive-enhancement
      contract) still navigate normally with zero errors — this feature
      was already zero-JS/zero-risk by design in `plans/01`; don't
      introduce a JS dependency while "polishing" it.
- [ ] `prefers-reduced-motion: reduce` still fully disables the
      transition animation (existing rule at `css/base.css` — re-verify
      it wasn't accidentally weakened by this phase's changes).

### Anti-pattern guards

- Do not add JavaScript to this feature — its entire value (per `plans/01`
  Phase 3's original reasoning) is being a zero-risk, zero-dependency CSS
  feature; adding JS here would just be reinventing the JS-router
  complexity the site owner explicitly declined, in miniature.

---

## Final Phase: Verification

1. **Full regression sweep of the pre-existing motion system** (this is
   the single highest-risk area of this whole plan, since Phase 1 modifies
   how scroll itself behaves site-wide): re-run this project's established
   13-page QA pass — fresh navigation per page (not a cumulative console
   buffer, which produced a false alarm earlier in this project's
   history), zero console errors, zero horizontal overflow at 375px — with
   specific extra attention to parallax smoothness and reveal-timing
   correctness on at least 3-4 representative pages, not just the home
   page.
2. **Reduced-motion verification**, by code inspection given this
   project's tooling limitation (documented above): confirm Lenis
   instantiation, the header hide/show behavior, and the spotlight effect
   are all correctly gated.
3. **Viewport sweep**: re-check the 7 viewports this project has
   validated against in prior phases (1440/1280/1024/768/430/390/375),
   specifically for the new header hide/show behavior (mobile nav
   interaction with the hide/show state hasn't been exercised anywhere
   else in this plan) and the CDN-failure fallback path.
4. Commit each phase separately, matching this project's established
   commit discipline, push, and — given this plan modifies the core
   scroll behavior of the site — consider this a strong candidate for a
   follow-up `/claude-mem:design-is` re-audit afterward, specifically re-
   checking principle #9 (environmentally friendly — Lenis adds ~19KB and
   a continuous raf loop, worth re-confirming this doesn't meaningfully
   regress the project's prior "0/30 idle animation" finding) and #8
   (thorough — the reduced-motion design decisions made throughout this
   plan, in the absence of any Lenis-native support, deserve a fresh
   evidence-based check rather than taking this plan's own reasoning on
   faith).
