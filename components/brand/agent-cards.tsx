import Image from "next/image";
import { Phone } from "lucide-react";
import { getSiteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Allan and Karen as two individual agent cards.
 *
 * The home page previously ran the same duo portrait in the hero and again in
 * "Meet Allan & Karen". Two agents personally working the sale is the whole
 * proposition, so the section that says so now shows them individually, each
 * with their own name, role and tap-to-call number — which also gives Google
 * two named-person images instead of one repeated file.
 */

const PORTRAITS = {
  allan: "/team/allan-toner.jpg",
  karen: "/team/karen-toner.jpg",
} as const;

export async function AgentCards({ className }: { className?: string }) {
  const { agents } = await getSiteConfig();
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", className)}>
      {(["allan", "karen"] as const).map((key) => (
        <AgentCard key={key} agent={agents[key]} portrait={PORTRAITS[key]} />
      ))}
    </div>
  );
}

function AgentCard({
  agent,
  portrait,
}: {
  agent: { name: string; role: string; phone: string };
  portrait: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* The studio portraits are shot on white — keeping the well white in both
          themes reads as intentional rather than as a blown-out image. */}
      <div className="bg-white">
        <Image
          src={portrait}
          alt={`${agent.name} — ${agent.role}, Team Toner Palmerston North`}
          width={1312}
          height={1968}
          sizes="(min-width: 640px) 25vw, 80vw"
          className="aspect-[4/5] w-full object-cover object-top"
        />
      </div>
      <figcaption className="p-5">
        <p className="text-lg font-bold text-foreground">{agent.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{agent.role}</p>
        <a
          href={`tel:${agent.phone.replace(/\s/g, "")}`}
          className="mt-3 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
        >
          <Phone className="size-4" aria-hidden />
          {agent.phone}
        </a>
      </figcaption>
    </figure>
  );
}
