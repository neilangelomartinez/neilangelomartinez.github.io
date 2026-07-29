# Redesign Stage 1: Design System + Hero — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Nothing OS" design language with the light-default
consulting-report system from the spec, and rebuild the hero so five KPI cards
dominate the first screen.

**Architecture:** Static site, no build step (Jekyll passthrough — see
`.github/workflows/jekyll-gh-pages.yml`). All styling lives in one stylesheet,
`assets/css/style.css`, which keeps its existing section-comment structure. The
token block is swapped wholesale; **compatibility aliases** (`--radius`,
`--label-color`, `--text-disabled`, `--bg-elev`) are kept so the ~40 component
rules that still reference old token names keep rendering correctly. Those
aliases are deleted in Stage 3 as each section is restyled. This is what makes a
staged rollout possible without a broken intermediate state.

**Tech Stack:** Plain HTML/CSS/JS. No dependencies, no package manager, no test
runner. Verification is grep-based structural assertion plus `node --check`.

**Scope:** This is Stage 1 of 3 from
`docs/superpowers/specs/2026-07-29-portfolio-redesign-design.md`. Stage 2 (case
studies, Process, How I Think) and Stage 3 (reorder, nav, retained-section
restyle, style-guide rewrite) get their own plans after this lands and Neil QAs
it. The site is fully working and deployable at the end of this plan.

**Files touched:**
- `assets/css/style.css` — token block, base styles, hero, KPI grid, ornament removal
- `index.html` — font link, theme attribute, hero markup, proof removal, portrait into About
- `assets/js/script.js` — theme default, avatarRotate removal
- `assets/images/avatar-2.webp`, `avatar-3.webp`, `avatar-4.webp` — deleted

---

## Task 1: Replace the design tokens

**Files:**
- Modify: `assets/css/style.css:1-71`

- [ ] **Step 1: Replace the header comment and both token blocks**

Replace everything from line 1 through line 71 (the closing `}` of
`:root[data-theme="light"]`) with:

```css
/* =====================================================================
   NEIL MARTINEZ — Performance Marketing Portfolio
   Design language: analyst's report — light canvas, elevated cards,
   large tabular figures. Blue is for emphasis, never for fills.
   ===================================================================== */

/* ---------- Fonts ---------- */
/* Space Grotesk (headings/body/figures) · Space Mono (labels/data) */

/* ---------- Design tokens (LIGHT is default / first-class) ---------- */
:root {
  color-scheme: light;

  --bg: #f7f8fa;
  --surface: #ffffff;
  --surface-2: #f1f3f7;

  --text-display: #111827;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;

  --line: rgba(17, 24, 39, 0.08);
  --line-strong: rgba(17, 24, 39, 0.16);

  /* Accent — emphasis and interaction only. */
  --accent: #2563eb;
  --accent-soft: rgba(37, 99, 235, 0.08);

  /* Type */
  --ff-sans: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --ff-mono: 'Space Mono', ui-monospace, 'Courier New', monospace;

  /* Spacing */
  --s-tight: 8px;
  --s-med: 16px;
  --s-wide: 40px;
  --s-vast: clamp(72px, 10vw, 128px);

  --maxw: 1120px;
  --radius-lg: 16px;
  --radius-md: 10px;
  --radius-pill: 999px;

  --shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.04), 0 1px 3px rgba(17, 24, 39, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(17, 24, 39, 0.05), 0 10px 20px -6px rgba(17, 24, 39, 0.10);

  --tr: 0.2s cubic-bezier(0.2, 0, 0, 1);

  /* Compatibility aliases — consumed by not-yet-restyled sections.
     Deleted in Stage 3 once every component uses the new names. */
  --radius: var(--radius-md);
  --label-color: var(--text-secondary);
  --text-disabled: var(--text-tertiary);
  --bg-elev: var(--surface-2);
  --accent-dim: var(--accent-soft);
}

:root[data-theme="dark"] {
  color-scheme: dark;

  --bg: #0b0f17;
  --surface: #141a24;
  --surface-2: #1b222e;

  --text-display: #f9fafb;
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
  --text-tertiary: #6b7280;

  --line: rgba(255, 255, 255, 0.09);
  --line-strong: rgba(255, 255, 255, 0.18);

  /* Lifted from #2563eb — that blue is too low-contrast on a near-black bg. */
  --accent: #3b82f6;
  --accent-soft: rgba(59, 130, 246, 0.14);

  /* Shadows read as dirt on dark surfaces; elevation comes from
     --surface being lighter than --bg, plus the hairline border. */
  --shadow-sm: none;
  --shadow-md: none;
}
```

- [ ] **Step 2: Verify old token names are gone from definitions but aliases exist**

Run: `grep -n '^\s*--bg-alt\|^\s*--dot:' assets/css/style.css`
Expected: no output (both tokens removed).

Run: `grep -c 'var(--label-color)\|var(--radius)\|var(--text-disabled)' assets/css/style.css`
Expected: a non-zero count — these are the consumers the aliases keep alive.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "Replace design tokens with light-default consulting system"
```

---

## Task 2: Flip the default theme to light

The theme currently defaults to dark in two places that must agree, or the page
flashes the wrong theme on first paint.

**Files:**
- Modify: `index.html:2`
- Modify: `assets/js/script.js:14`

- [ ] **Step 1: Flip the HTML attribute**

In `index.html`, find:

```html
<html lang="en" data-theme="dark">
```

Replace with:

```html
<html lang="en" data-theme="light">
```

- [ ] **Step 2: Flip the JS fallback**

In `assets/js/script.js`, find:

```js
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = saved || (prefersLight ? 'light' : 'dark');
```

Replace with:

```js
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (prefersDark ? 'dark' : 'light');
```

This keeps OS-preference respect intact but inverts which theme wins when the
user has no stored preference and no OS signal.

- [ ] **Step 3: Verify JS still parses**

Run: `node --check assets/js/script.js`
Expected: no output (exit 0).

- [ ] **Step 4: Verify no stale dark default remains**

Run: `grep -n 'data-theme="dark"' index.html`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add index.html assets/js/script.js
git commit -m "Make light the default theme"
```

---

## Task 3: Drop the Doto font

Doto is the dot-matrix display face used for hero and KPI figures. Removing it
from the font request also removes a font download.

**Files:**
- Modify: `index.html:26`

- [ ] **Step 1: Remove Doto from the Google Fonts request**

In `index.html`, find:

```html
  <link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

Replace with:

```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Verify the font request no longer asks for Doto**

Run: `grep -c 'Doto' index.html`
Expected: `0`

Do **not** grep for `ff-display` yet. Task 1 removed the `--ff-display`
*definition*, but its three consumers (`.hero h1 .amp`, `.hero__bignum`,
`.kpi__num`) are not deleted until Tasks 7 and 8. Those rules will reference an
undefined token in the interim, which renders as the inherited sans stack — the
intended end state anyway. Task 13 asserts `ff-display` is fully gone once those
rules are removed.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Drop the Doto display font"
```

---

## Task 4: Update base styles and remove the alternating band

**Files:**
- Modify: `assets/css/style.css` (`body` rule, `.band-alt` rule, `.section-head h2`)

- [ ] **Step 1: Tighten body line-height**

Find:

```css
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--ff-sans);
  font-size: 16px;
  line-height: 1.55;
  font-weight: 400;
  letter-spacing: 0.01em;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background var(--tr), color var(--tr);
}
```

Replace with:

```css
body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--ff-sans);
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  letter-spacing: 0.005em;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  transition: background var(--tr), color var(--tr);
}
```

- [ ] **Step 2: Remove the `.band-alt` rule**

Find:

```css
.section { padding-block: var(--s-vast); position: relative; scroll-margin-top: 76px; }
.band-alt { background: var(--bg-alt); }
```

Replace with:

```css
.section { padding-block: var(--s-vast); position: relative; scroll-margin-top: 76px; }
```

- [ ] **Step 3: Increase heading weight and heading/body contrast**

Find:

```css
.section-head h2 {
  font-size: clamp(28px, 4.4vw, 46px);
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text-display);
  margin-top: 14px;
}
```

Replace with:

```css
.section-head h2 {
  font-size: clamp(30px, 4.6vw, 48px);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-display);
  margin-top: 14px;
}
```

- [ ] **Step 4: Remove `band-alt` from all markup**

In `index.html`, remove the ` band-alt` substring from all five section tags.
Run this to find them:

Run: `grep -n 'band-alt' index.html`
Expected before edit: 5 lines (`proof`, `#work`, `#services`, `#experience`,
`#contact`).

Apply these five replacements:

| Find | Replace |
|---|---|
| `<section class="proof band-alt" aria-label="Key results">` | `<section class="proof" aria-label="Key results">` |
| `<section class="section band-alt" id="work">` | `<section class="section" id="work">` |
| `<section class="section band-alt" id="services">` | `<section class="section" id="services">` |
| `<section class="section band-alt" id="experience">` | `<section class="section" id="experience">` |
| `<section class="section contact band-alt" id="contact">` | `<section class="section contact" id="contact">` |

- [ ] **Step 5: Verify**

Run: `grep -c 'band-alt' index.html assets/css/style.css`
Expected: `0` for both files.

- [ ] **Step 6: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Tighten base type and remove alternating section bands"
```

---

## Task 5: Remove the dot-grid ornament

**Files:**
- Modify: `assets/css/style.css` (`.dotgrid` rule)
- Modify: `index.html` (2 instances)

- [ ] **Step 1: Remove the CSS rule**

Find and delete this entire block:

```css
/* Dot-grid backdrop — the single "structural ornament". */
.dotgrid {
  position: absolute; inset: 0;
  background-image: radial-gradient(var(--dot) 1px, transparent 1px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 0%, transparent 75%);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 0%, transparent 75%);
  pointer-events: none;
  z-index: 0;
}
```

- [ ] **Step 2: Remove both markup instances**

There are exactly two `<div class="dotgrid"></div>` elements — one in the hero
(removed wholesale by Task 6 anyway) and one in the contact section. Remove the
contact one now:

In `index.html`, find:

```html
    <section class="section contact" id="contact">
      <div class="dotgrid"></div>
      <div class="wrap contact__inner">
```

Replace with:

```html
    <section class="section contact" id="contact">
      <div class="wrap contact__inner">
```

- [ ] **Step 3: Verify**

Run: `grep -c 'dotgrid' index.html assets/css/style.css`
Expected: `1` for `index.html` (the hero one, removed in Task 6), `0` for the
stylesheet.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Remove the dot-grid backdrop ornament"
```

---

## Task 6: Rebuild the hero

This replaces the two-column hero (text + rotating portrait) with a single-column
hero whose KPI row dominates the fold.

**Files:**
- Modify: `index.html:68-103`

- [ ] **Step 1: Replace the entire hero section**

Replace lines 68 through 103 — everything from the `<!-- ==== HERO ==== -->`
comment through the `</section>` that closes it — with:

```html
    <!-- ============================ HERO ============================ -->
    <section class="hero">
      <div class="wrap hero__inner">
        <p class="hero__eyebrow">Meta Ads &amp; Marketing Analytics</p>
        <h1 class="hero__title">Performance Marketing Specialist</h1>
        <p class="hero__sub">
          I help eCommerce businesses scale profitably through paid advertising, CRO, and
          marketing analytics. Two years as a data analyst before media buying, so every
          optimization decision starts with the numbers.
        </p>
        <div class="hero__cta">
          <a class="btn btn--primary" href="mailto:neilangelomartinez@gmail.com">Email me <span class="arw">↗</span></a>
          <a class="btn" href="https://drive.google.com/file/d/1ukwgBs5nPKJeJg_sbQviEwwuu7FX-N4s/view?usp=sharing" target="_blank" rel="noopener">View résumé <span class="arw">↗</span></a>
        </div>

        <div class="kpi-grid" aria-label="Key results">
          <div class="kpi">
            <div class="kpi__num"><span class="u">$</span><span data-to="17" data-decimals="0">0</span><span class="u">M+</span></div>
            <div class="kpi__label">Ad spend managed</div>
          </div>
          <div class="kpi">
            <div class="kpi__num"><span data-to="259" data-decimals="0">0</span><span class="u">K</span></div>
            <div class="kpi__label">Purchases driven</div>
          </div>
          <div class="kpi">
            <div class="kpi__num"><span data-to="5.12" data-decimals="2">0.00</span><span class="u">x</span></div>
            <div class="kpi__label">Best month ROAS</div>
          </div>
          <div class="kpi">
            <div class="kpi__num"><span data-to="14" data-decimals="0">0</span></div>
            <div class="kpi__label">Markets managed</div>
          </div>
          <div class="kpi">
            <div class="kpi__num"><span data-to="975" data-decimals="0">0</span><span class="u">M</span></div>
            <div class="kpi__label">Impressions delivered</div>
          </div>
        </div>
      </div>
    </section>
```

The `data-to` / `data-decimals` attributes drive the existing `countUp()` IIFE in
`assets/js/script.js`, which already honours `prefers-reduced-motion`. No JS
change is needed for the counters.

- [ ] **Step 2: Verify the old hero is gone and the new one is intact**

Run: `grep -c 'hero__role\|hero__bignum\|hero__media\|avatar__img\|hero__figure' index.html`
Expected: `0`.

Run: `grep -c 'class="kpi"' index.html`
Expected: `5`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rebuild the hero around a five-card KPI row"
```

---

## Task 7: Hero and KPI styles

**Files:**
- Modify: `assets/css/style.css` (replaces the whole `HERO` section block)

- [ ] **Step 1: Replace the hero CSS block**

Replace everything from the `/* ==== HERO ==== */` banner comment through the
`.hero__bignum-cap { ... }` rule — that is, the old `.hero`, `.hero__inner`,
`.hero__media`, `.avatar`, `@property --mp`, `.avatar__img`, `@keyframes
pixelIn`, its reduced-motion block, `.hero__role`, `.hero h1`, `.hero__sub`,
`.hero__cta`, `.hero__figure`, `.hero__bignum`, and `.hero__bignum-cap` — with
the following. **Keep** the `.scrollbar` and stagger/reveal rules that sit in the
middle of that block; they are reproduced here in place.

```css
/* ================================================================
   HERO
   ================================================================ */
.hero {
  position: relative;
  padding-top: 148px;
  padding-bottom: var(--s-vast);
}
.hero__inner { width: 100%; }

.hero__eyebrow {
  font-family: var(--ff-mono);
  font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 18px;
}
.hero__title {
  font-size: clamp(38px, 6vw, 72px);
  line-height: 1.02;
  font-weight: 700;
  letter-spacing: -0.035em;
  color: var(--text-display);
  max-width: 18ch;
}
.hero__sub {
  margin-top: 22px;
  max-width: 62ch;
  font-size: clamp(16px, 1.8vw, 19px);
  color: var(--text-secondary);
  line-height: 1.5;
}
.hero__cta { margin-top: 30px; display: flex; gap: 14px; flex-wrap: wrap; }

/* KPI cards — these are meant to dominate the first screen. */
.kpi-grid {
  margin-top: var(--s-vast);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--s-med);
}
.kpi {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px 20px;
  transition: box-shadow var(--tr), transform var(--tr);
}
.kpi:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.kpi__num {
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text-display);
  font-variant-numeric: tabular-nums;
}
.kpi__num .u { color: var(--accent); }
.kpi__label {
  margin-top: 10px;
  font-family: var(--ff-mono);
  font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-secondary);
}

/* Scroll progress bar */
.scrollbar { position: fixed; top: 0; left: 0; height: 2px; width: 0; background: var(--accent); z-index: 200; }

/* Staggered reveals inside grids */
.reveal.stagger { opacity: 1; transform: none; }
.stagger > * { opacity: 0; transform: translateY(14px); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.2, 0, 0, 1); }
.stagger.in > * { opacity: 1; transform: none; transition-delay: calc(var(--i, 0) * 55ms); }
@media (prefers-reduced-motion: reduce) {
  .stagger > * { opacity: 1; transform: none; transition: none; }
  .kpi:hover { transform: none; }
}
```

- [ ] **Step 2: Verify no dangling references to removed hero rules**

Run: `grep -n 'avatar\|pixelIn\|--mp\|hero__role\|hero__bignum' assets/css/style.css`
Expected: no output.

- [ ] **Step 3: Verify the reduced-motion guards**

Run: `grep -c 'prefers-reduced-motion' assets/css/style.css`
Expected: exactly `2` — the global reset guard near the top of the file, and the
stagger + `.kpi:hover` guard added above. The file had three before this task;
the third belonged to the deleted `.avatar__img` block.

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css
git commit -m "Style the hero and KPI cards"
```

---

## Task 8: Remove the proof bar

Its four metrics now live in the hero KPI row. Leaving it would show the same
numbers twice within one screen of each other.

**Files:**
- Modify: `index.html` (proof section, formerly lines 105-125)
- Modify: `assets/css/style.css` (PROOF BAR block)

- [ ] **Step 1: Delete the proof section markup**

Remove the entire block, from the `<!-- ==== PROOF BAR ==== -->` comment through
its closing `</section>`:

```html
    <!-- ============================ PROOF BAR ============================ -->
    <section class="proof" aria-label="Key results">
      <div class="proof__grid">
        <div class="kpi">
          <div class="kpi__num"><span data-to="975" data-decimals="0">0</span><span class="u">M</span></div>
          <div class="kpi__label">Impressions delivered</div>
        </div>
        <div class="kpi">
          <div class="kpi__num"><span data-to="259" data-decimals="0">0</span><span class="u">K</span></div>
          <div class="kpi__label">Purchases driven</div>
        </div>
        <div class="kpi">
          <div class="kpi__num"><span data-to="5.12" data-decimals="2">0</span><span class="u">x</span></div>
          <div class="kpi__label">Best month ROAS</div>
        </div>
        <div class="kpi">
          <div class="kpi__num"><span class="u">$</span><span data-to="11.6" data-decimals="1">0</span><span class="u">M</span></div>
          <div class="kpi__label">US ad spend managed</div>
        </div>
      </div>
    </section>
```

- [ ] **Step 2: Delete the proof CSS**

Find and delete:

```css
/* ================================================================
   PROOF BAR  (animated KPI counters)
   ================================================================ */
.proof { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.proof__grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
}
.kpi {
  padding: 34px clamp(16px, 3vw, 34px);
  border-left: 1px solid var(--line);
}
.kpi:first-child { border-left: none; }
.kpi__num {
  font-family: var(--ff-display);
  font-size: clamp(30px, 4.6vw, 52px);
  line-height: 1; color: var(--text-display); font-weight: 500;
}
.kpi__num .u { color: var(--accent); }
.kpi__label {
  margin-top: 12px;
  font-family: var(--ff-mono); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--label-color);
}
```

⚠️ This block redefines `.kpi`, `.kpi__num`, and `.kpi__label`, which Task 7 also
defines. Because it appears **later** in the file, it currently overrides Task 7's
versions. Deleting it is what makes the new hero KPI styling take effect — this
is not optional cleanup.

- [ ] **Step 3: Verify exactly one definition of each KPI rule remains**

Run: `grep -c '^\.kpi {' assets/css/style.css`
Expected: `1`

Run: `grep -c 'proof' index.html assets/css/style.css`
Expected: `0` for both.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Remove the proof bar, now absorbed into the hero KPI row"
```

---

## Task 9: Move the portrait into About

The portrait leaves the hero (so KPIs own the fold) but should not vanish from
the site.

**Files:**
- Modify: `index.html` (About section)
- Modify: `assets/css/style.css` (ABOUT block)

- [ ] **Step 1: Add the portrait to the About left column**

In `index.html`, find:

```html
            <p class="about__lead" style="margin-top:16px;">
              I build ad systems that bring in leads, lift sales, and turn a
              <span class="accent">profit</span>, with a data analyst's eye for what's actually working.
            </p>
          </div>
```

Replace with:

```html
            <p class="about__lead" style="margin-top:16px;">
              I build ad systems that bring in leads, lift sales, and turn a
              <span class="accent">profit</span>, with a data analyst's eye for what's actually working.
            </p>
            <img class="about__portrait" src="./assets/images/avatar-1.webp"
                 alt="Neil Angelo Martinez" width="600" height="895" loading="lazy" />
          </div>
```

- [ ] **Step 2: Add the portrait style**

In `assets/css/style.css`, find:

```css
.about__lead .accent { color: var(--accent); }
```

Replace with:

```css
.about__lead .accent { color: var(--accent); }
.about__portrait { margin-top: var(--s-wide); width: 190px; max-width: 100%; }
```

- [ ] **Step 3: Delete the now-unused avatar images**

`avatar-2` and `avatar-3` were only used by the rotating hero avatar. `avatar-4`
was already unreferenced before this plan.

```bash
git rm assets/images/avatar-2.webp assets/images/avatar-3.webp assets/images/avatar-4.webp
```

- [ ] **Step 4: Verify only the referenced avatar remains**

Run: `ls assets/images/ | grep avatar`
Expected: `avatar-1.webp` only.

Run: `grep -c 'avatar-1.webp' index.html`
Expected: `1`

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Move the portrait from the hero into About"
```

---

## Task 10: Remove the avatar rotation JavaScript

With a single static portrait, the rotation IIFE is dead code querying an element
that no longer exists.

**Files:**
- Modify: `assets/js/script.js`

- [ ] **Step 1: Delete the avatarRotate IIFE**

Find and delete this entire block:

```js
/* ---------- Hero avatar pixel transition (every 2s) ---------- */
(function avatarRotate() {
  const box = document.querySelector('[data-avatar]');
  if (!box) return;
  const imgs = box.querySelectorAll('.avatar__img');
  if (imgs.length < 2) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove('is-active');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('is-active');
  }, 2000);
})();
```

- [ ] **Step 2: Verify it parses and the reference is gone**

Run: `node --check assets/js/script.js`
Expected: no output (exit 0).

Run: `grep -c 'data-avatar\|avatarRotate' assets/js/script.js index.html`
Expected: `0` for both files.

- [ ] **Step 3: Commit**

```bash
git add assets/js/script.js
git commit -m "Remove the dead avatar rotation script"
```

---

## Task 11: Fix responsive rules for the new hero

The `@media (max-width: 900px)` block still targets removed selectors and has no
rule for the new 5-column KPI grid, which would otherwise stay 5-across on
phones.

**Files:**
- Modify: `assets/css/style.css` (responsive blocks)

- [ ] **Step 1: Replace the 900px block's hero-related rules**

Find:

```css
@media (max-width: 900px) {
  .hero { min-height: auto; display: block; padding-top: 92px; padding-bottom: 48px; }
  .hero__inner { grid-template-columns: 1fr; gap: 20px; }
  .hero__media { order: -1; justify-content: flex-start; }
  .avatar { height: auto; width: 152px; max-width: 152px; margin-inline: 0; }
  .about__grid { grid-template-columns: 1fr; }
```

Replace with:

```css
@media (max-width: 900px) {
  .hero { padding-top: 116px; }
  .kpi-grid { grid-template-columns: repeat(3, 1fr); }
  .about__grid { grid-template-columns: 1fr; }
```

- [ ] **Step 2: Remove the dead proof-grid rules from the same block**

Find:

```css
  .svc-grid { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
  .proof__grid { grid-template-columns: 1fr 1fr; }
  .kpi:nth-child(3), .kpi:nth-child(4) { border-top: 1px solid var(--line); }
  .kpi:nth-child(odd) { border-left: none; }
}
```

Replace with:

```css
  .svc-grid { grid-template-columns: 1fr 1fr; }
  .certs { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 3: Fix the 720px block**

Find:

```css
  .status-pill { display: none; }
  .xp { grid-template-columns: 1fr; gap: 12px; }
  .hero__figure { flex-direction: column; align-items: flex-start; gap: 10px; }
  .section { padding-block: 58px; }
```

Replace with:

```css
  .status-pill { display: none; }
  .xp { grid-template-columns: 1fr; gap: 12px; }
  .kpi-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .section { padding-block: 64px; }
```

- [ ] **Step 4: Fix the 480px block**

Find:

```css
@media (max-width: 480px) {
  .svc-grid, .certs { grid-template-columns: 1fr; }
  .proof__grid { grid-template-columns: 1fr 1fr; }
}
```

Replace with:

```css
@media (max-width: 480px) {
  .svc-grid, .certs { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Verify no removed selectors survive anywhere**

Run: `grep -n 'proof__grid\|hero__figure\|hero__media\|\.avatar' assets/css/style.css`
Expected: no output.

- [ ] **Step 6: Commit**

```bash
git add assets/css/style.css
git commit -m "Update responsive rules for the rebuilt hero"
```

---

## Task 12: Nav polish for a light canvas

On the old near-black canvas the scrolled nav worked as a flat tint. On a light
canvas it needs a blur to separate from content scrolling under it.

**Files:**
- Modify: `assets/css/style.css` (`.nav.scrolled`)

- [ ] **Step 1: Add backdrop blur to the scrolled nav**

Find:

```css
.nav.scrolled {
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  border-bottom: 1px solid var(--line);
}
```

Replace with:

```css
.nav.scrolled {
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
          backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--line);
}
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/style.css
git commit -m "Blur the scrolled nav against the light canvas"
```

---

## Task 13: Full-file verification and push

**Files:** none (verification and git only)

- [ ] **Step 1: Confirm every removed token and selector is fully gone**

Run:

```bash
grep -rn 'band-alt\|dotgrid\|--bg-alt\|--dot:\|ff-display\|Doto\|proof\|avatar-2\|avatar-3\|avatar-4\|hero__bignum\|hero__role\|data-avatar' index.html assets/css/style.css assets/js/script.js
```

Expected: no output.

- [ ] **Step 2: Confirm tag balance**

Run:

```bash
python3 -c "
s = open('index.html', encoding='utf-8').read()
for tag in ('svg','section','div','figure','article'):
    o, c = s.count('<'+tag), s.count('</'+tag+'>')
    print(tag, o, c, 'OK' if o == c else 'MISMATCH')
"
```

Expected: every row `OK`, except `div` — the file's `ASSET SWAP GUIDE` comment
contains the literal text `<div class=...>` twice as prose, so `div` is expected
to read 2 higher on the open count. Any other mismatch is a real bug.

- [ ] **Step 3: Confirm the JS parses**

Run: `node --check assets/js/script.js`
Expected: no output.

- [ ] **Step 4: Confirm every KPI figure matches the spec's data inventory**

Run: `grep -o 'data-to="[0-9.]*"' index.html | sort -u`
Expected exactly these five: `data-to="14"`, `data-to="17"`, `data-to="259"`,
`data-to="5.12"`, `data-to="975"`. No other numbers should appear — the proof
bar's `11.6` in particular must be gone.

- [ ] **Step 5: Confirm the light default is coherent across all three files**

Run: `grep -n 'data-theme' index.html assets/js/script.js | head`
Expected: `index.html` has `data-theme="light"` on `<html>`; `script.js`
references `data-theme` for get/set only, with `initial` falling back to
`'light'`.

- [ ] **Step 6: Push**

The `gh` CLI on this machine has two accounts and reverts to the wrong one, which
makes `git push` fail with a 403. Switch first:

```bash
gh auth switch --hostname github.com --user neilangelomartinez && git push origin main
```

- [ ] **Step 7: Hand back for QA**

Report to Neil that Stage 1 is live and ask him to check both themes via the nav
toggle. Per project preference, do **not** open the Browser/Preview tool to check
this yourself.

Expected visual state after Stage 1: light canvas, blue accent, hero headline
"Performance Marketing Specialist" with five white KPI cards below it, portrait
now in About, and every section below About still in its old layout but picking
up the new colors through the compatibility aliases. Sections will look
*unstyled-but-correct* — restyling them is Stage 3.
