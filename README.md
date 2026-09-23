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

The site is hosted on **GitHub Pages**, deployed by GitHub Actions:

- `.github/workflows/deploy.yml`: on every push to `main`, runs `npm run check`
  and `npm run build`, then publishes `dist/` to https://brightfellow.net. It can
  also be run by hand from the **Actions** tab ("Run workflow").
- `.github/workflows/check.yml`: on every pull request, runs the same check and
  build, so problems show up before merging.

Both use the Node.js version in `.node-version`. `npm run build` writes a plain
static site to `dist/`, and GitHub Pages serves `dist/404.html` for missing pages.
The site expects to live at the apex domain (`site` in `astro.config.mjs`).
Hosted tool instances will live on their own subdomains and are not part of this
build.

### One-time GitHub Pages setup

1. **Turn on Pages.** In the repository, go to **Settings → Pages** and set
   **Source** to **GitHub Actions**.
2. **Verify the domain for the organization** (recommended; it stops anyone else
   from using the domain on GitHub). Go to the organization's **Settings → Pages
   → Add a domain**, enter `brightfellow.net`, and add the TXT record GitHub shows
   at your DNS provider.
3. **Point DNS at GitHub.** At your DNS provider, add these records for the apex
   domain `brightfellow.net`:

   | Type | Value |
   |---|---|
   | A | `185.199.108.153` |
   | A | `185.199.109.153` |
   | A | `185.199.110.153` |
   | A | `185.199.111.153` |
   | AAAA | `2606:50c0:8000::153` |
   | AAAA | `2606:50c0:8001::153` |
   | AAAA | `2606:50c0:8002::153` |
   | AAAA | `2606:50c0:8003::153` |

   Optionally add a `CNAME` record for `www` pointing to
   `brightfellow-net.github.io`, so `www.brightfellow.net` redirects to the apex.
4. **Set the custom domain.** In **Settings → Pages → Custom domain**, enter
   `brightfellow.net` and save. When the DNS check passes, tick **Enforce HTTPS**
   (the certificate can take a little while to be issued). No `CNAME` file is
   needed in the repository when deploying with Actions.
5. **Deploy.** Merge to `main` (or run the Deploy workflow by hand).

### Recommended: protect `main`

In GitHub, go to **Settings → Branches** (or **Rules**) and add a rule for `main`
that requires the **Check** status to pass before merging, so broken builds
can't reach the live site.

### Costs

The repository is public, so GitHub Pages and the Actions minutes used by these
workflows are free. (For a private repository on the free organization plan,
GitHub Pages isn't available.)

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
