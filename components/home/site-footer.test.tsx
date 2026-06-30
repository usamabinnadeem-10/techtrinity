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
