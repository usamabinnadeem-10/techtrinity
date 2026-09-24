import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { __resetAnalyticsDedupe } from "@/lib/analytics";
import { CONSENT_CHANGED_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";
import {
  CALENDLY_ORIGIN,
  ContactCalendly,
  isCalendlyBookingMessage,
} from "./contact-calendly";

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

test("offers the message form and email when the scheduler is not loaded", async () => {
  render(<ContactCalendly />);
  await screen.findByRole("button", { name: /load scheduler/i });
  expect(screen.getByRole("link", { name: /send a message/i })).toHaveAttribute("href", "#message");
  expect(screen.getByRole("link", { name: /info@techtrinity.ai/i })).toHaveAttribute(
    "href",
    "mailto:info@techtrinity.ai",
  );
});

describe("booking_complete", () => {
  const gtag = vi.fn();
  beforeEach(() => {
    window.gtag = gtag;
    __resetAnalyticsDedupe();
  });
  afterEach(() => {
    gtag.mockReset();
    delete window.gtag;
  });

  const post = (origin: string, data: unknown) =>
    act(() => {
      window.dispatchEvent(new MessageEvent("message", { origin, data }));
    });
  const bookings = () => gtag.mock.calls.filter((c) => c[1] === "booking_complete");

  test("fires once for Calendly's verified confirmation message", async () => {
    seedConsent("granted");
    render(<ContactCalendly />);
    await screen.findByTestId("calendly-script");

    post(CALENDLY_ORIGIN, { event: "calendly.event_scheduled" });
    post(CALENDLY_ORIGIN, { event: "calendly.event_scheduled" });
    expect(bookings()).toHaveLength(1);
  });

  test("ignores other origins, other events, and clicks", async () => {
    render(<ContactCalendly />);
    await userEvent.click(await screen.findByRole("button", { name: /load scheduler/i }));
    await screen.findByTestId("calendly-script");

    post("https://evil.example", { event: "calendly.event_scheduled" });
    post(CALENDLY_ORIGIN, { event: "calendly.date_and_time_selected" });
    post(CALENDLY_ORIGIN, "calendly.event_scheduled");
    expect(bookings()).toHaveLength(0);
  });

  test("does not listen before the scheduler is loaded", async () => {
    render(<ContactCalendly />);
    await screen.findByRole("button", { name: /load scheduler/i });
    post(CALENDLY_ORIGIN, { event: "calendly.event_scheduled" });
    expect(bookings()).toHaveLength(0);
  });
});

test("isCalendlyBookingMessage requires the Calendly origin and event name", () => {
  expect(
    isCalendlyBookingMessage(
      new MessageEvent("message", {
        origin: CALENDLY_ORIGIN,
        data: { event: "calendly.event_scheduled" },
      }),
    ),
  ).toBe(true);
  expect(
    isCalendlyBookingMessage(
      new MessageEvent("message", {
        origin: "https://calendly.com.evil.example",
        data: { event: "calendly.event_scheduled" },
      }),
    ),
  ).toBe(false);
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
