# Visual Refresh: Blue Accent, Label Readability, Icons

Date: 2026-07-21
Status: Approved

## Context

The site (`index.html` + `assets/css/style.css`) follows a "Nothing OS" design
language: monochrome canvas, one accent color used sparingly, type-driven
hierarchy, no gradients/shadows/fills, outline-only icons (see
`style-guide.md`). This spec covers three changes the owner requested:

1. Replace the red accent (`#d71921`) with blue.
2. Improve legibility of small caption/label text without abandoning the
   "type drives hierarchy" principle — these currently rely on tiny size
   (10–13px) + low-opacity gray (`text-secondary` / `text-disabled`), which
   reads as faint/disabled rather than intentional.
3. Add a modest set of outline vector icons to reduce "wall of text" feel,
   without turning the page into an icon-heavy UI.

Body copy (paragraphs) and true headlines (h1/h2) are explicitly **out of
scope** — only caption/meta lines and field labels change size/color.

## 1. Color tokens — red → blue

Direct token swap in `:root` and `:root[data-theme="light"]` in
`assets/css/style.css`. No structural changes; accent keeps the same usage
rules (key values, active nav state, button hover/fill, eyebrow dot, scrollbar).

```css
/* both themes */
--accent: #2563eb;                     /* was #d71921 */
--accent-dim: rgba(37, 99, 235, 0.14); /* dark theme, was rgba(215,25,33,.14) */
--accent-dim: rgba(37, 99, 235, 0.10); /* light theme, was rgba(215,25,33,.10) */
```

Also update the inline favicon data-URI in `index.html` (`fill='%23d71921'` →
`fill='%232563eb'`).

Out of scope: `assets/images/favicon.png`, `apple-touch-icon.png`, and `og.png`
are raster files that may still show the old red dot. Not touched by this
spec — flag separately if the owner wants those regenerated.

## 2. Label/caption readability

### New token: `--label-color`

A muted blue-slate, distinct from `--accent`. Rationale: the style guide's
core rule is "color is an event, not a default" — if the vivid accent blue
were applied to every small label sitewide (15+ instances), it would stop
reading as special on the actual key metrics (ROAS values, CTA, etc.). A
cooler, lower-saturation blue-gray gives labels a legible, intentional look
while keeping the vivid accent reserved for true key values.

```css
/* dark theme */
--label-color: rgba(147, 181, 255, 0.82);

/* light theme */
--label-color: rgba(28, 56, 110, 0.78);
```

### Elements changing (selector → old size / color → new size / color)

| Selector | Old | New |
|---|---|---|
| `.case__tagline` | 11px, `text-secondary` | 13px, `label-color` |
| `.cn-row dt` (Challenge/What I Did/Result labels) | 10px, `text-disabled` | 12px, `label-color` |
| `.hero__role` | 13px, `text-secondary` | 14px, `label-color` |
| `.xp__co` | 12px, `text-secondary` | 13px, `label-color` |
| `.cert__by` | 10px, `text-secondary` | 12px, `label-color` |
| `.kpi__label` | 11px, `text-secondary` | 12.5px, `label-color` |
| `.funnel__k` | 11px, `text-secondary` | 12.5px, `label-color` |
| `.rost__m` | 12px, `text-secondary` | 13px, `label-color` |
| `.svc__n`, `.section-idx` (decorative index numbers) | `text-disabled` | `label-color` (size unchanged — these are decorative, not legibility-critical) |
| `.status-pill` | `text-secondary` | `label-color` |

`.hero__role span` (the "+ AI CREATIVE" highlight) keeps `--accent`, not
`--label-color` — it's a highlighted phrase, not a plain label.

### Explicitly NOT changed

Mock-UI text that simulates a real interface — `.terminal__bar .t`,
`.adunit__meta span`, `.adunit__cta small`, `.browser__foot small`,
`.browser__url` — stays as-is. These represent chrome inside a fake Ads
Manager / browser / ad-preview mockup, not portfolio copy; recoloring them
would break the "this looks like a real screenshot" illusion. Body
paragraphs (`.about__body p`, `.svc__p`, `.ai-card__p`, `.xp__pts li`, etc.)
also stay as-is per the approved scope.

## 3. Icons

**Technique:** inline SVG, `stroke="currentColor"`, `fill="none"`,
`stroke-width="1.6"`, rounded caps/joins, `viewBox="0 0 24 24"` — matching the
existing sun/moon toggle icon already in the nav. No icon library/CDN
dependency. `aria-hidden="true"` on every icon (the adjacent text already
carries the meaning).

Default color: `text-secondary` (quiet, doesn't compete with content).
Sizes: 20–22px in service cards, 22px in timeline markers, 14–16px in chips
and footer/contact links.

### Services grid (`.svc` × 6) — one icon per card, next to `.svc__h`

| # | Service | Icon |
|---|---|---|
| 01 | Meta Ads management | megaphone |
| 02 | Funnel & landing pages | funnel |
| 03 | Creative strategy & testing | flask/beaker |
| 04 | Email & SMS marketing | mail |
| 05 | Tracking & reporting | bar-chart |
| 06 | Automation | bolt/zap |

### Skills & tools chips — only literal named tools get icons

Concept chips (e.g. "A/B testing", "Pixel & CAPI", "CRO structure", "Funnel
setup", "Audience targeting", "Instant Forms", "Landing pages",
"Localization") stay text-only — there's no clean, non-arbitrary icon for a
methodology, and forcing one would look like noise.

| Chip | Icon |
|---|---|
| Meta Ads | megaphone |
| Google Ads | search (magnifying glass) |
| TikTok Ads | play-circle |
| Claude Code, Manus, Nano Banana Pro | sparkle (shared "AI tool" mark) |
| Klaviyo, Mailchimp, PostScript | mail |
| ManyChat | message-circle |
| Zapier | bolt (connector/automation) |
| Shopify | shopping-bag |
| Notion | document |
| Slack | message-square |
| Google Workspace | grid |
| Canva | image/palette |

No brand logos (no literal "in" LinkedIn glyph, no G logo, etc.) — generic
category icons only, to stay consistent with the monochrome/outline rule and
avoid brand-mark issues.

### Contact / footer

- Email (`mailto:` links in footer + `.contact__list`) → mail icon
- Phone (`tel:` link) → phone icon
- LinkedIn → generic external-link/profile icon (not the LinkedIn brand mark)
- "Back to top" → up-arrow SVG (replaces the plain `↑` character, matching
  the `.arw` pattern already used for `↗`)

### Experience timeline (`.xp` × 5) — one category icon per role

Roles are already anonymized ("HK eCommerce brand", etc.), so icons map to
engagement type rather than company identity:

| Role | Icon |
|---|---|
| HK eCommerce brand | shopping-cart |
| US eCommerce brand | shopping-cart |
| My own brand | rocket |
| Social media agency | megaphone |
| Australian coaching brand | graduation-cap |

## Testing / verification

Static site, no build step (Jekyll passthrough only — see
`.github/workflows/jekyll-gh-pages.yml`). Verification is visual: the owner
will QA in-browser themselves (do not use the Browser/Preview tool for this —
see project preference). Implementation should double-check both
`data-theme="dark"` and `data-theme="light"` since every token above is
defined per-theme.
