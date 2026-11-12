"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "@/components/BrandLogo";

const ENTRY_SEEN_KEY = "internme_entry_seen_v1";

export function LoadingScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(ENTRY_SEEN_KEY);
      if (seen) return;
      window.sessionStorage.setItem(ENTRY_SEEN_KEY, "true");
    } catch {
      // ignore storage restriction
    }

    setVisible(true);
    const timeoutMs = prefersReducedMotion ? 400 : 1150;
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading InternMe"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-warm-ivory px-6 py-10"
        >
          <div className="h-4" aria-hidden="true" />

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center"
          >
            {/* Brand symbol with expanding circular aura */}
            <div className="relative mb-6 flex items-center justify-center">
              {!prefersReducedMotion && (
                <motion.span
                  initial={{ scale: 0.85, opacity: 0.55 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{
                    duration: 1.15,
                    ease: "easeOut",
                    repeat: Infinity,
                  }}
                  className="absolute h-14 w-14 rounded-full border border-muted-sage/60"
                />
              )}
              <motion.span
                initial={prefersReducedMotion ? false : { scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-sand-border bg-pure-white shadow-editorial"
              >
                <BrandMark className="h-9 w-9" />
              </motion.span>
            </div>

            <div className="font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
              Intern<span className="text-deep-forest">Me</span>
            </div>

            <p className="mt-2 font-serif text-lg italic text-secondary-text">
              Where potential meets opportunity.
            </p>

            {/* Delicate animated sage progress line */}
            <div className="mt-7 h-[2px] w-48 overflow-hidden rounded-full bg-sand-border">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: prefersReducedMotion ? 0.3 : 1.0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full rounded-full bg-muted-sage"
              />
            </div>
          </motion.div>

          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-xs font-medium tracking-wide text-secondary-text"
          >
            Connecting the next generation of talent.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

