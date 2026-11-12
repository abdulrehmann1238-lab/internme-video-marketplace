"use client";

import React from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { VideoUpload } from "@/components/VideoUpload";

export default function TalentReelPage() {
  return (
    <DashboardShell mode="candidate">
      <div className="space-y-6">
        <div>
          <span className="inline-flex rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
            30-Second Video Introduction
          </span>
          <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal sm:text-3xl">
            Your story, in 30 seconds.
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm text-secondary-text">
            Introduce yourself, share what you&apos;re good at, and let people
            see the person behind the profile.
          </p>
        </div>

        <VideoUpload />
      </div>
    </DashboardShell>
  );
}

