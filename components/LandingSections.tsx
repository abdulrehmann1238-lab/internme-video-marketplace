"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Compass,
  Handshake,
  Lock,
  Rocket,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react";
import { useDemoState } from "@/context/DemoStateContext";
import { HeroSection } from "@/components/HeroSection";
import { CandidateCard } from "@/components/CandidateCard";
import { OpportunityCard } from "@/components/OpportunityCard";
import { EditorialImage } from "@/components/EditorialImage";

const INTERNSHIP_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";
const SPRINT_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

const SOCIAL_STRIP_ITEMS = [
  { icon: Rocket, label: "Early-stage startups" },
  { icon: Compass, label: "Emerging talent" },
  { icon: Video, label: "Real introductions" },
  { icon: Handshake, label: "Better connections" },
];

const CANDIDATE_STEPS = [
  {
    num: "01",
    title: "Create your introduction.",
    description:
      "Show employers who you are through a focused 30-second video.",
  },
  {
    num: "02",
    title: "Discover your next opportunity.",
    description:
      "Explore curated opportunities that match your interests and skills.",
  },
  {
    num: "03",
    title: "Apply and connect.",
    description: "Submit your application directly through InternMe.",
  },
];

const EMPLOYER_STEPS = [
  {
    num: "01",
    title: "Tell us who you're looking for.",
    description:
      "Post a longer-term Internship or focused 1–8 week SignMeUp Sprint directly on InternMe.",
  },
  {
    num: "02",
    title: "Discover real people, not just resumes.",
    description:
      "Watch concise 30-second introductions to understand craft, clarity, and energy in seconds.",
  },
  {
    num: "03",
    title: "Connect with promising candidates.",
    description:
      "Review native applications, save your shortlist, and unlock contact details under the Mutual Growth Compact.",
  },
];

export function LandingSections() {
  const { candidates, opportunities } = useDemoState();
  const [howItWorksTab, setHowItWorksTab] = useState<"candidate" | "employer">(
    "candidate"
  );

  // Strict 6-card limits as required in PRD 6.5 and 6.6
  const featuredCandidates = candidates.slice(0, 6);
  const featuredOpportunities = opportunities
    .filter((o) => o.status !== "Paused")
    .slice(0, 6);

  const activeSteps =
    howItWorksTab === "candidate" ? CANDIDATE_STEPS : EMPLOYER_STEPS;

  return (
    <div>
      {/* 6.2 Hero Section */}
      <HeroSection />

      {/* 6.3 Social Proof Strip */}
      <section
        aria-label="Platform principles"
        className="border-b border-sand-border bg-pure-white/60"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center lg:px-8">
          <p className="font-heading text-sm font-semibold tracking-tight text-warm-charcoal">
            Built for people building what&apos;s next.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            {SOCIAL_STRIP_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 text-xs font-medium text-secondary-text"
                >
                  <Icon className="h-3.5 w-3.5 text-deep-forest" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6.4 Dual-Track Discovery Section */}
      <section
        id="discover-tracks"
        className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
            Two ways to make your next move.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-secondary-text">
            Whether you&apos;re building your career or building a team, find
            the right fit.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Internships */}
          <Link
            href="/discover?view=opportunities&track=Internship"
            className="group flex flex-col overflow-hidden rounded-panel border border-sand-border bg-pure-white transition-all duration-300 hover:-translate-y-1 hover:border-muted-sage hover:shadow-editorial-hover"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted-sand">
              <EditorialImage
                src={INTERNSHIP_IMAGE}
                alt="Young startup makers collaborating together"
                fallbackLabel="Internships"
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/40 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-pure-white/95 px-3 py-1 text-xs font-semibold text-deep-forest shadow-sm">
                <Clock className="h-3.5 w-3.5" />
                3–12 months
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-sage">
                  Longer-term opportunities
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
                  Grow with a team.
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                  Join ambitious startups, contribute to real projects, and
                  build experience that matters.
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep-forest">
                <span>Explore Internships</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Card 2: SignMeUp Sprints */}
          <Link
            href="/discover?view=opportunities&track=Sprint"
            className="group flex flex-col overflow-hidden rounded-panel border border-sand-border bg-pure-white transition-all duration-300 hover:-translate-y-1 hover:border-muted-sage hover:shadow-editorial-hover"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted-sand">
              <EditorialImage
                src={SPRINT_IMAGE}
                alt="Focused startup sprint desk setup"
                fallbackLabel="SignMeUp Sprints"
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/40 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-pure-white/95 px-3 py-1 text-xs font-semibold text-warm-charcoal shadow-sm">
                <Clock className="h-3.5 w-3.5 text-subtle-gold" />
                1–8 weeks
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-subtle-gold">
                  Short-term opportunities
                </p>
                <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
                  Make an impact, sooner.
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                  Jump into focused startup projects, short-term collaborations,
                  and hands-on opportunities.
                </p>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep-forest">
                <span>Explore Sprints</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 6.5 Featured Talent Section (Strictly 6 cards) */}
      <section className="border-y border-sand-border bg-muted-sand/35">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
                Meet the people behind the potential.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-secondary-text">
                Forget the endless resumes. Get to know the people bringing
                ideas to life.
              </p>
            </div>
            <Link
              href="/discover?view=talent"
              className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest hover:text-deep-forest"
            >
              <span>Discover All Talent</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 Featured Opportunities Section (Strictly 6 cards) */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
              Opportunities worth showing up for.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-secondary-text">
              Find teams that want your ideas, your energy, and your
              perspective.
            </p>
          </div>
          <Link
            href="/discover?view=opportunities"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-deep-forest hover:underline"
          >
            <span>View all opportunities</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredOpportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </section>

      {/* 6.7 How It Works Section */}
      <section className="border-y border-sand-border bg-pure-white">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-sage">
                Simple by design
              </p>
              <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
                How InternMe works.
              </h2>
            </div>

            {/* Role Toggle */}
            <div
              role="tablist"
              aria-label="How it works audience toggle"
              className="inline-flex rounded-2xl border border-sand-border bg-warm-ivory p-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={howItWorksTab === "candidate"}
                onClick={() => setHowItWorksTab("candidate")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  howItWorksTab === "candidate"
                    ? "bg-deep-forest text-warm-ivory shadow-sm"
                    : "text-secondary-text hover:text-warm-charcoal"
                }`}
              >
                I&apos;m a candidate
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={howItWorksTab === "employer"}
                onClick={() => setHowItWorksTab("employer")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  howItWorksTab === "employer"
                    ? "bg-deep-forest text-warm-ivory shadow-sm"
                    : "text-secondary-text hover:text-warm-charcoal"
                }`}
              >
                I&apos;m hiring
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={howItWorksTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {activeSteps.map((step) => (
                <div
                  key={step.num}
                  className="flex flex-col justify-between rounded-panel border border-sand-border bg-warm-ivory p-7"
                >
                  <div>
                    <span className="font-serif text-3xl italic text-deep-forest">
                      {step.num}
                    </span>
                    <h3 className="mt-4 font-heading text-xl font-semibold tracking-tight text-warm-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 h-[2px] w-10 rounded-full bg-muted-sage/60" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 6.8 Candidate Privacy Section */}
      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 rounded-panel border border-sand-border bg-pure-white p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-soft-sage px-3.5 py-1.5 text-xs font-semibold text-deep-forest">
              <ShieldCheck className="h-3.5 w-3.5" />
              Privacy by design
            </span>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
              Your introduction. Your privacy.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-secondary-text">
              Your profile is discoverable without putting your personal details
              on display.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-secondary-text">
              Employers see a privacy-conscious public profile. Direct contact
              information stays protected until the required connection
              conditions are met.
            </p>

            <div className="mt-7">
              <Link
                href="/privacy"
                className="group inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-5 py-3 text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest hover:bg-soft-sage/50 hover:text-deep-forest"
              >
                <span>Explore our privacy approach</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Privacy Identity Demonstration Card */}
          <div className="lg:col-span-6">
            <div className="rounded-panel border border-sand-border bg-warm-ivory p-6 shadow-editorial">
              <div className="flex items-center justify-between border-b border-sand-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-deep-forest font-heading text-sm font-semibold text-warm-ivory">
                    SJ
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-sage">
                      Public Display
                    </p>
                    <p className="font-heading text-lg font-semibold text-warm-charcoal">
                      Sarah J.
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-soft-sage px-3 py-1 text-xs font-medium text-deep-forest">
                  Discoverable
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-text">
                  Protected Private Information
                </p>

                {[
                  { label: "Full legal name", value: "Hidden on public profile" },
                  { label: "Email", value: "Protected behind Mutual Growth Compact" },
                  {
                    label: "Direct contact information",
                    value: "Locked until employer consent",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 rounded-xl border border-sand-border bg-pure-white px-4 py-3"
                  >
                    <div>
                      <p className="text-xs font-semibold text-warm-charcoal">
                        {item.label}
                      </p>
                      <p className="text-xs text-secondary-text">{item.value}</p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted-sand text-deep-forest">
                      <Lock className="h-3.5 w-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.9 Final Conversion Section */}
      <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="relative overflow-hidden rounded-panel bg-deep-forest px-6 py-14 text-warm-ivory sm:px-12 sm:py-20">
          {/* Subtle geometric architectural SVG graphic (no bright gradient) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 400"
            fill="none"
            className="pointer-events-none absolute -right-16 -top-10 h-[380px] w-[480px] opacity-[0.11]"
          >
            <circle
              cx="360"
              cy="180"
              r="150"
              stroke="#FAF9F5"
              strokeWidth="1.5"
            />
            <circle
              cx="360"
              cy="180"
              r="95"
              stroke="#B89B67"
              strokeWidth="1.5"
            />
            <path
              d="M120 340L520 40"
              stroke="#FAF9F5"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold leading-tight tracking-tight text-warm-ivory sm:text-4xl lg:text-[42px]">
              Your next chapter could start with one introduction.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-warm-ivory/80">
              Bring your ambition. Find your people. Build something meaningful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/auth/signup?role=candidate"
                className="inline-flex items-center gap-2 rounded-xl bg-warm-ivory px-6 py-3.5 text-sm font-semibold text-deep-forest transition hover:-translate-y-0.5 hover:bg-pure-white"
              >
                <span>Join as Talent</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/signup?role=employer"
                className="inline-flex items-center gap-2 rounded-xl border border-warm-ivory/35 bg-transparent px-6 py-3.5 text-sm font-semibold text-warm-ivory transition hover:-translate-y-0.5 hover:border-warm-ivory hover:bg-white/10"
              >
                <Users className="h-4 w-4" />
                <span>Hire Emerging Talent</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

