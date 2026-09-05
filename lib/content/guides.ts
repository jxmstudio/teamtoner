import type { Guide } from "./types";

/**
 * Seller guides. Agency: drop the PDF into /public/guides and set `pdf` to its
 * path (e.g. "/guides/home-prep-booklet.pdf"). Leave `pdf` empty for a
 * "coming soon" state. The client confirmed most booklets exist as PDFs.
 *
 * Guides with a `body` also publish a Google-indexable content page at
 * /resources/<slug> — per the client brief, the Seller Success Guide and
 * Choosing Your Method of Sale should not be PDF-only.
 */
export const guides: Guide[] = [
  {
    slug: "home-prep-booklet",
    title: "Home Prep Booklet",
    description:
      "Simple, high-impact ways to prepare your home for sale and maximise your result — room by room.",
    category: "Selling",
    pdf: "",
  },
  {
    slug: "seller-success-guide",
    title: "Seller Success Guide",
    sortOrder: 1,
    description:
      "Everything you need to know about selling with Team Toner — from appraisal to sold sign.",
    category: "Selling",
    pdf: "",
    published: "2026-08-17",
    updated: "2026-08-17",
    process: true,
    body: [
      {
        heading: "Start with an honest appraisal",
        paragraphs: [
          "Every good sale starts with an accurate number. A free appraisal from Team Toner is built on current market evidence and recent comparable sales in your street and suburb — not on what we think you want to hear.",
          "Be wary of an appraisal that sits noticeably above the rest. Overpricing costs you the first few weeks of buyer attention, which are the weeks that matter most.",
        ],
        bullets: [
          "Recent comparable sales, not last year's prices",
          "Honest feedback on what buyers will and won't pay for",
          "A realistic price range and the evidence behind it",
        ],
      },
      {
        heading: "Choose the right method of sale",
        paragraphs: [
          "Auction, deadline sale, price by negotiation or an asking price — each suits a different property, timeframe and level of buyer demand. There is no single right answer, and any agent who says otherwise isn't looking closely enough at your situation.",
        ],
      },
      {
        heading: "Prepare your property properly",
        paragraphs: [
          "Presentation influences price more than most sellers expect, and the highest-return work is usually the cheapest: declutter, deep clean, tidy the grounds and fix the small things buyers notice.",
          "We'll walk through your home with you before photography and prioritise what is genuinely worth doing — and tell you what isn't.",
        ],
      },
      {
        heading: "Market to the widest possible audience",
        paragraphs: [
          "Your campaign includes professional photography, free aerial photography, premium placement on the major property portals, signage, and Team Toner social and video marketing.",
          "Reach matters, but so does follow-up. Every enquiry is called back, and every viewing is followed up — that's where offers actually come from.",
        ],
      },
      {
        heading: "Negotiate, then see it through",
        paragraphs: [
          "When offers arrive we negotiate on your behalf to achieve the strongest possible result, then stay involved right through to settlement — managing conditions, finance dates and your solicitor's requirements so nothing stalls.",
        ],
      },
    ],
  },
  {
    slug: "methods-of-sale",
    sortOrder: 3,
    title: "Choosing Your Method of Sale",
    description:
      "Auction, deadline sale, price by negotiation — understand the options and pick what's right for you.",
    category: "Selling",
    pdf: "",
    published: "2026-08-17",
    updated: "2026-08-17",
    // Summarises the four methods below. Comparison tables are one of the
    // formats Google lifts directly into a table snippet.
    comparison: {
      caption: "Methods of sale compared",
      columns: [
        "Method",
        "Price advertised",
        "Conditional offers",
        "Best suited to",
      ],
      rows: [
        ["Auction", "No", "No — unconditional on the day", "Strong demand; hard-to-value or unusual homes"],
        ["Deadline sale", "No", "Yes", "Most well-presented homes in a healthy market"],
        ["Price by negotiation", "No", "Yes", "Uncertain markets; value genuinely hard to pin down"],
        ["Asking price", "Yes", "Yes", "Areas with plenty of comparable sales evidence"],
      ],
    },
    body: [
      {
        heading: "Auction",
        paragraphs: [
          "An auction sets a firm deadline and creates competition in the room. It works best where demand is strong and the property is hard to value precisely — character homes, lifestyle blocks and anything genuinely unusual.",
          "The key advantage is an unconditional sale on the day. The trade-off is that it narrows the buyer pool to those who can bid without conditions.",
        ],
      },
      {
        heading: "Deadline sale",
        paragraphs: [
          "A deadline sale keeps the urgency of an auction but allows conditional offers, which widens the buyer pool. Offers come in by a set date and are presented together.",
          "It suits most well-presented homes in a healthy market, particularly where finance or a builder's report is likely to be a condition for some buyers.",
        ],
      },
      {
        heading: "Price by negotiation",
        paragraphs: [
          "No price is advertised, and buyers make offers based on their own assessment. This can work well when the market is uncertain or the property's value is genuinely hard to pin down.",
          "It asks more of buyers, so it needs strong marketing and attentive follow-up to keep people engaged.",
        ],
      },
      {
        heading: "Asking price",
        paragraphs: [
          "A clear advertised price is the simplest option for buyers and filters out those outside your range. It suits properties in areas with plenty of comparable evidence, where the right number is well established.",
          "The risk is setting it too high — a stale listing costs more than a slightly conservative price ever will.",
        ],
      },
      {
        heading: "How we'll decide together",
        paragraphs: [
          "At your appraisal we'll talk through your timeframe, how much certainty you need, the current level of buyer activity and what comparable properties have done recently — then recommend the method the evidence supports.",
        ],
      },
    ],
  },
  {
    slug: "moving-checklist",
    title: "Let's Get Moving — Checklist",
    description:
      "A practical moving-day checklist so nothing falls through the cracks when the big day arrives.",
    category: "Moving",
    pdf: "",
  },
];
