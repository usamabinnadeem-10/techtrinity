import { LinkButton } from "./button";
import { EditorialLabel } from "./label";
import { ScreenReel } from "./screen-reel";

const STATS = [
  "5+ Years in Production",
  "Inventory & Operations Software",
  "Ex-Canonical Engineers",
  "US / UK / AU Clients",
  "Senior-Only Team",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-36 pb-20 text-center md:px-12"
    >
      <ScreenReel />

      {/* Base scrim never reaches full transparency, so the reel stays a faint
          ghost everywhere — corners, nav, and logo included — while a deeper
          vignette behind the headline keeps the copy at full contrast. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_75%_65%_at_50%_42%,rgba(9,9,9,0.92),rgba(9,9,9,0.66)_55%,rgba(9,9,9,0.52)_100%)]"
      />
      {/* Top fade darkens the strip under the transparent nav so the logo and
          links read cleanly against the reel. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-44 [background:linear-gradient(to_bottom,#090909,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 [background:linear-gradient(to_top,#090909,transparent)]"
      />

      <div className="relative z-10 flex w-full max-w-[920px] flex-col items-center">
        <div className="hero-rise-sm mb-8 [animation-delay:0.15s]">
          <EditorialLabel>Custom Operations Software</EditorialLabel>
        </div>

        <h1 className="hero-rise font-display text-[clamp(56px,8vw,124px)] font-black leading-[0.92] tracking-[-0.04em] [text-wrap:balance] [animation-delay:0.35s]">
          Built Around How You{" "}
          <em className="font-bold italic text-primary">Actually Work.</em>
        </h1>

        <p className="hero-rise-sm mt-8 max-w-[560px] text-[18px] font-light leading-[1.7] text-muted [text-wrap:pretty] [animation-delay:0.6s]">
          Wholesale, distribution, and multi-location teams lose hours to
          spreadsheets, stock errors, and systems nobody trusts. We learn how you
          actually run — then build the inventory, warehouse, and reporting tools
          that fit it. Not another SaaS template you bend your business around.
        </p>

        <div className="hero-rise-sm mt-11 flex flex-wrap items-center justify-center gap-3.5 [animation-delay:0.8s]">
          <LinkButton href="/contact" variant="accent" size="lg">
            Book a Workflow Review
          </LinkButton>
          <LinkButton href="#work" variant="ghost" size="lg">
            See Our Work
          </LinkButton>
        </div>
      </div>

      <div className="hero-fade relative z-10 mt-16 flex w-full max-w-[1080px] flex-col items-center gap-3 border-t border-border pt-7 lg:mt-20 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-5 lg:gap-y-2.5 lg:pt-8 [animation-delay:1.2s]">
        {STATS.map((stat, i) => (
          <div key={stat} className="flex items-center gap-x-5">
            {i > 0 && (
              <span
                aria-hidden
                className="hidden select-none text-[15px] font-light text-muted-foreground lg:inline"
              >
                |
              </span>
            )}
            <span className="flex items-center gap-3 font-display text-[14px] font-semibold tracking-[-0.01em] text-foreground/75 transition-colors hover:text-foreground">
              <span
                aria-hidden
                className="block h-px w-3.5 bg-primary lg:hidden"
              />
              {stat}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
