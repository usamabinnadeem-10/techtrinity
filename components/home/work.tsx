import Image from "next/image";
import Link from "next/link";
import { ctaAttrs } from "@/lib/cta";
import { EMPLOYMENT_WORK_LABEL } from "@/lib/offer";
import { EditorialLabel } from "./label";

type Project = {
  name: string;
  /** Attribution shown on the card — employment work is never a TechTrinity commission. */
  attribution: string;
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
    name: "Canonical Academy",
    attribution: `${EMPLOYMENT_WORK_LABEL} · in-house at Canonical`,
    description:
      "The certification and learning platform for Canonical — the team behind Ubuntu, one of the world's most-used operating systems.",
    href: "/work/canonical-academy",
    image: {
      src: "/canonical/purchase.png",
      alt: "Canonical Academy purchase flow",
      width: 3456,
      height: 1984,
    },
  },
  {
    name: "Xenia",
    attribution: EMPLOYMENT_WORK_LABEL,
    description:
      "An operations platform for multi-location teams — tasks, checklists, and audits in one place, so nothing slips between sites.",
    href: "/work/xenia",
    image: {
      src: "/xenia/checklist-builder.png",
      alt: "Xenia template builder interface",
      width: 1465,
      height: 812,
    },
  },
  {
    name: "Hirecinch ATS",
    attribution: EMPLOYMENT_WORK_LABEL,
    description:
      "A hiring platform that puts candidates, feedback, and decisions in one place — so teams hire together instead of over email.",
    href: "/work/hirecinch",
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
          <EditorialLabel>Selected Work</EditorialLabel>
          <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
            Selected engineering{" "}
            <em className="font-bold italic text-primary">work.</em>
          </h2>
          <p className="mt-3.5 max-w-[640px] text-[17px] font-light leading-[1.7] text-muted">
            Alongside EasyAccounts, Usama has engineered production platforms
            for other companies. Each project is labelled with how he was
            involved, and its case study describes his exact contribution.
          </p>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
          style={{ gap: 1 }}
        >
          {PROJECTS.map((project) => (
            <article
              key={project.name}
              className="flex flex-col bg-card p-8 transition-colors duration-300 hover:bg-card-elevated"
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
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-primary">
                {project.attribution}
              </p>
              <h3 className="mt-3 font-display text-[24px] font-bold tracking-[-0.02em]">
                {project.name}
              </h3>
              <p className="mt-2.5 text-[14px] font-light leading-[1.7] text-muted">
                {project.description}
              </p>
              <Link
                href={project.href}
                {...ctaAttrs(`View ${project.name} case study`, "work")}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-6 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
              >
                View Case Study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
