"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Phone, Play, Unlock, User } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { CompactConsentModal } from "@/components/CompactConsentModal";
import { useAuth } from "@/context/AuthContext";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";
import { ApplicationStatus } from "@/lib/types";
import { formatPublicName, getTrackBadgeLabel } from "@/lib/helpers";

const STATUS_OPTIONS: ApplicationStatus[] = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Not Selected",
];

export default function EmployerApplicationsPage() {
  const { hasAcceptedCompact, acceptCompact } = useAuth();
  const { applications, candidates, openReelModal, updateApplicationStatus } =
    useDemoState();
  const { showToast } = useToast();

  const [compactTargetName, setCompactTargetName] = useState<string | null>(
    null
  );

  return (
    <DashboardShell mode="employer">
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Received Applications
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Watch candidate reels, review intake answers, update review stage,
            and unlock contact details via the Mutual Growth Compact.
          </p>
        </div>

        <div className="space-y-4">
          {applications.map((app) => {
            const candidate = candidates.find((c) => c.id === app.candidateId);
            const publicName = candidate
              ? formatPublicName(candidate.firstName, candidate.lastInitial)
              : app.candidateDisplayName;

            return (
              <div
                key={app.id}
                className="rounded-panel border border-sand-border bg-pure-white p-6"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-sand-border pb-4 md:flex-row md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/talent/${app.candidateId}`}
                        className="font-heading text-lg font-semibold text-warm-charcoal hover:text-deep-forest hover:underline"
                      >
                        {publicName}
                      </Link>
                      <span className="rounded-full bg-soft-sage px-2.5 py-0.5 text-[11px] font-semibold text-deep-forest">
                        {app.candidateTitle}
                      </span>
                      <span className="rounded-full bg-warm-ivory px-2.5 py-0.5 text-[11px] font-medium text-secondary-text">
                        {getTrackBadgeLabel(app.track)}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-secondary-text">
                      Applied to{" "}
                      <Link
                        href={`/jobs/${app.opportunitySlug}`}
                        className="font-medium text-warm-charcoal hover:underline"
                      >
                        {app.opportunityTitle}
                      </Link>{" "}
                      · {app.submittedAt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    {candidate && (
                      <button
                        type="button"
                        onClick={() => openReelModal(candidate)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2 text-xs font-semibold text-deep-forest hover:border-deep-forest"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Watch {candidate.reelDuration}s Reel</span>
                      </button>
                    )}

                    <select
                      value={app.status}
                      aria-label={`Application status for ${publicName}`}
                      onChange={(e) =>
                        updateApplicationStatus(
                          app.id,
                          e.target.value as ApplicationStatus
                        )
                      }
                      className="h-9 rounded-xl border border-sand-border bg-pure-white px-3 text-xs font-semibold text-warm-charcoal focus:border-deep-forest focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Intro Note & Intake Answers */}
                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="space-y-3 lg:col-span-7">
                    <div className="rounded-xl bg-warm-ivory p-3.5 text-xs leading-relaxed text-secondary-text">
                      <span className="font-semibold text-warm-charcoal">
                        Introduction Note:{" "}
                      </span>
                      {app.introNote}
                    </div>
                    {app.answers.length > 0 && (
                      <div className="space-y-2 rounded-xl border border-sand-border p-3.5 text-xs">
                        {app.answers.map((ans) => (
                          <div key={ans.questionId}>
                            <p className="font-semibold text-warm-charcoal">
                              {ans.questionText}
                            </p>
                            <p className="mt-0.5 text-secondary-text">
                              {ans.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Protected Contact Info / Mutual Growth Compact */}
                  <div className="rounded-2xl border border-sand-border bg-warm-ivory/60 p-4 lg:col-span-5">
                    {hasAcceptedCompact && candidate ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-1.5 font-semibold text-deep-forest">
                          <Unlock className="h-3.5 w-3.5" />
                          <span>Contact Unlocked (Mutual Growth Compact)</span>
                        </div>
                        <p className="flex items-center gap-2 text-warm-charcoal">
                          <User className="h-3.5 w-3.5 text-muted-sage" />
                          {candidate.privateIdentity.fullLegalName}
                        </p>
                        <p className="flex items-center gap-2 text-warm-charcoal">
                          <Mail className="h-3.5 w-3.5 text-muted-sage" />
                          {candidate.privateIdentity.email}
                        </p>
                        <p className="flex items-center gap-2 text-warm-charcoal">
                          <Phone className="h-3.5 w-3.5 text-muted-sage" />
                          {candidate.privateIdentity.phone}
                        </p>
                      </div>
                    ) : (
                      <div className="flex h-full flex-col justify-between gap-3">
                        <div className="flex items-start gap-2 text-xs text-secondary-text">
                          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-deep-forest" />
                          <span>
                            Direct contact details stay locked until you accept
                            the Mutual Growth Compact.
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCompactTargetName(publicName)}
                          className="w-full rounded-xl bg-deep-forest px-4 py-2 text-xs font-semibold text-warm-ivory hover:bg-deep-forest-hover"
                        >
                          Unlock Contact Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CompactConsentModal
        isOpen={Boolean(compactTargetName)}
        candidateName={compactTargetName || "candidate"}
        onClose={() => setCompactTargetName(null)}
        onAccept={() => {
          acceptCompact();
          setCompactTargetName(null);
          showToast(
            "Mutual Growth Compact accepted for this browser session.",
            "success"
          );
        }}
      />
    </DashboardShell>
  );
}

