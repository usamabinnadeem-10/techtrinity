import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TechTrinity — Full-Stack Software Agency",
  description:
    "TechTrinity builds MVPs, SaaS platforms, APIs, and backends for US-based founders and startups. Senior-level engineering that ships.",
  openGraph: {
    title: "TechTrinity — Full-Stack Software Agency",
    description:
      "TechTrinity builds MVPs, SaaS platforms, APIs, and backends for US-based founders and startups. Senior-level engineering that ships.",
    url: "https://techtrinity.ai",
    siteName: "TechTrinity",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TechTrinity",
  url: "https://techtrinity.ai",
  logo: "https://techtrinity.ai/logo.png",
  description:
    "TechTrinity builds MVPs, SaaS platforms, APIs, and backends for US-based founders and startups. Senior-level engineering that ships.",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <body>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <main>{children}</main>
      </body>
    </html>
  );
}
