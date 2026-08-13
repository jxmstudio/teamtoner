import { cn } from "@/lib/utils";
import { Container } from "@/components/brand/primitives";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  /** Tighter vertical rhythm — used where the content below needs to sit higher. */
  compact,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <Container className={cn(compact ? "py-8 sm:py-10" : "py-12 sm:py-16")}>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{description}</p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
