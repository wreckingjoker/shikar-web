import { useEffect, useState } from 'react';
import { FEST_START_ISO, FEST_DATES_CONFIRMED } from '@/config/site';
import { GoldDivider } from '@/components/ui/divider';

function getRemaining(targetIso: string) {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hrs: Math.floor((sec % 86400) / 3600),
    min: Math.floor((sec % 3600) / 60),
    sec: sec % 60,
    done: diff <= 0,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/** Mono digit boxes per Design.md §Components "Countdown". Switches off once the fest date is live. */
export function Countdown() {
  const [remaining, setRemaining] = useState(() => getRemaining(FEST_START_ISO));

  useEffect(() => {
    if (!FEST_DATES_CONFIRMED) return;
    const id = window.setInterval(() => setRemaining(getRemaining(FEST_START_ISO)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: 'Days', value: remaining.days },
    { label: 'Hrs', value: remaining.hrs },
    { label: 'Min', value: remaining.min },
    { label: 'Sec', value: remaining.sec },
  ];

  return (
    <section className="bg-charcoal px-4 py-9 text-center md:py-10">
      <p className="font-display text-sm tracking-[0.3em] text-accent">THE FEST BEGINS</p>
      <GoldDivider className="mt-5" />

      {FEST_DATES_CONFIRMED ? (
        <div
          role="timer"
          aria-live="polite"
          aria-label={`${remaining.days} days, ${remaining.hrs} hours, ${remaining.min} minutes, ${remaining.sec} seconds remaining`}
          className="mx-auto mt-7 flex max-w-sm justify-center gap-3"
        >
          {units.map((u) => (
            <div
              key={u.label}
              className="flex min-w-[64px] flex-col items-center rounded-sm border border-border bg-surface py-3"
            >
              <span className="font-mono text-2xl text-primary">{pad(u.value)}</span>
              <span className="mt-1 text-xs uppercase tracking-[0.15em] text-secondary">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-auto mt-7 max-w-sm text-lg text-secondary">
          Dates to be announced. The strategist's calendar is still being written.
        </p>
      )}
    </section>
  );
}
