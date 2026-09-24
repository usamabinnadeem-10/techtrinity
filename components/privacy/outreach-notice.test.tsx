import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { OutreachNotice } from "./outreach-notice";

test("renders the Article 14 section heading", () => {
  render(<OutreachNotice />);
  expect(
    screen.getByRole("heading", {
      level: 2,
      name: /individuals we contact for business development/i,
    }),
  ).toBeInTheDocument();
});

test("names the registered entity, not the trading name, as controller", () => {
  render(<OutreachNotice />);
  // Registered casing differs from the brand's "TechTrinity" on purpose.
  expect(screen.getByText("Techtrinity LLC")).toBeInTheDocument();
});

test("states the lawful basis and the PECR corporate-subscriber route", () => {
  render(<OutreachNotice />);
  expect(screen.getByText(/Article 6\(1\)\(f\), legitimate interests/)).toBeInTheDocument();
  expect(screen.getByText(/PECR regulation 22/)).toBeInTheDocument();
});

test("discloses the source of the data and that no lists are bought", () => {
  render(<OutreachNotice />);
  expect(screen.getByText(/We do not buy or rent marketing\s+lists\./)).toBeInTheDocument();
});

test("names the outreach processors", () => {
  render(<OutreachNotice />);
  expect(screen.getByText("Findymail")).toBeInTheDocument();
  expect(screen.getByText("Instantly")).toBeInTheDocument();
  expect(screen.getByText("InboxKit")).toBeInTheDocument();
});

test("gives the absolute right to object and the ICO as the regulator", () => {
  render(<OutreachNotice />);
  expect(
    screen.getByText(/absolute right to object to our use of your data/i),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "ico.org.uk" })).toHaveAttribute(
    "href",
    "https://ico.org.uk",
  );
});

test("points rights requests at the dedicated privacy inbox", () => {
  render(<OutreachNotice />);
  for (const link of screen.getAllByRole("link", { name: /privacy@techtrinity\.ai/ })) {
    expect(link).toHaveAttribute("href", "mailto:privacy@techtrinity.ai");
  }
});
