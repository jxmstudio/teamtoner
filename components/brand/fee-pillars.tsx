import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FeeText } from "@/components/brand/commission";
import { siteConfig } from "@/lib/site";

/**
 * The three fee pillars as a compact strip: 2% + GST Commission ·
 * No Upfront Costs · The Toner Guarantee. Supports the proposition; never
 * leads it. `FeeText` attaches the required asterisk to the commission pillar.
 */
export function FeePillars({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      {siteConfig.feePillars.map((pillar) => (
        <li
          key={pillar}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold",
            tone === "dark"
              ? "border-white/20 bg-white/5 text-white"
              : "border-teal/30 bg-teal/10 text-primary"
          )}
        >
          <Check className="size-4 shrink-0 text-teal" strokeWidth={3} />
          <FeeText>{pillar}</FeeText>
        </li>
      ))}
    </ul>
  );
}
