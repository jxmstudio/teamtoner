import { Container } from "@/components/brand/primitives";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <Container className="py-12 sm:py-16">
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
