import { EditorialLabel } from "@/components/home/label";

export function AboutCanonical() {
  return (
    <section className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-[7fr_5fr] md:gap-20">
          <div data-reveal>
            <EditorialLabel>Credibility</EditorialLabel>
            <h2 className="mt-4 mb-7 font-display text-[clamp(32px,3.8vw,56px)] font-bold leading-[1.04] tracking-[-0.03em]">
              Not an agency that{" "}
              <em className="italic text-primary">just launched last week.</em>
            </h2>
            <div className="space-y-5 text-[16px] font-light leading-[1.85] text-muted">
              <p>
                TechTrinity isn&apos;t a freelancer who picked up a few projects
                last quarter. It&apos;s built on production engineering — the
                kind where downtime and bad data have real consequences.
              </p>
              <p>
                Two of those years were inside{" "}
                <strong className="font-medium text-foreground">
                  Canonical
                </strong>
                , the company behind Ubuntu, on systems used by engineers
                worldwide.
              </p>
              <p>
                That&apos;s the standard we hold every project to — whether
                it&apos;s a global platform or a stock system for three
                warehouses. Same discipline. Same care about the details.
              </p>
            </div>
          </div>

          <aside
            data-reveal
            data-reveal-delay="2"
            className="relative overflow-hidden rounded-lg border border-border bg-card-elevated p-10 md:p-12"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #b8ff57 1px, transparent 1.5px)",
                backgroundSize: "14px 14px",
                maskImage:
                  "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 70%)",
              }}
            />

            <span
              aria-hidden
              className="pointer-events-none absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />

            <div className="relative flex flex-col items-center text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Engineering Heritage
              </span>

              <div className="mt-8 flex items-baseline gap-2">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 rounded-full bg-primary"
                />
                <span className="font-display text-[clamp(40px,5vw,60px)] font-bold leading-none tracking-[-0.04em]">
                  Canonical
                </span>
              </div>

              <p className="mt-5 font-display text-[17px] italic leading-[1.4] tracking-[-0.01em] text-muted">
                &ldquo;The company behind Ubuntu&rdquo;
              </p>

              <span
                aria-hidden
                className="my-8 block h-px w-16 bg-border-strong"
              />

              <dl className="grid w-full max-w-[280px] gap-5 text-left">
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Tenure
                  </dt>
                  <dd className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    2 Years
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Discipline
                  </dt>
                  <dd className="font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    Production Engineering
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Platform
                  </dt>
                  <dd className="text-right font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    10,000+ exams
                    <br />
                    <span className="text-[13px] font-normal text-muted">
                      conducted
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
