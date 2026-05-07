import Image from "next/image";
import Link from "next/link";
import { EditorialLabel } from "./label";

type Project = {
  name: string;
  description: string;
  href: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

const PROJECTS: Project[] = [
  {
    name: "EasyAccounts ERP",
    description:
      "Cloud-native multi-tenant ERP system for wholesale textile trading businesses.",
    href: "#",
    image: {
      src: "/easyaccounts/product-cost-trace.png",
      alt: "EasyAccounts ERP product cost trace interface",
      width: 3456,
      height: 1916,
    },
  },
  {
    name: "Xenia ERP",
    description:
      "A full-scale enterprise resource planning system built for complex operational workflows.",
    href: "#",
    image: {
      src: "/xenia/documents.png",
      alt: "Xenia ERP documents interface",
      width: 1440,
      height: 900,
    },
  },
  {
    name: "Hirecinch",
    description:
      "A modern hiring platform designed to streamline candidate evaluation and team collaboration.",
    href: "#",
    image: {
      src: "/hirecinch/applicants.png",
      alt: "Hirecinch applicants dashboard",
      width: 1433,
      height: 895,
    },
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
          <div className="relative overflow-hidden rounded-md border border-border bg-background">
            <Image
              src="/canonical/purchase.png"
              alt="Canonical Academy purchase flow"
              width={3456}
              height={1984}
              sizes="(min-width: 768px) 540px, 100vw"
              className="h-auto w-full"
            />
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
              className="flex flex-col bg-card p-10 transition-colors duration-300 hover:bg-card-elevated"
            >
              <div className="relative mb-9 aspect-video w-full overflow-hidden rounded-sm border border-border bg-transparent">
                {project.image ? (
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-display text-[22px] font-bold tracking-[-0.02em] text-muted-foreground">
                        {project.name}
                      </p>
                      <p className="mt-1.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                        CASE STUDY · SOON
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <h3 className="font-display text-[24px] font-bold tracking-[-0.02em]">
                {project.name}
              </h3>
              <p className="mt-2.5 text-[14px] font-light leading-[1.7] text-muted">
                {project.description}
              </p>
              <Link
                href={project.href}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
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
