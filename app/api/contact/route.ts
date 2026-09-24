import { Resend } from "resend";
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  parseContactBody,
  validateContact,
} from "@/lib/contact";

const TO_EMAIL = "info@techtrinity.ai";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "TechTrinity <onboarding@resend.dev>";

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

  // The server re-validates everything: shape, enum allowlists (incl. service),
  // required fields, and length bounds. Attribution is re-sanitized.
  const payload = parseContactBody(raw);
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

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: payload.email.trim(),
      subject: buildContactEmailSubject(payload),
      html: buildContactEmailHtml(payload),
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
