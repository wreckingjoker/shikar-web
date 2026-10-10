/**
 * Single source of truth for values that aren't decided yet (Claude.md §14 Open Items).
 * Swap these once real dates / platform / domain are confirmed — nothing else in the
 * codebase should hardcode them.
 */

// TODO(open-item): fest dates not yet confirmed. Placeholder keeps the countdown/schedule
// functional end-to-end; replace with the real start date the moment it's locked.
export const FEST_START_ISO = '2026-02-20T09:00:00+05:30';
export const FEST_END_ISO = '2026-02-22T18:00:00+05:30';
export const FEST_DATES_CONFIRMED = false;

export const FEST_VENUE = 'SCMS Business School, Prathap Nagar, Muttom, Kochi';
export const FEST_VENUE_CONFIRMED = false;

// TODO(open-item): registration platform not chosen (Konfhub / Tally / Google Forms /
// Razorpay Payment Pages). Every Register CTA in the app points at this one constant —
// change it here once a platform is picked, no other files need to change.
export const REGISTRATION_URL: string | null = null;
export const REGISTRATION_OPEN = false;

export const SITE_NAME = 'SHIKHAR 2026';
export const SITE_TAGLINE = 'Transcend The Time';
export const CONTACT_EMAIL = 'hello@shikhar2026.com'; // TODO(open-item): confirm real inbox
