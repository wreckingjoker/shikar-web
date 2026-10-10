import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70dvh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-sm tracking-[0.3em] text-accent">LOST IN THE DUNES</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">Page not found</h1>
      <p className="mt-3 text-secondary">The strategist wandered off the mapped path.</p>
      <Button asChild variant="primary" className="mt-6">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
}
