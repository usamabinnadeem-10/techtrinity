import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/home/cta-section";
import { founder, stats, values, team } from "@/lib/about";

export const metadata: Metadata = {
  title: "About TechTrinity — Senior Full-Stack Development Agency",
  description:
    "TechTrinity is a boutique agency of 5 senior developers building MVPs, SaaS platforms, and APIs for US-based founders. Founded by Usama Bin Nadeem.",
  openGraph: {
    title: "About TechTrinity — Senior Full-Stack Development Agency",
    description:
      "TechTrinity is a boutique agency of 5 senior developers building MVPs, SaaS platforms, and APIs for US-based founders. Founded by Usama Bin Nadeem.",
    url: "https://techtrinity.ai/about",
    siteName: "TechTrinity",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechTrinity",
  url: "https://techtrinity.ai",
  logo: "https://techtrinity.ai/logo.png",
  description:
    "TechTrinity is a boutique agency of 5 senior developers building MVPs, SaaS platforms, and APIs for US-based founders.",
  sameAs: [founder.linkedin, founder.upwork],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: founder.name,
  jobTitle: founder.role,
  url: "https://techtrinity.ai/about",
  email: founder.email,
  worksFor: {
    "@type": "Organization",
    name: "TechTrinity",
    url: "https://techtrinity.ai",
  },
  sameAs: [founder.linkedin, founder.upwork],
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(organizationJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </script>

      {/* Hero */}
      <section className="border-b border-border py-16">
        <Container>
          <div className="flex items-center gap-3 pb-8">
            <span className="block h-px w-8 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              About TechTrinity
            </span>
          </div>

          <h1 className="font-serif text-5xl leading-tight tracking-tight text-fg">
            We build software. We do it fast.
            <br />
            We do it <em className="text-muted">properly.</em>
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-base font-light leading-relaxed text-muted">
            TechTrinity is a boutique full-stack agency of 5 senior developers.
            We work with early-stage founders, growing startups, and teams that
            need an MVP shipped — not promised.
          </p>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-b border-border py-10">
        <Container>
          <div className="grid grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.description}
                className={`flex flex-col${index > 0 ? " pl-8" : ""}${index < stats.length - 1 ? " border-r border-border pr-8" : ""}`}
              >
                <span className="font-serif text-4xl text-fg">
                  {stat.metric}
                </span>
                <span className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {stat.description}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="border-b border-border py-14">
        <Container>
          <div className="grid grid-cols-3 gap-12">
            <div className="col-span-2">
              <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted">
                Founder
              </span>
              <span className="font-serif text-3xl text-fg">
                {founder.name}
              </span>
              <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                {founder.role}
              </p>
              <p className="mt-6 max-w-lg font-sans text-sm font-light leading-relaxed text-muted">
                {founder.bio}
              </p>
              <blockquote className="mt-8 border-l-2 border-border pl-5">
                <p className="font-sans text-sm font-light italic leading-relaxed text-muted">
                  Bigger agencies juggle 20 clients at once. Your project gets
                  whoever is available, not whoever is best. At TechTrinity, we
                  take on a small number of projects at a time and dedicate
                  ourselves fully to each one.
                </p>
              </blockquote>
            </div>

            <div>
              <div className="flex h-24 w-24 items-center justify-center border border-border bg-surface font-mono text-lg text-muted">
                UBN
              </div>
              <p className="mt-6 font-mono text-xs text-muted">
                {founder.location}
              </p>
              <a
                href={`mailto:${founder.email}`}
                className="mt-2 block font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                {founder.email}
              </a>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                LinkedIn ↗
              </a>
              <a
                href={founder.upwork}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                Upwork ↗
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-b border-border py-14">
        <Container>
          <span className="mb-4 block font-mono text-xs uppercase tracking-widest text-muted">
            The Team
          </span>
          <p className="max-w-2xl font-serif text-3xl text-fg">
            {team.description}
          </p>
          <p className="mt-8 max-w-xl font-sans text-sm font-light leading-relaxed text-muted">
            We are deliberate about team size. Five senior developers means
            every person on every project is experienced, accountable, and
            invested. We will grow when we find people who meet that bar — not
            before.
          </p>
        </Container>
      </section>

      {/* Values */}
      <section className="border-b border-border py-14">
        <Container>
          <span className="mb-8 block font-mono text-xs uppercase tracking-widest text-muted">
            How we work
          </span>
          <div className="grid grid-cols-2 gap-0">
            {values.map((value) => (
              <div key={value.title} className="border border-border p-8">
                <h3 className="mb-3 font-sans text-sm font-medium text-fg">
                  {value.title}
                </h3>
                <p className="font-sans text-sm font-light leading-relaxed text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection />

      <Footer />
    </>
  );
}
