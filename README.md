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

To move a dataset seeded before the hand-picked featured grid (2 Sep 2026)
onto it — creating the "Featured properties" document from the old
"Feature on the home page" flags and then clearing those flags — run
`npm run migrate:featured` (idempotent; `DRY_RUN=1` previews).

**Listing order, featured grid and sold documents** (client requests from the
2 Sep 2026 handover):

- Every listing has a **Display order** number. Numbered listings come first
  (1 on top) on the Listings page, suburb pages and the home page; unnumbered
  ones follow, newest first. The studio's Listings list shows the same order.
- **Featured properties** (pinned under Site settings) picks the home page's
  large hero card and the two smaller cards, drag-to-reorder. Sold picks are
  skipped and empty cells are filled from the current listings in display
  order, so the grid never shows a sold home or a gap.
- Publishing a listing as **Sold** removes its property documents (the button
  reads "Publish & remove documents"; `sanity/actions/clear-documents-on-sold.ts`).
  The public query also hides documents on sold listings as a backstop. The
  uploaded files stay in the Sanity media library.

**Photos and open homes** (client requests, 4 Sep 2026):

- The **Photos** field shows large drag-to-reorder tiles (Sanity's grid
  layout). Many photos can be uploaded at once: multi-select in the file dialog
  behind the array's Upload button, or drag the files onto the field.
- **Open homes** (Details tab) take a start and end date-time each. The public
  query keeps only entries whose end is in the future (`dateTime(end) >
  dateTime(now())` in `lib/sanity/queries.ts` — both sides wrapped, GROQ's
  `now()` is a string), so a finished open home leaves the listing page
  within the 60 s revalidate window with no editing; past entries stay in the
  studio marked "Finished" until deleted. Times display in NZ time via
  `lib/open-homes.ts` (`npm test`).

**Guide order, footer icons and menu labels** (client requests, 5 Sep 2026):

- Every guide has a **Display order** number, like listings: numbered guides
  come first (1 on top) on /resources, unnumbered ones follow oldest first.
  The studio's Guides list shows the same order. `scripts/patch-guide-order.ts`
  applied the client's five-guide order (and cleared a stray `featured` flag
  that the studio reported as "Unknown field found").
- Every profile filled in under **Site settings → Social & profiles** shows as
  a footer icon — Facebook, Instagram, YouTube, Google Business Profile and
  RateMyAgent (`components/site-footer.tsx`).
- The header/footer menu wording is editable under **Site settings → Menu
  labels** (e.g. "Resources" → "Guides"). Only the labels change; the routes
  (`/resources` etc.) are fixed because they're indexed URLs.

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
| **Menu labels (header/footer)** | **`/studio` → Site settings → Menu labels** (defaults: `lib/site.ts` `navLabels`) |
| Per-suburb template sentences, layout | code (`lib/site.ts`, `app/…`) |

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
| `JXM_FORMS_API_KEY` | Overrides the JXM Forms key baked into `lib/leads.ts` (rotate without a code change). |
| `RESEND_API_KEY` | Fallback only: direct lead emails via [resend.com](https://resend.com) when JXM Forms is unreachable. If unset, fallback leads are logged to the server console. |
| `LEAD_FROM_EMAIL` | Verified sender for the fallback, e.g. `Team Toner <hello@teamtoner.co.nz>`. Fallback leads go to the Site settings contact email (`thetoners@arizto.co.nz`). |

**Lead delivery.** Every form (contact, appraisal, listing enquiry) posts to
JXM Forms (`https://jxm-forms.vercel.app/api/submit/teamtoner`, see
`lib/leads.ts`), which stores the lead, spam-checks it and emails it on. The
notification address is **not** in this repo — it's the `teamtoner` client's
notify emails in the JXM Forms dashboard (Settings), set to
`thetoners@arizto.co.nz` on 4 Sep 2026. Submissions the classifier marks as
spam (e.g. gibberish test messages) are stored but not emailed.
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots. Defaults to `https://www.teamtoner.co.nz` — the apex redirects to www on Vercel, so leave it unset in production (or set it to the www URL); a non-www value makes every canonical and sitemap entry a redirect. |
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
