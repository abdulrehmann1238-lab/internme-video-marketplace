"use client";

import React, { useState } from "react";

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: "lazy" | "eager";
}

export function EditorialImage({
  src,
  alt,
  className = "",
  fallbackLabel,
  loading = "lazy",
}: EditorialImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    const initials = (fallbackLabel || alt || "IM")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || "")
      .join("");

    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-soft-sage via-muted-sand to-warm-ivory text-deep-forest ${className}`}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-deep-forest/20 bg-pure-white/80 font-heading text-sm font-semibold tracking-wider text-deep-forest">
            {initials}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-widest text-secondary-text">
            {fallbackLabel || alt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

