import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { BackNav } from "@/components/case-study/back-nav";
import { CaseArchitecture } from "@/components/case-study/case-architecture";
import { CaseChallenge } from "@/components/case-study/case-challenge";
import { CaseControls } from "@/components/case-study/case-controls";
import { CaseCTA } from "@/components/case-study/case-cta";
import { CaseFlow } from "@/components/case-study/case-flow";
import { CaseHero } from "@/components/case-study/case-hero";
import { CaseJourney } from "@/components/case-study/case-journey";
import { CaseOutcomes } from "@/components/case-study/case-outcomes";
import { CaseOverview } from "@/components/case-study/case-overview";
import { CasePlatform } from "@/components/case-study/case-platform";
import { CaseReview } from "@/components/case-study/case-review";
import { CaseScorecard } from "@/components/case-study/case-scorecard";
import { CaseSpotlight } from "@/components/case-study/case-spotlight";
import { getAllCaseStudySlugs, getCaseStudy } from "@/lib/case-studies";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) {
    return { title: "Case Study — TechTrinity" };
  }
  return {
    title: `${caseStudy.name} — TechTrinity`,
    description: caseStudy.headline.join(" "),
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <BackNav />
        <CaseHero caseStudy={caseStudy} />
        {caseStudy.overview && <CaseOverview caseStudy={caseStudy} />}
        {caseStudy.challenge && <CaseChallenge caseStudy={caseStudy} />}
        {caseStudy.architecture && <CaseArchitecture caseStudy={caseStudy} />}
        {caseStudy.flow && <CaseFlow caseStudy={caseStudy} />}
        {caseStudy.platform && <CasePlatform caseStudy={caseStudy} />}
        {caseStudy.controls && <CaseControls caseStudy={caseStudy} />}
        {caseStudy.scorecard && <CaseScorecard caseStudy={caseStudy} />}
        {caseStudy.review && <CaseReview caseStudy={caseStudy} />}
        {caseStudy.journey && <CaseJourney caseStudy={caseStudy} />}
        {caseStudy.spotlight && <CaseSpotlight caseStudy={caseStudy} />}
        <CaseOutcomes caseStudy={caseStudy} />
        <CaseCTA caseStudy={caseStudy} />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
