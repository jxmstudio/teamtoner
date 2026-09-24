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
      "The city is really a set of suburb markets. Hokowhitu, Kelvin Grove, Terrace End, Highbury, Takaro, Awapuni and Milson each have their own buyer pool and price behaviour, and school zones, section size and the street itself can matter more than the house. That's why we appraise and price suburb by suburb, from the comparable sales that actually apply.",
      "If you're weighing up a sale, start with a free appraisal. Allan and Karen both visit, show you the recent sales your range is built on, and talk through timing and method of sale — with no obligation.",
    ],
    faqs: [
      {
        q: "Which Palmerston North suburbs do Team Toner sell in?",
        a: "All of them — Hokowhitu, Kelvin Grove, Terrace End, Roslyn, West End, Awapuni, Milson, Summerhill / Fitzherbert, Highbury, Takaro and Westbrook — as well as Ashhurst, Feilding and the wider Manawatū.",
      },
      {
        q: "What does it cost to sell a house in Palmerston North with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there's nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "How do I get a free property appraisal in Palmerston North?",
        a: "Book online or call Allan on 027 255 8735 or Karen on 027 214 5700. Both attend, the range is built from recent sales in your suburb, and there's no obligation to list.",
      },
      {
        q: "Who is buying in Palmerston North right now?",
        a: "Local families moving between suburbs, first-home buyers, Massey and UCOL staff, hospital and Defence families, and Wellington buyers trading commute time for section size. The mix varies by suburb, which is why we market each home to the buyers most likely to pay for it.",
      },
      {
        q: "What marketing is included when selling in Palmerston North?",
        a: "Professional property photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner video and social marketing — all with No Upfront Costs.",
      },
    ],
  },
  {
    slug: "feilding",
    name: "Feilding",
    blurb:
      "Award-winning town centre and a tight-knit rural community. Character homes, new subdivisions and lifestyle properties — Feilding continues to attract families and downsizers alike.",
    commentary: [
      "Feilding blends established character housing around the square with newer subdivisions on the town's edges, and it consistently appeals to families and downsizers wanting a genuine town centre on their doorstep.",
      "Buyers come from three directions: families who want a real town with schools, sport and shops within walking distance; downsizers leaving lifestyle blocks for something easier; and Palmerston North buyers who get more house for their money a short drive up the road. Marketing a Feilding home well means reaching all three.",
      "The housing stock is more varied than most towns of its size — villas and bungalows near the centre, post-war family homes, new builds on the edges and lifestyle properties a few minutes out. Two homes a street apart can sit in different price brackets, so we price from the right comparables rather than a town-wide average.",
      "Thinking of selling in Feilding? A free appraisal from Allan and Karen gives you an evidence-based range from recent Feilding sales, with no obligation to list.",
    ],
    faqs: [
      {
        q: "Do Team Toner sell houses in Feilding?",
        a: "Yes. Allan & Karen Toner sell in Feilding and the surrounding Manawatū towns — Halcombe, Sanson, Bunnythorpe and the lifestyle blocks between them — as well as across Palmerston North.",
      },
      {
        q: "What does it cost to sell a house in Feilding with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Marketing is included. T's and C's apply.",
      },
      {
        q: "How do I get a free property appraisal in Feilding?",
        a: "Book online or call Allan on 027 255 8735 or Karen on 027 214 5700. Both visit, the range is built from recent Feilding sales, and there's no obligation.",
      },
      {
        q: "Who buys in Feilding?",
        a: "Families wanting a genuine town centre, downsizers leaving lifestyle blocks, and Palmerston North buyers looking for more house for their money. Character homes and lifestyle properties each draw their own buyers, and we market to them specifically.",
      },
    ],
  },
  {
    slug: "ashhurst",
    name: "Ashhurst",
    blurb:
      "A friendly village on the doorstep of the Manawatū Gorge and Te Āpiti wind farm. Popular with commuters wanting space, community and easy access to Palmerston North.",
    commentary: [
      "Ashhurst suits buyers who want village life and a bigger section without giving up an easy run into Palmerston North. Sections here are typically generous, and outdoor access is a genuine selling point.",
      "The village sits at the mouth of the Manawatū Gorge, with the Te Āpiti walking tracks, the river and the Pohangina Valley on its doorstep and Palmerston North about fifteen minutes away. That combination — space, community and a workable commute — is what brings buyers here, and it's what a good Ashhurst campaign leads with.",
      "Ashhurst homes range from older village cottages and 1970s family homes on big sections to newer builds on the eastern edge and lifestyle properties on the roads out to Pohangina. Section size, garaging, sun and shelter from the Gorge wind all move the price, so we appraise from Ashhurst comparables rather than a Palmerston North formula.",
      "Team Toner sell in Ashhurst regularly — you'll find recent sales below. If you're thinking about selling, a free appraisal from Allan and Karen gives you an honest range built from those sales, with no obligation to list.",
    ],
    faqs: [
      {
        q: "Do Team Toner sell houses in Ashhurst?",
        a: "Yes. Allan & Karen Toner sell in Ashhurst regularly, alongside Palmerston North, Feilding and the wider Manawatū. Recent Ashhurst sales are listed on this page.",
      },
      {
        q: "What does it cost to sell a house in Ashhurst with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included. T's and C's apply.",
      },
      {
        q: "How do I get a free property appraisal in Ashhurst?",
        a: "Book online or call Allan on 027 255 8735 or Karen on 027 214 5700. Both visit your home, the range is built from recent Ashhurst sales, and there's no obligation.",
      },
      {
        q: "Who buys in Ashhurst?",
        a: "Palmerston North families looking for a bigger section and a village community, people relocating for Massey, Linton, the hospital and Defence roles, and locals moving within the village. Lifestyle buyers look to the roads out towards Pohangina.",
      },
      {
        q: "How far is Ashhurst from Palmerston North?",
        a: "About 15 kilometres east of the city centre — roughly a fifteen-minute drive along Napier Road — which is why so many Palmerston North workers choose to live here.",
      },
    ],
  },
  {
    slug: "manawatu",
    name: "Manawatū",
    blurb:
      "Lifestyle blocks, rural holdings and small-town living across the wider Manawatū district. Local knowledge matters out here — and it's exactly where Team Toner shine.",
    commentary: [
      "Rural and lifestyle sales turn on details a city-only agent can miss: water supply, effluent and consents, shedding, soil type and realistic commute times. We price and market these properties on the evidence.",
      "The district takes in Feilding and Ashhurst, the villages of Bunnythorpe, Halcombe, Sanson, Linton and Tokomaru, the coast at Foxton Beach and the farmland in between. Each has its own buyer pool: commuters wanting space near the city, lifestyle buyers after a few hectares, and locals moving within their own town.",
      "Buyers for Manawatū properties come from Palmerston North, Wellington and further afield as often as from next door, so marketing reach matters — and aerial photography earns its keep on land. Our marketing package is included with No Upfront Costs.",
      "If you're considering selling a home, lifestyle block or rural property in the Manawatū, a free appraisal from Allan and Karen gives you an evidence-based range and honest advice on timing, with no obligation.",
    ],
    faqs: [
      {
        q: "Which Manawatū towns do Team Toner sell in?",
        a: "Feilding, Ashhurst, Bunnythorpe, Halcombe, Sanson, Linton, Tokomaru, Foxton and Foxton Beach, and the rural districts between them — as well as every Palmerston North suburb.",
      },
      {
        q: "Do you sell lifestyle blocks and rural properties?",
        a: "Yes. Lifestyle and rural properties across the Manawatū are a regular part of our work, appraised and marketed on their land, services and buildings as well as the house.",
      },
      {
        q: "What does it cost to sell a property in the Manawatū with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Marketing, including aerial photography, is included. T's and C's apply.",
      },
      {
        q: "How do I get a free appraisal for a rural property?",
        a: "Book online or call Allan on 027 255 8735 or Karen on 027 214 5700. Anything you have on water, effluent, consents and fencing helps, but nothing is required.",
      },
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
