"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  Clock,
  Layers,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Opportunity } from "@/lib/types";
import { getCompanyById } from "@/data/companies";
import { getTrackBadgeLabel } from "@/lib/helpers";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ApplicationForm } from "@/components/ApplicationForm";

interface JobDetailClientProps {
  initialOpportunity?: Opportunity;
  slug: string;
}

export function JobDetailClient({
  initialOpportunity,
  slug,
}: JobDetailClientProps) {
  const { opportunities, applications } = useDemoState();
  const { isOpportunityFavorite, toggleFavoriteOpportunity } = useFavorites();
  const [applyOpen, setApplyOpen] = useState(false);

  // Supports both statically defined opportunities and listings published live in DemoStateContext
  const opportunity =
    opportunities.find((opp) => opp.slug === slug) || initialOpportunity;

  if (!opportunity) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold text-warm-charcoal">
          Opportunity not found
        </h1>
        <p className="mt-2 text-sm text-secondary-text">
          This listing may have moved or been closed.
        </p>
        <Link
          href="/discover?view=opportunities"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory"
        >
          Browse Open Opportunities
        </Link>
      </div>
    );
  }

  const company = getCompanyById(opportunity.companyId);
  const isFav = isOpportunityFavorite(opportunity.id);
  const isSprint = opportunity.track === "Sprint";
  const hasApplied = applications.some(
    (app) => app.opportunityId === opportunity.id && app.candidateId === "sarah-j"
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/discover?view=opportunities"
        className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text transition hover:text-deep-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Opportunities</span>
      </Link>

      {/* Opportunity Header */}
      <div className="mt-6 rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-sand-border bg-soft-sage font-heading text-base font-semibold tracking-wider text-deep-forest">
              {opportunity.companyInitials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-sm font-semibold text-deep-forest">
                  {opportunity.companyName}
                </span>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    isSprint
                      ? "border border-subtle-gold/40 bg-muted-sand text-warm-charcoal"
                      : "bg-soft-sage text-deep-forest"
                  }`}
                >
                  {getTrackBadgeLabel(opportunity.track)}
                </span>
              </div>

              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
                {opportunity.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-secondary-text">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-muted-sage" />
                  {opportunity.location} · {opportunity.workArrangement}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-sage" />
                  {opportunity.duration}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-sage" />
                  Posted {opportunity.postedLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start">
            <FavoriteButton
              active={isFav}
              onToggle={() =>
                toggleFavoriteOpportunity(opportunity.id, opportunity.title)
              }
              ariaLabel={
                isFav
                  ? `Remove ${opportunity.title} from saved opportunities`
                  : `Save ${opportunity.title}`
              }
            />
            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <span>{hasApplied ? "Applied · View Status" : "Apply Now"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content + Sidebar */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
              Opportunity Overview
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-secondary-text sm:text-base">
              {opportunity.description}
            </p>
          </section>

          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
              Responsibilities
            </h2>
            <ul className="mt-4 space-y-3">
              {opportunity.responsibilities.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-secondary-text"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
              Required Skills
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {opportunity.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2 text-sm font-medium text-warm-charcoal"
                >
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="mt-7 font-heading text-lg font-semibold text-warm-charcoal">
              Ideal Candidate
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-secondary-text sm:text-base">
              {opportunity.idealCandidate}
            </p>
          </section>

          {company && (
            <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-deep-forest" />
                <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
                  About {company.name}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-secondary-text">
                {company.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-secondary-text">
                <span className="rounded-lg bg-warm-ivory px-3 py-1.5 font-medium text-warm-charcoal">
                  {company.sector}
                </span>
                <span className="rounded-lg bg-warm-ivory px-3 py-1.5 font-medium text-warm-charcoal">
                  {company.stage}
                </span>
                <span className="rounded-lg bg-warm-ivory px-3 py-1.5 font-medium text-warm-charcoal">
                  {company.location}
                </span>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-24 rounded-panel border border-sand-border bg-pure-white p-6 shadow-editorial">
            <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
              Role Snapshot
            </h2>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Track</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold text-warm-charcoal">
                  <Layers className="h-3.5 w-3.5 text-deep-forest" />
                  {getTrackBadgeLabel(opportunity.track)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Duration</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {opportunity.duration}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Work arrangement</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {opportunity.workArrangement}
                </dd>
              </div>
              <div className="flex items-center justify-between border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Location</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {opportunity.location}
                </dd>
              </div>
              {opportunity.compensation && (
                <div className="flex items-center justify-between border-b border-sand-border/70 pb-3">
                  <dt className="text-secondary-text">Compensation</dt>
                  <dd className="rounded-md bg-soft-sage px-2.5 py-0.5 font-semibold text-deep-forest">
                    {opportunity.compensation}
                  </dd>
                </div>
              )}
            </dl>

            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-deep-forest px-5 py-3.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <span>{hasApplied ? "Application Submitted" : "Apply Now"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-secondary-text">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-deep-forest" />
              <span>
                Applications are submitted natively on InternMe with your
                30-second video reel. No external ATS redirects.
              </span>
            </p>
          </div>
        </aside>
      </div>

      <ApplicationForm
        isOpen={applyOpen}
        opportunity={opportunity}
        onClose={() => setApplyOpen(false)}
      />
    </div>
  );
}

