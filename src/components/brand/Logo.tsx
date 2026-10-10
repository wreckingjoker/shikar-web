import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

/**
 * Brand mark. public/brand/shikhar-logo.avif is the COMPLETE horizontal lockup — the red
 * "26" emblem and the Samarkan-style "Shikhar 2026" wordmark are already combined into one
 * 384x128 (3:1) image. Earlier versions of this component also rendered a separate text
 * label next to it and forced the image into a square box, which squashed the lockup and
 * duplicated the wordmark. Render the image alone, at its real aspect ratio.
 */
export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/brand/shikhar-logo.avif"
      alt="SHIKHAR 2026"
      width={384}
      height={128}
      // explicit px: the custom spacing scale makes h-9 = 96px, which overflowed the top bar
      className={cn('h-[60px] w-auto object-contain md:h-[72px]', className)}
    />
  );
}
