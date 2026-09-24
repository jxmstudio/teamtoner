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
 * /sell/<area> — "selling a house in Ashhurst" and friends. One page per
 * priority area; anything else 404s rather than generating a thin page.
 */
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCAL_SERVICE_AREAS.map((area) => ({ area }));
}

export async function generateMetadata(props: PageProps<"/sell/[area]">): Promise<Metadata> {
  const { area } = await props.params;
  if (!isLocalServiceArea(area)) return { title: "Not found" };
  const [suburb, copy] = await Promise.all([getSuburbBySlug(area), getLocalServicePage("sell", area)]);
  if (!suburb || !copy) return { title: "Not found" };
  return {
    title: { absolute: fitTitle(localServiceTitles("sell", suburb.name)) },
    description: copy.description ?? metaDescription(copy.intro),
    alternates: { canonical: `/sell/${area}` },
  };
}

export default async function SellAreaPage(props: PageProps<"/sell/[area]">) {
  const { area } = await props.params;
  if (!isLocalServiceArea(area)) notFound();
  const [suburb, copy] = await Promise.all([getSuburbBySlug(area), getLocalServicePage("sell", area)]);
  if (!suburb || !copy) notFound();
  return <LocalServicePage service="sell" area={suburb} copy={copy} />;
}
