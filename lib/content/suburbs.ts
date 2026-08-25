import type { Suburb } from "./types";

/**
 * Areas Team Toner service (confirmed by the client).
 *
 * Top-level entries (no `parent`) are the four area cards on /suburbs. Entries
 * with `parent: "palmerston-north"` are the individual Palmerston North
 * suburbs the client asked for — each gets its own indexable page at
 * /suburbs/<slug> carrying local information, current listings, recent Team
 * Toner sales, market commentary, a testimonial and an appraisal CTA.
 *
 * Agency: edit blurbs/commentary/hero images here. Adding a suburb to this
 * array is all that's needed — the page, sitemap entry and internal links
 * follow automatically.
 */
export const suburbs: Suburb[] = [
  {
    slug: "palmerston-north",
    name: "Palmerston North",
    blurb:
      "The heart of the Manawatū — a vibrant university city with strong buyer demand across family suburbs, city fringe and lifestyle blocks. Team Toner are the No.1 Arizto team here.",
    commentary: [
      "Palmerston North draws buyers from across the lower North Island — students and staff at Massey and UCOL, Defence and health-sector families, and Wellington movers trading commute time for section size.",
      "That breadth of demand is why presentation and reach matter here. A well-marketed home in the right pocket regularly attracts buyers who were not originally looking in that street.",
    ],
  },
  {
    slug: "feilding",
    name: "Feilding",
    blurb:
      "Award-winning town centre and a tight-knit rural community. Character homes, new subdivisions and lifestyle properties — Feilding continues to attract families and downsizers alike.",
    commentary: [
      "Feilding blends established character housing around the square with newer subdivisions on the town's edges, and it consistently appeals to families and downsizers wanting a genuine town centre on their doorstep.",
    ],
  },
  {
    slug: "ashhurst",
    name: "Ashhurst",
    blurb:
      "A friendly village on the doorstep of the Manawatū Gorge and Te Āpiti wind farm. Popular with commuters wanting space, community and easy access to Palmerston North.",
    commentary: [
      "Ashhurst suits buyers who want village life and a bigger section without giving up an easy run into Palmerston North. Sections here are typically generous, and outdoor access is a genuine selling point.",
    ],
  },
  {
    slug: "manawatu",
    name: "Manawatū",
    blurb:
      "Lifestyle blocks, rural holdings and small-town living across the wider Manawatū district. Local knowledge matters out here — and it's exactly where Team Toner shine.",
    commentary: [
      "Rural and lifestyle sales turn on details a city-only agent can miss: water supply, effluent and consents, shedding, soil type and realistic commute times. We price and market these properties on the evidence.",
    ],
  },

  /* --- Palmerston North suburbs --- */
  {
    slug: "hokowhitu",
    name: "Hokowhitu",
    parent: "palmerston-north",
    blurb:
      "One of Palmerston North's most sought-after addresses — leafy streets, the lagoon and river loop, and strong, sustained family demand.",
    commentary: [
      "Hokowhitu covers everything from post-war family homes on generous sections to substantial modern builds near the lagoon. School zoning and proximity to the river pathways keep competition strong.",
      "Buyers here are typically well-researched and move quickly on well-presented homes, which makes photography, first-week reach and disciplined buyer follow-up especially worthwhile.",
    ],
  },
  {
    slug: "kelvin-grove",
    name: "Kelvin Grove",
    parent: "palmerston-north",
    blurb:
      "A popular northern suburb mixing established family homes with newer subdivisions — consistently strong first-home and family buyer interest.",
    commentary: [
      "Kelvin Grove offers some of the city's best value for family living, with easy access to schools, shops and the northern arterial routes.",
      "Newer subdivisions sit alongside established streets, so accurate comparable-sales evidence matters — two homes a block apart can sit in quite different price brackets.",
    ],
  },
  {
    slug: "terrace-end",
    name: "Terrace End",
    parent: "palmerston-north",
    blurb:
      "Close to the city centre with character homes, handy shops and reliable rental and first-home demand.",
    commentary: [
      "Terrace End's appeal is convenience — walkable to the Square, the hospital and Terrace End shops — which supports both owner-occupier and investor interest.",
      "Character housing dominates, so condition, insulation and any renovation work carry real weight with buyers.",
    ],
  },
  {
    slug: "roslyn",
    name: "Roslyn",
    parent: "palmerston-north",
    blurb:
      "An established, well-connected suburb with solid family homes and steady buyer demand across price brackets.",
    commentary: [
      "Roslyn is a dependable performer: central enough for convenience, with a good spread of family homes and entry-level options that keep buyer numbers healthy through the year.",
    ],
  },
  {
    slug: "west-end",
    name: "West End",
    parent: "palmerston-north",
    blurb:
      "Character bungalows and villas within walking distance of the Square — one of the city's most distinctive streetscapes.",
    commentary: [
      "West End is character-home territory, and buyers pay for the genuine article: original features, sympathetic renovation and a section that suits the home.",
      "Its walkability to the Square, Victoria Esplanade and the hospital keeps demand broad across families, professionals and downsizers.",
    ],
  },
  {
    slug: "awapuni",
    name: "Awapuni",
    parent: "palmerston-north",
    blurb:
      "A well-established western suburb offering good value family homes, parks and easy access across the city.",
    commentary: [
      "Awapuni is a strong first-home and family market with a mix of post-war and more recent housing, plus handy access to the racecourse reserve and the western arterial routes.",
    ],
  },
  {
    slug: "milson",
    name: "Milson",
    parent: "palmerston-north",
    blurb:
      "A tidy, settled northern suburb popular with families, downsizers and buyers wanting a low-maintenance home.",
    commentary: [
      "Milson attracts buyers after a straightforward, well-kept home close to the airport, schools and the northern retail centres. Presentation and sensible pricing do the heavy lifting here.",
    ],
  },
  {
    // Slug stays "summerhill" so the existing /suburbs/summerhill URL keeps
    // working; only the display name matches Allan's system.
    slug: "summerhill",
    name: "Summerhill / Fitzherbert",
    parent: "palmerston-north",
    blurb:
      "An elevated, modern hillside suburb known for outlook, newer homes and strong family appeal.",
    commentary: [
      "Summerhill's elevation and outlook set it apart, and its newer housing stock appeals to families wanting a modern home without leaving the city.",
      "Views, sun and indoor–outdoor flow are the features buyers ask about first — worth capturing properly in the marketing.",
    ],
  },
];
