"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Heart, MapPin } from "lucide-react";
import { Opportunity } from "@/lib/types";
import { getTrackBadgeLabel } from "@/lib/helpers";
import { useFavorites } from "@/context/FavoritesContext";
import { FavoriteButton } from "@/components/FavoriteButton";

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const router = useRouter();
  const { isOpportunityFavorite, toggleFavoriteOpportunity } = useFavorites();
  const [doubleClickBurst, setDoubleClickBurst] = useState(false);
  const clickTimerRef = useRef<number | null>(null);

  const isFav = isOpportunityFavorite(opportunity.id);
  const isSprint = opportunity.track === "Sprint";

  const handleCardDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    const ok = toggleFavoriteOpportunity(opportunity.id, opportunity.title);
    if (ok) {
      setDoubleClickBurst(true);
      window.setTimeout(() => setDoubleClickBurst(false), 650);
    }
  };

  const handleCardNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
      return;
    }
    clickTimerRef.current = window.setTimeout(() => {
      clickTimerRef.current = null;
      router.push(`/jobs/${opportunity.slug}`);
    }, 210);
  };

  return (
    <article
      onClick={handleCardNavigate}
      onDoubleClick={handleCardDoubleClick}
      className="group relative flex cursor-pointer flex-col justify-between rounded-card border border-sand-border bg-pure-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-muted-sage/70 hover:shadow-editorial-hover"
    >
      <div>
        {/* Top bar: Company + Track Badge + Favorite */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sand-border bg-soft-sage font-heading text-xs font-semibold tracking-wider text-deep-forest">
              {opportunity.companyInitials}
            </div>
            <div>
              <p className="text-xs font-medium text-secondary-text">
                {opportunity.companyName}
              </p>
              <span
                className={`mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  isSprint
                    ? "border border-subtle-gold/40 bg-muted-sand text-warm-charcoal"
                    : "bg-soft-sage text-deep-forest"
                }`}
              >
                {getTrackBadgeLabel(opportunity.track)}
              </span>
            </div>
          </div>

          <FavoriteButton
            size="sm"
            active={isFav}
            onToggle={() =>
              toggleFavoriteOpportunity(opportunity.id, opportunity.title)
            }
            ariaLabel={
              isFav
                ? `Remove ${opportunity.title} from saved opportunities`
                : `Save ${opportunity.title}`
            }
          />
        </div>

        {/* Role Title */}
        <h3 className="mt-4 font-heading text-lg font-semibold leading-snug tracking-tight text-warm-charcoal transition-colors group-hover:text-deep-forest">
          <Link
            href={`/jobs/${opportunity.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="focus-visible:underline"
          >
            {opportunity.title}
          </Link>
        </h3>

        {/* Metadata row */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-secondary-text">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-muted-sage" />
            {opportunity.location} · {opportunity.workArrangement}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-muted-sage" />
            {opportunity.duration}
          </span>
        </div>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {opportunity.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-sand-border bg-warm-ivory px-2.5 py-1 text-xs font-medium text-warm-charcoal"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer row */}
      <div className="mt-5 flex items-center justify-between border-t border-sand-border/80 pt-3.5">
        <div className="flex items-center gap-2 text-xs">
          {opportunity.compensation ? (
            <span className="rounded-md bg-soft-sage/80 px-2 py-0.5 font-medium text-deep-forest">
              {opportunity.compensation}
            </span>
          ) : (
            <span className="text-secondary-text">
              Posted {opportunity.postedLabel}
            </span>
          )}
        </div>

        <Link
          href={`/jobs/${opportunity.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-deep-forest transition group-hover:underline"
        >
          <span>View role</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Double-click Heart Overlay */}
      <AnimatePresence>
        {doubleClickBurst && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.15, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-card bg-warm-ivory/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pure-white text-deep-forest shadow-editorial">
              <Heart className="h-7 w-7 fill-current" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

