import { expect, test } from "vitest";
import { metadata } from "./page";

test("exposes privacy metadata with a canonical path", () => {
  expect(metadata.title).toBe("Privacy & Cookie Policy");
  expect(metadata.alternates?.canonical).toBe("/privacy");
});
