# neilangelomartinez.github.io

Personal portfolio for **Neil Martinez** — performance Media Buyer & Marketing VA (Meta Ads + AI creative).

🌐 **Live:** https://neilangelomartinez.github.io/

## Stack
Plain static site — no build step. Deployed via GitHub Pages (Jekyll passthrough workflow on `main`).

- `index.html` — single-page site (all sections)
- `assets/css/style.css` — design system + responsive styles
- `assets/js/script.js` — theme toggle, scroll reveal, KPI count-up, mobile nav

## Design language
"Nothing OS" inspired — monochrome canvas, a single red (`#d71921`) accent used only on key values,
type-driven hierarchy (Space Grotesk · Space Mono · Doto), no gradients or shadows. First-class dark (OLED
black) and light (warm off-white) themes. See `style-guide.md`.

## Editing / swapping in real assets
Placeholders are wired for easy swap-in (see the comment block at the top of `index.html`):
- **AI ad creatives** → replace the placeholder inside `.adunit__creative` with an `<img>`.
- **Landing page preview** → replace the placeholder inside `.browser__view` and set the real URL on the `View live` link.
- **Ad account screenshots** → drop into a case study's `.terminal` (swap the `<table>` for an `<img>`).

## Local preview
Open `index.html` directly, or serve the folder:
```bash
python3 -m http.server 8000
```
