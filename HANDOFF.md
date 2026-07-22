# Ébène — Developer Handoff

## What this is
A multi-page e-commerce website for **Ébène**, a clothing brand based in **Cotonou, République du Bénin**.
Built in Next.js 14 (App Router), TypeScript, Tailwind CSS.

---

## Stack
| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 14.2.3 | Framework (App Router) |
| React | 18 | UI |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Utility styling |
| React Context | built-in | Global state (cart + language) |

---

## Project structure

```
ebene-nextjs/
├── app/
│   ├── globals.css          # Fonts, keyframe animations, base styles
│   ├── layout.tsx           # Root layout: AppProvider + Navbar + Footer + Cursor
│   ├── page.tsx             # Home page
│   ├── collection/
│   │   └── page.tsx         # All products + category filter
│   ├── cart/
│   │   └── page.tsx         # Cart + WhatsApp order link
│   └── contact/
│       └── page.tsx         # Contact form + address
├── components/
│   ├── Cursor.tsx           # Custom animated cursor (dot + ring)
│   ├── Navbar.tsx           # Fixed nav with scroll effect
│   ├── Footer.tsx           # Footer with social links
│   ├── Marquee.tsx          # Scrolling text banner
│   └── ProductCard.tsx      # 3D flip card (drag to rotate)
├── context/
│   └── AppContext.tsx       # Cart state + language (fr/en) toggle
├── lib/
│   ├── products.ts          # Product data (FR + EN fields)
│   └── translations.ts      # All UI strings in FR and EN
└── public/
    └── images/              # Drop product photos here
```

---

## Key design decisions

### Colors (defined in tailwind.config.ts)
- `cream` #F7F3EE — page background
- `ebony` #0E0B08 — primary dark
- `amber` #C4763A — accent/brand color
- `dark-brown` #1A1410 — dark section backgrounds

### Fonts (loaded via Google Fonts in globals.css)
- **Kablammo** — Brand name / display (logo, big numbers)
- **DM Serif Display** — Section titles, product names, prices
- **Jost** — Body, labels, buttons, nav

### 3D Product Cards
- Each card has a **front face** (product info) and **back face** (description + add to cart + WhatsApp)
- Drag left/right to rotate; hover tilts in 3D
- Logic lives entirely in `components/ProductCard.tsx` via `useEffect` mouse handlers
- Snaps to 0° (front) or 180° (back) on mouse release

### Language system
- `context/AppContext.tsx` holds `lang: 'fr' | 'en'`
- All strings are in `lib/translations.ts` — import `tr` and do `tr[lang].key`
- Toggle button in Navbar switches language globally

### Cart
- Stored in React Context (in-memory, resets on refresh)
- To persist: add `localStorage` sync in `AppContext.tsx`
- Orders go via WhatsApp link (`wa.me/22900000000`) — replace number

---

## Things to update before launch

### 1. WhatsApp number
Search `22900000000` in the project and replace everywhere with the real number.

### 2. Product images
Put PNG files (transparent bg, ~600×600px) in `public/images/`.
Update the `image` field in `lib/products.ts` for each product.

### 3. Add a real product
In `lib/products.ts`, add an object to the `products` array:
```ts
{
  id: 13,
  name: 'Nom FR',
  nameEn: 'Name EN',
  mat: 'Matière FR',
  matEn: 'Material EN',
  desc: 'Description FR',
  descEn: 'Description EN',
  cat: 'shirts', // shirts | trousers | caps | dresses | jackets
  price: 78700, // FCFA — convert from EUR: 1 EUR = 655.957 XOF, round to nearest 100
  badge: 'NEW', // 'NEW' | 'BEST' | '-15%' | 'SOLD OUT' | ''
  sizes: ['S', 'M', 'L', 'XL'],
  dark: false,   // true = dark card theme
  bg: '#F9F6F2', // card image background color
  image: '/images/my-shirt.png',
}
```

### 4. Contact info
In `app/contact/page.tsx`, update the address, WhatsApp, and email values.

### 5. Email (newsletter)
Currently the subscribe form does nothing. Wire it to Mailchimp, Brevo, or any email API.

---

## Deployment (recommended: Vercel)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOU/ebene.git
git push -u origin main

# 2. Go to vercel.com → Import repo → Deploy
# Zero config needed — Next.js is detected automatically
```

Custom domain: add in Vercel dashboard → Settings → Domains.

---

## Running locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Future features to build

- [ ] Persist cart to `localStorage`
- [ ] Product detail page (`/product/[id]`)
- [ ] Stripe or Fedapay (Benin) payment integration
- [ ] Admin panel to upload new products (Sanity CMS or Supabase)
- [ ] Mobile responsive layout (currently desktop-first)
- [ ] Instagram feed embed
- [ ] Size guide modal
