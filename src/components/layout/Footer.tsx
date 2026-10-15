import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { SITE_NAME } from '@/config/site';
import { Logo } from '@/components/brand/Logo';
import { ScmsLogo } from '@/components/brand/ScmsLogo';
import { cn } from '@/lib/utils';

// Pages the 4-item mobile bottom nav can't hold — always one tap away from the footer.
const FOOTER_LINKS = [
  { to: '/team', label: 'Team' },
  { to: '/experience', label: 'Experience' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/faq', label: 'FAQ' },
] as const;

// Each network in its own official brand colour (third-party marks, not site palette).
const SOCIAL_LINKS = [
  {
    href: 'https://www.instagram.com/shikhar._.26/',
    label: 'Instagram',
    icon: Instagram,
    bg: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]',
  },
  {
    href: 'https://www.facebook.com/SCMSofficialpage',
    label: 'Facebook',
    icon: Facebook,
    bg: 'bg-[#1877F2]',
  },
  {
    href: 'https://www.linkedin.com/school/scmscochin/posts/',
    label: 'LinkedIn',
    icon: Linkedin,
    bg: 'bg-[#0A66C2]',
  },
] as const;

/** Site footer — page links, socials, logos and fest line. */
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
      <ul aria-label="Follow SHIKHAR 2026" className="mb-6 flex items-center justify-center gap-4">
        {SOCIAL_LINKS.map(({ href, label, icon: Icon, bg }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                'inline-flex h-[52px] w-[52px] items-center justify-center rounded-pill text-white shadow-md transition-transform duration-base ease-sand hover:-translate-y-[2px] hover:scale-105 active:scale-95',
                bg,
              )}
            >
              <Icon size={24} strokeWidth={2} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <div className="mb-4 flex items-center justify-center gap-4">
        <Logo className="h-[48px] md:h-[52px]" />
        <span aria-hidden="true" className="h-[36px] w-px bg-mustard/40" />
        <ScmsLogo className="h-[48px]" />
      </div>
      <address className="mx-auto mb-5 max-w-sm text-sm not-italic leading-relaxed text-secondary">
        <span className="block text-primary">SCMS Group of Educational Institutions</span>
        SCMS Campus, Prathap Nagar, Muttom, Aluva
        <br />
        Cochin, Kerala – 683 106, India
      </address>
      <p className="font-display text-xs uppercase tracking-[0.25em] text-secondary">
        {SITE_NAME} · SCMS Business School, Kochi
      </p>
    </footer>
  );
}
