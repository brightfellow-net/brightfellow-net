# Brief: brightfellow.net landing page

You are building the first landing page for **Brightfellow** (brightfellow.net). Read this whole brief before writing code. Where something is marked **ASK**, confirm with me before building that part; otherwise use the defaults given here.

## 1. What Brightfellow is

Brightfellow is **a community of fellows who build and look after simple, open-source tools for communities and small organizations**. The name says it: "fellow" as in fellowship. The tools are what the community makes; the community is the heart of the project, and the site should feel like an invitation to join it, not a product catalog.

- **Community first.** Anyone can take part: using the tools, reporting problems, suggesting features, translating, testing, or contributing code. Every tool is built in the open, with its users.
- **Honest about size.** The community is new and small, currently led by its founder. Copy should invite people in ("join us," "help shape this") and never imply a size, member count, or track record it doesn't have.
- **What the community makes.** Every tool can be self-hosted for free, and organizations that don't want to run servers can use a paid hosted version.
- **First audience: small churches in Indonesia.** The first tools are for churches, starting with a liturgist app that helps churches prepare their weekly order of service (liturgy) together: drafting, reviewing, and producing the bulletin and slides.
- **Beyond churches:** tools for other communities will be added over time. Existing example: *bibliosphere*, a lightweight library management system.
- **Code:** https://github.com/brightfellow-net — licensed **Apache-2.0**.
- **Model:** free self-hosting, plus optional paid hosting where each organization gets its own space. Pricing is not decided yet.

## 2. The branding rule (important)

The **umbrella site must stay neutral**, so a future non-church tool never feels out of place.

- Home page headline, tagline, and overall tone speak to "communities and small organizations," not only churches.
- Church-specific language (liturgy, jemaat, pelayanan, warta) lives **inside the church tools section/page**, where it can be warm and specific.
- Structure the site so adding a new product line later means adding one section and one page, with no redesign.

## 3. Audience and the page's job

- **Primary visitor:** a church volunteer, secretary, or pastor in Indonesia, often not technical, deciding whether Brightfellow can help with weekly liturgy.
- **Secondary visitor:** a developer or technically minded volunteer checking whether the tools are trustworthy and self-hostable.
- **The page's job:** in under a minute, the visitor understands what Brightfellow offers, that it's free and open source, and how to get it (self-host or hosted), then contacts us or visits GitHub.

## 4. Site structure

The site must scale to many tools across several audiences. **Tools have flat, permanent URLs; audience categories are collection pages that list them.** A tool can belong to more than one category (e.g. bibliosphere suits churches and communities) without duplicate pages, and re-categorizing a tool never changes its URL.

All URL slugs are in **English**, in every language version.

```
/                        Home (neutral umbrella)
/community/              Get involved: how to take part
/tools/                  All tools, grouped by category
/tools/liturgist/        Liturgist app (product page)
/tools/bibliosphere/     Bibliosphere (product page)
/for/churches/           For churches: intro + list of church tools
/for/communities/        For communities: intro + list of tools
/hosting/                Self-host vs hosted (general)
/open-source/            Open source and security
/privacy/                Privacy (draft)
/contact/                Contact

Planned later (do not build in v1):
/consultation/           Book a consultation session
/donate/                 Support the community with a donation
```

Build these pages:

1. **Home (`/`)** — neutral umbrella: Brightfellow as a community that builds tools, the "free to self-host, or we host it for you" promise, the audience categories (churches first), open-source trust signals, and two calls to action: get involved (`/community/`) and contact.
2. **Community (`/community/`)** — the heart of the site: what the Brightfellow community is and why it exists, and concrete ways to take part, each with a clear next step: use a tool and share feedback, report a problem (GitHub issues), suggest a feature, help translate (Indonesian/English), test new versions, contribute code (link to the GitHub organization and contribution guidelines). Keep it honest: the community is just starting, and early members help shape it. No member counts, avatars, or testimonials.
3. **All tools (`/tools/`)** — every tool, grouped by category, each with a one-line description and status.
4. **Product pages (`/tools/<slug>/`)** — one per tool, from a shared template: the problem it solves, what it does, who it's for (links to its categories), status, self-host vs hosted options for this tool, GitHub link, contact call to action.
    - **Liturgist app (`/tools/liturgist/`):** the problem (weekly liturgy passed around in Word files and chats), what it does, "currently in pilot" status, invitation for early churches to get in touch.
    - **Bibliosphere (`/tools/bibliosphere/`):** lightweight library management; link to its repository.
5. **Category pages (`/for/<audience>/`)** — an intro in the audience's own language and voice, then the list of tools tagged with that category. Church-specific wording (liturgy, pelayanan, warta jemaat) belongs on `/for/churches/` and church tool pages only.
6. **Self-host vs hosted (`/hosting/`)** — general, plain comparison: who runs the server, who handles updates and backups, cost ("free" vs "pricing coming soon"). Product pages add tool-specific details.
7. **Open source (`/open-source/`)** — GitHub link, the Apache-2.0 license in plain words (free to use, change, and self-host, including for commercial use; keep the copyright and NOTICE files; contributors grant users a patent license for their contributions), how to report security issues.
8. **Privacy (`/privacy/`)** — placeholder page with a clear "draft" notice and headings: what data the hosted service stores (minimal: names and roles), where it's hosted, data export and deletion, contact. Do **not** write legal commitments beyond these headings.
9. **Contact (`/contact/`)** — an email link. No backend form needed for v1 (**ASK** which email address to use; use a clearly marked placeholder until then).

**Data-driven tools list.** Keep all tools in one data file (e.g. an Astro content collection or `tools.json`) with: name, slug, one-line description (ID + EN), categories, status (`pilot`, `available`, `coming-soon`), repository URL. Keep categories in a similar file (slug, name, intro text). `/tools/`, the category pages, and the navigation are generated from these files, so adding a tool means adding one entry plus its product page content.

**Navigation.** A "Tools" menu grouped by category, with a link to `/tools/` at the bottom, plus Community, Hosting, Open source, and Contact. Keep it usable on mobile, and leave room in the navigation and footer for Consultation and Donate later without a redesign.

**v1 scope.** Launch with `/for/churches/` and `/for/communities/`, and the two product pages above. Other categories are added later through the data file only.

**Planned future pages (do not build in v1).** Don't add links, "coming soon" placeholders, booking widgets, payment buttons, or third-party scripts for these yet. Just make sure the structure can take them later:

- **Consultation (`/consultation/`):** book a session, e.g. setup help for a church or a self-hosting walkthrough. Likely booking tool: self-hosted Cal.com (open source, no trackers). Likely payment: bank transfer, QRIS, or a local gateway (Midtrans/Xendit).
- **Donate (`/donate/`):** support the community. Likely channels: Open Collective (public, transparent ledger), GitHub Sponsors, and QRIS or a local platform (Saweria/Trakteer) for Indonesian supporters. The page must say plainly what donations pay for.

## 5. Language

- **Bahasa Indonesia is the default language**; English is secondary.
- **ASK:** bilingual (ID + EN with a language switch) or Indonesian only for v1? Default if unanswered: bilingual, Indonesian at `/`, English under `/en/` with the same English slugs (e.g. `/tools/liturgist/` and `/en/tools/liturgist/`).
- Write natural, friendly Indonesian, not literal translations of English marketing copy.

## 6. Content rules and constraints

- **No church names, logos, or photos of real congregations.** The pilot church has not given permission to be named publicly. Say "currently being piloted with a church in Jakarta" at most (**ASK** before naming anyone).
- **No hymn lyrics, Bible text, or worship song content** anywhere, including screenshots and mockups. Use references like "KJ 1:1–3" or placeholder text in any illustration.
- **No invented facts:** no user counts, testimonials, prices, or feature claims beyond what's in this brief. Where something isn't decided, say "coming soon" or leave it out.
- **No blog** for v1. The site must look complete without regularly updated content.
- Copy is plain, specific, and written from the visitor's point of view. Buttons say exactly what happens ("Lihat kode di GitHub", "Hubungi kami").

## 7. Design direction

- **Feel:** warm, trustworthy, calm, and simple, like a helpful friend (the name "bright fellow"), not a flashy startup. It should feel welcoming to a church volunteer and credible to a developer.
- The name suggests light and companionship; use that as the source of one distinctive visual idea, and keep everything else quiet.
- Avoid generic SaaS templates: no identical rounded card grids with soft shadows, no gradient washes, no all-caps eyebrow labels, no fake dashboards or stock photos.
- Avoid overtly religious imagery (crosses, church silhouettes, stained glass) on the umbrella pages. On the church tools page, keep any religious cues subtle and respectful.
- Before coding, propose a short design plan (palette as 4–6 hex values, typefaces and roles, layout sketch, principles) and show it to me. **ASK** for approval before building.

## 8. Technical requirements

- **Stack:** a static site. Default: plain HTML + CSS with minimal JavaScript, or Astro if bilingual routing makes that cleaner. **ASK** if you want to use anything heavier.
- **Hosting target:** static hosting (GitHub Pages or Cloudflare Pages). Include deployment notes in the README.
- **Performance:** fast on mid-range Android phones and slow mobile connections. Self-host fonts or use system fonts; optimize images; no large JS frameworks for static content.
- **Mobile-first and responsive** down to 360px wide.
- **Accessibility:** semantic HTML, visible keyboard focus, sufficient contrast, alt text, respects `prefers-reduced-motion`, and supports light and dark mode.
- **Privacy:** no third-party trackers, no cookies, no external embeds. If analytics are added later, they must be privacy-friendly; leave them out of v1.
- **SEO basics:** titles, meta descriptions, Open Graph tags, `lang` attributes, sitemap.
- **Subdomain plan:** hosted tenants will later live under product-specific subdomains (e.g. `<church>.liturgist.brightfellow.net`) or `app.brightfellow.net`. The landing site itself stays at the apex domain. Don't hard-code anything that assumes otherwise.
- **Repository:** include a README (what it is, how to run locally, how to deploy) and an Apache-2.0 LICENSE file plus a NOTICE file, matching the rest of the organization.

## 9. Open questions (ASK before or during the build)

1. Final product name for the liturgist app (use "Liturgist app" / "Aplikasi Liturgis" as a placeholder).
2. Contact email address.
3. Bilingual or Indonesian-only for v1.
4. Whether to mention the pilot church in any form.
5. Logo: none exists yet. Propose a simple wordmark as part of the design plan.

## 10. Definition of done

- All pages above exist, work on mobile and desktop, and pass a basic accessibility check (e.g. Lighthouse accessibility ≥ 95).
- No placeholder is left unmarked; every placeholder is listed in the README.
- No lyrics, Bible text, real church names, invented numbers, trackers, or cookies anywhere.
- The home page reads as a neutral umbrella; church language appears only on `/for/churches/` and church tool pages.
- `/community/` exists and gives every way of taking part a concrete next step (a link or an email).
- No booking, payment, or donation features, links, or scripts are present in v1.
- Adding a test tool entry to the data file makes it appear in `/tools/`, its category pages, and the navigation without other code changes.
- README explains local development and deployment.