import Link from "next/link";
import { ctaAttrs } from "@/lib/cta";
import {
  FOUNDER_CANONICAL_BADGE,
  FOUNDER_DISPLAY_NAME,
  FOUNDER_TITLE,
} from "@/lib/offer";
import { EditorialLabel } from "./label";
import { TeamCardsRow } from "./team-card";

export function Team() {
  return (
    <section id="team" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="mb-14 grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16"
        >
          <div>
            <EditorialLabel>The Team</EditorialLabel>
            <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
              The people responsible{" "}
              <em className="italic text-primary">for your project.</em>
            </h2>
          </div>
          <div className="space-y-4 text-[15px] font-light leading-[1.8] text-muted md:max-w-[440px] md:justify-self-end">
            <p>
              TechTrinity is led by {FOUNDER_DISPLAY_NAME}, {FOUNDER_TITLE}, who
              built EasyAccounts and has {FOUNDER_CANONICAL_BADGE.toLowerCase()}.
              You work directly with the people responsible for the project—no
              account-management layer between you and the work.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-[0.04em] text-muted-foreground transition-colors hover:text-primary"
              {...ctaAttrs("About TechTrinity", "team")}
            >
              More about the founder and team →
            </Link>
          </div>
        </div>

        <TeamCardsRow data-reveal data-reveal-delay="1" />

        <p
          data-reveal
          data-reveal-delay="2"
          className="mt-10 border-t border-border pt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
        >
          Built with React, Next.js, Node.js, Django &amp; PostgreSQL
        </p>
      </div>
    </section>
  );
}
