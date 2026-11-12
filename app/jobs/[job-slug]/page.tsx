import React from "react";
import { Metadata } from "next";
import { getOpportunityBySlug, OPPORTUNITIES } from "@/data/opportunities";
import { getTrackBadgeLabel } from "@/lib/helpers";
import { buildJobPostingJsonLd } from "@/lib/schema";
import { JobDetailClient } from "@/components/JobDetailClient";

interface PageProps {
  params: Promise<{ "job-slug": string }>;
}

export async function generateStaticParams() {
  return OPPORTUNITIES.map((opp) => ({
    "job-slug": opp.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { "job-slug": jobSlug } = await params;
  const opp = getOpportunityBySlug(jobSlug);

  if (!opp) {
    return {
      title: "Opportunity Details",
    };
  }

  return {
    title: `${opp.title} at ${opp.companyName}`,
    description: `${getTrackBadgeLabel(opp.track)} · ${opp.duration} · ${opp.location} (${opp.workArrangement}). ${opp.description.slice(0, 140)}`,
    openGraph: {
      title: `${opp.title} — ${opp.companyName} | InternMe`,
      description: opp.description.slice(0, 180),
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { "job-slug": jobSlug } = await params;
  const opportunity = getOpportunityBySlug(jobSlug);

  const jsonLd = opportunity ? buildJobPostingJsonLd(opportunity) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <JobDetailClient initialOpportunity={opportunity} slug={jobSlug} />
    </>
  );
}

