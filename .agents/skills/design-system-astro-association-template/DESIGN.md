# Astro Association Template

## Overview

**Product:** Astro Association Template
**URL:** https://21stdev-my-components-one.vercel.app/?dark#astro-association-template
**Surface type:** blog
**Audience:** General readers
**Brand character:** Content-first editorial layout with a balanced color system and 3 typefaces.

> **Note:** Surface detection confidence is low. Verify the inferred audience and brand context before relying on this file.

### Design Principles

- Readability above all — optimise for sustained reading, not scanning.
- Content is the interface — typography and whitespace do the heavy lifting.
- Minimal chrome — navigation and UI should fade behind the content.

## Colors

| Token | Value | Role |
|-------|-------|------|
| color-2 | `#8A90BD` | Text Secondary |
| color-1 | `#060821` | Background Dark |
| color-3 | `#C8CDF2` | Text Light |
| color-4 | `#F2F4FF` | Text Light |
| color-5 | `#FFFFFF` | Text Light |

## Typography

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

## Spacing

**Base unit:** 4px

`space-1: 2px` · `space-2: 3px` · `space-3: 4px` · `space-4: 5px` · `space-5: 7px` · `space-6: 8px` · `space-7: 9px` · `space-8: 10px` · `space-9: 11px` · `space-10: 12px` · `space-11: 13px` · `space-12: 14px` · `space-13: 15px` · `space-14: 16px` · `space-15: 20px` · `space-16: 22px` · `space-17: 24px` · `space-18: 25px` · `space-19: 30px` · `space-20: 36px` · `space-21: 44px` · `space-22: 48px` · `space-23: 64px` · `space-24: 128px` · `space-25: 216px`

## Shapes

**Border radius:** `radius-sm: 99px` · `radius-md: 999px`

## Elevation

- **shadow-sm:** `rgb(6, 8, 33) 0px 0px 0px 2px, rgb(242, 244, 255) 0px 0px 0px 3.5px`
- **shadow-md:** `color(srgb 0.940863 0.604392 0.48) 0px 0px 0px 2px inset`
- **shadow-lg:** `color(srgb 0.940863 0.604392 0.48) 0px 10px 24px -14px`
- **shadow-xl:** `rgba(5, 10, 60, 0.6) 0px 18px 40px -26px`

## Motion

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

## Components

- **Buttons:** 39 detected
- **Links:** 10 detected
- **Inputs:** 3 detected
- **Navigation:** 2 elements
- **Lists:** 4 detected
- **Forms:** 1 detected
- **Images:** 119 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (99px, 999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 39 detected
- **Links:** 10 detected
- **Inputs:** 3 detected
- **Navigation:** 2 elements
- **Lists:** 4 detected
- **Forms:** 1 detected
- **Images:** 119 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
