import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { useFestCountdown } from '@/hooks/useFestCountdown';
import { CountdownDigits } from './CountdownDigits';
import { GoldDivider } from '@/components/ui/divider';
import { cn } from '@/lib/utils';

/**
 * Live countdown to SHIKHAR 2026 (20–21 Nov 2026) — digits in a gold frame, metallic
 * green→red urgency colouring (CountdownDigits; ticking state from useFestCountdown).
 * Interactive: during the fest window it swaps to a pulsing "LIVE NOW" badge and the whole
 * section links through to /schedule; afterwards it shows a thank-you state. Claude.md
 * §6.6: "Switches to LIVE NOW schedule + results on fest days."
 */
export function Countdown() {
  const reduceMotion = useReducedMotion() ?? false;
  const { phase, remaining, urgency, datesConfirmed } = useFestCountdown();

  return (
    <section className="bg-ink px-4 py-9 text-center md:py-10">
      <p className="font-display text-sm tracking-[0.3em] text-accent">
        {phase === 'live' ? 'HAPPENING NOW' : phase === 'after' ? 'THE FEST' : 'THE FEST BEGINS'}
      </p>
      <GoldDivider className="mt-5" />

      {!datesConfirmed ? (
        <p className="mx-auto mt-7 max-w-sm text-lg text-secondary">
          Dates to be announced. The strategist's calendar is still being written.
        </p>
      ) : phase === 'before' ? (
        <Link to="/schedule" className="mt-7 block" aria-label="View the schedule">
          <CountdownDigits remaining={remaining} urgency={urgency} reduceMotion={reduceMotion} className="max-w-sm" />
          <p
            className={cn(
              'mt-4 text-sm underline-offset-2 hover:underline',
              urgency === 'closing' ? 'text-error' : 'text-secondary',
            )}
          >
            {urgency === 'closing'
              ? `Only ${remaining.days} day${remaining.days === 1 ? '' : 's'} left to register · View schedule`
              : '20–21 November 2026 · View schedule'}
          </p>
        </Link>
      ) : phase === 'live' ? (
        <Link
          to="/schedule"
          className="mx-auto mt-7 flex max-w-sm flex-col items-center gap-3"
          aria-label="SHIKHAR 2026 is live — view the schedule"
        >
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-pill bg-live px-4 py-2 font-display text-sm uppercase tracking-[0.15em] text-primary',
              !reduceMotion && 'animate-[pulse_1.6s_ease-in-out_infinite]',
            )}
          >
            <span className="h-2 w-2 rounded-pill bg-primary" aria-hidden="true" />
            Live now
          </span>
          <p className="text-secondary underline-offset-2 hover:underline">
            The journey has begun — view the schedule
          </p>
        </Link>
      ) : (
        <p className="mx-auto mt-7 max-w-sm text-lg text-secondary">
          That's a wrap on SHIKHAR 2026. Thank you for being part of the journey.
        </p>
      )}
    </section>
  );
}
