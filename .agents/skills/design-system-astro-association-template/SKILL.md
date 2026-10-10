---
name: design-system-astro-association-template
description: >
  Apply the Astro Association Template design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for blog interfaces.
---

# Astro Association Template — Design System Skill

> Full source extraction (same tokens, plus the original Do's/Don'ts and authoring workflow framing) lives in [`DESIGN.md`](./DESIGN.md) in this skill's folder — read it if you need the original report format or provenance.

## When to Use

- Building new UI components for Astro Association Template.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for blog pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Astro Association Template — https://21stdev-my-components-one.vercel.app/?dark#astro-association-template
- **Surface:** blog
- **Audience:** General readers
- **Character:** Content-first editorial layout with a balanced color system and 3 typefaces.

## Tokens

### Colors

| Token | Value | Role |
|-------|-------|------|
| color-2 | `#8A90BD` | Text Secondary |
| color-1 | `#060821` | Background Dark |
| color-3 | `#C8CDF2` | Text Light |
| color-4 | `#F2F4FF` | Text Light |
| color-5 | `#FFFFFF` | Text Light |

### Typography

**Font stack:** Poppins, JetBrains Mono, -apple-system

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 10px | Captions, metadata |
| text-sm | 12px | Labels, secondary text |
| text-base | 15px | Body text (default) |
| text-lg | 17px | Subheadings, emphasis |
| text-xl | 40px | Section headings |
| text-2xl | 58px | Section headings |
| text-3xl | 60px | Section headings |
| text-4xl | 150px | Section headings |

**Weight scale:** 400 · 700 · 800
**Line heights:** 22.5px · 25.5px · 16.5px · 54px · 120px · 25.6px · 52.2px · 15px · 60px · 12px · 13px · 19.5px · 24px · 15.75px

### Spacing

**Base unit:** 4px

`space-1: 2px` · `space-2: 3px` · `space-3: 4px` · `space-4: 5px` · `space-5: 7px` · `space-6: 8px` · `space-7: 9px` · `space-8: 10px` · `space-9: 11px` · `space-10: 12px` · `space-11: 13px` · `space-12: 14px` · `space-13: 15px` · `space-14: 16px` · `space-15: 20px` · `space-16: 22px` · `space-17: 24px` · `space-18: 25px` · `space-19: 30px` · `space-20: 36px` · `space-21: 44px` · `space-22: 48px` · `space-23: 64px` · `space-24: 128px` · `space-25: 216px`

### Shapes

**Border radius:** `radius-sm: 99px` · `radius-md: 999px`

### Elevation

- **shadow-sm:** `rgb(6, 8, 33) 0px 0px 0px 2px, rgb(242, 244, 255) 0px 0px 0px 3.5px`
- **shadow-md:** `color(srgb 0.940863 0.604392 0.48) 0px 0px 0px 2px inset`
- **shadow-lg:** `color(srgb 0.940863 0.604392 0.48) 0px 10px 24px -14px`
- **shadow-xl:** `rgba(5, 10, 60, 0.6) 0px 18px 40px -26px`

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-base:** `color 0.2s, border-color 0.2s, transform 0.3s`
- **duration-base:** `background-color 0.2s, color 0.2s, box-shadow 0.25s, transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **duration-base:** `color 0.2s`
- **duration-base:** `transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **duration-slow:** `background-color 0.45s, border-color 0.45s`
- **duration-slow:** `background-color 0.45s, color 0.45s, border-color 0.45s`
- **duration-slow:** `transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **duration-slow:** `transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s`
- **duration-slow:** `transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **duration-slow:** `transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)`
- **duration-slow:** `opacity 0.9s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1)`
- **duration-slow:** `1.6s ease-in-out infinite aa-blink`
- **duration-slow:** `55s linear infinite reverse aa-marq`
- **duration-slow:** `60s linear infinite aa-spin`
- **duration-slow:** `75s linear infinite aa-marq`
- **duration-slow:** `90s linear infinite reverse aa-spin`

## Component Inventory

- **Buttons:** 39 detected
- **Links:** 10 detected
- **Inputs:** 3 detected
- **Navigation:** 2 elements
- **Lists:** 4 detected
- **Forms:** 1 detected
- **Images:** 119 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (99px, 999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
