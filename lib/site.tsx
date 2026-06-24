export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://techtrinity.ai";

export const SITE_NAME = "TechTrinity";

export const SITE_DESCRIPTION =
  "Simple custom operations software for inventory-heavy businesses whose workflows have outgrown spreadsheets, accounting software, and disconnected tools.";

export const ORG_LEGAL_NAME = "TechTrinity";

export const ORG_LOGO_URL = `${SITE_URL}/tt-logo.png`;

export const ORG_CONTACT_EMAIL = "info@techtrinity.ai";

// Stable @id anchors so entities can reference each other across the
// separate JSON-LD blocks rendered on a page (Organization <-> Person <-> WebSite).
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#founder`;

// Organization sameAs holds the company's own profiles only. The founder's
// personal profiles live on the Person entity; the org connects to them via `founder`.
export const ORG_SAME_AS: string[] = [
  "https://www.linkedin.com/company/108867952",
];

export const FOUNDER_NAME = "Usama Bin Nadeem";
export const FOUNDER_ALT_NAME = "Usama Nadeem";
export const FOUNDER_IMAGE_URL = `${SITE_URL}/team/usama_hf.png`;

export const FOUNDER_SAME_AS: string[] = [
  "https://www.linkedin.com/in/usama-bin-nadeem/",
  "https://github.com/usamabinnadeem-10",
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
      // Escape `<` to its unicode equivalent so externally-sourced strings
      // (e.g. Sanity post/author content) can't break out of the script tag (XSS).
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: ORG_LOGO_URL,
    },
    description:
      "TechTrinity builds custom operations software for inventory-heavy wholesale, distribution, and multi-location businesses using modern web technologies including React, Next.js, Node.js, Django, PostgreSQL, and cloud infrastructure.",
    email: ORG_CONTACT_EMAIL,
    founder: { "@id": PERSON_ID },
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

export function founderPersonSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: FOUNDER_NAME,
    alternateName: FOUNDER_ALT_NAME,
    url: `${SITE_URL}/about`,
    image: FOUNDER_IMAGE_URL,
    jobTitle: "Founder & Lead Engineer",
    worksFor: { "@id": ORG_ID },
    description:
      "Founder and lead engineer of TechTrinity. Built EasyAccounts, a custom ERP running live across 50+ branches for an inventory-heavy wholesale business. Previously an engineer at Canonical, the company behind Ubuntu, and built core infrastructure for Xenia.",
    knowsAbout: [
      "Inventory management systems",
      "ERP systems",
      "Custom operations software",
      "Wholesale and distribution operations",
      "Warehouse and stock workflows",
      "Purchasing and order workflows",
      "Django",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Cloud infrastructure",
    ],
    sameAs: FOUNDER_SAME_AS,
  };
}

// True when a blog author is the founder, so the post can reference the
// canonical Person entity by @id instead of duplicating an inline Person.
export function isFounderAuthor(name?: string | null): boolean {
  if (!name) return false;
  const normalized = name.trim().toLowerCase();
  return (
    normalized === FOUNDER_NAME.toLowerCase() ||
    normalized === FOUNDER_ALT_NAME.toLowerCase()
  );
}

export function easyAccountsSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/work/easyaccounts#software`,
    name: "EasyAccounts",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ERP",
    operatingSystem: "Web",
    url: "https://app.easyaccounts.com",
    description:
      "EasyAccounts is a custom ERP built by TechTrinity for inventory-heavy wholesale and distribution businesses. Live across 50+ branches, it handles purchasing, sales, inventory, financial reporting, cheque management, and role-based access control.",
    featureList: [
      "Multi-branch inventory tracking",
      "Real-time financial reporting",
      "Stock and cost tracing",
      "Role-based permissions (172-permission access control)",
      "Immutable audit logs",
      "Purchasing and sales workflows",
      "Cheque management",
    ],
    creator: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    author: { "@id": PERSON_ID },
  };
}

export function operationsServiceSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Operations Software Development",
    serviceType: "Custom operations software development",
    provider: { "@id": ORG_ID },
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
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
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
