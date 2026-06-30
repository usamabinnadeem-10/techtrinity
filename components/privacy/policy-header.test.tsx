import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PolicyHeader } from "./policy-header";

test("renders the title as an h1 and the last-updated date", () => {
  render(<PolicyHeader title="Privacy & Cookie Policy" lastUpdated="30 June 2026" />);
  expect(
    screen.getByRole("heading", { level: 1, name: /privacy & cookie policy/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/30 June 2026/)).toBeInTheDocument();
});
