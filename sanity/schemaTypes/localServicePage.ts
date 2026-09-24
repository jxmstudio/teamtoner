import { defineField, defineType } from "sanity";
import { suburbs as fixtureSuburbs } from "../../lib/content/suburbs";
import { LOCAL_SERVICE_AREAS } from "../../lib/local-services";
import { faqList } from "./pageCopy";

const areaOptions = LOCAL_SERVICE_AREAS.map((slug) => ({
  title: fixtureSuburbs.find((s) => s.slug === slug)?.name ?? slug,
  value: slug,
}));

/**
 * One document per service × area page: /appraisal/<area> and /sell/<area>.
 * Mirrors `LocalServicePage` in lib/local-services.ts. Every field is
 * optional here because lib/data.ts merges the document over the fixture
 * copy — an empty field shows the shipped wording, never a blank.
 */
export const localServicePage = defineType({
  name: "localServicePage",
  title: "Area service page",
  type: "document",
  fields: [
    defineField({
      name: "service",
      title: "Service",
      type: "string",
      options: {
        list: [
          { title: "Free appraisal (/appraisal/…)", value: "appraisal" },
          { title: "Selling (/sell/…)", value: "sell" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "area",
      title: "Area",
      type: "string",
      options: { list: areaOptions },
      description: "The page lives at /appraisal/<area> or /sell/<area>.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Headline (H1)",
      type: "string",
      description: "e.g. “Free property appraisal in Ashhurst”.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "One or two sentences under the headline.",
    }),
    defineField({
      name: "description",
      title: "Google description",
      type: "text",
      rows: 2,
      description: "The snippet under the page title in Google results. Aim for 120–158 characters; leave empty to use a trimmed intro.",
      validation: (rule) => rule.max(158).warning("Google shows about 158 characters."),
    }),
    defineField({ name: "whyTitle", title: "Commentary heading", type: "string" }),
    defineField({
      name: "commentary",
      title: "Commentary paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description:
        "Local, specific and honest — this is what makes the page rank. Write “2% + GST” and ranking “*”s literally.",
    }),
    defineField({ name: "pointsTitle", title: "Points heading", type: "string" }),
    defineField({
      name: "points",
      title: "Points",
      type: "array",
      of: [{ type: "string" }],
      description: "Short bullet promises.",
    }),
    faqList(),
  ],
  preview: {
    select: { service: "service", area: "area", headline: "headline" },
    prepare({ service, area, headline }) {
      const areaName = areaOptions.find((o) => o.value === area)?.title ?? area;
      return {
        title: headline || `${service === "sell" ? "Selling" : "Appraisal"} — ${areaName}`,
        subtitle: `/${service}/${area}`,
      };
    },
  },
});
