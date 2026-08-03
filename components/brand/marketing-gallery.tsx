import Image from "next/image";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";

const tiles = [
  { src: "/marketing/social-1.jpg", alt: "Team Toner For Sale signboard at sunset" },
  { src: "/marketing/social-8.jpg", alt: "Handing over the keys — Team Toner" },
  { src: "/marketing/why-sell.jpg", alt: "Why sell with Team Toner" },
];

export function MarketingGallery() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Premium marketing"
          title="Marketing that gets you noticed"
          description="Professional photography, signage, print and social — the full package buyers expect, included as standard."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((tile) => (
            <div
              key={tile.src}
              className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Feature
            src="/marketing/aerial-photography.webp"
            title="Free aerial photography"
            detail="Showcase your property's size and setting from the sky — included on every listing."
          />
          <Feature
            src="/marketing/seller-dashboard.jpg"
            title="Your own seller dashboard"
            detail="Track views, offers and viewings in real time through the Arizto seller dashboard."
          />
        </div>
      </Container>
    </Section>
  );
}

function Feature({
  src,
  title,
  detail,
}: {
  src: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card sm:flex-row">
      <div className="relative aspect-video sm:aspect-auto sm:w-2/5">
        <Image src={src} alt={title} fill className="object-cover" sizes="(min-width: 640px) 40vw, 100vw" />
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
