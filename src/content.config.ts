import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const image = z.object({
  src: z.string(),
  width: z.number(),
  height: z.number(),
  alt: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // <title> tag; defaults to "title | Uxuaria Blog"
    seoTitle: z.string().optional(),
    description: z.string(),
    // Text on the blog cards; defaults to description
    excerpt: z.string().optional(),
    category: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    readingTime: z.number(),
    cover: image,
    // Card crop when it differs from the cover
    cardImage: image.optional(),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
