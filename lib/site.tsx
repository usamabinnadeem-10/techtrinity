import { claimStat, claimText } from "@/lib/claims";
import { BUYER_FAQ, FOUNDER_TITLE } from "@/lib/offer";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://techtrinity.ai";

export const SITE_NAME = "TechTrinity";

export const SITE_DESCRIPTION =
  "Custom software and practical AI automation for wholesale and distribution. Improve stock, orders, and reporting, starting with one workflow.";

export const HOME_TITLE =
  "Custom Software for Wholesale & Distribution | TechTrinity";
export const HOME_SOCIAL_TITLE = "Custom Software for Wholesale & Distribution";

export const ORG_LEGAL_NAME = "TechTrinity";

export const ORG_LOGO_URL = `${SITE_URL}/tt-logo.png`;

export const ORG_CONTACT_EMAIL = "info@techtrinity.ai";

export const ORG_CONTACT_PHONE = "+12513732320";

// Mailing address = the company's US virtual mailbox (VirtualPostMail, Keller TX),
// not an operating or registered-agent address. The provider confirmed in writing
// that it may be published in outbound email footers.
export const ORG_ADDRESS = {
  street: "1710 Keller Parkway #8550",
  locality: "Keller",
  region: "TX",
  postalCode: "76248",
  country: "US",
  // Spelled out for the visible line: the audience is UK-based, so an unqualified
  // "TX 76248" doesn't read as a country to a non-US recipient.
  countryName: "USA",
} as const;

export const ORG_ADDRESS_LINE = `${ORG_ADDRESS.street}, ${ORG_ADDRESS.locality}, ${ORG_ADDRESS.region} ${ORG_ADDRESS.postalCode}, ${ORG_ADDRESS.countryName}`;

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
      "TechTrinity designs and builds custom software for wholesale and distribution businesses — tools for stock, orders, and reporting, integrations with existing systems, and practical AI automation where it helps. Engagements can start with one workflow and expand in agreed phases. Built with React, Next.js, Node.js, Django, PostgreSQL, and cloud infrastructure.",
    email: ORG_CONTACT_EMAIL,
    telephone: ORG_CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG_ADDRESS.street,
      addressLocality: ORG_ADDRESS.locality,
      addressRegion: ORG_ADDRESS.region,
      postalCode: ORG_ADDRESS.postalCode,
      addressCountry: ORG_ADDRESS.country,
    },
    founder: { "@id": PERSON_ID },
    knowsAbout: [
      "Custom operations software",
      "Workflow automation",
      "AI workflow automation",
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
      telephone: ORG_CONTACT_PHONE,
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
    jobTitle: FOUNDER_TITLE,
    worksFor: { "@id": ORG_ID },
    description:
      "Founder & CEO of TechTrinity. Built EasyAccounts, his own ERP product, for his family's wholesale business and continues to work on it. Has engineering experience at Canonical, the company behind Ubuntu, where he worked in-house on the Canonical Academy platform, and has worked as an engineer on Xenia and Hirecinch.",
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
  // Only registry-verified figures may appear in structured data.
  const usage = claimText(
    "easyAccountsBranches",
    (c) => `Live across ${c.value} branches`,
  );
  const permissions = claimStat("easyAccountsPermissions");
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
      `EasyAccounts is Usama Bin Nadeem's own ERP product, built for his family's wholesale textile business; Usama is the Founder & CEO of TechTrinity. ${usage ? `${usage}. ` : ""}It handles purchasing, sales, inventory, financial reporting, cheque management, and role-based access control.`,
    featureList: [
      "Multi-branch inventory tracking",
      "Real-time financial reporting",
      "Stock and cost tracing",
      permissions
        ? `Role-based access control (${permissions.value} permissions)`
        : "Role-based permissions",
      "Immutable audit logs",
      "Purchasing and sales workflows",
      "Cheque management",
    ],
    creator: { "@id": PERSON_ID },
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
      "Custom software for wholesale and distribution businesses — stock, order, and reporting workflows, integrations with existing systems, and practical AI automation with human review where needed. Built with React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure.",
  };
}

type FaqEntry = { question: string; answer: string };

// Entity-disambiguation answers kept for search/LLM clarity.
const DISAMBIGUATION_FAQ: FaqEntry[] = [
  {
    question: "What does TechTrinity build?",
    answer:
      "TechTrinity designs and builds custom software for wholesale and distribution businesses — tools for stock, orders, and reporting, integrations with the systems a team already uses, and practical AI automation where it helps. Built with React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure.",
  },
  {
    question: "Does TechTrinity work with Laravel?",
    answer:
      "No. TechTrinity does not offer Laravel or PHP development. We build with React, Next.js, Node.js, Django, PostgreSQL, and modern cloud infrastructure.",
  },
];

function faqPageSchema(entries: FaqEntry[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function disambiguationFaqSchema(): Record<string, unknown> {
  return faqPageSchema(DISAMBIGUATION_FAQ);
}

/** Homepage FAQPage: the visible buyer FAQ plus the disambiguation answers. */
export function homeFaqSchema(): Record<string, unknown> {
  return faqPageSchema([
    ...BUYER_FAQ.map((item) => ({ question: item.question, answer: item.answer })),
    ...DISAMBIGUATION_FAQ,
  ]);
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
