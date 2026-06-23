import { EditorialLabel } from "./label";

type Stat = {
  value: string;
  accent: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "3", accent: "", label: "Countries shipped to: US, UK, AU" },
  { value: "5", accent: "+", label: "Years building production systems" },
  { value: "1", accent: ":1", label: "Direct founder access. Always." },
];

export function About() {
  return (
    <section id="about" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div data-reveal>
            <EditorialLabel>Who We Are</EditorialLabel>
            <h2 className="mt-3.5 mb-6 font-display text-[clamp(30px,3.4vw,50px)] font-bold leading-[1.05] tracking-[-0.025em]">
              Built by people who&apos;ve shipped real systems.
            </h2>
            <div className="space-y-4 text-[16px] font-light leading-[1.85] text-muted">
              <p>
                TechTrinity was founded by an engineer with experience at{" "}
                <strong className="font-medium text-foreground">Canonical</strong> —
                the company behind Ubuntu — and a track record of building
                production systems from the ground up.
              </p>
              <p>
                We build with modern, well-supported web technology —{" "}
                <strong className="font-medium text-foreground">
                  React, Next.js, Node.js, Django, and PostgreSQL
                </strong>{" "}
                on cloud infrastructure — chosen so your system stays fast,
                secure, and easy to extend for years, not locked into a
                template.
              </p>
              <p>
                We&apos;re a small, senior team. You&apos;ll never be handed off
                to a junior. The person you speak to in the discovery call is
                the person mapping and building your system.
              </p>
              <p>
                We take on a{" "}
                <strong className="font-medium text-foreground">
                  small number of operations at a time
                </strong>{" "}
                — so every client gets our full attention.
              </p>
            </div>
          </div>

          <aside
            data-reveal
            data-reveal-delay="2"
            className="rounded-lg border border-border bg-card p-10 md:p-12"
          >
            <ul className="divide-y divide-border">
              {STATS.map((stat) => (
                <li key={stat.label} className="flex flex-col py-7 first:pt-0 last:pb-0">
                  <span className="font-display text-[56px] font-black leading-none tracking-[-0.04em]">
                    {stat.value}
                    <span className="text-primary">{stat.accent}</span>
                  </span>
                  <span className="mt-1.5 text-sm font-light text-muted">
                    {stat.label}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
