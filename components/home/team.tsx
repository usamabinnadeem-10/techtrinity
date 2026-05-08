import Image from "next/image";
import { EditorialLabel } from "./label";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  initials: string;
  index: string;
  signature: string;
  field: string;
  hue: { from: string; to: string; accent: string };
  image?: { src: string; alt: string };
};

const TEAM: TeamMember[] = [
  {
    name: "Usama Nadeem",
    role: "Founder · Engineering Lead",
    bio: "Ex-Canonical. Architects production systems that survive launch day and the next six years.",
    initials: "UN",
    index: "01",
    signature: "u·nadeem",
    field: "Systems / Strategy",
    hue: { from: "#102414", to: "#04090a", accent: "#b8ff57" },
    image: { src: "/team/usama_hf.png", alt: "Portrait of Usama Nadeem" },
  },
  {
    name: "Faiq Khan",
    role: "Design Direction",
    bio: "A decade across editorial, product, and identity. Believes screens should feel as considered as print.",
    initials: "FK",
    index: "02",
    signature: "f·khan",
    field: "Brand / Interface",
    hue: { from: "#1f1734", to: "#080612", accent: "#c7a8ff" },
  },
  {
    name: "Sara Okafor",
    role: "Systems Engineering",
    bio: "Distributed systems and the unglamorous infra that holds them up. Writes in graphs, ships in receipts.",
    initials: "SO",
    index: "03",
    signature: "s·okafor",
    field: "Infra / Reliability",
    hue: { from: "#241710", to: "#0a0604", accent: "#ffb16b" },
  },
];

export function Team() {
  return (
    <section id="team" className="border-t border-border py-28 md:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div
          data-reveal
          className="mb-14 grid gap-8 md:grid-cols-[1.25fr_1fr] md:items-end md:gap-16"
        >
          <div>
            <EditorialLabel>The Team</EditorialLabel>
            <h2 className="mt-3.5 font-display text-[clamp(32px,3.4vw,52px)] font-bold leading-[1.05] tracking-[-0.025em]">
              The people building it —{" "}
              <em className="italic text-primary">in the room with you.</em>
            </h2>
          </div>
          <div className="md:justify-self-end md:text-right">
            <p className="text-[15px] font-light leading-[1.8] text-muted md:max-w-[420px]">
              No agency layers, no offshoring, no hand-offs. The names on this
              page are the same hands writing the code that ships to your
              users.
            </p>
          </div>
        </div>

        <div
          data-reveal
          data-reveal-delay="1"
          className="grid overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
          style={{ gap: 1 }}
        >
          {TEAM.map((member) => {
            const total = TEAM.length.toString().padStart(2, "0");
            return (
              <article
                key={member.name}
                className="group relative flex flex-col bg-card p-7 transition-colors duration-300 hover:bg-card-elevated md:p-9"
              >
                <div
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-border"
                  style={{
                    backgroundImage: member.image
                      ? undefined
                      : `radial-gradient(120% 80% at 28% 0%, ${member.hue.from} 0%, ${member.hue.to} 72%)`,
                    backgroundColor: member.image ? "#000" : undefined,
                  }}
                >
                  {member.image && (
                    <>
                      <Image
                        src={member.image.src}
                        alt={member.image.alt}
                        fill
                        sizes="(min-width: 768px) 380px, 100vw"
                        className="object-cover object-center transition-[filter,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [filter:grayscale(0.35)_contrast(1.02)_brightness(0.92)] group-hover:scale-[1.025] group-hover:[filter:grayscale(0)_contrast(1)_brightness(1)]"
                        priority={false}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(180deg, ${member.hue.to}f0 0%, ${member.hue.to}66 22%, transparent 42%, transparent 58%, ${member.hue.to}d9 100%)`,
                        }}
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 mix-blend-soft-light"
                        style={{
                          background: `radial-gradient(140% 90% at 30% 0%, ${member.hue.accent}33 0%, transparent 55%)`,
                        }}
                      />
                    </>
                  )}

                  <span
                    aria-hidden
                    className="absolute inset-0 mix-blend-screen"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(255,255,255,0.16) 0.9px, transparent 1.4px)",
                      backgroundSize: "8px 8px",
                      opacity: member.image ? 0.18 : 0.55,
                      maskImage:
                        "radial-gradient(110% 80% at 50% 60%, #000 30%, transparent 80%)",
                      WebkitMaskImage:
                        "radial-gradient(110% 80% at 50% 60%, #000 30%, transparent 80%)",
                    }}
                  />

                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 60% at 50% 110%, rgba(0,0,0,0.65) 0%, transparent 60%)",
                    }}
                  />

                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-foreground/35"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-foreground/35"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b border-l border-foreground/35"
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-foreground/35"
                  />

                  {!member.image && (
                    <span
                      aria-hidden
                      className="absolute right-2 top-0 font-display text-[200px] font-black leading-none tracking-[-0.05em] md:text-[230px]"
                      style={{ color: "rgba(255,255,255,0.045)" }}
                    >
                      {member.initials.charAt(0)}
                    </span>
                  )}

                  <div className="absolute left-5 top-5 flex flex-col gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-foreground/65">
                    <span>
                      {member.index} / {total}
                    </span>
                    <span>{member.field}</span>
                  </div>

                  {!member.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/12 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[160deg]"
                        />
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-foreground/8 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[100deg]"
                        />
                        <span
                          className="relative z-10 font-display text-[68px] font-black leading-none tracking-[-0.04em] transition-colors duration-500"
                          style={{ color: member.hue.accent }}
                        >
                          {member.initials}
                        </span>
                      </div>
                    </div>
                  )}

                  {member.image && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-5 top-5 font-display text-[20px] font-black leading-none tracking-[-0.04em]"
                      style={{ color: member.hue.accent }}
                    >
                      {member.initials}
                    </span>
                  )}

                  <span className="absolute bottom-5 left-5 font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55">
                    Portrait — TT/{member.index}
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[0.18em] text-foreground/55"
                  >
                    ◐
                  </span>

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-transparent transition-[box-shadow,ring] duration-500 group-hover:ring-primary/20"
                    style={{
                      boxShadow: "inset 0 -80px 80px -60px rgba(0,0,0,0.4)",
                    }}
                  />
                </div>

                <div className="mt-7 flex flex-1 flex-col">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    {member.role}
                  </p>
                  <h3 className="mt-2.5 font-display text-[26px] font-bold leading-[1.1] tracking-[-0.02em]">
                    {member.name}
                  </h3>
                  <p className="mt-3 text-[14px] font-light leading-[1.7] text-muted">
                    {member.bio}
                  </p>

                  <div className="mt-auto flex items-end justify-between gap-4 pt-7">
                    <span
                      aria-hidden
                      className="block h-px w-12 origin-left bg-foreground/20 transition-all duration-500 ease-out group-hover:w-28 group-hover:bg-primary"
                    />
                    <span
                      aria-hidden
                      className="font-display text-[15px] italic leading-none tracking-[-0.01em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                    >
                      {member.signature}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          data-reveal
          data-reveal-delay="2"
          className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-7 md:flex-row md:items-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Small senior team · No juniors hidden behind a logo
          </p>
        </div>
      </div>
    </section>
  );
}
