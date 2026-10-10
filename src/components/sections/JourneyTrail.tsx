/**
 * "Journey of the Strategist" — DNA helix carousel.
 * Motion adapted from "DNA Carousel" by Karim Saif (Framer:
 * https://framer.com/m/DNA-Carousel-EQly5C.js@WI1U7A2mXxPVTGO0LN04) — re-implemented, not copied:
 * linear 1→10 journey (no wrap), horizontal-only drag so vertical touch scroll stays native
 * (Claude.md §9: no scroll-jacking, no wheel capture), RAF runs only while moving, and the
 * blur / RGB-split filters are desktop-only and reskinned to bronze/silver (§4).
 * Cards are decorative (aria-hidden); the real, focusable content is the info panel below.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import events from '@/data/events.json';
import type { FestEvent } from '@/types/event';
import { GoldDivider } from '@/components/ui/divider';
import { EventArt } from '@/components/events/EventArt';
import { cn } from '@/lib/utils';

const waypoints = (events as FestEvent[])
  .filter((e) => e.category === 'management' && e.journeyOrder !== null)
  .sort((a, b) => (a.journeyOrder ?? 0) - (b.journeyOrder ?? 0));

const COUNT = waypoints.length;
const MAX = COUNT - 1;

interface HelixConfig {
  cardW: number;
  cardH: number;
  gap: number;
  curveH: number;
  spread: number;
  depth: number;
  perspective: number;
  rotation: number;
  tilt: number;
  inactiveScale: number;
  inactiveOpacity: number;
  /** blur + RGB split + drop shadows — GPU-heavy, desktop only */
  filters: boolean;
}

const MOBILE: HelixConfig = {
  cardW: 196,
  cardH: 264,
  gap: 22,
  curveH: 30,
  spread: 56,
  depth: 130,
  perspective: 1000,
  rotation: 28,
  tilt: 8,
  inactiveScale: 0.78,
  inactiveOpacity: 0.4,
  filters: false,
};

const DESKTOP: HelixConfig = {
  cardW: 236,
  cardH: 316,
  gap: 28,
  curveH: 50,
  spread: 88,
  depth: 170,
  perspective: 1100,
  rotation: 32,
  tilt: 10,
  inactiveScale: 0.78,
  inactiveOpacity: 0.42,
  filters: true,
};

const INERTIA = 0.93;
const SNAP = 0.18;
const DRAG_SENSITIVITY = 1.2;
const DRAG_THRESHOLD = 6;
const PHASE_PER_CARD = Math.PI * 0.48;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const easeOutCubic = (v: number) => 1 - Math.pow(1 - clamp(v, 0, 1), 3);
const pad = (n: number) => n.toString().padStart(2, '0');

/** Horizontal spacing between neighbouring cards on screen. */
const unitOf = (c: HelixConfig) => (c.cardW + c.gap) * 0.72;

/** y of strand `s` (+1 / -1) at screen-x `x` — the same curve the cards ride. */
function strandY(c: HelixConfig, x: number, s: 1 | -1) {
  const phase = (x / unitOf(c)) * PHASE_PER_CARD;
  return s * (Math.sin(phase) * c.curveH + c.spread * Math.cos(phase * 0.5) * 0.5);
}

function strandPath(c: HelixConfig, s: 1 | -1) {
  const half = unitOf(c) * 4.5;
  let d = '';
  for (let x = -half; x <= half; x += 6) {
    d += `${d ? 'L' : 'M'}${x.toFixed(1)} ${strandY(c, x, s).toFixed(1)}`;
  }
  return d;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

export function JourneyTrail() {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const cfg = isDesktop ? DESKTOP : MOBILE;
  const navigate = useNavigate();

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const cfgRef = useRef(cfg);
  cfgRef.current = cfg;

  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rungsRef = useRef<(SVGLineElement | null)[]>([]);
  const posRef = useRef(0);
  const velRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragRef = useRef<{
    id: number;
    startX: number;
    startPos: number;
    lastX: number;
    lastT: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const render = useCallback(() => {
    const c = cfgRef.current;
    const p = posRef.current;
    const unit = unitOf(c);

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const d = i - p;
      const ad = Math.abs(d);
      if (ad > 3.6) {
        card.style.visibility = 'hidden';
        return;
      }
      card.style.visibility = 'visible';

      const phase = d * PHASE_PER_CARD;
      const wave = Math.sin(phase);
      const depthWave = Math.cos(phase);
      const strand = i % 2 === 0 ? 1 : -1;
      const x = d * unit;
      const y = strandY(c, x, strand);
      const z = depthWave * c.depth;
      const rotateY = depthWave * c.rotation * strand;
      const rotateZ = wave * c.tilt * strand;
      const rotateX = wave * c.tilt * 0.35;
      const smoothActive = easeOutCubic(1 - ad);
      const scale = c.inactiveScale + (1 - c.inactiveScale) * smoothActive;
      const zScale = 0.88 + clamp((z + c.depth) / (c.depth * 2), 0, 1) * 0.12;

      card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale * zScale})`;
      card.style.opacity = String(c.inactiveOpacity + (1 - c.inactiveOpacity) * smoothActive);
      card.style.zIndex = String(Math.round(100 - ad * 10 + depthWave * 4));

      if (c.filters) {
        const far = clamp(ad / 3, 0, 1) * (1 - smoothActive);
        const blur = 4 * far;
        const chroma = 4 * far;
        card.style.filter = [
          `blur(${blur.toFixed(2)}px)`,
          chroma > 0.05
            ? `drop-shadow(${-chroma}px 0 0 rgba(167,115,66,0.45)) drop-shadow(${chroma}px 0 0 rgba(196,204,214,0.35))`
            : '',
          `drop-shadow(0 ${8 + smoothActive * 10}px ${18 + smoothActive * 15}px rgba(0,0,0,0.4))`,
        ].join(' ');
      } else {
        card.style.filter = '';
      }
    });

    rungsRef.current.forEach((rung, i) => {
      if (!rung) return;
      const d = i - p;
      const x = d * unit;
      rung.setAttribute('x1', x.toFixed(1));
      rung.setAttribute('x2', x.toFixed(1));
      rung.setAttribute('y1', strandY(c, x, 1).toFixed(1));
      rung.setAttribute('y2', strandY(c, x, -1).toFixed(1));
      rung.style.opacity = String(clamp(1 - Math.abs(d) / 4, 0, 1));
    });

    const idx = Math.round(clamp(p, 0, MAX));
    if (idx !== activeRef.current) {
      activeRef.current = idx;
      setActive(idx);
    }
  }, []);

  const tick = useCallback(
    (time: number) => {
      const dt = clamp((time - (lastTimeRef.current ?? time)) / 1000, 0, 0.05);
      lastTimeRef.current = time;

      if (!dragRef.current) {
        const out = posRef.current < 0 || posRef.current > MAX;
        if (targetRef.current === null && !out && Math.abs(velRef.current) > 1e-4) {
          posRef.current += velRef.current * dt;
          velRef.current *= Math.pow(INERTIA, dt * 60);
        }
        if (targetRef.current !== null || out || Math.abs(velRef.current) < 0.025) {
          velRef.current = 0;
          const target = targetRef.current ?? Math.round(clamp(posRef.current, 0, MAX));
          const diff = target - posRef.current;
          posRef.current += diff * (1 - Math.exp(-SNAP * 60 * dt));
          if (Math.abs(diff) < 5e-4) {
            posRef.current = target;
            targetRef.current = null;
            render();
            rafRef.current = null;
            lastTimeRef.current = null;
            return;
          }
        }
      }

      render();
      rafRef.current = requestAnimationFrame(tick);
    },
    [render],
  );

  const startLoop = useCallback(() => {
    if (rafRef.current !== null) return;
    lastTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const goTo = useCallback(
    (index: number) => {
      const target = clamp(index, 0, MAX);
      velRef.current = 0;
      if (reduceMotion) {
        posRef.current = target;
        targetRef.current = null;
        render();
        return;
      }
      targetRef.current = target;
      startLoop();
    },
    [reduceMotion, render, startLoop],
  );

  // Initial layout + re-layout when the breakpoint config changes.
  useEffect(() => {
    render();
  }, [render, cfg]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    targetRef.current = null;
    velRef.current = 0;
    suppressClickRef.current = false;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.moved = true;
      suppressClickRef.current = true;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* capture is best-effort */
      }
    }

    const c = cfgRef.current;
    const travel = c.cardW + c.gap;
    let next = drag.startPos - (dx / travel) * DRAG_SENSITIVITY;
    // Rubber-band past the first / last waypoint.
    if (next < 0) next *= 0.35;
    if (next > MAX) next = MAX + (next - MAX) * 0.35;
    posRef.current = next;

    const now = performance.now();
    const dtSec = Math.max(1, now - drag.lastT) / 1000;
    const instant = (-(e.clientX - drag.lastX) / travel / dtSec) * DRAG_SENSITIVITY;
    velRef.current = velRef.current * 0.72 + instant * 0.28;
    drag.lastX = e.clientX;
    drag.lastT = now;
    render();
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (!drag.moved) return;
    velRef.current = reduceMotion ? 0 : clamp(velRef.current, -2.5, 2.5);
    if (reduceMotion) {
      goTo(Math.round(posRef.current));
    } else {
      startLoop();
    }
  };

  const onCardClick = (i: number) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (i === activeRef.current) {
      navigate(`/events/${waypoints[i].slug}`);
    } else {
      goTo(i);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      goTo(activeRef.current + 1);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      goTo(activeRef.current - 1);
      e.preventDefault();
    }
  };

  const current = waypoints[active];
  const stageHeight = cfg.cardH + 2 * (cfg.curveH + cfg.spread / 2) + 48;

  return (
    <section data-world="shift" className="relative overflow-hidden bg-ink py-9 md:py-10">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(167,115,66,0.16),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-md px-4 text-center">
        <p className="font-display text-sm tracking-[0.3em] text-accent">THE JOURNEY</p>
        <h2 className="mt-4 text-2xl md:text-2xl-d">Of The Strategist</h2>
        <GoldDivider className="mt-5" />
      </div>

      {/* 3D helix stage — decorative; the info panel below carries the real content. */}
      <div
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative mt-7 cursor-grab select-none active:cursor-grabbing"
        style={{
          height: stageHeight,
          perspective: `${cfg.perspective}px`,
          touchAction: 'pan-y',
          contain: 'layout paint',
        }}
      >
        {/* Double-helix strands + rungs */}
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]">
          <svg
            className="absolute left-1/2 top-1/2 overflow-visible"
            width="1"
            height="1"
            fill="none"
          >
            <path d={strandPath(cfg, 1)} stroke="var(--color-mustard)" strokeOpacity="0.45" strokeWidth="1.25" />
            <path d={strandPath(cfg, -1)} stroke="var(--color-bronze)" strokeOpacity="0.45" strokeWidth="1.25" />
            {waypoints.map((e, i) => (
              <line
                key={e.slug}
                ref={(el) => {
                  rungsRef.current[i] = el;
                }}
                stroke={i === active ? 'var(--color-mustard)' : 'var(--color-sand)'}
                strokeOpacity={i === active ? 0.8 : 0.18}
                strokeWidth="1"
                strokeDasharray="2 4"
              />
            ))}
          </svg>
        </div>

        <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          {waypoints.map((event, i) => (
            <div
              key={event.slug}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onClick={() => onCardClick(i)}
              className={cn(
                'absolute left-1/2 top-1/2 overflow-hidden rounded-sm border bg-charcoal',
                i === active ? 'border-mustard shadow-glow' : 'border-border',
              )}
              style={{
                width: cfg.cardW,
                height: cfg.cardH,
                marginLeft: -cfg.cardW / 2,
                marginTop: -cfg.cardH / 2,
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
                opacity: 0,
              }}
            >
              <EventArt event={event} className="absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <span
                className={cn(
                  'absolute left-4 top-4 font-mono text-sm',
                  i <= active ? 'text-accent' : 'text-secondary',
                )}
              >
                {pad(i + 1)}
              </span>
              <div className="absolute inset-x-4 bottom-4 text-left">
                <p className="font-display text-xs uppercase tracking-[0.25em] text-accent">
                  {event.journeyWord}
                </p>
                <p className="mt-1 font-display text-lg uppercase leading-tight tracking-[0.08em] text-primary">
                  {event.name}
                </p>
                <p className="mt-1 text-xs text-secondary">{event.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible controls + active waypoint details */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Journey of the Strategist — management events"
        onKeyDown={onKeyDown}
        className="relative mx-auto mt-5 max-w-md px-4"
      >
        <div aria-hidden="true" className="flex gap-1">
          {waypoints.map((e, i) => (
            <span
              key={e.slug}
              className={cn(
                'h-[2px] flex-1 rounded-pill transition-colors duration-base ease-sand',
                i <= active ? 'bg-mustard' : 'bg-border',
              )}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous event"
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-pill border border-border text-primary transition-colors duration-base ease-sand hover:border-mustard hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-primary"
          >
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>

          <div aria-live="polite" className="min-w-0 flex-1 text-center">
            <p className="font-mono text-xs text-secondary">
              {pad(active + 1)} / {pad(COUNT)}
            </p>
            <p className="mt-1 text-base text-primary">{current.tagline}</p>
          </div>

          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === MAX}
            aria-label="Next event"
            className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-pill border border-border text-primary transition-colors duration-base ease-sand hover:border-mustard hover:text-accent disabled:opacity-30 disabled:hover:border-border disabled:hover:text-primary"
          >
            <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            to={`/events/${current.slug}`}
            className="inline-flex min-h-[44px] items-center gap-2 font-display text-sm uppercase tracking-[0.15em] text-accent transition-opacity duration-base ease-sand hover:opacity-80"
          >
            Open {current.name}
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </section>
  );
}
