import { GoldDivider } from '@/components/ui/divider';
import { CONTACT_EMAIL } from '@/config/site';

export default function Team() {
  return (
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
  );
}
