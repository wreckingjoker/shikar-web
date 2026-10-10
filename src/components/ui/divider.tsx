/** Signature ornament: thin gold hairline with a compass star — Design.md §Shapes. SVG, no raster. */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={className} role="presentation" aria-hidden="true">
      <svg viewBox="0 0 200 16" className="mx-auto h-4 w-full max-w-[200px] text-mustard/60">
        <line x1="0" y1="8" x2="88" y2="8" stroke="currentColor" strokeWidth="1" />
        <path
          d="M100 2 L104 8 L100 14 L96 8 Z M100 8 L108 8 M100 8 L92 8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <line x1="112" y1="8" x2="200" y2="8" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
