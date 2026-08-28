import { defineField, defineType, type FieldDefinition } from "sanity";

/**
 * Per-page copy documents ("Page copy" in the studio). One fixed document per
 * page (_id === the type name); lib/data.ts deep-merges each over the typed
 * defaults in lib/content/page-copy.ts, so any field left empty falls back to
 * the wording shipped in code.
 *
 * Copy conventions surfaced to the client in field descriptions: write the
 * commission rate ("2% + GST") literally and a "*" after ranking claims —
 * the site turns both into the linked terms/rankings asterisks.
 */

const str = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", ...(description ? { description } : {}) });

const txt = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "text", rows: 3, ...(description ? { description } : {}) });

const strList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "string" }],
    ...(description ? { description } : {}),
  });

const txtList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "text", rows: 3 }],
    ...(description ? { description } : {}),
  });

const faqList = (name = "faqs", title = "FAQs") =>
  defineField({
    name,
    title,
    type: "array",
    description:
      "Questions and answers. Write “2% + GST” and ranking “*”s literally — the site links them to the terms automatically.",
    of: [
      {
        type: "object",
        name: "faqItem",
        title: "FAQ",
        fields: [
          defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
          defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
        ],
        preview: { select: { title: "q" } },
      },
    ],
  });

const stepList = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    type: "array",
    ...(description ? { description } : {}),
    of: [
      {
        type: "object",
        name: "stepItem",
        title: "Step",
        fields: [
          defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "detail", title: "Detail", type: "text", rows: 3, validation: (r) => r.required() }),
        ],
        preview: { select: { title: "title" } },
      },
    ],
  });

const legalSections = defineField({
  name: "sections",
  title: "Sections",
  type: "array",
  description:
    "Each section renders as a heading with its paragraphs. Don't change the anchors — links across the site point at them.",
  of: [
    {
      type: "object",
      name: "legalSection",
      title: "Section",
      fields: [
        defineField({
          name: "anchor",
          title: "Anchor",
          type: "string",
          description: "Leave as-is — site links (e.g. the commission asterisk) point here.",
          readOnly: true,
        }),
        defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [{ type: "text", rows: 4 }],
          validation: (r) => r.required().min(1),
        }),
      ],
      preview: { select: { title: "heading" } },
    },
  ],
});

const header = (pageName: string): FieldDefinition[] => [
  str("headerEyebrow", "Header — eyebrow", "The small label above the page heading."),
  str("headerTitle", "Header — title", `The main ${pageName} page heading.`),
  txt("headerDescription", "Header — description", "The lead sentence under the heading."),
];

function page(name: string, title: string, fields: FieldDefinition[]) {
  return defineType({
    name,
    title,
    type: "document",
    fields,
    preview: { prepare: () => ({ title }) },
  });
}

export const pageHome = page("pageHome", "Home page", [
  str("heroTitleStart", "Hero heading — start", "e.g. “A smarter way to”."),
  str("heroTitleHighlight", "Hero heading — highlighted words", "Rendered in the teal script font, e.g. “sell your home”."),
  str("heroTitleEnd", "Hero heading — end", "e.g. “in Palmerston North.”"),
  txt("heroParagraph", "Hero paragraph", "Write “2% + GST” literally — the site links its asterisk automatically."),
  txt("heroSecondary", "Hero secondary line"),
  str("recognitionEyebrow", "Recognition — eyebrow"),
  str("recognitionTitle", "Recognition — title"),
  txt("recognitionDescription", "Recognition — description", "A “*” after a ranking claim becomes the linked rankings asterisk."),
  str("meetEyebrow", "Meet Allan & Karen — eyebrow"),
  str("meetTitle", "Meet Allan & Karen — title"),
  txt("meetDescription", "Meet Allan & Karen — description"),
  str("featuredEyebrow", "Featured listings — eyebrow"),
  str("featuredTitle", "Featured listings — title"),
  str("testimonialsEyebrow", "Testimonials — eyebrow"),
  str("testimonialsTitle", "Testimonials — title"),
  txt("testimonialsDescription", "Testimonials — description"),
  str("suburbsEyebrow", "Suburbs — eyebrow"),
  str("suburbsTitle", "Suburbs — title"),
  txt("suburbsDescription", "Suburbs — description"),
]);

export const pageAbout = page("pageAbout", "About page", [
  ...header("About"),
  txtList("bodyParagraphs", "Story paragraphs", "The main About story, one entry per paragraph. The final paragraph renders bold."),
  str("modelTitle", "Arizto model — title"),
  txt("modelDescription", "Arizto model — description"),
]);

export const pageSell = page("pageSell", "Sell page", [
  ...header("Sell"),
  txt("intro", "Intro paragraph"),
  str("processEyebrow", "Selling process — eyebrow"),
  str("processTitle", "Selling process — title"),
  stepList("steps", "Selling process — steps", "The numbered step cards."),
  str("faqEyebrow", "FAQs — eyebrow"),
  str("faqTitle", "FAQs — title"),
  faqList(),
]);

export const pageAppraisal = page("pageAppraisal", "Appraisal page", [
  ...header("Appraisal"),
  txt("intro", "Intro paragraph"),
  str("introNote", "Intro — bold closing line"),
  str("benefitsTitle", "“What you’ll get” — title"),
  strList("benefits", "“What you’ll get” — bullet points"),
  str("sellingNoteTitle", "“Thinking of selling?” — title"),
  txt("sellingNote", "“Thinking of selling?” — text", "Write “2% + GST” literally — the site links its asterisk automatically."),
  str("faqTitle", "FAQs — title"),
  faqList(),
]);

export const pageContact = page("pageContact", "Contact page", [
  ...header("Contact"),
  str("callHeading", "Phone column heading"),
  str("formHeading", "Form column heading"),
]);

export const pageListings = page("pageListings", "Listings page", header("Listings"));

export const pageSold = page("pageSold", "Sold page", header("Sold"));

export const pageSuburbs = page("pageSuburbs", "Suburbs page", [
  ...header("Suburbs"),
  txt("intro", "Intro line under the header"),
  str("pnEyebrow", "Palmerston North section — eyebrow"),
  str("pnTitle", "Palmerston North section — title"),
  txt("pnDescription", "Palmerston North section — description"),
]);

export const pageResources = page("pageResources", "Resources page", header("Resources"));

export const pagePrivacy = page("pagePrivacy", "Privacy page", [
  txt("note", "Top note", "The small disclaimer line above the policy. Clear it in code once the wording is approved."),
  legalSections,
]);

export const pageTerms = page("pageTerms", "Terms page", [
  txt("note", "Top note"),
  legalSections,
]);

export const pageCopyTypes = [
  pageHome,
  pageAbout,
  pageSell,
  pageAppraisal,
  pageContact,
  pageListings,
  pageSold,
  pageSuburbs,
  pageResources,
  pagePrivacy,
  pageTerms,
];
