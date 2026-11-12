"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Heart, MapPin, Play } from "lucide-react";
import { Candidate } from "@/lib/types";
import { formatPublicName } from "@/lib/helpers";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";
import { FavoriteButton } from "@/components/FavoriteButton";
import { EditorialImage } from "@/components/EditorialImage";

interface CandidateCardProps {
  candidate: Candidate;
  priority?: boolean;
}

export function CandidateCard({
  candidate,
  priority = false,
}: CandidateCardProps) {
  const router = useRouter();
  const { isCandidateFavorite, toggleFavoriteCandidate } = useFavorites();
  const { openReelModal } = useDemoState();
  const [doubleClickBurst, setDoubleClickBurst] = useState(false);
  const clickTimerRef = useRef<number | null>(null);

  const publicName = formatPublicName(
    candidate.firstName,
    candidate.lastInitial
  );
  const isFav = isCandidateFavorite(candidate.id);

  const handleCardDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    const ok = toggleFavoriteCandidate(candidate.id, publicName);
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
      router.push(`/talent/${candidate.id}`);
    }, 210);
  };

  return (
    <article
      onClick={handleCardNavigate}
      onDoubleClick={handleCardDoubleClick}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-card border border-sand-border bg-pure-white transition-all duration-300 hover:-translate-y-0.5 hover:border-muted-sage/70 hover:shadow-editorial-hover"
    >
      {/* Thumbnail / Video trigger */}
      <div className="relative aspect-[4/4.3] w-full overflow-hidden bg-muted-sand">
        <EditorialImage
          src={candidate.thumbnailUrl}
          alt={`${publicName} — ${candidate.title}`}
          fallbackLabel={publicName}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />

        {/* Subtle warm dark scrim at bottom for contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-charcoal/55 via-transparent to-warm-charcoal/10" />

        {/* Top row: 30s badge & Favorite Heart */}
        <div className="absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-charcoal/80 px-2.5 py-1 text-[11px] font-medium tracking-wide text-warm-ivory backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-subtle-gold" />
            {candidate.reelDuration}s reel
          </span>

          <FavoriteButton
            size="sm"
            active={isFav}
            onToggle={() => toggleFavoriteCandidate(candidate.id, publicName)}
            ariaLabel={
              isFav
                ? `Remove ${publicName} from favorites`
                : `Save ${publicName} to favorites`
            }
          />
        </div>

        {/* Center Play Trigger */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openReelModal(candidate);
          }}
          aria-label={`Play 30-second video introduction for ${publicName}`}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-none"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-warm-ivory/40 bg-warm-charcoal/65 text-warm-ivory backdrop-blur-sm transition-all duration-200 group-hover:scale-105 group-hover:bg-deep-forest group-hover:border-deep-forest">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </button>

        {/* Bottom availability tag inside image */}
        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pure-white/95 px-2.5 py-1 text-[11px] font-medium text-warm-charcoal shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-deep-forest" />
            {candidate.availability}
          </span>
        </div>

        {/* Double-click Heart Pop Overlay */}
        <AnimatePresence>
          {doubleClickBurst && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.15, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-warm-charcoal/15"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pure-white/95 text-deep-forest shadow-editorial">
                <Heart className="h-8 w-8 fill-current" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={`/talent/${candidate.id}`}
                onClick={(e) => e.stopPropagation()}
                className="font-heading text-lg font-semibold tracking-tight text-warm-charcoal transition-colors hover:text-deep-forest"
              >
                {publicName}
              </Link>
              <p className="mt-0.5 text-sm font-medium text-secondary-text">
                {candidate.title}
              </p>
            </div>
            <Link
              href={`/talent/${candidate.id}`}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View profile for ${publicName}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand-border text-secondary-text transition-all duration-200 group-hover:border-deep-forest group-hover:bg-soft-sage group-hover:text-deep-forest"
            >
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-secondary-text">
            <MapPin className="h-3.5 w-3.5 text-muted-sage" />
            <span>{candidate.location}</span>
            <span aria-hidden="true">·</span>
            <span>{candidate.workPreference}</span>
          </div>

          {/* Exactly 3 visible skill tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {candidate.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-sand-border bg-warm-ivory px-2.5 py-1 text-xs font-medium text-warm-charcoal"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-sand-border/80 pt-3 text-xs">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openReelModal(candidate);
            }}
            className="inline-flex items-center gap-1.5 font-medium text-deep-forest transition hover:underline"
          >
            <Play className="h-3 w-3 fill-current" />
            Watch {candidate.reelDuration}s intro
          </button>
          <span className="text-[11px] text-secondary-text">
            Double-click to save
          </span>
        </div>
      </div>
    </article>
  );
}

