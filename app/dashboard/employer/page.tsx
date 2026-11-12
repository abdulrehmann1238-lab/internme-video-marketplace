"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Eye,
  FileText,
  Play,
  PlusCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { CandidateCard } from "@/components/CandidateCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";
import { getTrackBadgeLabel } from "@/lib/helpers";

export default function EmployerDashboardPage() {
  const { favoriteCandidateIds } = useFavorites();
  const { candidates, opportunities, applications, openReelModal } =
    useDemoState();

  const activeListings = opportunities.filter((o) => o.status !== "Paused");
  const featuredCandidates = candidates.slice(0, 3);

  return (
    <DashboardShell mode="employer">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-panel border border-sand-border bg-pure-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <span className="inline-flex rounded-full bg-soft-sage px-3 py-0.5 text-[11px] font-semibold text-deep-forest">
              Northstar Labs · Employer Workspace
            </span>
            <h1 className="mt-2.5 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal sm:text-3xl">
              Build your next great team.
            </h1>
            <p className="mt-1 text-sm text-secondary-text">
              Review 30-second video introductions, manage open tracks, and
              connect thoughtfully.
            </p>
          </div>
          <Link
            href="/dashboard/employer/listings/new"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Post an Opportunity</span>
          </Link>
        </div>

        {/* 4 Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Active opportunities</span>
              <Briefcase className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {activeListings.length}
            </p>
            <Link
              href="/dashboard/employer/listings"
              className="mt-1 inline-block text-xs font-medium text-deep-forest hover:underline"
            >
              Manage listings →
            </Link>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Applications received</span>
              <FileText className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {applications.length}
            </p>
            <Link
              href="/dashboard/employer/applications"
              className="mt-1 inline-block text-xs font-medium text-deep-forest hover:underline"
            >
              Review inbox →
            </Link>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Saved candidates</span>
              <Bookmark className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {favoriteCandidateIds.length}
            </p>
            <Link
              href="/dashboard/employer/favorites"
              className="mt-1 inline-block text-xs font-medium text-deep-forest hover:underline"
            >
              Open shortlist →
            </Link>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Profile views</span>
              <Eye className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              148
            </p>
            <p className="mt-1 text-xs text-secondary-text">Last 14 days</p>
          </div>
        </div>

        {/* Recent Applications + Active Listings / Hiring Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
                Recent Applications
              </h2>
              <Link
                href="/dashboard/employer/applications"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                Manage all →
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {applications.slice(0, 4).map((app) => {
                const candidate = candidates.find(
                  (c) => c.id === app.candidateId
                );
                return (
                  <div
                    key={app.id}
                    className="flex flex-col justify-between gap-3 rounded-2xl border border-sand-border bg-warm-ivory/50 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/talent/${app.candidateId}`}
                          className="font-heading text-sm font-semibold text-warm-charcoal hover:text-deep-forest hover:underline"
                        >
                          {app.candidateDisplayName}
                        </Link>
                        <span className="rounded-full bg-soft-sage px-2 py-0.5 text-[10px] font-semibold text-deep-forest">
                          {app.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-secondary-text">
                        Applied for {app.opportunityTitle} · {app.submittedAt}
                      </p>
                    </div>

                    {candidate && (
                      <button
                        type="button"
                        onClick={() => openReelModal(candidate)}
                        className="inline-flex items-center gap-1.5 self-start rounded-xl border border-sand-border bg-pure-white px-3 py-2 text-xs font-semibold text-deep-forest transition hover:border-deep-forest sm:self-center"
                      >
                        <Play className="h-3 w-3 fill-current" />
                        <span>Watch {candidate.reelDuration}s Reel</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-panel border border-sand-border bg-pure-white p-6 lg:col-span-5">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
                Active Listings &amp; Activity
              </h2>
              <Link
                href="/dashboard/employer/listings"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {activeListings.slice(0, 4).map((opp) => (
                <Link
                  key={opp.id}
                  href={`/jobs/${opp.slug}`}
                  className="flex items-center justify-between rounded-xl border border-sand-border bg-warm-ivory/40 px-4 py-3 transition hover:border-deep-forest"
                >
                  <div>
                    <p className="text-sm font-semibold text-warm-charcoal">
                      {opp.title}
                    </p>
                    <p className="text-xs text-secondary-text">
                      {getTrackBadgeLabel(opp.track)} · {opp.duration}
                    </p>
                  </div>
                  <span className="rounded-full bg-soft-sage px-2.5 py-1 text-[11px] font-semibold text-deep-forest">
                    {opp.applicantCount ?? 0} applicants
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Featured Candidates */}
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
                Featured Candidates
              </h2>
              <p className="mt-1 text-xs text-secondary-text">
                Watch 30-second introductions from emerging makers.
              </p>
            </div>
            <Link
              href="/dashboard/employer/talent"
              className="inline-flex items-center gap-1 text-xs font-semibold text-deep-forest hover:underline"
            >
              <span>Discover all talent</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

