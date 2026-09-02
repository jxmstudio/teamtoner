/**
 * One-off import of the fixture content into the Sanity dataset, so the CMS
 * starts populated instead of the site falling back to fixtures forever.
 * Seeds listings, testimonials, guides, suburbs and the Site settings
 * singleton.
 *
 * Run (uses your `npx sanity login` session — no API token needed):
 *
 *   npm run seed:sanity
 *
 * Idempotent: documents are keyed by slug (`listing-<slug>` etc.), so
 * re-running never duplicates. It won't overwrite edits made in the studio
 * either (createIfNotExists).
 */
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";
import { listings } from "../lib/content/listings";
import { testimonials } from "../lib/content/testimonials";
import { guides } from "../lib/content/guides";
import { suburbs } from "../lib/content/suburbs";
import { siteConfig } from "../lib/site";
import {
  aboutCopy,
  appraisalCopy,
  contactCopy,
  homeCopy,
  listingsCopy,
  privacyCopy,
  resourcesCopy,
  sellCopy,
  soldCopy,
  suburbsCopy,
  termsCopy,
} from "../lib/content/page-copy";

const client = getCliClient({ apiVersion: "2026-08-01" });

/** Ids of already-imported documents, so re-runs skip asset re-uploads too. */
async function existingIds(type: string): Promise<Set<string>> {
  const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
  return new Set(ids);
}

async function uploadImage(publicPath: string) {
  const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(file)) {
    console.warn(`  ! image missing on disk, skipped: ${publicPath}`);
    return null;
  }
  const asset = await client.assets.upload("image", createReadStream(file), {
    filename: basename(file),
  });
  return {
    _type: "image" as const,
    _key: asset._id,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function uploadPdf(publicPath: string) {
  const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!existsSync(file)) {
    console.warn(`  ! PDF missing on disk, skipped: ${publicPath}`);
    return null;
  }
  const asset = await client.assets.upload("file", createReadStream(file), {
    filename: basename(file),
  });
  return {
    _type: "file" as const,
    asset: { _type: "reference" as const, _ref: asset._id },
  };
}

async function seedListings() {
  const existing = await existingIds("listing");
  for (const l of listings) {
    if (existing.has(`listing-${l.slug}`)) {
      console.log(`Skipping listing ${l.slug} (already imported)`);
      continue;
    }
    console.log(`Importing listing ${l.slug} …`);
    const images = (await Promise.all(l.images.map(uploadImage))).filter(
      (i) => i !== null
    );
    await client.createIfNotExists({
      _id: `listing-${l.slug}`,
      _type: "listing",
      title: l.title,
      slug: { _type: "slug", current: l.slug },
      status: l.status,
      address: l.address,
      suburb: l.suburb,
      beds: l.beds,
      baths: l.baths,
      parking: l.parking,
      priceDisplay: l.priceDisplay,
      ...(l.sortOrder ? { sortOrder: l.sortOrder } : {}),
      description: l.description,
      features: l.features,
      images,
      ...(l.video ? { videoUrl: l.video } : {}),
      ...(l.soldPrice ? { soldPrice: l.soldPrice } : {}),
      ...(l.soldDate ? { soldDate: l.soldDate } : {}),
    });
  }
  console.log(`  ${listings.length} listings imported.`);
}

async function seedTestimonials() {
  for (const [i, t] of testimonials.entries()) {
    const id = `testimonial-${t.author.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    console.log(`Importing ${id} …`);
    await client.createIfNotExists({
      _id: id,
      _type: "testimonial",
      author: t.author,
      source: t.source,
      rating: t.rating,
      quote: t.quote,
      ...(t.suburb ? { suburb: t.suburb } : {}),
      featured: t.featured ?? false,
      order: i,
    });
  }
  console.log(`  ${testimonials.length} testimonials imported.`);
}

async function seedGuides() {
  const existing = await existingIds("guide");
  for (const g of guides) {
    if (existing.has(`guide-${g.slug}`)) {
      console.log(`Skipping guide ${g.slug} (already imported)`);
      continue;
    }
    console.log(`Importing guide ${g.slug} …`);
    const pdfFile = g.pdf ? await uploadPdf(g.pdf) : null;
    await client.createIfNotExists({
      _id: `guide-${g.slug}`,
      _type: "guide",
      title: g.title,
      slug: { _type: "slug", current: g.slug },
      description: g.description,
      category: g.category,
      ...(pdfFile ? { pdfFile } : {}),
      ...(g.published ? { published: g.published } : {}),
      ...(g.updated ? { updated: g.updated } : {}),
      process: g.process ?? false,
      ...(g.body
        ? {
            body: g.body.map((section, i) => ({
              _type: "guideSection",
              _key: `section-${i}`,
              heading: section.heading,
              paragraphs: section.paragraphs,
              ...(section.bullets ? { bullets: section.bullets } : {}),
            })),
          }
        : {}),
      ...(g.comparison
        ? {
            comparison: {
              caption: g.comparison.caption,
              columns: g.comparison.columns,
              rows: g.comparison.rows.map((cells, i) => ({
                _type: "comparisonRow",
                _key: `row-${i}`,
                cells,
              })),
            },
          }
        : {}),
    });
  }
  console.log(`  ${guides.length} guides imported.`);
}

async function seedSuburbs() {
  for (const s of suburbs) {
    console.log(`Importing suburb ${s.slug} …`);
    await client.createIfNotExists({
      _id: `suburb-${s.slug}`,
      _type: "suburb",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      ...(s.parent ? { parent: s.parent } : {}),
      blurb: s.blurb,
      ...(s.commentary ? { commentary: s.commentary } : {}),
    });
  }
  console.log(`  ${suburbs.length} suburbs imported.`);
}

/** Sanity object-array items need _key/_type; map field name → object type. */
const ARRAY_ITEM_TYPES: Record<string, string> = {
  faqs: "faqItem",
  steps: "stepItem",
  sections: "legalSection",
};

function withSanityKeys(value: unknown, field?: string): unknown {
  if (Array.isArray(value)) {
    return value.map((item, i) =>
      item && typeof item === "object"
        ? {
            _key: `${field}-${i}`,
            ...(field && ARRAY_ITEM_TYPES[field] ? { _type: ARRAY_ITEM_TYPES[field] } : {}),
            ...(withSanityKeys(item) as Record<string, unknown>),
          }
        : item
    );
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withSanityKeys(v, k)])
    );
  }
  return value;
}

const PAGE_COPY: Record<string, object> = {
  pageHome: homeCopy,
  pageAbout: aboutCopy,
  pageSell: sellCopy,
  pageAppraisal: appraisalCopy,
  pageContact: contactCopy,
  pageListings: listingsCopy,
  pageSold: soldCopy,
  pageSuburbs: suburbsCopy,
  pageResources: resourcesCopy,
  pagePrivacy: privacyCopy,
  pageTerms: termsCopy,
};

async function seedPageCopy() {
  for (const [id, defaults] of Object.entries(PAGE_COPY)) {
    console.log(`Importing ${id} …`);
    await client.createIfNotExists({
      _id: id,
      _type: id,
      ...(withSanityKeys(defaults) as Record<string, unknown>),
    });
  }
  console.log(`  ${Object.keys(PAGE_COPY).length} page-copy documents imported.`);
}

/**
 * The home-page featured grid, from the fixture `featured` flags: first
 * flagged listing is the hero, the next two fill the smaller cells.
 */
async function seedFeaturedListings() {
  console.log("Importing featured properties …");
  const [hero, ...others] = listings
    .filter((l) => l.featured && l.status !== "sold")
    .slice(0, 3)
    .map((l) => ({ _type: "reference" as const, _ref: `listing-${l.slug}` }));
  await client.createIfNotExists({
    _id: "featuredListings",
    _type: "featuredListings",
    ...(hero ? { hero } : {}),
    others: others.map((ref, i) => ({ ...ref, _key: `featured-${i}` })),
  });
}

async function seedSiteSettings() {
  console.log("Importing site settings …");
  await client.createIfNotExists({
    _id: "siteSettings",
    _type: "siteSettings",
    tagline: siteConfig.tagline,
    description: siteConfig.description,
    footerTagline: siteConfig.footerTagline,
    footerDescription: siteConfig.footerDescription,
    reaa: siteConfig.brand.reaa,
    guaranteeName: siteConfig.guarantee.name,
    guaranteeSummary: siteConfig.guarantee.summary,
    allanPhone: siteConfig.agents.allan.phone,
    karenPhone: siteConfig.agents.karen.phone,
    contactEmail: siteConfig.contact.email,
    officePhone: siteConfig.contact.office,
    region: siteConfig.contact.region,
    rankingLine: siteConfig.stats.rankingLine,
    rankingFootnote: siteConfig.stats.rankingFootnote,
    commission: siteConfig.stats.commission,
    feePillars: [...siteConfig.feePillars],
    sellingPoints: siteConfig.sellingPoints.map((p, i) => ({
      _key: `point-${i}`,
      title: p.title,
      detail: p.detail,
    })),
    sellingPointsSell: siteConfig.sellingPointsSell.map((p, i) => ({
      _key: `point-${i}`,
      title: p.title,
      detail: p.detail,
    })),
    ctaTitle: siteConfig.cta.title,
    ctaDescription: siteConfig.cta.description,
    ctaNote: siteConfig.cta.note,
    // Socials/profile URLs are left unset until the client supplies real ones.
  });
  // The document may pre-date newer fields (e.g. the CTA banner) — backfill
  // without touching anything the client has already edited.
  await client
    .patch("siteSettings")
    .setIfMissing({
      ctaTitle: siteConfig.cta.title,
      ctaDescription: siteConfig.cta.description,
      ctaNote: siteConfig.cta.note,
      rankingLine: siteConfig.stats.rankingLine,
      rankingFootnote: siteConfig.stats.rankingFootnote,
    })
    .commit();
  console.log("  site settings imported.");
}

async function main() {
  await seedListings();
  await seedTestimonials();
  await seedGuides();
  await seedSuburbs();
  await seedSiteSettings();
  await seedFeaturedListings();
  await seedPageCopy();

  const { projectId, dataset } = client.config();
  console.log(`Done — content imported into ${projectId}/${dataset}.`);
  console.log("Open /studio to review, then replace the demo content with real content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
