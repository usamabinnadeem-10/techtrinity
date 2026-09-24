import Image from "next/image";
import {
  FOUNDER_BIO,
  FOUNDER_CANONICAL_BADGE,
  FOUNDER_DISPLAY_NAME,
  FOUNDER_LOCATION,
  FOUNDER_TITLE,
  OWN_PRODUCT_LABEL,
} from "@/lib/offer";

const CHIPS = [`EasyAccounts — ${OWN_PRODUCT_LABEL}`, FOUNDER_CANONICAL_BADGE];

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
                  alt={`Portrait of ${FOUNDER_DISPLAY_NAME}, ${FOUNDER_TITLE} of TechTrinity`}
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
                  <span>{FOUNDER_LOCATION}</span>
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
                <span className="text-foreground">{FOUNDER_DISPLAY_NAME}</span>
                <span>{FOUNDER_TITLE}</span>
              </figcaption>
            </figure>
          </div>

          <div data-reveal data-reveal-delay="1">
            <h2 className="font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
              Built by an operator,{" "}
              <em className="italic text-primary">not just a developer.</em>
            </h2>

            <div className="mt-7 space-y-5 text-[16px] font-light leading-[1.85] text-muted">
              <p className="text-foreground/90">{FOUNDER_BIO}</p>
              <p>
                EasyAccounts started as a replacement for spreadsheets and
                fragile backups. Working on it day to day teaches the lessons
                that matter in operational software: every shortcut in stock,
                permissions, or reporting eventually shows up as a mistake
                someone has to fix.
              </p>
              <p>
                My engineering experience also includes two years at{" "}
                <strong className="font-medium text-foreground">
                  Canonical
                </strong>{" "}
                — the company behind Ubuntu — working in-house on its
                certification platform, and engineering work on{" "}
                <strong className="font-medium text-foreground">Xenia</strong>
                &apos;s operations platform for multi-location teams. Those
                teams ran production systems where downtime and bad data had
                real consequences.
              </p>
              <p>
                I started TechTrinity because the same story kept repeating — a
                business owner with a real operational problem, a real budget,
                and real urgency, handed software built to win a proposal, not
                to survive a Monday-morning stock count.
              </p>
              <p>
                What&apos;s different here happens before any code gets written.
                We sit with your operation first — how stock moves, where the
                numbers break, what your team will actually open every day.
                That&apos;s the only way to build something that gets used
                instead of abandoned.
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
