# CLAUDE.md — Engineering Constitution

This file is the brain, rulebook, and source of truth for this project. Read it before writing a single line of code, and return to it whenever a decision feels ambiguous. It is not a style guide bolted on after the fact — it is the philosophy the codebase is built from. Every rule below has a reason attached. Learn the reason, not just the rule, because the reasons are what let you make the right call on the thousands of situations this document doesn't explicitly cover.

## How to read this document set

This project has exactly two governing documents. Together they are the complete source of truth:

| File | Scope | Authority |
|---|---|---|
| `CLAUDE.md` (this file) | Everything: philosophy, architecture, design system, accessibility, performance, code quality, state, APIs, testing, security, process | Authoritative for all topics **except** the detailed mechanics of responsive layout |
| `RESPONSIVE.md` | Responsive layout only: the Device Matrix, breakpoint scale, fluid sizing techniques, per-component responsive patterns, responsive testing protocol | **Authoritative for responsive mechanics.** §3 of this file is a summary; `RESPONSIVE.md` is the expansion |

**Precedence rule:** on any question of responsive layout mechanics, `RESPONSIVE.md` wins. On everything else, this file wins. If the two ever appear to conflict, that is a bug in the documents — follow the file that owns the topic, and flag the discrepancy so it can be corrected. Neither file is allowed to grow a second copy of a rule the other owns; cross-reference instead of duplicating.

## Hard gates vs. the priority ladder

Two different mechanisms govern decisions. Do not confuse them.

**Hard gates (non-negotiable).** These are not tradeable against anything. Work that fails any of them is not "lower quality" — it is *unfinished*, and must be reported as such rather than presented as done:

- **Responsiveness** — works correctly across the full Device Matrix (`RESPONSIVE.md` §2).
- **Accessibility** — keyboard-operable, screen-reader-correct, meets WCAG AA contrast (§6).
- **Correctness** — loading, empty, error, and partial-failure states all implemented (§14).
- **Security** — no exposed secrets, no unvalidated external input (§21).

**The priority ladder (tie-breaker).** Once every hard gate is satisfied and two or more valid implementations remain, choose between them in this exact order:

1. **Scalable** — does it hold up as the codebase and user base grow 10x?
2. **Maintainable** — can a stranger fix a bug in this in 10 minutes, six months from now?
3. **Reusable** — does it avoid becoming a one-off that gets copy-pasted and drifted?
4. **Performant** — is it fast on the worst device in the support matrix, not the best?
5. **Accessible** — where two compliant options exist, prefer the one with better assistive-tech experience.
6. **Responsive** — where two compliant options exist, prefer the one that adapts more gracefully.
7. **Consistent** — does it match how the rest of the app already does this?

Accessibility and responsiveness appear in both lists, and that is deliberate: as gates they are pass/fail minimums, and as ladder rungs they break ties *above* the minimum. Their low position on the ladder never licenses shipping below the gate.

Notice what's not on the ladder at all: "fastest to write" and "fewest lines of code." Cleverness that costs the next reader comprehension time is a net loss. Optimize for the total lifetime cost of the code, not the time it takes to type it.

---

## 1. The Core Philosophy

### 1.1 Software is read far more than it is written

You will write this component once. It will be read, modified, debugged, and extended dozens of times by people (or agents) who don't have the context you have right now. Every decision should be made as if the next person touching this code is tired, in a hurry, and has ten minutes before a meeting. Name things so they don't need to open the file to understand what it does. Structure things so the blast radius of a change is obvious.

### 1.2 Assume the product will succeed

Don't build for the demo. Don't build for the first 100 users and hope you'll "refactor later" — later rarely comes, and when it does, it comes under worse time pressure than now. Build the boring, obvious, correctly-abstracted version the first time. This doesn't mean over-engineering or speculative abstraction for features that don't exist yet (YAGNI still applies) — it means not taking shortcuts that make the correct future implementation harder to reach.

### 1.3 Every screen is a promise to every device

A UI that only works on the designer's MacBook is not finished — it's a prototype. The product is used on cracked Android phones on 3G connections, on iPads propped up in kitchens, on ultra-wide monitors at a desk, and on foldables mid-fold. Responsive design is not a feature you add. It is the default state of every component, from the first line of CSS. §3 states the mandate; `RESPONSIVE.md` holds the full mechanics.

### 1.4 Consistency compounds; inconsistency compounds faster

A slightly-off spacing value, a one-off color, a component that almost matches the design system — each of these seems harmless in isolation. In aggregate, across hundreds of components, they produce a product that feels cheap and a codebase that's exhausting to maintain because nothing can be trusted to behave like its neighbor. Reuse existing tokens, components, and patterns before creating new ones. If you must diverge, do so deliberately and document why.

### 1.5 Prefer boring technology

Choose the well-understood, widely-adopted, boring solution over the clever new one, unless there's a concrete, stated reason the boring solution doesn't work. Boring technology has known failure modes, existing documentation, and a hiring pool that already understands it. Novelty is a cost that must be justified, not a default.

This is not the same as "avoid all dependencies." A mature, widely-used library that solves a genuinely hard problem correctly (data fetching and caching, date/time handling, form state, schema validation) is *the* boring choice — hand-rolling that logic is the risky one. The dependency rule and the boring-technology rule agree: add a dependency when it replaces hard, error-prone code you'd otherwise write yourself; refuse one when it replaces a twenty-line utility. See §24.

---

## 2. Design Philosophy

### 2.1 Mobile-first is not optional

Every layout starts at the smallest supported viewport and scales up. Never design or code for desktop first and then "make it responsive" as a follow-up pass — that produces layouts that are structurally desktop-shaped underneath, with mobile as an afterthought squeezed into media queries. Write base styles for the smallest screen, layer complexity on with `min-width` queries as the viewport grows, and never use a `max-width` query to undo desktop styles for mobile.

The full mobile-first method, with code examples of the correct and incorrect forms, lives in `RESPONSIVE.md` §3. Read it before writing layout code.

### 2.2 Content and hierarchy first, decoration second

Before touching layout, know: what is the single most important thing on this screen? What does the user need to do next? Visual design should make the hierarchy obvious at a glance — size, weight, spacing, and color should all reinforce the same hierarchy, not fight each other. If you can't state the hierarchy in one sentence, the screen has too many competing priorities and needs to be simplified before it's built.

### 2.3 Every pixel should have a reason to exist

Don't add borders, shadows, dividers, or decorative elements because they look nice in isolation — add them because they carry information (this thing is separate from that thing; this element is interactive; this is the primary action). Minimalism here isn't an aesthetic preference, it's a clarity discipline.

### 2.4 Design for the empty, error, and loading states as first-class states

A screen is not "done" when the happy path with perfect data looks good. It is done when you've explicitly designed: the empty state (no data yet), the loading state (data in flight), the error state (request failed), and the partial state (some data, some missing/broken). See §14 for how each is implemented and §16 for system-wide error handling.

---

## 3. The Responsive Design Mandate

Responsiveness is a **hard gate**, not a quality dial. A UI that fails it is unfinished, not merely imperfect.

> **`RESPONSIVE.md` is the authoritative document for this topic.** This section states the mandate and the rules that are never broken. Everything operational — the Device Matrix, the breakpoint scale, fluid sizing techniques, per-component responsive patterns, and the testing protocol — lives there and is not duplicated here. Read `RESPONSIVE.md` in full before writing or modifying any layout.

### 3.1 Rules that are never broken

- **Never hardcode pixel widths or heights** on containers that hold text or dynamic content. Use relative units (`%`, `fr`, `rem`, `em`, `min()`/`max()`/`clamp()`), flexible layout systems (Flexbox, CSS Grid), and intrinsic sizing (`auto`, `min-content`, `max-content`, `fit-content`) instead. Fixed pixel dimensions are legitimate only for genuinely fixed-size elements such as icons.
- **Never assume a fixed viewport width.** No layout may break, overflow, clip content, or require horizontal scrolling at any width from 280px to 3840px, in either orientation.
- **Never build a desktop-only layout "for now."** If a feature ships without small-screen support, it isn't finished — it's half-built. Say so plainly rather than letting it pass as done.
- **Never rely on fixed-height containers for text.** Text reflows with font size, language, and zoom level. Let height be intrinsic; constrain with `min-height`/`max-height` only for a real design reason, always with overflow handling as a fallback.
- **Never use device-specific hacks** (e.g., targeting "iPhone SE" specifically). Target logical breakpoints and flexible ranges, never named devices.
- **Never invent a one-off breakpoint** inside a single component. Use the shared scale in `RESPONSIVE.md` §4, or a fluid/container-query technique instead.
- **Touch targets are never smaller than 44×44px** (iOS HIG) / 48×48dp (Material) on any interactive element, at any breakpoint, including dense list rows and icon-only buttons.
- **Form input font size never drops below 16px** — smaller values trigger unwanted zoom on iOS Safari. 12px is the absolute floor for any real content anywhere, reserved for legal/meta text (see §5.2).

### 3.2 Where the details live

| You need | Go to |
|---|---|
| The 12-category Device Matrix every UI is tested against | `RESPONSIVE.md` §2 |
| Mobile-first method, with correct/incorrect code examples | `RESPONSIVE.md` §3 |
| The shared breakpoint scale (`xs`–`3xl`) and content max-widths | `RESPONSIVE.md` §4 |
| Fluid sizing: `clamp()`, `min()`/`max()`, auto-fit grids, Flexbox vs. Grid defaults | `RESPONSIVE.md` §5 |
| Container queries for context-adaptive components | `RESPONSIVE.md` §6 |
| Responsive images, media, and aspect ratios | `RESPONSIVE.md` §7 |
| Touch targets, hover-free design, safe areas | `RESPONSIVE.md` §8 |
| Responsive patterns for nav, tables, modals, forms, sidebars | `RESPONSIVE.md` §9 |
| Responsive anti-patterns to reject on sight | `RESPONSIVE.md` §10 |
| The 7-step responsive testing protocol | `RESPONSIVE.md` §11 |

### 3.3 Testing discipline

Before marking any UI task complete, run the full protocol in `RESPONSIVE.md` §11. Any overflow, clipping, overlap, undersized touch target, or content requiring zoom or horizontal scroll to read is a bug to fix now — not a follow-up to file later. When you change a shared component, re-run the check on every screen that component appears on, not just the one you were working in.

---

## 4. Component Architecture

### 4.1 Composition over configuration

Prefer composing small components together over building one large component with a growing list of boolean props (`showHeader`, `hideFooter`, `isCompactVariant`...). A component with ten boolean props is ten components wearing a trenchcoat. Split it.

### 4.2 Single Responsibility

Every component does one thing. If you're describing a component with "and" ("it renders the card and also handles the fetch and also manages modal state"), it needs to be split into a container/presentation pair or extracted hooks/logic.

### 4.3 Container vs. presentational separation

Keep data-fetching, state management, and business logic separate from rendering/markup where reasonably possible. Presentational components should be dumb, reusable, and easy to test in isolation — pass them data and callbacks, don't let them reach into global state or fire network requests directly.

### 4.4 Props are a contract, not a dumping ground

Design props to express intent clearly. Avoid `any`/untyped props. Give every prop a sensible default where one exists so the component is usable with minimal configuration. Required props should be the true minimum needed to render correctly.

### 4.5 No hardcoded content in shared components

Shared/reusable components never contain hardcoded copy, hardcoded colors outside the design token system, or hardcoded dimensions that should adapt to context. If it might need to change or vary, it's a prop, a token, or a slot — not a literal.

### 4.6 Component size discipline

If a component file is pushing past ~200–300 lines, that's a signal to extract subcomponents, hooks, or utility functions. Long files are a maintainability tax; nobody wants to scroll 800 lines to find the one conditional that matters.

---

## 5. Design System: Spacing, Typography, Color

### 5.1 Spacing

Use a consistent spacing scale (e.g., a 4px or 8px base unit: 4, 8, 12, 16, 24, 32, 48, 64...). Never use arbitrary one-off spacing values (`padding: 13px`) — if the scale doesn't have the value you think you need, that's a sign to reconsider the layout, not to break the scale. Consistent spacing is what makes a UI feel "designed" rather than assembled.

### 5.2 Typography

Define a type scale (e.g., a small set of sizes: 12/14/16/18/20/24/30/36/48px or the framework's equivalent scale) with matching line-heights and weights, and use only values from that scale. Two floors apply and are non-negotiable: body copy and all form inputs are **16px minimum** (below 16px, iOS Safari auto-zooms on focus), and **12px is the absolute minimum for any text anywhere**, reserved for legal and metadata text — never for primary content. Maintain a consistent, limited set of font weights (e.g., regular/medium/semibold/bold) — don't introduce arbitrary weights per component. Line length for body copy stays in a readable range (roughly 45–75 characters) — on wide screens, constrain text columns rather than letting lines stretch edge to edge.

Prefer a fluid type scale using `clamp()` over stepping font sizes at each breakpoint; see `RESPONSIVE.md` §5.2 for the technique and its guardrails.

### 5.3 Color

All colors come from a defined token system (semantic tokens like `color-primary`, `color-danger`, `color-surface`, `color-text-secondary` — not raw hex values sprinkled through components). Tokens are semantic, never literal: `color-danger`, not `color-red`, because the literal name becomes a lie the moment the palette changes. This is what makes theming (§23) and consistency enforceable. Every color pairing (text on background, icon on surface) must meet WCAG AA contrast minimums (4.5:1 for normal text, 3:1 for large text and UI components) — check this, don't eyeball it. Never use color as the sole indicator of state or meaning (e.g., error/success) — pair it with an icon, label, or shape so colorblind users aren't excluded.

### 5.4 Consistency enforcement

Before introducing a new spacing value, color, font size, or component variant, check whether an existing token or component already covers the need. New values are a last resort, not a first instinct.

---

## 6. Accessibility

Accessibility is not a checklist run at the end — it's a property of correct markup and interaction design from the start.

- Use semantic HTML elements (`button`, `nav`, `header`, `main`, `label`, etc.) before reaching for ARIA. ARIA supplements semantics, it doesn't replace them.
- Every interactive element must be reachable and operable via keyboard alone (tab order, `Enter`/`Space` activation, visible focus states — never remove focus outlines without providing an equally visible replacement).
- Every image needs meaningful `alt` text (or an empty `alt=""` if purely decorative).
- Every form input needs an associated, visible label (placeholder text is not a label).
- Respect `prefers-reduced-motion` — provide a reduced/no-animation variant for users who request it.
- Maintain a logical heading hierarchy (one `h1` per page, no skipped levels) so screen reader users can navigate by heading.
- Live regions (`aria-live`) for dynamically updating content that isn't the result of a direct user action (toasts, async status updates).
- Test critical flows mentally (or literally) with keyboard-only navigation and screen reader semantics in mind, not just mouse/visual review.

---

## 7. Performance

- Load only what's needed for the current view: code-split by route, lazy-load below-the-fold content and non-critical components, defer non-critical scripts.
- Images: use modern formats (WebP/AVIF with fallback) and compress appropriately. The sizing, `srcset`, `aspect-ratio`, and lazy-loading rules that keep images both fast and responsive are specified once in `RESPONSIVE.md` §7 — follow them there rather than treating image performance and image responsiveness as separate concerns; they're the same fix.
- Avoid unnecessary re-renders: memoize expensive computations and components where it demonstrably helps, but don't reach for memoization as a reflex — measure first, optimize second.
- Debounce/throttle expensive operations triggered by frequent events (scroll, resize, input).
- Prefer pagination, virtualization, or infinite scroll over rendering huge lists in full — virtualize any list that can realistically exceed ~100 items.
- Treat the lowest-spec supported device and the slowest supported network (think: a budget Android phone on throttled 3G) as the performance baseline, not the developer's machine and office wifi.
- Watch bundle size: avoid adding a heavy dependency for something a small utility function could do.

---

## 8. Animation & Motion

- Motion should clarify, not decorate: use it to show relationships (this appeared from that button), state changes, and directional context (e.g., forward navigation slides one way, back the other).
- Keep durations short and purposeful — roughly 150–300ms for most UI transitions; longer feels sluggish, shorter can feel abrupt or go unnoticed.
- Use standard easing curves (ease-out for entrances, ease-in for exits) rather than default linear timing, which reads as robotic.
- Always respect `prefers-reduced-motion: reduce` — disable or drastically simplify non-essential animation for users who request it.
- Never block user interaction with an animation. Users should be able to interrupt or skip transitions, not wait on them.
- Loading spinners are a last resort, not a first choice — prefer skeleton loaders (§14) which communicate layout and reduce perceived wait time.

---

## 9. Code Quality & Style

- Prefer clarity over cleverness. A junior engineer (or a fresh agent with zero context) should be able to read a function and understand what it does without re-reading it twice.
- Functions do one thing. If a function needs a comment explaining "step 1, step 2, step 3," it's a sign to extract those steps into named functions instead.
- No magic numbers or strings — name them as constants with clear names.
- No dead code, commented-out blocks left "just in case," or console.logs left in committed code.
- Handle errors explicitly. Don't swallow exceptions silently; don't let a promise rejection go unhandled.
- Types are not optional in a typed language/framework — avoid `any`/untyped escape hatches except at genuine external-data boundaries, and validate those boundaries with a schema (see §13).
- Write self-documenting code first; add comments only to explain *why*, not *what* (the code already says what).
- Every new piece of logic that has meaningful business rules or edge cases is covered by a test, not just eyeballed once and shipped (see §20).

---

## 10. File & Folder Organization

- Organize by feature/domain, not by file type, once the project grows past a trivial size (avoid giant flat `components/`, `hooks/`, `utils/` folders with no grouping — group related components, hooks, styles, and tests together by feature).
- Keep a clear separation between: UI components (presentational), feature modules (business logic + containers), shared/reusable primitives (design-system level components), utilities/helpers, and types/schemas.
- Colocate a component's styles, tests, and types with the component itself rather than scattering them into parallel mirrored folder trees.
- Keep a single, obvious place for shared design tokens, shared types, and shared constants — don't let duplicate "utils" folders sprout in multiple places.
- Barrel files (`index.ts` re-exports) are fine for clean imports at a feature boundary, but don't let them become a place where unrelated things get dumped together.

---

## 11. Naming Conventions

- Names should say what something is or does without needing the reader to open the file. `getUserById` not `fetchData`. `isLoading` not `flag`.
- Components: PascalCase (`UserCard`, `PrimaryButton`).
- Functions/variables: camelCase, verbs for functions (`calculateTotal`), nouns for variables (`total`).
- Booleans: prefixed to read as a question (`isVisible`, `hasError`, `canSubmit`, `shouldRetry`).
- Constants: SCREAMING_SNAKE_CASE for true constants (`MAX_RETRY_COUNT`).
- Files: match the primary export's name and casing convention consistently across the whole project — pick one convention (e.g., PascalCase for component files) and never mix.
- Avoid abbreviations unless they're universally understood in the domain (`id`, `url` are fine; `usrCfg` is not).
- Event handler props: `onX` (`onClick`, `onSubmit`); the internal handler implementing it: `handleX` (`handleClick`, `handleSubmit`). Keep this pairing consistent everywhere.

---

## 12. State Management

- Keep state as local as possible. Lift state up only when two or more components genuinely need to share it — don't default to global state for convenience.
- Distinguish clearly between: UI state (local component concerns — is a dropdown open), client/app state (cross-cutting concerns — current user, theme), and server/cache state (data fetched from an API). Use the tool appropriate to each — don't stuff server data into the same global store as UI toggles.
- Prefer a dedicated data-fetching/cache layer (e.g., a query library) for server state, so caching, deduplication, retries, and staleness are handled consistently rather than hand-rolled per component.
- Derive state where possible instead of storing redundant copies of the same fact in multiple places — duplicated state is a bug waiting to desync.
- Make state transitions explicit and predictable; avoid deeply nested conditional state that's hard to reason about. If a piece of state can be modeled as a small finite set of named states (idle/loading/success/error) rather than a pile of booleans, prefer the named-state model — it eliminates impossible state combinations.

---

## 13. API Integration Standards

- All network calls go through a single, shared client/service layer — never scatter raw `fetch`/`axios` calls directly inside components.
- Every API integration explicitly handles: success, error (with distinguishable error types/messages, not just a generic catch-all), loading, and timeout/network-failure cases.
- Validate and type external responses at the boundary (schema validation) rather than trusting the network to always return the expected shape.
- Centralize base URLs, headers, and auth token handling in one configurable place, never hardcoded per call site.
- Use retries with backoff for transient failures where appropriate, but never retry non-idempotent mutations blindly.
- Never expose secrets or API keys in client-side code.

---

## 14. Loading, Empty, and Error States (First-Class, Not Optional)

Every view that depends on async data must explicitly design and implement all of the following — treat a screen as unfinished if any is missing:

- **Loading state**: prefer skeleton loaders shaped like the eventual content (same layout, spacing, and approximate proportions) over generic spinners — this reduces perceived load time and prevents layout shift when real content arrives. Skeletons should be responsive too: they must reflow correctly at every breakpoint just like the real content will.
- **Empty state**: when a request succeeds but returns no data, show a purposeful empty state — brief explanation of why it's empty and, where relevant, a clear next action (e.g., "No trips yet — plan your first one"). Never just render a blank area; a blank area reads as broken, not empty.
- **Error state**: distinguish between recoverable errors (show a retry action) and terminal errors (explain what happened in plain language, no raw stack traces or error codes shown to end users). Never fail silently — the user should always know something went wrong.
- **Partial/degraded state**: when some data loads and some fails (e.g., one widget on a dashboard errors while others succeed), isolate the failure to that section rather than failing the whole page.

---

## 15. Form Validation

- Validate on the client for immediate feedback, but always re-validate on the server/API — never trust client validation as the source of truth.
- Show validation errors inline, next to the relevant field, in plain language ("Enter a valid email address," not "Invalid input: field[2]").
- Prefer validating on blur or on submit over validating on every keystroke for the first error (aggressive per-keystroke validation before the user has finished typing feels punitive); once a field has an error shown, it's fine to re-validate live as the user corrects it.
- Disable submit only when there's a clear reason and the reason is visible to the user — an invisible disabled button with no explanation is a dead end.
- Preserve user input on validation failure or submission error; never clear a form the user just filled out because of an error.
- Every form must be fully usable via keyboard and screen reader (correct `label`/`for` association, error messages associated via `aria-describedby`).

---

## 16. Error Handling (System-Wide)

- Fail loudly in development (surface errors clearly to the developer), fail gracefully in production (never show a raw stack trace or a blank white screen to an end user).
- Use error boundaries (or the framework equivalent) at sensible granularity so one broken component doesn't crash the entire app.
- Log errors with enough context to debug later (what action, what input, what state) without logging sensitive user data.
- Every error a user can see should have a next step: retry, go back, contact support — never a dead end with no path forward.

---

## 17. User Experience Principles

- Every action that takes more than ~300–400ms needs feedback (loading state, disabled button with spinner, progress indicator) — never leave the user wondering if their tap registered.
- Destructive actions (delete, remove, cancel a paid plan) always require confirmation, and the confirmation should state specifically what will happen, not a generic "Are you sure?"
- Never make the user re-enter information they've already provided in the same flow.
- Error messages are written for the user, not the developer — plain language, no jargon, no internal error codes unless paired with a human-readable explanation.
- Default to the platform's native interaction patterns (native `select` behavior, native scroll physics, native back gestures) rather than reinventing them, unless there's a strong, stated reason.
- Respect the user's time: don't add unnecessary steps, confirmations, or intermediate screens to a flow that could be one step shorter.

---

## 18. Maintainability & Scalability

- Design components and modules assuming someone else will extend them without talking to you first — clear props, clear boundaries, no hidden coupling to global state or side effects buried deep in the call stack.
- Avoid tight coupling between unrelated features; a change to the profile page should never risk breaking checkout.
- Prefer configuration/composition over duplicating a component with slight variations ("UserCardV2", "UserCardSmall", "UserCardNew") — that pattern is a sign the original component's API needs to grow, not that a sibling needs to be born.
- When in doubt about whether an abstraction is premature, ask: has this pattern already repeated three times? If yes, abstract it. If it's the first or second occurrence, duplication is often the more honest, more maintainable choice than a guessed-at abstraction.

**Reconciling this with §1.2 ("assume the product will succeed").** These two rules sound opposed but govern different things. §1.2 is about *quality of implementation*: don't take shortcuts — no skipped error states, no hardcoded widths, no "we'll make it responsive later." The rule of three is about *quantity of abstraction*: don't invent a generalized API for a pattern you've seen once, because you'll guess the wrong axis of variation and everyone will fight your abstraction for years. Build each thing properly; wait for evidence before building the thing that generalizes several things. Never use "avoid premature abstraction" as cover for skipping a hard gate.

---

## 19. Documentation Standards

- Every non-trivial module, hook, or utility function gets a short comment explaining its purpose and any non-obvious constraints (why, not what).
- Complex business logic or workarounds for external quirks (browser bugs, API inconsistencies) must be documented inline with the reasoning, so a future editor doesn't "clean up" and reintroduce the bug.
- Keep a running architecture/decisions record for significant structural choices (state management approach, folder structure rationale, key third-party dependencies and why they were chosen) so decisions aren't silently relitigated or reversed by accident.
- Documentation is updated in the same change as the code it describes — stale docs are worse than no docs, because they're actively misleading.
- This document set is itself subject to that rule. If you introduce a pattern that contradicts a rule here, or establish a convention this file doesn't cover, update the relevant file in the same change. Undocumented conventions decay into inconsistency within weeks.

---

## 20. Testing Standards

Tests exist to let the next person change this code without fear. That purpose determines what's worth testing: behavior users depend on, not implementation details that will legitimately change.

- **Test behavior, not internals.** Assert what the user or caller observes (rendered output, returned values, side effects), never private methods or internal state shape. A test that breaks on a harmless refactor is a liability, not a safety net.
- **Coverage priority**, in order: business logic and data transformations → error and edge-case paths → critical user flows end-to-end → component rendering. Chasing a coverage percentage is not a goal; covering the paths where a bug would actually hurt is.
- **Every bug fix ships with a regression test** that fails before the fix and passes after. This is the single highest-value testing habit — it's the only thing that stops the same bug recurring.
- **Test the unhappy paths explicitly**: network failure, empty response, malformed data, permission denied, timeout. If §14 requires a state to exist, a test should prove it renders.
- **Tests are code** and are held to the same quality bar as production code: clear names describing the scenario and expectation, no duplicated setup sprawl, no sleeping/arbitrary waits.
- **Deterministic or deleted.** A flaky test is worse than no test, because it trains everyone to ignore failures. Fix it or remove it — never retry it into passing.
- Mock at boundaries you don't own (network, time, randomness, storage); don't mock the thing you're testing.

## 21. Security & Privacy Baseline

Security is a hard gate (see the preamble). These are minimums, not the full picture for any project handling sensitive data.

- **Never commit secrets.** API keys, tokens, and credentials live in environment configuration, never in source, never in client-side bundles. Anything shipped to a browser is public — treat it that way.
- **Never trust client input.** Validate and sanitize on the server regardless of what client-side validation did (§15).
- **Escape/encode all user-supplied content** before rendering. Never inject raw HTML from user or API data (no `dangerouslySetInnerHTML` or equivalent without an explicit, sanitized, documented reason).
- **Authorize on the server, every request.** Hiding a UI control is not access control.
- **Log for debugging, never for surveillance.** Never log passwords, tokens, full payment details, or personal data. Redact by default.
- **Collect the minimum data needed** for the feature to work, and be able to state why each field is collected.
- Use HTTPS everywhere, set sensible cookie flags (`HttpOnly`, `Secure`, `SameSite`), and keep dependencies patched (§24).

## 22. Internationalization & Text Direction

Even if the product ships in one language today, these cost almost nothing now and are expensive to retrofit.

- **No hardcoded user-facing strings** in components. Route all copy through the project's i18n layer from the start.
- **Never concatenate translated fragments** to build a sentence — word order differs between languages. Use full parameterized strings.
- **Assume text will be 30–50% longer** than English (German, French) or much shorter (Chinese, Japanese). Layouts must absorb both without breaking — this is a responsive concern as much as a linguistic one (`RESPONSIVE.md` §11, step 6).
- **Use CSS logical properties** — `margin-inline-start`, `padding-block`, `inset-inline-end`, `text-align: start` — rather than physical `left`/`right` equivalents. This makes RTL support (Arabic, Hebrew) close to free instead of a rewrite. See `RESPONSIVE.md` §5.5.
- **Never hardcode formats.** Dates, times, numbers, and currency are locale-dependent; format them through a locale-aware API, never string manipulation.
- Icons and imagery with directional meaning (arrows, progress indicators) must mirror in RTL.

## 23. Theming & Dark Mode

- Every color used anywhere resolves through a semantic token (§5.3). If a component references a raw hex value, theming is already broken.
- Support light and dark from the start by defining tokens per theme rather than adding a dark-mode override sheet later. Respect `prefers-color-scheme` by default, and honor an explicit user override above the system setting when the product offers one.
- **Contrast requirements apply per theme.** A pairing that passes AA in light mode can fail in dark mode — verify both.
- Dark mode is not inverted light mode: pure black backgrounds with pure white text cause halation and eye strain. Use near-black surfaces and slightly dimmed foreground text, and reduce large saturated color areas.
- Elevation in dark themes is expressed with lighter surface tokens rather than heavier shadows, which are nearly invisible on dark backgrounds.

## 24. Dependencies & Change Hygiene

- **Adding a dependency is a long-term commitment**, not a convenience. Before adding one, ask: is it actively maintained, reasonably sized, widely used, and does it solve a problem genuinely harder than the code it replaces (§1.5)? A twenty-line utility does not justify a package.
- Prefer one well-chosen library per problem domain over several overlapping ones. Two date libraries in one codebase is a defect.
- Keep dependencies current and patched; treat known vulnerabilities as bugs with a deadline, not backlog items.
- **Changes are small, focused, and independently reviewable.** One logical change per commit; never mix a refactor, a feature, and a formatting sweep in the same change — it makes review impossible and bisecting useless.
- Commit messages explain *why* the change was made, not just what changed; the diff already shows what.
- Never leave the codebase in a state where the build fails, tests fail, or lint errors are introduced. If work must land incomplete, it must be clearly flagged as such.

---

## 25. The Pre-Ship Checklist

Before considering any change complete, confirm all of the following. This is the definition of done for the project; `RESPONSIVE.md` §11 is the deeper protocol for the responsive items below.

**Hard gates — a failure here means the work is unfinished:**

- Renders correctly across the full Device Matrix (`RESPONSIVE.md` §2), both orientations, with no overflow, clipping, or overlap — verified via the protocol in `RESPONSIVE.md` §11.
- All touch targets meet minimum size at touch-capable breakpoints.
- All text meets WCAG AA contrast against its background, **in every supported theme** (§23).
- Fully operable via keyboard, with visible focus states, and correct semantics for screen readers (§6).
- Loading, empty, error, and partial-failure states are all implemented, not just the happy path (§14).
- No secrets in client code; all external input validated at the boundary (§13, §21).

**Quality bar:**

- No hardcoded pixel dimensions that should be flexible.
- No new one-off spacing, color, or font values outside the design token system (§5).
- No hardcoded user-facing strings; logical CSS properties used for directional styling (§22).
- Animations respect `prefers-reduced-motion` (§8).
- New logic and any fixed bug are covered by tests; the full suite passes (§20).
- No console errors or warnings introduced; no dead code, commented-out blocks, or stray logging left behind (§9).
- Naming, file placement, and component structure follow §10 and §11.
- Documentation updated in the same change if a convention or architectural decision changed (§19).

If any box is unchecked, the work is not done — it's in progress. Say so plainly rather than presenting partial work as finished. An accurate "this is 90% done, responsive testing on tablets is outstanding" is far more useful than an inaccurate "done."

---

## Closing Note

This document exists so that every decision — from a spacing value to a state management pattern — has a clear, defensible answer rooted in a consistent philosophy, not a fresh judgment call each time. When something isn't covered explicitly, reason first from the hard gates (responsiveness, accessibility, correctness, security are never traded away), then from the priority ladder (scalable → maintainable → reusable → performant → accessible → responsive → consistent), and always from the principle that the product must work, and work well, on every device someone might reasonably use it on.

Build like the person maintaining this in a year has no memory of writing it — because for an AI agent, that's literally true every time.

**Companion document:** `RESPONSIVE.md` — read it before writing any layout code.
