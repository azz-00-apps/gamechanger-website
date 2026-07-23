# Plan: Award-Caliber Typography & Motion System

## Orientation (read this first, every phase, every session)

This plan continues work on a static HTML/CSS/vanilla-JS redesign of "Gamechanger
Football and Performance," a real South West Sydney youth football training business.
Project root: `/Users/azzop/Gamechanger Website/`. Git repo, pushed to
`https://github.com/azz-00-apps/gamechanger-website` (branch `main`).

**Current state as of this plan (commit `e8e8bc7`):**
- 13 static pages, assembled by `build.py` from `content/<slug>.html` fragments +
  `partials/header.html` + `partials/footer.html`. Run `python3 build.py` after
  editing any fragment or partial — never hand-edit the root-level `*.html` files,
  they're generated output.
- Design tokens in `css/tokens.css`, shared component/utility CSS in `css/base.css`,
  shared behavior in `js/main.js`. Full rationale in `research/design-system.md`.
- Existing motion system (built in the prior session, working and verified): a
  progressive-enhancement `.reveal` fade-rise for text, `.reveal-image` clip-path
  wipe for photography, `[data-parallax]` rAF-throttled scroll parallax, one
  `.split-sticky` sticky-column moment on About. All vanilla JS, no dependencies.
- Current typography: Google Fonts "Archivo" (body, weights 400-700) + "Archivo
  Black" (display headlines), declared in `css/tokens.css` lines 4, 49-50.
- Wolverine Worldwide research already done and committed:
  `research/wolverine/design-spec.md` (full computed-CSS design language) and
  `research/wolverine/*.png` (screenshots across 4 pages, 3 viewports each).

**What changed the brief just now, versus the prior session:**
1. Typography must match the reference site's actual typeface as closely as
   legally possible (previously used Archivo/Archivo Black as a stylistic
   approximation — now the ask is a deliberate close match).
2. Motion/interaction quality must reach genuine "award-winning site" caliber —
   the existing vanilla reveal/parallax/sticky system is good but not at the level
   of e.g. an Awwwards Site of the Day. This likely requires a real animation
   engine (see Phase 2 decision).
3. **Scope permission has widened**: the project is no longer required to mirror
   gamechangerfootball.com's exact page-by-page section structure. Real content
   (prices, names, addresses, testimonials, coach bios — everything in
   `research/gamechanger/*.md`) is still the only source of truth and must never
   be invented, but *how it's organized and presented per page* is now open to
   whatever serves the strongest result. This is an explicit, deliberate change
   from the prior session's "faithfully rebuild each section in order" approach.

## Phase 0 findings (already done — do not redo)

### Font identification — verified via live computed CSS, not guessed from the image

Checked directly against `https://wolverineworldwide.com/brands`, element
`.c-brands_galaxy-title` (the "A portfolio built for every step." headline in the
attached screenshot):

```
font-family: ABCDiatype, sans-serif
font-weight: 700
font-size: 128px
letter-spacing: -6.4px
```

Actual font files loaded (confirmed via network log, not inferred):
```
https://wolverineworldwide.com/fonts/ABCDiatype-Medium.woff2
https://wolverineworldwide.com/fonts/ABCDiatype-Bold.woff2
https://wolverineworldwide.com/fonts/ABCDiatype-Mono.woff2
```

**This is genuinely "ABC Diatype"** (the standard cut, not a distinct "Rounded"
family member — its soft terminals are just that typeface's natural character at
large display sizes). Confirmed by taking a fresh screenshot of the live element
and comparing directly against the attached image — same text, same rendering.

**Critical constraint: ABC Diatype is a proprietary commercial typeface from ABC
Dinamo.** Those `.woff2` files are Wolverine Worldwide's licensed property. Do not
download and self-host them on this project — that's using another company's paid
font license without authorization, on a different commercial site. This isn't a
technical limitation, it's a licensing one, and it applies regardless of how the
font is obtained (downloading their hosted file, screenshotting and "tracing" the
letterforms, etc.).

**Shortlist of freely-licensed close substitutes** (final pick is a Phase 1 decision,
see below — do not skip the side-by-side comparison step):
1. **General Sans** (Fontshare, free commercial license) — specifically and
   frequently recommended in the type-design community as an ABC Diatype
   alternative; closest shape match of this shortlist. Not on Google Fonts —
   requires self-hosting the files (download from fontshare.com) or their CDN.
2. **Switzer** (Fontshare, same foundry/license as General Sans) — slightly more
   geometric than General Sans, still a strong match.
3. **Inter** (Google Fonts, SIL OFL) — safest/zero-friction option (already
   `@import`-able exactly like the current Archivo setup, huge weight range,
   variable font available), a bit more mechanical/neutral than ABC Diatype but
   very close in x-height and overall proportion.
4. **Hanken Grotesk** (Google Fonts, SIL OFL) — warmer and closer to ABC Diatype's
   soft terminals than Inter, still zero-friction Google Fonts hosting.

### Current codebase audit (already accurate, re-verify only if this plan is picked
up more than a few sessions later — check `git log -1` against `e8e8bc7`)

- No animation library is in use. `js/main.js` is ~110 lines of vanilla JS:
  IntersectionObserver-based reveals + a hand-rolled rAF parallax loop.
- No build step / bundler / npm exists. `build.py` is the only "build," and it just
  does string templating, not asset compilation. Any new dependency must work as a
  CDN `<script>` tag or a downloaded static file — there is no package manager step
  to hook into.
- `prefers-reduced-motion` is already handled globally (`css/base.css` lines 8-11
  force near-zero animation/transition durations) and the parallax JS has its own
  explicit `matchMedia` gate. Any new motion work must preserve both of these, not
  just the CSS one.

---

## Phase 1: Typography system replacement

**What to implement:** Replace the Archivo/Archivo Black font stack with the chosen
ABC-Diatype-adjacent typeface across the whole site, via the token system (not
page-by-page) so it changes everywhere at once.

**Steps:**
1. Build a side-by-side comparison page (a throwaway HTML file, not committed to
   `content/`) rendering the same headline text ("Maximise your potential.") in
   General Sans, Switzer, Inter, and Hanken Grotesk at the same size/weight as the
   current hero. Screenshot it, compare against `research/wolverine/design-spec.md`'s
   documented type scale and the attached reference image. Pick one. Record the
   decision and why in `research/design-system.md`'s existing "Typography" section.
2. If the pick is a Fontshare font (General Sans/Switzer): download the woff2 files,
   commit them under `assets/fonts/`, add local `@font-face` rules to the top of
   `css/tokens.css` (replacing the current `@import` line). If the pick is a Google
   Font (Inter/Hanken Grotesk): swap the `@import` URL, same pattern as today.
3. Update `--font-display` and `--font-body` in `css/tokens.css` (lines 49-50).
   Decide whether to keep a separate ultra-bold "display" weight (current
   Archivo-Black-style approach) or move to Wolverine's own binary 400/700-only
   system (`research/wolverine/design-spec.md`: "Weight usage: Binary — either 400
   ... or 700 ... No use of 300/500/600/800/900 detected"). Recommendation: match
   Wolverine's binary system — it's part of what makes that site read as
   disciplined/premium rather than loud. Document whichever choice is made.
4. Rebuild (`python3 build.py`) and visually check all 13 pages — font loading
   failures are silent (falls back to the next stack entry), so a missed weight or
   a wrong `font-weight` value won't error, it'll just look subtly wrong. Check
   computed `font-family` via browser inspection on at least one `h1`, one `h2`,
   one body paragraph, and one button per page, not just the homepage hero.

**Verification checklist:**
- [ ] `grep -c "Archivo" css/*.html css/*.css content/*.html` returns 0 outside of
      historical commit messages
- [ ] Every page's computed `font-family` on real elements (not just inline styles)
      resolves to the new font, checked via actual browser inspection, not assumed
- [ ] No FOUT/FOIT flash-of-fallback issue worse than before (check Network tab
      timing for the new font files)
- [ ] `prefers-reduced-motion` and existing weight-dependent CSS (e.g. anything
      selecting `font-weight: 900` for a Black cut) still resolves sensibly if the
      binary-weight decision was taken

**Anti-pattern guards:**
- Do not download and self-host `ABCDiatype-*.woff2` from wolverineworldwide.com —
  licensing violation, not a style choice
- Do not silently keep Archivo "just for one page" — the whole point is one
  consistent system
- Do not invent a `font-weight` value that doesn't exist in the chosen font's actual
  shipped weights (check the font's own documentation/files first)

---

## Phase 2: Animation engine decision + upgrade

**The decision this phase must make explicitly, not by drift:** the current
vanilla IntersectionObserver + rAF system is solid but has a ceiling — it can't
cleanly do scroll-scrubbed timelines (an element's animation progress tied
precisely to scroll position, not just triggered once), coordinated multi-element
sequencing, or the kind of eased, physics-feeling motion that reads as
"$1,000,000 site" rather than "nice fade-in." Getting genuinely award-caliber
motion likely means introducing **GSAP + ScrollTrigger** (industry standard for
exactly this tier of site, CDN-hostable, no build step required — fits the
project's zero-build constraint from the orientation section above).

**What to implement:**
1. Add GSAP core + ScrollTrigger via CDN `<script>` tags in `build.py`'s `SHELL`
   template (next to the existing `js/main.js` script tag).
2. Re-implement the existing `.reveal` / `.reveal-image` / `[data-parallax]` /
   `.split-sticky` behaviors as GSAP ScrollTrigger timelines instead of hand-rolled
   IntersectionObserver + rAF — same visual outcomes, but now with real easing
   curves, scrub capability, and one coordinated system instead of four separate
   bespoke ones. This is a genuine upgrade, not decoration: ScrollTrigger's
   `scrub` option is what makes parallax feel buttery instead of steppy, and
   GSAP's `stagger` config replaces the current hand-computed
   `(index % 6) * 80ms` delay math with something more precisely tunable.
3. Add headline text-splitting: each display headline's words (or characters, for
   the biggest hero moments only — character-splitting everywhere reads as
   gimmicky) animate in individually rather than as one fade-rise block. GSAP's
   commercial `SplitText` plugin requires a Club GreenSock license; use the free
   `SplitType` library (MIT license, CDN-available) instead for the actual
   splitting, driven by GSAP timelines.
4. Evaluate (don't default-implement) a smooth-scroll library (Lenis). This is
   genuinely a coin-flip decision for a site like this: it's part of what gives
   many award sites their signature "buttery" feel, but the existing brief's own
   constraints ("avoid excessively slow scroll smoothing," "avoid hijacking normal
   scrolling," "avoid trapping users") are real risks if configured badly. If
   implemented: keep duration short (~0.8-1s lerp, not 2s+), disable entirely on
   touch devices (Lenis fights native momentum scroll on mobile more than it
   helps), and gate it behind the same `prefers-reduced-motion` check as
   everything else.

**Verification checklist:**
- [ ] Every existing motion behavior (parallax, image reveal, sticky, text reveal)
      still works after the GSAP migration — visually re-verify each on at least 2
      pages, not just home
- [ ] `prefers-reduced-motion: reduce` is respected by the new GSAP code
      specifically (GSAP has its own `matchMedia` helper — use
      `gsap.matchMedia()`, don't rely on the CSS-only override to catch JS-driven
      animation)
- [ ] No new console errors (check all 13 pages, matching the prior session's QA
      pattern — 0 errors was the verified baseline, don't regress it)
- [ ] 60fps during scroll on at least a mid-tier device profile — Chrome DevTools
      Performance panel, not just "looks smooth on this machine"
- [ ] If Lenis is added: verify normal scrollwheel/trackpad/touch scroll still
      works, verify keyboard scroll (Page Down, spacebar, arrow keys) still works,
      verify it doesn't fight the existing sticky-column implementation

**Anti-pattern guards:**
- Do not add GSAP's paid plugins (SplitText, MorphSVG, etc.) — this project has no
  Club GreenSock license
- Do not scroll-jack (intercepting and overriding the user's scroll input to force
  a different scroll destination/speed) — Lenis done correctly does not do this;
  a custom "snap to section" implementation would, and is explicitly against the
  brief
- Do not leave the old vanilla reveal system running *alongside* the new GSAP one
  on the same elements — pick one system per behavior, delete the other

---

## Phase 3: Signature interaction details

**What to implement** (each is optional/gradeable — do as many as time allows, in
this priority order):
1. **Magnetic buttons** — primary CTAs (`.btn-primary`) subtly follow the cursor
   within a small radius on hover, snapping back on mouseleave. GSAP `quickTo()` is
   the standard clean implementation. Desktop/mouse only — skip entirely on
   touch (`window.matchMedia('(hover: hover)')` gate).
2. **Cursor-aware hover states on imagery** — a subtle scale/tilt on `.card-media`
   hover driven by cursor position within the card, not just a flat CSS
   `:hover` scale.
3. **Page transitions between the 13 static pages** — the trickiest item here
   because this is a multi-page static site, not a SPA. Recommend the **View
   Transitions API** (native browser support, Chrome/Edge/Opera as of this
   writing, progressive enhancement — unsupported browsers get normal instant
   navigation, no error, no polyfill needed): wrap navigation in
   `document.startViewTransition()` where supported. This is a much lower-risk
   choice than a custom JS router intercepting every `<a>` click and faking SPA
   navigation on a project that has deliberately stayed zero-build/zero-framework.
4. **Custom cursor** — genuinely optional, genuinely risky (easy to make feel
   gimmicky rather than premium, adds complexity, must be fully disabled on touch
   and must not break native cursor affordances like text-select or link
   hover indication). Only attempt this last, and only if the first three land
   well and still feel like the budget supports more.

**Verification checklist:**
- [ ] Every new interaction has a `(hover: hover)` and/or touch-device gate where
      relevant — nothing here should degrade the mobile experience
- [ ] View Transitions: verify graceful fallback in a browser that doesn't support
      the API (Firefox, at time of writing) — navigation must still work, just
      without the transition, not break
- [ ] Magnetic buttons don't interfere with click accuracy/hit target size
      (WCAG target size guidance still applies even with the magnetic offset)

**Anti-pattern guards:**
- Do not build a custom SPA-style router for page transitions — View Transitions
  API achieves the effect without that architectural risk
- Do not apply magnetic/cursor effects to body text links or nav items — reserve
  for a small number of deliberate CTA moments, matching this project's existing
  "don't apply animation randomly to every element" discipline

---

## Phase 4: Editorial/IA freedom pass

**What this phase is NOT:** inventing new facts, new testimonials, new prices, new
coach names, or new sections not grounded in `research/gamechanger/*.md`. That
constraint is unchanged.

**What this phase IS:** the prior session built each of the 13 pages by mirroring
gamechangerfootball.com's own section order fairly literally (hero → about-style
split → statement break → grid → CTA, repeated per page). With the "no longer just
copying the exact things" permission, revisit each page and ask: is this the
strongest possible arrangement of this page's *real* content, or is it just the
old site's structure with a new coat of paint?

**Concrete places worth reconsidering (found during the prior session, not new
findings — re-read the git log for full context if picking this up fresh):**
- **Pricing**: currently a flat grid of 6 cards in the order the old site had them.
  Consider grouping by category (Football sessions vs. S&C) with its own short
  intro per group, rather than one undifferentiated grid.
- **Coaches**: 4 of 8 coaches have no photo (documented in
  `research/gamechanger/coaches.md` and the prior session's build notes). Consider
  whether a text-only coach card should look different by design (not just "the
  same card with a missing image slot") — e.g., a more editorial credentials-first
  layout for photo-less coaches instead of visually implying a missing photo.
- **Facility**: page currently states several features are "under construction"
  per the live site's own copy. Worth an explicit content decision (flagged in the
  prior session, never resolved): confirm with the actual business whether this is
  still accurate before launch, since claiming unfinished amenities as available
  would be misleading either way this page is structured.
- Every other page: read `research/gamechanger/<slug>.md` fresh (not the already-
  built `content/<slug>.html`) and ask what the *strongest* version of that page
  looks like, rather than starting from what's already built and just improving it
  incrementally.

**Verification checklist:**
- [ ] Every fact/figure/name/quote on every page traces to a specific line in
      `research/gamechanger/*.md` — spot-check at least 3 pages against source
- [ ] No page regresses in real information conveyed (reorganizing ≠ cutting content
      that matters to a prospective customer, like pricing or contact info)

**Anti-pattern guards:**
- Do not treat "creative freedom" as license to invent supporting stats, made-up
  quotes, or generic stock-photo-style claims not in the source material
- Do not change the site's actual sitemap/URLs (`pages.json`, nav structure) without
  flagging it explicitly — internal IA changes (order/emphasis within a page) are
  in scope here; changing what pages exist or their filenames is a bigger
  discussion this plan doesn't pre-authorize

---

## Phase 5: Cross-page consistency, performance, accessibility — final verification

Repeat the prior session's validation methodology (documented in git log around
commit `e8e8bc7`), re-run in full after Phases 1-4 land:

1. **Structural integrity**: 0 broken internal links, 0 missing `alt` attributes,
   0 malformed HTML, across all 13 built pages.
2. **The 7 required viewports**: 1440, 1280, 1024, 768, 430, 390, 375px. No
   horizontal overflow, no nav wrapping, no console errors, on every page at every
   width — this was the exact checklist that caught the 1024px nav-wrapping bug
   last time; don't skip it just because it passed before, since Phases 1-2 touch
   the same header/font/motion code that bug lived in.
3. **Performance**: with GSAP + ScrollTrigger + (possibly) Lenis now in the stack,
   explicitly re-check Lighthouse/DevTools Performance — this plan adds real
   script weight and scroll-driven work that the prior vanilla-JS baseline didn't
   have. No cumulative layout shift, no janky scroll, reasonable load time despite
   the new dependencies.
4. **Accessibility**: keyboard navigation still works (magnetic buttons, custom
   cursor if built, and View Transitions must not break focus order or keyboard
   activation), `prefers-reduced-motion` verified for every new animation system
   (CSS-only coverage isn't enough once GSAP is driving things via JS).
5. Commit with a clear message per phase (matching the prior session's granular
   commit discipline — one commit per meaningful milestone, not one giant commit),
   push to `origin main` after each.

**Definition of done for this whole plan:**
- Typography visibly and measurably matches the ABC-Diatype-adjacent reference
  (side-by-side comparison documented in Phase 1, decision recorded)
- Motion quality is a genuine step up from the prior vanilla system — scrubbed,
  eased, coordinated, not just "things fade in"
- At least the magnetic-button and page-transition signature details from Phase 3
  are implemented and working
- Every page has been deliberately reconsidered for its strongest content
  arrangement, not just re-skinned in place
- The Phase 5 validation checklist passes clean, matching or exceeding the prior
  session's verified baseline (0 console errors, 0 overflow, nav clean at all 7
  viewports)
- Everything is committed and pushed; nothing is left half-finished without a
  clear note in the final commit/summary about what remains
