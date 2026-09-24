import { SERVICE_INTENTS } from "@/lib/offer";

// ── Option lists ────────────────────────────────────────────────────────────

/**
 * Service choices shown in the contact form (brief TT-10). Order is the display
 * order. Every value must also be a value of `SERVICE_INTENTS` in lib/offer.ts
 * so `?service=` preselection and the form cannot drift apart (see test).
 */
export const SERVICE_OPTIONS = [
  "Operations workflow",
  "AI automation",
  "MVP/product development",
  "Website",
  "Existing system review",
  "Ongoing support",
  "Not sure yet",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

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

// ── Payload ─────────────────────────────────────────────────────────────────

/** Bounded marketing-attribution fields. Never contain personal data. */
export type ContactAttribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  /** Host name of the external referrer only — never a full URL. */
  referrer: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  service: ServiceOption | "";
  focus: WorkflowFocus | "";
  company: string;
  role: Role | "";
  tools: string;
  businessType: BusinessType | "";
  urgency: Urgency | "";
} & ContactAttribution;

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const EMPTY_ATTRIBUTION: ContactAttribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  referrer: "",
};

export const EMPTY_CONTACT: ContactPayload = {
  name: "",
  email: "",
  message: "",
  service: "",
  focus: "",
  company: "",
  role: "",
  tools: "",
  businessType: "",
  urgency: "",
  ...EMPTY_ATTRIBUTION,
};

/** Maximum lengths enforced on both the client and the server. */
export const MAX_LENGTHS = {
  name: 100,
  email: 254,
  message: 5000,
  company: 120,
  tools: 300,
  attribution: 100,
} as const;

// ── Service preselection & progressive disclosure ───────────────────────────

/**
 * Maps a raw `?service=` value to a form service label using the
 * `SERVICE_INTENTS` allowlist. Anything else (missing, unknown, prototype
 * keys) yields "" so the visitor chooses themselves.
 */
export function serviceFromQuery(value: string | null | undefined): ServiceOption | "" {
  if (!value) return "";
  const slug = value.trim().toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(SERVICE_INTENTS, slug)) return "";
  const label = SERVICE_INTENTS[slug as keyof typeof SERVICE_INTENTS];
  return isServiceOption(label) ? label : "";
}

export function isServiceOption(value: unknown): value is ServiceOption {
  return (
    typeof value === "string" &&
    (SERVICE_OPTIONS as readonly string[]).includes(value)
  );
}

/**
 * Operations-specific questions (workflow focus, business type) are shown only
 * when the enquiry could be about an operations workflow. A product founder or
 * website buyer never sees inventory questions.
 */
export function showsOperationsFields(service: ServiceOption | ""): boolean {
  return service === "" || service === "Operations workflow" || service === "Not sure yet";
}

/** "Current tools" is relevant to operations and automation enquiries. */
export function showsToolsField(service: ServiceOption | ""): boolean {
  return showsOperationsFields(service) || service === "AI automation";
}

/** Clears answers to questions that are hidden for the chosen service. */
export function dropHiddenFields(payload: ContactPayload): ContactPayload {
  const next = { ...payload };
  if (!showsOperationsFields(payload.service)) {
    next.focus = "";
    next.businessType = "";
  }
  if (!showsToolsField(payload.service)) {
    next.tools = "";
  }
  return next;
}

// ── Attribution ─────────────────────────────────────────────────────────────

const ATTRIBUTION_VALUE = /^[\w .+\-/:%|]*$/;
const HOSTNAME = /^(?=.{1,100}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;

/** Trims, bounds, and charset-checks one attribution value; invalid → "". */
export function cleanAttributionValue(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().slice(0, MAX_LENGTHS.attribution);
  if (!trimmed || trimmed.includes("@") || !ATTRIBUTION_VALUE.test(trimmed)) {
    return "";
  }
  return trimmed;
}

/** Accepts a bare host name only (no scheme, path, or query). */
export function cleanReferrerHost(value: unknown): string {
  if (typeof value !== "string") return "";
  const host = value.trim().toLowerCase();
  return HOSTNAME.test(host) ? host : "";
}

/**
 * Reads allowlisted UTM keys from a query string and the external referrer's
 * host name. Only these four keys are ever captured; the raw query string and
 * referrer path are discarded.
 */
export function readAttribution(
  search: string,
  referrerUrl: string,
  ownHost: string,
): ContactAttribution {
  const params = new URLSearchParams(search);
  let referrer = "";
  if (referrerUrl) {
    try {
      const host = new URL(referrerUrl).hostname.toLowerCase();
      if (host && host !== ownHost.toLowerCase()) referrer = cleanReferrerHost(host);
    } catch {
      referrer = "";
    }
  }
  return {
    utmSource: cleanAttributionValue(params.get("utm_source")),
    utmMedium: cleanAttributionValue(params.get("utm_medium")),
    utmCampaign: cleanAttributionValue(params.get("utm_campaign")),
    referrer,
  };
}

// ── Validation ──────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(payload: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();

  if (!name) {
    errors.name = "Please tell us your name.";
  } else if (name.length > MAX_LENGTHS.name) {
    errors.name = `Please keep your name under ${MAX_LENGTHS.name} characters.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > MAX_LENGTHS.email || !EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "A short description of what you’d like to improve or build helps a lot.";
  } else if (message.length > MAX_LENGTHS.message) {
    errors.message = `Please keep this under ${MAX_LENGTHS.message} characters.`;
  }

  if (payload.company.trim().length > MAX_LENGTHS.company) {
    errors.company = `Please keep this under ${MAX_LENGTHS.company} characters.`;
  }
  if (payload.tools.trim().length > MAX_LENGTHS.tools) {
    errors.tools = `Please keep this under ${MAX_LENGTHS.tools} characters.`;
  }
  if (payload.service !== "" && !isServiceOption(payload.service)) {
    errors.service = "Please choose one of the listed options.";
  }
  return errors;
}

// ── Server-side parsing ─────────────────────────────────────────────────────

function inEnum<T extends readonly string[]>(
  options: T,
  value: unknown,
): value is T[number] | "" | undefined {
  if (value === "" || value === undefined || value === null) return true;
  return typeof value === "string" && (options as readonly string[]).includes(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function enumValue<T extends string>(value: unknown): T | "" {
  return typeof value === "string" ? (value as T) : "";
}

/**
 * Parses an untrusted JSON body into a ContactPayload. Returns `null` when the
 * shape is wrong or any enum (service, focus, role, business type, urgency)
 * holds a value outside its allowlist. Attribution fields are re-sanitized and
 * silently dropped when invalid — they must never block a genuine enquiry.
 * Hidden operations fields are cleared for services that don't show them.
 * Run `validateContact` on the result for required fields and length bounds.
 */
export function parseContactBody(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const b = body as Record<string, unknown>;
  if (
    typeof b.name !== "string" ||
    typeof b.email !== "string" ||
    typeof b.message !== "string" ||
    !inEnum(SERVICE_OPTIONS, b.service) ||
    !inEnum(WORKFLOW_FOCUS_OPTIONS, b.focus) ||
    !inEnum(ROLE_OPTIONS, b.role) ||
    !inEnum(BUSINESS_TYPE_OPTIONS, b.businessType) ||
    !inEnum(URGENCY_OPTIONS, b.urgency)
  ) {
    return null;
  }
  return dropHiddenFields({
    name: b.name,
    email: b.email,
    message: b.message,
    service: enumValue<ServiceOption>(b.service),
    focus: enumValue<WorkflowFocus>(b.focus),
    company: asString(b.company),
    role: enumValue<Role>(b.role),
    tools: asString(b.tools),
    businessType: enumValue<BusinessType>(b.businessType),
    urgency: enumValue<Urgency>(b.urgency),
    utmSource: cleanAttributionValue(b.utmSource),
    utmMedium: cleanAttributionValue(b.utmMedium),
    utmCampaign: cleanAttributionValue(b.utmCampaign),
    referrer: cleanReferrerHost(b.referrer),
  });
}

// ── Email rendering ─────────────────────────────────────────────────────────

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildContactEmailSubject(payload: ContactPayload): string {
  const topic = payload.service || payload.focus || "General";
  const name = payload.name.replace(/[\r\n\t]+/g, " ").trim();
  return `New enquiry from ${name} — ${topic}`;
}

export function buildContactEmailHtml(payload: ContactPayload): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding: 6px 0; color: #666; width: 150px;">${escapeHtml(label)}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`
      : "";
  const email = payload.email.trim();
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New enquiry from ${escapeHtml(payload.name.trim())}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row("Name", payload.name.trim())}
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        ${row("Service", payload.service || "Not specified")}
        ${row("Company", payload.company.trim())}
        ${row("Role", payload.role)}
        ${row("Business type", payload.businessType)}
        ${row("Workflow focus", payload.focus)}
        ${row("Current tools", payload.tools.trim())}
        ${row("Urgency", payload.urgency)}
        ${row("UTM source", payload.utmSource)}
        ${row("UTM medium", payload.utmMedium)}
        ${row("UTM campaign", payload.utmCampaign)}
        ${row("Referrer", payload.referrer)}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #666;">What they’d like to improve or build</h3>
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.55; padding: 16px; background: #f6f6f6; border-radius: 6px;">${escapeHtml(payload.message.trim())}</div>
    </div>
  `;
}
