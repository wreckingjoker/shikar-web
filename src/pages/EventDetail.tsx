import { Link, Navigate, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import eventsData from '@/data/events.json';
import type { FestEvent } from '@/types/event';
import { EventArt } from '@/components/events/EventArt';
import { ChipLabel } from '@/components/ui/chip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { REGISTRATION_OPEN, REGISTRATION_URL } from '@/config/site';

const events = eventsData as FestEvent[];

export default function EventDetail() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) return <Navigate to="/events" replace />;

  return (
    <div className="pb-16 pt-16">
      <EventArt event={event} className="h-56 w-full md:h-72" />

      <div className="mx-auto max-w-2xl px-4 pt-6 md:px-8">
        <Link to="/events" className="text-sm text-secondary hover:text-primary">
          ← All events
        </Link>

        <p className="mt-4 font-display text-xs uppercase tracking-[0.2em] text-accent">
          {event.type}
        </p>
        <h1 className="mt-1 text-2xl uppercase md:text-2xl-d">{event.name}</h1>
        <p className="mt-2 text-lg text-secondary md:text-lg-d">{event.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {event.journeyWord && <ChipLabel>{event.journeyWord}</ChipLabel>}
          <ChipLabel>{event.teamSize ? `Team of ${event.teamSize}` : 'Team size TBA'}</ChipLabel>
          <ChipLabel>{event.fee != null ? `₹${event.fee}` : 'Fee TBA'}</ChipLabel>
          <ChipLabel>{event.prize != null ? `₹${event.prize} prize` : 'Prize TBA'}</ChipLabel>
          <ChipLabel>
            {event.day && event.time ? `${event.day} · ${event.time}` : 'Schedule TBA'}
          </ChipLabel>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          {REGISTRATION_OPEN && REGISTRATION_URL ? (
            <Button asChild variant="primary" glow>
              <a href={REGISTRATION_URL} target="_blank" rel="noreferrer">
                Register now
              </a>
            </Button>
          ) : (
            <Button variant="primary" disabled>
              Registration opens soon
            </Button>
          )}
          {event.coordinators[0]?.whatsapp && (
            <Button asChild variant="secondary">
              <a href={`https://wa.me/${event.coordinators[0].whatsapp}`} target="_blank" rel="noreferrer">
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp coordinator
              </a>
            </Button>
          )}
        </div>

        <Accordion type="single" collapsible className="mt-8">
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
  );
}
