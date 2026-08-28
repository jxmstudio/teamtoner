/**
 * One-off import of the fixture listings into the Sanity dataset, so the CMS
 * starts populated instead of the site falling back to fixtures forever.
 *
 * Run (uses your `npx sanity login` session — no API token needed):
 *
 *   npm run seed:sanity
 *
 * Idempotent: documents are keyed by slug (`listing-<slug>`), so re-running
 * never duplicates. It won't overwrite edits made in the studio either
 * (createIfNotExists).
 */
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";
import { getCliClient } from "sanity/cli";
import { listings } from "../lib/content/listings";

const client = getCliClient({ apiVersion: "2026-08-01" });

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

async function main() {
  for (const l of listings) {
    console.log(`Importing ${l.slug} …`);
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
      featured: l.featured ?? false,
      description: l.description,
      features: l.features,
      images,
      ...(l.video ? { videoUrl: l.video } : {}),
      ...(l.soldPrice ? { soldPrice: l.soldPrice } : {}),
      ...(l.soldDate ? { soldDate: l.soldDate } : {}),
    });
  }

  const { projectId, dataset } = client.config();
  console.log(`Done — ${listings.length} listings imported into ${projectId}/${dataset}.`);
  console.log("Open /studio to review, then replace the demo content with real listings.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
