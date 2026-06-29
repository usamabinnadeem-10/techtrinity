import { afterEach, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { COOKIE_OPEN_EVENT } from "@/lib/consent";
import { CookieSettingsLink } from "./cookie-settings-link";

afterEach(() => {
  vi.restoreAllMocks();
});

test("dispatches the cookie:open event when clicked", async () => {
  const listener = vi.fn();
  window.addEventListener(COOKIE_OPEN_EVENT, listener);

  render(<CookieSettingsLink />);
  await userEvent.click(screen.getByRole("button", { name: /cookie settings/i }));

  expect(listener).toHaveBeenCalledOnce();
  window.removeEventListener(COOKIE_OPEN_EVENT, listener);
});
