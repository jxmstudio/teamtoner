import type { LocalServicePage } from "../local-services";

/**
 * Default copy for the service × location pages. Each entry has a CMS twin
 * ("Area service pages" in the studio) that is deep-merged over it, so the
 * client can rewrite any field and an empty field falls back to this text.
 *
 * Copy rules: no market figures we don't hold (no medians, no days-on-market);
 * write "2% + GST" and ranking "*"s literally — <FeeText> links them; sold and
 * current listing counts are rendered from the listing data, never typed here.
 */
export const localServicePages: LocalServicePage[] = [
  /* ---------------------------------------------------------------- Ashhurst */
  {
    service: "appraisal",
    area: "ashhurst",
    description:
      "Free, no-obligation property appraisal in Ashhurst from Allan & Karen Toner. An honest price range built from recent Ashhurst sales, plus advice on timing.",
    headline: "Free property appraisal in Ashhurst",
    intro:
      "Thinking about selling in Ashhurst? Allan & Karen Toner will visit your home, look at recent Ashhurst sales and give you an honest, evidence-based price range — free, and with no obligation.",
    whyTitle: "Why get your Ashhurst appraisal from Team Toner",
    commentary: [
      "Ashhurst is a village market, and it prices like one. Section size, garaging, sun, the state of the drive and how a home handles the wind off the Gorge all move the number in ways a city-only comparison misses. We sell here regularly, so our appraisal starts from what Ashhurst buyers have actually paid for homes like yours.",
      "Most of our Ashhurst appraisals are for people weighing up a move rather than ready to list. That's the right time to ask. A realistic range now lets you plan the timing, decide whether any work is worth doing before you go to market, and avoid the trap of an inflated figure designed to win a listing.",
      "Both of us come to every appraisal. You get two experienced agents looking at the same property, agreeing a range they're prepared to stand behind, and explaining the comparable sales that produced it. If we think a different method of sale or a later date would get you more, we'll say so.",
    ],
    pointsTitle: "What your Ashhurst appraisal includes",
    points: [
      "A free, no-obligation visit from Allan and Karen — not one agent and an assistant",
      "A price range backed by recent Ashhurst and Manawatū sales, with the evidence shown",
      "Straight advice on presentation, timing and method of sale for an Ashhurst home",
      "How a 2% + GST commission with No Upfront Costs and No Sale — No Fee would apply to you",
      "No mailing list, no follow-up pressure — the appraisal is yours to use however you like",
    ],
    faqs: [
      {
        q: "How much is a property appraisal in Ashhurst?",
        a: "Nothing. A Team Toner appraisal is free and carries no obligation to list. If you do sell with us later there are No Upfront Costs and a 2% + GST commission that is only payable when your property sells.",
      },
      {
        q: "What do you base an Ashhurst appraisal on?",
        a: "Recent comparable Ashhurst sales first, then the wider Manawatū where Ashhurst evidence is thin, adjusted for your section, home, condition and position. We show you the sales we used rather than just a figure.",
      },
      {
        q: "How long does an Ashhurst appraisal take?",
        a: "Allow about 45 minutes at the property. We look through the home and section, talk through your plans, and follow up with the written range and comparable sales.",
      },
      {
        q: "Can you appraise a lifestyle block or bare section near Ashhurst?",
        a: "Yes. We regularly appraise lifestyle properties and sections around Ashhurst, Pohangina and the Manawatū. Rural appraisals look at water, access, services and consents as well as the house.",
      },
      {
        q: "Is an appraisal the same as a registered valuation?",
        a: "No. An appraisal is a licensed salesperson's evidence-based estimate of the price your home should achieve, used to guide your decision to sell. A registered valuation is a paid, formal report from a registered valuer, usually for a lender.",
      },
    ],
  },
  {
    service: "sell",
    area: "ashhurst",
    description:
      "Selling a house in Ashhurst? Two agents who sell here, premium marketing, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    headline: "Selling a house in Ashhurst",
    intro:
      "Two experienced agents who sell in Ashhurst, premium marketing that reaches buyers beyond the village, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in Ashhurst",
    commentary: [
      "Ashhurst buyers come from two directions: locals moving within the village, and Palmerston North and out-of-town families who want a bigger section, a real community and a commute they can live with. Marketing that only reaches one of those groups leaves money on the table, so every Ashhurst campaign we run is built to be found by both.",
      "Presentation matters more here than sellers expect. Section, shedding, outdoor living and the approach to the house are what Ashhurst buyers photograph on their phones at an open home. We'll tell you which jobs are worth doing before you list and which aren't, and our marketing package — professional and aerial photography, premium portal placement, signage, video and social — is included with No Upfront Costs.",
      "Method of sale is a decision, not a default. Depending on your home, your timeframe and the buyer interest we expect, we'll recommend auction, deadline sale, negotiation or an asking price, and explain why. Allan and Karen both work every campaign from the first open home to settlement.",
    ],
    pointsTitle: "Selling in Ashhurst with Team Toner",
    points: [
      "Allan & Karen personally — strategy, open homes, buyer follow-up and negotiation",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A pricing strategy built from recent Ashhurst and Manawatū sales, not a guess",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
      "Honest feedback after every open home so you always know where the campaign stands",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Ashhurst with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs — your marketing is included — and No Sale — No Fee, so you only pay when your home sells. T's and C's apply.",
      },
      {
        q: "Who buys in Ashhurst?",
        a: "A mix of families and couples from Palmerston North looking for section and community, people relocating for Massey, Linton, the hospital and Defence roles, and locals moving within the village. Our marketing reaches all of them.",
      },
      {
        q: "What is the best method of sale for an Ashhurst home?",
        a: "It depends on the property and the level of buyer competition we expect. We'll recommend auction, deadline sale, negotiation or an asking price for your specific home and explain the reasoning before you decide.",
      },
      {
        q: "Should I renovate before selling in Ashhurst?",
        a: "Usually only the low-cost, high-impact work: decluttering, cleaning, tidying the section and small repairs. We'll walk through your home with you and prioritise what buyers here actually pay for.",
      },
      {
        q: "How do I start?",
        a: "Book a free appraisal. Allan and Karen will visit, give you an evidence-based price range and talk through timing and method of sale. There's no obligation to list.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Feilding */
  {
    service: "appraisal",
    area: "feilding",
    description:
      "Free property appraisal in Feilding from Allan & Karen Toner: an evidence-based price range from recent Feilding sales, with no obligation to list.",
    headline: "Free property appraisal in Feilding",
    intro:
      "Find out what your Feilding home could sell for in today's market. Allan & Karen Toner give you an evidence-based price range from recent Feilding sales — free, with no obligation.",
    whyTitle: "Why get your Feilding appraisal from Team Toner",
    commentary: [
      "Feilding's housing is more varied than most towns its size: character villas and bungalows around the square, post-war family homes, newer subdivisions on the edges and lifestyle properties a few minutes out. Two homes a street apart can sit in different price brackets, so a Feilding appraisal has to be built from the right comparables, not a town-wide average.",
      "We sell in Feilding and the surrounding Manawatū towns, and we bring that sales evidence to your kitchen table. You'll see the recent sales that support the range, what those homes had that yours does or doesn't, and what that means for price and timing.",
      "There's no obligation. Many Feilding owners ask us for an appraisal a year before they plan to sell, simply to know where they stand and what would be worth doing in the meantime. Both Allan and Karen attend every appraisal.",
    ],
    pointsTitle: "What your Feilding appraisal includes",
    points: [
      "A free, no-obligation visit from Allan and Karen",
      "A price range supported by recent Feilding and Manawatū sales, with the evidence shown",
      "Honest advice on presentation, method of sale and timing for the Feilding market",
      "A clear explanation of our 2% + GST commission, No Upfront Costs and No Sale — No Fee",
      "No pressure to list and no mailing list",
    ],
    faqs: [
      {
        q: "Is a Feilding property appraisal free?",
        a: "Yes — free and without obligation. If you later sell with Team Toner there are No Upfront Costs, and our 2% + GST commission is only payable when the property sells.",
      },
      {
        q: "Do you appraise character homes and lifestyle properties in Feilding?",
        a: "Yes. Feilding's older character homes and the lifestyle blocks around Halcombe, Sanson and Bunnythorpe are a regular part of our work, and each is appraised on its own comparables.",
      },
      {
        q: "How accurate is a property appraisal?",
        a: "An appraisal is an evidence-based range, not a guarantee. We base it on recent comparable sales and current buyer demand, show you the evidence, and revisit it with you if the market moves before you list.",
      },
      {
        q: "What should I have ready for the appraisal?",
        a: "Nothing is required. If you have your title, rates notice, any building or renovation records and a rough idea of your timeframe, they help us give you a sharper range.",
      },
    ],
  },
  {
    service: "sell",
    area: "feilding",
    description:
      "Sell your Feilding home with Team Toner: two experienced agents, marketing across the Manawatū, and a 2% + GST commission with No Upfront Costs.",
    headline: "Selling a house in Feilding",
    intro:
      "Sell your Feilding home with two experienced agents, premium marketing across the Manawatū and beyond, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in Feilding",
    commentary: [
      "Feilding attracts families who want a genuine town centre, downsizers leaving lifestyle blocks, and Palmerston North buyers who get more house for their money a short drive up the road. A good Feilding campaign speaks to all three, and our marketing is built to be seen well beyond the town.",
      "Character homes and lifestyle properties need to be sold on their strengths — the details that make them different from a new build. We photograph and describe them properly, price them from the right comparables and qualify buyers early so open homes are productive rather than busy.",
      "You get both of us throughout. Allan and Karen run the strategy, the open homes, the buyer follow-up and the negotiation personally, and we report back honestly after every open home so you always know where things stand.",
    ],
    pointsTitle: "Selling in Feilding with Team Toner",
    points: [
      "Allan & Karen personally, from strategy to settlement",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A price and method of sale chosen for your home, explained with the evidence",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
      "Experience with character homes, new builds and lifestyle properties across the Manawatū district",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Feilding with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there is nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "How long does it take to sell a house in Feilding?",
        a: "It depends on the property, the price and the method of sale. A well-presented, correctly priced Feilding home with a strong campaign typically attracts its buyers in the first weeks of marketing; we'll set expectations for your home at the appraisal.",
      },
      {
        q: "Do you sell lifestyle blocks around Feilding?",
        a: "Yes. Lifestyle and rural properties around Feilding, Halcombe, Sanson and Bunnythorpe are a regular part of our work, marketed to the buyers who specifically want land.",
      },
      {
        q: "Where do I start?",
        a: "With a free appraisal. Allan and Karen will visit, give you an evidence-based range and talk through timing and method of sale — with no obligation to list.",
      },
    ],
  },

  /* ------------------------------------------------------- Palmerston North */
  {
    service: "appraisal",
    area: "palmerston-north",
    description:
      "Free property appraisal in Palmerston North from Arizto's No.1 agents. A price range built from recent sales in your suburb, with no obligation to list.",
    headline: "Free property appraisal in Palmerston North",
    intro:
      "What could your Palmerston North home sell for? Allan & Karen Toner — Arizto's No.1 agents in Palmerston North & Manawatū* — give you a free, evidence-based appraisal with no obligation.",
    whyTitle: "Why get your Palmerston North appraisal from Team Toner",
    commentary: [
      "Palmerston North is really a set of suburb markets. Hokowhitu, Kelvin Grove, Terrace End, Highbury, Takaro, Awapuni, Milson and the rest each have their own buyer pool and price behaviour, and school zones, section size and street can matter more than the house. A useful appraisal starts with the right suburb comparables, and we sell across all of them.",
      "Because we sell right across the city we see what buyers are paying week to week, not just what's advertised. That's the evidence your range is built on, and we'll walk you through it so you understand how the number was reached and what would change it.",
      "Two agents come to every appraisal. You get a range both of us are prepared to stand behind, honest advice on presentation and timing, and no pressure — a large share of the appraisals we do are for owners planning six to twelve months ahead.",
    ],
    pointsTitle: "What your Palmerston North appraisal includes",
    points: [
      "A free, no-obligation visit from Allan and Karen",
      "A price range built from recent sales in your suburb, with the comparables shown",
      "Advice on presentation, timing and the method of sale that suits your home and suburb",
      "How our 2% + GST commission, No Upfront Costs and No Sale — No Fee would apply to your sale",
      "No pressure, no mailing list — just clear answers to your questions",
    ],
    faqs: [
      {
        q: "Is a Palmerston North property appraisal free?",
        a: "Yes. Our appraisal is free and carries no obligation to list. If you sell with us there are No Upfront Costs and a 2% + GST commission payable only when your property sells.",
      },
      {
        q: "Which Palmerston North suburbs do you appraise?",
        a: "All of them — including Hokowhitu, Kelvin Grove, Terrace End, Roslyn, West End, Awapuni, Milson, Summerhill, Highbury, Takaro and Westbrook — plus Ashhurst, Feilding and the wider Manawatū.",
      },
      {
        q: "How is a property appraisal different from a council rating valuation?",
        a: "A rating valuation (RV) is set periodically by the council for rates purposes and can be well out of line with the market. An appraisal is a current, evidence-based estimate of what your home should sell for, based on recent comparable sales.",
      },
      {
        q: "What happens after the appraisal?",
        a: "You receive the written range and the comparable sales. Whether you list, wait or do nothing is entirely your call — we won't add you to a mailing list or chase you.",
      },
    ],
  },
  {
    service: "sell",
    area: "palmerston-north",
    description:
      "Selling a house in Palmerston North? Arizto's No.1 agents, suburb-level pricing, premium marketing and a 2% + GST commission with No Upfront Costs.",
    headline: "Selling a house in Palmerston North",
    intro:
      "Sell with Arizto's No.1 agents in Palmerston North & Manawatū* — two agents personally working for you, premium marketing, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in Palmerston North",
    commentary: [
      "Palmerston North draws buyers from across the lower North Island — Massey and UCOL staff, hospital and Defence families, Wellington movers trading commute for section — as well as locals moving between suburbs. Breadth of demand is your advantage, but only if the marketing reaches it. Our campaigns are built to put your home in front of buyers who weren't looking in your street.",
      "Pricing and method of sale are decided suburb by suburb. A Hokowhitu family home, a Kelvin Grove new build and a Takaro first home attract different buyers and suit different approaches, and we'll recommend the one the evidence supports rather than a house style.",
      "Allan and Karen run every campaign together: the strategy, the open homes, the follow-up with every buyer who came through, and the negotiation. You hear from us after every open home, and we stay involved through conditions and settlement.",
    ],
    pointsTitle: "Selling in Palmerston North with Team Toner",
    points: [
      "Two agents personally working your sale, from strategy to settlement",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "Suburb-level pricing and a method of sale chosen for your home",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
      "Arizto's No.1 agents in Palmerston North & Manawatū*",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Palmerston North with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee — your premium marketing package is included, so there's nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "Which is better in Palmerston North — auction, deadline sale or asking price?",
        a: "There's no single answer. It depends on your suburb, the home, your timeframe and the level of competition we expect. We'll recommend a method for your property and explain the reasoning before you decide.",
      },
      {
        q: "What marketing is included when selling with Team Toner?",
        a: "Professional property photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner video and social marketing — all with No Upfront Costs.",
      },
      {
        q: "Do you sell across all Palmerston North suburbs?",
        a: "Yes — every Palmerston North suburb, plus Ashhurst, Feilding and the wider Manawatū.",
      },
      {
        q: "How do I get started?",
        a: "Book a free appraisal. Allan and Karen will visit your home, give you an evidence-based price range and talk through timing and method of sale, with no obligation.",
      },
    ],
  },

  /* ---------------------------------------------------------------- Manawatū */
  {
    service: "appraisal",
    area: "manawatu",
    description:
      "Free appraisal for lifestyle blocks, rural properties and homes across the Manawatū from Allan & Karen Toner. Evidence-based, with no obligation to list.",
    headline: "Free property appraisal in the Manawatū",
    intro:
      "Lifestyle block, rural property or a home in one of the Manawatū's towns and villages? Allan & Karen Toner give you a free, evidence-based appraisal built for the property you actually have.",
    whyTitle: "Why get your Manawatū appraisal from Team Toner",
    commentary: [
      "Appraising a rural or lifestyle property in the Manawatū is a different job from appraising a suburban home. Water supply, effluent and consents, shedding, fencing, soil, access and a realistic commute all move the number, and the comparables are spread across a district rather than a street. We price these properties from the evidence and explain the adjustments we've made.",
      "We sell throughout the Manawatū — Bunnythorpe, Halcombe, Sanson, Linton, Tokomaru, Foxton Beach and the country in between — so your appraisal starts from what buyers have actually paid for similar properties, not a city formula.",
      "Both of us attend. You get a range we're prepared to stand behind, honest advice on what to do before selling and when, and no obligation to list.",
    ],
    pointsTitle: "What your Manawatū appraisal includes",
    points: [
      "A free, no-obligation visit from Allan and Karen",
      "A price range built from recent Manawatū sales of comparable homes, blocks and sections",
      "Advice on the details rural buyers ask about — water, services, consents, access and land",
      "How our 2% + GST commission, No Upfront Costs and No Sale — No Fee apply to your sale",
      "No pressure and no mailing list",
    ],
    faqs: [
      {
        q: "Do you appraise lifestyle blocks and rural properties?",
        a: "Yes. Lifestyle and rural properties across the Manawatū are a regular part of our work, and each is appraised on its land, services and buildings as well as the house.",
      },
      {
        q: "Which Manawatū towns do you cover?",
        a: "Feilding, Ashhurst, Bunnythorpe, Halcombe, Sanson, Linton, Tokomaru, Foxton and Foxton Beach, and the rural districts between them — as well as every Palmerston North suburb.",
      },
      {
        q: "Is the appraisal really free?",
        a: "Yes, and there is no obligation. If you later sell with us there are No Upfront Costs and a 2% + GST commission payable only when your property sells.",
      },
      {
        q: "What should I have ready for a rural appraisal?",
        a: "Anything you have on water and effluent systems, consents, fencing and any leases or grazing arrangements. None of it is required, but it lets us give you a sharper range.",
      },
    ],
  },
  {
    service: "sell",
    area: "manawatu",
    description:
      "Selling a lifestyle block or rural property in the Manawatū? Team Toner market land properly, for a 2% + GST commission with No Upfront Costs.",
    headline: "Selling a property in the Manawatū",
    intro:
      "Lifestyle, rural and small-town sales need agents who understand land as well as houses. Allan & Karen Toner sell across the Manawatū — for a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell property across the Manawatū",
    commentary: [
      "Rural and lifestyle buyers ask different questions: water, effluent, consents, shedding, fencing, soil, access, internet and how far it really is to school and work. A campaign that answers those questions up front — in the photography, the copy and the information pack — attracts serious buyers and sells faster than one that treats the block as a house with a big lawn.",
      "Buyers for Manawatū properties come from Palmerston North, Wellington and further afield as often as from next door, so reach matters. Our marketing package — professional and aerial photography, premium portal placement, signage, video and social — is included with No Upfront Costs, and aerial photography earns its keep on land.",
      "Method of sale and timing are chosen for your property. Season, stock, feed and access all affect when a rural property presents best, and we'll plan the campaign around them. Allan and Karen work every sale personally through to settlement.",
    ],
    pointsTitle: "Selling in the Manawatū with Team Toner",
    points: [
      "Allan & Karen personally, from strategy to settlement",
      "Aerial and professional photography, premium portal placement, signage, video and social — included",
      "Pricing from comparable Manawatū sales, adjusted for land, services and buildings",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
      "Information packs that answer the questions rural buyers ask before they enquire",
    ],
    faqs: [
      {
        q: "What does it cost to sell a lifestyle property with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Marketing, including aerial photography, is included. T's and C's apply.",
      },
      {
        q: "How do you market a lifestyle block?",
        a: "Aerial and professional photography that shows the land, copy and an information pack that answer the rural questions up front, premium portal placement, signage, video and social — aimed at buyers in Palmerston North, Wellington and beyond as well as locally.",
      },
      {
        q: "When is the best time to sell a rural property in the Manawatū?",
        a: "When it presents best and buyers are active — which depends on the property, the season and what's on the land. We'll plan the timing with you at the appraisal.",
      },
      {
        q: "Do you also sell in Feilding, Ashhurst and Palmerston North?",
        a: "Yes. We sell across Palmerston North, Feilding, Ashhurst and the wider Manawatū district.",
      },
    ],
  },
];
