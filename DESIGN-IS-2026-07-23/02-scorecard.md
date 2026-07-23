# Scorecard

Scored against the anchors verbatim, worst-instance (not average), tie
resolved to the lower score.

```
1. Good design is innovative — Score: 1/3
   Evidence: 01-evidence.md "Structural" — explicit, named reference
   (Wolverine Worldwide) adapted, not invented; motion techniques (GSAP
   scroll-reveal, magnetic buttons, cursor-tilt cards, word-split
   headlines) are a well-established 2024-2026 "premium agency site"
   convention, not novel.
   Justification: refreshes an existing pattern competently but doesn't
   advance the form — this exact technique-bundle is common on
   Awwwards/FWA-style sites right now.

2. Good design makes a product useful — Score: 0/3
   Evidence: 01-evidence.md "Copy & Honesty" — `contact.html:88`
   `<form action="contact.html" method="get">`, zero JS submit handling,
   confirmed via full `js/main.js` read. 73 `.btn-primary` instances
   (Structural evidence) overwhelmingly funnel here.
   Justification: the primary task (submit an enquiry) is not completable
   via the site's own primary, most-repeated mechanism. Phone/email
   alternates exist but the designed, dominant path is decorative.

3. Good design is aesthetic — Score: 2/3
   Evidence: 01-evidence.md "Visual" — single consistent spacing/type/color
   system, zero stray hex literals in CSS, genuine component reuse
   (Structural: `.card`×59, `.btn-primary`×73). Against that: the 1.56:1
   `.eyebrow`-on-light contrast failure is visually jarring in its own
   right (not just a checker number — gold text nearly disappears into
   cream), plus the mobile nav-button specificity bug and one
   rgba-not-token duplication.
   Justification: the system is real and coherent, but 2-3 concrete,
   locatable inconsistencies keep this off a 3.

4. Good design makes a product understandable — Score: 1/3
   Evidence: 01-evidence.md "Copy & Honesty" — 6+ unexplained acronyms
   (S&C, NPL, TSP, NSWIS, ASCA, VALD), inconsistent S&C expansion across
   nav vs. buttons, one ambiguous CTA ("Experience" as a stand-alone
   button label).
   Justification: more than 2-3 controls/terms are unclear to a first-time
   parent visitor, though primary nav and top-level CTAs (Book Now, About,
   Pricing) are all clear on their own.

5. Good design is unobtrusive — Score: 2/3
   Evidence: 01-evidence.md "Visual"/"Weight & Friction" — restrained
   motion (all 8 effects scroll/hover/click-gated, zero autoplay), single
   accent color, generous spacing.
   Justification: chrome (persistent nav, cards, buttons) is real and
   visible but quiet and well-executed — doesn't compete with content, but
   doesn't fully recede either.

6. Good design is honest — Score: 1/3
   Evidence: 01-evidence.md "Copy & Honesty" — 28+ superlative claims all
   verbatim-sourced from the real business's own prior copy (a genuine
   positive); against that, the "Send" button on the primary form is a
   real, if unintentional, false promise — it implies the enquiry reaches
   the business and it does not.
   Justification: not a classic dark pattern (no scarcity, no hidden
   cost, no forced continuity), but one genuine label→behavior mismatch on
   the site's most consequential control keeps this off a clean pass.

7. Good design is long-lasting — Score: 1/3
   Evidence: 01-evidence.md "Weight & Friction"/Structural — the specific
   bundle of magnetic buttons + cursor-tilt cards + scroll-scrubbed
   parallax + word-split headline reveals.
   Justification: this exact combination is a highly recognizable,
   dateable 2020s "creative site" convention (2-3+ trend markers) — likely
   to read as "of its time" well before Rams' 3-years-out bar.

8. Good design is thorough down to the last detail — Score: 0/3
   Evidence: 01-evidence.md "Visual" states checklist — empty, loading,
   error, and success states are ALL absent for the one meaningfully
   interactive surface (the contact form); focus state exists only for
   form fields + skip-link, not buttons/nav/radios (falls back to
   unstyled browser default, which functions but isn't part of the
   system).
   Justification: 4+ states missing on the surface that matters most,
   matching the rubric's explicit 0 threshold.

9. Good design is environmentally friendly — Score: 2/3
   Evidence: 01-evidence.md "Weight & Friction" — 62.6KB total JS
   (comfortably <100KB), 0 idle/autoplay animation, but a confirmed
   `prefers-reduced-motion` gap on the magnetic-button/card-tilt hover
   effects (gated only by hover-capability, not motion preference).
   Justification: excellent weight, but reduced-motion isn't fully honored
   everywhere it needs to be — keeps this off a clean 3.

10. Good design is as little design as possible — Score: 1/3
    Evidence: 01-evidence.md "Structural" — 11/80 CSS classes (13.75%) and
    16/83 custom properties (19.3%) defined but never used anywhere in the
    shipped site.
    Justification: well past the "≤2 removable elements" bar for a 2; the
    live, rendered page itself isn't cluttered or duplicated (keeping this
    off 0), but the codebase carries meaningfully more unused surface than
    "as little as possible" implies.
```

**Total: 11/30**
