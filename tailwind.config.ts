import type { Config } from 'tailwindcss';

/**
 * Plain `var(--x)` colours make Tailwind silently drop opacity modifiers (`bg-ink/55` is
 * never generated). color-mix with <alpha-value> keeps the CSS-variable tokens and makes
 * `/NN` work; with no modifier <alpha-value> is 1, i.e. the exact token colour.
 */
const token = (name: string) =>
  `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        ink: token('--color-ink'),
        charcoal: token('--color-charcoal'),
        sand: token('--color-sand'),
        mustard: token('--color-mustard'),
        bronze: token('--color-bronze'),
        'deep-blue': token('--color-deep-blue'),
        silver: token('--color-silver'),
        'logo-red': token('--color-logo-red'),
        bg: token('--color-bg'),
        surface: token('--color-surface'),
        'surface-raised': token('--color-surface-raised'),
        border: token('--color-border'),
        success: token('--color-success'),
        error: token('--color-error'),
      },
      textColor: {
        primary: token('--color-text-primary'),
        secondary: token('--color-text-secondary'),
        'on-accent': token('--color-text-on-accent'),
      },
      fontFamily: {
        display: ['Cinzel', 'Trajan Pro', 'Georgia', 'serif'],
        body: ['Spectral', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '1.6' }],
        sm: ['14px', { lineHeight: '1.6' }],
        base: ['16px', { lineHeight: '1.6' }],
        lg: ['18px', { lineHeight: '1.6' }],
        'lg-d': ['20px', { lineHeight: '1.6' }],
        xl: ['24px', { lineHeight: '1.1' }],
        'xl-d': ['32px', { lineHeight: '1.1' }],
        '2xl': ['32px', { lineHeight: '1.1' }],
        '2xl-d': ['48px', { lineHeight: '1.1' }],
        '3xl': ['44px', { lineHeight: '1.1' }],
        '3xl-d': ['72px', { lineHeight: '1.1' }],
        '4xl': ['56px', { lineHeight: '0.95' }],
        '4xl-d': ['128px', { lineHeight: '0.95' }],
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '24px',
        6: '32px',
        7: '48px',
        8: '64px',
        9: '96px',
        10: '128px',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '8px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 1px 0 0 var(--color-border)',
        md: '0 12px 32px -16px rgba(0,0,0,0.7)',
        lg: '0 -16px 48px -12px rgba(0,0,0,0.8)',
        glow: '0 0 24px -4px rgba(181,154,68,0.55)',
      },
      transitionTimingFunction: {
        sand: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        storm: 'cubic-bezier(0.7, 0, 0.3, 1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '250ms',
        slow: '450ms',
        scene: '1000ms',
      },
    },
  },
  plugins: [],
} satisfies Config;
