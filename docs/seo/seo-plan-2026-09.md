# Team Toner — 3-month SEO plan (Sep–Dec 2026)

Prepared 17 Sep 2026 from the client email threads (Allan & Karen Toner,
thetoners@arizto.co.nz), the 20 Jul proposal call, the 2 Sep handover call and
the current state of this repo (`main` @ fe42137).

## 1. Engagement facts

| Item | Detail |
| --- | --- |
| Retainer | $250/month incl. GST, three months, no contract |
| Month 1 start | 14 Sep 2026 (invoice sent 14 Sep, paid via Stripe, confirmed by Allan 16 Sep) |
| Month windows | M1 14 Sep–13 Oct · M2 14 Oct–13 Nov · M3 14 Nov–13 Dec |
| Client goal | Genuine **seller / appraisal enquiries** from homeowners, not traffic |
| Priority areas | Palmerston North, wider Manawatū, Feilding, **Ashhurst** (re-emphasised 15 Sep) |
| Long-term goal (proposal) | Outrank the Arizto head-office site for local searches such as "Arizto Palmerston North" |
| Must complement | Their Google Business Profile, which they are optimising themselves |
| Reporting | Simple monthly report: work done, visibility change, clicks, enquiries, next priorities. First one due end of M1 (~13 Oct) |
| Search Console | Verified for `https://www.teamtoner.co.nz/`. Owner invite sent to **atoner007@gmail.com** on 16 Sep; Allan's access is still unconfirmed |
| GA4 | **Not installed.** Told the client on 13 Sep it is the first job of the programme |

## 2. What we have already promised the client

These are written commitments in the 13 Sep (Alex) and 16 Sep (Jamie) emails,
which Allan explicitly approved on 16 Sep. They are non-negotiable for M1.

1. Install GA4 and set up appraisal / enquiry **conversion tracking**.
2. Review Search Console indexing and query data now it is collecting.
3. First pass of improvements on the **seller pages and suburb pages, Ashhurst included**, targeting terms like "property appraisal Ashhurst" and "selling a house in Ashhurst", and "new pages" for Ashhurst sellers.
4. A permanent **"Subscribe to Team Toner on YouTube" button under every property video**.
5. First SEO / Search Console report at the end of month 1.
6. From the 2 Sep handover: JXM writes SEO-optimised **Property Insights articles** for Allan's approval (Fathom action item: "Write + send 1st SEO blog").
7. From the 20 Jul proposal: **location pages** (done), **service + location pages** (e.g. "free appraisal Palmerston North" — not done), Search Console-driven pages for high-impression / low-click queries, and a **lead magnet** ("What is my house worth?").

Allan's own checklist from 1 Sep (what he expects the retainer to cover):
areas of the site being optimised · target keywords · GSC + GA4 set up and
monitored · technical SEO, titles/descriptions, headings, internal linking,
local SEO / schema · how progress is measured · a monthly report.

## 3. Where the site stands today (repo audit)

**In place**
- Titles, descriptions and www canonicals on every page; `sitemap.xml` auto-generated; robots allows all. `resolveSiteUrl()` guards the www origin.
- Structured data: `RealEstateAgent` org (with `areaServed` from the suburb list), `WebSite`, `FAQPage` on /sell, /appraisal and every suburb page, `BreadcrumbList`, `ItemList`, `Article` (guides + insights), `HowTo` (guide pages), `VideoObject` (home video only), `SingleFamilyResidence` (listings).
- **21 location pages** under `/suburbs/`: 4 areas (Palmerston North, Feilding, Ashhurst, Manawatū) + 11 Palmerston North suburbs + 6 Manawatū towns. Client-editable blurb + commentary in Sanity.
- Property Insights section with the four fixed categories, hidden until the first article is published (**zero articles today**).
- 9 current + 74 sold listings with suburb tags, sold prices and dates — real local proof we can surface.
- 13 Sep indexing audit (`indexing-audit-2026-09-13.md`): 118 non-www URLs "Discovered – not indexed"; all redirect correctly. Follow-ups in Search Console still outstanding.

**Gaps that matter for seller enquiries**
- No GA4, no conversion events, no phone-click tracking. `components/forms/lead-form.tsx` exposes success via `state.ok`, so a `generate_lead` event is straightforward.
- Area pages are thin. Ashhurst is one blurb + one commentary paragraph. Titles target "X Real Estate", not seller intent.
- Suburb FAQs are a four-question template; nothing Ashhurst- or Feilding-specific.
- No service × location pages. "property appraisal Ashhurst" currently has no page to rank.
- Entity data still blank in code (`TODO(client)` in `lib/site.ts`): Google Business Profile URL, RateMyAgent URL, social URLs, REAA licence numbers. Allan added Google + RateMyAgent links in Site settings on 5 Sep, so verify they are populated in the CMS and flow into `sameAs`.
- `VideoObject` only on the home page; listing videos carry no video markup. No subscribe button (`components/brand/video-embed.tsx`).
- `CONTENT_REVISED` in `app/sitemap.ts` is 2026-08-29; must be bumped with each content release.
- `@next/third-parties` is not installed (needed for `GoogleAnalytics` / `sendGAEvent`).

## 4. Target searches and the page that owns each

Seller-intent first. Each query has exactly one owning URL to avoid cannibalisation.

| Intent | Example queries | Owning page |
| --- | --- | --- |
| Appraisal (per area) | property appraisal Ashhurst · free property appraisal Palmerston North · house valuation Feilding · what's my house worth Manawatū | **New** `/appraisal/{area}` |
| Selling (per area) | selling a house in Ashhurst · sell my house Palmerston North · real estate commission Feilding · best way to sell a house in Manawatū | **New** `/sell/{area}` |
| Agent / area hub | Ashhurst real estate · real estate agents Feilding · Palmerston North real estate agents · Manawatū real estate agents | Existing `/suburbs/{area}` (rewritten) |
| Suburb hub | Hokowhitu real estate · Kelvin Grove houses for sale · etc. | Existing `/suburbs/{suburb}` |
| Appraisal (generic) | free property appraisal · property appraisal near me | `/appraisal` |
| Selling (generic) | sell your home Palmerston North · 2% commission real estate | `/sell` |
| Brand / Arizto | Team Toner · Allan Toner · Karen Toner · Arizto Palmerston North · Arizto Manawatū | `/` and `/about` |
| Informational | how much does it cost to sell a house NZ · preparing your home for sale · Ashhurst property market 2026 | Property Insights articles + guides |

Areas in scope for the new service pages: **palmerston-north, feilding,
ashhurst, manawatu** only. Do not generate service pages for all 21 suburbs;
that is doorway-page territory and the volume isn't there.

## 5. Month-by-month plan

### Month 1 — 14 Sep to 13 Oct: measurement, Search Console, Ashhurst push

**Week of 17 Sep (this week)**
- [ ] Email Allan: confirm he can open the www property with atoner007@gmail.com; ask for the items in §7.
- [ ] Search Console follow-ups from the 13 Sep audit: check the sitemap report for `https://www.teamtoner.co.nz/sitemap.xml`, inspect `/`, `/appraisal`, `/sell`, `/suburbs/palmerston-north`, `/suburbs/manawatu`, `/suburbs/feilding`, `/suburbs/ashhurst`, request indexing where needed. Export the first query report as the baseline.
- [ ] **GA4**: create the property under Allan's Google account (JXM added as Editor) so it stays independent like Search Console. Install with `@next/third-parties` `GoogleAnalytics` in `app/layout.tsx` via `NEXT_PUBLIC_GA_MEASUREMENT_ID`; skip on `/studio`. Link GA4 ↔ Search Console.
- [ ] **Conversion events**: `generate_lead` (params `form_kind` = appraisal | contact | listing-enquiry, `page_path`) fired from `lead-form.tsx` on `state.ok`; `phone_click` on every `tel:` link; `email_click`. Mark `generate_lead` and `phone_click` as key events. Verify with DebugView on production.
- [ ] **YouTube subscribe button** under `VideoEmbed` (listing pages and the home Watch section) using the YouTube URL from Site settings; renders nothing if the URL is empty. Track `youtube_subscribe_click`.

**Weeks of 24 Sep and 1 Oct**
- [ ] **Ashhurst area page rewrite** (`/suburbs/ashhurst`): title/description aimed at "Ashhurst real estate agents", 4–6 commentary paragraphs (village profile, who is buying, property types and section sizes, commute, Team Toner's Ashhurst sales), Ashhurst-specific FAQs, "Recent Team Toner sales in Ashhurst" with sold prices. Same treatment for Feilding, Palmerston North and Manawatū area pages.
- [ ] **Service × location template**: new routes `app/appraisal/[area]/page.tsx` and `app/sell/[area]/page.tsx` with `generateStaticParams` over the four areas, a `localServicePage` Sanity type (intro, proof points, FAQs) with fixtures in `lib/content/`, `FAQPage` + `BreadcrumbList` + `Service` (with `areaServed`) JSON-LD, the appraisal form embedded on the appraisal variant, and sitemap entries. Ship the **four `/appraisal/{area}` pages** in M1, Ashhurst first.
- [ ] **Internal linking pass**: home → four area pages; every suburb page → its area's `/appraisal/{area}`; `/sell` and `/appraisal` → area pages; listing pages → their suburb page and area appraisal page; footer "Areas we sell in" block.
- [ ] **Entity / local**: confirm GBP, RateMyAgent, YouTube, Facebook, Instagram URLs are in Site settings and appear in `sameAs`; confirm the schema `telephone` matches the GBP primary phone; add REAA licence numbers once supplied.
- [ ] **First article** (JXM drafts, Allan approves, published in Selling Advice): "What is my house worth? How a free property appraisal works in Palmerston North & Manawatū". Publishing it also unlocks the Insights menu.
- [ ] Bump `CONTENT_REVISED` in `app/sitemap.ts`; resubmit sitemap.

**By 13 Oct**
- [ ] **Report #1** (one page): work completed; target terms and pages; Search Console impressions / clicks / average position for the target query set and priority pages; indexed-page count; GA4 sessions, `generate_lead` and `phone_click` counts since install; next month's priorities.

### Month 2 — 14 Oct to 13 Nov: sell pages, content, authority

- [ ] Ship the **four `/sell/{area}` pages** on the same template (commission, No Sale No Fee, marketing, process, local proof).
- [ ] **Query mining**: from the first 4–6 weeks of Search Console data, list queries with impressions but low CTR or no dedicated page; rewrite titles/descriptions and add FAQ entries; note candidates for M3 pages.
- [ ] **Two articles**: "Selling a house in Ashhurst: what buyers are looking for in 2026" (Palmerston North & Manawatū) and "Real estate commission in Palmerston North explained: what 2% + GST actually means" (Selling Advice). Both link to the matching `/sell/{area}` and `/appraisal/{area}` pages.
- [ ] **Google Business Profile alignment** (Allan does the clicks, we supply content): services list (Free property appraisal, Selling, Lifestyle & rural), service areas include Feilding and Ashhurst, monthly GBP post linking to a new page, website link to the www URL, review requests using their existing review link.
- [ ] **Citations and links**: Arizto profile → teamtoner.co.nz, RateMyAgent profile, Facebook and YouTube "about" links, Yellow NZ, Neighbourly (Ashhurst and Feilding), Localist, any club or school sponsorships they already have.
- [ ] Enrich the top Palmerston North suburb pages where they have sold evidence (Hokowhitu, Kelvin Grove, Terrace End, Highbury, Takaro per the listing data).
- [ ] Add `VideoObject` markup to listing pages that have a video.
- [ ] **Report #2**.

### Month 3 — 14 Nov to 13 Dec: data-driven pages, lead magnet, handover

- [ ] Build pages for the query gaps identified in M2 (only where a real page is justified).
- [ ] **Lead magnet**: "What is my home worth?" flow. Not an automated valuation (we hold no valuation data); a short address-plus-contact form promising a written appraisal within 48 hours, and a downloadable "Selling in Manawatū" guide gated behind email. Both fire `generate_lead`.
- [ ] Second content pass on `/appraisal/{area}` and `/sell/{area}` using GSC data; refresh FAQs.
- [ ] One more article (Market Updates): a short Palmerston North & Manawatū spring/summer market note using their own sold data.
- [ ] **Report #3 plus 3-month summary**: baseline vs now on impressions, clicks, positions for the target set, indexed pages, leads by source; recommendation on what a month 4+ programme should cover.

## 6. Measurement

Tracked from the first report onward:

- Search Console (www property): impressions, clicks, average position for the target query set in §4; index status of the priority pages; the non-www "discovered" count trending to zero.
- GA4: sessions by source, `generate_lead` by `form_kind` and landing page, `phone_click`, `youtube_subscribe_click`.
- Lead volume from JXM Forms (dashboard) as the ground truth for enquiries.
- Set expectations in every report: a new site typically needs 3–6 months for non-brand terms (as Jamie told Allan on 20 Jul). Brand and Ashhurst-level terms should move sooner.

Do **not** add `AggregateRating` / review schema to the business entity; Google treats self-published business reviews as self-serving and it risks a manual action.

## 7. Questions and inputs needed from Allan & Karen

Send as one email this week:

1. Can you now open the `https://www.teamtoner.co.nz/` property in Search Console with atoner007@gmail.com?
2. GA4: happy for us to create it under atoner007@gmail.com and add web@jxmstudio.com as Editor?
3. Links: YouTube channel URL (for the subscribe button), Google Business Profile share link, RateMyAgent profile, Facebook and Instagram pages. Confirm which are already in Site settings.
4. REAA licence numbers for Allan and Karen (verifiable credential on the About page and in schema).
5. Approve the eight new page URLs (`/appraisal/{area}`, `/sell/{area}` for the four areas) and the three article topics.
6. Ashhurst detail we can state publicly: number of Ashhurst sales, streets or subdivisions you know well, a typical price band you are comfortable quoting.
7. Does the GBP service area list Feilding and Ashhurst, and is the primary phone 027 255 8735 or 06 354 4722? The site's schema must match.

## 8. Technical backlog (repo)

Status 17 Sep 2026: items 1–8 and 10 are implemented in the working tree
(see README "Analytics and conversion tracking" and "Local SEO pages").
Item 9 (VideoObject on listing pages) is deferred: Google requires an upload
date and listings don't record one. Item 11 (lead magnet) is month 3.
Still to do outside the repo: create the GA4 property and set
`NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel, run
`scripts/patch-area-content.ts` against the live dataset, and the Search
Console follow-ups in §5.

| # | Change | Files |
| --- | --- | --- |
| 1 | Install `@next/third-parties`; add `GoogleAnalytics` to the root layout behind `NEXT_PUBLIC_GA_MEASUREMENT_ID`; document in `.env.example` and README | `app/layout.tsx`, `.env.example`, `README.md` |
| 2 | `generate_lead` on form success; `phone_click` / `email_click` on `tel:` and `mailto:` anchors (small client component) | `components/forms/lead-form.tsx`, header/footer/appraisal/contact links |
| 3 | Subscribe button under `VideoEmbed`; read YouTube URL from site config; event on click | `components/brand/video-embed.tsx`, `app/page.tsx`, `app/listings/[slug]/page.tsx` |
| 4 | `localServicePage` schema + fixtures + data accessors | `sanity/schemaTypes/`, `lib/content/local-services.ts`, `lib/content/types.ts`, `lib/data.ts`, `lib/sanity/queries.ts`, `scripts/seed-sanity.ts` |
| 5 | Routes `/appraisal/[area]` and `/sell/[area]` with metadata, breadcrumbs, FAQ + Service JSON-LD, embedded form / CTA | `app/appraisal/[area]/page.tsx`, `app/sell/[area]/page.tsx`, `components/seo/json-ld.tsx` (`ServiceJsonLd`) |
| 6 | Sitemap entries for the new routes; bump `CONTENT_REVISED` | `app/sitemap.ts` |
| 7 | Seller-intent titles/descriptions and richer FAQs for area pages; area-specific FAQ overrides in the suburb schema | `app/suburbs/[slug]/page.tsx`, `sanity/schemaTypes/suburb.ts`, `lib/content/suburbs.ts` |
| 8 | Internal links: footer areas block, suburb → area appraisal, listing → suburb + appraisal | `components/site-footer.tsx`, suburb and listing pages |
| 9 | `VideoObject` on listing pages with a video | `app/listings/[slug]/page.tsx` |
| 10 | Tests for new slug/area helpers (`npm test`) | `lib/*.test.ts` |
| 11 | Lead magnet form (M3) | `components/forms/`, `app/actions.ts`, JXM Forms |

Follow the repo conventions in `AGENTS.md` (Base UI `render` prop, `ButtonLink`,
async `params`) and read `node_modules/next/dist/docs` before touching routing
or metadata.
