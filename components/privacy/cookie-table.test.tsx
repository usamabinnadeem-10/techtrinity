import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { COOKIE_INVENTORY } from "@/lib/legal/cookie-inventory";
import { CookieTable } from "./cookie-table";

test("renders every cookie inventory entry by name", () => {
  render(<CookieTable />);
  for (const entry of COOKIE_INVENTORY) {
    expect(screen.getByText(entry.name)).toBeInTheDocument();
  }
});

test("renders the required column headers", () => {
  render(<CookieTable />);
  for (const col of ["Name", "Provider", "Category", "Purpose", "Type", "Lasts"]) {
    expect(screen.getByRole("columnheader", { name: col })).toBeInTheDocument();
  }
});
