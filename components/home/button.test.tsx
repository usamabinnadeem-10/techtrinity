import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./button";

test("renders a real button element with accent styles", () => {
  render(<Button>Accept</Button>);
  const button = screen.getByRole("button", { name: "Accept" });
  expect(button.tagName).toBe("BUTTON");
  expect(button).toHaveClass("bg-primary");
});

test("fires onClick when pressed", async () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Reject</Button>);
  await userEvent.click(screen.getByRole("button", { name: "Reject" }));
  expect(onClick).toHaveBeenCalledOnce();
});

test("applies the ghost variant border style", () => {
  render(
    <Button variant="ghost">Settings</Button>,
  );
  expect(screen.getByRole("button", { name: "Settings" })).toHaveClass("border");
});
