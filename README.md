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

## Sanity CMS (listings + videos)

Listings and YouTube videos are client-editable in an embedded Sanity Studio at
**`/studio`** (schemas in `sanity/schemaTypes/`, read layer in `lib/data.ts`).
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

To (re-)import the fixture listings so the studio isn't empty:
`npx sanity login` (Google, web@jxmstudio.com), then `npm run seed:sanity`.
Idempotent — never duplicates or overwrites studio edits.

Pages that render CMS content revalidate every 60 s, so studio edits go live
within a minute — no redeploy needed.

## Editing content (for the agency)

Everything else lives in plain TypeScript files — edit, commit, and Vercel
redeploys automatically.

| What | Where |
| --- | --- |
| **Listings + videos** | **`/studio` (Sanity)** — fixtures in `lib/content/listings.ts` are the pre-CMS fallback |
| Brand facts, contact, stats, tagline, socials, nav | `lib/site.ts` |
| Testimonials (Google / RateMyAgent) | `lib/content/testimonials.ts` |
| Downloadable guides (PDFs) | `lib/content/guides.ts` |
| Suburbs | `lib/content/suburbs.ts` |

**Add a listing:** in `/studio`, click Listing → new document, fill in the
fields, drag photos in. Set status "Sold" with sold price + date to move it to
the Sold page. Paste a YouTube link in the "YouTube video" field for a video
tour. Videos on the home page live under Video in the studio.

**Add a guide PDF:** put the file in `public/guides/`, then set its `pdf` path
in `guides.ts` (empty `pdf` shows a "coming soon" badge).

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
| `SITE_PASSWORD` | Pre-launch gate password. Defaults to `toner123`. |
| `SITE_PASSWORD_ENABLED` | Set to `false` at launch to make the site public. |

## Pre-launch password gate

The site now runs on the client's own domain, so every route is behind a
password until launch. Visitors are redirected to `/password`; entering the
password sets a 30-day cookie and returns them to the page they asked for.

- Password: `toner123` (override with `SITE_PASSWORD`).
- Logic lives in `proxy.ts` (Next 16's renamed middleware) and `app/password/`.
- **To go live:** set `SITE_PASSWORD_ENABLED=false` in Vercel and redeploy.
- Changing `SITE_PASSWORD` invalidates everyone's existing cookie.

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
