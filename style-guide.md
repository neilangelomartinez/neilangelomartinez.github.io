# Style Guide — "Nothing OS" design language

Monochrome canvas. Color is an event, not a default. Type drives hierarchy.
No gradients, shadows, blur, or filled icons.

## Fonts (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

- `Space Grotesk` — headings & body
- `Space Mono` — labels, data, captions (often ALL CAPS)
- `Doto` — hero display numbers only

## Color tokens

Dark is the default, first-class theme. Light is warm off-white. Toggle via `[data-theme]`.

```css
/* Dark (default) */
--bg: #000000;
--text-display: rgba(255,255,255,1);
--text-primary: rgba(255,255,255,0.90);
--text-secondary: rgba(255,255,255,0.58);
--text-disabled: rgba(255,255,255,0.38);
--line: rgba(255,255,255,0.14);

/* Light */
--bg: #f4f1ec;            /* warm off-white */
--text-display: #0a0a0a;

/* Accent — the ONLY color. Use on values, never backgrounds. */
--accent: #d71921;
```

## Principles

1. **Subtract, don't add** — every element earns its space.
2. **Structure is ornament** — expose the grid (dot-grid motif).
3. **Type drives hierarchy**, not color/icons/borders. Max 3 sizes / 2 weights per screen.
4. Red is reserved for **key values** (ROAS, metrics, active state) — never labels or fills.
5. Buttons: pills (`999px`) or technical (`4px`). Icons: outline only.
6. Motion is minimal and mechanical — "click, not swoosh".

## Spacing

```css
--s-tight: 8px;   /* grouped elements   */
--s-med: 16px;    /* list items, fields */
--s-wide: 40px;   /* section breaks     */
--s-vast: clamp(64px, 10vw, 120px); /* major divisions */
```
