import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroVideoBg } from './HeroVideoBg';
import { CountdownDigits } from './CountdownDigits';
import { useFestCountdown } from '@/hooks/useFestCountdown';

/**
 * Hero — static/CSS tier (Claude.md §9 fallback), now with the supplied Dune-desert video
 * as the atmosphere layer. "Sand you can touch" (pointer-reactive particle text) is the
 * three.js enhancement layered on top of this in the next pass; this tier must stand
 * completely on its own with the Register CTA always above the fold.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const { phase, remaining, urgency, datesConfirmed } = useFestCountdown();

  return (
    <section
      data-world="known"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 pb-[88px] pt-[104px] text-center"
    >
      <HeroVideoBg />

      <motion.p
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative font-display text-sm font-semibold uppercase tracking-[0.28em] text-primary [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.9)] md:text-base"
      >
        SCMS Business School, Kochi
      </motion.p>

      <motion.h1
        initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
        className="text-metallic-gold relative mt-5 text-4xl leading-[0.95] tracking-[0.02em] md:text-4xl-d"
      >
        Transcend
        <br />
        The Time
      </motion.h1>

      <motion.p
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.25 }}
        className="relative mx-auto mt-6 max-w-[42ch] text-lg font-semibold text-primary [text-shadow:0_1px_2px_rgba(0,0,0,0.95),0_2px_14px_rgba(0,0,0,0.9)] md:text-lg-d"
      >
        Can you manage what has never existed before?
      </motion.p>

      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
        className="relative mt-9 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Button asChild variant="primary" glow>
          <Link to="/register">Register now</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/events">Explore events</Link>
        </Button>
      </motion.div>

      {datesConfirmed && phase === 'before' && (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
          className="relative mt-8"
        >
          <CountdownDigits remaining={remaining} urgency={urgency} reduceMotion={reduceMotion ?? false} compact />
          {/* Fest date as a badge — the one fact nobody should scroll past */}
          <p className="mx-auto mt-4 inline-flex items-center gap-2 rounded-pill border border-mustard/70 bg-ink/70 px-4 py-2 shadow-glow backdrop-blur-sm">
            <CalendarDays aria-hidden="true" size={18} strokeWidth={1.75} className="shrink-0 text-accent" />
            <span className="text-metallic-gold font-display text-sm uppercase tracking-[0.18em] md:text-base">
              20–21 November 2026
            </span>
          </p>
        </motion.div>
      )}

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-secondary"
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="9" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
