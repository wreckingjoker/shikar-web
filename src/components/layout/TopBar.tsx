import { lazy, Suspense, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { ScmsLogo } from '@/components/brand/ScmsLogo';
import { cn } from '@/lib/utils';

const loadMobileMenu = () => import('./MobileMenu');
const MobileMenu = lazy(loadMobileMenu);

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
 * (Design.md §Components "Top bar"). Desktop: inline nav. Mobile: BottomNav carries the 4
 * core routes (Claude.md §5 caps it at 4), so every other page (Team, Experience, Sponsors,
 * FAQ) is reached through this Menu button's bottom sheet.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);

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
        // Unscrolled: a dark scrim instead of full transparency, so the nav text stays
        // legible over bright hero skies.
        scrolled
          ? 'bg-bg/85 backdrop-blur border-b border-border'
          : 'bg-gradient-to-b from-ink/85 via-ink/50 to-transparent',
      )}
    >
      <div className="mx-auto flex h-[88px] max-w-6xl items-center justify-between gap-6 px-4 pt-[12px] md:h-[104px] md:px-8">
        <div className="flex shrink-0 items-center gap-3">
          <NavLink to="/" aria-label="SHIKHAR 2026 home">
            <Logo />
          </NavLink>
          <span aria-hidden="true" className="h-[32px] w-px bg-mustard/40" />
          <ScmsLogo className="h-[36px] md:h-[44px]" />
        </div>
        {/* Inline nav only from lg: at md widths six links + CTA collide with the logos. */}
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex xl:gap-6">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'whitespace-nowrap font-display text-xs tracking-[0.2em] uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.9)] transition-colors duration-base ease-sand',
                  isActive ? 'text-accent' : 'text-primary hover:text-accent',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/register"
            className="whitespace-nowrap rounded-sm bg-accent px-5 py-2 font-display text-xs uppercase tracking-[0.2em] text-on-accent shadow-glow transition-transform duration-base ease-sand hover:-translate-y-px"
          >
            Register now
          </NavLink>
        </nav>

        {/* Mobile menu — all pages, including the ones the 4-item bottom nav can't hold.
            The sheet (vaul) is lazy-loaded on first press; pointerdown starts the fetch a
            beat early so it's usually ready by the time the tap completes. */}
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          onPointerDown={loadMobileMenu}
          onClick={() => {
            setMenuMounted(true);
            setMenuOpen(true);
          }}
          className="flex h-[44px] w-[44px] items-center justify-center rounded-pill border border-border bg-ink/60 text-primary backdrop-blur transition-colors duration-base ease-sand hover:border-mustard hover:text-accent lg:hidden"
        >
          <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
        </button>
        {menuMounted && (
          <Suspense fallback={null}>
            <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} links={LINKS} />
          </Suspense>
        )}
      </div>
    </header>
  );
}
