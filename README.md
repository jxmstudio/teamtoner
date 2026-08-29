# Team Toner — teamtoner.co.nz

Marketing & listings website for **Team Toner** (Allan & Karen Toner), an Arizto
real estate team serving Palmerston North, Feilding, Ashhurst and the wider
Manawatū.

Built with **Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui
(Base UI)**. Content is managed in typed files (no CMS). Deploys to **Vercel**.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000  (use: npm run dev -- -p 3100 if 3000 is taken)
npm run build      # production build (also type-checks every route)
npm run start      # serve the production build
```

## Sanity CMS (all site content)

Everything the client needs to touch is editable in an embedded Sanity Studio
at **`/studio`** (schemas in `sanity/schemaTypes/`, read layer in
`lib/data.ts`): **listings, YouTube videos, testimonials, guides, suburbs and
the "Site settings" singleton** (taglines, contact details & phone numbers,
rankings, commission rate, fee pillars, "Why Team Toner" cards, social links,
the site-wide appraisal banner) — plus a **"Page copy"** document for every
page (Home, About, Sell, Appraisal, Contact, Listings, Sold, Suburbs,
Resources, Privacy, Terms) covering headings, intro prose, story paragraphs,
process steps, FAQs and the legal wording.
Site settings deep-merge over the typed defaults in `lib/site.ts` — any field
left empty in the studio falls back to the value shipped in code.
While `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset — or the dataset is empty or
unreachable — the site transparently serves the typed fixtures in
`lib/content/*`, so nothing breaks before the CMS is connected.

The project is **"Team Toner" (`l0i206kw`)** in the `jxm` org, owned by
**web@jxmstudio.com** (Google login). Dataset `production` (public); CORS is
configured for `localhost:3000`, `localhost:3100` and `https://teamtoner.co.nz`
(manage at [sanity.io/manage](https://www.sanity.io/manage)).

Remaining setup:

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` in the
   Vercel project env settings (values in `.env.example`).
2. Invite Allan & Karen as project members (Manage → Members) so they can log
   into `/studio` themselves.

To (re-)import the fixture content (listings, testimonials, guides, suburbs,
site settings) so the studio isn't empty:
`npx sanity login` (Google, web@jxmstudio.com), then `npm run seed:sanity`.
Idempotent — never duplicates or overwrites studio edits.

To bring an already-seeded dataset in line with the suburb-level structure —
creating any missing suburb page and re-tagging listings from area slugs
("palmerston-north", "manawatu") to the suburb their address names — run
`npm run migrate:suburbs`. Also idempotent; existing suburb documents are never
overwritten, so studio edits to blurbs and commentary survive. To preview
without writing, set `DRY_RUN=1` (PowerShell: `$env:DRY_RUN=1;`) before the
command — `sanity exec` drops command-line flags, so it can't be one.

Pages that render CMS content revalidate every 60 s, so studio edits go live
within a minute — no redeploy needed.

## Editing content (for the agency)

Client-facing content is edited in **`/studio`**; the typed files remain as
the pre-CMS fallback and the source for `npm run seed:sanity`.

| What | Where |
| --- | --- |
| **Listings + videos** | **`/studio` → Listings / Videos** (fallback: `lib/content/listings.ts`) |
| **Taglines, contact, phones, stats, fee, socials** | **`/studio` → Site settings** (defaults: `lib/site.ts`) |
| **Testimonials (Google / RateMyAgent)** | **`/studio` → Testimonials** (fallback: `lib/content/testimonials.ts`) |
| **Guides (incl. PDF upload + article pages)** | **`/studio` → Guides** (fallback: `lib/content/guides.ts`) |
| **Suburb pages (blurbs, market commentary)** | **`/studio` → Suburbs** (fallback: `lib/content/suburbs.ts`) |
| **Page headings, prose, FAQs, legal wording** | **`/studio` → Page copy** (defaults: `lib/content/page-copy.ts`) |
| Nav labels, per-suburb template sentences, layout | code (`lib/site.ts`, `app/…`) |

Note: the suburb dropdown on a Listing offers the suburbs defined in
`lib/content/suburbs.ts`; a brand-new suburb page added in the studio gets its
own page automatically, but linking listings to it needs that list updated in
code.

**Add a listing:** in `/studio`, click Listing → new document, fill in the
fields, drag photos in. Set status "Sold" with sold price + date to move it to
the Sold page. Paste a YouTube link in the "YouTube video" field for a video
tour. Videos on the home page live under Video in the studio.

**Add a guide PDF:** in `/studio`, open the guide and upload the PDF to its
"PDF" field (an empty field shows a "coming soon" badge). Adding "Article
sections" publishes the guide as a web page at /resources/<slug>.

Brand colours and fonts are defined once in `app/globals.css` (`:root`) — change
the hex values there to re-skin the whole site.

## Environment variables

Copy `.env.example` → `.env.local` for local dev, and set the same in Vercel.

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Enables lead-form emails via [resend.com](https://resend.com). If unset, leads are logged to the server console only. |
| `LEAD_FROM_EMAIL` | Verified sender, e.g. `Team Toner <hello@teamtoner.co.nz>`. Leads are sent to `thetoners@arizto.co.nz`. |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata (defaults to production). |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id — unset = site runs from fixtures. |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default `production`). |
| `SANITY_API_WRITE_TOKEN` | Local-only, for `npm run seed:sanity`. Never set in Vercel. |

The pre-launch password gate (`proxy.ts` + `/password`, `SITE_PASSWORD*` vars)
was removed at launch — the site is public and robots.txt allows crawling.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. In Vercel: **New Project** → import the repo (framework auto-detected as Next.js).
3. Add the env vars above under **Settings → Environment Variables**.
4. Deploy, then add the domain **teamtoner.co.nz** under **Settings → Domains**
   and point DNS as Vercel instructs.

## Outstanding client items

Search the code for `TODO(client)` — these are placeholders awaiting sign-off:
final tagline, exact homes-sold figure, REAA licence details, social links, and
approved privacy/terms wording. Listings, testimonials and guide PDFs currently
use samples (one real testimonial from marketing collateral is included).

## Project conventions

See `AGENTS.md` — this project uses Next.js 16 + Base UI (not Radix), which have
important API differences (no `asChild`; use the `render` prop and `ButtonLink`).
