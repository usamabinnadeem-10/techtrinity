import Link from "next/link";

type ServiceHeroProps = {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
};

export function ServiceHero({ name, tagline, description }: ServiceHeroProps) {
  return (
    <section className="border-b border-border py-16">
      <nav className="font-mono text-xs text-muted">
        <Link
          href="/services"
          className="transition-colors hover:text-fg"
        >
          Services
        </Link>
        <span className="mx-2">&rarr;</span>
        <span>{name}</span>
      </nav>

      <h1 className="mt-8 font-serif text-5xl tracking-tight text-fg">
        {name}
      </h1>

      <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted">
        {tagline}
      </p>

      <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
        {description}
      </p>

      <Link
        href="/contact"
        className="mt-8 inline-block bg-fg px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg transition-colors hover:bg-accent"
      >
        Book a free scoping call
      </Link>
    </section>
  );
}
