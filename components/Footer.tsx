"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Mail, Share2 } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const FOOTER_COLUMNS = [
  {
    heading: "InternMe",
    links: [
      { label: "About", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Discover Talent", href: "/discover?view=talent" },
      { label: "Find Opportunities", href: "/discover?view=opportunities" },
    ],
  },
  {
    heading: "For Talent",
    links: [
      { label: "Create Your Profile", href: "/auth/signup?role=candidate" },
      { label: "Upload Your Reel", href: "/dashboard/talent/reel" },
      {
        label: "Browse Internships",
        href: "/discover?view=opportunities&track=Internship",
      },
      {
        label: "Browse Sprints",
        href: "/discover?view=opportunities&track=Sprint",
      },
    ],
  },
  {
    heading: "For Employers",
    links: [
      { label: "Find Talent", href: "/discover?view=talent" },
      { label: "Post an Opportunity", href: "/dashboard/employer/listings/new" },
      { label: "Employer Dashboard", href: "/dashboard/employer" },
      { label: "Hiring Guide", href: "/hiring-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Privacy", href: "/privacy" },
      { label: "Contact", href: "/contact" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t border-sand-border bg-muted-sand/45">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <BrandLogo size="md" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary-text">
              A curated video-first marketplace connecting ambitious students
              and junior makers with early-stage startups through 30-second
              introductions.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@internme.example"
                aria-label="Email InternMe"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:border-deep-forest hover:text-deep-forest"
              >
                <Mail className="h-4 w-4" />
              </a>
              <Link
                href="/discover"
                aria-label="Explore InternMe network"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:border-deep-forest hover:text-deep-forest"
              >
                <Globe className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                aria-label="Share InternMe"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-border bg-pure-white text-secondary-text transition hover:border-deep-forest hover:text-deep-forest"
              >
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-secondary-text">
              Contact:{" "}
              <a
                href="mailto:hello@internme.example"
                className="font-medium text-warm-charcoal hover:text-deep-forest hover:underline"
              >
                hello@internme.example
              </a>
            </p>
          </div>

          {/* 4 Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="font-heading text-xs font-semibold uppercase tracking-wider text-warm-charcoal">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-secondary-text transition-colors hover:text-deep-forest"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-sand-border pt-6 text-xs text-secondary-text sm:flex-row sm:items-center">
          <p>© 2026 InternMe. Interactive MVP Frontend Demonstration.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-deep-forest">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-deep-forest">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

