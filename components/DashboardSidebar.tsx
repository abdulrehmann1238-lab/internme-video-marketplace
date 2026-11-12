"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Briefcase,
  Compass,
  FileText,
  Home,
  LayoutDashboard,
  PlusCircle,
  Settings,
  User,
  Users,
  Video,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TALENT_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard/talent", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/talent/profile", icon: User },
  { label: "My Video Reel", href: "/dashboard/talent/reel", icon: Video },
  {
    label: "Applications",
    href: "/dashboard/talent/applications",
    icon: FileText,
  },
  {
    label: "Saved Opportunities",
    href: "/dashboard/talent/favorites",
    icon: Bookmark,
  },
  { label: "Settings", href: "/dashboard/talent/settings", icon: Settings },
];

const EMPLOYER_NAV: NavItem[] = [
  { label: "Overview", href: "/dashboard/employer", icon: LayoutDashboard },
  {
    label: "My Listings",
    href: "/dashboard/employer/listings",
    icon: Briefcase,
  },
  {
    label: "Post Opportunity",
    href: "/dashboard/employer/listings/new",
    icon: PlusCircle,
  },
  {
    label: "Discover Talent",
    href: "/dashboard/employer/talent",
    icon: Users,
  },
  {
    label: "Applications",
    href: "/dashboard/employer/applications",
    icon: FileText,
  },
  {
    label: "Saved Candidates",
    href: "/dashboard/employer/favorites",
    icon: Bookmark,
  },
  { label: "Settings", href: "/dashboard/employer/settings", icon: Settings },
];

interface DashboardSidebarProps {
  mode: "candidate" | "employer";
  onNavigate?: () => void;
}

export function DashboardSidebar({ mode, onNavigate }: DashboardSidebarProps) {
  const pathname = usePathname();
  const items = mode === "candidate" ? TALENT_NAV : EMPLOYER_NAV;

  return (
    <div className="flex h-full flex-col justify-between bg-pure-white p-5">
      <div>
        <Link href="/" onClick={onNavigate} className="inline-block px-2">
          <BrandLogo size="md" />
        </Link>

        <div className="mt-3 px-2">
          <span className="inline-flex rounded-full bg-soft-sage px-2.5 py-0.5 text-[11px] font-semibold text-deep-forest">
            {mode === "candidate" ? "Candidate Workspace" : "Employer Workspace"}
          </span>
        </div>

        <nav className="mt-6 space-y-1" aria-label="Dashboard navigation">
          {items.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard/talent" &&
                item.href !== "/dashboard/employer" &&
                item.href !== "/dashboard/employer/listings" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-deep-forest text-warm-ivory shadow-sm"
                    : "text-secondary-text hover:bg-muted-sand/60 hover:text-warm-charcoal"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 border-t border-sand-border pt-4">
        <Link
          href="/discover"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-secondary-text transition hover:bg-muted-sand/60 hover:text-warm-charcoal"
        >
          <Compass className="h-4 w-4 text-deep-forest" />
          <span>Public Marketplace</span>
        </Link>
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-medium text-secondary-text transition hover:bg-muted-sand/60 hover:text-warm-charcoal"
        >
          <Home className="h-4 w-4 text-muted-sage" />
          <span>Back to Landing Page</span>
        </Link>
      </div>
    </div>
  );
}

