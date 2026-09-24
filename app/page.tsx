import type { Metadata } from "next";
import { AiAutomation } from "@/components/home/ai-automation";
import { AmbientBackground } from "@/components/home/background";
import { BuiltToLast } from "@/components/home/built-to-last";
import { CTA } from "@/components/home/cta";
import { EasyAccountsProof } from "@/components/home/easyaccounts-proof";
import { Faq } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { SiteNav } from "@/components/home/nav";
import { OneWorkflow } from "@/components/home/one-workflow";
import { Problem } from "@/components/home/problem";
import { Process } from "@/components/home/process";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { Team } from "@/components/home/team";
import { Work } from "@/components/home/work";
import {
  HOME_SOCIAL_TITLE,
  HOME_TITLE,
  homeFaqSchema,
  JsonLd,
  operationsServiceSchema,
  SITE_DESCRIPTION,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_SOCIAL_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
  },
};

// Section order follows brief TT-05: attention → interest → desire → proof →
// action. The framework guides the sequence; its labels are never displayed.
export default function HomePage() {
  return (
    <>
      <JsonLd data={[operationsServiceSchema(), homeFaqSchema()]} />
      <AmbientBackground />
      <SiteNav />
      <main>
        <Hero />
        <EasyAccountsProof />
        <Problem />
        <OneWorkflow />
        <AiAutomation />
        <BuiltToLast />
        <Process />
        <Work />
        <Team />
        <Faq />
        <CTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
