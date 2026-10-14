import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

// Home ships in the main bundle (it's the landing page / LCP). Every other route is
// split into its own chunk and fetched on first visit — Claude.md §8 initial-JS budget.
const Events = lazy(() => import('@/pages/Events'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));
const SchedulePage = lazy(() => import('@/pages/Schedule'));
const RegisterPage = lazy(() => import('@/pages/Register'));
const Experience = lazy(() => import('@/pages/Experience'));
const SponsorsPage = lazy(() => import('@/pages/Sponsors'));
const Team = lazy(() => import('@/pages/Team'));
const FAQPage = lazy(() => import('@/pages/FAQ'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/sponsors" element={<SponsorsPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
