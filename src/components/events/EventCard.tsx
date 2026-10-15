import type { FestEvent } from '@/types/event';
import { EventArt } from './EventArt';
import { ChipLabel } from '@/components/ui/chip';
import { formatTeamSize } from '@/lib/event-format';

/**
 * Event banner card (Design.md §Components). Tall 3:4 image, sigil, Cinzel name, type,
 * chips row. A single <button> trigger — the Drawer wraps this (see EventsGrid /
 * JourneyTrail callers) so there's no nested-interactive-element violation.
 */
export function EventCard({ event }: { event: FestEvent }) {
  return (
    <div className="flex min-h-[44px] flex-col overflow-hidden rounded-sm border border-border bg-surface text-left transition-transform duration-base ease-sand hover:-translate-y-1">
      <EventArt event={event} className="aspect-[3/4] w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-display text-base uppercase tracking-[0.08em] text-primary">
          {event.name}
        </p>
        <p className="text-sm text-secondary">{event.type}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {event.journeyWord && <ChipLabel>{event.journeyWord}</ChipLabel>}
          <ChipLabel>{formatTeamSize(event)}</ChipLabel>
        </div>
      </div>
    </div>
  );
}
