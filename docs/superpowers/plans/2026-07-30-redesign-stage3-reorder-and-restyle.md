# Redesign Stage 3: Reorder + Restyle + Style Guide — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish the redesign: reorder sections so the biography lands last,
restyle every section still on the old flat layout, delete the compatibility
token aliases, and rewrite `style-guide.md` to describe the system that now
exists.

**Architecture:** No new components. Every remaining section swaps old token
names (`--radius`, `--label-color`, `--text-disabled`, `--accent-dim`) for the
Stage 1 names and picks up the card treatment (`--surface`, `--radius-lg`,
`--shadow-sm`, hover lift). Once no rule references an alias, the alias block is
deleted, which is the definition of done for the token migration.

**Tech Stack:** Plain HTML/CSS. No JS changes.

**Scope:** Stage 3 of 3 from
`docs/superpowers/specs/2026-07-29-portfolio-redesign-design.md`.

---

## Bug found during survey

Stage 2 inserted Process and How I Think without renumbering, so the page
currently shows **two `02 /` and two `03 /`** section indices:

| Current | Section |
|---|---|
| `01 / SELECTED WORK` | #work |
| `02 / PROCESS` | #process |
| `03 / PHILOSOPHY` | #thinking |
| `02 / DIFFERENTIATOR` | #ai ← duplicate |
| `03 / SERVICES` | #services ← duplicate |
| `04 / STACK` | #skills |
| `05 / EXPERIENCE` | #experience |
| `06 / CREDENTIALS` | #certs |

Task 1 fixes this as part of the reorder.

---

## Task 1: Reorder sections and renumber

Target order: Hero → Work → Process → Thinking → AI → Services → Tools →
Experience → **About** → Contact.

`#about` moves from position 2 to position 9. `#certs` is removed as a standalone
section (its four credentials move into About in Task 2).

**Files:** Modify `index.html`

- [ ] **Step 1: Cut the `#about` section** (from `<!-- ==== ABOUT ==== -->`
      through its closing `</section>`) and re-insert it immediately after the
      `#experience` section's closing `</section>`.

- [ ] **Step 2: Renumber every `.section-idx`** to:

| Section | New index |
|---|---|
| #work | `01 / SELECTED WORK` |
| #process | `02 / PROCESS` |
| #thinking | `03 / PHILOSOPHY` |
| #ai | `04 / DIFFERENTIATOR` |
| #services | `05 / SERVICES` |
| #skills | `06 / TOOLS` |
| #experience | `07 / EXPERIENCE` |
| #about | `08 / ABOUT` |

- [ ] **Step 3: Rename the Skills heading.** `<h2>Skills &amp; tools</h2>`
      becomes `<h2>Tools I work in</h2>`.

- [ ] **Step 4: Give About a section head.** It currently uses a bare
      `.eyebrow`; switch to the standard `.section-head` + `.section-idx`
      pattern so it matches every other section now that it is no longer
      second on the page.

- [ ] **Step 5: Verify**

Run: `grep -o 'section-idx">[0-9]* / [A-Z ]*' index.html`
Expected: eight lines, indices `01` through `08`, each appearing exactly once.

Run: `grep -n 'id="about"\|id="experience"\|id="contact"' index.html`
Expected: `#experience` line number < `#about` line number < `#contact`.

- [ ] **Step 6: Commit**

```bash
git add index.html && git commit -m "Reorder sections so the bio lands last, and fix duplicate section numbers"
```

---

## Task 2: Fold certifications into About

**Files:** Modify `index.html`, `assets/css/style.css`

- [ ] **Step 1: Delete the `#certs` section markup** entirely (comment through
      `</section>`).

- [ ] **Step 2: Add a compact credential row** at the end of the About body,
      after `.about__meta`:

```html
            <div class="creds">
              <p class="creds__k">Certifications</p>
              <ul class="creds__list">
                <li><a href="https://www.coursera.org/account/accomplishments/professional-cert/N67XA3YG554N" target="_blank" rel="noopener">Google Data Analytics <span class="creds__by">Google · Coursera</span></a></li>
                <li><a href="https://www.coursera.org/account/accomplishments/professional-cert/WPGAJW8FEV9T" target="_blank" rel="noopener">IT Automation with Python <span class="creds__by">Google · Coursera</span></a></li>
                <li><a href="https://www.credly.com/badges/af4fe579-f8e5-46a4-9ba2-4103f9627e4c/public_url" target="_blank" rel="noopener">Power Platform Fundamentals (PL-900) <span class="creds__by">Microsoft</span></a></li>
                <li><a href="https://www.linkedin.com/learning/certificates/c7a9e83acd36bcb149346a20ab7351d1f396eb32b3c8e33f8004121a4d533603" target="_blank" rel="noopener">Career Essentials in Data Analysis <span class="creds__by">Microsoft · LinkedIn</span></a></li>
              </ul>
            </div>
```

All four verification URLs are preserved exactly.

- [ ] **Step 3: Replace the `.certs` CSS block** with:

```css
/* Credentials — folded into About */
.creds { margin-top: var(--s-wide); border-top: 1px solid var(--line); padding-top: 20px; }
.creds__k {
  font-family: var(--ff-mono); font-size: 11px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-tertiary); margin-bottom: 14px;
}
.creds__list { display: grid; gap: 10px; }
.creds__list a {
  display: flex; flex-wrap: wrap; gap: 4px 10px; align-items: baseline;
  font-size: 15px; color: var(--text-primary);
  transition: color var(--tr);
}
.creds__list a:hover { color: var(--accent); }
.creds__by {
  font-family: var(--ff-mono); font-size: 11px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-tertiary);
}
```

- [ ] **Step 4: Verify**

Run: `grep -c 'class="cert\b\|class="certs"' index.html` → Expected: `0`
Run: `grep -c 'creds__list' index.html` → Expected: `1`
Run: `grep -c 'coursera.org\|credly.com\|linkedin.com/learning' index.html` → Expected: `4`
Run: `grep -n '\.certs\|\.cert__' assets/css/style.css` → Expected: no output

- [ ] **Step 5: Commit**

```bash
git add index.html assets/css/style.css && git commit -m "Fold certifications into About as a compact credential list"
```

---

## Task 3: Update the nav

**Files:** Modify `index.html`

- [ ] **Step 1: Replace the nav link list**

```html
    <nav class="nav__links" aria-label="Primary">
      <a href="#work">Case Studies</a>
      <a href="#process">Process</a>
      <a href="#services">Services</a>
      <a href="#skills">Tools</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
```

The existing `activeNav()` scroll-spy in `assets/js/script.js` resolves targets
from each link's `href`, so adding `#process` and `#about` wires them up with no
JS change. `#ai` and `#experience` remain reachable by scrolling.

- [ ] **Step 2: Verify every nav target exists**

```bash
for id in $(grep -o 'href="#[a-z]*"' index.html | grep -v '#top' | sed 's/href="#//;s/"//' | sort -u); do
  grep -q "id=\"$id\"" index.html && echo "OK   #$id" || echo "BROKEN #$id"
done
```
Expected: every line `OK`.

- [ ] **Step 3: Commit**

```bash
git add index.html && git commit -m "Update nav for the new section order"
```

---

## Task 4: Restyle the remaining sections

Every rule below moves to Stage 1 token names and the card treatment.

**Files:** Modify `assets/css/style.css`

- [ ] **Step 1: `.section-idx` and `.status-pill`** — swap `var(--label-color)`
      for `var(--text-tertiary)` and `var(--text-secondary)` respectively.

- [ ] **Step 2: About** — `.about__lead` gets `font-weight: 500` and
      `letter-spacing: -0.02em`; `.tag` moves to `--radius-pill`, `--surface`
      background, and `--text-secondary`.

- [ ] **Step 3: AI Workflow cards** — `.ai-card` becomes a real card:

```css
.ai-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 26px 28px;
  transition: box-shadow var(--tr), transform var(--tr);
}
.ai-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
```
plus `@media (prefers-reduced-motion: reduce) { .ai-card:hover { transform: none; } }`

- [ ] **Step 4: Services grid** — `.svc-grid` becomes a 1px-gap grid over a
      `--line` background (matching `.metric-grid`), each `.svc` on `--surface`,
      outer container `--radius-lg` with `--shadow-sm`. `.svc__icon` colour
      moves to `--text-tertiary`.

- [ ] **Step 5: Tools/skills** — `.skillset` gets `--surface`, `--radius-lg`,
      `1px solid var(--line)`, `--shadow-sm`, and padding; `.chip` moves to
      `--radius-pill` with `--surface-2` background; `.chip--ai` uses
      `--accent-soft` background and `--accent` text (replacing the last
      `--accent-dim` usage).

- [ ] **Step 6: Experience timeline** — `.xp` rows keep the top-border rhythm
      but `.xp__when b` moves from `--accent` to `--text-display` so the accent
      stops competing with the metric tiles; `.xp__co` moves to
      `--text-secondary`; `.xp-group-label` to `--text-tertiary`.

- [ ] **Step 7: Contact and footer** — `.contact` drops its top border (the
      section spacing carries it now); `.footer p` and `.footer .socials a` move
      to `--text-tertiary` / `--text-secondary`.

- [ ] **Step 8: Verify no alias is referenced any more**

Run: `grep -c 'var(--label-color)\|var(--text-disabled)\|var(--bg-elev)\|var(--accent-dim)\|var(--radius)[^-]' assets/css/style.css`
Expected: `0`

- [ ] **Step 9: Commit**

```bash
git add assets/css/style.css && git commit -m "Restyle remaining sections onto the new design tokens"
```

---

## Task 5: Delete the compatibility aliases

This is the definition of done for the token migration started in Stage 1.

**Files:** Modify `assets/css/style.css`

- [ ] **Step 1: Delete the alias block** from `:root`:

```css
  /* Compatibility aliases — consumed by not-yet-restyled sections.
     Deleted in Stage 3 once every component uses the new names. */
  --radius: var(--radius-md);
  --label-color: var(--text-secondary);
  --text-disabled: var(--text-tertiary);
  --bg-elev: var(--surface-2);
  --accent-dim: var(--accent-soft);
```

- [ ] **Step 2: Verify nothing broke**

Run: `grep -c 'label-color\|text-disabled\|bg-elev\|accent-dim' assets/css/style.css`
Expected: `0`

Run: `grep -oE 'var\(--[a-z0-9-]+\)' assets/css/style.css | sort -u | sed 's/var(--//;s/)//' > /tmp/used.txt; grep -oE '^\s+--[a-z0-9-]+:' assets/css/style.css | sed 's/[ :]//g;s/--//' | sort -u > /tmp/defined.txt; comm -23 /tmp/used.txt /tmp/defined.txt`
Expected: no output. Any line printed is a token that is used but never defined,
which is the exact failure this task risks.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css && git commit -m "Delete the Stage 1 compatibility token aliases"
```

---

## Task 6: Rewrite the style guide and fix the stale comment

**Files:** Modify `style-guide.md`, `index.html`

- [ ] **Step 1: Replace `style-guide.md` wholesale.** It currently documents
      "Nothing OS" (monochrome canvas, red accent, 4px radius, no shadows, Doto)
      — a system that no longer exists anywhere in the codebase. Rewrite it to
      describe the current tokens, elevation, typography, and component rules.

- [ ] **Step 2: Fix the `ASSET SWAP GUIDE` comment** at the top of
      `index.html`. It references `.adunit__creative` and `.terminal`, both
      deleted, and a `<table>` swap that no longer applies. Replace with an
      accurate note about where real assets live.

- [ ] **Step 3: Verify**

Run: `grep -ci 'nothing os\|doto\|red is an event' style-guide.md` → Expected: `0`
Run: `grep -c 'adunit\|terminal' index.html` → Expected: `0`

- [ ] **Step 4: Commit**

```bash
git add style-guide.md index.html && git commit -m "Rewrite the style guide for the new design system"
```

---

## Task 7: Final verification and push

- [ ] **Step 1: Structural checks**

```bash
python3 -c "
s = open('index.html', encoding='utf-8').read()
for t in ('div','section','svg','figure','article','dl','ul','li'):
    o, c = s.count('<'+t), s.count('</'+t+'>')
    print(f'{t:9}{o:4}{c:4} ' + ('OK' if o == c else 'MISMATCH'))
"
node --check assets/js/script.js
```
Expected: every row `OK`, JS silent.

- [ ] **Step 2: Every nav anchor and image resolves**

```bash
for id in $(grep -o 'href="#[a-z]*"' index.html | grep -v '#top' | sed 's/href="#//;s/"//' | sort -u); do
  grep -q "id=\"$id\"" index.html || echo "BROKEN ANCHOR #$id"; done
for f in $(grep -o './assets/images/[A-Za-z0-9._-]*' index.html | sort -u | sed 's|./||'); do
  [ -f "$f" ] || echo "MISSING IMAGE $f"; done
echo "checks done"
```
Expected: only `checks done`.

- [ ] **Step 3: Bump the stylesheet cache version** to `?v=6`.

- [ ] **Step 4: Push**

```bash
gh auth switch --hostname github.com --user neilangelomartinez && git push origin main
```

- [ ] **Step 5: Report to Neil** what changed, and restate the two items still
      awaiting his decision: the five draft **Key Learnings** and the
      **eCommerce vs Wellness/Tech** client naming question.
