import Link from "next/link";
import { EditorialLabel } from "./label";

type Project = {
  name: string;
  description: string;
  href: string;
};

const PROJECTS: Project[] = [
  {
    name: "Xenia ERP",
    description:
      "A full-scale enterprise resource planning system built for complex operational workflows.",
    href: "#",
  },
  {
    name: "Hirecinch",
    description:
      "A modern hiring platform designed to streamline candidate evaluation and team collaboration.",
    href: "#",
  },
  {
    name: "Jewelicate",
    description:
      "A Next.js + NestJS e-commerce platform for a premium jewellery brand with complex inventory needs.",
    href: "#",
  },
];

export function Work() {
  return (
    <section id="work" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="mb-14" data-reveal>
          <EditorialLabel>Our Work</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            Products we&apos;ve designed,
            <br />
            built, and shipped.
          </h2>
        </div>

        <article
          data-reveal
          data-reveal-delay="1"
          className="grid items-center gap-12 rounded-lg border border-border bg-card p-10 transition-colors duration-300 hover:border-border-strong md:grid-cols-2 md:p-16"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Featured · Enterprise Platform
            </p>
            <h3 className="mt-5 font-display text-[clamp(28px,3vw,48px)] font-bold leading-[1.05] tracking-[-0.025em]">
              Canonical Academy
            </h3>
            <p className="mt-3.5 text-[16px] font-light leading-[1.75] text-muted">
              A certification and learning platform built for one of the
              world&apos;s leading open-source companies — the team behind
              Ubuntu.
            </p>
            <Link
              href="#"
              className="mt-9 inline-flex items-center gap-2.5 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Case Study <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-md border border-border bg-background md:h-[300px]">
            <span aria-hidden className="grid-bg absolute inset-0 opacity-60" />
            <div className="relative flex h-full items-center justify-center">
              <div className="text-center">
                <p className="font-display text-[30px] font-bold tracking-[-0.02em] text-muted-foreground">
                  Canonical
                </p>
                <p className="mt-2 font-mono text-[11px] tracking-[0.1em] text-muted-foreground">
                  ACADEMY PLATFORM
                </p>
              </div>
            </div>
          </div>
        </article>

        <div
          data-reveal
          data-reveal-delay="2"
          className="mt-4 grid overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
          style={{ gap: 1 }}
        >
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="bg-card p-10 transition-colors duration-300 hover:bg-card-elevated"
            >
              <h3 className="font-display text-[24px] font-bold tracking-[-0.02em]">
                {project.name}
              </h3>
              <p className="mt-2.5 text-[14px] font-light leading-[1.7] text-muted">
                {project.description}
              </p>
              <Link
                href={project.href}
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
              >
                View Project →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
