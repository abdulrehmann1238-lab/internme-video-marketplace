"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => boolean | void;
  ariaLabel: string;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({
  active,
  onToggle,
  ariaLabel,
  size = "md",
  className = "",
}: FavoriteButtonProps) {
  const [burstKey, setBurstKey] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const toggled = onToggle();
    if (toggled !== false && !active) {
      setBurstKey((prev) => prev + 1);
    }
  };

  const dims = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const iconDims = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onDoubleClick={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
      aria-pressed={active}
      whileTap={{ scale: 0.88 }}
      className={`relative inline-flex ${dims} items-center justify-center rounded-full border transition-colors duration-200 ${
        active
          ? "border-deep-forest bg-deep-forest text-warm-ivory shadow-sm"
          : "border-sand-border bg-pure-white/95 text-warm-charcoal hover:border-muted-sage hover:text-deep-forest"
      } ${className}`}
    >
      <motion.span
        key={active ? "filled" : "empty"}
        initial={{ scale: 0.78 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
      >
        <Heart className={`${iconDims} ${active ? "fill-current" : ""}`} />
      </motion.span>

      <AnimatePresence>
        {burstKey > 0 && active && (
          <motion.span
            key={burstKey}
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 1.75, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-full border border-subtle-gold"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

