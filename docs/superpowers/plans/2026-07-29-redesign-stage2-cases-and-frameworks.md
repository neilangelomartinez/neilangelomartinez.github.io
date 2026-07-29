# Redesign Stage 2: Case Studies + Process + How I Think — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the three existing case studies into the six-part
consulting format with dashboard-style metric tiles, add the two PH clinic cases
that currently have no case study at all, and add the two new framework sections
(Process, How I Think).

**Architecture:** Additive. New CSS components (`.metric-grid`, `.metric`,
`.process`, `.principle`) are appended to `assets/css/style.css` using the new
Stage 1 tokens directly — no compatibility aliases. The existing `.case`
component is restyled in place. Case study markup moves from a 3-row `<dl>` to a
6-part structure with a metric tile grid.

**Tech Stack:** Plain HTML/CSS. No JS changes in this stage.

**Scope:** Stage 2 of 3 from
`docs/superpowers/specs/2026-07-29-portfolio-redesign-design.md`. Stage 3
(section reorder, nav, retained-section restyle, `style-guide.md` rewrite)
follows. Site is deployable at the end of this plan.

---

## ⚠️ Approval gate: Key Learnings

The spec records that **no source material contains Neil's learnings** from these
engagements. Task 3 writes drafts that are strictly derivable from figures
already published on the page. They are his professional opinions under his name
and **must be reviewed by him before this stage is considered done**. The draft
text is listed in full in Task 3 so he can read it without digging through
markup. Do not describe them to him as verified.

---

## Data inventory (confirmed — nothing outside this table may appear)

| Case | Confirmed figures |
|---|---|
| HK eCommerce | HK$42M spend · 1.97x ROAS · 1.70 target · 129,671 purchases · 263M impressions · 14 markets · ~10 campaigns · 14 ad accounts |
| US eCommerce | $11.6M spend · 0.92x ROAS · 0.60 target · 127,606 purchases · 695M impressions · peak $500K–$1M/mo spend · peak $3–5M/mo revenue |
| Own brand | ₱1.44M spend · ₱3.34M sales · 2.31x avg ROAS · 5.12x best month · 1,852 sales · 2.98x at 60% margin over one 6-month stretch |
| PH Aesthetic Clinic | ₱656,692 spend · 28,696 conversations · ₱22.88 cost/result · 7,661,682 impressions · 1,918,627 reach · 3.99 frequency |
| PH Eyebrow & Aesthetic Clinic | ₱183,896 spend · 8,332 conversations · ₱22.07 cost/result · 1,356,891 impressions · 20,160 link clicks · ₱9.12 CPC |

Clinic impressions/reach/frequency/clicks/CPC were read directly off the two
Ads Manager screenshots during design and cross-checked against the spend and
cost-per-result figures already on the site.

**CPA and CTR do not appear anywhere.** No source exists for them.

---

## Task 1: Add the two clinic screenshots

**Files:**
- Create: `assets/images/case-clinic-aesthetic.jpg`
- Create: `assets/images/case-clinic-eyebrow.jpg`

- [ ] **Step 1: Convert and downscale both**

Source files already have the client name redacted in-image.

```bash
cd /Users/neilangelomartinez/Documents/myportfolio/assets/images
sips -Z 1400 --setProperty formatOptions 72 \
  "$HOME/Desktop/Aesthetics Clinic Ads Manager.png" --out case-clinic-aesthetic.jpg
sips -Z 1400 --setProperty formatOptions 72 \
  "$HOME/Desktop/Eyebrow Clinic Ads Manager.png" --out case-clinic-eyebrow.jpg
```

- [ ] **Step 2: Verify size and weight**

Run: `ls -la assets/images/case-clinic-*.jpg`
Expected: both exist, each comfortably under 400KB (the existing
`case-us.webp` is 164KB; these are JPEG so somewhat larger is fine).

- [ ] **Step 3: Commit**

```bash
git add assets/images/case-clinic-aesthetic.jpg assets/images/case-clinic-eyebrow.jpg
git commit -m "Add Ads Manager screenshots for both PH clinic cases"
```

---

## Task 2: Case study CSS

**Files:**
- Modify: `assets/css/style.css` (replaces the CASE STUDIES block)

- [ ] **Step 1: Replace the whole case-study CSS block**

Replace everything from the `CASE STUDIES` banner comment through the
`@media (max-width: 720px) { .case__body.is-shot .case__narrative { ... } }`
line — this includes the dead `.terminal` and `.tbl` rules, which no markup has
used since the screenshots replaced the fake tables — with:

```css
/* ================================================================
   CASE STUDIES
   ================================================================ */
.case {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--s-wide);
  overflow: hidden;
  transition: box-shadow var(--tr);
}
.case:hover { box-shadow: var(--shadow-md); }

.case__head {
  display: flex; flex-wrap: wrap; gap: 16px;
  align-items: flex-start; justify-content: space-between;
  padding: 26px 28px 22px;
  border-bottom: 1px solid var(--line);
}
.case__title {
  font-size: clamp(20px, 2.4vw, 27px);
  font-weight: 700; letter-spacing: -0.02em;
  color: var(--text-display);
}
.case__overview {
  font-family: var(--ff-mono); font-size: 12px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-secondary); margin-top: 8px;
}
.case__badge {
  font-family: var(--ff-mono); font-size: 11px;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent); background: var(--accent-soft);
  border-radius: var(--radius-pill);
  padding: 7px 14px; white-space: nowrap;
}

/* Narrative: Challenge / Strategy / Execution */
.case__narrative {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 22px 32px;
  padding: 26px 28px;
  border-bottom: 1px solid var(--line);
}
.cn-row dt {
  font-family: var(--ff-mono); font-size: 11px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-tertiary); margin-bottom: 8px;
}
.cn-row dd { color: var(--text-secondary); font-size: 15px; line-height: 1.55; }

/* Results — dashboard tiles, not prose */
.metric-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1px;
  background: var(--line);
  border-bottom: 1px solid var(--line);
}
.metric { background: var(--surface); padding: 20px 22px; }
.metric__v {
  font-size: clamp(20px, 2.1vw, 26px);
  font-weight: 700; letter-spacing: -0.02em;
  color: var(--text-display);
  font-variant-numeric: tabular-nums;
}
.metric__v .sub { font-size: 13px; font-weight: 400; color: var(--text-tertiary); letter-spacing: 0; }
.metric--win .metric__v { color: var(--accent); }
.metric__k {
  margin-top: 6px;
  font-family: var(--ff-mono); font-size: 10.5px;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-secondary);
}

/* Screenshot + learning */
.shot { padding: 24px 28px; }
.browser__img { display: block; border-radius: var(--radius-md); overflow: hidden; }
.browser__img img { width: 100%; height: auto; display: block; }
.shot__cap {
  font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.03em;
  color: var(--text-tertiary); margin-top: 12px;
}
.case__learning {
  padding: 22px 28px 26px;
  border-top: 1px solid var(--line);
  background: var(--surface-2);
}
.case__learning dt {
  font-family: var(--ff-mono); font-size: 11px;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 8px;
}
.case__learning dd { color: var(--text-primary); font-size: 15px; line-height: 1.55; max-width: 78ch; }

@media (max-width: 900px) {
  .case__narrative { grid-template-columns: 1fr; }
}
@media (max-width: 720px) {
  .case__head { padding: 20px; }
  .case__narrative, .shot, .case__learning { padding: 20px; }
}
```

- [ ] **Step 2: Verify the dead table rules are gone**

Run: `grep -c '\.tbl\|\.terminal' assets/css/style.css`
Expected: `0`

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "Restyle case studies as elevated cards with metric tiles"
```

---

## Task 3: Rewrite all five case studies

**Files:**
- Modify: `index.html` (`#work` section)

Each case follows this shape. `.case__badge` keeps its existing per-case text.

```html
<article class="case reveal">
  <div class="case__head">
    <div>
      <h3 class="case__title">TITLE</h3>
      <p class="case__overview">OVERVIEW</p>
    </div>
    <span class="case__badge">BADGE</span>
  </div>
  <dl class="case__narrative">
    <div class="cn-row"><dt>Challenge</dt><dd>…</dd></div>
    <div class="cn-row"><dt>Strategy</dt><dd>…</dd></div>
    <div class="cn-row"><dt>Execution</dt><dd>…</dd></div>
  </dl>
  <div class="metric-grid">
    <div class="metric"><div class="metric__v">…</div><div class="metric__k">…</div></div>
    …
  </div>
  <div class="shot">
    <a class="browser__img" href="IMG" target="_blank" rel="noopener">
      <img src="IMG" alt="…" loading="lazy" /></a>
    <p class="shot__cap">…</p>
  </div>
  <dl class="case__learning">
    <dt>Key learning</dt><dd>…</dd>
  </dl>
</article>
```

### Case 1 — HK eCommerce brand

- **Title:** HK eCommerce brand: scaling across markets
- **Overview:** Marketing VA · Remote Hong Kong · since Jan 2026
- **Badge:** Localization · ABO · 14 markets
- **Challenge:** Grow a Hong Kong eCommerce brand across many countries and beat a 1.70 ROAS target.
- **Strategy:** Treat every market as its own account rather than one global campaign with translated copy, so creative and landing page could match each region's angle.
- **Execution:** Built and optimized the campaigns myself with an ABO focus, localized ads per market with Manus, and built matching landing pages. About 10 campaigns across 14 ad accounts.
- **Metrics:** `HK$42M` Total spend · `1.97x` Blended ROAS *(win, sub: "vs 1.70 target")* · `129,671` Purchases · `263M` Impressions · `14` Markets
- **Screenshot:** `case-hk.webp`, caption `1.97x ROAS vs 1.70 target · HK$42M spend · 129,671 purchases · client redacted · tap to enlarge`
- **Key learning (DRAFT):** Beating a blended target across 14 markets came from treating localization as a creative problem, not a translation one. The markets that pulled their weight were the ones where the landing page carried the same angle as the ad, not just the same language.

### Case 2 — US eCommerce brand

- **Title:** US eCommerce brand: optimizing at scale
- **Overview:** Marketing VA · Remote US · since April 2024
- **Badge:** Optimization · Daily reporting
- **Challenge:** Keep a large US eCommerce account above a 0.60 ROAS target while it spends into the millions.
- **Strategy:** Work inside the account manager's guardrails and make daily reporting the early-warning system, so drift gets caught before it costs a week of budget.
- **Execution:** Handle the Meta upload, daily reporting, and daily optimization. I run everything on the account except ad-set budget changes. At peak the account spent $500K–$1M a month and generated $3–5M in monthly revenue.
- **Metrics:** `$11.6M` Total spend · `0.92x` Blended ROAS *(win, sub: "vs 0.60 target")* · `127,606` Purchases · `695M` Impressions
- **Screenshot:** `case-us.webp`, caption `0.92x ROAS vs 0.60 target · $11.6M spend · 127,606 purchases · client redacted · tap to enlarge`
- **Key learning (DRAFT):** At this spend level the job is drift detection, not big swings. Reading the account daily catches a slipping ROAS days earlier than a weekly cadence would, and days are expensive when the account is spending six figures a month.

### Case 3 — Own brand

- **Title:** My own brand: profitable from scratch
- **Overview:** Owner · Remote Philippines · since Jan 2025
- **Badge:** Owner · eCommerce · PH
- **Challenge:** Build and grow my own brand at a profit, owning every part from strategy to creative to tracking.
- **Strategy:** Run it as a testing ground where profit, not ROAS, is the scoreboard, since owning the P&L meant I could see what a given return actually banked.
- **Execution:** Run all the ads myself: testing creative, building campaigns, scaling, and tracking results. One 6-month stretch held a 2.98x ROAS at a 60% profit margin.
- **Metrics:** `₱1.44M` Total spend · `₱3.34M` Total sales · `2.31x` Average ROAS · `5.12x` Best month *(win)* · `1,852` Sales
- **Screenshot:** `case-ownbrand.webp`, caption `2.31x avg / 5.12x best ROAS · ₱1.44M spend · 1,852 sales · name redacted · tap to enlarge`
- **Key learning (DRAFT):** Owning the P&L changed which number I optimized for. A 2.31x average that clears a 60% margin is a better business than a higher ROAS on a thinner one, and I would not have seen that running someone else's account.

### Case 4 — PH Aesthetic Clinic *(new case)*

- **Title:** PH aesthetic clinic: booking inquiries at scale
- **Overview:** Media Buyer · Remote Philippines · since Jan 2026
- **Badge:** Click-to-Messenger · Sales
- **Challenge:** Fill the clinic's calendar with booking inquiries at a predictable cost per conversation.
- **Strategy:** Send traffic to Messenger rather than a lead form, so inquiries land in the channel the clinic's team already answers from.
- **Execution:** Run sales-focused Click-to-Messenger campaigns and track cost per conversation month over month, refreshing creative as frequency climbs.
- **Metrics:** `₱656,692` Total spend · `28,696` Conversations · `₱22.88` Cost per result *(win)* · `7.66M` Impressions · `1.92M` Reach · `3.99` Frequency
- **Screenshot:** `case-clinic-aesthetic.jpg`, caption `28,696 conversations · ₱22.88 cost per result · ₱656,692 spend · client redacted · tap to enlarge`
- **Key learning (DRAFT):** Frequency is the number I watch on a local account. At 3.99 against 1.92M reach the audience is close to saturated, and that is the point to refresh creative or widen targeting rather than push more budget through the same ads.

### Case 5 — PH Eyebrow & Aesthetic Clinic *(new case)*

- **Title:** PH eyebrow &amp; aesthetic clinic: engagement-led inquiries
- **Overview:** Media Buyer · Remote Philippines · since Jan 2026
- **Badge:** Click-to-Messenger · Engagement
- **Challenge:** Hit the same inquiry-volume goal on a much smaller monthly budget.
- **Strategy:** Optimize for engagement and watch cost per link click as the early signal, since a small budget gives less room to recover from a bad week.
- **Execution:** Run Click-to-Messenger campaigns for booking inquiries, holding a ₱9.12 average cost per link click across 20,160 clicks.
- **Metrics:** `₱183,896` Total spend · `8,332` Conversations · `₱22.07` Cost per result *(win)* · `1.36M` Impressions · `20,160` Link clicks · `₱9.12` Cost per click
- **Screenshot:** `case-clinic-eyebrow.jpg`, caption `8,332 conversations · ₱22.07 cost per result · ₱183,896 spend · client redacted · tap to enlarge`
- **Key learning (DRAFT):** A smaller budget did not mean a worse cost per conversation. This account landed within ₱1 of the larger clinic's cost per result, which says the offer and the creative were doing more work than the budget was.

- [ ] **Step 1: Replace all three existing `<article class="case">` blocks** using the shape above with Cases 1–3 content.

- [ ] **Step 2: Add Cases 4 and 5** as two new `<article class="case reveal">` blocks after Case 3, inside the same `.wrap`.

- [ ] **Step 3: Verify structure**

Run: `grep -c '<article class="case reveal">' index.html` → Expected: `5`
Run: `grep -c '<dl class="case__learning">' index.html` → Expected: `5`
Run: `grep -o 'class="metric"' index.html | wc -l` → Expected: `26` — one tile
per confirmed figure, distributed 5 + 4 + 5 + 6 + 6 across the five cases. A
different number means either a figure was dropped or one was invented.

- [ ] **Step 4: Verify no unsourced metric leaked in**

Run: `grep -io 'CPA\|CTR\|click-through' index.html`
Expected: no output.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Restructure case studies into six-part format with metric tiles"
```

---

## Task 4: Process section

**Files:**
- Modify: `index.html` (new section after `#work`)
- Modify: `assets/css/style.css` (append)

- [ ] **Step 1: Add the CSS**

```css
/* ================================================================
   PROCESS
   ================================================================ */
.process {
  display: grid; grid-template-columns: repeat(7, 1fr);
  gap: 1px; background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg); overflow: hidden;
}
.pstep { background: var(--surface); padding: 22px 18px; }
.pstep__n {
  font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.1em;
  color: var(--accent);
}
.pstep__h {
  font-size: 15px; font-weight: 700; letter-spacing: -0.01em;
  color: var(--text-display); margin: 10px 0 8px;
}
.pstep__p { font-size: 13px; line-height: 1.5; color: var(--text-secondary); }

@media (max-width: 1024px) { .process { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 720px)  { .process { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px)  { .process { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Add the markup**

Section id `process`, index `02 / PROCESS`, heading `How I run an account`, with
these seven steps:

| # | Step | Copy |
|---|---|---|
| 01 | Audit | Read the account before touching it: what's spending, what's converting, and what's quietly drifting. |
| 02 | Research | Offer, audience, and competitor angles, so the first creative is a hypothesis rather than a guess. |
| 03 | Campaign Structure | ABO or CBO chosen for the testing question in front of me, not out of habit. |
| 04 | Creative Testing | Several distinct angles into cold audiences, and the market picks the winner. |
| 05 | Optimization | Daily reads against the target metric, cutting and scaling on evidence instead of on a single day. |
| 06 | Scaling | More budget where the math holds, not where the ROAS looked good yesterday. |
| 07 | Reporting | A clear weekly view, often a live dashboard, of CPL, ROAS, and creative performance. |

- [ ] **Step 3: Verify**

Run: `grep -c 'class="pstep"' index.html` → Expected: `7`

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add the optimization process section"
```

---

## Task 5: How I Think section

**Files:**
- Modify: `index.html` (new section after `#process`)
- Modify: `assets/css/style.css` (append)

- [ ] **Step 1: Add the CSS**

```css
/* ================================================================
   HOW I THINK
   ================================================================ */
.principles { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--s-med); }
.principle {
  background: var(--surface);
  border: 1px solid var(--line);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 26px 28px;
  transition: box-shadow var(--tr), transform var(--tr);
}
.principle:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.principle__h {
  font-size: 19px; font-weight: 700; letter-spacing: -0.015em;
  color: var(--text-display); margin-bottom: 10px;
}
.principle__p { color: var(--text-secondary); font-size: 15px; line-height: 1.55; }

@media (max-width: 720px) {
  .principles { grid-template-columns: 1fr; }
  .principle:hover { transform: none; }
}
```

- [ ] **Step 2: Add the markup**

Section id `thinking`, index `03 / PHILOSOPHY`, heading `How I think`, with these
four principles:

| Principle | Supporting line |
|---|---|
| I optimize for business metrics, not vanity metrics. | Reach and CTR are diagnostics. The number that decides whether a campaign stays on is what the business actually banks. |
| Creative is usually the biggest growth lever. | Targeting plateaus quickly. A genuinely new angle moves performance further than another audience test will. |
| Data drives every optimization decision. | Two years as an analyst before media buying taught me to wait for signal rather than react to one bad day. |
| Testing never stops. | Every winner decays. What the next test is matters as much as what the current winner is doing. |

- [ ] **Step 3: Verify**

Run: `grep -c 'class="principle"' index.html` → Expected: `4`

- [ ] **Step 4: Commit**

```bash
git add index.html assets/css/style.css
git commit -m "Add the how I think philosophy section"
```

---

## Task 6: Verify, push, and surface the Key Learnings for approval

**Files:** none (verification and git only)

- [ ] **Step 1: Structural checks**

```bash
python3 -c "
s = open('index.html', encoding='utf-8').read()
for t in ('div','section','svg','figure','article','dl'):
    o, c = s.count('<'+t), s.count('</'+t+'>')
    print(f'{t:9}{o:4}{c:4} ' + ('OK' if o == c else 'MISMATCH'))
"
```
Expected: every row `OK`.

- [ ] **Step 2: Confirm no unsourced figures**

Run: `grep -io 'CPA\|CTR' index.html`
Expected: no output.

- [ ] **Step 3: Bump the stylesheet cache version**

In `index.html`, change `style.css?v=2` to `style.css?v=3` so Neil's QA does not
hit a cached stylesheet.

- [ ] **Step 4: Push**

```bash
gh auth switch --hostname github.com --user neilangelomartinez && git push origin main
```

- [ ] **Step 5: Surface the five Key Learnings verbatim for Neil's approval**

Quote all five draft learnings back to him in chat and state plainly that they
are drafts written from the published figures, not statements he made. Ask him
to correct or replace any that misrepresent his thinking. Do not treat the stage
as complete until he has responded on these.
