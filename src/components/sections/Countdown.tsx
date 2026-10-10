import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { FEST_START_ISO, FEST_END_ISO, FEST_DATES_CONFIRMED } from '@/config/site';
import { GoldDivider } from '@/components/ui/divider';
import { cn } from '@/lib/utils';

type Phase = 'before' | 'live' | 'after';

function getPhase(now: number): Phase {
  if (now < new Date(FEST_START_ISO).getTime()) return 'before';
  if (now <= new Date(FEST_END_ISO).getTime()) return 'live';
  return 'after';
}

function getRemaining(targetIso: string, now: number) {
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hrs: Math.floor((sec % 86400) / 3600),
    min: Math.floor((sec % 3600) / 60),
    sec: sec % 60,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/** One digit character that pops in fresh whenever its value changes — "flip" in spirit. */
function FlipChar({ char, reduceMotion }: { char: string; reduceMotion: boolean }) {
  if (reduceMotion) return <span>{char}</span>;
  return (
    <motion.span
      key={char}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className="inline-block"
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
}

function DigitTile({
  label,
  value,
  reduceMotion,
  urgency,
}: {
  label: string;
  value: number;
  reduceMotion: boolean;
  /** 'open' = plenty of time to register (green), 'closing' = ≤5 days left (red, pulses) */
  urgency: 'open' | 'closing';
}) {
  const chars = pad(value).split('');
  return (
    <div
      className={cn(
        'flex min-w-[64px] flex-col items-center rounded-sm border bg-ink py-3 transition-colors duration-slow ease-sand',
        urgency === 'closing'
          ? cn('border-error', !reduceMotion && 'animate-[pulse_1.6s_ease-in-out_infinite]')
          : 'border-success',
      )}
    >
      <span
        className={cn(
          'font-mono text-2xl tabular-nums',
          urgency === 'closing' ? 'text-error' : 'text-success',
        )}
      >
        {chars.map((c, i) => (
          <FlipChar key={i} char={c} reduceMotion={reduceMotion} />
        ))}
      </span>
      <span className="mt-1 text-xs uppercase tracking-[0.15em] text-secondary">{label}</span>
    </div>
  );
}

/**
 * Live countdown to SHIKHAR 2026 (20–21 Nov 2026). Mono digit boxes per Design.md
 * §Components, each digit sliding to its new value (reduced-motion: instant, no slide).
 * Ticks only while the tab is visible. Interactive: during the fest window it swaps to a
 * pulsing "LIVE NOW" badge and the whole section links through to /schedule; afterwards it
 * shows a thank-you state. Claude.md §6.6: "Switches to LIVE NOW schedule + results on fest days."
 * Urgency colour: green (color-success) while there's time, flips to red (color-error, and
 * pulses) inside the last 5 days — both existing Design.md feedback tokens, no new colours.
 */
export function Countdown() {
  const reduceMotion = useReducedMotion() ?? false;
  const [now, setNow] = useState(() => Date.now());
  const [phase, setPhase] = useState<Phase>(() => getPhase(Date.now()));

  useEffect(() => {
    if (!FEST_DATES_CONFIRMED) return;

    const tick = () => {
      const t = Date.now();
      setNow(t);
      setPhase(getPhase(t));
    };

    let id: number | null = null;
    const start = () => {
      if (id === null) id = window.setInterval(tick, 1000);
    };
    const stop = () => {
      if (id !== null) {
        window.clearInterval(id);
        id = null;
      }
    };

    tick();
    if (document.visibilityState === 'visible') start();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        tick();
        start();
      } else {
        stop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const remaining = getRemaining(FEST_START_ISO, now);
  // ≤5 days to go: registration window is closing — green ("there's time") flips to red.
  const urgency: 'open' | 'closing' = remaining.days <= 5 ? 'closing' : 'open';
  const units = [
    { label: 'Days', value: remaining.days },
    { label: 'Hrs', value: remaining.hrs },
    { label: 'Min', value: remaining.min },
    { label: 'Sec', value: remaining.sec },
  ];

  return (
    <section className="bg-ink px-4 py-9 text-center md:py-10">
      <p className="font-display text-sm tracking-[0.3em] text-accent">
        {phase === 'live' ? 'HAPPENING NOW' : phase === 'after' ? 'THE FEST' : 'THE FEST BEGINS'}
      </p>
      <GoldDivider className="mt-5" />

      {!FEST_DATES_CONFIRMED ? (
        <p className="mx-auto mt-7 max-w-sm text-lg text-secondary">
          Dates to be announced. The strategist's calendar is still being written.
        </p>
      ) : phase === 'before' ? (
        <Link to="/schedule" className="mt-7 block" aria-label="View the schedule">
          <div
            role="timer"
            aria-live="polite"
            aria-label={`${remaining.days} days, ${remaining.hrs} hours, ${remaining.min} minutes, ${remaining.sec} seconds until SHIKHAR 2026 begins`}
            className="mx-auto flex max-w-sm justify-center gap-3"
          >
            {units.map((u) => (
              <DigitTile
                key={u.label}
                label={u.label}
                value={u.value}
                reduceMotion={reduceMotion}
                urgency={urgency}
              />
            ))}
          </div>
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
