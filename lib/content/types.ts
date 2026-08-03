export type ListingStatus = "for-sale" | "under-offer" | "sold";

export interface Listing {
  slug: string;
  title: string;
  status: ListingStatus;
  address: string;
  suburb: string; // suburb slug
  beds: number;
  baths: number;
  parking: number;
  /** Display price or method of sale, e.g. "Enquiries over $749,000", "Auction 27 July", "Deadline Sale". */
  priceDisplay: string;
  description: string[];
  features: string[];
  images: string[]; // paths under /public; empty → branded placeholder
  featured?: boolean;
  soldPrice?: string;
  soldDate?: string; // ISO date
}

export interface Testimonial {
  author: string;
  source: "Google" | "RateMyAgent";
  rating: number; // 1-5
  quote: string;
  suburb?: string;
  featured?: boolean;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** Path to the PDF under /public/guides. Empty string = coming soon. */
  pdf: string;
  cover?: string;
}

export interface Suburb {
  slug: string;
  name: string;
  blurb: string;
  hero?: string;
}
