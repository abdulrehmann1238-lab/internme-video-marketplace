import type { MetadataRoute } from "next";
import { CANDIDATES } from "@/data/candidates";
import { OPPORTUNITIES } from "@/data/opportunities";

const BASE_URL = "https://internme.example";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/discover",
    "/how-it-works",
    "/about",
    "/privacy",
    "/hiring-guide",
    "/contact",
    "/terms",
    "/auth/login",
    "/auth/signup",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date("2026-11-12"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const jobRoutes = OPPORTUNITIES.map((opp) => ({
    url: `${BASE_URL}/jobs/${opp.slug}`,
    lastModified: new Date(opp.datePosted),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const talentRoutes = CANDIDATES.map((candidate) => ({
    url: `${BASE_URL}/talent/${candidate.id}`,
    lastModified: new Date("2026-11-12"),
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...jobRoutes, ...talentRoutes];
}

