import { EditorialLabel } from "./label";

export function Problem() {
  return (
    <section id="problem" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <EditorialLabel>We get it.</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(34px,3.8vw,58px)] font-bold leading-[1.08] tracking-[-0.025em]">
              Spreadsheets made sense.{" "}
              <em className="italic text-primary">Until they didn&apos;t.</em>
            </h2>
          </div>
          <div
            data-reveal
            data-reveal-delay="2"
            className="space-y-5 text-[17px] font-light leading-[1.85] text-muted"
          >
            <p>
              Stock errors that take days to reconcile. Three spreadsheets that
              were supposed to talk to each other but never do. A new hire who
              exposes just how fragile the whole system really is.
            </p>
            <p>
              We built TechTrinity to replace the patchwork — with software
              designed around your exact operations, because we map them before
              we build. Simple enough that your team will actually use it. Solid
              enough to grow with your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
