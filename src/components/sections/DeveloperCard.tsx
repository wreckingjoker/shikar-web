/**
 * Developer credit card — same tarot-frame language as the event art ("XI · The Architect"):
 * title, monogram (or photo), name, role. Content lives in src/data/developer.json
 * (Claude.md §7: no hardcoded content).
 */
import { cn } from '@/lib/utils';
import { initialsOf, type Developer } from '@/lib/developer';

export function DeveloperCard({ dev }: { dev: Developer }) {
  const name = dev.name.trim();

  return (
    <article className="relative w-[272px] rounded-md border border-mustard/70 bg-gradient-to-b from-charcoal via-ink to-ink p-[10px] shadow-glow md:w-[288px]">
      <div className="relative flex flex-col items-center rounded-sm border border-mustard/35 px-5 py-8 text-center">
        {['left-2 top-2', 'right-2 top-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos) => (
          <span key={pos} aria-hidden="true" className={cn('absolute text-xs leading-none text-accent/70', pos)}>
            ✦
          </span>
        ))}

        <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">
          {dev.numeral} · {dev.title}
        </p>

        <div className="relative mt-6 flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-pill border border-mustard/70 bg-[radial-gradient(circle_at_50%_35%,rgba(181,154,68,0.25),rgba(11,28,53,0.9)_70%)] shadow-glow">
          <span aria-hidden="true" className="absolute inset-[6px] rounded-pill border border-mustard/30" />
          {dev.photo ? (
            <img src={dev.photo} alt={name} loading="lazy" className="h-[104px] w-[104px] rounded-pill object-cover" />
          ) : (
            <span aria-hidden="true" className="text-metallic-gold font-display text-[44px] leading-none">
              {initialsOf(name)}
            </span>
          )}
        </div>

        <h3 className="text-metallic-gold mt-6 font-display text-xl uppercase leading-tight tracking-[0.06em]">
          {name}
        </h3>
        <p className="mt-2 text-sm text-secondary">{dev.role}</p>
      </div>
    </article>
  );
}
