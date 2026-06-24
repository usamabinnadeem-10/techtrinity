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
import { breadcrumbSchema, JsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four focused services for wholesale, distribution, and operations businesses — custom software built around how you actually work. Clear scope, fixed process, no surprises.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — TechTrinity",
    description:
      "Four focused services for wholesale, distribution, and operations businesses — custom software built around how you actually work.",
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
        <ServicesProcess />
        <ServicesFit />
        <ServicesCTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
