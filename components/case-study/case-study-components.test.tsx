import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { getCaseStudy, type CaseStudy } from "@/lib/case-studies";
import { BOOK_HREF } from "@/lib/offer";
import { CaseCTA } from "./case-cta";
import { CaseHero } from "./case-hero";
import { CaseOutcomes } from "./case-outcomes";
import { CaseSummary } from "./case-summary";
import { CaseWalkthrough } from "./case-walkthrough";

const base = getCaseStudy("easyaccounts")!;

function withStats(n: number): CaseStudy {
  return {
    ...base,
    heroStats: Array.from({ length: n }, (_, i) => ({
      value: `${i + 1}`,
      label: `Stat ${i + 1}`,
    })),
  };
}

describe("CaseHero", () => {
  it("omits the stat row when there are no stats", () => {
    const { container } = render(<CaseHero caseStudy={withStats(0)} />);
    expect(container.querySelectorAll("dl")).toHaveLength(1); // meta only
  });

  it.each([1, 2, 3, 4])("renders %i stats", (n) => {
    render(<CaseHero caseStudy={withStats(n)} />);
    for (let i = 1; i <= n; i++) {
      expect(screen.getByText(`Stat ${i}`)).toBeInTheDocument();
    }
  });

  it("caps the stat row at four", () => {
    render(<CaseHero caseStudy={withStats(6)} />);
    expect(screen.queryByText("Stat 5")).not.toBeInTheDocument();
  });
});

describe("CaseOutcomes", () => {
  it("renders nothing without cards", () => {
    const { container } = render(
      <CaseOutcomes caseStudy={{ ...base, outcomes: { ...base.outcomes, cards: [] } }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the provided cards", () => {
    render(<CaseOutcomes caseStudy={base} />);
    expect(screen.getByText("Multi-branch")).toBeInTheDocument();
  });
});

describe("CaseCTA", () => {
  it("links to booking, the related workflow, and the work anchor with tracking", () => {
    render(<CaseCTA caseStudy={base} />);
    const book = screen.getByRole("link", { name: /book a workflow review/i });
    expect(book).toHaveAttribute("href", BOOK_HREF);
    expect(book).toHaveAttribute("data-cta-section", "case-study-easyaccounts");

    const related = screen.getByRole("link", { name: /discuss an operations workflow/i });
    expect(related).toHaveAttribute("href", "/contact?service=operations#message");
    expect(related).toHaveAttribute("data-cta-service", "operations");

    expect(screen.getByRole("link", { name: /see other work/i })).toHaveAttribute(
      "href",
      "/#work",
    );
    expect(screen.queryByRole("link", { name: /case studies/i })).not.toBeInTheDocument();
  });

  it("offers MVP development for Hirecinch", () => {
    render(<CaseCTA caseStudy={getCaseStudy("hirecinch")!} />);
    expect(screen.getByRole("link", { name: /see mvp development/i })).toHaveAttribute(
      "href",
      "/services/mvp-development",
    );
  });
});

describe("CaseSummary & CaseWalkthrough", () => {
  it("renders the six buyer answers", () => {
    render(<CaseSummary caseStudy={base} />);
    expect(screen.getByText("Usama’s contribution")).toBeInTheDocument();
    expect(screen.getByText(/figures are pending verification/i)).toBeInTheDocument();
  });

  it("renders the walkthrough as an ordered list with captions and no video", () => {
    const { container } = render(<CaseWalkthrough caseStudy={base} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(base.walkthrough!.steps.length);
    expect(screen.getByText(/Step 01 — Record the purchase/)).toBeInTheDocument();
    expect(container.querySelector("video")).toBeNull();
  });
});
