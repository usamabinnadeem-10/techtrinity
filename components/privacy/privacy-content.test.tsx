import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrivacyContent } from "./privacy-content";

test("renders the policy heading", () => {
  render(<PrivacyContent />);
  expect(
    screen.getByRole("heading", { level: 1, name: /privacy & cookie policy/i }),
  ).toBeInTheDocument();
});

test("explains the cookie/analytics behavior", () => {
  render(<PrivacyContent />);
  expect(screen.getByRole("heading", { name: /cookies/i })).toBeInTheDocument();
  expect(screen.getByText(/analytics cookies are not stored until you accept/i)).toBeInTheDocument();
});

test("lets the visitor reopen cookie settings", () => {
  render(<PrivacyContent />);
  expect(screen.getByRole("button", { name: /cookie settings/i })).toBeInTheDocument();
});
