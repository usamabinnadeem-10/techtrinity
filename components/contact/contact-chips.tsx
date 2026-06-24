type Chip = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const MailIcon = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="size-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.5" />
    <path d="m2.5 4.5 5.5 4.25L13.5 4.5" />
  </svg>
);

const LinkedInIcon = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="size-3.5"
    fill="currentColor"
  >
    <path d="M3.6 5.5h2.2v8H3.6v-8Zm1.1-3.4a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Zm3.5 3.4h2.1v1.1h.03c.3-.55 1.04-1.13 2.14-1.13 2.29 0 2.71 1.5 2.71 3.46v4.56h-2.2V9.5c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13v4.07h-2.2v-8Z" />
  </svg>
);

const GitHubIcon = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="size-3.5"
    fill="currentColor"
  >
    <path d="M8 .5C3.86.5.5 3.86.5 8c0 3.31 2.15 6.12 5.13 7.11.38.07.51-.16.51-.36v-1.27c-2.09.45-2.53-1.01-2.53-1.01-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.68 1.16 1.78.83 2.21.63.07-.49.27-.83.48-1.02-1.67-.19-3.43-.84-3.43-3.72 0-.82.29-1.5.78-2.02-.08-.19-.34-.96.07-2.01 0 0 .63-.2 2.07.77a7.2 7.2 0 0 1 1.88-.25c.64 0 1.28.09 1.88.25 1.43-.97 2.06-.77 2.06-.77.41 1.05.15 1.82.07 2.01.49.52.78 1.2.78 2.02 0 2.89-1.76 3.53-3.44 3.71.28.24.52.71.52 1.43v2.12c0 .2.13.44.52.36A7.51 7.51 0 0 0 15.5 8c0-4.14-3.36-7.5-7.5-7.5Z" />
  </svg>
);

const PhoneIcon = (
  <svg
    aria-hidden
    viewBox="0 0 16 16"
    className="size-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 2.5h3l1.5 3.5-1.75 1.25c.85 1.7 2.25 3.1 3.95 3.95L10.5 9.5l3.5 1.5v3c0 .28-.22.5-.5.5C5.75 14.5 1.5 10.25 1.5 5c0-.28.22-.5.5-.5Z" />
  </svg>
);

const CHIPS: Chip[] = [
  { href: "mailto:info@techtrinity.ai", label: "info@techtrinity.ai", icon: MailIcon },
  { href: "tel:+12513732320", label: "+1 (251) 373-2320", icon: PhoneIcon },
  { href: "https://www.linkedin.com/company/108867952", label: "LinkedIn", icon: LinkedInIcon },
];

export function ContactChips() {
  return (
    <div className="mx-auto max-w-[1240px] px-6 md:px-12">
      <div className="border-t border-border pt-10">
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {CHIPS.map((chip) => {
            const isExternal = chip.href.startsWith("http");
            return (
              <li key={chip.label}>
                <a
                  href={chip.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group inline-flex items-center gap-2 rounded-pill border border-border bg-card px-4 py-2 font-mono text-[13px] text-muted transition-[color,border-color,background-color] duration-200 hover:border-border-strong hover:text-foreground"
                >
                  <span className="text-muted-foreground transition-colors duration-200 group-hover:text-primary">
                    {chip.icon}
                  </span>
                  <span>{chip.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
