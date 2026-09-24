import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "./site-footer";

test("renders the existing navigation links", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("link", { name: "Services" })).toBeInTheDocument();
});

test("renders a Cookie settings control", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("button", { name: /cookie settings/i })).toBeInTheDocument();
});

test("links to the secondary services", () => {
  render(<SiteFooter />);
  expect(screen.getByRole("link", { name: "AI automation" })).toHaveAttribute(
    "href",
    "/services/ai-workflow-automation",
  );
  expect(screen.getByRole("link", { name: "MVP development" })).toHaveAttribute(
    "href",
    "/services/mvp-development",
  );
  expect(
    screen.getByRole("link", { name: "Business websites" }),
  ).toHaveAttribute("href", "/services/business-websites");
});

test("uses the wholesale & distribution positioning", () => {
  render(<SiteFooter />);
  expect(
    screen.getByText(/custom software for wholesale & distribution/i),
  ).toBeInTheDocument();
});
