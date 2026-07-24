# Plan: Close the design-is gap from 18/30 to a minimum of 26/30

**Source:** `DESIGN-IS-2026-07-24/` (fresh full audit, verdict REDESIGN at
18/30) plus a direct fresh re-grep of the codebase done during this plan's
own Phase 0, which found real instances beyond what the audit's five
evidence subagents caught — the audit's own list was not exhaustive and
this plan does not treat it as such.

**Current per-principle scores:** #1 Innovative 2, #2 Useful 2, #3
Aesthetic 1, #4 Understandable 1, #5 Unobtrusive 3, #6 Honest 1, #7
Long-lasting 2, #8 Thorough 2, #9 Environmentally friendly 2, #10 As
little design as possible 2. Total 18.

**Target:** ≥26 — needs +8, with real margin, since a fresh re-audit will
independently re-verify every fix live rather than accept this plan's own
claims (matching every prior audit and phase this project has run today).

## Phase 0: Documentation Discovery (complete — consolidated below)

Re-grepped the current codebase directly (not trusted from the audit
snapshot, which is only minutes old but line numbers have drifted before
within the same day multiple times):

- `.stat` — `css/base.css:103-111`, `color: var(--accent)` (line 106).
- `.price-card-figure` — `css/base.css:362`, `color: var(--accent)`.
- **New finding, not in the audit's top-5 or evidence docs:**
  `.list-dash li::before` — `css/base.css:534-540`, `color: var(--accent)`
  (line 539) — the same bug class. Confirmed 3 real light-surface
  instances site-wide: `content/about.html` (Career Highlights list,
  inside the `section-lg surface-light` opened at `about.html:16`) and
  `content/coaches.html` (Gregg Clarkson + James Cakovski credential
  lists, both inside the `section surface-light` opened at
  `coaches.html:54`) — each list has multiple `<li>` items, each with its
  own affected dash marker.
- `.testimonial-attribution` — `css/base.css:345-352`. Confirmed via
  grep: **all 9 real `.testimonial` usages site-wide** (5 on
  `content/home.html`, 4 on `content/football.html`) are wrapped in
  `.card.card-on-dark.surface-dark` — there is no case where this
  component is genuinely on a light card. The `.surface-light
  .testimonial-attribution` / `.surface-light .testimonial-attribution
  strong` override rules (`css/base.css:351-352`) are never correctly
  needed and are actively wrong every time they fire.
- `pricing.html#policies` — confirmed via grep, no `id="policies"`
  exists anywhere in `content/pricing.html` or the built `pricing.html`.
- `.footer-heading` — `css/base.css:479` sets `color: var(--accent)`
  (correct, footer is always dark) but `.footer-grid p`
  (`css/base.css` — grep for exact current line before editing) has
  equal-or-higher specificity and wins in the cascade, rendering it gray.
- Focus styling — only two custom rules exist site-wide:
  `.field input:focus/.field textarea:focus/.field select:focus`
  (`css/base.css:497-501`) and `.skip-link:focus` (`css/base.css:548`).
  Every nav link, every `.btn-*`, and the hamburger toggle rely on the
  unstyled browser default.
- Nav duplication — `partials/header.html:25` ("Waiting List") and
  `:26,29` ("Book Now" ×2, mobile+desktop copies) all point to
  `contact.html`.
- Mobile menu — toggle logic in `js/main.js` (grep `nav-toggle` for
  current line), no `keydown` handler exists anywhere in the file (grep
  confirms zero `keydown`/`Escape`/`key ===` matches).

**Anti-pattern guard, confirmed:** none of these fixes require touching
`css/tokens.css`'s scale values, `js/main.js`'s motion system, or any
`content/*.html` structural markup beyond what's named above — the
token/component/motion systems stay untouched, per the audit's own
"preserve" list.

**Blocking item, resolved without waiting on external input:** the
School Holiday Camps stale dates (`content/school-holiday-camps.html:47,61,68`)
cannot be fixed with real dates — this plan cannot invent them, and the
active goal directive says not to pause the work to ask. The only
non-fabricating fix available is removal: take down the three cards whose
dates have already passed, keep the undated "Midfield Masterclass" card
(it makes no false currency claim) and the section's general framing.
This is a content decision, not a design one, and is easily reversible if
the site owner later provides real upcoming dates.

---

## Phase 1: Fix the complete `--accent`-on-light-surface contrast bug class

**Addresses:** #3 Aesthetic.

### What to implement

Add light-surface overrides for `.stat`, `.price-card-figure`, and
`.list-dash li::before`, following the EXACT pattern already established
and verified for `.eyebrow` (`css/base.css`, the `.surface-light
.eyebrow` rule added in `plans/02` Phase 2, corrected today) —
`color: var(--accent-on-light)` scoped under `.surface-light`. Do not
touch the base (dark-surface) rules; they're correct as-is.

```css
.surface-light .stat { color: var(--accent-on-light); }
.surface-light .price-card-figure { color: var(--accent-on-light); }
.surface-light .list-dash li::before { color: var(--accent-on-light); }
```

### Documentation references

- The exact working pattern to copy: `css/base.css`'s current
  `.surface-light .eyebrow { color: var(--accent-on-light); }` /
  `.surface-light .eyebrow::before { background: var(--accent-on-light); }`
  pair (today's fixed version — two SEPARATE rules, one property each,
  not one rule with both properties on both selectors; that exact
  combination is what caused today's regression, guard against repeating
  it even though none of these three cases have a `::before` companion
  to confuse).
- `--accent-on-light` token: `css/tokens.css` (added in `plans/02` Phase 2).

### Verification checklist

- [ ] After adding each override, re-grep `css/base.css` for every
      remaining `color: var(--accent);` and confirm each one is either
      (a) inside a rule that only ever renders on a dark surface (nav,
      footer — verify by checking where the class is actually used, not
      by assuming from the selector name) or (b) now has a
      `.surface-light` counterpart added in this phase. Zero should be
      left unaccounted for.
- [ ] Live-verify computed `color` on all three fixed selectors, at
      least one real instance each: `.stat` on
      `strength-and-conditioning.html`, `.price-card-figure` on
      `pricing.html`, `.list-dash li::before` on `about.html` (Career
      Highlights) and `coaches.html` (Senior Coaches section).
- [ ] Compute the actual contrast ratio for each (should land at the
      same ~5.25:1 as the eyebrow fix, since it's the same token pair) —
      don't just confirm the class name changed.
- [ ] Confirm zero regression on any dark-surface instance of these
      three selectors (they should still render `--accent`, gold-400,
      unchanged).

---

## Phase 2: Fix the testimonial-attribution light-surface override bug

**Addresses:** #3 Aesthetic.

### What to implement

Delete the two erroneous override rules entirely — confirmed via Phase 0
that all 9 real testimonial usages site-wide are always inside a dark
card, so these rules are never correctly needed and are actively wrong
whenever a `.surface-light` ancestor exists (which is every time, since
dark testimonial cards sit inside light sections by design):

Remove `.surface-light .testimonial-attribution { color:
var(--text-on-light-muted); }` and `.surface-light .testimonial-attribution
strong { color: var(--text-on-light); }` (`css/base.css:351-352`). The
base rules (no surface qualifier) already correctly style this component
for its one real context.

### Documentation references

- Confirmed usage sites: `content/home.html` (5 testimonials),
  `content/football.html` (4 testimonials) — re-verify this hasn't
  changed since Phase 0 before deleting (a fresh testimonial usage
  added directly on a light card between Phase 0 and this phase would
  invalidate the fix — unlikely in one session, but check).

### Verification checklist

- [ ] Live-verify computed `color` on a testimonial name (`<strong>`)
      and its role/club line on `content/home.html`, confirm they now
      resolve to `--text-on-dark`/`--text-on-dark-muted` (white/light
      gray) instead of the near-black values found in the audit.
- [ ] Compute the contrast ratio against the actual card background
      (`--surface-dark-raised`) — should land near the ~17:1/~10:1 range
      already confirmed correct for this exact token pairing elsewhere
      on the site (Accessibility evidence, `01-evidence.md`).
- [ ] Repeat on `content/football.html`.

---

## Phase 3: Resolve the "Book Now" vs. "waitlist" mismatch

**Addresses:** #4 Understandable, #6 Honest.

### What to implement

Rename every CTA that currently promises a booking outcome the
destination doesn't deliver. The destination (`contact.html`) is
consistently and accurately framed as a waitlist/enquiry form ("Join the
waiting list," "Please fill out the form below to make an inquiry,"
"we'll be in touch shortly") — the fix is a single, consistent label
change applied everywhere, not per-instance rewording:

- "Book Now" → "Enquire Now" (6 instances: `partials/header.html:26,29`,
  `content/home.html:11,97`, `content/facility.html:11`)
- "Start Now" → "Enquire Now" (3 instances: `content/strength-and-conditioning.html:11`,
  `content/speed-and-agility.html:11`, `content/video-analysis.html:11`)
- "Book A Test" → "Enquire Now" (2 instances: `content/testing.html:11,41`)
- "Book a Session" → "Enquire Now" (1 instance: `content/video-analysis.html:114`)

Leave the nav's existing "Waiting List" (`partials/header.html:25`)
unchanged — it's already accurate and becomes the second, differently-worded
but now-consistent-in-honesty path to the same place, not a mismatched one.
"Get Started" instances (already honest, no promise of a completed
booking) are left unchanged.

### Documentation references

- Grep `Book Now\|Start Now\|Book A Test\|Book a Session` across
  `content/*.html` and `partials/*.html` immediately before editing to
  confirm this count still matches Phase 0's — do not trust the count
  above without re-verifying.

### Verification checklist

- [ ] Re-grep after editing: zero remaining instances of "Book Now,"
      "Start Now," "Book A Test," or "Book a Session" anywhere in
      `content/*.html` or `partials/*.html`.
- [ ] Confirm the `<span class="btn-arrow">` markup inside each edited
      CTA is preserved exactly (only the visible label text changes).
- [ ] Rebuild and live-check zero console errors, zero visual regression
      (button width/wrapping) on at least 3 pages with edited CTAs.

---

## Phase 4: Substantiate or soften unsubstantiated claims

**Addresses:** #6 Honest.

### What to implement

For each claim flagged in the audit, soften to a defensible, non-fabricated
statement — do not invent sources or numbers to "fix" these by making them
look substantiated when they aren't:

- `content/facility.html:9` "multi-million dollar facility" → remove the
  specific dollar-value claim; the facility can still be described
  factually (purpose-built, based at Eagle Vale Sports High) without an
  unverifiable price tag.
- `content/facility.html:21` "Everything you could possibly ask for." →
  soften to a claim the page's own content actually supports (e.g. a
  statement about the range of what's included, not an absolute).
- `content/pricing.html:66` "at the world class Gamechanger HQ" → remove
  "world class" (unsubstantiated + contradicted by the same facility
  still being under construction per `facility.html`); the location
  itself (Eagle Vale) can still be named factually.
- `content/facility.html:63` "FIFA certified A+" → remove; this names a
  certification tier that doesn't exist in FIFA's actual programme
  (FIFA Quality / FIFA Quality Pro are the real tiers) — describe the
  pitch by its real, checkable attributes instead (new grass pitch,
  under construction, with lighting).
- `content/strength-and-conditioning.html:51-52` "50% Reduction in injury
  risk" stat card → remove this specific stat card entirely (no source
  exists to cite) rather than replace it with an invented number.
- `content/coaches.html:106` "Youngest Ever 1st Grade Debutant in NPL
  History (15)" → soften to what's directly verifiable from the same
  bullet's own framing (e.g. age at debut, without the unverifiable
  "youngest ever in NPL history" superlative).
- `content/locations.html:9` "Due to overwhelming demand" / `:38` "we
  have helped hundreds of footballers" → soften both to claims that
  don't require a citation (e.g. describe the expansion factually
  without quantifying demand or a specific footballer count that isn't
  sourced anywhere).

### Documentation references

- Exact current wording and line numbers: re-grep each string
  immediately before editing (content pages are otherwise untouched
  today, so drift risk here is low, but confirm).

### Verification checklist

- [ ] Read each edited page's surrounding paragraph after the change —
      confirm the sentence still reads naturally, not just word-deleted.
- [ ] Confirm no new unverifiable claim was introduced while softening
      an old one.
- [ ] Rebuild, zero console errors, spot-check each edited page renders
      correctly (no orphaned markup from removing the injury-risk stat
      card).

---

## Phase 5: Fix the remaining completeness gaps

**Addresses:** #2 Useful, #10 As little design as possible.

### What to implement

1. **Broken anchor link**: `partials/footer.html`'s "Rules & Policies"
   link points to `pricing.html#policies`, which doesn't exist. Add
   `id="policies"` to the actual Rules & Policies section wrapper in
   `content/pricing.html` (the section containing "Know before you
   train" / the PDF link, per `01-evidence.md`) so the anchor genuinely
   jumps there.
2. **Pricing page CTA-copy mismatch**: `content/pricing.html:9`'s intro
   copy says to click "Enquire Now" for "any of the listed sessions,"
   but only 1 of 6 price cards has its own CTA. Either (a) add a
   per-card "Enquire Now" link to the other 5 cards (matching the one
   that already has it), or (b) adjust the intro copy to accurately
   describe the actual single-CTA structure. Prefer (a) — it's a small,
   template-consistent addition using the existing `.btn-ghost-light`
   pattern already used elsewhere on cards, and better serves #2 Useful
   directly (fewer steps from "I found my price" to "I've enquired").
3. **`.footer-heading` specificity bug**: `.footer-grid p`
   (`css/base.css`, re-grep exact line) currently beats `.footer-heading`'s
   own gold color. Raise `.footer-heading`'s specificity narrowly (e.g.
   `.footer-grid .footer-heading`) rather than reordering the cascade or
   using `!important`, matching this project's established specificity-fix
   pattern from `plans/02` Phase 3.
4. **Duplicated nav affordance**: `partials/header.html:25` ("Waiting
   List") and `:29` ("Enquire Now," post-Phase-3) both point to
   `contact.html` from the same nav bar. Since Phase 3 already makes
   both labels individually honest (neither overpromises), and a
   persistent-nav-link-plus-distinct-CTA-button is a legitimate, common
   pattern (not inherently redundant the way two identically-labeled
   buttons would be), leave this as-is — re-litigating the header
   structure is explicitly out of scope (the audit's own "preserve"
   list covers the IA). Note in the Final Phase writeup that this item
   was considered and deliberately not changed, with reasoning, rather
   than silently dropped.

### Documentation references

- Existing per-card `.btn-ghost-light` CTA pattern to copy for item 2:
  `content/pricing.html` — the DIY Gym Program card, the one card that
  already has its own "Enquire Now" link.
- Existing specificity-fix pattern for item 3: `plans/02` Phase 3
  (`.nav-mobile-book .btn-primary` fix).

### Verification checklist

- [ ] Click-test (via gstack) the Rules & Policies link from the footer
      on a non-pricing page, confirm it lands scrolled to the actual
      section, not just the top of `pricing.html`.
- [ ] Confirm all 6 price cards now have equivalent CTA treatment (or
      confirm the copy accurately describes whichever structure is kept).
- [ ] Live-verify `.footer-heading`'s computed color is gold
      (`--accent`) on at least 2 pages, confirm no other `.footer-grid p`
      instance regressed.

---

## Phase 6: Consistent focus styling + mobile-menu keyboard fixes

**Addresses:** #8 Thorough.

### What to implement

1. Add a site-wide default focus style for interactive elements that
   don't already have one — nav links, `.btn-primary`/`.btn-ghost`/`.btn-ghost-light`,
   the hamburger toggle — using the same gold outline language already
   established for form inputs (`css/base.css:497-501`), not a new,
   different treatment. A single rule targeting the relevant selectors
   (or a broader `a:focus-visible, button:focus-visible` rule scoped to
   avoid double-styling the inputs that already have their own) is
   preferable to enumerating every component individually.
2. Mobile menu keyboard fixes in `js/main.js`: add a `keydown` listener
   for `Escape` that closes the menu (mirrors the existing click-to-close
   behavior already wired for nav links); and when the menu is open, move
   focus into it (e.g. onto the first link) so a keyboard user tabbing
   through never lands behind the still-open overlay — on close (via
   Escape or a link click), return focus to the toggle button.

### Documentation references

- Existing focus-style pattern to extend: `css/base.css:497-501`
  (`.field input:focus`, etc.) — reuse the same outline color/offset,
  don't invent a second visual language for focus.
- Existing toggle/close logic to extend: `js/main.js`, the
  `nav-toggle`/`is-open` block (`plans/01`-era, since extended by
  `plans/03` Phase 2's hide/show — read the current state fully before
  editing, this file has changed several times today).

### Verification checklist

- [ ] Live keyboard-test (real `Tab`/`Escape` key presses via gstack,
      not programmatic `.focus()`) on at least: a header nav link, a
      `.btn-primary`, the hamburger toggle — confirm a visible,
      consistent gold ring appears on each.
- [ ] At 390px, open the mobile menu via keyboard, confirm focus moves
      into it; press `Escape`, confirm the menu closes and focus
      returns to the toggle.
- [ ] Confirm this doesn't regress the existing click-to-close-on-nav-link
      behavior (still works exactly as before).
- [ ] Zero console errors.

---

## Phase 7: Remove stale School Holiday Camps event dates

**Addresses:** #6 Honest, #7 Long-lasting.

### What to implement

Remove the three dated masterclass cards whose dates have already passed
relative to today (`content/school-holiday-camps.html:47` "Defender
Masterclass — 17/07/26", `:61` "Striker Masterclass — 06/07/26", `:68`
"Christmas Camp — Monday 22nd December") — per Phase 0's reasoning, this
is the only fix available that doesn't require fabricating real dates.
Keep the undated "Midfield Masterclass" card (`:54`) since it makes no
false currency claim. Adjust the surrounding grid/layout if removing 3 of
4 cards leaves an awkward gap (check the `.grid-4`/similar wrapper and
resize appropriately rather than leaving empty space).

### Documentation references

- Existing masterclass card markup pattern to preserve for the one
  remaining card: `content/school-holiday-camps.html:47-71`.

### Verification checklist

- [ ] Confirm the page still reads coherently with one card (or adjust
      copy/heading if a single remaining card reads oddly under a
      "Masterclasses" heading — use judgment, don't leave it looking
      broken).
- [ ] Rebuild, zero console errors, visual check of the section at
      desktop and 375px.

---

## Final Phase: Verification

1. **Full regression sweep**: fresh navigation per page, zero console
   errors, zero horizontal overflow at 375px, all 13 pages — matching
   this project's established QA bar from every prior phase today.
2. **Re-run the exact contrast/focus/keyboard checks from
   `DESIGN-IS-2026-07-24/01-evidence.md`** that originally found each
   bug fixed in Phases 1-2 and 6, confirming each specific finding is
   now resolved, not just that code changed.
3. **Commit each phase separately** (this project's established
   discipline), push to `origin main`.
4. **Run a fresh `/claude-mem:design-is` re-audit** — this is the actual
   verification the goal requires, not this plan's own checklist. If the
   result is below 26, treat the new audit's evidence as the next
   iteration's input rather than assuming these phases were sufficient.
