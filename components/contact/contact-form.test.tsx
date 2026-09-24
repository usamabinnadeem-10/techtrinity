import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { __resetAnalyticsDedupe } from "@/lib/analytics";
import { CONTACT_SUCCESS_MESSAGE } from "@/lib/offer";
import { ContactForm } from "./contact-form";

const gtag = vi.fn();
const fetchMock = vi.fn();

function setUrl(search: string) {
  window.history.replaceState(null, "", `/contact${search}`);
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function fillRequired(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/your name/i), "Jane Doe");
  await user.type(screen.getByLabelText(/email address/i), "jane@example.com");
  await user.type(
    screen.getByLabelText(/what would you like to improve or build/i),
    "Our order handoffs are manual.",
  );
}

function eventsNamed(name: string) {
  return gtag.mock.calls.filter((c) => c[0] === "event" && c[1] === name);
}

beforeEach(() => {
  window.gtag = gtag;
  __resetAnalyticsDedupe();
  vi.stubGlobal("fetch", fetchMock);
  setUrl("");
});

afterEach(() => {
  gtag.mockReset();
  fetchMock.mockReset();
  vi.unstubAllGlobals();
  delete window.gtag;
});

const serviceSelect = () =>
  screen.getByLabelText(/what can we help with/i) as HTMLSelectElement;

describe("service preselection", () => {
  it("preselects an allowlisted ?service= value", async () => {
    setUrl("?service=mvp");
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("MVP/product development"));
  });

  it("ignores an invalid ?service= value", async () => {
    setUrl("?service=%3Cscript%3E");
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe(""));
  });

  it("leaves the service empty when the param is missing", async () => {
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe(""));
  });

  it("lets the visitor change a preselected service", async () => {
    setUrl("?service=website");
    const user = userEvent.setup();
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("Website"));
    await user.selectOptions(serviceSelect(), "AI automation");
    expect(serviceSelect().value).toBe("AI automation");
  });
});

describe("progressive disclosure", () => {
  it("hides operations questions for a product founder", async () => {
    setUrl("?service=mvp");
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("MVP/product development"));
    expect(screen.queryByLabelText(/workflow you want to fix/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/business type/i)).not.toBeInTheDocument();
  });

  it("shows operations questions for operations enquiries", async () => {
    setUrl("?service=operations");
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("Operations workflow"));
    expect(screen.getByLabelText(/workflow you want to fix/i)).toBeInTheDocument();
  });
});

describe("submission", () => {
  it("shows the success message only after the backend accepts", async () => {
    setUrl("?service=ai-automation&utm_source=linkedin&utm_campaign=q4");
    fetchMock.mockResolvedValue(jsonResponse(200, { success: true }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("AI automation"));
    await fillRequired(user);

    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(CONTACT_SUCCESS_MESSAGE)).toBeInTheDocument();
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent).toMatchObject({
      name: "Jane Doe",
      service: "AI automation",
      utmSource: "linkedin",
      utmCampaign: "q4",
    });
    expect(eventsNamed("contact_form_success")).toEqual([
      ["event", "contact_form_success", { service: "AI automation" }],
    ]);
  });

  it("does not submit and focuses the first invalid field when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
    expect(screen.getByText(/please fix the 3 highlighted fields/i)).toBeInTheDocument();
    expect(eventsNamed("contact_form_error")[0][2]).toEqual({ error_category: "validation" });
  });

  it("shows an accessible error and keeps values on a server failure", async () => {
    fetchMock.mockResolvedValue(jsonResponse(502, { success: false, error: "Failed" }));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));

    const alert = await screen.findByRole("alert");
    await waitFor(() => expect(alert).toHaveTextContent(/couldn’t send your message/i));
    expect(alert).toHaveFocus();
    expect(screen.getByLabelText(/your name/i)).toHaveValue("Jane Doe");
    expect(screen.queryByText(CONTACT_SUCCESS_MESSAGE)).not.toBeInTheDocument();
    expect(eventsNamed("contact_form_error")[0][2]).toEqual({ error_category: "server" });
  });

  it("reports a network error category when fetch rejects", async () => {
    fetchMock.mockRejectedValue(new TypeError("offline"));
    const user = userEvent.setup();
    render(<ContactForm />);
    await fillRequired(user);
    await user.click(screen.getByRole("button", { name: /send message/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/couldn’t reach our server/i),
    );
    expect(eventsNamed("contact_form_error")[0][2]).toEqual({ error_category: "network" });
    expect(screen.getByLabelText(/email address/i)).toHaveValue("jane@example.com");
  });
});

describe("analytics", () => {
  it("fires contact_form_start once, on first interaction, without personal data", async () => {
    setUrl("?service=website");
    const user = userEvent.setup();
    render(<ContactForm />);
    await waitFor(() => expect(serviceSelect().value).toBe("Website"));
    expect(eventsNamed("contact_form_start")).toHaveLength(0);

    await fillRequired(user);
    const starts = eventsNamed("contact_form_start");
    expect(starts).toEqual([["event", "contact_form_start", { service: "Website" }]]);
    const everything = JSON.stringify(gtag.mock.calls);
    expect(everything).not.toContain("Jane");
    expect(everything).not.toContain("jane@example.com");
  });
});
