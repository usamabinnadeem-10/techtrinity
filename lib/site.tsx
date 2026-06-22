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
      "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses.",
    email: ORG_CONTACT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      email: ORG_CONTACT_EMAIL,
      contactType: "customer support",
      availableLanguage: ["English"],
    },
    sameAs: ORG_SAME_AS,
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
