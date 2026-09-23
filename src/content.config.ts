import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ id: z.string(), en: z.string() });

// Keeps the order entries have in the JSON file, so lists render in that order.
const withOrder = (text: string) =>
  (JSON.parse(text) as Array<{ slug: string }>).map((entry, order) => ({ id: entry.slug, order, ...entry }));

/** Every tool, in one data file. Adding a tool here lists it everywhere. */
const tools = defineCollection({
  loader: file('src/data/tools.json', { parser: withOrder }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number(),
    name: z.string(),
    description: localized,
    categories: z.array(z.string()).min(1),
    status: z.enum(['pilot', 'available', 'coming-soon']),
    repository: z.url().nullable(),
  }),
});

/** Audience categories. Each one gets a /for/<slug>/ page automatically. */
const categories = defineCollection({
  loader: file('src/data/categories.json', { parser: withOrder }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    order: z.number(),
    name: localized,
    summary: localized,
    intro: z.object({ id: z.array(z.string()), en: z.array(z.string()) }),
  }),
});

/**
 * Product page content, one file per tool per language:
 * src/content/tool-pages/<slug>/<lang>.md. Optional: without it, the product
 * page is built from the data file alone.
 */
const toolPages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/tool-pages' }),
  schema: z.object({
    lede: z.string(),
    problem: z.array(z.string()),
    features: z.array(z.string()),
    selfHost: z.string(),
    hosted: z.string(),
    note: z.string().optional(),
    invite: z.object({ title: z.string(), text: z.string() }).optional(),
  }),
});

export const collections = { tools, categories, toolPages };
