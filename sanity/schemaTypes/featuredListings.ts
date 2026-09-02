import { defineField, defineType } from "sanity";

/**
 * "Featured properties" — the home-page featured grid, chosen by hand.
 *
 * One pinned document (_id === "featuredListings"). The hero fills the large
 * double-width cell; the other picks fill the two smaller cells in the order
 * they're listed. lib/data.ts (`getFeaturedListings`) drops any pick that has
 * since been marked Sold and tops the grid up from the current listings, so a
 * stale selection never leaves a hole or shows a sold home.
 */
export const featuredListings = defineType({
  name: "featuredListings",
  title: "Featured properties",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Main featured listing",
      type: "reference",
      to: [{ type: "listing" }],
      description:
        "Shown as the large card in the home-page “Featured properties” section. Sold listings can't be chosen and are skipped automatically.",
      options: { filter: 'status != "sold"' },
    }),
    defineField({
      name: "others",
      title: "Other featured listings",
      type: "array",
      of: [{ type: "reference", to: [{ type: "listing" }], options: { filter: 'status != "sold"' } }],
      description:
        "The two smaller cards, top to bottom. Drag to reorder. If fewer than two are chosen, the newest current listings fill the remaining spots.",
      validation: (rule) => rule.max(2).unique(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Featured properties" }),
  },
});
