import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { ServiceDetailBack } from "@/components/services/service-detail-back";
import { ServiceDetailCallout } from "@/components/services/service-detail-callout";
import { ServiceDetailCTA } from "@/components/services/service-detail-cta";
import { ServiceDetailFitPrice } from "@/components/services/service-detail-fit-price";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceDetailOverview } from "@/components/services/service-detail-overview";
import { ServiceDetailProcess } from "@/components/services/service-detail-process";
import { ServiceDetailScope } from "@/components/services/service-detail-scope";
import { getAllServiceSlugs, getServiceDetail } from "@/lib/services";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) {
    return { title: "Service — TechTrinity" };
  }
  return {
    title: `${service.title} — TechTrinity`,
    description: service.overview[0],
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const service = getServiceDetail(slug);
  if (!service) notFound();

  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <ServiceDetailBack />
        <ServiceDetailHero service={service} />
        <ServiceDetailOverview paragraphs={service.overview} />
        <ServiceDetailScope
          included={service.included}
          notIncluded={service.notIncluded}
        />
        {service.process && <ServiceDetailProcess steps={service.process} />}
        {service.callout && <ServiceDetailCallout callout={service.callout} />}
        <ServiceDetailFitPrice
          idealFor={service.idealFor}
          priceDetail={service.priceDetail}
        />
        <ServiceDetailCTA prompt={service.ctaPrompt} label={service.ctaLabel} />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
