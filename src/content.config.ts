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

const figure = image.extend({
  // Double-density file, when there is one
  src2x: z.string().optional(),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    order: z.number(),
    card: z.object({
      summary: z.string(),
      // Short partner credit under the summary
      partner: z.string().optional(),
      image,
    }),
    // Card destination when the project has no case page here
    externalUrl: z.string().optional(),
    draft: z.boolean().default(false),
    // Case page: all required unless caseStudy is false
    caseStudy: z.boolean().default(true),
    seoTitle: z.string().optional(),
    description: z.string().optional(),
    // og:title and JSON-LD, when they differ from seoTitle and description
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    schema: z.object({
      headline: z.string(),
      description: z.string(),
    }).optional(),
    pubDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    meta: z.string().optional(),
    evidence: z.object({
      source: z.string(),
      headline: z.string(),
      quote: z.string(),
      date: z.string(),
      url: z.string(),
    }).optional(),
    results: z.array(z.object({ value: z.string(), detail: z.string() })).default([]),
    resultNotes: z.array(z.string()).default([]),
    facts: z.object({
      role: z.string(),
      industry: z.string(),
      deliverables: z.string(),
      tools: z.string(),
      year: z.string(),
      // Studio or company the project was done with, and credits
      partner: z.string().optional(),
    }).optional(),
    mainImage: figure.extend({ label: z.string() }).optional(),
    objectives: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    process: z.array(figure.extend({
      caption: z.string(),
      wide: z.boolean().default(false),
    })).default([]),
  }).refine(
    (p) => !p.caseStudy || (p.seoTitle && p.description && p.pubDate && p.meta && p.facts && p.mainImage),
    { message: 'A case page needs seoTitle, description, pubDate, meta, facts and mainImage; set caseStudy: false otherwise' },
  ),
});

export const collections = { blog, portfolio };
