"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Sparkles } from "lucide-react";
import { useDemoState } from "@/context/DemoStateContext";
import { formatPublicName } from "@/lib/helpers";
import { EditorialImage } from "@/components/EditorialImage";

const STUDIO_BG_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const { candidates, openReelModal } = useDemoState();
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  // Pick Sarah J. (center), Ahmed R. (top-left), Maya K. (bottom-right)
  const heroCandidates = candidates.slice(0, 3);
  const centerCard = heroCandidates[0];
  const upperCard = heroCandidates[1];
  const lowerCard = heroCandidates[2];

  // Subtle ambient cue cycling across the 3 hero reels
  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % 3);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden border-b border-sand-border bg-warm-ivory">
      {/* Subtle atmospheric studio backdrop + architectural hairline grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.045, 1], x: [0, -10, 0] }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 opacity-[0.14]"
        >
          <EditorialImage
            src={STUDIO_BG_IMAGE}
            alt="Collaborative startup studio background"
            loading="eager"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Warm ivory editorial veil & crisp subtle vertical gridlines */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm-ivory/85 via-warm-ivory/88 to-warm-ivory" />
        <div className="bg-editorial-hairline absolute inset-0 mx-auto max-w-[1440px] opacity-80" />
      </div>

      <div className="relative mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Editorial Copy & CTAs */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-sand-border bg-pure-white/90 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-deep-forest">
              <span className="h-1.5 w-1.5 rounded-full bg-subtle-gold" />
              The next generation of work starts here
            </p>

            <h1 className="mt-6 max-w-xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-warm-charcoal sm:text-5xl lg:text-[54px]">
              Your next opportunity starts with a{" "}
              <span className="relative inline-block font-serif font-normal italic text-deep-forest">
                30-second introduction
                {/* Subtle organic editorial oval stroke inspired by refined print emphasis */}
                <svg
                  viewBox="0 0 280 48"
                  fill="none"
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-2 -left-1.5 h-5 w-[104%] text-muted-sage/65"
                >
                  <path
                    d="M4 34C62 20 190 12 276 26"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-secondary-text sm:text-lg">
              Discover ambitious talent. Meet the people behind the profiles.
              Find internships and short-term opportunities built for the way
              startups grow.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/discover?view=opportunities"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-deep-forest px-6 py-3.5 text-sm font-semibold text-warm-ivory shadow-editorial transition-all duration-200 hover:-translate-y-0.5 hover:bg-deep-forest-hover"
              >
                <span>Explore Opportunities</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/discover?view=talent"
                className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-6 py-3.5 text-sm font-semibold text-warm-charcoal transition-all duration-200 hover:-translate-y-0.5 hover:border-deep-forest/40 hover:bg-soft-sage/50"
              >
                <span>Meet the Talent</span>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2.5 text-xs font-medium text-secondary-text">
              <ShieldCheck className="h-4 w-4 shrink-0 text-deep-forest" />
              <span>
                Built for ambitious people and the teams that believe in them.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Layered Three-Card Video Discovery Composition */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:col-span-6"
          >
            {/* Floating editorial label */}
            <div className="mb-4 flex items-center justify-between lg:mb-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-sand-border bg-pure-white/95 px-3.5 py-1.5 text-xs font-medium text-warm-charcoal shadow-sm lg:absolute lg:-top-3 lg:left-6 lg:z-30">
                <Sparkles className="h-3.5 w-3.5 text-subtle-gold" />
                <span>Real people. Real introductions.</span>
              </div>

              {/* Continuous discoverability cue */}
              <div className="hidden items-center gap-2 rounded-full border border-sand-border bg-pure-white/90 px-3 py-1.5 text-[11px] font-medium text-secondary-text lg:absolute lg:-bottom-3 lg:left-10 lg:z-30 lg:inline-flex">
                <span className="flex gap-1">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        spotlightIndex === dot
                          ? "w-4 bg-deep-forest"
                          : "w-1.5 bg-muted-sage/50"
                      }`}
                    />
                  ))}
                </span>
                <span>Click any reel to preview</span>
              </div>
            </div>

            {/* Layered Composition Canvas */}
            <div className="relative mx-auto flex min-h-[430px] max-w-[540px] items-center justify-center sm:min-h-[490px]">
              {/* Upper-Left Card (Ahmed R.) */}
              {upperCard && (
                <button
                  type="button"
                  onClick={() => openReelModal(upperCard)}
                  aria-label={`Watch 30s intro from ${formatPublicName(
                    upperCard.firstName,
                    upperCard.lastInitial
                  )}`}
                  className={`group hidden sm:flex absolute left-0 top-8 z-10 w-[205px] flex-col overflow-hidden rounded-card border bg-pure-white text-left shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial-hover ${
                    spotlightIndex === 1
                      ? "border-deep-forest ring-2 ring-deep-forest/15"
                      : "border-sand-border"
                  }`}
                >
                  <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-warm-charcoal">
                    <EditorialImage
                      src={upperCard.thumbnailUrl}
                      alt={formatPublicName(
                        upperCard.firstName,
                        upperCard.lastInitial
                      )}
                      loading="eager"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/80 via-transparent to-transparent" />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-warm-charcoal/75 px-2 py-0.5 text-[10px] font-medium text-warm-ivory">
                      {upperCard.reelDuration}s
                    </span>
                    <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-pure-white/95 text-deep-forest shadow-sm transition group-hover:bg-deep-forest group-hover:text-warm-ivory">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    <div className="absolute bottom-2.5 left-3 right-3 text-warm-ivory">
                      <p className="font-heading text-sm font-semibold">
                        {formatPublicName(
                          upperCard.firstName,
                          upperCard.lastInitial
                        )}
                      </p>
                      <p className="text-[11px] text-warm-ivory/80">
                        {upperCard.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 px-3 py-2.5">
                    {upperCard.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-warm-ivory px-2 py-0.5 text-[10px] font-medium text-warm-charcoal"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              )}

              {/* Central Hero Card (Sarah J. — Largest & Prominent) */}
              {centerCard && (
                <button
                  type="button"
                  onClick={() => openReelModal(centerCard)}
                  aria-label={`Watch 30s intro from ${formatPublicName(
                    centerCard.firstName,
                    centerCard.lastInitial
                  )}`}
                  className={`group relative z-20 flex w-full max-w-[290px] sm:max-w-[270px] flex-col overflow-hidden rounded-panel border bg-pure-white text-left shadow-modal transition-all duration-300 hover:-translate-y-1 ${
                    spotlightIndex === 0
                      ? "border-deep-forest ring-2 ring-deep-forest/20"
                      : "border-sand-border"
                  }`}
                >
                  <div className="relative aspect-[3/3.7] w-full overflow-hidden bg-warm-charcoal">
                    <EditorialImage
                      src={centerCard.thumbnailUrl}
                      alt={formatPublicName(
                        centerCard.firstName,
                        centerCard.lastInitial
                      )}
                      loading="eager"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/85 via-warm-charcoal/10 to-warm-charcoal/20" />

                    <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-charcoal/75 px-2.5 py-1 text-[11px] font-medium text-warm-ivory backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-subtle-gold" />
                        {centerCard.reelDuration}s reel
                      </span>
                      <span className="rounded-full bg-soft-sage/95 px-2.5 py-0.5 text-[10px] font-semibold text-deep-forest">
                        Featured
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-warm-ivory/40 bg-deep-forest/90 text-warm-ivory shadow-lg transition-transform duration-200 group-hover:scale-105">
                        <Play className="ml-0.5 h-6 w-6 fill-current" />
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-4 right-4 text-warm-ivory">
                      <p className="font-heading text-lg font-semibold leading-tight">
                        {formatPublicName(
                          centerCard.firstName,
                          centerCard.lastInitial
                        )}
                      </p>
                      <p className="mt-0.5 text-xs text-warm-ivory/85">
                        {centerCard.title} · {centerCard.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 bg-pure-white p-3.5">
                    {centerCard.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-sand-border bg-warm-ivory px-2.5 py-1 text-[11px] font-medium text-warm-charcoal"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              )}

              {/* Bottom-Right Card (Maya K.) */}
              {lowerCard && (
                <button
                  type="button"
                  onClick={() => openReelModal(lowerCard)}
                  aria-label={`Watch 30s intro from ${formatPublicName(
                    lowerCard.firstName,
                    lowerCard.lastInitial
                  )}`}
                  className={`group hidden sm:flex absolute bottom-4 right-0 z-10 w-[200px] flex-col overflow-hidden rounded-card border bg-pure-white text-left shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:shadow-editorial-hover ${
                    spotlightIndex === 2
                      ? "border-deep-forest ring-2 ring-deep-forest/15"
                      : "border-sand-border"
                  }`}
                >
                  <div className="relative aspect-[4/4.1] w-full overflow-hidden bg-warm-charcoal">
                    <EditorialImage
                      src={lowerCard.thumbnailUrl}
                      alt={formatPublicName(
                        lowerCard.firstName,
                        lowerCard.lastInitial
                      )}
                      loading="eager"
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/80 via-transparent to-transparent" />
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-warm-charcoal/75 px-2 py-0.5 text-[10px] font-medium text-warm-ivory">
                      {lowerCard.reelDuration}s
                    </span>
                    <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-pure-white/95 text-deep-forest shadow-sm transition group-hover:bg-deep-forest group-hover:text-warm-ivory">
                      <Play className="ml-0.5 h-3 w-3 fill-current" />
                    </span>
                    <div className="absolute bottom-2.5 left-3 right-3 text-warm-ivory">
                      <p className="font-heading text-sm font-semibold">
                        {formatPublicName(
                          lowerCard.firstName,
                          lowerCard.lastInitial
                        )}
                      </p>
                      <p className="text-[11px] text-warm-ivory/80">
                        {lowerCard.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 px-3 py-2.5">
                    {lowerCard.skills.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-warm-ivory px-2 py-0.5 text-[10px] font-medium text-warm-charcoal"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

