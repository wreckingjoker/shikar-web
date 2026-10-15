import type { Coordinator } from '@/types/event';
import { formatPhone } from '@/lib/event-format';

/** Coordinator row: name plus a tap-to-call number (≥44px tap target) when one is set. */
export function CoordinatorItem({ coordinator }: { coordinator: Coordinator }) {
  const phone = formatPhone(coordinator.whatsapp);
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-3">
      <span>{coordinator.name}</span>
      {phone && (
        <a
          href={`tel:${phone.tel}`}
          className="inline-flex min-h-[44px] items-center text-accent underline-offset-4 hover:underline"
        >
          {phone.display}
        </a>
      )}
    </li>
  );
}
