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
      className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
    >
      <ul className="flex items-stretch justify-between px-2">
        {ITEMS.map(({ to, label, icon: Icon, end }) => {
          const isRegister = to === '/register';
          const isActive = end ? pathname === to : pathname.startsWith(to);
          return (
            <li key={to} className="relative flex-1">
              {isActive && (
                <motion.span
                  layoutId={reduceMotion ? undefined : 'bottom-nav-tube'}
                  className="absolute left-1/2 top-0 h-[2px] w-8 -translate-x-1/2 rounded-pill bg-accent shadow-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <NavLink
                to={to}
                end={end}
                className={cn(
                  'flex min-h-[44px] flex-col items-center justify-center gap-1 py-2 text-xs transition-colors duration-base ease-sand',
                  isRegister ? 'text-accent' : isActive ? 'text-accent' : 'text-secondary hover:text-primary',
                )}
              >
                <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                <span>{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
