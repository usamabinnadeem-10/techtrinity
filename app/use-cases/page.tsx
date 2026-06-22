import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { USE_CASES } from "@/lib/use-cases";

export const metadata: Metadata = {
  title: "Operations Software Use Cases for Inventory-Heavy Businesses",
  description:
    "Custom software for inventory accuracy, manual reporting, and order workflows — built around how wholesale and distribution teams actually operate.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Operations Software Use Cases — TechTrinity",
    description:
      "Custom software for inventory accuracy, manual reporting, and order workflows.",
    url: "/use-cases",
    type: "website",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-20 md:px-12 md:pt-40 md:pb-24">
          <div className="hero-rise-sm max-w-[720px] [animation-delay:0.1s]">
            <EditorialLabel>Use Cases</EditorialLabel>
            <h1 className="mt-4 font-display text-[clamp(44px,6vw,84px)] font-black leading-[0.96] tracking-[-0.04em]">
              The operational problems{" "}
              <em className="italic font-bold text-primary">we build around.</em>
            </h1>
            <p className="mt-7 max-w-[560px] text-[16px] font-light leading-[1.75] text-muted">
              Custom software for inventory-heavy wholesale, distribution, and
              multi-location businesses — built around the workflows that have
              outgrown spreadsheets and disconnected tools.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 pb-28 md:px-12 md:pb-32">
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.slug}
                href={`/use-cases/${useCase.slug}`}
                className="group relative flex flex-col rounded-lg border border-border bg-card p-10 transition-[border-color,transform] duration-300 hover:-translate-y-px hover:border-primary/30 md:p-12"
              >
                <span className="font-mono text-[11px] tracking-[0.16em] text-muted-foreground">
                  {useCase.num}
                </span>
                <h2 className="mt-10 font-display text-[clamp(28px,3vw,40px)] font-bold leading-[1.05] tracking-[-0.025em]">
                  {useCase.cardTitle}
                </h2>
                <p className="mt-4 max-w-[440px] text-[15px] font-light leading-[1.75] text-muted">
                  {useCase.cardBlurb}
                </p>
                <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    View Use Case
                  </span>
                  <span
                    aria-hidden
                    className="font-mono text-[16px] text-muted-foreground transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
