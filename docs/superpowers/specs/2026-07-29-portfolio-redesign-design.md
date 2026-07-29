# Portfolio Redesign: Performance Marketing Consulting Site

Date: 2026-07-29
Status: Approved

## Goal

Transform the portfolio from a resume-style showcase into a premium performance
marketing site that reads like a consulting report (Stripe / Linear / Vercel /
McKinsey), not a designer portfolio. The page must answer, above the fold:
how much spend has he managed, what results did he produce, how does he think,
why hire him.

Priority order: **metrics first, case studies second, biography last.**

## Context

Current site (`index.html` + `assets/css/style.css`, no build step, Jekyll
passthrough on GitHub Pages) uses a "Nothing OS" design language documented in
`style-guide.md`: monochrome canvas, "color is an event", no shadows or
gradients, 4px radius, dot-grid ornament, outline-only icons, Doto dot-matrix
display font for numbers.

That language is the opposite of the target. This redesign **replaces** it, so
`style-guide.md` is rewritten as part of the work rather than left describing a
system that no longer exists.

## 1. Design system

### Theme strategy

Light becomes the default and first-class theme (currently dark is). Dark is
retained behind the existing `[data-theme]` toggle and `localStorage`
persistence, so no JS behavior changes — only token values and which theme is
the fallback.

The `<html data-theme="dark">` attribute in markup and the `initial` fallback in
`assets/js/script.js`'s `theme()` IIFE both flip to `light`.

### Color tokens

| Token | Light (default) | Dark |
|---|---|---|
| `--bg` | `#f7f8fa` | `#0b0f17` |
| `--surface` | `#ffffff` | `#141a24` |
| `--surface-2` | `#f1f3f7` | `#1b222e` |
| `--text-display` | `#111827` | `#f9fafb` |
| `--text-primary` | `#1f2937` | `#e5e7eb` |
| `--text-secondary` | `#6b7280` | `#9ca3af` |
| `--text-tertiary` | `#9ca3af` | `#6b7280` |
| `--line` | `rgba(17,24,39,0.08)` | `rgba(255,255,255,0.09)` |
| `--line-strong` | `rgba(17,24,39,0.16)` | `rgba(255,255,255,0.18)` |
| `--accent` | `#2563eb` | `#3b82f6` |
| `--accent-soft` | `rgba(37,99,235,0.08)` | `rgba(59,130,246,0.14)` |

The dark accent is lifted from `#2563eb` to `#3b82f6` because `#2563eb` on a
`#0b0f17` background is too low-contrast for body-adjacent text.

`--bg-alt` and the `.band-alt` alternating-section treatment are **removed**.
The new system separates sections with whitespace and card elevation instead of
background bands, which is what the reference sites do. This deletes a feature
added earlier in the project — that is intentional, not an oversight.

### Elevation and shape

```css
--radius-lg: 16px;   /* cards */
--radius-md: 10px;   /* chips, small controls, metric tiles */
--radius-pill: 999px;

--shadow-sm: 0 1px 2px rgba(17,24,39,0.04), 0 1px 3px rgba(17,24,39,0.06);
--shadow-md: 0 4px 6px -1px rgba(17,24,39,0.05), 0 10px 20px -6px rgba(17,24,39,0.10);
```

In dark mode both shadows are set to `none`; elevation comes from `--surface`
being lighter than `--bg`, plus the hairline border. Shadows on dark surfaces
read as dirt, not depth.

Cards get `background: var(--surface)`, `1px solid var(--line)`,
`--radius-lg`, `--shadow-sm`, and on hover: `--shadow-md` plus
`translateY(-2px)`. Hover lift is suppressed under
`prefers-reduced-motion: reduce`.

### Typography

Space Grotesk (headings/body) and Space Mono (labels/data) are retained.

**Doto is dropped entirely.** It is the strongest "designer portfolio" signal on
the page and directly fights the consulting-report read. Every number that used
Doto (hero figure, KPI values, funnel result) switches to Space Grotesk 500/700
with `font-variant-numeric: tabular-nums` so figures align in columns. The Doto
family is removed from the Google Fonts `<link>`, which also drops a font
download.

Body line-height tightens from `1.55` to `1.5`. Heading/supporting-copy contrast
increases: headings use `--text-display`, supporting copy `--text-secondary`,
and the gap between heading and body sizes widens.

### Ornament removal

- `.dotgrid` (radial dot-grid backdrop) is removed from markup and CSS.
- The `@property --mp` pixel-materialize avatar animation is removed. The
  portrait becomes a single static image, which also makes the `avatarRotate()`
  IIFE in `assets/js/script.js` dead code — it is deleted rather than left
  querying a `[data-avatar]` element that no longer rotates.

Both are Nothing-OS signatures that undercut the target aesthetic.

## 2. Information architecture

New section order (top to bottom):

1. **Hero** — headline, value prop, KPI cards
2. **Case Studies** — 5 cases
3. **Process** — 7-step framework *(new)*
4. **How I Think** — 4 principles *(new)*
5. **AI Workflow** — retained, including the 5-slide ad carousel
6. **Services**
7. **Tools** (renamed from "Skills & tools")
8. **Experience** — retained timeline
9. **About** — bio, portrait, certifications folded in
10. **Contact** — closing CTA

Nav: `Case Studies · Process · Services · Tools · About · Contact` (six items;
the brief specified five but Process is a highlight and would otherwise be
unreachable).

Section index numbers (`01 /`, `02 /` …) are renumbered to match the new order.

### Certifications

The standalone Certifications section is removed. The four credentials move into
About as a compact inline row (name + issuer, still linked to their verification
URLs). They are the receipt for the data-analyst story and are not deleted, only
demoted.

## 3. Hero

Headline: **Performance Marketing Specialist**

Value proposition, one sentence: he helps eCommerce businesses scale profitably
through paid advertising, CRO, and marketing analytics.

Below it, a 5-up KPI card row that dominates the first screen:

| Ad spend managed | Purchases driven | Best month ROAS | Markets | Impressions |
|---|---|---|---|---|
| $17M+ | 259K | 5.12x | 14 | 975M |

Cards use `--surface`, large tabular-figure numbers in `--text-display`, mono
uppercase labels in `--text-secondary`, and the existing `data-to` count-up
animation (which already respects `prefers-reduced-motion`).

**Ad spend derivation** (approved, recorded here for auditability): HK$42M at
~7.8 HKD/USD ≈ $5.4M, plus $11.6M US, plus ₱2.28M at ~58 PHP/USD ≈ $39K,
totalling ≈ $17.0M. Displayed as "$17M+" rather than a false-precision figure,
because the underlying rates float.

The portrait **moves out of the hero** into About. A large portrait competing
with the KPI row contradicts the requirement that metrics dominate the fold.
`avatar-1.webp` is used statically; the other three avatar images become unused
and are deleted.

Hero CTAs (Email me / View résumé) are retained.

The separate `.proof` KPI band that currently sits below the hero is **removed** —
its four metrics are absorbed into the hero KPI row, which is where the brief
wants them. Keeping both would show the same numbers twice.

## 4. Case studies

Five cases, each in a card. All five now carry a real Ads Manager screenshot;
the two PH clinics currently have none.

Structure per case:

- **Overview** — one line: role, client type, engagement window
- **Challenge** — the constraint or target
- **Strategy** — the approach chosen
- **Execution** — what was actually run
- **Results** — metric tiles (not prose)
- **Key Learnings** — see caveat below

Strategy and Execution are split out of the existing "What I did" copy. This is
a reorganization of text that already exists, not new claims.

### Results tiles — confirmed data only

No metric is displayed unless it is already published on the site or legible in
a source screenshot. Tile sets therefore differ per case, which is honest and
visually fine.

| Case | Tiles |
|---|---|
| HK eCommerce brand | HK$42M spend · 1.97x ROAS (1.70 target) · 129,671 purchases · 263M impressions · 14 markets |
| US eCommerce brand | $11.6M spend · 0.92x ROAS (0.60 target) · 127,606 purchases · 695M impressions |
| Own brand | ₱1.44M spend · ₱3.34M sales · 2.31x avg ROAS · 5.12x best month · 1,852 sales |
| PH Aesthetic Clinic | ₱656,692 spend · 28,696 conversations · ₱22.88 cost/result · 7.66M impressions · 1.92M reach · 3.99 frequency |
| PH Eyebrow & Aesthetic Clinic | ₱183,896 spend · 8,332 conversations · ₱22.07 cost/result · 1.36M impressions · 20,160 link clicks · ₱9.12 CPC |

The clinic impressions, reach, frequency, link clicks and CPC figures are newly
read off the two Desktop Ads Manager screenshots, which were verified during
design to match the spend and cost-per-result figures already on the site.

CPA and CTR are **not** shown anywhere. They were requested in the brief but do
not exist in any available source, and inventing them on a page recruiters will
read is not acceptable.

### Key Learnings caveat

No source material contains Neil's learnings from these engagements. Drafts will
be written that are strictly derivable from facts already on the page (e.g. that
beating a blended ROAS target across 14 localized markets depends on per-market
creative, which the HK case already states he does).

**These drafts are placeholders pending Neil's review and must not be treated as
verified.** They are his professional opinions published under his name; the
implementation plan flags them for explicit approval before the change ships.

### Screenshots

`case-hk.webp`, `case-us.webp`, `case-ownbrand.webp` are reused as-is (already
optimized). Two new assets are added from `~/Desktop`, downscaled to 1400px wide
and converted to JPEG to match the existing weight budget:

- `Aesthetics Clinic Ads Manager.png` → `assets/images/case-clinic-aesthetic.jpg`
- `Eyebrow Clinic Ads Manager.png` → `assets/images/case-clinic-eyebrow.jpg`

Both have the client name redacted in-image already. Captions note the redaction,
matching the existing three.

## 5. Process section (new)

Seven steps rendered as a numbered horizontal flow on desktop, vertical stack on
mobile: Audit → Research → Campaign Structure → Creative Testing → Optimization
→ Scaling → Reporting.

Each step gets a one-line description. This is methodology description, not a
performance claim, so it can be written without additional source data.

## 6. How I Think section (new)

Four principle cards, from the brief:

- I optimize for business metrics, not vanity metrics.
- Creative is usually the biggest growth lever.
- Data drives every optimization decision.
- Testing never stops.

Each expands to one supporting sentence tied to the analyst background.

## 7. Retained sections

**AI Workflow** keeps its two cards (AI Ad Creative, AI Landing Pages), the
AI Dashboards & Automation card, and the 5-slide swipeable carousel with its
scroll-snap behavior and JS dot indicators. Only its card styling changes to the
new system.

**Experience** keeps the Present/Past grouping and all seven roles. Only styling
changes.

**Services** (6 cards) and **Tools** (6 chip groups) keep their content and their
outline icons; icon stroke color moves to `--text-tertiary` so icons recede
against the new lighter surfaces.

## 8. Contact

Closing CTA inviting a conversation about campaign growth, analytics, or paid
strategy — framed around his active search for a media buying / marketing role,
which the current copy already establishes.

## Naming discrepancy (unresolved, carried forward)

The site describes two flagship clients as "HK eCommerce brand" and "US
eCommerce brand". Neil's own screenshot filenames call them "HK Wellness
Company" and "US Tech Company". This was raised twice during design and not
resolved.

**Existing published wording is kept unchanged.** Changing it based only on a
filename would assert something unverified about real clients. This is recorded
as an open item for Neil to correct directly if the filenames are authoritative.

## Out of scope

- Power BI / Looker Studio / dashboard / chart screenshots. None exist. The
  brief requested these sections; they are omitted rather than faked.
- CPA and CTR metrics (see above).
- Any change to `.github/workflows/jekyll-gh-pages.yml`, the résumé link, or
  contact details.

## Verification

Static site, no test runner, no build step. Verification is:

1. Structural greps and tag-balance checks after each stage.
2. `node --check assets/js/script.js` after any JS edit.
3. Confirmation that no metric appears in markup that is not in the data
   inventory above.
4. Neil's own visual QA in both light and dark themes. Per project preference,
   the Browser/Preview tool is **not** used for this work.

## Staging

Implementation runs in three reviewable stages rather than one diff:

1. **Design system + hero** — tokens, elevation, typography, ornament removal,
   theme flip, hero rebuild, proof-band removal.
2. **Case studies + new sections** — 5 restructured cases with metric tiles and
   new screenshots, Process, How I Think.
3. **Reorder + polish** — section order, nav, renumbering, certs into About,
   retained-section restyling, `style-guide.md` rewrite.
