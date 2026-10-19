# Mobile title / description length check — 19 Oct 2026

Run: `node --experimental-strip-types scripts/check-meta-lengths.ts <base-url>`
against the local build (145 sitemap URLs, live CMS content). Flags titles
over 55 characters and descriptions over 150, roughly where phones truncate.

| | Before | After |
| --- | --- | --- |
| Titles over 55 | 18 (worst 68) | 11 (worst 59) |
| Descriptions over 150 | 81 (worst 168) | 9 (worst 167) |

## What changed

- **Listing descriptions (70 pages).** They were cut at 158 characters mid-word
  ("…Lovingly maintained by it"), often dropping the price. Now the blurb is
  trimmed to whole sentences or words so the bed/bath/car line and the price
  always fit inside 150.
- **Listing titles.** When an address already names its street suburb
  ("104 John F Kennedy Drive - Kelvin grove"), the appended area is dropped
  before anything else (68 → 50 characters; 63 → 50 for the Coutts Way listing).
- **Guide titles.** "| Team Toner Palmerston North" becomes "| Team Toner" when
  the longer form passes 55 (63 → 46, 63 → 46, 58 → 41).
- **/suburbs** (168 → 138, now leads with the client's priority areas),
  **/sold** (163 → 138) and the area hub template, e.g.
  /suburbs/palmerston-north (153 → 138).
- **Home page** title and description were already rewritten in Task 1 (52 / 146).

## Left as they are

- Titles of 56–59 characters: seven listing titles that keep the brand suffix,
  and the client-supplied /about (57), /sell (56) and /contact (56). All fit
  the 60-character desktop limit.
- /appraisal description (164): the wording the client asked for on 23 Sep.
  Suggest trimming "Experienced local real estate agents in" if they agree.
- Guide descriptions for /resources/team-toner-selling-guide (167) and
  /resources/the-home-selling-process (164) are written in the studio
  (Guides → description); shorten there.
- Five descriptions 2–5 characters over (152–155): /appraisal/ashhurst,
  /appraisal/manawatu, /appraisal/palmerston-north, /sell, /resources.
