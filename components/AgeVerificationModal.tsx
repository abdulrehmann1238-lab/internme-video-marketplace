"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function AgeVerificationModal({
  isOpen,
  onClose,
  onConfirm,
}: AgeVerificationModalProps) {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setConfirmed(false);
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
          aria-labelledby="age-gate-title"
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
            className="relative w-full max-w-md rounded-panel border border-sand-border bg-warm-ivory p-6 shadow-modal sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:text-warm-charcoal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
              <ShieldAlert className="h-5 w-5" />
            </div>

            <h2
              id="age-gate-title"
              className="font-heading text-2xl font-semibold tracking-tight text-warm-charcoal"
            >
              Before you publish
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
              You must confirm that you are 18 years of age or older to publish
              your video on InternMe.
            </p>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-sand-border bg-pure-white p-3.5 text-sm text-warm-charcoal">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-sand-border accent-deep-forest"
              />
              <span className="font-medium">
                I confirm that I am 18 years of age or older.
              </span>
            </label>

            <p className="mt-3 text-[11px] leading-relaxed text-secondary-text">
              Demo simulation of InternMe&apos;s pre-publish age attestation gate.
            </p>

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
                disabled={!confirmed}
                onClick={onConfirm}
                className="rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover disabled:cursor-not-allowed disabled:opacity-45"
              >
                Confirm and Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

