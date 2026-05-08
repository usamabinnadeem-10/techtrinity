"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import {
  PROJECT_TYPES,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/contact";

const fieldShell =
  "w-full rounded-sm bg-card border border-border-strong px-4 py-3 text-[15px] text-foreground placeholder:text-muted/80 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-[rgba(184,255,87,0.4)] focus:ring-2 focus:ring-ring";

const fieldLabel =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted";

const errorText = "mt-1.5 font-mono text-[11px] tracking-[0.04em] text-primary";

const initialState: ContactPayload = {
  name: "",
  email: "",
  message: "",
  projectType: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(initialState);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

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

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const validation = validateContact(values);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setStatus("submitting");
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string; fieldErrors?: ContactErrors }
        | null;

      if (!response.ok || !data?.success) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setServerError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
      <div>
        <label htmlFor="contact-name" className={fieldLabel}>
          Your Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="John Smith"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(fieldShell, errors.name && "border-primary/50")}
        />
        {errors.name && (
          <p id="contact-name-error" className={errorText}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={fieldLabel}>
          Email Address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@company.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(fieldShell, errors.email && "border-primary/50")}
        />
        {errors.email && (
          <p id="contact-email-error" className={errorText}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={fieldLabel}>
          Tell Us About Your Project
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="What are you building? What's your timeline and budget?"
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

      <div>
        <label htmlFor="contact-project-type" className={fieldLabel}>
          What Best Describes Your Project?
        </label>
        <div className="relative">
          <select
            id="contact-project-type"
            name="projectType"
            value={values.projectType}
            onChange={(e) =>
              update("projectType", e.target.value as ContactPayload["projectType"])
            }
            className={cn(
              fieldShell,
              "appearance-none pr-10",
              !values.projectType && "text-muted/80",
            )}
          >
            <option value="">Select an option</option>
            {PROJECT_TYPES.map((option) => (
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
      </div>

      {status === "success" ? (
        <div
          role="status"
          className="mt-2 inline-flex w-full items-center justify-center gap-3 rounded-sm border border-primary/40 bg-primary-soft px-6 py-3.5 text-[15px] font-medium text-primary"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 10.5 8.5 15 16 6" />
          </svg>
          <span>Message sent. We&apos;ll be in touch soon.</span>
        </div>
      ) : (
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
      )}

      {status === "error" && serverError && (
        <p className="text-center font-mono text-[11px] tracking-[0.04em] text-primary">
          {serverError}
        </p>
      )}

      {status !== "success" && (
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          We respond within 24 hours.
        </p>
      )}
    </form>
  );
}
