export type Founder = {
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly location: string;
  readonly email: string;
  readonly linkedin: string;
  readonly upwork: string;
};

export type Stat = {
  readonly metric: string;
  readonly description: string;
};

export type Value = {
  readonly title: string;
  readonly description: string;
};

export type Team = {
  readonly size: number;
  readonly description: string;
};

export const founder: Founder = {
  name: "Usama Bin Nadeem",
  role: "Founder & Lead Engineer",
  bio: "I've spent 5+ years building software as a contractor for US and UK companies before starting TechTrinity. I started the agency because I kept seeing the same problem: clients were paying big-agency rates and getting junior developers, slow delivery, and half-finished work. TechTrinity exists to fix that.",
  location: "Lahore, Pakistan",
  email: "usama@techtrinity.ai",
  linkedin: "https://linkedin.com/in/usamabinnadeem",
  upwork: "https://upwork.com",
};

export const stats: readonly Stat[] = [
  { metric: "5+", description: "Years of professional experience" },
  { metric: "5", description: "Senior developers on the team" },
  { metric: "40+", description: "Projects delivered" },
  { metric: "1", description: "Year as TechTrinity" },
];

export const values: readonly Value[] = [
  {
    title: "Speed without shortcuts",
    description:
      "We deliver fast because we are experienced, not because we cut corners. Fast delivery and clean code are not opposites.",
  },
  {
    title: "Senior on every project",
    description:
      "No juniors. No handoffs mid-project. The developer who scopes your project is the developer who builds it.",
  },
  {
    title: "Small roster, full attention",
    description:
      "We take on a small number of projects at a time. Your project gets our full focus, not whatever capacity is left over.",
  },
  {
    title: "Honest over impressive",
    description:
      "We tell you what is realistic before we start. If your timeline is impossible, we will say so — and tell you what is possible instead.",
  },
];

export const team: Team = {
  size: 5,
  description:
    "We are a team of 5 senior developers. No juniors. No handoffs. No surprises.",
};
