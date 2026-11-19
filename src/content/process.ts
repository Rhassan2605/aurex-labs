export type ProcessStep = {
  number: string;
  title: string;
  text: string;
  outputs: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    text: "We learn your business, audience and goals, review what exists today and agree on what success should look like.",
    outputs: ["Discovery call", "Goals & constraints", "Project brief"],
  },
  {
    number: "02",
    title: "Strategize",
    text: "We turn insight into a plan: positioning, structure, content priorities, technology choices and a clear timeline.",
    outputs: ["Sitemap or flows", "Technical approach", "Timeline & scope"],
  },
  {
    number: "03",
    title: "Design",
    text: "We explore visual directions, then refine one into polished, responsive interfaces and brand assets you can review.",
    outputs: ["Moodboards", "Wireframes", "High-fidelity design"],
  },
  {
    number: "04",
    title: "Develop",
    text: "We build with clean, documented code, test on real devices and optimise for speed, accessibility and search.",
    outputs: ["Production build", "QA & testing", "Performance tuning"],
  },
  {
    number: "05",
    title: "Launch & Evolve",
    text: "We launch carefully, monitor real-world data and keep improving — content, features and visibility over time.",
    outputs: ["Deployment", "Search Console setup", "Ongoing iteration"],
  },
];
