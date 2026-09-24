import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivacyContent } from "./privacy-content";

test("renders the policy heading", () => {
  render(<PrivacyContent />);
  expect(
    screen.getByRole("heading", { level: 1, name: /privacy & cookie policy/i }),
  ).toBeInTheDocument();
});

test("shows the last-updated date", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/30 June 2026/)).toBeInTheDocument();
});

test("discloses that analytics and the scheduler both stay off until consent", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/both stay off until you say yes/i)).toBeInTheDocument();
});

test("lists the GA and Calendly cookies in the inventory table", () => {
  render(<PrivacyContent />);
  expect(screen.getByText("_ga_Z337R58187")).toBeInTheDocument();
  expect(screen.getByText("Calendly cookies")).toBeInTheDocument();
});

test("names the data processors", () => {
  render(<PrivacyContent />);
  expect(screen.getAllByText(/resend/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/vercel/i).length).toBeGreaterThan(0);
});

test("publishes the postal address in Who we are", () => {
  render(<PrivacyContent />);
  // Both "Who we are" and the Article 14 controller paragraph print it.
  expect(
    screen.getAllByText(/1710 Keller Parkway #8550, Keller, TX 76248, USA/).length,
  ).toBeGreaterThan(0);
  expect(screen.queryByText(/available on request/i)).not.toBeInTheDocument();
});

test("routes every privacy contact link to the dedicated privacy inbox", () => {
  render(<PrivacyContent />);
  const links = screen.getAllByRole("link", { name: /privacy@techtrinity\.ai/ });
  expect(links.length).toBeGreaterThan(0);
  for (const link of links) {
    expect(link).toHaveAttribute("href", "mailto:privacy@techtrinity.ai");
  }
  expect(screen.queryByText(/info@techtrinity\.ai/)).not.toBeInTheDocument();
});

test("includes the Article 14 outreach notice", () => {
  render(<PrivacyContent />);
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: /individuals we contact for business development/i,
    }),
  ).toBeInTheDocument();
});

test("affirms no advertising and no third-party fonts", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/no advertising cookies/i)).toBeInTheDocument();
  expect(screen.getByText(/no third-party fonts/i)).toBeInTheDocument();
});

test("lets the visitor reopen cookie settings", () => {
  render(<PrivacyContent />);
  expect(screen.getAllByRole("button", { name: /cookie settings/i })).toHaveLength(3);
});
