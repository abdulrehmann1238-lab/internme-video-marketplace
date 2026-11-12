import type { TrackType } from "@/lib/types";

export const SKILL_OPTIONS = [
  "React",
  "JavaScript",
  "UI/UX",
  "Figma",
  "Marketing",
  "Content",
  "Python",
  "Product Design",
  "Research",
  "Branding",
] as const;

export const DURATION_FILTER_OPTIONS = [
  { label: "Any duration", value: "all" },
  { label: "1–4 weeks (Sprint)", value: "1-4-weeks" },
  { label: "5–8 weeks (Sprint)", value: "5-8-weeks" },
  { label: "3–6 months", value: "3-6-months" },
  { label: "7–12 months", value: "7-12-months" },
] as const;

/**
 * Formats a candidate's public display name strictly as "FirstName L." to protect privacy.
 */
export function formatPublicName(firstName: string, lastInitial: string): string {
  const cleanInitial = lastInitial.replace(/\.$/, "").slice(0, 1).toUpperCase();
  return `${firstName.trim()} ${cleanInitial}.`;
}

export function getTrackBadgeLabel(track: TrackType): string {
  return track === "Sprint" ? "SignMeUp Sprint" : "Internship";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatSecondsClock(seconds: number): string {
  const clamped = Math.max(0, Math.round(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function matchesDurationFilter(
  durationWeeks: number,
  filterValue: string
): boolean {
  switch (filterValue) {
    case "1-4-weeks":
      return durationWeeks >= 1 && durationWeeks <= 4;
    case "5-8-weeks":
      return durationWeeks >= 5 && durationWeeks <= 8;
    case "3-6-months":
      return durationWeeks >= 9 && durationWeeks <= 26;
    case "7-12-months":
      return durationWeeks > 26;
    default:
      return true;
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
