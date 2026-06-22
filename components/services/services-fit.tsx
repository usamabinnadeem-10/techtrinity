import { EditorialLabel } from "@/components/home/label";

const GOOD_FIT = [
  `Your operation has grown past what spreadsheets can manage`,
  `Stock, orders, purchasing, or reports are split across too many places`,
  `The owner or ops team cannot fully trust the numbers`,
  `You want software built around your workflow, not a SaaS template`,
  `You need something simple enough that warehouse/admin staff will actually use it`,
  `You're the decision-maker or can bring the decision-maker into the process`,
];

const BAD_FIT = [
  `A standard SaaS tool already fits your workflow well`,
  `There's no real operational friction yet`,
  `You only want the cheapest developer`,
  `You need a rushed two-week build for a complex workflow`,
  `You want to resell the software as a SaaS product`,
  `You cannot give access to the people who actually run the process`,
];

export function ServicesFit() {
  return (
    <section className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-14 md:grid-cols-[5fr_7fr] md:gap-20">
          <div data-reveal>
            <EditorialLabel>Right Fit</EditorialLabel>
            <h2 className="mt-4 font-display text-[clamp(32px,3.6vw,54px)] font-bold leading-[1.05] tracking-[-0.025em]">
              We&apos;re selective about{" "}
              <em className="italic text-primary">who we work with.</em>
            </h2>
          </div>

          <div
            data-reveal
            data-reveal-delay="1"
            className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2"
          >
            <div className="bg-card p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                We&apos;re a good fit if
              </p>
              <ul className="mt-7 space-y-5">
                {GOOD_FIT.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-[15px] font-light leading-[1.6] text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                We&apos;re not a good fit if
              </p>
              <ul className="mt-7 space-y-5">
                {BAD_FIT.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3.5 text-[15px] font-light leading-[1.6] text-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
