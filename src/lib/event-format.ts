import type { FestEvent } from '@/types/event';

const PLACES = ['1st', '2nd', '3rd'];

const inr = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;

/** Team-size chip text, e.g. "Team of 4", "Individual". */
export function formatTeamSize(event: FestEvent) {
  if (!event.teamSize) return 'Team size TBA';
  return event.teamSize === '1' ? 'Individual' : `Team of ${event.teamSize}`;
}

/** Fee chip text, e.g. "₹1,000 fee" or "₹600 online · ₹800 spot". */
export function formatFee(event: FestEvent) {
  if (event.fee == null) return 'Fee TBA';
  if (event.spotFee != null && event.spotFee !== event.fee) {
    return `${inr(event.fee)} online · ${inr(event.spotFee)} spot`;
  }
  return `${inr(event.fee)} fee`;
}

/** "919946299432" -> { display: "99462 99432", tel: "+919946299432" }; null when blank. */
export function formatPhone(whatsapp: string) {
  const digits = whatsapp.replace(/[^\d]/g, '');
  if (!digits) return null;
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  const display = local.length === 10 ? `${local.slice(0, 5)} ${local.slice(5)}` : local;
  return { display, tel: `+${digits}` };
}

/** Prize chip text, e.g. "1st ₹20,000 · 2nd ₹15,000". */
export function formatPrize(event: FestEvent) {
  if (!event.prize?.length) return 'Prize TBA';
  return event.prize.map((amount, i) => `${PLACES[i] ?? `${i + 1}th`} ${inr(amount)}`).join(' · ');
}
