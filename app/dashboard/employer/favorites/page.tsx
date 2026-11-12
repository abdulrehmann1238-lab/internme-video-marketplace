"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { CandidateCard } from "@/components/CandidateCard";
import { EmptyState } from "@/components/EmptyState";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";

export default function EmployerFavoritesPage() {
  const router = useRouter();
  const { favoriteCandidateIds } = useFavorites();
  const { candidates } = useDemoState();

  const savedCandidates = candidates.filter((c) =>
    favoriteCandidateIds.includes(c.id)
  );

  return (
    <DashboardShell mode="employer">
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Saved Candidates
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Your shortlisted video introductions ready for review and outreach.
          </p>
        </div>

        {savedCandidates.length === 0 ? (
          <EmptyState
            title="No saved candidates yet."
            description="Tap the heart icon or double-click any candidate card to add them to your shortlist."
            actionLabel="Discover Talent"
            onAction={() => router.push("/dashboard/employer/talent")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

