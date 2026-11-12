"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { ListingCreationWizard } from "@/components/ListingCreationWizard";

export default function NewEmployerListingPage() {
  return (
    <DashboardShell mode="employer">
      <div className="space-y-6">
        <Link
          href="/dashboard/employer/listings"
          className="inline-flex items-center gap-2 text-xs font-medium text-secondary-text hover:text-deep-forest"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Listings</span>
        </Link>

        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Post an Opportunity
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Create an Internship (3–12 months) or SignMeUp Sprint (1–8 weeks).
            All applications stay directly on InternMe.
          </p>
        </div>

        <ListingCreationWizard />
      </div>
    </DashboardShell>
  );
}

