import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const send = vi.fn();
vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST } from "./route";

function request(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = {
  name: "Jane",
  email: "jane@example.com",
  message: "We need a better quoting workflow.",
  service: "AI automation",
  utmSource: "linkedin",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "test-key";
    send.mockReset();
    send.mockResolvedValue({ data: { id: "1" }, error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    delete process.env.RESEND_API_KEY;
    vi.restoreAllMocks();
  });

  it("sends a valid enquiry through the (mocked) email provider", async () => {
    const res = await POST(request(valid));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ success: true });
    expect(send).toHaveBeenCalledOnce();
    const args = send.mock.calls[0][0];
    expect(args.subject).toContain("AI automation");
    expect(args.html).toContain("linkedin");
  });

  it("rejects invalid JSON", async () => {
    const res = await POST(request("{nope"));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("rejects a service outside the allowlist", async () => {
    const res = await POST(request({ ...valid, service: "Crypto" }));
    expect(res.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("returns field errors for missing required fields and length bounds", async () => {
    const res = await POST(request({ ...valid, name: "", message: "x".repeat(6000) }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(Object.keys(data.fieldErrors).sort()).toEqual(["message", "name"]);
    expect(send).not.toHaveBeenCalled();
  });

  it("reports provider failures as a server error", async () => {
    send.mockResolvedValue({ data: null, error: { message: "boom" } });
    const res = await POST(request(valid));
    expect(res.status).toBe(502);
    expect((await res.json()).success).toBe(false);
  });
});
