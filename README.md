# Ébène — Next.js

Fashion brand website for Ébène, Cotonou, République du Bénin.

## Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Context (cart + language)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages
- `/` — Home (hero, featured products, story, newsletter)
- `/collection` — All products with category filter
- `/cart` — Cart with WhatsApp order link
- `/contact` — Contact form + address

## Add your products
Edit `lib/products.ts` — each product has FR and EN fields.

## Add your images
Put photos in `public/images/`. Update the `image` field in `lib/products.ts`.

## Change WhatsApp number
Search `22900000000` in the codebase and replace with your real number.

## Customise content
- Colors: `tailwind.config.ts` and `app/globals.css`
- Translations: `lib/translations.ts`
- Products: `lib/products.ts`
