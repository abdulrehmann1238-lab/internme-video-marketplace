"use client";

import React from "react";
import { Compass } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "Nothing here just yet.",
  description = "Try adjusting your filters to discover more opportunities.",
  actionLabel = "Clear all filters",
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-panel border border-sand-border bg-pure-white px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
        <Compass className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-warm-charcoal">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-secondary-text">
        {description}
      </p>
      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-medium text-warm-ivory transition hover:bg-deep-forest-hover"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
