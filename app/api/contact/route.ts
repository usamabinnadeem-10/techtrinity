import { Resend } from "resend";
import {
  WORKFLOW_FOCUS_OPTIONS,
  ROLE_OPTIONS,
  BUSINESS_TYPE_OPTIONS,
  URGENCY_OPTIONS,
  validateContact,
  type ContactPayload,
} from "@/lib/contact";

const TO_EMAIL = "info@techtrinity.ai";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "TechTrinity <onboarding@resend.dev>";

function inEnum<T extends readonly string[]>(
  options: T,
  value: unknown,
): value is T[number] | "" {
  if (value === "" || value === undefined) return true;
  return (
    typeof value === "string" && (options as readonly string[]).includes(value)
  );
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseBody(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (
    typeof b.name !== "string" ||
    typeof b.email !== "string" ||
    typeof b.message !== "string" ||
    !inEnum(WORKFLOW_FOCUS_OPTIONS, b.focus) ||
    !inEnum(ROLE_OPTIONS, b.role) ||
    !inEnum(BUSINESS_TYPE_OPTIONS, b.businessType) ||
    !inEnum(URGENCY_OPTIONS, b.urgency)
  ) {
    return null;
  }
  return {
    name: b.name,
    email: b.email,
    message: b.message,
    focus: (b.focus as ContactPayload["focus"]) ?? "",
    company: asString(b.company),
    role: (b.role as ContactPayload["role"]) ?? "",
    tools: asString(b.tools),
    businessType: (b.businessType as ContactPayload["businessType"]) ?? "",
    urgency: (b.urgency as ContactPayload["urgency"]) ?? "",
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(payload: ContactPayload): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding: 6px 0; color: #666; width: 150px;">${escapeHtml(label)}</td><td style="padding: 6px 0;">${escapeHtml(value)}</td></tr>`
      : "";
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">New enquiry from ${escapeHtml(payload.name)}</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${row("Name", payload.name)}
        <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
        ${row("Company", payload.company)}
        ${row("Role", payload.role)}
        ${row("Business type", payload.businessType)}
        ${row("Workflow focus", payload.focus || "Not specified")}
        ${row("Current tools", payload.tools)}
        ${row("Urgency", payload.urgency)}
      </table>
      <h3 style="margin: 24px 0 8px; font-size: 14px; color: #666;">Message</h3>
      <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.55; padding: 16px; background: #f6f6f6; border-radius: 6px;">${escapeHtml(payload.message)}</div>
    </div>
  `;
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const payload = parseBody(raw);
  if (!payload) {
    return Response.json(
      { success: false, error: "Invalid form payload." },
      { status: 400 },
    );
  }

  const errors = validateContact(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json(
      { success: false, error: "Validation failed.", fieldErrors: errors },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not configured.");
    return Response.json(
      { success: false, error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const focusLabel = payload.focus || "General";
  const subject = `New enquiry from ${payload.name.trim()} — ${focusLabel}`;

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: payload.email.trim(),
      subject,
      html: buildEmailHtml(payload),
    });

    if (result.error) {
      console.error("Contact form: Resend returned error", result.error);
      return Response.json(
        { success: false, error: "Failed to send message." },
        { status: 502 },
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form: unexpected error", error);
    return Response.json(
      { success: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
