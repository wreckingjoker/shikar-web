import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const LINKS = [
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/experience', label: 'Experience' },
  { to: '/sponsors', label: 'Sponsors' },
  { to: '/team', label: 'Team' },
  { to: '/faq', label: 'FAQ' },
] as const;

/**
 * Top bar: transparent over the hero, gains a blurred surface once the page scrolls
 * (Design.md §Components "Top bar"). Desktop-first nav; mobile relies on BottomNav.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-base ease-sand',
        scrolled ? 'bg-bg/85 backdrop-blur border-b border-border' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[88px] max-w-6xl items-center justify-between px-4 pt-[12px] md:h-[104px] md:px-8">
        <NavLink to="/" aria-label="SHIKHAR 2026 home">
          <Logo />
        </NavLink>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'font-display text-xs tracking-[0.2em] uppercase transition-colors duration-base ease-sand',
                  isActive ? 'text-accent' : 'text-secondary hover:text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/register"
            className="rounded-sm bg-accent px-5 py-2 font-display text-xs uppercase tracking-[0.2em] text-on-accent shadow-glow transition-transform duration-base ease-sand hover:-translate-y-px"
          >
            Register now
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
