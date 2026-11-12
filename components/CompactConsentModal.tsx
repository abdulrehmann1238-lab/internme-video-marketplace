"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShieldCheck, X } from "lucide-react";

interface CompactConsentModalProps {
  isOpen: boolean;
  candidateName: string;
  onClose: () => void;
  onAccept: () => void;
}

const PRINCIPLES = [
  "Respect candidate privacy.",
  "Keep communication professional and relevant.",
  "Build connections around mutual growth.",
];

export function CompactConsentModal({
  isOpen,
  candidateName,
  onClose,
  onAccept,
}: CompactConsentModalProps) {
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAgreed(false);
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="compact-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-warm-charcoal/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-panel border border-sand-border bg-warm-ivory p-6 shadow-modal sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:text-warm-charcoal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-soft-sage px-3 py-1 text-xs font-medium text-deep-forest">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Candidate Privacy Protection</span>
            </div>

            <h2
              id="compact-modal-title"
              className="mt-4 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal"
            >
              The Mutual Growth Compact
            </h2>

            <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
              InternMe is built around thoughtful, respectful connections. Before
              accessing direct contact details for{" "}
              <span className="font-semibold text-warm-charcoal">
                {candidateName}
              </span>
              , employers agree to use candidate information responsibly and
              engage in a mutually beneficial way.
            </p>

            <div className="mt-5 space-y-2.5 rounded-card border border-sand-border bg-pure-white p-4">
              {PRINCIPLES.map((principle) => (
                <div key={principle} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium text-warm-charcoal">
                    {principle}
                  </span>
                </div>
              ))}
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-sand-border bg-muted-sand/50 p-3.5 text-sm text-warm-charcoal">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-sand-border accent-deep-forest"
              />
              <span className="font-medium">
                I agree to the Mutual Growth Compact.
              </span>
            </label>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-sand-border bg-pure-white px-5 py-2.5 text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!agreed}
                onClick={onAccept}
                className="rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover disabled:cursor-not-allowed disabled:opacity-45"
              >
                Accept and Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

