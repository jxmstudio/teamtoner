import type { Testimonial } from "./types";

/**
 * SAMPLE testimonials. Agency: replace with the Toners' real Google / RateMyAgent
 * reviews (they have plenty on RateMyAgent). Set `featured: true` to surface on
 * the home page.
 */
export const testimonials: Testimonial[] = [
  {
    // Real testimonial pulled from Team Toner marketing collateral.
    author: "Derek & Jackey",
    source: "Google",
    rating: 5,
    quote:
      "Team Toner are the best agents I have ever worked with! Made the sale very stress free!",
    featured: true,
  },
  {
    author: "The Wilsons",
    source: "RateMyAgent",
    rating: 5,
    quote:
      "Allan and Karen made selling our home completely stress-free. Their communication was outstanding and they achieved a price we didn't think was possible.",
    suburb: "Palmerston North",
    featured: true,
  },
  {
    author: "Sarah M.",
    source: "Google",
    rating: 5,
    quote:
      "Professional, honest and hard-working. Team Toner went above and beyond from the first appraisal right through to settlement.",
    suburb: "Feilding",
    featured: true,
  },
  {
    author: "James & Ana",
    source: "RateMyAgent",
    rating: 5,
    quote:
      "We interviewed three agents and Team Toner were streets ahead. The marketing was superb and the result spoke for itself.",
    suburb: "Ashhurst",
    featured: true,
  },
  {
    author: "Grant T.",
    source: "Google",
    rating: 5,
    quote:
      "Nobody works harder. Allan and Karen genuinely care about their clients and it shows in everything they do.",
    suburb: "Palmerston North",
  },
];
