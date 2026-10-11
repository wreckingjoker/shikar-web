import { cn } from '@/lib/utils';

/**
 * SCMS Cochin School of Business seal (host institution). Source is only 64x61, so keep it
 * at <= ~48 CSS px or it goes soft on high-DPR phones — swap in a larger file/SVG later.
 */
export function ScmsLogo({ className }: { className?: string }) {
  return (
    <img
      src="/brand/scms-logo.avif"
      alt="SCMS Cochin School of Business"
      width={64}
      height={61}
      className={cn('h-[40px] w-auto object-contain', className)}
    />
  );
}
