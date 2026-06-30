import type { Metadata } from "next";
import { AmbientBackground } from "@/components/home/background";
import { SiteNav } from "@/components/home/nav";
import { RevealController } from "@/components/home/reveal-controller";
import { SiteFooter } from "@/components/home/site-footer";
import { PrivacyContent } from "@/components/privacy/privacy-content";
import { breadcrumbSchema, JsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "How TechTrinity handles your information, including how we use cookies and Google Analytics consent.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy & Cookie Policy — TechTrinity",
    description:
      "How TechTrinity handles your information, including cookies and analytics consent.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy & Cookie Policy", path: "/privacy" },
        ])}
      />
      <AmbientBackground />
      <SiteNav />
      <main>
        <PrivacyContent />
      </main>
      <SiteFooter />
      <RevealController />
    </>
  );
}
