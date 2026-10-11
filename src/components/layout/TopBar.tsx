import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Logo } from '@/components/brand/Logo';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
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
 * (Design.md §Components "Top bar"). Desktop: inline nav. Mobile: BottomNav carries the 4
 * core routes (Claude.md §5 caps it at 4), so every other page (Team, Experience, Sponsors,
 * FAQ) is reached through this Menu button's bottom sheet.
 */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Mobile menu — all pages, including the ones the 4-item bottom nav can't hold */}
        <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
          <DrawerTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-[44px] w-[44px] items-center justify-center rounded-pill border border-border bg-ink/60 text-primary backdrop-blur transition-colors duration-base ease-sand hover:border-mustard hover:text-accent md:hidden"
            >
              <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-ink">
            <DrawerPrimitive.Title className="mt-4 text-center font-display text-sm tracking-[0.3em] text-accent">
              MENU
            </DrawerPrimitive.Title>
            <DrawerPrimitive.Description className="sr-only">
              All pages of the SHIKHAR 2026 site
            </DrawerPrimitive.Description>
            <nav aria-label="All pages" className="px-4 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
              <ul className="divide-y divide-border">
                {[{ to: '/', label: 'Home' }, ...LINKS].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-[52px] items-center justify-between font-display text-base uppercase tracking-[0.15em] transition-colors duration-base ease-sand',
                          isActive ? 'text-accent' : 'text-primary hover:text-accent',
                        )
                      }
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-accent/60">✦</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="mt-5 flex min-h-[48px] items-center justify-center rounded-sm bg-accent font-display text-sm uppercase tracking-[0.2em] text-on-accent shadow-glow"
              >
                Register now
              </NavLink>
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
}
