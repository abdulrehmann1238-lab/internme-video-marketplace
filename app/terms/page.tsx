import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Platform usage standards, Mutual Growth Compact expectations, and demonstration terms for InternMe.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[840px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <span className="inline-flex rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
        Platform Terms
      </span>
      <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-warm-charcoal">
        Terms of Use
      </h1>
      <p className="mt-3 text-sm text-secondary-text">
        Interactive MVP Frontend Demonstration · Last updated November 2026
      </p>

      <div className="mt-8 space-y-6 rounded-panel border border-sand-border bg-pure-white p-7 sm:p-9 text-sm leading-relaxed text-secondary-text">
        <section>
          <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
            1. Marketplace Conduct &amp; Age Eligibility
          </h2>
          <p className="mt-2">
            Candidates publishing a 30-second video introduction confirm they
            are 18 years of age or older prior to making their reel
            discoverable. Content must remain professional, truthful, and
            authentic to the candidate.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
            2. Native Application Integrity
          </h2>
          <p className="mt-2">
            Employers agree to receive candidate applications directly on
            InternMe. Redirecting candidates to external Applicant Tracking
            Systems or unverified third-party capture forms is prohibited.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
            3. Mutual Growth Compact
          </h2>
          <p className="mt-2">
            Direct candidate contact information is disclosed only after an
            employer explicitly accepts the Mutual Growth Compact and commits to
            respectful, opportunity-relevant outreach.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
            4. Frontend Demonstration Scope
          </h2>
          <p className="mt-2">
            All candidate profiles, startup companies, opportunities, and edge
            video upload stages in this environment represent fictional frontend
            demonstration data stored locally in browser state.
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link
          href="/privacy"
          className="text-sm font-semibold text-deep-forest hover:underline"
        >
          Read Privacy &amp; Candidate Protection →
        </Link>
      </div>
    </div>
  );
}

