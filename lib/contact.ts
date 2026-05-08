export const PROJECT_TYPES = [
  "SaaS MVP (Design + Build)",
  "SaaS MVP (Build Only)",
  "Growth Retainer",
  "Technical Audit",
  "Not sure yet",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType: ProjectType | "";
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
    errors.message = "A short note about your project helps a lot.";
  }
  return errors;
}
