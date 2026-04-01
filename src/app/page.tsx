import { Footer } from "@/components/footer";
import { CtaSection } from "@/components/home/cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { StackStrip } from "@/components/home/stack-strip";
import { WorkPreview } from "@/components/home/work-preview";
import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <HeroSection />
      <StackStrip />
      <WorkPreview />
      <ServicesPreview />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </>
  );
}
