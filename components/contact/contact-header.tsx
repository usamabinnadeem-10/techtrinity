import { EditorialLabel } from "@/components/home/label";
import { ctaAttrs } from "@/lib/cta";
import { RESPONSE_PROMISE } from "@/lib/offer";

const jumpLink =
  "inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted transition-[color,border-color] duration-200 hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ContactHeader() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-14 md:px-12 md:pt-40 md:pb-20">
      <div className="hero-rise-sm mx-auto max-w-[640px] text-center [animation-delay:0.1s]">
        <EditorialLabel>Let&apos;s Build</EditorialLabel>
        <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
          Start a <em className="italic text-primary">conversation.</em>
        </h1>
        <p className="mx-auto mt-7 max-w-[500px] text-[16px] font-light leading-[1.7] text-muted">
          Tell us what you&apos;d like to improve or build. {RESPONSE_PROMISE}{" "}
          Or skip the form and book a free 30-minute workflow review.
        </p>
        <nav
          aria-label="Contact options"
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#message" className={jumpLink}>
            Send a message
          </a>
          <a
            href="#book"
            className={jumpLink}
            {...ctaAttrs("Book a call", "contact-header")}
          >
            Book a call
          </a>
        </nav>
      </div>
    </section>
  );
}
