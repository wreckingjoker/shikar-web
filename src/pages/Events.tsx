import { useMemo, useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import eventsData from '@/data/events.json';
import type { FestEvent } from '@/types/event';
import { EventCard } from '@/components/events/EventCard';
import { EventFilterChips, type EventFilter } from '@/components/events/EventFilterChips';
import { EventSheet } from '@/components/events/EventSheet';
import { EventDeck } from '@/components/events/EventDeck';

const events = eventsData as FestEvent[];
const management = events.filter((e) => e.category === 'management');
const nonManagement = events.filter((e) => e.category === 'non-management');

function EventTrigger({ event, onSelect }: { event: FestEvent; onSelect: (slug: string) => void }) {
  return (
    <button type="button" onClick={() => onSelect(event.slug)} className="text-left" aria-haspopup="dialog">
      <EventCard event={event} />
    </button>
  );
}

export default function Events() {
  const [filter, setFilter] = useState<EventFilter>('all');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = events.find((e) => e.slug === selectedSlug) ?? null;

  const showManagement = filter === 'all' || filter === 'management';
  const showNonManagement = filter === 'all' || filter === 'non-management';

  const managementGrid = useMemo(() => management, []);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:px-8">
      <p className="font-display text-sm tracking-[0.3em] text-accent">THE EVENTS</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">Choose your arena</h1>
      <p className="mt-3 max-w-[60ch] text-secondary">
        Ten management events trace the journey of the strategist. Six more test everything
        else — nerve, creativity, speed.
      </p>

      <div className="mt-6">
        <EventFilterChips value={filter} onChange={setFilter} />
      </div>

      {showManagement && (
        <section className="mt-9">
          <h2 className="font-display text-xs uppercase tracking-[0.2em] text-secondary">
            Management
          </h2>
          <p className="mt-3 inline-flex items-center gap-2 rounded-pill border border-mustard/40 bg-mustard/10 px-3 py-1 text-xs text-accent">
            <MousePointerClick aria-hidden="true" size={14} strokeWidth={1.75} />
            Tap any event card to open its details
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {managementGrid.map((event) => (
              <EventTrigger key={event.slug} event={event} onSelect={setSelectedSlug} />
            ))}
          </div>
        </section>
      )}

      {showNonManagement && (
        <section className="mt-10">
          <h2 className="font-display text-xs uppercase tracking-[0.2em] text-secondary">
            Non-management
          </h2>
          <div className="mt-4">
            <EventDeck events={nonManagement} onSelect={setSelectedSlug} />
          </div>
        </section>
      )}

      <EventSheet event={selected} onClose={() => setSelectedSlug(null)} />
    </div>
  );
}
