import Link from "next/link";
import { Container } from "@/components/container";

export function HeroSection() {
  return (
    <section className="border-b border-border pt-16 pb-0">
      <Container>
        <div className="flex items-center gap-3 pb-8">
          <span className="block h-px w-8 bg-border" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Full-stack software agency — US clients
          </span>
        </div>

        <h1 className="max-w-3xl font-serif text-5xl leading-tight tracking-tight text-fg md:text-6xl">
          Engineering-led product
          <br />
          development{" "}
          <em className="text-muted">done properly.</em>
        </h1>

        <div className="flex items-end justify-between pb-10 pt-8">
          <p className="max-w-sm font-sans text-sm font-light leading-relaxed text-muted">
            MVPs to SaaS platforms — built by a senior team that writes clean
            code, communicates clearly, and ships on time.
          </p>

          <Link
            href="/contact"
            className="bg-fg px-6 py-3 font-mono text-xs uppercase tracking-widest text-bg"
          >
            Book a discovery call
          </Link>
        </div>
      </Container>
    </section>
  );
}
