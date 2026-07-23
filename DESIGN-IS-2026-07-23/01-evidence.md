# Evidence (consolidated from 5 parallel subagent reports)

Each item cites its source subagent and the underlying file:line. Full raw
reports are in the session transcript; this file condenses to what feeds
scoring.

## Structural

- **449 interactive elements** across 13 pages (422 `<a>`, 14 `<button>`, 12
  `<input>`, 1 `<textarea>`). Per-page: 31-37, except `contact.html` at 49
  (its form).
- **Max DOM nesting depth 4-5** (div/section chain only). 11/13 pages cap at
  4; `pricing.html` and `school-holiday-camps.html` reach 5. Not excessive
  for a component-driven marketing site.
- **Real component reuse, not accidental similarity:** `.reveal` × 227,
  `.card` × 59, `.btn-primary` × 73, `.statement` × 25, `.split` × 16,
  `.list-dash` × 10, `.price-card` × 6 — each verified present at 3+
  file:line citations with the shared `css/base.css` definition. This is a
  genuine, reused design-system, confirmed structurally.
- **Dead code:** 11/80 CSS classes (13.75%) defined in `css/base.css` never
  applied anywhere: `.on-dark`, `.surface-raised-dark`, `.grid-tight`,
  `.on-light`, `.mt-0`, `.mt-7`, `.mt-8`, `.mt-text`, `.mt-component`,
  `.max-w-prose-wide`, `.visually-hidden`. 16/83 custom properties (19.3%)
  in `css/tokens.css` unused or only referenced from already-dead classes
  (`--gc-charcoal-900`, `--gc-steel-500`, `--gc-paper-dim`, `--accent-tint`,
  `--space-1`, `--gutter-tablet`, `--ease-in-out`, `--duration-slow`,
  `--duration-reveal`, `--parallax-strength`, plus 6 transitively-dead via
  the classes above).

## Visual

- **Spacing scale:** base `--space-1`…`8` = 4/8/12/16/24/32/48/64px, plus
  fluid section rhythm 24-150px and gutter 20-48px (`tokens.css:111-138`).
  Cross-validated live (computed `.container` padding = 43.2px at 1440px,
  exact match to clamp() math).
- **Type scale:** `.display-xl` 52-160px, `.display-lg` 40-88px,
  `.heading-lg` 28-44px, `.heading-md` 22-30px, `.heading-sm` 18-20.8px,
  down to `.text-label` fixed 13px (`tokens.css:97-105`). Live-verified
  exact match at 1440px.
- **Color: 15-16 distinct hex values total**, all via named tokens. Zero
  stray hex literals found in `css/base.css` (`grep` confirmed) or any
  `content/*.html`. One RGB-literal-not-token-reference found:
  `.site-nav.is-scrolled` background `rgba(10,10,10,.88)` duplicates
  `--gc-black`'s channels without referencing the token
  (`css/base.css:161`) — cosmetic inconsistency, not a real color-system
  violation.
- **Contrast — confirmed FAIL:** `.eyebrow` (`--accent` #E8C061 gold) on
  `--surface-light` (#F5F3EE) = **1.56:1**, catastrophically below the
  4.5:1 AA floor. Confirmed live via computed styles at 4 file:line
  locations (`index.html:68,102`, `contact.html:68,143`) — this is a real,
  rendered failure, not a theoretical one. The dark-surface equivalent
  (`.statement-eyebrow`) correctly overrides to a lighter gold and passes;
  the light-surface path has no equivalent override.
- **Second bug found independently by both Visual and Accessibility
  subagents:** at ≤1140px, `.nav-mobile-book .btn-primary` (the mobile
  flyout's "Book Now" button) computes `color: rgb(201,201,201)` — muted
  gray — instead of its own intended `var(--accent-contrast)` (#141414
  near-black), because `.nav-links a` (specificity 0,1,1) beats
  `.btn-primary` (0,1,0) in cascade order (`css/base.css:182` vs `:277`).
  Live-confirmed via `$B css` at 390×844. Result: low-contrast gray text on
  a gold pill button, on the one nav CTA every mobile visitor sees.
- **Lowest contrast ratio actually used as running body text: 5.73:1**
  (`--text-on-dark-faint` #8A8A8A on #0A0A0A — footer copyright, policy
  paragraphs, address lines). Passes AA, fails AAA. The 1.56:1 gold-on-cream
  failure above is worse but confined to label/eyebrow use, never body
  copy.
- **States checklist (contact.html form):** empty-state styling absent (no
  placeholders), loading state absent (no JS submit handling exists at
  all), error state absent (zero `.error`/`:invalid` CSS), success state
  absent (form GETs to itself, no confirmation), focus state present only
  for form fields + skip-link (`css/base.css:480-483,541` — buttons/nav
  links/radios fall back to unstyled browser-default focus, which still
  functions but isn't part of the design system), disabled state absent
  (never needed — no async actions exist to disable during).

## Copy & Honesty

- **All "elite/best/world-class"-style claims (28+ instances) trace
  verbatim to `research/gamechanger/*.md`** — the real business's own
  pre-existing copy, not invented or embellished during this rebuild.
  Confirmed pair-by-pair.
- **No dark patterns found.** No forced continuity, no hidden costs
  (pricing page explicitly discloses "Rates vary depending on coach"), no
  confirmshaming. 3 "demand"/"strong demand"/"only available to our
  players" phrases found, all sourced verbatim, none are fabricated
  urgency.
- **Pricing accuracy: 5/5 priced cards match `research/gamechanger/
  pricing.md` exactly**, including the one card with a genuinely missing
  price (a documented bug on the original site) correctly substituted with
  an "Enquire Now" CTA rather than a fabricated number.
- **Real jargon, unexplained on first use:** S&C (used three different ways
  across the site — spelled out in nav, bare in buttons), NPL, TSP, NSWIS,
  ASCA, VALD — 6+ acronyms a first-time parent visitor won't know.
- **Most serious finding of the entire audit: the contact form does not
  functionally submit.** `<form action="contact.html" method="get">`
  (`contact.html:88`) — a real submit just reloads the page with form
  fields appended as a URL query string. No email is sent, no data is
  captured, no confirmation shown. `js/main.js` has zero
  fetch/XHR/form-handling code. This is the destination for essentially
  every primary CTA on the site (73 `.btn-primary` instances, the vast
  majority pointing here) — "Book Now," "Start Now," "Enquire Now," "Book A
  Test" all funnel to a form whose "Send" button does nothing. This
  pre-dates this session's work (inherited from the very first build) but
  was not caught or flagged until this audit.
- Minor: 4 "Learn More" links to Instagram masterclass posts disclose
  "opens in a new tab, on Instagram" only in an `aria-label` — sighted users
  get no visible cue they're leaving the site.

## Weight & Friction

- **Total JS: 62.6KB** (GSAP 29KB + ScrollTrigger 18KB + SplitType 4.5KB +
  main.js 11KB), byte-verified against on-disk files and CDN `curl`, not
  estimated.
- **Total page weight (home): 651KB**, dominated by 3 unoptimized
  Wix-hosted photos (498KB of the total).
- **13 network requests** on initial load of the home page. Zero
  popups/modals/cookie-banners/chat-widgets found anywhere in the codebase.
- **Zero continuously-running animations.** All 8 identified motion effects
  are gated by scroll position, hover, or click — confirmed via full
  `js/main.js` read, no `setInterval`/autoplay/carousel code exists
  anywhere.
- **Real gap found: the magnetic-button/card-tilt hover effects
  (`main.js:179-228`) have no `prefers-reduced-motion` check at all** —
  gated only by `(hover: hover) and (pointer: fine)`. A desktop mouse user
  with OS-level reduced-motion enabled still gets the full GSAP hover
  easing. (The scroll-triggered reveal/parallax/split-headline systems DO
  correctly respect reduced-motion via `gsap.matchMedia()`.)
- Dead code confirms structural finding: `prefersReducedMotion` variable in
  `main.js:43` is declared, never read anywhere else in the file.

## Accessibility

- **WCAG contrast: 10/11 token pairings pass AA**; the sole failure is the
  same `.eyebrow`-on-light 1.56:1 gap found by the Visual subagent
  independently — cross-confirmed by two separate agents.
- **No tab-order/DOM-order mismatch found.** Zero `tabindex` or CSS `order`
  properties anywhere in the codebase; snapshot-verified DOM order matches
  visual order on the home page.
- **Every primary action is a real, natively-keyboard-reachable element**
  (`<a href>`, `<button>`, `<input>`) — zero synthetic click-handler
  div/span substitutes found anywhere.
- **Skip-link correctly implemented**: real target (`#main` exists),
  visually-hidden-until-focus CSS pattern (not always-hidden, not
  always-visible) — confirmed via both source and live computed `top`
  value.
- **Missing `<header>` element** → no `banner` landmark exists anywhere on
  the site (implicit or explicit). `<nav>` (labeled), `<main>`, and one
  top-level `<footer>` landmarks are present and correct.
- **Image alt text: 42/42 (100%)** non-empty, descriptive, zero
  filename-derived alt text — genuinely strong, verified with specific
  positive examples.

## Known gaps across all 5 reports

- Deep verification (contrast, focus order, DOM structure) was concentrated
  on `index.html`, `pricing.html`, `contact.html`, and `about.html`/
  `coaches.html` as representative pages; the other 8 pages share the same
  `partials/`+`css/` system so findings likely generalize, but weren't
  independently re-verified page-by-page.
- No live screen-reader pass (VoiceOver/NVDA) was performed — conclusions
  rest on DOM semantics and the accessibility-tree snapshot.
- Text-over-photograph contrast (hero `.statement` sections, protected by a
  scrim+shadow stack rather than a flat background) wasn't computed — no
  single background hex exists to pair against.
- Real-world CDN latency for the 3 GSAP-family scripts wasn't measured
  (local dev server has near-zero network latency); only local
  parse/domReady timing is verified.
