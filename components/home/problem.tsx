import { EditorialLabel } from "./label";

export function Problem() {
  return (
    <section id="problem" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <EditorialLabel>We get it.</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(34px,3.8vw,58px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Most founders don&apos;t fail because of a{" "}
              <em className="italic text-primary">bad idea.</em>
            </h2>
          </div>
          <div
            data-reveal
            data-reveal-delay="2"
            className="space-y-5 text-[17px] font-light leading-[1.85] text-muted"
          >
            <p>
              You&apos;ve probably heard the stories — or lived one. A
              freelancer who disappeared mid-project. An agency that delivered a
              codebase nobody can maintain. Six months and $40,000 later,
              nothing to show investors.
            </p>
            <p>
              We built TechTrinity because that story is too common. You need a
              partner who treats your product like it matters — because to you,
              it does.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
