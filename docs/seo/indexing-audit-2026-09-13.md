# Search Console indexing review — 13 September 2026

The supplied `teamtoner.co.nz-Coverage-Drilldown-2026-09-13/Table.csv`
contains 118 URLs marked **Discovered – currently not indexed**. Every URL
uses the old non-www origin. The live site already uses HTTPS www; no current
indexing blocker was found in the HTTP, robots, canonical or internal-link
checks below. This does not establish whether Google has indexed the www pages.

## Evidence

| Check | Live result |
| --- | --- |
| Exported URLs | 118, all `https://teamtoner.co.nz/...` |
| Redirects | All 118 return one permanent 308 redirect to the matching www path |
| Destination responses | All 118 return HTTP 200 |
| Canonical tags | All 118 destinations declare the matching HTTPS www URL |
| Indexing directives | No `noindex` in robots/googlebot meta tags; no X-Robots-Tag headers on destinations |
| Robots file | Publicly accessible, allows `/`, references the www sitemap |
| Sitemap | 123 entries, including all 118 affected paths on www |
| Internal discovery | Homepage plus 33 pages one click away and 84 pages two clicks away |

The adjacent [CSV](./indexing-audit-2026-09-13.csv) records each affected URL,
redirect, destination, canonical, indexing directives, sitemap membership
and shortest link depth. Checks used public HTTP GET requests with four
concurrent workers and parsed server-rendered HTML anchors. The homepage
traversal followed links between the exported pages. This was not a Googlebot
live test or a rendered content-quality assessment.

Google defines this status as a URL it knows about but has not crawled yet.
The export's `1970-01-01` dates should not be treated as actual historical
crawls. The report is consistent with discovery of the old URL set before
Google processed the redirects, but URL Inspection is needed to confirm that.
Do not change the site back to non-www to make the export URLs indexable.
Redirecting URLs are expected to remain outside the index; their destinations
are the indexing targets.

## Repository change

`resolveSiteUrl()` now normalises either production hostname to
`https://www.teamtoner.co.nz`, even when `NEXT_PUBLIC_SITE_URL` contains the old
apex domain or HTTP. It also removes paths, queries and trailing slashes from
configured origins so concatenated sitemap/structured-data URLs stay valid.
Preview and local origins remain configurable. Regression tests cover these
cases. This prevents recurrence of inconsistent domain signals; the currently
deployed sitemap and canonicals were already correct before this change.

## Search Console follow-up

The connected URL Inspection tool returned “You do not own this site, or the
inspected URL is not part of this property” for the www homepage. No sitemap
submission, indexing request or Search Console settings change was made.

Using an account with access to the `teamtoner.co.nz` Domain property or the
`https://www.teamtoner.co.nz/` URL-prefix property:

1. Check the Sitemaps report for `https://www.teamtoner.co.nz/sitemap.xml`.
   Submit it if absent, or resubmit if Google still has the older non-www URL
   set. Check its last-read date and processing status.
2. Inspect the www homepage, `/appraisal`, `/sell`,
   `/suburbs/palmerston-north`, `/suburbs/manawatu`, `/suburbs/feilding` and
   `/suburbs/ashhurst`. Check last crawl, page fetch, indexing permission and
   Google-selected canonical. Run a live test where needed and request
   indexing for these priority pages if they are not indexed and the test passes.
3. Inspect one old non-www URL to confirm Google recognises its redirect.
   Do not request indexing of all 118 redirect sources.
4. Monitor the www pages after Google recrawls. If they remain discovered but
   uncrawled, check Search Console Crawl Stats/host availability and Vercel
   request logs for verified Googlebot failures or throttling before changing
   site content or crawl settings.

Google controls crawl timing and indexing. There is no code change that can
clear this report immediately or guarantee inclusion.

## Sources

- [Google: Page indexing report](https://support.google.com/webmasters/answer/7440203?hl=en)
- [Google: URL Inspection tool](https://support.google.com/webmasters/answer/9012289?hl=en)
