# Ébène Clothing Brand — Claude Instructions

## Project
Next.js 14 (App Router) + TypeScript + Tailwind CSS.
Clothing brand e-commerce, Cotonou, République du Bénin.
Bilingual: French (default) + English.

## Brand
- Name: Ébène
- Colors: cream #F7F3EE, ebony #0E0B08, amber #C4763A
- Fonts: Kablammo (logo), DM Serif Display (headings), Jost (body)
- Tone: luxury, minimal, African-contemporary

## Key files
- `lib/products.ts` — all product data (edit here to add/change products)
- `lib/translations.ts` — all UI text in FR + EN
- `context/AppContext.tsx` — global cart + language state
- `components/ProductCard.tsx` — 3D flip card component
- `app/globals.css` — animations, base styles

## Rules
- Always keep FR and EN fields in sync when editing products or translations
- WhatsApp number to use: 22900000000 (placeholder — user will replace)
- Never remove the 3D card interaction logic
- Keep amber #C4763A as the accent color
- Year is 2026, location is Cotonou, Bénin
- Prices in FCFA (West African CFA franc, XOF) — format as "62,300 FCFA" using comma thousand-separator

## Adding a product
Add to the `products` array in `lib/products.ts` with all required fields (id, name, nameEn, mat, matEn, desc, descEn, cat, price, badge, sizes, dark, bg, image).

## Running
`npm install && npm run dev` → http://localhost:3000
