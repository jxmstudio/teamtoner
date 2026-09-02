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
      "The heart of the Manawatū — a vibrant university city with strong buyer demand across family suburbs, city fringe and lifestyle blocks. Team Toner are Arizto's No.1 agents here.",
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
  {
    slug: "highbury",
    name: "Highbury",
    parent: "palmerston-north",
    blurb:
      "A busy western suburb and one of Palmerston North's most active markets — entry-level homes, renovation projects and steady first-home and investor demand.",
    commentary: [
      "Highbury is where a lot of Palmerston North buyers get their start. The housing stock is largely post-war and ex-state, much of it now renovated, and the price bracket keeps first-home buyers and investors competing for the same homes.",
      "Because condition varies so much street to street, comparable-sales evidence matters more here than almost anywhere else in the city — two homes of the same size can be worth quite different money depending on what's been done to them.",
    ],
  },
  {
    slug: "takaro",
    name: "Takaro",
    parent: "palmerston-north",
    blurb:
      "Central, well-connected and consistently in demand — Takaro sits within easy reach of the Square, the Esplanade and the city's western schools.",
    commentary: [
      "Takaro's appeal is position: flat, central and walkable or a short drive to almost everything in Palmerston North, with Takaro Park and the western sports grounds on the doorstep.",
      "The housing is a mix of solid post-war family homes, tidy units and a growing number of renovated properties, which keeps buyer interest broad — first-home buyers, families trading up and investors all shop here.",
    ],
  },
  {
    slug: "westbrook",
    name: "Westbrook",
    parent: "palmerston-north",
    blurb:
      "A tidy pocket off Tremaine Avenue with newer, low-maintenance homes — popular with buyers who want modern living close to the city's northern amenities.",
    commentary: [
      "Westbrook's newer housing stock is its drawcard: warmer, better-insulated homes on manageable sections, which suits downsizers and busy families alike.",
      "Buyers here tend to be comparing build quality and running costs rather than renovation potential, so accurate detail on age, cladding and heating earns its place in the marketing.",
    ],
  },

  /* --- Wider Manawatū towns & villages --- */
  {
    slug: "bunnythorpe",
    name: "Bunnythorpe",
    parent: "manawatu",
    blurb:
      "A small village just north of Palmerston North, surrounded by farmland and lifestyle blocks — village amenities with the city ten minutes away.",
    commentary: [
      "Bunnythorpe suits buyers who want a genuine village and some land without a long commute — Palmerston North is a short drive, and Feilding is closer still.",
      "Properties here range from village sections to working lifestyle blocks, so water supply, shedding and consents are usually part of the conversation well before price is.",
    ],
  },
  {
    slug: "halcombe",
    name: "Halcombe",
    parent: "manawatu",
    blurb:
      "A quiet rural village north-west of Feilding — a settled community, affordable sections and easy access to the wider Manawatū.",
    commentary: [
      "Halcombe is a small, established village where buyers are usually after space, quiet and value rather than proximity to a city. Feilding is the nearest service town.",
      "Sales here turn on reaching the right buyer rather than the biggest audience, which is where a marketing plan with real regional reach makes the difference.",
    ],
  },
  {
    slug: "sanson",
    name: "Sanson",
    parent: "manawatu",
    blurb:
      "A crossroads town where State Highways 1 and 3 meet — handy to Feilding, Palmerston North, Ōhakea and Bulls, with lifestyle blocks in every direction.",
    commentary: [
      "Sanson's position is its strength: buyers get rural living with straightforward access in several directions, which broadens the pool well beyond people who work locally.",
      "Lifestyle and rural holdings dominate around the town, so land use, water and shedding carry real weight in both pricing and marketing.",
    ],
  },
  {
    slug: "linton",
    name: "Linton",
    parent: "manawatu",
    blurb:
      "A rural settlement south of Palmerston North, best known for Linton Military Camp — steady demand from Defence and rural families.",
    commentary: [
      "Linton has a buyer pool most rural settlements don't: Defence personnel posted to the camp, alongside families wanting land within a short run of Palmerston North.",
      "Postings move on their own timetable, so timing and reach matter here — the right buyer is often someone relocating into the region rather than already living in it.",
    ],
  },
  {
    slug: "tokomaru",
    name: "Tokomaru",
    parent: "manawatu",
    blurb:
      "A small village on the southern edge of the Manawatū, framed by the Tararua foothills — space, quiet and a straightforward run into Palmerston North.",
    commentary: [
      "Tokomaru appeals to buyers trading section size and quiet for a slightly longer commute, with Palmerston North to the north and Levin to the south.",
      "Village sections and lifestyle blocks sit side by side, so the marketing needs to be clear about exactly what a property offers — the two attract quite different buyers.",
    ],
  },
  {
    slug: "foxton-beach",
    name: "Foxton Beach",
    parent: "manawatu",
    blurb:
      "A relaxed coastal settlement at the mouth of the Manawatū River — holiday homes, permanent residents and buyers after the beach without the price tag.",
    commentary: [
      "Foxton Beach draws two distinct buyer groups: people buying a permanent home near the coast, and people buying a bach they'll use in summer. They value quite different things, and the marketing should speak to both.",
      "Coastal properties invite specific questions — orientation, shelter, section maintenance and how the home has been looked after — and answering them up front keeps a sale moving.",
    ],
  },
];
