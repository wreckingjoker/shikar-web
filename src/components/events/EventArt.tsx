import { cn } from '@/lib/utils';
import type { FestEvent } from '@/types/event';

/**
 * Placeholder art: the deck's compressed event imagery (Claude.md §7 `image` field)
 * doesn't exist yet, so every card/sheet needs a graceful stand-in rather than a broken
 * <img>. Corner brackets are the Design.md §Shapes "signature ornament" for banner cards.
 */
export function EventArt({ event, className }: { event: FestEvent; className?: string }) {
  const bgClass = event.category === 'management' ? 'bg-gradient-to-br from-charcoal to-ink' : 'bg-gradient-to-br from-ink to-deep-blue';

  return (
    <div className={cn('relative flex items-center justify-center overflow-hidden', bgClass, className)}>
      <span
        aria-hidden="true"
        className="font-display text-5xl text-accent/30"
      >
        {event.name.replace(/^The\s+/i, '').charAt(0)}
      </span>
      {/* corner brackets */}
      <span aria-hidden="true" className="absolute left-2 top-2 h-3 w-3 border-l border-t border-accent/50" />
      <span aria-hidden="true" className="absolute right-2 top-2 h-3 w-3 border-r border-t border-accent/50" />
      <span aria-hidden="true" className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-accent/50" />
      <span aria-hidden="true" className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-accent/50" />
    </div>
  );
}
