import type { Metadata } from "next";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { ServicesCTA } from "@/components/services/services-cta";
import { ServicesFit } from "@/components/services/services-fit";
import { ServicesGrid } from "@/components/services/services-grid";
import { ServicesHeader } from "@/components/services/services-header";
import { ServicesProcess } from "@/components/services/services-process";
import { ServicesSecondary } from "@/components/services/services-secondary";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

const DESCRIPTION =
  "Workflow assessments, defined builds, phased larger builds, and ongoing support for wholesale and distribution — plus AI automation, MVPs, and websites.";

export const metadata: Metadata = {
  title: "Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — TechTrinity",
    description: DESCRIPTION,
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <AmbientBackground />
      <SiteNav />
      <main>
        <ServicesHeader />
        <ServicesGrid />
        <ServicesSecondary />
        <ServicesProcess />
        <ServicesFit />
        <ServicesCTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
