"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Circle,
  FileText,
  Sparkles,
  Video,
} from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";
import { ApplicationStatus } from "@/lib/types";

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  Submitted: "bg-muted-sand text-warm-charcoal",
  "Under Review": "bg-soft-sage text-deep-forest",
  Shortlisted: "bg-deep-forest text-warm-ivory",
  "Not Selected": "border border-sand-border bg-pure-white text-secondary-text",
};

export default function TalentDashboardPage() {
  const { user } = useAuth();
  const { favoriteOpportunityIds } = useFavorites();
  const { candidates, opportunities, applications, openReelModal } =
    useDemoState();

  const candidate =
    candidates.find((c) => c.id === (user?.candidateId || "sarah-j")) ||
    candidates[0];

  const myApplications = applications.filter(
    (app) => app.candidateId === candidate.id
  );
  const recommended = opportunities
    .filter((o) => o.status !== "Paused")
    .slice(0, 3);

  const checklist = [
    {
      label: "Add bio",
      done: candidate.bio.trim().length > 10,
      href: "/dashboard/talent/profile",
    },
    {
      label: "Add skills",
      done: candidate.skills.length >= 3,
      href: "/dashboard/talent/profile",
    },
    {
      label: "Set location",
      done: Boolean(candidate.location.trim()),
      href: "/dashboard/talent/profile",
    },
    {
      label: "Upload reel",
      done: candidate.reelDuration > 0,
      href: "/dashboard/talent/reel",
    },
  ];
  const completionPct = Math.round(
    (checklist.filter((c) => c.done).length / checklist.length) * 100
  );

  return (
    <DashboardShell mode="candidate">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="flex flex-col justify-between gap-4 rounded-panel border border-sand-border bg-pure-white p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-warm-charcoal sm:text-3xl">
              Good morning, {candidate.firstName}.
            </h1>
            <p className="mt-1.5 text-sm text-secondary-text">
              Your next opportunity might be one introduction away.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => openReelModal(candidate)}
              className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-4 py-2.5 text-xs font-semibold text-warm-charcoal transition hover:border-deep-forest"
            >
              <Video className="h-4 w-4 text-deep-forest" />
              <span>Preview My Reel</span>
            </button>
            <Link
              href="/discover?view=opportunities"
              className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-4 py-2.5 text-xs font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <span>Browse Opportunities</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Profile completion</span>
              <Sparkles className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {completionPct}%
            </p>
            <p className="mt-1 text-xs text-deep-forest">
              All core fields active
            </p>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Reel status</span>
              <Video className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              Published
            </p>
            <p className="mt-1 text-xs text-secondary-text">
              {candidate.reelDuration}s intro · 18+ verified
            </p>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Applications submitted</span>
              <FileText className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {myApplications.length}
            </p>
            <p className="mt-1 text-xs text-secondary-text">
              {
                myApplications.filter((a) => a.status === "Shortlisted").length
              }{" "}
              shortlisted
            </p>
          </div>

          <div className="rounded-card border border-sand-border bg-pure-white p-5">
            <div className="flex items-center justify-between text-xs font-medium text-secondary-text">
              <span>Saved opportunities</span>
              <Bookmark className="h-4 w-4 text-deep-forest" />
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold text-warm-charcoal">
              {favoriteOpportunityIds.length}
            </p>
            <Link
              href="/dashboard/talent/favorites"
              className="mt-1 inline-block text-xs font-medium text-deep-forest hover:underline"
            >
              View saved list →
            </Link>
          </div>
        </div>

        {/* Profile Completion Checklist + Recent Applications */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 lg:col-span-4">
            <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
              Profile Checklist
            </h2>
            <p className="mt-1 text-xs text-secondary-text">
              Keep your introduction fresh for startup founders.
            </p>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 py-2.5 text-sm font-medium text-warm-charcoal transition hover:border-deep-forest"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      {item.done ? (
                        <CheckCircle2 className="h-4 w-4 text-deep-forest" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-sage" />
                      )}
                      <span>{item.label}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-secondary-text" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-panel border border-sand-border bg-pure-white p-6 lg:col-span-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
                Recent Applications
              </h2>
              <Link
                href="/dashboard/talent/applications"
                className="text-xs font-semibold text-deep-forest hover:underline"
              >
                View all ({myApplications.length})
              </Link>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead>
                  <tr className="border-b border-sand-border text-xs text-secondary-text">
                    <th className="pb-3 font-medium">Position</th>
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand-border/70">
                  {myApplications.slice(0, 5).map((app) => (
                    <tr key={app.id} className="hover:bg-warm-ivory/40">
                      <td className="py-3.5 pr-3 font-medium text-warm-charcoal">
                        <Link
                          href={`/jobs/${app.opportunitySlug}`}
                          className="hover:text-deep-forest hover:underline"
                        >
                          {app.opportunityTitle}
                        </Link>
                      </td>
                      <td className="py-3.5 pr-3 text-secondary-text">
                        {app.companyName}
                      </td>
                      <td className="py-3.5 pr-3 text-xs text-secondary-text">
                        {app.submittedAt}
                      </td>
                      <td className="py-3.5 text-right">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            STATUS_STYLES[app.status]
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* 3 Recommended Opportunities */}
        <section>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
                Recommended Opportunities
              </h2>
              <p className="mt-1 text-xs text-secondary-text">
                Curated Internships and Sprints matching your profile.
              </p>
            </div>
            <Link
              href="/discover?view=opportunities"
              className="text-xs font-semibold text-deep-forest hover:underline"
            >
              Explore all →
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
            {recommended.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

