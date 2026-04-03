import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceIncludes } from "@/components/services/service-includes";
import { ServiceStack } from "@/components/services/service-stack";
import { ServiceFaq } from "@/components/services/service-faq";
import { CtaSection } from "@/components/home/cta-section";
import { findService } from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.name} — TechTrinity`,
    description: service.description,
    openGraph: {
      title: `${service.name} — TechTrinity`,
      description: service.description,
      url: `https://techtrinity.ai/services/${service.slug}`,
      siteName: "TechTrinity",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = findService(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "TechTrinity",
      url: "https://techtrinity.ai",
    },
    areaServed: "US",
    serviceType: service.name,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <Nav />

      <script type="application/ld+json">
        {JSON.stringify(serviceJsonLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>

      <Container>
        <ServiceHero
          name={service.name}
          tagline={service.tagline}
          description={service.description}
        />
        <ServiceIncludes includes={service.includes} />
        <ServiceStack stack={service.stack} />
        <ServiceFaq faqs={service.faqs} />
      </Container>

      <CtaSection />

      <Footer />
    </>
  );
}
