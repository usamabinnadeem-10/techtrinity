import { EditorialLabel } from "@/components/home/label";
import { TeamCardsRow } from "@/components/home/team-card";

export function AboutTeam() {
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
              Small by design.{" "}
              <em className="italic text-primary">Senior by default.</em>
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="text-[15px] font-light leading-[1.8] text-muted md:max-w-[420px]">
              We keep the team small on purpose. Every client gets the senior
              people who actually build your system — not a project manager
              relaying messages to a team you&apos;ll never meet.
            </p>
          </div>
        </div>

        <TeamCardsRow data-reveal data-reveal-delay="1" />

        <figure
          data-reveal
          data-reveal-delay="2"
          className="mt-16 border-t border-border pt-14 md:mt-20 md:pt-16"
        >
          <blockquote className="mx-auto max-w-[860px] text-center">
            <span
              aria-hidden
              className="block font-display text-[44px] leading-none text-primary/35 md:text-[56px]"
            >
              &ldquo;
            </span>
            <p className="mt-2 font-display text-[clamp(26px,3.2vw,44px)] italic leading-[1.18] tracking-[-0.02em] text-muted">
              The person you speak to in the discovery call is the person
              mapping and building your system.
            </p>
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
