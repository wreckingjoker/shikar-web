import { useReducedMotion } from 'motion/react';
import sponsorsData from '@/data/sponsors.json';
import type { Sponsors } from '@/types/event';
import { GoldDivider } from '@/components/ui/divider';
import { cn } from '@/lib/utils';

const sponsors = sponsorsData as Sponsors;
const allSponsors = sponsors.tiers.flatMap((t) => t.sponsors);

/**
 * Sponsors — "Infinite Moving Cards / Marquee" per Claude.md §16 map. Hand-built CSS
 * marquee (duration-driven keyframe, pause on hover/focus) instead of the 21st.dev
 * install, reskinned to tokens; falls back to a static grid under reduced motion, and to
 * an honest empty state while no sponsors are confirmed (never fabricated logos).
 */
export function SponsorsMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-charcoal px-4 py-9 text-center md:py-10">
      <p className="font-display text-sm tracking-[0.3em] text-accent">PARTNERS</p>
      <GoldDivider className="mt-5" />

      {allSponsors.length === 0 ? (
        <p className="mx-auto mt-7 max-w-sm text-base text-secondary">
          Sponsors will be announced here.
        </p>
      ) : reduceMotion ? (
        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-6">
          {allSponsors.map((s) => (
            <img key={s.name} src={s.logo} alt={s.name} className="h-10 w-auto opacity-80" />
          ))}
        </div>
      ) : (
        <div
          className="group mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          <div
            className={cn(
              'flex w-max items-center gap-10 py-2',
              'animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
            )}
          >
            {[...allSponsors, ...allSponsors].map((s, i) => (
              <img
                key={`${s.name}-${i}`}
                src={s.logo}
                alt={i < allSponsors.length ? s.name : ''}
                aria-hidden={i >= allSponsors.length}
                className="h-10 w-auto shrink-0 opacity-80 grayscale transition-all duration-base ease-sand hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
