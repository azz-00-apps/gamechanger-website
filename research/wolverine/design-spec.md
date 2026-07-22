# Wolverine Worldwide — Design Language Spec

Source pages audited (all verified live, 200 OK, desktop viewport 1440x900 unless noted):
- https://wolverineworldwide.com/ ("Home | Wolverine Worldwide")
- https://wolverineworldwide.com/about-us ("About us | Wolverine Worldwide")
- https://wolverineworldwide.com/brands ("A portfolio built for every step. | Wolverine Worldwide")
- https://wolverineworldwide.com/responsibility ("Responsibility | Wolverine Worldwide")

Note: this is a **pure visual/CSS reference** — no business content from Wolverine Worldwide should carry into the new design.

---

## 1. TYPOGRAPHY

**Font family (all text on the site, no exceptions found):** `ABCDiatype, sans-serif`
- ABC Diatype is a proprietary grotesque (ABC Dinamo foundry). It is not free.
- **Closest free/Google Fonts substitutes:** **Inter** (safest, near-identical metrics for UI text) or **Public Sans** / **Söhne-alike** options. For a tighter match to the grotesque, condensed feel of the display sizes, **"Founders Grotesk"-style** substitutes work, but for a Google Fonts-only stack use **Inter** for everything (body + display) — it holds up at both 15px UI text and 168px hero display sizes.

**Type scale (computed, desktop 1440px viewport):**

| Class | Size | Weight | Letter-spacing | Line-height | Notes |
|---|---|---|---|---|---|
| `.display-lg` (hero, scales to `md:display-xl`) | 168px | 700 | -8.4px (-5%) | 132.72px (0.79x) | Massive hero headline, used repeatedly as full-bleed section headline ("Creating a shared impact.", "Build Better With Us") |
| `.heading-md` (responsive down to `sm:heading-xs`) | 33px | 700 | -0.99px (-3%) | 33px (1x) | Section headers ("Our Heritage.", "Our Leaders.") |
| `.heading-2xs` | 24px | 700 | — | — | Sub-section labels ("Foundation Pillars", "Resources") |
| `.body-md` | 24px | 700 | -0.72px (-3%) | 24px (1x) | Bold lead paragraphs |
| `.body-sm` | 15px | 400 | -0.3px (-2%) | 18px (1.2x) | Button labels, small UI text |
| Body copy (`p`, `.c-accordion_title`, `.c-card_title`) | 19px | 400 | ~0 | 22.8px (1.2x) | Running paragraph text |
| Base `body` | 16px | 400 | normal | 24px (1.5x) | Browser default fallback, overridden per component |

**Casing:** No `text-transform` used anywhere tested (all computed `none`) — every heading and label is set in natural sentence/title case as authored, never CSS-forced uppercase.

**Tracking pattern:** Letter-spacing tightens proportionally as size increases — roughly **-2% at small sizes, -3% at mid sizes, -5% at the largest display size.** Always negative (never expanded/loose tracking).

**Weight usage:** Binary — either 400 (regular, body copy/accordion/card text) or 700 (bold, all headings and emphasis). No use of 300/500/600/800/900 detected.

---

## 2. COLOR

All values are exact computed CSS from the live site.

| Hex | RGB | Usage |
|---|---|---|
| `#FFFFFF` | rgb(255,255,255) | Primary text-on-dark, button labels, H1 |
| `#000000` | rgb(0,0,0) | Default body text color (browser default; overridden per component) |
| `#010101` | rgb(1,1,1) | Near-black section backgrounds (dark full-bleed panels) — used most frequently (23 occurrences) |
| `#757575` | rgb(117,117,117) | `.text-gray-600` utility — secondary/muted text (timeline card body copy) |
| `#EAEFF2` | rgb(234,239,242) | Light cool-gray section background (subtle off-white panel) |
| `#CCCCCC` | rgb(204,204,204) | Mid-gray, dividers/disabled states |
| `#30363C` | rgb(48,54,60) | Dark slate — secondary dark surface, distinct from pure black |
| `rgba(0,0,0,0)` | transparent | Body, html, header, nav, most section wrappers — the site is **imagery-driven, not color-block driven**; backgrounds come from photography, not fills |
| `rgba(255,255,255,0.1)` | white 10% | Ghost/glass button fill (`.c-button_bg`) |
| `rgba(255,255,255,0.3)` | white 30% | Secondary overlay tint |
| `rgba(0,0,0,0.5)` / `rgba(0,0,0,0.2)` / `rgba(0,0,0,0.8)` | black 50/20/80% | Photo scrims/overlays for text legibility over imagery, varying darkness by need |

**Palette character:** Fundamentally monochrome (black/white/gray) with **zero brand hue in UI chrome** — all color comes from product/lifestyle photography. This is a deliberate "let the imagery be the color" strategy.

---

## 3. LAYOUT / GRID

- **Container:** `.container` runs the full viewport width at 1440px (no hard max-width cap reached even at that width) with **48px fixed left/right padding** — effectively full-bleed with a consistent gutter, not a centered fixed-width column.
- **Section vertical rhythm — fluid spacing scale confirmed at two steps:**
  - `.my-fluid-2xl` = 90px top/bottom margin
  - `.my-fluid-3xl` = 150px top/bottom margin
  - (implies a full fluid scale, likely xs→3xl, that grows/shrinks with viewport — "fluid" naming suggests `clamp()`-based responsive spacing)
- **Grid:** Content is organized into named custom-element modules rather than generic `<section>` tags: `c-hero-home`, `c-text-two-columns`, `c-standout-image-galaxy`, `c-large-card`, `c-market-snapshot`, `c-carousel`, `c-timeline-card`, `c-accordion`, `c-card`, `c-brands_galaxy`. Two-column text layout (`c-text-two-columns`) is a recurring pattern for headline + supporting copy + CTA.
- **Whitespace density:** Very generous — 90-150px between major sections, large single-column type blocks, imagery given full width before text resumes.

---

## 4. NAVIGATION

- **Header:** `position: fixed`, `background: rgba(0,0,0,0)` (fully transparent) — floats over the hero image with no scroll-triggered solid-fill state observed in the static computed styles captured.
- **Logo:** SVG logotype (`.c-header_logo`), links to `/`, accompanied by an `sr-only "Home"` label for accessibility.
- **Primary nav items:** Home, About, Brands, Careers, Responsibility, Investors, plus a "Menu +" toggle for a secondary/mega menu.
- **Mega-menu pattern:** Hovering/expanding a top item (e.g. "Responsibility") reveals a flyout with a headline ("Together we will build a better future from the ground up"), a "View →" link, and sub-navigation with **600x400 thumbnail images** per link (Purpose / Planet / Product) — navigation is imagery-supported, not text-only.
- **Footer:** Repeats primary nav (About, Brands, Careers, Responsibility, Investors, Contact), lists all 11 portfolio brand wordmarks in a row, social handles, legal links, and a cookie-consent banner (Accept all / Reject all / Preferences).

---

## 5. HERO / IMAGERY

- **Full-bleed on desktop** with a near-zero inset: hero wrapper uses `md:px-2 md:pt-2` (a couple of px units of padding, essentially edge-to-edge) — photography reads as truly full-width.
- **Text-over-image overlay:** White type set directly on photographic/dark imagery, no card or scrim box behind the text — legibility comes from image darkness/contrast, reinforced by black overlay tints (0.2–0.8 alpha) layered onto photos elsewhere on the site.
- **Massive display type as a recurring hero device:** 168px headlines reused as full-bleed section breaks throughout interior pages (Responsibility: "Creating a shared impact.", "A path toward lower impact.", "Responsibility starts at the source.", "Build Better With Us") — not just on the homepage. This is a core, repeated pattern: huge centered display statement as a section divider.
- **Animation on load/scroll:** Hero headline is split into per-line `<div>`s, each individually transform/opacity animated in (`data-hero-home="title"`, `anim-text` class reused site-wide on headings) — a staggered text reveal is a consistent motion signature, not a one-off.
- **Card imagery:** 600x400 crop-center webp thumbnails used in mega-menu; large photographic cards (`c-large-card`, `c-standout-image-galaxy`) elsewhere.

---

## 6. COMPONENTS

**Buttons (`.c-button`):**
- Outer `<a class="c-button">` has zero padding/border-radius itself — all visual styling lives in a child `.c-button_bg` div (a glass panel: `background: rgba(255,255,255,0.1)`, `border-radius: 16px`) sitting behind a `.c-button_inner` flex row.
- Label (`.c-button_label`): 15px / weight 400 / -0.3px tracking, **no uppercase**.
- Arrow glyphs (→) flank the label on both sides as separate `.c-button_icon` spans (aria-hidden), giving a "→ Label →" reading that likely animates the arrows on hover.
- `transition: all` set on the button (no resolved concrete duration/easing from computed style — likely driven by a CSS custom property).
- **Shape:** soft-rounded rectangle (16px radius), not a pill, not square — frosted/translucent fill rather than solid brand-color fill.

**Cards:** `c-large-card`, `c-standout-image-galaxy`, `c-card` (Community Initiatives) — large photographic cards with a title (19px/400) and minimal chrome, "View →" link pattern reused for card CTAs.

**Accordion:** `c-accordion` used repeatedly for expandable content groups (Foundation Pillars, Climate/Energy/Waste/Packaging, Human Rights/Materials/Supply Chain) — title at 19px/400 weight, border currently 0px (likely appears on hover/open state).

**Timeline:** `c-timeline-card` — used for the About Us company history (1883→2025), each card titled with year + headline (24px/700) plus a gray (#757575) body paragraph.

**Carousel:** `c-carousel` with explicit "Prev." / "Next" text button controls (not icon-only) for the Latest News module.

**Footer structure:** Multi-column nav links + full brand wordmark list + social row + legal/compliance links + cookie banner, all in the same transparent/dark treatment as the rest of the site.

---

## 7. MOTION

- `.anim-text` class applied broadly to headings across all four pages — confirms a **site-wide scroll-reveal text animation system**, not page-specific.
- Hero title lines: individually wrapped `<div>`s with inline `transform: translate(0px,0px)` and `opacity: 1` styles present at rest, implying a from-offset/from-transparent entrance animation on load (GSAP-style stagger, one line at a time).
- `.c-button` computed `transition: all` — a generic all-property transition is applied (specific duration/easing not resolvable from computed CSS shorthand; treat as a fast ~200–300ms ease default for the redesign, matching typical patterns for glass-button hover states).

---

## 8. MOOD

Confident, editorial, and image-led — Wolverine Worldwide's corporate site behaves like a fashion/lifestyle magazine rather than a typical B2B parent-company page: massive (168px) black-and-white display typography breaks up long-scroll pages into full-bleed statement moments, while all color is deliberately withheld from the UI and left entirely to photography. The overall feel is monochrome, spacious, and restrained — generous whitespace (90–150px section gaps), soft-glass ghost buttons instead of solid brand-color CTAs, and a single grotesque typeface (ABC Diatype / Inter-equivalent) used at every scale from 15px labels to 168px headlines, with tight negative tracking throughout to keep even the largest type feeling controlled rather than loud.
