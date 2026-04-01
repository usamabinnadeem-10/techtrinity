import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/home/cta-section";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Software Development Services — TechTrinity",
  description:
    "MVP development, SaaS platforms, and API engineering for US-based founders and startups. Senior-level full-stack teams that ship production software.",
  openGraph: {
    title: "Software Development Services — TechTrinity",
    description:
      "MVP development, SaaS platforms, and API engineering for US-based founders and startups. Senior-level full-stack teams that ship production software.",
    url: "https://techtrinity.ai/services",
    siteName: "TechTrinity",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: SERVICES.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://techtrinity.ai/services/${service.slug}`,
    name: service.name,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(itemListJsonLd)}
      </script>

      <section className="border-b border-border">
        <Container>
          <div className="pb-12 pt-20">
            <h1 className="font-serif text-4xl text-fg">Our Services</h1>
            <p className="mt-4 max-w-xl font-sans text-base text-muted">
              Senior-level engineering for every layer of your product.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border">
            {SERVICES.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col gap-4 border-b border-border px-6 py-10 transition-colors hover:bg-surface md:border-b-0 md:last:border-b-0"
              >
                <span className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="font-serif text-xl text-fg">
                  {service.name}
                </span>

                <span className="font-sans text-sm leading-relaxed text-muted">
                  {service.tagline}
                </span>

                <ul className="mt-2 flex flex-col gap-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-sans text-xs text-fg"
                    >
                      <span className="block h-1 w-1 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {service.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-border px-2 py-1 font-mono text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="mt-2 font-mono text-xs text-muted transition-colors group-hover:text-fg">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
