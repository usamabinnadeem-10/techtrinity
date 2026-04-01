import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/home/cta-section";
import { projects } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.name} — TechTrinity`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — TechTrinity`,
      description: project.tagline,
      url: `https://techtrinity.ai/work/${project.slug}`,
      siteName: "TechTrinity",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: project.name,
    description: project.tagline,
    author: {
      "@type": "Organization",
      name: "TechTrinity",
      url: "https://techtrinity.ai",
    },
  };

  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>

      <Container>
        {/* Breadcrumb */}
        <p className="pb-6 pt-10 font-mono text-xs text-muted">
          <Link href="/work" className="transition-colors hover:text-fg">
            Work
          </Link>
          {" → "}
          {project.name}
        </p>

        {/* Hero */}
        <section className="border-b border-border pb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            {project.category} · {project.year}
          </span>
          <h1 className="mt-3 font-serif text-3xl md:text-5xl tracking-tight text-fg">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-lg font-light text-muted">
            {project.tagline}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-border px-2 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border border-border px-4 py-2 font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              View live site ↗
            </a>
          )}
        </section>

        {/* Outcomes */}
        <section className="border-b border-border py-10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {project.outcomes.map((outcome, index) => (
              <div
                key={outcome.description}
                className={`px-0 pb-6 md:px-6 md:pb-0${index < project.outcomes.length - 1 ? " border-b border-border md:border-b-0 md:border-r" : ""}${index === 0 ? " md:pl-0" : ""}${index === project.outcomes.length - 1 ? " md:pr-0" : ""}`}
              >
                <p className="font-serif text-4xl text-fg">
                  {outcome.metric}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge */}
        <section className="border-b border-border py-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            The Challenge
          </span>
          <p className="mt-4 max-w-3xl font-sans text-base font-light leading-relaxed text-fg">
            {project.challenge}
          </p>
        </section>

        {/* Solution */}
        <section className="border-b border-border py-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            The Solution
          </span>
          <p className="mt-4 max-w-3xl font-sans text-base font-light leading-relaxed text-fg">
            {project.solution}
          </p>
        </section>

        {/* Features */}
        <section className="py-12">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            What we built
          </span>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="border-b border-r border-border p-6"
              >
                <p className="font-sans text-sm font-medium text-fg">
                  {feature.title}
                </p>
                <p className="mt-1 font-sans text-sm font-light leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <CtaSection />

      <Footer />
    </>
  );
}
