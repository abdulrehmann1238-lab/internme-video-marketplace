import type { Company } from "@/lib/types";

export const COMPANIES: Company[] = [
  {
    id: "northstar-labs",
    name: "Northstar Labs",
    initials: "NL",
    tagline: "Calm productivity tools for distributed product teams.",
    description:
      "Northstar Labs is a seed-stage software studio crafting tactile planning and async review workflows for small engineering and design teams.",
    sector: "Developer & Product Tools",
    stage: "Seed · 14 people",
    teamSize: "14",
    foundedYear: 2024,
    location: "Lahore / Remote",
    accentBg: "#EAF0E9",
    accentText: "#264A3B",
  },
  {
    id: "foundry-studio",
    name: "Foundry Studio",
    initials: "FS",
    tagline: "Interactive web experiences and design engineering sprints.",
    description:
      "Foundry Studio partners with early founders to prototype, test, and ship crisp digital products in focused four-week build cycles.",
    sector: "Design Engineering",
    stage: "Bootstrapped · 9 people",
    teamSize: "9",
    foundedYear: 2023,
    location: "Islamabad / Hybrid",
    accentBg: "#F0EDE5",
    accentText: "#252923",
  },
  {
    id: "common-ground",
    name: "Common Ground",
    initials: "CG",
    tagline: "Community-led climate and sustainable retail infrastructure.",
    description:
      "Common Ground builds transparent supply-chain storytelling and neighborhood pickup networks for independent sustainable brands.",
    sector: "Climate & Commerce",
    stage: "Pre-Seed · 8 people",
    teamSize: "8",
    foundedYear: 2024,
    location: "Karachi / Hybrid",
    accentBg: "#EAF0E9",
    accentText: "#264A3B",
  },
  {
    id: "studio-field",
    name: "Studio Field",
    initials: "SF",
    tagline: "Editorial identity systems for emerging consumer founders.",
    description:
      "A tight-knit brand and packaging studio translating founder convictions into memorable typography, print, and digital flagships.",
    sector: "Brand & Identity",
    stage: "Independent · 6 people",
    teamSize: "6",
    foundedYear: 2022,
    location: "Remote",
    accentBg: "#F0EDE5",
    accentText: "#252923",
  },
  {
    id: "buildwell",
    name: "Buildwell",
    initials: "BW",
    tagline: "Modern procurement software for regional builders.",
    description:
      "Buildwell helps independent architects and mid-sized construction teams track material budgets, supplier quotes, and site milestones.",
    sector: "Construction Tech",
    stage: "Series A · 28 people",
    teamSize: "28",
    foundedYear: 2023,
    location: "Lahore / On-site",
    accentBg: "#EAF0E9",
    accentText: "#264A3B",
  },
  {
    id: "little-north",
    name: "Little North",
    initials: "LN",
    tagline: "Thoughtful editorial publishing for independent makers.",
    description:
      "Little North runs curated newsletters, founder essays, and seasonal print journals documenting how modern startups actually operate.",
    sector: "Media & Publishing",
    stage: "Bootstrapped · 5 people",
    teamSize: "5",
    foundedYear: 2024,
    location: "Remote",
    accentBg: "#F0EDE5",
    accentText: "#252923",
  },
];

export function getCompanyById(id: string): Company | undefined {
  return COMPANIES.find((company) => company.id === id);
}
