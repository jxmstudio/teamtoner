/**
 * Default page copy — the wording every page ships with. Each page has a
 * matching "Page copy" document in the Sanity studio (sanity/schemaTypes/
 * pageCopy.ts); whatever the client edits there is deep-merged over these
 * defaults by lib/data.ts, so an empty studio field always falls back to the
 * text below.
 *
 * Copy conventions: write the commission rate ("2% + GST") and ranking
 * asterisks ("*") literally — <FeeText> turns them into the linked
 * terms/rankings asterisks at render time.
 */

export interface Faq {
  q: string;
  a: string;
}

export interface Step {
  title: string;
  detail: string;
}

export interface LegalSection {
  /** Optional stable anchor (e.g. "commission") that site links point at. */
  anchor?: string;
  heading: string;
  paragraphs: string[];
}

export const homeCopy = {
  heroTitleStart: "A smarter way to",
  heroTitleHighlight: "sell your home",
  heroTitleEnd: "in Palmerston North & Manawatū.",
  heroParagraph:
    "Premium marketing. Proven results. Two experienced agents working for you — with a fairer 2% + GST commission and No Upfront Costs.",
  heroSecondary:
    "Allan & Karen Toner proudly serving Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
  recognitionEyebrow: "Proven results",
  recognitionTitle: "Proud to be recognised",
  recognitionDescription:
    "Arizto's No.1 agents in Palmerston North & Manawatū.* When you list with Team Toner, you get two experienced agents personally working on your sale.",
  meetEyebrow: "Meet Allan & Karen",
  meetTitle: "Two agents. One team. Personally involved from start to finish.",
  meetDescription:
    "We're Allan & Karen Toner, a husband-and-wife real estate team helping homeowners throughout Palmerston North, Feilding, Ashhurst and the wider Manawatū. When you list with Team Toner, you deal directly with us throughout your sale.",
  featuredEyebrow: "Current listings",
  featuredTitle: "Featured properties",
  testimonialsEyebrow: "What our clients say",
  testimonialsTitle: "Trusted across the Manawatū",
  testimonialsDescription:
    "Real feedback from families who've sold with Team Toner.",
  suburbsEyebrow: "Local experts",
  suburbsTitle: "Suburbs we know inside out",
  suburbsDescription:
    "Deep local knowledge across Palmerston North and the wider Manawatū.",
};

export const aboutCopy = {
  headerEyebrow: "Meet Team Toner",
  headerTitle: "Allan & Karen Toner",
  headerDescription: "Two agents. One team.",
  bodyParagraphs: [
    "We’re Allan and Karen Toner — a husband-and-wife real estate team proudly helping homeowners throughout Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
    "Selling your home is one of life’s biggest financial decisions. We believe the people you trust with it should treat it that way.",
    "As a husband-and-wife team, we work together throughout the entire selling process — from your initial appraisal and marketing strategy through to buyer follow-up, negotiation and settlement.",
    "That means you’re not simply getting an agent who lists your property. You’re getting two experienced agents personally invested in achieving the best possible outcome.",
    "Our approach is straightforward: honest advice, regular communication, strong marketing, thorough buyer follow-up and hard work.",
    "We’ll tell you what we believe your property is worth based on the evidence — not simply tell you what you want to hear to win the listing.",
    "That’s the Team Toner difference.",
  ],
  modelTitle: "A smarter model behind the service",
  modelDescription:
    "We're part of Arizto, a nationwide agency built on a simpler, fairer fee structure. It lets us deliver the full premium service — and pass the difference on to you.",
};

export const sellCopy = {
  headerEyebrow: "Sell smarter",
  headerTitle: "Sell your home with confidence",
  headerDescription:
    "Proven results. Premium marketing. Two agents working for you — for a smarter fee.",
  intro:
    "With Team Toner, you don’t have to choose between great service and a fair commission. Allan & Karen personally work together throughout your sale, backed by premium marketing, proven local results and Arizto’s nationwide reach.",
  processEyebrow: "How it works",
  processTitle: "The selling process",
  steps: [
    {
      title: "Free, evidence-based appraisal",
      detail:
        "We visit your property, discuss your plans and provide an honest assessment based on current market evidence and recent comparable sales.",
    },
    {
      title: "Your selling strategy",
      detail:
        "Together we'll choose the right method of sale, pricing strategy and marketing plan for your property.",
    },
    {
      title: "Launch & market",
      detail:
        "Professional marketing showcases your property while we manage enquiries, viewings, open homes and buyer follow-up.",
    },
    {
      title: "Negotiate & sell",
      detail:
        "When the offers arrive, we negotiate on your behalf to achieve the strongest possible result — then stay involved right through to settlement.",
    },
  ] as Step[],
  faqEyebrow: "Good to know",
  faqTitle: "Frequently asked questions",
  faqs: [
    {
      q: "How much is your commission?",
      a: "Our commission is just 2% + GST of the sale price. There are No Upfront Costs, backed by our Team Toner No Sale — No Fee Guarantee. You only pay our commission when your property sells.",
    },
    {
      q: "Are there any upfront costs?",
      a: "No. You don't pay anything to list with us. Your premium marketing package is included, so there's nothing to fund before your property goes to market.",
    },
    {
      q: "What is No Sale — No Fee?",
      a: "If your property doesn't sell, you don't pay us a commission. The risk sits with us, not with you — which is exactly why we're honest with you about value from the very first appraisal.",
    },
    {
      q: "What marketing is included?",
      a: "Professional property photography, free aerial photography, premium placement across the major online property portals, signage, and Team Toner social and video marketing — plus your own seller dashboard to track it all in real time.",
    },
    {
      q: "Which method of sale should I choose?",
      a: "It depends on your property, your timeframe and the current level of buyer demand. We'll talk you through auction, deadline sale, price by negotiation and asking price, and recommend the approach the evidence supports for your home.",
    },
    {
      q: "How should I prepare my home for sale?",
      a: "Presentation matters more than most sellers expect, and the highest-impact work is usually the least expensive — decluttering, a deep clean, tidy grounds and small repairs. We'll walk through your property with you and prioritise what's genuinely worth doing.",
    },
    {
      q: "What happens if my property doesn't sell?",
      a: "We review what the market told us — enquiry numbers, viewings, feedback and buyer objections — and adjust the strategy with you. Because of No Sale — No Fee, we're just as motivated as you are to get it right.",
    },
    {
      q: "What happens once an offer is accepted?",
      a: "We stay involved right through to settlement: managing conditions, chasing builders' reports and finance dates, keeping your solicitor informed and making sure nothing stalls.",
    },
    {
      q: "What areas do you cover?",
      a: "We sell throughout Palmerston North · Feilding · Ashhurst · Manawatū. That includes the Palmerston North suburbs of Hokowhitu, Kelvin Grove, Terrace End, Roslyn, West End, Awapuni, Milson, Highbury, Takaro, Westbrook and Summerhill / Fitzherbert, and Manawatū towns including Bunnythorpe, Halcombe, Sanson, Linton, Tokomaru and Foxton Beach.",
    },
  ] as Faq[],
};

export const appraisalCopy = {
  headerEyebrow: "Free appraisal",
  headerTitle: "What Could Your Property Sell For in Today's Market?",
  headerDescription:
    "Get a clear, evidence-based appraisal from Allan & Karen Toner — Team Toner, Arizto's No.1 agents in Palmerston North & Manawatū.",
  intro:
    "We’ll personally assess your property, look at recent comparable sales, current competition and buyer demand, and give you straightforward advice on where your property sits in today’s market.",
  introNote: "No pressure. No obligation. Just experienced, honest advice.",
  benefitsTitle: "What you’ll get",
  benefits: [
    "A free, no-obligation property appraisal",
    "An evidence-based assessment, backed by recent local sales",
    "Allan & Karen personally — two experienced agents, not one",
    "An honest discussion about price, buyer demand and current competition",
    "Advice on the best strategy and timing if you're considering selling",
    "Clear answers to your questions — with absolutely no pressure to list",
  ],
  sellingNoteTitle: "Thinking of selling?",
  sellingNote:
    "We can also explain our premium marketing approach, No Upfront Costs, and No Sale — No Fee — along with our competitive 2% + GST commission.",
  faqTitle: "Appraisal questions, answered",
  faqs: [
    {
      q: "Is a Team Toner property appraisal really free?",
      a: "Yes. The appraisal is completely free and carries no obligation to list with us. There are also No Upfront Costs if you do decide to sell — with No Sale — No Fee, you only pay when your property sells. T's and C's apply.",
    },
    {
      q: "What is the difference between a property appraisal and a registered valuation?",
      a: "A property appraisal is a licensed salesperson's evidence-based estimate of what your property should sell for in the current market, based on recent comparable sales. It is free and used to guide your pricing and marketing decisions. A registered valuation is a formal, paid assessment carried out by a registered valuer, and is what a lender will usually ask for.",
    },
    {
      q: "What happens at a Team Toner appraisal?",
      a: "Allan and Karen both visit your property, discuss your plans and timeframe, then look at recent comparable sales, current competition and buyer demand. You get a realistic price range and the evidence behind it — not a number designed to win your listing.",
    },
    {
      q: "Do I have to list my property after getting an appraisal?",
      a: "No. There is no obligation and no pressure. Plenty of people get an appraisal a year or more before they sell, simply to understand where they stand.",
    },
  ] as Faq[],
};

export const contactCopy = {
  headerEyebrow: "Get in touch",
  headerTitle: "Contact Team Toner",
  headerDescription:
    "Thinking of selling, buying, or simply have a property question? We'd love to hear from you. Call Allan or Karen directly, or send us a message below.",
  callHeading: "Call Allan or Karen directly",
  formHeading: "Send us a message",
};

export const listingsCopy = {
  headerEyebrow: "Current listings",
  headerTitle: "Homes for sale",
  headerDescription:
    "Browse our current listings across the Manawatū. New properties are added regularly.",
};

export const soldCopy = {
  headerEyebrow: "Proven results",
  headerTitle: "Recently sold by Team Toner",
  headerDescription:
    "See some of the properties we've successfully sold across Palmerston North, Feilding, Ashhurst and the wider Manawatū.",
};

export const suburbsCopy = {
  headerEyebrow: "Local experts",
  headerTitle: "Local real estate knowledge across Palmerston North & Manawatū",
  headerDescription:
    "From Hokowhitu, Takaro and Highbury to Feilding, Ashhurst, Sanson and the wider Manawatū, we understand the local property markets we sell in — the homes, the buyers and what makes each area different.",
  intro:
    "Explore our local areas, current properties and recent Team Toner sales.",
  pnEyebrow: "Palmerston North",
  pnTitle: "Explore Palmerston North suburbs",
  pnDescription:
    "Local information, current listings, recent Team Toner sales and market commentary for the suburbs we sell in most.",
  manawatuEyebrow: "Wider Manawatū",
  manawatuTitle: "Towns and villages across the Manawatū",
  manawatuDescription:
    "Rural and small-town markets we sell in regularly — each with its own local commentary, listings and recent Team Toner sales.",
};

export const resourcesCopy = {
  headerEyebrow: "Free downloads",
  headerTitle: "Free property selling guides",
  headerDescription:
    "Straightforward, practical advice from Team Toner to help you prepare, sell and move with confidence.",
};

export const privacyCopy = {
  // Client-approved wording (FINAL amendments, 30 Aug 2026) — the template
  // note is retired and must stay empty.
  note: "",
  sections: [
    {
      heading: "Who we are",
      paragraphs: [
        "Team Toner — Allan & Karen Toner are licensed real estate salespeople operating under Arizto Ltd — Licensed REAA 2008.",
        "We respect your privacy and are committed to handling personal information responsibly and in accordance with the New Zealand Privacy Act 2020.",
      ],
    },
    {
      heading: "Information we collect",
      paragraphs: [
        "When you contact us through this website, request a free property appraisal, make an enquiry or otherwise communicate with Team Toner, we may collect your name, email address, phone number, property address, property details and any other information you choose to provide.",
        "Our website may also collect technical information such as your browser, device, IP address, pages visited and website usage information through cookies or analytics tools.",
      ],
    },
    {
      heading: "How we use your information",
      paragraphs: [
        "We may use your personal information to respond to enquiries, provide property appraisals and real estate services, communicate with you about services you have requested, improve our website and services, and meet our legal and regulatory obligations.",
        "Providing your personal information is generally voluntary. However, if you don't provide information needed for a particular request, we may not be able to provide that service or fully respond to your enquiry.",
      ],
    },
    {
      heading: "Marketing",
      paragraphs: [
        "Requesting an appraisal or making an enquiry through our website does not automatically subscribe you to marketing communications. Where you have agreed to receive marketing communications from us, you can unsubscribe at any time.",
      ],
    },
    {
      heading: "Sharing your information",
      paragraphs: [
        "We do not sell your personal information. We may share information where reasonably necessary to provide our real estate services, including with Arizto Ltd and service providers who support those services, or where disclosure is required or permitted by law.",
      ],
    },
    {
      heading: "Storage and security",
      paragraphs: [
        "We take reasonable steps to protect personal information from loss, unauthorised access, misuse or disclosure. Personal information is retained only for as long as reasonably required for the purposes for which it was collected or as required by law.",
      ],
    },
    {
      heading: "Cookies and website analytics",
      paragraphs: [
        "Our website may use cookies and analytics technologies to understand how visitors use the site and to help us improve its performance and user experience.",
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        "Under the Privacy Act 2020, you have the right to request access to personal information we hold about you and to ask us to correct it if it is inaccurate.",
        "To make a request or ask a question about your privacy, please contact Team Toner at thetoners@arizto.co.nz.",
      ],
    },
    {
      heading: "Updates",
      paragraphs: [
        "We may update this Privacy Statement from time to time to reflect changes to our website, services or legal obligations.",
      ],
    },
  ] as LegalSection[],
};

export const termsCopy = {
  // Client-approved wording (FINAL amendments, 30 Aug 2026) — the template
  // note is retired and must stay empty.
  note: "",
  sections: [
    {
      heading: "Use of this site",
      paragraphs: [
        "This website is provided by Team Toner — Allan & Karen Toner for general information about our real estate services. By using it you agree to these terms.",
      ],
    },
    {
      heading: "Property information",
      paragraphs: [
        "Property and listing information is provided in good faith and is believed to be accurate at the time of publication, but is not guaranteed. Prospective purchasers should make their own enquiries, undertake their own due diligence and obtain independent professional advice where appropriate.",
      ],
    },
    {
      heading: "No Upfront Costs",
      paragraphs: [
        "Our standard selling model has No Upfront Costs. Any exceptions or additional services requiring payment will be discussed and agreed with you in advance.",
      ],
    },
    {
      // Every commission asterisk on the site links to #commission — the
      // anchor must stay "commission".
      anchor: "commission",
      heading: "Commission and fees — T’s & C’s",
      paragraphs: [
        "The 2% + GST commission quoted on this site is our standard residential selling fee and is calculated on the final sale price. It is indicative only and does not form an offer or an agency agreement. The fee that applies to your property is the one recorded in the signed agency agreement between you and Team Toner — Allan & Karen Toner.",
        "Marketing inclusions, the fee, and any minimum fee may vary depending on the property, the method of sale and the marketing package selected. Fees are exclusive of GST unless stated otherwise. Third-party costs, where they apply, are additional and will be disclosed to you in writing before you commit to them.",
        "No Sale — No Fee: If your property doesn't sell, you don't pay us a commission. The guarantee applies to the selling commission only and is subject to the terms of your signed agency agreement, including any agreed marketing costs and the conditions under which the agreement may end.",
      ],
    },
    {
      // Every ranking asterisk links to #rankings — the anchor must stay.
      anchor: "rankings",
      heading: "Ranking claims",
      paragraphs: [
        "Based on Arizto sales results as at August 2026. This applies to every reference on this site to Team Toner being Arizto's No.1 agents in Palmerston North & Manawatū. Rankings are reviewed periodically and may change.",
      ],
    },
    {
      heading: "Licensing",
      paragraphs: [
        "Arizto Ltd — Licensed REAA 2008. All real estate agency work is carried out in accordance with the Real Estate Agents Act 2008.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about these terms? Email thetoners@arizto.co.nz.",
      ],
    },
  ] as LegalSection[],
};

export type HomeCopy = typeof homeCopy;
export type AboutCopy = typeof aboutCopy;
export type SellCopy = typeof sellCopy;
export type AppraisalCopy = typeof appraisalCopy;
export type ContactCopy = typeof contactCopy;
export type ListingsCopy = typeof listingsCopy;
export type SoldCopy = typeof soldCopy;
export type SuburbsCopy = typeof suburbsCopy;
export type ResourcesCopy = typeof resourcesCopy;
export type PrivacyCopy = typeof privacyCopy;
export type TermsCopy = typeof termsCopy;
