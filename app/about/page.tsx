import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Video } from "lucide-react";

export const metadata: Metadata = {
  title: "About InternMe",
  description:
    "Why InternMe exists, why 30-second introductions beat static resumes, and how we connect emerging talent with early-stage startups.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
          About InternMe
        </span>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-tight text-warm-charcoal sm:text-5xl">
          Talent shouldn&apos;t have to shout through a stack of identical PDFs.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-secondary-text sm:text-lg">
          Traditional job boards reward keyword stuffing and rigid credentials.
          Early-stage founders, meanwhile, rarely care about buzzwords—they look
          for curiosity, clarity of thought, and the drive to learn fast.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            icon: Video,
            title: "Why 30 seconds changes everything",
            body: "Half a minute on camera reveals communication clarity, genuine enthusiasm, and personal perspective in a way no bulleted resume can replicate.",
          },
          {
            icon: Compass,
            title: "Built for how startups actually work",
            body: "Teams don't always need a year-long commitment. Our dual-track model pairs 3–12 month Internships with focused 1–8 week SignMeUp Sprints.",
          },
          {
            icon: HeartHandshake,
            title: "Respectful by architecture",
            body: "Public identities stay masked as first name + last initial, applications stay on-platform, and direct contact requires the Mutual Growth Compact.",
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-panel border border-sand-border bg-pure-white p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-sage text-deep-forest">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-heading text-lg font-semibold text-warm-charcoal">
                {card.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                {card.body}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-panel border border-sand-border bg-pure-white p-8 sm:p-10">
        <h2 className="font-heading text-2xl font-semibold text-warm-charcoal">
          A better starting line for emerging makers
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-secondary-text sm:text-base">
          InternMe gives students, self-taught designers, and junior builders a
          calm, intentional stage—without forcing anyone to trade away personal
          privacy or get lost inside third-party applicant tracking portals.
        </p>
        <div className="mt-7 flex flex-wrap gap-3.5">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            <span>Explore the Marketplace</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest"
          >
            <span>Read Our Privacy Commitments</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

