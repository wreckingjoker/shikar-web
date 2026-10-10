import { GoldDivider } from '@/components/ui/divider';

const ZONES = [
  {
    name: 'Horizon Entrance',
    copy: 'The threshold between the campus you know and the fest you’re about to enter.',
  },
  {
    name: 'Playbook Wall',
    copy: '"What will tomorrow’s managers need to learn?" Leave your answer. Read everyone else’s.',
  },
  {
    name: 'Horizon Stage',
    copy: 'Where the results are read out, the prizes are handed over, and the finale happens.',
  },
];

export default function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 md:px-8">
      <p className="font-display text-sm tracking-[0.3em] text-accent">ON CAMPUS</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">The Experience</h1>
      <GoldDivider className="mt-5" />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {ZONES.map((zone) => (
          <div key={zone.name} className="rounded-sm border border-border bg-surface p-5">
            <h2 className="text-lg uppercase tracking-[0.04em]">{zone.name}</h2>
            <p className="mt-2 text-sm text-secondary">{zone.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
