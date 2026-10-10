import { Chip } from '@/components/ui/chip';
import type { EventCategory } from '@/types/event';

export type EventFilter = EventCategory | 'all';

const FILTERS: { value: EventFilter; label: string }[] = [
  { value: 'all', label: 'All events' },
  { value: 'management', label: 'Management' },
  { value: 'non-management', label: 'Non-management' },
];

export function EventFilterChips({
  value,
  onChange,
}: {
  value: EventFilter;
  onChange: (value: EventFilter) => void;
}) {
  return (
    <div role="group" aria-label="Filter events" className="flex flex-wrap gap-2">
      {FILTERS.map((f) => (
        <Chip key={f.value} active={value === f.value} onClick={() => onChange(f.value)}>
          {f.label}
        </Chip>
      ))}
    </div>
  );
}
