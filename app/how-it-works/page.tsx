"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  FileCheck2,
  Play,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Users,
} from "lucide-react";

const CANDIDATE_JOURNEY = [
  {
    step: "01",
    title: "Create your 30-second introduction",
    description:
      "Record or upload a concise, authentic 30-second introduction. Browser-side checks verify format, 25 MB limit, and 30-second cap before you publish.",
    icon: UploadCloud,
    previewTitle: "Edge Reel Validation",
    previewText: "MP4 · 24s · 8.4 MB · Ready after 18+ confirmation",
  },
  {
    step: "02",
    title: "Choose Internships or SignMeUp Sprints",
    description:
      "Filter by 3–12 month startup internships or 1–8 week focused Sprints, location, ZIP code, and core skills.",
    icon: Clock,
    previewTitle: "Dual-Track Discovery",
    previewText: "Product Design Intern (6 mos) · React Sprint (4 wks)",
  },
  {
    step: "03",
    title: "Apply natively with zero external redirects",
    description:
      "Your reel accompanies a short note and up to three employer questions—submitted directly on InternMe.",
    icon: FileCheck2,
    previewTitle: "On-Platform Submission",
    previewText: "Status tracked live: Submitted -> Under Review -> Shortlisted",
  },
];

const EMPLOYER_JOURNEY = [
  {
    step: "01",
    title: "Publish a clear role or Sprint scope",
    description:
      "Create an Internship (with up to 3 intake questions) or a focused SignMeUp Sprint. External ATS links are automatically blocked so candidates stay protected.",
    icon: Sparkles,
    previewTitle: "Native Listing Builder",
    previewText: "1,000-char role scope · Up to 3 custom questions",
  },
  {
    step: "02",
    title: "Watch real introductions in seconds",
    description:
      "Scan personality, clarity, and craft through 30-second video reels instead of skimming dozens of identical text resumes.",
    icon: Play,
    previewTitle: "Candidate Directory",
    previewText: "Sarah J. · UI/UX Designer · 30s intro reel",
  },
  {
    step: "03",
    title: "Connect under the Mutual Growth Compact",
    description:
      "Shortlist favorites and accept the Mutual Growth Compact before unlocking protected candidate contact information.",
    icon: ShieldCheck,
    previewTitle: "Privacy-First Connection",
    previewText: "Contact details unlocked responsibly for your session",
  },
];

export default function HowItWorksPage() {
  const [audience, setAudience] = useState<"candidate" | "employer">(
    "candidate"
  );
  const steps = audience === "candidate" ? CANDIDATE_JOURNEY : EMPLOYER_JOURNEY;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
          How InternMe Works
        </span>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-warm-charcoal sm:text-5xl">
          Video first. Privacy protected. Built for momentum.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
          Whether you are a student sharing your first 30-second reel or a
          founder scoping a four-week sprint, InternMe replaces noise with
          intentional human introductions.
        </p>

        <div className="mt-8 inline-flex rounded-2xl border border-sand-border bg-pure-white p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setAudience("candidate")}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              audience === "candidate"
                ? "bg-deep-forest text-warm-ivory"
                : "text-secondary-text hover:text-warm-charcoal"
            }`}
          >
            For Candidates
          </button>
          <button
            type="button"
            onClick={() => setAudience("employer")}
            className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              audience === "employer"
                ? "bg-deep-forest text-warm-ivory"
                : "text-secondary-text hover:text-warm-charcoal"
            }`}
          >
            For Employers
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={audience}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="flex flex-col justify-between rounded-panel border border-sand-border bg-pure-white p-7 shadow-editorial"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl italic text-deep-forest">
                      {item.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-sage text-deep-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h2 className="mt-5 font-heading text-xl font-semibold text-warm-charcoal">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-sand-border bg-warm-ivory p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-sage">
                    {item.previewTitle}
                  </p>
                  <p className="mt-1 text-xs font-medium text-warm-charcoal">
                    {item.previewText}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Dual Track Comparison */}
      <section className="mt-16 rounded-panel border border-sand-border bg-pure-white p-6 sm:p-10">
        <h2 className="font-heading text-2xl font-semibold text-warm-charcoal">
          Two opportunity tracks, one seamless workflow
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-card border border-sand-border bg-warm-ivory p-6">
            <span className="rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
              Internships · 3–12 months
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-warm-charcoal">
              Sustained team immersion
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-secondary-text">
              {[
                "Deep product ownership alongside startup mentors",
                "Optional up to 3 custom employer intake questions",
                "Full native application tracking across review stages",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-deep-forest" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-sand-border bg-warm-ivory p-6">
            <span className="rounded-full border border-subtle-gold/40 bg-muted-sand px-3 py-1 text-xs font-semibold text-warm-charcoal">
              SignMeUp Sprints · 1–8 weeks
            </span>
            <h3 className="mt-4 font-heading text-xl font-semibold text-warm-charcoal">
              Focused project impact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-secondary-text">
              {[
                "Scoped deliverables ideal for student schedules",
                "Fast video-first matching without endless interview rounds",
                "Build real portfolio outcomes in weeks, not semesters",
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-subtle-gold" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={
              audience === "candidate"
                ? "/dashboard/talent/reel"
                : "/dashboard/employer/listings/new"
            }
            className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            <span>
              {audience === "candidate"
                ? "Try Uploading a Reel"
                : "Post an Opportunity"}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest"
          >
            <Users className="h-4 w-4 text-deep-forest" />
            <span>Explore the Marketplace</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

