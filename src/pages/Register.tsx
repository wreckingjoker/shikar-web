import { Button } from '@/components/ui/button';
import { GoldDivider } from '@/components/ui/divider';
import { REGISTRATION_OPEN, REGISTRATION_URL, CONTACT_EMAIL } from '@/config/site';

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-xl px-4 pb-16 pt-24 text-center md:px-8">
      <p className="font-display text-sm tracking-[0.3em] text-accent">STRATEGIST PASS</p>
      <h1 className="mt-3 text-2xl md:text-2xl-d">Register</h1>
      <GoldDivider className="mt-5" />

      <p className="mx-auto mt-6 max-w-[55ch] text-secondary">
        {REGISTRATION_OPEN
          ? 'Registration happens on our partner platform. Pick your events, pay the fee, and you’re in.'
          : 'Registration isn’t open yet. Leave your event picks ready — the moment the gates open, you’ll register in minutes.'}
      </p>

      <div className="mt-8">
        {REGISTRATION_OPEN && REGISTRATION_URL ? (
          <Button asChild variant="primary" glow>
            <a href={REGISTRATION_URL} target="_blank" rel="noreferrer">
              Register now
            </a>
          </Button>
        ) : (
          <Button variant="primary" disabled>
            Registration opens soon
          </Button>
        )}
      </div>

      <p className="mt-10 text-sm text-secondary">
        Questions before you register?{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>
      </p>

      <p className="mt-6 text-sm text-secondary">
        Once you're in, you'll generate your own "Strategist Pass" — a shareable card with
        your name, college, event and strategist number.
      </p>
    </div>
  );
}
