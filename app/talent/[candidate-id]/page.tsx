import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CANDIDATES, getCandidateById } from "@/data/candidates";
import { formatPublicName } from "@/lib/helpers";
import { buildPersonJsonLd } from "@/lib/schema";
import { CandidateProfileClient } from "@/components/CandidateProfileClient";

interface PageProps {
  params: Promise<{ "candidate-id": string }>;
}

export async function generateStaticParams() {
  return CANDIDATES.map((candidate) => ({
    "candidate-id": candidate.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { "candidate-id": candidateId } = await params;
  const candidate = getCandidateById(candidateId);

  if (!candidate) {
    return {
      title: "Candidate Not Found",
    };
  }

  const publicName = formatPublicName(
    candidate.firstName,
    candidate.lastInitial
  );

  return {
    title: `${publicName} — ${candidate.title}`,
    description: `${publicName} (${candidate.location}) introduces their work in a ${candidate.reelDuration}-second reel on InternMe. Skills: ${candidate.skills.join(", ")}.`,
    openGraph: {
      title: `${publicName} — ${candidate.title} | InternMe`,
      description: candidate.bio,
      type: "profile",
    },
  };
}

export default async function CandidateProfilePage({ params }: PageProps) {
  const { "candidate-id": candidateId } = await params;
  const candidate = getCandidateById(candidateId);

  if (!candidate) {
    notFound();
  }

  const jsonLd = buildPersonJsonLd(candidate);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CandidateProfileClient initialCandidate={candidate} />
    </>
  );
}

