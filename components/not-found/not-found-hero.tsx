import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import { AisleLinks } from "./aisle-links";
import { RecordCard } from "./record-card";

export function NotFoundHero() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pt-36 pb-24 text-center md:px-12">
      {/* Faint warehouse-floor grid, masked to a soft pool beneath the record
          card so it reads as texture, never as a competing surface. */}
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_55%,#000,transparent_75%)]"
      />

      <div className="relative z-10 flex w-full max-w-[680px] flex-col items-center">
        <div className="hero-rise-sm mb-7 [animation-delay:0.1s]">
          <EditorialLabel>Stock Lookup · Error 404</EditorialLabel>
        </div>

        <h1 className="hero-rise font-display text-[clamp(38px,9vw,84px)] font-black leading-[0.96] tracking-[-0.03em] [text-wrap:balance] [animation-delay:0.25s]">
          This page isn&rsquo;t{" "}
          <em className="font-bold italic text-primary">on the shelf.</em>
        </h1>

        <p className="hero-rise-sm mt-7 max-w-[480px] text-[17px] font-light leading-[1.7] text-muted [text-wrap:pretty] [animation-delay:0.45s]">
          The link you followed points to an item that&rsquo;s been moved,
          renamed, or never stocked. Here&rsquo;s where to pick up again.
        </p>

        <div className="mt-12 flex w-full justify-center">
          <RecordCard />
        </div>

        <div className="hero-rise-sm mt-12 flex flex-wrap items-center justify-center gap-3.5 [animation-delay:0.85s]">
          <LinkButton href="/" variant="accent" size="lg">
            Back to homepage
          </LinkButton>
          <LinkButton href="/contact" variant="ghost" size="lg">
            Book a Call
          </LinkButton>
        </div>

        <div className="mt-14 w-full border-t border-border pt-9">
          <AisleLinks />
        </div>
      </div>
    </section>
  );
}
