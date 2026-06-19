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
  title: "About",
  description:
    "Custom inventory and operations software for growing distribution and multi-location businesses — built by an operator who's run a live ERP across 50+ branches, not an agency that just launched last week.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — TechTrinity",
    description:
      "Custom inventory and operations software for distribution and multi-location businesses — built by an operator who's run a live ERP across 50+ branches.",
    url: "/about",
    type: "website",
  },
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
