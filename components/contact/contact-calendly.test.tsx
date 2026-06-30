import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONSENT_CHANGED_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";
import { ContactCalendly } from "./contact-calendly";

// Render next/script as an inert span so we can assert the widget script was
// requested without React's <script> hoisting moving it out of the container.
vi.mock("next/script", () => ({
  default: ({ src }: { src?: string }) =>
    src ? <span data-testid="calendly-script" data-src={src} /> : null,
}));

function seedConsent(value: "granted" | "denied") {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: value, functional: value, version: 2, timestamp: 1 }),
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

test("shows the click-to-load placeholder when functional consent is not granted", async () => {
  render(<ContactCalendly />);
  expect(await screen.findByRole("button", { name: /load scheduler/i })).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).toBeNull();
  expect(screen.queryByTestId("calendly-script")).not.toBeInTheDocument();
});

test("renders the live widget when functional consent is already granted", async () => {
  seedConsent("granted");
  render(<ContactCalendly />);
  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
  expect(screen.queryByRole("button", { name: /load scheduler/i })).not.toBeInTheDocument();
});

test("clicking the placeholder loads the widget for the session", async () => {
  render(<ContactCalendly />);
  await userEvent.click(await screen.findByRole("button", { name: /load scheduler/i }));
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
});

test("swaps placeholder for the live widget when consent:changed fires with functional granted", async () => {
  render(<ContactCalendly />);
  await screen.findByRole("button", { name: /load scheduler/i });

  seedConsent("granted");
  act(() => {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
  });

  expect(await screen.findByTestId("calendly-script")).toBeInTheDocument();
  expect(document.querySelector(".calendly-inline-widget")).not.toBeNull();
});
