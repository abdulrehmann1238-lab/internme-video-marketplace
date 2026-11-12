import type { Candidate, Opportunity } from "@/lib/types";
import { formatPublicName, getTrackBadgeLabel } from "@/lib/helpers";

const SITE_BASE_URL = "https://internme.example";

/**
 * Generates Schema.org JobPosting structured data for dynamic opportunity routes.
 */
export function buildJobPostingJsonLd(opportunity: Opportunity) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: opportunity.title,
    description: opportunity.description,
    datePosted: opportunity.datePosted,
    employmentType:
      opportunity.track === "Internship" ? "INTERN" : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: opportunity.companyName,
    },
    jobLocationType:
      opportunity.workArrangement === "Remote" ? "TELECOMMUTE" : undefined,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: opportunity.location,
        postalCode: opportunity.zipCode,
      },
    },
    skills: opportunity.skills.join(", "),
    url: `${SITE_BASE_URL}/jobs/${opportunity.slug}`,
    directApply: true,
    additionalType: getTrackBadgeLabel(opportunity.track),
  };
}

/**
 * Generates privacy-conscious Schema.org Person structured data (never exposes legal surname or private contact info).
 */
export function buildPersonJsonLd(candidate: Candidate) {
  const publicName = formatPublicName(
    candidate.firstName,
    candidate.lastInitial
  );
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: publicName,
    givenName: candidate.firstName,
    jobTitle: candidate.title,
    description: candidate.bio,
    homeLocation: {
      "@type": "Place",
      name: candidate.location,
    },
    knowsAbout: candidate.skills,
    url: `${SITE_BASE_URL}/talent/${candidate.id}`,
  };
}
