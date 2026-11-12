import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
        <Compass className="h-5 w-5" />
      </div>
      <h1 className="mt-5 font-heading text-3xl font-semibold text-warm-charcoal">
        Page not found
      </h1>
      <p className="mt-2.5 text-sm leading-relaxed text-secondary-text">
        The page or introduction you&apos;re looking for isn&apos;t here.
        Explore open opportunities or candidate reels instead.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-4 py-2.5 text-sm font-semibold text-warm-charcoal hover:border-deep-forest"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back Home</span>
        </Link>
        <Link
          href="/discover"
          className="rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory hover:bg-deep-forest-hover"
        >
          Explore Marketplace
        </Link>
      </div>
    </div>
  );
}

