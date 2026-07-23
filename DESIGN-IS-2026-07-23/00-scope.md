# Scope Lock

**Audited:** Gamechanger Football and Performance redesign — 13-page static
marketing site. Repo: `/Users/azzop/Gamechanger Website/` (pushed to
`github.com/azz-00-apps/gamechanger-website`). Live preview:
`http://localhost:8092` (Python `http.server`, run `build.py` first to
regenerate pages from `content/*.html` fragments if source was just edited).

**Primary user:** A parent or player (South West Sydney, youth/teen football)
evaluating whether to book a paid private training session or holiday camp.
Secondary: a returning client checking pricing, locations, or the waiting list.

**Primary task:** Understand what Gamechanger offers, trust that it's a real,
credible, professional operation, and reach a booking/enquiry action (the
`contact.html` form) with the right context already established (which
service, roughly what it costs).

**Constraints:**
- Stack: static HTML/CSS/vanilla-JS, zero build tooling, zero framework. GSAP
  + ScrollTrigger + SplitType loaded via CDN as of this session.
- Real business: real prices, real coach names/credentials, real addresses,
  real testimonials from named professional footballers. Content must never
  be invented — everything traces to `research/gamechanger/*.md` (verbatim
  extraction from the live predecessor site, gamechangerfootball.com).
- Brand: dark charcoal (`--gc-black #0A0A0A`) + gold accent
  (`--gc-gold-400 #E8C061`), full-bleed athlete photography, General Sans
  typeface (`css/tokens.css`).
- No deadline given; this is a design-quality checkpoint mid-project, not a
  pre-launch gate.

**What's already documented (read before scoring, not to re-derive):**
- `research/design-system.md` — full token rationale, including the
  typography change log (Archivo → General Sans) dated 2026-07-23.
- `plans/01-award-winning-motion-and-typography.md` — the 5-phase plan this
  session executed (typography, motion engine, interaction details, editorial
  pass, validation), including its own stated scope limits (e.g. Phase 4 was
  explicitly a partial pass, not exhaustive across all 13 pages).

**Reference/competitor named by the site owner:** wolverineworldwide.com
(explicitly cited as the design-language reference for type scale, spacing
rhythm, full-bleed photography, and motion restraint — NOT a literal
competitor, a style reference for a footwear holding company's corporate
site). Research already done: `research/wolverine/design-spec.md`.

**Audit surface:** the full site (13 pages), not a single screen — weighted
toward `index.html` (home) and `pricing.html` (highest-intent page, most
recently restructured) since those got the deepest hands-on verification
during the session that produced this build.
