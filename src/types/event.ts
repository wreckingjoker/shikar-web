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
  fee: number | null;
  prize: number | null;
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
