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
              The people building it —{" "}
              <em className="italic text-primary">in the room with you.</em>
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="text-[15px] font-light leading-[1.8] text-muted md:max-w-[420px]">
              No agency layers, no offshoring, no hand-offs. The names on this
              page are the same hands writing the code that ships to your
              team.
            </p>
          </div>
        </div>

        <TeamCardsRow data-reveal data-reveal-delay="1" />

        <div
          data-reveal
          data-reveal-delay="2"
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-7 md:flex-row md:items-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Small senior team · No juniors hidden behind a logo
          </p>
        </div>
      </div>
    </section>
  );
}
