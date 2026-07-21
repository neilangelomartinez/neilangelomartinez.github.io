# Visual Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Swap the red accent for blue, make caption/label text legible via a
new muted blue-slate color instead of faded gray, and add a scoped set of
inline outline-SVG icons across the page.

**Architecture:** This is a static site with no build step (Jekyll on GitHub
Pages just passes the files through — see
`.github/workflows/jekyll-gh-pages.yml`) and no templating/includes, so every
icon is inlined directly as literal SVG markup at each usage site (matching
the existing pattern already used for the nav's sun/moon toggle icons). All
color/size changes are CSS custom-property and selector edits in
`assets/css/style.css`.

**Tech Stack:** Plain HTML/CSS/JS, no dependencies, no package manager, no
test runner. "Testing" in this plan means `grep` sanity checks (no leftover
old color, no unclosed tags) plus the owner's own manual visual QA — per
project preference, do **not** use the Browser/Preview tool to check this
work.

**Files touched (no new files):**
- `assets/css/style.css` — color tokens, label/caption selectors, new icon
  support rules (flex + gap on containers that gain an icon)
- `index.html` — favicon data-URI, and inline `<svg>` icons at each usage site

---

## Task 1: Accent color — red → blue

**Files:**
- Modify: `assets/css/style.css` (`:root` block and `:root[data-theme="light"]` block)
- Modify: `index.html` (favicon `<link>`)

- [ ] **Step 1: Update the dark-theme accent tokens**

In `assets/css/style.css`, find:

```css
  /* Accent — the ONLY color. Used on values, never backgrounds. */
  --accent: #d71921;
  --accent-dim: rgba(215, 25, 33, 0.14);
```

Replace with:

```css
  /* Accent — the ONLY color. Used on values, never backgrounds. */
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.14);
```

- [ ] **Step 2: Update the light-theme accent tokens**

In the same file, find:

```css
  --accent: #d71921;
  --accent-dim: rgba(215, 25, 33, 0.10);
```

Replace with:

```css
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.10);
```

- [ ] **Step 3: Update the favicon dot color**

In `index.html`, find:

```html
  <!-- Favicon: red dot on the void (Nothing motif) -->
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23000'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%23d71921'/%3E%3C/svg%3E" />
```

Replace with:

```html
  <!-- Favicon: blue dot on the void (Nothing motif) -->
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23000'/%3E%3Ccircle cx='16' cy='16' r='6' fill='%232563eb'/%3E%3C/svg%3E" />
```

- [ ] **Step 4: Verify no old red hex remains**

Run: `grep -rn "d71921\|215, 25, 33" assets/css/style.css index.html`
Expected: no output (empty result).

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Swap accent color from red to blue"
```

---

## Task 2: Label/caption readability

**Files:**
- Modify: `assets/css/style.css`

- [ ] **Step 1: Add the `--label-color` token to both themes**

Find (now reflects Task 1's values):

```css
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.14);

  --dot: rgba(255, 255, 255, 0.10);
```

Replace with:

```css
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.14);
  --label-color: rgba(147, 181, 255, 0.82);

  --dot: rgba(255, 255, 255, 0.10);
```

Find:

```css
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.10);

  --dot: rgba(10, 10, 10, 0.12);
```

Replace with:

```css
  --accent: #2563eb;
  --accent-dim: rgba(37, 99, 235, 0.10);
  --label-color: rgba(28, 56, 110, 0.78);

  --dot: rgba(10, 10, 10, 0.12);
```

- [ ] **Step 2: `.section-idx` — color only, size unchanged**

Find:

```css
.section-idx {
  font-family: var(--ff-mono);
  font-size: 12px;
  color: var(--text-disabled);
  letter-spacing: 0.1em;
}
```

Replace with:

```css
.section-idx {
  font-family: var(--ff-mono);
  font-size: 12px;
  color: var(--label-color);
  letter-spacing: 0.1em;
}
```

- [ ] **Step 3: `.status-pill` — color only, size unchanged**

Find:

```css
.status-pill {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-secondary);
  border: 1px solid var(--line); border-radius: var(--radius-pill);
  padding: 6px 12px;
}
```

Replace with:

```css
.status-pill {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--label-color);
  border: 1px solid var(--line); border-radius: var(--radius-pill);
  padding: 6px 12px;
}
```

- [ ] **Step 4: `.hero__role` — 13px → 14px, recolor**

Find:

```css
.hero__role {
  font-family: var(--ff-mono); font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-secondary); margin-bottom: 16px;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
```

Replace with:

```css
.hero__role {
  font-family: var(--ff-mono); font-size: 14px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--label-color); margin-bottom: 16px;
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
}
```

(`.hero__role span` keeps `--accent` — untouched — it's a highlighted phrase, not a plain label.)

- [ ] **Step 5: `.kpi__label` — 11px → 12.5px, recolor**

Find:

```css
.kpi__label {
  margin-top: 12px;
  font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-secondary);
}
```

Replace with:

```css
.kpi__label {
  margin-top: 12px;
  font-family: var(--ff-mono); font-size: 12.5px; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--label-color);
}
```

- [ ] **Step 6: `.case__tagline` — 11px → 13px, recolor**

Find:

```css
.case__tagline { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary); margin-top: 6px; }
```

Replace with:

```css
.case__tagline { font-family: var(--ff-mono); font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--label-color); margin-top: 6px; }
```

- [ ] **Step 7: `.cn-row dt` (Challenge/What I Did/Result labels) — 10px → 12px, recolor**

Find:

```css
.cn-row dt { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-disabled); margin-bottom: 6px; }
```

Replace with:

```css
.cn-row dt { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--label-color); margin-bottom: 6px; }
```

- [ ] **Step 8: `.rost__m` — 12px → 13px, recolor**

Find:

```css
.rost__m { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.03em; color: var(--text-secondary); margin-top: 8px; line-height: 1.5; }
```

Replace with:

```css
.rost__m { font-family: var(--ff-mono); font-size: 13px; letter-spacing: 0.03em; color: var(--label-color); margin-top: 8px; line-height: 1.5; }
```

- [ ] **Step 9: `.svc__n` — color only, size unchanged**

Find:

```css
.svc__n { font-family: var(--ff-mono); font-size: 11px; color: var(--text-disabled); letter-spacing: 0.1em; }
```

Replace with:

```css
.svc__n { font-family: var(--ff-mono); font-size: 11px; color: var(--label-color); letter-spacing: 0.1em; }
```

- [ ] **Step 10: `.funnel__k` — 11px → 12.5px, recolor**

Find:

```css
.funnel__k { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 12px; }
```

Replace with:

```css
.funnel__k { font-family: var(--ff-mono); font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--label-color); margin-bottom: 12px; }
```

- [ ] **Step 11: `.xp__co` — 12px → 13px, recolor**

Find:

```css
.xp__co { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary); margin: 4px 0 14px; }
```

Replace with:

```css
.xp__co { font-family: var(--ff-mono); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--label-color); margin: 4px 0 14px; }
```

- [ ] **Step 12: `.cert__by` — 10px → 12px, recolor**

Find:

```css
.cert__by { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-secondary); margin-top: 10px; }
```

Replace with:

```css
.cert__by { font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--label-color); margin-top: 10px; }
```

- [ ] **Step 13: Verify the token exists exactly twice (once per theme) and nothing else broke**

Run: `grep -n "label-color" assets/css/style.css`
Expected: one `--label-color: rgba(147, 181, 255, 0.82);` line, one
`--label-color: rgba(28, 56, 110, 0.78);` line, plus the ~11 `var(--label-color)`
usages from steps 2–12 (13 lines total).

- [ ] **Step 14: Commit**

```bash
git add assets/css/style.css
git commit -m "Recolor caption and label text with a legible blue-slate tone"
```

---

## Task 3: Services grid icons

**Files:**
- Modify: `assets/css/style.css` (`.svc__h` rule, new `.svc__icon` rule)
- Modify: `index.html` (`#services` section)

- [ ] **Step 1: Add icon layout support to `.svc__h`**

Find:

```css
.svc__h { font-size: 18px; font-weight: 500; color: var(--text-display); margin: 12px 0 8px; }
```

Replace with:

```css
.svc__h { font-size: 18px; font-weight: 500; color: var(--text-display); margin: 12px 0 8px; display: flex; align-items: center; gap: 10px; }
.svc__icon { flex: none; color: var(--text-secondary); }
```

- [ ] **Step 2: Insert the 6 service icons in `index.html`**

Find the whole `.svc-grid` block:

```html
        <div class="svc-grid reveal stagger">
          <div class="svc"><p class="svc__n">01</p><h3 class="svc__h">Meta Ads management</h3><p class="svc__p">Campaign strategy, build, and daily tuning on Facebook and Instagram, from ABO/CBO testing through scaling.</p></div>
          <div class="svc"><p class="svc__n">02</p><h3 class="svc__h">Funnel &amp; landing pages</h3><p class="svc__p">Funnel setup and AI-built landing pages that match your ad from click to buy.</p></div>
          <div class="svc"><p class="svc__n">03</p><h3 class="svc__h">Creative strategy &amp; testing</h3><p class="svc__p">Ad concepts, copy, and AI-made variations, all run through a clear testing plan.</p></div>
          <div class="svc"><p class="svc__n">04</p><h3 class="svc__h">Email &amp; SMS marketing</h3><p class="svc__p">Klaviyo, Mailchimp, and PostScript flows and campaigns that keep buyers coming back.</p></div>
          <div class="svc"><p class="svc__n">05</p><h3 class="svc__h">Tracking &amp; reporting</h3><p class="svc__p">Pixel and Conversions API setup, custom events, and a clear weekly report on CPL, ROAS, and creative.</p></div>
          <div class="svc"><p class="svc__n">06</p><h3 class="svc__h">Automation</h3><p class="svc__p">ManyChat lead capture in Messenger and Zapier links between your tools, to save you hours.</p></div>
        </div>
```

Replace with:

```html
        <div class="svc-grid reveal stagger">
          <div class="svc"><p class="svc__n">01</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10v4h4l8 5V5l-8 5H3z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>Meta Ads management</h3><p class="svc__p">Campaign strategy, build, and daily tuning on Facebook and Instagram, from ABO/CBO testing through scaling.</p></div>
          <div class="svc"><p class="svc__n">02</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16l-6 8v5l-4 2v-7L4 5z"/></svg>Funnel &amp; landing pages</h3><p class="svc__p">Funnel setup and AI-built landing pages that match your ad from click to buy.</p></div>
          <div class="svc"><p class="svc__n">03</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-6 10a1.5 1.5 0 0 0 1.3 2h13.4a1.5 1.5 0 0 0 1.3-2l-6-10V3"/><path d="M7 14h10"/></svg>Creative strategy &amp; testing</h3><p class="svc__p">Ad concepts, copy, and AI-made variations, all run through a clear testing plan.</p></div>
          <div class="svc"><p class="svc__n">04</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Email &amp; SMS marketing</h3><p class="svc__p">Klaviyo, Mailchimp, and PostScript flows and campaigns that keep buyers coming back.</p></div>
          <div class="svc"><p class="svc__n">05</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="20" x2="5" y2="12"/><line x1="12" y1="20" x2="12" y2="7"/><line x1="19" y1="20" x2="19" y2="15"/></svg>Tracking &amp; reporting</h3><p class="svc__p">Pixel and Conversions API setup, custom events, and a clear weekly report on CPL, ROAS, and creative.</p></div>
          <div class="svc"><p class="svc__n">06</p><h3 class="svc__h"><svg class="svc__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>Automation</h3><p class="svc__p">ManyChat lead capture in Messenger and Zapier links between your tools, to save you hours.</p></div>
        </div>
```

- [ ] **Step 3: Verify structure**

Run: `grep -o 'class="svc__icon"' index.html | wc -l`
Expected: `6`

- [ ] **Step 4: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Add outline icons to the services grid"
```

---

## Task 4: Skills & tools chip icons

Icons go on every occurrence of these literal tool-name chips, in both the
AI Workflow section and the Skills & Tools section (same `.chip` component,
so both must get icons for visual consistency). Concept chips ("A/B
testing", "Pixel & CAPI", "CRO structure", "Funnel setup", "Landing pages",
"Localization", "Audience targeting", "Instant Forms") stay text-only.

**Files:**
- Modify: `assets/css/style.css` (`.chip` rule)
- Modify: `index.html` (AI Workflow chip rows + Skills & Tools chip rows)

- [ ] **Step 1: Add icon layout support to `.chip`**

Find:

```css
.chip {
  font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.03em;
  color: var(--text-primary);
  border: 1px solid var(--line); border-radius: var(--radius); padding: 8px 13px;
  transition: border-color var(--tr), color var(--tr);
}
```

Replace with:

```css
.chip {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--ff-mono); font-size: 12px; letter-spacing: 0.03em;
  color: var(--text-primary);
  border: 1px solid var(--line); border-radius: var(--radius); padding: 8px 13px;
  transition: border-color var(--tr), color var(--tr);
}
.chip svg { flex: none; }
```

- [ ] **Step 2: Add icons to the AI Workflow section's tool chips**

Find:

```html
            <div class="ai-card__tools">
              <span class="chip chip--ai">Claude Code</span>
              <span class="chip chip--ai">Nano Banana Pro</span>
              <span class="chip">Canva</span>
            </div>
```

Replace with:

```html
            <div class="ai-card__tools">
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Claude Code</span>
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Nano Banana Pro</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Canva</span>
            </div>
```

Find:

```html
            <div class="ai-card__tools">
              <span class="chip chip--ai">Manus</span>
              <span class="chip chip--ai">Claude Code</span>
              <span class="chip">CRO structure</span>
            </div>
```

Replace with:

```html
            <div class="ai-card__tools">
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Manus</span>
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Claude Code</span>
              <span class="chip">CRO structure</span>
            </div>
```

- [ ] **Step 3: Add icons to the Skills & Tools "Ad platforms" chips**

Find:

```html
            <div class="chips"><span class="chip">Meta Ads</span><span class="chip">Google Ads</span><span class="chip">TikTok Ads</span></div>
```

Replace with:

```html
            <div class="chips">
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10v4h4l8 5V5l-8 5H3z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>Meta Ads</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/></svg>Google Ads</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5v-7z"/></svg>TikTok Ads</span>
            </div>
```

- [ ] **Step 4: Add icons to the Skills & Tools "AI creative" chips**

Find:

```html
            <div class="chips"><span class="chip chip--ai">Claude Code</span><span class="chip chip--ai">Nano Banana Pro</span><span class="chip chip--ai">Manus</span></div>
```

Replace with:

```html
            <div class="chips">
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Claude Code</span>
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Nano Banana Pro</span>
              <span class="chip chip--ai"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3z"/></svg>Manus</span>
            </div>
```

- [ ] **Step 5: Add icons to the "Email & SMS" chips**

Find:

```html
            <div class="chips"><span class="chip">Klaviyo</span><span class="chip">Mailchimp</span><span class="chip">PostScript</span></div>
```

Replace with:

```html
            <div class="chips">
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Klaviyo</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Mailchimp</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>PostScript</span>
            </div>
```

- [ ] **Step 6: Add icons to the "Automation & commerce" chips**

Find:

```html
            <div class="chips"><span class="chip">ManyChat</span><span class="chip">Zapier</span><span class="chip">Shopify</span></div>
```

Replace with:

```html
            <div class="chips">
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.4-3.5A8 8 0 0 1 4 12z"/></svg>ManyChat</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>Zapier</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>Shopify</span>
            </div>
```

- [ ] **Step 7: Add icons to the "Workspace" chips**

Find:

```html
            <div class="chips"><span class="chip">Notion</span><span class="chip">Slack</span><span class="chip">Google Workspace</span><span class="chip">Canva</span></div>
```

Replace with:

```html
            <div class="chips">
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7V3z"/><path d="M14 3v4h4"/></svg>Notion</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v12H8l-4 4V4z"/></svg>Slack</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>Google Workspace</span>
              <span class="chip"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Canva</span>
            </div>
```

- [ ] **Step 8: Verify no chip lost its text**

Run: `grep -o 'class="chip"\|class="chip chip--ai"' index.html | wc -l`
Expected: `29` — same chip-span count as before this task, confirming no
`<span class="chip">` was accidentally deleted, only had an `<svg>` inserted
inside it.

- [ ] **Step 9: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Add outline icons to named tool chips"
```

---

## Task 5: Footer & contact icons

**Files:**
- Modify: `assets/css/style.css` (`.footer .socials a`, `.contact__list a, .contact__list span`)
- Modify: `index.html` (footer + contact list)

- [ ] **Step 1: Add icon layout support to footer socials and contact list links**

Find:

```css
.footer .socials a { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); }
```

Replace with:

```css
.footer .socials a { display: inline-flex; align-items: center; gap: 6px; font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-secondary); }
```

Find:

```css
.contact__list a, .contact__list span { font-family: var(--ff-mono); font-size: 13px; color: var(--text-secondary); letter-spacing: 0.03em; }
```

Replace with:

```css
.contact__list a, .contact__list span { display: inline-flex; align-items: center; gap: 6px; font-family: var(--ff-mono); font-size: 13px; color: var(--text-secondary); letter-spacing: 0.03em; }
```

- [ ] **Step 2: Add icons to the contact list**

Find:

```html
        <div class="contact__list reveal">
          <a href="mailto:neilangelomartinez@gmail.com">neilangelomartinez@gmail.com</a>
          <a href="tel:+639274021199">+63 927 402 1199</a>
          <a href="https://bit.ly/neilmartinez-linkedin" target="_blank" rel="noopener">LinkedIn ↗</a>
        </div>
```

Replace with:

```html
        <div class="contact__list reveal">
          <a href="mailto:neilangelomartinez@gmail.com"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>neilangelomartinez@gmail.com</a>
          <a href="tel:+639274021199"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 3h3.2a1 1 0 0 1 1 .8c.2 1 .5 2 .9 2.9a1 1 0 0 1-.25 1.1L8 9.2a14 14 0 0 0 6 6l1.4-1.35a1 1 0 0 1 1.1-.2c.9.4 1.9.7 2.9.9a1 1 0 0 1 .8 1V19a1 1 0 0 1-1.1 1A16.5 16.5 0 0 1 4.5 4.1 1 1 0 0 1 4.5 3z"/></svg>+63 927 402 1199</a>
          <a href="https://bit.ly/neilmartinez-linkedin" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>LinkedIn ↗</a>
        </div>
```

- [ ] **Step 3: Add icons to the footer socials**

Find:

```html
    <div class="socials">
      <a href="https://bit.ly/neilmartinez-linkedin" target="_blank" rel="noopener">LinkedIn</a>
      <a href="mailto:neilangelomartinez@gmail.com">Email</a>
      <a href="#top">Back to top ↑</a>
    </div>
```

Replace with:

```html
    <div class="socials">
      <a href="https://bit.ly/neilmartinez-linkedin" target="_blank" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/></svg>LinkedIn</a>
      <a href="mailto:neilangelomartinez@gmail.com"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Email</a>
      <a href="#top"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="M6 11l6-6 6 6"/></svg>Back to top</a>
    </div>
```

- [ ] **Step 4: Verify**

Run: `grep -o 'aria-hidden="true"' index.html | wc -l`
Expected: `33` (6 from Task 3 + 21 from Task 4 + 6 from this task — every icon
this plan adds carries `aria-hidden="true"`; the pre-existing nav
sun/moon/burger icons don't use that attribute, so this count is exactly the
icons introduced by this plan so far).

- [ ] **Step 5: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Add icons to footer and contact links"
```

---

## Task 6: Experience timeline icons

**Files:**
- Modify: `assets/css/style.css` (new `.xp__title`, `.xp__icon` rules)
- Modify: `index.html` (`#experience` section, 5 entries)

- [ ] **Step 1: Add the new icon-row rules**

Find:

```css
.xp__role { font-size: clamp(19px, 2.4vw, 24px); font-weight: 500; color: var(--text-display); letter-spacing: -0.01em; }
```

Replace with:

```css
.xp__title { display: flex; align-items: center; gap: 10px; }
.xp__icon { flex: none; color: var(--text-secondary); }
.xp__role { font-size: clamp(19px, 2.4vw, 24px); font-weight: 500; color: var(--text-display); letter-spacing: -0.01em; }
```

- [ ] **Step 2: Wrap role 1 (HK eCommerce brand) — cart icon**

Find:

```html
              <h3 class="xp__role">Media Buyer &amp; Localization</h3>
              <p class="xp__co">HK eCommerce brand</p>
```

Replace with:

```html
              <div class="xp__title"><svg class="xp__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"/></svg><h3 class="xp__role">Media Buyer &amp; Localization</h3></div>
              <p class="xp__co">HK eCommerce brand</p>
```

- [ ] **Step 3: Wrap role 2 (US eCommerce brand) — cart icon**

Find:

```html
              <h3 class="xp__role">Meta Ads Specialist</h3>
              <p class="xp__co">US eCommerce brand</p>
```

Replace with:

```html
              <div class="xp__title"><svg class="xp__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6"/></svg><h3 class="xp__role">Meta Ads Specialist</h3></div>
              <p class="xp__co">US eCommerce brand</p>
```

- [ ] **Step 4: Wrap role 3 (My own brand) — rocket icon**

Find:

```html
              <h3 class="xp__role">Founder &amp; Media Buyer</h3>
              <p class="xp__co">My own brand</p>
```

Replace with:

```html
              <div class="xp__title"><svg class="xp__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2c2.5 2 4 5.5 4 9 0 2-.5 3.7-1.3 5L12 19l-2.7-3c-.8-1.3-1.3-3-1.3-5 0-3.5 1.5-7 4-9z"/><circle cx="12" cy="9" r="1.6"/><path d="M9 16l-3 5 1-5.5M15 16l3 5-1-5.5"/></svg><h3 class="xp__role">Founder &amp; Media Buyer</h3></div>
              <p class="xp__co">My own brand</p>
```

- [ ] **Step 5: Wrap role 4 (Social media agency) — megaphone icon**

Find:

```html
              <h3 class="xp__role">Meta Ads Manager</h3>
              <p class="xp__co">Social media agency</p>
```

Replace with:

```html
              <div class="xp__title"><svg class="xp__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10v4h4l8 5V5l-8 5H3z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg><h3 class="xp__role">Meta Ads Manager</h3></div>
              <p class="xp__co">Social media agency</p>
```

- [ ] **Step 6: Wrap role 5 (Australian coaching brand) — graduation-cap icon**

Find:

```html
              <h3 class="xp__role">Media Buyer</h3>
              <p class="xp__co">Australian coaching brand</p>
```

Replace with:

```html
              <div class="xp__title"><svg class="xp__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9l10-4 10 4-10 4-10-4z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg><h3 class="xp__role">Media Buyer</h3></div>
              <p class="xp__co">Australian coaching brand</p>
```

- [ ] **Step 7: Verify all 5 entries were wrapped**

Run: `grep -c 'xp__title' index.html`
Expected: `5`

Run: `grep -c 'class="xp__role"' index.html`
Expected: `5` (unchanged — confirms no role heading was lost)

- [ ] **Step 8: Commit**

```bash
git add assets/css/style.css index.html
git commit -m "Add category icons to the experience timeline"
```

---

## Task 7: Final verification and push

**Files:** none (verification + git only)

- [ ] **Step 1: Confirm no leftover red anywhere**

Run: `grep -rn "d71921\|215, 25, 33" .`
Expected: no output.

- [ ] **Step 2: Confirm every new token is defined exactly once per theme**

Run: `grep -c "label-color:" assets/css/style.css`
Expected: `2`

- [ ] **Step 2b: Confirm the full icon count added by this plan**

Run: `grep -o 'aria-hidden="true"' index.html | wc -l`
Expected: `38` (6 services + 21 chips + 6 footer/contact + 5 experience)

- [ ] **Step 3: Sanity-check the HTML isn't obviously broken**

Run: `python3 -c "import re; s=open('index.html').read(); print('svg open', s.count('<svg')); print('svg close', s.count('</svg>'))"`
Expected: the two counts match exactly.

- [ ] **Step 4: Review the full diff one more time before pushing**

Run: `git log --oneline -8` and `git diff origin/main --stat`
Confirm the commit list matches Tasks 1–6 and only `assets/css/style.css`
and `index.html` changed.

- [ ] **Step 5: Push to the remote**

```bash
git push origin main
```

- [ ] **Step 6: Tell the owner it's live and ask them to QA**

The owner explicitly wants to do visual QA themselves rather than have this
session use the Browser/Preview tool — so the final step is to report what
shipped and hand it back to them to check on
https://neilangelomartinez.github.io/ once GitHub Pages redeploys (usually
under a minute after push), in both light and dark theme.
