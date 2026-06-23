import { About } from "@/components/home/about";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { Hero } from "@/components/home/hero";
import { SiteNav } from "@/components/home/nav";
import { OperationalPain } from "@/components/home/operational-pain";
import { Problem } from "@/components/home/problem";
import { Process } from "@/components/home/process";
import { RevealController } from "@/components/home/reveal-controller";
import { Services } from "@/components/home/services";
import { SiteFooter } from "@/components/home/site-footer";
import { Team } from "@/components/home/team";
import { WhenCustom } from "@/components/home/when-custom";
import { Work } from "@/components/home/work";
import {
  disambiguationFaqSchema,
  JsonLd,
  operationsServiceSchema,
} from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[operationsServiceSchema(), disambiguationFaqSchema()]} />
      <AmbientBackground />
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <OperationalPain />
        <Services />
        <WhenCustom />
        <Process />
        <Work />
        <About />
        <Team />
        <CTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
