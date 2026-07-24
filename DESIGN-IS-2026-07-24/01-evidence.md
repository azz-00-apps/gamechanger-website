# Evidence — Gamechanger Football and Performance, re-audit

Consolidated from 5 evidence-gathering passes: Structural, Copy & Honesty,
Weight & Friction, Visual (all file-based or gstack-verified subagent
reports), plus this orchestrator's own first-hand evidence from directly
verifying the contact form's loading/error/success states earlier today
during `plans/02` Phase 1 (real Forminit submissions, hash IDs
`j3kCCJlauWWo0PvH` and a second confirmed via the real button-click path;
screenshots at that time saved to
`/private/tmp/claude-501/-Users-azzop-Claude/2228c95a-223b-475a-8ea0-6a37d7930c37/scratchpad/form-success.png`
and `form-error.png`). No new form submissions were made during this audit
— all five evidence-gathering passes were explicitly instructed not to
submit the form again, to avoid adding more test entries to the live
Forminit dashboard.

---

## Structural Evidence

- **Interactive-element count** (home page + shared header/footer): **37**
  — 36 `<a>` links (header 17, home content 8, footer 11) + 1
  `<button>` (mobile nav toggle, `partials/header.html:5`). Zero
  `<input>`/`<textarea>`/`<select>` on this surface (the only form lives
  on `contact.html`: 8 links + 1 button + 12 inputs + 1 textarea there).
- **Max nesting depth**: **9** (body=1), reached identically 5× via the
  home page's testimonial cards (`content/home.html:58-87`,
  `body→main→section→div.container→div.grid→div.card→blockquote→footer→strong`).
  Runner-up depth 8: the nav dropdown.
- **Repeated-pattern count** (site-wide, exact class-token matching, not
  substring): a real, consistently-reused component system —
  `.reveal` 215×, `.eyebrow` 75×, `.card` 61×, `.btn` 59×, `.btn-primary`
  37×, `.section`/`.section-lg` 43×, `.statement` family ~25× each,
  `.testimonial` 9×, `.price-card` 6×. Full breakdown in the subagent's
  report (available on request) — the headline finding is that nothing
  looks like one-off snowflake markup; every recurring affordance traces
  to a shared class.
- **Dead-code sweep, fully re-verified fresh (not trusting the earlier
  removal):** all 27 items removed in `plans/02` Phase 5 (11 classes, 16
  custom properties) confirmed still absent, boundary-safe grep across
  the whole repo. **Independent fresh sweep of all 139 currently-defined
  classes/properties (70 classes + 69 custom properties): 0 additional
  dead items found.** `css/pages/` is empty — all CSS routes through
  `tokens.css`/`base.css`, so this sweep is exhaustive for the entire
  site.

## Copy & Honesty Evidence

Full per-page string inventory gathered (available on request — omitted
here for length; every heading, CTA, label, price, and testimonial across
all 13 pages plus both partials was read and catalogued).

**Flagged inflations** (claim, substantiated or not):
- "Trusted by professional footballers." (`home.html:55`) — **substantiated**, 5 named testimonials with real-sounding club/country attributions follow immediately.
- "multi-million dollar facility" (`facility.html:9`) — **not substantiated**; the same page's own "What's included?" section discloses 3 of 4 listed amenities are still under construction.
- "Everything you could possibly ask for." (`facility.html:21`) — unfalsifiable, immediately undercut by the same under-construction disclosures.
- "at the world class Gamechanger HQ" (`pricing.html:66`) — same contradiction.
- "FIFA certified A+ half pitch" (`facility.html:63`) — **not a real FIFA rating tier** (FIFA's actual programme is "FIFA Quality"/"FIFA Quality Pro"), describing a pitch explicitly still under construction.
- "50% Reduction in injury risk" stat (`strength-and-conditioning.html:51-52`) — no source or methodology cited anywhere.
- "Youngest Ever 1st Grade Debutant in NPL History (15)" (`coaches.html:106`) — absolute, checkable record claim, zero citation.
- "we have helped hundreds of footballers" (`locations.html:38`) — no count, case study, or name given.
- "Due to overwhelming demand...has expanded" (`locations.html:9`) — asserted, not evidenced.

**Dark patterns: zero found.** Explicitly checked and absent: pre-checked opt-ins (0 checkboxes exist on the form at all), hidden fields, forced continuity, fake scarcity/urgency language (grepped, zero hits), confirmshaming, cookie-consent manipulation.

**Jargon**: moderate amount expected for a sports-specific site (NPL, TSP Program, ASCA Level 1, "stretch shortening cycle," VALD force plates) — mostly unexplained on first use, full list with plain-language replacements gathered.

**Label→behavior mismatches — this is the most consequential section:**
1. **Contact form "Send" button — genuinely fixed, verified against current code.** No `method`/`action` on the form (`content/contact.html:40`); Forminit SDK tag confirmed present in the actual built `contact.html:204`; submit handler correctly gates on `window.Forminit` existing, shows a real loading state spanning the `await forminit.submit(...)` call, and the error-fallback contact info matches what's used everywhere else on the site. This is a real, substantive fix, not just an appearance of one.
2. **Systemic "Book Now" mismatch — NEW finding, not something any prior plan addressed.** 12 separate CTAs across the site ("Book Now" ×6, "Start Now" ×3, "Book A Test" ×2, "Book a Session" ×1) all route to `contact.html`, whose own H1 is "Join the waiting list," whose intro says "make an inquiry," and whose success message says "we'll be in touch shortly" — i.e., an enquiry/waitlist submission, not a confirmed booking. The SAME nav bar uses both the accurate label ("Waiting List") and the inflated one ("Book Now") for the identical destination.
3. **Footer "Rules & Policies" link is broken** (`partials/footer.html:39`, present on every page) — points to `pricing.html#policies`, but no element with `id="policies"` exists anywhere in the built output. Clicking it just loads the top of the pricing page.
4. **Pricing page instructional copy overpromises** (`pricing.html:9`) — says "for any of the listed sessions below click 'Enquire Now'," but only 1 of 6 price cards actually has its own CTA; the other 5 have no per-card action, only the one hero button at the top.
5. **School Holiday Camps presents stale events as upcoming — NEW finding.** Three of four "masterclass" cards carry specific dates that are already in the past relative to today (2026-07-24): "17/07/26" (7 days ago), "06/07/26" (18 days ago), and "Christmas Camp — Monday 22nd December" (resolves to Dec 2025, since Dec 22 2026 is a Tuesday — roughly 7 months stale). All four are framed under the heading "upcoming masterclasses" with no past-event indicator, and each "Learn More" leads to an Instagram post about an event that has already happened.

## Weight & Friction Evidence

- **Initial JS**: ~76.8 KB total (60,067 B across 5 CDN scripts, real measured transfer sizes from live network logs captured earlier today, + 16,689 B local `main.js`, raw disk size — likely smaller over the wire if compression is enabled). Comfortably under the 100 KB "score 3" anchor.
- **Network requests, primary view**: 16 (1 HTML + 2 local CSS + 1 CDN CSS + 5 CDN JS + 1 local JS + 3 of 4 declared font files actually fetched (Medium/500 weight is declared but never used anywhere in the codebase — confirmed by grep, zero `font-weight: 500` usages — so it costs 0 bytes on the wire despite being declared) + 3 external hero/card images on Wix's CDN).
- **Time-to-interactive**: not measured (no real browser timeline available to this audit's tooling) — reasoned estimate from architecture: content is visible via plain CSS regardless of JS (verified — no `visibility:hidden` anywhere, the only `opacity:0` states are GSAP-gated with a 3-second forced-reveal safety net, confirmed in code), so usable content is near-immediate; full interactivity (nav toggle, hover effects) is gated behind the full `defer` script chain, estimated 0.3–1.5s on broadband, possibly 2–4s+ on a throttled connection, driven mainly by `forminit.com` being a non-preconnected third origin.
- **Idle animation**: **0 visually perceptible** — every motion effect (reveals, parallax, magnetic buttons, tilt, spotlight) is scroll- or pointer-triggered and static at rest, confirmed via code reading (zero `infinite` keyframes, zero raw `requestAnimationFrame` calls in `main.js`). One technically-continuous-but-invisible loop exists (Lenis's raf, riding GSAP's ticker, only when motion is not reduced) — produces zero paint when not scrolling, noted but not counted against the visible-idle figure.
- **Notifications/badges/modals on load**: **0**, verified by grep across all 13 pages plus partials, zero cookie/consent/modal/toast/badge markup found anywhere.

## Visual Evidence

- **Spacing scale** @1440px: fixed [8, 12, 16, 24, 32] + fluid (clamp) [36 (card-padding, maxed), 40.8 (space-section-sm), 43.2 (gutter), 65.6 (split-gap), 79.2 (space-section-md), 140.8 (space-section-lg)] — every live-sampled value matched the token math exactly across 3 pages checked.
- **Type scale** @1440px: fixed [13, 15, 17, 20] + fluid [20.8, 30, 44, 88 (all maxed by 1440px), 124.8 (display-xl, not yet maxed)] — all live samples matched.
- **Color count**: 15 distinct hex values defined in `tokens.css`, cleanly grouped (5 dark neutrals, 5 light neutrals, 5 gold/accent). Live-sampled 22 elements on the home page: 19 traced cleanly to a token, 3 were intentional `rgba()` translucent overlays on ghost buttons (by design, not a token miss). **One unintended rendering mismatch found**: `.footer-heading` is declared gold (`base.css:480`) but a higher-specificity sibling rule (`.footer-grid p`, `base.css:481`) actually wins, rendering it as mist-gray instead — cosmetic only, still traces to a valid token.
- **Lowest contrast ratio found: 1.00:1 — a real, severe regression from today's own `plans/02` Phase 2 fix.** `.surface-light .eyebrow` text is now **completely invisible** (text color and its own background color are byte-identical, both `rgb(122,98,41)`), confirmed on index.html and reproduced on contact.html, confirmed visually (screenshot: only the decorative dash is visible, the text itself renders nothing). Root cause: `base.css:88-92` combines the text selector and its decorative `::before` pseudo-element in one comma-joined rule and applies BOTH `color` and `background` to BOTH selectors — `background` was only ever meant for the dash. This is **worse than the ~1.56:1 problem it was meant to fix** — the intended `gold-700` token itself is correct (verified 5.25:1 in isolation) but a second, unrelated bug in the same commit cancels it out. Affects every `.eyebrow` instance on every light-surface section across all 13 pages (of 75 total site-wide instances).
  - Also found, **pre-existing, not part of today's changes**: testimonial-attribution text on the home page's dark cards renders as low as **1.07:1** (name) and **2.49:1** (byline) — a `.surface-light .testimonial-attribution` descendant-combinator rule incorrectly overrides the correct dark-card styling whenever a dark `.card` sits inside a light-surface section (exactly the home page's "What Players Say" layout). This selector's specificity/matching behavior is unchanged by today's dead-code cleanup (which only removed an already-dead alternate branch of the same rule) — it was already broken before today.
  - All other checked pairings passed comfortably (full table below, Accessibility section).
  - The mobile nav-button specificity fix from today's `plans/02` Phase 3 **is confirmed genuinely working live**: 10.65:1 at 390px with the hamburger menu actually opened via a real click.
  - The dark-surface `.statement-eyebrow` case was confirmed never broken (10–11.5:1, pixel-sampled from a real photo+scrim background, not just flat-color math).
- **Contact form states**: empty state screenshotted (clean, all fields blank, no asterisk on optional fields). Focus ring on inputs: a deliberate, visible gold 2px outline (`base.css:498-501`). Focus ring on the submit button: **no custom style exists** — real keyboard Tab navigation lands on it correctly and shows Chromium's unstyled default blue ring (visible, but inconsistent with the deliberately-designed gold ring on inputs). Native `required` validation confirmed live via `form.checkValidity()` (false on empty form) — present on email/phone/player-info, absent on name/age/radios (matches the HTML, which only marks the truly-required fields with `*`). Loading/error/success states not re-tested this pass (already verified first-hand earlier today, see header of this document) — loading state showed `disabled:true, text:"Sending…"`; error state correctly renders Gamechanger's real email/phone as a fallback; success state correctly hides the form and shows a card matching the site's `.card` pattern, ~17:1 contrast.

## Accessibility Evidence

**Contrast coverage pass** (enumerating pairings, cross-referenced against real hex values) surfaced a **second real, reproducible failure beyond the eyebrow bug**: `.stat` (`base.css:104-111`) and `.price-card-figure` (`base.css:363`) both set `color: var(--accent)` directly — the same raw gold-on-paper pairing that caused the original `.eyebrow` bug — computing to **1.56:1**, failing 4.5:1. This exists on `strength-and-conditioning.html` (the "50%" stat), `speed-and-agility.html`, `video-analysis.html` (9 instances), and every price figure on `pricing.html` (5 instances). **`plans/02` Phase 2 fixed this exact color-misuse pattern for `.eyebrow` but missed these two other components using the identical wrong token** — the underlying bug class (raw `--accent` on a light surface) was never fully swept, only the one instance the original audit happened to name.

- **Focus order** (home page, real Tab presses): matches visual reading order throughout, 19 stops traced through header → dropdown → hero CTAs, no unexpected jumps. The nav dropdown is a CSS-only `:focus-within` reveal that doesn't trap focus.
- **Keyboard reachability**: every tested primary action (nav links, hamburger toggle, CTAs, all contact-form fields, both radio groups) is reachable and activatable via real keyboard input, including correct native arrow-key navigation within radio groups.
- **Two real, pre-existing keyboard-trap-adjacent bugs found** (neither part of any of today's changes): (1) at mobile width, tabbing past the last open-menu item moves focus to a hero link that's still visually covered by the opaque menu overlay — confirmed via `elementFromPoint()`, a keyboard user loses visual track of focus; (2) `Escape` does not close the open mobile menu — no `keydown` handler exists for it.
- **ARIA landmarks: 3** (navigation "Primary", main, contentinfo) — zero explicit `role` attributes anywhere in the codebase, all implicit from semantic HTML. **No `banner` landmark and no `<header>` element exists anywhere on the site.**
- **Skip-link: present and confirmed working live** — first tab stop, correct off-canvas/on-focus positioning matching its CSS, target `#main` exists, and — confirmed live — activating it correctly resumes the next Tab from inside `<main>`, bypassing all 16 header stops. Minor gap: `#main` lacks `tabindex="-1"`, so a screen reader won't announce landing in the landmark at the exact moment of activation (works functionally on the very next Tab regardless).
- No project-wide custom focus style exists for links/buttons/the hamburger toggle — they rely on the browser's unstyled default ring (present, never suppressed, but not designed).
