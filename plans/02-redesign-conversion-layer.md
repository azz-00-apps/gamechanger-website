# Plan: Redesign the conversion/interaction layer

**Source:** `/make-plan` handoff from the Dieter Rams audit
(`DESIGN-IS-2026-07-23/`), verdict REDESIGN at 11/30. Scope: fix the
load-bearing functional/honesty/thoroughness gaps found in that audit —
NOT a visual redesign. The typography, motion engineering, spacing system,
and component library all scored positively and are preserved unchanged.

**Decision already made (site owner, this session):** form-handling
service = **Forminit** (formerly Getform.io), chosen over Formspree and a
Cloudflare Worker DIY relay for its more generous free tier (100
submissions/mo vs. 50) and free-tier custom redirect/inline UX support.

---

## Phase 0: Documentation Discovery (complete — consolidated below)

### Forminit — verified current API (fetched live, not from training memory)

- **Getform.io now redirects to forminit.com** — same company (UXPLUS LTD),
  renamed. Use `forminit.com` for everything going forward (dashboard,
  docs, support).
- **Copy-ready pattern** (`https://forminit.com/docs/html/` +
  `https://forminit.com/docs/submit-form-api/`), adapted to this site's
  actual field names (verified at `content/contact.html:40-87` — do NOT
  rename these fields to Forminit's `fi-*` example convention; that's
  their own starter-code naming, not a requirement — `new FormData(form)`
  captures any field by whatever name it already has):
  ```html
  <script src="https://forminit.com/sdk/v1/forminit.js" defer></script>
  ```
  ```js
  const forminit = new Forminit();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { data, error } = await forminit.submit('YOUR-FORM-ID', new FormData(form));
    if (error) { /* show error state */ return; }
    /* show success state */
  });
  ```
- **Free tier confirmed:** 100 submissions/mo, no credit card, custom
  redirects included free, `localhost` explicitly supported as an
  authorized domain (works from an undeployed static page — no hosting
  change needed first).
- **Anti-pattern guard:** do not build against the "raw HTML POST, zero
  JS" path even though their API docs list `application/x-www-form-urlencoded`
  as accepted — the research explicitly flagged that no doc page describes
  what actually renders in the browser on that path (every real example
  assumes their JS SDK). Use the SDK path above, which is fully documented
  end-to-end.
- **Setup step outside this codebase (site owner, before Phase 1 can be
  tested end-to-end):** create a free Forminit account at forminit.com,
  create one form, copy its form ID. Nothing to build here — flagging so
  it isn't missed.
- **One live inconsistency in Forminit's own docs** (rate limit stated as
  both "1 req/30s" and "1 req/5s" on different current pages) — irrelevant
  at this site's real traffic volume, not worth resolving, just don't be
  surprised if you see it during testing.

### Verified current line citations (re-checked this session, not stale)

- `.eyebrow` unconditional accent color: `css/base.css:67` (audit's
  original citation said `:73` — file drifted slightly since the audit;
  this is the corrected line).
- `.statement-eyebrow`'s working dark-surface override to copy the pattern
  from: `css/base.css:393`.
- `.nav-links a` (the rule winning the specificity fight):
  `css/base.css:186`.
- `.btn-primary` (the rule that should be winning but isn't):
  `css/base.css:281`.
- Contact form itself: `content/contact.html:40-87`.
- Magnetic/tilt hover block missing the reduced-motion gate:
  `js/main.js:233` (the `gsap.matchMedia().add('(hover: hover) and
  (pointer: fine)', ...)` call — line shifted from :179 after `plans/03`
  added the Lenis block above it; also now covers a third effect added in
  the same block by `plans/03` Phase 3, the cursor-spotlight glow — this
  phase's fix covers all three at once since they share one matchMedia
  callback).
- The correct `motionOK` pattern already used elsewhere in the same file to
  copy from: `js/main.js:70-71`.
- Dead CSS classes (re-verified live, not just from the audit — confirmed
  `.on-dark` has zero real usages; the audit's grep was distinguishing it
  correctly from the *different*, legitimately-used `.card-on-dark`):
  `.on-dark`, `.surface-raised-dark`, `.grid-tight`, `.on-light`, `.mt-0`,
  `.mt-7`, `.mt-8`, `.mt-text`, `.mt-component`, `.max-w-prose-wide`,
  `.visually-hidden` — all in `css/base.css`.
- Dead custom properties: `--gc-charcoal-900`, `--gc-steel-500`,
  `--gc-paper-dim`, `--accent-tint`, `--space-1`, `--gutter-tablet`,
  `--ease-in-out`, `--duration-slow`, `--duration-reveal`,
  `--parallax-strength`, `--grid-gap-tight`, `--space-7`, `--space-8`,
  `--space-text`, `--space-component`, `--prose-max-wide` — all in
  `css/tokens.css`.

---

## Phase 1: Make the contact form actually work

**Addresses:** #2 Useful (0→), #6 Honest (1→), #8 Thorough (0→) — the
single highest-leverage fix in the whole plan.

### What to implement

1. Add the Forminit SDK script tag to `build.py`'s `SHELL` template,
   alongside the existing GSAP/ScrollTrigger/SplitType tags (same `defer`
   pattern). It only needs to load on `contact.html`, but adding it
   site-wide via the shared shell is simpler and the file is small — match
   the existing pattern rather than inventing a per-page script-injection
   mechanism this project doesn't have.
2. In `content/contact.html`, change `<form action="contact.html"
   method="get">` (line 40) to a plain `<form id="contact-form">` (no
   `action`/`method` — the SDK intercepts `submit` and prevents default
   navigation).
3. Add three new elements to the form for state feedback, styled with the
   *existing* design tokens (do not invent new colors/spacing — this is a
   REDESIGN of function, not appearance):
   - A `<div>` for the success message, hidden by default, shown after a
     successful submit. Reuse `.card`/`.surface-*` token patterns for its
     box, not new CSS.
   - A `<div>` for a form-level error message (network failure, Forminit
     down), same treatment.
   - A loading state on the submit button itself: disable it and swap its
     label text (e.g. "Send" → "Sending…") for the duration of the
     `forminit.submit()` call, then restore or replace with the
     success/error UI.
4. Wire the submit handler per the Phase 0 pattern above, targeting the
   real Forminit form ID (the site owner creates this at forminit.com —
   Phase 0 notes this is an external setup step, not something to build).
5. **Follow the existing progressive-enhancement safety contract from
   `js/main.js`'s GSAP integration** (this is in the plan's "Preserve"
   list — don't diverge from it here): if `window.Forminit` is undefined
   (SDK failed to load), the form must NOT silently do nothing when
   submitted — fall back to a visible message telling the user to email or
   call instead (the real `mailto:`/`tel:` links already exist elsewhere
   on this page at `content/contact.html:11,24` and in the footer —
   reference those, don't invent new contact info).

### Documentation references

- SDK pattern: `https://forminit.com/docs/html/` (fetched live this
  session — verify it's still current before copying, vendor docs change).
- Redirect/thank-you-page alternative if the site owner later prefers a
  full-page redirect over inline states: `https://forminit.com/docs/
  redirections/` (not the recommended default here — inline states match
  this site's existing GSAP-driven, no-page-reload interaction language
  better, but noting the option exists).

### Verification checklist

- [ ] Real end-to-end test: submit the form with real (or clearly marked
      test) data, confirm the site owner actually receives the
      submission/email. This cannot be verified by reading code alone —
      it requires one live submission against the real Forminit form ID.
- [ ] Confirm the submit button visibly disables and shows a
      loading/sending state during submission (not just instant
      success/fail).
- [ ] Confirm a real error state renders if `forminit.submit()` rejects
      (test by temporarily using an invalid form ID, then revert).
- [ ] Confirm the SDK-missing fallback works: block
      `forminit.com` in network conditions (or temporarily comment out the
      script tag) and confirm the form shows the phone/email fallback
      message rather than silently failing again.
- [ ] Re-run a contrast check on the new success/error message text
      against its background — don't introduce a new, unverified color
      pairing while fixing an honesty problem.
- [ ] Zero console errors on `contact.html`, fresh load (matches this
      project's existing QA bar from every prior phase).

### Anti-pattern guards

- Do not add a build step, bundler, or framework to solve this — the SDK
  is a single `<script>` tag, matching the project's existing zero-build
  constraint and its existing pattern for GSAP/SplitType.
- Do not silently swallow errors — a failed submission must show something,
  not fail invisibly the way the current broken form does.
- Do not invent new visual language for the states — reuse `.card`,
  `.surface-dark`/`.surface-light`, existing button/text tokens.

---

## Phase 2: Fix the `.eyebrow`-on-light contrast failure

**Addresses:** #3 Aesthetic, #4 Understandable (partial).

### What to implement

`css/base.css:67`'s `.eyebrow { color: var(--accent); }` applies
unconditionally regardless of surface. `css/base.css:393`'s
`.statement-eyebrow { color: var(--gc-gold-300); }` already solves this
correctly for dark hero surfaces by using the lighter gold tint. Add the
mirror-image fix for light surfaces: an override that darkens the eyebrow
color when it sits inside `.surface-light`, e.g.:

```css
.surface-light .eyebrow { color: var(--accent-press); }
```

(`--accent-press` = `#B8933E`, already defined in `css/tokens.css` — verify
its contrast against `#F5F3EE` before committing to it; if it doesn't clear
4.5:1, step to a still-darker existing token or a new one sized
specifically to pass, but prefer reusing what already exists in the
palette.)

### Documentation references

- The exact working pattern to mirror: `css/base.css:393`.
- WCAG contrast formula already used and verified in this project's own
  audit trail: `DESIGN-IS-2026-07-23/01-evidence.md` "Visual" section (the
  relative-luminance calculation, if you need to re-derive a ratio for a
  candidate replacement color).

### Verification checklist

- [ ] Compute the actual contrast ratio of the new color against
      `--surface-light` (#F5F3EE) — must be ≥4.5:1 for AA on this
      13px/bold text (it's below the large-text threshold, so the stricter
      normal-text bar applies).
- [ ] Live-check all 4 locations the audit found: `index.html:68,102`,
      `contact.html:68,143` (line numbers may have drifted since the
      audit — re-grep for `class="eyebrow"` inside `.surface-light`
      sections before trusting these).
- [ ] Confirm the dark-surface `.statement-eyebrow` path is unaffected
      (this fix must be additive, not a replacement of the existing
      working rule).

### Anti-pattern guards

- Don't remove or weaken the existing `--accent` gold on dark surfaces —
  that pairing passes (11.45:1, per the audit) and is used correctly
  elsewhere.
- Don't reach for a generic dark gray instead of a gold-family token —
  the eyebrow's whole purpose is to read as an accent label; losing the
  gold entirely on light surfaces would fix contrast at the cost of
  breaking the visual pattern this component exists for.

---

## Phase 3: Fix the mobile nav-button specificity bug

**Addresses:** #3 Aesthetic.

### What to implement

`.nav-links a` (`css/base.css:186`, specificity 0,1,1) beats `.btn-primary`
(`css/base.css:281`, specificity 0,1,0) in the cascade, so the mobile
flyout's "Book Now" button (`.nav-mobile-book .btn-primary` — check
`partials/header.html` for its exact markup before editing) renders with
`.nav-links a`'s muted gray text color instead of its own intended
near-black-on-gold. Fix by raising `.btn-primary`'s specificity for this
context rather than raising `.nav-links a`'s specificity globally (which
risks affecting every other nav link) — scope the fix narrowly, e.g.:

```css
.nav-mobile-book .btn-primary { color: var(--accent-contrast); }
```

or increase `.btn-primary`'s own selector specificity if that's more
consistent with how other button-in-nav overrides are already handled
elsewhere in `css/base.css` — check for an existing pattern before adding
a new one.

### Documentation references

- The two competing rules: `css/base.css:186` and `:281`.
- The DOM location of the affected button: `partials/header.html` (grep
  for `nav-mobile-book`).

### Verification checklist

- [ ] Live-computed-style check at 390×844 (or the project's usual mobile
      test width) confirms `.nav-mobile-book .btn-primary` now resolves to
      `--accent-contrast` (#141414), not `--text-on-dark-muted` (#C9C9C9).
- [ ] Confirm no other `.btn-primary` instance elsewhere on the site
      regressed — this bug's fix must be scoped, not global.

### Anti-pattern guards

- Don't fix this by adding `!important` — resolve the actual specificity
  conflict.

---

## Phase 4: Gate magnetic/tilt hover on `prefers-reduced-motion`

**Addresses:** #9 Environmentally friendly.

### What to implement

`js/main.js:233`'s magnetic-button/card-tilt/spotlight block (the spotlight
was added after this plan was written, by `plans/03` Phase 3 — it lives in
the same callback and gets fixed by this same change) is gated only by
`gsap.matchMedia().add('(hover: hover) and (pointer: fine)', ...)` — no
motion-preference check, unlike the reveal/parallax/split-headline systems
earlier in the same file, which correctly use the `motionOK` condition
(`js/main.js:70-71`). Add the same condition to this block's media query
string, e.g.:

```js
gsap.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', function () {
```

This is the minimal fix — combining the media features in one query string
means the whole block simply never registers for a reduced-motion user,
which is correct here (there's no meaningful "reduced" variant of a
magnetic pull effect the way there is a shortened-duration variant of a
fade-in; either it moves toward the cursor or it doesn't).

### Documentation references

- The correct existing pattern one function up in the same file:
  `js/main.js:70-71`.

### Verification checklist

- [ ] Confirm via code that the combined media-query string is valid CSS
      media-feature syntax (test it directly with
      `window.matchMedia('(hover: hover) and (pointer: fine) and
      (prefers-reduced-motion: no-preference)').matches` in a console).
- [ ] Also remove or actually use the dead `prefersReducedMotion` variable
      at `js/main.js:58` while touching this area — it's declared and
      never read anywhere (a small piece of the Phase 5 dead-code problem
      that lives in the same file section, cheap to fix alongside this).

### Anti-pattern guards

- Don't add a second, separate reduced-motion check elsewhere that
  duplicates this one — one combined media-query condition is sufficient
  and matches the existing codebase's style of composing conditions in a
  single string rather than nested `if`s.

---

## Phase 5: Remove dead CSS classes and custom properties

**Addresses:** #10 As little design as possible.

### What to implement

Delete the following from `css/base.css` and `css/tokens.css`, per the
verified (not just audited — re-checked this session) unused list in
Phase 0 above. Do this LAST, after Phases 1-4 land, in case any of those
phases end up wanting one of these tokens (e.g. Phase 1's new
loading/error/success states might reasonably want `--space-component` or
`--space-text` for internal spacing — check before deleting, don't delete
mechanically without re-verifying against the final state of the codebase).

### Documentation references

- Full list with definition line numbers: Phase 0 section above and
  `DESIGN-IS-2026-07-23/01-evidence.md` "Structural".

### Verification checklist

- [ ] Before deleting each class/property, re-grep the FINAL state of the
      repo (after Phases 1-4) for its usage — not the audit's snapshot,
      which predates those phases' new code.
- [ ] After deletion, rebuild (`python3 build.py`) and re-check all 13
      pages for console errors and visual regressions — a class being
      "unused" by grep doesn't rule out something referencing it
      dynamically in a way grep missed (the audit's own subagent flagged
      this exact risk and checked `js/main.js` for dynamic class
      construction — re-verify that check still holds after Phase 1 adds
      new JS).

### Anti-pattern guards

- Don't delete anything from this list without the fresh re-grep — the
  whole point of this phase is precision, not just executing an old list
  mechanically once the codebase has moved since the audit.

---

## Final Phase: Verification

1. **Re-run the three load-bearing principle checks from the audit:**
   - #2 Useful: real end-to-end form submission test, confirmed received.
   - #6 Honest: "Send" now genuinely sends; no other label→behavior
     mismatches introduced by this work.
   - #8 Thorough: empty/loading/error/success states all present and
     screenshotted for the contact form specifically.
2. **Contrast re-check:** compute WCAG ratios for every color touched in
   Phases 1-3 (the new eyebrow color, the fixed nav-button color, any new
   success/error state colors) — don't just eyeball it, use the same
   relative-luminance method the audit used.
3. **Full-site sweep**, matching this project's established QA pattern
   from every prior phase this session: zero console errors and zero
   horizontal overflow at 375px across all 13 pages, fresh navigation per
   page (not relying on a cumulative console buffer, which produced a
   false alarm earlier in this project's history).
4. **Reduced-motion spot check:** confirm via `matchMedia` in the console
   that the Phase 4 fix actually disables the magnetic/tilt block under
   simulated reduced-motion conditions.
5. **Dead-code confirmation:** after Phase 5, re-run the same
   unused-class/unused-token grep methodology the audit's structural
   subagent used, confirm the removed list no longer appears and nothing
   else broke.
6. Commit each phase separately (matching this project's existing commit
   discipline — one focused commit per phase, not one giant commit), push,
   and consider re-running `/claude-mem:design-is` afterward to confirm
   the score actually moved — that's the real test of whether this plan
   worked, not just whether the checklist above was followed.
