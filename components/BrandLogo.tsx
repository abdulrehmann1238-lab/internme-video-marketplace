import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  inverted?: boolean;
  showWordmark?: boolean;
}

export function BrandMark({
  className = "h-7 w-7",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="1.5"
        width="33"
        height="33"
        rx="10"
        fill={inverted ? "#FAF9F5" : "#264A3B"}
      />
      <circle
        cx="13.5"
        cy="13"
        r="2.4"
        fill={inverted ? "#264A3B" : "#B89B67"}
      />
      <path
        d="M13.5 18.5V25.5"
        stroke={inverted ? "#264A3B" : "#FAF9F5"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M19.5 13.5L26 17.75L19.5 22V13.5Z"
        fill={inverted ? "#264A3B" : "#829887"}
      />
    </svg>
  );
}

export function BrandLogo({
  className = "",
  size = "md",
  inverted = false,
  showWordmark = true,
}: BrandLogoProps) {
  const markSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };
  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <BrandMark className={markSizes[size]} inverted={inverted} />
      {showWordmark && (
        <span
          className={`font-heading font-semibold tracking-tight ${textSizes[size]} ${
            inverted ? "text-warm-ivory" : "text-warm-charcoal"
          }`}
        >
          Intern<span className={inverted ? "text-muted-sage" : "text-deep-forest"}>Me</span>
        </span>
      )}
    </span>
  );
}

