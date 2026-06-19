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
    name: "Canonical Academy",
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
            Software we shipped —
            <br />
            and teams{" "}
            <em className="font-bold italic text-primary">actually use.</em>
          </h2>
          <p className="mt-3.5 max-w-[600px] text-[17px] font-light leading-[1.7] text-muted">
            Production systems in daily use across the US, UK, and Australia. Not
            prototypes, not slideware — software that&apos;s still running years
            after launch.
          </p>
        </div>

        <article
          data-reveal
          data-reveal-delay="1"
          className="grid items-center gap-12 rounded-lg border border-border bg-card p-10 transition-colors duration-300 hover:border-border-strong md:grid-cols-2 md:p-16"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
              Featured · Wholesale Inventory &amp; Operations
            </p>
            <h3 className="mt-5 font-display text-[clamp(28px,3vw,48px)] font-bold leading-[1.05] tracking-[-0.025em]">
              EasyAccounts ERP
            </h3>
            <p className="mt-3.5 text-[16px] font-light leading-[1.75] text-muted">
              The inventory, stock, and reporting system behind a live wholesale
              textile operation — built to replace spreadsheets and fragile
              backups with real-time numbers the whole team trusts. Three years in
              production and still running.
            </p>
            <Link
              href="/work/easyaccounts"
              className="mt-9 inline-flex items-center gap-2.5 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              View Case Study <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-md border border-border bg-background">
            <Image
              src="/easyaccounts/reports-product-cost-trace.png"
              alt="EasyAccounts ERP product cost trace interface"
              width={1465}
              height={812}
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
                View Case Study →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
