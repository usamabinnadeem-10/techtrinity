import Image from "next/image";

const CHIPS = ["Ex-Canonical", "5+ Years Production Engineering"];

export function AboutFounder() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-16 lg:gap-20">
          <div data-reveal>
            <figure className="relative">
              <div
                className="relative aspect-square w-full overflow-hidden border border-border"
                style={{ borderRadius: 12, backgroundColor: "#000" }}
              >
                <Image
                  src="/team/usama_hf.png"
                  alt="Portrait of Usama Bin Nadeem, founder of TechTrinity"
                  fill
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover object-center [filter:grayscale(0.3)_contrast(1.02)_brightness(0.94)]"
                  priority
                />
                <span
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(4,9,10,0.55) 0%, rgba(4,9,10,0) 28%, rgba(4,9,10,0) 60%, rgba(4,9,10,0.6) 100%)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 mix-blend-soft-light"
                  style={{
                    background:
                      "radial-gradient(140% 90% at 30% 0%, rgba(184,255,87,0.18) 0%, transparent 55%)",
                  }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, rgba(255,255,255,0.14) 0.9px, transparent 1.4px)",
                    backgroundSize: "8px 8px",
                    opacity: 0.18,
                    maskImage:
                      "radial-gradient(110% 80% at 50% 60%, #000 30%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(110% 80% at 50% 60%, #000 30%, transparent 80%)",
                  }}
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-foreground/35"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-foreground/35"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-foreground/35"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-foreground/35"
                />

                <div className="absolute left-5 top-5 flex flex-col gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/65">
                  <span>Founder / 01</span>
                  <span>Karachi · Remote</span>
                </div>
                <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55">
                  Portrait — TT/01
                </span>
                <span
                  aria-hidden
                  className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[0.18em] text-foreground/55"
                >
                  ◐
                </span>
              </div>

              <figcaption className="mt-6 flex flex-col gap-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <span className="text-foreground">Usama Bin Nadeem</span>
                <span>Founder &amp; Lead Engineer</span>
              </figcaption>
            </figure>
          </div>

          <div data-reveal data-reveal-delay="1">
            <h2 className="font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
              Built by someone who&apos;s{" "}
              <em className="italic text-primary">been on both sides.</em>
            </h2>

            <div className="mt-7 space-y-5 text-[16px] font-light leading-[1.85] text-muted">
              <p>
                I&apos;ve spent years building real products for real companies
                — including two years at{" "}
                <strong className="font-medium text-foreground">
                  Canonical
                </strong>
                , the company behind Ubuntu, where I worked on the platform
                that has processed over{" "}
                <strong className="font-medium text-foreground">
                  10,000 professional certifications
                </strong>
                .
              </p>
              <p>
                Before that I built{" "}
                <strong className="font-medium text-foreground">Hirecinch</strong>
                , an ATS that reduced recruiter time by 30%. I contributed core
                infrastructure to{" "}
                <strong className="font-medium text-foreground">Xenia</strong>{" "}
                as it scaled from $1M to a $12M Series A. I built{" "}
                <strong className="font-medium text-foreground">
                  EasyAccounts
                </strong>
                , a production ERP live across 50+ branches.
              </p>
              <p>
                I started TechTrinity because I kept seeing the same story —
                a founder with a real idea, a real market, and real budget,
                getting handed a broken product by an agency that took the
                money and disappeared.
              </p>
              <p>
                Quality engineering isn&apos;t just about clean code. It&apos;s
                about understanding what a founder actually needs — something
                that works, that can grow, and that doesn&apos;t fall apart
                the moment the agency stops answering emails.
              </p>
              <p>
                That&apos;s what TechTrinity exists to deliver.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-ring bg-primary-soft px-4 py-1.5 font-mono text-[12px] tracking-[0.04em] text-primary"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
