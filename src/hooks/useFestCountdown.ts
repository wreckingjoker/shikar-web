import { useEffect, useState } from 'react';
import { FEST_START_ISO, FEST_END_ISO, FEST_DATES_CONFIRMED } from '@/config/site';

export type FestPhase = 'before' | 'live' | 'after';
export type Urgency = 'open' | 'closing';

function getPhase(now: number): FestPhase {
  if (now < new Date(FEST_START_ISO).getTime()) return 'before';
  if (now <= new Date(FEST_END_ISO).getTime()) return 'live';
  return 'after';
}

function getRemaining(targetIso: string, now: number) {
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const sec = Math.floor(diff / 1000);
  return {
    days: Math.floor(sec / 86400),
    hrs: Math.floor((sec % 86400) / 3600),
    min: Math.floor((sec % 3600) / 60),
    sec: sec % 60,
  };
}

/**
 * Single source of truth for the fest countdown's ticking state — shared by the full
 * Countdown section and the compact Hero widget so they can never show different numbers
 * or drift out of sync. Ticks only while the tab is visible (Claude.md §8 "pause the
 * render loop when off-screen / tab hidden" — same principle, applied to a timer).
 */
export function useFestCountdown() {
  const [now, setNow] = useState(() => Date.now());
  const [phase, setPhase] = useState<FestPhase>(() => getPhase(Date.now()));

  useEffect(() => {
    if (!FEST_DATES_CONFIRMED) return;

    const tick = () => {
      const t = Date.now();
      setNow(t);
      setPhase(getPhase(t));
    };

    let id: number | null = null;
    const start = () => {
      if (id === null) id = window.setInterval(tick, 1000);
    };
    const stop = () => {
      if (id !== null) {
        window.clearInterval(id);
        id = null;
      }
    };

    tick();
    if (document.visibilityState === 'visible') start();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        tick();
        start();
      } else {
        stop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const remaining = getRemaining(FEST_START_ISO, now);
  // ≤5 days to go: registration window is closing — green ("there's time") flips to red.
  const urgency: Urgency = remaining.days <= 5 ? 'closing' : 'open';

  return { phase, remaining, urgency, datesConfirmed: FEST_DATES_CONFIRMED };
}
