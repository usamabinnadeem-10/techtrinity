import type { CaseStudy } from "@/lib/case-studies";
import { BrowserFrame } from "./browser-frame";

type Props = {
  caseStudy: CaseStudy;
};

export function CaseHero({ caseStudy }: Props) {
  const { name, meta, headline, heroStats, hero } = caseStudy;

  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-12 pb-24 md:px-12 md:pt-16 md:pb-28">
      <div className="hero-rise-sm flex flex-col gap-6 border-b border-border pb-9 md:flex-row md:items-end md:justify-between md:gap-12 [animation-delay:0.1s]">
        <h1 className="font-display text-[clamp(32px,4.4vw,64px)] font-black leading-[0.95] tracking-[-0.04em]">
          {name}
        </h1>
        <dl className="grid w-full max-w-[360px] gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground md:w-auto md:min-w-[280px]">
          {meta.map((entry) => (
            <div
              key={entry.label}
              className="flex items-baseline justify-between gap-6"
            >
              <dt>{entry.label}</dt>
              <dd className="text-right text-muted">{entry.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h2 className="hero-rise mt-12 max-w-[1080px] font-display text-[clamp(44px,6.4vw,96px)] font-black leading-[0.95] tracking-[-0.04em] [animation-delay:0.3s]">
        {headline.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h2>

      <dl
        className={[
          "hero-rise-sm mt-14 grid grid-cols-1 overflow-hidden border-y border-border [animation-delay:0.55s]",
          heroStats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
        ].join(" ")}
      >
        {heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              "flex flex-col gap-3 py-9",
              i > 0
                ? "border-t border-border md:border-t-0 md:border-l md:pl-14"
                : "",
              "md:px-14 first:md:pl-0",
            ].join(" ")}
          >
            <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {stat.label}
            </dt>
            <dd
              className={[
                "order-1 font-display font-black leading-none tracking-[-0.03em]",
                heroStats.length === 3
                  ? "text-[clamp(28px,2.8vw,44px)]"
                  : "text-[clamp(36px,3.4vw,52px)]",
              ].join(" ")}
            >
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        data-reveal
        data-reveal-delay="1"
        className="mt-14 md:mt-20"
      >
        <BrowserFrame
          image={hero.image}
          url={hero.url}
          priority
          sizes="(min-width: 1240px) 1144px, (min-width: 768px) 90vw, 100vw"
        />
      </div>
    </section>
  );
}
