import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Primary / secondary buttons per Design.md §Components.
 * Cinzel caps label, radius-sm, mustard accent — glow is opt-in (hero/CTA only),
 * never applied by default so it stays "one glow per viewport".
 *
 * `asChild` renders the style onto a single child element (e.g. a router <Link>)
 * instead of wrapping it in a real <button> — Design.md explicitly bans nesting
 * interactive elements (a link inside a button).
 */
const buttonVariants = cva(
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-sm px-5 font-display text-xs uppercase tracking-[0.2em] transition-all duration-base ease-sand disabled:pointer-events-none disabled:opacity-40',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-on-accent hover:-translate-y-px active:translate-y-0',
        secondary:
          'border border-accent text-primary hover:bg-accent/10 active:bg-accent/15',
        ghost: 'text-secondary hover:text-primary',
      },
      glow: {
        true: 'shadow-glow btn-shimmer',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      glow: false,
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp ref={ref} className={cn(buttonVariants({ variant, glow }), className)} {...props} />
    );
  },
);
Button.displayName = 'Button';
