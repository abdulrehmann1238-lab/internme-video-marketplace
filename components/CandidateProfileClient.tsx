"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CheckCircle2,
  Clock,
  Lock,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  ShieldCheck,
  Unlock,
  User,
} from "lucide-react";
import { Candidate } from "@/lib/types";
import { formatPublicName, formatSecondsClock } from "@/lib/helpers";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CompactConsentModal } from "@/components/CompactConsentModal";
import { EditorialImage } from "@/components/EditorialImage";

export function CandidateProfileClient({
  initialCandidate,
}: {
  initialCandidate: Candidate;
}) {
  const { candidates, openReelModal } = useDemoState();
  const { user, hasAcceptedCompact, acceptCompact, openLoginModal } =
    useAuth();
  const { isCandidateFavorite, toggleFavoriteCandidate } = useFavorites();
  const { showToast } = useToast();

  // Pull live candidate updates (e.g. edited bio/reel from dashboard)
  const candidate =
    candidates.find((c) => c.id === initialCandidate.id) || initialCandidate;

  const publicName = formatPublicName(
    candidate.firstName,
    candidate.lastInitial
  );
  const isFav = isCandidateFavorite(candidate.id);

  const [inlinePlaying, setInlinePlaying] = useState(false);
  const [inlineSec, setInlineSec] = useState(0);
  const [compactOpen, setCompactOpen] = useState(false);

  useEffect(() => {
    if (!inlinePlaying) return;
    const timer = window.setInterval(() => {
      setInlineSec((prev) =>
        prev >= candidate.reelDuration ? 0 : Number((prev + 0.25).toFixed(2))
      );
    }, 250);
    return () => window.clearInterval(timer);
  }, [inlinePlaying, candidate.reelDuration]);

  const activeLine =
    candidate.reelTranscript.find(
      (line) => inlineSec >= line.startSec && inlineSec <= line.endSec
    ) || candidate.reelTranscript[0];

  const handleUnlockRequest = () => {
    if (!user) {
      openLoginModal(
        "Sign in as an employer to review the Mutual Growth Compact and unlock demo contact details."
      );
      return;
    }
    if (user.role !== "employer") {
      showToast(
        "Employer account required to request candidate contact access.",
        "info"
      );
      return;
    }
    if (!hasAcceptedCompact) {
      setCompactOpen(true);
    }
  };

  const showUnlockedDetails =
    user?.role === "employer" && hasAcceptedCompact;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/discover?view=talent"
        className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text transition hover:text-deep-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Talent Discovery</span>
      </Link>

      {/* Profile Header */}
      <div className="mt-6 rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-sand-border bg-muted-sand">
              <EditorialImage
                src={candidate.thumbnailUrl}
                alt={publicName}
                fallbackLabel={publicName}
                loading="eager"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-heading text-3xl font-semibold tracking-tight text-warm-charcoal">
                  {publicName}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sage px-3 py-1 text-xs font-medium text-deep-forest">
                  <span className="h-1.5 w-1.5 rounded-full bg-deep-forest" />
                  {candidate.availability}
                </span>
              </div>
              <p className="mt-1 text-base font-medium text-secondary-text">
                {candidate.title}
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-4 text-xs text-secondary-text">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-muted-sage" />
                  {candidate.location} · {candidate.workPreference}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-muted-sage" />
                  {candidate.reelDuration}s introduction reel
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <FavoriteButton
              active={isFav}
              onToggle={() => toggleFavoriteCandidate(candidate.id, publicName)}
              ariaLabel={
                isFav
                  ? `Remove ${publicName} from favorites`
                  : `Save ${publicName} to favorites`
              }
            />
            <button
              type="button"
              onClick={() => openReelModal(candidate)}
              className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Watch Reel</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-sand-border pt-5">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg border border-sand-border bg-warm-ivory px-3 py-1.5 text-xs font-medium text-warm-charcoal"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: Video Introduction Player + Bio */}
        <div className="space-y-8 lg:col-span-7">
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
                Get to know {candidate.firstName} in 30 seconds.
              </h2>
              <span className="rounded-full bg-muted-sand px-3 py-1 text-xs font-medium text-warm-charcoal">
                {candidate.reelDuration}s reel
              </span>
            </div>

            <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-warm-charcoal">
              {candidate.videoUrl ? (
                <video
                  src={candidate.videoUrl}
                  controls
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <motion.div
                    animate={
                      inlinePlaying
                        ? { scale: [1, 1.04, 1.01] }
                        : { scale: 1 }
                    }
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-full w-full"
                  >
                    <EditorialImage
                      src={candidate.thumbnailUrl}
                      alt={`${publicName} video introduction`}
                      fallbackLabel={publicName}
                      className="h-full w-full object-cover object-top"
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-charcoal/90 via-warm-charcoal/20 to-transparent" />

                  <button
                    type="button"
                    onClick={() => setInlinePlaying((prev) => !prev)}
                    aria-label={
                      inlinePlaying ? "Pause introduction" : "Play introduction"
                    }
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-warm-ivory/40 bg-deep-forest/90 text-warm-ivory shadow-lg transition hover:scale-105">
                      {inlinePlaying ? (
                        <Pause className="h-6 w-6 fill-current" />
                      ) : (
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      )}
                    </span>
                  </button>

                  <div className="absolute inset-x-4 bottom-4 space-y-2.5">
                    {activeLine && (
                      <div className="rounded-xl bg-warm-charcoal/75 px-3.5 py-2 backdrop-blur-sm">
                        <p className="text-xs leading-relaxed text-warm-ivory">
                          &ldquo;{activeLine.text}&rdquo;
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-warm-ivory/25">
                        <div
                          style={{
                            width: `${Math.min(
                              100,
                              (inlineSec / candidate.reelDuration) * 100
                            )}%`,
                          }}
                          className="h-full rounded-full bg-subtle-gold transition-[width] duration-200"
                        />
                      </div>
                      <span className="font-mono text-[11px] text-warm-ivory">
                        {formatSecondsClock(inlineSec)} /{" "}
                        {formatSecondsClock(candidate.reelDuration)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <p className="mt-4 text-sm font-medium text-warm-charcoal">
              Focus: {candidate.reelHeadline}
            </p>
          </section>

          {/* About */}
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
              About {candidate.firstName}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text sm:text-base">
              {candidate.bio}
            </p>
          </section>

          {/* Skills */}
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8">
            <h2 className="font-heading text-xl font-semibold text-warm-charcoal">
              Skills & Tools
            </h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2 text-sm font-medium text-warm-charcoal"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Looking For + Privacy Protection Box */}
        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-7">
            <h2 className="font-heading text-lg font-semibold text-warm-charcoal">
              Looking for
            </h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Preferred track</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {candidate.preferredTrack === "Both"
                    ? "Internships & Sprints"
                    : candidate.preferredTrack === "Sprint"
                      ? "SignMeUp Sprints"
                      : "Internships"}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Preferred duration</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {candidate.preferredDuration}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-4 border-b border-sand-border/70 pb-3">
                <dt className="text-secondary-text">Location preference</dt>
                <dd className="font-semibold text-warm-charcoal">
                  {candidate.location} ({candidate.workPreference})
                </dd>
              </div>
              <div>
                <dt className="text-secondary-text">Desired roles</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {candidate.desiredRoles.map((roleTitle) => (
                    <span
                      key={roleTitle}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-soft-sage px-2.5 py-1 text-xs font-medium text-deep-forest"
                    >
                      <Briefcase className="h-3 w-3" />
                      {roleTitle}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </section>

          {/* Privacy & Mutual Growth Compact Contact Reveal */}
          <section className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sage px-3 py-1 text-xs font-semibold text-deep-forest">
                <ShieldCheck className="h-3.5 w-3.5" />
                Privacy Protected
              </span>
              {showUnlockedDetails && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-deep-forest">
                  <Unlock className="h-3.5 w-3.5" />
                  Compact Accepted
                </span>
              )}
            </div>

            <h2 className="mt-4 font-heading text-lg font-semibold text-warm-charcoal">
              Direct Contact Information
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-secondary-text">
              Personal contact details are protected on InternMe.
            </p>

            {showUnlockedDetails ? (
              <div className="mt-5 space-y-3 rounded-card border border-deep-forest/20 bg-soft-sage/45 p-4 text-sm">
                <div className="flex items-center gap-2.5 text-warm-charcoal">
                  <User className="h-4 w-4 shrink-0 text-deep-forest" />
                  <span className="font-medium">
                    {candidate.privateIdentity.fullLegalName}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-warm-charcoal">
                  <Mail className="h-4 w-4 shrink-0 text-deep-forest" />
                  <span className="break-all font-medium">
                    {candidate.privateIdentity.email}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-warm-charcoal">
                  <Phone className="h-4 w-4 shrink-0 text-deep-forest" />
                  <span className="font-medium">
                    {candidate.privateIdentity.phone}
                  </span>
                </div>
                <p className="border-t border-deep-forest/15 pt-2.5 text-xs text-secondary-text">
                  <CheckCircle2 className="mr-1 inline h-3.5 w-3.5 text-deep-forest" />
                  {candidate.privateIdentity.portfolioNote}
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-2.5">
                {[
                  "Full legal name (Protected)",
                  "Direct email address (Locked)",
                  "Phone number (Locked)",
                ].map((label) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-xl border border-sand-border bg-warm-ivory px-3.5 py-2.5 text-xs text-secondary-text"
                  >
                    <span>{label}</span>
                    <Lock className="h-3.5 w-3.5 text-muted-sage" />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleUnlockRequest}
                  className="mt-3 w-full rounded-xl bg-deep-forest px-4 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
                >
                  Unlock Contact Details
                </button>
                <p className="text-center text-[11px] text-secondary-text">
                  Requires employer sign-in &amp; Mutual Growth Compact consent.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      <CompactConsentModal
        isOpen={compactOpen}
        candidateName={publicName}
        onClose={() => setCompactOpen(false)}
        onAccept={() => {
          acceptCompact();
          setCompactOpen(false);
          showToast(
            `Mutual Growth Compact accepted. Contact unlocked for ${publicName}.`,
            "success"
          );
        }}
      />
    </div>
  );
}

