# Scope — Gamechanger Football and Performance, re-audit

**Date:** 2026-07-24
**Type:** Re-audit (follow-up to `DESIGN-IS-2026-07-23/`, verdict REDESIGN at 11/30)

## What is being audited

The full live site: 13 static HTML pages at `/Users/azzop/Gamechanger Website/`
(root-level `.html` files, built by `build.py` from `content/*.html` +
`partials/*.html` + `pages.json`). No dev server — pages are opened directly
as `file://` URLs. Vanilla HTML/CSS/JS, zero build tooling beyond the Python
assembly script, GSAP + Lenis + SplitType + Forminit loaded via CDN `<script>`
tags.

Pages: `index.html`, `about.html`, `football.html`,
`strength-and-conditioning.html`, `speed-and-agility.html`, `coaches.html`,
`locations.html`, `school-holiday-camps.html`, `facility.html`,
`video-analysis.html`, `testing.html`, `pricing.html`, `contact.html`.

## Primary user and task

A parent or player in South West Sydney evaluating private football and
athletic-development training, deciding whether to inquire/book. Primary
task: understand what Gamechanger offers, build enough trust to reach out,
and successfully submit the waiting-list/contact form.

## Constraints

- Real business (Gamechanger Football and Performance, owner Brodie
  Clarkson) — no fabricated content, prices, or testimonials.
- Zero build tooling, vanilla stack — any fix must stay within that
  constraint.
- Design language derived from wolverineworldwide.com (primary reference)
  plus a supplementary motion-research pass (day1-run.webflow.io,
  podium.global) — not a copy of either, an original system in the same
  register.

## Why this audit is happening now

The prior audit (`DESIGN-IS-2026-07-23/`) scored 11/30, verdict REDESIGN,
driven primarily by principle #2 (Useful) scoring 0 — the contact form was
`method="get"` with no backend, silently dropping every real submission —
plus contrast failures, a CSS specificity bug, a missing reduced-motion
gate, and dead code.

Since then, three plans have been executed and committed to this repo (see
`git log`, and `plans/01-award-winning-motion-and-typography.md`,
`plans/02-redesign-conversion-layer.md`,
`plans/03-motion-refinement-from-reference-research.md` — `plans/02` and
`plans/03` each carry their own Final Phase verification section with
findings already written, worth reading directly rather than re-deriving
from scratch):

- **plans/01**: typography (General Sans replacing Archivo/Archivo Black),
  GSAP + ScrollTrigger motion engine, signature interaction details
  (magnetic buttons, card tilt, parallax, masked image reveals, sticky
  columns), an editorial/IA pass, cross-viewport validation.
- **plans/02** (addresses the REDESIGN verdict directly): contact form
  wired to a live, verified Forminit endpoint with loading/error/success
  states; `.eyebrow` contrast fixed on light surfaces; mobile nav-button
  CSS specificity bug fixed; magnetic-button/card-tilt/spotlight hover
  block gated on `prefers-reduced-motion`; 27 dead CSS classes/custom
  properties removed.
- **plans/03**: Lenis smooth-scroll (motion-gated, CDN-failure-safe),
  header hide-on-scroll-down/show-on-scroll-up, cursor-spotlight glow on
  card hover, parallax-strength calibration (verified already correct, no
  change made), page-transition polish.

## What this audit must do

Score all ten principles fresh and independently — do not assume the
claimed fixes worked; verify directly against the live rendered site with
the same evidentiary rigor as the original audit (computed styles, live
interaction, measured contrast, not assertions). Gather fresh evidence for
principles untouched by this session's work too (#1 Innovative, #5
Unobtrusive, #7 Long-lasting in particular), not only the ones `plans/02`
targeted. The question this audit answers honestly: did the score actually
move from 11/30, and by how much — not whether it should have.

## Tooling constraint (binding for all evidence gathering)

Live-site verification uses gstack's `browse` skill exclusively (per this
project's `CLAUDE.md`) — never `mcp__claude-in-chrome__*`. gstack drives a
**single shared headless browser session** — running more than one gstack
agent concurrently against it has previously produced corrupted, false
findings in this project (confirmed earlier this session). Any subagent
using gstack must run alone, never in parallel with another gstack-using
process.

## Reference

No new external competitor references for this pass — the design system
itself (Wolverine-derived tokens, GSAP motion language) is fixed; this
audit evaluates execution and completeness, not a new creative direction.
