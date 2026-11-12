"use client";

import React, { useState } from "react";
import { RotateCcw, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";

export default function TalentSettingsPage() {
  const { resetDemoState } = useDemoState();
  const { showToast } = useToast();
  const [discoverable, setDiscoverable] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  return (
    <DashboardShell mode="candidate">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Settings &amp; Privacy
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Control profile visibility and demonstration session state.
          </p>
        </div>

        <div className="space-y-4 rounded-panel border border-sand-border bg-pure-white p-6">
          <div className="flex items-center justify-between gap-4 border-b border-sand-border pb-4">
            <div>
              <p className="text-sm font-semibold text-warm-charcoal">
                Public Directory Visibility
              </p>
              <p className="text-xs text-secondary-text">
                Show my 30s reel under Sarah J. in Employer Discovery.
              </p>
            </div>
            <input
              type="checkbox"
              checked={discoverable}
              onChange={(e) => {
                setDiscoverable(e.target.checked);
                showToast("Visibility preference updated.", "info");
              }}
              className="h-5 w-5 accent-deep-forest"
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-sand-border pb-4">
            <div>
              <p className="text-sm font-semibold text-warm-charcoal">
                Application Status Alerts
              </p>
              <p className="text-xs text-secondary-text">
                Receive demo notifications when an employer shortlists my reel.
              </p>
            </div>
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(e) => {
                setEmailUpdates(e.target.checked);
                showToast("Notification preference saved.", "info");
              }}
              className="h-5 w-5 accent-deep-forest"
            />
          </div>

          <div className="flex items-start gap-3 rounded-2xl bg-soft-sage/50 p-4 text-xs text-deep-forest">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              Your full legal name and direct email stay protected unless an
              employer accepts the Mutual Growth Compact.
            </span>
          </div>
        </div>

        <div className="rounded-panel border border-sand-border bg-pure-white p-6">
          <h2 className="font-heading text-base font-semibold text-warm-charcoal">
            Demo Session Controls
          </h2>
          <p className="mt-1 text-xs text-secondary-text">
            Restore initial mock applications, listings, and profile data.
          </p>
          <button
            type="button"
            onClick={resetDemoState}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-4 py-2.5 text-xs font-semibold text-warm-charcoal hover:border-deep-forest"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}

