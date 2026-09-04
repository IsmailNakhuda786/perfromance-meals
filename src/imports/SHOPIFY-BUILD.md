# Performance Meals — Shopify Prestige Build Guide

This prototype is structured so **each HTML section maps directly to a Shopify Prestige section**. If the client approves this design, you can rebuild it same-to-same in Shopify with minimal custom code.

---

## What changed (Shopify-feasible only)

| Removed (not native Shopify) | Replaced with |
|------------------------------|---------------|
| JS product filter buttons | Collection link navigation (`/collections/low-carb`) |
| Demo cart toast | Native Shopify cart form (`action="/cart/add"`) |
| Scroll reveal animations | Prestige built-in scroll animations |
| Split hero seam line + center logo | Bootstrap 2-column dual banner (1 small custom section) |
| Split background gradient section | Separate rich-text + multicolumn + image-with-text sections |

---

## Page → Shopify template mapping

### `index.html` → Homepage (`templates/index.json`)

| Section in prototype | Prestige section | Custom needed? |
|------------------------|------------------|----------------|
| `announcement-bar` | Announcement bar | No |
| `header` | Header | No |
| `dual-image-banner` | **Custom section** (or 2× Image with text overlay) | **Yes — 1 small custom section** |
| `rich-text` | Rich text | No |
| `multicolumn` (operating modes) | Multicolumn | No |
| `image-with-text` (2 cards) | Image with text × 2 | No |
| `footer` | Footer | No |

### `ready-series.html` → Collection template (`templates/collection.json`)

| Section in prototype | Prestige section | Custom needed? |
|------------------------|------------------|----------------|
| `image-banner` | Slideshow / Image banner | No |
| `collection-list` | Collection list | No |
| `main-collection-product-grid` | Main collection product grid | No |
| Collection nav links | Sub-collection links OR Search & Discovery filters | No |
| Product cards with macros | Product card + **metafields** | Metafields only |
| `multicolumn` (features) | Multicolumn | No |
| `testimonials` | Testimonials (if available) or Multicolumn | No |

### `meal-plans.html` → Page template (`templates/page.meal-plans.json`)

| Section in prototype | Prestige section | Custom needed? |
|------------------------|------------------|----------------|
| `image-banner` | Image banner | No |
| `multicolumn` (plan cards) | Multicolumn with buttons → product links | No |
| `multicolumn` (how it works) | Multicolumn | No |
| `rich-text` | Rich text | No |
| `image-with-text` × 2 | Image with text | No |
| `testimonials` | Testimonials / Multicolumn | No |

---

## Shopify setup checklist

### 1. Collections to create
- `ready-series` (main)
- `low-carb`
- `high-carb`
- `breakfast`
- `just-protein`

### 2. Product metafields (for macro pills on cards)
Create namespace `custom`:
- `calories` (single line text) — e.g. "600 KCAL"
- `protein` (single line text) — e.g. "47G PROTEIN"
- `carbs` (optional)
- `fat` (optional)

Display in product card snippet via Liquid:
```liquid
{% if product.metafields.custom.calories != blank %}
  <span class="macro-pill">{{ product.metafields.custom.calories }}</span>
{% endif %}
```

### 3. Meal plan products
Create 2 products (or collections):
- `/products/low-carb-meal-plan`
- `/products/balanced-performance-plan`

Or use a subscription app (Recharge) if plans are recurring.

### 4. Theme customization
In Prestige theme settings:
- **Colors:** Gold `#f5b61b`, Background `#f7f4ee`, Text `#0b0b0b`
- **Fonts:** Space Grotesk (headings), DM Sans (body) — via Shopify font picker or custom CSS
- Add `assets/pm-custom.css` with styles from `assets/css/style.css`

### 5. Only custom section needed
**`sections/dual-image-banner.liquid`** — Bootstrap-style 2-column hero with:
- Block 1: image, heading, text, button, link to Ready Series collection
- Block 2: image, heading, text, button, link to Meal Plans page

Everything else uses native Prestige sections.

---

## Product card HTML → Shopify Liquid

Prototype:
```html
<form action="/cart/add" method="post">
  <input type="hidden" name="id" value="{{ variant.id }}">
  <button type="submit">ADD TO CART</button>
</form>
```

This is exactly how Shopify product cards work natively.

---

## Files in this prototype

```
index.html          → Homepage
ready-series.html   → Collection page
meal-plans.html     → Custom page
assets/css/style.css → Copy to theme as pm-custom.css
assets/js/main.js   → Minimal (sticky header only; Prestige handles the rest)
assets/images/      → Upload to Shopify Files
```

---

## Client approval note

> "This prototype uses only Shopify-native sections except one custom homepage banner. Product filtering uses collection links. Add to cart, navigation, and product grids work exactly as they will in the live store."
