"use client";

import React, { useMemo, useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { CandidateCard } from "@/components/CandidateCard";
import { EmptyState } from "@/components/EmptyState";
import { useDemoState } from "@/context/DemoStateContext";
import {
  DiscoverFilterState,
  SearchFilters,
} from "@/components/SearchFilters";

const DEFAULT_FILTERS: DiscoverFilterState = {
  keyword: "",
  zipCode: "",
  area: "all",
  workArrangement: "all",
  track: "all",
  skills: [],
  duration: "all",
  sort: "relevant",
};

export default function EmployerTalentDiscoveryPage() {
  const { candidates } = useDemoState();
  const [filters, setFilters] = useState<DiscoverFilterState>(DEFAULT_FILTERS);

  const areas = useMemo(
    () => Array.from(new Set(candidates.map((c) => c.location))).sort(),
    [candidates]
  );

  const filtered = useMemo(() => {
    const q = filters.keyword.trim().toLowerCase();
    const zip = filters.zipCode.trim().toLowerCase();

    return candidates.filter((c) => {
      if (q) {
        const hay =
          `${c.firstName} ${c.lastInitial} ${c.title} ${c.bio} ${c.location} ${c.skills.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (zip && !c.zipCode.toLowerCase().includes(zip)) return false;
      if (filters.area !== "all" && c.location !== filters.area) return false;
      if (
        filters.workArrangement !== "all" &&
        c.workPreference !== filters.workArrangement
      ) {
        return false;
      }
      if (
        filters.track !== "all" &&
        c.preferredTrack !== "Both" &&
        c.preferredTrack !== filters.track
      ) {
        return false;
      }
      if (
        filters.skills.length > 0 &&
        !filters.skills.every((s) => c.skills.includes(s))
      ) {
        return false;
      }
      return true;
    });
  }, [candidates, filters]);

  return (
    <DashboardShell mode="employer">
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Discover Talent
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Watch 30-second video introductions and save candidates to your
            shortlist.
          </p>
        </div>

        <SearchFilters
          filters={filters}
          activeView="talent"
          resultCount={filtered.length}
          areas={areas}
          onChange={setFilters}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />

        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing here just yet."
            description="Try adjusting your skill or location filters to discover more candidate introductions."
            actionLabel="Clear all filters"
            onAction={() => setFilters(DEFAULT_FILTERS)}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

