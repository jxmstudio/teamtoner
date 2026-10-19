import Link from "next/link";

/** `[link text](/path)` — internal paths only, so studio text can't link off-site. */
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

/**
 * Plain studio text with inline internal links. Lets the client write
 * "see our [Ashhurst sales](/suburbs/ashhurst#recent-sales)" in an article
 * paragraph without a rich-text editor; anything that isn't a link renders
 * as written.
 */
export function TextWithLinks({ children: text }: { children: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <Link key={start} href={href} className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">
        {label}
      </Link>
    );
    last = start + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
