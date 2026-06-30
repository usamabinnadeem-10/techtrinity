import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PolicySection } from "./policy-section";

test("renders an h2 heading and its children", () => {
  render(
    <PolicySection title="Your rights">
      <p>You can ask us to delete your data.</p>
    </PolicySection>,
  );
  expect(
    screen.getByRole("heading", { level: 2, name: /your rights/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/ask us to delete your data/i)).toBeInTheDocument();
});
