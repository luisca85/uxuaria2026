// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// External links in Markdown open in a new tab, like the hand-written articles did
const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    /** @param {any} node @param {any} ctx */
    visit(node, ctx) {
      if (!/^https?:\/\//.test(node.properties?.href ?? '')) return;
      if (node.properties.target == null) ctx.setProperty(node, 'target', '_blank');
      if (node.properties.rel == null) ctx.setProperty(node, 'rel', 'noopener');
    },
  },
};

export default defineConfig({
  site: 'https://uxuaria.com',
  // Keeps today's URLs: blog/slug.astro → /blog/slug, servicios/index.astro → /servicios/
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    // Straight quotes, as the hand-written articles had them
    processor: satteri({ hastPlugins: [externalLinks], features: { smartPunctuation: false } }),
  },
});
