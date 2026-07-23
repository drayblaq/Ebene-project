# Ébène Clothing Brand — Claude Instructions

## Project
Next.js 14 (App Router) + TypeScript + Tailwind CSS.
Clothing brand e-commerce, Cotonou, République du Bénin.
Bilingual: French (default) + English.

## Brand
- Name: Ébène
- Colors: white #FFFFFF (background), black #000000 (primary), brown #814D2D (accent)
- Fonts: Joti One (headings/display), Aoboshi One (body/UI)
- Tone: luxury, minimal, African-contemporary

## Key files
- `lib/products.ts` — all product data (edit here to add/change products)
- `lib/translations.ts` — all UI text in FR + EN
- `context/AppContext.tsx` — global cart + language state
- `components/ProductCard.tsx` — 3D flip card component
- `components/SplashScreen.tsx` — splash on first load (sessionStorage gated)
- `app/globals.css` — animations, base styles

## Logo files (in /public/logo/)
- `/logo/wordmark-black.png` — on white/light backgrounds (or dark with filter: invert(1))
- `/logo/icon-black.png` — icon mark (invert(1) on dark backgrounds)
- `/logo/icon-brown.png` — icon mark in brown

## Rules
- Always keep FR and EN fields in sync when editing products or translations
- WhatsApp number to use: 22900000000 (placeholder — user will replace)
- Never remove the 3D card interaction logic
- Keep brown #814D2D as the accent color
- Year is 2026, location is Cotonou, Bénin
- Prices in FCFA (West African CFA franc, XOF) — format as "62 300 FCFA" using fr-FR locale (space thousand-separator)
- No gray text, no low-opacity text — solid black on white, solid white on black/brown
- Logo is always an <Image> from /logo/ — never text

## Adding a product
Add to the `products` array in `lib/products.ts` with all required fields (id, name, nameEn, mat, matEn, desc, descEn, cat, price, badge, sizes, dark, bg, image).
- dark: false → bg: '#FFFFFF', dark: true → bg: '#000000'

## Running
`npm install && npm run dev` → http://localhost:3000
