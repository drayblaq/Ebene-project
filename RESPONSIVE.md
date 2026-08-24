# RESPONSIVE.md — The Responsiveness Constitution

This file governs one thing only: how this project handles every screen size, on every device, in every orientation. It is written for an AI coding agent (or any engineer) to internalize before writing a single layout, and to return to whenever a component is being built, reviewed, or modified. Responsiveness here is not a checklist run at the end — it is a constraint that shapes the very first line of markup and CSS you write.

Read this in full before touching any UI code. If a rule here ever conflicts with a design mockup that only shows one screen size, this document wins — ask for the missing states/sizes, or derive them using the principles below, rather than shipping a layout that only works at the one width you were shown.

## Relationship to `CLAUDE.md`

`CLAUDE.md` is the project's overall engineering constitution and is authoritative on everything else: architecture, design system, accessibility, performance, state, APIs, testing, security, and process. **This file is authoritative on responsive layout mechanics**, and `CLAUDE.md` §3 is a deliberately condensed pointer to it rather than a second copy.

- Responsive question → this file wins.
- Anything else → `CLAUDE.md` wins.
- Apparent conflict between the two → that's a documentation bug; follow the file that owns the topic and flag it.

Neither file may grow a duplicate of a rule the other owns. When you need to reinforce a rule across both, cross-reference it — don't restate it.

**Responsiveness is a hard gate, not a quality dial** (`CLAUDE.md`, "Hard gates vs. the priority ladder"). Work that fails the protocol in §11 is unfinished and must be reported that way, never presented as done.

---

## 1. The Philosophy: Why This Matters More Than It Seems To

### 1.1 There is no "the screen"

There is no single device this product runs on. There is a 320px budget Android phone on a cracked screen, a 430px iPhone Pro Max, a folding phone that's 280px closed and 900px open, a 768px iPad held in portrait, the same iPad rotated to landscape, a 1366px work laptop, and a 3440px ultrawide monitor at a desk — often all viewing the exact same component in the exact same session (a user rotates their tablet, resizes their browser, folds their phone). If your mental model of "the screen" is singular, your code will be wrong for most of your actual users.

### 1.2 Responsive is a default, not a mode

Never write a layout for one size and then "make it responsive" as a second pass. That process produces desktop-shaped code with mobile bolted on through `max-width` overrides — brittle, backwards, and always one edge case behind. Instead, every layout is written mobile-first from the first line, and complexity is layered on as viewport space becomes available. See §3.

### 1.3 Fluid over fixed, always

The strongest possible responsive design doesn't jump between rigid layouts at breakpoints — it flows continuously. Prefer fluid techniques (percentages, `fr` units, `clamp()`, `min()`/`max()`, intrinsic sizing, container queries) as the primary tool, and use fixed breakpoints only for genuine structural changes (e.g., a sidebar that needs to become a bottom sheet, a table that needs to become cards). If you find yourself adding a new breakpoint just to nudge a value slightly, that's a sign you should have used a fluid value instead.

### 1.4 A layout that isn't tested at the extremes isn't tested

Bugs live at the edges: the narrowest supported width, the widest, the tallest content, the shortest. A layout that looks fine at 390px and 1440px (the two sizes most commonly eyeballed) can still be completely broken at 320px or 3440px. Every layout must be mentally walked through the full Device Matrix in §2 before it's considered done.

---

## 2. The Device Matrix (Non-Negotiable Test Set)

Every UI you build or modify must be mentally verified against all of these. This is not a sampling — treat it as the actual set of devices real users are on.

| # | Category | Representative devices | Approx. viewport width | Notes |
|---|---|---|---|---|
| 1 | Small Android phones | Budget Androids, Galaxy A-series compact | 320–360px | Absolute minimum width to support. Assume slow CPU/network too. |
| 2 | Large Android phones | Galaxy S/Ultra, Pixel Pro | 384–430px | Often used one-handed — check thumb reach for key actions. |
| 3 | iPhones (all common sizes) | SE, standard, Plus/Max, Pro/Pro Max | 375–430px | Account for the notch/Dynamic Island and home indicator safe areas. |
| 4 | Foldables, folded | Galaxy Z Fold cover screen | ~280–344px | Narrower than any standard phone — often the real minimum-width bug source. |
| 5 | Foldables, unfolded | Galaxy Z Fold inner screen | ~700–900px | Near-square aspect ratio; tablet-like width but shorter height than a tablet. |
| 6 | Small tablets | 7–8" Android tablets | 600–720px | Often used in portrait; don't assume tablet = landscape. |
| 7 | iPads | Mini, standard, Air | 744–834px | Both orientations are common and must both work. |
| 8 | Large tablets | iPad Pro 12.9", large Android tablets | 1024–1194px | Frequently used with a keyboard attached — check hover/focus states too. |
| 9 | Small laptops | 13" laptops, Chromebooks | 1280–1366px | Very common in budget/education/work contexts — don't skip this size. |
| 10 | Standard laptops | 14–15" laptops | 1440–1536px | The size most designers design at by default — don't let it be the *only* size checked. |
| 11 | Large desktop monitors | 24–27" monitors | 1920–2560px | Content should not stretch full-width; cap and center. |
| 12 | Ultra-wide displays | 34" ultrawide, dual-monitor span | 3440px+ | Check for absurdly long line lengths and stretched components. |

**Rule of thumb width range to actually test:** 280px through 3840px, both portrait and landscape wherever the device supports rotation (all phones and tablets). Height matters too — check short/landscape phone heights (as low as ~360px tall) for anything with fixed-height elements like sticky headers, modals, or bottom sheets.

---

## 3. Mobile-First, Concretely

### 3.1 What "mobile-first" actually means in code

Write the base (no media query) styles for the smallest viewport. Add complexity only inside `min-width` media queries as the viewport grows.

```css
/* Correct: mobile-first */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;         /* stacked on small screens */
  gap: 16px;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1280px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

```css
/* Wrong: desktop-first, using max-width to "undo" styles for mobile */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1279px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

Both examples render identically at every breakpoint — but the second one is a maintenance trap. Every new override has to fight the desktop default, and it's easy to leave a desktop-only assumption unguarded. Always write it the first way.

### 3.2 Tailwind / utility-framework equivalent

If using Tailwind (or similar mobile-first utility frameworks), unprefixed utilities are the mobile/base styles and prefixed variants (`md:`, `lg:`, `xl:`) layer on for larger viewports — never use a `max-*` variant to strip desktop styles back down for mobile.

```jsx
// Correct
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
```

### 3.3 Content and priority first

Before writing layout code, decide: on the smallest screen, what's the one thing the user needs first? Design the mobile layout around that priority, then let larger viewports reveal secondary content (filters, sidebars, previews) rather than cramming everything visible-at-once into the smallest layout and shrinking it.

---

## 4. Breakpoint System

Use one shared, named breakpoint scale project-wide. Never invent a one-off breakpoint value inside a single component's CSS — if a component needs to adapt at a size not covered by the shared scale, that's a signal to use a fluid technique (§5) or a container query (§6) instead of a new global breakpoint.

| Token | Range | Maps to Device Matrix categories (§2) |
|---|---|---|
| `xs` | 0–479px | Folded foldables (4), small Android phones (1), large phones/iPhones portrait (2, 3) |
| `sm` | 480–767px | Phones in landscape, small foldables partially opened |
| `md` | 768–1023px | iPads portrait (7), small tablets landscape (6), foldables unfolded (5) |
| `lg` | 1024–1279px | Large tablets (8), iPads landscape |
| `xl` | 1280–1535px | Small laptops (9), standard laptops low end (10) |
| `2xl` | 1536–1919px | Standard laptops high end (10), small desktop monitors |
| `3xl` | 1920px+ | Large desktop monitors (11), ultra-wide (12) |

**This scale is the project's single source of truth for breakpoints.** If the project uses Tailwind or a similar utility framework, override the framework's defaults in config to match these exact values rather than mixing two scales — Tailwind's stock `sm` is 640px, which does *not* match the `sm` above, and running both scales in one codebase is a guaranteed source of subtle layout bugs. Configure once, then use only the named tokens.

At `2xl` and `3xl`, always constrain the main content column with a `max-width` (commonly 1280–1600px depending on content density) and center it with auto margins. Ultra-wide is not an invitation to stretch every element edge to edge — it's an invitation to keep content readable and add breathing room, not more columns of cramped text.

---

## 5. Fluid Techniques (Preferred Over Hard Breakpoints)

### 5.1 Never hardcode pixel widths/heights on content containers

Any container that holds text or dynamic content must size intrinsically or fluidly. Reserve fixed pixel dimensions for things with a genuinely fixed size in the real world (an icon, a small fixed logo mark) — never for anything holding copy, lists, or user content.

```css
/* Wrong */
.profile-card { width: 340px; height: 220px; }

/* Right */
.profile-card {
  width: 100%;
  max-width: 400px;
  height: auto;
  min-height: fit-content;
}
```

### 5.2 Fluid typography with `clamp()`

Prefer a fluid type scale over jumping font sizes at breakpoints, so text scales continuously with viewport width.

```css
h1 { font-size: clamp(1.75rem, 1.4rem + 1.5vw, 3rem); }
p  { font-size: clamp(1rem, 0.95rem + 0.2vw, 1.125rem); }
```

Never use raw `vw` units for font-size without a `clamp()` floor and ceiling — unclamped `vw` sizing produces illegibly small text on narrow phones and comically large text on ultra-wide monitors.

### 5.3 `min()`, `max()`, and `clamp()` for spacing and widths

```css
.container {
  width: min(100% - 32px, 1200px); /* full width with gutters on mobile, capped on desktop */
  margin-inline: auto;
}
```

### 5.4 Flexbox and Grid as the default layout tools

- **Flexbox** for one-dimensional flows: nav bars, button rows, stacked form fields, toolbars.
- **Grid** for two-dimensional layouts: page shells, card/gallery grids, dashboards.
- Use `gap` for spacing between flex/grid children — never margin hacks (`margin-right` on all-but-last-child) to fake gap behavior.
- Use `repeat(auto-fit, minmax(240px, 1fr))` style grid patterns for card grids that should reflow naturally without explicit breakpoints:

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
```

This single rule adapts from one column on a narrow phone to many columns on an ultra-wide monitor with no media queries at all — prefer this pattern whenever the grid items are homogeneous cards.

### 5.5 Use logical properties, not physical ones

Write directional styles in logical terms — `margin-inline-start` instead of `margin-left`, `padding-block` instead of `padding-top`/`padding-bottom`, `inset-inline-end` instead of `right`, `text-align: start` instead of `text-align: left`, `border-inline-start` instead of `border-left`.

This is a responsive concern, not just an i18n one: logical properties make a layout adapt correctly to right-to-left languages (Arabic, Hebrew) and to vertical writing modes without a parallel RTL stylesheet. Retrofitting physical properties across an existing codebase is a large, error-prone job; writing them logically from the start costs nothing. See `CLAUDE.md` §22 for the broader internationalization rules.

```css
/* Prefer */
.card { padding-inline: 16px; margin-inline-start: auto; text-align: start; }

/* Avoid */
.card { padding-left: 16px; padding-right: 16px; margin-left: auto; text-align: left; }
```

---

## 6. Container Queries

For components reused in multiple contexts (a card that appears both in a narrow sidebar and a full-width section), the component should respond to the space it's actually given, not the viewport as a whole. Use container queries for this rather than trying to infer container width from viewport breakpoints (which breaks the moment the component is reused somewhere new).

```css
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

Reach for container queries whenever a component's ideal layout depends on its parent's width rather than the page's width — this is increasingly the more correct default over viewport media queries for reusable component-level responsiveness.

---

## 7. Images, Media, and Icons

- Always responsive: `max-width: 100%; height: auto;` (or the framework/component-library equivalent) on every content image.
- Always set explicit `width`/`height` attributes or `aspect-ratio` in CSS, even on fluid images, to reserve space and prevent layout shift while the image loads.
- Serve responsive sources (`srcset`/`sizes` or a framework's image component) so a phone doesn't download a 4K asset meant for an ultra-wide hero.
- Lazy-load offscreen images (`loading="lazy"`) except the first visible/critical image on a page.
- Icons and small fixed-size decorative elements are the one legitimate place for fixed pixel dimensions — but even then, prefer scalable formats (SVG) sized in `em`/`rem` so they scale with surrounding text where relevant.
- Video/embeds: wrap in an aspect-ratio-controlled container so they scale fluidly instead of overflowing their parent:

```css
.video-wrapper { aspect-ratio: 16 / 9; width: 100%; }
.video-wrapper iframe { width: 100%; height: 100%; }
```

---

## 8. Touch, Pointer, and Input Considerations

- Every interactive element (buttons, links, form controls, icon-only actions) has a minimum touch target of 44×44px (iOS) / 48×48dp (Material) at every breakpoint where touch is possible — this includes dense list rows, table row actions, and icon buttons, not just primary CTAs.
- Never rely on `:hover` to reveal necessary information or controls — hover doesn't exist on touch devices. Anything shown only on hover must have an equivalent tap/focus-triggered reveal.
- Inputs should never trigger unwanted mobile zoom: keep font-size at 16px or larger on all form inputs (iOS Safari auto-zooms on inputs below 16px).
- Support both touch and pointer/mouse interaction patterns on devices that have both (e.g., touchscreen laptops, iPads with trackpads) — don't assume one excludes the other.
- Respect safe areas on notched/gesture-nav devices using `env(safe-area-inset-*)` for elements pinned to screen edges (bottom nav bars, fixed headers/footers).

```css
.bottom-nav {
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}
```

---

## 9. Structural Patterns by Component Type

### 9.1 Navigation

- Small screens: collapse primary nav into a hamburger/drawer, bottom tab bar, or a scrollable horizontal nav — never show a full desktop nav bar squeezed down at tiny sizes.
- Tablets: often a hybrid — some items visible, some collapsed into a "more" menu.
- Laptops/desktops: full horizontal nav, with hover-capable dropdowns as a bonus, not a requirement.
- The nav pattern change should happen at a deliberate breakpoint, not fluidly — this is one of the legitimate cases for a hard breakpoint rather than a fluid technique.

### 9.2 Tables

- Never let a data table force horizontal scroll as the only mobile fallback for anything but the widest data sets — first consider: can this become a stacked card-per-row layout on small screens, with column labels shown inline?
- If horizontal scroll is genuinely the right answer (e.g., a spreadsheet-like dense table), make the scroll affordance obvious (visible scrollbar or a subtle edge shadow) and keep key identifying columns (e.g., name) pinned/sticky.

### 9.3 Modals and dialogs

- On small screens, prefer full-screen or bottom-sheet modals over small centered dialogs — a tiny centered modal on a 360px phone wastes space and feels cramped.
- On larger screens, centered modals with a max-width and comfortable padding are appropriate.
- Always ensure the modal's internal content scrolls independently if it exceeds viewport height, rather than the modal overflowing the screen.

### 9.4 Forms

- Stack fields in a single column on small screens; multi-column form layouts are only appropriate from `md`/`lg` upward, and only for genuinely related short fields (e.g., city/state/zip).
- Label position (top-aligned vs. inline) should stay consistent across breakpoints unless there's a strong space reason to change it — inconsistent label position between mobile and desktop is a common subtle bug.

### 9.5 Sidebars / multi-pane layouts

- Small screens: sidebar becomes a drawer, bottom sheet, or a separate screen/route — never a squeezed-down column.
- Large screens: persistent sidebar alongside main content, with a sensible max-width on the overall layout so the main content doesn't become an uncomfortably long line length on ultra-wide monitors.

### 9.6 Skeleton, empty, and error states

`CLAUDE.md` §14 requires every async view to implement loading, empty, error, and partial-failure states. Each of those is a layout in its own right and is subject to every rule in this document:

- Skeleton loaders must mirror the real content's responsive behavior — same grid, same column counts per breakpoint, same approximate proportions. A skeleton that reflows differently from the content it precedes causes a layout jump the moment data arrives, which is worse than no skeleton at all.
- Empty and error states must not be fixed-height boxes centered in an assumed viewport. They stack and center fluidly like any other content, and their copy must not overflow at 280px.
- Never assume the loading state is short-lived enough to skip responsive checks. On the slowest device in the matrix it may be on screen for several seconds.

---

## 10. Common Anti-Patterns (Reject These on Sight)

- Fixed pixel widths/heights on any container holding text or a dynamic list.
- `max-width` media queries used to strip desktop styles down for mobile.
- Font sizes below 16px on form inputs, or below 12px anywhere in real content.
- Touch targets smaller than 44px, especially icon-only buttons in toolbars and table rows.
- Components that only reveal critical actions on `:hover` with no touch/focus equivalent.
- Horizontal scrolling introduced as an unintentional side effect (rather than a deliberate, clearly affordanced pattern like a carousel).
- A single breakpoint check (usually just "phone" and "desktop") used to declare a component "responsive" without checking the full Device Matrix in §2.
- Text or components that overflow their container at either extreme (280px or 3840px) — the two widths most often skipped in manual testing.
- Ultra-wide layouts that stretch content full-bleed with no max-width, producing unreadable line lengths.
- New one-off breakpoint values invented per component instead of using the shared scale (§4) or a fluid/container-query approach.
- **Device-specific targeting** — media queries or conditional logic written against a named device ("iPhone SE", "iPad Pro"). Target logical width ranges, never devices; device dimensions change every product cycle.
- **Raw `vw` units for font sizing** without a `clamp()` floor and ceiling (§5.2).
- **User-agent sniffing to decide layout.** Detect capability (pointer type, hover support, container width) rather than guessing device class from a UA string.
- **Physical directional properties** (`margin-left`, `right`, `text-align: left`) where a logical equivalent exists (§5.5).
- **`100vh` for full-height layouts on mobile** — it doesn't account for dynamic browser chrome and causes content to sit under the address bar. Use `100dvh` (with a `100vh` fallback) or a flex-based full-height shell.

---

## 11. The Responsive Testing Protocol

Run this before marking any UI work complete — this is not optional polish, it is part of the definition of "done."

1. **Resize sweep**: mentally (or literally, in dev tools) drag the viewport width from 280px to 3840px continuously. Watch for any point where something overflows, clips, overlaps, or jumps awkwardly.
2. **Matrix spot-check**: explicitly check the layout at each of the 12 categories in the Device Matrix (§2), not just "phone" and "desktop."
3. **Orientation check**: rotate every phone/tablet-class check between portrait and landscape.
4. **Zoom/text-scale check**: verify the layout doesn't break with browser zoom up to 200% or OS-level text-size scaling — this matters for accessibility as much as for responsiveness.
5. **Touch target audit**: confirm every interactive element meets minimum tap size at touch-capable breakpoints.
6. **Content-length stress test**: check the layout with unusually long text (long names, long labels, translated strings that run longer than English) and with empty/minimal content — both extremes, not just the demo-data length.
7. **Safe-area check**: on notched/gesture-nav devices, confirm nothing critical is obscured by the notch, Dynamic Island, or home indicator.
8. **State check**: run steps 1–2 against the loading (skeleton), empty, and error states too, not just the populated happy path (§9.6, `CLAUDE.md` §14).

If any step surfaces a break, that's a bug to fix now, not a follow-up ticket to file later.

This protocol is the responsive portion of the project's definition of done. The full pre-ship checklist — which folds these steps in alongside accessibility, testing, security, and code-quality gates — is `CLAUDE.md` §25.

---

## Closing Note

Responsiveness is not a pass you run at the end of building a component — it is the shape the component is built in from the first line. Default to fluid, intrinsic, content-driven sizing; reach for fixed breakpoints only for genuine structural shifts; and never consider a screen finished until it has been walked through the full Device Matrix in §2, at both ends of the size spectrum, in both orientations. A layout that only works at the width on your monitor right now is a prototype, not a shipped feature.

**Companion document:** `CLAUDE.md` — the project's engineering constitution, authoritative on every non-responsive topic.
