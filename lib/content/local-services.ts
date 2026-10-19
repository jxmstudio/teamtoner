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
      "Feilding has its own buyers and its own rhythm. Families weigh up Feilding High School, Feilding Intermediate and the town's primary schools; downsizers look for an easy-care home close to Manchester Square and the shops; and Palmerston North buyers, about 20 km away on State Highway 54, compare what their money buys here with the city. Your appraisal tells you which of those buyers your home suits, and what they are likely to pay.",
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
      {
        q: "Which sales do you use for a Feilding appraisal?",
        a: "Recent Feilding sales first — ideally homes of a similar age and type in a similar part of town — then the wider Manawatū where Feilding evidence is thin. You'll see every sale we used and how it compares with your home.",
      },
      {
        q: "Does being close to Feilding's schools affect value?",
        a: "It can. Families often look for homes within easy reach of Feilding High School, Feilding Intermediate and the primary schools, and we take that into account when we compare your home with recent Feilding sales.",
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
      "Feilding sells on its strengths as a town: a centre that has won New Zealand's Most Beautiful Town award many times, a full set of schools from primary to Feilding High, and Palmerston North about 20 km down State Highway 54. We put those strengths in front of buyers in the city as well as locally, because Palmerston North buyers are a big part of Feilding's market.",
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
      {
        q: "Do Palmerston North buyers look at Feilding homes?",
        a: "Yes. Feilding is about 20 km from Palmerston North on State Highway 54, and city buyers often look here for more house or section for their money. Our marketing reaches them as well as buyers already in Feilding.",
      },
      {
        q: "What sells best in Feilding?",
        a: "Well-presented homes that are realistically priced for their part of town — character homes near the centre, family homes close to the schools, and lifestyle properties just out of town each have their own buyers. We'll tell you at the appraisal which buyers your home suits and how to reach them.",
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
  /* ------------------------------------------------------------ Kelvin Grove
     Month 2 (Oct 2026): the four priority Palmerston North suburbs. Draft
     copy for Allan & Karen's review — facts kept to what's public (schools,
     parks, housing eras); no prices or market figures. */
  {
    service: "appraisal",
    area: "kelvin-grove",
    description:
      "Free property appraisal in Kelvin Grove from Allan & Karen Toner: a price range built from recent Kelvin Grove sales, with no obligation to list.",
    headline: "Free property appraisal in Kelvin Grove",
    intro:
      "Wondering what your Kelvin Grove home is worth? Allan & Karen Toner will visit, compare it with recent Kelvin Grove sales and give you an honest price range — free, with no obligation.",
    whyTitle: "How we appraise Kelvin Grove homes",
    commentary: [
      "Kelvin Grove is two markets in one suburb. Streets of established family homes dating from the late 1960s sit a few minutes from subdivisions built in the last decade or so, and buyers value them very differently. An appraisal that averages the two will be wrong for both, so we start from sales of homes like yours — similar age, size, construction and section.",
      "For a newer home that means build quality, insulation, heating and how much maintenance a buyer is taking on. For an established home it's the section, the condition of the kitchen and bathroom, and whether the work that's been done is work buyers will pay for. Either way, you'll see the recent Kelvin Grove sales we used and why.",
      "Most people who ask us for a Kelvin Grove appraisal are weighing up a move rather than ready to list, and that's the right time to ask. Both of us come, it takes about 45 minutes, and the range is yours to use however you like.",
    ],
    pointsTitle: "What your Kelvin Grove appraisal includes",
    points: [
      "A free, no-obligation visit from both Allan and Karen",
      "A price range backed by recent Kelvin Grove sales, with the evidence shown",
      "Comparison with homes of a similar age — new builds against new builds, established homes against established homes",
      "Straight advice on presentation, timing and method of sale",
      "How a 2% + GST commission with No Upfront Costs and No Sale — No Fee would apply to you",
    ],
    faqs: [
      {
        q: "How much is a property appraisal in Kelvin Grove?",
        a: "Nothing. A Team Toner appraisal is free and carries no obligation to list. If you do sell with us later there are No Upfront Costs and a 2% + GST commission that is only payable when your property sells.",
      },
      {
        q: "Can you appraise a new build in Kelvin Grove?",
        a: "Yes. We appraise newer Kelvin Grove homes against other recent builds of a similar size and finish, and take account of what buyers ask about — insulation, heating, any remaining build guarantee and the code compliance certificate.",
      },
      {
        q: "What affects the value of a Kelvin Grove home most?",
        a: "Age and construction, section size, condition and street. Two homes a few streets apart can sit in different price brackets, which is why we compare yours with recent sales of genuinely similar homes.",
      },
      {
        q: "How long does a Kelvin Grove appraisal take?",
        a: "Allow about 45 minutes at the property. We look through the home and section, talk through your plans, and follow up with the written range and the comparable sales behind it.",
      },
    ],
  },
  {
    service: "sell",
    area: "kelvin-grove",
    description:
      "Selling a house in Kelvin Grove? Allan & Karen Toner market to first-home buyers and families, with a 2% + GST commission and No Upfront Costs.",
    headline: "Selling a house in Kelvin Grove",
    intro:
      "Two experienced agents, marketing built for the families and first-home buyers who look in Kelvin Grove, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in Kelvin Grove",
    commentary: [
      "Kelvin Grove buyers are mostly first-home buyers and young families, plus people moving up to a newer home without leaving Palmerston North. Many are comparing your home with brand-new builds nearby, so the marketing has to show clearly what yours offers — a bigger section, an established garden, or a modern, low-maintenance layout.",
      "School zoning, heating, insulation and outdoor living are the questions we hear at Kelvin Grove open homes, so we have the answers ready in the listing and on the day. Professional and aerial photography, premium portal placement, signage, video and social marketing are included, with No Upfront Costs.",
      "We'll recommend a method of sale — asking price, deadline sale, auction or negotiation — based on your home and the buyer interest we expect, and explain why. Allan and Karen both work every campaign, from the first open home through to settlement, and you'll hear from us after every open home with honest feedback on interest and price.",
    ],
    pointsTitle: "Selling in Kelvin Grove with Team Toner",
    points: [
      "Allan & Karen personally — strategy, open homes, buyer follow-up and negotiation",
      "Marketing aimed at first-home buyers, families and buyers comparing new builds",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A pricing strategy built from recent Kelvin Grove sales",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Kelvin Grove with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there is nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "How do I compete with new builds when selling in Kelvin Grove?",
        a: "By showing what a new build can't offer — often a larger section, a settled street or a home that's ready now — and pricing realistically against the new homes buyers are also looking at. We'll walk you through those comparisons at the appraisal.",
      },
      {
        q: "Should I do any work before selling in Kelvin Grove?",
        a: "Usually only small jobs: tidying the section, fixing obvious maintenance and freshening paint where it's tired. We'll tell you at the appraisal which jobs are likely to pay for themselves and which aren't.",
      },
      {
        q: "What marketing is included when selling in Kelvin Grove?",
        a: "Professional property photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner video and social marketing — all with No Upfront Costs.",
      },
    ],
  },
  /* ------------------------------------------------------------------ Milson */
  {
    service: "appraisal",
    area: "milson",
    description:
      "Free property appraisal in Milson from Allan & Karen Toner: an honest price range built from recent Milson sales, with no obligation to list.",
    headline: "Free property appraisal in Milson",
    intro:
      "Find out what your Milson home could sell for. Allan & Karen Toner will visit, look at recent Milson sales and give you an evidence-based price range — free, with no obligation.",
    whyTitle: "How we appraise Milson homes",
    commentary: [
      "Milson's homes span almost a century — the original 1920s railway houses, family homes built from the 1950s onwards and more recent infill — and each has its own buyers. A railway cottage, a 1970s family home and a newer townhouse can sit on neighbouring streets and still belong in different price brackets.",
      "So we appraise from the right comparables: recent Milson sales of homes like yours, adjusted for section, condition, garaging and position. Being close to Milson School, St Peter's College or the airport matters to some buyers and not to others, and we'll explain how it's likely to play for your home. You'll see every sale we used and how it compares with yours.",
      "Many Milson owners ask for an appraisal while they're planning ahead — downsizing, moving closer to family, or deciding whether to renovate first. A realistic range now helps you make that call. It's free, both of us come, and there's no obligation to list.",
    ],
    pointsTitle: "What your Milson appraisal includes",
    points: [
      "A free, no-obligation visit from both Allan and Karen",
      "A price range backed by recent Milson sales, with the evidence shown",
      "Straight advice on what buyers will and won't pay for in a Milson home",
      "Guidance on timing, presentation and method of sale",
      "How a 2% + GST commission with No Upfront Costs and No Sale — No Fee would apply to you",
    ],
    faqs: [
      {
        q: "Is a Milson property appraisal free?",
        a: "Yes — free and without obligation. If you later sell with Team Toner there are No Upfront Costs, and our 2% + GST commission is only payable when the property sells.",
      },
      {
        q: "Can you appraise one of Milson's original railway houses?",
        a: "Yes. The 1920s railway houses are a distinctive part of Milson, and we appraise them against comparable older homes, taking account of renovation, insulation, foundations and the section.",
      },
      {
        q: "Does the airport affect what my Milson home is worth?",
        a: "It depends on the street and the buyer. Some value being minutes from the terminal; others ask about aircraft noise. We look at recent sales on comparable streets so your range reflects how buyers actually treat your location.",
      },
      {
        q: "What should I have ready for the appraisal?",
        a: "Nothing is required. Your title, rates notice and any building or renovation records help us give you a sharper range, as does a rough idea of your timeframe.",
      },
    ],
  },
  {
    service: "sell",
    area: "milson",
    description:
      "Selling a house in Milson? Allan & Karen Toner, premium marketing and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    headline: "Selling a house in Milson",
    intro:
      "Allan & Karen Toner market Milson homes to the families, first-home buyers and downsizers who look here — with a 2% + GST commission, No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in Milson",
    commentary: [
      "Milson buyers usually want a tidy, well-kept home in a settled street, close to schools and the northern side of the city. Families look at Milson School and St Peter's College, first-home buyers look for value, and downsizers want a manageable section. A good campaign speaks to whichever of those groups your home suits best — and with original railway houses, post-war family homes and newer builds all in the suburb, the right buyer can differ from one street to the next.",
      "Presentation and sensible pricing do the heavy lifting here. We'll tell you which small jobs are worth doing before you list, then put your home in front of buyers with professional and aerial photography, premium portal placement, signage, video and social marketing — all included, with No Upfront Costs.",
      "From there it's disciplined follow-up. Both of us attend open homes, call every buyer back and give you honest feedback after each one, so you always know where the campaign stands and what the market is telling you.",
    ],
    pointsTitle: "Selling in Milson with Team Toner",
    points: [
      "Allan & Karen personally — strategy, open homes, buyer follow-up and negotiation",
      "Marketing aimed at Milson's family, first-home and downsizer buyers",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A pricing strategy built from recent Milson sales",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Milson with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there is nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "How long does it take to sell a house in Milson?",
        a: "It depends on the home, the price and the time of year. Well-presented, realistically priced Milson homes tend to draw their buyers early in a campaign; we'll give you an honest expectation for your home at the appraisal.",
      },
      {
        q: "What method of sale do you recommend in Milson?",
        a: "We'll recommend asking price, deadline sale, auction or negotiation based on your home, your timeframe and the buyer interest we expect, and explain the reasoning so you can decide.",
      },
      {
        q: "Should I do any work before selling in Milson?",
        a: "Usually only small jobs: tidying the section, fixing obvious maintenance and freshening paint where it's tired. We'll tell you which are likely to pay for themselves and which aren't.",
      },
    ],
  },
  /* ------------------------------------------------------------------ Takaro */
  {
    service: "appraisal",
    area: "takaro",
    description:
      "Free property appraisal in Takaro from Allan & Karen Toner: a price range built from recent Takaro sales, with the evidence shown and no obligation.",
    headline: "Free property appraisal in Takaro",
    intro:
      "Thinking about selling in Takaro? Allan & Karen Toner will visit, compare your home with recent Takaro sales and give you an honest, evidence-based price range — free, with no obligation.",
    whyTitle: "How we appraise Takaro homes",
    commentary: [
      "Takaro has a lot going for it — a central position, four schools within the suburb and plenty of green space — but its housing varies more than people expect. Solid post-war family homes, tidy units and fully renovated properties sit side by side, and condition can make a bigger difference to price than size.",
      "That's why a Takaro appraisal has to start from genuinely comparable sales. We look at what's been done to your home and when, how it's heated and insulated, the section and parking, and how it compares with the Takaro homes buyers will see in the same week. You'll see the recent sales we used, not just a figure.",
      "If you're deciding whether to renovate or sell as is, ask us before you start. We'll tell you honestly which work Takaro buyers are likely to pay for and which jobs won't earn back their cost. The appraisal is free, both of us come, and there's no obligation.",
    ],
    pointsTitle: "What your Takaro appraisal includes",
    points: [
      "A free, no-obligation visit from both Allan and Karen",
      "A price range backed by recent Takaro sales, with the evidence shown",
      "Honest advice on whether to renovate first or sell as is",
      "Guidance on timing, presentation and method of sale",
      "How a 2% + GST commission with No Upfront Costs and No Sale — No Fee would apply to you",
    ],
    faqs: [
      {
        q: "How much is a property appraisal in Takaro?",
        a: "Nothing. A Team Toner appraisal is free and carries no obligation to list. If you do sell with us later there are No Upfront Costs and a 2% + GST commission that is only payable when your property sells.",
      },
      {
        q: "Should I renovate before getting a Takaro appraisal?",
        a: "No — get the appraisal first. It tells you what your home is worth as it stands and lets us advise which work is likely to add value, so you don't spend money buyers won't pay back.",
      },
      {
        q: "Can you appraise a unit or rental property in Takaro?",
        a: "Yes. We appraise units and rentals as well as family homes. For a tenanted property we also talk through timing, tenancy notice and presenting the home to owner-occupiers as well as investors.",
      },
      {
        q: "Is an appraisal the same as a registered valuation?",
        a: "No. An appraisal is a licensed salesperson's evidence-based estimate of the price your home should achieve, used to guide your decision to sell. A registered valuation is a paid, formal report from a registered valuer, usually for a lender.",
      },
    ],
  },
  {
    service: "sell",
    area: "takaro",
    description:
      "Selling a house in Takaro? Allan & Karen Toner reach families, first-home buyers and investors, with a 2% + GST commission and No Upfront Costs.",
    headline: "Selling a house in Takaro",
    intro:
      "Marketing that reaches every kind of Takaro buyer — families, first-home buyers and investors — from two agents who sell here, with a 2% + GST commission and No Upfront Costs.",
    whyTitle: "How we sell homes in Takaro",
    commentary: [
      "Takaro draws a wider mix of buyers than most suburbs. Families come for the schools — Takaro School, Our Lady of Lourdes, Palmerston North Boys' High and Queen Elizabeth College are all in the suburb — first-home buyers come for value close to town, investors look here too, and people working at the hospital or in town value the short commute.",
      "When a home appeals to more than one of those groups, the campaign should reach all of them, because competition between buyers is what lifts the price. Our marketing — professional and aerial photography, premium portal placement, signage, video and social — is included with No Upfront Costs, and it's planned around who is most likely to buy your home.",
      "Condition carries real weight in Takaro, so we'll help you decide what's worth doing before you list and present the home's strengths clearly. Then both of us work the campaign: open homes, buyer follow-up, negotiation and honest feedback every week.",
    ],
    pointsTitle: "Selling in Takaro with Team Toner",
    points: [
      "Allan & Karen personally — strategy, open homes, buyer follow-up and negotiation",
      "Marketing planned to reach families, first-home buyers and investors",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A pricing strategy built from recent Takaro sales",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in Takaro with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there is nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "Can you sell a tenanted property in Takaro?",
        a: "Yes. We work with you and your tenants on access for photography and open homes, and market the property to investors and owner-occupiers alike so you're not limited to one type of buyer.",
      },
      {
        q: "What method of sale works best in Takaro?",
        a: "It depends on your home and your timeframe. We'll recommend asking price, deadline sale, auction or negotiation based on the buyer interest we expect, and explain the reasoning.",
      },
      {
        q: "What marketing is included when selling in Takaro?",
        a: "Professional property photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner video and social marketing — all with No Upfront Costs.",
      },
    ],
  },
  /* ---------------------------------------------------------------- West End */
  {
    service: "appraisal",
    area: "west-end",
    description:
      "Free property appraisal in West End, Palmerston North, from Allan & Karen Toner. Character homes priced on recent West End sales. No obligation.",
    headline: "Free property appraisal in West End",
    intro:
      "What could your West End home sell for? Allan & Karen Toner will visit, look at recent West End sales and the character homes buyers will compare yours with, and give you an honest range — free.",
    whyTitle: "How we appraise West End homes",
    commentary: [
      "West End is character-home territory, and character homes are hard to appraise from a spreadsheet. Two villas of the same size can be worth quite different money depending on original features, the quality of any renovation, insulation and heating, the roof and foundations, and how well the section suits the house.",
      "So we look at the home in person, then compare it with recent West End sales and the other character homes on the market that a buyer would weigh against it. Being close to the Victoria Esplanade, Fitzherbert Park and the city centre is part of what buyers pay for here, and the street matters as much as the house.",
      "Many owners ask for a West End appraisal a year or two before they plan to move — while deciding whether to finish a renovation, downsize or move closer to family. That's a good time to ask. It's free, both of us come, and there's no obligation to list.",
    ],
    pointsTitle: "What your West End appraisal includes",
    points: [
      "A free, no-obligation visit from both Allan and Karen",
      "A price range backed by recent West End sales, with the evidence shown",
      "An honest view of the character features and renovation work buyers will pay for",
      "Advice on presentation, timing and method of sale",
      "How a 2% + GST commission with No Upfront Costs and No Sale — No Fee would apply to you",
    ],
    faqs: [
      {
        q: "Is a West End property appraisal free?",
        a: "Yes — free and without obligation. If you later sell with Team Toner there are No Upfront Costs, and our 2% + GST commission is only payable when the property sells.",
      },
      {
        q: "How do you value a character home in West End?",
        a: "Against recent sales of comparable character homes, adjusted for original features, renovation quality, insulation, heating, roof and foundations, and the section. We show you the sales we used so you can see how the range was reached.",
      },
      {
        q: "Will my renovation add value to my West End home?",
        a: "Usually, if it's been done well and in keeping with the home. West End buyers pay for sympathetic renovation and comfort, and discount work that strips out character or looks unfinished. We'll give you an honest view at the appraisal.",
      },
      {
        q: "How long does a West End appraisal take?",
        a: "Allow about 45 minutes at the property. We look through the home and section, talk through your plans, and follow up with the written range and the comparable sales behind it.",
      },
    ],
  },
  {
    service: "sell",
    area: "west-end",
    description:
      "Selling a character home in West End? Allan & Karen Toner market it properly, with a 2% + GST commission, No Upfront Costs and No Sale — No Fee.",
    headline: "Selling a house in West End",
    intro:
      "Character homes need marketing that shows their character. Two agents who sell in West End, premium photography and video, and a 2% + GST commission with No Upfront Costs and No Sale — No Fee.",
    whyTitle: "How we sell homes in West End",
    commentary: [
      "West End buyers are buying a lifestyle as much as a house: a character home on an established street, the Victoria Esplanade and the Lido within reach, and the city centre and Massey University close by. Families, professionals and downsizers all look here, and they usually know exactly what they want.",
      "That makes photography and detail especially important. Original features, renovation work, insulation and heating are what West End buyers ask about first, so we capture them properly and have the answers ready. Professional and aerial photography, premium portal placement, signage, video and social marketing are included, with No Upfront Costs.",
      "Character homes don't always suit a fixed asking price. Depending on your home and the buyer interest we expect, we may recommend a deadline sale, auction or negotiation, and we'll explain why. Allan and Karen both work every campaign through to settlement, with honest feedback after every open home on buyer interest and price.",
    ],
    pointsTitle: "Selling in West End with Team Toner",
    points: [
      "Allan & Karen personally — strategy, open homes, buyer follow-up and negotiation",
      "Photography and video that do justice to character features",
      "Professional and aerial photography, premium portal placement, signage, video and social — included",
      "A pricing strategy built from recent West End sales",
      "2% + GST commission, No Upfront Costs and No Sale — No Fee",
    ],
    faqs: [
      {
        q: "What does it cost to sell a house in West End with Team Toner?",
        a: "A 2% + GST commission on the sale price, with No Upfront Costs and No Sale — No Fee. Your marketing package is included, so there is nothing to pay before you go to market. T's and C's apply.",
      },
      {
        q: "Should I finish my renovation before selling in West End?",
        a: "Not always. A half-finished renovation can put buyers off, but finishing it isn't always the best use of your money. We'll look at what's left and tell you honestly whether it's likely to pay for itself.",
      },
      {
        q: "What method of sale suits a West End character home?",
        a: "It depends on the home and the buyer interest we expect. Character homes can be hard to price precisely, so a deadline sale, auction or negotiation sometimes works better than a fixed asking price. We'll recommend one and explain why.",
      },
      {
        q: "What marketing is included when selling in West End?",
        a: "Professional property photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner video and social marketing — all with No Upfront Costs.",
      },
    ],
  },
];
