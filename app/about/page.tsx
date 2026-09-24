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
import { breadcrumbSchema, JsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Usama Nadeem, Founder & CEO of TechTrinity, and the team building custom software for wholesale and distribution — shaped by building EasyAccounts for a live wholesale operation.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — TechTrinity",
    description:
      "The founder and team behind TechTrinity's custom software for wholesale and distribution businesses.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
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
