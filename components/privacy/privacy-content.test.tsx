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

test("affirms no advertising and no third-party fonts", () => {
  render(<PrivacyContent />);
  expect(screen.getByText(/no advertising cookies/i)).toBeInTheDocument();
  expect(screen.getByText(/no third-party fonts/i)).toBeInTheDocument();
});

test("lets the visitor reopen cookie settings", () => {
  render(<PrivacyContent />);
  expect(screen.getAllByRole("button", { name: /cookie settings/i })).toHaveLength(3);
});
