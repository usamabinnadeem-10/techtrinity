export const WORKFLOW_FOCUS_OPTIONS = [
  "Stock / inventory accuracy",
  "Order processing workflow",
  "Purchasing / replenishment",
  "Warehouse or branch coordination",
  "Manual reporting / dashboards",
  "Existing system audit",
  "Ongoing improvements to a live system",
  "Not sure yet",
] as const;

export type WorkflowFocus = (typeof WORKFLOW_FOCUS_OPTIONS)[number];

export const ROLE_OPTIONS = [
  "Owner / Founder",
  "Managing Director / President",
  "General Manager",
  "Operations Manager",
  "Warehouse / Inventory Manager",
  "Finance / Admin",
  "Other",
] as const;

export type Role = (typeof ROLE_OPTIONS)[number];

export const BUSINESS_TYPE_OPTIONS = [
  "Wholesale / distribution",
  "Import / export",
  "Light manufacturing",
  "Inventory-heavy retail",
  "Multi-location operations",
  "Other",
] as const;

export type BusinessType = (typeof BUSINESS_TYPE_OPTIONS)[number];

export const URGENCY_OPTIONS = [
  "Exploring",
  "Problem is annoying but not urgent",
  "Problem is costing time/money now",
  "Need to fix in the next 30–90 days",
] as const;

export type Urgency = (typeof URGENCY_OPTIONS)[number];

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  focus: WorkflowFocus | "";
  company: string;
  role: Role | "";
  tools: string;
  businessType: BusinessType | "";
  urgency: Urgency | "";
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!payload.name.trim()) {
    errors.name = "Please tell us your name.";
  }
  if (!payload.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(payload.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!payload.message.trim()) {
    errors.message = "A short note about your operation helps a lot.";
  }
  return errors;
}
