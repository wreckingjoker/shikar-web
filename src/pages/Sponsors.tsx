import sponsorsData from '@/data/sponsors.json';
import type { Sponsors } from '@/types/event';
import { GoldDivider } from '@/components/ui/divider';
import { CONTACT_EMAIL } from '@/config/site';

const sponsors = sponsorsData as Sponsors;

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 text-center md:px-8">
      <p className="font-display text-sm tracking-[0.3em] text-accent">PARTNERS</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">Sponsors</h1>
      <GoldDivider className="mt-5" />

      {sponsors.tiers.length === 0 ? (
        <p className="mx-auto mt-8 max-w-[55ch] text-secondary">
          Our sponsors will be announced here. Want to partner with SHIKHAR 2026?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2">
            Write to us
          </a>
          .
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {sponsors.tiers.map((tier) => (
            <div key={tier.tier}>
              <h2 className="font-display text-sm uppercase tracking-[0.2em] text-accent">
                {tier.tier}
              </h2>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
                {tier.sponsors.map((s) => (
                  <img key={s.name} src={s.logo} alt={s.name} className="h-10 w-auto" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
