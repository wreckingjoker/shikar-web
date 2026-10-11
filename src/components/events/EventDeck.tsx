/**
 * Event deck — non-management events (Claude.md §6.5) as a draggable 3D coverflow.
 * Adapted from Framer "DragableCarousel"
 * (https://framer.com/m/DragableCarousel-ADAPEh.js@fXOJxTG2NAtXIGjIOPmn) — re-implemented,
 * not copied, "Default" preset: the active card sits centred and flat; neighbours tilt
 * (rotateY 45°/step), sink (translateZ −150px/step), shrink to 0.85 and fade to 0.45.
 * Drag follows the pointer 1:1, release projects velocity 120ms ahead and snaps to the
 * nearest card (0.6s ease-out). Arrows/dots wrap. Transforms are written straight to the
 * DOM per frame (no React re-render while dragging). `touch-action: pan-y` keeps vertical
 * page scroll native on phones (§9: no scroll-jacking). Reduced motion → instant snaps.
 * Tap a side card to bring it to the centre; tap the centre card for details.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, useReducedMotion, type AnimationPlaybackControls } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FestEvent } from '@/types/event';
import { EventArt } from './EventArt';
import { cn } from '@/lib/utils';

const GAP = 16;
const ROTATE = 45; // deg per step from centre
const DEPTH = 150; // px per step
const SIDE_SCALE = 0.85;
const SIDE_OPACITY = 0.45;
const SNAP_EASE = [0.165, 0.84, 0.44, 1] as const; // ≈ GSAP power3.out
const DRAG_THRESHOLD = 6;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

interface EventDeckProps {
  events: FestEvent[];
  onSelect: (slug: string) => void;
}

export function EventDeck({ events, onSelect }: EventDeckProps) {
  const reduceMotion = useReducedMotion();
  const n = events.length;
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(() => Math.floor((n - 1) / 2));
  const indexRef = useRef(index);
  const xRef = useRef(0);
  const animRef = useRef<AnimationPlaybackControls | null>(null);
  const dragRef = useRef<{
    startX: number;
    startTrack: number;
    lastX: number;
    lastT: number;
    v: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const cardW = width >= 768 ? 240 : clamp(Math.round(width * 0.58), 160, 240);
  const cardH = Math.round((cardW * 4) / 3);
  const step = cardW + GAP;
  const centerX = useCallback((i: number) => width / 2 - i * step - cardW / 2, [width, step, cardW]);

  const apply = useCallback(
    (tx: number) => {
      xRef.current = tx;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${tx}px,0,0)`;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const norm = (i * step + cardW / 2 + tx - width / 2) / step;
        const abs = Math.abs(norm);
        const rotate = clamp(norm * ROTATE, -70, 70);
        const scale = Math.max(SIDE_SCALE, 1 - abs * (1 - SIDE_SCALE));
        el.style.transform = `perspective(1000px) rotateY(${rotate}deg) translateZ(${-abs * DEPTH}px) scale(${scale})`;
        el.style.opacity = String(Math.max(SIDE_OPACITY, 1 - abs * (1 - SIDE_OPACITY)));
        el.style.zIndex = String(100 - Math.round(abs * 10));
      });
    },
    [width, step, cardW],
  );

  const goTo = useCallback(
    (target: number, wrap = false) => {
      const i = wrap ? ((target % n) + n) % n : clamp(target, 0, n - 1);
      indexRef.current = i;
      setIndex(i);
      animRef.current?.stop();
      if (reduceMotion) {
        apply(centerX(i));
        return;
      }
      animRef.current = animate(xRef.current, centerX(i), {
        duration: 0.6,
        ease: SNAP_EASE,
        onUpdate: apply,
      });
    },
    [n, reduceMotion, apply, centerX],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-centre on resize (and first measure) without animating.
  useLayoutEffect(() => {
    if (!width) return;
    animRef.current?.stop();
    apply(centerX(indexRef.current));
  }, [width, apply, centerX]);

  useEffect(() => () => animRef.current?.stop(), []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    animRef.current?.stop();
    dragRef.current = {
      startX: e.clientX,
      startTrack: xRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
    };

    const onMove = (ev: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const dx = ev.clientX - d.startX;
      if (Math.abs(dx) > DRAG_THRESHOLD) d.moved = true;
      const now = performance.now();
      const dt = now - d.lastT;
      if (dt > 0) d.v = ((ev.clientX - d.lastX) / dt) * 1000;
      d.lastX = ev.clientX;
      d.lastT = now;
      apply(d.startTrack + dx);
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      const d = dragRef.current;
      dragRef.current = null;
      if (!d) return;
      if (!d.moved) {
        // plain tap — let the card's click handler decide; just settle back if nudged
        if (xRef.current !== centerX(indexRef.current)) goTo(indexRef.current);
        return;
      }
      suppressClickRef.current = true;
      const projected = xRef.current + d.v * 0.12;
      goTo(Math.round((width / 2 - cardW / 2 - projected) / step));
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

  const onCardClick = (i: number, slug: string) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    if (i === indexRef.current) onSelect(slug);
    else goTo(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = clamp(indexRef.current + (e.key === 'ArrowRight' ? 1 : -1), 0, n - 1);
    goTo(next);
    cardRefs.current[next]?.focus({ preventScroll: true });
  };

  const arrowClass =
    'absolute top-1/2 z-[200] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-mustard/60 bg-charcoal/80 text-sand shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors duration-base ease-sand hover:border-mustard hover:text-mustard focus-visible:border-mustard';

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Non-management events">
      <div
        ref={rootRef}
        className={cn(
          'relative w-full cursor-grab select-none overflow-hidden active:cursor-grabbing',
          !width && 'opacity-0',
        )}
        style={{ height: cardH + 48, touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          ref={trackRef}
          className="absolute left-0 top-6 flex will-change-transform"
          style={{ gap: GAP }}
        >
          {events.map((event, i) => {
            const isActive = i === index;
            return (
              <button
                key={event.slug}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                tabIndex={isActive ? 0 : -1}
                aria-haspopup={isActive ? 'dialog' : undefined}
                aria-label={`${event.name} — ${event.type}${isActive ? '' : ' (bring to front)'}`}
                aria-current={isActive || undefined}
                onClick={() => onCardClick(i, event.slug)}
                className={cn(
                  'relative shrink-0 overflow-hidden rounded-md border bg-charcoal text-left shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-base ease-sand',
                  isActive ? 'border-mustard shadow-glow' : 'border-border',
                )}
                style={{ width: cardW, height: cardH }}
              >
                <EventArt event={event} className="pointer-events-none absolute inset-0" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-3 pb-3 pt-8"
                >
                  <p className="font-display text-sm uppercase leading-tight tracking-[0.08em] text-primary">
                    {event.name}
                  </p>
                  <p className="mt-1 text-xs text-secondary">{event.type}</p>
                  <p className="mt-1 text-xs italic text-accent">{event.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Previous event"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => goTo(index - 1, true)}
          className={cn(arrowClass, 'left-1 md:left-3')}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Next event"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => goTo(index + 1, true)}
          className={cn(arrowClass, 'right-1 md:right-3')}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="mt-1 flex justify-center">
        {events.map((event, i) => (
          <button
            key={event.slug}
            type="button"
            aria-label={`Go to ${event.name}`}
            aria-current={i === index || undefined}
            onClick={() => goTo(i)}
            className="flex h-11 w-6 items-center justify-center"
          >
            <span
              className={cn(
                'h-2 w-2 rounded-full bg-mustard transition-[opacity,transform] duration-base ease-sand',
                i === index ? 'scale-[1.4] opacity-100' : 'opacity-30',
              )}
            />
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-secondary">
        Drag or swipe to explore · tap the centre card for details
      </p>
    </div>
  );
}
