import { getCollection, type CollectionEntry } from 'astro:content';

export type Tool = CollectionEntry<'tools'>['data'];
export type Category = CollectionEntry<'categories'>['data'];

export async function getTools(): Promise<Tool[]> {
  return (await getCollection('tools')).map((e) => e.data).sort((a, b) => a.order - b.order);
}

export async function getCategories(): Promise<Category[]> {
  return (await getCollection('categories')).map((e) => e.data).sort((a, b) => a.order - b.order);
}

/** Categories in data order, each with the tools tagged with it. Empty ones are dropped. */
export async function getCatalog() {
  const [tools, categories] = await Promise.all([getTools(), getCategories()]);
  const unknown = tools.flatMap((t) => t.categories.filter((c) => !categories.some((k) => k.slug === c)).map((c) => `${t.slug} -> ${c}`));
  if (unknown.length) throw new Error(`tools.json uses categories missing from categories.json: ${unknown.join(', ')}`);
  return categories
    .map((category) => ({ category, tools: tools.filter((t) => t.categories.includes(category.slug)) }))
    .filter((g) => g.tools.length > 0);
}
