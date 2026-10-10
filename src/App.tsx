import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Events from '@/pages/Events';
import EventDetail from '@/pages/EventDetail';
import SchedulePage from '@/pages/Schedule';
import RegisterPage from '@/pages/Register';
import Experience from '@/pages/Experience';
import SponsorsPage from '@/pages/Sponsors';
import Team from '@/pages/Team';
import FAQPage from '@/pages/FAQ';
import NotFound from '@/pages/NotFound';

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
