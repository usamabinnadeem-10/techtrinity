import type { Metadata } from "next";
import { AboutCanonical } from "@/components/about/about-canonical";
import { AboutCTA } from "@/components/about/about-cta";
import { AboutFounder } from "@/components/about/about-founder";
import { AboutHeader } from "@/components/about/about-header";
import { AboutTeam } from "@/components/about/about-team";
import { AboutValues } from "@/components/about/about-values";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";

export const metadata: Metadata = {
  title: "About — TechTrinity",
  description:
    "We started TechTrinity because founders deserve better. A small, senior team built on real engineering experience — not freelance projects and side builds.",
};

export default function AboutPage() {
  return (
    <>
      <AmbientBackground />
      <SiteNav />
      <main>
        <AboutHeader />
        <AboutFounder />
        <AboutTeam />
        <AboutValues />
        <AboutCanonical />
        <AboutCTA />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
