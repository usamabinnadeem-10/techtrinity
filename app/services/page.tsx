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

export const metadata: Metadata = {
  title: "Services — TechTrinity",
  description:
    "Four focused services for non-technical SaaS founders — Product Sprint, Build-Only, Growth Retainer, and Technical Audit. Clear scope, fixed process, no surprises.",
};

export default function ServicesPage() {
  return (
    <>
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
