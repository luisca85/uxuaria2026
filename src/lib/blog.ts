import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

// Newest first, drafts only in dev
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

const fmt = (date: Date, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('es-AR', { timeZone: 'UTC', ...options }).formatToParts(date);

// "9 octubre, 2026" (cards)
export function cardDate(date: Date): string {
  const p = Object.fromEntries(fmt(date, { day: 'numeric', month: 'long', year: 'numeric' }).map((x) => [x.type, x.value]));
  return `${p.day} ${p.month}, ${p.year}`;
}

// "9 de octubre, 2026" (article header)
export function longDate(date: Date): string {
  const p = Object.fromEntries(fmt(date, { day: 'numeric', month: 'long', year: 'numeric' }).map((x) => [x.type, x.value]));
  return `${p.day} de ${p.month}, ${p.year}`;
}

export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
