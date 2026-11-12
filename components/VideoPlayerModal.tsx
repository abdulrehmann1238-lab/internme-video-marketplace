"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useDemoState } from "@/context/DemoStateContext";
import { formatPublicName, formatSecondsClock } from "@/lib/helpers";
import { EditorialImage } from "@/components/EditorialImage";

export function VideoPlayerModal() {
  const { activeReelCandidate, closeReelModal } = useDemoState();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const duration = activeReelCandidate?.reelDuration ?? 30;
  const hasRealVideo = Boolean(activeReelCandidate?.videoUrl);

  // Reset playback state when candidate changes
  useEffect(() => {
    if (!activeReelCandidate) return;
    setCurrentSec(0);
    setIsPlaying(true);
  }, [activeReelCandidate]);

  // Escape key close
  useEffect(() => {
    if (!activeReelCandidate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReelModal();
      if (e.key === " ") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeReelCandidate, closeReelModal]);

  // Simulated timeline ticker for portrait introduction reels without uploaded file
  useEffect(() => {
    if (!activeReelCandidate || !isPlaying || hasRealVideo) return;

    const timer = window.setInterval(() => {
      setCurrentSec((prev) => {
        if (prev >= duration) {
          return 0;
        }
        return Number((prev + 0.2).toFixed(2));
      });
    }, 200);

    return () => window.clearInterval(timer);
  }, [activeReelCandidate, isPlaying, duration, hasRealVideo]);

  // Sync native <video> if uploaded local blob exists
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !hasRealVideo) return;
    vid.muted = isMuted;
    if (isPlaying) {
      vid.play().catch(() => {
        // autoplay policy fallback
      });
    } else {
      vid.pause();
    }
  }, [isPlaying, isMuted, hasRealVideo]);

  if (!activeReelCandidate) return null;

  const publicName = formatPublicName(
    activeReelCandidate.firstName,
    activeReelCandidate.lastInitial
  );

  const activeTranscript =
    activeReelCandidate.reelTranscript.find(
      (line) => currentSec >= line.startSec && currentSec <= line.endSec
    ) || activeReelCandidate.reelTranscript[0];

  const progressPct = Math.min(100, (currentSec / duration) * 100);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    const targetSec = ratio * duration;
    setCurrentSec(targetSec);
    if (videoRef.current && hasRealVideo) {
      videoRef.current.currentTime = targetSec;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${publicName} 30-second video introduction`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeReelModal}
        className="fixed inset-0 z-[80] flex items-center justify-center bg-warm-charcoal/75 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-panel border border-sand-border/30 bg-warm-ivory shadow-modal md:grid-cols-12"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeReelModal}
            aria-label="Close video player"
            className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-sand-border bg-pure-white/95 text-warm-charcoal shadow-sm transition hover:bg-muted-sand"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left: Portrait Video Frame */}
          <div className="relative flex aspect-[3/4] max-h-[520px] w-full flex-col justify-between overflow-hidden bg-warm-charcoal md:col-span-6 md:max-h-[580px]">
            {hasRealVideo ? (
              <video
                ref={videoRef}
                src={activeReelCandidate.videoUrl}
                loop
                playsInline
                onTimeUpdate={(e) => setCurrentSec(e.currentTarget.currentTime)}
                className="h-full w-full object-cover"
              />
            ) : (
              <motion.div
                animate={
                  isPlaying
                    ? { scale: [1, 1.045, 1.01] }
                    : { scale: 1 }
                }
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <EditorialImage
                  src={activeReelCandidate.thumbnailUrl}
                  alt={publicName}
                  fallbackLabel={publicName}
                  loading="eager"
                  className="h-full w-full object-cover object-top"
                />
              </motion.div>
            )}

            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-warm-charcoal/90 via-warm-charcoal/15 to-warm-charcoal/40" />

            {/* Top HUD */}
            <div className="relative z-10 flex items-center justify-between p-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-warm-charcoal/70 px-3 py-1 text-xs font-medium text-warm-ivory backdrop-blur-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isPlaying ? "animate-pulse bg-subtle-gold" : "bg-muted-sage"
                  }`}
                />
                <span>{hasRealVideo ? "Uploaded Reel" : "30s Intro Reel"}</span>
              </div>

              {/* Voice activity waveform */}
              {!hasRealVideo && (
                <div
                  aria-hidden="true"
                  className="flex h-6 items-center gap-1 rounded-full bg-warm-charcoal/60 px-2.5 backdrop-blur-sm"
                >
                  {[0.4, 0.85, 0.55, 1, 0.65, 0.9, 0.45].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={
                        isPlaying && !isMuted
                          ? { scaleY: [0.35, h, 0.45, h * 0.8] }
                          : { scaleY: 0.25 }
                      }
                      transition={{
                        duration: 0.85,
                        repeat: Infinity,
                        delay: i * 0.08,
                      }}
                      className="h-3.5 w-0.5 origin-center rounded-full bg-warm-ivory"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Center Play/Pause Tap Target */}
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="relative z-10 mx-auto my-auto flex h-14 w-14 items-center justify-center rounded-full border border-warm-ivory/40 bg-warm-charcoal/55 text-warm-ivory opacity-90 backdrop-blur-sm transition hover:scale-105 hover:bg-deep-forest"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-current" />
              ) : (
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              )}
            </button>

            {/* Bottom Spoken Caption + Controls */}
            <div className="relative z-10 space-y-3 p-4">
              {activeTranscript && !hasRealVideo && (
                <div className="rounded-xl bg-warm-charcoal/75 px-3.5 py-2.5 backdrop-blur-sm">
                  <p className="text-xs leading-relaxed text-warm-ivory/95">
                    &ldquo;{activeTranscript.text}&rdquo;
                  </p>
                </div>
              )}

              {/* Scrub bar */}
              <div
                role="slider"
                tabIndex={0}
                aria-label="Video playback timeline"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={Math.round(currentSec)}
                onClick={handleSeek}
                className="group/bar relative h-2 w-full cursor-pointer rounded-full bg-warm-ivory/25"
              >
                <div
                  style={{ width: `${progressPct}%` }}
                  className="h-full rounded-full bg-subtle-gold transition-[width] duration-150"
                />
              </div>

              {/* Control Bar */}
              <div className="flex items-center justify-between text-xs text-warm-ivory">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="rounded-lg p-1.5 transition hover:bg-white/15"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentSec(0);
                      setIsPlaying(true);
                      if (videoRef.current) videoRef.current.currentTime = 0;
                    }}
                    aria-label="Restart reel"
                    className="rounded-lg p-1.5 transition hover:bg-white/15"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono text-[11px] text-warm-ivory/85">
                    {formatSecondsClock(currentSec)} /{" "}
                    {formatSecondsClock(duration)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMuted((prev) => !prev)}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[11px] font-medium transition hover:bg-white/15"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="h-4 w-4" />
                      <span>Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      <span>Sound On</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Candidate Intro Context */}
          <div className="flex flex-col justify-between p-6 md:col-span-6 md:p-8">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-soft-sage px-3 py-1 text-xs font-medium text-deep-forest">
                <span className="h-1.5 w-1.5 rounded-full bg-deep-forest" />
                {activeReelCandidate.availability}
              </span>

              <h3 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
                {publicName}
              </h3>
              <p className="mt-1 text-sm font-medium text-deep-forest">
                {activeReelCandidate.title}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-secondary-text">
                <MapPin className="h-3.5 w-3.5 text-muted-sage" />
                <span>
                  {activeReelCandidate.location} ·{" "}
                  {activeReelCandidate.workPreference}
                </span>
              </div>

              <div className="mt-5 rounded-card border border-sand-border bg-pure-white p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-text">
                  Introduction Focus
                </p>
                <p className="mt-1.5 text-sm font-medium text-warm-charcoal">
                  {activeReelCandidate.reelHeadline}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-secondary-text">
                  {activeReelCandidate.bio}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary-text">
                  Core Skills
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {activeReelCandidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-sand-border bg-pure-white px-3 py-1 text-xs font-medium text-warm-charcoal"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3 border-t border-sand-border pt-5">
              <p className="text-xs text-secondary-text">
                Public identity masked ({publicName}) · Direct contact protected
                until Mutual Growth Compact consent.
              </p>
              <Link
                href={`/talent/${activeReelCandidate.id}`}
                onClick={closeReelModal}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                <span>View Full Profile</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

