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

  // Scroll-reveal for elements marked .reveal — progressive enhancement.
  // Content is visible by default (see base.css); we only opt INTO the
  // hidden-then-reveal state once we're confident we can bring it back,
  // and we always arm a fallback timer in case the observer never fires
  // (seen in some automated/backgrounded browser contexts).
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal-ready');

    var revealAll = function () {
      revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    };
    // Safety net: if IntersectionObserver never calls back (some
    // backgrounded/automated browser contexts throttle it indefinitely),
    // don't leave content permanently invisible.
    var fallbackTimer = setTimeout(revealAll, 2000);

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            clearTimeout(fallbackTimer);
            var el = entry.target;
            var delay = el.dataset.revealDelay || 0;
            setTimeout(function () { el.classList.add('is-visible'); }, Number(delay));
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach(function (el, i) {
      if (!el.dataset.revealDelay) el.dataset.revealDelay = String((i % 6) * 80);
      io.observe(el);
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Masked image reveal — same progressive-enhancement/fallback-timer
  // contract as the text reveal above, but for .reveal-image elements
  // (clip-path wipe defined in base.css).
  var revealImageEls = document.querySelectorAll('.reveal-image');
  if (revealImageEls.length && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-reveal-ready');
    var revealAllImages = function () {
      revealImageEls.forEach(function (el) { el.classList.add('is-visible'); });
    };
    var imageFallback = setTimeout(revealAllImages, 2000);
    var imageIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            clearTimeout(imageFallback);
            entry.target.classList.add('is-visible');
            imageIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    revealImageEls.forEach(function (el) { imageIO.observe(el); });
  }

  // Parallax — statement/hero media images drift slightly against scroll
  // for depth ("layered foreground/background movement"). GPU-only
  // (transform, never top/left/width/height, so this cannot cause layout
  // shift), rAF-throttled, and IntersectionObserver-gated so the scroll
  // handler only ever touches elements actually on screen. Skipped
  // entirely under prefers-reduced-motion and on narrow viewports, where
  // the effect is barely visible anyway and not worth the battery cost.
  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !prefersReducedMotion && window.innerWidth > 768 && 'IntersectionObserver' in window) {
    var activeParallax = [];
    var parallaxIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var i = activeParallax.indexOf(entry.target);
          if (entry.isIntersecting && i === -1) activeParallax.push(entry.target);
          else if (!entry.isIntersecting && i !== -1) activeParallax.splice(i, 1);
        });
        // Elements already in view at load (the hero image, most often)
        // are reported by this same callback shortly after observe() is
        // called — without this, they'd sit un-transformed until the
        // user's first scroll event.
        updateParallax();
      },
      { rootMargin: '15% 0px 15% 0px' }
    );
    parallaxEls.forEach(function (el) { parallaxIO.observe(el); });

    var parallaxTicking = false;
    var updateParallax = function () {
      parallaxTicking = false;
      var viewportCenter = window.innerHeight / 2;
      activeParallax.forEach(function (el) {
        var host = el.parentElement;
        var rect = host.getBoundingClientRect();
        var distance = (rect.top + rect.height / 2) - viewportCenter;
        var strength = Number(el.dataset.parallaxStrength) || 0.08;
        var y = Math.max(-48, Math.min(48, distance * strength));
        el.style.transform = 'scale(1.12) translate3d(0, ' + y.toFixed(1) + 'px, 0)';
      });
    };
    var onParallaxScroll = function () {
      if (!parallaxTicking) {
        parallaxTicking = true;
        requestAnimationFrame(updateParallax);
      }
    };
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
    window.addEventListener('resize', onParallaxScroll, { passive: true });
    updateParallax();
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
