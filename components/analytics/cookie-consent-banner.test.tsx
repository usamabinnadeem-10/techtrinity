import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CONSENT_STORAGE_KEY, COOKIE_OPEN_EVENT } from "@/lib/consent";
import { CookieConsentBanner } from "./cookie-consent-banner";

beforeEach(() => {
  localStorage.clear();
  (window as { gtag?: unknown }).gtag = vi.fn();
  window.dataLayer = [];
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("shows when no decision is stored", async () => {
  render(<CookieConsentBanner />);
  expect(await screen.findByRole("region", { name: /cookie/i })).toBeInTheDocument();
});

test("stays hidden when a decision already exists", () => {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: "denied", version: 1, timestamp: 1 }),
  );
  render(<CookieConsentBanner />);
  expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument();
});

test("Accept persists granted, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /accept/i }));

  expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).analytics).toBe("granted");
  expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "granted",
  });
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument(),
  );
});

test("Reject persists denied, updates gtag, and hides the banner", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  await userEvent.click(screen.getByRole("button", { name: /reject/i }));

  expect(JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!).analytics).toBe("denied");
  expect(window.gtag).toHaveBeenCalledWith("consent", "update", {
    analytics_storage: "denied",
  });
  await waitFor(() =>
    expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument(),
  );
});

test("reopens on the cookie:open event after a decision exists", async () => {
  localStorage.setItem(
    CONSENT_STORAGE_KEY,
    JSON.stringify({ analytics: "denied", version: 1, timestamp: 1 }),
  );
  render(<CookieConsentBanner />);
  expect(screen.queryByRole("region", { name: /cookie/i })).not.toBeInTheDocument();

  act(() => {
    window.dispatchEvent(new CustomEvent(COOKIE_OPEN_EVENT));
  });
  expect(await screen.findByRole("region", { name: /cookie/i })).toBeInTheDocument();
});

test("links to the privacy page", async () => {
  render(<CookieConsentBanner />);
  await screen.findByRole("region", { name: /cookie/i });
  expect(screen.getByRole("link", { name: /privacy/i })).toHaveAttribute("href", "/privacy");
});
