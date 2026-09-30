// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** @param {string} file @returns {Array<{ slug: string }>} */
const readData = (file) => JSON.parse(readFileSync(new URL(`./src/data/${file}`, import.meta.url), 'utf8'));

// Until 2026-09-30 English lived under /en/ (Indonesian was the default at /).
// English is now at /, so the old /en/ URLs redirect to their new addresses.
const legacyEnglishPaths = [
  '/',
  '/community/',
  '/tools/',
  '/hosting/',
  '/open-source/',
  '/privacy/',
  '/contact/',
  ...readData('tools.json').map((tool) => `/tools/${tool.slug}/`),
  ...readData('categories.json').map((category) => `/for/${category.slug}/`),
];

// The landing site lives at the apex domain. Hosted tool instances live on
// their own subdomains and are not part of this build.
export default defineConfig({
  site: 'https://brightfellow.net',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  redirects: Object.fromEntries(legacyEnglishPaths.map((path) => [`/en${path}`, path])),
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', id: 'id-ID' },
      },
    }),
  ],
});
