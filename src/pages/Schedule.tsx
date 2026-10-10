import scheduleData from '@/data/schedule.json';
import type { Schedule } from '@/types/event';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GoldDivider } from '@/components/ui/divider';

const schedule = scheduleData as Schedule;

export default function SchedulePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 md:px-8">
      <p className="font-display text-sm tracking-[0.3em] text-accent">DAY BY DAY</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">Schedule</h1>
      <GoldDivider className="mt-5" />

      {!schedule.confirmed || schedule.days.length === 0 ? (
        <p className="mt-8 text-center text-secondary">
          The day-wise schedule is still being written. Check back closer to the fest — this
          page switches to "LIVE NOW" automatically once it starts.
        </p>
      ) : (
        <Tabs defaultValue={schedule.days[0].date} className="mt-8">
          <TabsList>
            {schedule.days.map((day) => (
              <TabsTrigger key={day.date} value={day.date}>
                {day.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {schedule.days.map((day) => (
            <TabsContent key={day.date} value={day.date}>
              <ul className="divide-y divide-border">
                {day.slots.map((slot) => (
                  <li key={`${day.date}-${slot.time}`} className="flex items-center gap-4 py-3">
                    <span className="w-16 shrink-0 font-mono text-sm text-secondary">
                      {slot.time}
                    </span>
                    <div className="flex-1">
                      <p className="text-primary">{slot.eventName}</p>
                      {slot.venue && <p className="text-sm text-secondary">{slot.venue}</p>}
                    </div>
                    {slot.status === 'live' && (
                      <span className="animate-[pulse_1.6s_ease-in-out_infinite] rounded-pill bg-logo-red px-2 py-1 text-xs uppercase tracking-[0.1em] text-primary">
                        Live now
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}
