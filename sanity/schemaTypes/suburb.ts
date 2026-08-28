import { defineField, defineType } from "sanity";
import { suburbs as fixtureSuburbs } from "../../lib/content/suburbs";

const areaOptions = fixtureSuburbs
  .filter((s) => !s.parent)
  .map((s) => ({ title: s.name, value: s.slug }));

/**
 * A suburb / area page at /suburbs/<slug>. Mirrors `Suburb` in
 * lib/content/types.ts. Top-level areas (no parent) are the four cards on
 * /suburbs; suburbs with a parent list under that area and inherit its
 * listings when they have none of their own.
 */
export const suburb = defineType({
  name: "suburb",
  title: "Suburb",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address (slug)",
      type: "slug",
      description: "The page lives at /suburbs/<this>. Click Generate after entering the name.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "parent",
      title: "Part of area",
      type: "string",
      options: { list: areaOptions },
      description: "Set for an individual suburb (e.g. Hokowhitu sits in Palmerston North). Leave empty for a top-level area.",
    }),
    defineField({
      name: "blurb",
      title: "Blurb",
      type: "text",
      rows: 3,
      description: "Short introduction shown on the suburb card and at the top of the page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "commentary",
      title: "Market commentary",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Local market paragraphs — this is what makes the page worth reading. One entry per paragraph.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "blurb" },
  },
});
