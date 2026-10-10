# CLAUDE.md — SHIKHAR 2026 Website

> Guidance for Claude Code (and any developer) working on this repo. Read this fully before writing code.

## 1. Project overview

**SHIKHAR 2026 — "Transcend The Time"** is the management fest of **SCMS Business School, Kochi**.
This repo is its official website: an interactive, **mobile-first**, three.js-powered experience.

**Big idea: "The Journey of the Strategist."** The whole site is one journey through sand and time. The visitor is the strategist; scrolling moves them through three worlds:

| World             | Meaning                   | Visual                                   | Colour mood       |
| ----------------- | ------------------------- | ---------------------------------------- | ----------------- |
| I · The Known     | Management of the present | Particle city skyline with window lights | Silver + charcoal |
| II · The Shift    | Management in transition  | Rolling dunes + sandstorm                | Bronze + mustard  |
| III · The Unknown | Management of the future  | Floating rings + planet                  | Deep blue         |

Everything visual is built from **sand particles** (three.js `Points`), not heavy 3D models. Sand is the brand material, and particles are cheap on phones.

**Audience:** under 500 participants plus visitors, ~80%+ on mobile, many on budget Android phones and 4G.
**Top priorities, in order:** (1) never crash / never blank screen, (2) registration works, (3) fast on mobile, (4) wow factor.

Brand tagline lines to use verbatim:

- "Can you manage what has never existed before?"
- "The present is only the beginning."
- "From managing what exists to creating what comes next."
- "The future does not have a playbook. Create one."

## 2. Tech stack

- **Build:** Vite + **React + TypeScript** (chosen so 21st.dev / shadcn components drop in directly — see §16)
- **UI components:** shadcn/ui + components pulled from 21st.dev (Aceternity UI / Magic UI ports), always reskinned to §4 tokens
- **3D:** plain `three` inside a single React component (`<SandCanvas />`) with tree-shaken imports (e.g. `import { Points, BufferGeometry } from 'three'`). React Three Fiber is allowed only if it stays within §8 budgets; never more than one canvas.
- **Animation:** `motion` (Framer Motion) for component/UI motion; GSAP + ScrollTrigger for scroll-driven 3D morphs. Lenis smooth scroll **desktop only** (never hijack touch scroll).
- **Styling:** Tailwind CSS with the §4 tokens mapped in `tailwind.config` / CSS variables. No default purple/blue component colours may survive.
- **Hosting:** static deploy on Vercel / Netlify / Cloudflare Pages. **No custom server.**
- **Registration:** external service (Konfhub / Tally / Google Forms / Razorpay Payment Pages). Optional Supabase for the Playbook Wall only.
- **Analytics:** GA4 or Umami.
- **Do NOT use:** Spline exports, unoptimised GLTF scenes, multiple WebGL canvases, video-heavy hero on mobile without a poster fallback.

## 3. Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # serve the production build
npm run lint
npx shadcn@latest add <component>   # add a shadcn / 21st.dev registry component
```

Keep this section updated if scripts change.

## 4. Brand & design tokens

Full design system (tokens, type scale, spacing, motion, component rules, Definition of Done): **see `DESIGN.md`**. If the two files ever disagree on visual details, `DESIGN.md` wins; on performance and architecture, this file wins.

Palette (from the official visual identity page — do not invent new brand colours):

```css
:root {
  --charcoal: #303238; /* base surfaces */
  --ink: #121316; /* page background (deeper than charcoal) */
  --sand: #d8c8b8; /* primary text on dark, particles */
  --bronze: #a77342; /* The Shift */
  --mustard: #b59a44; /* accent / CTAs / gold glow */
  --deep-blue: #0b1c35; /* The Unknown */
  --silver: #c4ccd6; /* The Known */
  --logo-red: #c0141b; /* ONLY for the "26" emblem — confirm exact value from the vector logo */
}
```

- **Display font:** Cinzel (engraved Roman capitals, closest free match to the deck lettering). Uppercase, letter-spaced, used sparingly for headings.
- **Body font:** a clean, readable serif (e.g. Spectral / Cormorant Garamond at ≥16px on mobile).
- **Logo:** red "26" emblem + Samarkan-style "Shikhar 2026" wordmark, as **SVG** in `public/brand/`. Never recreate the logo in CSS/text.
- **Texture language:** sand contour lines, mineral textures, soft gold glow, subtle film grain.
- Section colour temperature shifts with the active world (charcoal/silver → bronze → deep blue).

## 5. Site map

Mobile bottom nav (always visible on mobile): **Home · Events · Schedule · Register**

| Route                        | Content                                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------- |
| `/`                          | The journey: loader → hero → three worlds → event map → countdown → sponsors → finale "CREATE ONE." |
| `/events`                    | Filter: Management / Non-Management                                                                 |
| `/events/[slug]`             | Event detail (also openable as a bottom sheet from anywhere)                                        |
| `/schedule`                  | Day-wise timeline; "LIVE NOW" during fest                                                           |
| `/register`                  | Hand-off to registration service + strategist pass                                                  |
| `/experience`                | Campus: Horizon Entrance, Playbook Wall, Horizon Stage                                              |
| `/sponsors`, `/team`, `/faq` | Static content                                                                                      |

## 6. Signature features (spec)

1. **Hourglass loader** — particle hourglass; fallen sand = real asset-loading progress. At 100% it flips and particles burst into the hero. Must finish or skip within **3 s max** even if assets are slow (show hero with poster fallback).
2. **Hero: sand you can touch** — "TRANSCEND THE TIME" formed from particles. Pointer/finger = wind (repulsion in vertex shader); particles drift back. Tagline below. Register CTA always visible above the fold.
3. **Three Worlds morph** — ONE `Points` object with target positions per shape stored as attributes (`aHourglass`, `aKnown`, `aShift`, `aUnknown`); a `uMorph` uniform (0→3) driven by scroll interpolates in the shader. Add turbulence mid-transition. Never rebuild geometry on scroll.
4. **Event map ("Journey of the Strategist")** — 10 management events as waypoints on a glowing path.
   - Desktop: camera glides along a spline over particle terrain.
   - Mobile: **no 3D** — vertical SVG trail; waypoints light up via IntersectionObserver.
5. **Event banners** — each event has a sigil + banner. Tap → bottom sheet: tagline, rules, team size, fee, prize, coordinator WhatsApp, Register button. Non-management events in a horizontal swipe row (CSS scroll-snap).
6. **Sand countdown** — digits rendered from particles (desktop) / CSS-animated digits (mobile low tier). Switches to "LIVE NOW" schedule + results on fest days.
7. **"Create One." strategist pass** — after registration, generate a 1080×1920 shareable pass on a `<canvas>` client-side (name, college, event, "Strategist No. XXXX"). Download + Web Share API where available. No server.
8. **Digital Playbook Wall (optional, phase 2)** — visitors answer "What will tomorrow's managers need to learn?"; answers float as text. Needs moderation; Supabase table with an `approved` flag.

Small touches: optional ambient sound (OFF by default, explicit toggle), `navigator.vibrate` short taps on Android, faint sand trail on pointer (desktop only), finale where sand rises up the steps to form "CREATE ONE."

## 7. Event data

All event content lives in **`src/data/events.json`** (single source of truth; non-coders edit this or a synced Google Sheet). Never hardcode event details in components.

```jsonc
{
  "slug": "the-spice",
  "name": "The Spice",
  "category": "management", // "management" | "non-management"
  "type": "Finance Game",
  "tagline": "Resources define possibilities.",
  "theme": "Capital allocation and risk",
  "journeyOrder": 4, // 1-10 for management events, null otherwise
  "journeyWord": "Resources",
  "teamSize": "2", // TODO confirm
  "fee": null, // TODO confirm (INR)
  "prize": null, // TODO confirm (INR)
  "day": null,
  "time": null,
  "venue": null,
  "rules": [],
  "coordinators": [{ "name": "", "whatsapp": "" }],
  "registerUrl": "",
  "image": "/img/events/the-spice.avif",
}
```

**Management events (journey order):**

1. The Visionary — Best Manager — "See beyond the present." — Vision
2. The Voice — Marketing Game — "Shape perception. Move the market." — Influence
3. The Houses — HR Game — "Build people. Build power." — People
4. The Spice — Finance Game — "Resources define possibilities." — Resources
5. Arrakis — Operations Game — "Adapt. Optimise. Survive." — Adaptation
6. The Alliance — Smart Buddies (Business Duo) — "Two minds. One strategy." — Partnership
7. The Council — Best Management Team — "Many minds. One mission." — Coordination
8. The Prophecy — Agency Pitch — "Imagine what comes next." — Foresight
9. The Imperium — Business Simulation — "One organisation. Infinite decisions." — Systems
10. The Ascension — Hackathon — "Build beyond the known." — Creation

**Non-management events:**

- The Archives — Paper Presentation — "Ideas that outlive their time."
- The Legacy — Corporate Walk — "Every era leaves a mark."
- The Great Exchange — IPL Auction — "Resources are limited. Strategy isn't."
- The Arena — Football — "Enter. Compete. Conquer."
- The Quest — Treasure Hunt — "Navigate the unknown."
- The Visionaries — Short Film Making — "See tomorrow. Frame it today."

Schedule and results: `src/data/schedule.json`, `src/data/results.json` (same edit-without-code rule).

## 8. Performance budgets (hard rules)

The real crash risk is **mobile browsers running out of GPU/memory**, not server traffic. Treat these as CI-failing limits:

| Budget             | Limit                                                                  |
| ------------------ | ---------------------------------------------------------------------- |
| WebGL canvases     | **1** for the whole app; reuse it across sections                      |
| Particles          | ≤ 12,000 mobile / ≤ 30,000 desktop (start lower, scale up)             |
| Device pixel ratio | `renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))`              |
| Initial JS (gzip)  | < 200 KB; three.js + 3D code lazy-loaded after first paint             |
| Textures           | ≤ 1024px, compressed; total 3D assets < 2 MB                           |
| Images             | AVIF/WebP with `srcset`, ~150 KB each, `loading="lazy"` below the fold |
| LCP on 4G mobile   | < 2.5 s                                                                |
| Lighthouse mobile  | ≥ 85 performance, ≥ 90 accessibility                                   |

**Adaptive quality** (`src/three/quality.js`):

- Tiers: `high` / `medium` / `low` / `static`.
- Pick an initial tier from `hardwareConcurrency`, `deviceMemory`, screen size (optionally `detect-gpu`).
- Measure FPS for the first ~2 s; if average frame time > 22 ms, drop a tier (reduce `drawRange`, pixel ratio). Never step back up mid-session.

**Always:**

- Pause the render loop when the canvas is off-screen (IntersectionObserver) or the tab is hidden (`visibilitychange`).
- `dispose()` geometries, materials, textures on route change.
- Handle `webglcontextlost` → fall back to static art, no crash.
- Clamp delta time in the animation loop.

## 9. Fallbacks & accessibility

- **Static tier** (deck artwork as still images, CSS-only motion) when ANY of: no WebGL, `prefers-reduced-motion: reduce`, `navigator.connection.saveData`, low tier detected, or context lost. The site must be fully usable — every event, the schedule and registration — with JS 3D disabled.
- All text is real HTML, never baked into canvas or images (SEO + screen readers). Canvas is `aria-hidden="true"`.
- Tap targets ≥ 44px; contrast ≥ 4.5:1 for body text on dark backgrounds.
- Visible focus states; bottom sheets trap focus and close on Esc/back.
- Native scroll on touch devices. No scroll-jacking, no pinned sections longer than ~1.5 viewports on mobile.
- Respect safe-area insets (`env(safe-area-inset-bottom)`) for the bottom nav.

## 10. Project structure (target)

```
public/
  brand/            # logo SVGs, favicon, OG images
  img/              # compressed deck art (avif/webp), event images, posters
src/
  data/             # events.json, schedule.json, results.json, sponsors.json
  three/            # renderer.js, sand.js (particles + shaders), shapes/*.js, quality.js
  shaders/          # sand.vert.glsl, sand.frag.glsl
  components/       # loader, hero, worlds, journey, event-sheet, countdown, pass, nav
  components/ui/    # shadcn + 21st.dev components (reskinned; note source URL in a header comment)
  pages/            # if Astro / multi-page
  styles/           # tokens.css, base.css, components
  utils/
```

## 11. Coding conventions

- Mobile-first CSS: base styles for ~390px, enhance with `min-width` media queries.
- Feature-detect, don't user-agent sniff (except as a weak hint for quality tier).
- Keep shape generators (`shapes/hourglass.js`, `known.js`, `shift.js`, `unknown.js`) pure functions returning `Float32Array(count * 3)` so they can be unit tested and run in a Web Worker if needed.
- No secrets in the repo. Registration/payment keys live in the external service or env vars.
- Commit small, descriptive commits. Run `npm run build` and check the bundle size before pushing.

## 12. Testing checklist (before every deploy)

- [ ] Budget Android (₹10k Redmi/Realme), Chrome — smooth scroll, no tab reload/crash after 3 min of use
- [ ] Older iPhone (SE / 11), Safari — WebGL works, bottom nav clears home indicator
- [ ] Desktop Chrome + Safari + Firefox
- [ ] Throttled "Slow 4G" in DevTools — loader never blocks > 3 s
- [ ] Reduced motion + Data Saver ON → static tier works end-to-end
- [ ] Every event page has correct fee/prize/registration link
- [ ] Registration flow tested with a real payment (then refunded)
- [ ] Lighthouse mobile meets §8 budgets

## 13. Build plan

- **Week 1:** lock content, vector logo, compress art, mobile wireframes.
- **Week 2:** all pages + **registration live first** (registrations > 3D).
- **Week 3:** three.js hero, world morph, event map, adaptive quality.
- **Week 4:** strategist pass, polish, real-device testing, launch.
- **Fest week:** update schedule/results via JSON/Sheet only — no risky deploys of new features.

## 14. Open items / TODO (fill in as decided)

- [ ] Fest dates and day-wise schedule
- [ ] Registration platform + fees per event (paid or free?)
- [ ] Team sizes, rules, prizes, coordinators per event
- [ ] Vector logo files + exact logo red; Samarkan-style font licence
- [ ] Domain name
- [ ] Sponsor logos and tiers
- [x] Build tool: Vite + React + TypeScript (for 21st.dev / shadcn compatibility)

## 15. Do / Don't summary

**Do:** keep it static, keep one canvas, measure FPS and degrade gracefully, keep content in JSON, test on a cheap phone.
**Don't:** build a custom backend for registration, hijack mobile scroll, ship uncompressed deck images (source PDF is 82 MB), add a second WebGL context, put important text inside the canvas.

## 16. Design tools (MCP servers) — how to use them

Three MCP servers are available to Claude Code for this project. **Use them before hand-writing UI.**

| Tool                            | Use it for                                                                                                                                  | Do NOT use it for                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Refero** (`refero`)           | Real-world design references: layouts, mobile screens, navigation, event/ticketing flows, registration forms, typography & spacing patterns | Copying a specific brand's design 1:1                                              |
| **MotionSites** (`motionsites`) | Hero-section prompts, animated backgrounds, scroll/motion patterns, cinematic landing compositions                                          | Replacing the three.js sand system (§6) — use it for layout/motion ideas around it |
| **21st.dev Magic** (`magic`)    | Fetching / generating React + Tailwind components (cards, carousels, timelines, nav, buttons, tabs), component inspiration, logo search     | Anything that adds a second WebGL canvas or breaks §8 budgets                      |

### Setup (each developer runs once — keys are personal, never commit them)

Keys go in your shell profile or a git-ignored `.env.local`, **never in this file or any committed file**.

```bash
# 21st.dev Magic MCP
export TWENTYFIRST_API_KEY="<your 21st.dev key>"
claude mcp add magic --scope user --env API_KEY="$TWENTYFIRST_API_KEY" -- npx -y @21st-dev/magic@latest

# MotionSites MCP
claude mcp add motionsites --scope user --transport http https://xgdzyqfalbibzelpdpvr.supabase.co/functions/v1/mcp

# Refero MCP
export REFERO_TOKEN="<your refero token>"
claude mcp add --transport http refero https://api.refero.design/mcp --header "Authorization: Bearer $REFERO_TOKEN"
```

Restart Claude Code after adding, then check with `claude mcp list`.

### Workflow for every new section/component

1. **Reference (Refero):** search for 3–5 relevant references (e.g. "event detail bottom sheet mobile", "dark luxury landing hero", "conference schedule timeline mobile"). Note what pattern you're taking (layout, hierarchy, interaction) — not the visuals.
2. **Motion idea (MotionSites):** for hero/background/scroll sections, pull a matching motion prompt or pattern and adapt it to the sand/time theme.
3. **Component (21st.dev):** fetch the closest component. Prefer existing components over generated ones. Add a header comment with the source URL.
4. **Reskin:** replace all colours with §4 tokens, headings to Cinzel, body to the serif. Remove default purple/blue/neon gradients and generic glassmorphism that doesn't fit the brand.
5. **Budget check:** lazy-load if below the fold; disable heavy effects on mobile and in the static tier (§9); confirm no extra canvas, bundle still < 200 KB initial.
6. **Test on mobile width (390px) first**, then desktop.

### Section → component map (search these names on 21st.dev)

| Site section (§5/§6)               | 21st.dev component to start from                                         | Notes                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Mobile bottom nav                  | Tubelight Navbar / Floating Dock                                         | Safe-area padding; 4 items only                                                     |
| Hero tagline                       | Text Generate Effect / Flip Words ("Manage the Known / Shift / Unknown") | Text stays real HTML over the canvas                                                |
| Register CTA                       | Shimmer Button                                                           | Mustard gold, not rainbow                                                           |
| Three Worlds copy panels           | Sticky Scroll Reveal                                                     | Canvas does the visuals; panels only hold text. Max ~1.5 viewports pinned on mobile |
| Present vs Future                  | Compare / Image Comparison Slider                                        | Uses hourglass deck art (present city ↔ future city)                                |
| Journey of the Strategist (mobile) | Timeline / Tracing Beam                                                  | Gold beam fills on scroll; 10 waypoints from events.json                            |
| Event list (management)            | Apple Cards Carousel / Expandable Card                                   | Tap → full event sheet; data from events.json                                       |
| Non-management events              | Bento Grid or scroll-snap card row                                       |                                                                                     |
| Event detail sheet                 | shadcn Drawer (vaul)                                                     | Focus trap, Esc/back closes                                                         |
| Schedule day tabs                  | Animated Tabs                                                            | "LIVE NOW" badge pulse                                                              |
| Countdown (low tier)               | Number Ticker / flip digits                                              | Particle digits only on high tier                                                   |
| Sponsors                           | Infinite Moving Cards / Marquee                                          | Pause on hover; reduced-motion = static grid                                        |
| "The Unknown" section bg           | Retro Grid / Background Beams                                            | Desktop only; one animated background per viewport                                  |
| Finale "CREATE ONE."               | Lamp section                                                             | Gold light, not cyan                                                                |
| Ambient dust (static tier)         | Sparkles / Particles (lightweight)                                       | Never alongside the three.js canvas in the same viewport                            |

### Rules for third-party components

- **One animated background per viewport.** Never stack Sparkles + Beams + Grid.
- **Mobile-off list:** Splash Cursor, Vortex, Wavy Background, any WebGL/shader background, cursor trails. Desktop only or not at all.
- Every motion component must respect `prefers-reduced-motion` (use `useReducedMotion()` from `motion`).
- Strip unused variants/props; don't ship demo code.
- Check component licences (most 21st.dev / Aceternity / Magic UI are MIT) and keep attribution comments.
- If a fetched component conflicts with this file, **this file wins.**
