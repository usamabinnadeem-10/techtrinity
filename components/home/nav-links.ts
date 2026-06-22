export type NavLink = {
  href: string;
  label: string;
  /** One-line description of the destination, shown as a row caption on mobile. */
  caption: string;
};

export const NAV_LINKS: NavLink[] = [
  { href: "/#work", label: "Work", caption: "Case studies & shipped systems" },
  { href: "/services", label: "Services", caption: "What we build" },
  { href: "/use-cases", label: "Use Cases", caption: "Where it fits your operation" },
  { href: "/about", label: "About", caption: "The team behind it" },
  { href: "/blog", label: "Blog", caption: "Notes from the build" },
];
