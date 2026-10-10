import { MessageCircle } from 'lucide-react';
import type { FestEvent } from '@/types/event';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChipLabel } from '@/components/ui/chip';
import { Button } from '@/components/ui/button';
import { EventArt } from './EventArt';
import { REGISTRATION_OPEN, REGISTRATION_URL } from '@/config/site';

interface EventSheetProps {
  event: FestEvent | null;
  onClose: () => void;
}

/**
 * Event detail bottom sheet (Design.md §Components). Image header, tagline, chips,
 * accordions, sticky Register + WhatsApp footer. Fee/prize/team-size/Register stay
 * visible without scrolling per Design.md "Do"s — they sit above the accordions.
 */
export function EventSheet({ event, onClose }: EventSheetProps) {
  return (
    <Drawer open={!!event} onOpenChange={(open) => !open && onClose()}>
      {event && (
        <DrawerContent aria-describedby={undefined}>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <EventArt event={event} className="h-40 w-full shrink-0" />

            <div className="px-5 pt-4">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-accent">
                {event.type}
              </p>
              <h2 className="mt-1 text-xl uppercase md:text-xl-d">{event.name}</h2>
              <p className="mt-2 text-base text-secondary">{event.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                <ChipLabel>{event.teamSize ? `Team of ${event.teamSize}` : 'Team size TBA'}</ChipLabel>
                <ChipLabel>{event.fee != null ? `₹${event.fee}` : 'Fee TBA'}</ChipLabel>
                <ChipLabel>{event.prize != null ? `₹${event.prize} prize` : 'Prize TBA'}</ChipLabel>
                <ChipLabel>
                  {event.day && event.time ? `${event.day} · ${event.time}` : 'Schedule TBA'}
                </ChipLabel>
              </div>

              <Accordion type="single" collapsible className="mt-5">
                <AccordionItem value="theme">
                  <AccordionTrigger>About</AccordionTrigger>
                  <AccordionContent>{event.theme}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="rules">
                  <AccordionTrigger>Rules</AccordionTrigger>
                  <AccordionContent>
                    {event.rules.length > 0 ? (
                      <ul className="list-disc space-y-1 pl-4">
                        {event.rules.map((rule, i) => (
                          <li key={i}>{rule}</li>
                        ))}
                      </ul>
                    ) : (
                      'Rules will be published closer to the fest.'
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="coordinators">
                  <AccordionTrigger>Coordinators</AccordionTrigger>
                  <AccordionContent>
                    {event.coordinators.length > 0 ? (
                      <ul className="space-y-1">
                        {event.coordinators.map((c) => (
                          <li key={c.whatsapp}>{c.name}</li>
                        ))}
                      </ul>
                    ) : (
                      'Coordinator contacts will be shared soon.'
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="flex gap-3 border-t border-border bg-surface p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
            {event.coordinators[0]?.whatsapp && (
              <Button
                asChild
                variant="secondary"
                className="flex-1"
              >
                <a
                  href={`https://wa.me/${event.coordinators[0].whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            )}
            {REGISTRATION_OPEN && REGISTRATION_URL ? (
              <Button asChild variant="primary" glow className="flex-1">
                <a href={REGISTRATION_URL} target="_blank" rel="noreferrer">
                  Register now
                </a>
              </Button>
            ) : (
              <Button variant="primary" disabled className="flex-1">
                Registration opens soon
              </Button>
            )}
          </div>
        </DrawerContent>
      )}
    </Drawer>
  );
}
