"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Heart, UserCheck, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ToastProvider";

export function LoginRequiredModal() {
  const {
    loginModalOpen,
    loginModalReason,
    closeLoginModal,
    loginAsCandidate,
    loginAsEmployer,
  } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!loginModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLoginModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [loginModalOpen, closeLoginModal]);

  return (
    <AnimatePresence>
      {loginModalOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-required-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-warm-charcoal/65 p-4 backdrop-blur-sm"
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
              onClick={closeLoginModal}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:text-warm-charcoal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
              <Heart className="h-5 w-5" />
            </div>

            <h2
              id="login-required-title"
              className="font-heading text-xl font-semibold tracking-tight text-warm-charcoal"
            >
              Sign in to continue
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-secondary-text">
              {loginModalReason}
            </p>

            {/* Quick demo session sign-in buttons */}
            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  loginAsCandidate();
                  showToast("Signed in as Sarah J. (Candidate).", "success");
                }}
                className="flex w-full items-center justify-between rounded-xl bg-deep-forest px-4 py-3 text-left text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <UserCheck className="h-4 w-4" />
                  Continue as Candidate (Sarah J.)
                </span>
                <span className="text-xs font-normal text-warm-ivory/80">
                  Demo
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsEmployer();
                  showToast(
                    "Signed in as Northstar Labs (Employer).",
                    "success"
                  );
                }}
                className="flex w-full items-center justify-between rounded-xl border border-sand-border bg-pure-white px-4 py-3 text-left text-sm font-semibold text-warm-charcoal transition hover:border-deep-forest hover:bg-soft-sage/40"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Building2 className="h-4 w-4 text-deep-forest" />
                  Continue as Employer (Northstar Labs)
                </span>
                <span className="text-xs font-normal text-secondary-text">
                  Demo
                </span>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-sand-border pt-4 text-xs text-secondary-text">
              <Link
                href="/auth/login"
                onClick={closeLoginModal}
                className="font-semibold text-deep-forest hover:underline"
              >
                Go to Login Page
              </Link>
              <Link
                href="/auth/signup"
                onClick={closeLoginModal}
                className="font-medium text-warm-charcoal hover:underline"
              >
                Create Demo Account
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

