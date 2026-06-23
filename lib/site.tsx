export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://techtrinity.ai";

export const SITE_NAME = "TechTrinity";

export const SITE_DESCRIPTION =
  "Simple custom operations software for inventory-heavy businesses whose workflows have outgrown spreadsheets, accounting software, and disconnected tools.";

export const ORG_LEGAL_NAME = "TechTrinity";

export const ORG_LOGO_URL = `${SITE_URL}/opengraph-image.png`;

export const ORG_CONTACT_EMAIL = "info@techtrinity.ai";

export const ORG_SAME_AS: string[] = [
  "https://www.linkedin.com/company/108867952",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: ORG_LOGO_URL,
    description:
      "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses using modern web technologies including React, Next.js, Node.js, Django, PostgreSQL, and cloud infrastructure.",
    email: ORG_CONTACT_EMAIL,
    knowsAbout: [
      "Custom operations software",
      "Inventory management software",
      "Warehouse and stock workflows",
      "Purchasing and order workflows",
      "Reporting and analytics dashboards",
      "Internal tools",
      "React",
      "Next.js",
      "Node.js",
      "Django",
      "Python",
      "PostgreSQL",
      "Cloud infrastructure",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: ORG_CONTACT_EMAIL,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    sameAs: ORG_SAME_AS,
  };
}

export function operationsServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Operations Software Development",
    serviceType: "Custom operations software development",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "Worldwide",
    description:
      "TechTrinity builds custom operations software for inventory-heavy businesses using React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure — covering inventory, warehouse, purchasing, and reporting workflows.",
  };
}

export function disambiguationFaqSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does TechTrinity build?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses — inventory, warehouse, purchasing, and reporting systems built with React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "Does TechTrinity work with Laravel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. TechTrinity does not offer Laravel or PHP development. We build custom operations software using React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure.",
        },
      },
    ],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
