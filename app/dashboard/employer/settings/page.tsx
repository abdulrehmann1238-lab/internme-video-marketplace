"use client";

import React from "react";
import { RotateCcw, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/context/AuthContext";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";

export default function EmployerSettingsPage() {
  const { hasAcceptedCompact, resetCompact } = useAuth();
  const { resetDemoState } = useDemoState();
  const { showToast } = useToast();

  return (
    <DashboardShell mode="employer">
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-warm-charcoal sm:text-3xl">
            Employer Settings
          </h1>
          <p className="mt-1 text-sm text-secondary-text">
            Manage Northstar Labs workspace details and Mutual Growth Compact
            session status.
          </p>
        </div>

        <div className="space-y-4 rounded-panel border border-sand-border bg-pure-white p-6">
          <div className="flex items-start gap-3 rounded-2xl bg-soft-sage/55 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-deep-forest" />
            <div className="text-xs leading-relaxed text-warm-charcoal">
              <p className="font-semibold">
                Mutual Growth Compact Status:{" "}
                {hasAcceptedCompact ? "Accepted (Active Session)" : "Pending"}
              </p>
              <p className="mt-1 text-secondary-text">
                Stored in sessionStorage (`hasAcceptedCompact`) so consent
                persists on refresh within the current browser session.
              </p>
            </div>
          </div>

          {hasAcceptedCompact && (
            <button
              type="button"
              onClick={() => {
                resetCompact();
                showToast(
                  "Compact session consent cleared. Contact fields locked again.",
                  "info"
                );
              }}
              className="rounded-xl border border-sand-border bg-warm-ivory px-4 py-2 text-xs font-semibold text-warm-charcoal hover:border-deep-forest"
            >
              Reset Compact Session Consent
            </button>
          )}
        </div>

        <div className="rounded-panel border border-sand-border bg-pure-white p-6">
          <h2 className="font-heading text-base font-semibold text-warm-charcoal">
            Demo Data Controls
          </h2>
          <p className="mt-1 text-xs text-secondary-text">
            Reset published listings and application statuses to defaults.
          </p>
          <button
            type="button"
            onClick={resetDemoState}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-sand-border bg-warm-ivory px-4 py-2.5 text-xs font-semibold text-warm-charcoal hover:border-deep-forest"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
