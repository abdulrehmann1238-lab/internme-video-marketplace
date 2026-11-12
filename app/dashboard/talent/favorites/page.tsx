"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EmptyState } from "@/components/EmptyState";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";

export default function TalentFavoritesPage() {
  const router = useRouter();
  const { favoriteOpportunityIds } = useFavorites();
  const { opportunities } = useDemoState();

  const savedOpportunities = opportunities.filter((opp) =>
    favoriteOpportunityIds.includes(opp.id)
  );

  return (
    <DashboardShell mode="candidate">
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Saved Opportunities
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Internships and SignMeUp Sprints you saved for later review.
          </p>
        </div>

        {savedOpportunities.length === 0 ? (
          <EmptyState
            title="No saved opportunities yet."
            description="Tap the heart icon or double-click any role card to keep opportunities in your shortlist."
            actionLabel="Discover Opportunities"
            onAction={() => router.push("/discover?view=opportunities")}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

