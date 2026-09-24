"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { CONTACT_SUCCESS_MESSAGE, RESPONSE_PROMISE } from "@/lib/offer";
import {
  BUSINESS_TYPE_OPTIONS,
  EMPTY_CONTACT,
  MAX_LENGTHS,
  ROLE_OPTIONS,
  SERVICE_OPTIONS,
  URGENCY_OPTIONS,
  WORKFLOW_FOCUS_OPTIONS,
  dropHiddenFields,
  readAttribution,
  serviceFromQuery,
  showsOperationsFields,
  showsToolsField,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact";

const fieldShell =
  "w-full rounded-sm bg-card border border-border-strong px-4 py-3 text-[15px] text-foreground placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-[rgba(184,255,87,0.4)] focus:ring-2 focus:ring-ring";

const fieldLabel =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted";

const errorText = "mt-1.5 font-mono text-[11px] tracking-[0.04em] text-primary";

const optionalTag = (
  <span className="normal-case tracking-normal text-muted-foreground"> (optional)</span>
);

/** Field order used to move focus to the first invalid field. */
const FIELD_ORDER: (keyof ContactPayload)[] = [
  "name",
  "email",
  "message",
  "service",
  "company",
  "tools",
];

const FIELD_IDS: Partial<Record<keyof ContactPayload, string>> = {
  name: "contact-name",
  email: "contact-email",
  message: "contact-message",
  service: "contact-service",
  company: "contact-company",
  tools: "contact-tools",
};

export type ErrorCategory = "validation" | "server" | "network";

const FALLBACK_ERROR =
  "We couldn’t send your message. Please try again, or email info@techtrinity.ai.";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Preselect the service from `?service=` (allowlist only) and capture bounded
  // attribution once after mount. Reading `window.location` in an effect keeps
  // the form fully prerendered (no Suspense/CSR bailout for useSearchParams).
  useEffect(() => {
    const search = window.location.search;
    const service = serviceFromQuery(new URLSearchParams(search).get("service"));
    const attribution = readAttribution(
      search,
      document.referrer,
      window.location.hostname,
    );
    // Intentional one-shot post-mount read of client-only URL state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValues((prev) => ({
      ...prev,
      ...attribution,
      service: prev.service || service,
    }));
  }, []);

  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = <K extends keyof ContactPayload>(
    key: K,
    value: ContactPayload[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  /** First genuine interaction: a user-driven input/change inside the form. */
  const onFirstInteraction = () => {
    trackOnce("contact_form_start", "contact-form", { service: values.service });
  };

  const fail = (category: ErrorCategory, message: string) => {
    setFormError(message);
    setStatus("error");
    trackEvent("contact_form_error", {
      error_category: category,
      service: values.service,
    });
  };

  const focusFirstInvalid = (errs: ContactErrors) => {
    const first = FIELD_ORDER.find((key) => errs[key]);
    const id = first ? FIELD_IDS[first] : undefined;
    if (id) formRef.current?.querySelector<HTMLElement>(`#${id}`)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const payload = dropHiddenFields(values);
    const validation = validateContact(payload);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setFormError(null);
      setStatus("idle");
      trackEvent("contact_form_error", {
        error_category: "validation",
        service: values.service,
      });
      focusFirstInvalid(validation);
      return;
    }

    setStatus("submitting");
    setFormError(null);

    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      fail(
        "network",
        "We couldn’t reach our server. Check your connection and try again, or email info@techtrinity.ai.",
      );
      return;
    }

    const data = (await response.json().catch(() => null)) as
      | { success?: boolean; error?: string; fieldErrors?: ContactErrors }
      | null;

    if (!response.ok || !data?.success) {
      if (data?.fieldErrors && Object.keys(data.fieldErrors).length > 0) {
        setErrors(data.fieldErrors);
        fail("validation", "Please check the highlighted fields and try again.");
        return;
      }
      fail(response.status === 400 ? "validation" : "server", FALLBACK_ERROR);
      return;
    }

    // Success is shown only once the backend has accepted the enquiry.
    setStatus("success");
    trackEvent("contact_form_success", { service: values.service });
  };

  const errorCount = Object.keys(errors).length;
  const showOps = showsOperationsFields(values.service);
  const showTools = showsToolsField(values.service);

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="flex w-full items-start gap-3 rounded-sm border border-primary/40 bg-primary-soft px-6 py-5 text-[15px] font-medium leading-[1.6] text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="mt-1 size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10.5 8.5 15 16 6" />
        </svg>
        <span>{CONTACT_SUCCESS_MESSAGE}</span>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      onInput={onFirstInteraction}
      onChange={onFirstInteraction}
      aria-describedby="contact-required-note"
      className="flex flex-col gap-5"
    >
      <p
        id="contact-required-note"
        className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
      >
        Name, email, and a short description are required.
      </p>

      {errorCount > 0 && status !== "error" && (
        <div
          role="alert"
          className="rounded-sm border border-primary/40 px-4 py-3 font-mono text-[11px] tracking-[0.04em] text-primary"
        >
          {errorCount === 1
            ? "Please fix the highlighted field."
            : `Please fix the ${errorCount} highlighted fields.`}
        </div>
      )}

      <TextField
        id="contact-name"
        name="name"
        label="Your Name"
        autoComplete="name"
        placeholder="John Smith"
        required
        maxLength={MAX_LENGTHS.name}
        value={values.name}
        error={errors.name}
        onChange={(v) => update("name", v)}
      />

      <TextField
        id="contact-email"
        name="email"
        type="email"
        label="Email Address"
        autoComplete="email"
        placeholder="john@company.com"
        required
        maxLength={MAX_LENGTHS.email}
        value={values.email}
        error={errors.email}
        onChange={(v) => update("email", v)}
      />

      <div>
        <label htmlFor="contact-message" className={fieldLabel}>
          What would you like to improve or build?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          aria-required
          maxLength={MAX_LENGTHS.message}
          placeholder="A process that costs time or creates mistakes, a product you want to launch, or a website that needs a clearer next step."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(
            fieldShell,
            "resize-y leading-[1.6]",
            errors.message && "border-primary/50",
          )}
        />
        {errors.message && (
          <p id="contact-message-error" className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      <SelectField
        id="contact-service"
        name="service"
        label="What can we help with?"
        options={SERVICE_OPTIONS}
        value={values.service}
        error={errors.service}
        onChange={(v) => update("service", v as ContactPayload["service"])}
      />

      {showOps && (
        <>
          <SelectField
            id="contact-focus"
            name="focus"
            label="What best describes the workflow you want to fix?"
            options={WORKFLOW_FOCUS_OPTIONS}
            value={values.focus}
            onChange={(v) => update("focus", v as ContactPayload["focus"])}
          />
          <SelectField
            id="contact-business-type"
            name="businessType"
            label="Business type"
            options={BUSINESS_TYPE_OPTIONS}
            value={values.businessType}
            onChange={(v) =>
              update("businessType", v as ContactPayload["businessType"])
            }
          />
        </>
      )}

      <TextField
        id="contact-company"
        name="company"
        label="Company name"
        optional
        autoComplete="organization"
        placeholder="Acme Distribution Co."
        maxLength={MAX_LENGTHS.company}
        value={values.company}
        error={errors.company}
        onChange={(v) => update("company", v)}
      />

      <SelectField
        id="contact-role"
        name="role"
        label="Your role"
        options={ROLE_OPTIONS}
        value={values.role}
        onChange={(v) => update("role", v as ContactPayload["role"])}
      />

      <SelectField
        id="contact-urgency"
        name="urgency"
        label="How urgent is it?"
        options={URGENCY_OPTIONS}
        value={values.urgency}
        onChange={(v) => update("urgency", v as ContactPayload["urgency"])}
      />

      {showTools && (
        <TextField
          id="contact-tools"
          name="tools"
          label="What tools does your team use today?"
          optional
          placeholder="Example: QuickBooks, Xero, Excel, Google Sheets, Shopify, email, WhatsApp, old desktop software, paper notes"
          maxLength={MAX_LENGTHS.tools}
          value={values.tools}
          error={errors.tools}
          onChange={(v) => update("tools", v)}
        />
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-[30px] py-3.5 text-[15px] font-medium tracking-tight text-primary-foreground transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-px hover:bg-[#cfff72] hover:shadow-[0_8px_32px_rgba(184,255,87,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:bg-primary disabled:hover:shadow-none"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
        {status !== "submitting" && (
          <span aria-hidden className="text-base">
            →
          </span>
        )}
      </button>

      <div
        ref={alertRef}
        role="alert"
        aria-live="assertive"
        tabIndex={-1}
        className="focus:outline-none"
      >
        {status === "error" && formError && (
          <p className="rounded-sm border border-primary/40 px-4 py-3 text-center font-mono text-[11px] tracking-[0.04em] text-primary">
            {formError}
          </p>
        )}
      </div>

      <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        {RESPONSE_PROMISE}
      </p>
    </form>
  );
}

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: "text" | "email";
  required?: boolean;
  optional?: boolean;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
};

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
  optional,
  autoComplete,
  placeholder,
  maxLength,
}: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {optional && optionalTag}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldShell, error && "border-primary/50")}
      />
      {error && (
        <p id={errorId} className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

function SelectField({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
}: SelectFieldProps) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {optionalTag}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            fieldShell,
            "appearance-none pr-10",
            !value && "text-muted/80",
            error && "border-primary/50",
          )}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-foreground">
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-4 top-1/2 size-3 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1.5 6 6.5 11 1.5" />
        </svg>
      </div>
      {error && (
        <p id={errorId} className={errorText}>
          {error}
        </p>
      )}
    </div>
  );
}
