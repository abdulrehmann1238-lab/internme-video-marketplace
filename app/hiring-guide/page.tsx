import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Employer Hiring Guide",
  description:
    "How early-stage startups scope Internships and SignMeUp Sprints, evaluate 30-second reels, and connect responsibly on InternMe.",
};

export default function HiringGuidePage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
          For Founders &amp; Hiring Teams
        </span>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-warm-charcoal sm:text-5xl">
          Meet future teammates before scheduling a single screening call.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
          A guide to scoping high-signal Internships and 1–8 week SignMeUp
          Sprints for emerging talent.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          {
            icon: Clock,
            title: "1. Pick the right track",
            body: "Use Internships (3–12 months) for sustained mentorship and roadmap ownership. Use SignMeUp Sprints (1–8 weeks) for focused deliverables like prototype builds or brand refreshes.",
          },
          {
            icon: Users,
            title: "2. Keep intake questions sharp",
            body: "Internships support up to 3 custom intake questions. Ask practical, human questions—never redirect applicants to external ATS forms.",
          },
          {
            icon: ShieldCheck,
            title: "3. Honor the Mutual Growth Compact",
            body: "Every candidate shares a 30-second video in good faith. Accept the Mutual Growth Compact to unlock direct details and reply thoughtfully.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-panel border border-sand-border bg-pure-white p-7"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-sage text-deep-forest">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 font-heading text-lg font-semibold text-warm-charcoal">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-secondary-text">
                {item.body}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-panel border border-sand-border bg-pure-white p-8">
        <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
          Quick Checklist Before Publishing a Listing
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Clear role title under 255 characters",
            "Concise 1,000-character scope & responsibilities",
            "Transparent duration & remote/hybrid expectation",
            "Direct on-platform application (no external URLs)",
          ].map((check) => (
            <div key={check} className="flex items-center gap-2.5 text-sm text-warm-charcoal">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-deep-forest" />
              <span>{check}</span>
            </div>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/dashboard/employer/listings/new"
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            <span>Post an Opportunity</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard/employer"
            className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest"
          >
            <span>Open Employer Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

