'use strict';

/* =====================================================================
   NEIL MARTINEZ — portfolio interactions
   Nothing OS ethos: motion is minimal and mechanical ("click, not swoosh").
   ===================================================================== */

/* ---------- Theme toggle (persisted) ---------- */
(function theme() {
  const root = document.documentElement;
  const KEY = 'nm-theme';
  const saved = localStorage.getItem(KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initial);

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-theme-toggle]');
    if (!btn) return;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem(KEY, next);
  });
})();

/* ---------- Sticky nav state ---------- */
(function stickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- Mobile nav ---------- */
(function mobileNav() {
  const burger = document.querySelector('[data-burger]');
  const links = document.querySelector('.nav__links');
  if (!burger || !links) return;
  burger.addEventListener('click', () => links.classList.toggle('open'));
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') links.classList.remove('open');
  });
})();

/* ---------- Reveal on scroll ---------- */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => io.observe(el));
})();

/* ---------- Count-up for KPI / stat numbers ----------
   Markup: <span class="count" data-to="27.9" data-suffix="M" data-decimals="1">0</span>
   The suffix (M / K / x / %) is rendered separately so only the digits animate. */
(function countUp() {
  const nums = document.querySelectorAll('[data-to]');
  if (!nums.length) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const format = (val, decimals) =>
    decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString('en-US');

  const run = (el) => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const to = parseFloat(el.dataset.to);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (reduce) { el.textContent = format(to, decimals); return; }

    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      // easeOutExpo: decisive, then settles
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = format(to * eased, decimals);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(to, decimals);
    };
    requestAnimationFrame(tick);
  };

  // Numbers already on screen at load animate right away (no scroll needed).
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return r.top < vh * 0.9 && r.bottom > 0;
  };
  nums.forEach((el) => { if (inView(el)) run(el); });

  if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.35 });
  nums.forEach((el) => { if (!el.dataset.counted) io.observe(el); });
})();

/* ---------- Active nav link (which section you're in) ---------- */
(function activeNav() {
  const links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  const map = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href');
    if (id && id.charAt(0) === '#' && id.length > 1) {
      const sec = document.querySelector(id);
      if (sec) map.set(sec, a);
    }
  });
  if (!map.size) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) => l.classList.remove('active'));
        const a = map.get(entry.target);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  map.forEach((_, sec) => io.observe(sec));
})();

/* ---------- Hide sticky mobile CTA over the contact section ---------- */
(function mobileCta() {
  const bar = document.querySelector('[data-mobile-cta]');
  const contact = document.querySelector('#contact');
  if (!bar || !contact || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => bar.classList.toggle('hidden', e.isIntersecting));
  }, { threshold: 0.15 });
  io.observe(contact);
})();

/* ---------- Footer year ---------- */
(function year() {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
