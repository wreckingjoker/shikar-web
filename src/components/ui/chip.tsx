import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

/** Pill chip — filter toggles, team size / fee tags (Design.md §Components). */
export function Chip({ active, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        'inline-flex min-h-[44px] items-center rounded-pill border px-4 text-sm transition-colors duration-base ease-sand',
        active
          ? 'border-accent bg-accent text-on-accent'
          : 'border-border bg-surface text-secondary hover:text-primary',
        className,
      )}
      {...props}
    />
  );
}

/** Non-interactive variant for displaying facts (team size, fee, prize) inside the event sheet. */
export function ChipLabel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border border-border bg-surface px-3 py-1 text-xs text-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}
