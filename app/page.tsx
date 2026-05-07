import { About } from "@/components/home/about";
import { AmbientBackground } from "@/components/home/background";
import { CTA } from "@/components/home/cta";
import { Hero } from "@/components/home/hero";
import { SiteNav } from "@/components/home/nav";
import { Problem } from "@/components/home/problem";
import { Process } from "@/components/home/process";
import { RevealController } from "@/components/home/reveal-controller";
import { Services } from "@/components/home/services";
import { SiteFooter } from "@/components/home/site-footer";
import { Team } from "@/components/home/team";
import { Work } from "@/components/home/work";

export default function HomePage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <Hero />
        <Problem />
        <Services />
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
