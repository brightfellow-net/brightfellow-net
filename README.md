# brightfellow.net

The landing site for **Brightfellow**, a community that builds and looks after
simple, open-source tools for communities and small organizations.

It is a static site built with [Astro](https://astro.build). It ships almost no
JavaScript (only a small script for the mobile menu), uses no trackers or cookies,
and self-hosts its one web font (Literata). Indonesian is the default language at
`/`; English lives under `/en/`, with the same English URL slugs.

Licensed under [Apache-2.0](LICENSE). See [NOTICE](NOTICE).

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # type-check .astro and .ts files
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Deploy

`npm run build` writes a plain static site to `dist/`. Any static host works. The
site expects to live at the apex domain (`https://brightfellow.net`, set as `site`
in `astro.config.mjs`). Hosted tool instances will live on their own subdomains
and are not part of this build.

### Cloudflare Pages (recommended)

1. In Cloudflare Pages, create a project from this GitHub repository.
2. Build command: `npm run build`. Output directory: `dist`.
3. Environment variable `NODE_VERSION` = `22` (or newer).
4. Add `brightfellow.net` as a custom domain.

`dist/404.html` is served automatically for missing pages.

### GitHub Pages

1. Add `public/CNAME` containing `brightfellow.net`.
2. In the repository settings, go to Pages and set Source to "GitHub Actions".
3. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## How the site is organized

```
src/
  data/tools.json            every tool (one entry per tool)
  data/categories.json       audience categories (churches, communities, ...)
  content/tool-pages/<slug>/<lang>.md   product page text (optional)
  content.config.ts          schemas that validate the files above
  i18n/ui.ts                 shared interface strings, navigation lists
  site.ts                    contact email and GitHub URL
  views/                     one component per page, taking a `lang` prop
  pages/ and pages/en/       thin route files that render the views
  components/                wordmark, "two lights" mark, header, footer, lists
  styles/global.css          colour tokens (light and dark), type, layout
public/                      favicon, social image (og.png), robots.txt
```

Tools have flat, permanent URLs (`/tools/<slug>/`). Categories are collection
pages (`/for/<slug>/`) that list the tools tagged with them. A tool can belong to
several categories, and moving a tool between categories never changes its URL.

### Add a tool

1. Add an entry to `src/data/tools.json`:

   ```json
   {
     "slug": "my-tool",
     "name": "My Tool",
     "description": { "id": "Satu kalimat.", "en": "One sentence." },
     "categories": ["communities"],
     "status": "coming-soon",
     "repository": "https://github.com/brightfellow-net/my-tool"
   }
   ```

   `status` is `pilot`, `available`, or `coming-soon`. `repository` may be `null`.
   The tool now appears in `/tools/`, its category pages, the Tools menu, and gets
   a basic product page at `/tools/my-tool/` (and `/en/tools/my-tool/`).

2. For a full product page, add `src/content/tool-pages/my-tool/id.md` and
   `en.md`. Copy an existing one; the fields are checked by
   `src/content.config.ts`.

### Add a category

Add an entry to `src/data/categories.json` (slug, name, one-line summary, and
intro paragraphs in both languages), then tag tools with its slug. The
`/for/<slug>/` pages, the menu, and the footer update automatically. A category
with no tools is left out of the menu and the lists.

### Add a page later (Consultation, Donate)

Create `src/views/<Page>.astro`, add route files at `src/pages/<slug>/index.astro`
and `src/pages/en/<slug>/index.astro`, add its label to both languages in
`src/i18n/ui.ts`, and add it to `primaryNav` and/or `footerNav` there.

## Content rules

The rules for the site's content are in `CLAUDE.md`. In short: the home page stays neutral;
church wording lives only on `/for/churches/` and church tool pages; no real church
names, no lyrics or Bible text, no invented numbers, and no trackers or cookies.

## Placeholders and open items

Every placeholder is visibly marked on the site. Current list:

| Where | What | Status |
|---|---|---|
| `/privacy/`, `/en/privacy/` | The whole page is a draft with headings only. Server location, data export and deletion are "to be written". | Clearly marked as a draft on the page |
| Hosting (home, `/hosting/`, Liturgist app page) | Price of the hosted version | Shown as "coming soon" / "biaya akan diumumkan" |
| `/tools/liturgist/` | The repository isn't public, so the page says "not published yet" and links to the GitHub organization. Set `repository` in `tools.json` when it's public. | Marked on the page |
| `NOTICE` | Copyright holder written as "The Brightfellow contributors" | Confirm the wording |

Nothing for Consultation or Donate is in v1: no links, placeholders, or scripts.
