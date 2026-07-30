# Style Guide — "Analyst's Report" design language

Light canvas, elevated white cards, large tabular figures. Reads like a
consulting report (Stripe / Linear / Vercel / McKinsey), not a designer
portfolio. Blue is for emphasis and interaction, never for fills or backgrounds.

Metrics come first, case studies second, biography last.

## Fonts (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

- `Space Grotesk` — headings, body, and all figures
- `Space Mono` — labels, data captions, nav, chips (usually ALL CAPS)

Every number that reads as data uses `font-variant-numeric: tabular-nums` so
figures align in columns. Headings are weight 700 with tight negative tracking;
body is weight 400 at `line-height: 1.5`.

## Color tokens

Light is the default and first-class theme. Dark is a supported variant behind
the `[data-theme]` toggle.

```css
/* Light (default) */
--bg: #f7f8fa;
--surface: #ffffff;          /* cards */
--surface-2: #f1f3f7;        /* recessed panels, chips */

--text-display: #111827;     /* headings, figures */
--text-primary: #1f2937;     /* body */
--text-secondary: #6b7280;   /* supporting copy, labels */
--text-tertiary: #9ca3af;    /* captions, icons, indices */

--line: rgba(17, 24, 39, 0.08);
--line-strong: rgba(17, 24, 39, 0.16);

--accent: #2563eb;
--accent-soft: rgba(37, 99, 235, 0.08);

/* Dark */
--bg: #0b0f17;
--surface: #141a24;
--surface-2: #1b222e;
--accent: #3b82f6;           /* lifted; #2563eb is too dark on near-black */
--shadow-sm: none;           /* shadows read as dirt on dark surfaces */
--shadow-md: none;
```

There is no third background. Sections are separated by whitespace and card
elevation, **not** by alternating background bands.

## Elevation and shape

```css
--radius-lg: 16px;    /* cards */
--radius-md: 10px;    /* image frames, carousel slides */
--radius-pill: 999px; /* buttons, chips, tags, badges */

--shadow-sm: 0 1px 2px rgba(17,24,39,.04), 0 1px 3px rgba(17,24,39,.06);
--shadow-md: 0 4px 6px -1px rgba(17,24,39,.05), 0 10px 20px -6px rgba(17,24,39,.10);
```

A card is `--surface` + `1px solid var(--line)` + `--radius-lg` + `--shadow-sm`,
lifting to `--shadow-md` and `translateY(-2px)` on hover. Every hover lift is
suppressed under `prefers-reduced-motion: reduce`.

Grids that need hairline dividers (metric tiles, services) use `gap: 1px` over a
`--line` background rather than per-cell borders, so no double borders appear at
the seams.

## Principles

1. **Proof before positioning.** Numbers lead; adjectives are cut.
2. **Only real data ships.** No metric appears unless it is verifiable from a
   source screenshot or already-published figure. CPA and CTR are absent because
   no source for them exists.
3. **Color is emphasis, not decoration.** Blue marks a key value, an active nav
   item, or the primary CTA. Nothing else.
4. **Type drives hierarchy**, reinforced by elevation. Max 3 sizes / 2 weights
   per screen.
5. **High whitespace.** Section rhythm comes from `--s-vast`, not from fills.
6. **Motion is minimal.** Reveal on scroll, a 55ms-per-child stagger, and a 2px
   hover lift. Nothing decorative.

## Spacing

```css
--s-tight: 8px;   /* grouped elements      */
--s-med: 16px;    /* grid gaps, list items */
--s-wide: 40px;   /* section-internal      */
--s-vast: clamp(72px, 10vw, 128px); /* between sections */
```

## Icons

Outline only: inline SVG, `stroke="currentColor"`, `fill="none"`,
`stroke-width="1.6"`, rounded caps and joins, `viewBox="0 0 24 24"`, and
`aria-hidden="true"`. No brand logos — generic category icons only. Icons sit at
`--text-tertiary` so they recede against light surfaces.

## Section order

Hero (KPIs dominate the fold) → Case Studies → Process → How I Think →
AI Workflow → Services → Tools → Experience → About → Contact.

Section indices (`01 /` … `08 /`) must stay sequential and unique; inserting a
section means renumbering the ones after it.

## Assets

- Portrait: `assets/images/neil-hero.webp` (cutout, transparent, bottom-faded in
  CSS since the crop ends at chest level).
- Case study screenshots: `assets/images/case-*.{webp,jpg}` — real Ads Manager
  reports with client names redacted in-image.
- Ad creative carousel: `assets/images/ad-*.jpg`.

Raster exports use `sips -s format jpeg -s formatOptions <q>`. Note that
`--setProperty formatOptions` is silently ignored by `sips`, which once shipped
these images at 5× their necessary weight.

## Cache busting

`index.html` links the stylesheet as `style.css?v=N`. Bump `N` whenever the
design changes so QA never inspects a cached stylesheet.
