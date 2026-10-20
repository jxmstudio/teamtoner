# Team Toner — Month 2 SEO summary (20 Oct 2026)

Month 2 runs 14 Oct – 13 Nov 2026. This covers the Claude Code brief, Tasks
1–6, against the client's 16 Oct priorities (Kelvin Grove, Milson, Ashhurst,
Feilding, Takaro, West End, then Palmerston North; nothing for Highbury or
Sanson).

## Status

| Task | Commit | Status |
| --- | --- | --- |
| 1 Homepage snippet for "arizto palmerston north" | `c461516` | Done; title/description editable in Studio |
| 2 Priority suburb pages + Feilding | `cbf003c` | Done; copy seeded to Studio 20 Oct, flagged as draft |
| 3 GA4 events and key conversions | `4ef6195` | Done in code; key events are a human step |
| 4 Mobile title/description check | `7a53d2a` | Done; 18 → 11 long titles, 81 → 9 long descriptions |
| 5 Property Insights articles | `54e4c2b` | Two unpublished drafts seeded 20 Oct |
| 6 Internal links and schema pass | `03637f0` | Done; checkers pass on every page |

Code is committed on `main`. Sanity was seeded on 20 Oct (all five scripts,
run in this order: `patch-month2-areas`, `patch-area-content`,
`patch-home-seo`, `patch-appraisal-seo`, `seed-insight-drafts`).

### What is live now vs after the deploy

The production site reads the CMS, so the seeded copy is **already live**:
the longer commentary and local FAQs on `/suburbs/feilding`, `/suburbs/kelvin-grove`,
`/suburbs/milson`, `/suburbs/takaro` and `/suburbs/west-end`; the Month 1
commentary on `/suburbs/palmerston-north` and `/suburbs/manawatu` (its script
had never been run); and the fuller Feilding copy on `/appraisal/feilding` and
`/sell/feilding`.

Everything else waits for the push and deploy: the 8 new routes, the new
titles and descriptions, the GA4 event names, the JSON-LD fixes, the homepage
appraisal row, the footer and `/appraisal` area links, and the sitemap.

Until the deploy, Studio shows an "Unknown field" notice on the seeded suburb
and area-page documents (the new "Draft copy" tick box and "Google
description" field are not in the deployed schema yet). Don't remove them;
the notice goes away on deploy.

## URLs to submit for reindexing (after the deploy)

New pages (8):

```
https://www.teamtoner.co.nz/appraisal/kelvin-grove
https://www.teamtoner.co.nz/sell/kelvin-grove
https://www.teamtoner.co.nz/appraisal/milson
https://www.teamtoner.co.nz/sell/milson
https://www.teamtoner.co.nz/appraisal/takaro
https://www.teamtoner.co.nz/sell/takaro
https://www.teamtoner.co.nz/appraisal/west-end
https://www.teamtoner.co.nz/sell/west-end
```

Changed pages, priority order (12):

```
https://www.teamtoner.co.nz/
https://www.teamtoner.co.nz/suburbs/feilding
https://www.teamtoner.co.nz/appraisal/feilding
https://www.teamtoner.co.nz/sell/feilding
https://www.teamtoner.co.nz/suburbs/kelvin-grove
https://www.teamtoner.co.nz/suburbs/milson
https://www.teamtoner.co.nz/suburbs/takaro
https://www.teamtoner.co.nz/suburbs/west-end
https://www.teamtoner.co.nz/appraisal
https://www.teamtoner.co.nz/suburbs
https://www.teamtoner.co.nz/sold
https://www.teamtoner.co.nz/suburbs/palmerston-north
```

Changed, lower priority (sitemap pickup is fine): `/suburbs/manawatu`,
`/suburbs/ashhurst`, the other six `/appraisal/*` and `/sell/*` area pages
(cross-links and Month 1 copy), the three guide pages with shortened titles
(`/resources/methods-of-sale`, `/resources/understanding-offers-and-conditions`,
`/resources/preparing-your-home-for-sale`), and every listing page (shorter
descriptions, fixed JSON-LD image URLs).

Once the articles are published: `/insights`, `/insights/category/selling-advice`,
`/insights/what-is-my-house-worth-palmerston-north`,
`/insights/selling-a-house-in-ashhurst`.

## GA4 events

Five events, all with `page_path`; full detail in
[docs/analytics-events.md](../analytics-events.md). Mark all five as key
events in GA4.

| Event | Fires on |
| --- | --- |
| `appraisal_form_submit` | appraisal request delivered (`/appraisal` and every `/appraisal/<area>`) |
| `contact_form_submit` | contact message or listing enquiry delivered (`form_kind` = contact / enquiry) |
| `phone_click` | every `tel:` link |
| `email_click` | every `mailto:` link |
| `youtube_subscribe_click` | the YouTube subscribe button |

Form events fire only after the server confirms delivery and never for
honeypot spam. Nothing loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset.
Production has loaded `G-16VMEX23C5` since early October; Month 1's
`generate_lead` stops receiving hits after the deploy.

## Draft articles (Studio → Property Insights)

Both are unpublished drafts with no Published date, so Studio will not
publish them until a date is set. Set the date, add a cover photo, publish.

1. **What is my house worth? How a free property appraisal works in Palmerston
   North & Manawatū** — Selling Advice. The 19 Oct email draft, with one
   change: Highbury → West End in the suburb list. Its summary is 169
   characters; trim to ~150 if a shorter Google snippet is wanted.
2. **Selling a house in Ashhurst: what buyers are paying and how to prepare** —
   Selling Advice, 818 words. No sale prices; links to the recent Ashhurst
   sales (`/suburbs/ashhurst#recent-sales`), `/appraisal/ashhurst` and
   `/sell/ashhurst`.

## Studio documents for Allan & Karen to review

Each is ticked "Draft copy — awaiting Allan & Karen's review"; untick once read.

- Suburbs: Feilding, Kelvin Grove, Milson, Takaro, West End (commentary,
  Local FAQs, Google description).
- Area service pages: Appraisal and Selling for each of Feilding, Kelvin
  Grove, Milson, Takaro, West End (10 documents).
- Page copy → Home page: Google title, Google description, appraisal links
  label.
- Property Insights: the two drafts above.
- Optional: Guides → shorten the descriptions of "Team Toner selling guide"
  (167 chars) and "The home selling process" (164).

## Not completed, and why

- **16 Oct action plan.** Allan asked for a short plan with order of work,
  costs and timeframes. Needs a human reply; nothing has been sent.
- **19 Oct email draft.** Still says Highbury in the Article 1 suburb list;
  change to West End before sending so the approved text matches the draft
  in Studio.
- **GA4 property and admin invite.** `G-16VMEX23C5` is live on production,
  but no email shows Allan being invited. Confirm it is the property he will
  own, send the Administrator invite, then mark the key events.
- **"Booked appraisals" tracking** (16 Oct email). A booking happens after
  the enquiry, off the website, so it can't be a site event. Suggest a manual
  tally per month, or offline conversion import later.
- **Mobile click-through drop.** Only the in-repo part (title/description
  length) was possible without Search Console access. Left as they are:
  the client-supplied `/about`, `/sell` and `/contact` titles (56–57 chars),
  the `/appraisal` description Allan requested (164), seven listing titles of
  56–59 chars.
- **Google Business Profile** (services, service areas, monthly post),
  **reindexing** and **Report 2** (~13 Nov) are human steps.

## Checks to re-run after the deploy

```bash
node --experimental-strip-types scripts/check-meta-lengths.ts https://www.teamtoner.co.nz
node --experimental-strip-types scripts/validate-jsonld.ts https://www.teamtoner.co.nz
node --experimental-strip-types scripts/check-internal-links.ts https://www.teamtoner.co.nz
```
