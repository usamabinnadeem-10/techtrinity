import { EditorialLabel } from "@/components/home/label";
import { claimStat } from "@/lib/claims";
import { FOUNDER_CANONICAL_BADGE } from "@/lib/offer";

export function AboutCanonical() {
  // Platform-wide figure; shown only once verified in the claims registry.
  const exams = claimStat("canonicalExams");
  return (
    <section className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-[7fr_5fr] md:gap-20">
          <div data-reveal>
            <EditorialLabel>{FOUNDER_CANONICAL_BADGE}</EditorialLabel>
            <h2 className="mt-4 mb-7 font-display text-[clamp(32px,3.8vw,56px)] font-bold leading-[1.04] tracking-[-0.03em]">
              Production engineering,{" "}
              <em className="italic text-primary">in-house at Canonical.</em>
            </h2>
            <div className="space-y-5 text-[16px] font-light leading-[1.85] text-muted">
              <p>
                Before founding TechTrinity, Usama spent two years as an
                engineer at{" "}
                <strong className="font-medium text-foreground">
                  Canonical
                </strong>
                , the company behind Ubuntu, as part of its in-house team on{" "}
                <strong className="font-medium text-foreground">
                  Canonical Academy
                </strong>{" "}
                — the platform engineers use to take Canonical&apos;s
                certification exams.
              </p>
              <p>
                The work covered payment flows, exam scheduling, proctoring
                integration, and badge issuance, with clear separation between
                the frontend, backend-for-frontend, and backend services — on a
                platform used by engineers worldwide.
              </p>
              <p>
                We apply the same habits to client systems of any size: clear
                boundaries between parts of the system, careful handling of
                data, and decisions documented for the next engineer.
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
                Engineering experience
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
                <div
                  className={`flex items-baseline justify-between gap-4${exams ? " border-b border-border pb-4" : ""}`}
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Platform
                  </dt>
                  <dd className="text-right font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    Canonical Academy
                  </dd>
                </div>
                {exams && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {exams.label}
                    </dt>
                    <dd className="text-right font-display text-[15px] font-medium tracking-[-0.01em] text-foreground">
                      {exams.value}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
