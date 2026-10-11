import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

export function Layout() {
  const { pathname, hash } = useLocation();

  // Route change: scroll to top, like a fresh page (native scroll, no smooth-scroll hijack) —
  // unless the link targets a section (e.g. /team#developer), then land on it.
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="min-h-dvh bg-bg text-primary">
      <TopBar />
      <main className="pb-20 md:pb-0">
        <Outlet />
        <Footer />
      </main>
      <BottomNav />
    </div>
  );
}
