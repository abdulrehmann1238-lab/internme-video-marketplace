"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCheck,
  Building2,
  X,
} from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ToastProvider";

const CENTER_LINKS = [
  { label: "Discover Talent", href: "/discover?view=talent", match: "/discover" },
  {
    label: "Find Opportunities",
    href: "/discover?view=opportunities",
    match: "/jobs",
  },
  { label: "How It Works", href: "/how-it-works", match: "/how-it-works" },
  {
    label: "For Employers",
    href: "/hiring-guide",
    match: "/hiring-guide",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loginAsCandidate, loginAsEmployer, logout } = useAuth();
  const { showToast } = useToast();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dashboard routes have their own dedicated DashboardHeader & sidebar
  const isDashboard = pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 14);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  if (isDashboard) return null;

  const dashboardHref =
    user?.role === "employer" ? "/dashboard/employer" : "/dashboard/talent";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-sand-border bg-warm-ivory/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(37,41,35,0.08)]"
            : "border-b border-transparent bg-warm-ivory/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Left: Wordmark */}
          <Link
            href="/"
            aria-label="InternMe Home"
            className="shrink-0 focus-visible:rounded-lg"
          >
            <BrandLogo size="md" />
          </Link>

          {/* Center: Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {CENTER_LINKS.map((item) => {
              const isActive =
                pathname === item.match ||
                (item.match === "/discover" && pathname === "/discover") ||
                (item.match === "/jobs" && pathname.startsWith("/jobs"));

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-xl px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-deep-forest"
                      : "text-secondary-text hover:bg-muted-sand/60 hover:text-warm-charcoal"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full bg-deep-forest" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Auth / Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <div className="relative flex items-center gap-2.5">
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-sand-border bg-pure-white px-3.5 py-2 text-sm font-medium text-warm-charcoal transition hover:border-deep-forest hover:bg-soft-sage/50"
                >
                  <LayoutDashboard className="h-4 w-4 text-deep-forest" />
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl bg-deep-forest px-3.5 py-2 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-warm-ivory/20 text-[11px] font-bold">
                    {user.firstName[0]}
                  </span>
                  <span>{user.fullName}</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-80" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 top-full mt-2 w-60 rounded-2xl border border-sand-border bg-pure-white p-2 shadow-editorial"
                    >
                      <div className="border-b border-sand-border px-3 py-2">
                        <p className="text-xs font-semibold text-warm-charcoal">
                          {user.fullName}
                        </p>
                        <p className="text-[11px] text-secondary-text">
                          {user.title}
                        </p>
                      </div>
                      <div className="mt-1 space-y-1">
                        <button
                          type="button"
                          onClick={() => {
                            loginAsCandidate();
                            setMenuOpen(false);
                            showToast(
                              "Switched to Sarah J. (Candidate).",
                              "info"
                            );
                            router.push("/dashboard/talent");
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-warm-charcoal transition hover:bg-muted-sand"
                        >
                          <UserCheck className="h-3.5 w-3.5 text-deep-forest" />
                          <span>Switch to Candidate Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            loginAsEmployer();
                            setMenuOpen(false);
                            showToast(
                              "Switched to Northstar Labs (Employer).",
                              "info"
                            );
                            router.push("/dashboard/employer");
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-warm-charcoal transition hover:bg-muted-sand"
                        >
                          <Building2 className="h-3.5 w-3.5 text-deep-forest" />
                          <span>Switch to Employer Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                            showToast("Signed out of demo session.", "info");
                          }}
                          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium text-secondary-text transition hover:bg-muted-sand hover:text-warm-charcoal"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand/70"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-xl px-3.5 py-2 text-sm font-medium text-deep-forest transition hover:bg-soft-sage/60"
                >
                  Join InternMe
                </Link>
                <Link
                  href="/discover"
                  className="group inline-flex items-center gap-2 rounded-xl bg-deep-forest px-4 py-2.5 text-sm font-semibold text-warm-ivory transition-all duration-200 hover:-translate-y-0.5 hover:bg-deep-forest-hover"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={user ? dashboardHref : "/discover"}
              className="rounded-xl bg-deep-forest px-3.5 py-2 text-xs font-semibold text-warm-ivory"
            >
              {user ? "Dashboard" : "Get Started"}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-sand-border bg-pure-white text-warm-charcoal"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-sand-border bg-warm-ivory px-5 py-6 lg:hidden"
          >
            <nav className="space-y-1.5" aria-label="Mobile navigation">
              {CENTER_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl border border-sand-border bg-pure-white px-4 py-3.5 text-base font-medium text-warm-charcoal"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-sage" />
                </Link>
              ))}
              <Link
                href="/about"
                className="flex items-center justify-between rounded-2xl border border-sand-border bg-pure-white px-4 py-3.5 text-base font-medium text-warm-charcoal"
              >
                <span>About InternMe</span>
                <ArrowRight className="h-4 w-4 text-muted-sage" />
              </Link>
              <Link
                href="/privacy"
                className="flex items-center justify-between rounded-2xl border border-sand-border bg-pure-white px-4 py-3.5 text-base font-medium text-warm-charcoal"
              >
                <span>Privacy & Protection</span>
                <ArrowRight className="h-4 w-4 text-muted-sage" />
              </Link>
            </nav>

            <div className="mt-6 space-y-3 border-t border-sand-border pt-6">
              {user ? (
                <>
                  <div className="rounded-2xl border border-sand-border bg-pure-white p-4">
                    <p className="text-sm font-semibold text-warm-charcoal">
                      Signed in as {user.fullName}
                    </p>
                    <p className="text-xs text-secondary-text">{user.title}</p>
                  </div>
                  <Link
                    href={dashboardHref}
                    className="flex w-full items-center justify-center rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory"
                  >
                    Open Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center justify-center rounded-xl border border-sand-border bg-pure-white px-5 py-3 text-sm font-medium text-warm-charcoal"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center rounded-xl border border-sand-border bg-pure-white px-4 py-3 text-sm font-semibold text-warm-charcoal"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center justify-center rounded-xl bg-deep-forest px-4 py-3 text-sm font-semibold text-warm-ivory"
                  >
                    Join InternMe
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

