import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocalServicePage } from "@/components/brand/local-service-page";
import { fitTitle } from "@/lib/site";
import {
  LOCAL_SERVICE_AREAS,
  isLocalServiceArea,
  localServiceTitles,
  metaDescription,
} from "@/lib/local-services";
import { getLocalServicePage, getSuburbBySlug } from "@/lib/data";

/**
 * /appraisal/<area> — "property appraisal Ashhurst" and friends. One page per
 * priority area; anything else 404s rather than generating a thin page.
 */
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_SERVICE_AREAS.map((area) => ({ area }));
}

export async function generateMetadata(props: PageProps<"/appraisal/[area]">): Promise<Metadata> {
  const { area } = await props.params;
  if (!isLocalServiceArea(area)) return { title: "Not found" };
  const [suburb, copy] = await Promise.all([getSuburbBySlug(area), getLocalServicePage("appraisal", area)]);
  if (!suburb || !copy) return { title: "Not found" };
  return {
    title: { absolute: fitTitle(localServiceTitles("appraisal", suburb.name)) },
    description: copy.description ?? metaDescription(copy.intro),
    alternates: { canonical: `/appraisal/${area}` },
  };
}

export default async function AppraisalAreaPage(props: PageProps<"/appraisal/[area]">) {
  const { area } = await props.params;
  if (!isLocalServiceArea(area)) notFound();
  const [suburb, copy] = await Promise.all([getSuburbBySlug(area), getLocalServicePage("appraisal", area)]);
  if (!suburb || !copy) notFound();
  return <LocalServicePage service="appraisal" area={suburb} copy={copy} />;
}
