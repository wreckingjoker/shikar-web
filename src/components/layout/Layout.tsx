import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';

export function Layout() {
  const { pathname } = useLocation();

  // Route change: scroll to top, like a fresh page (native scroll, no smooth-scroll hijack).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-bg text-primary">
      <TopBar />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
