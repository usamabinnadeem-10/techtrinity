import { COOKIE_INVENTORY, type CookieCategory } from "@/lib/legal/cookie-inventory";

const COLUMNS = ["Name", "Provider", "Category", "Purpose", "Type", "Lasts"] as const;

const CATEGORY_LABEL: Record<CookieCategory, string> = {
  necessary: "Strictly necessary",
  analytics: "Analytics",
  functional: "Functional",
};

/** Renders the single-sourced cookie inventory as an accessible table. */
export function CookieTable() {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full border-collapse text-left text-[13px]">
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col}
                scope="col"
                className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COOKIE_INVENTORY.map((entry) => (
            <tr key={entry.name} className="align-top">
              <td className="border-b border-border/60 px-3 py-2 font-mono text-foreground">
                {entry.name}
              </td>
              <td className="border-b border-border/60 px-3 py-2">
                {entry.policyUrl ? (
                  <a
                    href={entry.policyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 transition-colors hover:text-primary"
                  >
                    {entry.provider}
                  </a>
                ) : (
                  entry.provider
                )}
              </td>
              <td className="border-b border-border/60 px-3 py-2">
                {CATEGORY_LABEL[entry.category]}
              </td>
              <td className="border-b border-border/60 px-3 py-2">{entry.purpose}</td>
              <td className="border-b border-border/60 px-3 py-2">{entry.type}</td>
              <td className="border-b border-border/60 px-3 py-2">{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
