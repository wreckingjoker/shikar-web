import { Outlet, useLocation } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';

export function Layout() {
  const { pathname, hash } = useLocation();

  // Route change: scroll to top, like a fresh page (native scroll, no smooth-scroll hijack) —
  // unless the link targets a section (e.g. /team#developer), then land on it.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const found = document.getElementById(id);
    if (found) {
      found.scrollIntoView();
      return;
    }
    // Lazy-loaded pages: the section doesn't exist until the route chunk arrives, so wait
    // for it to mount (max 3 s) instead of giving up and leaving the user at the top.
    window.scrollTo(0, 0);
    const observer = new MutationObserver(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timeout = window.setTimeout(() => observer.disconnect(), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, [pathname, hash]);

  return (
    <div className="min-h-dvh bg-bg text-primary">
      <TopBar />
      <main className="pb-20 md:pb-0">
        {/* Lazy route chunks load here; header/nav stay put. The full-height fallback keeps
            the footer from flashing up mid-screen while a page chunk downloads. */}
        <Suspense fallback={<div aria-busy="true" className="min-h-dvh" />}>
          <Outlet />
        </Suspense>
        <Footer />
      </main>
      <BottomNav />
    </div>
  );
}
