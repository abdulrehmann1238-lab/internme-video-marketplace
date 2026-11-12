"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useDemoState } from "@/context/DemoStateContext";
import { ApplicationStatus } from "@/lib/types";
import { getTrackBadgeLabel } from "@/lib/helpers";

const STATUS_BADGE: Record<ApplicationStatus, string> = {
  Submitted: "bg-muted-sand text-warm-charcoal",
  "Under Review": "bg-soft-sage text-deep-forest",
  Shortlisted: "bg-deep-forest text-warm-ivory",
  "Not Selected": "border border-sand-border bg-pure-white text-secondary-text",
};

export default function TalentApplicationsPage() {
  const { applications } = useDemoState();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const myApplications = applications.filter(
    (app) => app.candidateId === "sarah-j"
  );
  const filtered =
    filterStatus === "All"
      ? myApplications
      : myApplications.filter((a) => a.status === filterStatus);

  return (
    <DashboardShell mode="candidate">
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-secondary-text">
              Track every opportunity you applied to directly on InternMe.
            </p>
          </div>
          <Link
            href="/discover?view=opportunities"
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-4 py-2.5 text-xs font-semibold text-warm-ivory hover:bg-deep-forest-hover"
          >
            <span>Explore More Roles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              "All",
              "Submitted",
              "Under Review",
              "Shortlisted",
              "Not Selected",
            ] as const
          ).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                filterStatus === status
                  ? "bg-deep-forest text-warm-ivory"
                  : "border border-sand-border bg-pure-white text-secondary-text hover:text-warm-charcoal"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="rounded-panel border border-sand-border bg-pure-white p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-deep-forest">
                      {app.companyName}
                    </span>
                    <span className="rounded-full bg-warm-ivory px-2.5 py-0.5 text-[11px] font-medium text-secondary-text">
                      {getTrackBadgeLabel(app.track)}
                    </span>
                  </div>
                  <Link
                    href={`/jobs/${app.opportunitySlug}`}
                    className="mt-1 block font-heading text-lg font-semibold text-warm-charcoal hover:text-deep-forest hover:underline"
                  >
                    {app.opportunityTitle}
                  </Link>
                  <p className="mt-1 text-xs text-secondary-text">
                    Submitted on {app.submittedAt}
                  </p>
                </div>

                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                    STATUS_BADGE[app.status]
                  }`}
                >
                  {app.status}
                </span>
              </div>

              {app.introNote && (
                <p className="mt-4 rounded-xl bg-warm-ivory px-4 py-3 text-xs leading-relaxed text-secondary-text">
                  <span className="font-semibold text-warm-charcoal">
                    Your intro note:{" "}
                  </span>
                  {app.introNote}
                </p>
              )}

              {app.answers.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-sand-border pt-3 text-xs">
                  {app.answers.map((ans) => (
                    <div key={ans.questionId}>
                      <p className="font-semibold text-warm-charcoal">
                        {ans.questionText}
                      </p>
                      <p className="mt-0.5 text-secondary-text">{ans.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

