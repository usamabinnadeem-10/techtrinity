import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { LinkButton } from "@/components/home/button";
import { EditorialLabel } from "@/components/home/label";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import {
  getAllUseCaseSlugs,
  getUseCase,
} from "@/lib/use-cases";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllUseCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return { title: "Use Case" };
  const path = `/use-cases/${slug}`;
  return {
    title: { absolute: `${useCase.metaTitle} | TechTrinity` },
    description: useCase.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${useCase.metaTitle} — TechTrinity`,
      description: useCase.metaDescription,
      url: path,
      type: "website",
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Use Cases", path: "/use-cases" },
    { name: useCase.cardTitle, path: `/use-cases/${useCase.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AmbientBackground />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-[1240px] px-6 pt-32 pb-16 md:px-12 md:pt-40 md:pb-20">
          <div className="hero-rise-sm max-w-[860px] [animation-delay:0.1s]">
            <EditorialLabel>Use Case {useCase.num}</EditorialLabel>
            <h1 className="mt-5 font-display text-[clamp(44px,6.5vw,96px)] font-black leading-[0.96] tracking-[-0.04em]">
              {useCase.heroLead}{" "}
              <em className="italic font-bold text-primary">{useCase.heroEmphasis}</em>
            </h1>
            <p className="mt-7 max-w-[600px] text-[17px] font-light leading-[1.75] text-muted">
              {useCase.subhead}
            </p>
            <div className="mt-10">
              <LinkButton href="/contact" variant="accent" size="lg">
                Book a Workflow Review
              </LinkButton>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-border py-24 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
              <div data-reveal>
                <EditorialLabel>The Problem</EditorialLabel>
                <h2 className="mt-4 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.08] tracking-[-0.025em]">
                  {useCase.problemHeadline}
                </h2>
              </div>
              <ul data-reveal data-reveal-delay="2" className="space-y-5">
                {useCase.problemBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3.5 text-[16px] font-light leading-[1.7] text-muted"
                  >
                    <span aria-hidden className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-border-strong" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* What we build */}
        <section className="border-t border-border bg-card py-24 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="mb-12" data-reveal>
              <EditorialLabel>What We Build</EditorialLabel>
              <h2 className="mt-3.5 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
                {useCase.buildHeadline}
              </h2>
            </div>
            <ul data-reveal data-reveal-delay="1" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {useCase.buildItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-5 text-[15px] font-light leading-[1.5] text-foreground"
                >
                  <span aria-hidden className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Outcome + proof */}
        <section className="border-t border-border py-24 md:py-28">
          <div className="mx-auto max-w-[820px] px-6 text-center md:px-12">
            <p className="font-display text-[clamp(24px,3vw,38px)] font-bold leading-[1.2] tracking-[-0.02em]">
              {useCase.outcome}
            </p>
            <Link
              href="/work/easyaccounts"
              className="mt-9 inline-flex items-center gap-2 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              See the EasyAccounts Case Study <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="border-y border-border bg-card py-24 md:py-28">
          <div className="mx-auto max-w-[760px] px-6 text-center md:px-12">
            <EditorialLabel>Next Step</EditorialLabel>
            <h2 className="mt-4 mb-8 font-display text-[clamp(34px,4.6vw,64px)] font-black leading-[0.98] tracking-[-0.035em]">
              Ready to fix this{" "}
              <em className="italic text-primary">in your operation?</em>
            </h2>
            <LinkButton href="/contact" variant="accent" size="lg">
              Book a Workflow Review
            </LinkButton>
          </div>
        </section>
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
