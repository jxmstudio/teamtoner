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

## Editing content (for the agency)

All site content lives in plain TypeScript files — edit, commit, and Vercel
redeploys automatically. No database, no CMS login.

| What | File |
| --- | --- |
| Brand facts, contact, stats, tagline, socials, nav | `lib/site.ts` |
| Listings (for sale / under offer / **sold**) | `lib/content/listings.ts` |
| Testimonials (Google / RateMyAgent) | `lib/content/testimonials.ts` |
| Downloadable guides (PDFs) | `lib/content/guides.ts` |
| Suburbs | `lib/content/suburbs.ts` |

**Add a listing:** copy an entry in `listings.ts`, fill in the fields, and drop
photos into `public/listings/<address>/` then reference them in `images: []`.
Set `status: "sold"` with `soldPrice` + `soldDate` to move it to the Sold page.

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
