import { NavLink, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Compass, CalendarDays, Home, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/events', label: 'Events', icon: Compass, end: false },
  { to: '/schedule', label: 'Schedule', icon: CalendarDays, end: false },
  { to: '/register', label: 'Register', icon: Ticket, end: false },
] as const;

/**
 * Mobile bottom nav (Claude.md §5 / §16 map: "Tubelight Navbar / Floating Dock").
 * Hand-built: a shared-layout mustard tube slides to the active item via motion's
 * layoutId, reskinned from the 21st.dev pattern instead of installing it. Hidden at
 * md+ where the top bar carries navigation instead.
 */
export function BottomNav() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Primary"
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-mustard/50 bg-ink/95 shadow-[0_-10px_30px_-6px_rgba(181,154,68,0.28)] backdrop-blur md:hidden"
    >
      <ul className="flex items-stretch justify-between gap-1 px-2 py-1">
        {ITEMS.map(({ to, label, icon: Icon, end }) => {
          const isRegister = to === '/register';
          const isActive = end ? pathname === to : pathname.startsWith(to);

          // Register is the primary action: a raised, filled gold pill rather than a tab.
          if (isRegister) {
            return (
              <li key={to} className="relative flex flex-1 items-center justify-center">
                <NavLink
                  to={to}
                  className="btn-shimmer -mt-5 flex min-h-[52px] w-full max-w-[96px] flex-col items-center justify-center gap-[2px] rounded-md border border-mustard bg-accent px-2 text-xs font-semibold text-on-accent shadow-glow transition-transform duration-base ease-sand active:scale-95"
                >
                  <Icon aria-hidden="true" size={20} strokeWidth={2} />
                  <span>{label}</span>
                </NavLink>
              </li>
            );
          }

          return (
            <li key={to} className="relative flex-1">
              {isActive && (
                // Centred with inset-x-0 + mx-auto, NOT translate: motion's layout animation
                // owns `transform`, which was wiping out -translate-x-1/2 and off-centring it.
                <motion.span
                  layoutId={reduceMotion ? undefined : 'bottom-nav-tube'}
                  className="absolute inset-x-0 -top-1 mx-auto h-[3px] w-8 rounded-pill bg-accent shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <NavLink
                to={to}
                end={end}
                className={cn(
                  'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-md py-2 text-xs transition-colors duration-base ease-sand',
                  isActive
                    ? 'bg-mustard/15 font-semibold text-accent'
                    : 'text-primary/80 hover:text-accent',
                )}
              >
                <Icon aria-hidden="true" size={22} strokeWidth={isActive ? 2 : 1.75} />
                <span>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
