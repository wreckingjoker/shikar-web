import { Link } from 'react-router-dom';
import { SITE_NAME } from '@/config/site';
import { developerNames } from '@/lib/developer';

// Pages the 4-item mobile bottom nav can't hold — always one tap away from the footer.
const FOOTER_LINKS = [
  { to: '/team', label: 'Team' },
  { to: '/experience', label: 'Experience' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/faq', label: 'FAQ' },
] as const;

/** Site footer — page links, fest line, and the "created by" credit (→ /team#developer). */
export function Footer() {
  return (
    <footer className="border-t border-border bg-ink px-4 py-7 text-center">
      <nav aria-label="More pages" className="mb-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="inline-flex min-h-[44px] items-center px-3 font-display text-xs uppercase tracking-[0.2em] text-primary transition-colors duration-base ease-sand hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-secondary">
        {SITE_NAME} · SCMS Business School, Kochi
      </p>
      <p className="mt-2 text-xs text-secondary/80">
        created by{' '}
        <Link
          to="/team#developer"
          className="inline-flex min-h-[44px] items-center text-secondary underline-offset-4 transition-colors duration-base ease-sand hover:text-accent hover:underline"
        >
          {developerNames}
        </Link>
      </p>
    </footer>
  );
}
