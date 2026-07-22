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
