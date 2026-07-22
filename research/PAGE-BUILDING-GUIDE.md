# Building a page — guide for content/<slug>.html

You are writing ONE file: `content/<slug>.html`. This is an HTML **fragment** only —
no `<!doctype>`, `<html>`, `<head>`, `<body>`, `<nav>`, or `<footer>`. The build
script (`build.py`) wraps your fragment with the shared header/footer automatically.
Do not touch `partials/header.html`, `partials/footer.html`, `css/tokens.css`, or
`css/base.css` — those are locked and shared by every page.

**Read `content/home.html` first.** It's the finished reference implementation of
this design system — copy its patterns (statement sections, split layout, card
grids, reveal classes) rather than inventing new ones.

## Source of truth

- **Content**: `research/gamechanger/<slug>.md` — the complete verbatim inventory of
  the live page. Use the real copy. Do not invent stats, prices, names, or quotes
  that aren't in that file. If something is thin or missing, keep it short rather
  than padding with invented claims.
- **Images**: `research/image-manifest.json` — real photo URLs for your page, already
  sized as `wide_1900x1150` (hero/full-bleed), `portrait_1000x1300` (split-layout
  card), and `square_1100x1100` (grid cards). Use these `alt`-worthy real Gamechanger
  photos; don't invent placeholder/stock imagery. If your page's manifest entry has
  zero photos, reuse a home-page hero photo (see `content/home.html`) rather than
  leaving a section imageless.
- **Navigation targets**: every internal link must point to one of the 13 real pages
  (see `pages.json` for the full filename list) — home is `index.html`. Never link to
  a page that doesn't exist in that list.

## Known live-site bugs — fix, don't reproduce

- Pricing page: the "S&C - DIY Gym Program" card has no price in the source data
  (confirmed missing, not an extraction error). Show the card with its real
  description, and instead of a fabricated number use a working "Enquire Now" link
  to `contact.html` in place of a price figure.
  All other 5 pricing cards DO have real prices — use them exactly as given.
- Every CTA button must be a real `<a href="...">` to a real page. The live site has
  two confirmed dead buttons (Pricing's top "Enquire Now", Video Analysis's "Start
  Now"/"Book a Session") — don't reproduce that, wire them to `contact.html`.

## Available design system classes

Typography: `.eyebrow` (gold label + rule), `.display-xl` / `.display-lg` (Archivo
Black statement headlines), `.heading-lg` / `.heading-md` / `.heading-sm`, `.body-lg`,
`.body-muted`, `.stat` + `.stat-label` (big gold numerals).

Layout: `.container`, `.section` / `.section-lg` (vertical rhythm), `.split` (2-col,
stacks on mobile), `.grid` + `.grid-2` / `.grid-3` / `.grid-4`, `.surface-dark` /
`.surface-light` (pick per section for rhythm — don't run the whole page one color).

Statement sections (full-bleed photo + massive headline, use for page hero and at
least one mid-page break): `.statement` (+ `.statement-full` for 100vh) containing
`.statement-media > img`, `.statement-scrim`, then `.container` with your content.

Components: `.btn.btn-primary` (solid gold, primary action), `.btn.btn-ghost` (dark
surfaces) / `.btn.btn-ghost-light` (light surfaces), `.card` / `.card-on-dark`,
`.card-media` (aspect-ratio via inline style, holds an `<img>`), `.testimonial` +
`.testimonial-quote` + `.testimonial-attribution`, `.price-card` +
`.price-card-title` + `.price-card-figure`.

Animation: add `class="reveal"` to any section-level element you want to fade/rise in
on scroll — it's already wired up in `js/main.js`, no extra markup needed.

## Structure every page should have

1. A `.statement` hero (page title as `.display-lg`/`.display-xl`, one line of real
   supporting copy, a primary CTA).
2. The page's real content in `.section` blocks, alternating `.surface-light` /
   `.surface-dark` for rhythm — use `.split`, `.grid-3`, or `.card` layouts as fits
   the actual content (pricing → price cards; coaches → grid of people; testimonials
   → testimonial cards; plain copy → split with a photo).
3. A closing CTA moment before the shared footer (can be brief — the footer already
   has its own CTA, don't be redundant, but the page shouldn't just stop dead).

Keep it consistent with `content/home.html` in spirit and craft — same restraint,
same type discipline, same "massive statement + real photography" rhythm — while
fitting the actual content of your specific page.
