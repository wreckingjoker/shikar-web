import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { Urgency } from '@/hooks/useFestCountdown';

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

/**
 * One digit character that pops in fresh whenever its value changes — "flip" in spirit.
 * The metallic gradient (`background-clip: text`) must sit on THIS animated span, not on a
 * parent: a parent's clipped background doesn't repaint through transformed/fading
 * children, which rendered half-drawn, glitched digits mid-animation.
 */
function FlipChar({
  char,
  reduceMotion,
  className,
}: {
  char: string;
  reduceMotion: boolean;
  className: string;
}) {
  if (reduceMotion) return <span className={cn('inline-block', className)}>{char}</span>;
  return (
    <motion.span
      key={char}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn('inline-block', className)}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
}

function DigitTile({
  label,
  value,
  reduceMotion,
  urgency,
  compact,
}: {
  label: string;
  value: number;
  reduceMotion: boolean;
  urgency: Urgency;
  compact: boolean;
}) {
  const chars = pad(value).split('');
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-sm border bg-ink/35 backdrop-blur-sm transition-colors duration-slow ease-sand',
        compact ? 'min-w-[48px] py-2' : 'min-w-[64px] py-3',
        urgency === 'closing'
          ? cn('border-error', !reduceMotion && 'animate-[pulse_1.6s_ease-in-out_infinite]')
          : 'border-success',
      )}
    >
      <span className={cn('font-mono tabular-nums', compact ? 'text-lg' : 'text-2xl')}>
        {chars.map((c, i) => (
          <FlipChar
            key={i}
            char={c}
            reduceMotion={reduceMotion}
            className={urgency === 'closing' ? 'text-metallic-error' : 'text-metallic-success'}
          />
        ))}
      </span>
      <span
        className={cn(
          'mt-1 uppercase tracking-[0.15em] text-secondary',
          compact ? 'text-[10px]' : 'text-xs',
        )}
      >
        {label}
      </span>
    </div>
  );
}

/**
 * The countdown's digit-tile row in its ornate gold frame (Design.md §Shapes "signature
 * ornament" — corner diamonds + hairline — same language as GoldDivider). Shared by the
 * full Countdown section and the compact Hero widget via useFestCountdown, so both always
 * show the same numbers. `compact` shrinks the tiles for the hero without a second timer.
 */
export function CountdownDigits({
  remaining,
  urgency,
  reduceMotion,
  compact = false,
  className,
}: {
  remaining: { days: number; hrs: number; min: number; sec: number };
  urgency: Urgency;
  reduceMotion: boolean;
  compact?: boolean;
  className?: string;
}) {
  const units = [
    { label: 'Days', value: remaining.days },
    { label: 'Hrs', value: remaining.hrs },
    { label: 'Min', value: remaining.min },
    { label: 'Sec', value: remaining.sec },
  ];

  return (
    <div
      role="timer"
      aria-live="polite"
      aria-label={`${remaining.days} days, ${remaining.hrs} hours, ${remaining.min} minutes, ${remaining.sec} seconds until SHIKHAR 2026 begins`}
      className={cn(
        'countdown-frame mx-auto flex justify-center rounded-sm bg-ink/20 backdrop-blur-sm',
        compact ? 'gap-2 p-2' : 'gap-3 p-3',
        className,
      )}
    >
      <span className="countdown-frame-corner -left-[3.5px] -top-[3.5px]" aria-hidden="true" />
      <span className="countdown-frame-corner -right-[3.5px] -top-[3.5px]" aria-hidden="true" />
      <span className="countdown-frame-corner -bottom-[3.5px] -left-[3.5px]" aria-hidden="true" />
      <span className="countdown-frame-corner -bottom-[3.5px] -right-[3.5px]" aria-hidden="true" />
      {units.map((u) => (
        <DigitTile
          key={u.label}
          label={u.label}
          value={u.value}
          reduceMotion={reduceMotion}
          urgency={urgency}
          compact={compact}
        />
      ))}
    </div>
  );
}
