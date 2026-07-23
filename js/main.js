// Gamechanger Football — shared site behavior. Loaded on every page.
(function () {
  'use strict';

  // Nav solidifies on scroll
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============ MOTION SYSTEM (GSAP + ScrollTrigger) ============
  //
  // Safety contract, unchanged in spirit from the vanilla system this
  // replaces: content must NEVER depend on a third-party script loading
  // to become visible. GSAP is now a CDN dependency (see build.py), which
  // is strictly more fragile than the zero-dependency system before it —
  // so the very first thing this block does is confirm gsap/ScrollTrigger
  // actually loaded. If they didn't (CDN down, blocked, slow network),
  // every element listed below is left in its plain, fully-visible CSS
  // default state (see base.css — none of these selectors carry
  // opacity:0 or clip-path in the stylesheet anymore; GSAP is the only
  // thing that ever hides them, via gsap.set(), and only in this branch).
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapReady = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (gsapReady) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add(
      {
        motionOK: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 769px) and (prefers-reduced-motion: no-preference)'
      },
      function (context) {
        var motionOK = context.conditions.motionOK;
        var desktop = context.conditions.desktop;

        // --- Text reveal: fade + rise, batched so elements entering the
        // viewport together animate as one coordinated group rather than
        // firing independently. Runs even under reduced-motion, just with
        // a near-instant duration (base.css's own global reduced-motion
        // override doesn't touch GSAP-driven inline styles, so this is
        // handled explicitly here too).
        // Elements carrying both .reveal and .split-headline get the
        // word-level split animation instead, but ONLY on desktop where
        // that branch actually runs (see below) — on mobile/reduced-
        // motion they fall through to this plain block-level reveal, so
        // they're never left with zero entrance treatment either way.
        var revealEls = gsap.utils.toArray('.reveal').filter(function (el) {
          return !(desktop && el.classList.contains('split-headline'));
        });
        if (revealEls.length) {
          gsap.set(revealEls, { opacity: 0, y: motionOK ? 24 : 0 });
          ScrollTrigger.batch(revealEls, {
            start: 'top 88%',
            once: true,
            onEnter: function (batch) {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: motionOK ? 0.75 : 0.01,
                stagger: motionOK ? 0.08 : 0,
                ease: 'power3.out',
                overwrite: true
              });
            }
          });
          // Safety net: if a batch never enters for any reason, force
          // visible after a few seconds rather than leave it hidden.
          setTimeout(function () {
            gsap.set(revealEls.filter(function (el) { return gsap.getProperty(el, 'opacity') === 0; }), { opacity: 1, y: 0 });
          }, 3000);
        }

        // --- Masked image reveal: clip-path wipe, same batching pattern.
        var revealImageEls = gsap.utils.toArray('.reveal-image');
        if (revealImageEls.length) {
          gsap.set(revealImageEls, { clipPath: motionOK ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)' });
          ScrollTrigger.batch(revealImageEls, {
            start: 'top 85%',
            once: true,
            onEnter: function (batch) {
              gsap.to(batch, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: motionOK ? 1.1 : 0.01,
                stagger: motionOK ? 0.1 : 0,
                ease: 'power4.inOut',
                overwrite: true
              });
            }
          });
          setTimeout(function () {
            gsap.set(revealImageEls.filter(function (el) { return gsap.getProperty(el, 'clipPath') !== 'inset(0% 0% 0% 0%)'; }), { clipPath: 'inset(0% 0% 0% 0%)' });
          }, 3000);
        }

        // --- Headline text-split: word-by-word rise, reserved for the
        // biggest hero moments only (.split-headline, applied selectively
        // per page — "character-splitting everywhere reads as gimmicky").
        // SplitType is a separate CDN script; guard against it failing to
        // load independently of GSAP.
        if (desktop && typeof window.SplitType !== 'undefined') {
          gsap.utils.toArray('.split-headline').forEach(function (el) {
            var split = new SplitType(el, { types: 'words', tagName: 'span' });
            gsap.set(split.words, { opacity: 0, yPercent: 100 });
            ScrollTrigger.create({
              trigger: el,
              start: 'top 85%',
              once: true,
              onEnter: function () {
                gsap.to(split.words, { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.05, ease: 'power3.out' });
              }
            });
            setTimeout(function () { gsap.set(split.words, { opacity: 1, yPercent: 0 }); }, 3000);
          });
        }

        // --- Parallax: statement/card imagery drifts against scroll,
        // scrubbed directly to scroll position (ScrollTrigger's `scrub`)
        // instead of the old rAF+manual-distance-calc approach — this is
        // the specific upgrade that makes it feel continuous rather than
        // stepped. Desktop + motion-OK only, matching the prior system's
        // own mobile/reduced-motion exclusion.
        if (desktop) {
          gsap.utils.toArray('[data-parallax]').forEach(function (el) {
            var strength = Number(el.dataset.parallaxStrength) || 0.08;
            gsap.set(el, { scale: 1.12 });
            gsap.to(el, {
              y: function () { return -80 * strength * 10; },
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6
              }
            });
          });
        } else {
          // Static, intentional-looking zoom with no motion — never a
          // flat, unscaled image just because parallax is off here.
          gsap.set('[data-parallax]', { scale: 1.12 });
        }

        return function cleanup() {
          // gsap.matchMedia() calls this automatically when a condition's
          // query stops matching (e.g. resize across the desktop
          // breakpoint) — revert to plain visible state rather than leave
          // stale transforms/clip-paths from the previous breakpoint.
          gsap.set('.reveal, .reveal-image, [data-parallax]', { clearProps: 'all' });
        };
      }
    );
  }

  // Mark the current page's nav link (belt-and-braces alongside server-set aria-current)
  var here = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .footer-grid a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (!target) return;
    var normalized = target.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
    if (normalized === here && normalized !== '/') {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
