import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { ServiceDetailBack } from "@/components/services/service-detail-back";
import { ServiceDetailCallout } from "@/components/services/service-detail-callout";
import { ServiceDetailCTA } from "@/components/services/service-detail-cta";
import { ServiceDetailFit } from "@/components/services/service-detail-fit";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceDetailOverview } from "@/components/services/service-detail-overview";
import { ServiceDetailProcess } from "@/components/services/service-detail-process";
import { ServiceDetailScope } from "@/components/services/service-detail-scope";
import {
  getAllServiceSlugs,
  getServiceDetail,
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
  const metaTitle = service.metaTitle ?? service.title;
  return {
    title: metaTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${metaTitle} — ${SITE_NAME}`,
      description,
      url: path,
      type: "website",
    },
  };
}

function serviceSchema(service: ServiceDetail): Record<string, unknown> {
  const url = absoluteUrl(`/services/${service.slug}`);

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
  };
}

function faqSchema(service: ServiceDetail): Record<string, unknown> {
  const includedAnswer = service.included.join("; ");
  const notIncludedAnswer = service.notIncluded.join("; ");

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What's included in ${service.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: includedAnswer,
        },
      },
      {
        "@type": "Question",
        name: `What isn't included in ${service.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: notIncludedAnswer,
        },
      },
      {
        "@type": "Question",
        name: `Who is ${service.title} for?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: service.idealFor,
        },
      },
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

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd
        data={[serviceSchema(service), faqSchema(service), breadcrumbs]}
      />
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
        <ServiceDetailFit idealFor={service.idealFor} />
        <ServiceDetailCTA prompt={service.ctaPrompt} label={service.ctaLabel} />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
