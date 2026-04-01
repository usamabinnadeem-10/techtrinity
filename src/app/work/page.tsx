import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/home/cta-section";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Our Work — TechTrinity",
  description:
    "Case studies from TechTrinity — ERP systems, SaaS platforms, and engineering work for real clients.",
  openGraph: {
    title: "Our Work — TechTrinity",
    description:
      "Case studies from TechTrinity — ERP systems, SaaS platforms, and engineering work for real clients.",
    url: "https://techtrinity.ai/work",
    siteName: "TechTrinity",
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://techtrinity.ai/work/${project.slug}`,
    name: project.name,
  })),
};

export default function WorkPage() {
  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(itemListJsonLd)}
      </script>

      <section className="border-b border-border">
        <Container>
          <div className="pb-12 pt-20">
            <h1 className="font-serif text-4xl text-fg">Selected Work</h1>
            <p className="mt-4 max-w-xl font-sans text-base text-muted">
              A small team. A high bar. Real outcomes.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            {projects.map((project) => {
              const firstOutcome = project.outcomes[0];

              return (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group flex flex-col gap-4 border-b border-border p-8 transition-colors hover:bg-surface md:[&:nth-last-child(-n+2)]:border-b-0 md:odd:border-r md:odd:border-border"
                >
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-4">
                    <span className="font-serif text-xl text-fg">
                      {project.name}
                    </span>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted">
                      {project.category} · {project.year}
                    </span>
                  </div>

                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="border border-border px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {firstOutcome && (
                    <div className="mt-2 flex items-baseline gap-3">
                      <span className="font-serif text-3xl text-fg">
                        {firstOutcome.metric}
                      </span>
                      <span className="text-xs text-muted">
                        {firstOutcome.description}
                      </span>
                    </div>
                  )}

                  <span className="mt-auto pt-2 font-mono text-xs text-muted transition-colors group-hover:text-fg">
                    View case study →
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <CtaSection />

      <Footer />
    </>
  );
}
