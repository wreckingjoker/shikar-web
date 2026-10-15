export type EventCategory = 'management' | 'non-management';

export interface Coordinator {
  name: string;
  whatsapp: string;
}

export interface FestEvent {
  slug: string;
  name: string;
  category: EventCategory;
  type: string;
  tagline: string;
  theme: string;
  journeyOrder: number | null;
  journeyWord: string | null;
  teamSize: string | null;
  /** Registration fee in INR (online / standard). */
  fee: number | null;
  /** Spot-registration fee in INR, when it differs from `fee`. */
  spotFee: number | null;
  /** Extra fee detail shown under the chips, e.g. per-person pricing or an early-bird offer. */
  feeNote: string | null;
  /** Cash prize per place in INR, in finishing order: [1st, 2nd, …]. */
  prize: number[] | null;
  day: string | null;
  time: string | null;
  venue: string | null;
  rules: string[];
  coordinators: Coordinator[];
  registerUrl: string;
  image: string;
}

export interface ScheduleSlot {
  time: string;
  eventSlug: string;
  eventName: string;
  venue: string | null;
  status: 'upcoming' | 'live' | 'done';
}

export interface ScheduleDay {
  date: string;
  label: string;
  slots: ScheduleSlot[];
}

export interface Schedule {
  confirmed: boolean;
  days: ScheduleDay[];
}

export interface SponsorTier {
  tier: string;
  sponsors: { name: string; logo: string; url?: string }[];
}

export interface Sponsors {
  tiers: SponsorTier[];
}
