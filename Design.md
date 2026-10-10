# SHIKHAR 2026 — Design System

## Overview

**Product:** SHIKHAR 2026 — "Transcend The Time", the management fest of SCMS Business School, Kochi
**Surface type:** Event / fest website (immersive landing + event catalogue + registration)
**Primary device:** Mobile (≈80%+ of traffic, many budget Android phones on 4G); desktop is the enhancement
**Audience:** MBA and management students from colleges across Kerala and India (participants, under 500), plus faculty, sponsors and visitors
**Brand character:** Dune-inspired cinematic desert sci-fi. Ancient meets future. Sand, stone, bronze and starlight. Epic but disciplined: engraved capitals for drama, calm readable serif for information, one strong accent (mustard gold).

**Concept:** "The Journey of the Strategist." The visitor travels through three worlds:

| World             | Meaning                   | Colour mood        | Signature visual        |
| ----------------- | ------------------------- | ------------------ | ----------------------- |
| I · The Known     | Management of the present | Silver + charcoal  | Particle city skyline   |
| II · The Shift    | Management in transition  | Bronze + mustard   | Dunes + sandstorm       |
| III · The Unknown | Management of the future  | Deep blue + silver | Floating rings + planet |

### Design Principles

- **Atmosphere first, clarity always.** The world can be cinematic; event info, dates, fees and the Register button must always be instantly readable.
- **Sand is the material.** Particles, contour lines, grain and dust carry the identity — not gradients or glassmorphism.
- **One accent, used with intent.** Mustard gold marks the action (Register, active state, current waypoint). If everything glows, nothing does.
- **Thumb-first.** Every primary action is reachable with one thumb on a 390px screen.
- **Light enough to never crash.** Every visual choice must survive a ₹10k Android phone; heavy effects are enhancements, never requirements.

## Colors

Dark-first, single theme (the brand is a night desert). Tokens are referenced by name, never raw hex, in components.

### Brand palette (from the official visual identity)

| Token             | Value     | Role                                                                |
| ----------------- | --------- | ------------------------------------------------------------------- |
| `color-ink`       | `#121316` | Page background                                                     |
| `color-charcoal`  | `#303238` | Raised surfaces, cards, sheets                                      |
| `color-sand`      | `#D8C8B8` | Primary text, sand particles                                        |
| `color-mustard`   | `#B59A44` | Accent — CTAs, active states, focus ring, gold glow                 |
| `color-bronze`    | `#A77342` | The Shift world, secondary accent, dividers                         |
| `color-deep-blue` | `#0B1C35` | The Unknown world background                                        |
| `color-silver`    | `#C4CCD6` | The Known world, secondary text on blue                             |
| `color-logo-red`  | `#C0141B` | **Only** the "26" emblem — confirm exact value from the vector logo |

### Semantic tokens

| Token                           | Maps to                                    | Use                                                  |
| ------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| `color-bg`                      | `color-ink`                                | Page background                                      |
| `color-surface`                 | `color-charcoal`                           | Cards, bottom sheets, inputs                         |
| `color-surface-raised`          | `color-charcoal` + 6% `color-sand` overlay | Hover / pressed surfaces                             |
| `color-text-primary`            | `color-sand`                               | Body text, headings                                  |
| `color-text-secondary`          | `color-sand` at 70% opacity                | Meta, captions (must still pass 4.5:1 on `color-bg`) |
| `color-text-on-accent`          | `color-ink`                                | Text on mustard buttons                              |
| `color-accent`                  | `color-mustard`                            | Primary actions, active nav, current waypoint        |
| `color-border`                  | `color-sand` at 14% opacity                | Hairlines, card outlines                             |
| `color-focus`                   | `color-mustard`                            | 2px focus ring + 2px `color-bg` offset               |
| `color-live`                    | `color-logo-red`                           | "LIVE NOW" badge only                                |
| `color-success` / `color-error` | Muted green `#6E9C6A` / brick `#C25A45`    | Form feedback only                                   |

### World themes (applied to sections via `data-world`)

| `data-world` | Background                     | Accent                           | Text           |
| ------------ | ------------------------------ | -------------------------------- | -------------- |
| `known`      | `color-ink` → `color-charcoal` | `color-silver`                   | `color-sand`   |
| `shift`      | `color-ink` with bronze haze   | `color-bronze` / `color-mustard` | `color-sand`   |
| `unknown`    | `color-deep-blue`              | `color-silver`                   | `color-silver` |

## Typography

**Font stack:**

- **Display:** `Cinzel`, "Trajan Pro", Georgia, serif — engraved Roman capitals
- **Body:** `Spectral`, Georgia, "Times New Roman", serif
- **Utility / numbers:** `JetBrains Mono`, ui-monospace, monospace — countdown, times, fees, strategist number
- **Logo wordmark:** supplied SVG only (Samarkan-style) — never typeset

Mobile-first scale (desktop sizes in brackets):

| Level       | Size         | Font        | Usage                               |
| ----------- | ------------ | ----------- | ----------------------------------- |
| `text-xs`   | 12px         | Mono / Body | Captions, metadata, legal           |
| `text-sm`   | 14px         | Body        | Labels, chips, secondary text       |
| `text-base` | 16px         | Body        | Body text (never smaller on mobile) |
| `text-lg`   | 18px [20px]  | Body        | Lead paragraphs, event taglines     |
| `text-xl`   | 24px [32px]  | Display     | Card titles, event names            |
| `text-2xl`  | 32px [48px]  | Display     | Section headings                    |
| `text-3xl`  | 44px [72px]  | Display     | World titles ("THE SHIFT")          |
| `text-4xl`  | 56px [128px] | Display     | Hero ("TRANSCEND THE TIME")         |

**Weights:** Body 400 / 600 · Display 500 / 700 · Mono 500
**Line height:** body 1.6 · headings 1.1 · display hero 0.95
**Letter-spacing:** Display caps +0.06em (hero +0.02em) · Eyebrow labels +0.2em · Body 0
**Measure:** body text max 65ch

## Spacing

**Base unit:** 4px. Use only these steps:

`space-1: 4px` · `space-2: 8px` · `space-3: 12px` · `space-4: 16px` · `space-5: 24px` · `space-6: 32px` · `space-7: 48px` · `space-8: 64px` · `space-9: 96px` · `space-10: 128px`

- Page gutter: `space-4` mobile, `space-6` tablet, `space-8` desktop
- Section padding (vertical): `space-8` mobile, `space-10` desktop
- Card inner padding: `space-4` mobile, `space-5` desktop
- Minimum tap target: 44 × 44px

## Shapes

Carved stone, not soft plastic. Mostly sharp, with pills reserved for small controls.

| Token         | Value | Use                                                    |
| ------------- | ----- | ------------------------------------------------------ |
| `radius-none` | 0     | Event banners, full-bleed imagery                      |
| `radius-sm`   | 2px   | Cards, inputs, buttons                                 |
| `radius-md`   | 8px   | Bottom sheet top corners                               |
| `radius-pill` | 999px | Chips (team size, fee), filter toggle, bottom nav pill |

**Signature ornaments:** thin gold hairline dividers with a small diamond or compass star in the centre; corner brackets on banner cards; sand contour-line textures as background (SVG, ≤ 8 KB).

## Elevation

Depth comes from light and dust, not heavy drop shadows.

- **shadow-sm:** `0 1px 0 0 color-border` — hairline separation
- **shadow-md:** `0 12px 32px -16px rgba(0,0,0,0.7)` — cards over imagery
- **shadow-lg:** `0 -16px 48px -12px rgba(0,0,0,0.8)` — bottom sheets
- **glow-accent:** `0 0 24px -4px rgba(181,154,68,0.55)` — primary CTA, active waypoint (one per viewport)
- **grain:** 4–6% film-grain overlay (static PNG/SVG noise, not animated on mobile)

## Motion

Motion feels like sand and time: slow drifts, weighted settles, never bouncy.

| Token            | Value                            | Use                            |
| ---------------- | -------------------------------- | ------------------------------ |
| `ease-sand`      | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Default for everything         |
| `ease-storm`     | `cubic-bezier(0.7, 0, 0.3, 1)`   | World transitions              |
| `duration-fast`  | 150ms                            | Hover, press, colour           |
| `duration-base`  | 250ms                            | Buttons, chips, tabs           |
| `duration-slow`  | 450ms                            | Sheets opening, card expansion |
| `duration-scene` | 800–1200ms                       | World morph, loader flip       |
| `loop-drift`     | 60s linear infinite              | Rings rotating, marquee        |
| `loop-pulse`     | 1.6s ease-in-out infinite        | "LIVE NOW" badge               |

Rules:

- Animate only `transform` and `opacity` in UI.
- One orchestrated moment per screen (hero burst, world morph); everything else stays subtle.
- `prefers-reduced-motion: reduce` → no parallax, no particles, no loops; instant or fade-only transitions.
- Native scroll on touch devices — no scroll-jacking.

## Components

Core component inventory for the site:

| Component               | Notes                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Bottom nav** (mobile) | 4 items: Home · Events · Schedule · Register. Register uses `color-accent`. Safe-area padded                                    |
| **Top bar**             | Logo SVG left, menu right; transparent over hero, `color-bg` at 85% + blur after scroll                                         |
| **Primary button**      | Mustard fill, ink text, `radius-sm`, Cinzel caps label, `glow-accent` on hero only                                              |
| **Secondary button**    | 1px `color-mustard` outline, sand text                                                                                          |
| **Event banner card**   | Tall 3:4 image, sigil top, name in Cinzel, type in body, corner brackets, chips row                                             |
| **Event bottom sheet**  | Image header, tagline, chips (team, fee, prize, day/time), accordions (Rules, Rounds, Coordinators), sticky Register + WhatsApp |
| **Chips**               | Pill, `color-surface`, `text-sm`; accent variant for selected filter                                                            |
| **Journey trail**       | Vertical gold line + 10 numbered waypoints; current = mustard glow                                                              |
| **Countdown**           | Mono digits in 4 boxes: DAYS · HRS · MIN · SEC                                                                                  |
| **Schedule timeline**   | Day tabs, time (mono) + event + venue rows, LIVE badge                                                                          |
| **Form fields**         | `color-surface`, 1px `color-border`, 48px height, label above, error text below                                                 |
| **Strategist pass**     | 1080×1920 canvas card: logo, name, college, event, "STRATEGIST No. 0147", QR                                                    |

## Do's and Don'ts

### Do

- Reference tokens by name (`color-accent`, `space-4`), never raw values.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use Cinzel UPPERCASE for display headings, event names and button labels — this is the brand voice.
- Write body text, descriptions and rules in sentence case.
- Keep fees, dates, team sizes and the Register button visible without scrolling inside any event view.
- Test every component at 360px and 1440px before shipping.
- Use the deck artwork (compressed AVIF/WebP) as the visual source for events and worlds.

### Don't

- Do not introduce colours outside the palette — no default purple, blue or neon from imported components.
- Do not use `color-logo-red` for anything except the emblem and the LIVE badge.
- Do not use uppercase for body paragraphs or rules.
- Do not use arbitrary spacing values or mix radius values outside the scale.
- Do not stack multiple animated backgrounds in one viewport.
- Do not put essential text inside canvas, images or video.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not use soft rounded "SaaS" cards or glassmorphism as the default card style.

## Writing Tone

Epic but clear. Short, declarative lines in the voice of the deck ("Build people. Build power."). Address the visitor as "you", the strategist. Headlines can be dramatic; instructions and rules must be plain and precise.

Approved lines (use verbatim):

- "Can you manage what has never existed before?"
- "The present is only the beginning."
- "From managing what exists to creating what comes next."
- "The future does not have a playbook. Create one."

Button labels: "Register now", "Explore events", "View rules", "WhatsApp coordinator", "Share my pass".

## Authoring Workflow

When creating or updating a component for this system:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Find references** — use Refero / MotionSites / 21st.dev (see CLAUDE.md §16); note the pattern being borrowed.
3. **Map tokens** — list every colour, spacing, typography, radius and motion token used. No raw values.
4. **Define anatomy** — named parts (container, sigil, title, chips, CTA…) with token assignments.
5. **Specify states** — default, hover, focus-visible, active, disabled, loading, error, empty.
6. **Describe interactions** — touch first, then pointer and keyboard; include long names, missing images, slow network.
7. **Add accessibility criteria** — testable pass/fail checks.
8. **Check performance** — mobile behaviour, reduced-motion behaviour, static-tier fallback.
9. **List anti-patterns** and close with the QA checklist below.

## Required Output Structure

Every component guideline must contain, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens.
3. Anatomy and variants — named parts, variant matrix, mobile vs desktop behaviour, world themes.
4. States and interactions — full state table; touch, pointer and keyboard behaviour.
5. Accessibility — ARIA, contrast, focus management, screen reader behaviour.
6. Performance — mobile limits, reduced-motion and static fallbacks.
7. Content guidelines — copy length, tone, capitalisation, placeholder rules.
8. Anti-patterns — concrete examples of misuse with reasons.

## Component Requirements

Every component must:

- Use only tokens defined above — no hardcoded hex, px or font values.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Work at 360px (smallest) and 1440px (largest) widths; mobile layout designed first.
- Handle edge cases: empty state, long event names, missing image, offline/slow network.
- Support keyboard navigation (Tab, Enter, Escape, Arrow keys where relevant).
- Document ARIA roles, labels and live regions (e.g. countdown, LIVE badge).
- Respect `prefers-reduced-motion` and the static quality tier.
- Pull all event content from `src/data/events.json` — never hardcode.

## Definition of Done

A component is not complete until:

- [ ] Renders correctly in its default state on a real mobile device.
- [ ] All states visually verified (hover, focus, disabled, loading, error, empty).
- [ ] Zero hardcoded visual values — tokens only.
- [ ] Keyboard navigation works without a pointer.
- [ ] Text contrast ≥ 4.5:1, focus ring ≥ 3:1, tap targets ≥ 44px.
- [ ] Tested at 360px and 1440px, and in every `data-world` theme it appears in.
- [ ] Works with reduced motion on and in the static (no-WebGL) tier.
- [ ] No measurable jank on a budget Android phone (no long tasks > 50ms from this component).
- [ ] Anti-patterns section lists at least one concrete misuse.
- [ ] Documentation covers purpose, usage, props/API and limitations.
