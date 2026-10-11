import data from '@/data/developer.json';

export type Developer = (typeof data.developers)[number];

export const developers: Developer[] = data.developers.filter((d) => d.name.trim());

/** "Shon Varghese and Fawas" — used by the footer credit. */
export const developerNames = developers.map((d) => d.name.trim()).join(' and ');

/** First + last initial: "Shon Varghese" -> "SV", "Fawas" -> "F". */
export function initialsOf(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const picked = words.length > 1 ? [words[0], words[words.length - 1]] : words;
  return picked.map((w) => w[0]?.toUpperCase()).join('') || '?';
}
