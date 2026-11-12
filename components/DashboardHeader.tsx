"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";

interface DashboardHeaderProps {
  mode: "candidate" | "employer";
  onOpenMobileMenu: () => void;
}

export function DashboardHeader({
  mode,
  onOpenMobileMenu,
}: DashboardHeaderProps) {
  const router = useRouter();
  const { user, loginAsCandidate, loginAsEmployer, logout } = useAuth();
  const { notifications, markNotificationsRead } = useDemoState();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const displayName =
    user?.fullName || (mode === "candidate" ? "Sarah J." : "Northstar Labs");
  const displayInitial = displayName[0] || "I";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      router.push(
        mode === "candidate"
          ? "/discover?view=opportunities"
          : "/dashboard/employer/talent"
      );
      return;
    }
    router.push(
      mode === "candidate"
        ? `/discover?view=opportunities`
        : `/dashboard/employer/talent`
    );
    showToast(`Exploring matches for "${searchQuery.trim()}".`, "info");
  };

  return (
    <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-4 border-b border-sand-border bg-warm-ivory/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation drawer"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-sand-border bg-pure-white text-warm-charcoal lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <form onSubmit={handleSearch} className="relative hidden max-w-md flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              mode === "candidate"
                ? "Search opportunities or skills..."
                : "Search candidates, reels, or skills..."
            }
            aria-label="Dashboard search"
            className="h-10 w-full rounded-xl border border-sand-border bg-pure-white pl-10 pr-4 text-sm text-warm-charcoal placeholder:text-secondary-text focus:border-deep-forest focus:outline-none"
          />
        </form>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotifOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-sand-border bg-pure-white text-warm-charcoal transition hover:border-muted-sage"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-deep-forest" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl border border-sand-border bg-pure-white p-3 shadow-editorial sm:w-80">
              <div className="flex items-center justify-between border-b border-sand-border pb-2">
                <span className="text-xs font-semibold text-warm-charcoal">
                  Notifications
                </span>
                <button
                  type="button"
                  onClick={markNotificationsRead}
                  className="text-[11px] font-medium text-deep-forest hover:underline"
                >
                  Mark all read
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-xl p-2.5 text-xs ${
                      n.unread ? "bg-soft-sage/55" : "bg-warm-ivory/60"
                    }`}
                  >
                    <p className="font-medium text-warm-charcoal">{n.title}</p>
                    <p className="mt-1 text-[11px] text-secondary-text">
                      {n.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotifOpen(false);
            }}
            className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-2.5 py-1.5 text-sm font-medium text-warm-charcoal transition hover:border-muted-sage"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-deep-forest text-xs font-semibold text-warm-ivory">
              {displayInitial}
            </span>
            <span className="hidden sm:inline">{displayName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-secondary-text" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-sand-border bg-pure-white p-2 shadow-editorial">
              <div className="border-b border-sand-border px-3 py-2">
                <p className="text-xs font-semibold text-warm-charcoal">
                  {displayName}
                </p>
                <p className="text-[11px] text-secondary-text">
                  {mode === "candidate"
                    ? "Candidate Demo Session"
                    : "Employer Demo Session"}
                </p>
              </div>
              <div className="mt-1 space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    loginAsCandidate();
                    setProfileOpen(false);
                    router.push("/dashboard/talent");
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-warm-charcoal hover:bg-muted-sand"
                >
                  <UserCheck className="h-3.5 w-3.5 text-deep-forest" />
                  <span>Candidate Dashboard</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    loginAsEmployer();
                    setProfileOpen(false);
                    router.push("/dashboard/employer");
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-warm-charcoal hover:bg-muted-sand"
                >
                  <Building2 className="h-3.5 w-3.5 text-deep-forest" />
                  <span>Employer Dashboard</span>
                </button>
                <Link
                  href="/discover"
                  onClick={() => setProfileOpen(false)}
                  className="block rounded-xl px-3 py-2 text-xs font-medium text-secondary-text hover:bg-muted-sand hover:text-warm-charcoal"
                >
                  Open Public Marketplace
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                    router.push("/");
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-secondary-text hover:bg-muted-sand hover:text-warm-charcoal"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

