import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { GoldDivider } from '@/components/ui/divider';

interface World {
  id: 'known' | 'shift' | 'unknown';
  number: string;
  title: string;
  copy: string;
  /** public/img/worlds/<img>.{avif,webp} — supplied art, filename base only */
  img: string;
}

const WORLDS: World[] = [
  {
    id: 'known',
    number: 'I',
    title: 'The Known',
    copy: 'Management of the present. A city of lit windows, every decision already mapped. The present is only the beginning.',
    // Source file was named "the shift.png" but shows the lit skyline — matches
    // Design.md's brief for Known (silver/charcoal, particle city skyline), not Shift.
    img: 'shift',
  },
  {
    id: 'shift',
    number: 'II',
    title: 'The Shift',
    copy: 'Management in transition. The dunes move, the map stops helping. From managing what exists to creating what comes next.',
    // Source file was named "the known.png" but shows the dune/sandstorm ruins — matches
    // Design.md's brief for Shift (bronze/mustard, dunes + sandstorm), not Known.
    img: 'known',
  },
  {
    id: 'unknown',
    number: 'III',
    title: 'The Unknown',
    copy: 'Management of the future. No ground, no playbook, only the strategist’s judgement. The future does not have a playbook. Create one.',
    img: 'unknown',
  },
];

/**
 * Three Worlds — static/CSS tier, now with the supplied art as each world's full-bleed
 * background. The real spec (Claude.md §6.3) is one three.js Points object morphing
 * between hourglass/known/shift/unknown shapes on a scroll-driven uMorph uniform; until
 * that lands, each world is its own full-height panel — fully usable, no WebGL dependency.
 */
export function WorldsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="The Journey of the Strategist — three worlds">
      {WORLDS.map((world) => (
        <div
          key={world.id}
          data-world={world.id}
          className="relative flex min-h-[90dvh] flex-col items-center justify-center overflow-hidden bg-ink px-4 py-10 text-center"
        >
          <picture aria-hidden="true" className="absolute inset-0">
            <source srcSet={`/img/worlds/${world.img}.avif`} type="image/avif" />
            <source srcSet={`/img/worlds/${world.img}.webp`} type="image/webp" />
            <img
              src={`/img/worlds/${world.img}.webp`}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </picture>
          {/* Keeps headline/body text at 4.5:1 regardless of frame brightness */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink"
          />
          {world.id === 'shift' && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(167,115,66,0.2),transparent_65%)]"
            />
          )}
          {world.id === 'unknown' && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(196,204,214,0.12),transparent_60%)]"
            />
          )}

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative z-10 max-w-xl"
          >
            <p className="font-display text-sm tracking-[0.3em] text-accent [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
              {world.number} · {world.title.toUpperCase()}
            </p>
            <h2
              className={cn(
                'mt-4 text-3xl [text-shadow:0_4px_20px_rgba(0,0,0,0.7)] md:text-3xl-d',
                world.id === 'unknown' ? 'text-silver' : 'text-primary',
              )}
            >
              {world.title}
            </h2>
            <GoldDivider className="mt-5" />
            <p
              className={cn(
                'mt-5 text-lg [text-shadow:0_2px_12px_rgba(0,0,0,0.7)] md:text-lg-d',
                world.id === 'unknown' ? 'text-silver/85' : 'text-secondary',
              )}
            >
              {world.copy}
            </p>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
