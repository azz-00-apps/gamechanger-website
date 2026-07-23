# Gamechanger Football — Design System

Synthesized from `research/wolverine/design-spec.md` (Wolverine Worldwide's editorial,
monochrome, massive-type design language) applied to Gamechanger Football and
Performance's real brand (South West Sydney youth football/S&C academy, owner Brodie
Clarkson). Every page must use only these tokens/components — no one-off styles.

## Brand continuity (what we keep from the live site)

- **Accent gold `#E8C061`** — the exact computed color of the live site's "GET STARTED"
  button. This is real brand equity (their pill CTAs, their divider lines). We keep it,
  but use it the way Wolverine uses color: sparingly, as a signal (primary CTA, active
  state, key stat), never as a section fill. "A little goes a long way."
- **Pill-shaped buttons** — the live site's CTAs are already pill-shaped. Kept.
- **Dark, athletic mood** — the live site is already charcoal-on-dark. Kept and
  sharpened, alternated with a warm light "paper" surface for long-form reading
  (coach bios, pricing, form pages) — Wolverine alternates dark statement sections
  with light content sections rather than running all-dark for 13 pages straight.

## What we take from Wolverine

- Massive display type as a recurring **section-break device**, not just a homepage
  hero (their 168px "Creating a shared impact." pattern, reused throughout interior
  pages).
- Negative letter-spacing at large sizes (type feels controlled, not loud).
- Full-bleed photography with white type sitting directly on the image (no card/box
  behind text) — legibility from image darkness, not chrome.
- Generous section rhythm (90–150px, fluid).
- Restrained monochrome UI chrome; color comes from photography and one accent, not
  background fills.
- Two-column text+CTA layout as a recurring content pattern.

## What we deliberately drop from the live site

- The italic script subhead treatment and mixed casing — replaced with one disciplined
  grotesque family at every scale, matching Wolverine's "one typeface, binary weight"
  restraint. Reads more premium, less template-y.
- Non-functional CTAs found in research (Pricing page "ENQUIRE NOW", Video Analysis
  "Start Now" / "Book a Session" — confirmed dead in `research/gamechanger/pricing.md`
  and `video-analysis.md`). Every CTA in the rebuild must be a real `<a href>`.

## Typography

- **Display — Archivo Black** (900): hero statements, section-break headlines, big
  stats. Free substitute for the live site's licensed `lulo-clean-w01-one-bold` —
  same bold geometric/scoreboard character, same "coach shouting a headline" energy.
- **Body/UI — Archivo** (400 / 600 / 700): nav, body copy, buttons, captions. Same
  family as display (one typeface family site-wide, per Wolverine's discipline), just
  the non-black cuts.
- Google Fonts, self-hosted or `@font-face` from Google's CDN — both free, no licensing
  risk (unlike the live site's paid Wix/Lulo Clean webfont).
- Negative tracking that tightens with size: -0.01em body → -0.03em headings →
  -0.045em display statements (mirrors Wolverine's -2%/-3%/-5% progression).
- No forced uppercase via CSS on body copy; nav and eyebrow labels stay uppercase as a
  deliberate athletic/scoreboard accent (kept from the live brand), tracked wide
  (+0.08em) to read as a label, not a shout.

## Color

| Token | Hex | Use |
|---|---|---|
| `--gc-black` | `#0A0A0A` | Primary dark surface |
| `--gc-charcoal-800` | `#1B1B1B` | Raised dark surface (cards on dark) |
| `--gc-charcoal-700` | `#2A2A2A` | Borders/dividers on dark |
| `--gc-steel-400` | `#8A8A8A` | Muted text on dark |
| `--gc-paper` | `#F5F3EE` | Light surface (warm off-white, not stark white — avoids clinical feel) |
| `--gc-ink` | `#141414` | Text on light |
| `--gc-ink-muted` | `#5B5A56` | Muted text on light |
| `--gc-white` | `#FFFFFF` | Text on dark, accent-contrast never used here |
| `--gc-gold-300` | `#F2DEA8` | Gold tint (hover highlight, subtle backgrounds) |
| `--gc-gold-400` | `#E8C061` | **Primary accent** — real brand value, CTAs, active states, key numbers |
| `--gc-gold-600` | `#B8933E` | Gold pressed/hover state, accent text on light (passes contrast) |

Accent always pairs with **black text** on top (`#141414`), matching the live site's
existing button contrast — never white-on-gold.

## Layout

- Fluid container gutter `clamp(1.25rem, 4vw, 3rem)`, no hard max-width cap below
  1600px — full-bleed imagery, consistent gutter (Wolverine's approach, not a boxed
  1200px "marketing site" column).
- Section rhythm: `--space-section` fluid `clamp(4rem, 3rem + 6vw, 9.375rem)` between
  major sections (matches Wolverine's 90–150px measured range).
- Statement sections (full-bleed dark or image, massive headline) used as dividers
  between content sections on every interior page — not just the homepage hero.

## Components

- **Primary button** — solid gold pill, black text, Archivo 700, arrows are optional
  flourish kept minimal (single `→` suffix on hover-shift, not flanking both sides —
  simpler than Wolverine's double-arrow, matches the live brand's existing single-arrow
  cue on "BOOK NOW").
- **Secondary/ghost button** — Wolverine's glass pattern: `rgba(255,255,255,.08)` fill,
  `1px` white/10% border, pill radius, white text — used for secondary nav-style CTAs
  on dark surfaces.
- **Cards** — `--gc-charcoal-800` fill on dark / white fill on light, `1px` hairline
  border, `6px` radius (confident, near-square — engineered feel, deliberately
  sharper than Wolverine's soft 16px glass, to read "training facility" not
  "lifestyle brand").
- **Nav** — fixed, transparent over the hero, solidifies to `--gc-black` at 92% opacity
  with blur after scroll (Wolverine's is permanently transparent since their hero is
  always full-height; ours solidifies on scroll because interior pages need a readable
  nav over varied content).
- **Stat/number blocks** — Archivo Black numerals, gold, for pricing figures, testimonial
  credentials, and program stats — echoes Wolverine's bold `body-md` treatment for lead
  numbers.

## Motion

- Entrances: fade + 24px rise, `cubic-bezier(.16,1,.3,1)`, 500–700ms, staggered by
  ~80ms per element — restrained, no bounce (matches Wolverine's measured feel).
- Hover: buttons darken/lighten one step + 150ms ease, no scale-jiggle.
- Respect `prefers-reduced-motion`.
- **Parallax** (`[data-parallax]`, added in the motion-system pass) — statement/card
  imagery drifts ±48px via `transform: scale(1.12) translate3d()` as its host section
  crosses the viewport center. rAF-throttled, IntersectionObserver-gated so only
  on-screen elements are touched, transform-only (no CLS possible). Disabled under
  `prefers-reduced-motion` and at ≤768px — see `js/main.js`.
- **Masked image reveal** (`.reveal-image`) — a `clip-path` wipe for photography,
  parallel to but visually distinct from the text fade-rise. Same visible-by-default
  progressive-enhancement contract as `.reveal`.
- **Sticky columns** (`.split-sticky`, desktop only) — the media column in a `.split`
  pins while the text column scrolls past, when the text column is meaningfully
  taller than the image. Pure CSS `position: sticky`, so it can never hijack or trap
  scroll. Applied selectively (About's Football section) where there's enough content
  to give it a real, not-forced pin range — not applied blanket-wide.

## Spacing system

Full numbered scale in `css/tokens.css` (`--space-1` through `--space-8`, plus
semantic `--space-text`/`--space-component`/`--space-section-*`). Every inter-element
margin in `content/*.html` should be a `.mt-N` utility tied to this scale — an audit
during the motion-system pass found 234 arbitrary inline `margin-top` values (7
different numbers with no systematic basis) and consolidated them onto 5 scale tiers.
Editorial/body text width is capped via `--prose-max` (62ch) so lines never run
edge-to-edge at wide viewports, applied by default to `.split` column paragraphs.
