/**
 * "Find the Summit" — venue section with an embedded Google map of SCMS and a directions
 * button. Performance (Claude.md §8): the map iframe is heavy third-party JS, so it only
 * mounts once the section nears the viewport, and under Data Saver it waits for a tap.
 * The map is tinted dark with a CSS filter so it sits in the ink/gold palette.
 */
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { GoldDivider } from '@/components/ui/divider';
import { FEST_VENUE, FEST_VENUE_MAP_QUERY } from '@/config/site';

type NetworkInformation = { saveData?: boolean };

const query = encodeURIComponent(FEST_VENUE_MAP_QUERY);
const EMBED_URL = `https://www.google.com/maps?q=${query}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [nearView, setNearView] = useState(false);
  const [userRequested, setUserRequested] = useState(false);
  const [saveData] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      !!(navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData,
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showMap = userRequested || (nearView && !saveData);

  return (
    <section
      ref={sectionRef}
      id="location"
      aria-labelledby="location-heading"
      className="relative bg-ink px-4 py-9 text-center md:py-10"
    >
      <p className="font-display text-sm tracking-[0.3em] text-accent">THE VENUE</p>
      <h2 id="location-heading" className="mt-4 text-2xl md:text-2xl-d">
        Find The Summit
      </h2>
      <GoldDivider className="mt-5" />

      <p className="mx-auto mt-5 inline-flex max-w-[42ch] items-start gap-2 text-secondary">
        <MapPin aria-hidden="true" size={18} strokeWidth={1.75} className="mt-[3px] shrink-0 text-accent" />
        {FEST_VENUE}
      </p>

      {/* Map in a gold frame */}
      <div className="relative mx-auto mt-7 max-w-3xl rounded-md border border-mustard/60 p-[6px] shadow-glow">
        <div className="relative h-[300px] overflow-hidden rounded-sm bg-charcoal md:h-[400px]">
          {showMap ? (
            <iframe
              title={`Map showing ${FEST_VENUE}`}
              src={EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)_contrast(0.95)]"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_50%_45%,rgba(181,154,68,0.18),transparent_65%)]">
              <MapPin aria-hidden="true" size={40} strokeWidth={1.5} className="text-accent" />
              <button
                type="button"
                onClick={() => setUserRequested(true)}
                className="inline-flex min-h-[44px] items-center rounded-sm border border-mustard/60 px-5 font-display text-xs uppercase tracking-[0.2em] text-accent transition-colors duration-base ease-sand hover:bg-mustard hover:text-on-accent"
              >
                Load map
              </button>
            </div>
          )}
        </div>
        {/* Gold "you are here" pin cue in the corner of the frame */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill border border-mustard bg-ink px-3 py-[2px] font-display text-[10px] uppercase tracking-[0.25em] text-accent"
        >
          Kochi · Kerala
        </span>
      </div>

      <a
        href={DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-shimmer mt-7 inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-accent px-6 font-display text-sm uppercase tracking-[0.2em] text-on-accent shadow-glow transition-transform duration-base ease-sand hover:-translate-y-px"
      >
        <Navigation aria-hidden="true" size={16} strokeWidth={2} />
        Get directions
      </a>
    </section>
  );
}
