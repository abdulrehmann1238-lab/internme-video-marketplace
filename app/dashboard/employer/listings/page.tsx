"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, PlusCircle } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useDemoState } from "@/context/DemoStateContext";
import { getTrackBadgeLabel } from "@/lib/helpers";

export default function EmployerListingsPage() {
  const { opportunities, toggleOpportunityStatus } = useDemoState();

  return (
    <DashboardShell mode="employer">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
              Opportunity Management
            </h1>
            <p className="mt-1 text-sm text-secondary-text">
              Manage active Internships and SignMeUp Sprints with on-platform
              applications.
            </p>
          </div>
          <Link
            href="/dashboard/employer/listings/new"
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-deep-forest-hover"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Listing</span>
          </Link>
        </div>

        <div className="space-y-3">
          {opportunities.map((opp) => {
            const isPaused = opp.status === "Paused";
            return (
              <div
                key={opp.id}
                className="flex flex-col justify-between gap-4 rounded-panel border border-sand-border bg-pure-white p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-deep-forest">
                      {opp.companyName}
                    </span>
                    <span className="rounded-full bg-warm-ivory px-2.5 py-0.5 text-[11px] font-medium text-secondary-text">
                      {getTrackBadgeLabel(opp.track)}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        isPaused
                          ? "bg-muted-sand text-secondary-text"
                          : "bg-soft-sage text-deep-forest"
                      }`}
                    >
                      {isPaused ? "Paused" : "Active"}
                    </span>
                  </div>
                  <h2 className="mt-1.5 font-heading text-lg font-semibold text-warm-charcoal">
                    {opp.title}
                  </h2>
                  <p className="mt-1 text-xs text-secondary-text">
                    {opp.duration} · {opp.location} ({opp.workArrangement}) ·{" "}
                    {opp.customQuestions.length} custom intake questions
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => toggleOpportunityStatus(opp.id)}
                    className="rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2 text-xs font-semibold text-warm-charcoal hover:border-deep-forest"
                  >
                    {isPaused ? "Resume Listing" : "Pause Listing"}
                  </button>
                  <Link
                    href={`/jobs/${opp.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-deep-forest px-3.5 py-2 text-xs font-semibold text-warm-ivory hover:bg-deep-forest-hover"
                  >
                    <span>View Live</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}

