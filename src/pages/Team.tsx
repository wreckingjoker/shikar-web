import { GoldDivider } from '@/components/ui/divider';
import { DeveloperCard } from '@/components/sections/DeveloperCard';
import { CONTACT_EMAIL } from '@/config/site';
import { developers } from '@/lib/developer';

export default function Team() {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-24 text-center md:px-8">
        <p className="font-display text-sm tracking-[0.3em] text-accent">THE ORGANISERS</p>
        <h1 className="mt-3 text-2xl md:text-2xl-d">Team</h1>
        <GoldDivider className="mt-5" />
        <p className="mx-auto mt-8 max-w-[55ch] text-secondary">
          SHIKHAR 2026 is run by students of SCMS Business School, Kochi. Team bios and contacts
          are being finalised — reach us in the meantime at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      {/* The developer credit — linked from the footer's "Crafted by" (/team#developer) */}
      <section
        id="developer"
        aria-labelledby="developer-heading"
        className="relative scroll-mt-[104px] overflow-hidden bg-ink px-4 pb-16 pt-12 text-center"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_55%,rgba(181,154,68,0.14),transparent_70%)]"
        />
        <div className="relative">
          <p className="font-display text-sm tracking-[0.3em] text-accent">BEHIND THE SAND</p>
          <h2 id="developer-heading" className="mt-3 text-2xl md:text-2xl-d">
            {developers.length > 1 ? 'The Architects' : 'The Architect'}
          </h2>
          <GoldDivider className="mt-5" />
          <p className="mx-auto mt-5 max-w-[46ch] text-secondary">
            Every journey needs someone to lay the road.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-10 md:flex-row md:items-start md:gap-12">
            {developers.map((dev) => (
              <DeveloperCard key={dev.name} dev={dev} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
