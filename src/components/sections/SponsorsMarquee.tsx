import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import sponsorsData from '@/data/sponsors.json';
import type { Sponsors } from '@/types/event';
import { GoldDivider } from '@/components/ui/divider';
import { CONTACT_EMAIL } from '@/config/site';
import { cn } from '@/lib/utils';

const sponsors = sponsorsData as Sponsors;
const allSponsors = sponsors.tiers.flatMap((t) => t.sponsors);

/** px per second — constant speed regardless of how many logos are in the lane. */
const SPEED = 55;
/** A lane must be wider than the widest viewport, so short lists repeat (10 × ~250px). */
const MIN_TILES = 10;

type Item = { name: string; logo?: string; url?: string };

// Until sponsors are confirmed, the lane shows open "slots" instead of fabricated logos.
const PLACEHOLDER_SLOTS: Item[] = Array.from({ length: 6 }, () => ({
  name: 'Your Brand Here',
  url: `mailto:${CONTACT_EMAIL}`,
}));

/**
 * Sponsors — infinite logo marquee, adapted from Framer "InfiniteLogoMarquee"
 * (https://framer.com/m/InfiniteLogoMarquee-yYDqY0.js@4XlYAwtH5jegeWoIEhra).
 * Two identical lanes (each padded by one gap) slide -50% for a seamless loop; duration is
 * derived from measured lane width so speed is constant in px/s. Edge fade mask, pause on
 * hover/focus and while off-screen, logos grayscale at 55% opacity that reveal colour and
 * lift on hover. Reduced motion → static grid. Reskinned to §4 tokens.
 */
export function SponsorsMarquee() {
  const reduceMotion = useReducedMotion();
  const isEmpty = allSponsors.length === 0;
  const items: Item[] = isEmpty ? PLACEHOLDER_SLOTS : allSponsors;

  return (
    <section className="bg-ink px-4 py-9 text-center md:py-10">
      <p className="font-display text-sm tracking-[0.3em] text-accent">PARTNERS</p>
      <GoldDivider className="mt-5" />

      {reduceMotion ? (
        <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-6">
          {items.map((s, i) => (
            <LogoTile key={`${s.name}-${i}`} item={s} />
          ))}
        </div>
      ) : (
        <Marquee items={items} />
      )}

      {isEmpty && (
        <p className="mx-auto mt-6 max-w-sm text-base text-secondary">
          Sponsors will be announced here.{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent underline underline-offset-2"
          >
            Partner with us
          </a>
        </p>
      )}
    </section>
  );
}

function Marquee({ items }: { items: Item[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const laneRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(30);
  const [inView, setInView] = useState(false);
  const laneItems = Array.from(
    { length: Math.ceil(MIN_TILES / items.length) },
    () => items,
  ).flat();

  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;
    const ro = new ResizeObserver(() => {
      setDuration(Math.max(0.5, lane.offsetWidth / SPEED));
    });
    ro.observe(lane);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: '160px',
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="group mt-7 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div
        className={cn(
          'flex w-max',
          'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
        )}
        style={{
          // Longhands, not the `animation` shorthand: an inline shorthand would reset
          // play-state to running and override the hover/focus pause classes.
          animationName: 'marquee',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: inView ? undefined : 'paused',
          willChange: 'transform',
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            ref={copy === 0 ? laneRef : undefined}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14"
          >
            {laneItems.map((s, i) => (
              <LogoTile
                key={`${s.name}-${i}`}
                item={s}
                hidden={copy === 1 || i >= items.length}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoTile({ item, hidden = false }: { item: Item; hidden?: boolean }) {
  const content = item.logo ? (
    <img
      src={item.logo}
      alt={hidden ? '' : item.name}
      loading="lazy"
      draggable={false}
      className="h-full w-full object-contain"
    />
  ) : (
    <span className="rounded-sm border border-dashed border-accent/40 px-4 py-3 font-display text-xs uppercase tracking-[0.2em] text-sand">
      {item.name}
    </span>
  );

  const tileClass =
    'flex h-20 w-[150px] shrink-0 md:h-24 md:w-[190px] items-center justify-center p-1.5 opacity-55 grayscale transition-[opacity,transform,filter] duration-base ease-sand hover:scale-105 hover:opacity-100 hover:grayscale-0 focus-visible:scale-105 focus-visible:opacity-100 focus-visible:grayscale-0';

  if (!item.url)
    return (
      <div className={tileClass} aria-hidden={hidden || undefined}>
        {content}
      </div>
    );

  const external = item.url.startsWith('http');
  return (
    <a
      href={item.url}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      aria-label={hidden ? undefined : item.name}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(tileClass, 'min-h-11 rounded-sm')}
    >
      {content}
    </a>
  );
}
