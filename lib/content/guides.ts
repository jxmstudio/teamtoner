import type { Guide } from "./types";

/**
 * Downloadable seller guides. Agency: drop the PDF into /public/guides and set
 * `pdf` to its path (e.g. "/guides/home-prep-booklet.pdf"). Leave `pdf` empty
 * for a "coming soon" state. The client confirmed most booklets exist as PDFs.
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
    description:
      "Everything you need to know about selling with Team Toner — from appraisal to sold sign.",
    category: "Selling",
    pdf: "",
  },
  {
    slug: "methods-of-sale",
    title: "Choosing Your Method of Sale",
    description:
      "Auction, deadline sale, price by negotiation — understand the options and pick what's right for you.",
    category: "Selling",
    pdf: "",
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
