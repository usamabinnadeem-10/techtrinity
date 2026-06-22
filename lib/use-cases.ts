export type UseCase = {
  slug: string;
  num: string;
  // Card / index
  cardTitle: string;
  cardBlurb: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  // Hero
  heroLead: string;
  heroEmphasis: string;
  subhead: string;
  // Problem
  problemHeadline: string;
  problemBullets: string[];
  // What we build
  buildHeadline: string;
  buildItems: string[];
  // Outcome line
  outcome: string;
};

export const USE_CASES: UseCase[] = [
  {
    slug: "inventory-accuracy",
    num: "01",
    cardTitle: "Inventory Accuracy",
    cardBlurb:
      "Stock movements, transfers, adjustments, and availability your team can actually trust.",
    metaTitle: "Inventory Accuracy Software for Wholesale & Distribution Teams",
    metaDescription:
      "Custom inventory systems that track stock movements, warehouse transfers, adjustments, and availability across the way your business actually works.",
    heroLead: "Stock numbers your team can",
    heroEmphasis: "actually trust.",
    subhead:
      "We build inventory systems that track stock movements, warehouse transfers, adjustments, and availability across the way your business actually works.",
    problemHeadline: "Where spreadsheets stop working.",
    problemBullets: [
      "Stock counts live in multiple spreadsheets.",
      "Sales and warehouse teams do not see the same availability.",
      "Adjustments are made without clear accountability.",
      "Reports become stale before decisions are made.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Stock movement ledger",
      "Location-level availability",
      "Transfer workflows",
      "Adjustment approval",
      "Product/SKU search",
      "Audit trail",
      "Owner dashboard",
    ],
    outcome:
      "One trusted view of stock — so sales, warehouse, and admin teams stop arguing about what's actually available.",
  },
  {
    slug: "manual-reporting",
    num: "02",
    cardTitle: "Manual Reporting",
    cardBlurb:
      "Owner-ready dashboards built around the questions you actually ask — without the weekly spreadsheet chase.",
    metaTitle: "Custom Reporting Dashboards for Inventory-Heavy Businesses",
    metaDescription:
      "Custom dashboards and reports built around the questions owners actually ask — stock, sales, purchases, margins, receivables, and branch performance.",
    heroLead: "Reports without the",
    heroEmphasis: "weekly spreadsheet chase.",
    subhead:
      "We build dashboards and reports around the questions owners actually ask — stock, sales, purchases, margins, receivables, and branch performance.",
    problemHeadline: "When reporting eats half a day.",
    problemBullets: [
      "Someone has to export, clean, and reconcile numbers by hand.",
      "Reports are stale by the time decisions get made.",
      "Each tool tells a slightly different story.",
      "Owners wait on staff to answer simple questions.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Owner dashboards",
      "Product/category performance",
      "P&L summaries",
      "Branch reports",
      "Purchase/sale trends",
      "PDF export where needed",
      "Drill-down to source transactions",
    ],
    outcome:
      "The numbers an owner needs, on demand — reconciled automatically and traceable back to the underlying transactions.",
  },
  {
    slug: "order-workflows",
    num: "03",
    cardTitle: "Order Workflows",
    cardBlurb:
      "Order status that everyone can see — sales, picking, dispatch, and backorders in one place.",
    metaTitle: "Custom Order Workflow Software for Wholesale & Distribution",
    metaDescription:
      "Custom order workflows for sales, warehouse, picking, dispatch, backorders, and notes — so everyone can see what needs to happen next.",
    heroLead: "Keep orders moving without losing status in",
    heroEmphasis: "email and spreadsheets.",
    subhead:
      "We build order workflows for sales, warehouse, picking, dispatch, backorders, and notes — so everyone can see what needs to happen next.",
    problemHeadline: "When order status lives in someone's memory.",
    problemBullets: [
      "Order status is spread across email, spreadsheets, and warehouse notes.",
      "Nobody is sure what has shipped and what is waiting.",
      "Backorders slip through the cracks.",
      "Handoffs between sales and warehouse lose information.",
    ],
    buildHeadline: "What we build.",
    buildItems: [
      "Order status pipeline",
      "Picking/packing views",
      "Backorder tracking",
      "Dispatch notes",
      "Customer/order history",
      "Internal comments",
      "Role-based access",
    ],
    outcome:
      "A single order pipeline everyone can see — so nothing stalls between sales, the warehouse, and dispatch.",
  },
];

export function getUseCase(slug: string): UseCase | undefined {
  return USE_CASES.find((useCase) => useCase.slug === slug);
}

export function getAllUseCaseSlugs(): string[] {
  return USE_CASES.map((useCase) => useCase.slug);
}
