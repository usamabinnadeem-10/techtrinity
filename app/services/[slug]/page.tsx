import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/analytics/track-view";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { ServiceDetailBack } from "@/components/services/service-detail-back";
import { ServiceDetailCallout } from "@/components/services/service-detail-callout";
import { ServiceDetailCapabilities } from "@/components/services/service-detail-capabilities";
import { ServiceDetailCTA } from "@/components/services/service-detail-cta";
import { ServiceDetailFaq } from "@/components/services/service-detail-faq";
import { ServiceDetailFitPrice } from "@/components/services/service-detail-fit-price";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceDetailList } from "@/components/services/service-detail-list";
import { ServiceDetailOverview } from "@/components/services/service-detail-overview";
import { ServiceDetailProcess } from "@/components/services/service-detail-process";
import { ServiceDetailRelatedWork } from "@/components/services/service-detail-related-work";
import { ServiceDetailScope } from "@/components/services/service-detail-scope";
import {
  getAllServiceSlugs,
  getServiceDetail,
  getServiceFaqs,
  getStartingPriceUSD,
  isMonthlyPrice,
  serviceMetaTitle,
  type ServiceDetail,
} from "@/lib/services";
import {
  absoluteUrl,
  breadcrumbSchema,
  JsonLd,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

type RouteParams = { slug: string };

const META_DESC_LIMIT = 155;

function trimDescription(text: string): string {
  if (text.length <= META_DESC_LIMIT) return text;
  const cut = text.slice(0, META_DESC_LIMIT - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 80 ? lastSpace : cut.length).trim()}…`;
}

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
    return { title: "Service" };
  }
  const description = trimDescription(service.overview[0]);
  const path = `/services/${slug}`;
  const title = service.metaTitle ?? service.title;
  // Absolute titles already carry "| TechTrinity"; don't append it again.
  const ogTitle =
    typeof title === "string"
      ? `${title} — ${SITE_NAME}`
      : serviceMetaTitle(service);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: ogTitle,
      description,
      url: path,
      type: "website",
    },
  };
}

function serviceSchema(service: ServiceDetail): Record<string, unknown> {
  const url = absoluteUrl(`/services/${service.slug}`);
  // Unpriced services ("Quoted after a scope review.") emit no Offer.
  const price = getStartingPriceUSD(service);
  const monthly = isMonthlyPrice(service);

  const offers =
    price !== null
      ? {
          "@type": "Offer",
          priceCurrency: "USD",
          price,
          url,
          availability: "https://schema.org/InStock",
          ...(monthly
            ? {
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price,
                  priceCurrency: "USD",
                  referenceQuantity: {
                    "@type": "QuantitativeValue",
                    value: 1,
                    unitCode: "MON",
                  },
                },
              }
            : {}),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    url,
    description: service.overview.join(" "),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "Worldwide",
    audience: {
      "@type": "Audience",
      audienceType: service.idealFor,
    },
    ...(offers ? { offers } : {}),
  };
}

function question(name: string, text: string): Record<string, unknown> {
  return {
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  };
}

/** FAQ JSON-LD built only from copy that is visible on the page. */
function faqSchema(service: ServiceDetail): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      question(
        `What's included in ${service.title}?`,
        service.included.join("; "),
      ),
      question(
        `What isn't included in ${service.title}?`,
        service.notIncluded.join("; "),
      ),
      question(`Who is ${service.title} for?`, service.idealFor),
      question(
        `How much does ${service.title} cost?`,
        service.priceDetail.join(" "),
      ),
      ...getServiceFaqs(service).map((faq) =>
        question(faq.question, faq.answer),
      ),
    ],
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

  const path = `/services/${service.slug}`;
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ]);

  return (
    <>
      <JsonLd
        data={[serviceSchema(service), faqSchema(service), breadcrumbs]}
      />
      <TrackView event="service_view" slug={service.slug} />
      <AmbientBackground />
      <SiteNav />
      <main>
        <ServiceDetailBack />
        <ServiceDetailHero service={service} />
        <ServiceDetailOverview paragraphs={service.overview} />
        {service.capabilities && (
          <ServiceDetailCapabilities block={service.capabilities} />
        )}
        <ServiceDetailScope
          included={service.included}
          notIncluded={service.notIncluded}
          includedLabel={service.includedLabel}
          note={service.scopeNote}
        />
        {service.process && <ServiceDetailProcess process={service.process} />}
        {service.detailBlocks?.map((block) => (
          <ServiceDetailList key={block.label} block={block} />
        ))}
        {service.callout && <ServiceDetailCallout callout={service.callout} />}
        {service.relatedWork && (
          <ServiceDetailRelatedWork block={service.relatedWork} />
        )}
        <ServiceDetailFitPrice
          idealFor={service.idealFor}
          priceDetail={service.priceDetail}
        />
        <ServiceDetailFaq faqs={getServiceFaqs(service)} currentPath={path} />
        <ServiceDetailCTA
          prompt={service.ctaPrompt}
          label={service.ctaLabel}
          intent={service.intent}
          primary={service.ctaPrimary}
          body={service.ctaBody}
        />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
