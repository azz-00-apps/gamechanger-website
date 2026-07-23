// Gamechanger Football — shared site behavior. Loaded on every page.
(function () {
  'use strict';

  // Nav solidifies on scroll, and hides on scroll-down / reveals on
  // scroll-up (native window scroll — Lenis wraps native scroll rather
  // than replacing it, so this listener works identically whether Lenis
  // loaded or not, and needs no dependency on it).
  var nav = document.querySelector('.site-nav');
  var navLinksEl = document.querySelector('.nav-links');
  if (nav) {
    var lastScrollY = window.scrollY;
    var HIDE_AFTER = 80; // don't hide near the very top of the page
    var HIDE_DELTA = 8; // ignore sub-pixel/jitter scroll noise
    var onScroll = function () {
      var y = window.scrollY;
      nav.classList.toggle('is-scrolled', y > 24);

      var mobileMenuOpen = navLinksEl && navLinksEl.classList.contains('is-open');
      var delta = y - lastScrollY;
      if (!mobileMenuOpen && Math.abs(delta) > HIDE_DELTA) {
        nav.classList.toggle('is-hidden', delta > 0 && y > HIDE_AFTER);
        lastScrollY = y;
      }
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

  // Contact form: Forminit SDK (build.py adds the SDK <script> tag
  // site-wide, matching the existing GSAP/Lenis CDN pattern). Lives
  // outside the motion system on purpose — a broken form must never
  // depend on an unrelated animation library loading successfully.
  // No-ops on every page except contact.html, the only one with a
  // #contact-form element.
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var CONTACT_FORM_ID = 'fi0ugvtfj80';
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';
    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');

    var showFormError = function () {
      if (errorEl) { errorEl.style.display = 'block'; }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = submitBtnDefaultHTML;
      }
    };

    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (errorEl) { errorEl.style.display = 'none'; }

      // SDK-missing fallback: a failed CDN load must not submit silently.
      if (typeof window.Forminit === 'undefined') {
        showFormError();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      try {
        var forminit = new window.Forminit();
        var result = await forminit.submit(CONTACT_FORM_ID, new FormData(contactForm));
        if (result.error) {
          showFormError();
          return;
        }
        contactForm.style.display = 'none';
        if (successEl) { successEl.style.display = 'block'; }
      } catch (err) {
        showFormError();
      }
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

        // --- Smooth scroll (Lenis), motion-preference gated. Lenis has no
        // reduced-motion option of its own (checked exhaustively against
        // its docs/repo — genuinely absent, not just undocumented), so the
        // correct fix is architectural: only ever create an instance when
        // motionOK is true. Under reduced motion this whole block simply
        // never runs, leaving native scroll — which inherently satisfies
        // reduced-motion since there's no smoothing layer to disable.
        // Runs at every viewport width (not gated to `desktop`) since
        // smooth scroll isn't a desktop-only enhancement the way
        // parallax/magnetic-hover are.
        var lenis = null;
        if (motionOK && typeof window.Lenis !== 'undefined') {
          lenis = new Lenis();
          // Exact current integration pattern from Lenis's own docs: feed
          // its raf loop from GSAP's ticker (already running for
          // everything else in this file) instead of Lenis's own
          // independent autoRaf, and keep ScrollTrigger's cached measurements
          // in sync with Lenis's scroll position on every scroll event.
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add(function (time) {
            lenis.raf(time * 1000); // GSAP ticker time is seconds; Lenis wants ms
          });
          gsap.ticker.lagSmoothing(0);
        }
        // If Lenis didn't load (CDN failure) or motion is reduced, `lenis`
        // stays null and every reveal/parallax/reveal-image system below
        // continues running exactly as it did before this feature existed
        // — none of them depend on Lenis being present.

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
          // Fade + rise + a subtle scale-up (0.94 -> 1), not just fade+rise
          // alone. Scale-in-on-reveal is a well-established, widely-used
          // scroll-animation technique (seen on countless sites, including
          // wolverineworldwide.com's own IntersectionObserver-driven
          // reveal system) — added here as our own GSAP tween with our
          // own timing/easing, not by referencing anyone else's
          // implementation code.
          gsap.set(revealEls, { opacity: 0, y: motionOK ? 24 : 0, scale: motionOK ? 0.94 : 1 });
          ScrollTrigger.batch(revealEls, {
            start: 'top 88%',
            once: true,
            onEnter: function (batch) {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
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
            gsap.set(revealEls.filter(function (el) { return gsap.getProperty(el, 'opacity') === 0; }), { opacity: 1, y: 0, scale: 1 });
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
          // breakpoint, or the OS-level reduced-motion setting changing
          // mid-session) — revert to plain visible state rather than leave
          // stale transforms/clip-paths from the previous breakpoint.
          if (lenis) { lenis.destroy(); }
          gsap.set('.reveal, .reveal-image, [data-parallax]', { clearProps: 'all' });
        };
      }
    );

    // --- Magnetic buttons + card tilt + cursor-spotlight: desktop
    // pointer-devices only, and — unlike reveal/parallax above, which
    // have a "reduced" variant (shorter duration) — reduced-motion here
    // means don't register this block at all, since there's no
    // meaningful lesser version of a magnetic pull or a cursor-tracking
    // glow. gsap.matchMedia() here too so a device that gains/loses a
    // mouse, or has the OS-level motion setting change mid-session,
    // cleans up correctly instead of leaving a stale mousemove listener.
    gsap.matchMedia().add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', function () {
      var magneticEls = gsap.utils.toArray('.btn-primary, .btn-ghost, .btn-ghost-light');
      var magneticCleanup = magneticEls.map(function (el) {
        var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
        var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
        var onMove = function (e) {
          var rect = el.getBoundingClientRect();
          xTo((e.clientX - rect.left - rect.width / 2) * 0.3);
          yTo((e.clientY - rect.top - rect.height / 2) * 0.3);
        };
        var onLeave = function () { xTo(0); yTo(0); };
        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);
        return function () {
          el.removeEventListener('mousemove', onMove);
          el.removeEventListener('mouseleave', onLeave);
        };
      });

      // Card imagery tilts toward the cursor — targets the .card-media
      // WRAPPER's transform, never the inner <img>, which already has
      // [data-parallax]'s own independent scroll-scrubbed transform.
      var cardEls = gsap.utils.toArray('.card-media');
      var cardCleanup = cardEls.map(function (card) {
        var xTo = gsap.quickTo(card, 'x', { duration: 0.5, ease: 'power2' });
        var yTo = gsap.quickTo(card, 'y', { duration: 0.5, ease: 'power2' });
        var rTo = gsap.quickTo(card, 'rotation', { duration: 0.5, ease: 'power2' });
        var onMove = function (e) {
          var rect = card.getBoundingClientRect();
          var relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          var relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          xTo(relX * 6);
          yTo(relY * 6);
          rTo(relX * 1.2);
          // Spotlight glow: set directly (no GSAP tween) — reads as an
          // exact cursor-position follow, matching the reference site's
          // behavior, distinct from the tilt's own eased motion above.
          card.style.setProperty('--spotlight-x', ((e.clientX - rect.left) / rect.width * 100) + '%');
          card.style.setProperty('--spotlight-y', ((e.clientY - rect.top) / rect.height * 100) + '%');
        };
        var onLeave = function () {
          xTo(0); yTo(0); rTo(0);
          card.style.setProperty('--spotlight-x', '50%');
          card.style.setProperty('--spotlight-y', '50%');
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        return function () {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        };
      });

      return function cleanup() {
        magneticCleanup.forEach(function (fn) { fn(); });
        cardCleanup.forEach(function (fn) { fn(); });
        gsap.set(magneticEls.concat(cardEls), { clearProps: 'transform' });
      };
    });
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
