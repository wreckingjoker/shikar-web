import { NavLink } from 'react-router-dom';
import { Drawer as DrawerPrimitive } from 'vaul';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  links: readonly { to: string; label: string }[];
}

/**
 * Mobile "all pages" bottom sheet. Lives in its own file so TopBar can lazy-load it on the
 * first tap — vaul + Radix Dialog then stay out of the initial bundle (Claude.md §8).
 */
export default function MobileMenu({ open, onOpenChange, links }: MobileMenuProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-ink">
        <DrawerPrimitive.Title className="mt-4 text-center font-display text-sm tracking-[0.3em] text-accent">
          MENU
        </DrawerPrimitive.Title>
        <DrawerPrimitive.Description className="sr-only">
          All pages of the SHIKHAR 2026 site
        </DrawerPrimitive.Description>
        <nav aria-label="All pages" className="px-4 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-4">
          <ul className="divide-y divide-border">
            {[{ to: '/', label: 'Home' }, ...links].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => onOpenChange(false)}
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
            onClick={() => onOpenChange(false)}
            className="mt-5 flex min-h-[48px] items-center justify-center rounded-sm bg-accent font-display text-sm uppercase tracking-[0.2em] text-on-accent shadow-glow"
          >
            Register now
          </NavLink>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
