/**
 * Event deck spread — non-management events (Claude.md §6.5).
 * Motion adapted from "Card Deck Spread" (Framer:
 * https://framer.com/m/CardDeckSpread-i9eD.js@Gk6fOPV6EhlGClhOxXwt) — re-implemented, not
 * copied: on pointer devices the deck rests closed and opens on hover (touch: on first
 * view); the "lifted" card comes forward
 * while the rest blur (desktop) or dim (touch). Touch has no hover, so the first tap lifts
 * a card and the second opens it; keyboard focus lifts, Enter opens. The spread width is
 * measured, so the whole deck always fits with no horizontal scroll.
 */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import type { FestEvent } from '@/types/event';
import { EventArt } from './EventArt';
import { cn } from '@/lib/utils';

const EASE = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

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

interface EventDeckProps {
  events: FestEvent[];
  onSelect: (slug: string) => void;
}

export function EventDeck({ events, onSelect }: EventDeckProps) {
  const reduceMotion = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerTypeRef = useRef('mouse');
  const [width, setWidth] = useState(0);
  const [entered, setEntered] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Touch: fan out the first time the deck scrolls into view (no hover to open it).
  // Visibility is tracked continuously so auto-play only runs while the deck is on screen.
  useEffect(() => {
    if (reduceMotion) setEntered(true);
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduceMotion]);

  const n = events.length;
  const cardW = width > 0 && width < 480 ? 168 : 220;
  const cardH = Math.round((cardW * 4) / 3);
  const overlap = n > 1 ? clamp((width - cardW) / (n - 1), 28, cardW * 0.8) : 0;
  const totalW = cardW + (n - 1) * overlap;

  // Hover to open: on pointer devices the deck rests closed and fans open while hovered
  // (or while a card has keyboard focus); touch opens on first view instead.
  const open = canHover ? hovering : entered;
  const CLOSED_GAP = 12;
  const closedLeft = (totalW - (cardW + (n - 1) * CLOSED_GAP)) / 2;
  const mid = (n - 1) / 2;

  // Auto-play (touch only — the cards overlap too tightly to see on a phone): every few
  // seconds the next card slides out to the front, so every event gets seen. Pauses while
  // the user is interacting, off-screen, in a hidden tab, and never runs for reduced motion.
  const autoplay = !canHover && open && inView && !reduceMotion && n > 1;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (document.hidden || Date.now() < pausedUntilRef.current) return;
      setActive((prev) => (prev === null ? 0 : (prev + 1) % n));
    }, 2600);
    return () => window.clearInterval(id);
  }, [autoplay, n]);

  const onCardClick = (i: number, slug: string) => {
    pausedUntilRef.current = Date.now() + 6000;
    // Touch: first tap lifts the card, second tap opens it.
    if (pointerTypeRef.current === 'touch' && active !== i) {
      setActive(i);
      return;
    }
    onSelect(slug);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full pt-[20px]"
        style={{ height: cardH + 40 }}
        onKeyDownCapture={() => {
          pointerTypeRef.current = 'keyboard';
        }}
        onFocus={() => {
          if (pointerTypeRef.current !== 'touch') setHovering(true);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setHovering(false);
            setActive(null);
          }
        }}
      >
        <div
          className="relative mx-auto"
          style={{ width: totalW, height: cardH }}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') setHovering(true);
          }}
          onMouseLeave={() => {
            setHovering(false);
            setActive(null);
          }}
        >
          {events.map((event, i) => {
            const isActive = open && active === i;
            const dimmed = open && active !== null && !isActive;
            // Closed: a tight fanned deck (slight rotation + arc). Open: full spread.
            const left = open ? i * overlap : closedLeft + i * CLOSED_GAP;
            const top = open ? 0 : Math.abs(i - mid) * 3;
            const rotate = open ? 0 : (i - mid) * 3;
            // Open left→right, close right→left.
            const delay = open ? i * 0.06 : (n - 1 - i) * 0.03;

            return (
              <button
                key={event.slug}
                type="button"
                aria-haspopup="dialog"
                aria-label={`${event.name} — ${event.type}`}
                onPointerDown={(e) => {
                  pointerTypeRef.current = e.pointerType;
                }}
                // Touch fires focus + compat mouse events *before* click, which would lift
                // and open on the same tap — so only real mouse/keyboard lift here.
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setActive(i);
                }}
                onFocus={() => {
                  if (pointerTypeRef.current !== 'touch') setActive(i);
                }}
                onClick={() => onCardClick(i, event.slug)}
                className={cn(
                  'absolute overflow-hidden rounded-md border bg-charcoal text-left',
                  isActive ? 'border-mustard shadow-glow' : 'border-border',
                )}
                style={{
                  left,
                  top,
                  width: cardW,
                  height: cardH,
                  zIndex: n - i + (isActive ? 100 : 0),
                  transform: isActive
                    ? canHover
                      ? 'translateY(-12px) scale(1.06)'
                      : // touch: slide sideways toward the centre of the deck as it lifts
                        `translateX(${((totalW - cardW) / 2 - left) * 0.5}px) translateY(-12px) scale(1.04)`
                    : rotate
                      ? `rotate(${rotate}deg)`
                      : 'none',
                  transformOrigin: '50% 100%',
                  filter: dimmed && canHover ? 'blur(2px)' : 'none',
                  opacity: dimmed && !canHover ? 0.55 : 1,
                  boxShadow: isActive ? undefined : '0 4px 24px rgba(0,0,0,0.5)',
                  transition: reduceMotion
                    ? 'none'
                    : [
                        `left 0.7s ${EASE} ${delay}s`,
                        `top 0.7s ${EASE} ${delay}s`,
                        `transform ${isActive ? 0.3 : 0.4}s ${EASE}`,
                        `filter ${isActive ? 0.3 : 0.4}s ${EASE}`,
                        `opacity 0.3s ${EASE}`,
                      ].join(', '),
                }}
              >
                <EventArt
                  event={event}
                  className="absolute inset-0"
                  placeholderOverlay={
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
                      <p className="absolute inset-x-3 bottom-3 font-display text-sm uppercase leading-tight tracking-[0.08em] text-primary">
                        {event.name}
                      </p>
                    </>
                  }
                />
                {/* Details bar — revealed on the lifted card */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 bg-ink/85 px-3 pb-3 pt-2 backdrop-blur-sm transition-opacity duration-base ease-sand',
                    isActive ? 'opacity-100' : 'opacity-0',
                  )}
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
      </div>
      <p
        className={cn(
          'mt-3 text-center text-xs text-secondary transition-opacity duration-base ease-sand',
          canHover && open ? 'opacity-0' : 'opacity-100',
        )}
      >
        {canHover ? 'Hover to open the deck' : 'Tap a card to lift it · tap again for details'}
      </p>
    </div>
  );
}
