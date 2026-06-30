import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "tt-cookie-consent";

/** Normalize dataLayer arguments-objects to arrays and return the consent default payload. */
async function consentDefault(page: Page) {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const calls = layer.map((entry) => Array.from(entry as ArrayLike<unknown>));
    const found = calls.find((c) => c[0] === "consent" && c[1] === "default");
    return (found?.[2] ?? null) as Record<string, string> | null;
  });
}

async function consentUpdates(page: Page) {
  return page.evaluate(() => {
    const layer = (window as unknown as { dataLayer?: unknown[] }).dataLayer ?? [];
    const calls = layer.map((entry) => Array.from(entry as ArrayLike<unknown>));
    return calls
      .filter((c) => c[0] === "consent" && c[1] === "update")
      .map((c) => c[2] as Record<string, string>);
  });
}

test("new visitor: banner shows, default denied, no analytics cookie", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeVisible();
  expect(await consentDefault(page)).toMatchObject({ analytics_storage: "denied" });

  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name.startsWith("_ga"))).toBeUndefined();
});

test("Accept stores granted, fires consent update, and hides the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /accept/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();

  const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(JSON.parse(stored!).analytics).toBe("granted");
  expect(await consentUpdates(page)).toContainEqual({ analytics_storage: "granted" });
});

test("returning accepted visitor: default granted on first byte, no banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /accept/i }).click();
  await page.reload();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  expect(await consentDefault(page)).toMatchObject({ analytics_storage: "granted" });
});

test("Reject keeps analytics off and hides the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /reject/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
  expect(JSON.parse(stored!).analytics).toBe("denied");
  expect(await consentUpdates(page)).toContainEqual({ analytics_storage: "denied" });

  await page.reload();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
});

test("footer Cookie settings reopens the banner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /reject/i }).click();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();

  await page.getByRole("button", { name: /cookie settings/i }).click();
  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeVisible();
});

test("banner links to the privacy page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("region", { name: /cookie consent/i })
    .getByRole("link", { name: /privacy/i })
    .click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.getByRole("heading", { level: 1, name: /privacy & cookie policy/i })).toBeVisible();
});

test("contact: undecided visitor sees the click-to-load scheduler placeholder", async ({ page }) => {
  await page.goto("/contact");

  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();
  await expect(page.locator(".calendly-inline-widget")).toHaveCount(0);
});

test("contact: clicking the placeholder loads the Calendly widget", async ({ page }) => {
  await page.goto("/contact");

  await page.getByRole("button", { name: /load scheduler/i }).click();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: accepting consent auto-loads the scheduler without a reload", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();

  await page.getByRole("button", { name: /accept/i }).click();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: returning accepted visitor gets the scheduler, no placeholder", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /accept/i }).click();
  await page.reload();

  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
  await expect(page.getByRole("button", { name: /load scheduler/i })).toHaveCount(0);
});

test("contact: rejected visitor keeps the placeholder and can still load per-use", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /reject/i }).click();

  await expect(page.getByRole("region", { name: /cookie consent/i })).toBeHidden();
  await expect(page.getByRole("button", { name: /load scheduler/i })).toBeVisible();

  await page.getByRole("button", { name: /load scheduler/i }).click();
  await expect(page.locator(".calendly-inline-widget")).toHaveCount(1);
});
