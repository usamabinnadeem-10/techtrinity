import { LinkButton } from "./button";
import { Gallery, type GalleryImage } from "./gallery";
import { EditorialLabel } from "./label";

const STATS = [
  "8+ Products Shipped",
  "React, Django & Node",
  "Ex-Canonical Engineers",
  "US / UK / AU Clients",
  "Senior-Only Team",
];

const PRODUCT_IMAGES: GalleryImage[] = [
  {
    src: "/easyaccounts-laptop.webp",
    alt: "EasyAccounts product interface",
    width: 2614,
    height: 1666,
  },
  {
    src: "/canonical-academy-laptop.webp",
    alt: "Canonical Academy product interface",
    width: 2614,
    height: 1666,
  },
  {
    src: "/xenia-laptop.webp",
    alt: "Xenia product interface",
    width: 2614,
    height: 1666,
  },
  {
    src: "/hirecinch-laptop.webp",
    alt: "Hirecinch product interface",
    width: 2614,
    height: 1666,
  },
];

export function Hero() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 md:px-12">
      <section
        id="hero"
        className="flex min-h-screen flex-col justify-center pt-36 pb-24"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
          <div className="flex-1">
            <div className="hero-rise-sm mb-8 [animation-delay:0.15s]">
              <EditorialLabel>Boutique SaaS Product Studio</EditorialLabel>
            </div>

            <h1 className="hero-rise max-w-[880px] font-display text-[clamp(60px,7.5vw,116px)] font-black leading-[0.95] tracking-[-0.04em] [animation-delay:0.35s]">
              From Idea
              <br />
              to Product—
              <br />
              <em className="font-bold italic text-primary">Done Right.</em>
            </h1>

            <p className="hero-rise-sm mt-9 max-w-[500px] text-[18px] font-light leading-[1.7] text-muted [animation-delay:0.6s]">
              We&apos;re a boutique product studio for non-technical founders.
              We design and build SaaS products on a modern stack — and we stay
              accountable until it ships.
            </p>

            <div className="hero-rise-sm mt-12 flex flex-wrap items-center gap-3.5 [animation-delay:0.8s]">
              <LinkButton href="#cta-sec" variant="accent" size="lg">
                Book a Free Discovery Call
              </LinkButton>
              <LinkButton href="#work" variant="ghost" size="lg">
                See Our Work
              </LinkButton>
            </div>
          </div>

          <div className="hero-fade hidden w-110 shrink-0 lg:block xl:w-120 [animation-delay:1s]">
            <Gallery images={PRODUCT_IMAGES} />
          </div>
        </div>

        <div className="hero-fade mt-22 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-border pt-9 [animation-delay:1.2s]">
          {STATS.map((stat, i) => (
            <div key={stat} className="flex items-center gap-x-5">
              {i > 0 && (
                <span
                  aria-hidden
                  className="select-none text-[15px] font-light text-border"
                >
                  |
                </span>
              )}
              <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-muted-foreground transition-colors hover:text-foreground">
                {stat}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
