# brightfellow.net

The landing site for **Brightfellow**, a community that builds and looks after
simple, open-source tools for communities and small organizations.

It is a static site built with [Astro](https://astro.build). It ships almost no
JavaScript (small scripts for the menus and the theme button), uses no trackers or cookies,
and self-hosts its one web font (Literata). Indonesian is the default language at
`/`; English lives under `/en/`, with the same English URL slugs.

Licensed under [Apache-2.0](LICENSE). See [NOTICE](NOTICE).

## Run locally

Requires Node.js 22.12 or newer (see `.node-version`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # type-check .astro and .ts files
npm run build     # static output in dist/
npm run preview   # serve dist/ locally
```

## Deploy

The site is hosted on **Cloudflare Pages**, connected to this repository:

- A push to `main` builds and deploys to https://brightfellow.net.
- Every pull request gets its own preview URL, which Cloudflare posts on the PR.
- `.github/workflows/check.yml` runs `npm run check` and `npm run build` on every
  pull request and every push to `main`. Deploying is left entirely to Cloudflare.

`npm run build` writes a plain static site to `dist/`, with `dist/404.html` for
missing pages. The site expects to live at the apex domain (`site` in
`astro.config.mjs`). Hosted tool instances will live on their own subdomains and
are not part of this build.

### One-time Cloudflare setup

1. In the Cloudflare dashboard, go to **Workers & Pages**, create a new
   application, choose **Pages**, then **Import an existing Git repository**.
2. Connect GitHub. An owner of the `brightfellow-net` organization has to
   approve the Cloudflare app; give it access to **this repository only**.
3. Select `brightfellow-net/brightfellow-net` and use these build settings:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | *(leave empty)* |

   The Node.js version comes from `.node-version` (22), so no environment
   variable is needed.
4. After the first deploy, open the project's **Custom domains** tab and add
   `brightfellow.net`. If the domain's DNS is on Cloudflare, the record is
   created for you; otherwise, add the CNAME record Cloudflare shows at your DNS
   provider.

Free-plan limits (500 builds a month, one build at a time) are far above what
this site needs.

### Recommended: protect `main`

In GitHub, go to **Settings → Branches** (or **Rules**) and add a rule for `main`
that requires the **Check** status to pass before merging. Broken builds then
can't reach the live site.

### Alternative: GitHub Pages

The repository is public, so GitHub Pages also works on the free plan. You'd add
`public/CNAME` containing `brightfellow.net`, set **Settings → Pages → Source**
to "GitHub Actions", and add a deploy workflow (for example with
[`withastro/action`](https://github.com/withastro/action)). There are no
per-PR previews, and it is usually slower for visitors in Indonesia.

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
