"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, Eye, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDemoState } from "@/context/DemoStateContext";
import { matchesDurationFilter } from "@/lib/helpers";
import {
  DiscoverFilterState,
  SearchFilters,
} from "@/components/SearchFilters";
import { CandidateCard } from "@/components/CandidateCard";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EmptyState } from "@/components/EmptyState";
import { SkeletonGrid } from "@/components/SkeletonLoader";
import { useToast } from "@/components/ToastProvider";

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

function DiscoverContent() {
  const searchParams = useSearchParams();
  const { role, logout, loginAsCandidate, loginAsEmployer } = useAuth();
  const { candidates, opportunities } = useDemoState();
  const { showToast } = useToast();

  const initialView =
    searchParams.get("view") === "talent" ? "talent" : "opportunities";
  const initialTrack = searchParams.get("track") || "all";

  const [publicView, setPublicView] = useState<"talent" | "opportunities">(
    initialView
  );
  const [filters, setFilters] = useState<DiscoverFilterState>({
    ...DEFAULT_FILTERS,
    track:
      initialTrack === "Internship" || initialTrack === "Sprint"
        ? initialTrack
        : "all",
  });

  useEffect(() => {
    const viewParam = searchParams.get("view");
    const trackParam = searchParams.get("track");
    if (viewParam === "talent" || viewParam === "opportunities") {
      setPublicView(viewParam);
    }
    if (trackParam === "Internship" || trackParam === "Sprint") {
      setFilters((prev) => ({ ...prev, track: trackParam }));
    }
  }, [searchParams]);

  // Enforce PRD 7.1 Role-Based Visibility Rules
  const effectiveView: "talent" | "opportunities" =
    role === "candidate"
      ? "opportunities"
      : role === "employer"
        ? "talent"
        : publicView;

  const areas = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach((c) => set.add(c.location));
    opportunities.forEach((o) => set.add(o.location));
    return Array.from(set).sort();
  }, [candidates, opportunities]);

  const filteredCandidates = useMemo(() => {
    const q = filters.keyword.trim().toLowerCase();
    const zip = filters.zipCode.trim().toLowerCase();

    return candidates.filter((c) => {
      if (q) {
        const haystack =
          `${c.firstName} ${c.lastInitial} ${c.title} ${c.bio} ${c.location} ${c.skills.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
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
      if (filters.duration !== "all") {
        // Check preferred track/duration approximation
        const isSprintPref = c.preferredTrack === "Sprint";
        const approxWeeks = isSprintPref ? 4 : 16;
        if (!matchesDurationFilter(approxWeeks, filters.duration)) {
          if (c.preferredTrack !== "Both") return false;
        }
      }
      return true;
    });
  }, [candidates, filters]);

  const filteredOpportunities = useMemo(() => {
    const q = filters.keyword.trim().toLowerCase();
    const zip = filters.zipCode.trim().toLowerCase();

    const list = opportunities.filter((opp) => {
      if (opp.status === "Paused") return false;
      if (q) {
        const haystack =
          `${opp.title} ${opp.companyName} ${opp.description} ${opp.location} ${opp.skills.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (zip && !opp.zipCode.toLowerCase().includes(zip)) return false;
      if (filters.area !== "all" && opp.location !== filters.area) return false;
      if (
        filters.workArrangement !== "all" &&
        opp.workArrangement !== filters.workArrangement
      ) {
        return false;
      }
      if (filters.track !== "all" && opp.track !== filters.track) return false;
      if (
        filters.skills.length > 0 &&
        !filters.skills.every((s) => opp.skills.includes(s))
      ) {
        return false;
      }
      if (!matchesDurationFilter(opp.durationWeeks, filters.duration)) {
        return false;
      }
      return true;
    });

    if (filters.sort === "recent") {
      return [...list].sort((a, b) =>
        b.datePosted.localeCompare(a.datePosted)
      );
    }
    if (filters.sort === "shortest") {
      return [...list].sort((a, b) => a.durationWeeks - b.durationWeeks);
    }
    return list;
  }, [opportunities, filters]);

  const resultCount =
    effectiveView === "talent"
      ? filteredCandidates.length
      : filteredOpportunities.length;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
            Curated Discovery Marketplace
          </span>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
            Find your next connection.
          </h1>
          <p className="mt-2 max-w-xl text-base text-secondary-text">
            Discover people worth meeting and opportunities worth pursuing.
          </p>
        </div>

        {/* View Switcher (Public mode allows toggling both; Candidate/Employer enforce visibility rules) */}
        {role === "guest" ? (
          <div
            role="tablist"
            aria-label="Marketplace view selector"
            className="inline-flex self-start rounded-2xl border border-sand-border bg-pure-white p-1.5 shadow-sm"
          >
            <button
              type="button"
              role="tab"
              aria-selected={effectiveView === "talent"}
              onClick={() => setPublicView("talent")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                effectiveView === "talent"
                  ? "bg-deep-forest text-warm-ivory shadow-sm"
                  : "text-secondary-text hover:text-warm-charcoal"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Explore Talent</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={effectiveView === "opportunities"}
              onClick={() => setPublicView("opportunities")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                effectiveView === "opportunities"
                  ? "bg-deep-forest text-warm-ivory shadow-sm"
                  : "text-secondary-text hover:text-warm-charcoal"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Explore Opportunities</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-sand-border bg-pure-white px-4 py-2.5 text-xs">
            <Eye className="h-4 w-4 text-deep-forest" />
            <span className="font-medium text-warm-charcoal">
              {role === "candidate"
                ? "Candidate browsing mode: showing Opportunities"
                : "Employer browsing mode: showing Talent"}
            </span>
            <span className="text-sand-border">|</span>
            <button
              type="button"
              onClick={() => {
                if (role === "candidate") {
                  loginAsEmployer();
                  showToast("Switched to Employer view.", "info");
                } else {
                  loginAsCandidate();
                  showToast("Switched to Candidate view.", "info");
                }
              }}
              className="font-semibold text-deep-forest hover:underline"
            >
              Switch to {role === "candidate" ? "Employer" : "Candidate"}
            </button>
            <span className="text-sand-border">·</span>
            <button
              type="button"
              onClick={() => {
                logout();
                showToast("Switched to Public Discovery mode.", "info");
              }}
              className="font-medium text-secondary-text hover:text-warm-charcoal hover:underline"
            >
              Public view
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="mt-8">
        <SearchFilters
          filters={filters}
          activeView={effectiveView}
          resultCount={resultCount}
          areas={areas}
          onChange={setFilters}
          onClear={() => setFilters(DEFAULT_FILTERS)}
        />
      </div>

      {/* Results Grid */}
      <motion.div
        key={effectiveView}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mt-8"
      >
        {resultCount === 0 ? (
          <EmptyState
            title="Nothing here just yet."
            description={
              effectiveView === "talent"
                ? "Try adjusting your filters to discover more candidate introductions."
                : "Try adjusting your filters to discover more opportunities."
            }
            actionLabel="Clear all filters"
            onAction={() => setFilters(DEFAULT_FILTERS)}
          />
        ) : effectiveView === "talent" ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8">
          <SkeletonGrid count={6} />
        </div>
      }
    >
      <DiscoverContent />
    </Suspense>
  );
}

