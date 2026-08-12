import Image from "next/image";
import { Container, Section, SectionHeading } from "@/components/brand/primitives";

/**
 * Premium marketing pillars (client brief §3).
 *
 * The three Arizto "save money" social graphics were removed — they read as
 * discount-agency messaging and pulled against the premium positioning.
 *
 * TODO(client): the three images below are stand-ins, not Team Toner's own
 * work. Replace them with a real Team Toner listing photograph, a still from
 * an actual Team Toner video/social campaign, and a screenshot of a live
 * premium portal listing. Same paths, same crops — drop-in replacement.
 */
const pillars = [
  {
    title: "Professional property photography",
    detail:
      "Every listing is shot by a professional — wide, bright, well-composed images that make buyers stop scrolling and book a viewing.",
    src: "/marketing/property-photography.webp",
    alt: "Bright open-plan living and dining room photographed for a property listing",
  },
  {
    title: "Social & video marketing",
    detail:
      "Team Toner video walkthroughs and targeted social campaigns put your property in front of local buyers who aren't watching the portals every day.",
    src: "/marketing/social-video.webp",
    alt: "Videographer filming a walkthrough of a home with a gimbal-mounted camera",
  },
  {
    title: "Premium online advertising",
    detail:
      "Upgraded placement across the major property portals and the Arizto network, so your listing is seen first — and by more of the right people.",
    src: "/marketing/online-advertising.webp",
    alt: "A property listing displayed on a laptop and tablet side by side",
  },
];

export function MarketingGallery() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Premium marketing"
          title="Marketing that gets you noticed"
          description="A full premium campaign built around your property — professional imagery, video and social reach, and prominent online placement."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pillar.src}
                  alt={pillar.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{pillar.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Feature
            src="/marketing/aerial-photography.webp"
            alt="Aerial photograph of a Manawatū property marketed by Team Toner"
            title="Free aerial photography"
            detail="Showcase your property's size and setting from the sky — included on every listing."
          />
          <Feature
            src="/marketing/seller-dashboard.jpg"
            alt="The Arizto seller dashboard showing live listing activity"
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
  alt,
  title,
  detail,
}: {
  src: string;
  alt: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card sm:flex-row">
      <div className="relative aspect-video sm:aspect-auto sm:w-2/5">
        <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width: 640px) 40vw, 100vw" />
      </div>
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
