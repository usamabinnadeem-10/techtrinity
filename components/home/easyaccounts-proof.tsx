import Image from "next/image";
import Link from "next/link";
import { claimText, publishedStats, type ClaimKey } from "@/lib/claims";
import { ctaAttrs } from "@/lib/cta";
import { OWN_PRODUCT_LABEL } from "@/lib/offer";
import { EditorialLabel } from "./label";

// Numeric badges render only once the owner verifies them in lib/claims.ts.
const STAT_KEYS: ClaimKey[] = [
  "easyAccountsBranches",
  "easyAccountsDuration",
  "easyAccountsTransactions",
  "easyAccountsPayments",
  "easyAccountsPermissions",
];

// Running-copy facts: the verified phrasing when published, otherwise the
// registry's neutral fallback.
const FACTS = [
  claimText("easyAccountsBranches", (c) => `${c.value} ${c.label.toLowerCase()}`),
  claimText("easyAccountsDuration", (c) => `${c.label} ${c.value}`),
].filter((fact): fact is string => fact !== null);

export function EasyAccountsProof() {
  const stats = publishedStats(STAT_KEYS);

  return (
    <section id="proof" className="border-t border-border py-24 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <article
          data-reveal
          className="grid items-center gap-10 rounded-lg border border-border bg-card p-7 transition-colors duration-300 hover:border-border-strong md:grid-cols-2 md:gap-12 md:p-14"
        >
          <div className="min-w-0">
            <EditorialLabel>{OWN_PRODUCT_LABEL} · EasyAccounts</EditorialLabel>
            <h2 className="mt-5 font-display text-[clamp(28px,3vw,46px)] font-bold leading-[1.06] tracking-[-0.025em]">
              Built for a real wholesale operation—{" "}
              <em className="italic text-primary">maintained for daily use.</em>
            </h2>
            <p className="mt-4 text-[16px] font-light leading-[1.75] text-muted">
              Usama built EasyAccounts for his family&apos;s wholesale textile
              business to replace spreadsheets and fragile backups with stock,
              order, and reporting numbers the whole team can check. It is the
              clearest example of how we work: close to the people using it, and
              improved as the business changes.
            </p>

            <ul className="mt-7 space-y-3">
              {FACTS.map((fact) => (
                <li
                  key={fact}
                  className="flex items-start gap-3 text-[15px] font-light leading-[1.6] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>

            {stats.length > 0 && (
              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-[32px] font-black leading-none tracking-[-0.03em]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <Link
              href="/work/easyaccounts"
              className="mt-8 inline-flex items-center gap-2.5 border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
              {...ctaAttrs("Read the EasyAccounts case study", "proof")}
            >
              Read the EasyAccounts case study <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="relative min-w-0 overflow-hidden rounded-md border border-border bg-background">
            <Image
              src="/easyaccounts/reports-product-cost-trace.png"
              alt="EasyAccounts product cost trace report, following a product's cost through its stock movements"
              width={1465}
              height={812}
              sizes="(min-width: 768px) 540px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
