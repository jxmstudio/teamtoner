import { defineField, defineType } from "sanity";

/** A client review (Google or RateMyAgent). Mirrors `Testimonial` in lib/content/types.ts. */
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Client name",
      type: "string",
      description: "As it should appear on the site, e.g. “Derek & Jackey”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "quote",
      title: "Review",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "Google", value: "Google" },
          { title: "RateMyAgent", value: "RateMyAgent" },
        ],
        layout: "radio",
      },
      initialValue: "Google",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Star rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "suburb",
      title: "Suburb / area",
      type: "string",
      description: "Optional, shown under the name, e.g. “Feilding”.",
    }),
    defineField({
      name: "featured",
      title: "Feature on the home page",
      type: "boolean",
      description: "Featured reviews fill the home-page carousel and the Proven Results block.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "quote" },
  },
});
