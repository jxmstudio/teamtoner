/**
 * Renders a plain legal-copy string, turning any email address into a mailto
 * link. Lets the CMS-edited Privacy/Terms paragraphs keep their contact links
 * without the client writing markup.
 */
const EMAIL_PATTERN = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;

export function LegalText({ children }: { children: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of children.matchAll(EMAIL_PATTERN)) {
    nodes.push(children.slice(cursor, match.index));
    nodes.push(
      <a key={match.index} className="text-primary underline" href={`mailto:${match[0]}`}>
        {match[0]}
      </a>
    );
    cursor = match.index + match[0].length;
  }

  if (cursor === 0) return <>{children}</>;
  nodes.push(children.slice(cursor));
  return <>{nodes}</>;
}
