import { BOOK_HREF, PRIMARY_CTA_HELPER, PRIMARY_CTA_LABEL } from "@/lib/offer";
import { LinkButton } from "./button";
import { EditorialLabel } from "./label";
import { ScreenReel } from "./screen-reel";

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
          <EditorialLabel>Custom software for wholesale &amp; distribution</EditorialLabel>
        </div>

        <h1 className="hero-rise font-display text-[clamp(44px,8vw,116px)] font-black leading-[0.94] tracking-[-0.04em] [text-wrap:balance] [animation-delay:0.35s]">
          Software that keeps your{" "}
          <em className="font-bold italic text-primary">operation moving.</em>
        </h1>

        <p className="hero-rise-sm mt-8 max-w-[600px] text-[18px] font-light leading-[1.7] text-muted [text-wrap:pretty] [animation-delay:0.6s]">
          We design and build tools for stock, orders, and reporting—and connect
          the systems your team already uses. Start with one workflow that costs
          time or creates mistakes, then expand as your business needs.
        </p>
        <p className="hero-rise-sm mt-4 font-display text-[16px] italic tracking-[-0.01em] text-foreground/80 [animation-delay:0.7s]">
          Designed for daily use. Built to maintain and improve.
        </p>

        <div className="hero-rise-sm mt-10 flex w-full flex-col items-stretch justify-center gap-3.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center [animation-delay:0.8s]">
          <LinkButton
            href={BOOK_HREF}
            variant="accent"
            size="lg"
            className="justify-center"
            cta={{ label: PRIMARY_CTA_LABEL, section: "hero" }}
          >
            {PRIMARY_CTA_LABEL}
          </LinkButton>
          <LinkButton
            href="/work/easyaccounts"
            variant="ghost"
            size="lg"
            className="justify-center"
            cta={{ label: "See EasyAccounts", section: "hero" }}
          >
            See EasyAccounts
          </LinkButton>
        </div>
        <p className="hero-fade mt-5 max-w-[440px] text-[13px] leading-[1.6] text-muted-foreground [animation-delay:1s]">
          {PRIMARY_CTA_HELPER}
        </p>
      </div>
    </section>
  );
}
