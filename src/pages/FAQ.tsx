import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { GoldDivider } from '@/components/ui/divider';
import { FEST_VENUE } from '@/config/site';

const FAQS = [
  {
    q: 'Who can participate?',
    a: 'Management and other students from colleges across Kerala and India are welcome. Specific eligibility per event will be listed on each event’s page.',
  },
  {
    q: 'Where is SHIKHAR 2026 happening?',
    a: `${FEST_VENUE}. Exact venue details per event will be shared on the Schedule page.`,
  },
  {
    q: 'How do I register?',
    a: 'Head to the Register page. Registration isn’t open yet — check back soon.',
  },
  {
    q: 'Can I participate in more than one event?',
    a: 'Yes, as long as the timings don’t clash. Check the Schedule page once it’s live.',
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-24 md:px-8">
      <p className="text-center font-display text-sm tracking-[0.3em] text-accent">FAQ</p>
      <h1 className="mt-3 text-center text-2xl md:text-2xl-d">Questions</h1>
      <GoldDivider className="mt-5" />

      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
