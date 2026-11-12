import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  EyeOff,
  FileCheck,
  Handshake,
  Lock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Candidate Protection",
  description:
    "How InternMe protects emerging talent through masked public identities, Mutual Growth Compact consent, 18+ reel checks, and on-platform applications.",
};

const PRIVACY_PILLARS = [
  {
    icon: EyeOff,
    title: "First Name + Last Initial Public Display",
    description:
      "Every public discovery card, directory listing, and structured profile displays only a candidate's first name and last initial (such as Sarah J.)—never a full legal surname.",
  },
  {
    icon: Lock,
    title: "Protected Direct Contact Information",
    description:
      "Candidate email addresses, phone numbers, and full legal names remain visually locked and hidden across public profiles until connection conditions are met.",
  },
  {
    icon: Handshake,
    title: "The Mutual Growth Compact",
    description:
      "Before accessing protected contact details, employers review and explicitly accept the Mutual Growth Compact, committing to respectful and relevant outreach.",
  },
  {
    icon: FileCheck,
    title: "Pre-Publish 18+ Age Confirmation",
    description:
      "Candidates must confirm they are 18 years of age or older before any 30-second video introduction can be published onto the discovery directory.",
  },
  {
    icon: Ban,
    title: "On-Platform Applications Only",
    description:
      "InternMe blocks external ATS redirects (such as Greenhouse, Lever, or Workday links) so candidates never get routed off-platform into unmonitored data forms.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
          <ShieldCheck className="h-3.5 w-3.5" />
          Privacy by Design
        </span>
        <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-warm-charcoal sm:text-5xl">
          Discoverable work. Protected personal boundaries.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg">
          Sharing a 30-second video takes trust. InternMe is designed from the
          ground up so emerging talent can showcase who they are without
          broadcasting personal contact details to the open web.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PRIVACY_PILLARS.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="rounded-panel border border-sand-border bg-pure-white p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-sage text-deep-forest">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 font-heading text-xl font-semibold text-warm-charcoal">
                {pillar.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-panel bg-deep-forest p-8 text-warm-ivory sm:flex-row sm:items-center sm:p-10">
        <div>
          <h2 className="font-heading text-2xl font-semibold">
            See candidate privacy in action
          </h2>
          <p className="mt-1.5 text-sm text-warm-ivory/80">
            Inspect a live masked profile and test the Mutual Growth Compact
            flow in our interactive demo.
          </p>
        </div>
        <Link
          href="/talent/sarah-j"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-warm-ivory px-5 py-3 text-sm font-semibold text-deep-forest transition hover:bg-pure-white"
        >
          <span>View Sample Profile</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

